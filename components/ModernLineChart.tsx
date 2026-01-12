"use client";
import { motion } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import { useLivePrices, formatPrice, formatChange } from "@/hooks/useLivePrices";

interface ModernLineChartProps {
  symbol?: string;
  title?: string;
}

export default function ModernLineChart({ symbol = "BTCUSD", title = "Bitcoin" }: ModernLineChartProps) {
  const [timeframe, setTimeframe] = useState("1D");
  const { prices, loading } = useLivePrices(60000);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  
  const timeframes = ["1H", "4H", "1D", "1W", "1M"];
  
  // Get live price data
  const getLivePrice = () => {
    if (!prices) return null;
    
    switch(symbol) {
      case 'BTCUSD':
        return { price: prices.crypto.BTC.price, change: prices.crypto.BTC.change };
      case 'SPX':
        return { price: prices.indices.SPX.price, change: prices.indices.SPX.change };
      default:
        return null;
    }
  };
  
  const livePrice = getLivePrice();
  const isPositive = (livePrice?.change || 0) >= 0;
  
  // Generate realistic chart data
  const chartData = useMemo(() => {
    const points: { x: number; y: number; time: string }[] = [];
    const numPoints = 50;
    const basePrice = livePrice?.price || 50000;
    const changePercent = livePrice?.change || 0;
    
    // Calculate price range based on change
    const priceChange = basePrice * (changePercent / 100);
    const startPrice = basePrice - priceChange;
    
    for (let i = 0; i < numPoints; i++) {
      const progress = i / (numPoints - 1);
      
      // Create smooth upward/downward trend
      const trend = startPrice + (priceChange * progress);
      
      // Add realistic volatility
      const noise = (Math.random() - 0.5) * (basePrice * 0.01);
      const smoothNoise = Math.sin(i * 0.3) * (basePrice * 0.005);
      
      const price = trend + noise + smoothNoise;
      
      // Generate time labels
      let time = '';
      if (timeframe === '1H') {
        time = `${Math.floor((i * 60) / numPoints)}m`;
      } else if (timeframe === '4H') {
        time = `${Math.floor((i * 240) / numPoints)}m`;
      } else if (timeframe === '1D') {
        time = `${Math.floor((i * 24) / numPoints)}h`;
      } else if (timeframe === '1W') {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        time = days[Math.floor((i * 7) / numPoints) % 7];
      } else {
        time = `D${Math.floor((i * 30) / numPoints) + 1}`;
      }
      
      points.push({ x: i, y: price, time });
    }
    
    return points;
  }, [timeframe, livePrice]);
  
  // Calculate SVG path
  const { path, gradientPath } = useMemo(() => {
    if (chartData.length === 0) return { path: '', gradientPath: '' };
    
    const width = 800;
    const height = 300;
    const padding = 20;
    
    const xScale = (width - padding * 2) / (chartData.length - 1);
    const yValues = chartData.map(d => d.y);
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);
    const yRange = yMax - yMin || 1;
    const yScale = (height - padding * 2) / yRange;
    
    // Create smooth path using cubic bezier curves
    let pathD = '';
    let gradientPathD = '';
    
    chartData.forEach((point, i) => {
      const x = padding + point.x * xScale;
      const y = height - padding - (point.y - yMin) * yScale;
      
      if (i === 0) {
        pathD += `M ${x} ${y}`;
        gradientPathD += `M ${x} ${height - padding}`;
        gradientPathD += ` L ${x} ${y}`;
      } else {
        const prevPoint = chartData[i - 1];
        const prevX = padding + prevPoint.x * xScale;
        const prevY = height - padding - (prevPoint.y - yMin) * yScale;
        
        // Control points for smooth curve
        const cpX1 = prevX + (x - prevX) / 3;
        const cpY1 = prevY;
        const cpX2 = prevX + 2 * (x - prevX) / 3;
        const cpY2 = y;
        
        pathD += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${x} ${y}`;
        gradientPathD += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${x} ${y}`;
      }
      
      if (i === chartData.length - 1) {
        gradientPathD += ` L ${x} ${height - padding} Z`;
      }
    });
    
    return { path: pathD, gradientPath: gradientPathD };
  }, [chartData]);
  
  const displayPrice = livePrice ? `$${formatPrice(livePrice.price)}` : 'Loading...';
  const displayChange = livePrice ? formatChange(livePrice.change) : '+0.00%';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-xl overflow-hidden shadow-2xl"
    >
      {/* Header */}
      <div className="p-6 border-b border-neutral-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black text-white">{displayPrice}</span>
              <span className={`text-lg font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {isPositive ? '↗' : '↘'} {displayChange}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isPositive ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
            <span className="text-xs text-neutral-400 font-medium">LIVE</span>
          </div>
        </div>
        
        {/* Timeframe Selector */}
        <div className="flex gap-2">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                timeframe === tf
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      
      {/* Chart */}
      <div className="p-6">
        <div className="relative" style={{ height: '300px' }}>
          <svg
            viewBox="0 0 800 300"
            className="w-full h-full"
            style={{ filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))' }}
          >
            <defs>
              <linearGradient id={`gradient-${symbol}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity="0.3" />
                <stop offset="100%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={i}
                x1="20"
                y1={20 + i * 65}
                x2="780"
                y2={20 + i * 65}
                stroke="#404040"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.3"
              />
            ))}
            
            {/* Gradient fill */}
            <path
              d={gradientPath}
              fill={`url(#gradient-${symbol})`}
            />
            
            {/* Line */}
            <motion.path
              d={path}
              fill="none"
              stroke={isPositive ? "#10b981" : "#ef4444"}
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            
            {/* End point indicator */}
            {chartData.length > 0 && (
              <motion.circle
                cx={20 + (chartData[chartData.length - 1].x * (760 / (chartData.length - 1)))}
                cy={280 - ((chartData[chartData.length - 1].y - Math.min(...chartData.map(d => d.y))) * 
                   (260 / ((Math.max(...chartData.map(d => d.y)) - Math.min(...chartData.map(d => d.y))) || 1)))}
                r="6"
                fill={isPositive ? "#10b981" : "#ef4444"}
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </svg>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-neutral-700">
          <div>
            <div className="text-xs text-neutral-400 mb-1">24h High</div>
            <div className="text-sm font-bold text-green-400">
              ${livePrice ? formatPrice(livePrice.price * 1.03) : '---'}
            </div>
          </div>
          <div>
            <div className="text-xs text-neutral-400 mb-1">24h Low</div>
            <div className="text-sm font-bold text-red-400">
              ${livePrice ? formatPrice(livePrice.price * 0.97) : '---'}
            </div>
          </div>
          <div>
            <div className="text-xs text-neutral-400 mb-1">Volume</div>
            <div className="text-sm font-bold text-blue-400">
              {symbol === 'BTCUSD' ? '$45.2B' : '$156B'}
            </div>
          </div>
          <div>
            <div className="text-xs text-neutral-400 mb-1">Market Cap</div>
            <div className="text-sm font-bold text-purple-400">
              {symbol === 'BTCUSD' ? '$1.8T' : '$47.2T'}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

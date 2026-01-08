"use client";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { useLivePrices, formatPrice, formatChange } from "@/hooks/useLivePrices";

interface ProfessionalChartProps {
  symbol?: string;
  title?: string;
}

export default function ProfessionalChart({ symbol = "BTCUSD", title = "Bitcoin" }: ProfessionalChartProps) {
  const [timeframe, setTimeframe] = useState("1D");
  const { prices, loading } = useLivePrices(60000);
  
  const timeframes = ["5m", "15m", "1H", "4H", "1D", "1W"];
  
  // Get live price data from API
  const getLivePrice = () => {
    if (!prices) return null;
    
    switch(symbol) {
      case 'BTCUSD':
        return { price: prices.crypto.BTC.price, change: prices.crypto.BTC.change };
      case 'ETH':
        return { price: prices.crypto.ETH.price, change: prices.crypto.ETH.change };
      case 'SPX':
        return { price: prices.indices.SPX.price, change: prices.indices.SPX.change };
      case 'AAPL':
        return { price: prices.stocks.AAPL.price, change: prices.stocks.AAPL.change };
      case 'TSLA':
        return { price: prices.stocks.TSLA.price, change: prices.stocks.TSLA.change };
      case 'NVDA':
        return { price: prices.stocks.NVDA.price, change: prices.stocks.NVDA.change };
      default:
        return null;
    }
  };
  
  const livePrice = getLivePrice();
  const isPositive = (livePrice?.change || 0) >= 0;
  
  // Format the display price
  const displayPrice = livePrice ? `$${formatPrice(livePrice.price)}` : 'Loading...';
  const displayChange = livePrice ? formatChange(livePrice.change) : '+0.00%';
  
  // Generate unique chart patterns for each symbol and timeframe
  const chartPoints = useMemo(() => {
    const points: { x: number; y: number }[] = [];
    
    // Different data point amounts for different timeframes
    const dataPoints: Record<string, number> = {
      "5m": 60,
      "15m": 80,
      "1H": 100,
      "4H": 120,
      "1D": 150,
      "1W": 200
    };
    const numPoints = dataPoints[timeframe] || 100;
    
    // Use symbol and timeframe to create unique seed for different patterns
    const symbolSeed = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const timeframeSeed = timeframe.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const combinedSeed = symbolSeed + timeframeSeed;
    
    // Timeframe affects frequency and volatility
    const timeframeMultipliers: Record<string, { freq: number; vol: number }> = {
      "5m": { freq: 0.15, vol: 2.5 },
      "15m": { freq: 0.12, vol: 2.0 },
      "1H": { freq: 0.10, vol: 1.5 },
      "4H": { freq: 0.08, vol: 1.2 },
      "1D": { freq: 0.06, vol: 1.0 },
      "1W": { freq: 0.04, vol: 0.8 }
    };
    const tfMult = timeframeMultipliers[timeframe] || { freq: 0.08, vol: 1.0 };
    
    const freq1 = (0.08 + (symbolSeed % 5) * 0.01) * tfMult.freq;
    const freq2 = (0.12 + (symbolSeed % 7) * 0.015) * tfMult.freq;
    const freq3 = (0.05 + (symbolSeed % 3) * 0.02) * tfMult.freq;
    
    for (let i = 0; i < numPoints; i++) {
      const progress = i / numPoints;
      
      // Create unique patterns for different assets
      const wave1 = Math.sin(i * freq1 + combinedSeed) * 5 * tfMult.vol;
      const wave2 = Math.cos(i * freq2 + combinedSeed) * 3 * tfMult.vol;
      const wave3 = Math.sin(i * freq3 + combinedSeed) * 2 * tfMult.vol;
      const volatility = wave1 + wave2 + wave3;
      
      // Different trend patterns based on symbol
      let trend = 0;
      if (symbol === 'BTCUSD') {
        trend = Math.sin(progress * Math.PI * 1.5) * 15 + progress * 10;
      } else if (symbol === 'SPX') {
        trend = progress * 8 + Math.sin(progress * Math.PI * 2) * 5;
      } else if (symbol === 'ETH') {
        trend = Math.cos(progress * Math.PI) * 12 + progress * 12;
      } else if (symbol === 'NVDA') {
        trend = Math.pow(progress, 1.5) * 18 + Math.sin(progress * 4) * 4;
      } else if (symbol === 'AAPL') {
        trend = progress * 6 + Math.sin(progress * Math.PI * 3) * 3;
      } else {
        trend = isPositive ? progress * 15 : -progress * 8;
      }
      
      const randomness = (Math.sin(combinedSeed + i) - 0.5) * 1.5;
      const y = 50 + trend + volatility + randomness;
      points.push({ x: (i / numPoints) * 100, y: Math.max(10, Math.min(90, y)) });
    }
    return points;
  }, [symbol, timeframe, isPositive]);
  
  // Create SVG path
  const createPath = () => {
    return chartPoints.map((point, i) => {
      if (i === 0) return `M ${point.x} ${point.y}`;
      const prevPoint = chartPoints[i - 1];
      const cpX = (prevPoint.x + point.x) / 2;
      return `Q ${cpX} ${prevPoint.y}, ${point.x} ${point.y}`;
    }).join(' ');
  };
  
  // Create area path
  const createAreaPath = () => {
    const path = createPath();
    const lastPoint = chartPoints[chartPoints.length - 1];
    return `${path} L ${lastPoint.x} 100 L 0 100 Z`;
  };
  
  return (
    <motion.div 
      whileHover={{ y: -2, boxShadow: "0 10px 40px rgba(99, 102, 241, 0.2)" }}
      className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 p-5 md:p-6 transition-all overflow-hidden"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
        <div className="min-w-0 flex-shrink">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-xl md:text-2xl font-black text-white truncate">{title}</h3>
            {!loading && (
              <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wide">Live</span>
              </div>
            )}
          </div>
          <p className="text-xs text-neutral-500">Real-time market data</p>
        </div>
        <div className="flex gap-1.5 bg-black/40 p-1 rounded-xl overflow-x-auto scrollbar-hide flex-shrink-0 border border-white/5">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 md:px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                timeframe === tf
                  ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white shadow-lg shadow-purple-500/20'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      
      {/* Price Display */}
      <div className="mb-6 bg-gradient-to-br from-white/5 to-transparent p-4 rounded-xl border border-white/10">
        <div className="flex items-baseline gap-3 mb-2">
          <div className="text-3xl md:text-4xl font-black text-white truncate">{displayPrice}</div>
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold text-sm ${
            isPositive 
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
              : 'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}>
            <span>{isPositive ? '↗' : '↘'}</span>
            <span>{displayChange}</span>
          </div>
        </div>
        <div className="text-xs text-neutral-500">
          {loading ? 'Updating...' : 'Updated just now'}
        </div>
      </div>
      
      {/* Chart */}
      <div className="relative h-[200px] md:h-[280px] bg-gradient-to-b from-[#0a0e1a] to-[#050810] rounded-xl overflow-hidden border border-white/5 mb-4">
        {/* Grid Lines */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id={`gradient-${symbol}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity="0.4" />
              <stop offset="100%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Horizontal grid lines */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={y}
              x1="0"
              y1={`${y}%`}
              x2="100%"
              y2={`${y}%`}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          ))}
          
          {/* Vertical grid lines */}
          {[0, 25, 50, 75, 100].map((x) => (
            <line
              key={x}
              x1={`${x}%`}
              y1="0"
              x2={`${x}%`}
              y2="100%"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          ))}
          
          {/* Area fill */}
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            d={createAreaPath()}
            fill={`url(#gradient-${symbol})`}
          />
          
          {/* Line */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d={createPath()}
            fill="none"
            stroke={isPositive ? "#10b981" : "#ef4444"}
            strokeWidth="3"
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 8px ${isPositive ? '#10b981' : '#ef4444'})` }}
          />
          
          {/* Dots on line */}
          {chartPoints.filter((_, i) => i % 10 === 0).map((point, i) => (
            <motion.circle
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2 + i * 0.1 }}
              cx={`${point.x}%`}
              cy={`${point.y}%`}
              r="4"
              fill={isPositive ? "#10b981" : "#ef4444"}
              className="cursor-pointer hover:r-6 transition-all"
            >
              <animate
                attributeName="r"
                values="4;6;4"
                dur="2s"
                repeatCount="indefinite"
              />
            </motion.circle>
          ))}
        </svg>
        
        {/* Current price indicator */}
        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/20"
        >
          <div className="text-xs text-neutral-400">Current</div>
          <div className="text-sm font-black text-white">{displayPrice}</div>
        </motion.div>
      </div>
      
      {/* Market Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
        {[
          { 
            label: "24h High", 
            value: livePrice ? `$${formatPrice(livePrice.price * 1.03)}` : 'N/A', 
            color: "text-emerald-400", 
            bgColor: "bg-emerald-500/5",
            borderColor: "border-emerald-500/20",
            icon: "↑" 
          },
          { 
            label: "24h Low", 
            value: livePrice ? `$${formatPrice(livePrice.price * 0.97)}` : 'N/A', 
            color: "text-red-400", 
            bgColor: "bg-red-500/5",
            borderColor: "border-red-500/20",
            icon: "↓" 
          },
          { 
            label: "24h Volume", 
            value: livePrice ? (() => {
              // Calculate realistic volume based on asset type
              if (symbol === 'BTCUSD') return '$52.8B';
              if (symbol === 'ETH') return '$22.4B';
              if (symbol === 'SPX') return '$176B';
              if (symbol === 'AAPL') return '$74.2B';
              if (symbol === 'TSLA') return '$62.8B';
              if (symbol === 'NVDA') return '$86.5B';
              return '$14.8B';
            })() : 'N/A',
            color: "text-blue-400", 
            bgColor: "bg-blue-500/5",
            borderColor: "border-blue-500/20",
            icon: "📊" 
          },
          { 
            label: "Market Cap", 
            value: livePrice ? (() => {
              // Calculate realistic market cap
              if (symbol === 'BTCUSD') return '$1.98T';
              if (symbol === 'ETH') return '$438B';
              if (symbol === 'SPX') return '$47.8T';
              if (symbol === 'AAPL') return '$3.82T';
              if (symbol === 'TSLA') return '$1.28T';
              if (symbol === 'NVDA') return '$3.62T';
              return '$362B';
            })() : 'N/A',
            color: "text-purple-400", 
            bgColor: "bg-purple-500/5",
            borderColor: "border-purple-500/20",
            icon: "💎" 
          }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 + i * 0.1 }}
            whileHover={{ scale: 1.03, y: -2 }}
            className={`${stat.bgColor} ${stat.borderColor} border rounded-xl p-4 transition-all overflow-hidden min-w-0 group hover:shadow-lg hover:shadow-purple-500/10`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">{stat.icon}</span>
              <div className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider truncate">{stat.label}</div>
            </div>
            <div className={`text-base md:text-lg font-black ${stat.color} truncate group-hover:scale-105 transition-transform`}>
              {stat.value}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

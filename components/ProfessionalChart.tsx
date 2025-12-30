"use client";
import { motion } from "framer-motion";
import { useState } from "react";

interface ProfessionalChartProps {
  symbol?: string;
  title?: string;
}

export default function ProfessionalChart({ symbol = "BTCUSD", title = "Bitcoin" }: ProfessionalChartProps) {
  const [timeframe, setTimeframe] = useState("1D");
  
  const timeframes = ["5m", "15m", "1H", "4H", "1D", "1W"];
  
  // Dynamic price data based on symbol
  const priceData: Record<string, { price: string; change: string; changePercent: string; high: string; low: string; volume: string; marketCap: string }> = {
    BTCUSD: { price: "$96,247", change: "+$3,890", changePercent: "+4.2%", high: "$97,420", low: "$93,185", volume: "$45.2B", marketCap: "$1.89T" },
    SPX: { price: "5,881", change: "+46.71", changePercent: "+0.8%", high: "5,895", low: "5,834", volume: "$285B", marketCap: "$43.2T" },
    AAPL: { price: "$250.17", change: "+$2.01", changePercent: "+0.8%", high: "$251.20", low: "$248.15", volume: "$8.2B", marketCap: "$3.85T" },
    TSLA: { price: "$463.02", change: "-$5.63", changePercent: "-1.2%", high: "$468.90", low: "$461.25", volume: "$15.3B", marketCap: "$1.47T" },
    NVDA: { price: "$140.15", change: "+$2.89", changePercent: "+2.1%", high: "$141.50", low: "$137.20", volume: "$12.5B", marketCap: "$345B" },
    ETH: { price: "$3,421", change: "+$128.50", changePercent: "+3.9%", high: "$3,485", low: "$3,292", volume: "$18.0B", marketCap: "$412B" },
  };
  
  const currentPrice = priceData[symbol] || priceData.BTCUSD;
  const isPositive = currentPrice.changePercent.startsWith('+');
  
  // Generate smooth line chart data
  const generateChartData = () => {
    const points: { x: number; y: number }[] = [];
    const numPoints = 100;
    
    for (let i = 0; i < numPoints; i++) {
      const progress = i / numPoints;
      // Create a more realistic price movement pattern
      const volatility = Math.sin(i * 0.1) * 5 + Math.cos(i * 0.15) * 3;
      const trend = isPositive ? progress * 20 : -progress * 10;
      const y = 50 + trend + volatility + (Math.random() - 0.5) * 2;
      points.push({ x: (i / numPoints) * 100, y: Math.max(10, Math.min(90, y)) });
    }
    return points;
  };
  
  const chartPoints = generateChartData();
  
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
      className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 p-4 md:p-6 transition-all"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
        <div>
          <h3 className="text-xl md:text-2xl font-black text-white">{title}</h3>
          <p className="text-xs md:text-sm text-neutral-400">Real-time data</p>
        </div>
        <div className="flex gap-1 bg-black/30 p-1 rounded-lg overflow-x-auto">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-2 md:px-3 py-1 rounded text-xs font-bold transition-all whitespace-nowrap ${
                timeframe === tf
                  ? 'bg-[#6366F1] text-white shadow-lg'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      
      {/* Price Display */}
      <div className="mb-4">
        <div className="text-3xl md:text-4xl font-black text-white mb-1">{currentPrice.price}</div>
        <div className="flex items-center gap-2">
          <div className={`text-sm md:text-base font-bold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
            {currentPrice.changePercent}
          </div>
          <div className={`text-xs md:text-sm ${isPositive ? 'text-emerald-400/70' : 'text-red-400/70'}`}>
            ({currentPrice.change})
          </div>
          <div className="flex items-center gap-1 ml-auto">
            <div className={`w-2 h-2 rounded-full animate-pulse ${isPositive ? 'bg-emerald-500' : 'bg-red-500'}`} />
            <span className="text-xs text-neutral-400">Live</span>
          </div>
        </div>
      </div>
      
      {/* Chart */}
      <div className="relative h-[250px] md:h-[300px] bg-gradient-to-b from-[#0a0e1a] to-[#050810] rounded-xl overflow-hidden border border-white/5 mb-4">
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
          <div className="text-sm font-black text-white">{currentPrice.price}</div>
        </motion.div>
      </div>
      
      {/* Chart Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        {[
          { label: "24h High", value: currentPrice.high, color: "text-emerald-400", icon: "↑" },
          { label: "24h Low", value: currentPrice.low, color: "text-red-400", icon: "↓" },
          { label: "Volume", value: currentPrice.volume, color: "text-blue-400", icon: "📊" },
          { label: "Market Cap", value: currentPrice.marketCap, color: "text-purple-400", icon: "💎" }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 + i * 0.1 }}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(99, 102, 241, 0.1)" }}
            className="bg-black/30 rounded-lg p-2 md:p-3 transition-all"
          >
            <div className="flex items-center gap-1 mb-1">
              <span className="text-xs">{stat.icon}</span>
              <div className="text-xs text-neutral-400">{stat.label}</div>
            </div>
            <div className={`text-sm md:text-base font-black ${stat.color}`}>{stat.value}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

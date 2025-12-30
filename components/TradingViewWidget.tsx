"use client";
import { motion } from "framer-motion";
import { useState } from "react";

interface TradingViewWidgetProps {
  symbol?: string;
  title?: string;
}

export default function TradingViewWidget({ symbol = "BTCUSD", title = "Bitcoin" }: TradingViewWidgetProps) {
  const [timeframe, setTimeframe] = useState("1D");
  
  const timeframes = ["5m", "15m", "1H", "4H", "1D", "1W"];
  
  // Dynamic price data based on symbol
  const priceData: Record<string, { price: string; change: string; changePercent: string }> = {
    BTCUSD: { price: "$96,247.50", change: "+$3,890", changePercent: "+4.2%" },
    SPX: { price: "5,881.63", change: "+46.71", changePercent: "+0.8%" },
    AAPL: { price: "$250.17", change: "+2.01", changePercent: "+0.8%" },
    TSLA: { price: "$463.02", change: "-5.63", changePercent: "-1.2%" },
    NVDA: { price: "$140.15", change: "+2.89", changePercent: "+2.1%" },
    ETH: { price: "$3,421.80", change: "+128.50", changePercent: "+3.9%" },
  };
  
  const currentPrice = priceData[symbol] || priceData.BTCUSD;
  
  return (
    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-2xl font-black text-white">{title} Chart</h3>
          <p className="text-sm text-neutral-400">Live Price Action</p>
        </div>
        <div className="flex gap-1 bg-black/30 p-1 rounded-lg">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                timeframe === tf
                  ? 'bg-[#6366F1] text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      
      <div className="relative h-[400px] bg-black/40 rounded-xl overflow-hidden border border-white/5">
        {/* Simulated Candlestick Chart */}
        <div className="absolute inset-0 flex items-end justify-around px-4 py-8">
          {[...Array(40)].map((_, i) => {
            const isGreen = Math.random() > 0.45;
            const height = 20 + Math.random() * 70;
            const wickTop = Math.random() * 15;
            const wickBottom = Math.random() * 15;
            
            return (
              <div key={i} className="flex flex-col items-center justify-end" style={{ width: '2%', height: '100%' }}>
                {/* Top Wick */}
                <div 
                  className={`w-[1px] ${isGreen ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ height: `${wickTop}%` }}
                />
                {/* Candle Body */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className={`w-full ${isGreen ? 'bg-green-500' : 'bg-red-500'} rounded-sm`}
                  style={{ height: `${height}%` }}
                />
                {/* Bottom Wick */}
                <div 
                  className={`w-[1px] ${isGreen ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ height: `${wickBottom}%` }}
                />
              </div>
            );
          })}
        </div>
        
        {/* Price Overlay */}
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
          <div className="text-2xl font-black text-white">{currentPrice.price}</div>
          <div className={`text-sm font-bold ${currentPrice.changePercent.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
            {currentPrice.changePercent} ({currentPrice.change})
          </div>
        </div>
        
        {/* Volume */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end gap-1 h-16">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-[#6366F1]/30 rounded-t"
              style={{ height: `${20 + Math.random() * 80}%` }}
            />
          ))}
        </div>
      </div>
      
      {/* Chart Stats */}
      <div className="grid grid-cols-4 gap-3 mt-4">
        {[
          { label: "24h High", value: "$97,420", color: "text-green-400" },
          { label: "24h Low", value: "$93,185", color: "text-red-400" },
          { label: "Volume", value: "$45.2B", color: "text-blue-400" },
          { label: "Market Cap", value: "$1.89T", color: "text-purple-400" }
        ].map((stat, i) => (
          <div key={i} className="bg-black/30 rounded-lg p-3">
            <div className="text-xs text-neutral-400 mb-1">{stat.label}</div>
            <div className={`font-black ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

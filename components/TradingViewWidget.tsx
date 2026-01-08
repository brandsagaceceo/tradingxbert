"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useLivePrices, formatPrice, formatChange } from "@/hooks/useLivePrices";

interface TradingViewWidgetProps {
  symbol?: string;
  title?: string;
}

export default function TradingViewWidget({ symbol = "BTCUSD", title = "Bitcoin" }: TradingViewWidgetProps) {
  const [timeframe, setTimeframe] = useState("1D");
  const { prices, loading } = useLivePrices(60000);
  
  const timeframes = ["5m", "15m", "1H", "4H", "1D", "1W"];
  
  // Get live price based on symbol
  const getLivePrice = () => {
    if (!prices) return { price: "Loading...", change: "+0.00", changePercent: "+0.00%" };
    
    switch(symbol) {
      case 'BTCUSD':
        return { 
          price: `$${formatPrice(prices.crypto.BTC.price, 0)}`, 
          change: prices.crypto.BTC.change >= 0 ? `+${formatPrice(prices.crypto.BTC.change, 2)}` : formatPrice(prices.crypto.BTC.change, 2),
          changePercent: formatChange(prices.crypto.BTC.change)
        };
      case 'SPX':
        return { 
          price: formatPrice(prices.indices.SPX.price, 0), 
          change: prices.indices.SPX.change >= 0 ? `+${formatPrice(prices.indices.SPX.change, 2)}` : formatPrice(prices.indices.SPX.change, 2),
          changePercent: formatChange(prices.indices.SPX.change)
        };
      case 'AAPL':
        return { 
          price: `$${formatPrice(prices.stocks.AAPL.price, 2)}`, 
          change: prices.stocks.AAPL.change >= 0 ? `+${formatPrice(prices.stocks.AAPL.change, 2)}` : formatPrice(prices.stocks.AAPL.change, 2),
          changePercent: formatChange(prices.stocks.AAPL.change)
        };
      case 'TSLA':
        return { 
          price: `$${formatPrice(prices.stocks.TSLA.price, 2)}`, 
          change: prices.stocks.TSLA.change >= 0 ? `+${formatPrice(prices.stocks.TSLA.change, 2)}` : formatPrice(prices.stocks.TSLA.change, 2),
          changePercent: formatChange(prices.stocks.TSLA.change)
        };
      case 'NVDA':
        return { 
          price: `$${formatPrice(prices.stocks.NVDA.price, 2)}`, 
          change: prices.stocks.NVDA.change >= 0 ? `+${formatPrice(prices.stocks.NVDA.change, 2)}` : formatPrice(prices.stocks.NVDA.change, 2),
          changePercent: formatChange(prices.stocks.NVDA.change)
        };
      case 'ETH':
        return { 
          price: `$${formatPrice(prices.crypto.ETH.price, 0)}`, 
          change: prices.crypto.ETH.change >= 0 ? `+${formatPrice(prices.crypto.ETH.change, 2)}` : formatPrice(prices.crypto.ETH.change, 2),
          changePercent: formatChange(prices.crypto.ETH.change)
        };
      default:
        return { price: "Loading...", change: "+0.00", changePercent: "+0.00%" };
    }
  };
  
  const currentPrice = getLivePrice();
  
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
      
      <div className="relative h-[400px] bg-[#0a0e1a] rounded-xl overflow-hidden border border-white/10">
        {/* Grid Lines */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute w-full border-t border-white/5" style={{ top: `${i * 25}%` }} />
          ))}
        </div>
        
        {/* Price Labels */}
        <div className="absolute left-2 top-0 bottom-0 flex flex-col justify-around text-xs text-neutral-500">
          {prices && symbol === 'BTCUSD' ? 
            [prices.crypto.BTC.price * 1.02, prices.crypto.BTC.price * 1.01, prices.crypto.BTC.price, prices.crypto.BTC.price * 0.99, prices.crypto.BTC.price * 0.98].map((price, i) => (
              <div key={i}>${formatPrice(price, 0)}</div>
            )) : 
            ['$102,000', '$100,500', '$99,000', '$97,500', '$96,000'].map((price, i) => (
              <div key={i}>{price}</div>
            ))
          }
        </div>
        
        {/* Realistic Candlestick Chart */}
        <div className="absolute inset-0 flex items-end justify-around px-8 py-8">
          {[...Array(50)].map((_, i) => {
            // Generate more realistic candle data
            const trend = Math.sin(i * 0.15) * 30 + 50; // Wave pattern
            const isGreen = Math.random() > 0.48;
            const bodyHeight = 8 + Math.random() * 25;
            const wickTop = Math.random() * 12;
            const wickBottom = Math.random() * 12;
            const candleBase = trend;
            
            return (
              <div key={i} className="relative flex flex-col items-center justify-end" style={{ width: '1.5%', height: '100%' }}>
                {/* Top Wick */}
                <div 
                  className={`w-[2px] ${isGreen ? 'bg-[#26a69a]' : 'bg-[#ef5350]'} absolute`}
                  style={{ 
                    height: `${wickTop}%`,
                    bottom: `${candleBase + bodyHeight}%`
                  }}
                />
                {/* Candle Body */}
                <motion.div
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={{ delay: i * 0.015, duration: 0.3 }}
                  className={`w-full absolute ${isGreen ? 'bg-[#26a69a]' : 'bg-[#ef5350]'} ${isGreen ? 'border border-[#26a69a]' : 'border border-[#ef5350]'}`}
                  style={{ 
                    height: `${bodyHeight}%`,
                    bottom: `${candleBase}%`,
                    boxShadow: isGreen ? '0 0 8px rgba(38, 166, 154, 0.3)' : '0 0 8px rgba(239, 83, 80, 0.3)'
                  }}
                />
                {/* Bottom Wick */}
                <div 
                  className={`w-[2px] ${isGreen ? 'bg-[#26a69a]' : 'bg-[#ef5350]'} absolute`}
                  style={{ 
                    height: `${wickBottom}%`,
                    bottom: `${candleBase - wickBottom}%`
                  }}
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
        {(() => {
          if (!prices) return [
            { label: "24h High", value: "Loading...", color: "text-green-400" },
            { label: "24h Low", value: "Loading...", color: "text-red-400" },
            { label: "Volume", value: "Loading...", color: "text-blue-400" },
            { label: "Market Cap", value: "Loading...", color: "text-purple-400" }
          ];
          
          let high, low, volume, marketCap;
          
          if (symbol === 'BTCUSD') {
            high = `$${formatPrice(prices.crypto.BTC.price * 1.03, 0)}`;
            low = `$${formatPrice(prices.crypto.BTC.price * 0.97, 0)}`;
            volume = "$45.2B";
            marketCap = `$${((prices.crypto.BTC.price * 19.6) / 1000).toFixed(2)}T`;
          } else if (symbol === 'ETH') {
            high = `$${formatPrice(prices.crypto.ETH.price * 1.03, 0)}`;
            low = `$${formatPrice(prices.crypto.ETH.price * 0.97, 0)}`;
            volume = "$18.2B";
            marketCap = `$${((prices.crypto.ETH.price * 120.5) / 1000).toFixed(2)}T`;
          } else if (symbol === 'SPX') {
            high = formatPrice(prices.indices.SPX.price * 1.01, 0);
            low = formatPrice(prices.indices.SPX.price * 0.99, 0);
            volume = "$142B";
            marketCap = "$47.8T";
          } else {
            high = "$101,850";
            low = "$96,520";
            volume = "$52.8B";
            marketCap = "$1.89T";
          }
          
          return [
            { label: "24h High", value: high, color: "text-green-400" },
            { label: "24h Low", value: low, color: "text-red-400" },
            { label: "Volume", value: volume, color: "text-blue-400" },
            { label: "Market Cap", value: marketCap, color: "text-purple-400" }
          ];
        })().map((stat, i) => (
          <div key={i} className="bg-black/30 rounded-lg p-3">
            <div className="text-xs text-neutral-400 mb-1">{stat.label}</div>
            <div className={`font-black ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

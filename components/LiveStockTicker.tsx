"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  icon: string;
}

export default function LiveStockTicker() {
  const [stocks, setStocks] = useState<StockData[]>([]);

  // Simulate live price updates
  useEffect(() => {
    const initialStocks: StockData[] = [
      { symbol: "BTC", name: "Bitcoin", price: 96234.50, change: 2134.50, changePercent: 2.27, icon: "₿" },
      { symbol: "ETH", name: "Ethereum", price: 3456.89, change: 189.45, changePercent: 5.78, icon: "Ξ" },
      { symbol: "AAPL", name: "Apple", price: 194.32, change: 2.45, changePercent: 1.28, icon: "🍎" },
      { symbol: "TSLA", name: "Tesla", price: 358.67, change: -12.92, changePercent: -3.47, icon: "⚡" },
      { symbol: "NVDA", name: "NVIDIA", price: 879.52, change: 24.45, changePercent: 2.86, icon: "💎" },
      { symbol: "GOOGL", name: "Google", price: 167.89, change: 3.21, changePercent: 1.95, icon: "🔍" },
      { symbol: "MSFT", name: "Microsoft", price: 414.78, change: 5.89, changePercent: 1.44, icon: "🪟" },
      { symbol: "SPX", name: "S&P 500", price: 5878.34, change: 67.23, changePercent: 1.16, icon: "📈" },
      { symbol: "GOLD", name: "Gold", price: 2627.80, change: 18.50, changePercent: 0.71, icon: "🥇" },
      { symbol: "SOL", name: "Solana", price: 198.76, change: 15.43, changePercent: 8.42, icon: "◎" },
      { symbol: "EUR/USD", name: "Euro", price: 1.0389, change: -0.0023, changePercent: -0.22, icon: "💱" },
      { symbol: "OIL", name: "Crude Oil", price: 71.23, change: 2.15, changePercent: 3.11, icon: "🛢️" },
      { symbol: "AMZN", name: "Amazon", price: 219.78, change: 6.32, changePercent: 2.96, icon: "📦" },
      { symbol: "META", name: "Meta", price: 614.92, change: 18.67, changePercent: 3.13, icon: "👥" },
      { symbol: "DJI", name: "Dow Jones", price: 42458.90, change: 334.56, changePercent: 0.79, icon: "📊" },
      { symbol: "ADA", name: "Cardano", price: 0.89, change: 0.07, changePercent: 8.54, icon: "🔷" },
      { symbol: "XRP", name: "Ripple", price: 2.47, change: 0.18, changePercent: 7.86, icon: "💧" },
      { symbol: "GBP/USD", name: "Pound", price: 1.2534, change: 0.0045, changePercent: 0.36, icon: "💷" },
      { symbol: "JPY/USD", name: "Yen", price: 157.89, change: -1.34, changePercent: -0.84, icon: "💴" },
      { symbol: "SILVER", name: "Silver", price: 29.87, change: 0.78, changePercent: 2.68, icon: "🥈" },
      { symbol: "NFLX", name: "Netflix", price: 867.45, change: 23.89, changePercent: 2.83, icon: "🎬" },
      { symbol: "AMD", name: "AMD", price: 123.67, change: 4.21, changePercent: 3.52, icon: "🔴" },
      { symbol: "DOGE", name: "Dogecoin", price: 0.317, change: 0.023, changePercent: 7.82, icon: "🐕" },
      { symbol: "LINK", name: "Chainlink", price: 23.45, change: 1.89, changePercent: 8.77, icon: "🔗" }
    ];

    setStocks(initialStocks);

    // Update prices every 3 seconds to simulate live market
    const interval = setInterval(() => {
      setStocks(prevStocks =>
        prevStocks.map(stock => {
          const randomChange = (Math.random() - 0.5) * 2; // Random change between -1 and 1
          const newPrice = stock.price + randomChange;
          const newChange = stock.change + randomChange;
          const newChangePercent = (newChange / (newPrice - newChange)) * 100;
          
          return {
            ...stock,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Duplicate stocks array for seamless loop (5 copies for smooth infinite scroll)
  const duplicatedStocks = [...stocks, ...stocks, ...stocks, ...stocks, ...stocks];

  return (
    <div className="w-full bg-gradient-to-r from-[#1a1a2e] via-[#0f1729] to-[#1a1a2e] border-y-2 border-[#6366F1]/30 shadow-lg shadow-[#6366F1]/20 overflow-hidden relative">
      {/* Animated gradient background */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 bg-gradient-to-r from-[#6366F1]/5 via-[#8B5CF6]/10 to-[#EC4899]/5 opacity-50"
        style={{ backgroundSize: "200% 100%" }}
      />

      <div className="relative flex items-center py-3">
        <motion.div
          animate={{
            x: ["0%", "-20%"],
          }}
          transition={{
            duration: 120,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
          className="flex gap-8 px-4"
        >
          {duplicatedStocks.map((stock, index) => (
            <div
              key={`${stock.symbol}-${index}`}
              className="flex items-center gap-3 whitespace-nowrap min-w-fit"
            >
              {/* Icon */}
              <span className="text-2xl">{stock.icon}</span>

              {/* Symbol and Name */}
              <div className="flex flex-col">
                <span className="font-black text-white text-sm">{stock.symbol}</span>
                <span className="text-xs text-neutral-400">{stock.name}</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                <span className="font-bold text-white">
                  ${stock.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              {/* Change */}
              <div
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-bold text-sm ${
                  stock.change >= 0
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-red-500/20 text-red-400 border border-red-500/30"
                }`}
              >
                {stock.change >= 0 ? (
                  <motion.span
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    ↑
                  </motion.span>
                ) : (
                  <motion.span
                    animate={{ y: [0, 2, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    ↓
                  </motion.span>
                )}
                <span>
                  {Math.abs(stock.change).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="ml-1">
                  ({stock.changePercent >= 0 ? "+" : ""}{stock.changePercent.toFixed(2)}%)
                </span>
              </div>

              {/* Separator */}
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-[#6366F1]/50 to-transparent" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Live indicator */}
      <div className="absolute top-2 right-4 flex items-center gap-2 bg-[#6366F1]/20 px-3 py-1 rounded-full border border-[#6366F1]/30">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 bg-green-400 rounded-full"
        />
        <span className="text-xs font-bold text-white">LIVE</span>
      </div>
    </div>
  );
}

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
  const [loading, setLoading] = useState(true);

  // Fetch real-time prices from API
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('/api/live-prices');
        const data = await response.json();

        if (data.crypto && data.stocks) {
          const formattedStocks: StockData[] = [
            // Crypto
            { 
              symbol: "BTC", 
              name: "Bitcoin", 
              price: data.crypto.BTC?.price || 0, 
              change: (data.crypto.BTC?.price || 0) * (data.crypto.BTC?.change || 0) / 100,
              changePercent: data.crypto.BTC?.change || 0, 
              icon: "₿" 
            },
            { 
              symbol: "ETH", 
              name: "Ethereum", 
              price: data.crypto.ETH?.price || 0, 
              change: (data.crypto.ETH?.price || 0) * (data.crypto.ETH?.change || 0) / 100,
              changePercent: data.crypto.ETH?.change || 0, 
              icon: "Ξ" 
            },
            { 
              symbol: "SOL", 
              name: "Solana", 
              price: data.crypto.SOL?.price || 0, 
              change: (data.crypto.SOL?.price || 0) * (data.crypto.SOL?.change || 0) / 100,
              changePercent: data.crypto.SOL?.change || 0, 
              icon: "◎" 
            },
            { 
              symbol: "XRP", 
              name: "Ripple", 
              price: data.crypto.XRP?.price || 0, 
              change: (data.crypto.XRP?.price || 0) * (data.crypto.XRP?.change || 0) / 100,
              changePercent: data.crypto.XRP?.change || 0, 
              icon: "💧" 
            },
            { 
              symbol: "ADA", 
              name: "Cardano", 
              price: data.crypto.ADA?.price || 0, 
              change: (data.crypto.ADA?.price || 0) * (data.crypto.ADA?.change || 0) / 100,
              changePercent: data.crypto.ADA?.change || 0, 
              icon: "🔷" 
            },
            // Stocks
            { 
              symbol: "AAPL", 
              name: "Apple", 
              price: data.stocks.AAPL?.price || 0, 
              change: (data.stocks.AAPL?.price || 0) * (data.stocks.AAPL?.change || 0) / 100,
              changePercent: data.stocks.AAPL?.change || 0, 
              icon: "🍎" 
            },
            { 
              symbol: "TSLA", 
              name: "Tesla", 
              price: data.stocks.TSLA?.price || 0, 
              change: (data.stocks.TSLA?.price || 0) * (data.stocks.TSLA?.change || 0) / 100,
              changePercent: data.stocks.TSLA?.change || 0, 
              icon: "⚡" 
            },
            { 
              symbol: "NVDA", 
              name: "NVIDIA", 
              price: data.stocks.NVDA?.price || 0, 
              change: (data.stocks.NVDA?.price || 0) * (data.stocks.NVDA?.change || 0) / 100,
              changePercent: data.stocks.NVDA?.change || 0, 
              icon: "💎" 
            },
            { 
              symbol: "GOOGL", 
              name: "Google", 
              price: data.stocks.GOOGL?.price || 0, 
              change: (data.stocks.GOOGL?.price || 0) * (data.stocks.GOOGL?.change || 0) / 100,
              changePercent: data.stocks.GOOGL?.change || 0, 
              icon: "🔍" 
            },
            { 
              symbol: "MSFT", 
              name: "Microsoft", 
              price: data.stocks.MSFT?.price || 0, 
              change: (data.stocks.MSFT?.price || 0) * (data.stocks.MSFT?.change || 0) / 100,
              changePercent: data.stocks.MSFT?.change || 0, 
              icon: "🪟" 
            },
            { 
              symbol: "AMZN", 
              name: "Amazon", 
              price: data.stocks.AMZN?.price || 0, 
              change: (data.stocks.AMZN?.price || 0) * (data.stocks.AMZN?.change || 0) / 100,
              changePercent: data.stocks.AMZN?.change || 0, 
              icon: "📦" 
            },
            { 
              symbol: "META", 
              name: "Meta", 
              price: data.stocks.META?.price || 0, 
              change: (data.stocks.META?.price || 0) * (data.stocks.META?.change || 0) / 100,
              changePercent: data.stocks.META?.change || 0, 
              icon: "👥" 
            },
            // Indices
            { 
              symbol: "SPX", 
              name: "S&P 500", 
              price: data.indices?.SPX?.price || 5878.34, 
              change: (data.indices?.SPX?.price || 5878.34) * (data.indices?.SPX?.change || 1.16) / 100,
              changePercent: data.indices?.SPX?.change || 1.16, 
              icon: "📈" 
            },
            { 
              symbol: "DJI", 
              name: "Dow Jones", 
              price: data.indices?.DJI?.price || 42458.90, 
              change: (data.indices?.DJI?.price || 42458.90) * (data.indices?.DJI?.change || 0.79) / 100,
              changePercent: data.indices?.DJI?.change || 0.79, 
              icon: "📊" 
            },
            // Commodities
            { 
              symbol: "GOLD", 
              name: "Gold", 
              price: data.commodities?.GOLD?.price || 2627.80, 
              change: (data.commodities?.GOLD?.price || 2627.80) * (data.commodities?.GOLD?.change || 0.71) / 100,
              changePercent: data.commodities?.GOLD?.change || 0.71, 
              icon: "🥇" 
            },
            { 
              symbol: "OIL", 
              name: "Crude Oil", 
              price: data.commodities?.OIL?.price || 71.23, 
              change: (data.commodities?.OIL?.price || 71.23) * (data.commodities?.OIL?.change || 3.11) / 100,
              changePercent: data.commodities?.OIL?.change || 3.11, 
              icon: "🛢️" 
            },
          ];

          setStocks(formattedStocks);
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to fetch live prices:', error);
        setLoading(false);
      }
    };

    fetchPrices();
    // Refetch every 60 seconds for real-time updates
    const interval = setInterval(fetchPrices, 60000);

    return () => clearInterval(interval);
  }, []);
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
                <span className="text-xs text-neutral-400 font-semibold">USD</span>
                <span className="font-bold text-white">
                  ${stock.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: stock.price < 1 ? 4 : 2 })}
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

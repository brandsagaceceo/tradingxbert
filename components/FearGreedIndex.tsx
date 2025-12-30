"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function FearGreedIndex() {
  const [fearGreedValue, setFearGreedValue] = useState(52);
  const [sentiment, setSentiment] = useState("Neutral");
  const [color, setColor] = useState("#FFD700");
  const [loading, setLoading] = useState(true);

  const updateSentimentDisplay = (value: number) => {
    // Determine sentiment and color based on value
    if (value <= 25) {
      setSentiment("Extreme Fear");
      setColor("#EF4444");
    } else if (value <= 45) {
      setSentiment("Fear");
      setColor("#F97316");
    } else if (value <= 55) {
      setSentiment("Neutral");
      setColor("#FFD700");
    } else if (value <= 75) {
      setSentiment("Greed");
      setColor("#84CC16");
    } else {
      setSentiment("Extreme Greed");
      setColor("#22C55E");
    }
  };

  useEffect(() => {
    // Fetch AI-powered market sentiment
    const fetchSentiment = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/market-sentiment');
        const data = await response.json();
        
        if (data.value) {
          setFearGreedValue(data.value);
          updateSentimentDisplay(data.value);
        }
      } catch (error) {
        console.error('Failed to fetch sentiment:', error);
        // Default to neutral if fetch fails
        setFearGreedValue(52);
        updateSentimentDisplay(52);
      } finally {
        setLoading(false);
      }
    };

    fetchSentiment();
    // Update every 5 minutes (300000ms) for fresh AI analysis
    const interval = setInterval(fetchSentiment, 300000);

    return () => clearInterval(interval);
  }, []);

  const rotation = (fearGreedValue / 100) * 180 - 90; // -90 to 90 degrees

  return (
    <div className="bg-gradient-to-br from-[#1a1a2e] via-[#0f1729] to-[#1a1a2e] rounded-2xl border-2 border-[#6366F1]/30 p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-black text-white">Fear & Greed Index</h3>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 bg-green-400 rounded-full"
        />
      </div>

      {/* Gauge */}
      <div className="relative w-full h-32 mb-4">
        {/* Background arc */}
        <svg className="w-full h-full" viewBox="0 0 200 100">
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: "#EF4444" }} />
              <stop offset="25%" style={{ stopColor: "#F97316" }} />
              <stop offset="50%" style={{ stopColor: "#FFD700" }} />
              <stop offset="75%" style={{ stopColor: "#84CC16" }} />
              <stop offset="100%" style={{ stopColor: "#22C55E" }} />
            </linearGradient>
          </defs>

          {/* Background arc */}
          <path
            d="M 20 90 A 80 80 0 0 1 180 90"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="12"
            strokeLinecap="round"
          />

          {/* Needle */}
          <motion.g
            animate={{ rotate: rotation }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            style={{ transformOrigin: "100px 90px" }}
          >
            <line
              x1="100"
              y1="90"
              x2="100"
              y2="25"
              stroke={color}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="100" cy="90" r="6" fill={color} />
          </motion.g>
        </svg>

        {/* Labels */}
        <div className="absolute bottom-0 left-0 text-xs text-red-400 font-bold">
          Extreme Fear
        </div>
        <div className="absolute bottom-0 right-0 text-xs text-green-400 font-bold">
          Extreme Greed
        </div>
      </div>

      {/* Value and sentiment */}
      <div className="text-center">
        <motion.div
          key={fearGreedValue}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-5xl font-black mb-2"
          style={{ color }}
        >
          {fearGreedValue}
        </motion.div>
        <div className="text-white font-bold text-lg mb-2">{sentiment}</div>
        <div className="text-neutral-400 text-xs">
          Market sentiment indicator • Updates every 10s
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="grid grid-cols-5 gap-1 text-[10px] text-center">
          <div>
            <div className="w-full h-1 bg-red-500 rounded mb-1"></div>
            <span className="text-neutral-400">0-25</span>
          </div>
          <div>
            <div className="w-full h-1 bg-orange-500 rounded mb-1"></div>
            <span className="text-neutral-400">26-45</span>
          </div>
          <div>
            <div className="w-full h-1 bg-yellow-500 rounded mb-1"></div>
            <span className="text-neutral-400">46-55</span>
          </div>
          <div>
            <div className="w-full h-1 bg-lime-500 rounded mb-1"></div>
            <span className="text-neutral-400">56-75</span>
          </div>
          <div>
            <div className="w-full h-1 bg-green-500 rounded mb-1"></div>
            <span className="text-neutral-400">76-100</span>
          </div>
        </div>
      </div>
    </div>
  );
}

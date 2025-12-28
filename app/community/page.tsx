"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Trade {
  id: string;
  userId: string;
  userName: string;
  userImage: string;
  pair: string;
  direction: "LONG" | "SHORT";
  entry: string;
  exit: string;
  profit: string;
  profitPercent: string;
  chartImage: string;
  aiAnalysis: string;
  timestamp: Date;
  likes: number;
  comments: Comment[];
}

interface Comment {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: Date;
}

export default function CommunityPage() {
  const { data: session } = useSession();
  const [trades, setTrades] = useState<Trade[]>([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);

  // Mock data for demonstration
  useEffect(() => {
    const mockTrades: Trade[] = [
      {
        id: "1",
        userId: "1",
        userName: "CryptoKing",
        userImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=CryptoKing",
        pair: "BTC/USD",
        direction: "LONG",
        entry: "$43,250",
        exit: "$45,800",
        profit: "$2,550",
        profitPercent: "+5.9%",
        chartImage: "/api/placeholder/600/400",
        aiAnalysis: "Strong bullish momentum detected with volume confirmation. Smart money accumulation visible on 4H timeframe. Risk/Reward: 1:3.2",
        timestamp: new Date(Date.now() - 3600000),
        likes: 47,
        comments: [
          {
            id: "1",
            userId: "2",
            userName: "TraderJoe",
            text: "Great entry! I took the same trade 🚀",
            timestamp: new Date(Date.now() - 1800000)
          }
        ]
      },
      {
        id: "2",
        userId: "2",
        userName: "ForexPro",
        userImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=ForexPro",
        pair: "EUR/USD",
        direction: "SHORT",
        entry: "1.0950",
        exit: "1.0815",
        profit: "$1,350",
        profitPercent: "+1.23%",
        chartImage: "/api/placeholder/600/400",
        aiAnalysis: "Bearish divergence on RSI. Price respecting resistance zone. Clear market structure shift to downside.",
        timestamp: new Date(Date.now() - 7200000),
        likes: 32,
        comments: []
      }
    ];
    setTrades(mockTrades);
  }, []);

  const playSound = (type: 'like' | 'share' | 'comment') => {
    // Simple beep using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = type === 'like' ? 800 : type === 'share' ? 600 : 400;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A0A0F] via-[#1a1a2e] to-[#0A0A0F]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.h1
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-5xl md:text-6xl font-black mb-4"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-white to-[#FFA500]">
              Community Trades
            </span>
          </motion.h1>
          <p className="text-xl text-neutral-300 mb-6">
            Share your winning trades and learn from the best traders
          </p>

          {/* Share Trade Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playSound('share');
              setShowShareModal(true);
            }}
            className="px-8 py-4 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-black rounded-xl shadow-2xl shadow-[#FFD700]/50 hover:shadow-[#FFD700]/70 transition-all"
          >
            📤 Share Your Trade
          </motion.button>
        </motion.div>

        {/* Trades Feed */}
        <div className="space-y-6">
          {trades.map((trade, index) => (
            <motion.div
              key={trade.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6 hover:border-white/30 transition-all"
            >
              {/* User Info */}
              <div className="flex items-center gap-4 mb-4">
                <motion.img
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                  src={trade.userImage}
                  alt={trade.userName}
                  className="w-12 h-12 rounded-full border-2 border-[#FFD700]"
                />
                <div>
                  <h3 className="text-lg font-bold text-white">{trade.userName}</h3>
                  <p className="text-sm text-neutral-400">
                    {new Date(trade.timestamp).toLocaleTimeString()} • {new Date(trade.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Trade Details */}
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                {/* Chart Image */}
                <div className="relative group">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="w-full h-64 bg-neutral-900 rounded-xl overflow-hidden border border-white/10"
                  >
                    <img
                      src={trade.chartImage}
                      alt="Trading Chart"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>

                {/* Trade Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-black text-white">{trade.pair}</span>
                    <span className={`px-4 py-2 ${trade.direction === 'LONG' ? 'bg-emerald-500' : 'bg-red-500'} text-white font-bold rounded-full`}>
                      {trade.direction === 'LONG' ? '🚀' : '📉'} {trade.direction}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-4 rounded-xl">
                      <p className="text-xs text-neutral-400 mb-1">Entry</p>
                      <p className="text-lg font-bold text-white">{trade.entry}</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl">
                      <p className="text-xs text-neutral-400 mb-1">Exit</p>
                      <p className="text-lg font-bold text-white">{trade.exit}</p>
                    </div>
                  </div>

                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 border-2 border-emerald-500 p-4 rounded-xl"
                  >
                    <p className="text-sm text-neutral-300 mb-1">Profit</p>
                    <p className="text-3xl font-black text-emerald-400">
                      {trade.profit} <span className="text-xl">({trade.profitPercent})</span>
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* AI Analysis */}
              <div className="bg-gradient-to-r from-[#6366F1]/10 to-[#8B5CF6]/10 border border-[#6366F1]/30 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🤖</span>
                  <span className="font-bold text-[#6366F1]">AI Analysis</span>
                </div>
                <p className="text-neutral-300">{trade.aiAnalysis}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => playSound('like')}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full transition-all"
                >
                  <span className="text-xl">❤️</span>
                  <span className="font-bold text-white">{trade.likes}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    playSound('comment');
                    setSelectedTrade(trade);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full transition-all"
                >
                  <span className="text-xl">💬</span>
                  <span className="font-bold text-white">{trade.comments.length}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => playSound('share')}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full transition-all"
                >
                  <span className="text-xl">🔗</span>
                  <span className="font-bold text-white">Share</span>
                </motion.button>
              </div>

              {/* Comments */}
              {trade.comments.length > 0 && (
                <div className="mt-4 space-y-2">
                  {trade.comments.map((comment) => (
                    <div key={comment.id} className="bg-white/5 rounded-lg p-3">
                      <p className="font-bold text-white text-sm">{comment.userName}</p>
                      <p className="text-neutral-300 text-sm">{comment.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Share Trade Modal */}
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-3xl border border-[#FFD700] p-8 max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-3xl font-black text-white mb-6">Share Your Trade 📤</h2>
              <p className="text-neutral-300 mb-6">
                Upload your chart screenshot and our AI will analyze it automatically!
              </p>
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-4 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-black rounded-xl"
                >
                  Go to AI Analyzer →
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </main>
  );
}

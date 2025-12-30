"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function UniversityPage() {
  const { data: session } = useSession();
  const [userPoints, setUserPoints] = useState(0);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    const points = localStorage.getItem('tradingxbert_points');
    setUserPoints(parseInt(points || '0'));
    
    // Check Pro status from API (includes admin whitelist)
    fetch('/api/validate-subscription')
      .then(res => res.json())
      .then(data => {
        setIsPro(data.isPro);
        // Sync to localStorage
        if (data.isPro) {
          localStorage.setItem('tradingxbert_pro', 'true');
        } else {
          localStorage.removeItem('tradingxbert_pro');
        }
      })
      .catch(() => setIsPro(false));
  }, []);

  const courses = [
    {
      id: 1,
      title: "Getting Started with Trading",
      icon: "🚀",
      value: "$97",
      duration: "2.5 hours",
      level: "Beginner",
      color: "from-blue-500 to-cyan-500",
      slug: "getting-started",
      lessonsCount: 6,
      description: "Master the fundamentals and start your trading journey"
    },
    {
      id: 2,
      title: "How to Spot Good Trades",
      icon: "🎯",
      value: "$147",
      duration: "3.5 hours",
      level: "Intermediate",
      color: "from-emerald-500 to-teal-500",
      slug: "spot-good-trades",
      lessonsCount: 8,
      description: "Learn to identify high-probability trading setups"
    },
    {
      id: 3,
      title: "Risk Management Masterclass",
      icon: "🛡️",
      value: "$197",
      duration: "4 hours",
      level: "Essential",
      color: "from-orange-500 to-red-500",
      slug: "risk-management",
      lessonsCount: 10,
      description: "Protect your capital and trade with confidence"
    },
    {
      id: 4,
      title: "Advanced Chart Analysis",
      icon: "📊",
      value: "$247",
      duration: "5 hours",
      level: "Advanced",
      color: "from-purple-500 to-pink-500",
      slug: "advanced-analysis",
      lessonsCount: 12,
      description: "Master technical analysis like a professional trader"
    },
    {
      id: 5,
      title: "Trading Psychology",
      icon: "🧠",
      value: "$127",
      duration: "3.5 hours",
      level: "Essential",
      color: "from-indigo-500 to-purple-500",
      slug: "psychology",
      lessonsCount: 9,
      description: "Control emotions and develop a winning mindset"
    },
    {
      id: 6,
      title: "Using AI for Trading",
      icon: "🤖",
      value: "$297",
      duration: "4 hours",
      level: "Advanced",
      color: "from-yellow-500 to-orange-500",
      slug: "ai-trading",
      lessonsCount: 10,
      description: "Leverage AI technology for better trading decisions"
    },
    {
      id: 7,
      title: "Market Structure & Smart Money",
      icon: "💎",
      value: "$247",
      duration: "4.5 hours",
      level: "Advanced",
      color: "from-cyan-500 to-blue-500",
      slug: "smart-money",
      lessonsCount: 11,
      description: "Trade like institutions and follow smart money"
    },
    {
      id: 8,
      title: "Complete Crypto Trading",
      icon: "₿",
      value: "$197",
      duration: "5 hours",
      level: "Intermediate",
      color: "from-amber-500 to-yellow-500",
      slug: "crypto-trading",
      lessonsCount: 13,
      description: "Master cryptocurrency markets and DeFi trading"
    },
    {
      id: 9,
      title: "Scalping & Day Trading",
      icon: "⚡",
      value: "$297",
      duration: "6 hours",
      level: "Advanced",
      color: "from-rose-500 to-pink-500",
      slug: "scalping",
      lessonsCount: 15,
      description: "Quick trades, fast profits - master intraday trading"
    },
    {
      id: 10,
      title: "Swing Trading Mastery",
      icon: "🌊",
      value: "$177",
      duration: "4 hours",
      level: "Intermediate",
      color: "from-teal-500 to-emerald-500",
      slug: "swing-trading",
      lessonsCount: 10,
      description: "Catch major market swings and maximize profits"
    }
  ];

  const totalValue = courses.reduce((sum, course) => sum + parseInt(course.value.replace(/[$,]/g, "")), 0);
  const totalLessons = courses.reduce((sum, course) => sum + course.lessonsCount, 0);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A0A0F] via-[#1a1a2e] to-[#0A0A0F] relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [1000, -100], opacity: [0, 0.5, 0] }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, delay: i * 0.5 }}
            className="absolute w-1 h-20 bg-gradient-to-b from-transparent via-[#FFD700]/30 to-transparent"
            style={{ left: `${(i * 5) % 100}%`, top: 0 }}
          />
        ))}
      </div>

      {/* Floating Orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="fixed top-20 right-20 w-96 h-96 bg-[#FFD700]/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="fixed bottom-20 left-20 w-96 h-96 bg-[#FFA500]/20 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Points Display */}
        {userPoints > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="fixed top-24 right-8 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black px-6 py-3 rounded-full font-black text-lg shadow-2xl z-50"
          >
            🏆 {userPoints} Points
          </motion.div>
        )}

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-8xl md:text-9xl mb-6"
          >
            🎓
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-white to-[#FFA500]">
              TradingXbert
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#6366F1] to-[#8B5CF6]">
              University
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <p className="text-xl md:text-3xl text-neutral-300 mb-6 max-w-4xl mx-auto">
              Master Trading from Zero to Hero — <span className="text-[#FFD700] font-bold">Included with Pro</span>
            </p>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 border-2 border-[#FFD700] rounded-2xl"
            >
              <p className="text-3xl md:text-4xl font-black text-white mb-2">
                Total Value: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500]">${totalValue.toLocaleString()}</span>
              </p>
              <p className="text-lg md:text-xl text-emerald-400 font-bold">
                ✨ Included with Pro - Only $6.99/mo ✨
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 text-sm md:text-base"
          >
            {[
              `${courses.length} Courses`,
              `${totalLessons}+ Lessons`,
              "40+ Hours Content",
              "Earn Points & Badges",
              "Track Progress",
              "Lifetime Access"
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="px-6 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#FFD700]/50 transition-all"
              >
                <span className="text-neutral-200">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Courses Grid */}
        <div className="relative">
          {/* Paywall Overlay for Non-Pro Users */}
          {!isPro && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 z-40 flex items-center justify-center backdrop-blur-sm bg-black/60"
            >
              <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] p-12 rounded-3xl border-2 border-[#FFD700] max-w-2xl mx-4 text-center shadow-2xl"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-8xl mb-6"
                >
                  🔒
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
                  Unlock All Courses
                </h2>
                <p className="text-xl text-neutral-300 mb-8">
                  Get instant access to all 10 premium courses, AI trade signals, real-time notifications, and more!
                </p>
                <div className="bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-2xl p-6 mb-8">
                  <p className="text-3xl font-black text-[#FFD700] mb-2">
                    $2,024 Value
                  </p>
                  <p className="text-5xl font-black text-white mb-2">
                    Only $6.99<span className="text-2xl text-neutral-400">/month</span>
                  </p>
                  <p className="text-sm text-neutral-400">
                    Cancel anytime • 7-day money-back guarantee
                  </p>
                </div>
                <Link href="/pricing">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-8 py-4 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-black text-xl rounded-xl shadow-lg shadow-[#FFD700]/50 hover:shadow-[#FFD700]/80 transition-all"
                  >
                    Upgrade to Pro Now 🚀
                  </motion.button>
                </Link>
                <p className="text-sm text-neutral-400 mt-4">
                  ✨ Specialized AI for Trading Only • Not a Generalist Like ChatGPT
                </p>
              </motion.div>
            </motion.div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {courses.map((course, index) => (
              <Link 
                key={course.id} 
                href={isPro ? `/university/${course.slug}` : "/pricing"}
                className={!isPro ? "pointer-events-none" : ""}
              >
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: isPro ? 1.05 : 1, y: isPro ? -10 : 0 }}
                  className="relative group cursor-pointer"
                >
                <div className={`absolute inset-0 bg-gradient-to-r ${course.color} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 rounded-3xl`} />
                
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl border border-white/10 hover:border-white/30 p-6 h-full transition-all duration-300 overflow-hidden">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-r ${course.color} opacity-20 blur-2xl`}
                  />

                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      className="text-6xl mb-4"
                    >
                      {course.icon}
                    </motion.div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-3 py-1 bg-gradient-to-r ${course.color} text-white text-xs font-bold rounded-full`}>
                        {course.level}
                      </span>
                      <span className="text-xs text-neutral-400">{course.duration}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3">{course.title}</h3>
                    <p className="text-sm text-neutral-400 mb-4">{course.description}</p>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl font-black text-neutral-500 line-through">{course.value}</span>
                      <motion.span
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-2xl font-black text-emerald-400"
                      >
                        {isPro ? "UNLOCKED" : "LOCKED"}
                      </motion.span>
                    </div>

                    <p className="text-sm text-neutral-400 mb-4">
                      📚 {course.lessonsCount} lessons
                    </p>

                    <motion.div
                      whileHover={{ scale: isPro ? 1.05 : 1 }}
                      whileTap={{ scale: isPro ? 0.95 : 1 }}
                      className={`w-full py-3 bg-gradient-to-r ${course.color} text-white font-bold rounded-xl text-center hover:shadow-lg hover:shadow-white/20 transition-all ${!isPro ? 'opacity-50' : ''}`}
                    >
                      {isPro ? "Start Learning →" : "🔒 Pro Only"}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-[#6366F1]/20 via-[#8B5CF6]/20 to-[#EC4899]/20 backdrop-blur-xl rounded-3xl border border-[#6366F1]/30 p-12"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-6"
          >
            🚀
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-neutral-300 mb-8">
            Join thousands of traders mastering the markets with our free courses
          </p>
          <Link href="/university/getting-started">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black text-xl font-black rounded-2xl shadow-2xl shadow-[#FFD700]/50 hover:shadow-[#FFD700]/70 transition-all"
            >
              Start First Course →
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}

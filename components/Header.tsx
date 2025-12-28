// /components/Header.tsx
"use client";



























































































































































































































































































































































































































































































}  );    </main>      </div>        </motion.div>          </Link>            </motion.button>              Start Trading with AI →            >              className="px-12 py-5 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black text-xl font-black rounded-2xl shadow-2xl shadow-[#FFD700]/50 hover:shadow-[#FFD700]/70 transition-all"              whileTap={{ scale: 0.95 }}              whileHover={{ scale: 1.1 }}            <motion.button          <Link href="/">          </p>            Join thousands of traders mastering the markets with our free courses          <p className="text-xl text-neutral-300 mb-8">          </h2>            Ready to Start Learning?          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">          </motion.div>            🚀          >            className="text-6xl mb-6"            }}              repeat: Infinity,              duration: 2,            transition={{            }}              rotate: [0, 10, -10, 0],            animate={{          <motion.div        >          className="text-center bg-gradient-to-r from-[#6366F1]/20 via-[#8B5CF6]/20 to-[#EC4899]/20 backdrop-blur-xl rounded-3xl border border-[#6366F1]/30 p-12"          viewport={{ once: true }}          whileInView={{ opacity: 1, scale: 1 }}          initial={{ opacity: 0, scale: 0.9 }}        <motion.div        {/* CTA Section */}        </div>          ))}            </motion.div>              </div>                </div>                  </motion.div>                    </div>                      ))}                        </motion.div>                          <span>{lesson}</span>                          <span className="text-emerald-400 mt-0.5">✓</span>                        >                          className="flex items-start gap-2 text-sm text-neutral-300 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-all"                          transition={{ delay: i * 0.05 }}                          animate={{ x: 0, opacity: 1 }}                          initial={{ x: -20, opacity: 0 }}                          key={i}                        <motion.div                      {course.lessons.map((lesson, i) => (                    <div className="mt-4 space-y-2">                  >                    className="overflow-hidden"                    transition={{ duration: 0.3 }}                    }}                      opacity: expandedModule === course.id ? 1 : 0,                      height: expandedModule === course.id ? "auto" : 0,                    animate={{                    initial={false}                  <motion.div                  {/* Lessons Dropdown */}                  </motion.button>                    {expandedModule === course.id ? "Hide Lessons" : "View Lessons"}                  >                    className={`w-full py-3 bg-gradient-to-r ${course.color} text-white font-bold rounded-xl hover:shadow-lg hover:shadow-white/20 transition-all`}                    whileTap={{ scale: 0.95 }}                    whileHover={{ scale: 1.05 }}                    onClick={() => setExpandedModule(expandedModule === course.id ? null : course.id)}                  <motion.button                  </p>                    {course.lessons.length} comprehensive lessons                  <p className="text-sm text-neutral-400 mb-4">                  </div>                    </motion.span>                      FREE                    >                      className="text-2xl font-black text-emerald-400"                      transition={{ duration: 2, repeat: Infinity }}                      animate={{ scale: [1, 1.1, 1] }}                    <motion.span                    <span className="text-2xl font-black text-neutral-500 line-through">{course.value}</span>                  <div className="flex items-center gap-2 mb-4">                  <h3 className="text-2xl font-bold text-white mb-3">{course.title}</h3>                  </div>                    <span className="text-xs text-neutral-400">{course.duration}</span>                    </span>                      {course.level}                    <span className={`px-3 py-1 bg-gradient-to-r ${course.color} text-white text-xs font-bold rounded-full`}>                  <div className="flex items-center gap-2 mb-3">                  </motion.div>                    {course.icon}                  >                    className="text-6xl mb-4"                    transition={{ duration: 0.6 }}                    whileHover={{ rotate: 360, scale: 1.2 }}                  <motion.div                <div className="relative z-10">                />                  className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-r ${course.color} opacity-20 blur-2xl`}                  }}                    ease: "linear",                    repeat: Infinity,                    duration: 20,                  transition={{                  }}                    rotate: [0, 360],                  animate={{                <motion.div                {/* Animated corner accent */}              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl border border-white/10 hover:border-white/30 p-6 h-full transition-all duration-300 overflow-hidden">                            <div className={`absolute inset-0 bg-gradient-to-r ${course.color} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 rounded-3xl`} />            >              className="relative group"              whileHover={{ scale: 1.05, y: -10 }}              transition={{ duration: 0.5, delay: index * 0.1 }}              viewport={{ once: true }}              whileInView={{ opacity: 1, y: 0 }}              initial={{ opacity: 0, y: 50 }}              key={course.id}            <motion.div          {courses.map((course, index) => (        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">        {/* Courses Grid */}        </motion.div>          </motion.div>            ))}              </motion.div>                <span className="text-neutral-200">{item}</span>              >                className="px-6 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#FFD700]/50 transition-all"                whileHover={{ scale: 1.1, rotate: 5 }}                key={i}              <motion.div            {["10+ Courses", "30+ Hours Content", "100+ Lessons", "Lifetime Access"].map((item, i) => (          >            className="flex flex-wrap justify-center gap-4 text-sm md:text-base"            transition={{ duration: 0.8, delay: 0.6 }}            animate={{ opacity: 1 }}            initial={{ opacity: 0 }}          <motion.div          </motion.div>            </motion.div>              </p>                ✨ Yours Absolutely FREE ✨              <p className="text-lg md:text-xl text-emerald-400 font-bold">              </p>                Total Value: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500]">${totalValue.toLocaleString()}</span>              <p className="text-3xl md:text-4xl font-black text-white mb-2">            >              className="inline-block px-8 py-4 bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 border-2 border-[#FFD700] rounded-2xl"              }}                repeat: Infinity,                duration: 2,              transition={{              }}                scale: [1, 1.05, 1],              animate={{            <motion.div            </p>              Master Trading from Zero to Hero — Completely <span className="text-[#FFD700] font-bold">FREE</span>            <p className="text-xl md:text-3xl text-neutral-300 mb-6 max-w-4xl mx-auto">          >            className="mb-8"            transition={{ duration: 0.8, delay: 0.4 }}            animate={{ opacity: 1, y: 0 }}            initial={{ opacity: 0, y: 20 }}          <motion.div          </motion.h1>            </span>              University            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#6366F1] to-[#8B5CF6]">            <br />            </span>              TradingXbert            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-white to-[#FFA500]">          >            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6"            transition={{ duration: 0.8, delay: 0.2 }}            animate={{ opacity: 1, scale: 1 }}            initial={{ opacity: 0, scale: 0.9 }}          <motion.h1          </motion.div>            🎓          >            className="text-8xl md:text-9xl mb-6"            }}              repeat: Infinity,              duration: 3,            transition={{            }}              scale: [1, 1.1, 1],              rotate: [0, 10, -10, 0],            animate={{          <motion.div        >          className="text-center mb-20"          transition={{ duration: 0.8 }}          animate={{ opacity: 1, y: 0 }}          initial={{ opacity: 0, y: 30 }}        <motion.div        {/* Hero Section */}      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">      />        className="fixed bottom-20 left-20 w-96 h-96 bg-[#FFA500]/20 rounded-full blur-3xl pointer-events-none"        }}          repeat: Infinity,          duration: 10,        transition={{        }}          opacity: [0.3, 0.6, 0.3],          scale: [1.2, 1, 1.2],        animate={{      <motion.div      />        className="fixed top-20 right-20 w-96 h-96 bg-[#FFD700]/20 rounded-full blur-3xl pointer-events-none"        }}          repeat: Infinity,          duration: 8,        transition={{        }}          opacity: [0.3, 0.6, 0.3],          scale: [1, 1.2, 1],        animate={{      <motion.div      {/* Floating Orbs */}      </div>        ))}          />            }}              top: "100%",              left: `${(i * 5) % 100}%`,            style={{            className="absolute w-1 h-20 bg-gradient-to-b from-transparent via-[#FFD700]/30 to-transparent"            }}              delay: i * 0.5,              repeat: Infinity,              duration: 10 + i * 2,            transition={{            }}              opacity: [0, 0.5, 0],              y: [0, -1000],            animate={{            key={i}          <motion.div        {[...Array(20)].map((_, i) => (      <div className="fixed inset-0 pointer-events-none">      {/* Animated Background Elements */}    <main className="min-h-screen bg-gradient-to-b from-[#0A0A0F] via-[#1a1a2e] to-[#0A0A0F] relative overflow-hidden">  return (  }, 0);    return sum + parseInt(course.value.replace(/[$,]/g, ""));  const totalValue = courses.reduce((sum, course) => {  ];    }      ]        "Long-Term Position Building"        "Best Pairs for Swinging",        "Swing Trading Indicators",        "Multi-Day Trade Management",        "Weekly Market Planning",        "Position Holding Strategies",        "4-Hour & Daily Chart Analysis",        "Swing Trading Principles",      lessons: [      color: "from-teal-500 to-emerald-500",      level: "Intermediate",      duration: "4 hours",      value: "$1,697",      icon: "🌊",      title: "Swing Trading Mastery",      id: 10,    {    },      ]        "Best Trading Hours"        "Risk Management for Scalpers",        "News Trading Strategies",        "Momentum Trading",        "High-Frequency Trading Setup",        "Quick Entry/Exit Techniques",        "1-Minute & 5-Minute Strategies",        "Scalping Fundamentals",      lessons: [      color: "from-rose-500 to-pink-500",      level: "Advanced",      duration: "6 hours",      value: "$2,297",      icon: "⚡",      title: "Scalping & Day Trading",      id: 9,    {    },      ]        "Tax Implications"        "Security and Wallet Management",        "Crypto Portfolio Building",        "NFT Market Understanding",        "DeFi Trading Strategies",        "On-Chain Analysis",        "Bitcoin & Altcoin Analysis",        "Crypto Market Fundamentals",      lessons: [      color: "from-amber-500 to-yellow-500",      level: "Intermediate",      duration: "5 hours",      value: "$1,797",      icon: "₿",      title: "Complete Crypto Trading",      id: 8,    {    },      ]        "Institutional Order Flow"        "Smart Money Trading Strategy",        "Liquidity Pools and Sweeps",        "Fair Value Gaps (FVG)",        "Order Blocks Identification",        "Change of Character (CHoCH)",        "Break of Structure (BOS)",        "Understanding Market Structure",      lessons: [      color: "from-cyan-500 to-blue-500",      level: "Advanced",      duration: "4.5 hours",      value: "$1,997",      icon: "💎",      title: "Market Structure & Smart Money",      id: 7,    {    },      ]        "Future of AI Trading"        "AI Trading Signals",        "Backtesting with AI",        "AI Risk Assessment",        "Automated Pattern Detection",        "TradingXbert AI Features",        "Machine Learning in Trading",        "AI-Powered Chart Analysis",      lessons: [      color: "from-yellow-500 to-orange-500",      level: "Advanced",      duration: "4 hours",      value: "$2,497",      icon: "🤖",      title: "Using AI for Trading",      id: 6,    {    },      ]        "Mental Performance Optimization"        "Stress Management Techniques",        "Patience and Timing",        "Dealing with Losses",        "Building Winning Mindset",        "Managing Trading Emotions",        "Discipline and Consistency",        "Overcoming FOMO and Fear",      lessons: [      color: "from-indigo-500 to-purple-500",      level: "Essential",      duration: "3.5 hours",      value: "$1,297",      icon: "🧠",      title: "Trading Psychology",      id: 5,    {    },      ]        "Advanced Technical Indicators"        "Multi-Timeframe Analysis",        "Institutional Trading Patterns",        "Smart Money Concepts",        "Order Flow Analysis",        "Fibonacci Retracements & Extensions",        "Elliott Wave Theory",        "Advanced Pattern Recognition",      lessons: [      color: "from-purple-500 to-pink-500",      level: "Advanced",      duration: "5 hours",      value: "$1,997",      icon: "📊",      title: "Advanced Chart Analysis",      id: 4,    {    },      ]        "Account Protection Strategies"        "Emotional Risk Control",        "Money Management Rules",        "Drawdown Recovery Plans",        "Portfolio Management",        "Risk-to-Reward Ratios",        "Stop Loss Placement Techniques",        "Position Sizing Strategies",      lessons: [      color: "from-orange-500 to-red-500",      level: "Essential",      duration: "4 hours",      value: "$1,497",      icon: "🛡️",      title: "Risk Management Masterclass",      id: 3,    {    },      ]        "Confluence Trading Strategy"        "Entry and Exit Timing",        "Market Structure Analysis",        "Price Action Secrets",        "Volume Profile Reading",        "Trend Analysis Techniques",        "Support and Resistance Mastery",        "Identifying High-Probability Setups",      lessons: [      color: "from-emerald-500 to-teal-500",      level: "Intermediate",      duration: "3 hours",      value: "$997",      icon: "🎯",      title: "How to Spot Good Trades",      id: 2,    {    },      ]        "Understanding Candlestick Patterns"        "How to Read Price Charts",        "Essential Trading Terminology",        "Setting Up Your First Trading Account",        "Types of Markets (Forex, Crypto, Stocks)",        "Understanding Market Basics",      lessons: [      color: "from-blue-500 to-cyan-500",      level: "Beginner",      duration: "2 hours",      value: "$497",      icon: "🚀",      title: "Getting Started with Trading",      id: 1,    {  const courses = [  const [expandedModule, setExpandedModule] = useState<number | null>(null);export default function UniversityPage() {import { useState } from "react";import Link from "next/link";import { motion } from "framer-motion";import Link from "next/link";
import { useSession } from "next-auth/react";
import SignInButton from "./SignInButton";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="w-full flex items-center justify-between px-4 py-4 max-w-7xl mx-auto border-b border-white/5 backdrop-blur-lg bg-black/50 sticky top-0 z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FFA500] blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
          <div className="relative text-3xl md:text-4xl">📊</div>
        </div>
        <div>
          <div className="font-black text-lg md:text-2xl tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500]">
              TradingXbert
            </span>
          </div>
          <div className="text-[8px] md:text-[10px] text-neutral-500 font-medium tracking-wider">
            AI CHART ANALYSIS
          </div>
        </div>
      </Link>

      {/* Nav */}
      <nav className="flex items-center gap-2 md:gap-4 flex-shrink-0">
        <Link 
          href="/university" 
          className="flex items-center gap-1.5 px-3 md:px-4 py-2 text-xs md:text-sm text-neutral-300 hover:text-[#FFD700] transition-all rounded-lg hover:bg-gradient-to-r hover:from-[#FFD700]/10 hover:to-[#FFA500]/10 border border-transparent hover:border-[#FFD700]/30"
        >
          <span className="text-base md:text-lg">🎓</span>
          <span className="hidden sm:inline font-semibold">Free University</span>
          <span className="sm:hidden font-semibold">Uni</span>
        </Link>
        
        {session && (
          <Link 
            href="/profile" 
            className="flex items-center gap-1.5 px-3 py-2 text-xs md:text-sm text-neutral-300 hover:text-[#FFD700] transition-colors rounded-lg hover:bg-white/5"
          >
            <span className="text-base">👤</span>
            <span className="hidden md:inline">Profile</span>
          </Link>
        )}
        
        <Link 
          href="/pricing" 
          className="relative group px-3 md:px-4 py-2 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold text-xs md:text-sm rounded-lg overflow-hidden hover:scale-105 transition-transform shadow-lg shadow-[#FFD700]/20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFA500] to-[#FFD700] opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative flex items-center gap-1.5">
            <span className="text-base">⚡</span>
            <span className="hidden sm:inline">Pro</span>
          </span>
        </Link>
        
        <div className="text-xs md:text-base">
          <SignInButton />
        </div>
      </nav>
    </header>
  );
}

"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const FreeCourse = () => {
  const courses = [
    {
      title: "1. Getting Started with Trading",
      description: "Learn the fundamentals of trading, market types, and basic terminology. Perfect for absolute beginners.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
      slug: "getting-started",
      duration: "45 min",
      difficulty: "Beginner",
      lessons: 6
    },
    {
      title: "2. How to Spot Good Trades",
      description: "Master chart patterns, support/resistance, and entry timing. Identify high-probability setups like a pro.",
      image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=600&h=400&fit=crop",
      slug: "spot-good-trades",
      duration: "60 min",
      difficulty: "Intermediate",
      lessons: 8
    },
    {
      title: "3. Risk Management Mastery",
      description: "Protect your capital with professional risk management. Position sizing, stop losses, and portfolio management.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      slug: "risk-management",
      duration: "50 min",
      difficulty: "Intermediate",
      lessons: 7
    },
    {
      title: "4. Using AI for Trading",
      description: "Leverage TradingXbert AI to analyze charts, optimize indicators, and make data-driven decisions.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      slug: "using-ai",
      duration: "40 min",
      difficulty: "All Levels",
      lessons: 5
    },
    {
      title: "5. Advanced Technical Analysis",
      description: "Deep dive into advanced indicators, multi-timeframe analysis, and institutional order flow.",
      image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=600&h=400&fit=crop",
      slug: "advanced-analysis",
      duration: "70 min",
      difficulty: "Advanced",
      lessons: 9
    },
    {
      title: "6. Trading Psychology",
      description: "Master your emotions, develop discipline, and build the winning mindset of professional traders.",
      image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=600&h=400&fit=crop",
      slug: "psychology",
      duration: "55 min",
      difficulty: "All Levels",
      lessons: 7
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A0A0F] via-[#1a1a2e] to-[#0A0A0F]">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-24 px-4 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1]/10 to-[#3B82F6]/10"></div>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6366F1]/20 rounded-full blur-3xl"
        ></motion.div>
        
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-bold mb-6"
          >
            🎓 100% FREE • NO SIGNUP REQUIRED
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-[#6366F1] to-[#3B82F6] bg-clip-text text-transparent"
          >
            Free Trading Academy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-2xl text-neutral-300 max-w-3xl mx-auto mb-8"
          >
            Master trading from beginner to advanced. Complete professional course covering technical analysis, risk management, and AI-powered trading strategies.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 text-neutral-400"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">📚</span>
              <span>6 Comprehensive Courses</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⏱️</span>
              <span>5+ Hours of Content</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              <span>42 Lessons Total</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8"
          >
            <Link 
              href="/university"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-black text-lg rounded-full hover:scale-105 transition-all shadow-lg shadow-[#FFD700]/20"
            >
              <span className="text-2xl">🎓</span>
              <span>Full University (Pro Members Only)</span>
              <span className="text-2xl">🔒</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Course Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/how-to-trade/${course.slug}`}>
                <div className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[#6366F1]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#6366F1]/20 cursor-pointer h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={course.image}
                      alt={course.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 px-3 py-1 bg-black/80 backdrop-blur-sm rounded-full text-xs font-bold text-white">
                      {course.duration}
                    </div>
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${
                      course.difficulty === 'Beginner' ? 'bg-emerald-500/90 text-white' :
                      course.difficulty === 'Intermediate' ? 'bg-[#6366F1]/90 text-white' :
                      course.difficulty === 'Advanced' ? 'bg-blue-500/90 text-white' :
                      'bg-yellow-500/90 text-black'
                    }`}>
                      {course.difficulty}
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#6366F1] transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-neutral-400 mb-4 flex-1">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-neutral-500 text-sm">{course.lessons} Lessons</span>
                      <motion.span 
                        className="text-[#6366F1] font-bold flex items-center gap-2"
                        whileHover={{ x: 5 }}
                      >
                        Start Course →
                      </motion.span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* What You'll Learn */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 py-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">
          What You'll Master
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: "📊", title: "Chart Reading", desc: "Interpret candlesticks, patterns, and trends" },
            { icon: "🎯", title: "Entry & Exit Timing", desc: "Perfect your trade timing and execution" },
            { icon: "🛡️", title: "Risk Management", desc: "Protect capital with professional strategies" },
            { icon: "🤖", title: "AI Integration", desc: "Use TradingXbert for smarter decisions" },
            { icon: "📈", title: "Technical Indicators", desc: "Master RSI, MACD, EMA, and more" },
            { icon: "💰", title: "Position Sizing", desc: "Calculate optimal trade sizes" },
            { icon: "🧠", title: "Trading Psychology", desc: "Control emotions and stay disciplined" },
            { icon: "⚡", title: "Market Analysis", desc: "Analyze multiple timeframes effectively" }
          ].map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] p-6 rounded-xl border border-white/10 text-center hover:border-[#6366F1]/50 transition-all"
            >
              <div className="text-5xl mb-4">{skill.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2">{skill.title}</h3>
              <p className="text-neutral-400 text-sm">{skill.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-4 py-16 text-center"
      >
        <div className="bg-gradient-to-r from-[#6366F1]/20 to-[#3B82F6]/20 p-12 rounded-3xl border border-[#6366F1]/30">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Become a Professional Trader?
          </h2>
          <p className="text-xl text-neutral-300 mb-8">
            Start with Course #1 and work your way through the complete curriculum
          </p>
          <Link href="/how-to-trade/getting-started">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-[#6366F1] to-[#3B82F6] text-white font-bold rounded-xl text-lg hover:shadow-xl hover:shadow-[#6366F1]/50 transition-all"
            >
              Start Learning Now →
            </motion.button>
          </Link>
        </div>
      </motion.section>
    </main>
  );
};

export default FreeCourse;

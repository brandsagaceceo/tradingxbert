"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const blogPosts = [
  {
    id: 1,
    title: "The Ultimate Guide to Chart Patterns Every Trader Must Master in 2025",
    description: "Master these proven technical analysis patterns to predict market movements with 85% accuracy. Deep dive into head & shoulders, triangles, flags, and more.",
    slug: "chart-patterns-guide",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop",
    readTime: "25 min read",
    category: "Technical Analysis",
    date: "Dec 7, 2025"
  },
  {
    id: 2,
    title: "How AI is Revolutionizing Trading in 2025: The Complete Guide",
    description: "Discover how artificial intelligence and machine learning are transforming trading strategies. Learn to leverage AI tools for 10x better trading decisions.",
    slug: "ai-trading-revolution",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    readTime: "18 min read",
    category: "AI Trading",
    date: "Dec 6, 2025"
  },
  {
    id: 3,
    title: "Risk Management Mastery: How Professional Traders Protect Capital",
    description: "The definitive guide to risk management that separates profitable traders from the rest. Position sizing, stop losses, and portfolio protection strategies.",
    slug: "risk-management-mastery",
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&h=400&fit=crop",
    readTime: "20 min read",
    category: "Risk Management",
    date: "Dec 5, 2025"
  },
  {
    id: 4,
    title: "Scalping Strategies for 2025: Make Money in Minutes",
    description: "Advanced scalping techniques used by professional day traders. Learn the setups, indicators, and psychology needed for consistent scalping profits.",
    slug: "scalping-strategies",
    image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800&h=400&fit=crop",
    readTime: "22 min read",
    category: "Day Trading",
    date: "Dec 4, 2025"
  },
  {
    id: 5,
    title: "Cryptocurrency Trading in 2025: Navigate the Bull Market",
    description: "Everything you need to know about trading crypto in 2025. Market cycles, top altcoins, DeFi opportunities, and risk management for volatile markets.",
    slug: "crypto-trading-2025",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=400&fit=crop",
    readTime: "24 min read",
    category: "Cryptocurrency",
    date: "Dec 3, 2025"
  },
  {
    id: 6,
    title: "Trading Psychology: Master Your Mind, Master the Markets",
    description: "The mental game of trading revealed. Overcome fear, greed, and emotional trading. Build the psychological foundation for consistent profitability.",
    slug: "trading-psychology",
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&h=400&fit=crop",
    readTime: "19 min read",
    category: "Psychology",
    date: "Dec 2, 2025"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      
    }
  }
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A0A0F] via-[#1a1a2e] to-[#0A0A0F]">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative py-20 px-4 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1]/10 to-[#8B5CF6]/10"></div>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
              ease: [0.42, 0, 0.58, 1]
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#6366F1]/20 rounded-full blur-3xl"
        ></motion.div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent"
          >
            TradingXbert Trading Academy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-neutral-300 mb-4"
          >
            Master the markets with professional insights, proven strategies, and cutting-edge analysis
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-sm text-[#6366F1] font-semibold"
          >
            📈 {blogPosts.length} In-Depth Guides • 🎯 Proven Strategies • 🚀 Real Results
          </motion.p>
        </div>
      </motion.div>

      {/* Blog Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl overflow-hidden border border-white/10 hover:border-[#6366F1]/50 transition-all duration-300 shadow-lg hover:shadow-[#6366F1]/20 hover:shadow-2xl"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
                    className="w-full h-full"
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent opacity-60"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-semibold bg-[#6366F1] text-white rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-neutral-400 mb-3">
                    <span className="flex items-center gap-1">
                      📅 {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      ⏱️ {post.readTime}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[#6366F1] transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-sm text-neutral-400 mb-4 line-clamp-3">
                    {post.description}
                  </p>

                  <div className="flex items-center text-[#6366F1] font-semibold text-sm group-hover:gap-2 transition-all">
                    Read Full Article
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
                    >
                      →
                    </motion.span>
                  </div>
                </div>

                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at center, rgba(99, 102, 241, 0.1), transparent 70%)"
                  }}
                ></motion.div>
              </Link>
            </motion.article>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="max-w-4xl mx-auto px-4 py-20 text-center"
      >
        <div className="bg-gradient-to-r from-[#6366F1]/10 to-[#8B5CF6]/10 rounded-3xl p-12 border border-[#6366F1]/20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Trading?
          </h2>
          <p className="text-neutral-300 mb-8 max-w-2xl mx-auto">
            Join thousands of traders using TradingXbert's AI-powered analysis to make smarter trading decisions
          </p>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-bold rounded-full hover:shadow-lg hover:shadow-[#6366F1]/50 transition-all"
            >
              Start Analyzing Charts Now
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
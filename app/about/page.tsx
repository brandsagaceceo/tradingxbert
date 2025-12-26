"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A0A0F] via-[#1a1a2e] to-[#0A0A0F]">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
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
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#6366F1]/20 rounded-full blur-3xl"
        ></motion.div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent"
          >
            About TradingXbert
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-neutral-300 max-w-2xl mx-auto"
          >
            AI-Powered Trading Analysis for the Modern Trader
          </motion.p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* What We Do */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">What We Do</h2>
              <p className="text-lg text-neutral-300 mb-6 leading-relaxed">
                TradingXbert provides <span className="text-[#6366F1] font-bold">fast, AI-powered chart analysis</span> across Crypto, Forex, Stocks, and Indices. Whether you paste a token address or upload a chart image, you get a professional analysis card in seconds.
              </p>
              <p className="text-neutral-400 leading-relaxed">
                Our platform combines cutting-edge artificial intelligence with proven technical analysis methods to give you actionable insights that help you make better trading decisions.
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative h-80 rounded-2xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop"
                alt="Trading Analysis"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent"></div>
            </motion.div>
          </div>
        </motion.section>

        {/* How It Works */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-white mb-12 text-center">How Metrics Are Computed</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🔍",
                title: "Data Collection",
                desc: "Market data is fetched from public APIs like DexScreener and Birdeye in real-time"
              },
              {
                icon: "🤖",
                title: "AI Analysis",
                desc: "OpenAI (GPT-4) generates verdicts using strict JSON prompts for consistency"
              },
              {
                icon: "📊",
                title: "Risk Scoring",
                desc: "Risk, hype, and liquidity are scored 1-10 based on comprehensive data analysis"
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] p-8 rounded-2xl border border-white/10 hover:border-[#6366F1]/50 transition-all"
              >
                <div className="text-5xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-neutral-400">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Features Grid */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Why Traders Choose TradingXbert</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "⚡", title: "Instant Analysis", desc: "Get results in seconds, not hours" },
              { icon: "🎯", title: "High Accuracy", desc: "AI-powered predictions with proven track record" },
              { icon: "📱", title: "Easy to Use", desc: "Upload chart or paste address - that's it" },
              { icon: "🔒", title: "Secure & Private", desc: "Your data stays private and secure" },
              { icon: "💰", title: "Multi-Asset", desc: "Crypto, Forex, Stocks, Indices" },
              { icon: "📈", title: "Real-Time Data", desc: "Live market data integration" },
              { icon: "🌐", title: "Global Markets", desc: "Analysis across worldwide exchanges" },
              { icon: "🎓", title: "Educational", desc: "Learn while you analyze" }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-[#6366F1]/50 transition-all text-center"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-white font-bold mb-2">{feature.title}</h3>
                <p className="text-neutral-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Disclaimer Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-10 rounded-2xl border border-yellow-500/30"
        >
          <div className="flex items-start gap-4 mb-6">
            <span className="text-4xl">⚠️</span>
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Responsibility & Disclaimer</h2>
              <div className="space-y-4 text-neutral-300">
                <p className="leading-relaxed">
                  <span className="text-yellow-400 font-bold">Educational Use Only:</span> This site is designed for educational purposes. All analysis, metrics, and insights are provided for informational purposes and should not be considered financial advice.
                </p>
                <p className="leading-relaxed">
                  <span className="text-yellow-400 font-bold">Data Accuracy:</span> Metrics may be incomplete or delayed. Market conditions change rapidly. Always verify contract addresses, liquidity, and other critical information before making any trading decisions.
                </p>
                <p className="leading-relaxed">
                  <span className="text-yellow-400 font-bold">No Recommendations:</span> We provide analysis tools, not trading signals or recommendations. All trading decisions are your responsibility.
                </p>
                <p className="leading-relaxed">
                  <span className="text-yellow-400 font-bold">Risk Warning:</span> Trading involves substantial risk of loss and is not suitable for everyone. Never trade with money you cannot afford to lose.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Team/Credit Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-[#6366F1]/10 to-[#8B5CF6]/10 p-12 rounded-3xl border border-[#6366F1]/20">
            <h2 className="text-3xl font-bold text-white mb-4">Built with Passion for Traders</h2>
            <p className="text-neutral-300 mb-6 max-w-2xl mx-auto">
              TradingXbert is developed by traders, for traders. We understand the challenges you face because we face them too.
            </p>
            <p className="text-neutral-500 text-sm">
              Built by <span className="text-[#6366F1] font-bold">BigDa</span> — <a href="https://github.com/BigDa/TradingXbert" className="underline hover:text-[#6366F1] transition-colors">View on GitHub</a>
            </p>
          </div>
        </motion.section>
      </div>
    </main>
  );
}

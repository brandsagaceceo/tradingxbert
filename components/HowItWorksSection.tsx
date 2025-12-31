"use client";

import { motion } from "framer-motion";

export default function HowItWorksSection() {
  const steps = [
    {
      icon: "📤",
      title: "Upload Any Chart",
      description: "Crypto, Forex, Stocks, Indices — any market, any timeframe",
      gradient: "from-[#6366F1] to-[#8B5CF6]"
    },
    {
      icon: "🤖",
      title: "AI Analyzes Structure",
      description: "Market structure, liquidity zones, and key levels identified",
      gradient: "from-[#8B5CF6] to-[#EC4899]"
    },
    {
      icon: "✅",
      title: "You Decide the Trade",
      description: "No signals, no predictions — just structured insight to inform YOUR decision",
      gradient: "from-[#EC4899] to-[#F59E0B]"
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="container mx-auto px-4 py-16 mb-12"
    >
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black text-white mb-4"
        >
          How It Works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-neutral-300 max-w-2xl mx-auto"
        >
          Simple, transparent, and built for traders who want insight — not hype
        </motion.p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.05, y: -10 }}
            className="relative group cursor-pointer"
          >
            {/* Glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-30 blur-3xl transition-opacity duration-500 rounded-3xl`} />
            
            {/* Card */}
            <div className={`relative bg-gradient-to-br ${step.gradient} p-[2px] rounded-3xl transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-${step.gradient.split(' ')[0].replace('from-', '')}/20`}>
              <div className="bg-[#0A0A0A] rounded-3xl p-8 h-full group-hover:bg-[#0F0F0F] transition-colors duration-300">
                {/* Step number */}
                <div className={`inline-block bg-gradient-to-br ${step.gradient} text-white text-sm font-black px-3 py-1 rounded-full mb-4`}>
                  Step {index + 1}
                </div>
                
                {/* Icon */}
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  className="text-6xl mb-6"
                >
                  {step.icon}
                </motion.div>
                
                {/* Content */}
                <h3 className="text-2xl font-black text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-neutral-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Free to try callout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="text-center mt-12"
      >
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-6 py-3 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 cursor-default">
          <span className="text-emerald-400 font-bold">✨ Free to try</span>
          <span className="text-neutral-400">—</span>
          <span className="text-neutral-300">No credit card required</span>
        </div>
      </motion.div>
    </motion.section>
  );
}

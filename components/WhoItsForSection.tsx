"use client";

import { motion } from "framer-motion";

export default function WhoItsForSection() {
  const isFor = [
    "Traders who want to understand market structure",
    "Anyone learning technical analysis systematically",
    "Those who make their own trading decisions",
    "People who value education over predictions",
    "Traders across all markets (crypto, forex, stocks)"
  ];

  const isNotFor = [
    "Anyone looking for guaranteed trade signals",
    "People expecting financial advice or recommendations",
    "Traders who want automated trading bots",
    "Those seeking get-rich-quick schemes",
    "Anyone unwilling to do their own research"
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
          Is TradingXbert For You?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-neutral-300 max-w-2xl mx-auto"
        >
          We're honest about who we help — and who we don't
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Is For */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-green-600/30 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
          <div className="relative bg-gradient-to-br from-emerald-500 to-green-600 p-[2px] rounded-3xl">
            <div className="bg-[#0A0A0A] rounded-3xl p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-4xl">✅</div>
                <h3 className="text-2xl font-black text-white">TradingXbert IS for:</h3>
              </div>
              <ul className="space-y-4">
                {isFor.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="text-emerald-400 text-xl mt-1">•</div>
                    <span className="text-neutral-200 leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Is Not For */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-orange-600/30 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
          <div className="relative bg-gradient-to-br from-red-500 to-orange-600 p-[2px] rounded-3xl">
            <div className="bg-[#0A0A0A] rounded-3xl p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-4xl">❌</div>
                <h3 className="text-2xl font-black text-white">TradingXbert is NOT for:</h3>
              </div>
              <ul className="space-y-4">
                {isNotFor.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="text-red-400 text-xl mt-1">•</div>
                    <span className="text-neutral-200 leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom callout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="text-center mt-12"
      >
        <div className="inline-block bg-neutral-900/50 border border-neutral-700/50 rounded-xl px-8 py-4 max-w-3xl">
          <p className="text-neutral-300">
            <span className="text-white font-bold">Our goal:</span> Help you understand markets better — not promise you easy money
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
}

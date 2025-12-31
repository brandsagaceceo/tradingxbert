"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ExampleAnalysisSection() {
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
          Example Analysis
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-neutral-300 max-w-2xl mx-auto"
        >
          See how TradingXbert transforms raw charts into structured insight
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Before */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -8 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-500/20 to-neutral-700/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
          <div className="relative bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 p-[2px] rounded-3xl">
            <div className="bg-[#0A0A0A] rounded-3xl p-6 h-full">
              <div className="inline-block bg-neutral-700 text-white text-sm font-bold px-4 py-2 rounded-full mb-4">
                Before
              </div>
              <div className="relative h-[300px] rounded-xl overflow-hidden border-2 border-neutral-700/50 mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop"
                  alt="Raw Trading Chart"
                  fill
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <p className="text-neutral-400 text-sm">
                Just a raw chart — patterns unclear, levels unmarked, structure ambiguous
              </p>
            </div>
          </div>
        </motion.div>

        {/* After */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/20 to-[#EC4899]/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
          <div className="relative bg-gradient-to-br from-[#6366F1] to-[#EC4899] p-[2px] rounded-3xl">
            <div className="bg-[#0A0A0A] rounded-3xl p-6 h-full">
              <div className="inline-block bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-white text-sm font-bold px-4 py-2 rounded-full mb-4">
                After AI Analysis
              </div>
              <div className="relative h-[300px] rounded-xl overflow-hidden border-2 border-[#6366F1]/50 mb-4 bg-neutral-900/50">
                <div className="p-6 h-full overflow-y-auto">
                  <div className="space-y-4">
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                      <div className="text-emerald-400 font-bold mb-2">✅ LONG Signal (87% Confidence)</div>
                      <p className="text-sm text-neutral-300">Bullish structure forming with key support holding</p>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                      <div className="text-blue-400 font-bold mb-2">📍 Key Levels Identified</div>
                      <p className="text-sm text-neutral-300">Support: $42,150 • Resistance: $44,800</p>
                    </div>
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                      <div className="text-purple-400 font-bold mb-2">🎯 Risk Management</div>
                      <p className="text-sm text-neutral-300">Risk 2% • R:R 1:3 • Stop below structure</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-neutral-300 text-sm font-medium">
                Structure identified, levels marked, risk calculated — ready for YOUR decision
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="text-center mt-12"
      >
        <div className="inline-block bg-neutral-900/50 border border-neutral-700/50 rounded-xl px-6 py-4 max-w-3xl">
          <p className="text-sm text-neutral-400">
            <span className="text-neutral-300 font-semibold">📌 Example for illustration:</span> This is an example of structured insight — not predictions or financial advice. Every analysis is educational and requires your own research.
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
}

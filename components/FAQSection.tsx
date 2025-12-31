"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Is this financial advice or predictions?",
    answer: "No. TradingXbert provides educational analysis of market structure, key levels, and patterns. We never provide financial advice, trade signals, or predictions. You make your own decisions."
  },
  {
    question: "What markets and timeframes does it support?",
    answer: "All of them. Upload charts from crypto, forex, stocks, indices — any market, any timeframe. The AI analyzes structure, not asset-specific fundamentals."
  },
  {
    question: "Do I need trading experience to use this?",
    answer: "Basic understanding helps, but isn't required. We explain concepts clearly. If you're learning technical analysis, this tool accelerates your understanding of structure and levels."
  },
  {
    question: "How accurate is the AI analysis?",
    answer: "We don't claim accuracy percentages. Markets are uncertain by nature. The AI identifies structure, support/resistance, and patterns based on technical analysis principles — not fortune telling."
  },
  {
    question: "Can I cancel TradingXbert Pro anytime?",
    answer: "Yes. Cancel anytime from your profile. No contracts, no hidden fees. You can also use the free version indefinitely without upgrading."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
          Common Questions
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-neutral-300 max-w-2xl mx-auto"
        >
          Everything you need to know before getting started
        </motion.p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/30 to-[#8B5CF6]/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              <div className="relative bg-neutral-900/80 border border-neutral-700/50 rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 group-hover:border-[#6366F1]/50 group-hover:shadow-xl group-hover:shadow-[#6366F1]/10">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full text-left p-6 flex justify-between items-center gap-4 hover:bg-neutral-800/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-lg font-bold text-white pr-4">{item.question}</h3>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 text-2xl text-[#8B5CF6]"
                  >
                    ▼
                  </motion.div>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-2">
                    <div className="h-px bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] mb-4" />
                    <p className="text-neutral-300 leading-relaxed">{item.answer}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Still have questions callout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="text-center mt-12"
      >
        <p className="text-neutral-400">
          Still have questions?{" "}
          <a
            href="/legal"
            className="text-[#8B5CF6] hover:text-[#6366F1] transition-colors underline"
          >
            Read our full terms and disclaimers
          </a>
        </p>
      </motion.div>
    </motion.section>
  );
}

"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Psychology() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A0A0F] via-[#1a1a2e] to-[#0A0A0F]">
      {/* Hero */}
      <div className="relative h-[400px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=1200&h=400&fit=crop"
          alt="Trading Psychology"
          width={1200}
          height={400}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-[#0A0A0F]/50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-yellow-400 text-sm font-bold mb-4"
          >
            Course 6 • All Levels • 55 min
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-white mb-4"
          >
            Trading Psychology
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-neutral-300 max-w-2xl"
          >
            Master your mind to master the markets
          </motion.p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-red-500/10 to-orange-500/10 p-8 rounded-2xl border border-red-500/30 text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-4">🚧 Coming Soon</h2>
          <p className="text-xl text-neutral-300 mb-6">
            This psychology course covering emotional discipline, mindset, and winning habits is currently in development.
          </p>
          <p className="text-neutral-400">
            In the meantime, check out our <Link href="/blog/trading-psychology" className="text-[#6366F1] hover:underline font-bold">Trading Psychology blog post</Link>!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-center pt-12 border-t border-white/10"
        >
          <Link href="/how-to-trade/using-ai">
            <motion.button
              whileHover={{ x: -5 }}
              className="px-6 py-3 bg-white/5 text-white rounded-xl border border-white/10 hover:border-[#6366F1]/50 transition-all"
            >
              ← Back: Using AI
            </motion.button>
          </Link>
          <Link href="/how-to-trade">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-white/5 text-white rounded-xl border border-white/10 hover:border-[#6366F1]/50 transition-all"
            >
              Back to Courses
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}

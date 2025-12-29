"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface UniversityPromoPopupProps {
  isVisible: boolean;
  onDismiss: () => void;
  isPro?: boolean;
}

export default function UniversityPromoPopup({ isVisible, onDismiss, isPro = false }: UniversityPromoPopupProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]"
            onClick={onDismiss}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotateY: 90 }}
            transition={{ type: "spring", duration: 0.7 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[201] w-[90vw] max-w-2xl"
          >
            <div className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#1a1a2e] rounded-3xl border-2 border-[#FFD700] shadow-2xl shadow-[#FFD700]/50 p-8 md:p-12 relative overflow-hidden">
              {/* Animated Particles */}
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-[#FFD700] rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.2, 1, 0.2],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}

              <div className="relative z-10">
                {/* Close Button */}
                <button
                  onClick={onDismiss}
                  className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                >
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Icon */}
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-7xl md:text-8xl mb-6 text-center"
                >
                  🎓
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl md:text-4xl font-black text-center mb-4"
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF8C00]">
                    TradingXbert University
                  </span>
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-white text-lg md:text-xl text-center mb-8"
                >
                  {isPro ? (
                    <>🎉 All courses are FREE for PRO members!</>
                  ) : (
                    <>Learn trading from basics to advanced strategies</>
                  )}
                </motion.p>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
                >
                  {[
                    { icon: "📚", text: "10+ Comprehensive Courses" },
                    { icon: "🎯", text: "Interactive Lessons" },
                    { icon: "🏆", text: "Earn Certificates" },
                    { icon: "⭐", text: "Track Your Progress" }
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-[#FFD700]/20"
                    >
                      <span className="text-3xl">{feature.icon}</span>
                      <span className="text-white font-bold">{feature.text}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link
                    href="/university"
                    onClick={onDismiss}
                    className="flex-1 bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF8C00] text-black font-black text-lg py-4 rounded-xl hover:scale-105 transition-transform text-center shadow-lg shadow-[#FFD700]/50"
                  >
                    Start Learning Now 🚀
                  </Link>
                  {!isPro && (
                    <Link
                      href="/pricing"
                      onClick={onDismiss}
                      className="flex-1 bg-white/10 text-white font-bold text-lg py-4 rounded-xl hover:bg-white/20 transition-colors text-center border border-[#FFD700]/30"
                    >
                      Get PRO Access
                    </Link>
                  )}
                </motion.div>

                {/* Note */}
                {!isPro && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-[#FFD700]/70 text-sm text-center mt-4"
                  >
                    💡 Basic courses available free. PRO unlocks all premium content.
                  </motion.p>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

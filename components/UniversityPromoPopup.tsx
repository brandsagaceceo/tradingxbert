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
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[200]"
            onClick={onDismiss}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotateY: 90 }}
            transition={{ type: "spring", duration: 0.7, bounce: 0.4 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[201] w-[90vw] max-w-3xl"
          >
            <div className="bg-gradient-to-br from-[#1a1a2e] via-[#0f1729] to-[#1a1a2e] rounded-3xl border-4 border-[#6366F1] shadow-2xl shadow-[#6366F1]/50 p-8 md:p-16 relative overflow-hidden">
              {/* Animated Background Glow */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899] rounded-full blur-3xl opacity-20"
              />

              {/* Animated Particles */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, #6366F1, #8B5CF6)`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -40, 0],
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 2, 1],
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
                  className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-[#6366F1] via-[#8B5CF6] to-[#EC4899] rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl hover:shadow-[#6366F1]/80"
                >
                  <svg className="w-6 h-6 text-white font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Icon with TX Logo */}
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="mb-8 text-center"
                >
                  <div className="inline-block relative">
                    <motion.div
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(99, 102, 241, 0.5)",
                          "0 0 60px rgba(139, 92, 246, 0.8)",
                          "0 0 20px rgba(99, 102, 241, 0.5)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-24 h-24 bg-gradient-to-br from-[#6366F1] via-[#8B5CF6] to-[#EC4899] rounded-3xl flex items-center justify-center transform rotate-12"
                    >
                      <span className="text-5xl font-black text-white transform -rotate-12">🎓</span>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-5xl font-black text-center mb-4"
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899]">
                    TradingXbert University
                  </span>
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-white text-xl md:text-2xl text-center mb-10 font-bold"
                >
                  {isPro ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="text-3xl">🎉</span>
                      All Courses FREE for PRO Members!
                    </span>
                  ) : (
                    <>Master Trading from Zero to Hero 🚀</>
                  )}
                </motion.p>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="grid grid-cols-2 gap-4 mb-10"
                >
                  {[
                    { icon: "📚", text: "10+ Professional Courses", color: "from-[#6366F1] to-[#8B5CF6]" },
                    { icon: "🎯", text: "Interactive Lessons", color: "from-[#8B5CF6] to-[#EC4899]" },
                    { icon: "🏆", text: "Earn Certificates", color: "from-[#EC4899] to-[#F59E0B]" },
                    { icon: "⭐", text: "Track Your Progress", color: "from-[#6366F1] to-[#EC4899]" }
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className={`flex flex-col items-center gap-2 bg-gradient-to-br ${feature.color} rounded-2xl p-5 border-2 border-white/20 shadow-lg hover:shadow-xl transition-all`}
                    >
                      <span className="text-4xl">{feature.icon}</span>
                      <span className="text-white font-black text-center text-sm md:text-base">{feature.text}</span>
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
                    className="flex-1 relative group overflow-hidden"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899] text-white font-black text-xl py-5 rounded-2xl text-center shadow-2xl shadow-[#6366F1]/50 border-2 border-white/20"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                        animate={{ x: [-200, 300] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <span className="relative z-10">Start Learning FREE 🚀</span>
                    </motion.div>
                  </Link>
                  {!isPro && (
                    <Link
                      href="/pricing"
                      onClick={onDismiss}
                      className="flex-1"
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white/10 text-white font-bold text-xl py-5 rounded-2xl hover:bg-white/20 transition-colors text-center border-2 border-[#6366F1]/50 backdrop-blur-sm"
                      >
                        Unlock PRO Access ⚡
                      </motion.div>
                    </Link>
                  )}
                </motion.div>

                {/* Note */}
                {!isPro && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-[#6366F1] text-base text-center mt-6 font-semibold"
                  >
                    💡 Start with free courses • Upgrade to PRO for all premium content
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

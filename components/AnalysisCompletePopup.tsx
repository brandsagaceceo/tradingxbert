"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface AnalysisCompletePopupProps {
  isVisible: boolean;
  onDismiss: () => void;
}

export default function AnalysisCompletePopup({ isVisible, onDismiss }: AnalysisCompletePopupProps) {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (isVisible) {
      setCountdown(10);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onDismiss();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isVisible, onDismiss]);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998]"
            onClick={onDismiss}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 100 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-[90vw] max-w-lg"
          >
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-3xl border-2 border-[#FFD700] shadow-2xl shadow-[#FFD700]/50 p-8 relative overflow-hidden">
              {/* Animated Background */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700]/20 rounded-full blur-3xl"
              />

              <div className="relative z-10">
                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full flex items-center justify-center"
                >
                  <span className="text-4xl">🎯</span>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-black text-white text-center mb-4"
                >
                  Analysis Complete!
                </motion.h2>

                {/* Instructions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4 mb-6"
                >
                  <div className="bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 rounded-xl p-4 border border-[#FFD700]/30">
                    <div className="flex items-start gap-3">
                      <motion.span
                        animate={{ y: [-5, 0, -5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-3xl"
                      >
                        ⬆️
                      </motion.span>
                      <div>
                        <p className="text-[#FFD700] font-bold text-lg mb-1">Scroll Up</p>
                        <p className="text-white text-sm">Check out your detailed analysis results above!</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-[#6366F1]/20 to-[#8B5CF6]/20 rounded-xl p-4 border border-[#6366F1]/30">
                    <div className="flex items-start gap-3">
                      <motion.span
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-3xl"
                      >
                        ⬇️
                      </motion.span>
                      <div>
                        <p className="text-[#6366F1] font-bold text-lg mb-1">Or Scroll Down</p>
                        <p className="text-white text-sm">Chat with AI about this setup using the chatbot!</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <button
                    onClick={() => {
                      onDismiss();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex-1 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold py-3 rounded-xl hover:scale-105 transition-transform"
                  >
                    View Results ⬆️
                  </button>
                  <button
                    onClick={onDismiss}
                    className="flex-1 bg-white/10 text-white font-bold py-3 rounded-xl hover:bg-white/20 transition-colors"
                  >
                    Close ({countdown}s)
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

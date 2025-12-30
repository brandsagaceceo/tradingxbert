"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

interface ChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  description?: string;
}

export default function ChartModal({ isOpen, onClose, imageUrl, title, description }: ChartModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9999] cursor-zoom-out"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
          >
            <div className="relative max-w-6xl w-full max-h-[90vh] overflow-hidden">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute -top-12 right-0 md:right-4 w-10 h-10 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl z-10 text-white font-bold"
              >
                ✕
              </button>

              {/* Image Container */}
              <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                className="bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] rounded-2xl border-2 border-[#6366F1]/50 shadow-2xl overflow-hidden"
              >
                {/* Title */}
                {title && (
                  <div className="bg-gradient-to-r from-[#6366F1]/20 to-[#8B5CF6]/20 border-b border-[#6366F1]/30 p-4">
                    <h3 className="text-xl md:text-2xl font-black text-white">{title}</h3>
                    {description && (
                      <p className="text-sm md:text-base text-neutral-300 mt-1">{description}</p>
                    )}
                  </div>
                )}

                {/* Image */}
                <div className="relative w-full h-[60vh] md:h-[70vh]">
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Info Bar */}
                <div className="bg-[#0a0a0a]/50 border-t border-[#6366F1]/30 p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-neutral-400">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    Live Chart Analysis
                  </div>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white transition-all"
                  >
                    Close View
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

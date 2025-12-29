"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface GuidanceTooltipProps {
  id: string;
  message: string;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
}

export default function GuidanceTooltip({ id, message, position = "bottom", delay = 0 }: GuidanceTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const tooltipDismissed = localStorage.getItem(`tooltip_${id}_dismissed`);
    if (tooltipDismissed === "true") {
      setDismissed(true);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [id, delay]);

  const handleDismiss = () => {
    setIsVisible(false);
    setDismissed(true);
    localStorage.setItem(`tooltip_${id}_dismissed`, "true");
  };

  if (dismissed) return null;

  const positionClasses = {
    top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
    bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
    left: "right-full mr-2 top-1/2 -translate-y-1/2",
    right: "left-full ml-2 top-1/2 -translate-y-1/2"
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-[#FFD700] border-x-transparent border-b-transparent",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-[#FFD700] border-x-transparent border-t-transparent",
    left: "left-full top-1/2 -translate-y-1/2 border-l-[#FFD700] border-y-transparent border-r-transparent",
    right: "right-full top-1/2 -translate-y-1/2 border-r-[#FFD700] border-y-transparent border-l-transparent"
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className={`absolute ${positionClasses[position]} z-[100] w-64 pointer-events-auto`}
        >
          <motion.div
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-xl p-4 shadow-2xl border-2 border-white/20"
          >
            {/* Arrow */}
            <div className={`absolute ${arrowClasses[position]} w-0 h-0 border-8`}></div>
            
            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute -top-2 -right-2 w-6 h-6 bg-black rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            >
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Content */}
            <div className="flex items-start gap-2">
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-2xl flex-shrink-0"
              >
                👋
              </motion.span>
              <p className="text-black font-bold text-sm leading-relaxed">
                {message}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

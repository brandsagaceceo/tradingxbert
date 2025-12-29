"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function RiskDisclaimer() {
  const [isVisible, setIsVisible] = useState(true);
  const [height, setHeight] = useState(0);
  const disclaimerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if disclaimer was previously dismissed
    const dismissed = localStorage.getItem('riskDisclaimerDismissed');
    if (dismissed === 'true') {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    // Measure disclaimer height and update CSS variable
    if (disclaimerRef.current && isVisible) {
      const updateHeight = () => {
        const rect = disclaimerRef.current?.getBoundingClientRect();
        if (rect) {
          setHeight(rect.height);
          document.documentElement.style.setProperty('--bottom-ui-offset', `${rect.height}px`);
        }
      };
      
      updateHeight();
      
      // Use ResizeObserver to track size changes
      const resizeObserver = new ResizeObserver(updateHeight);
      resizeObserver.observe(disclaimerRef.current);
      
      return () => {
        resizeObserver.disconnect();
      };
    } else {
      document.documentElement.style.setProperty('--bottom-ui-offset', '0px');
    }
  }, [isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('riskDisclaimerDismissed', 'true');
    document.documentElement.style.setProperty('--bottom-ui-offset', '0px');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={disclaimerRef}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 bg-yellow-900/20 border-t border-yellow-500/30 backdrop-blur-sm z-40"
          style={{
            paddingBottom: 'env(safe-area-inset-bottom)'
          }}
        >
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <p className="text-xs text-yellow-200/80 flex-1">
              ⚠️ <strong>Risk Disclaimer:</strong> Trading involves substantial risk. This is an educational platform providing analysis tools, not financial advice. Past performance does not guarantee future results. Only trade with money you can afford to lose.
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDismiss}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30 transition-colors"
              aria-label="Dismiss disclaimer"
            >
              <svg
                className="w-4 h-4 text-yellow-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

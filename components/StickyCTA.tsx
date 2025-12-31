"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isInUploadSection, setIsInUploadSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling past hero (approx 600px)
      const shouldShow = window.scrollY > 600;
      setIsVisible(shouldShow);

      // Hide when in upload section to avoid redundancy
      const uploadSection = document.getElementById("upload-section");
      if (uploadSection) {
        const rect = uploadSection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        setIsInUploadSection(isInView);
      }
    };

    handleScroll(); // Check initial state
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToUpload = () => {
    const uploadSection = document.getElementById("upload-section");
    if (uploadSection) {
      uploadSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && !isInUploadSection && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
          style={{
            paddingBottom: "env(safe-area-inset-bottom, 0px)"
          }}
        >
          <div className="bg-gradient-to-r from-[#0A0A0A]/95 to-[#1A1A1A]/95 backdrop-blur-lg border-t border-neutral-700/50 px-4 py-3 shadow-2xl">
            <motion.button
              onClick={scrollToUpload}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#5558E3] hover:to-[#7C4FE8] text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span className="text-lg">📤</span>
              <span>Upload a Chart (Free)</span>
            </motion.button>
            
            <p className="text-xs text-neutral-400 text-center mt-2">
              No credit card required
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

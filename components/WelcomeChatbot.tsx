"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface WelcomeChatbotProps {
  delay?: number;
}

export default function WelcomeChatbot({ delay = 3000 }: WelcomeChatbotProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const pathname = usePathname();

  // Get contextual message based on current page
  const getPageMessage = () => {
    if (pathname === "/") {
      return {
        title: "👋 Hi! I'm here if you need any help",
        message: "Ready to analyze your trading charts? Upload any chart screenshot and get instant AI-powered insights, or explore our trading university to sharpen your skills!",
        cta: "Thanks!"
      };
    } else if (pathname === "/news") {
      return {
        title: "📰 Hey! I'm here if you need help",
        message: "Stay updated with real-time crypto and stock prices, Fear & Greed Index, and breaking market news. Everything you need to stay informed!",
        cta: "Perfect!"
      };
    } else if (pathname === "/how-to-trade") {
      return {
        title: "📚 I'm here to help!",
        message: "Learn everything from chart patterns to risk management. Browse our comprehensive guides to become a better trader!",
        cta: "Got It!"
      };
    } else if (pathname?.startsWith("/how-to-trade/")) {
      return {
        title: "🎓 I'm here if you need anything",
        message: "Take your time with each lesson. Complete all sections to earn points and track your progress!",
        cta: "Continue"
      };
    } else if (pathname === "/profile") {
      return {
        title: "👤 I'm here if you need help",
        message: "Track your analysis history, course progress, and trading stats all in one place. Sign in to unlock all features!",
        cta: "Got It"
      };
    } else if (pathname === "/pricing") {
      return {
        title: "💎 Hey! I'm here to help",
        message: "Get unlimited chart analyses, access to all timeframes, and priority support. Start with our free plan to try it out!",
        cta: "Thanks!"
      };
    } else if (pathname === "/journal") {
      return {
        title: "📔 I'm here if you need help",
        message: "Review your past analyses and track your trading decisions. Learn from both winners and losers!",
        cta: "Perfect!"
      };
    } else if (pathname === "/blog") {
      return {
        title: "📖 Hey! I'm here if you need anything",
        message: "Discover in-depth guides on technical analysis, risk management, and trading psychology. All designed to improve your trading!",
        cta: "Got It!"
      };
    }
    
    return {
      title: "💬 Hi! I'm here if you need help",
      message: "I'm here to assist you with anything you need. Explore our AI tools, trading courses, and market analysis!",
      cta: "Thanks!"
    };
  };

  useEffect(() => {
    // Check if chatbot has been shown before on this page
    const chatbotShownKey = `chatbot_shown_${pathname}`;
    const wasShown = localStorage.getItem(chatbotShownKey);
    
    if (!wasShown && !hasShown) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setHasShown(true);
        localStorage.setItem(chatbotShownKey, "true");
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [pathname, delay, hasShown]);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  const message = getPageMessage();

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9997]"
            onClick={handleDismiss}
          />

          {/* Chatbot Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="fixed bottom-8 right-8 z-[9998] w-[90vw] max-w-md"
          >
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl border-2 border-[#6366F1] shadow-2xl shadow-[#6366F1]/50 p-6 relative overflow-hidden">
              {/* Animated Background Glow */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-10 -right-10 w-40 h-40 bg-[#6366F1]/30 rounded-full blur-3xl"
              />

              {/* Close Button */}
              <button
                onClick={handleDismiss}
                className="absolute top-3 right-3 text-neutral-400 hover:text-white transition-colors z-10"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="relative z-10">
                {/* Bot Avatar */}
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-16 h-16 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-full flex items-center justify-center text-3xl mb-4 shadow-lg shadow-[#6366F1]/50"
                >
                  🤖
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2">
                  {message.title}
                </h3>

                {/* Message */}
                <p className="text-neutral-300 text-sm mb-6 leading-relaxed">
                  {message.message}
                </p>

                {/* CTA Button */}
                <button
                  onClick={handleDismiss}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-bold rounded-xl hover:scale-105 transition-transform shadow-lg shadow-[#6366F1]/30"
                >
                  {message.cta}
                </button>

                {/* Typing Indicator */}
                <div className="flex items-center gap-1 mt-4">
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                    className="w-2 h-2 bg-[#6366F1] rounded-full"
                  />
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 bg-[#6366F1] rounded-full"
                  />
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 bg-[#6366F1] rounded-full"
                  />
                  <span className="text-xs text-neutral-500 ml-2">AI Assistant</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

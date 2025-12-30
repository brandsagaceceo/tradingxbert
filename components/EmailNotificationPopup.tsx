"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function EmailNotificationPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if user has already seen/dismissed the popup
    const hasSeenPopup = localStorage.getItem("emailPopupSeen");
    const isSubscribed = localStorage.getItem("emailSubscribed");
    
    if (!hasSeenPopup && !isSubscribed) {
      // Show popup after 5 seconds
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/alert-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccess(true);
        localStorage.setItem("emailSubscribed", "true");
        localStorage.setItem("emailPopupSeen", "true");
        
        // Close popup after 2 seconds
        setTimeout(() => {
          setShowPopup(false);
        }, 2000);
      } else {
        setError("Failed to subscribe. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = () => {
    setShowPopup(false);
    localStorage.setItem("emailPopupSeen", "true");
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
            onClick={handleDismiss}
          >
            {/* Popup Container - Centered */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg max-h-[90vh] overflow-y-auto relative"
            >
              <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] rounded-2xl border-2 border-[#6366F1]/50 shadow-2xl shadow-[#6366F1]/30 p-6 md:p-8 relative overflow-hidden">
              {/* Animated background effects */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-10 -right-10 w-40 h-40 bg-[#6366F1] rounded-full blur-3xl"
                />
                <motion.div
                  animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#8B5CF6] rounded-full blur-3xl"
                />
              </div>

              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="absolute top-3 right-3 md:top-4 md:right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all text-white hover:rotate-90 z-10 text-xl"
              >
                ✕
              </button>

              <div className="relative z-10">
                {!success ? (
                  <>
                    {/* Icon */}
                    <motion.div
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-5xl md:text-6xl mb-4 text-center"
                    >
                      📬
                    </motion.div>

                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-black text-center mb-3 bg-gradient-to-r from-[#6366F1] via-white to-[#8B5CF6] bg-clip-text text-transparent">
                      Get Market Alerts Instantly!
                    </h2>

                    {/* Description */}
                    <p className="text-neutral-300 text-center mb-2 text-base md:text-lg">
                      Join <span className="text-white font-black">10,000+ traders</span> getting instant alerts
                    </p>
                    <p className="text-neutral-400 text-center mb-5 md:mb-6 text-sm">
                      Don't miss the next Bitcoin surge or market crash. Get notified within seconds of major movements.
                    </p>

                    {/* Benefits */}
                    <div className="space-y-3 mb-5 md:mb-6">
                      <div className="flex items-start gap-3 bg-white/5 rounded-xl p-3 border border-white/10">
                        <span className="text-2xl flex-shrink-0">⚡</span>
                        <div>
                          <div className="text-sm md:text-base text-white font-bold">Lightning-Fast Alerts</div>
                          <div className="text-xs md:text-sm text-neutral-400">Get notified within 30 seconds of major price swings</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 bg-white/5 rounded-xl p-3 border border-white/10">
                        <span className="text-2xl flex-shrink-0">💰</span>
                        <div>
                          <div className="text-sm md:text-base text-white font-bold">Never Miss Opportunities</div>
                          <div className="text-xs md:text-sm text-neutral-400">Catch breakouts before they run 10-20%</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 bg-white/5 rounded-xl p-3 border border-white/10">
                        <span className="text-2xl flex-shrink-0">🎯</span>
                        <div>
                          <div className="text-sm md:text-base text-white font-bold">Smart Trade Signals</div>
                          <div className="text-xs md:text-sm text-neutral-400">AI-powered insights delivered to your inbox</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Social Proof */}
                    <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-3 mb-5 md:mb-6">
                      <div className="flex items-center justify-center gap-2 text-green-400">
                        <span className="text-xl">🔥</span>
                        <span className="font-bold text-sm">427 traders signed up today</span>
                      </div>
                    </div>

                    {/* Email input */}
                    <div className="space-y-3">
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSubscribe()}
                        className="w-full px-4 py-3 md:py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/50 transition-all text-base"
                        disabled={loading}
                      />

                      {error && (
                        <p className="text-red-400 text-sm text-center">{error}</p>
                      )}

                      {/* Subscribe button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSubscribe}
                        disabled={loading}
                        className="w-full px-6 py-3.5 md:py-4 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-black rounded-xl hover:shadow-xl hover:shadow-[#6366F1]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-base md:text-lg"
                      >
                        {loading ? (
                          <span className="flex items-center justify-center gap-2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                            Subscribing...
                          </span>
                        ) : (
                          "🔔 Yes, Send Me Alerts!"
                        )}
                      </motion.button>

                      {/* Maybe later button */}
                      <button
                        onClick={handleDismiss}
                        className="w-full text-sm text-neutral-400 hover:text-white transition-all py-2"
                      >
                        Maybe later
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-6">
                    {/* Success animation */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-6xl md:text-7xl mb-4"
                    >
                      ✅
                    </motion.div>
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
                      You're All Set!
                    </h3>
                    <p className="text-neutral-300 text-base">
                      You'll start receiving market alerts immediately. Check your inbox!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

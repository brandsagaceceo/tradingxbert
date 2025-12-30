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
    const hasSeenPopup = localStorage.getItem("emailPopupSeen");
    const isSubscribed = localStorage.getItem("emailSubscribed");
    
    if (!hasSeenPopup && !isSubscribed) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  // Add ESC key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showPopup) {
        handleDismiss();
      }
    };
    
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [showPopup]);

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

      const data = await response.json();

      if (response.ok || data.success || data.message) {
        setSuccess(true);
        localStorage.setItem("emailSubscribed", "true");
        localStorage.setItem("emailPopupSeen", "true");
        
        setTimeout(() => {
          setShowPopup(false);
        }, 2000);
      } else {
        setError(data.error || "Failed to subscribe. Please try again.");
      }
    } catch (err) {
      console.error("Subscription error:", err);
      setError("Connection error. Please check your internet and try again.");
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                handleDismiss();
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg max-h-[90vh] overflow-y-auto relative"
            >
              <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] rounded-2xl border-2 border-[#6366F1]/50 shadow-2xl shadow-[#6366F1]/30 p-6 md:p-8 relative overflow-hidden">
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

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDismiss();
                  }}
                  className="absolute top-3 right-3 md:top-4 md:right-4 w-10 h-10 flex items-center justify-center rounded-full bg-red-500/80 hover:bg-red-600 transition-all text-white hover:scale-110 z-[100] text-xl shadow-lg cursor-pointer"
                  aria-label="Close popup"
                >
                  ✕
                </button>

                <div className="relative z-10">
                  {!success ? (
                    <>
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
                      <h2 className="text-2xl md:text-3xl font-black text-center mb-3">Get Market Alerts Instantly!</h2>
                      <p className="text-neutral-300 text-center mb-5 md:mb-6 text-base md:text-lg">
                        Join 10,000+ traders getting real-time market updates
                      </p>

                      <div className="space-y-3 mb-5 md:mb-6">
                        <div className="flex items-start gap-3 bg-white/5 rounded-xl p-3 border border-white/10">
                          <span className="text-2xl flex-shrink-0">⚡</span>
                          <div>
                            <div className="font-bold text-white text-sm">Lightning-Fast Alerts</div>
                            <div className="text-xs text-neutral-400">Get notified instantly when markets move</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 bg-white/5 rounded-xl p-3 border border-white/10">
                          <span className="text-2xl flex-shrink-0">💰</span>
                          <div>
                            <div className="font-bold text-white text-sm">Never Miss a Trade</div>
                            <div className="text-xs text-neutral-400">AI-powered signals for perfect timing</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 bg-white/5 rounded-xl p-3 border border-white/10">
                          <span className="text-2xl flex-shrink-0">🎯</span>
                          <div>
                            <div className="font-bold text-white text-sm">Smart Signals</div>
                            <div className="text-xs text-neutral-400">Professional-grade market analysis</div>
                          </div>
                        </div>
                      </div>

                      <div className="mb-5 md:mb-6 p-3 bg-green-500/10 border border-green-500/30 rounded-xl">
                        <div className="flex items-center gap-2 text-sm text-green-400">
                          <span>🔥</span>
                          <span className="font-bold">427 traders signed up today</span>
                        </div>
                      </div>

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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function AlertSignup() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setMessage("Please enter a valid email");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/alert-subscription", { email });
      setMessage(response.data.message);
      setEmail("");
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Failed to subscribe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-gradient-to-br from-emerald-900/20 to-green-900/20 rounded-2xl border border-emerald-500/30"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="text-3xl">🔔</div>
        <div>
          <h3 className="text-xl font-bold text-emerald-400 mb-1">AI Trading Alerts</h3>
          <p className="text-sm text-neutral-300">
            Get notified when our AI spots high-probability LONG or SHORT setups in real-time
          </p>
        </div>
      </div>

      <form onSubmit={handleSubscribe} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold rounded-lg hover:scale-105 transition-transform disabled:opacity-50 whitespace-nowrap"
          >
            {loading ? "..." : "Subscribe"}
          </button>
        </div>

        {message && (
          <p className={`text-sm ${message.includes('success') || message.includes('Already') ? 'text-emerald-400' : 'text-red-400'}`}>
            {message}
          </p>
        )}
      </form>

      <div className="mt-4 flex items-start gap-2 text-xs text-neutral-400">
        <span>📧</span>
        <p>Free for all users. We'll email you when AI finds strong setups. Unsubscribe anytime.</p>
      </div>
    </motion.div>
  );
}

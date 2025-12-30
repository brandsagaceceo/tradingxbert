"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function PriceAlerts() {
  const [email, setEmail] = useState("");
  const [asset, setAsset] = useState("BTC");
  const [alertPrice, setAlertPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const assets = [
    { symbol: "BTC", name: "Bitcoin", currentPrice: "$96,247" },
    { symbol: "ETH", name: "Ethereum", currentPrice: "$3,421" },
    { symbol: "NVDA", name: "NVIDIA", currentPrice: "$140.15" },
    { symbol: "SPX", name: "S&P 500", currentPrice: "5,881" }
  ];

  const handleSetAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !alertPrice) {
      setMessage("Please fill all fields");
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setMessage(`✅ Alert set! We'll notify ${email} when ${asset} hits $${alertPrice}`);
      setLoading(false);
      setEmail("");
      setAlertPrice("");
    }, 1000);
  };

  return (
    <div className="bg-gradient-to-br from-[#6366F1]/10 to-[#8B5CF6]/10 backdrop-blur-xl rounded-3xl border border-[#6366F1]/30 p-6">
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-4xl"
        >
          🔔
        </motion.div>
        <div>
          <h3 className="text-2xl font-black text-white">Price Alerts</h3>
          <p className="text-sm text-neutral-400">Get notified when prices hit your target</p>
        </div>
      </div>

      <form onSubmit={handleSetAlert} className="space-y-4">
        <div>
          <label className="text-sm text-neutral-400 mb-2 block">Select Asset</label>
          <select
            value={asset}
            onChange={(e) => setAsset(e.target.value)}
            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#6366F1]"
          >
            {assets.map((a) => (
              <option key={a.symbol} value={a.symbol}>
                {a.name} ({a.symbol}) - Current: {a.currentPrice}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-neutral-400 mb-2 block">Alert Price</label>
          <input
            type="number"
            value={alertPrice}
            onChange={(e) => setAlertPrice(e.target.value)}
            placeholder="100000"
            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#6366F1]"
          />
        </div>

        <div>
          <label className="text-sm text-neutral-400 mb-2 block">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#6366F1]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-bold rounded-lg hover:scale-105 transition-transform disabled:opacity-50"
        >
          {loading ? "Setting Alert..." : "🔔 Set Price Alert"}
        </button>

        {message && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-sm ${message.includes('✅') ? 'text-green-400' : 'text-red-400'}`}
          >
            {message}
          </motion.p>
        )}
      </form>

      <div className="mt-6 p-4 bg-black/30 rounded-xl border border-white/5">
        <p className="text-xs text-neutral-400">
          💡 <span className="font-bold text-white">Pro Tip:</span> Set multiple alerts to catch market moves early. Free for all users!
        </p>
      </div>
    </div>
  );
}

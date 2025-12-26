"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function TokenGate() {
  const { data: session } = useSession();
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleConnect = async () => {
    if (!walletAddress) {
      alert("Please enter your wallet address");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/verify-token-holder", {
        walletAddress,
      });

      setResult(response.data);

      if (response.data.isPro) {
        alert("🎉 Pro membership activated! You hold enough tokens.");
        window.location.reload();
      } else {
        alert(`You need ${response.data.required - response.data.balance} more tokens for Pro access.`);
      }
    } catch (error: any) {
      alert(error.response?.data?.error || "Failed to verify token balance");
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="text-center p-6 bg-neutral-900 rounded-xl border border-neutral-800">
        <p className="text-neutral-400">Sign in to connect your wallet</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-xl border border-[#FFD700]/20">
      <h3 className="text-2xl font-bold mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500]">
          Token-Gated Access
        </span>
      </h3>
      
      <p className="text-neutral-300 mb-4">
        Hold our token to unlock Pro features automatically!
      </p>

      <div className="space-y-4">
        <input
          type="text"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          placeholder="Enter your Solana wallet address"
          className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-[#FFD700]"
        />

        <button
          onClick={handleConnect}
          disabled={loading}
          className="w-full px-6 py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold rounded-lg hover:scale-105 transition-transform disabled:opacity-50"
        >
          {loading ? "Checking Balance..." : "🔓 Verify Token Balance"}
        </button>

        {result && (
          <div className="p-4 bg-neutral-800 rounded-lg">
            <p className="text-sm text-neutral-400 mb-1">Your Balance:</p>
            <p className="text-2xl font-bold text-[#FFD700]">{result.balance} tokens</p>
            <p className="text-sm text-neutral-400 mt-2">Required: {result.required} tokens</p>
            {result.isPro ? (
              <p className="text-emerald-400 font-bold mt-2">✅ Pro Access Granted!</p>
            ) : (
              <p className="text-red-400 mt-2">❌ Need more tokens for Pro access</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

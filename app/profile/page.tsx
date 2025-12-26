"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import axios from "axios";
import Link from "next/link";

interface Analysis {
  id: string;
  signal: string;
  confidence: number;
  riskLevel: string;
  trendSummary: string;
  createdAt: string;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  image: string | null;
  bio: string | null;
  username: string | null;
  createdAt: string;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [stats, setStats] = useState({ totalAnalyses: 0, bullishCount: 0, bearishCount: 0, neutralCount: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [editForm, setEditForm] = useState({
    name: "",
    username: "",
    bio: "",
    image: "",
  });

  useEffect(() => {
    if (status === "authenticated") {
      fetchProfile();
    }
  }, [status]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get("/api/profile");
      setProfile(response.data.user);
      setAnalyses(response.data.analyses);
      setStats(response.data.stats);
      setEditForm({
        name: response.data.user.name || "",
        username: response.data.user.username || "",
        bio: response.data.user.bio || "",
        image: response.data.user.image || "",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      await axios.patch("/api/profile", editForm);
      await fetchProfile();
      setIsEditing(false);
    } catch (error: any) {
      alert(error.response?.data?.error || "Failed to update profile");
    }
  };

  if (status === "loading" || loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-black via-neutral-950 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-32 h-32 mb-6 mx-auto">
            <div className="absolute inset-0 flex items-center justify-center animate-bounce">
              <div className="text-8xl filter drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">
                🚀
              </div>
            </div>
            <div className="absolute inset-0 border-4 border-[#FFD700]/20 rounded-full animate-ping" />
          </div>
          <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500]">Loading your profile...</p>
        </div>
      </main>
    );
  }

  if (status === "unauthenticated") {
    return (
      <main className="min-h-screen bg-gradient-to-br from-black via-neutral-950 to-black flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-7xl mb-6">🔒</div>
          <h1 className="text-3xl font-bold text-white mb-4">Sign In Required</h1>
          <p className="text-neutral-400 mb-6">
            You need to sign in to view your profile and analysis history.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold rounded-xl hover:scale-105 transition-transform"
          >
            Go to Homepage
          </Link>
        </div>
      </main>
    );
  }

  const signalColors: Record<string, string> = {
    BULLISH: "from-emerald-500 to-green-500",
    BEARISH: "from-red-500 to-rose-500",
    NEUTRAL: "from-yellow-500 to-amber-500",
  };

  const signalEmoji: Record<string, string> = {
    BULLISH: "🚀",
    BEARISH: "🔻",
    NEUTRAL: "⚖️",
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-neutral-950 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500]">
              My Profile
            </span>
          </h1>
          <Link
            href="/"
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors"
          >
            ← Back Home
          </Link>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-2xl border border-neutral-800 p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] p-1">
                <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center overflow-hidden">
                  {editForm.image ? (
                    <img src={editForm.image} alt={editForm.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-6xl">{profile?.name?.[0]?.toUpperCase() || "👤"}</span>
                  )}
                </div>
              </div>
              {isEditing && (
                <button
                  onClick={() => {
                    const url = prompt("Enter image URL:");
                    if (url) setEditForm({ ...editForm, image: url });
                  }}
                  className="absolute bottom-0 right-0 p-2 bg-[#FFD700] text-black rounded-full hover:scale-110 transition-transform"
                  title="Change avatar"
                >
                  📷
                </button>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    placeholder="Display Name"
                    className="w-full px-4 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:border-[#FFD700] outline-none"
                  />
                  <input
                    type="text"
                    value={editForm.username}
                    onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                    placeholder="@username"
                    className="w-full px-4 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:border-[#FFD700] outline-none"
                  />
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    placeholder="Tell us about your trading style..."
                    className="w-full px-4 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:border-[#FFD700] outline-none resize-none"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveProfile}
                      className="px-6 py-2 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold rounded-lg hover:scale-105 transition-transform"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditForm({
                          name: profile?.name || "",
                          username: profile?.username || "",
                          bio: profile?.bio || "",
                          image: profile?.image || "",
                        });
                      }}
                      className="px-6 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold mb-1">{profile?.name || "Trader"}</h2>
                  {profile?.username && (
                    <p className="text-[#FFD700] mb-2">@{profile.username}</p>
                  )}
                  <p className="text-neutral-400 text-sm mb-4">{profile?.email}</p>
                  {profile?.bio && (
                    <p className="text-neutral-300 mb-4">{profile.bio}</p>
                  )}
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors text-sm"
                  >
                    ✏️ Edit Profile
                  </button>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 md:w-64">
              <div className="text-center p-4 bg-neutral-800/50 rounded-xl">
                <div className="text-3xl font-bold text-[#FFD700]">{stats.totalAnalyses}</div>
                <div className="text-sm text-neutral-400">Analyses</div>
              </div>
              <div className="text-center p-4 bg-neutral-800/50 rounded-xl">
                <div className="text-3xl font-bold text-emerald-400">{stats.bullishCount}</div>
                <div className="text-sm text-neutral-400">Bullish</div>
              </div>
              <div className="text-center p-4 bg-neutral-800/50 rounded-xl">
                <div className="text-3xl font-bold text-red-400">{stats.bearishCount}</div>
                <div className="text-sm text-neutral-400">Bearish</div>
              </div>
              <div className="text-center p-4 bg-neutral-800/50 rounded-xl">
                <div className="text-3xl font-bold text-yellow-400">{stats.neutralCount}</div>
                <div className="text-sm text-neutral-400">Neutral</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Analysis History */}
        <h2 className="text-3xl font-bold mb-6">📊 Analysis History</h2>
        
        {analyses.length === 0 ? (
          <div className="text-center py-16 bg-neutral-900/50 rounded-2xl border border-neutral-800">
            <div className="text-6xl mb-4">📈</div>
            <h3 className="text-2xl font-bold text-neutral-400 mb-2">No Analyses Yet</h3>
            <p className="text-neutral-500 mb-6">Start analyzing charts to build your history!</p>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold rounded-xl hover:scale-105 transition-transform"
            >
              Analyze Your First Chart
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analyses.map((analysis, index) => (
              <motion.div
                key={analysis.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group p-6 bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-xl border border-neutral-800 hover:border-[#FFD700]/50 transition-all hover:scale-105"
              >
                {/* Signal Badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${signalColors[analysis.signal]} text-white text-sm font-bold mb-3`}>
                  <span>{signalEmoji[analysis.signal]}</span>
                  {analysis.signal}
                </div>

                {/* Confidence */}
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-400">Confidence</span>
                    <span className="text-[#FFD700] font-bold">{analysis.confidence}%</span>
                  </div>
                  <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFA500]"
                      style={{ width: `${analysis.confidence}%` }}
                    />
                  </div>
                </div>

                {/* Risk Level */}
                <div className="text-sm mb-3">
                  <span className="text-neutral-400">Risk: </span>
                  <span className={
                    analysis.riskLevel === 'LOW' ? 'text-emerald-400' :
                    analysis.riskLevel === 'MEDIUM' ? 'text-yellow-400' :
                    'text-red-400'
                  }>
                    {analysis.riskLevel}
                  </span>
                </div>

                {/* Summary */}
                <p className="text-neutral-300 text-sm line-clamp-3 mb-4">
                  {analysis.trendSummary}
                </p>

                {/* Date */}
                <div className="text-xs text-neutral-500">
                  {new Date(analysis.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

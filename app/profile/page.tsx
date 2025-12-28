"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<"overview" | "stats" | "settings">("overview");
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const savedPoints = localStorage.getItem('tradingxbert_points');
    setPoints(parseInt(savedPoints || '0'));
  }, []);

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#0A0A0F] via-[#1a1a2e] to-[#0f3460] flex items-center justify-center relative overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute w-96 h-96 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full blur-3xl"
        />
        <div className="text-center relative z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-8xl mb-6"
          >
            🚀
          </motion.div>
          <p className="text-2xl font-black text-[#FFD700]">Loading...</p>
        </div>
      </main>
    );
  }

  if (status === "unauthenticated") {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#0A0A0F] via-[#1a1a2e] to-[#0f3460] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl mb-6"
          >
            🔒
          </motion.div>
          <h1 className="text-5xl font-black text-white mb-4">Sign In Required</h1>
          <p className="text-xl text-neutral-300 mb-8">
            Create your account to access your trading profile
          </p>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-black text-xl rounded-full"
            >
              Get Started →
            </motion.button>
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0A0A0F] via-[#1a1a2e] to-[#0f3460] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full blur-xl"
              />
              <img
                src={session?.user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session?.user?.email}`}
                alt={session?.user?.name || "User"}
                className="w-32 h-32 rounded-full border-4 border-[#FFD700] relative z-10"
              />
            </motion.div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
                {session?.user?.name || "Trader"}
              </h1>
              <p className="text-xl text-[#FFD700] mb-2">{session?.user?.email}</p>
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block px-6 py-2 bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 border border-[#FFD700] rounded-full"
              >
                <span className="text-2xl font-black text-white">🏆 {points} Points</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {[
            { id: "overview", label: "Overview", icon: "📊" },
            { id: "stats", label: "Stats", icon: "📈" },
            { id: "settings", label: "Settings", icon: "⚙️" }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 px-6 py-4 font-bold rounded-xl transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black"
                  : "bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              <span className="text-xl mr-2">{tab.icon}</span>
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Why Different Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-[#6366F1]/20 to-[#8B5CF6]/20 backdrop-blur-xl rounded-3xl border border-[#6366F1]/50 p-8"
            >
              <h2 className="text-4xl font-black text-white mb-6 text-center">
                🎯 Why TradingXbert is Different
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: "🤖",
                    title: "Trading-Only AI",
                    desc: "Unlike ChatGPT or other generalist AIs, we ONLY focus on trading. 10x more accurate."
                  },
                  {
                    icon: "⚡",
                    title: "Laser-Focused",
                    desc: "Big AI models try to do everything. We do ONE thing perfectly: analyze your trades."
                  },
                  {
                    icon: "🎯",
                    title: "Specialized Training",
                    desc: "Trained exclusively on trading data. Not poetry, not recipes—just TRADING."
                  },
                  {
                    icon: "🚀",
                    title: "Built for Traders",
                    desc: "Every feature designed for traders. No bloat, no distractions—just wins."
                  }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-start gap-4 bg-white/5 p-6 rounded-2xl"
                  >
                    <span className="text-4xl">{item.icon}</span>
                    <div>
                      <h3 className="text-xl font-black text-[#FFD700] mb-2">{item.title}</h3>
                      <p className="text-neutral-300">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Analyze Chart", icon: "📊", href: "/", color: "from-blue-500 to-cyan-500" },
                { title: "University", icon: "🎓", href: "/university", color: "from-purple-500 to-pink-500" },
                { title: "Upgrade to Pro", icon: "⚡", href: "/pricing", color: "from-[#FFD700] to-[#FFA500]" }
              ].map((action, i) => (
                <Link key={i} href={action.href}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`bg-gradient-to-r ${action.color} p-8 rounded-3xl text-center cursor-pointer`}
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-6xl mb-4"
                    >
                      {action.icon}
                    </motion.div>
                    <h3 className="text-2xl font-black text-white">{action.title}</h3>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Stats Tab */}
        {activeTab === "stats" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-4 gap-6"
          >
            {[
              { label: "Total Points", value: points, icon: "🏆", color: "from-yellow-500 to-orange-500" },
              { label: "Courses", value: "0", icon: "🎓", color: "from-blue-500 to-cyan-500" },
              { label: "Analyses", value: "0", icon: "📊", color: "from-green-500 to-emerald-500" },
              { label: "Streak", value: "0 days", icon: "🔥", color: "from-red-500 to-pink-500" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-8 relative overflow-hidden"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-r ${stat.color} opacity-20 blur-2xl`}
                />
                <div className="text-5xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-sm text-neutral-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-8"
          >
            <h2 className="text-3xl font-black text-white mb-8">Account Settings</h2>
            <div className="space-y-6">
              {[
                {
                  title: "Email Notifications",
                  desc: "Receive trade alerts via email",
                  action: "Enabled",
                  actionColor: "bg-green-500"
                },
                {
                  title: "SMS Alerts",
                  desc: "Get instant SMS for signals (Pro only)",
                  action: "Upgrade",
                  actionColor: "bg-[#FFD700] text-black",
                  link: "/pricing"
                },
                {
                  title: "Push Notifications",
                  desc: "Browser notifications for new signals",
                  action: "Enable",
                  actionColor: "bg-blue-500"
                }
              ].map((setting, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-6 bg-white/5 rounded-2xl"
                >
                  <div>
                    <h3 className="text-xl font-black text-white mb-1">{setting.title}</h3>
                    <p className="text-sm text-neutral-400">{setting.desc}</p>
                  </div>
                  {setting.link ? (
                    <Link href={setting.link}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-6 py-2 ${setting.actionColor} font-bold rounded-lg`}
                      >
                        {setting.action}
                      </motion.button>
                    </Link>
                  ) : (
                    <button className={`px-6 py-2 ${setting.actionColor} text-white font-bold rounded-lg`}>
                      {setting.action}
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}

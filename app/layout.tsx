"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { motion } from "framer-motion";
import 'isomorphic-fetch';
import { SessionProvider } from "next-auth/react";
import SignInButton from "@/components/SignInButton";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
        <link rel="apple-touch-icon" href="/favicon-32.png" />
        <meta name="theme-color" content="#0A0A0A" />
      </head>
      <body className={inter.className + " min-h-screen bg-[#0A0A0A] text-neutral-200 antialiased"}>
        <SessionProvider>
        <motion.header 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="sticky top-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xl text-neutral-200 py-4 border-b border-[#6366F1]/10"
        >
          <nav className="max-w-screen-xl mx-auto flex justify-between items-center px-6">
            <Link href="/" className="group flex items-center gap-3">
              <motion.span 
                className="inline-block w-10 h-10"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="g1" x1="0" x2="1">
                      <stop offset="0%" stopColor="#6366F1" />
                      <stop offset="50%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                  <rect x="2" y="2" width="60" height="60" rx="12" fill="url(#g1)" />
                  <path d="M18 18 H46" stroke="white" strokeWidth="4" strokeLinecap="round" />
                  <path d="M32 18 V46" stroke="white" strokeWidth="4" strokeLinecap="round" />
                  <path d="M20 46 L44 20" stroke="white" strokeWidth="3" strokeLinecap="round" />
                  <path d="M44 46 L20 20" stroke="white" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </motion.span>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899]"
              >
                TradingXbert
              </motion.div>
            </Link>
            <ul className="flex items-center space-x-2 md:space-x-6">
              <motion.li whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="hidden lg:block">
                <Link href="/blog" className="relative group">
                  <span className="hover:text-[#6366F1] transition-colors duration-300">Blog</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.li>
              <motion.li whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="hidden md:block">
                <Link href="/about" className="relative group">
                  <span className="hover:text-[#6366F1] transition-colors duration-300">About</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.li>
              <li className="relative group z-50 hidden lg:block">
                <button
                  className="hover:text-[#6366F1] transition-colors duration-300"
                  onClick={(e) => {
                    const dropdown = e.currentTarget.nextElementSibling;
                    if (dropdown) {
                      dropdown.classList.toggle('hidden');
                    }
                  }}
                >
                  How to Trade
                </button>
                <ul className="absolute hidden bg-[#0A0A0A]/95 backdrop-blur-xl text-sm text-neutral-300 mt-3 rounded-xl shadow-2xl border border-[#6366F1]/20 overflow-hidden min-w-[200px] left-1/2 -translate-x-1/2 z-50">
                  <li>
                    <Link href="/how-to-trade/spot-good-trades" className="block px-5 py-3 hover:bg-gradient-to-r hover:from-[#6366F1]/20 hover:to-[#8B5CF6]/20 transition-all duration-300 whitespace-nowrap">
                      Spot Good Trades
                    </Link>
                  </li>
                  <li>
                    <Link href="/how-to-trade/risk-management" className="block px-5 py-3 hover:bg-gradient-to-r hover:from-[#6366F1]/20 hover:to-[#8B5CF6]/20 transition-all duration-300 whitespace-nowrap">
                      Risk Management
                    </Link>
                  </li>
                  <li>
                    <Link href="/how-to-trade/using-ai" className="block px-5 py-3 hover:bg-gradient-to-r hover:from-[#6366F1]/20 hover:to-[#8B5CF6]/20 transition-all duration-300 whitespace-nowrap">
                      Using AI in Trading
                    </Link>
                  </li>
                </ul>
              </li>
              <motion.li whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="hidden md:block">
                <Link href="/profile" className="relative group">
                  <span className="hover:text-[#FFD700] transition-colors duration-300">👤 Profile</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FFD700] to-[#FFA500] group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.li>
              <motion.li whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="hidden lg:block">
                <Link href="/pricing" className="relative group">
                  <span className="hover:text-[#6366F1] transition-colors duration-300">💎 Pricing</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.li>
              <motion.li whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="hidden lg:block">
                <Link href="/invest" className="relative group">
                  <span className="hover:text-emerald-400 transition-colors duration-300">🚀 $TXB</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.li>
              <li>
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="/pricing"
                    className="px-3 md:px-6 py-2 md:py-2.5 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black rounded-full font-bold text-sm whitespace-nowrap"
                  >
                    Get Pro
                  </Link>
                </motion.div>
              </li>
              <li>
                <SignInButton />
              </li>
            </ul>
          </nav>
        </motion.header>
        
        {/* Stock Exchange Style Sale Banner */}
        <div className="relative bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899] overflow-hidden py-2 border-b border-white/10">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex items-center gap-12 whitespace-nowrap"
          >
            <div className="flex items-center gap-12">
              <span className="text-white font-bold text-sm flex items-center gap-2">
                🚀 PRO PLAN: $9.99/MO
              </span>
              <span className="text-white/90 text-sm">
                Unlimited Analyses: <span className="font-bold">ALL Timeframes</span>
              </span>
              <span className="text-white font-bold text-sm flex items-center gap-2">
                📊 1MIN • 5MIN • 15MIN
              </span>
              <span className="text-white/90 text-sm">
                Free Plan: <span className="font-bold">10 charts/month (Day only)</span>
              </span>
              <span className="text-white font-bold text-sm flex items-center gap-2">
                ⚡ INSTANT RESULTS
              </span>
              <span className="text-white/90 text-sm">
                AI-Powered: <span className="font-bold">90%+ Accuracy</span>
              </span>
              <span className="text-white font-bold text-sm flex items-center gap-2">
                💎 SMART MONEY DETECTION
              </span>
              <span className="text-white/90 text-sm">
                Pro Features: <span className="font-bold">Priority Processing</span>
              </span>
            </div>
            {/* Duplicate for seamless loop */}
            <div className="flex items-center gap-12">
              <span className="text-white font-bold text-sm flex items-center gap-2">
                🚀 PRO PLAN: $9.99/MO
              </span>
              <span className="text-white/90 text-sm">
                Unlimited Analyses: <span className="font-bold">ALL Timeframes</span>
              </span>
              <span className="text-white font-bold text-sm flex items-center gap-2">
                📊 1MIN • 5MIN • 15MIN
              </span>
              <span className="text-white/90 text-sm">
                Free Plan: <span className="font-bold">10 charts/month (Day only)</span>
              </span>
              <span className="text-white font-bold text-sm flex items-center gap-2">
                ⚡ INSTANT RESULTS
              </span>
              <span className="text-white/90 text-sm">
                AI-Powered: <span className="font-bold">90%+ Accuracy</span>
              </span>
              <span className="text-white font-bold text-sm flex items-center gap-2">
                💎 SMART MONEY DETECTION
              </span>
              <span className="text-white/90 text-sm">
                Pro Features: <span className="font-bold">Priority Processing</span>
              </span>
            </div>
          </motion.div>
        </div>

        {children}
        </SessionProvider>
      </body>
    </html>
  );
}

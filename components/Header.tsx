// /components/Header.tsx
"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import SignInButton from "./SignInButton";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    if (session?.user?.email) {
      fetch('/api/validate-subscription')
        .then(res => res.json())
        .then(data => setIsPro(data.isPro))
        .catch(() => setIsPro(false));
    }
  }, [session]);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    if (session?.user?.email) {
      fetch('/api/validate-subscription')
        .then(res => res.json())
        .then(data => setIsPro(data.isPro))
        .catch(() => setIsPro(false));
    }
  }, [session]);

  return (
    <>
    <header className="w-full flex items-center justify-between px-4 py-4 max-w-7xl mx-auto border-b border-[#FFD700]/20 backdrop-blur-xl bg-black/80 sticky top-0 z-50 shadow-lg shadow-[#FFD700]/5">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FFA500] blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative text-3xl md:text-4xl">📊</div>
        </div>
        <div>
          <div className="font-black text-lg md:text-2xl tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500]">
              TradingXbert
            </span>
          </div>
          <div className="text-[8px] md:text-[10px] text-[#FFD700]/60 font-bold tracking-wider">
            AI SPECIALIZED IN TRADING ONLY
          </div>
        </div>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex items-center gap-1 md:gap-2 flex-shrink-0">
        {/* Learn Section */}
        <Link 
          href="/university" 
          className="flex items-center gap-1 px-2 md:px-3 py-2 text-xs md:text-sm text-white hover:text-[#FFD700] transition-all rounded-lg hover:bg-gradient-to-r hover:from-[#FFD700]/20 hover:to-[#FFA500]/20 border border-transparent hover:border-[#FFD700]/50 font-bold"
        >
          <span className="text-base">🎓</span>
          <span className="hidden lg:inline">Learn</span>
        </Link>
        
        {/* Community Section */}
        <Link 
          href="/community" 
          className="flex items-center gap-1 px-2 md:px-3 py-2 text-xs md:text-sm text-white hover:text-[#FFD700] transition-all rounded-lg hover:bg-white/10 border border-transparent hover:border-[#FFD700]/50 font-bold"
        >
          <span className="text-base">👥</span>
          <span className="hidden lg:inline">Community</span>
        </Link>
        
        {/* Messages */}
        <Link 
          href="/messages" 
          className="flex items-center gap-1 px-2 md:px-3 py-2 text-xs md:text-sm text-white hover:text-[#FFD700] transition-all rounded-lg hover:bg-white/10 border border-transparent hover:border-[#FFD700]/50 relative font-bold"
        >
          <span className="text-base">💬</span>
          <span className="hidden lg:inline">Messages</span>
          {/* Notification badge */}
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">2</span>
        </Link>
        
        {/* Blog */}
        <Link 
          href="/blog/trade-analysis" 
          className="flex items-center gap-1 px-2 md:px-3 py-2 text-xs md:text-sm text-white hover:text-[#FFD700] transition-all rounded-lg hover:bg-white/10 border border-transparent hover:border-[#FFD700]/50 font-bold"
        >
          <span className="text-base">📝</span>
          <span className="hidden lg:inline">Blog</span>
        </Link>
        
        {/* News */}
        <Link 
          href="/news" 
          className="flex items-center gap-1 px-2 md:px-3 py-2 text-xs md:text-sm text-white hover:text-[#FFD700] transition-all rounded-lg hover:bg-white/10 border border-transparent hover:border-[#FFD700]/50 font-bold"
        >
          <span className="text-base">📰</span>
          <span className="hidden lg:inline">News</span>
        </Link>
        
        {/* Divider */}
        <div className="w-px h-6 bg-white/20 mx-1" />
        
        {/* Profile */}
        <Link 
          href="/profile" 
          className="flex items-center gap-1 px-2 md:px-3 py-2 text-xs md:text-sm text-neutral-300 hover:text-[#FFD700] transition-colors rounded-lg hover:bg-white/5"
        >
          <span className="text-base">👤</span>
        </Link>
        
        {/* Upgrade to Pro / Pro Badge */}
        {isPro ? (
          <div className="px-2 md:px-4 py-2 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold text-xs md:text-sm rounded-lg shadow-lg shadow-[#FFD700]/20 flex items-center gap-1">
            <span className="text-base">⚡</span>
            <span className="hidden sm:inline">PRO</span>
          </div>
        ) : (
          <Link 
            href="/pricing" 
            className="relative group px-2 md:px-4 py-2 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold text-xs md:text-sm rounded-lg overflow-hidden hover:scale-105 transition-transform shadow-lg shadow-[#FFD700]/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFA500] to-[#FFD700] opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-1">
              <span className="text-base">⚡</span>
              <span className="hidden sm:inline">Pro</span>
            </span>
          </Link>
        )}
        
        {/* Sign In */}
        <div className="text-xs md:text-base">
          <SignInButton />
        </div>
      </nav>
      
      {/* Mobile Hamburger */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden text-white p-2"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {mobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
    </header>
    
    {/* Mobile Menu */}
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-black/95 backdrop-blur-xl border-b border-[#FFD700]/20 overflow-hidden fixed top-[73px] left-0 right-0 z-40"
        >
          <nav className="flex flex-col p-4 space-y-2">
            <Link 
              href="/university"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 text-white hover:text-[#FFD700] transition-all rounded-lg hover:bg-gradient-to-r hover:from-[#FFD700]/20 hover:to-[#FFA500]/20 font-bold"
            >
              <span className="text-xl">🎓</span>
              <span>Learn</span>
            </Link>
            <Link 
              href="/community"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 text-white hover:text-[#FFD700] transition-all rounded-lg hover:bg-white/10 font-bold"
            >
              <span className="text-xl">👥</span>
              <span>Community</span>
            </Link>
            <Link 
              href="/messages"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 text-white hover:text-[#FFD700] transition-all rounded-lg hover:bg-white/10 font-bold relative"
            >
              <span className="text-xl">💬</span>
              <span>Messages</span>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">2</span>
            </Link>
            <Link 
              href="/blog/trade-analysis"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 text-white hover:text-[#FFD700] transition-all rounded-lg hover:bg-white/10 font-bold"
            >
              <span className="text-xl">📝</span>
              <span>Blog</span>
            </Link>
            <Link 
              href="/news"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 text-white hover:text-[#FFD700] transition-all rounded-lg hover:bg-white/10 font-bold"
            >
              <span className="text-xl">📰</span>
              <span>News</span>
            </Link>
            <div className="border-t border-white/20 my-2"></div>
            <Link 
              href="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 text-white hover:text-[#FFD700] transition-all rounded-lg hover:bg-white/10 font-bold"
            >
              <span className="text-xl">👤</span>
              <span>Profile</span>
            </Link>
            {isPro ? (
              <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold rounded-lg">
                <span className="text-xl">⚡</span>
                <span>PRO Member</span>
              </div>
            ) : (
              <Link 
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold rounded-lg"
              >
                <span className="text-xl">⚡</span>
                <span>Upgrade to Pro</span>
              </Link>
            )}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}

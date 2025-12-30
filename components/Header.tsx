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

  return (
    <>
    <header className="w-full flex items-center justify-between px-4 py-3 md:py-4 border-b border-[#6366F1]/20 backdrop-blur-xl bg-black/95 fixed top-0 left-0 right-0 z-[200] shadow-lg shadow-[#6366F1]/10">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 md:gap-3 group flex-shrink-0">
        <motion.div
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
          <svg className="relative w-10 h-10 md:w-12 md:h-12" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logoGrad" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
            <rect x="2" y="2" width="60" height="60" rx="12" fill="url(#logoGrad)" />
            <path d="M18 18 H46" stroke="white" strokeWidth="4" strokeLinecap="round" />
            <path d="M32 18 V46" stroke="white" strokeWidth="4" strokeLinecap="round" />
            <path d="M20 46 L44 20" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <path d="M44 46 L20 20" stroke="white" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </motion.div>
        <div>
          <div className="font-black text-xl md:text-2xl tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899]">
              TradingXbert
            </span>
          </div>
          <div className="hidden sm:block text-[9px] md:text-[10px] text-[#6366F1]/70 font-semibold tracking-wider uppercase">
            AI-Powered Trading Analysis
          </div>
        </div>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex items-center gap-1 md:gap-2 flex-shrink-0">
        {/* Learn Section */}
        <Link 
          href="/university" 
          className="flex items-center gap-1.5 px-3 md:px-4 py-2 text-xs md:text-sm text-white hover:text-[#6366F1] transition-all duration-300 rounded-lg hover:bg-gradient-to-r hover:from-[#6366F1]/20 hover:to-[#8B5CF6]/20 border border-transparent hover:border-[#6366F1]/50 font-semibold hover:shadow-lg hover:shadow-[#6366F1]/20 hover:-translate-y-0.5"
        >
          <span className="text-base">🎓</span>
          <span className="hidden lg:inline">Learn</span>
        </Link>
        
        {/* Blog */}
        <Link 
          href="/blog/trade-analysis" 
          className="flex items-center gap-1.5 px-3 md:px-4 py-2 text-xs md:text-sm text-white hover:text-[#6366F1] transition-all duration-300 rounded-lg hover:bg-white/10 border border-transparent hover:border-[#6366F1]/50 font-semibold hover:shadow-lg hover:shadow-[#6366F1]/20 hover:-translate-y-0.5"
        >
          <span className="text-base">📝</span>
          <span className="hidden lg:inline">Blog</span>
        </Link>
        
        {/* News */}
        <Link 
          href="/news" 
          className="flex items-center gap-1.5 px-3 md:px-4 py-2 text-xs md:text-sm text-white hover:text-[#8B5CF6] transition-all duration-300 rounded-lg hover:bg-white/10 border border-transparent hover:border-[#8B5CF6]/50 font-semibold hover:shadow-lg hover:shadow-[#8B5CF6]/20 hover:-translate-y-0.5"
        >
          <span className="text-base">📰</span>
          <span className="hidden lg:inline">News</span>
        </Link>
        
        {/* Divider */}
        <div className="w-px h-6 bg-white/20 mx-1" />
        
        {/* Profile */}
        <Link 
          href="/profile" 
          className="flex items-center gap-1.5 px-3 md:px-4 py-2 text-xs md:text-sm text-neutral-300 hover:text-[#6366F1] transition-all duration-300 rounded-lg hover:bg-white/10 font-semibold hover:shadow-lg hover:shadow-[#6366F1]/20 hover:-translate-y-0.5"
        >
          <span className="text-base">👤</span>
        </Link>
        
        {/* Upgrade to Pro / Pro Badge */}
        {isPro ? (
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="px-3 md:px-5 py-2 bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899] text-white font-black text-xs md:text-sm rounded-xl shadow-lg shadow-[#6366F1]/30 flex items-center gap-1.5"
          >
            <span className="text-base">⚡</span>
            <span className="hidden sm:inline">PRO</span>
          </motion.div>
        ) : (
          <Link 
            href="/pricing" 
            className="relative group px-3 md:px-5 py-2 bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899] text-white font-black text-xs md:text-sm rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-lg shadow-[#6366F1]/30 hover:shadow-[#6366F1]/50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-1.5">
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
        className="lg:hidden flex flex-col justify-center items-center w-12 h-12 text-white bg-gradient-to-r from-[#6366F1]/20 to-[#8B5CF6]/20 hover:from-[#6366F1]/30 hover:to-[#8B5CF6]/30 rounded-xl transition-all active:scale-95 border border-[#6366F1]/30 shadow-lg shadow-[#6366F1]/20"
        aria-label="Toggle menu"
      >
        <div className="w-6 h-6 relative flex flex-col justify-center items-center">
          <span className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`}></span>
          <span className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}`}></span>
        </div>
      </button>
    </header>
    
    {/* Mobile Menu */}
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="lg:hidden bg-black/98 backdrop-blur-xl border-b border-[#6366F1]/20 fixed top-[65px] left-0 right-0 z-[90] shadow-2xl shadow-[#6366F1]/10 max-h-[calc(100vh-65px)] overflow-y-auto"
        >
          <nav className="flex flex-col p-4 pb-6 space-y-1">
            <Link 
              href="/university"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-4 text-base text-white hover:text-[#6366F1] transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-[#6366F1]/20 hover:to-[#8B5CF6]/20 font-bold active:scale-95 border border-transparent hover:border-[#6366F1]/30"
            >
              <span className="text-2xl">🎓</span>
              <span>Learn</span>
            </Link>
            <Link 
              href="/blog/trade-analysis"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-4 text-base text-white hover:text-[#6366F1] transition-all duration-300 rounded-xl hover:bg-white/10 font-bold active:scale-95 border border-transparent hover:border-[#6366F1]/30"
            >
              <span className="text-2xl">📝</span>
              <span>Blog</span>
            </Link>
            <Link 
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-4 text-base text-white hover:text-[#8B5CF6] transition-all duration-300 rounded-xl hover:bg-white/10 font-bold active:scale-95 border border-transparent hover:border-[#8B5CF6]/30"
            >
              <span className="text-2xl">ℹ️</span>
              <span>About</span>
            </Link>
            <Link 
              href="/how-to-trade"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-4 text-base text-white hover:text-[#6366F1] transition-all duration-300 rounded-xl hover:bg-white/10 font-bold active:scale-95 border border-transparent hover:border-[#6366F1]/30"
            >
              <span className="text-2xl">📚</span>
              <span>How to Trade</span>
            </Link>
            <Link 
              href="/news"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-4 text-base text-white hover:text-[#6366F1] transition-all duration-300 rounded-xl hover:bg-white/10 font-bold active:scale-95 border border-transparent hover:border-[#6366F1]/30"
            >
              <span className="text-2xl">📰</span>
              <span>News</span>
            </Link>
            <div className="border-t border-white/20 my-2"></div>
            <Link 
              href="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-4 text-base text-white hover:text-[#6366F1] transition-all duration-300 rounded-xl hover:bg-white/10 font-bold active:scale-95 border border-transparent hover:border-[#6366F1]/30"
            >
              <span className="text-2xl">👤</span>
              <span>Profile</span>
            </Link>
            <Link 
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-4 text-base text-white hover:text-[#6366F1] transition-all duration-300 rounded-xl hover:bg-white/10 font-bold active:scale-95 border border-transparent hover:border-[#6366F1]/30"
            >
              <span className="text-2xl">💎</span>
              <span>Pricing</span>
            </Link>
            <Link 
              href="/invest"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-4 text-base text-white hover:text-emerald-400 transition-all duration-300 rounded-xl hover:bg-white/10 font-bold active:scale-95 border border-transparent hover:border-emerald-400/30"
            >
              <span className="text-2xl">🚀</span>
              <span>$TXB Token</span>
            </Link>
            <div className="border-t border-white/20 my-2"></div>
            {isPro ? (
              <div className="flex items-center gap-3 px-4 py-4 text-base bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899] text-white font-black rounded-xl shadow-lg shadow-[#6366F1]/30">
                <span className="text-2xl">⚡</span>
                <span>PRO Member</span>
              </div>
            ) : (
              <Link 
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-4 text-base bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899] text-white font-black rounded-xl active:scale-95 shadow-lg shadow-[#6366F1]/30"
              >
                <span className="text-2xl">⚡</span>
                <span>Get Pro</span>
              </Link>
            )}
            <SignInButton />
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}

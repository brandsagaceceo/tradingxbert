// /components/Header.tsx
"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import SignInButton from "./SignInButton";

export default function Header() {
  const { data: session } = useSession();

  return (
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

      {/* Nav */}
      <nav className="flex items-center gap-1 md:gap-2 flex-shrink-0">
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
        
        {/* Divider */}
        <div className="w-px h-6 bg-white/20 mx-1" />
        
        {/* Profile */}
        <Link 
          href="/profile" 
          className="flex items-center gap-1 px-2 md:px-3 py-2 text-xs md:text-sm text-neutral-300 hover:text-[#FFD700] transition-colors rounded-lg hover:bg-white/5"
        >
          <span className="text-base">👤</span>
        </Link>
        
        {/* Upgrade to Pro */}
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
        
        {/* Sign In */}
        <div className="text-xs md:text-base">
          <SignInButton />
        </div>
      </nav>
    </header>
  );
}

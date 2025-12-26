// /components/Header.tsx
"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import SignInButton from "./SignInButton";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="w-full flex items-center justify-between px-4 py-4 max-w-7xl mx-auto border-b border-white/5 backdrop-blur-lg bg-black/50 sticky top-0 z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FFA500] blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
          <div className="relative text-3xl md:text-4xl">📊</div>
        </div>
        <div>
          <div className="font-black text-lg md:text-2xl tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500]">
              TradingXbert
            </span>
          </div>
          <div className="text-[8px] md:text-[10px] text-neutral-500 font-medium tracking-wider">
            AI CHART ANALYSIS
          </div>
        </div>
      </Link>

      {/* Nav */}
      <nav className="flex items-center gap-1 md:gap-3 flex-shrink-0">
        <Link 
          href="/how-to-trade" 
          className="hidden lg:flex items-center gap-1 px-3 py-2 text-sm text-neutral-300 hover:text-[#FFD700] transition-colors rounded-lg hover:bg-white/5"
        >
          🎓 <span className="hidden xl:inline">Course</span>
        </Link>
        
        {session && (
          <Link 
            href="/profile" 
            className="flex items-center gap-1 px-2 md:px-3 py-2 text-xs md:text-sm text-neutral-300 hover:text-[#FFD700] transition-colors rounded-lg hover:bg-white/5"
          >
            👤 <span className="hidden sm:inline">Profile</span>
          </Link>
        )}
        
        <Link 
          href="/pricing" 
          className="relative group px-3 md:px-4 py-2 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold text-xs md:text-sm rounded-lg overflow-hidden hover:scale-105 transition-transform"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFA500] to-[#FFD700] opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative flex items-center gap-1">
            ⚡ <span className="hidden sm:inline">Pro</span>
          </span>
        </Link>
        
        <div className="text-xs md:text-base">
          <SignInButton />
        </div>
      </nav>
    </header>
  );
}

// /components/Header.tsx
import Link from "next/link";
import SignInButton from "./SignInButton";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-4 max-w-7xl mx-auto">
      <Link href="/" className="flex items-center gap-3 group">
        <span className="inline-block w-10 h-10">
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="50%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect x="2" y="2" width="60" height="60" rx="12" fill="url(#g1)" />

            {/* T - stylized */}
            <path d="M18 18 H46" stroke="rgba(255,255,255,0.95)" strokeWidth="4" strokeLinecap="round" />
            <path d="M32 18 V46" stroke="rgba(255,255,255,0.95)" strokeWidth="4" strokeLinecap="round" />

            {/* X - with subtle up/down arrows integrated into strokes */}
            <g filter="url(#glow)">
              <path d="M20 46 L44 20" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M44 46 L20 20" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

              {/* subtle accent removed for cleaner logomark */}
            </g>
          </svg>
        </span>
        <span className="inline-block md:hidden font-bold text-2xl tracking-tight text-white group-hover:opacity-90 transition">TradingXbert</span>
      </Link>
      <div className="flex-1 flex justify-center md:justify-start">
        <Link href="/" className="ml-3 hidden md:inline-block">
          <span className="font-bold text-2xl tracking-tight text-white group-hover:opacity-90 transition">TradingXbert</span>
        </Link>
      </div>
      <nav className="flex items-center gap-4 text-sm">
        <Link href="/how-to-trade" className="btn btn-ghost focus-ring hover:text-[#6366F1] transition-colors" aria-label="Free Trading Course">🎓 Free Course</Link>
        <Link href="/invest" className="btn btn-ghost focus-ring hover:text-emerald-400 transition-colors" aria-label="Invest in TXB">🚀 $TXB</Link>
        <Link href="/journal" className="btn btn-ghost focus-ring" aria-label="Open journal">📔 Journal</Link>
        <SignInButton />
      </nav>
    </header>
  );
}

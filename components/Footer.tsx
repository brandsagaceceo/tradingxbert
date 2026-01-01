// /components/Footer.tsx
import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-black/40 backdrop-blur-xl border-t border-white/10 mt-20 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company */}
          <div>
            <h3 className="text-[#6366F1] font-bold text-lg mb-4">📊 TradingXbert</h3>
            <p className="text-neutral-400 text-sm">AI-powered trading education and chart analysis platform.</p>
          </div>
          
          {/* Learn */}
          <div>
            <h4 className="text-white font-bold mb-4">Learn</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/university" className="text-neutral-400 hover:text-[#6366F1] transition-colors">TradingXbert University</Link>
              <Link href="/how-to-trade" className="text-neutral-400 hover:text-[#6366F1] transition-colors">How to Trade</Link>
              <Link href="/blog" className="text-neutral-400 hover:text-[#6366F1] transition-colors">Education</Link>
            </div>
          </div>
          
          {/* Product */}
          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/pricing" className="text-neutral-400 hover:text-[#6366F1] transition-colors">Pricing</Link>
              <Link href="/invest" className="text-neutral-400 hover:text-emerald-400 transition-colors">$TXB Token</Link>
              <Link href="/news" className="text-neutral-400 hover:text-[#6366F1] transition-colors">News</Link>
            </div>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/about" className="text-neutral-400 hover:text-[#6366F1] transition-colors">About</Link>
              <Link href="/legal" className="text-neutral-400 hover:text-[#6366F1] transition-colors">Legal</Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
            <p>© 2025 TradingXbert. All rights reserved.</p>
            <p className="text-xs text-center md:text-right">
              ⚠️ <strong>Risk Disclaimer:</strong> Trading involves substantial risk. Educational platform only - not financial advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

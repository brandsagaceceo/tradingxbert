"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { motion } from "framer-motion";
import 'isomorphic-fetch';
import { SessionProvider } from "next-auth/react";
import SignInButton from "@/components/SignInButton";
import RiskDisclaimer from "@/components/RiskDisclaimer";
import Header from "@/components/Header";
import WelcomeChatbot from "@/components/WelcomeChatbot";
import Script from 'next/script';

const inter = Inter({ 
  subsets: ["latin"], 
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial']
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="AI-powered trading chart analysis tool. Educational trading analysis platform. Not financial advice." />
        <meta name="keywords" content="trading education, chart analysis tool, trading learning platform, AI trading analysis" />
        <meta name="author" content="TradingXbert" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="TradingXbert - AI Trading Education Platform" />
        <meta property="og:description" content="Learn trading with AI-powered chart analysis. Educational platform for traders." />
        <meta property="og:url" content="https://www.tradingxbert.com" />
        <link rel="canonical" href="https://www.tradingxbert.com" />
        <link rel="icon" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
        <link rel="apple-touch-icon" href="/favicon-32.png" />
        <meta name="theme-color" content="#0A0A0A" />
      </head>
      <body 
        className={inter.className + " min-h-screen bg-[#0A0A0A] text-neutral-200 antialiased pt-[120px]"}
        style={{
          paddingBottom: 'calc(var(--bottom-ui-offset, 0px) + env(safe-area-inset-bottom, 0px))'
        }}
        suppressHydrationWarning
      >
        {/* Microsoft Clarity Analytics */}
        <Script
          id="clarity-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "utaekz25le");
            `,
          }}
        />
        <SessionProvider>
        <RiskDisclaimer />
        <Header />
        
        {/* Stock Exchange Style Sale Banner */}
        <div className="fixed top-[80px] left-0 right-0 z-[9998] bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899] overflow-hidden py-2 border-b border-white/10">
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
            <div className="flex items-center gap-8 md:gap-12">
              <span className="text-white font-bold text-xs md:text-sm flex items-center gap-2">
                🚀 PRO PLAN: $9.99/MO
              </span>
              <span className="text-white/90 text-xs md:text-sm">
                Unlimited Analyses: <span className="font-bold">ALL Timeframes</span>
              </span>
              <span className="text-white font-bold text-xs md:text-sm flex items-center gap-2">
                📊 1MIN • 5MIN • 15MIN
              </span>
              <span className="text-white/90 text-xs md:text-sm">
                Free Plan: <span className="font-bold">10 charts/month (Day only)</span>
              </span>
              <span className="text-white font-bold text-xs md:text-sm flex items-center gap-2">
                ⚡ INSTANT RESULTS
              </span>
              <span className="text-white/90 text-xs md:text-sm">
                AI-Powered: <span className="font-bold">90%+ Accuracy</span>
              </span>
              <span className="text-white font-bold text-xs md:text-sm flex items-center gap-2">
                💎 SMART MONEY DETECTION
              </span>
              <span className="text-white/90 text-xs md:text-sm">
                Pro Features: <span className="font-bold">Priority Processing</span>
              </span>
            </div>
          </motion.div>
        </div>

        {children}
        <WelcomeChatbot delay={3000} />
        </SessionProvider>
      </body>
    </html>
  );
}

"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import 'isomorphic-fetch';
import { SessionProvider } from "next-auth/react";
import RiskDisclaimer from "@/components/RiskDisclaimer";
import Header from "@/components/Header";
import Script from 'next/script';
import dynamic from 'next/dynamic';

// Lazy load heavy components that don't affect LCP
const WelcomeChatbot = dynamic(() => import("@/components/WelcomeChatbot"), { 
  loading: () => null,
  ssr: false 
});

const PromoBanner = dynamic(() => import("@/components/PromoBanner"), {
  loading: () => null,
  ssr: false
});

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
        <link rel="icon" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
        <link rel="apple-touch-icon" href="/favicon-32.png" />
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://www.clarity.ms" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body 
        className={inter.className + " min-h-screen bg-[#0A0A0A] text-neutral-200 antialiased pt-[120px]"}
        style={{
          paddingBottom: 'calc(var(--bottom-ui-offset, 0px) + env(safe-area-inset-bottom, 0px))'
        }}
        suppressHydrationWarning
      >
        {/* Microsoft Clarity Analytics - Deferred loading */}
        <Script
          id="clarity-analytics"
          strategy="lazyOnload"
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
        
        {/* Stock Exchange Style Sale Banner - Lazy loaded */}
        <PromoBanner />
        
        {/* Stock Exchange Style Sale Banner - Lazy loaded */}
        <PromoBanner />

        {children}
        <WelcomeChatbot delay={500} />
        </SessionProvider>
      </body>
    </html>
  );
}

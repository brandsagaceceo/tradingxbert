"use client";

import React from "react";

type Props = {
  analysis: any;
  market: string;
  style: string;
  preview?: string | null;
};

function makeShort(text: string, max = 240) {
  if (!text) return "";
  return text.length > max ? text.slice(0, max - 1) + "…" : text;
}

export default function ShareButtons({ analysis, market, style, preview }: Props) {
  const url = typeof window !== "undefined" ? window.location.href : "";

  const text = `TradingXbert Analysis — ${analysis.signal} (${analysis.confidence}%): ${makeShort(
    analysis.trendSummary || analysis.patternSummary || "Professional chart analysis",
    240
  )} \nMarket: ${market} | Style: ${style}`;

  const handleNativeShare = async () => {
    if ((navigator as any).share) {
      try {
        await (navigator as any).share({
          title: "TradingXbert Analysis",
          text,
          url,
        });
      } catch (err) {
        // user cancelled or not supported
      }
    } else {
      // fallback: open telegram share
      const tg = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
      window.open(tg, "_blank");
    }
  };

  const telegramHref = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(
    text
  )}`;

  const twitterHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(
    url
  )}`;

  return (
    <div className="flex gap-3 items-center">
      <button
        onClick={handleNativeShare}
        className="bg-white/5 hover:bg-white/10 border border-white/10 text-white btn-icon-circle"
        aria-label="Share"
        title="Share"
      >
        🔗
      </button>

      <a
        href={telegramHref}
        target="_blank"
        rel="noreferrer"
        className="bg-[#2AABEE] hover:brightness-110 text-white btn-icon-circle"
        aria-label="Share on Telegram"
        title="Share on Telegram"
      >
        ✈️
      </a>

      <a
        href={twitterHref}
        target="_blank"
        rel="noreferrer"
        className="bg-[#1DA1F2] hover:brightness-110 text-white btn-icon-circle"
        aria-label="Share on Twitter"
        title="Share on Twitter"
      >
        🐦
      </a>
    </div>
  );
}

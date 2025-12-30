"use client";
import { motion } from "framer-motion";
import { useState } from "react";

interface NewsShareButtonsProps {
  title: string;
  url: string;
}

export default function NewsShareButtons({ title, url }: NewsShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <motion.a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-8 h-8 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white text-xs font-bold hover:shadow-lg hover:shadow-[#1DA1F2]/50 transition-all"
        title="Share on X"
      >
        𝕏
      </motion.a>
      
      <motion.a
        href={shareLinks.telegram}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-8 h-8 rounded-full bg-[#0088cc] flex items-center justify-center text-white hover:shadow-lg hover:shadow-[#0088cc]/50 transition-all"
        title="Share on Telegram"
      >
        ✈
      </motion.a>
      
      <motion.button
        onClick={copyToClipboard}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs transition-all ${
          copied 
            ? 'bg-green-500 shadow-lg shadow-green-500/50' 
            : 'bg-neutral-700 hover:bg-neutral-600'
        }`}
        title={copied ? "Copied!" : "Copy link"}
      >
        {copied ? '✓' : '🔗'}
      </motion.button>
    </div>
  );
}

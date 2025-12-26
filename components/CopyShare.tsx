// /components/CopyShare.tsx
'use client';
import { useState } from 'react';

export default function CopyShare({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  }
  return (
    <button
      onClick={handleCopy}
      className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-neutral-200 font-semibold text-sm transition"
      aria-label="Copy result summary"
    >
      {copied ? "Copied!" : "Share Result"}
    </button>
  );
}

// /components/TrendList.tsx
import React from "react";

interface Props {
  tokens: string[];
  onSelect: (token: string) => void;
}

export default function TrendList({ tokens, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mt-2">
      {tokens.map((token) => (
        <button
          key={token}
          type="button"
          className="px-3 py-1 rounded-full bg-white/10 text-[#39FF14] text-sm font-mono hover:bg-[#39FF14]/10 focus:outline-none focus:ring-2 focus:ring-[#39FF14]"
          aria-label={`Analyze trending token ${token}`}
          onClick={() => onSelect(token)}
        >
          {token}
        </button>
      ))}
    </div>
  );
}

// /components/SearchBar.tsx
import React, { useRef, useEffect, useState } from "react";

interface Props {
  onSubmit: (query: string) => void;
}

const CHIPS = ["$WIF", "$BONK", "$COQ", "$WWED"];

export default function SearchBar({ onSubmit }: Props) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setValue(v);
    // If user types $, keep caret in input
    if (v.endsWith("$") && inputRef.current) {
      const pos = v.length;
      inputRef.current.setSelectionRange(pos, pos);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && value.trim()) {
      onSubmit(value.trim());
    }
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <input
        ref={inputRef}
        className="w-full px-4 py-3 rounded-xl bg-white/10 text-lg text-neutral-200 outline-none ring-2 ring-transparent focus:ring-[#39FF14] transition"
        placeholder="Paste Solana token address or type $SYMBOL"
        aria-label="Token search input"
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        spellCheck={false}
      />
      <div className="flex flex-wrap gap-2 mt-1">
        {CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            className="px-3 py-1 rounded-full bg-white/10 text-[#39FF14] text-sm font-mono hover:bg-[#39FF14]/10 focus:outline-none focus:ring-2 focus:ring-[#39FF14]"
            aria-label={`Quick search for ${chip}`}
            onClick={() => { setValue(chip); onSubmit(chip); }}
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}

// /components/MeterChip.tsx
import React from "react";

interface Props {
  label: string;
  value: string | number;
}

export default function MeterChip({ label, value }: Props) {
  let color = "bg-white/10 text-neutral-200 border-white/10";
  if (label === "Risk" && typeof value === "string" && value.includes("/")) {
    const n = parseInt(value.split("/")[0], 10);
    if (n >= 8) color = "bg-[#F87171]/20 text-[#F87171] border-[#F87171]";
    else if (n >= 5) color = "bg-[#FBBF24]/20 text-[#FBBF24] border-[#FBBF24]";
    else color = "bg-[#34D399]/20 text-[#34D399] border-[#34D399]";
  }
  if (label === "Hype" && typeof value === "string" && value.includes("/")) {
    const n = parseInt(value.split("/")[0], 10);
    if (n >= 8) color = "bg-[#34D399]/20 text-[#34D399] border-[#34D399]";
    else if (n >= 5) color = "bg-[#FBBF24]/20 text-[#FBBF24] border-[#FBBF24]";
    else color = "bg-white/10 text-neutral-200 border-white/10";
  }
  if (label === "Liquidity") {
    if (value === "High") color = "bg-[#34D399]/20 text-[#34D399] border-[#34D399]";
    else if (value === "Medium") color = "bg-[#FBBF24]/20 text-[#FBBF24] border-[#FBBF24]";
    else if (value === "Low") color = "bg-[#F87171]/20 text-[#F87171] border-[#F87171]";
    else color = "bg-white/10 text-neutral-200 border-white/10";
  }
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border mr-2 ${color}`}
      aria-label={`${label} ${value}`}
    >
      {label} {value}
    </span>
  );
}

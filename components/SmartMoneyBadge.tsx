// components/SmartMoneyBadge.tsx
import type { SmartMoneyBias } from "@/lib/tradingTypes";

interface Props {
  bias: SmartMoneyBias;
}

export default function SmartMoneyBadge({ bias }: Props) {
  const styles: Record<SmartMoneyBias, { bg: string; text: string; icon: string }> = {
    "Smart Money Bullish": { bg: "bg-emerald-500/20", text: "text-emerald-400", icon: "🐂" },
    "Smart Money Bearish": { bg: "bg-red-500/20", text: "text-red-400", icon: "🐻" },
    "Neutral": { bg: "bg-neutral-500/20", text: "text-neutral-400", icon: "⚖️" },
    "Liquidity Grab Scenario": { bg: "bg-yellow-500/20", text: "text-yellow-400", icon: "💰" },
    "Possible Trap Zone": { bg: "bg-orange-500/20", text: "text-orange-400", icon: "⚠️" },
  };

  const style = styles[bias];

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${style.bg} border border-white/10`}>
      <span className="text-2xl">{style.icon}</span>
      <div>
        <div className="text-xs text-neutral-400 uppercase tracking-wide">Smart Money Bias</div>
        <div className={`font-bold ${style.text}`}>{bias}</div>
      </div>
    </div>
  );
}

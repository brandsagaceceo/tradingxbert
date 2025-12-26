// components/ConfidenceMeter.tsx
import type { ConfidenceBreakdown } from "@/lib/tradingTypes";

interface Props {
  breakdown: ConfidenceBreakdown;
}

export default function ConfidenceMeter({ breakdown }: Props) {
  const items = [
    { label: "Trend", value: breakdown.trend, color: "bg-blue-500" },
    { label: "Pattern", value: breakdown.pattern, color: "bg-purple-500" },
    { label: "Momentum", value: breakdown.momentum, color: "bg-emerald-500" },
    { label: "Volume", value: breakdown.volume, color: "bg-orange-500" },
  ];

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.label}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-neutral-300">{item.label}</span>
            <span className="font-semibold text-white">{item.value}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full ${item.color} transition-all duration-500`}
              style={{ width: `${item.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

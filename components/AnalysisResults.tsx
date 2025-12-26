// components/AnalysisResults.tsx
"use client";
import type { TradingXbertAnalysis } from "@/lib/tradingTypes";

interface AnalysisResultsProps {
  analysis: TradingXbertAnalysis;
  onReset: () => void;
}

export default function AnalysisResults({ analysis, onReset }: AnalysisResultsProps) {
  const handleCopy = () => {
    const summary = `
TradingXbert Analysis
═══════════════════════

SIGNAL: ${analysis.signal} (${analysis.confidence}% confidence)
RISK LEVEL: ${analysis.riskLevel}

TREND & STRUCTURE:
${analysis.trendSummary}

PATTERN SUMMARY:
${analysis.patternSummary}

KEY LEVELS:
${analysis.keyLevels}

STYLE NOTES:
${analysis.styleNotes}

${analysis.emotionSummary ? `EMOTION CHECK:\n${analysis.emotionSummary}\n\n` : ""}
${analysis.riskPlan ? `RISK PLAN:\n${analysis.riskPlan}\n\n` : ""}
TEACH ME THIS SETUP:
${analysis.teachingTips}
    `.trim();

    navigator.clipboard.writeText(summary);
  };

  const signalColors = {
    LONG: "bg-emerald-500/20 border-emerald-500/50 text-emerald-400",
    SHORT: "bg-red-500/20 border-red-500/50 text-red-400",
    WAIT: "bg-yellow-500/20 border-yellow-500/50 text-yellow-400",
  };

  const riskColors = {
    LOW: "text-emerald-400",
    MEDIUM: "text-yellow-400",
    HIGH: "text-red-400",
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-in fade-in-0 zoom-in-95 duration-300">
      {/* Signal Card */}
      <div className={`rounded-3xl border-2 p-8 mb-6 ${signalColors[analysis.signal]}`}>
        <div className="text-center">
          <div className="text-6xl font-bold mb-2">{analysis.signal}</div>
          <div className="text-2xl font-semibold">{analysis.confidence}% Confidence</div>
        </div>
      </div>

      {/* Main Analysis */}
      <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8 shadow-2xl space-y-6">
        {/* Trend & Structure */}
        <Section title="Trend & Structure" icon="📊">
          <p className="text-neutral-300 leading-relaxed">{analysis.trendSummary}</p>
        </Section>

        {/* Pattern Summary */}
        <Section title="Pattern Summary" icon="🔍">
          <p className="text-neutral-300 leading-relaxed">{analysis.patternSummary}</p>
        </Section>

        {/* Key Levels */}
        <Section title="Key Levels" icon="🎯">
          <p className="text-neutral-300 leading-relaxed whitespace-pre-line">{analysis.keyLevels}</p>
        </Section>

        {/* Risk Level */}
        <Section title="Risk Level" icon="⚠️">
          <p className={`text-2xl font-bold ${riskColors[analysis.riskLevel]}`}>
            {analysis.riskLevel}
          </p>
        </Section>

        {/* Style Notes */}
        <Section title="Style Notes" icon="💡">
          <p className="text-neutral-300 leading-relaxed">{analysis.styleNotes}</p>
        </Section>

        {/* Emotion Check */}
        {analysis.emotionSummary && (
          <Section title="Emotion Check" icon="🧠">
            <p className="text-neutral-300 leading-relaxed italic">{analysis.emotionSummary}</p>
          </Section>
        )}

        {/* Risk Plan */}
        {analysis.riskPlan && (
          <Section title="Risk Plan" icon="💰">
            <p className="text-neutral-300 leading-relaxed">{analysis.riskPlan}</p>
          </Section>
        )}

        {/* Teaching Tips */}
        <Section title="Teach Me This Setup" icon="🎓">
          <div className="text-neutral-300 leading-relaxed whitespace-pre-line">
            {analysis.teachingTips}
          </div>
        </Section>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <button
          onClick={onReset}
          className="flex-1 bg-[#6366F1] hover:bg-[#5558E3] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          New Analysis
        </button>
        <button
          onClick={handleCopy}
          className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200"
        >
          Copy Summary
        </button>
      </div>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-white/10 pb-6 last:border-b-0 last:pb-0">
      <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
        <span>{icon}</span>
        <span>{title}</span>
      </h3>
      {children}
    </div>
  );
}

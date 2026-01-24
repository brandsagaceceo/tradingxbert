"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getJournal, deleteJournalEntry } from "@/lib/localStorage";
import type { JournalEntry } from "@/lib/tradingTypes";

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJournal = async () => {
      try {
        const data = await getJournal();
        setEntries(data);
      } catch (error) {
        console.error("Failed to load journal:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadJournal();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Delete this journal entry?")) {
      try {
        await deleteJournalEntry(id);
        const updated = await getJournal();
        setEntries(updated);
        if (selectedEntry?.id === id) {
          setSelectedEntry(null);
        }
      } catch (error) {
        console.error("Failed to delete entry:", error);
        alert("Failed to delete entry");
      }
    }
  };

  const signalColors = {
    LONG: "text-emerald-400",
    SHORT: "text-red-400",
    WAIT: "text-yellow-400",
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#111827] to-[#0A0A0A] text-neutral-200">
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">
              📔 My Journal
            </h1>
            <p className="text-sm text-neutral-400">Your saved chart analyses</p>
          </div>
          <Link 
            href="/"
            className="px-4 py-2 bg-[#6366F1] hover:bg-[#5558E3] rounded-xl transition-colors text-sm font-medium"
          >
            ← Back to Analyzer
          </Link>
        </div>

        {loading ? (
          <div className="card-3d bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-12 text-center">
            <div className="text-6xl mb-4">⏳</div>
            <p className="text-xl text-neutral-300">Loading your journal...</p>
          </div>
        ) : entries.length === 0 ? (
          <div className="card-3d bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-xl text-neutral-300 mb-2">No journal entries yet</p>
            <p className="text-sm text-neutral-400 mb-6">Analyze a chart and save it to start your journal</p>
            <Link 
              href="/"
              className="btn-3d inline-block px-6 py-3 bg-[#6366F1] hover:bg-[#5558E3] rounded-xl transition-colors font-medium"
            >
              Analyze Your First Chart
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Entries List */}
            <div className="lg:col-span-1 space-y-4">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className={`card-3d bg-white/5 backdrop-blur-lg rounded-2xl border p-4 cursor-pointer transition-all ${
                    selectedEntry?.id === entry.id 
                      ? "border-[#6366F1] bg-white/10" 
                      : "border-white/10 hover:border-white/20"
                  }`}
                  onClick={() => setSelectedEntry(entry)}
                >
                  <div className="flex gap-3">
                    <img 
                      src={entry.imageData} 
                      alt="Chart" 
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <div className={`text-lg font-bold ${signalColors[entry.analysis.signal]}`}>
                        {entry.analysis.signal}
                      </div>
                      <div className="text-xs text-neutral-400">
                        {new Date(entry.timestamp).toLocaleString()}
                      </div>
                      <div className="text-xs text-neutral-500 mt-1">
                        {entry.market} • {entry.style}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const url = window.location.origin;
                        const text = `Check out my ${entry.analysis.signal} trade analysis! 📊`;
                        if (navigator.share) {
                          navigator.share({ title: 'TradingXbert Analysis', text, url });
                        } else {
                          navigator.clipboard.writeText(`${text} ${url}`);
                          alert('Link copied to clipboard!');
                        }
                      }}
                      className="flex-1 py-2 text-xs text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                    >
                      🚀 Share
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(entry.id);
                      }}
                      className="flex-1 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Entry Detail */}
            <div className="lg:col-span-2">
              {selectedEntry ? (
                <div className="card-3d bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6 md:p-8 shadow-2xl space-y-6">
                  <img 
                    src={selectedEntry.imageData} 
                    alt="Chart" 
                    className="w-full rounded-xl"
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="signal-3d bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-sm text-neutral-400 mb-1">Signal</div>
                      <div className={`text-3xl font-bold ${signalColors[selectedEntry.analysis.signal]}`}>
                        {selectedEntry.analysis.signal}
                      </div>
                      <div className="text-sm text-neutral-300 mt-1">
                        {selectedEntry.analysis.confidence}% confidence
                      </div>
                    </div>
                    <div className="signal-3d bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="text-sm text-neutral-400 mb-1">Smart Money</div>
                      <div className="text-sm font-semibold text-white mt-2">
                        {selectedEntry.analysis.smartMoneyBias}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Trend & Structure</h3>
                    <p className="text-neutral-300 text-sm leading-relaxed">
                      {selectedEntry.analysis.trendSummary}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Pattern Summary</h3>
                    <p className="text-neutral-300 text-sm leading-relaxed">
                      {selectedEntry.analysis.patternSummary}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Teaching Tips</h3>
                    <p className="text-neutral-300 text-sm leading-relaxed whitespace-pre-line">
                      {selectedEntry.analysis.teachingTips}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        const summary = `🚀 TradingXbert Analysis\n\nSignal: ${selectedEntry.analysis.signal} (${selectedEntry.analysis.confidence}% confidence)\n\nTrend: ${selectedEntry.analysis.trendSummary}\n\nGenerated by TradingXbert.com`;
                        navigator.clipboard.writeText(summary);
                        alert('Analysis copied to clipboard!');
                      }}
                      className="flex-1 py-3 bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 hover:from-[#FFD700]/30 hover:to-[#FFA500]/30 border-2 border-[#FFD700]/50 hover:border-[#FFD700] text-[#FFD700] font-bold rounded-xl transition-all"
                    >
                      📋 Copy Summary
                    </button>
                    <button
                      onClick={() => {
                        const url = window.location.origin;
                        const text = `Check out my ${selectedEntry.analysis.signal} trade analysis! 📊`;
                        if (navigator.share) {
                          navigator.share({ title: 'TradingXbert Analysis', text, url });
                        } else {
                          const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
                          window.open(twitterUrl, '_blank');
                        }
                      }}
                      className="flex-1 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border-2 border-blue-500/50 hover:border-blue-500 text-blue-400 font-bold rounded-xl transition-all"
                    >
                      🚀 Share Analysis
                    </button>
                  </div>
                  
                  <div className="text-xs text-neutral-500 text-center">
                    Saved on {new Date(selectedEntry.timestamp).toLocaleString()}
                  </div>
                </div>
              ) : (
                <div className="card-3d bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-12 text-center">
                  <div className="text-5xl mb-4">👈</div>
                  <p className="text-lg text-neutral-300">Select an entry to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

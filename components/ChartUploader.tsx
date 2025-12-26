// components/ChartUploader.tsx
"use client";
import { useState, FormEvent } from "react";
import type { Market, Style } from "@/lib/tradingTypes";

interface ChartUploaderProps {
  onAnalyze: (formData: FormData) => Promise<void>;
  loading: boolean;
}

export default function ChartUploader({ onAnalyze, loading }: ChartUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [market, setMarket] = useState<Market>("Crypto");
  const [style, setStyle] = useState<Style>("Day Trade");
  const [timeframe, setTimeframe] = useState<string>("1D");
  const [emotionText, setEmotionText] = useState("");
  const [accountSize, setAccountSize] = useState("");
  const [riskPercent, setRiskPercent] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("market", market);
    formData.append("style", style);
    formData.append("timeframe", timeframe);
    if (emotionText.trim()) formData.append("emotionText", emotionText.trim());
    if (accountSize) formData.append("accountSize", accountSize);
    if (riskPercent) formData.append("riskPercent", riskPercent);

    await onAnalyze(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Upload Your Chart
        </h2>

        {/* File Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-300 mb-2">
            Chart Screenshot *
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="block w-full text-sm text-neutral-300
              file:mr-4 file:py-2 file:px-4
              file:rounded-xl file:border-0
              file:text-sm file:font-semibold
              file:bg-[#6366F1] file:text-white
              hover:file:bg-[#5558E3]
              file:cursor-pointer cursor-pointer"
          />
          {preview && (
            <div className="mt-4 rounded-xl overflow-hidden border border-white/10">
              <img src={preview} alt="Chart preview" className="w-full h-auto max-h-64 object-contain bg-black/20" />
            </div>
          )}
        </div>

        {/* Market, Style & Timeframe */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Market *
            </label>
            <select
              value={market}
              onChange={(e) => setMarket(e.target.value as Market)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
            >
              <option value="Crypto">Crypto</option>
              <option value="Forex">Forex</option>
              <option value="Stocks">Stocks</option>
              <option value="Indices">Indices</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Trading Style *
            </label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value as Style)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
            >
              <option value="Scalp">Scalp</option>
              <option value="Day Trade">Day Trade</option>
              <option value="Swing">Swing</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Timeframe *
            </label>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
            >
              <option value="1m">1 Minute (Pro)</option>
              <option value="5m">5 Minutes (Pro)</option>
              <option value="15m">15 Minutes (Pro)</option>
              <option value="1H">1 Hour (Pro)</option>
              <option value="4H">4 Hours</option>
              <option value="1D">1 Day</option>
            </select>
            <p className="text-xs text-neutral-500 mt-1">
              Pro timeframes require <a href="/pricing" className="text-[#6366F1] hover:underline">Pro plan</a>
            </p>
          </div>
        </div>

        {/* Emotion Check */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-300 mb-2">
            How are you feeling about this trade? (optional)
          </label>
          <textarea
            value={emotionText}
            onChange={(e) => setEmotionText(e.target.value)}
            placeholder="e.g., Nervous about the breakout, feeling FOMO..."
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#6366F1] resize-none"
          />
        </div>

        {/* Risk Management */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Account Size (USD) (optional)
            </label>
            <input
              type="number"
              value={accountSize}
              onChange={(e) => setAccountSize(e.target.value)}
              placeholder="10000"
              min="0"
              step="0.01"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Risk per Trade (%) (optional)
            </label>
            <input
              type="number"
              value={riskPercent}
              onChange={(e) => setRiskPercent(e.target.value)}
              placeholder="2"
              min="0"
              max="100"
              step="0.1"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!file || loading}
          className="w-full bg-[#6366F1] hover:bg-[#5558E3] disabled:bg-neutral-700 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze My Setup"}
        </button>
      </div>
    </form>
  );
}

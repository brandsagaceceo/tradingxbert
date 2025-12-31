"use client";

export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1a1a2e] to-[#0f3460] animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="container mx-auto px-4 py-12">
        <div className="h-[500px] bg-white/5 rounded-3xl mb-12" />
        
        {/* Upload Section Skeleton */}
        <div className="max-w-4xl mx-auto">
          <div className="h-8 bg-white/10 rounded-lg w-3/4 mx-auto mb-4" />
          <div className="h-4 bg-white/5 rounded-lg w-1/2 mx-auto mb-8" />
          <div className="h-64 bg-white/5 rounded-2xl border-2 border-dashed border-white/20" />
        </div>
      </div>
    </div>
  );
}

// /app/error.tsx
'use client';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Optionally log error
    // console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0A0A0A] text-neutral-200">
      <h1 className="text-4xl font-bold mb-2">Something went wrong</h1>
      <p className="text-neutral-400 mb-6">{error?.message || 'An unexpected error occurred.'}</p>
      <button onClick={reset} className="px-4 py-2 rounded-xl bg-[#39FF14] text-black font-semibold hover:scale-105 transition">Try Again</button>
    </main>
  );
}

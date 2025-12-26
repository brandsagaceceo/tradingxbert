// /components/Toast.tsx
'use client';
import { useEffect, useRef } from 'react';

export default function Toast({ message }: { message: string | null }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (message && ref.current) {
      ref.current.focus();
    }
  }, [message]);
  if (!message) return null;
  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#0A0A0A] text-[#39FF14] px-6 py-3 rounded-xl shadow-xl border border-[#39FF14] z-50 animate-fadein"
    >
      {message}
    </div>
  );
}

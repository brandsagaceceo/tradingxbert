// /app/not-found.tsx
export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0A0A0A] text-neutral-200">
      <h1 className="text-4xl font-bold mb-2">404 — Not Found</h1>
      <p className="text-neutral-400 mb-6">Sorry, that page doesn’t exist.</p>
      <a href="/" className="px-4 py-2 rounded-xl bg-[#39FF14] text-black font-semibold hover:scale-105 transition">Go Home</a>
    </main>
  );
}

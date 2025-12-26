// /components/Footer.tsx
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full text-center text-xs text-neutral-500 mt-10 mb-2 flex flex-col items-center gap-1">
      <div>Educational use only. Not financial advice.</div>
      <div>Metrics may be incomplete or delayed.</div>
      <a
        href="https://github.com/BigDa/TradingXbert"
        className="underline text-neutral-600 hover:text-[#39FF14]"
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={0}
      >
        Built by BigDa — View on GitHub
      </a>
      <div className="mt-2 text-[10px] text-neutral-700">
        To run locally: <br />
        1) <code>npm i</code> &nbsp; 2) <code>.env.local</code> with <b>OPENAI_API_KEY</b> &nbsp; 3) <code>npm run dev</code><br />
        Ready for Vercel deploy.
      </div>
    </footer>
  );
}

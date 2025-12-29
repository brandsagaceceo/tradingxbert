// /app/legal/page.tsx
export const metadata = {
  title: "Legal | TradingXbert",
  description: "Terms, disclaimers, and legal information for TradingXbert."
};

export default function LegalPage() {
  return (
    <main className="max-w-screen-md mx-auto px-4 py-12 text-neutral-200">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Legal & Disclaimers</h1>
      <h2 className="text-xl font-semibold mt-8 mb-2">Educational Use Only</h2>
      <p className="mb-4 text-neutral-400">
        TradingXbert is for informational and educational purposes only. It does not provide financial, investment, or trading advice. All content is generated for research and entertainment.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">No Financial Advice</h2>
      <p className="mb-4 text-neutral-400">
        Nothing on this site constitutes a recommendation to buy, sell, or hold any asset. Always do your own research and consult a professional before making investment decisions.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Data & Accuracy</h2>
      <p className="mb-4 text-neutral-400">
        Market data and AI verdicts may be incomplete, delayed, or inaccurate. Verify all information independently. Use at your own risk.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">No Liability</h2>
      <p className="mb-4 text-neutral-400">
        The creators of QuoteXbert are not liable for any losses or damages arising from use of this site. By using this site, you agree to these terms.
      </p>
    </main>
  );
}

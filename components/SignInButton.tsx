"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function SignInButton() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Check localStorage for user
    const savedUser = localStorage.getItem("tempUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      const userData = { email: email.trim() };
      localStorage.setItem("tempUser", JSON.stringify(userData));
      setUser(userData);
      setShowModal(false);
      setEmail("");
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("tempUser");
    setUser(null);
  };

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-neutral-200 hidden sm:inline">
          {user.email}
        </span>
        <button
          className="px-4 py-2 text-sm text-neutral-200 hover:text-white transition-colors"
          onClick={handleSignOut}
          aria-label="Sign out"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 text-sm text-neutral-200 hover:text-[#6366F1] transition-colors"
      >
        Sign In
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-[#1a1a2e] rounded-2xl p-8 max-w-md w-full border border-[#6366F1]/30" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-white mb-4">Sign In</h2>
            <p className="text-neutral-400 mb-6">Enter your email to continue</p>
            <form onSubmit={handleSignIn}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#6366F1] mb-4"
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold rounded-xl hover:shadow-xl transition-all"
                >
                  Sign In
                </button>
              </div>
            </form>
            <p className="text-xs text-neutral-500 mt-4 text-center">
              Note: This is a demo sign-in. For production, set up OAuth in PRODUCTION-READY.md
            </p>
          </div>
        </div>
      )}
    </>
  );
}

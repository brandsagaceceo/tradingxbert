"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function SignInButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="px-4 py-2 text-sm text-neutral-400">
        Loading...
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-neutral-200 hidden sm:inline">
          {session.user.email}
        </span>
        <button
          className="px-4 py-2 text-sm text-neutral-200 hover:text-white transition-colors"
          onClick={() => signOut()}
          aria-label="Sign out"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="px-4 py-2 text-sm bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold rounded-xl hover:shadow-xl transition-all"
    >
      Sign in with Google
    </button>
  );
}

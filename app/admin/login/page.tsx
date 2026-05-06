"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock } from "lucide-react";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("admin_session", "true");
      setPassword("");
      router.push("/community/admin");
    } else {
      setError("Mot de passe incorrect");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-b from-[#06142d] via-[#0a1f2e] to-[#06142d]">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-[rgba(11,61,145,0.15)] bg-white/95 p-8 shadow-[0_24px_48px_rgba(11,61,145,0.12)] backdrop-blur dark:border-white/10 dark:bg-[rgba(7,24,51,0.95)]">
          <div className="flex justify-center mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0b3d91]/10 dark:bg-white/5">
              <Lock className="h-6 w-6 text-[#0b3d91] dark:text-[#d4af37]" />
            </div>
          </div>

          <h1 className="text-center text-2xl font-bold text-[#062147] dark:text-white mb-2">
            Espace Administrateur
          </h1>
          <p className="text-center text-sm text-slate-600 dark:text-slate-400 mb-8">
            Connectez-vous pour accéder au tableau de bord
          </p>

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/30 dark:bg-red-950/30 dark:text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#062147] dark:text-white mb-2">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-[rgba(11,61,145,0.15)] bg-white px-4 py-3 text-[#062147] placeholder-slate-500 transition-colors focus:border-[#0b3d91] focus:outline-none focus:ring-2 focus:ring-[#0b3d91]/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-slate-400"
                required
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-gradient-to-r from-[#0b3d91] to-[#1a5fb7] px-6 py-3 text-white font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed border border-[#0b3d91]/50 hover:border-[#d4af37]/50"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[rgba(11,61,145,0.1)] dark:border-white/10">
            <Link
              href="/community"
              className="inline-flex items-center text-sm text-[#0b3d91] hover:text-[#d4af37] dark:text-white dark:hover:text-[#d4af37] transition-colors"
            >
              ← Retour à la communauté
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

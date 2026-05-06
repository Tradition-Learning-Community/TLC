"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminAuthPage() {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const adminToken = process.env.NEXT_PUBLIC_ADMIN_TOKEN || "admin-secret-2024";
      
      if (token === adminToken) {
        localStorage.setItem("admin-auth", token);
        router.push("/x-admin-dashboard");
      } else {
        setError("Token invalide");
      }
    } catch (err) {
      setError("Erreur lors de l'authentification");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#06142d] via-[#0a1f2e] to-[#06142d] px-6">
      <div className="w-full max-w-md rounded-2xl border border-[#d4af37]/30 bg-gradient-to-br from-[#07162f]/95 via-[#06142d]/90 to-[#0a1f2e] px-6 py-8 backdrop-blur-xl">
        <h1 className="text-2xl font-bold text-white text-center mb-2">Admin Access</h1>
        <p className="text-slate-300 text-center text-sm mb-6">Accès administrateur sécurisé</p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#d4af37] mb-2">
              Token d'accès
            </label>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Entrez le token"
              className="w-full rounded-xl border border-[#d4af37]/30 bg-white/5 px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-[#d4af37]/60"
              required
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-gradient-to-r from-[#0b3d91] to-[#1a5fb7] px-4 py-2 text-white font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-6">
          Page d'accès administrateur — non indexée
        </p>
      </div>
    </div>
  );
}

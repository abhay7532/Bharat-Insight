"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store";
import Link from "next/link";

export default function AuthPage() {
  const [email, setEmail] = useState("admin@bharatinsight.gov.in");
  const [password, setPassword] = useState("demo123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useAppStore();
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 800));
    if (email && password) {
      setUser({
        id: "demo-1",
        email,
        role: email.includes("admin") ? "admin" : "viewer",
        name: email.includes("admin") ? "Arjun Sharma" : "Priya Patel",
      });
      router.push("/dashboard");
    } else {
      setError("Invalid credentials");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#050507] bg-grid flex items-center justify-center px-4">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-900/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="w-full max-w-sm relative">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
              <span className="text-xs font-bold text-white">BI</span>
            </div>
            <span className="font-semibold text-white">Bharat Insight</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Sign in to your account</h1>
          <p className="text-gray-400 text-sm mt-2">Government secure access portal</p>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-2 font-medium">Email Address</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email"
                className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/60 transition-all" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2 font-medium">Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"
                className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/60 transition-all" />
            </div>
            {error && <p className="text-rose-400 text-xs">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2">
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Authenticating...</>
              ) : "Sign In →"}
            </button>
          </form>

          <div className="mt-4 p-3 rounded-lg bg-blue-500/8 border border-blue-500/20">
            <p className="text-xs text-blue-300 font-medium mb-1">Demo Credentials</p>
            <p className="text-xs text-gray-400">Admin: admin@bharatinsight.gov.in</p>
            <p className="text-xs text-gray-400">Password: demo123</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

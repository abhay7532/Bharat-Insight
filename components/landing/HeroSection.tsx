"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

const STREAMS = [
  "Kerala Literacy Rate → 96.2%",
  "Maharashtra GDP ↑ 14.3%",
  "Punjab Agricultural Output → 485T",
  "Tamil Nadu Health Index → 79.4",
  "Rajasthan Population → 81M",
  "Gujarat GDP Contribution ↑ 12.1%",
  "Karnataka Tech Sector ↑ 18.7%",
];

function LiveFeed() {
  const [items, setItems] = useState<string[]>([]);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => {
      setItems((prev) => [...prev.slice(-4), STREAMS[idx % STREAMS.length]]);
      setIdx((i) => i + 1);
    }, 1200);
    return () => clearInterval(iv);
  }, [idx]);
  return (
    <div className="relative h-[120px] overflow-hidden rounded-xl border border-white/5 bg-black/40 p-3">
      <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-black/60 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-black/60 to-transparent z-10" />
      {items.map((item, i) => (
        <motion.div key={`${item}-${i}`}
          initial={{ opacity: 0, y: 12, x: -4 }}
          animate={{ opacity: i === items.length - 1 ? 1 : 0.4, y: 0, x: 0 }}
          transition={{ duration: 0.4 }}
          className="text-xs font-mono text-emerald-400 py-1 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
          {item}
        </motion.div>
      ))}
    </div>
  );
}

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const step = value / 60;
    let current = 0;
    const iv = setInterval(() => {
      current = Math.min(current + step, value);
      setCount(Math.floor(current));
      if (current >= value) clearInterval(iv);
    }, 16);
    return () => clearInterval(iv);
  }, [value]);
  return <span>{count.toLocaleString()}{suffix}</span>;
}

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid pt-20">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-900/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          Now in public beta — Free for government departments
        </motion.div>

        {/* Headline */}
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold leading-tight mb-6">
          <span className="text-white">AI Powered Public</span>
          <br />
          <span className="gradient-text">Data Intelligence</span>
          <br />
          <span className="text-white">for India</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Analyze 100,000+ rows of Indian government data with AI-powered insights. Real-time filtering, trend analysis, and policy recommendations — all in one platform.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/dashboard"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:-translate-y-0.5">
            Explore Dashboard
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <button className="inline-flex items-center gap-2 px-8 py-4 border border-white/10 hover:border-white/20 text-white font-medium rounded-xl transition-all duration-200 hover:bg-white/5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            View Dataset
          </button>
        </motion.div>

        {/* Live feed + stats */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Live Data Stream</span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />LIVE
              </span>
            </div>
            <LiveFeed />
          </div>
          <div className="glass-card rounded-2xl p-4 grid grid-cols-2 gap-4">
            {[
              { label: "Data Rows", value: 100000, suffix: "+" },
              { label: "States Covered", value: 30, suffix: "" },
              { label: "Departments", value: 3, suffix: "" },
              { label: "Years of Data", value: 14, suffix: "" },
            ].map(({ label, value, suffix }) => (
              <div key={label} className="text-center p-3 rounded-xl bg-white/3 border border-white/5">
                <div className="text-2xl font-bold gradient-text">
                  <AnimatedCounter value={value} suffix={suffix} />
                </div>
                <div className="text-xs text-gray-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050507] to-transparent pointer-events-none" />
    </section>
  );
}

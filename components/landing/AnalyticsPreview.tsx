"use client";
import { motion } from "framer-motion";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const barData = [
  { state: "MH", gdp: 14.3 }, { state: "KA", gdp: 10.2 }, { state: "TN", gdp: 9.8 },
  { state: "GJ", gdp: 12.1 }, { state: "AP", gdp: 7.4 }, { state: "WB", gdp: 6.9 },
];
const lineData = [
  { year: "2015", literacy: 72 }, { year: "2017", literacy: 74.5 }, { year: "2019", literacy: 76.8 },
  { year: "2021", literacy: 79.2 }, { year: "2023", literacy: 81.4 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="glass rounded-lg p-2 border border-white/10 text-xs">
        <div className="text-gray-400">{label}</div>
        <div className="text-violet-300 font-semibold">{payload[0]?.value}</div>
      </div>
    );
  }
  return null;
};

export function AnalyticsPreview() {
  return (
    <section id="analytics" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-16">
          <span className="text-sm text-violet-400 font-medium tracking-widest uppercase">Analytics Preview</span>
          <h2 className="text-4xl font-bold text-white mt-3 mb-4">
            Powerful <span className="gradient-text">visual intelligence</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">Interactive charts and real-time visualizations across all Indian states and departments.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }} className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-semibold text-white">GDP Contribution by State</div>
                <div className="text-xs text-gray-500 mt-0.5">Top 6 contributors, 2023</div>
              </div>
              <span className="px-2 py-1 text-xs bg-violet-500/20 text-violet-300 rounded-full">Live</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={barData}>
                <XAxis dataKey="state" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="gdp" fill="url(#barGrad)" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }} className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-semibold text-white">National Literacy Trend</div>
                <div className="text-xs text-gray-500 mt-0.5">Avg. across all states, %</div>
              </div>
              <span className="px-2 py-1 text-xs bg-emerald-500/20 text-emerald-300 rounded-full">↑ 13.1%</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="year" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis hide domain={[68, 85]} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="literacy" stroke="#10b981" strokeWidth={2}
                  dot={{ fill: "#10b981", r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

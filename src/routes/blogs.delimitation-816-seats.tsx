import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Share2,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  Tag,
  CheckCircle2,
  XCircle,
  TrendingUp,
  TrendingDown,
  Users,
  Vote,
  Scale,
} from "lucide-react";
import deliCover from "@/assets/blog-delimitation.jpg";

export const Route = createFileRoute("/blogs/delimitation-816-seats")({
  head: () => ({
    meta: [
      { title: "816 Seats: Mapping the New DNA of Indian Democracy — Selvan Rajan" },
      {
        name: "description",
        content:
          "A data-driven analysis of India's 2026 delimitation: why a flat 50% pro-rata seat increase to 816 is the fairest, most pragmatic path forward.",
      },
      { property: "og:title", content: "816 Seats: Mapping the New DNA of Indian Democracy" },
      {
        property: "og:description",
        content: "How a flat 50% seat increase is the fairest solution India has seen in 50 years.",
      },
      { property: "og:image", content: deliCover },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: deliCover },
    ],
  }),
  component: DelimitationPost,
});

/* ---------------- TOKENS ----------------
   Brand colors stay constant. Neutral surfaces/text use CSS vars
   so the page adapts to the global light/dark theme toggle. */
const C = {
  navy: "#0D1B2A",
  saffron: "#F4A026",
  teal: "#00B4A6",
  south: "#10B981",
  north: "#EF4444",
  ne: "#8B5CF6",
  ut: "#F59E0B",
  // Theme-aware tokens
  text: "var(--foreground)",
  text2: "var(--muted-foreground)",
  card: "var(--card)",
  alt: "var(--muted)",
  grid: "var(--border)",
};

/* ---------------- DATA ---------------- */
type Region = "South" | "North" | "North-East" | "UT";

const stateData: {
  state: string;
  category: Region;
  population: number;
  currentSeats: number;
  proRataSeats: number;
  strictSeats: number;
  proRataVsStrict: number;
  tfr: number;
  literacy: number;
  gsdp: number;
  decadalGrowth: number;
}[] = [
  { state: "Andhra Pradesh", category: "South", population: 49386799, currentSeats: 25, proRataSeats: 38, strictSeats: 33, proRataVsStrict: 5, tfr: 1.7, literacy: 67.35, gsdp: 18300, decadalGrowth: 11.1 },
  { state: "Arunachal Pradesh", category: "North-East", population: 1383727, currentSeats: 2, proRataSeats: 3, strictSeats: 1, proRataVsStrict: 2, tfr: 2.8, literacy: 65.38, gsdp: 478, decadalGrowth: 25.9 },
  { state: "Assam", category: "North-East", population: 31205576, currentSeats: 14, proRataSeats: 21, strictSeats: 21, proRataVsStrict: 0, tfr: 2.2, literacy: 72.19, gsdp: 7416, decadalGrowth: 16.9 },
  { state: "Bihar", category: "North", population: 104099452, currentSeats: 40, proRataSeats: 60, strictSeats: 70, proRataVsStrict: -10, tfr: 3.0, literacy: 61.8, gsdp: 10970, decadalGrowth: 25.1 },
  { state: "Chhattisgarh", category: "North", population: 25545198, currentSeats: 11, proRataSeats: 16, strictSeats: 17, proRataVsStrict: -1, tfr: 2.5, literacy: 70.28, gsdp: 6350, decadalGrowth: 22.6 },
  { state: "Delhi", category: "UT", population: 16787941, currentSeats: 7, proRataSeats: 10, strictSeats: 11, proRataVsStrict: -1, tfr: 1.7, literacy: 86.21, gsdp: 13270, decadalGrowth: 21.0 },
  { state: "Goa", category: "North", population: 1458545, currentSeats: 2, proRataSeats: 3, strictSeats: 1, proRataVsStrict: 2, tfr: 1.6, literacy: 88.7, gsdp: 1390, decadalGrowth: 8.2 },
  { state: "Gujarat", category: "North", population: 60439692, currentSeats: 26, proRataSeats: 39, strictSeats: 41, proRataVsStrict: -2, tfr: 2.1, literacy: 78.03, gsdp: 29820, decadalGrowth: 19.2 },
  { state: "Haryana", category: "North", population: 25351462, currentSeats: 10, proRataSeats: 15, strictSeats: 17, proRataVsStrict: -2, tfr: 2.1, literacy: 75.55, gsdp: 13475, decadalGrowth: 19.9 },
  { state: "Himachal Pradesh", category: "North", population: 6864602, currentSeats: 4, proRataSeats: 6, strictSeats: 5, proRataVsStrict: 1, tfr: 1.7, literacy: 82.8, gsdp: 2556, decadalGrowth: 12.8 },
  { state: "Jammu & Kashmir", category: "UT", population: 12541302, currentSeats: 6, proRataSeats: 9, strictSeats: 8, proRataVsStrict: 1, tfr: 2.0, literacy: 67.16, gsdp: 2884, decadalGrowth: 23.7 },
  { state: "Jharkhand", category: "North", population: 32988134, currentSeats: 14, proRataSeats: 21, strictSeats: 22, proRataVsStrict: -1, tfr: 2.5, literacy: 66.41, gsdp: 5563, decadalGrowth: 22.3 },
  { state: "Karnataka", category: "South", population: 61095297, currentSeats: 28, proRataSeats: 42, strictSeats: 41, proRataVsStrict: 1, tfr: 1.8, literacy: 75.36, gsdp: 30701, decadalGrowth: 15.7 },
  { state: "Kerala", category: "South", population: 33406061, currentSeats: 20, proRataSeats: 30, strictSeats: 23, proRataVsStrict: 7, tfr: 1.6, literacy: 94.0, gsdp: 14271, decadalGrowth: 4.9 },
  { state: "Madhya Pradesh", category: "North", population: 72626809, currentSeats: 29, proRataSeats: 44, strictSeats: 49, proRataVsStrict: -5, tfr: 2.8, literacy: 69.32, gsdp: 16945, decadalGrowth: 20.3 },
  { state: "Maharashtra", category: "North", population: 112374333, currentSeats: 48, proRataSeats: 72, strictSeats: 76, proRataVsStrict: -4, tfr: 1.9, literacy: 82.34, gsdp: 49394, decadalGrowth: 16.0 },
  { state: "Manipur", category: "North-East", population: 2721756, currentSeats: 2, proRataSeats: 3, strictSeats: 2, proRataVsStrict: 1, tfr: 2.5, literacy: 79.21, gsdp: 514, decadalGrowth: 18.7 },
  { state: "Meghalaya", category: "North-East", population: 2966889, currentSeats: 2, proRataSeats: 3, strictSeats: 2, proRataVsStrict: 1, tfr: 3.0, literacy: 74.43, gsdp: 666, decadalGrowth: 27.8 },
  { state: "Mizoram", category: "North-East", population: 1097206, currentSeats: 1, proRataSeats: 2, strictSeats: 1, proRataVsStrict: 1, tfr: 2.4, literacy: 91.33, gsdp: 395, decadalGrowth: 22.8 },
  { state: "Nagaland", category: "North-East", population: 1978502, currentSeats: 1, proRataSeats: 2, strictSeats: 1, proRataVsStrict: 1, tfr: 2.5, literacy: 79.55, gsdp: 550, decadalGrowth: -0.5 },
  { state: "Odisha", category: "North", population: 41974218, currentSeats: 21, proRataSeats: 32, strictSeats: 28, proRataVsStrict: 4, tfr: 2.0, literacy: 72.87, gsdp: 10630, decadalGrowth: 14.0 },
  { state: "Punjab", category: "North", population: 27743338, currentSeats: 13, proRataSeats: 20, strictSeats: 19, proRataVsStrict: 1, tfr: 1.7, literacy: 75.84, gsdp: 8913, decadalGrowth: 13.7 },
  { state: "Rajasthan", category: "North", population: 68548437, currentSeats: 25, proRataSeats: 38, strictSeats: 46, proRataVsStrict: -8, tfr: 2.7, literacy: 66.11, gsdp: 19890, decadalGrowth: 21.4 },
  { state: "Sikkim", category: "North-East", population: 610577, currentSeats: 1, proRataSeats: 2, strictSeats: 0, proRataVsStrict: 2, tfr: 1.8, literacy: 81.42, gsdp: 570, decadalGrowth: 12.4 },
  { state: "Tamil Nadu", category: "South", population: 72147030, currentSeats: 39, proRataSeats: 58, strictSeats: 49, proRataVsStrict: 9, tfr: 1.6, literacy: 80.09, gsdp: 35678, decadalGrowth: 15.6 },
  { state: "Telangana", category: "South", population: 35003674, currentSeats: 17, proRataSeats: 26, strictSeats: 24, proRataVsStrict: 2, tfr: 1.7, literacy: 66.54, gsdp: 18003, decadalGrowth: 13.58 },
  { state: "Tripura", category: "North-East", population: 3673917, currentSeats: 2, proRataSeats: 3, strictSeats: 2, proRataVsStrict: 1, tfr: 1.9, literacy: 87.22, gsdp: 1008, decadalGrowth: 14.7 },
  { state: "Uttar Pradesh", category: "North", population: 199812341, currentSeats: 80, proRataSeats: 120, strictSeats: 135, proRataVsStrict: -15, tfr: 3.1, literacy: 67.68, gsdp: 30800, decadalGrowth: 20.1 },
  { state: "Uttarakhand", category: "North", population: 10086292, currentSeats: 5, proRataSeats: 8, strictSeats: 7, proRataVsStrict: 1, tfr: 1.9, literacy: 79.63, gsdp: 4293, decadalGrowth: 19.2 },
  { state: "West Bengal", category: "North", population: 91276115, currentSeats: 42, proRataSeats: 63, strictSeats: 62, proRataVsStrict: 1, tfr: 1.7, literacy: 76.26, gsdp: 20318, decadalGrowth: 13.9 },
];

const regionSummary: Record<Region, { currentSeats: number; proRataSeats: number; strictSeats: number; currentShare: number; proRataShare: number; strictShare: number }> = {
  North: { currentSeats: 370, proRataSeats: 557, strictSeats: 595, currentShare: 68.14, proRataShare: 68.26, strictShare: 72.92 },
  "North-East": { currentSeats: 25, proRataSeats: 39, strictSeats: 30, currentShare: 4.6, proRataShare: 4.78, strictShare: 3.68 },
  South: { currentSeats: 129, proRataSeats: 194, strictSeats: 170, currentShare: 23.76, proRataShare: 23.77, strictShare: 20.83 },
  UT: { currentSeats: 19, proRataSeats: 30, strictSeats: 21, currentShare: 3.5, proRataShare: 3.68, strictShare: 2.57 },
};

const regionColor = (r: Region) =>
  r === "South" ? C.south : r === "North" ? C.north : r === "North-East" ? C.ne : C.ut;

/* ---------------- HELPERS ---------------- */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ kicker, children, id }: { kicker?: string; children: React.ReactNode; id?: string }) {
  return (
    <div id={id} className="mb-8 scroll-mt-28">
      {kicker && (
        <span className="text-[11px] uppercase tracking-[0.25em] font-semibold" style={{ color: C.saffron }}>
          {kicker}
        </span>
      )}
      <h2
        className="mt-2 font-display text-3xl md:text-5xl font-bold tracking-tight"
        style={{
          background: `linear-gradient(90deg, ${C.saffron}, ${C.teal})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {children}
      </h2>
      <div
        className="mt-4 h-px w-full"
        style={{ background: `linear-gradient(90deg, ${C.saffron}33, transparent)` }}
      />
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="not-prose my-8 rounded-2xl p-5 md:p-7"
      style={{
        background: C.card,
        boxShadow: "0 8px 30px rgba(13,27,42,0.08), 0 2px 6px rgba(13,27,42,0.04)",
      }}
    >
      <h4 className="font-display text-base md:text-lg font-bold mb-5" style={{ color: C.text }}>
        {title}
      </h4>
      {children}
    </div>
  );
}

/* ---------------- TIMELINE ---------------- */
function Timeline() {
  const nodes = [
    { year: "1952", label: "First General Election", sub: "489 seats" },
    { year: "1971", label: "Census redraws seats", sub: "543 seats" },
    { year: "1976", label: "Freeze begins", sub: "42nd Amendment" },
    { year: "2001", label: "Freeze extended", sub: "84th Amendment → 2026" },
    { year: "2026", label: "THE UNFREEZE", sub: "816 seats proposed", pulse: true },
  ];
  return (
    <div className="not-prose my-8 rounded-3xl p-6 md:p-10" style={{ background: C.navy }}>
      <div className="relative">
        {/* Horizontal connector — only on md+ where items are in a row */}
        <div
          className="hidden md:block absolute left-0 right-0 top-[58px] h-px"
          style={{ background: `linear-gradient(90deg, ${C.saffron}66, ${C.saffron}, ${C.saffron}66)` }}
        />
        <div className="relative grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-8">
          {nodes.map((n, i) => (
            <motion.div
              key={n.year}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="flex flex-col items-center text-center"
            >
              <div className="text-xs font-mono mb-3" style={{ color: "#94a3b8" }}>
                {n.year}
              </div>
              <div className="relative">
                <span
                  className="block h-5 w-5 rounded-full"
                  style={{
                    background: C.saffron,
                    boxShadow: n.pulse ? `0 0 0 0 ${C.saffron}` : `0 0 12px ${C.saffron}`,
                  }}
                />
                {n.pulse && (
                  <span
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{ background: C.saffron, opacity: 0.6 }}
                  />
                )}
              </div>
              <div className="mt-3 text-sm font-semibold text-white">{n.label}</div>
              <div className="text-[11px]" style={{ color: "#94a3b8" }}>{n.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- BAR CHART (3-scenario) ---------------- */
function ScenarioBars() {
  const states = ["Tamil Nadu", "Kerala", "Uttar Pradesh", "Bihar", "Karnataka"];
  const rows = stateData.filter((s) => states.includes(s.state));
  const max = Math.max(...rows.flatMap((r) => [r.currentSeats, r.proRataSeats, r.strictSeats]));
  return (
    <ChartCard title="Seat Scenarios: Where Each State Stands">
      <div className="space-y-6">
        {rows.map((r, idx) => (
          <motion.div
            key={r.state}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold" style={{ color: C.text }}>{r.state}</span>
              <span className="text-xs" style={{ color: C.text2 }}>
                Δ vs strict: {r.proRataVsStrict > 0 ? "+" : ""}
                {r.proRataVsStrict}
              </span>
            </div>
            {[
              { v: r.currentSeats, label: "Current", color: "#6B7280" },
              { v: r.proRataSeats, label: "Pro-Rata 50%", color: C.south },
              { v: r.strictSeats, label: "Strict Pop", color: C.north },
            ].map((b, i) => (
              <div key={b.label} className="grid grid-cols-[110px_1fr_auto] items-center gap-3 text-xs mb-1.5">
                <span style={{ color: C.text2 }}>{b.label}</span>
                <div className="h-2.5 rounded-full" style={{ background: C.grid }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(b.v / max) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full"
                    style={{ background: b.color }}
                  />
                </div>
                <span className="font-mono tabular-nums w-8 text-right" style={{ color: C.text }}>{b.v}</span>
              </div>
            ))}
          </motion.div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-4 text-xs" style={{ color: C.text2 }}>
        <Legend color="#6B7280" label="Current (543)" />
        <Legend color={C.south} label="Pro-Rata 50% (816)" />
        <Legend color={C.north} label="Strict Population" />
      </div>
    </ChartCard>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="h-2.5 w-2.5 rounded-sm" style={{ background: color }} /> {label}
    </span>
  );
}

/* ---------------- DONUTS ---------------- */
function ShareDonut({
  title,
  field,
}: {
  title: string;
  field: "currentSeats" | "proRataSeats" | "strictSeats";
}) {
  const order: Region[] = ["North", "South", "North-East", "UT"];
  const total = order.reduce((s, r) => s + regionSummary[r][field], 0);
  const R = 64;
  const Cc = 2 * Math.PI * R;
  let acc = 0;
  return (
    <div
      className="rounded-2xl p-5 flex flex-col"
      style={{ background: C.card, boxShadow: "0 8px 30px rgba(13,27,42,0.08)" }}
    >
      <h5 className="text-sm font-semibold mb-4 text-center" style={{ color: C.text }}>{title}</h5>
      <div className="flex justify-center">
        <div className="relative w-[160px] h-[160px]">
          <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
            <circle cx="80" cy="80" r={R} fill="none" style={{ stroke: C.grid }} strokeWidth="20" />
            {order.map((r, i) => {
              const v = regionSummary[r][field];
              const frac = v / total;
              const dash = frac * Cc;
              const offset = -acc * Cc;
              acc += frac;
              return (
                <motion.circle
                  key={r}
                  cx="80"
                  cy="80"
                  r={R}
                  fill="none"
                  stroke={regionColor(r)}
                  strokeWidth="20"
                  strokeDasharray={`${dash} ${Cc - dash}`}
                  strokeDashoffset={offset}
                  initial={{ opacity: 0, strokeDasharray: `0 ${Cc}` }}
                  whileInView={{ opacity: 1, strokeDasharray: `${dash} ${Cc - dash}` }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.9, delay: i * 0.12 }}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-2xl font-bold" style={{ color: C.text }}>{total}</span>
            <span className="text-[10px] uppercase tracking-[0.18em]" style={{ color: C.text2 }}>seats</span>
          </div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-1.5 text-xs">
        {order.map((r) => {
          const v = regionSummary[r][field];
          return (
            <div key={r} className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-sm shrink-0" style={{ background: regionColor(r) }} />
              <span className="flex-1 truncate" style={{ color: C.text }}>{r}</span>
              <span className="font-mono tabular-nums shrink-0" style={{ color: C.text2 }}>
                {v} <span className="opacity-70">({((v / total) * 100).toFixed(1)}%)</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- WINNER/LOSER TABLE ---------------- */
function WinnersTable() {
  const [filter, setFilter] = useState<"All" | Region>("All");
  const filtered = useMemo(
    () => stateData.filter((s) => filter === "All" || s.category === filter),
    [filter]
  );
  const filters: ("All" | Region)[] = ["All", "North", "South", "North-East", "UT"];
  return (
    <ChartCard title="Who Wins and Who Loses Under Each Model">
      <div className="flex flex-wrap gap-2 mb-5">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-3.5 py-1.5 rounded-full text-xs font-medium transition-all"
            style={{
              background: filter === f ? C.navy : C.alt,
              color: filter === f ? "#fff" : C.text,
              border: `1px solid ${filter === f ? C.navy : C.grid}`,
            }}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider" style={{ color: C.text2 }}>
              <th className="py-3 pr-3">State</th>
              <th className="py-3 pr-3">Region</th>
              <th className="py-3 pr-3 text-right">Current</th>
              <th className="py-3 pr-3 text-right">Pro-Rata</th>
              <th className="py-3 pr-3 text-right">Strict</th>
              <th className="py-3 text-right">Δ vs Strict</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => {
              const pos = s.proRataVsStrict > 0;
              const neg = s.proRataVsStrict < 0;
              return (
                <tr key={s.state} className="border-t" style={{ borderColor: C.grid }}>
                  <td className="py-2.5 pr-3 font-medium" style={{ color: C.text }}>{s.state}</td>
                  <td className="py-2.5 pr-3">
                    <span
                      className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold"
                      style={{
                        background: regionColor(s.category) + "22",
                        color: regionColor(s.category),
                      }}
                    >
                      {s.category}
                    </span>
                  </td>
                  <td className="py-2.5 pr-3 text-right font-mono tabular-nums" style={{ color: C.text2 }}>{s.currentSeats}</td>
                  <td className="py-2.5 pr-3 text-right font-mono tabular-nums" style={{ color: C.text }}>{s.proRataSeats}</td>
                  <td className="py-2.5 pr-3 text-right font-mono tabular-nums" style={{ color: C.text2 }}>{s.strictSeats}</td>
                  <td
                    className="py-2.5 text-right font-mono tabular-nums font-semibold"
                    style={{ color: pos ? C.south : neg ? C.north : C.text2 }}
                  >
                    {pos ? "+" : ""}
                    {s.proRataVsStrict}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </ChartCard>
  );
}

/* ---------------- BUBBLE / SCATTER ---------------- */
function Scatter() {
  const W = 680, H = 400, PAD_L = 60, PAD_B = 56, PAD_T = 30, PAD_R = 30;
  const xs = stateData.map((s) => s.population / 1e6);
  const ys = stateData.map((s) => s.proRataSeats);
  const xMax = Math.ceil(Math.max(...xs) / 25) * 25; // round to nearest 25M
  const yMax = Math.ceil(Math.max(...ys) / 20) * 20; // round to nearest 20 seats
  const labelStates = ["Tamil Nadu", "Kerala", "Uttar Pradesh", "Bihar", "Karnataka", "Maharashtra"];

  const xTicks = 5;
  const yTicks = 5;
  const plotW = W - PAD_L - PAD_R;
  const plotH = H - PAD_T - PAD_B;
  const xPos = (v: number) => PAD_L + (v / xMax) * plotW;
  const yPos = (v: number) => PAD_T + (1 - v / yMax) * plotH;

  return (
    <ChartCard title="Population vs. Representation Under Pro-Rata Model">
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[420px] min-w-[600px]">
          {/* horizontal grid + Y tick labels */}
          {Array.from({ length: yTicks + 1 }, (_, i) => {
            const v = (yMax / yTicks) * i;
            const y = yPos(v);
            return (
              <g key={`y-${i}`}>
                <line x1={PAD_L} x2={W - PAD_R} y1={y} y2={y} style={{ stroke: C.grid }} strokeDasharray="3 4" />
                <text x={PAD_L - 8} y={y + 3} textAnchor="end" fontSize="10" style={{ fill: C.text2 }}>
                  {Math.round(v)}
                </text>
              </g>
            );
          })}
          {/* vertical X tick labels */}
          {Array.from({ length: xTicks + 1 }, (_, i) => {
            const v = (xMax / xTicks) * i;
            const x = xPos(v);
            return (
              <g key={`x-${i}`}>
                <line x1={x} x2={x} y1={H - PAD_B} y2={H - PAD_B + 4} style={{ stroke: C.text2 }} />
                <text x={x} y={H - PAD_B + 16} textAnchor="middle" fontSize="10" style={{ fill: C.text2 }}>
                  {Math.round(v)}
                </text>
              </g>
            );
          })}

          {/* national avg line */}
          <line x1={PAD_L} x2={W - PAD_R} y1={yPos(80)} y2={yPos(80)} stroke={C.saffron} strokeDasharray="6 4" strokeWidth={1.5} />
          <text x={W - PAD_R} y={yPos(80) - 6} textAnchor="end" fontSize="10" fill={C.saffron}>
            National avg ~1.48M / MP
          </text>

          {stateData.map((s, i) => {
            const x = xPos(s.population / 1e6);
            const y = yPos(s.proRataSeats);
            const ppmp = s.population / s.currentSeats;
            const r = Math.max(4, Math.min(18, ppmp / 200000));
            return (
              <motion.g
                key={s.state}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02, duration: 0.5 }}
                style={{ transformOrigin: `${x}px ${y}px` }}
              >
                <circle cx={x} cy={y} r={r} fill={regionColor(s.category)} fillOpacity={0.55} stroke={regionColor(s.category)} strokeWidth={1.2} />
                {labelStates.includes(s.state) && (
                  <text x={x + r + 4} y={y + 3} fontSize="10" style={{ fill: C.text }} fontWeight="600">
                    {s.state}
                  </text>
                )}
              </motion.g>
            );
          })}
          {/* axes */}
          <line x1={PAD_L} x2={W - PAD_R} y1={H - PAD_B} y2={H - PAD_B} style={{ stroke: C.text2 }} />
          <line x1={PAD_L} x2={PAD_L} y1={PAD_T} y2={H - PAD_B} style={{ stroke: C.text2 }} />
          {/* axis titles */}
          <text x={PAD_L + plotW / 2} y={H - 10} textAnchor="middle" fontSize="11" style={{ fill: C.text2 }} fontWeight="600">
            Population (millions)
          </text>
          <text x={16} y={PAD_T + plotH / 2} textAnchor="middle" fontSize="11" style={{ fill: C.text2 }} fontWeight="600" transform={`rotate(-90 16 ${PAD_T + plotH / 2})`}>
            Pro-Rata Seats
          </text>
        </svg>
      </div>
      <div className="mt-4 flex flex-wrap gap-4 text-xs" style={{ color: C.text2 }}>
        <Legend color={C.south} label="South" />
        <Legend color={C.north} label="North" />
        <Legend color={C.ne} label="North-East" />
        <Legend color={C.ut} label="UT" />
        <span className="ml-2 italic">Bubble size ∝ people-per-MP today</span>
      </div>
    </ChartCard>
  );
}

/* ---------------- MAJORITY BAR ---------------- */
function MajorityBar() {
  const total = 816;
  const order: Region[] = ["North", "South", "North-East", "UT"];
  const majPct = (409 / total) * 100;
  let cum = 0;
  return (
    <ChartCard title="The 409 Majority Mark — No Region Sweeps Alone">
      <div className="relative h-12 rounded-full overflow-hidden" style={{ background: C.grid }}>
        {order.map((r, i) => {
          const v = regionSummary[r].proRataSeats;
          const left = (cum / total) * 100;
          const width = (v / total) * 100;
          cum += v;
          return (
            <motion.div
              key={r}
              initial={{ width: 0 }}
              whileInView={{ width: `${width}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.15 }}
              className="absolute top-0 h-full flex items-center justify-center text-xs font-semibold text-white"
              style={{ left: `${left}%`, background: regionColor(r) }}
            >
              {v >= 30 ? `${r}: ${v}` : ""}
            </motion.div>
          );
        })}
        <div
          className="absolute top-[-8px] bottom-[-8px] w-[2px]"
          style={{ left: `${majPct}%`, background: C.saffron, boxShadow: `0 0 14px ${C.saffron}` }}
        />
        <div
          className="absolute -top-7 text-[11px] font-mono font-bold px-2 py-0.5 rounded"
          style={{ left: `calc(${majPct}% - 30px)`, color: C.saffron, background: C.navy }}
        >
          409 majority
        </div>
      </div>
      <p className="mt-8 text-sm" style={{ color: C.text2 }}>
        Even in the 2019 landslide, NDA won only 352 of 543 (65%). A 65% sweep of 816 = 531 — still requiring nationwide appeal.
      </p>
    </ChartCard>
  );
}

/* ---------------- FORMULA IMPACT ---------------- */
function FormulaImpact() {
  const gainers = ["Tamil Nadu", "Kerala", "Karnataka", "Maharashtra", "Gujarat"];
  const losers = ["Bihar", "Uttar Pradesh", "Madhya Pradesh", "Rajasthan", "Assam"];
  return (
    <ChartCard title="If Seats Were Allocated by Economic / Demographic Formula">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h5 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: C.south }}>
            <TrendingUp className="h-4 w-4" /> States that GAIN under formula
          </h5>
          <ul className="space-y-2">
            {gainers.map((s) => (
              <li key={s} className="flex items-center justify-between text-sm rounded-lg px-3 py-2" style={{ background: C.south + "11" }}>
                <span style={{ color: C.text }}>{s}</span>
                <span className="font-mono text-xs font-bold" style={{ color: C.south }}>▲ formula</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: C.north }}>
            <TrendingDown className="h-4 w-4" /> States that LOSE under formula
          </h5>
          <ul className="space-y-2">
            {losers.map((s) => (
              <li key={s} className="flex items-center justify-between text-sm rounded-lg px-3 py-2" style={{ background: C.north + "11" }}>
                <span style={{ color: C.text }}>{s}</span>
                <span className="font-mono text-xs font-bold" style={{ color: C.north }}>▼ formula</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ChartCard>
  );
}

/* ---------------- SC/ST STACKED ---------------- */
function ReservationBars() {
  const groups = [
    { label: "SC Reserved", before: 84, after: 136, color: C.teal },
    { label: "ST Reserved", before: 47, after: 70, color: C.ne },
    { label: "Women (33%)", before: 0, after: 269, color: C.saffron },
    { label: "General (adj.)", before: 412, after: 341, color: "#6B7280" },
  ];
  const max = 816;
  return (
    <ChartCard title="The SC/ST/Women's Reservation Dividend">
      <div className="space-y-5">
        {groups.map((g, i) => (
          <motion.div
            key={g.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex justify-between text-sm mb-1.5">
              <span style={{ color: C.text }}>{g.label}</span>
              <span className="font-mono" style={{ color: C.text2 }}>
                {g.before} → <span style={{ color: g.color, fontWeight: 700 }}>{g.after}</span>
              </span>
            </div>
            <div className="relative h-3 rounded-full" style={{ background: C.grid }}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(g.before / max) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="absolute top-0 left-0 h-full rounded-full opacity-50"
                style={{ background: g.color }}
              />
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(g.after / max) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="absolute top-0 left-0 h-full rounded-full"
                style={{ background: g.color, boxShadow: `0 0 10px ${g.color}66` }}
              />
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 rounded-xl p-4 text-sm" style={{ background: C.alt, color: C.text }}>
        <strong>Insight:</strong> The only way to operationalize the Women's Reservation Act of 2023 is to expand the house first.
      </div>
    </ChartCard>
  );
}

/* ---------------- STATE EXPLORER ---------------- */
function StateExplorer() {
  const [sel, setSel] = useState("Tamil Nadu");
  const s = stateData.find((d) => d.state === sel)!;
  const verdict = s.proRataVsStrict >= 0;
  const max = Math.max(s.currentSeats, s.proRataSeats, s.strictSeats);
  return (
    <ChartCard title="Your State, Your Numbers — Explore the Data">
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <label className="text-sm font-medium" style={{ color: C.text2 }}>Select state:</label>
        <select
          value={sel}
          onChange={(e) => setSel(e.target.value)}
          className="rounded-lg px-3 py-2 text-sm border focus:outline-none"
          style={{ background: C.alt, color: C.text, borderColor: C.grid }}
        >
          {stateData.map((d) => (
            <option key={d.state}>{d.state}</option>
          ))}
        </select>
      </div>
      <motion.div
        key={sel}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h3 className="font-display text-2xl font-bold" style={{ color: C.text }}>{s.state}</h3>
            <span
              className="px-2.5 py-1 rounded-full text-[10px] font-semibold"
              style={{ background: regionColor(s.category) + "22", color: regionColor(s.category) }}
            >
              {s.category}
            </span>
          </div>
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <Stat label="Population (2011)" value={(s.population / 1e6).toFixed(2) + " M"} />
            <Stat label="Decadal Growth" value={s.decadalGrowth + "%"} />
            <Stat label="Literacy" value={s.literacy + "%"} />
            <Stat label="GSDP (₹ Cr)" value={s.gsdp.toLocaleString()} />
            <Stat label="TFR" value={s.tfr.toString()} />
            <Stat label="People per MP" value={(s.population / s.currentSeats / 1e6).toFixed(2) + "M"} />
          </dl>
          <div
            className="mt-5 rounded-xl px-4 py-3 text-sm font-semibold flex items-center gap-2"
            style={{
              background: (verdict ? C.south : C.north) + "1a",
              color: verdict ? C.south : C.north,
            }}
          >
            {verdict ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            {verdict ? "Gains under Pro-Rata ✅" : "Strict Pop gives more ⚠️"}
          </div>
        </div>
        <div>
          <h5 className="text-sm font-semibold mb-3" style={{ color: C.text }}>Seat scenarios</h5>
          {[
            { v: s.currentSeats, label: "Current", color: "#6B7280" },
            { v: s.proRataSeats, label: "Pro-Rata 50%", color: C.south },
            { v: s.strictSeats, label: "Strict Pop", color: C.north },
          ].map((b) => (
            <div key={b.label} className="grid grid-cols-[100px_1fr_auto] items-center gap-3 text-xs mb-2">
              <span style={{ color: C.text2 }}>{b.label}</span>
              <div className="h-3 rounded-full" style={{ background: C.grid }}>
                <motion.div
                  key={sel + b.label}
                  initial={{ width: 0 }}
                  animate={{ width: `${(b.v / max) * 100}%` }}
                  transition={{ duration: 0.7 }}
                  className="h-full rounded-full"
                  style={{ background: b.color }}
                />
              </div>
              <span className="font-mono tabular-nums w-8 text-right" style={{ color: C.text }}>{b.v}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </ChartCard>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg p-3" style={{ background: C.alt }}>
      <div className="text-[10px] uppercase tracking-wider" style={{ color: C.text2 }}>{label}</div>
      <div className="mt-1 font-mono font-bold" style={{ color: C.text }}>{value}</div>
    </div>
  );
}

/* ---------------- TABLE OF CONTENTS ---------------- */
const TOC = [
  { id: "freeze", label: "1. The Freeze" },
  { id: "magic", label: "2. The Magic Number" },
  { id: "seesaw", label: "3. North–South Seesaw" },
  { id: "vote", label: "4. One Vote, One Value" },
  { id: "majority", label: "5. The Majority Myth" },
  { id: "formula", label: "6. Formula Argument" },
  { id: "scst", label: "7. SC/ST Dividend" },
  { id: "explorer", label: "8. State Explorer" },
  { id: "mla", label: "9. Why Not MLA First" },
  { id: "conclusion", label: "10. Conclusion" },
];

function TableOfContents() {
  const [active, setActive] = useState(TOC[0].id);
  useEffect(() => {
    const onScroll = () => {
      for (const t of TOC) {
        const el = document.getElementById(t.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top < 160 && r.bottom > 160) {
          setActive(t.id);
          return;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav
      className="sticky top-28 hidden xl:block rounded-2xl p-5"
      style={{ background: C.card, boxShadow: "0 8px 30px rgba(13,27,42,0.06)" }}
    >
      <div className="text-[10px] uppercase tracking-[0.2em] font-bold mb-3" style={{ color: C.saffron }}>
        On this page
      </div>
      <ul className="space-y-1.5 text-sm">
        {TOC.map((t) => (
          <li key={t.id}>
            <a
              href={`#${t.id}`}
              className="block py-1 transition-colors border-l-2 pl-3"
              style={{
                color: active === t.id ? C.text : C.text2,
                borderColor: active === t.id ? C.saffron : "transparent",
                fontWeight: active === t.id ? 600 : 400,
              }}
            >
              {t.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ---------------- PAGE ---------------- */
function DelimitationPost() {
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const copyLink = () => {
    navigator.clipboard?.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <article style={{ background: C.alt, color: C.text }}>
      {/* Reading progress */}
      <div
        className="fixed top-0 left-0 h-1 z-[60] transition-[width] duration-150"
        style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${C.saffron}, ${C.teal})` }}
      />

      {/* HERO */}
      <header className="relative pt-32 pb-20 overflow-hidden" style={{ background: C.navy }}>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${deliCover})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${C.navy}cc 0%, ${C.navy} 100%)` }} />
        {/* glowing dots */}
        {[
          [22, 35], [35, 28], [48, 42], [55, 30], [40, 55], [32, 65], [60, 60], [70, 45], [25, 75], [50, 78],
        ].map(([x, y], i) => (
          <span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full animate-pulse"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              background: C.saffron,
              boxShadow: `0 0 12px ${C.saffron}`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
        <div className="relative container mx-auto px-6 max-w-5xl">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm transition-colors"
            style={{ color: "#94a3b8" }}
          >
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-8"
          >
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="px-3 py-1 rounded-full font-semibold" style={{ background: C.saffron, color: C.navy }}>
                Politics & Data
              </span>
              <span className="text-blog-hero-muted">May 1, 2026</span>
              <span className="inline-flex items-center gap-1.5" style={{ color: "#94a3b8" }}>
                <Clock className="h-3 w-3" /> 12 min read
              </span>
            </div>
            <h1
              className="mt-6 font-display font-bold tracking-tight text-4xl md:text-6xl lg:text-7xl text-white leading-[1.05]"
            >
              816 Seats:{" "}
              <span
                style={{
                  background: `linear-gradient(90deg, ${C.saffron}, ${C.teal})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Mapping the New DNA of Indian Democracy
              </span>
            </h1>
            <p className="mt-5 text-lg md:text-xl max-w-3xl" style={{ color: "#cbd5e1" }}>
              How a flat 50% seat increase is the fairest solution India has seen in 50 years — and why
              formula-based alternatives fail the democracy test.
            </p>

            <div
              className="mt-10 rounded-2xl p-6 md:p-7 max-w-3xl"
              style={{ background: "#142640", border: `1px solid ${C.saffron}33` }}
            >
              <p className="text-base md:text-lg italic leading-relaxed" style={{ color: "#e2e8f0" }}>
                For 50 years, India's Lok Sabha was frozen at 543 seats — drawn from a 1971 census while the
                country added 600 million people. The 2026 delimitation bill proposes a clean, flat 50%
                increase to 816 seats across all states. This analysis shows why that simple formula is not
                just fair — it's the only solution that doesn't punish the south for following the rules.
              </p>
            </div>

            {/* share */}
            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs" style={{ color: "#94a3b8" }}>
              <span className="inline-flex items-center gap-1.5"><Share2 className="h-3.5 w-3.5" /> Share:</span>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("816 Seats: Mapping the New DNA of Indian Democracy")}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank" rel="noreferrer"
                className="rounded-full p-2"
                style={{ background: "#142640" }}
              ><Twitter className="h-3.5 w-3.5" /></a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank" rel="noreferrer"
                className="rounded-full p-2"
                style={{ background: "#142640" }}
              ><Linkedin className="h-3.5 w-3.5" /></a>
              <button onClick={copyLink} className="rounded-full p-2" style={{ background: "#142640" }}>
                <LinkIcon className="h-3.5 w-3.5" />
              </button>
              {copied && <span style={{ color: C.saffron }}>Copied!</span>}
            </div>
          </motion.div>
        </div>
      </header>

      {/* BODY */}
      <div className="container mx-auto px-6 max-w-7xl py-16">
        <div className="grid xl:grid-cols-[1fr_240px] gap-10">
          <main className="max-w-3xl mx-auto xl:mx-0 w-full">

            {/* SECTION 1 */}
            <Reveal>
              <SectionHeading id="freeze" kicker="Section 1 — The Freeze">
                50 Years. Frozen. Here's Why That Ends in 2026.
              </SectionHeading>
              <p className="text-lg leading-[1.85]" style={{ color: C.text }}>
                After the 1971 census, Parliament froze seat counts to avoid penalizing states with lower
                population growth. The freeze was extended in 2001 to 2026. Now, the 2026 census and the
                131st Amendment finally <em>unfreeze</em> delimitation for the first time in half a century.
              </p>
              <Timeline />
            </Reveal>

            {/* SECTION 2 */}
            <Reveal>
              <SectionHeading id="magic" kicker="Section 2 — The Formula">
                Why 50%? The Math Behind the Magic Number
              </SectionHeading>
              <p className="text-lg leading-[1.85]" style={{ color: C.text }}>
                543 × 1.5 = ~816. A flat 50% lift applied to every state's current seat count. Clean,
                transparent, no committee, no formula. Every state gets exactly 1.5× what it has now —
                no more, no less.
              </p>
              <div className="mt-8 grid sm:grid-cols-3 gap-4">
                {[
                  { v: "543 → 816", l: "Total Lok Sabha seats" },
                  { v: "272 → 409", l: "Majority mark rises proportionally" },
                  { v: "33%", l: "Women's Reservation operational" },
                ].map((s) => (
                  <div key={s.v} className="rounded-2xl p-5" style={{ background: C.card, boxShadow: "0 8px 30px rgba(13,27,42,0.08)" }}>
                    <div
                      className="font-display text-2xl md:text-3xl font-bold"
                      style={{
                        background: `linear-gradient(90deg, ${C.saffron}, ${C.teal})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {s.v}
                    </div>
                    <div className="mt-2 text-sm" style={{ color: C.text2 }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <ScenarioBars />
            </Reveal>

            {/* SECTION 3 */}
            <Reveal>
              <SectionHeading id="seesaw" kicker="Section 3 — Power Balance">
                The Political Seesaw: Does the South Lose Power?
              </SectionHeading>
              <p className="text-lg leading-[1.85]" style={{ color: C.text }}>
                The core fear: that growing northern states will dominate Parliament. The data tells a
                different story. Under <strong>Pro-Rata</strong>, the South's share stays at <strong>~23.77%</strong> —
                virtually identical to today's 23.76%. Under the Strict population model, South would drop
                to <strong>20.83%</strong>. <em>That</em> is the key data point.
              </p>
              <div className="not-prose my-8 grid md:grid-cols-3 gap-4">
                <ShareDonut title="Current — 543 seats" field="currentSeats" />
                <ShareDonut title="Pro-Rata — 816 seats" field="proRataSeats" />
                <ShareDonut title="If Strict Population" field="strictSeats" />
              </div>
              <WinnersTable />
            </Reveal>

            {/* SECTION 4 */}
            <Reveal>
              <SectionHeading id="vote" kicker="Section 4 — One Vote">
                One Vote, One Value — and the Acceptable Trade-Off
              </SectionHeading>
              <p className="text-lg leading-[1.85]" style={{ color: C.text }}>
                The voter-to-MP ratio won't be perfectly equal. UP will still have ~1.66M people per MP under
                Pro-Rata, while Sikkim sits near 300K. But this <strong>"Federalism Tax"</strong> is the price
                we pay to keep the Union together. Strict proportionality would devastate small states and
                punish the south for following population control.
              </p>
              <Scatter />
            </Reveal>

            {/* SECTION 5 */}
            <Reveal>
              <SectionHeading id="majority" kicker="Section 5 — The Majority">
                Does the North Win Everything? The Majority Myth, Busted.
              </SectionHeading>
              <p className="text-lg leading-[1.85]" style={{ color: C.text }}>
                With 120 UP seats and 60 Bihar seats, the fear is the "Hindi Belt" can win alone. But the
                majority mark rises from 272 to <strong>409</strong>. No single region holds 409+ seats even
                under Pro-Rata. Coalition politics remains the rule, not the exception.
              </p>
              <MajorityBar />
            </Reveal>

            {/* SECTION 6 */}
            <Reveal>
              <SectionHeading id="formula" kicker="Section 6 — Counter-Argument">
                The GSDP–TFR–HDI Formula: Sounds Smart. It Isn't Fair.
              </SectionHeading>
              <p className="text-lg leading-[1.85]" style={{ color: C.text }}>
                Some experts propose awarding seats based on a weighted formula of economic output,
                fertility, and HDI. It sounds sophisticated, but it fundamentally violates "one person,
                one vote" — rewarding economic performance and penalizing fertility, effectively giving
                cities and southern states disproportionate power.
              </p>
              <div className="not-prose my-8 grid md:grid-cols-3 gap-4">
                {[
                  { icon: <Vote className="h-5 w-5" />, title: "Contradicts the core purpose", text: "Delimitation exists to ensure equal vote value, not to reward development policy." },
                  { icon: <Scale className="h-5 w-5" />, title: "Double punishment for the North", text: "High-TFR states already get fewer seats per capita under strict — formula makes it worse." },
                  { icon: <Users className="h-5 w-5" />, title: "Creates a precedent", text: "Once economic metrics enter seat allocation, it becomes a political auction every 10 years." },
                ].map((c) => (
                  <div key={c.title} className="rounded-2xl p-5" style={{ background: C.card, boxShadow: "0 8px 30px rgba(13,27,42,0.08)" }}>
                    <div className="flex items-center gap-2 mb-2" style={{ color: C.saffron }}>{c.icon}<span className="text-xs uppercase tracking-wider font-bold">Argument</span></div>
                    <h5 className="font-semibold mb-2" style={{ color: C.text }}>{c.title}</h5>
                    <p className="text-sm leading-relaxed" style={{ color: C.text2 }}>{c.text}</p>
                  </div>
                ))}
              </div>
              <FormulaImpact />
            </Reveal>

            {/* SECTION 7 */}
            <Reveal>
              <SectionHeading id="scst" kicker="Section 7 — Justice">
                More Seats, More Justice: The SC/ST Dividend
              </SectionHeading>
              <p className="text-lg leading-[1.85]" style={{ color: C.text }}>
                Delimitation isn't just about geography — it's about justice. SC reserved seats rise from
                84 to 136 (<strong>+62%</strong>). ST seats from 47 to 70 (<strong>+49%</strong>). All
                automatically, under Pro-Rata, without taking from the general pool.
              </p>
              <ReservationBars />
            </Reveal>

            {/* SECTION 8 */}
            <Reveal>
              <SectionHeading id="explorer" kicker="Section 8 — Interactive">
                Your State, Your Numbers — Explore the Data
              </SectionHeading>
              <StateExplorer />
            </Reveal>

            {/* SECTION 9 */}
            <Reveal>
              <SectionHeading id="mla" kicker="Section 9 — Sequencing">
                What About State Assemblies? Not Yet — and Here's Why.
              </SectionHeading>
              <div className="text-lg leading-[1.85] space-y-4" style={{ color: C.text }}>
                <p>
                  MLA delimitation requires 28 separate state-level exercises — different commissions,
                  court challenges, caste equations. It cannot be batched.
                </p>
                <p>
                  Time matters: 2029 elections are the target. MLA delimitation done properly takes 5–8
                  years per state.
                </p>
                <p>
                  <strong>The correct sequence:</strong> MP seats first → Women's Reservation operational →
                  MLA seats after the 2034 census cycle. This is not "either / or" — it's "MP seats now,
                  MLA seats next."
                </p>
              </div>
            </Reveal>

            {/* SECTION 10 */}
            <Reveal>
              <SectionHeading id="conclusion" kicker="Section 10 — Conclusion">
                816 Seats: The Only Pragmatic Path Forward
              </SectionHeading>
              <p className="text-lg leading-[1.85]" style={{ color: C.text }}>
                The 131st Amendment's 50% pro-rata increase is not a perfect solution. No solution in a
                democracy of 1.4 billion people can be. But it is the most pragmatic, most fair, and most
                urgent option available for 2029.
              </p>
              <ul className="not-prose my-8 space-y-3">
                {[
                  "No state is penalized for population control",
                  "Women's Reservation Act becomes operational immediately",
                  "SC/ST communities gain more absolute seats",
                  "Southern states maintain their proportional voice",
                  "The majority mark rises proportionally — no region can sweep alone",
                  "Simple, transparent, zero-formula politics",
                ].map((p) => (
                  <li key={p} className="flex gap-3 items-start text-base">
                    <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0" style={{ color: C.south }} />
                    <span style={{ color: C.text }}>{p}</span>
                  </li>
                ))}
              </ul>

              <ChartCard title="Formula-Based vs. Pro-Rata 50% — at a glance">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs uppercase tracking-wider" style={{ color: C.text2 }}>
                        <th className="py-3 pr-3">Dimension</th>
                        <th className="py-3 pr-3 text-center">Formula-Based</th>
                        <th className="py-3 text-center">Pro-Rata 50%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["One Vote, One Value", false, true],
                        ["South fairness", true, true],
                        ["North fairness", false, true],
                        ["Small states protected", false, true],
                        ["Political feasibility", false, true],
                        ["Transparency", false, true],
                      ].map(([k, a, b]) => (
                        <tr key={k as string} className="border-t" style={{ borderColor: C.grid }}>
                          <td className="py-2.5 pr-3" style={{ color: C.text }}>{k}</td>
                          <td className="py-2.5 pr-3 text-center" style={{ color: a ? C.south : C.north }}>{a ? "✅" : "❌"}</td>
                          <td className="py-2.5 text-center" style={{ color: b ? C.south : C.north }}>{b ? "✅" : "❌"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </ChartCard>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="not-prose my-12 rounded-3xl p-8 md:p-12 text-center"
                style={{ background: C.navy }}
              >
                <p
                  className="font-display text-2xl md:text-4xl font-bold leading-snug italic"
                  style={{
                    background: `linear-gradient(90deg, ${C.saffron}, ${C.teal})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  "The south didn't lose. The north didn't win. India moved forward — together."
                </p>
              </motion.div>
            </Reveal>

            {/* TAGS + FOOTER */}
            <div className="mt-12 flex flex-wrap gap-2">
              {["#Delimitation", "#IndianPolitics", "#DataAnalysis", "#816Seats", "#WomensReservation"].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs"
                  style={{ background: C.card, color: C.text2, border: `1px solid ${C.grid}` }}
                >
                  <Tag className="h-3 w-3" /> {t}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 pt-6 border-t" style={{ borderColor: C.grid }}>
              <Link
                to="/blogs"
                className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full"
                style={{ background: C.navy, color: "#fff" }}
              >
                <ArrowLeft className="h-4 w-4" /> Back to Blog
              </Link>
              <div className="flex items-center gap-2 text-xs" style={{ color: C.text2 }}>
                <span>Share:</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("816 Seats")}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank" rel="noreferrer"
                  className="rounded-full p-2"
                  style={{ background: C.alt }}
                ><Twitter className="h-3.5 w-3.5" /></a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank" rel="noreferrer"
                  className="rounded-full p-2"
                  style={{ background: C.alt }}
                ><Linkedin className="h-3.5 w-3.5" /></a>
                <button onClick={copyLink} className="rounded-full p-2" style={{ background: C.alt }}>
                  <LinkIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </main>

          <aside>
            <TableOfContents />
          </aside>
        </div>
      </div>
    </article>
  );
}

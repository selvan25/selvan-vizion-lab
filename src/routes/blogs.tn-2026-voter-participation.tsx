import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Share2,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  Tag,
  TrendingUp,
  Users,
  CheckCircle2,
  Quote,
} from "lucide-react";
import cover from "@/assets/blog-tn2026.jpg";
import { BlogEngagement } from "@/components/BlogEngagement";

export const Route = createFileRoute("/blogs/tn-2026-voter-participation")({
  head: () => ({
    meta: [
      { title: "The 85% Question: Did Tamil Nadu Really Vote More? — Selvan Rajan" },
      {
        name: "description",
        content:
          "A simple data-driven case for why Tamil Nadu's 2026 voter surge is real — and why SIR deletions are not the reason for it.",
      },
      { property: "og:title", content: "The 85% Question — Tamil Nadu 2026 Voter Turnout" },
      {
        property: "og:description",
        content: "Why TN's 2026 turnout surge is real — and why SIR is not the reason.",
      },
      { property: "og:image", content: cover },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: cover },
    ],
  }),
  component: TN2026Post,
});

/* ---------------- TOKENS (theme-aware) ---------------- */
const C = {
  // brand accents
  blue: "#3B82F6",
  green: "#10B981",
  orange: "#F4A026",
  gray: "#6B7280",
  purple: "#8B5CF6",
  red: "#EF4444",
  // theme tokens
  text: "var(--foreground)",
  text2: "var(--muted-foreground)",
  card: "var(--card)",
  alt: "var(--muted)",
  grid: "var(--border)",
};

/* ---------------- HELPERS ---------------- */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ChartCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div
      className="not-prose my-6 sm:my-8 rounded-2xl p-4 sm:p-5 md:p-7"
      style={{
        background: C.card,
        boxShadow: "0 8px 30px rgba(13,27,42,0.08), 0 2px 6px rgba(13,27,42,0.04)",
      }}
    >
      <h4 className="font-display text-sm sm:text-base md:text-lg font-bold break-words" style={{ color: C.text }}>
        {title}
      </h4>
      {subtitle && (
        <p className="mt-1 text-xs sm:text-sm" style={{ color: C.text2 }}>
          {subtitle}
        </p>
      )}
      <div className="mt-4 sm:mt-5">{children}</div>
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="not-prose my-6 sm:my-8 rounded-2xl p-4 sm:p-5 border-l-4"
      style={{
        background: C.alt,
        borderColor: C.orange,
        color: C.text,
      }}
    >
      <div className="flex gap-3 items-start">
        <Quote className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 mt-1" style={{ color: C.orange }} />
        <p className="text-sm sm:text-base leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

function SectionHeading({ kicker, children }: { kicker?: string; children: React.ReactNode }) {
  return (
    <div className="mb-5 sm:mb-7 mt-10 sm:mt-14">
      {kicker && (
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-semibold" style={{ color: C.orange }}>
          {kicker}
        </span>
      )}
      <h2
        className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight break-words"
        style={{
          background: `linear-gradient(90deg, ${C.orange}, ${C.green})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {children}
      </h2>
      <div className="mt-3 h-px w-full" style={{ background: `linear-gradient(90deg, ${C.orange}55, transparent)` }} />
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-base sm:text-lg leading-[1.8] my-4" style={{ color: C.text }}>{children}</p>;
}

/* ---------------- TURNOUT BAR CHART (animated) ---------------- */
function TurnoutBars() {
  const data = [
    { year: "2021", value: 73.6, color: C.blue },
    { year: "2026", value: 85.15, color: C.green },
  ];
  const maxVal = 100;
  return (
    <ChartCard title="Voter turnout: 2021 vs 2026" subtitle="Tamil Nadu Assembly Elections">
      <div className="flex items-end justify-center gap-8 sm:gap-16 px-4 sm:px-12" style={{ height: "240px" }}>
        {data.map((d, i) => {
          const heightPct = (d.value / maxVal) * 100;
          return (
            <div key={d.year} className="flex flex-col items-center gap-3 flex-1 max-w-[140px]" style={{ height: "100%", justifyContent: "flex-end" }}>
              <div className="w-full flex flex-col items-center" style={{ height: `${heightPct}%`, position: "relative" }}>
                {/* value label above bar */}
                <span
                  className="text-lg sm:text-2xl font-bold font-mono mb-2"
                  style={{ color: d.color }}
                >
                  {d.value}%
                </span>
                {/* bar */}
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full rounded-t-2xl"
                  style={{
                    background: `linear-gradient(180deg, ${d.color}, ${d.color}88)`,
                    boxShadow: `0 0 32px ${d.color}55`,
                    minHeight: "4px",
                  }}
                />
              </div>
              <div className="text-sm sm:text-base font-bold" style={{ color: C.text }}>{d.year}</div>
            </div>
          );
        })}
      </div>
      {/* delta callout */}
      <div className="mt-5 rounded-xl p-3 text-center text-sm font-medium" style={{ background: C.alt, color: C.text }}>
        <span style={{ color: C.green }}>+11.55 percentage points</span> increase from 2021 to 2026
      </div>
    </ChartCard>
  );
}

/* ---------------- VOTED vs NOT VOTED STACK ---------------- */
function VotedStack({
  title,
  subtitle,
  data,
}: {
  title: string;
  subtitle?: string;
  data: { year: string; voted: number; notVoted: number; unit: string }[];
}) {
  const [hover, setHover] = useState<{ row: number; key: "voted" | "not" } | null>(null);
  return (
    <ChartCard title={title} subtitle={subtitle}>
      <div className="space-y-5 sm:space-y-6">
        {data.map((d, i) => {
          const total = Math.round((d.voted + d.notVoted) * 100) / 100;
          const vPct = (d.voted / (d.voted + d.notVoted)) * 100;
          const nPct = 100 - vPct;
          return (
            <div key={d.year}>
              <div className="flex items-center justify-between mb-2 text-xs sm:text-sm">
                <span className="font-semibold" style={{ color: C.text }}>{d.year}</span>
                <span style={{ color: C.text2 }}>Total: {total} {d.unit}</span>
              </div>
              {/* Full-width bar — both segments always visible */}
              <div className="relative h-10 sm:h-12 rounded-xl overflow-hidden w-full" style={{ background: C.alt }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${vPct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.12 }}
                  className="absolute inset-y-0 left-0 flex items-center justify-center text-[11px] sm:text-xs font-semibold text-white cursor-pointer"
                  style={{ background: `linear-gradient(90deg, ${C.blue}, ${C.blue}cc)`, minWidth: "60px" }}
                  onMouseEnter={() => setHover({ row: i, key: "voted" })}
                  onMouseLeave={() => setHover(null)}
                  onTouchStart={() => setHover(i === hover?.row && hover?.key === "voted" ? null : { row: i, key: "voted" })}
                >
                  <span className="px-2 truncate">Voted {d.voted}</span>
                </motion.div>
                <motion.div
                  initial={{ width: "100%" }}
                  whileInView={{ width: `${nPct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4 + i * 0.12 }}
                  className="absolute inset-y-0 right-0 flex items-center justify-center text-[11px] sm:text-xs font-semibold text-white cursor-pointer"
                  style={{ background: C.gray, minWidth: "60px" }}
                  onMouseEnter={() => setHover({ row: i, key: "not" })}
                  onMouseLeave={() => setHover(null)}
                  onTouchStart={() => setHover(i === hover?.row && hover?.key === "not" ? null : { row: i, key: "not" })}
                >
                  <span className="px-2 truncate">Did not {d.notVoted}</span>
                </motion.div>
              </div>
              {/* Always-visible stats below bar on mobile */}
              <div className="mt-2 flex justify-between text-[11px] sm:text-xs" style={{ color: C.text2 }}>
                <span style={{ color: C.blue }}>Voted: {d.voted} {d.unit} ({vPct.toFixed(1)}%)</span>
                <span style={{ color: C.gray }}>Did not: {d.notVoted} {d.unit} ({nPct.toFixed(1)}%)</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-5 flex flex-wrap gap-3 sm:gap-4 text-[11px] sm:text-xs" style={{ color: C.text2 }}>
        <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-sm" style={{ background: C.blue }} /> Voted</span>
        <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-sm" style={{ background: C.gray }} /> Did not vote</span>
      </div>
    </ChartCard>
  );
}

/* ---------------- DONUT — SIR Deletions ---------------- */
function SIRDonut() {
  const data = [
    { label: "Shifted / Absent", value: 68, count: "66.4 lakh", color: C.orange },
    { label: "Deceased", value: 28, count: "26.9 lakh", color: C.gray },
    { label: "Duplicates", value: 4, count: "3.98 lakh", color: C.purple },
  ];
  const [active, setActive] = useState<number | null>(null);
  const R = 70;
  const Cc = 2 * Math.PI * R;
  let acc = 0;
  return (
    <ChartCard title="What SIR actually deleted" subtitle="Breakdown of 97.3 lakh voters removed in 2025">
      <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
        <div className="relative w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] shrink-0">
          <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
            <circle cx="100" cy="100" r={R} fill="none" style={{ stroke: C.grid }} strokeWidth="22" />
            {data.map((d, i) => {
              const frac = d.value / 100;
              const dash = frac * Cc;
              const offset = -acc * Cc;
              acc += frac;
              return (
                <motion.circle
                  key={d.label}
                  cx="100"
                  cy="100"
                  r={R}
                  fill="none"
                  stroke={d.color}
                  strokeWidth={active === i ? 26 : 22}
                  strokeDasharray={`${dash} ${Cc - dash}`}
                  strokeDashoffset={offset}
                  initial={{ opacity: 0, strokeDasharray: `0 ${Cc}` }}
                  whileInView={{ opacity: 1, strokeDasharray: `${dash} ${Cc - dash}` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: i * 0.12 }}
                  style={{ cursor: "pointer", transition: "stroke-width 0.2s" }}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onClick={() => setActive(active === i ? null : i)}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            {active !== null ? (
              <>
                <span className="font-display text-2xl font-bold" style={{ color: data[active].color }}>{data[active].value}%</span>
                <span className="text-[10px] uppercase tracking-[0.18em] mt-0.5 text-center px-2" style={{ color: C.text2 }}>{data[active].count}</span>
              </>
            ) : (
              <>
                <span className="font-display text-2xl font-bold" style={{ color: C.text }}>97.3L</span>
                <span className="text-[10px] uppercase tracking-[0.18em] mt-0.5" style={{ color: C.text2 }}>deleted</span>
              </>
            )}
          </div>
        </div>
        <div className="flex-1 w-full space-y-2.5">
          {data.map((d, i) => (
            <button
              key={d.label}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive(active === i ? null : i)}
              className="w-full text-left rounded-xl p-3 transition-all"
              style={{
                background: active === i ? C.alt : "transparent",
                border: `1px solid ${active === i ? d.color : C.grid}`,
              }}
            >
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-sm shrink-0" style={{ background: d.color }} />
                <span className="flex-1 text-sm font-medium truncate" style={{ color: C.text }}>{d.label}</span>
                <span className="font-mono text-xs sm:text-sm font-semibold" style={{ color: d.color }}>{d.value}%</span>
              </div>
              <div className="mt-1 ml-6 text-[11px] sm:text-xs" style={{ color: C.text2 }}>{d.count}</div>
            </button>
          ))}
        </div>
      </div>
    </ChartCard>
  );
}

/* ---------------- THIRD-FORCE BAR CHART ---------------- */
function ThirdForceBars() {
  const data = [
    { label: "TVK 2026", value: 24, color: C.purple },
    { label: "DMDK 2011 (peak)", value: 8, color: C.orange },
    { label: "NTK 2021", value: 6, color: C.gray },
  ];
  const max = 30;
  const [hover, setHover] = useState<number | null>(null);
  return (
    <ChartCard title="Third-force vote share: TVK vs history" subtitle="Vote share % at peak performance">
      <div className="space-y-4">
        {data.map((d, i) => (
          <div
            key={d.label}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            onTouchStart={() => setHover(i)}
          >
            <div className="flex items-center justify-between mb-1.5 text-xs sm:text-sm">
              <span className="font-medium" style={{ color: C.text }}>{d.label}</span>
              <span className="font-mono font-semibold" style={{ color: d.color }}>{d.value}%</span>
            </div>
            <div className="h-3 sm:h-4 rounded-full overflow-hidden" style={{ background: C.alt }}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(d.value / max) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.12 }}
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${d.color}, ${d.color}aa)`,
                  boxShadow: hover === i ? `0 0 16px ${d.color}88` : "none",
                  transition: "box-shadow 0.3s",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}

/* ---------------- INTERACTIVE BOOTH SLIDER ---------------- */
function BoothSlider() {
  const TOTAL_BOOTHS = 75026;
  const TOTAL_VOTES = 4.88e7;
  const [v, setV] = useState(150);
  const tvkVotes = v * TOTAL_BOOTHS;
  const tvkShare = (tvkVotes / TOTAL_VOTES) * 100;

  // Dynamic vote share distribution across parties
  // As TVK grows, it pulls proportionally from DMK (-55%), ADMK (-30%), Others (-15%)
  const baseDMK = 38.0, baseADMK = 20.0, baseOthers = 4.0;
  const baselineShare = (150 * TOTAL_BOOTHS / TOTAL_VOTES) * 100; // ~23.1% baseline
  const delta = tvkShare - baselineShare;
  const dmkShare = Math.max(5, baseDMK - delta * 0.55);
  const admkShare = Math.max(3, baseADMK - delta * 0.30);
  const othersShare = Math.max(1, baseOthers - delta * 0.15);

  const bars = [
    { label: "DMK Alliance", share: dmkShare, color: C.blue },
    { label: "ADMK Alliance", share: admkShare, color: C.orange },
    { label: "TVK", share: tvkShare, color: C.purple },
    { label: "Others", share: othersShare, color: C.gray },
  ];
  const maxShare = Math.max(...bars.map((b) => b.share));

  const fmt = (n: number) => {
    if (n >= 1e7) return `${(n / 1e7).toFixed(2)} crore`;
    return `${(n / 1e5).toFixed(0)} lakh`;
  };

  return (
    <ChartCard title="Estimate TVK's vote share" subtitle="Slide to set the average TVK votes per booth (75,026 booths statewide)">
      <div className="space-y-5">
        {/* Slider */}
        <div>
          <div className="flex items-center justify-between mb-2 text-xs sm:text-sm">
            <span style={{ color: C.text2 }}>TVK votes per booth</span>
            <span className="font-mono font-bold text-base" style={{ color: C.purple }}>{v}</span>
          </div>
          <input
            type="range"
            min={50}
            max={300}
            step={5}
            value={v}
            onChange={(e) => setV(+e.target.value)}
            className="w-full"
            style={{ accentColor: C.purple }}
          />
          <div className="mt-1 flex justify-between text-[10px]" style={{ color: C.text2 }}>
            <span>50</span><span>175</span><span>300</span>
          </div>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl p-3 sm:p-4 text-center" style={{ background: C.alt }}>
            <div className="text-[10px] sm:text-xs uppercase tracking-wider mb-1" style={{ color: C.text2 }}>Estimated TVK total votes</div>
            <div className="font-display text-lg sm:text-2xl font-bold" style={{ color: C.purple }}>{fmt(tvkVotes)}</div>
          </div>
          <div className="rounded-xl p-3 sm:p-4 text-center" style={{ background: C.alt }}>
            <div className="text-[10px] sm:text-xs uppercase tracking-wider mb-1" style={{ color: C.text2 }}>Vote share →</div>
            <div className="font-display text-lg sm:text-2xl font-bold" style={{ color: C.green }}>{tvkShare.toFixed(1)}%</div>
          </div>
        </div>

        {/* Dynamic bar chart */}
        <div className="space-y-3">
          {bars.map((b) => (
            <div key={b.label}>
              <div className="flex items-center justify-between mb-1 text-xs sm:text-sm">
                <span className="font-medium" style={{ color: C.text }}>{b.label}</span>
                <span className="font-mono font-bold" style={{ color: b.color }}>{b.share.toFixed(1)}%</span>
              </div>
              <div className="h-7 sm:h-9 rounded-lg overflow-hidden" style={{ background: C.alt }}>
                <motion.div
                  animate={{ width: `${(b.share / maxShare) * 100}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="h-full rounded-lg flex items-center px-3 text-[11px] sm:text-xs font-semibold text-white"
                  style={{
                    background: `linear-gradient(90deg, ${b.color}, ${b.color}bb)`,
                    boxShadow: b.label === "TVK" ? `0 0 12px ${b.color}66` : "none",
                  }}
                >
                  {b.share > 8 ? `${b.share.toFixed(1)}%` : ""}
                </motion.div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[11px] sm:text-xs italic" style={{ color: C.text2 }}>
          * Redistribution is approximate — TVK votes modelled as drawn proportionally from DMK (55%), ADMK (30%), and Others (15%).
        </p>
      </div>
    </ChartCard>
  );
}

/* ---------------- TWO-COLUMN COMPARISON ---------------- */
function TurnoutMath() {
  const cols = [
    { year: "2021", reg: "6.41 cr", voted: "4.59 cr", pct: "73.6%", color: C.blue },
    { year: "2026", reg: "5.73 cr", voted: "4.88 cr", pct: "85.15%", color: C.green },
  ];
  return (
    <ChartCard title="The correct way to read turnout" subtitle="Each year uses its own valid voter rolls">
      <div className="grid grid-cols-2 gap-3 sm:gap-5">
        {cols.map((c, i) => (
          <motion.div
            key={c.year}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            className="rounded-2xl p-4 sm:p-5 text-center relative overflow-hidden"
            style={{ background: C.alt, border: `1px solid ${c.color}44` }}
          >
            <div className="text-xs sm:text-sm uppercase tracking-widest font-semibold" style={{ color: c.color }}>{c.year}</div>
            <div className="mt-3 text-[10px] sm:text-xs" style={{ color: C.text2 }}>Registered</div>
            <div className="font-mono text-base sm:text-lg font-bold" style={{ color: C.text }}>{c.reg}</div>
            <div className="my-2 text-lg" style={{ color: c.color }}>↓</div>
            <div className="text-[10px] sm:text-xs" style={{ color: C.text2 }}>Voted</div>
            <div className="font-mono text-base sm:text-lg font-bold" style={{ color: C.text }}>{c.voted}</div>
            <div className="my-2 text-lg" style={{ color: c.color }}>↓</div>
            <div className="text-[10px] sm:text-xs" style={{ color: C.text2 }}>Turnout</div>
            <div className="font-display text-2xl sm:text-3xl font-extrabold mt-1" style={{ color: c.color }}>{c.pct}</div>
          </motion.div>
        ))}
      </div>
    </ChartCard>
  );
}

/* ---------------- DATA TABLE ---------------- */
function ComparisonTable() {
  const rows = [
    ["Registered voters", "6.41 crore", "5.73 crore"],
    ["Voters deleted (SIR)", "—", "97.3 lakh deleted"],
    ["New voters added", "—", "24 lakh added"],
    ["Net change", "—", "−73.3 lakh"],
    ["Actual votes cast", "~4.59 crore", "~4.88 crore"],
    ["Voter turnout %", "73.6%", "85.15%"],
    ["Votes NOT cast", "~1.82 crore", "~0.85 crore"],
  ];
  return (
    <div className="not-prose my-6 sm:my-8 -mx-4 sm:mx-0 overflow-x-auto">
      <div className="min-w-[420px] px-4 sm:px-0">
        <table className="w-full text-sm rounded-2xl overflow-hidden" style={{ background: C.card }}>
          <thead>
            <tr style={{ background: C.alt, color: C.text }}>
              <th className="text-left p-3 sm:p-4 font-semibold text-xs sm:text-sm"></th>
              <th className="text-left p-3 sm:p-4 font-semibold text-xs sm:text-sm">2021</th>
              <th className="text-left p-3 sm:p-4 font-semibold text-xs sm:text-sm">2026</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ borderTop: `1px solid ${C.grid}` }}>
                <td className="p-3 sm:p-4 text-xs sm:text-sm font-medium" style={{ color: C.text }}>{r[0]}</td>
                <td className="p-3 sm:p-4 text-xs sm:text-sm" style={{ color: C.text2 }}>{r[1]}</td>
                <td className="p-3 sm:p-4 text-xs sm:text-sm font-mono" style={{ color: C.text }}>{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ChennaiTable() {
  const rows = [
    ["Registered voters", "~40 lakh", "~28.3 lakh"],
    ["Votes cast", "~24.17 lakh", "~23.69 lakh"],
    ["Turnout %", "59.06%", "83.7%"],
    ["Did not vote", "~15.83 lakh", "~4.61 lakh"],
  ];
  return (
    <div className="not-prose my-6 -mx-4 sm:mx-0 overflow-x-auto">
      <div className="min-w-[380px] px-4 sm:px-0">
        <table className="w-full text-sm rounded-2xl overflow-hidden" style={{ background: C.card }}>
          <thead>
            <tr style={{ background: C.alt, color: C.text }}>
              <th className="text-left p-3 font-semibold text-xs sm:text-sm">Chennai</th>
              <th className="text-left p-3 font-semibold text-xs sm:text-sm">2021</th>
              <th className="text-left p-3 font-semibold text-xs sm:text-sm">2026</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ borderTop: `1px solid ${C.grid}` }}>
                <td className="p-3 text-xs sm:text-sm font-medium" style={{ color: C.text }}>{r[0]}</td>
                <td className="p-3 text-xs sm:text-sm" style={{ color: C.text2 }}>{r[1]}</td>
                <td className="p-3 text-xs sm:text-sm font-mono" style={{ color: C.text }}>{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------- SIR DELETIONS TABLE ---------------- */
function SIRTable() {
  const rows = [
    ["Shifted or absent", "66.4 lakh", "68%", C.orange],
    ["Deceased", "26.9 lakh", "28%", C.gray],
    ["Duplicates", "3.98 lakh", "4%", C.purple],
  ];
  return (
    <div className="not-prose my-6 -mx-4 sm:mx-0 overflow-x-auto">
      <div className="min-w-[360px] px-4 sm:px-0">
        <table className="w-full text-sm rounded-2xl overflow-hidden" style={{ background: C.card }}>
          <thead>
            <tr style={{ background: C.alt, color: C.text }}>
              <th className="text-left p-3 font-semibold text-xs sm:text-sm">Category</th>
              <th className="text-left p-3 font-semibold text-xs sm:text-sm">Count</th>
              <th className="text-right p-3 font-semibold text-xs sm:text-sm">% of deletions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ borderTop: `1px solid ${C.grid}` }}>
                <td className="p-3 text-xs sm:text-sm font-medium" style={{ color: C.text }}>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-sm" style={{ background: r[3] as string }} />
                    {r[0]}
                  </span>
                </td>
                <td className="p-3 text-xs sm:text-sm font-mono" style={{ color: C.text }}>{r[1]}</td>
                <td className="p-3 text-xs sm:text-sm font-mono text-right font-semibold" style={{ color: r[3] as string }}>{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------- COMPONENT ---------------- */
function TN2026Post() {
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const copyLink = () => {
    navigator.clipboard?.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const tags = ["Tamil Nadu", "Elections 2026", "Voter Turnout", "SIR", "TVK"];

  return (
    <article style={{ color: C.text }}>
      {/* Reading progress */}
      <div
        className="fixed top-0 left-0 h-1 z-[60] transition-[width] duration-150"
        style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${C.orange}, ${C.green})` }}
      />

      {/* Hero */}
      <div className="bg-blog-hero pt-24 sm:pt-28 pb-8">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <Link to="/blogs" className="inline-flex items-center gap-2 text-xs sm:text-sm transition-smooth text-blog-hero-muted hover:text-blog-hero-title">
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </Link>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mt-6 sm:mt-8">
            <span
              className="inline-block rounded-full px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider"
              style={{ background: `${C.orange}22`, color: C.orange }}
            >
              Election Analysis
            </span>
            <h1 className="mt-4 sm:mt-5 font-display font-bold tracking-tight leading-[1.1] text-blog-hero-title text-[clamp(1.75rem,6vw,3.75rem)] break-words">
              The 85% Question:{" "}
              <span
                style={{
                  background: `linear-gradient(90deg, ${C.orange}, ${C.green})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Did Tamil Nadu Really Vote More
              </span>
              , or Did the Numbers Just Get Smaller?
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-blog-hero-muted">
              <span>May 2, 2026</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> 6 min read</span>
              <span className="inline-flex items-center gap-1.5"><Share2 className="h-3.5 w-3.5" /> Share:</span>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("The 85% Question — TN 2026 voter turnout")}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" className="rounded-full p-2 hover:opacity-80 transition-smooth" style={{ background: "var(--muted)" }}>
                <Twitter className="h-3.5 w-3.5" />
              </a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" className="rounded-full p-2 hover:opacity-80 transition-smooth" style={{ background: "var(--muted)" }}>
                <Linkedin className="h-3.5 w-3.5" />
              </a>
              <button onClick={copyLink} className="rounded-full p-2 hover:opacity-80 transition-smooth" style={{ background: "var(--muted)" }}>
                <LinkIcon className="h-3.5 w-3.5" />
              </button>
              {copied && <span className="text-xs" style={{ color: C.green }}>Copied!</span>}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="container mx-auto px-4 sm:px-6 max-w-5xl mt-8 sm:mt-10"
        >
          <div className="relative aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant">
            <img src={cover} alt="TN 2026 voter turnout analysis" width={1280} height={720} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </motion.div>
      </div>

      {/* Body */}
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl py-10 sm:py-14">
        {/* Tags */}
        <div className="mb-8 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] sm:text-xs" style={{ background: C.alt, color: C.text2 }}>
              <Tag className="h-3 w-3" /> {t}
            </span>
          ))}
        </div>

        <Reveal>
          <P>
            Tamil Nadu made headlines on April 23, 2026. The state recorded <strong>85.15% voter turnout</strong> — the highest ever since Independence. But almost immediately, a counter-argument spread: <em>"The Election Commission removed 74 lakh voters from the rolls before this election. So of course the percentage went up. It's just math."</em>
          </P>
          <P>
            This blog breaks down that argument, shows you the actual numbers behind the SIR deletion, and makes a simple case for why 2026 genuinely had more voter participation than 2021 — not because of a statistical trick, but because more people actually showed up.
          </P>
        </Reveal>

        {/* Section 1 */}
        <SectionHeading kicker="Section 1">First, the headline numbers</SectionHeading>
        <Reveal>
          <P>
            Tamil Nadu had <strong>6.41 crore</strong> registered voters in 2021. After the Special Intensive Revision (SIR) conducted in 2025, <strong>97.3 lakh</strong> voters were deleted from the rolls. Then <strong>24 lakh</strong> new voters were added. This gives us a net reduction of <strong>73.3 lakh</strong> voters — bringing the 2026 registered voter count to <strong>5.73 crore</strong>.
          </P>
          <ComparisonTable />
          <TurnoutBars />
          <VotedStack
            title="The gap that matters: who didn't show up"
            subtitle="Voters who voted vs. voters who stayed home"
            data={[
              { year: "2021", voted: 4.59, notVoted: 1.82, unit: "crore" },
              { year: "2026", voted: 4.88, notVoted: 0.85, unit: "crore" },
            ]}
          />
          <Callout>
            <strong>29 lakh more people</strong> physically walked to a booth and voted in 2026 compared to 2021. The "did not vote" gap shrank from 1.82 crore to 0.85 crore — a reduction of nearly <strong>97 lakh non-voters</strong>.
          </Callout>
        </Reveal>

        {/* Section 2 */}
        <SectionHeading kicker="Section 2">"The percentage went up only because voters were removed." — Is this true?</SectionHeading>
        <Reveal>
          <P>
            This is the most common objection. And on the surface, it sounds logical. Remove voters from the denominator, the percentage goes up. Simple math. But let's look at what SIR actually deleted — because not all deletions are equal.
          </P>
          <P>Out of the 97.3 lakh voters deleted statewide:</P>
          <SIRDonut />
          <P>
            Now here is the key question: <strong>were the shifted/absent voters "fake"?</strong> No. Shifted or absent voters are real people — migrants, IT professionals, tenants, people who moved cities. They were genuinely registered in 2021 and could have voted then. They were removed in 2026 because they were no longer at that address. Removing them was the right call for clean rolls — but it does not mean they were ghost voters inflating the 2021 count.
          </P>
          <P>Deceased voters (26.9 lakh) — these are genuine removals. Dead voters cannot vote and should not be on the rolls. Duplicates (3.98 lakh) — also genuine removals.</P>
          <Callout>
            <strong>68% of all deleted voters</strong> were real, living people who simply moved or were temporarily absent. You cannot use their removal to call the 2021 denominator "fake."
          </Callout>
        </Reveal>

        {/* Section 3 */}
        <SectionHeading kicker="Section 3">Each election year stands on its own</SectionHeading>
        <Reveal>
          <P>Here is the simple rule for reading voter turnout percentage:</P>
          <div className="not-prose my-5 rounded-xl p-4 text-center font-mono text-sm sm:text-base" style={{ background: C.alt, color: C.text }}>
            Turnout % = Votes cast ÷ Registered voters in <strong>that</strong> year
          </div>
          <ul className="space-y-2 my-4">
            <li className="flex items-start gap-2 text-sm sm:text-base"><CheckCircle2 className="h-4 w-4 shrink-0 mt-1" style={{ color: C.blue }} /><span style={{ color: C.text }}>2021: 4.59 crore ÷ 6.41 crore = <strong>73.6%</strong></span></li>
            <li className="flex items-start gap-2 text-sm sm:text-base"><CheckCircle2 className="h-4 w-4 shrink-0 mt-1" style={{ color: C.green }} /><span style={{ color: C.text }}>2026: 4.88 crore ÷ 5.73 crore = <strong>85.15%</strong></span></li>
          </ul>
          <P>
            Both are correct. Both are independent. You do not go back and adjust 2021's denominator using 2026's SIR logic. The 2021 voter rolls were the official, valid rolls in 2021. What happened in 2025–26 during SIR is irrelevant to what 2021's numbers meant in 2021.
          </P>
          <TurnoutMath />
        </Reveal>

        {/* Section 4 */}
        <SectionHeading kicker="Section 4">Three things that brought Tamil Nadu to the booth</SectionHeading>
        <Reveal>
          <h3 className="font-display text-lg sm:text-xl font-bold mt-6 mb-2" style={{ color: C.text }}>4a. A real three-way contest for the first time in decades</h3>
          <P>
            Tamil Nadu elections have historically been a straight fight between DMK and AIADMK. Third parties like DMDK (2006) and NTK have tried and failed to break this duopoly — DMDK got 8% at its peak in 2011 and collapsed. NTK has stayed at 6–8% for years without winning a single seat.
          </P>
          <P>
            2026 was different. Actor Vijay's <strong>Tamilaga Vettri Kazhagam (TVK)</strong> entered the election as a genuinely credible third option — with 1.5 crore registered members verified by voter ID, contesting all 234 seats, and polling at 23–24% in pre-election surveys.
          </P>
          <ThirdForceBars />

          <h3 className="font-display text-lg sm:text-xl font-bold mt-8 mb-2" style={{ color: C.text }}>4b. TVK pulled from every voter pool</h3>
          <P>Unlike past third parties that drew from one ideological base, TVK drew votes from multiple directions simultaneously:</P>
          <ul className="space-y-2 my-4 pl-5 list-disc text-sm sm:text-base" style={{ color: C.text }}>
            <li>Voters who chose DMK in 2021 but were unhappy with governance and also rejected the BJP-AIADMK alliance</li>
            <li>AIADMK voters who wanted a new alternative</li>
            <li>NTK and NOTA voters who wanted a fresh start</li>
            <li>First-time voters (14 lakh newly added to rolls) who registered specifically for this election</li>
            <li>Below-40 voters — young, urban, first-time — mobilised at a scale no party had managed before</li>
          </ul>

          <h3 className="font-display text-lg sm:text-xl font-bold mt-8 mb-2" style={{ color: C.text }}>4c. The leadership vacuum</h3>
          <P>
            When Karunanidhi and Jayalalitha were alive, their personal dominance crushed any third force before it could grow. Today, both DMK and AIADMK lack that kind of magnetic, larger-than-life leadership. Vijay — a superstar with pan-Tamil reach — stepped into that vacuum at exactly the right moment.
          </P>
          <Callout>
            "They said he was an actor playing politician. He said watch the second half. They counted him out before counting the votes."
          </Callout>
        </Reveal>

        {/* Section 5 */}
        <SectionHeading kicker="Section 5">How many votes per booth does TVK need for 24%?</SectionHeading>
        <Reveal>
          <P>
            Tamil Nadu had <strong>75,026 polling booths</strong> in 2026. On average, each booth had about 763 registered voters. Total votes cast: 4.88 crore. Drag the slider to see how the math works.
          </P>
          <BoothSlider />
          <Callout>
            Opinion polls projected TVK at 23–24%, which maps to roughly <strong>150 votes per booth</strong> on average. 100 votes per booth — barely 13% of the ~763 voters at each booth — is the absolute floor.
          </Callout>
        </Reveal>

        {/* Section 6 */}
        <SectionHeading kicker="Section 6">Chennai tells the full story</SectionHeading>
        <Reveal>
          <P>Chennai district is the best example of how to read these numbers correctly.</P>
          <ChennaiTable />
          <VotedStack
            title="Chennai district: voted vs. did not vote"
            data={[
              { year: "2021", voted: 24.17, notVoted: 15.83, unit: "lakh" },
              { year: "2026", voted: 23.69, notVoted: 4.61, unit: "lakh" },
            ]}
          />
          <P>
            The turnout percentage jumped by nearly 25 points. But absolute votes fell by about 47,000. Does this mean participation dropped? Not necessarily — because the ~12 lakh removed from Chennai's rolls includes a large proportion of shifted/absent real voters who were registered but may not have been active in-constituency voters. The "did not vote" gap shrank dramatically from 15.83 lakh to 4.61 lakh — meaning the pool of people who were registered AND present AND still didn't vote is much smaller.
          </P>
        </Reveal>

        {/* Verdict */}
        <SectionHeading kicker="The verdict">Yes, Tamil Nadu voted more in 2026</SectionHeading>
        <Reveal>
          <div className="space-y-4 my-6">
            {[
              { icon: <TrendingUp className="h-5 w-5" />, title: "The math is valid.", body: "Each year's turnout uses that year's own voter rolls. You cannot mix denominators across years." },
              { icon: <Users className="h-5 w-5" />, title: "The SIR deletions were mostly real people.", body: "68% were shifted or absent — genuine voters who moved. Removing them cleaned up the rolls; it did not make 2021's count fictional." },
              { icon: <CheckCircle2 className="h-5 w-5" />, title: "29 lakh more people voted in absolute terms.", body: "The 'did not vote' gap shrank from 1.82 crore to 0.85 crore. Those are real empty booths that got filled." },
              { icon: <TrendingUp className="h-5 w-5" />, title: "A genuine three-way contest mobilised new voters.", body: "Especially first-time, young, and female voters — at a scale Tamil Nadu had not seen in decades." },
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl p-4 sm:p-5 flex gap-3 sm:gap-4 items-start"
                style={{ background: C.card, border: `1px solid ${C.grid}` }}
              >
                <span className="rounded-full p-2 shrink-0" style={{ background: `${C.green}22`, color: C.green }}>{p.icon}</span>
                <div className="min-w-0">
                  <div className="font-semibold text-sm sm:text-base" style={{ color: C.text }}>{i + 1}. {p.title}</div>
                  <div className="mt-1 text-sm leading-relaxed" style={{ color: C.text2 }}>{p.body}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <P>
            The 85% is not a statistical trick. It is the highest voter participation Tamil Nadu has ever seen — driven by genuine enthusiasm, a credible new political force, and a generation of voters who finally had a reason to show up.
          </P>
          <Callout>
            "A smaller guest list doesn't explain a fuller room."
          </Callout>
        </Reveal>

        {/* Back link */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-smooth"
            style={{ background: `linear-gradient(90deg, ${C.orange}, ${C.green})`, color: "white" }}
          >
            <ArrowLeft className="h-4 w-4" /> More articles
          </Link>
        </div>
      </div>
      <BlogEngagement slug="tn-2026-voter-participation" />
    </article>
  );
}

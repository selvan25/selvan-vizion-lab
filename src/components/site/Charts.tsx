import { motion } from "framer-motion";
import type { ChartPoint } from "@/data/blogs";

const easeOut = [0.22, 1, 0.36, 1] as const;

function FrameHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-5 flex items-start justify-between gap-4">
      <div>
        <h4 className="font-display text-base md:text-lg font-semibold tracking-tight">{title}</h4>
        {subtitle && (
          <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <span className="shrink-0 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/80 glass rounded-full px-2.5 py-1">
        <span className="h-1.5 w-1.5 rounded-full bg-gradient-primary" />
        live data
      </span>
    </div>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-10 glass-strong rounded-3xl p-5 md:p-7 shadow-elegant relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      {children}
    </div>
  );
}

/* ---------- BAR CHART ---------- */
export function BarChart({ title, subtitle, data, unit }: { title: string; subtitle?: string; data: ChartPoint[]; unit?: string }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <Frame>
      <FrameHeader title={title} subtitle={subtitle} />
      <div className="space-y-3">
        {data.map((d, i) => {
          const pct = (d.value / max) * 100;
          return (
            <div key={d.label} className="grid grid-cols-[110px_1fr_auto] items-center gap-3 text-xs md:text-sm">
              <span className="text-muted-foreground truncate">{d.label}</span>
              <div className="h-3 rounded-full bg-muted/40 overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 1, delay: i * 0.08, ease: easeOut }}
                  className="h-full rounded-full bg-gradient-primary relative"
                  style={{ boxShadow: "0 0 20px oklch(0.72 0.20 285 / 0.45)" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" style={{ backgroundSize: "200% 100%" }} />
                </motion.div>
              </div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 + 0.4 }}
                className="font-mono tabular-nums text-foreground/90 min-w-[3rem] text-right"
              >
                {d.value}{unit ? ` ${unit}` : ""}
              </motion.span>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

/* ---------- LINE / AREA CHART (SVG) ---------- */
export function LineChart({ title, subtitle, data, unit, area = false }: { title: string; subtitle?: string; data: ChartPoint[]; unit?: string; area?: boolean }) {
  const W = 600, H = 220, PAD = 36;
  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));
  const range = max - min || 1;
  const stepX = (W - PAD * 2) / (data.length - 1 || 1);

  const points = data.map((d, i) => {
    const x = PAD + i * stepX;
    const y = PAD + (1 - (d.value - min) / range) * (H - PAD * 2);
    return { x, y, ...d };
  });

  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${path} L ${points[points.length - 1].x} ${H - PAD} L ${points[0].x} ${H - PAD} Z`;

  return (
    <Frame>
      <FrameHeader title={title} subtitle={subtitle} />
      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[260px]" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGrad" x1="0" x2="1">
              <stop offset="0%" stopColor="oklch(0.72 0.20 285)" />
              <stop offset="100%" stopColor="oklch(0.78 0.18 220)" />
            </linearGradient>
            <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.72 0.20 285)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="oklch(0.72 0.20 285)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* gridlines */}
          {[0, 0.25, 0.5, 0.75, 1].map((g) => {
            const y = PAD + g * (H - PAD * 2);
            return <line key={g} x1={PAD} x2={W - PAD} y1={y} y2={y} stroke="oklch(1 0 0 / 0.06)" strokeDasharray="3 4" />;
          })}

          {area && (
            <motion.path
              d={areaPath}
              fill="url(#areaGrad)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
            />
          )}

          <motion.path
            d={path}
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.6, ease: easeOut }}
            style={{ filter: "drop-shadow(0 0 8px oklch(0.72 0.20 285 / 0.6))" }}
          />

          {points.map((p, i) => (
            <motion.g
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
              style={{ transformOrigin: `${p.x}px ${p.y}px` }}
            >
              <circle cx={p.x} cy={p.y} r="6" fill="oklch(0.16 0.02 270)" stroke="url(#lineGrad)" strokeWidth="2" />
              <circle cx={p.x} cy={p.y} r="2.5" fill="oklch(0.97 0.01 250)" />
            </motion.g>
          ))}

          {points.map((p, i) => (
            <text key={`x-${i}`} x={p.x} y={H - 10} textAnchor="middle" fontSize="10" fill="oklch(0.68 0.03 260)">
              {p.label}
            </text>
          ))}
        </svg>
      </div>
      <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
        <span>min {min}{unit ? ` ${unit}` : ""}</span>
        <span>max {max}{unit ? ` ${unit}` : ""}</span>
      </div>
    </Frame>
  );
}

/* ---------- DONUT CHART ---------- */
export function DonutChart({ title, subtitle, data }: { title: string; subtitle?: string; data: ChartPoint[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const R = 70, C = 2 * Math.PI * R;
  let acc = 0;
  const palette = [
    "oklch(0.72 0.20 285)",
    "oklch(0.78 0.18 220)",
    "oklch(0.70 0.18 320)",
    "oklch(0.78 0.16 180)",
    "oklch(0.72 0.18 60)",
    "oklch(0.65 0.18 10)",
  ];

  return (
    <Frame>
      <FrameHeader title={title} subtitle={subtitle} />
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="relative w-[200px] h-[200px] shrink-0">
          <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
            <circle cx="100" cy="100" r={R} fill="none" stroke="oklch(1 0 0 / 0.06)" strokeWidth="22" />
            {data.map((d, i) => {
              const frac = d.value / total;
              const dash = frac * C;
              const offset = -acc * C;
              acc += frac;
              return (
                <motion.circle
                  key={d.label}
                  cx="100"
                  cy="100"
                  r={R}
                  fill="none"
                  stroke={palette[i % palette.length]}
                  strokeWidth="22"
                  strokeDasharray={`${dash} ${C - dash}`}
                  strokeDashoffset={offset}
                  strokeLinecap="butt"
                  initial={{ opacity: 0, strokeDasharray: `0 ${C}` }}
                  whileInView={{ opacity: 1, strokeDasharray: `${dash} ${C - dash}` }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 1.1, delay: i * 0.12, ease: easeOut }}
                  style={{ filter: `drop-shadow(0 0 6px ${palette[i % palette.length]})` }}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-3xl font-bold text-gradient-primary">{total}</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-0.5">total</span>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
          {data.map((d, i) => (
            <motion.div
              key={d.label}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3 text-sm"
            >
              <span
                className="h-2.5 w-2.5 rounded-sm shrink-0"
                style={{ background: palette[i % palette.length], boxShadow: `0 0 10px ${palette[i % palette.length]}` }}
              />
              <span className="flex-1 text-foreground/80 truncate">{d.label}</span>
              <span className="font-mono tabular-nums text-xs text-muted-foreground">
                {Math.round((d.value / total) * 100)}%
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function AreaChart(props: { title: string; subtitle?: string; data: ChartPoint[]; unit?: string }) {
  return <LineChart {...props} area />;
}

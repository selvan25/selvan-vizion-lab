import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Share2,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  Tag,
  Quote,
  Globe,
  Target,
} from "lucide-react";
import cover from "@/assets/blog-ronaldo-messi.jpg";
import { BlogEngagement } from "@/components/BlogEngagement";

export const Route = createFileRoute("/blogs/ronaldo-vs-messi-goat")({
  head: () => ({
    meta: [
      { title: "Messi Won More. Ronaldo Did More. — Selvan Rajan" },
      {
        name: "description",
        content:
          "Most GOAT debates start with trophies and Ballon d'Ors. This one asks what greatness actually means — and makes the data-backed case for Cristiano Ronaldo.",
      },
      { property: "og:title", content: "Messi Won More. Ronaldo Did More." },
      {
        property: "og:description",
        content: "Greatness isn't always about who won the most — sometimes it's about who overcame the most. The case for Ronaldo as the GOAT.",
      },
      { property: "og:type", content: "article" },
      { property: "og:image", content: cover },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: cover },
    ],
  }),
  component: RonaldoMessiPost,
});

/* ---------------- TOKENS (theme-aware) ---------------- */
const C = {
  cr7: "#E63946", // Ronaldo red
  cr7Deep: "#B5172A",
  messi: "#4895EF", // Messi blue
  gold: "#F4A026",
  green: "#10B981",
  purple: "#8B5CF6",
  gray: "#6B7280",
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
      className="not-prose my-6 sm:my-8 rounded-2xl p-4 sm:p-5 md:p-7 min-w-0 overflow-hidden"
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
      style={{ background: C.alt, borderColor: C.cr7, color: C.text }}
    >
      <div className="flex gap-3 items-start">
        <Quote className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 mt-1" style={{ color: C.cr7 }} />
        <p className="text-sm sm:text-base leading-relaxed italic">{children}</p>
      </div>
    </div>
  );
}

function SectionHeading({ kicker, children }: { kicker?: string; children: React.ReactNode }) {
  return (
    <div className="mb-5 sm:mb-7 mt-10 sm:mt-14">
      {kicker && (
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-semibold" style={{ color: C.cr7 }}>
          {kicker}
        </span>
      )}
      <h2
        className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight break-words"
        style={{
          background: `linear-gradient(90deg, ${C.cr7}, ${C.gold})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {children}
      </h2>
      <div className="mt-3 h-px w-full" style={{ background: `linear-gradient(90deg, ${C.cr7}55, transparent)` }} />
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-base sm:text-lg leading-[1.8] my-4" style={{ color: C.text }}>{children}</p>;
}

/* ---------------- ANIMATED GOAL COUNTER ---------------- */
function GoalCounter() {
  const [n, setN] = useState(0);
  const target = 973;
  useEffect(() => {
    let raf = 0;
    let start: number | null = null;
    const dur = 2000;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          raf = requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    const el = document.getElementById("goal-counter");
    if (el) obs.observe(el);
    return () => { cancelAnimationFrame(raf); obs.disconnect(); };
  }, []);

  return (
    <ChartCard title="Career goals — and still climbing" subtitle="Cristiano Ronaldo, senior career goals as of 2026">
      <div id="goal-counter" className="flex flex-col items-center py-4">
        <div className="font-display font-bold tabular-nums" style={{ fontSize: "clamp(3.5rem, 14vw, 7rem)", lineHeight: 1, color: C.cr7 }}>
          {n.toLocaleString()}
        </div>
        <div className="mt-2 text-sm sm:text-base font-medium" style={{ color: C.text2 }}>
          goals across clubs, countries & decades — closing in on <strong style={{ color: C.gold }}>1,000</strong>
        </div>
        {/* progress to 1000 */}
        <div className="mt-5 w-full max-w-md h-3 rounded-full overflow-hidden" style={{ background: C.alt }}>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${(target / 1000) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${C.cr7Deep}, ${C.cr7})` }}
          />
        </div>
        <div className="mt-1.5 w-full max-w-md flex justify-between text-[10px]" style={{ color: C.text2 }}>
          <span>0</span><span>973 / 1000</span>
        </div>
      </div>
    </ChartCard>
  );
}

/* ---------------- SCORING FINGERPRINT ---------------- */
function ScoringFingerprint() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const parts = [
    { label: "Right foot", value: 628, color: C.cr7, note: "his dominant weapon" },
    { label: "Left foot", value: 185, color: C.messi, note: "his \"weak\" foot — still elite" },
    { label: "Headers", value: 157, color: C.gold, note: "a category of his own" },
  ];
  const total = parts.reduce((s, p) => s + p.value, 0);
  return (
    <ChartCard title="The complete scorer" subtitle="The only player ever with 100+ goals using right foot, left foot, AND head">
      {/* Big number cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" ref={ref}>
        {parts.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            className="rounded-2xl p-4 text-center relative overflow-hidden"
            style={{ background: C.alt }}
          >
            <div className="absolute inset-x-0 bottom-0 h-1" style={{ background: p.color }} />
            <div className="font-display font-bold" style={{ fontSize: "2.6rem", lineHeight: 1, color: p.color }}>{p.value}</div>
            <div className="mt-2 text-sm font-semibold" style={{ color: C.text }}>{p.label}</div>
            <div className="mt-1 text-[11px] leading-snug" style={{ color: C.text2 }}>{p.note}</div>
          </motion.div>
        ))}
      </div>
      {/* Proportion bar */}
      <div className="mt-5">
        <div className="flex h-4 w-full rounded-full overflow-hidden" style={{ background: C.alt }}>
          {parts.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ width: 0 }}
              animate={inView ? { width: `${(p.value / total) * 100}%` } : { width: 0 }}
              transition={{ duration: 0.9, delay: 0.3 + i * 0.1, ease: "easeOut" }}
              style={{ background: p.color }}
              title={`${p.label}: ${p.value}`}
            />
          ))}
        </div>
        <p className="mt-2 text-center text-[11px] italic" style={{ color: C.text2 }}>
          Split across three different finishing weapons no other player in history can match.
        </p>
      </div>
    </ChartCard>
  );
}

/* ---------------- LEAGUE CONQUEST MAP ---------------- */
function LeagueConquest() {
  const leagues = [
    { country: "England", club: "Man United", note: "3 PL titles + UCL at the league's physical peak", color: C.cr7 },
    { country: "Spain", club: "Real Madrid", note: "450 goals in 438 games · 4 UCLs", color: C.gold },
    { country: "Italy", club: "Juventus", note: "Joined at 33, still won the Golden Boot", color: C.green },
    { country: "Saudi Arabia", club: "Al-Nassr", note: "Top scorer in a 4th different country", color: C.purple },
  ];
  return (
    <ChartCard title="Four countries. Four conquests." subtitle="The only player to finish top scorer in four different national leagues">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {leagues.map((l, i) => (
          <motion.div
            key={l.country}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl p-4 flex gap-3 items-start"
            style={{ background: C.alt, border: `1px solid ${C.grid}` }}
          >
            <div className="shrink-0 h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: `${l.color}22` }}>
              <Globe className="h-5 w-5" style={{ color: l.color }} />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-sm" style={{ color: C.text }}>{l.country}</div>
              <div className="text-xs font-medium" style={{ color: l.color }}>{l.club}</div>
              <div className="mt-1 text-[11px] leading-snug" style={{ color: C.text2 }}>{l.note}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </ChartCard>
  );
}

/* ---------------- HONORS COMPARISON TABLE ---------------- */
function HonorsTable() {
  const rows = [
    { honor: "Total Major Trophies", messi: "48", cr7: "35", edge: "messi" },
    { honor: "Champions League", messi: "4", cr7: "5", edge: "cr7" },
    { honor: "FIFA World Cup", messi: "1", cr7: "0", edge: "messi" },
    { honor: "Top-scorer leagues (countries)", messi: "1", cr7: "4", edge: "cr7" },
    { honor: "UCL knockout goals", messi: "49", cr7: "67", edge: "cr7" },
    { honor: "Int'l goals", messi: "117", cr7: "143", edge: "cr7" },
    { honor: "Consecutive World Cups scored", messi: "3", cr7: "5", edge: "cr7" },
  ];
  return (
    <ChartCard title="Head to head: the honors that matter" subtitle="Same legends, very different shapes of greatness">
      <p className="mb-2 text-[11px] flex items-center gap-1.5 sm:hidden" style={{ color: C.text2 }}>
        <span>←</span>
        <span>Scroll left to see all columns</span>
        <span>→</span>
      </p>
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[460px] text-sm">
          <thead>
            <tr style={{ color: C.text2 }} className="text-left border-b" >
              <th className="py-2.5 pr-3 font-medium">Honor</th>
              <th className="py-2.5 px-3 font-medium text-center" style={{ color: C.messi }}>Messi</th>
              <th className="py-2.5 pl-3 font-medium text-center" style={{ color: C.cr7 }}>Ronaldo</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.honor} className="border-b" style={{ borderColor: C.grid }}>
                <td className="py-2.5 pr-3" style={{ color: C.text }}>{r.honor}</td>
                <td className="py-2.5 px-3 text-center font-mono font-bold tabular-nums"
                  style={{ color: r.edge === "messi" ? C.messi : C.text2,
                    background: r.edge === "messi" ? `${C.messi}12` : "transparent" }}>
                  {r.messi}
                </td>
                <td className="py-2.5 pl-3 text-center font-mono font-bold tabular-nums"
                  style={{ color: r.edge === "cr7" ? C.cr7 : C.text2,
                    background: r.edge === "cr7" ? `${C.cr7}12` : "transparent" }}>
                  {r.cr7}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[11px] italic" style={{ color: C.text2 }}>
        Messi leads on raw totals; Ronaldo leads on spread, difficulty, and the biggest stage.
      </p>
    </ChartCard>
  );
}

/* ---------------- TROPHY SPREAD BARS ---------------- */
function TrophyBar({ rows, total, who, whoColor }: { rows: { label: string; value: number; color: string }[]; total: number; who: string; whoColor: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref}>
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-sm" style={{ color: whoColor }}>{who}</span>
        <span className="text-xs font-mono" style={{ color: C.text2 }}>{total} total</span>
      </div>
      <div className="flex h-9 w-full rounded-xl overflow-hidden" style={{ background: C.alt }}>
        {rows.map((r, i) => (
          <motion.div
            key={r.label}
            initial={{ width: 0 }}
            animate={inView ? { width: `${(r.value / total) * 100}%` } : { width: 0 }}
            transition={{ duration: 0.9, delay: i * 0.08, ease: "easeOut" }}
            className="h-full flex items-center justify-center text-[10px] font-bold text-white overflow-hidden"
            style={{ background: r.color }}
            title={`${r.label}: ${r.value}`}
          >
            {(r.value / total) * 100 > 12 ? r.value : ""}
          </motion.div>
        ))}
      </div>
      <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[10px]" style={{ color: C.text2 }}>
        {rows.map((r) => (
          <span key={r.label} className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-sm" style={{ background: r.color }} /> {r.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function TrophySpread() {
  const messi = [
    { label: "Barcelona", value: 35, color: C.messi },
    { label: "Argentina / PSG / Miami", value: 13, color: `${C.messi}99` },
  ];
  const cr7 = [
    { label: "England", value: 6, color: C.cr7 },
    { label: "Spain", value: 15, color: C.gold },
    { label: "Italy", value: 5, color: C.green },
    { label: "Portugal", value: 9, color: C.purple },
  ];
  return (
    <ChartCard title="Where the trophies were won" subtitle="Messi's cabinet sits mostly in one home; Ronaldo's is spread across the map">
      <div className="space-y-6">
        <TrophyBar rows={messi} total={48} who="Lionel Messi" whoColor={C.messi} />
        <TrophyBar rows={cr7} total={35} who="Cristiano Ronaldo" whoColor={C.cr7} />
      </div>
    </ChartCard>
  );
}

/* ---------------- UCL DOMINANCE BARS ---------------- */
function UCLBars() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const metrics = [
    { label: "UCL titles", messi: 4, cr7: 5, max: 5 },
    { label: "Knockout goals", messi: 49, cr7: 67, max: 67 },
    { label: "Goals vs Buffon & Neuer", messi: 4, cr7: 18, max: 18 },
  ];
  return (
    <ChartCard title="The Champions League belongs to one man" subtitle="Titles, knockout goals, and goals against the two greatest goalkeepers of the era">
      <div className="space-y-6" ref={ref}>
        {metrics.map((m) => (
          <div key={m.label}>
            <div className="text-sm font-semibold mb-2" style={{ color: C.text }}>{m.label}</div>
            <div className="space-y-2">
              {/* Messi */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] w-16 shrink-0" style={{ color: C.messi }}>Messi</span>
                <div className="flex-1 h-7 rounded-lg overflow-hidden" style={{ background: C.alt }}>
                  <motion.div initial={{ width: 0 }} animate={inView ? { width: `${(m.messi / m.max) * 100}%` } : { width: 0 }} transition={{ duration: 0.9, ease: "easeOut" }}
                    className="h-full flex items-center justify-end px-2 text-[11px] font-bold text-white" style={{ background: C.messi }}>
                    {m.messi}
                  </motion.div>
                </div>
              </div>
              {/* CR7 */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] w-16 shrink-0" style={{ color: C.cr7 }}>Ronaldo</span>
                <div className="flex-1 h-7 rounded-lg overflow-hidden" style={{ background: C.alt }}>
                  <motion.div initial={{ width: 0 }} animate={inView ? { width: `${(m.cr7 / m.max) * 100}%` } : { width: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
                    className="h-full flex items-center justify-end px-2 text-[11px] font-bold text-white" style={{ background: C.cr7, boxShadow: `0 0 16px ${C.cr7}66` }}>
                    {m.cr7}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}

/* ---------------- FIVE WORLD CUPS TIMELINE ---------------- */
function WorldCupsTimeline() {
  const cups = [
    { year: "2006", host: "Germany", note: "First WC goal, age 21" },
    { year: "2010", host: "S. Africa", note: "Scored vs North Korea" },
    { year: "2014", host: "Brazil", note: "Winner vs Ghana" },
    { year: "2018", host: "Russia", note: "Legendary hat-trick vs Spain" },
    { year: "2022", host: "Qatar", note: "Broke the all-time record" },
  ];
  return (
    <ChartCard title="Five World Cups. One scorer." subtitle="The only male player in history to score in five consecutive World Cups">
      <div className="relative">
        <div className="absolute top-4 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${C.cr7Deep}, ${C.cr7})` }} />
        <div className="grid grid-cols-5 gap-1 sm:gap-2">
          {cups.map((c, i) => (
            <motion.div key={c.year} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} className="flex flex-col items-center text-center">
              <div className="h-8 w-8 rounded-full flex items-center justify-center z-10 mb-2" style={{ background: C.cr7, boxShadow: `0 0 12px ${C.cr7}88` }}>
                <Target className="h-4 w-4 text-white" />
              </div>
              <div className="font-bold text-xs sm:text-sm font-mono" style={{ color: C.cr7 }}>{c.year}</div>
              <div className="text-[9px] sm:text-[10px] font-medium" style={{ color: C.text }}>{c.host}</div>
              <div className="mt-0.5 text-[8px] sm:text-[9px] leading-tight" style={{ color: C.text2 }}>{c.note}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
}

/* ---------------- BALLON D'OR RE-COUNT ---------------- */
function BallonRecount() {
  const cases = [
    { year: "2018", winner: "Modrić", earned: "Ronaldo", reason: "3rd straight UCL won AS its top scorer (15 goals)" },
    { year: "2021", winner: "Messi", earned: "Lewandowski", reason: "Broke Gerd Müller's 49-year Bundesliga record (41 goals)" },
    { year: "2023", winner: "Messi", earned: "Haaland", reason: "Record treble + Premier League scoring record (36 goals)" },
  ];
  return (
    <ChartCard title="The re-count: it should be 6–6" subtitle="Three Ballon d'Or results that don't survive the data">
      {/* Score line */}
      <div className="flex items-center justify-center gap-6 mb-6">
        <div className="text-center">
          <div className="font-display font-bold" style={{ fontSize: "2.5rem", color: C.messi }}>6</div>
          <div className="text-xs" style={{ color: C.text2 }}>Messi (adjusted)</div>
        </div>
        <div className="text-2xl font-bold" style={{ color: C.text2 }}>—</div>
        <div className="text-center">
          <div className="font-display font-bold" style={{ fontSize: "2.5rem", color: C.cr7 }}>6</div>
          <div className="text-xs" style={{ color: C.text2 }}>Ronaldo (adjusted)</div>
        </div>
      </div>
      <div className="space-y-3">
        {cases.map((c, i) => (
          <motion.div key={c.year} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="rounded-xl p-3 flex gap-3 items-start" style={{ background: C.alt, border: `1px solid ${C.grid}` }}>
            <div className="shrink-0 font-mono font-bold text-sm px-2 py-1 rounded" style={{ background: `${C.gold}22`, color: C.gold }}>{c.year}</div>
            <div className="min-w-0 text-xs sm:text-sm" style={{ color: C.text }}>
              <span style={{ color: C.text2 }}>Given to </span><strong>{c.winner}</strong>
              <span style={{ color: C.text2 }}> → earned by </span><strong style={{ color: C.cr7 }}>{c.earned}</strong>
              <div className="mt-0.5 text-[11px]" style={{ color: C.text2 }}>{c.reason}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </ChartCard>
  );
}

/* ---------------- AGE 36 SPLIT ---------------- */
function Age36Split() {
  return (
    <ChartCard title="Same age (36). Very different stages." subtitle="Where each man chose to play at 36 years old">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-2xl p-4" style={{ background: `${C.messi}14`, border: `1px solid ${C.messi}44` }}>
          <div className="font-bold text-sm" style={{ color: C.messi }}>Messi · 2023</div>
          <div className="mt-1 text-2xl font-display font-bold" style={{ color: C.text }}>MLS 🇺🇸</div>
          <div className="mt-1 text-xs" style={{ color: C.text2 }}>Moved to Inter Miami — a gentler league, a softer stage.</div>
        </div>
        <div className="rounded-2xl p-4" style={{ background: `${C.cr7}14`, border: `1px solid ${C.cr7}44` }}>
          <div className="font-bold text-sm" style={{ color: C.cr7 }}>Ronaldo · 2021</div>
          <div className="mt-1 text-2xl font-display font-bold" style={{ color: C.text }}>Serie A → EPL 🏴</div>
          <div className="mt-1 text-xs" style={{ color: C.text2 }}>Left Juventus to walk back into the Premier League — the toughest league on earth.</div>
        </div>
      </div>
    </ChartCard>
  );
}

/* ---------------- GOAL QUALITY (friendlies split) ---------------- */
function GoalQuality() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  // Verified: Messi 117 total, ~63 competitive (54%) → ~46% friendlies
  //           Ronaldo 143 total, 121 competitive (85%) → ~15% friendlies
  const data = [
    { who: "Messi", comp: 54, friendly: 46, color: C.messi },
    { who: "Ronaldo", comp: 85, friendly: 15, color: C.cr7 },
  ];
  return (
    <ChartCard title="Not all international goals are equal" subtitle="Share of international goals scored in competitive games vs. friendlies">
      <div className="space-y-5" ref={ref}>
        {data.map((d) => (
          <div key={d.who}>
            <div className="flex justify-between mb-2 text-sm">
              <span className="font-bold" style={{ color: d.color }}>{d.who}</span>
              <span className="font-mono text-xs" style={{ color: C.text2 }}>{d.comp}% competitive · {d.friendly}% friendlies</span>
            </div>
            <div className="flex h-8 w-full rounded-lg overflow-hidden" style={{ background: C.alt }}>
              <motion.div initial={{ width: 0 }} animate={inView ? { width: `${d.comp}%` } : { width: 0 }} transition={{ duration: 0.9, ease: "easeOut" }}
                className="h-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: d.color }}>
                Competitive
              </motion.div>
              <motion.div initial={{ width: 0 }} animate={inView ? { width: `${d.friendly}%` } : { width: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
                className="h-full flex items-center justify-center text-[10px] font-bold" style={{ background: C.gray, color: "white" }}>
                {d.friendly > 18 ? "Friendlies" : ""}
              </motion.div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[11px] italic" style={{ color: C.text2 }}>
        Nearly half of Messi's international goals came in friendlies; for Ronaldo it's roughly one in seven.
      </p>
    </ChartCard>
  );
}

/* ---------------- GOAT OF WHAT? competition breakdown ---------------- */
function GoatBreakdown() {
  const rows = [
    { comp: "Champions League", goat: "Ronaldo", note: "Most goals, assists, titles & knockout goals", win: "cr7" },
    { comp: "European Championship", goat: "Ronaldo", note: "All-time top scorer + a title", win: "cr7" },
    { comp: "Club World Cup", goat: "Ronaldo", note: "Most goals (7); Messi 3rd (5)", win: "cr7" },
    { comp: "World Cup", goat: "Pelé", note: "3 titles — neither Messi nor Ronaldo", win: "neutral" },
    { comp: "Copa América", goat: "Méndez", note: "Norberto Méndez — 17 goals, 3 titles in the 1940s. Messi isn't even top-5", win: "neutral" },
    { comp: "La Liga", goat: "Messi", note: "One league, one country — his true kingdom", win: "messi" },
  ];
  return (
    <ChartCard title="GOAT of what, exactly?" subtitle="Walk through every major competition and ask who truly tops it">
      <div className="space-y-2.5">
        {rows.map((r, i) => (
          <motion.div key={r.comp}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: i * 0.06 }}
            className="rounded-xl p-3 flex items-center gap-3"
            style={{ background: C.alt, border: `1px solid ${C.grid}` }}>
            <div className="min-w-0 flex-1">
              <div className="font-bold text-sm" style={{ color: C.text }}>{r.comp}</div>
              <div className="text-[11px]" style={{ color: C.text2 }}>{r.note}</div>
            </div>
            <div className="shrink-0 text-xs font-bold px-2.5 py-1 rounded-full"
              style={{
                background: r.win === "cr7" ? `${C.cr7}22` : r.win === "messi" ? `${C.messi}22` : `${C.gray}22`,
                color: r.win === "cr7" ? C.cr7 : r.win === "messi" ? C.messi : C.text2,
              }}>
              {r.goat}
            </div>
          </motion.div>
        ))}
      </div>
      <p className="mt-4 text-[11px] italic" style={{ color: C.text2 }}>
        Messi tops exactly one — La Liga. One league, one division, in a global sport.
      </p>
    </ChartCard>
  );
}

/* ---------------- COMPLETE PLAYER SHOWCASE ---------------- */
function CompletePlayer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const traits = [
    { icon: "🦶", label: "Left foot" },
    { icon: "⚡", label: "Right foot" },
    { icon: "🎯", label: "Headers" },
    { icon: "🤸", label: "Acrobatics" },
    { icon: "🚀", label: "Speed" },
    { icon: "💥", label: "Long shots" },
    { icon: "🌀", label: "Dribbling" },
    { icon: "🚲", label: "Bicycle kicks" },
    { icon: "🎪", label: "Free kicks" },
    { icon: "🧊", label: "Clutch" },
    { icon: "🥅", label: "Penalty master" },
    { icon: "🧠", label: "Calm under pressure" },
    { icon: "🪄", label: "Playmaking" },
    { icon: "🎁", label: "Accurate passing" },
    { icon: "🏋️", label: "Athleticism" },
    { icon: "©️", label: "Leadership" },
    { icon: "🔥", label: "Winning mentality" },
    { icon: "📈", label: "Consistency" },
    { icon: "⏳", label: "Longevity" },
    { icon: "🎖️", label: "Self-discipline" },
    { icon: "💪", label: "Work ethic" },
    { icon: "✨", label: "Confidence" },
  ];
  return (
    <div ref={ref} className="not-prose my-8">
      <div className="text-center mb-5">
        <h4 className="font-display text-lg sm:text-xl font-bold" style={{ color: C.text }}>One player. Every weapon.</h4>
        <p className="mt-1 text-sm" style={{ color: C.text2 }}>Not a specialist — a complete footballer in every dimension of the game</p>
      </div>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
        {traits.map((t, i) => (
          <motion.div
            key={t.label}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.05, type: "spring", stiffness: 200, damping: 16 }}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs sm:text-sm font-semibold"
            style={{
              background: `linear-gradient(135deg, ${C.cr7}18, ${C.gold}18)`,
              border: `1px solid ${C.cr7}44`,
              color: C.text,
            }}
          >
            <span className="text-base">{t.icon}</span>
            {t.label}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- JOURNEY OF CONQUEST ROADMAP ---------------- */
function JourneyRoadmap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const stops = [
    { flag: "🏝️", club: "Madeira", sub: "The skinny dreamer", color: C.gray },
    { flag: "🇵🇹", club: "Sporting CP", sub: "The breakout", color: C.green },
    { flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", club: "Man United", sub: "3 PL titles · 1 UCL · 1st Ballon d'Or", color: C.cr7 },
    { flag: "🇪🇸", club: "Real Madrid", sub: "450 goals · 4 UCLs · 4 Ballon d'Ors", color: C.gold },
    { flag: "🇮🇹", club: "Juventus", sub: "2 Serie A · Golden Boot at 33", color: C.green },
    { flag: "🇸🇦", club: "Al-Nassr", sub: "Top scorer in a 4th country", color: C.purple },
  ];
  return (
    <ChartCard title="The Man Who Conquered Every Kingdom" subtitle="One career, six stops, four countries — same outcome everywhere">
      <div ref={ref} className="relative">
        <div className="space-y-3">
          {stops.map((s, i) => (
            <motion.div
              key={s.club}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="shrink-0 h-11 w-11 rounded-2xl flex items-center justify-center text-xl" style={{ background: `${s.color}22`, border: `1px solid ${s.color}55` }}>
                {s.flag}
              </div>
              <div className="min-w-0 flex-1 rounded-xl px-3 py-2" style={{ background: C.alt }}>
                <div className="font-bold text-sm" style={{ color: C.text }}>{s.club}</div>
                <div className="text-[11px]" style={{ color: C.text2 }}>{s.sub}</div>
              </div>
              {i < stops.length - 1 && (
                <span className="shrink-0 text-lg" style={{ color: s.color }}>↓</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
}

/* ---------------- EVOLUTION TIMELINE ---------------- */
function EvolutionTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const eras = [
    { year: "2003", role: "Skinny Winger", color: C.green },
    { year: "2008", role: "Ballon d'Or Winner", color: C.cr7 },
    { year: "2014", role: "Goal Machine", color: C.gold },
    { year: "2018", role: "Champions League King", color: C.purple },
    { year: "2025", role: "1000-Goal Hunter", color: C.messi },
  ];
  return (
    <ChartCard title="One Career. Five Different Players." subtitle="Most players have one prime. Ronaldo reinvented himself for every era">
      <div ref={ref} className="grid grid-cols-5 gap-1 sm:gap-2 relative">
        <div className="absolute top-4 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${C.green}, ${C.cr7}, ${C.gold}, ${C.purple}, ${C.messi})` }} />
        {eras.map((e, i) => (
          <motion.div
            key={e.year}
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.14, duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            <div className="h-8 w-8 rounded-full z-10 mb-2 flex items-center justify-center text-white text-[10px] font-bold" style={{ background: e.color, boxShadow: `0 0 12px ${e.color}88` }}>
              {i + 1}
            </div>
            <div className="font-mono font-bold text-xs sm:text-sm" style={{ color: e.color }}>{e.year}</div>
            <div className="mt-0.5 text-[9px] sm:text-[11px] leading-tight font-medium" style={{ color: C.text }}>{e.role}</div>
          </motion.div>
        ))}
      </div>
    </ChartCard>
  );
}

/* ---------------- UCL KNOCKOUT STAGE TABLE ---------------- */
function UCLKnockoutTable() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  // Approximate UCL knockout goals by round
  const rows = [
    { stage: "Round of 16", messi: 23, cr7: 27 },
    { stage: "Quarter-final", messi: 14, cr7: 19 },
    { stage: "Semi-final", messi: 9, cr7: 13 },
    { stage: "Final", messi: 3, cr7: 8 },
  ];
  const maxV = 27;
  return (
    <ChartCard title="Knockout goals, round by round" subtitle="Where Europe's elite meet — and where Ronaldo pulls away">
      <div ref={ref} className="space-y-4">
        {rows.map((r) => (
          <div key={r.stage}>
            <div className="flex justify-between text-xs sm:text-sm mb-1.5">
              <span className="font-semibold" style={{ color: C.text }}>{r.stage}</span>
              <span className="font-mono" style={{ color: C.text2 }}>
                <span style={{ color: C.messi }}>{r.messi}</span> · <span style={{ color: C.cr7 }}>{r.cr7}</span>
              </span>
            </div>
            <div className="flex gap-1.5">
              <div className="flex-1 h-5 rounded-md overflow-hidden flex justify-end" style={{ background: C.alt }}>
                <motion.div initial={{ width: 0 }} animate={inView ? { width: `${(r.messi / maxV) * 100}%` } : {}} transition={{ duration: 0.8 }}
                  className="h-full" style={{ background: C.messi }} />
              </div>
              <div className="flex-1 h-5 rounded-md overflow-hidden" style={{ background: C.alt }}>
                <motion.div initial={{ width: 0 }} animate={inView ? { width: `${(r.cr7 / maxV) * 100}%` } : {}} transition={{ duration: 0.8, delay: 0.1 }}
                  className="h-full" style={{ background: C.cr7, boxShadow: `0 0 12px ${C.cr7}55` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-4 text-[11px]" style={{ color: C.text2 }}>
        <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm" style={{ background: C.messi }} /> Messi</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm" style={{ background: C.cr7 }} /> Ronaldo</span>
        <span className="italic">Ronaldo leads at every single stage</span>
      </div>
    </ChartCard>
  );
}

/* ---------------- FOUR CROWNS (simultaneous top scorer) ---------------- */
function FourCrowns() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const crowns = [
    { icon: "👑", title: "Real Madrid", sub: "All-time top scorer" },
    { icon: "🏆", title: "Champions League", sub: "All-time top scorer" },
    { icon: "🌍", title: "International football", sub: "All-time top scorer" },
    { icon: "🇵🇹", title: "Portugal", sub: "All-time top scorer" },
  ];
  return (
    <ChartCard title="Four crowns at the same time" subtitle="Simultaneously the all-time top scorer for his club, his continent's biggest competition, and his country">
      <div ref={ref} className="grid grid-cols-2 gap-3">
        {crowns.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 180, damping: 15 }}
            className="rounded-2xl p-4 text-center"
            style={{ background: `linear-gradient(135deg, ${C.cr7}14, ${C.gold}14)`, border: `1px solid ${C.cr7}33` }}
          >
            <div className="text-2xl">{c.icon}</div>
            <div className="mt-1.5 font-bold text-sm" style={{ color: C.text }}>{c.title}</div>
            <div className="text-[11px]" style={{ color: C.text2 }}>{c.sub}</div>
          </motion.div>
        ))}
      </div>
      <p className="mt-4 text-center text-[11px] italic" style={{ color: C.text2 }}>
        Almost no athlete in any sport has ever led their club, their continent, and their country — all at once.
      </p>
    </ChartCard>
  );
}

/* ---------------- UCL RECORDS LIST ---------------- */
function UCLRecords() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const records = [
    "Only player to be UCL top scorer for 6 consecutive seasons",
    "Only player to score 15+ UCL goals in multiple seasons",
    "Only player to score in 11 consecutive Champions League matches",
    "Only player to score in all six UCL group-stage matches in a season",
    "Record 17 goals in a single UCL campaign",
    "Only player to score 100+ goals for 5 different teams",
  ];
  return (
    <ChartCard title="Records that begin with the word 'only'" subtitle="Champions League feats no other player in history has matched">
      <div ref={ref} className="space-y-2">
        {records.map((r, i) => (
          <motion.div
            key={r}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.08 }}
            className="flex gap-3 items-start rounded-xl px-3 py-2.5"
            style={{ background: C.alt }}
          >
            <span className="shrink-0 mt-0.5 text-xs font-bold px-1.5 py-0.5 rounded" style={{ background: `${C.cr7}22`, color: C.cr7 }}>ONLY</span>
            <span className="text-xs sm:text-sm" style={{ color: C.text }}>{r}</span>
          </motion.div>
        ))}
      </div>
    </ChartCard>
  );
}

/* ---------------- CLUTCH MOMENTS NARRATIVE ---------------- */
function ClutchMoments() {
  const moments = [
    { match: "Portugal 3-3 Spain", event: "World Cup 2018", story: "Underdogs, Spain leading 3-2 in the 88th minute. Ronaldo curls in an 88th-minute free-kick to complete his hat-trick and rescue a point.", tag: "Hat-trick" },
    { match: "Real Madrid 3-0 Wolfsburg", event: "Champions League 2016", story: "2-0 down from the first leg, 90 minutes from elimination. Ronaldo scores all three goals — a comeback that launched the campaign Madrid would go on to win.", tag: "Hat-trick" },
    { match: "Portugal 3-1 Switzerland", event: "Nations League SF 2019", story: "A semi-final on the line — Ronaldo scores all three Portugal goals to carry them to the final.", tag: "Hat-trick" },
    { match: "Atlético 0-3 Juventus", event: "Champions League 2019", story: "0-2 down from the first leg. Ronaldo answers with a hat-trick to overturn the tie almost single-handedly.", tag: "Hat-trick" },
    { match: "Sweden 2-3 Portugal", event: "WC Playoff 2013", story: "World Cup qualification on the line. Ronaldo scores three — including two late strikes — to send Portugal to the World Cup almost alone.", tag: "Hat-trick" },
    { match: "Northern Ireland 2-4 Portugal", event: "WC Qualifying 2013", story: "Portugal in trouble. Ronaldo scores three goals in the final 22 minutes to flip the game.", tag: "22-min hat-trick" },
    { match: "Armenia 2-3 Portugal", event: "Euro 2016 Qualifier", story: "Portugal fall behind. Ronaldo responds with all three Portuguese goals to secure the win.", tag: "Hat-trick" },
    { match: "Man United 3-2 Tottenham", event: "2022", story: "At 37 years old, Ronaldo rescues one of the biggest clubs in the world with a match-winning hat-trick.", tag: "Hat-trick at 37" },
    { match: "Man United 3-2 Norwich", event: "2022", story: "Another rescue act — Ronaldo's hat-trick drags United over the line when they needed him most.", tag: "Hat-trick" },
  ];
  return (
    <ChartCard title="When the team was drowning, one man kept swimming" subtitle="Matches Ronaldo single-handedly rescued — a clutch list no rival can match">
      <div className="relative pl-5">
        {/* vertical line */}
        <div className="absolute left-1.5 top-2 bottom-2 w-0.5" style={{ background: `linear-gradient(${C.cr7}, ${C.gold})` }} />
        <div className="space-y-4">
          {moments.map((m, i) => (
            <motion.div
              key={m.match + m.event}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.05 }}
              className="relative"
            >
              <span className="absolute -left-[18px] top-1.5 h-3 w-3 rounded-full" style={{ background: C.cr7, boxShadow: `0 0 8px ${C.cr7}` }} />
              <div className="rounded-xl p-3" style={{ background: C.alt, border: `1px solid ${C.grid}` }}>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-bold text-sm" style={{ color: C.text }}>{m.match}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${C.cr7}22`, color: C.cr7 }}>{m.tag}</span>
                </div>
                <div className="text-[11px] font-medium mt-0.5" style={{ color: C.gold }}>{m.event}</div>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed" style={{ color: C.text2 }}>{m.story}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
}

/* ---------------- PORTUGAL BEFORE / AFTER ---------------- */
function PortugalBeforeAfter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <ChartCard title="Portugal: before Ronaldo vs after Ronaldo" subtitle="What one man did to a nation's entire football history">
      <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="rounded-2xl p-5 text-center"
          style={{ background: C.alt, border: `1px solid ${C.grid}` }}
        >
          <div className="text-xs uppercase tracking-wider font-semibold" style={{ color: C.text2 }}>Before Ronaldo</div>
          <div className="mt-3 font-display font-bold" style={{ fontSize: "3rem", lineHeight: 1, color: C.gray }}>0</div>
          <div className="mt-1 text-sm font-medium" style={{ color: C.text }}>major trophies</div>
          <div className="mt-3 text-[11px]" style={{ color: C.text2 }}>Qualified for just <strong>3 World Cups</strong> in their entire history</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl p-5 text-center"
          style={{ background: `linear-gradient(135deg, ${C.cr7}18, ${C.gold}18)`, border: `1px solid ${C.cr7}44` }}
        >
          <div className="text-xs uppercase tracking-wider font-semibold" style={{ color: C.cr7 }}>After Ronaldo</div>
          <div className="mt-3 font-display font-bold" style={{ fontSize: "3rem", lineHeight: 1, color: C.cr7 }}>3</div>
          <div className="mt-1 text-sm font-medium" style={{ color: C.text }}>major trophies</div>
          <div className="mt-3 text-[11px]" style={{ color: C.text2 }}>Euro 2016 · Nations League 2019 &amp; 2025 — plus a near-perfect qualification record for every major tournament since his debut</div>
        </motion.div>
      </div>
    </ChartCard>
  );
}

/* ================= MAIN POST ================= */
function RonaldoMessiPost() {
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

  const tags = ["Ronaldo", "Messi", "GOAT Debate", "Football", "Data Analysis"];

  return (
    <article className="overflow-x-hidden" style={{ color: C.text }}>
      {/* Reading progress */}
      <div className="fixed top-0 left-0 h-1 z-[60] transition-[width] duration-150"
        style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${C.cr7}, ${C.gold})` }} />

      {/* Hero */}
      <div className="bg-blog-hero pt-24 sm:pt-28 pb-8">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <Link to="/blogs" className="inline-flex items-center gap-2 text-xs sm:text-sm transition-smooth text-blog-hero-muted hover:text-blog-hero-title">
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </Link>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mt-6 sm:mt-8">
            <span className="inline-block rounded-full px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider"
              style={{ background: `${C.cr7}22`, color: C.cr7 }}>
              Football · Data &amp; Debate
            </span>
            <h1 className="mt-4 sm:mt-5 font-display font-bold tracking-tight leading-[1.1] text-blog-hero-title text-[clamp(1.75rem,6vw,3.75rem)] break-words">
              Messi Won More.{" "}
              <span style={{ background: `linear-gradient(90deg, ${C.cr7}, ${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Ronaldo Did More.
              </span>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-blog-hero-muted max-w-2xl leading-relaxed">
              Most GOAT debates start with trophies, Ballon d'Ors, and World Cups. This one doesn't — because greatness isn't always about who won the most, but who overcame the most. Messi may be football's greatest natural talent. Ronaldo is something rarer: a player who conquered multiple leagues, adapted to different cultures, and turned relentless self-improvement into an art form.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-blog-hero-muted">
              <span>June 2026</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> 13 min read</span>
              <span className="inline-flex items-center gap-1.5"><Share2 className="h-3.5 w-3.5" /> Share:</span>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Messi won more. Ronaldo did more — the GOAT case")}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" className="rounded-full p-2 hover:opacity-80 transition-smooth" style={{ background: "var(--muted)" }}>
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

        {/* Cover image */}
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="container mx-auto px-4 sm:px-6 max-w-5xl mt-8 sm:mt-10">
          <div className="relative aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant">
            <img src={cover} alt="Cristiano Ronaldo versus Lionel Messi — the GOAT debate" width={1280} height={720} className="h-full w-full object-cover" />
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
            Imagine two people reach the top of Mount Everest. One was dropped halfway up by a helicopter. The other climbed every step. Both reached the summit — but whose achievement impresses you more?
          </P>
          <P>
            Most GOAT debates obsess over <em>where</em> Messi and Ronaldo finished: trophies, Ballon d'Ors, a World Cup. This one asks <em>how</em> they got there. And when the journey matters as much as the destination, Ronaldo's case becomes impossible to ignore.
          </P>
        </Reveal>

        {/* SECTION 1 */}
        <SectionHeading kicker="Section 1">The Question Everyone Asks Wrong</SectionHeading>
        <Reveal>
          <P>Let's be fair first: <strong>Messi has won more.</strong> More Ballon d'Ors, a World Cup, more trophies. If greatness is a scoreboard, the debate ends there — and he's the more gifted natural footballer, which isn't up for debate.</P>
          <P>But football is an individual sport disguised as a team sport. So the real question was never "who won more?" It's <strong>who proved more? Who adapted more? Who conquered more challenges? Who succeeded under more conditions?</strong></P>
          <P>Ask those questions, and Ronaldo's career stops looking like a football career — and starts looking like the greatest competitive achievement the sport has ever seen. Every sport has this pattern: the player with the biggest numbers is rarely the one history fears most.</P>
          <ul className="my-4 space-y-2 text-base sm:text-lg" style={{ color: C.text }}>
            <li>🏏 <strong>Cricket:</strong> Tendulkar and Kohli have the run mountains. Dhoni has the trophies and ice in his veins when it mattered.</li>
            <li>🏀 <strong>Basketball:</strong> LeBron has more points. Jordan went 6-for-6 in Finals and never lost one.</li>
            <li>🏎️ <strong>F1:</strong> Hamilton has the records — built in the best car. Senna has the myth — built in the rain.</li>
          </ul>
          <P>Think of it simply: <strong>do you like Batman or Superman?</strong> One is a god from another planet — gifted, untouchable, born superior. The other is a human who <em>built</em> himself into a hero through sheer will. Plenty of people still pick Batman. Messi is football's Superman. Ronaldo is its Batman — and that's the whole point.</P>
        </Reveal>
        <Callout>Numbers tell you what happened. They don't tell you how hard it was.</Callout>

        {/* SECTION 2 */}
        <SectionHeading kicker="Section 2">The Boy From Madeira Who Refused to Be Ordinary</SectionHeading>
        <Reveal>
          <P>Some legends are born. Others are built.</P>
          <P>Messi was scouted as a child, brought into the best academy on earth, given a system shaped around his gifts, surrounded by Xavi, Iniesta, and Busquets. A protected, perfect rise. He may be the greatest natural talent football has ever seen.</P>
          <P>Ronaldo did not arrive as the chosen one. He arrived as a skinny teenager from a small island with an impossible dream — left home at 12, lost his father young, diagnosed with a heart condition at 15. Everything that followed was <em>built</em>: through obsession, discipline, sacrifice, and an almost irrational refusal to accept limits.</P>
          <P>If two students both score 95, but one had private tutors and elite schools while the other fought through adversity and still scored 95 — whose 95 impresses you more? Different countries. Different languages. Different leagues. Different teammates. <strong>Same result: Ronaldo scoring goals.</strong></P>
        </Reveal>
        <Reveal><JourneyRoadmap /></Reveal>
        <Reveal>
          <P>He won league titles — and finished top scorer — in <strong>England, Spain, and Italy</strong>, the only player to win the league and be named Player of the Year in all three. Then he carried elite standards to a fourth country in Saudi Arabia. If two engineers are both elite, but one succeeded only at Google while the other succeeded at Google, Microsoft, <em>and</em> Amazon — who proved greater adaptability? When Messi left his one system for France, his league scoring dropped to just <strong>6 goals</strong> even with Mbappé and Neymar beside him.</P>
        </Reveal>
        <Callout>Messi was born extraordinary. Ronaldo built himself into extraordinary.</Callout>

        {/* SECTION 3 */}
        <SectionHeading kicker="Section 3">One Career. Five Different Players.</SectionHeading>
        <Reveal>
          <P>Most players have one prime. Ronaldo had several — because every time his body changed, he rebuilt his game to stay on top. This is the greatest reinvention in sports history.</P>
        </Reveal>
        <Reveal><EvolutionTimeline /></Reveal>
        <Reveal>
          <P>In 2014, at 29, a degenerative knee condition should have ended his explosiveness. Instead he retrained around it — six hours a day — and reinvented himself from a flashy winger into the deadliest penalty-box predator alive. The result: three straight Champions Leagues, something no club had done since 1976. He even scored <strong>more hat-tricks after turning 30 (34) than before it (30)</strong> — more than the entire careers of Agüero, Ibrahimović, or Kane.</P>
          <P>Football history has produced thousands of talented players. Ronaldo built a career so extraordinary that <strong>scoring 50 goals a season became "normal."</strong> The impossible became expected.</P>
        </Reveal>
        <Reveal><LeagueConquest /></Reveal>
        <Callout>Talent has limits. Obsession doesn't.</Callout>

        {/* SECTION 4 */}
        <SectionHeading kicker="Section 4">The Number That Won't Stop Climbing</SectionHeading>
        <Reveal><GoalCounter /></Reveal>
        <Reveal>
          <P>973 career goals, across clubs, countries, continents, and decades. And the goals themselves shatter every myth about him:</P>
        </Reveal>
        <Reveal><ScoringFingerprint /></Reveal>
        <Reveal>
          <ul className="my-4 space-y-2 text-base sm:text-lg" style={{ color: C.text }}>
            <li>⚡ <strong>The fastest there is:</strong> of the ten fastest players ever to reach 100 goals for a club, Ronaldo appears <strong>three times</strong>. Nobody else appears more than once.</li>
            <li>📅 <strong>He never stops:</strong> a goal in <strong>24 consecutive calendar years</strong> (2002–2026) — and <strong>22 straight years</strong> scoring for Portugal.</li>
            <li>🗓️ <strong>The four-year monopoly:</strong> the only player ever to score 60+ goals in four straight years (2011–2014) — 253 goals. Messi hit a higher single peak (91 in 2012) but never strung the streak together.</li>
          </ul>
          <P>And the stat that breaks the "one player doesn't make a team" rule: roughly <strong>75% of the goals scored by Portugal's starting XI</strong> have come from one man — Ronaldo.</P>
        </Reveal>

        {/* SECTION 5 */}
        <SectionHeading kicker="Section 5">More Trophies, Fewer Countries</SectionHeading>
        <Reveal>
          <P>Messi has more team trophies than Ronaldo — <strong>48 to 35</strong>. A Messi fan stops the argument right here. But the number hides the real story: <em>where</em> those trophies were won.</P>
        </Reveal>
        <Reveal><TrophySpread /></Reveal>
        <Reveal>
          <P>Almost all of Messi's haul came in <strong>one place</strong> — the bulk won at Barcelona, inside one golden generation. Ronaldo's 35 are scattered across <strong>England, Spain, Italy, and Portugal</strong> — four countries, four systems, four sets of teammates he didn't grow up with. A taller stack built in one perfect home isn't the same as a shorter stack built brick by brick all over the world.</P>
        </Reveal>
        <Reveal><HonorsTable /></Reveal>
        <Callout>Winning a lot in one place proves you're elite. Winning everywhere proves you're the reason.</Callout>

        {/* SECTION 6 */}
        <SectionHeading kicker="Section 6">The Biggest Stage Belongs to One Man</SectionHeading>
        <Reveal>
          <P>The Champions League is the highest level of club football on earth — the hardest trophy to win. And it is Ronaldo's private kingdom. He's the <strong>all-time top scorer (140) AND top assister (42)</strong> at the same time, top scorer of <strong>6 campaigns</strong> between 2012–2018, and the only player to score in <strong>3 different finals</strong>.</P>
          <P>Here's what that did to a giant. <strong>Before Ronaldo joined Real Madrid, they kept crashing out in the Round of 16.</strong> After he arrived, they won <strong>4 Champions Leagues in 9 years</strong> — and his <em>worst</em> exit in that span was a semi-final. One signing turned a stalling superpower into the most dominant team in Europe.</P>
        </Reveal>
        <Reveal><UCLBars /></Reveal>
        <Reveal><UCLKnockoutTable /></Reveal>
        <Reveal>
          <P>And the records he holds at the same time are almost hard to believe — he was, <em>simultaneously</em>, the all-time top scorer for Real Madrid, the Champions League, international football, and Portugal.</P>
        </Reveal>
        <Reveal><FourCrowns /></Reveal>
        <Reveal><UCLRecords /></Reveal>
        <Reveal>
          <P>Against the two greatest goalkeepers of the era — Buffon and Neuer — the gap is brutal: Ronaldo scored <strong>18 goals in 12 games</strong>; Messi managed <strong>4 in 8</strong>. The bigger the wall, the higher Ronaldo climbed.</P>
        </Reveal>
        <Callout>Anyone can shine in the group stage. Legends shine when one mistake ends the season.</Callout>

        {/* SECTION 7 */}
        <SectionHeading kicker="Section 7">But Messi Has the World Cup. Doesn't That End It?</SectionHeading>
        <Reveal>
          <P>Let's tackle the big one head-on. Yes — Messi won 2022, and Ronaldo never did. That's real, and it's the single strongest line on Messi's CV. No spin changes that. But here's the honest context:</P>
          <P><strong>A World Cup is a team trophy, not a one-man award.</strong> Messi won it with a deep, elite Argentina squad — and even then it came down to a <strong>penalty shootout</strong>. The sport's biggest prize is decided by 23 players over a month, sometimes by a coin-flip.</P>
          <P><strong>The tournaments aren't equally hard.</strong> Messi's continental titles came mostly in the <strong>Copa América</strong> — essentially two elite teams and a thin field. Ronaldo's <strong>Euros and Nations League</strong> titles meant beating France, Spain, Germany, England, and Italy round after round. The Nations League, by design, pits the best against the best.</P>
        </Reveal>
        <Reveal><WorldCupsTimeline /></Reveal>
        <Reveal>
          <P>And Ronaldo owns World Cup records Messi doesn't: the <strong>only male player to score in five consecutive World Cups</strong> (2006–2022), the only player to score in <strong>five separate Euros</strong> (2004–2024), and goals against <strong>47 different countries</strong>. Messi won the trophy once. Ronaldo stayed elite across five tournaments spanning two decades.</P>
          <P><strong>One more myth to bust.</strong> Critics say Ronaldo has zero World Cup knockout goals while Messi has five. True — but <em>all five of Messi's knockout goals came in a single edition (2022)</em>; before that, across four World Cups, he also had zero. And of those five, <strong>three were penalties</strong>. A fair reading isn't "Messi is clutch and Ronaldo isn't" — it's that both men's World Cup knockout records are thinner than the highlight reels suggest.</P>
          <P>And zoom out from the one trophy he's missing to what he <em>gave</em> an entire nation.</P>
        </Reveal>
        <Reveal><PortugalBeforeAfter /></Reveal>
        <Callout>A World Cup proves a team peaked for a month. A career proves a man was great for twenty years.</Callout>

        {/* SECTION 8 */}
        <SectionHeading kicker="Section 8">One Inherited a Superpower. The Other Built One.</SectionHeading>
        <Reveal>
          <P>This is the part the trophy count hides completely. <strong>Argentina</strong> was already a football superpower — two World Cups and over a dozen Copa Américas <em>before Messi was even born</em>. He joined a giant.</P>
          <P><strong>Portugal</strong>, before Ronaldo, had qualified for just three World Cups in their entire history and had <strong>never won a major trophy</strong>. He dragged them to the <strong>Euro 2016 title</strong> and the Nations League crown <strong>twice (2019 and 2025)</strong>, became the <strong>highest international goalscorer in history (143 goals)</strong>, and is the <strong>all-time top scorer in the European Championship (14 goals)</strong>. He owns roughly <strong>22% of all the trophies Portugal has ever won</strong>. International football is harder to dominate alone — less training, less chemistry, smaller talent pools — and Ronaldo carried the heavier burden with the lighter team. One man inherited a kingdom. The other built one from nothing.</P>
        </Reveal>
        <Reveal><GoalQuality /></Reveal>
        <Callout>It's easy to be great for a giant. It's history to make a giant out of nothing.</Callout>

        {/* SECTION 9 */}
        <SectionHeading kicker="Section 9">More to Lose, Everywhere He Went</SectionHeading>
        <Reveal>
          <P>Greatness under comfort is easy. Greatness under pressure is rare. At Manchester United, Real Madrid, Juventus, and Portugal, Ronaldo was <em>always</em> the man expected to score. When those teams lost, the blame landed on him — every time. The burden of expectation followed him into every country, every dressing room, every final.</P>
          <P>And here's the part that reveals everything about mental strength. After missing a penalty in the <strong>2016 Copa América final</strong>, Messi announced his <strong>retirement from international football</strong> — then reversed it. Imagine the storm if Ronaldo had walked away from his country after a final, then walked back. He never did. He kept showing up, final after final, until the trophies came.</P>
          <P>And consider the risk he chose to take. Most legends protect their legacy by staying where they're comfortable. Ronaldo left England after conquering it. Left Spain after conquering it. Left Italy after conquering it. He kept gambling his legacy — and kept winning the bet.</P>
          <P>But the truest test of greatness is what a player does when the team is <em>drowning</em>. Time and again, Ronaldo single-handedly dragged his side back from the edge — something Messi has never been asked to do in the same way, because his teams rarely needed rescuing.</P>
        </Reveal>
        <Reveal><ClutchMoments /></Reveal>
        <Reveal>
          <P>Long after the trophies are counted and the awards are forgotten, one question will remain: <strong>how does a boy from a small island become the most complete goalscorer football has ever seen?</strong> The answer is Cristiano Ronaldo.</P>
        </Reveal>
        <Reveal><Age36Split /></Reveal>
        <Callout>Greatness isn't staying where you're comfortable. It's leaving when you're already on top.</Callout>

        {/* SECTION 10 */}
        <SectionHeading kicker="Section 10">It Should Be 6–6. Here's the Receipt.</SectionHeading>
        <Reveal>
          <P>First, the framing. The Ballon d'Or measures who had the better <em>year</em>. The GOAT debate is about who had the greater <em>career</em>. They are not the same thing. <strong>Great players have won fewer Ballon d'Ors than their talent suggests, voting is subjective, and media narratives heavily influence the awards.</strong></P>
          <P>The official count says Messi 8, Ronaldo 5. But three of those awards don't survive a look at the data. By performance, it should be <strong>6 apiece</strong>.</P>
        </Reveal>
        <Reveal><BallonRecount /></Reveal>
        <Reveal>
          <P><strong>2018</strong> — Ronaldo won his third straight UCL as its top scorer; Modrić didn't outproduce him. <strong>2021</strong> — Lewandowski broke a 49-year scoring record; one continental tournament shouldn't beat that. <strong>2023</strong> — Haaland's record treble was statistically the most dominant striker season ever. Strip out the narrative and popularity, and the gap closes to a tie.</P>
        </Reveal>
        <Callout>An award is a story we agree to tell. It isn't always the truth.</Callout>

        {/* SECTION 11 — GOAT OF WHAT */}
        <SectionHeading kicker="Section 11">The GOAT of… Which Competition, Exactly?</SectionHeading>
        <Reveal>
          <P>Here's the simplest test of all. Pick any major competition and ask who truly sits at the top of it.</P>
        </Reveal>
        <Reveal><GoatBreakdown /></Reveal>
        <Reveal>
          <P>In the <strong>Champions League</strong>, the Club World Cup, and the Euros — it's Ronaldo. In the <strong>World Cup</strong>, the greatest is Pelé with three titles. In the <strong>Copa América</strong>, Messi isn't even a top-five all-time scorer — that crown belongs to <strong>Norberto Méndez</strong>, who scored <strong>17 goals in just 17 matches</strong> across three tournaments in the 1940s, helping Argentina win <strong>three consecutive titles</strong>. The one competition Messi truly rules is <strong>La Liga</strong> — one league, one division, in a sport played across the entire planet.</P>
          <P>And the moment he left that comfort zone for France, the spell broke: <strong>6 league goals</strong> in his first season, visibly struggling to adapt even alongside Neymar and Mbappé. Ronaldo did the opposite — different leagues, different countries, different systems, different teammates, different challenges, but the <em>same</em> dominance everywhere. So how can anyone be crowned the GOAT when, outside one league, they aren't the greatest in a single major competition they entered?</P>
        </Reveal>
        <Callout>You can be the king of one kingdom, or the conqueror of many. Only one of those is the GOAT.</Callout>

        {/* SECTION 12 — THOUGHT EXPERIMENT */}
        <SectionHeading kicker="Section 12">Football's Greatest Experiment</SectionHeading>
        <Reveal>
          <P>Here's the cleanest test of all. You're starting a brand-new team. Unknown league. Unknown teammates. Unknown coach. Unknown country. You can pick one player to guarantee success.</P>
          <P>Remove the academy. Remove the system. Remove the perfect teammates. Remove the comfort zone. Who has <em>already proven</em> he survives every variable? Ronaldo has done exactly that — four times, in four countries. That's not a trophy count. That's proof.</P>
        </Reveal>
        <Callout>Great players need the right conditions. Ronaldo proved greatness survives every condition.</Callout>

        {/* CONCLUSION */}
        <SectionHeading kicker="The Verdict">Football's Greatest Artist vs Its Greatest Achievement</SectionHeading>
        <Reveal>
          <P>So here's where we land. If greatness is trophies, Messi has a powerful case. If greatness is natural talent, Messi may be unmatched.</P>
          <P>But if greatness is conquering different leagues, adapting to different systems, reinventing yourself over two decades, carrying expectations across multiple countries, and becoming the most complete goalscorer football has ever seen — then Ronaldo stands alone.</P>
          <P>Because here's the part the spreadsheet can never capture: Ronaldo is football's <strong>complete player</strong>. He scores with his <strong>left foot</strong> and his <strong>right</strong>, with towering <strong>headers</strong>, jaw-dropping <strong>bicycle kicks</strong>, and <strong>acrobatic</strong> volleys. He has blistering <strong>speed</strong>, thunderous <strong>long shots</strong>, slick <strong>dribbling</strong>, ice-cold <strong>clutch</strong> instincts, and the calm of a <strong>penalty master</strong> under the whole world's gaze. He <strong>creates</strong> as well as he finishes — sharp <strong>playmaking</strong> and <strong>pinpoint passing</strong> — all wrapped in an <strong>athletic engine</strong> that refuses to age. There is no part of the game he hasn't mastered.</P>
        </Reveal>
        <Reveal><CompletePlayer /></Reveal>
        <Reveal>
          <P>And the most dangerous thing about Ronaldo was never his talent. It was the <strong>certainty</strong> — the belief he created in everyone's mind. Opponents could play the perfect match for 89 minutes — the team flawless, the crowd against him — and still know, deep down, that he needed only one moment to turn their best performance into a defeat. Because Ronaldo had a rare ability to change the outcome of a match in a single moment. One cross. One header. One shot. One chance. That was all he needed. They didn't wonder <em>if</em> he would score. They wondered <em>when</em>.</P>
          <P>For over two decades, the world's best defenders, managers, and teams feared him — not because he <em>might</em> score, but because deep down they knew he probably <em>would</em>.</P>
          <P>Football has seen artists. Football has seen magicians. Football has seen geniuses. But it has never seen another Cristiano Ronaldo — a player who turned discipline into a superpower, pressure into fuel, doubt into motivation, and a dream into a legacy so large that generations will argue about it forever.</P>
        </Reveal>
        <div className="my-10 sm:my-14 text-center">
          <motion.blockquote
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-xl sm:text-2xl md:text-3xl font-bold leading-snug"
            style={{ background: `linear-gradient(90deg, ${C.cr7}, ${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          >
            "Messi won more. Ronaldo did more. One mastered a kingdom. The other conquered the world."
          </motion.blockquote>
          <p className="mt-4 text-sm" style={{ color: C.text2 }}>
            Messi is football's greatest artist. Ronaldo is its greatest achievement.
          </p>
        </div>

        {/* Back link */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link to="/blogs" className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-smooth"
            style={{ background: `linear-gradient(90deg, ${C.cr7}, ${C.gold})`, color: "white" }}>
            <ArrowLeft className="h-4 w-4" /> More articles
          </Link>
        </div>
        <BlogEngagement slug="ronaldo-vs-messi-goat" />
      </div>
    </article>
  );
}

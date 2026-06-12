import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

export const Route = createFileRoute("/blogs/ronaldo-vs-messi-goat")({
  head: () => ({
    meta: [
      { title: "The Nomad and the Native: Why Ronaldo Is the GOAT — Selvan Rajan" },
      {
        name: "description",
        content:
          "Ronaldo conquered four countries; Messi mastered one kingdom. A data-backed case for why the greatness that traveled the world makes Cristiano Ronaldo football's true GOAT.",
      },
      { property: "og:title", content: "The Nomad and the Native — Ronaldo vs Messi" },
      {
        property: "og:description",
        content: "Greatness that travels vs. greatness that stays home. The data-backed case for Ronaldo as the GOAT.",
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
  const parts = [
    { label: "Left foot", value: 179, color: C.messi, note: "his \"weak\" foot — 3rd-most since 2000" },
    { label: "Right foot", value: 1, color: C.cr7, note: "his dominant foot — the bulk of his goals", display: "100s" },
    { label: "Headers", value: 1, color: C.gold, note: "100+ — a category of his own", display: "100+" },
  ];
  return (
    <ChartCard title="The complete scorer" subtitle="The only player ever with 100+ goals using right foot, left foot, AND head">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {parts.map((p) => (
          <div key={p.label} className="rounded-2xl p-4 text-center" style={{ background: C.alt }}>
            <div className="font-display font-bold" style={{ fontSize: "2rem", color: p.color }}>
              {p.label === "Left foot" ? "179" : p.display}
            </div>
            <div className="mt-1 text-sm font-semibold" style={{ color: C.text }}>{p.label}</div>
            <div className="mt-1 text-[11px] leading-snug" style={{ color: C.text2 }}>{p.note}</div>
          </div>
        ))}
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
    { honor: "Int'l goals (world record)", messi: "—", cr7: "143", edge: "cr7" },
    { honor: "Consecutive World Cups scored", messi: "—", cr7: "5", edge: "cr7" },
  ];
  return (
    <ChartCard title="Head to head: the honors that matter" subtitle="Same legends, very different shapes of greatness">
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
  const Bar = ({ rows, total, who, whoColor }: { rows: typeof messi; total: number; who: string; whoColor: string }) => (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-sm" style={{ color: whoColor }}>{who}</span>
        <span className="text-xs font-mono" style={{ color: C.text2 }}>{total} total</span>
      </div>
      <div className="flex h-9 w-full rounded-xl overflow-hidden" style={{ background: C.alt }}>
        {rows.map((r) => (
          <motion.div
            key={r.label}
            initial={{ width: 0 }}
            whileInView={{ width: `${(r.value / total) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
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
  return (
    <ChartCard title="Where the trophies were won" subtitle="Messi's cabinet sits mostly in one home; Ronaldo's is spread across the map">
      <div className="space-y-6">
        <Bar rows={messi} total={48} who="Lionel Messi" whoColor={C.messi} />
        <Bar rows={cr7} total={35} who="Cristiano Ronaldo" whoColor={C.cr7} />
      </div>
    </ChartCard>
  );
}

/* ---------------- UCL DOMINANCE BARS ---------------- */
function UCLBars() {
  const metrics = [
    { label: "UCL titles", messi: 4, cr7: 5, max: 5 },
    { label: "Knockout goals", messi: 49, cr7: 67, max: 67 },
    { label: "Goals vs Buffon & Neuer", messi: 4, cr7: 18, max: 18 },
  ];
  return (
    <ChartCard title="The Champions League belongs to one man" subtitle="Titles, knockout goals, and goals against the two greatest goalkeepers of the era">
      <div className="space-y-6">
        {metrics.map((m) => (
          <div key={m.label}>
            <div className="text-sm font-semibold mb-2" style={{ color: C.text }}>{m.label}</div>
            <div className="space-y-2">
              {/* Messi */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] w-16 shrink-0" style={{ color: C.messi }}>Messi</span>
                <div className="flex-1 h-7 rounded-lg overflow-hidden" style={{ background: C.alt }}>
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${(m.messi / m.max) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1 }}
                    className="h-full flex items-center justify-end px-2 text-[11px] font-bold text-white" style={{ background: C.messi }}>
                    {m.messi}
                  </motion.div>
                </div>
              </div>
              {/* CR7 */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] w-16 shrink-0" style={{ color: C.cr7 }}>Ronaldo</span>
                <div className="flex-1 h-7 rounded-lg overflow-hidden" style={{ background: C.alt }}>
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${(m.cr7 / m.max) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.15 }}
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
              The Nomad and the Native:{" "}
              <span style={{ background: `linear-gradient(90deg, ${C.cr7}, ${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Greatness That Travels
              </span>{" "}
              vs. Greatness That Stays Home
            </h1>
            <p className="mt-4 text-sm sm:text-base text-blog-hero-muted max-w-2xl leading-relaxed">
              Ronaldo conquered four countries. Messi mastered one kingdom. This is the data-backed case for why the greatness that traveled the world makes Cristiano Ronaldo football's true GOAT.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-blog-hero-muted">
              <span>June 2026</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> 10 min read</span>
              <span className="inline-flex items-center gap-1.5"><Share2 className="h-3.5 w-3.5" /> Share:</span>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("The Nomad and the Native — why Ronaldo is the GOAT")}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" className="rounded-full p-2 hover:opacity-80 transition-smooth" style={{ background: "var(--muted)" }}>
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
            Everyone reaches for the same scoreboard: more goals, more assists, a World Cup, debate over. But that scoreboard measures <em>accumulation</em>, not <em>difficulty</em> — and the moment you ask not "who scored more?" but "who conquered more?", the answer flips. This is the case for why Cristiano Ronaldo, not Lionel Messi, is football's true GOAT.
          </P>
        </Reveal>

        {/* SECTION 1 */}
        <SectionHeading kicker="Section 1">First, Let's Be Honest: Messi Wins the Spreadsheet</SectionHeading>
        <Reveal>
          <P>No games here. On raw per-game numbers, Messi is the more naturally gifted scorer and creator. If greatness were a column in Excel, the debate would be over.</P>
          <P>But here's the question nobody asks: <strong>does the spreadsheet measure greatness, or just comfort?</strong> Every sport has this argument — the player with the biggest numbers is rarely the one history fears most:</P>
          <ul className="my-4 space-y-2 text-base sm:text-lg" style={{ color: C.text }}>
            <li>🏏 <strong>Cricket:</strong> Tendulkar and Kohli have the run mountains. Dhoni has the trophies and ice in his veins when it mattered.</li>
            <li>🏀 <strong>Basketball:</strong> LeBron has more points. Jordan went 6-for-6 in Finals and never lost one.</li>
            <li>🏎️ <strong>F1:</strong> Hamilton has the records — built in the best car. Senna has the myth — built in the rain.</li>
          </ul>
          <P>Think of it simply: <strong>do you like Batman or Superman?</strong> One is a god from another planet — gifted, untouchable, born superior. The other is a human who <em>built</em> himself into a hero through sheer will. Plenty of people still pick Batman. Messi is football's Superman. Ronaldo is its Batman — and that's the whole point.</P>
        </Reveal>
        <Callout>Numbers tell you what happened. They don't tell you how hard it was.</Callout>

        {/* SECTION 2 */}
        <SectionHeading kicker="Section 2">One Man Conquered Four Kingdoms. The Other Ruled One.</SectionHeading>
        <Reveal>
          <P>Messi spent his peak — nearly two decades — inside one system: Barcelona. Same city, same teammates (Xavi, Iniesta, Busquets), same philosophy he learned as a boy at La Masia. A perfect machine built around his exact movements. When he finally left for PSG, his league scoring dropped to just <strong>6 goals</strong> in his first season — even with Mbappé and Neymar beside him.</P>
          <P>Ronaldo did the opposite. He kept walking into <em>new</em> machines and forcing them to run on his fuel.</P>
        </Reveal>
        <Reveal><LeagueConquest /></Reveal>
        <Reveal>
          <P>The records this produced are untouchable: the <strong>only</strong> player to win the league AND be named Player of the Year in England, Spain, and Italy; the <strong>only</strong> player to finish top scorer in <strong>four different countries</strong>; and <strong>100+ goals in five different competitions</strong>. This is the heart of it — Ronaldo's career is <em>structurally harder</em>. Messi mastered one tailor-made system. Ronaldo conquered four footballing worlds.</P>
        </Reveal>
        <Callout>A genius at home is impressive. A genius everywhere is undeniable.</Callout>

        {/* SECTION 3 */}
        <SectionHeading kicker="Section 3">Two Very Different Starting Lines</SectionHeading>
        <Reveal>
          <P>Greatness isn't just where you finish. It's how far you climbed.</P>
          <P><strong>Messi's path:</strong> scouted as a child, brought into the best academy in the world, given hormone treatment, surrounded by world-class teammates, handed a system built around his gifts. A smooth, protected rise.</P>
          <P><strong>Ronaldo's path:</strong> born poor on a tiny island, swept streets to help his family, left home at 12, lost his father to alcoholism, diagnosed with a heart condition at 15 — and still clawed his way to the top through sheer will. One man was handed a ladder. The other built his own.</P>
        </Reveal>
        <Callout>Talent opens the door. Relentlessness decides how far you walk through it.</Callout>

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
        </Reveal>
        <Reveal><UCLBars /></Reveal>
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
        </Reveal>
        <Callout>A World Cup proves a team peaked for a month. A career proves a man was great for twenty years.</Callout>

        {/* SECTION 8 */}
        <SectionHeading kicker="Section 8">One Inherited a Superpower. The Other Built One.</SectionHeading>
        <Reveal>
          <P>This is the part the trophy count hides completely. <strong>Argentina</strong> was already a football superpower — two World Cups and over a dozen Copa Américas <em>before Messi was even born</em>. He joined a giant.</P>
          <P><strong>Portugal</strong>, before Ronaldo, had qualified for just three World Cups in their entire history and had <strong>never won a major trophy</strong>. He dragged them to the <strong>Euro 2016 title</strong> and the Nations League crown <strong>twice (2019 and 2025)</strong>, became the <strong>highest international goalscorer in history (143 goals)</strong>, and is the <strong>all-time top scorer in the European Championship (14 goals)</strong>. He owns roughly <strong>22% of all the trophies Portugal has ever won</strong>. One man inherited a kingdom. The other built one from nothing.</P>
        </Reveal>
        <Callout>It's easy to be great for a giant. It's history to make a giant out of nothing.</Callout>

        {/* SECTION 9 */}
        <SectionHeading kicker="Section 9">The Comeback Nobody Talks About</SectionHeading>
        <Reveal>
          <P>In 2014, at 29, Ronaldo was diagnosed with patellar tendinosis — a degenerative knee condition that ends explosive athletes. His dribble goals collapsed from 9 to 2 in a single year. Most players fade here. Ronaldo <strong>rebuilt himself</strong> — six hours a day of rehab, retrained around single-leg stability, and tactically reinvented his game from a touchline winger into the deadliest penalty-box predator in the world.</P>
          <P>The result? Three straight Champions Leagues — something no club had done since 1976. Then the impossible: he scored <strong>more hat-tricks after turning 30 (34) than before it (30)</strong>. His post-30 haul alone beats the entire careers of Agüero, Ibrahimović, or Kane.</P>
        </Reveal>
        <Reveal><Age36Split /></Reveal>
        <Callout>He didn't fight age. He re-engineered himself to beat it.</Callout>

        {/* SECTION 10 */}
        <SectionHeading kicker="Section 10">It Should Be 6–6. Here's the Receipt.</SectionHeading>
        <Reveal>
          <P>The Ballon d'Or is football's top individual prize. The official count says Messi 8, Ronaldo 5. But three of those awards don't survive a look at the data. By performance, it should be <strong>6 apiece</strong>.</P>
        </Reveal>
        <Reveal><BallonRecount /></Reveal>
        <Reveal>
          <P><strong>2018</strong> — Ronaldo won his third straight UCL as its top scorer; Modrić didn't outproduce him. <strong>2021</strong> — Lewandowski broke a 49-year scoring record; one continental tournament shouldn't beat that. <strong>2023</strong> — Haaland's record treble was statistically the most dominant striker season ever. Strip out the narrative and popularity, and the gap closes to a tie.</P>
        </Reveal>
        <Callout>An award is a story we agree to tell. It isn't always the truth.</Callout>

        {/* CONCLUSION */}
        <SectionHeading kicker="The Verdict">Greatness That Travels</SectionHeading>
        <Reveal>
          <P>So here's where we land. If greatness is a spreadsheet, Messi wins. He's the more gifted natural footballer — and that's not up for debate.</P>
          <P>But if greatness is the ability to walk into <em>any</em> country, <em>any</em> system, <em>any</em> level of adversity — and still come out on top — then there's only one answer. Ronaldo conquered four leagues. Top-scored four nations. Rebuilt his body to beat time. Carried a country that had nothing before him. Owned the biggest stage in club football. Scored across five World Cups and three decades.</P>
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
            "Messi mastered a kingdom. Ronaldo conquered the world."
          </motion.blockquote>
          <p className="mt-4 text-sm" style={{ color: C.text2 }}>
            Stats measure what a player did. Greatness measures what he overcame.
          </p>
        </div>

        {/* Back link */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link to="/blogs" className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-smooth"
            style={{ background: `linear-gradient(90deg, ${C.cr7}, ${C.gold})`, color: "white" }}>
            <ArrowLeft className="h-4 w-4" /> More articles
          </Link>
        </div>
      </div>
    </article>
  );
}

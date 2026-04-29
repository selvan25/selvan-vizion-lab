import { motion } from "framer-motion";
import { Lightbulb, CheckCircle2, Quote as QuoteIcon } from "lucide-react";
import type { ContentBlock } from "@/data/blogs";
import { BarChart, LineChart, DonutChart, AreaChart } from "./Charts";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function BlockRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-7 text-lg leading-[1.85] text-foreground/90">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "heading":
            return (
              <Reveal key={i}>
                <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mt-6 mb-2">
                  {b.text}
                </h2>
              </Reveal>
            );
          case "paragraph":
            return (
              <Reveal key={i}>
                <p>{b.text}</p>
              </Reveal>
            );
          case "list":
            return (
              <Reveal key={i}>
                <ul className="space-y-3 my-4">
                  {b.items.map((it, j) => (
                    <li key={j} className="flex gap-3 items-start">
                      <CheckCircle2 className="h-5 w-5 mt-1 text-primary shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          case "code":
            return (
              <Reveal key={i}>
                <pre className="not-prose my-6 overflow-x-auto rounded-2xl glass-strong p-5 text-sm font-mono leading-relaxed">
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                    {b.language && (
                      <span className="ml-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        {b.language}
                      </span>
                    )}
                  </div>
                  <code className="text-foreground/90 whitespace-pre">{b.code}</code>
                </pre>
              </Reveal>
            );
          case "quote":
            return (
              <Reveal key={i}>
                <blockquote className="not-prose my-8 relative pl-6 md:pl-10 py-4">
                  <QuoteIcon className="absolute left-0 top-2 h-6 w-6 text-primary/60" />
                  <p className="font-display text-xl md:text-2xl italic leading-snug text-foreground/95">
                    "{b.text}"
                  </p>
                  {b.author && (
                    <footer className="mt-3 text-sm text-muted-foreground">— {b.author}</footer>
                  )}
                </blockquote>
              </Reveal>
            );
          case "callout":
            return (
              <Reveal key={i}>
                <div className="not-prose my-6 glass rounded-2xl p-5 border-l-2 border-primary flex gap-4">
                  <Lightbulb className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                  <div>
                    <p className="font-display font-semibold mb-1">{b.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          case "stats":
            return (
              <Reveal key={i}>
                <div className="not-prose my-8 grid sm:grid-cols-3 gap-4">
                  {b.items.map((s, j) => (
                    <div key={j} className="glass-strong rounded-2xl p-5 hover-lift">
                      <div className="font-display text-3xl font-bold text-gradient-primary">{s.value}</div>
                      <div className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.label}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            );
          case "chart": {
            const props = { title: b.title, subtitle: b.subtitle, data: b.data, unit: b.unit };
            if (b.chart === "bar") return <BarChart key={i} {...props} />;
            if (b.chart === "line") return <LineChart key={i} {...props} />;
            if (b.chart === "donut") return <DonutChart key={i} title={b.title} subtitle={b.subtitle} data={b.data} />;
            if (b.chart === "area") return <AreaChart key={i} {...props} />;
            return null;
          }
        }
      })}
    </div>
  );
}

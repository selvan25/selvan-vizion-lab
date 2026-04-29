import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { ParticlesBg } from "./ParticlesBg";

const roles = ["Data Analyst", "Insight Hunter", "Problem Solver", "Storyteller with Data"];

export function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % roles.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-hero">
      <div className="aurora" aria-hidden />
      <div className="absolute inset-0 grid-bg opacity-25 animate-grid" aria-hidden />
      <div className="noise" aria-hidden />
      <ParticlesBg />
      <div className="absolute -top-40 -right-32 w-[520px] h-[520px] rounded-full bg-primary/25 blur-3xl animate-orb" aria-hidden />
      <div className="absolute -bottom-40 -left-32 w-[520px] h-[520px] rounded-full bg-accent/25 blur-3xl animate-orb" style={{ animationDelay: "-7s" }} aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" aria-hidden />

      <div className="container relative mx-auto px-6 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium mb-8"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span>Personal blog & data journal</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight max-w-5xl"
        >
          <span className="block text-gradient-aurora">Selvan Rajan</span>
          <span className="block mt-3 h-[1.1em] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-muted-foreground font-medium">
            <AnimatePresence mode="wait">
              <motion.span
                key={roles[i]}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 0.5 }}
                className="inline-block text-gradient-primary"
              >
                {roles[i]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed"
        >
          I turn messy datasets into decisions that matter. This is where I write about the patterns,
          the dashboards, and the small automations that make analytics feel less like reporting and
          more like exploration.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            to="/blogs"
            className="group inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground rounded-full px-6 py-3.5 font-medium shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5 transition-smooth"
          >
            Read Blogs
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 glass rounded-full px-6 py-3.5 font-medium hover:bg-muted hover:-translate-y-0.5 transition-smooth"
          >
            Contact Me
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 grid grid-cols-3 gap-6 max-w-md"
        >
          {[
            { n: "5+", l: "Years analyzing" },
            { n: "120+", l: "Dashboards shipped" },
            { n: "∞", l: "Curiosity" },
          ].map((s) => (
            <div key={s.l} className="glass rounded-2xl p-4">
              <div className="text-2xl font-display font-bold text-gradient-primary">{s.n}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Brain, Compass, Sparkles, Workflow } from "lucide-react";

const cards = [
  { Icon: Brain, title: "Curious by default", text: "I ask why three times before I ask how." },
  { Icon: Compass, title: "Maps over reports", text: "Dashboards should guide, not just describe." },
  { Icon: Workflow, title: "Automate the boring", text: "If it happens twice, it deserves a script." },
  { Icon: Sparkles, title: "Insight is a craft", text: "Patience, pattern, then payoff." },
];

export function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">About</span>
          <h2 className="mt-4 text-4xl md:text-6xl font-display font-bold tracking-tight">
            Some people collect stamps.
            <br />
            <span className="text-gradient-primary">I collect patterns.</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6 text-lg text-muted-foreground leading-relaxed"
          >
            <p>
              I enjoy diving into messy data, uncovering hidden stories, and transforming numbers into
              decisions that actually matter.
            </p>
            <p>
              To me, dashboards are not just charts — <span className="text-foreground font-medium">they're maps</span>.
              Every spike, dip, and trend tells a story waiting to be discovered.
            </p>
            <p>
              When I'm not analyzing data, I'm usually thinking about smarter ways to solve problems,
              automate repetitive work, or turn complexity into clarity.
            </p>
            <p className="text-2xl font-display text-foreground italic">
              I don't just work with data. I play with it.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {cards.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, rotate: -1 }}
                className="glass rounded-2xl p-6 hover:shadow-glow transition-smooth"
              >
                <div className="inline-flex p-2.5 rounded-xl bg-gradient-primary shadow-glow mb-4">
                  <c.Icon className="h-4 w-4 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

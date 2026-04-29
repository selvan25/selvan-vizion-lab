import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Check } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="container mx-auto px-6 py-24"
    >
      <div className="relative overflow-hidden rounded-3xl glass-strong p-10 md:p-14">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-accent/30 blur-3xl" />
        <div className="relative grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-semibold">
              <Mail className="h-3.5 w-3.5" /> Newsletter
            </div>
            <h3 className="mt-3 text-3xl md:text-4xl font-display font-bold leading-tight">
              Get new essays in your inbox.
            </h3>
            <p className="mt-3 text-sm text-muted-foreground max-w-md">
              One thoughtful email a month. No spam, no fluff — just patterns worth sharing.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!email.includes("@")) return;
              setDone(true);
              setEmail("");
              setTimeout(() => setDone(false), 3000);
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@somewhere.com"
              maxLength={255}
              className="flex-1 glass rounded-full px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60"
            />
            <button
              type="submit"
              className="bg-gradient-primary text-primary-foreground rounded-full px-6 py-3.5 text-sm font-medium shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5 transition-smooth inline-flex items-center justify-center gap-2"
            >
              {done ? <><Check className="h-4 w-4" /> Subscribed</> : "Subscribe"}
            </button>
          </form>
        </div>
      </div>
    </motion.section>
  );
}

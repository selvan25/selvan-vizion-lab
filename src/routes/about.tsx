import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/site/About";
import { motion } from "framer-motion";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Selvan Rajan" },
      { name: "description", content: "About Selvan Rajan — data analyst, insight hunter, and writer about analytics and decision-making." },
      { property: "og:title", content: "About — Selvan Rajan" },
      { property: "og:description", content: "Curious, analytical, creative — meet the person behind the patterns." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="pt-32 pb-10 bg-hero">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 max-w-4xl text-center"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">About me</span>
        <h1 className="mt-4 text-5xl md:text-7xl font-display font-bold tracking-tight">
          Curious by <span className="text-gradient-primary">design</span>.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          A short story about why I do what I do — and why I think data deserves more than a glance.
        </p>
      </motion.div>
      <About />
    </div>
  );
}

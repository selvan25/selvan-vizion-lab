import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { BlogCard } from "@/components/site/BlogCard";
import { Newsletter } from "@/components/site/Newsletter";
import { blogs } from "@/data/blogs";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Selvan Rajan — Data Analyst & Storyteller" },
      { name: "description", content: "Personal site of Selvan Rajan — analyst, insight hunter, and writer about turning messy data into decisions that matter." },
      { property: "og:title", content: "Selvan Rajan — Data Analyst & Storyteller" },
      { property: "og:description", content: "Essays on analytics, dashboards, and the patterns hidden in everyday data." },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = blogs.slice(0, 3);
  return (
    <>
      <Hero />
      <About />
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between flex-wrap gap-4 mb-12"
        >
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Latest</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-display font-bold tracking-tight">
              Recent <span className="text-gradient-primary">writing</span>
            </h2>
          </div>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-smooth"
          >
            All posts <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((b, i) => (
            <BlogCard key={b.slug} blog={b} index={i} />
          ))}
        </div>
      </section>
      <Newsletter />
    </>
  );
}

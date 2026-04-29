import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { blogs, categories } from "@/data/blogs";
import { BlogCard } from "@/components/site/BlogCard";

export const Route = createFileRoute("/blogs/")({
  head: () => ({
    meta: [
      { title: "Blog — Selvan Rajan" },
      { name: "description", content: "Essays on analytics, dashboards, SQL, automation, and storytelling with data." },
      { property: "og:title", content: "Blog — Selvan Rajan" },
      { property: "og:description", content: "Essays on analytics, dashboards, and finding patterns in everyday data." },
    ],
  }),
  component: BlogsList,
});

function BlogsList() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState<"latest" | "oldest">("latest");

  const filtered = useMemo(() => {
    let list = blogs.filter(
      (b) =>
        (cat === "All" || b.category === cat) &&
        (q === "" ||
          b.title.toLowerCase().includes(q.toLowerCase()) ||
          b.description.toLowerCase().includes(q.toLowerCase())),
    );
    list = [...list].sort((a, b) => {
      const da = +new Date(a.date), db = +new Date(b.date);
      return sort === "latest" ? db - da : da - db;
    });
    return list;
  }, [q, cat, sort]);

  return (
    <div className="pt-32 pb-20 bg-hero min-h-screen">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Journal</span>
          <h1 className="mt-4 text-5xl md:text-7xl font-display font-bold tracking-tight">
            The <span className="text-gradient-primary">Blog</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Field notes from the intersection of curiosity and data.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-12 glass-strong rounded-2xl p-4 flex flex-col lg:flex-row gap-3 items-stretch lg:items-center"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search articles..."
              maxLength={100}
              className="w-full bg-transparent rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-smooth ${
                  cat === c
                    ? "bg-gradient-primary text-primary-foreground shadow-glow"
                    : "glass hover:bg-muted"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "latest" | "oldest")}
            className="glass rounded-xl px-4 py-2.5 text-sm bg-card/50 focus:outline-none"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </motion.div>

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((b, i) => (
            <BlogCard key={b.slug} blog={b} index={i} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="mt-20 text-center text-muted-foreground">
            No articles match your search.
          </div>
        )}
      </div>
    </div>
  );
}

import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import type { Blog } from "@/data/blogs";

export function BlogCard({ blog, index = 0 }: { blog: Blog; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay: (index % 6) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group h-full"
    >
      <Link
        to="/blogs/$slug"
        params={{ slug: blog.slug }}
        className="card-tilt ring-gradient block glass rounded-3xl overflow-hidden h-full"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={blog.cover}
            alt={blog.title}
            loading="lazy"
            width={1280}
            height={800}
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-[900ms] ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_120%,oklch(0.72_0.20_285_/_0.45),transparent_60%)]" />
          <span className="absolute top-4 left-4 glass-strong text-[11px] font-medium px-3 py-1 rounded-full tracking-wide">
            {blog.category}
          </span>
          <div className="absolute top-4 right-4 glass-strong p-2 rounded-full opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
        <div className="p-6">
          <h3 className="font-display font-semibold text-xl leading-snug group-hover:text-gradient-primary transition-smooth">
            {blog.title}
          </h3>
          <p className="mt-3 text-sm text-muted-foreground line-clamp-2 leading-relaxed">{blog.description}</p>
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {blog.tags.slice(0, 3).map((t) => (
                <span key={t} className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/80 bg-muted/40 rounded-full px-2 py-0.5">
                  {t}
                </span>
              ))}
            </div>
          )}
          <div className="mt-5 pt-5 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
            <span>{blog.date}</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3 w-3" />
              {blog.readTime}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

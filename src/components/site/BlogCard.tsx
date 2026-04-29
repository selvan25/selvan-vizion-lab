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
      transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link
        to="/blogs/$slug"
        params={{ slug: blog.slug }}
        className="block glass rounded-3xl overflow-hidden hover:shadow-glow transition-smooth h-full"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={blog.cover}
            alt={blog.title}
            loading="lazy"
            width={1280}
            height={768}
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
          <span className="absolute top-4 left-4 glass-strong text-xs font-medium px-3 py-1 rounded-full">
            {blog.category}
          </span>
          <div className="absolute top-4 right-4 glass-strong p-2 rounded-full opacity-0 group-hover:opacity-100 transition-smooth">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
        <div className="p-6">
          <h3 className="font-display font-semibold text-xl leading-snug group-hover:text-gradient-primary transition-smooth">
            {blog.title}
          </h3>
          <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{blog.description}</p>
          <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
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

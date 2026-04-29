import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Share2, Twitter, Linkedin, Link as LinkIcon, Sparkles, Target, Tag } from "lucide-react";
import { blogs } from "@/data/blogs";
import { BlogCard } from "@/components/site/BlogCard";
import { BlockRenderer } from "@/components/site/BlockRenderer";

export const Route = createFileRoute("/blogs/$slug")({
  loader: ({ params }) => {
    const blog = blogs.find((b) => b.slug === params.slug);
    if (!blog) throw notFound();
    return { blog };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.blog.title} — Selvan Rajan` },
          { name: "description", content: loaderData.blog.description },
          { property: "og:title", content: loaderData.blog.title },
          { property: "og:description", content: loaderData.blog.description },
          { property: "og:image", content: loaderData.blog.cover },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:image", content: loaderData.blog.cover },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="pt-40 pb-20 text-center">
      <h1 className="text-4xl font-display font-bold">Article not found</h1>
      <Link to="/blogs" className="mt-4 inline-block text-primary">← Back to blog</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="pt-40 pb-20 text-center">
      <p className="text-destructive">{error.message}</p>
    </div>
  ),
  component: BlogPost,
});

function BlogPost() {
  const { blog } = Route.useLoaderData();
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [blog.slug]);

  const related = blogs.filter((b) => b.slug !== blog.slug && b.category === blog.category).slice(0, 3);
  const fallback = blogs.filter((b) => b.slug !== blog.slug).slice(0, 3);
  const relatedList = related.length ? related : fallback;

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const copyLink = () => {
    navigator.clipboard?.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <article>
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-primary z-[60] transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />

      <div className="relative pt-28">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth"
          >
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8"
          >
            <span className="inline-block glass rounded-full px-3 py-1 text-xs font-medium">{blog.category}</span>
            <h1 className="mt-5 text-4xl md:text-6xl font-display font-bold tracking-tight leading-[1.05]">
              {blog.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span>{blog.date}</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {blog.readTime}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Share2 className="h-3.5 w-3.5" /> Share:
              </span>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank" rel="noreferrer"
                className="glass rounded-full p-2 hover:shadow-glow transition-smooth"
              >
                <Twitter className="h-3.5 w-3.5" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank" rel="noreferrer"
                className="glass rounded-full p-2 hover:shadow-glow transition-smooth"
              >
                <Linkedin className="h-3.5 w-3.5" />
              </a>
              <button onClick={copyLink} className="glass rounded-full p-2 hover:shadow-glow transition-smooth">
                <LinkIcon className="h-3.5 w-3.5" />
              </button>
              {copied && <span className="text-xs text-primary">Copied!</span>}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="container mx-auto px-6 max-w-5xl mt-12"
        >
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-elegant">
            <img src={blog.cover} alt={blog.title} width={1280} height={720} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </div>
        </motion.div>

        <div className="container mx-auto px-6 max-w-3xl py-16">
          <div className="space-y-6 text-lg leading-[1.8] text-foreground/90">
            {blog.content.map((p: string, i: number) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>

        <section className="container mx-auto px-6 py-16">
          <h2 className="text-3xl font-display font-bold mb-8">
            Related <span className="text-gradient-primary">reads</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedList.map((b, i) => (
              <BlogCard key={b.slug} blog={b} index={i} />
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}

// src/components/BlogEngagement.tsx
import { useState, useEffect } from "react";
import { Heart, Eye, MessageCircle, Send, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Comment {
  id: number;
  author: string;
  content: string;
  created_at: string;
}

interface Stats {
  views: number;
  likes: number;
  comments: number;
}

interface Props {
  slug: string;
  /** Full page URL override — defaults to window.location.href */
  pageUrl?: string;
  /** Blog title for share text */
  title?: string;
  /** OG image URL for Instagram Stories sticker */
  coverImageUrl?: string;
}

export function BlogEngagement({ slug, pageUrl, title, coverImageUrl }: Props) {
  const API = "https://selvan-blog-api.selvanrajan143.workers.dev";

  const [stats, setStats] = useState<Stats>({ views: 0, likes: 0, comments: 0 });
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [instagramTip, setInstagramTip] = useState(false);

  const shareUrl =
    pageUrl ??
    (typeof window !== "undefined" ? window.location.href : `https://selvan-vizion-lab.selvanrajan143.workers.dev/blogs/${slug}`);

  // ── On mount: restore like state + fetch stats + fire view ──
  useEffect(() => {
    const hasLiked = localStorage.getItem(`liked:${slug}`) === "1";
    setLiked(hasLiked);

    fetch(`${API}/stats?slug=${slug}`)
      .then((r) => r.json())
      .then((data: Stats) => setStats(data))
      .catch(() => {});

    fetch(`${API}/view?slug=${slug}`, { method: "POST" }).catch(() => {});
  }, [slug]);

  // ── Like handler ─────────────────────────────────────────────
  const handleLike = async () => {
    if (liked) return;
    setLiked(true);
    localStorage.setItem(`liked:${slug}`, "1");
    setStats((s) => ({ ...s, likes: s.likes + 1 }));
    try {
      const res = await fetch(`${API}/like?slug=${slug}`, { method: "POST" });
      const data = await res.json() as { likes: number };
      setStats((s) => ({ ...s, likes: data.likes }));
    } catch {
      // optimistic update already applied
    }
  };

  // ── Comments ─────────────────────────────────────────────────
  const loadComments = async () => {
    try {
      const res = await fetch(`${API}/comments?slug=${slug}`);
      const data = await res.json() as Comment[];
      setComments(data);
      setShowComments(true);
    } catch {
      setShowComments(true);
    }
  };

  const toggleComments = () => {
    if (showComments) {
      setShowComments(false);
    } else {
      loadComments();
    }
  };

  const submitComment = async () => {
    if (!content.trim() || submitting) return;
    setSubmitting(true);
    try {
      await fetch(`${API}/comments?slug=${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author: author.trim() || "Anonymous", content: content.trim() }),
      });
      setContent("");
      setStats((s) => ({ ...s, comments: s.comments + 1 }));
      await loadComments();
    } catch {
      // silent fail
    } finally {
      setSubmitting(false);
    }
  };

  // ── Instagram Stories share ──────────────────────────────────
  // Instagram does not support a universal deep-link for web sharing into Stories.
  // The only reliable approach for web is:
  //   1. On mobile Instagram app: use the navigator.share() Web Share API which
  //      on iOS/Android lets users pick Instagram Stories as a target.
  //   2. As fallback: show a tooltip explaining how to share manually.
  const handleInstagramShare = async () => {
    // Web Share API — works on mobile Safari / Chrome (iOS & Android)
    // User can then pick "Instagram" → "Add to Story" from the share sheet
    if (navigator.share) {
      try {
        await navigator.share({
          title: title ?? "Check out this article",
          text: `${title ?? "An interesting read"} — `,
          url: shareUrl,
        });
        return;
      } catch {
        // User dismissed or share failed — fall through to tooltip
      }
    }
    // Desktop or unsupported: show how-to tip
    setInstagramTip(true);
    setTimeout(() => setInstagramTip(false), 5000);
  };

  return (
    <div
      className="mt-10 rounded-2xl p-5 sm:p-6"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      {/* ── Stats + action bar ── */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">

        {/* Like button */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={handleLike}
          disabled={liked}
          className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all"
          style={{
            background: liked ? "#EF444418" : "var(--muted)",
            color: liked ? "#EF4444" : "var(--muted-foreground)",
            border: `1px solid ${liked ? "#EF4444" : "var(--border)"}`,
            cursor: liked ? "not-allowed" : "pointer",
          }}
        >
          <Heart className="h-4 w-4" fill={liked ? "#EF4444" : "none"} strokeWidth={liked ? 0 : 2} />
          <span>{stats.likes} {stats.likes === 1 ? "Like" : "Likes"}</span>
        </motion.button>

        {/* Views (read-only) */}
        <span
          className="flex items-center gap-2 text-sm"
          style={{ color: "var(--muted-foreground)" }}
        >
          <Eye className="h-4 w-4" />
          {stats.views.toLocaleString()} views
        </span>

        {/* Comments toggle */}
        <button
          onClick={toggleComments}
          className="flex items-center gap-2 text-sm transition-opacity hover:opacity-80"
          style={{ color: "var(--muted-foreground)" }}
        >
          <MessageCircle className="h-4 w-4" />
          {stats.comments} {stats.comments === 1 ? "comment" : "comments"}
        </button>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Instagram Stories share */}
        <div className="relative">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleInstagramShare}
            className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-all hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
              color: "white",
            }}
            title="Share to Instagram Stories"
          >
            <Instagram className="h-4 w-4" />
            <span className="hidden sm:inline">Share to Story</span>
          </motion.button>

          {/* Desktop / fallback tooltip */}
          <AnimatePresence>
            {instagramTip && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                className="absolute bottom-full right-0 mb-2 w-64 rounded-2xl p-4 text-xs shadow-xl z-50"
                style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }}
              >
                <p className="font-semibold mb-2" style={{ color: "var(--foreground)" }}>
                  📱 Share to Instagram Stories
                </p>
                <ol className="space-y-1.5" style={{ color: "var(--muted-foreground)" }}>
                  <li>1. Open Instagram on your phone</li>
                  <li>2. Tap ＋ → Story → Link sticker</li>
                  <li>3. Paste this link:</li>
                </ol>
                <div
                  className="mt-2 rounded-lg px-3 py-2 font-mono text-[11px] break-all select-all"
                  style={{ background: "var(--muted)", color: "var(--foreground)" }}
                >
                  {shareUrl}
                </div>
                <p className="mt-2 italic text-[10px]" style={{ color: "var(--muted-foreground)" }}>
                  Tap the URL above to copy it.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Comments section ── */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-6 space-y-4">
              {/* Input form */}
              <div
                className="rounded-2xl p-4 space-y-3"
                style={{ background: "var(--muted)", border: "1px solid var(--border)" }}
              >
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  maxLength={50}
                  className="w-full rounded-xl px-3 py-2 text-sm outline-none"
                  style={{
                    background: "var(--card)",
                    color: "var(--foreground)",
                    border: "1px solid var(--border)",
                  }}
                />
                <textarea
                  placeholder="Leave a comment…"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={3}
                  maxLength={1000}
                  className="w-full rounded-xl px-3 py-2 text-sm outline-none resize-none"
                  style={{
                    background: "var(--card)",
                    color: "var(--foreground)",
                    border: "1px solid var(--border)",
                  }}
                />
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px]" style={{ color: "var(--muted-foreground)" }}>
                    {content.length}/1000
                  </span>
                  <button
                    onClick={submitComment}
                    disabled={submitting || !content.trim()}
                    className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all disabled:opacity-40"
                    style={{
                      background: "linear-gradient(90deg, #F4A026, #00B4A6)",
                      color: "white",
                    }}
                  >
                    <Send className="h-3.5 w-3.5" />
                    {submitting ? "Posting…" : "Post comment"}
                  </button>
                </div>
              </div>

              {/* Comment list */}
              {comments.length === 0 ? (
                <p
                  className="text-sm text-center py-6"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  No comments yet — be the first to share your thoughts!
                </p>
              ) : (
                <div className="space-y-3">
                  {comments.map((c) => (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-2xl p-4"
                      style={{
                        background: "var(--muted)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <div className="flex items-center justify-between mb-2 gap-2">
                        <span
                          className="text-sm font-semibold truncate"
                          style={{ color: "var(--foreground)" }}
                        >
                          {c.author}
                        </span>
                        <span
                          className="text-[11px] shrink-0"
                          style={{ color: "var(--muted-foreground)" }}
                        >
                          {new Date(c.created_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        {c.content}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// src/components/BlogEngagement.tsx
import { useState, useEffect } from "react";
import { Heart, Eye, MessageCircle, Send } from "lucide-react";

interface Props { slug: string; }

export function BlogEngagement({ slug }: Props) {
  const [stats, setStats] = useState({ views: 0, likes: 0, comments: 0 });
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showComments, setShowComments] = useState(false);

  // Track view + fetch stats on mount
  useEffect(() => {
    const hasLiked = localStorage.getItem(`liked:${slug}`) === "1";
    setLiked(hasLiked);

    fetch(`/api/stats?slug=${slug}`).then(r => r.json()).then(setStats);
    fetch(`/api/view?slug=${slug}`, { method: "POST" });
  }, [slug]);

  const handleLike = async () => {
    if (liked) return;
    setLiked(true);
    localStorage.setItem(`liked:${slug}`, "1");
    const res = await fetch(`/api/like?slug=${slug}`, { method: "POST" });
    const data = await res.json();
    setStats(s => ({ ...s, likes: data.likes }));
  };

  const loadComments = async () => {
    const res = await fetch(`/api/comments?slug=${slug}`);
    setComments(await res.json());
    setShowComments(true);
  };

  const submitComment = async () => {
    if (!content.trim()) return;
    setSubmitting(true);
    await fetch(`/api/comments?slug=${slug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author: author || "Anonymous", content }),
    });
    setContent("");
    setSubmitting(false);
    setStats(s => ({ ...s, comments: s.comments + 1 }));
    loadComments();
  };

  return (
    <div className="mt-10 border-t pt-8" style={{ borderColor: "var(--border)" }}>
      {/* Stats row */}
      <div className="flex items-center gap-6 flex-wrap">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${liked ? "opacity-60 cursor-not-allowed" : "hover:scale-105"}`}
          style={{
            background: liked ? "#EF444422" : "var(--muted)",
            color: liked ? "#EF4444" : "var(--muted-foreground)",
            border: `1px solid ${liked ? "#EF4444" : "var(--border)"}`,
          }}
          disabled={liked}
        >
          <Heart className="h-4 w-4" fill={liked ? "#EF4444" : "none"} />
          {stats.likes} {stats.likes === 1 ? "Like" : "Likes"}
        </button>

        <span className="flex items-center gap-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
          <Eye className="h-4 w-4" /> {stats.views.toLocaleString()} views
        </span>

        <button
          onClick={showComments ? () => setShowComments(false) : loadComments}
          className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
          style={{ color: "var(--muted-foreground)" }}
        >
          <MessageCircle className="h-4 w-4" /> {stats.comments} {stats.comments === 1 ? "comment" : "comments"}
        </button>
      </div>

      {/* Comments section */}
      {showComments && (
        <div className="mt-6 space-y-4">
          {/* Comment input */}
          <div className="rounded-2xl p-4 space-y-3" style={{ background: "var(--card)" }}>
            <input
              type="text"
              placeholder="Your name (optional)"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              className="w-full rounded-xl px-3 py-2 text-sm outline-none"
              style={{ background: "var(--muted)", color: "var(--foreground)", border: "1px solid var(--border)" }}
            />
            <textarea
              placeholder="Leave a comment..."
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={3}
              className="w-full rounded-xl px-3 py-2 text-sm outline-none resize-none"
              style={{ background: "var(--muted)", color: "var(--foreground)", border: "1px solid var(--border)" }}
            />
            <button
              onClick={submitComment}
              disabled={submitting || !content.trim()}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all disabled:opacity-50"
              style={{ background: "linear-gradient(90deg, #F4A026, #00B4A6)", color: "white" }}
            >
              <Send className="h-3.5 w-3.5" /> {submitting ? "Posting..." : "Post comment"}
            </button>
          </div>

          {/* Comment list */}
          {comments.length === 0 ? (
            <p className="text-sm text-center py-4" style={{ color: "var(--muted-foreground)" }}>
              No comments yet — be the first!
            </p>
          ) : (
            comments.map((c: any) => (
              <div key={c.id} className="rounded-2xl p-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{c.author}</span>
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                    {new Date(c.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{c.content}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

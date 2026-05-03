// src/api.ts

export async function handleAPI(request: Request, env: Env): Promise<Response | null> {
  const url = new URL(request.url);
  const path = url.pathname;

  // CORS headers
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  // ── Track page view ──────────────────────────────────────────
  // POST /api/view?slug=delimitation-816-seats
  if (path === "/api/view" && request.method === "POST") {
    const slug = url.searchParams.get("slug") || "home";
    const key = `views:${slug}`;
    const current = parseInt(await env.BLOG_STATS.get(key) || "0");
    await env.BLOG_STATS.put(key, String(current + 1));
    return new Response(JSON.stringify({ views: current + 1 }), { headers });
  }

  // GET /api/stats?slug=delimitation-816-seats
  if (path === "/api/stats" && request.method === "GET") {
    const slug = url.searchParams.get("slug") || "home";
    const views = parseInt(await env.BLOG_STATS.get(`views:${slug}`) || "0");
    const likes = parseInt(await env.BLOG_STATS.get(`likes:${slug}`) || "0");
    const commentCount = await env.DB
      .prepare("SELECT COUNT(*) as count FROM comments WHERE slug = ?")
      .bind(slug).first<{ count: number }>();
    return new Response(JSON.stringify({
      views,
      likes,
      comments: commentCount?.count ?? 0
    }), { headers });
  }

  // ── Toggle like ──────────────────────────────────────────────
  // POST /api/like?slug=delimitation-816-seats
  if (path === "/api/like" && request.method === "POST") {
    const slug = url.searchParams.get("slug") || "";
    const key = `likes:${slug}`;
    const current = parseInt(await env.BLOG_STATS.get(key) || "0");
    const newVal = current + 1;
    await env.BLOG_STATS.put(key, String(newVal));
    return new Response(JSON.stringify({ likes: newVal }), { headers });
  }

  // ── Get comments ─────────────────────────────────────────────
  // GET /api/comments?slug=delimitation-816-seats
  if (path === "/api/comments" && request.method === "GET") {
    const slug = url.searchParams.get("slug") || "";
    const results = await env.DB
      .prepare("SELECT id, author, content, created_at FROM comments WHERE slug = ? ORDER BY created_at DESC LIMIT 50")
      .bind(slug).all();
    return new Response(JSON.stringify(results.results), { headers });
  }

  // ── Post comment ──────────────────────────────────────────────
  // POST /api/comments?slug=delimitation-816-seats
  if (path === "/api/comments" && request.method === "POST") {
    const slug = url.searchParams.get("slug") || "";
    const body = await request.json() as { author?: string; content?: string };
    const author = (body.author || "Anonymous").slice(0, 50);
    const content = (body.content || "").trim().slice(0, 1000);
    if (!content) {
      return new Response(JSON.stringify({ error: "Comment cannot be empty" }), { status: 400, headers });
    }
    await env.DB
      .prepare("INSERT INTO comments (slug, author, content) VALUES (?, ?, ?)")
      .bind(slug, author, content).run();
    return new Response(JSON.stringify({ success: true }), { headers });
  }

  return null; // Not an API route — let app handle it
}

interface Env {
  BLOG_STATS: KVNamespace;
  DB: D1Database;
}

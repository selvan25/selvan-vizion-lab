// src/api.ts
// Cloudflare Worker API handler — intercepts /api/* routes for likes, views, and comments.

export interface Env {
  BLOG_STATS: {
    get(key: string): Promise<string | null>;
    put(key: string, value: string): Promise<void>;
  };
  DB: {
    prepare(sql: string): {
      bind(...args: unknown[]): {
        first<T>(): Promise<T | null>;
        all(): Promise<{ results: unknown[] }>;
        run(): Promise<void>;
      };
    };
  };
}

const CORS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: CORS });
}

export async function handleAPI(request: Request, env: Env): Promise<Response | null> {
  const url = new URL(request.url);
  const path = url.pathname;

  // Preflight
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS });
  }

  // ── POST /api/view?slug=xxx ─────────────────────────────────
  // Called once per page load; increments view counter in KV
  if (path === "/api/view" && request.method === "POST") {
    const slug = url.searchParams.get("slug") || "home";
    const key = `views:${slug}`;
    const current = parseInt((await env.BLOG_STATS.get(key)) ?? "0");
    await env.BLOG_STATS.put(key, String(current + 1));
    return json({ views: current + 1 });
  }

  // ── GET /api/stats?slug=xxx ─────────────────────────────────
  // Returns views, likes, and comment count for a given slug
  if (path === "/api/stats" && request.method === "GET") {
    const slug = url.searchParams.get("slug") || "home";
    const [views, likes, row] = await Promise.all([
      env.BLOG_STATS.get(`views:${slug}`).then((v: string | null) => parseInt(v ?? "0")),
      env.BLOG_STATS.get(`likes:${slug}`).then((v: string | null) => parseInt(v ?? "0")),
      env.DB
        .prepare("SELECT COUNT(*) AS count FROM comments WHERE slug = ?")
        .bind(slug)
        .first<{ count: number }>(),
    ]);
    return json({ views, likes, comments: row?.count ?? 0 });
  }

  // ── POST /api/like?slug=xxx ─────────────────────────────────
  // Increments like counter (client enforces one-per-user via localStorage)
  if (path === "/api/like" && request.method === "POST") {
    const slug = url.searchParams.get("slug") || "";
    const key = `likes:${slug}`;
    const current = parseInt((await env.BLOG_STATS.get(key)) ?? "0");
    const next = current + 1;
    await env.BLOG_STATS.put(key, String(next));
    return json({ likes: next });
  }

  // ── GET /api/comments?slug=xxx ──────────────────────────────
  // Returns latest 50 comments for a slug, newest first
  if (path === "/api/comments" && request.method === "GET") {
    const slug = url.searchParams.get("slug") || "";
    const result = await env.DB
      .prepare(
        "SELECT id, author, content, created_at FROM comments WHERE slug = ? ORDER BY created_at DESC LIMIT 50"
      )
      .bind(slug)
      .all();
    return json(result.results);
  }

  // ── POST /api/comments?slug=xxx ─────────────────────────────
  // Inserts a new comment for a slug
  if (path === "/api/comments" && request.method === "POST") {
    const slug = url.searchParams.get("slug") || "";
    if (!slug) return json({ error: "Missing slug" }, 400);

    let body: { author?: string; content?: string };
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON body" }, 400);
    }

    const author = (body.author || "Anonymous").trim().slice(0, 50);
    const content = (body.content || "").trim().slice(0, 1000);

    if (!content) return json({ error: "Comment cannot be empty" }, 400);

    await env.DB
      .prepare("INSERT INTO comments (slug, author, content) VALUES (?, ?, ?)")
      .bind(slug, author, content)
      .run();

    return json({ success: true });
  }

  // Not an API route we handle
  return null;
}

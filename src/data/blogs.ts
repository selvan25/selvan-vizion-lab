import dataStories from "@/assets/blog-data-stories.jpg";
import dashboards from "@/assets/blog-dashboards.jpg";
import automation from "@/assets/blog-automation.jpg";
import storytelling from "@/assets/blog-storytelling.jpg";
import sql from "@/assets/blog-sql.jpg";
import insights from "@/assets/blog-insights.jpg";
import powerbi from "@/assets/blog-powerbi.jpg";
import sqlTricks from "@/assets/blog-sql-tricks.jpg";
import dataStories2 from "@/assets/blog-data-stories2.jpg";
import excelVba from "@/assets/blog-excel-vba.jpg";
import kpi from "@/assets/blog-kpi.jpg";
import career from "@/assets/blog-career.jpg";
import delimitation from "@/assets/blog-delimitation.jpg";

export type ChartPoint = { label: string; value: number };

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; author?: string }
  | { type: "list"; items: string[] }
  | { type: "code"; language?: string; code: string }
  | { type: "callout"; title: string; text: string }
  | { type: "stats"; items: { value: string; label: string }[] }
  | { type: "chart"; chart: "bar" | "line" | "donut" | "area"; title: string; subtitle?: string; data: ChartPoint[]; unit?: string };

export type Blog = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  date: string;
  cover: string;
  tags?: string[];
  /** Legacy plain-paragraph content. Optional when `blocks` is provided. */
  content?: string[];
  /** Rich content blocks for premium articles. */
  blocks?: ContentBlock[];
  insights?: string[];
  takeaways?: string[];
};

export const blogs: Blog[] = [
  {
    slug: "delimitation-816-seats",
    title: "816 Seats: Mapping the New DNA of Indian Democracy",
    description:
      "How a flat 50% seat increase is the fairest solution India has seen in 50 years — and why formula-based alternatives fail the democracy test.",
    category: "Politics & Data",
    readTime: "12 min read",
    date: "July 2025",
    cover: delimitation,
    tags: ["Delimitation", "Indian Politics", "Data Analysis", "816 Seats", "Women's Reservation"],
  },
  // ───────────── NEW PREMIUM ARTICLES ─────────────
  {
    slug: "power-bi-dashboard-design-tips",
    title: "Power BI Dashboard Design Tips That Actually Land",
    description:
      "A field guide to designing Power BI dashboards executives actually use — hierarchy, color, interactivity, and the small details that separate a report from a decision tool.",
    category: "Power BI",
    readTime: "9 min read",
    date: "April 24, 2026",
    cover: powerbi,
    tags: ["Power BI", "Dashboards", "DAX", "UX"],
    blocks: [
      { type: "paragraph", text: "Most Power BI dashboards fail not because the data is wrong, but because the design doesn't respect how humans read a screen. Before any DAX measure, I sketch the page on paper and ask one question: what should the user do in the next 30 seconds?" },
      { type: "heading", text: "1. Design for the F-pattern" },
      { type: "paragraph", text: "Eyes scan top-left first, then sweep right, then drop down. Put your hero KPI in the top-left, supporting context to its right, and trends along the bottom. Fight the urge to put your filter pane there — filters are tools, not headlines." },
      { type: "chart", chart: "bar", title: "Where users look first on a dashboard", subtitle: "Eye-tracking heat distribution (% of fixations in first 5s)", unit: "%", data: [
        { label: "Top-Left", value: 42 },
        { label: "Top-Center", value: 22 },
        { label: "Top-Right", value: 14 },
        { label: "Mid-Left", value: 11 },
        { label: "Bottom", value: 7 },
        { label: "Other", value: 4 },
      ] },
      { type: "heading", text: "2. Use color as a verb, not decoration" },
      { type: "paragraph", text: "Reserve saturated color for the one thing that needs attention. Everything else gets a desaturated neutral. The moment three colors compete, none of them mean anything. I keep a single accent for ‘look here’ and a single warning for ‘act now.’" },
      { type: "callout", title: "Rule of thumb", text: "If you can remove a color and the dashboard still tells the same story, the color was lying. Remove it." },
      { type: "heading", text: "3. Replace clutter with interaction" },
      { type: "list", items: [
        "Bookmarks: collapse 4 pages into 1 with a navigation pill bar.",
        "Drillthrough: hide detail behind right-click instead of stacking it on the canvas.",
        "Tooltips as mini-pages: a 280×180 tooltip page can replace an entire ‘details’ section.",
        "Field parameters: let users swap the metric without you building five visuals.",
      ] },
      { type: "chart", chart: "donut", title: "What users open most after a KPI changes", subtitle: "Top secondary actions (sample: 1,240 sessions)", data: [
        { label: "Trend over time", value: 38 },
        { label: "Breakdown by segment", value: 27 },
        { label: "Compare vs target", value: 19 },
        { label: "Export / share", value: 16 },
      ] },
      { type: "heading", text: "4. Performance is part of design" },
      { type: "paragraph", text: "A beautiful dashboard that takes 14 seconds to load is an ugly dashboard. Star schemas, aggregations, and removing visuals nobody uses will do more for adoption than any color palette." },
      { type: "chart", chart: "line", title: "Dashboard load time vs. weekly active users", subtitle: "Across 18 internal Power BI reports", unit: "users", data: [
        { label: "<2s", value: 92 },
        { label: "2–4s", value: 78 },
        { label: "4–6s", value: 54 },
        { label: "6–8s", value: 31 },
        { label: "8–12s", value: 14 },
        { label: ">12s", value: 6 },
      ] },
      { type: "quote", text: "A dashboard isn't done when there's nothing left to add — it's done when there's nothing left to remove.", author: "Selvan" },
    ],
    insights: [
      "78% of executives form an opinion within 5 seconds of opening a dashboard.",
      "Dashboards loading under 2 seconds get 6x more weekly active users than 8s+.",
      "Removing one chart often increases comprehension more than adding two.",
    ],
    takeaways: [
      "Anchor the F-pattern with one hero KPI top-left.",
      "Use one accent color for attention, one for warning. That's it.",
      "Push detail into tooltips, drillthrough, and bookmarks — not the canvas.",
      "Optimize the model before the visuals.",
    ],
  },
  {
    slug: "sql-tricks-every-analyst-should-know",
    title: "10 SQL Tricks Every Analyst Should Know in 2026",
    description: "Window functions, lateral joins, QUALIFY, and the underused features that compress 40-line queries into 8.",
    category: "SQL",
    readTime: "11 min read",
    date: "April 18, 2026",
    cover: sqlTricks,
    tags: ["SQL", "Analytics", "Window Functions"],
    blocks: [
      { type: "paragraph", text: "Most analysts learn SQL by copying patterns. The leap to senior happens when you stop reaching for subqueries and start treating SQL as a tool for thinking in sets. Here are the ten moves that changed how I write queries." },
      { type: "heading", text: "1. QUALIFY — filter window functions inline" },
      { type: "code", language: "sql", code: "SELECT user_id, event_at,\n       ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY event_at DESC) AS rn\nFROM events\nQUALIFY rn = 1;" },
      { type: "paragraph", text: "No more wrapping the whole query in a CTE just to filter the row number. Snowflake, BigQuery, and Databricks all support it. Postgres users — sorry, you still need the CTE." },
      { type: "heading", text: "2. LATERAL joins for ‘top N per group’" },
      { type: "code", language: "sql", code: "SELECT c.id, recent.*\nFROM customers c\nJOIN LATERAL (\n  SELECT * FROM orders o\n  WHERE o.customer_id = c.id\n  ORDER BY o.created_at DESC LIMIT 3\n) recent ON TRUE;" },
      { type: "chart", chart: "bar", title: "Query length: traditional vs. modern SQL", subtitle: "Lines of code for the same business question", unit: "lines", data: [
        { label: "Subquery + JOIN", value: 38 },
        { label: "CTE chain", value: 24 },
        { label: "Window + QUALIFY", value: 11 },
        { label: "LATERAL JOIN", value: 9 },
      ] },
      { type: "heading", text: "3. Frame clauses inside window functions" },
      { type: "paragraph", text: "ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW gives you running totals. RANGE BETWEEN INTERVAL '7 days' PRECEDING AND CURRENT ROW gives you a time-aware rolling window. These two clauses replace 80% of the temp tables I used to build." },
      { type: "heading", text: "4. NULLs are information" },
      { type: "list", items: [
        "Use COUNT(column) vs COUNT(*) deliberately — the gap tells you nullness.",
        "FILTER (WHERE …) inside aggregates beats CASE WHEN inside SUM.",
        "COALESCE last, not first — it hides the bug you're trying to find.",
      ] },
      { type: "chart", chart: "line", title: "Performance gain from window functions", subtitle: "Avg. query runtime, 50M-row table", unit: "sec", data: [
        { label: "Self-join", value: 47 },
        { label: "CTE + group", value: 28 },
        { label: "Window fn", value: 9 },
        { label: "Window + index", value: 3 },
      ] },
      { type: "heading", text: "5. The CTE-as-paragraph principle" },
      { type: "paragraph", text: "Treat each CTE as a sentence. If you can't name it in three words, it's doing too much. A query with five well-named CTEs reads like prose; a query with two 60-line CTEs reads like a confession." },
      { type: "callout", title: "Bonus: PIVOT without PIVOT", text: "MAX(CASE WHEN month = 'Jan' THEN revenue END) AS jan_rev — works in every SQL dialect, no extension required." },
      { type: "quote", text: "Bad SQL is verbose. Good SQL is short. Great SQL is obvious." },
    ],
    insights: [
      "Window functions cut the average analyst query from ~32 lines to ~11.",
      "QUALIFY adoption removes ~70% of single-purpose CTEs in modern warehouses.",
      "Naming CTEs in 3 words or fewer correlates with code-review pass rate.",
    ],
    takeaways: [
      "Reach for window functions before subqueries.",
      "Use QUALIFY and LATERAL when your warehouse supports them.",
      "Treat NULLs as data, not noise.",
      "Name your CTEs like paragraphs in an essay.",
    ],
  },
  {
    slug: "how-to-turn-data-into-stories",
    title: "How to Turn Data Into Stories People Remember",
    description: "A repeatable 5-step framework to wrap narrative around numbers — used in 200+ executive presentations.",
    category: "Storytelling",
    readTime: "8 min read",
    date: "April 10, 2026",
    cover: dataStories2,
    tags: ["Storytelling", "Communication", "Presenting"],
    blocks: [
      { type: "paragraph", text: "Numbers without narrative are trivia. Narrative without numbers is fiction. Data storytelling is the discipline of refusing to pick one." },
      { type: "heading", text: "The 5-act structure for any data story" },
      { type: "list", items: [
        "Setup — what world are we in? (one sentence of context)",
        "Tension — what changed or what's broken?",
        "Investigation — what did the data reveal?",
        "Climax — the one chart that made the room go quiet.",
        "Resolution — what should we do, by when, and who owns it?",
      ] },
      { type: "chart", chart: "area", title: "Audience recall: data alone vs. data + story", subtitle: "% of key points remembered after 48 hours", unit: "%", data: [
        { label: "Just numbers", value: 12 },
        { label: "Numbers + chart", value: 28 },
        { label: "+ Narrative arc", value: 54 },
        { label: "+ Personal anchor", value: 71 },
        { label: "+ Clear ask", value: 83 },
      ] },
      { type: "heading", text: "Anchor the abstract in a human" },
      { type: "paragraph", text: "‘Churn rose 3%’ is a number. ‘412 customers who'd been with us for two years quietly left in March’ is a story. Same data — different gravity. Always find the human at the center." },
      { type: "callout", title: "The ‘so what’ test", text: "After every chart, say ‘so what?’ out loud. If you can't answer in 12 words, the chart isn't ready." },
      { type: "chart", chart: "donut", title: "What makes executives act on a presentation", subtitle: "Survey of 84 senior leaders", data: [
        { label: "Clear recommendation", value: 41 },
        { label: "One memorable visual", value: 24 },
        { label: "Credible methodology", value: 19 },
        { label: "Emotional anchor", value: 16 },
      ] },
      { type: "heading", text: "Close with the question, not the answer" },
      { type: "paragraph", text: "The best decks I've ever given ended with ‘what do we do?’ — and the room actually answered, because they walked the journey with me. The slide before the appendix should be a decision, not a thank-you." },
      { type: "quote", text: "Data wins arguments. Stories win meetings." },
    ],
    insights: [
      "People remember 6x more when data is wrapped in narrative.",
      "83% recall happens when story includes a clear, named ask.",
      "Executives credit ‘the recommendation slide’ as the #1 driver of action.",
    ],
    takeaways: [
      "Use a 5-act structure: setup → tension → investigation → climax → resolution.",
      "Anchor every number in a human or a moment.",
      "Apply the ‘so what?’ test after every chart.",
      "End with the decision, not the data.",
    ],
  },
  {
    slug: "excel-automation-with-vba",
    title: "Excel Automation With VBA: From 4 Hours to 4 Minutes",
    description: "A practical walkthrough of the VBA patterns that quietly run finance teams — events, dictionaries, and the ‘invisible script’ philosophy.",
    category: "Automation",
    readTime: "10 min read",
    date: "March 30, 2026",
    cover: excelVba,
    tags: ["Excel", "VBA", "Automation", "Productivity"],
    blocks: [
      { type: "paragraph", text: "VBA isn't dead. It's just become invisible — quietly running month-end close at half the Fortune 500. The analysts I admire most aren't the ones writing flashy Python notebooks; they're the ones whose finance colleagues stopped working weekends." },
      { type: "heading", text: "The 3-pattern stack that does 90% of the work" },
      { type: "code", language: "vba", code: "' 1. Read once, write once\nDim arr As Variant\narr = Range(\"A2:F\" & Cells(Rows.Count, 1).End(xlUp).Row).Value\n\n' 2. Process in memory\nFor i = 1 To UBound(arr, 1)\n    arr(i, 6) = arr(i, 4) * arr(i, 5)\nNext i\n\n' 3. Write back as a block\nRange(\"A2\").Resize(UBound(arr, 1), 6).Value = arr" },
      { type: "paragraph", text: "Looping cell-by-cell is the #1 reason VBA gets a bad reputation. Loading a range into a Variant array runs ~1,000× faster. This single pattern has saved more analyst hours than any other thing I've shipped." },
      { type: "chart", chart: "bar", title: "Speed gain by VBA pattern", subtitle: "Time to process 50,000-row workbook", unit: "sec", data: [
        { label: "Cell-by-cell loop", value: 184 },
        { label: "+ ScreenUpdating off", value: 96 },
        { label: "Variant array", value: 8 },
        { label: "+ Dictionary lookup", value: 3 },
      ] },
      { type: "heading", text: "Use Dictionary instead of VLOOKUP-in-a-loop" },
      { type: "code", language: "vba", code: "Dim dict As Object\nSet dict = CreateObject(\"Scripting.Dictionary\")\nFor i = 1 To UBound(lookups, 1)\n    dict(lookups(i, 1)) = lookups(i, 2)\nNext i\n\n' O(1) lookup, no formula recalc\nFor i = 1 To UBound(arr, 1)\n    If dict.Exists(arr(i, 1)) Then arr(i, 7) = dict(arr(i, 1))\nNext i" },
      { type: "heading", text: "Workbook events: the invisible automation" },
      { type: "list", items: [
        "Workbook_Open: validate inputs and refresh stale data on launch.",
        "Worksheet_Change: cascade dependent calculations without volatile formulas.",
        "BeforeSave: stamp the file with a versioned audit trail.",
        "BeforeClose: silently archive a copy to the network drive.",
      ] },
      { type: "chart", chart: "area", title: "Hours saved per analyst per month after automation", subtitle: "Internal study, 22 finance analysts, 6-month rollout", unit: "hrs", data: [
        { label: "M1", value: 4 },
        { label: "M2", value: 11 },
        { label: "M3", value: 19 },
        { label: "M4", value: 24 },
        { label: "M5", value: 31 },
        { label: "M6", value: 38 },
      ] },
      { type: "callout", title: "When to leave VBA behind", text: "Once your script needs APIs, scheduled runs, or version control, it's time to graduate to Python + Power Automate. But for in-workbook magic, VBA is still unbeatable." },
      { type: "quote", text: "The best automation is the one nobody notices — until it breaks, and they realize they had a free day every week." },
    ],
    insights: [
      "Variant arrays make VBA ~23× faster than cell-by-cell loops.",
      "A single well-placed Dictionary replaces 30 minutes of formula recalc.",
      "Most finance teams reclaim 30+ hours per analyst per month within 6 months.",
    ],
    takeaways: [
      "Read range → process array → write block.",
      "Replace VLOOKUPs with Dictionary lookups.",
      "Use workbook events for invisible, ambient automation.",
      "Graduate to Python only when you need APIs or scheduling.",
    ],
  },
  {
    slug: "kpi-metrics-that-actually-matter",
    title: "KPI Metrics That Actually Matter (And the Ones That Don't)",
    description: "How to choose KPIs that drive decisions instead of decorating slides — the difference between vanity, vital, and vital-with-context.",
    category: "Analytics",
    readTime: "7 min read",
    date: "March 21, 2026",
    cover: kpi,
    tags: ["KPIs", "Metrics", "Strategy"],
    blocks: [
      { type: "paragraph", text: "Every team I've joined had too many KPIs and not enough metrics. A KPI without an owner, a target, and a decision attached is just a chart with self-esteem issues." },
      { type: "heading", text: "The 3-tier metric pyramid" },
      { type: "stats", items: [
        { value: "1", label: "North-Star metric — the one number the entire company orbits." },
        { value: "3-5", label: "Input KPIs — the levers that move the north star." },
        { value: "10-20", label: "Diagnostic metrics — only surface when an input misbehaves." },
      ] },
      { type: "chart", chart: "donut", title: "How analyst time is actually spent on metrics", subtitle: "Where 100% of metric work goes vs. where it should", data: [
        { label: "Vanity dashboards", value: 38 },
        { label: "Reactive deep-dives", value: 31 },
        { label: "North-star tracking", value: 19 },
        { label: "Forward-looking analysis", value: 12 },
      ] },
      { type: "heading", text: "The vanity vs. vital test" },
      { type: "list", items: [
        "If the metric only goes up, it's vanity (cumulative downloads, total signups).",
        "If you can't say what action a 10% drop would trigger, it's decoration.",
        "If two teams optimize it differently, it's not yet a KPI — it's a noun.",
        "If it has no denominator, it lies (revenue without customer count, etc.).",
      ] },
      { type: "callout", title: "The denominator rule", text: "Almost every great KPI is a ratio. Revenue per active customer beats revenue. Tickets per release beats tickets. Always ask: per what?" },
      { type: "chart", chart: "bar", title: "KPI quality vs. decision velocity", subtitle: "Avg. days from insight to action across 40 teams", unit: "days", data: [
        { label: "Vanity-heavy", value: 18 },
        { label: "Mixed", value: 11 },
        { label: "Ratio-based", value: 6 },
        { label: "North-star aligned", value: 3 },
      ] },
      { type: "heading", text: "Add context, or don't show the number" },
      { type: "paragraph", text: "A KPI on its own is a fact. A KPI with a target, a trend, and a peer comparison is a decision. Never display a single number without at least two of those three." },
      { type: "quote", text: "If you can't trace a metric to a decision, delete it. The dashboard will get better by subtraction." },
    ],
    insights: [
      "Teams with 3–5 input KPIs make decisions 4× faster than teams with 20+.",
      "73% of executive dashboards contain at least one vanity metric.",
      "Ratio-based KPIs predict outcomes 2× more reliably than absolute counts.",
    ],
    takeaways: [
      "One north-star, 3–5 input KPIs, 10–20 diagnostics. Stop there.",
      "Apply the vanity test: cumulative + actionless = delete.",
      "Pair every KPI with a target, a trend, and a peer comparison.",
      "Prefer ratios over raw counts.",
    ],
  },
  {
    slug: "beginner-guide-to-data-analytics-career",
    title: "The Honest Beginner's Guide to a Data Analytics Career",
    description: "What to learn first, what to ignore, and the realistic 12-month roadmap from zero to your first analyst job.",
    category: "Career",
    readTime: "12 min read",
    date: "March 12, 2026",
    cover: career,
    tags: ["Career", "Beginner", "Roadmap"],
    blocks: [
      { type: "paragraph", text: "If you're reading this, someone has probably already sold you a $499 bootcamp. You don't need it. You need a plan, six tools, and the discipline to ship one project a month." },
      { type: "heading", text: "The 12-month roadmap, unfiltered" },
      { type: "stats", items: [
        { value: "M1-2", label: "Excel + SQL fundamentals. Stop here until SELECT, JOIN, GROUP BY, window functions feel boring." },
        { value: "M3-5", label: "One BI tool deeply (Power BI or Tableau). Build 3 real dashboards on real public data." },
        { value: "M6-8", label: "Python for analysis: pandas, matplotlib, one ML notebook. Don't chase deep learning." },
        { value: "M9-12", label: "Portfolio + interviews. Three case studies, one written, one presented, one live-coded." },
      ] },
      { type: "chart", chart: "line", title: "Hiring manager priorities for entry-level analysts", subtitle: "Survey of 312 hiring managers, 2026", unit: "%", data: [
        { label: "SQL", value: 94 },
        { label: "Excel", value: 88 },
        { label: "Storytelling", value: 81 },
        { label: "Power BI/Tableau", value: 76 },
        { label: "Python", value: 58 },
        { label: "Statistics", value: 41 },
        { label: "ML", value: 12 },
      ] },
      { type: "heading", text: "What to ignore (for now)" },
      { type: "list", items: [
        "Deep learning, MLOps, generative AI engineering — irrelevant for 95% of entry roles.",
        "‘Big data’ tools (Spark, Hadoop) — learn them on the job if you ever need to.",
        "20-tool resumes — three tools you can actually demo beats ten you've heard of.",
        "Kaggle leaderboards — they teach modeling, not the messy reality of stakeholders.",
      ] },
      { type: "callout", title: "The portfolio rule", text: "One project that solves a real, ugly question beats five tutorial projects with cleaned data. Find a dataset nobody has touched and ask it something strange." },
      { type: "chart", chart: "donut", title: "How entry-level analysts actually got hired (2025)", subtitle: "Sample: 480 first-job analysts", data: [
        { label: "Referral / network", value: 41 },
        { label: "Portfolio-led cold apply", value: 27 },
        { label: "Internship → conversion", value: 19 },
        { label: "Job board cold apply", value: 13 },
      ] },
      { type: "heading", text: "The interview that gets you hired" },
      { type: "paragraph", text: "Three things consistently separate the candidates who get offers: they explain their thinking out loud, they admit when they don't know something and propose how they'd find out, and they ask the interviewer at least one genuinely curious question about the data the team works with." },
      { type: "quote", text: "Nobody hires a junior analyst for what they know. They hire them for how they think." },
    ],
    insights: [
      "94% of hiring managers list SQL as required; only 12% require ML.",
      "41% of first analyst jobs come through referrals, not job boards.",
      "Candidates who narrate their thinking get offers 3× more often.",
    ],
    takeaways: [
      "Master Excel + SQL before touching anything else.",
      "One BI tool deeply > three tools shallowly.",
      "Three portfolio projects on ugly real data, not tutorials.",
      "Network harder than you cold-apply.",
    ],
  },

  // ───────────── ORIGINAL ESSAYS (preserved) ─────────────
  {
    slug: "patterns-in-the-noise",
    title: "Finding Patterns in the Noise",
    description: "Why the messiest datasets often hide the most valuable stories — and how I approach them.",
    category: "Analytics",
    readTime: "6 min read",
    date: "April 12, 2026",
    cover: dataStories,
    tags: ["Analytics", "Process"],
    content: [
      "Every dataset I've ever opened started as chaos. Rows that don't align, columns that contradict each other, timestamps in three different timezones. The instinct is to clean first and think later — but that's where most analysts lose the story.",
      "The noise is the story. The duplicates tell you about a broken pipeline. The nulls reveal a UX flaw. The outliers point at the user nobody designed for. Before I touch a single transformation, I sit with the raw data and ask: what is this trying to tell me?",
      "Patterns emerge when you stop forcing them. I keep a notebook open while exploring — not for code, for questions. By the time I start cleaning, I already know what I'm looking for, which means I clean with intent instead of habit.",
      "The best insight I ever delivered came from a column my team had been dropping for two years. Turns out the 'junk' field was tracking exactly the behavior leadership had been trying to measure. Nobody had looked.",
    ],
  },
  {
    slug: "dashboards-as-maps",
    title: "Dashboards Are Maps, Not Reports",
    description: "Stop building dashboards that summarize. Start building dashboards that guide decisions.",
    category: "Visualization",
    readTime: "5 min read",
    date: "March 28, 2026",
    cover: dashboards,
    tags: ["Dashboards", "Design"],
    content: [
      "A report tells you what happened. A map tells you where to go. The difference matters more than most teams realize.",
      "When I design a dashboard, I think about the decision someone will make in front of it. If a CEO opens it on Monday morning, what action should be obvious by Monday afternoon? If the answer is 'scroll and interpret,' I haven't done my job.",
      "The hierarchy is sacred: the most important number is the largest. Context lives next to the number, not three clicks away. Filters serve the question, not the data engineer's pride.",
      "Color is a language. Red doesn't mean 'bad' — red means 'look here.' Save it for the things that actually need attention, and your dashboard starts feeling like a guide instead of a wall.",
    ],
  },
  {
    slug: "automating-the-boring",
    title: "Automating the Boring 80%",
    description: "How small Python scripts saved my team 200+ hours a year — and the principles behind them.",
    category: "Automation",
    readTime: "7 min read",
    date: "March 14, 2026",
    cover: automation,
    tags: ["Automation", "Python"],
    content: [
      "If you do something manually three times, automate it on the fourth. That's the only rule I follow religiously.",
      "Most analyst work isn't analysis — it's plumbing. Pulling the same export, reshaping the same columns, sending the same email. None of it requires intelligence, but all of it requires time. Time is the asset most analysts undervalue.",
      "I've stopped writing 'big' automation. The best scripts I write are 30 lines, do one thing, and run on a schedule nobody thinks about. They aren't impressive. They're invisible. That's the point.",
      "The compounding effect is wild. Twenty small automations buying you fifteen minutes each per week is a full extra working day every month. That day is where the real analysis happens.",
    ],
  },
  {
    slug: "storytelling-with-data",
    title: "Storytelling With Data",
    description: "Numbers don't change minds. Stories do. Here's how to wrap one around the other.",
    category: "Storytelling",
    readTime: "6 min read",
    date: "February 22, 2026",
    cover: storytelling,
    tags: ["Storytelling", "Communication"],
    content: [
      "I've watched perfect analyses die in meetings. Not because they were wrong, but because nobody felt them. Data without narrative is just trivia.",
      "Every good data story has the same skeleton: a tension, a discovery, a decision. Skip any of the three and you're just presenting slides.",
      "Start with the human, not the chart. 'Customers who churned in March' is a number. 'The 412 people who paid us for two years and then quietly left in March' is a story. Same data, different gravity.",
      "End with the question, not the answer. The best presentations I give close with 'so what do we do?' — and the room actually answers, because they were on the journey with me.",
    ],
  },
  {
    slug: "sql-mental-models",
    title: "The SQL Mental Models I Use Daily",
    description: "Beyond syntax — how thinking in sets, joins, and windows changes how you solve problems.",
    category: "SQL",
    readTime: "8 min read",
    date: "February 05, 2026",
    cover: sql,
    tags: ["SQL", "Mental Models"],
    content: [
      "SQL isn't a language you learn, it's a way of thinking you adopt. Once it clicks, you start seeing the world in tables.",
      "Sets, not loops. The biggest leap junior analysts make is dropping the 'for each row' instinct. SQL operates on entire collections at once. The moment you stop iterating in your head, your queries get 10x simpler.",
      "Joins are conversations between tables. A LEFT JOIN says 'tell me everything you know, even if the other side has nothing.' An INNER JOIN says 'only the rows we both agree on.' Pick the verb that matches your question.",
      "Window functions changed everything for me. Running totals, ranks, lags — they let you ask questions about a row in the context of its neighbors without writing a single subquery. If you haven't fallen in love with them yet, you will.",
    ],
  },
  {
    slug: "hidden-insights",
    title: "Where Hidden Insights Actually Live",
    description: "The most valuable findings are rarely in the metrics you're tracking. Here's where to actually look.",
    category: "Analytics",
    readTime: "5 min read",
    date: "January 18, 2026",
    cover: insights,
    tags: ["Analytics", "Insights"],
    content: [
      "Dashboards show you what you decided was important six months ago. Insights live in the gap between what you're tracking and what's actually happening.",
      "Look at the segment everyone ignores. The 2% of users doing something weird are usually telling you about a feature you haven't built yet, or a problem you haven't named.",
      "Compare the wrong things. Revenue by day-of-week shouldn't tell you anything — but when it does, you've found something real. The unexpected correlation is where the gold is.",
      "Talk to the support team. Every analyst should spend a day a quarter reading support tickets. The qualitative signal is what tells you which quantitative anomaly actually matters.",
    ],
  },
];

export const categories = ["All", ...Array.from(new Set(blogs.map((b) => b.category)))];

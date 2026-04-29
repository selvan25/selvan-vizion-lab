import dataStories from "@/assets/blog-data-stories.jpg";
import dashboards from "@/assets/blog-dashboards.jpg";
import automation from "@/assets/blog-automation.jpg";
import storytelling from "@/assets/blog-storytelling.jpg";
import sql from "@/assets/blog-sql.jpg";
import insights from "@/assets/blog-insights.jpg";

export type Blog = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  date: string;
  cover: string;
  content: string[];
};

export const blogs: Blog[] = [
  {
    slug: "patterns-in-the-noise",
    title: "Finding Patterns in the Noise",
    description: "Why the messiest datasets often hide the most valuable stories — and how I approach them.",
    category: "Analytics",
    readTime: "6 min read",
    date: "April 12, 2026",
    cover: dataStories,
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
    category: "Communication",
    readTime: "6 min read",
    date: "February 22, 2026",
    cover: storytelling,
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
    content: [
      "Dashboards show you what you decided was important six months ago. Insights live in the gap between what you're tracking and what's actually happening.",
      "Look at the segment everyone ignores. The 2% of users doing something weird are usually telling you about a feature you haven't built yet, or a problem you haven't named.",
      "Compare the wrong things. Revenue by day-of-week shouldn't tell you anything — but when it does, you've found something real. The unexpected correlation is where the gold is.",
      "Talk to the support team. Every analyst should spend a day a quarter reading support tickets. The qualitative signal is what tells you which quantitative anomaly actually matters.",
    ],
  },
];

export const categories = ["All", ...Array.from(new Set(blogs.map((b) => b.category)))];

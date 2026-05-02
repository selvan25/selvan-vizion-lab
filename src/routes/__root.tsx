import { Outlet, Link, createRootRoute, HeadContent, Scripts, ScriptOnce } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BackToTop } from "@/components/site/BackToTop";

const themeBootScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.add('light');}}catch(e){}})();`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-hero px-4">
      <div className="max-w-md text-center">
        <h1 className="text-8xl font-display font-bold text-gradient-primary">404</h1>
        <h2 className="mt-4 text-xl font-display font-semibold">Lost in the data</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This page doesn't exist — but plenty of others do.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Selvan Rajan — Data Analyst, Insight Hunter & Storyteller" },
      { name: "description", content: "Personal blog of Selvan Rajan — essays on analytics, dashboards, automation, and finding patterns in messy data." },
      { name: "author", content: "Selvan Rajan" },
      { property: "og:title", content: "Selvan Rajan — Data Analyst, Insight Hunter & Storyteller" },
      { property: "og:description", content: "Personal blog of Selvan Rajan — essays on analytics, dashboards, automation, and finding patterns in messy data." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Selvan Rajan — Data Analyst, Insight Hunter & Storyteller" },
      { name: "twitter:description", content: "Personal blog of Selvan Rajan — essays on analytics, dashboards, automation, and finding patterns in messy data." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2c712ab7-a471-492a-bd36-342013757cf0/id-preview-2f0748bb--1e6a98dd-e905-47dc-8710-7555cd031af7.lovable.app-1777702737932.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2c712ab7-a471-492a-bd36-342013757cf0/id-preview-2f0748bb--1e6a98dd-e905-47dc-8710-7555cd031af7.lovable.app-1777702737932.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ScriptOnce>{themeBootScript}</ScriptOnce>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

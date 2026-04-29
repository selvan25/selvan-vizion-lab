import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Send, Check, Github, Linkedin, Mail } from "lucide-react";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(5, "Message too short").max(1000),
});

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Selvan Rajan" },
      { name: "description", content: "Get in touch with Selvan Rajan — for collaborations, conversations about data, or just to say hi." },
      { property: "og:title", content: "Contact — Selvan Rajan" },
      { property: "og:description", content: "Drop a message — let's talk data." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setState("sending");
    await new Promise((r) => setTimeout(r, 1100));
    setState("sent");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setState("idle"), 3500);
  };

  return (
    <div className="pt-32 pb-20 bg-hero min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Contact</span>
          <h1 className="mt-4 text-5xl md:text-7xl font-display font-bold tracking-tight">
            Let's <span className="text-gradient-primary">talk data</span>.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto">
            Have a project, a curiosity, or just want to share a chart you can't stop thinking about? Drop a note.
          </p>
        </motion.div>

        <div className="mt-16 grid lg:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 glass-strong rounded-3xl p-8 space-y-6"
          >
            <div>
              <h3 className="font-display font-semibold text-2xl">Find me elsewhere</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Pick the platform you actually use — I respond fastest on email.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { Icon: Mail, label: "hello@selvan.dev", href: "mailto:hello@selvan.dev" },
                { Icon: Linkedin, label: "linkedin.com/in/selvan", href: "https://linkedin.com" },
                { Icon: Github, label: "github.com/selvan", href: "https://github.com" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 glass rounded-2xl px-4 py-3 hover:shadow-glow hover:-translate-y-0.5 transition-smooth"
                >
                  <span className="p-2 rounded-lg bg-gradient-primary">
                    <Icon className="h-4 w-4 text-primary-foreground" />
                  </span>
                  <span className="text-sm">{label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 glass-strong rounded-3xl p-8 space-y-5"
          >
            {[
              { key: "name", label: "Your name", type: "text", placeholder: "Selvan Rajan" },
              { key: "email", label: "Email", type: "email", placeholder: "you@somewhere.com" },
            ].map((f) => (
              <div key={f.key}>
                <label className="text-xs font-medium text-muted-foreground">{f.label}</label>
                <input
                  type={f.type}
                  value={(form as Record<string, string>)[f.key]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  placeholder={f.placeholder}
                  maxLength={f.key === "email" ? 255 : 100}
                  className="mt-1.5 w-full glass rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60"
                />
                {errors[f.key] && <p className="mt-1 text-xs text-destructive">{errors[f.key]}</p>}
              </div>
            ))}
            <div>
              <label className="text-xs font-medium text-muted-foreground">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about it..."
                rows={5}
                maxLength={1000}
                className="mt-1.5 w-full glass rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 resize-none"
              />
              {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
            </div>
            <button
              type="submit"
              disabled={state !== "idle"}
              className="w-full bg-gradient-primary text-primary-foreground rounded-full px-6 py-3.5 font-medium shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5 transition-smooth inline-flex items-center justify-center gap-2 disabled:opacity-90"
            >
              <AnimatePresence mode="wait">
                {state === "idle" && (
                  <motion.span key="i" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-2">
                    Send message <Send className="h-4 w-4" />
                  </motion.span>
                )}
                {state === "sending" && (
                  <motion.span key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    Sending...
                  </motion.span>
                )}
                {state === "sent" && (
                  <motion.span key="d" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-2">
                    Message sent <Check className="h-4 w-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}

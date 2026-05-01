import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border">
      <div className="container mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
              <span className="h-2.5 w-2.5 rounded-full bg-gradient-primary shadow-glow" />
              Selvan Rajan
            </Link>
            <p className="mt-4 text-sm text-muted-foreground italic max-w-xs">
              "In God we trust. All others must bring data."
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Quick links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground transition-smooth">Home</Link></li>
              <li><Link to="/blogs" className="hover:text-foreground transition-smooth">Blogs</Link></li>
              <li><Link to="/about" className="hover:text-foreground transition-smooth">About</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition-smooth">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Connect</h4>
            <div className="flex gap-3">
              {[
                { Icon: Linkedin, href: "https://www.linkedin.com/in/selvan-rajan-968823213/", label: "LinkedIn" },
                { Icon: Instagram, href: "https://www.instagram.com/iam_selvan/", label: "Instagram" },
                { Icon: Mail, href: "mailto:selvanrajan143@gmail.com", label: "Email" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="glass rounded-full p-3 hover:shadow-glow hover:-translate-y-1 transition-smooth"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Selvan Rajan. Crafted with curiosity.</p>
          <p>Built for those who believe data tells stories.</p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUp, Sparkles } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { FOOTER_LINKS } from "@/lib/constants";

const footerSections = [
  { title: "Company", links: FOOTER_LINKS.company },
  { title: "Products", links: FOOTER_LINKS.products },
  { title: "Solutions", links: FOOTER_LINKS.solutions },
  { title: "Resources", links: FOOTER_LINKS.resources },
  { title: "Developers", links: FOOTER_LINKS.developers },
  { title: "Support", links: FOOTER_LINKS.support },
] as const;

interface FooterProps {
  hideNewsletter?: boolean;
}

function NewsletterSignup() {
  const [email, setEmail] = useState("");

  return (
    <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:min-w-[360px]">
      <input
        type="text"
        inputMode="email"
        name="titansoles-newsletter"
        autoComplete="off"
        data-1p-ignore
        data-lpignore="true"
        data-form-type="other"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        aria-label="Email for newsletter"
        className="h-12 w-full rounded-[20px] border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary sm:flex-1"
      />
      <button
        type="button"
        onClick={() => setEmail("")}
        className="flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-[20px] bg-primary px-6 text-sm font-semibold text-white transition-all hover:bg-primary/90 sm:w-auto"
      >
        Subscribe
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

export function Footer({ hideNewsletter = false }: FooterProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="theme-dark relative border-t border-border bg-[#040b16] pb-28 text-foreground md:pb-12">
      <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
        {!hideNewsletter && (
          <div className="rounded-[20px] border border-white/8 bg-white/[0.03] p-5 sm:p-6 lg:flex lg:items-center lg:justify-between lg:p-8">
            <div className="max-w-md">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 shrink-0 text-accent" />
                <h3 className="text-lg font-bold">Stay in the loop</h3>
              </div>
              <p className="mt-1.5 text-sm text-slate-400">
                AI-curated shoe drops, exclusive deals, and marketplace updates.
              </p>
            </div>
            {/* Mount after hydration — avoids password-manager DOM injection mismatch */}
            {mounted ? (
              <NewsletterSignup />
            ) : (
              <div
                className="mt-5 h-12 w-full max-w-[360px] rounded-[20px] border border-white/10 bg-white/5 lg:mt-0"
                aria-hidden
              />
            )}
          </div>
        )}

        <div
          className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-7 ${hideNewsletter ? "" : "mt-12"}`}
        >
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/">
              <Logo variant="dark" />
            </Link>
            <p className="mt-4 max-w-[200px] text-sm leading-relaxed text-slate-400">
              The AI-powered footwear marketplace.
            </p>
            <div className="mt-5 flex gap-2">
              {["X", "IG", "in"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-xs font-semibold text-slate-400 transition-all hover:border-primary/40 hover:text-white"
                  aria-label={social}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {footerSections.map(({ title, links }) => (
            <div key={title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                {title}
              </h4>
              <ul className="mt-3.5 space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-6 sm:flex-row">
          <p className="text-sm text-slate-500">
            © 2026 Titan Soles. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            {FOOTER_LINKS.legal.map((link) => (
              <a key={link.label} href={link.href} className="hover:text-white">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {mounted && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-24 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-card text-white shadow-lg transition-all hover:border-primary/40 hover:bg-primary md:bottom-6 md:right-6"
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
    </footer>
  );
}

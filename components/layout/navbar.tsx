"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onOpenAI: () => void;
  variant?: "dark" | "light";
  /** Offset below a fixed announcement bar (e.g. 32px) */
  offsetTop?: number;
}

export function Navbar({ onOpenAI, variant = "dark", offsetTop }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLight = variant === "light";
  const top = offsetTop ?? (isLight ? 32 : 48);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 z-50 transition-all duration-200",
        isLight
          ? scrolled
            ? "border-b border-neutral-200/80 bg-white/90 shadow-sm backdrop-blur-xl"
            : "border-b border-transparent bg-white"
          : scrolled
            ? "glass shadow-lg shadow-black/20"
            : "bg-transparent"
      )}
      style={{ top }}
    >
      <nav className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0">
          <Logo variant={isLight ? "light" : "dark"} size="sm" />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-150",
                isLight
                  ? "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                  : "text-slate-300 hover:bg-white/8 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenAI}
            className={cn(
              "gap-1.5",
              isLight
                ? "text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                : "text-accent hover:bg-white/8 hover:text-accent"
            )}
          >
            <Sparkles className="h-4 w-4" />
            AI
          </Button>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className={isLight ? "text-neutral-600" : "text-slate-300"}
          >
            <Link href="/become-seller">Sell</Link>
          </Button>
          <Button
            variant={isLight ? "outline" : "dark"}
            size="sm"
            asChild
            className={isLight ? "border-neutral-200 bg-white text-neutral-900 shadow-sm hover:bg-neutral-50" : undefined}
          >
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button
            variant={isLight ? "default" : "accent"}
            size="sm"
            asChild
            className={isLight ? "shadow-sm shadow-blue-600/20" : undefined}
          >
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>

        <button
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg transition-colors lg:hidden",
            isLight
              ? "text-neutral-900 hover:bg-neutral-100"
              : "text-white hover:bg-white/8"
          )}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <div
          className={cn(
            "border-t lg:hidden",
            isLight
              ? "border-neutral-200 bg-white"
              : "glass-dark border-white/8"
          )}
        >
          <div className="flex flex-col gap-1 p-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                  isLight
                    ? "text-neutral-700 hover:bg-neutral-100"
                    : "text-slate-200 hover:bg-white/8"
                )}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div
              className={cn(
                "mt-2 flex flex-col gap-2 border-t pt-4",
                isLight ? "border-neutral-200" : "border-white/8"
              )}
            >
              <Button
                variant="ghost"
                onClick={() => {
                  onOpenAI();
                  setMobileOpen(false);
                }}
                className={isLight ? "text-blue-600" : "text-accent"}
              >
                <Sparkles className="h-4 w-4" />
                AI Assistant
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/become-seller">Become Seller</Link>
              </Button>
              <Button variant={isLight ? "outline" : "dark"} asChild>
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button variant={isLight ? "default" : "accent"} asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

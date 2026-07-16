"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Men", href: "#men" },
  { label: "Women", href: "#women" },
  { label: "Kids", href: "#kids" },
  { label: "Sale", href: "#sale" },
];

function Mark() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-[#111111] text-[11px] font-semibold text-white">
        T
      </span>
      <span className="text-[16px] font-medium tracking-tight text-[#111111]">
        Titan Soles
      </span>
    </div>
  );
}

interface MarketplaceNavProps {
  onOpenAI: () => void;
}

export function MarketplaceNav({ onOpenAI }: MarketplaceNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-200",
        scrolled
          ? "border-b border-black/[0.05] bg-[#FAFAFA]/80 shadow-[0_1px_0_rgba(0,0,0,0.02)] backdrop-blur-2xl"
          : "border-b border-transparent bg-[#FAFAFA]/40 backdrop-blur-xl"
      )}
    >
      <nav className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-7 lg:px-14">
        <Link
          href="/"
          className="shrink-0 transition-opacity duration-200 hover:opacity-60"
        >
          <Mark />
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-full px-3.5 py-1.5 text-[14px] font-normal text-[#6B7280] transition-colors duration-200 hover:text-[#111111]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-1 sm:flex">
          <Link
            href="/signin"
            className="rounded-full px-3.5 py-1.5 text-[14px] font-normal text-[#6B7280] transition-colors duration-200 hover:text-[#111111]"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="inline-flex h-9 items-center rounded-full bg-[#111111] px-4 text-[14px] font-medium text-white transition-all duration-200 hover:bg-black active:scale-[0.98]"
          >
            Sign up
          </Link>
        </div>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full text-[#111111] transition-colors duration-200 hover:bg-black/[0.04] md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" strokeWidth={1.5} />
          ) : (
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          )}
        </button>
      </nav>

      <div
        className={cn(
          "overflow-hidden border-t border-black/[0.05] bg-[#FAFAFA]/95 backdrop-blur-2xl transition-all duration-200 md:hidden",
          mobileOpen
            ? "max-h-[400px] opacity-100"
            : "max-h-0 border-transparent opacity-0"
        )}
      >
        <div className="flex flex-col gap-0.5 px-7 py-4">
          {LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-xl px-3 py-2.5 text-[16px] text-[#111111]"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => {
              onOpenAI();
              setMobileOpen(false);
            }}
            className="rounded-xl px-3 py-2.5 text-left text-[16px] font-medium text-[#111111]"
          >
            Ask AI
          </button>
          <div className="mt-2 flex flex-col gap-2 border-t border-black/[0.05] pt-3">
            <Link href="/signin" className="px-3 py-2 text-[14px] text-[#6B7280]">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#111111] text-[14px] font-medium text-white"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

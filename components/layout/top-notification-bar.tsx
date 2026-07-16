"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  Sparkles,
  Truck,
  ShieldCheck,
  BadgePercent,
  Zap,
  ArrowRight,
} from "lucide-react";
import { SyncOpsDrawer } from "@/components/layout/syncops-drawer";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

const NOTIFICATIONS = [
  {
    icon: Sparkles,
    label: "Live",
    text: "Titan AI matched 2,400+ shoppers with their perfect pair today",
  },
  {
    icon: Truck,
    label: "Offer",
    text: "Free express delivery on all verified orders this week",
  },
  {
    icon: ShieldCheck,
    label: "Trust",
    text: "Every store is manually verified for authenticity & quality",
  },
  {
    icon: BadgePercent,
    label: "Deal",
    text: "Exclusive AI picks — up to 30% off trending sneakers",
  },
  {
    icon: Zap,
    label: "New",
    text: "Luxury formal collection just dropped in the marketplace",
  },
];

const socials = [
  { label: "LinkedIn", href: "#", Icon: LinkedInIcon },
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
];

export function TopNotificationBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % NOTIFICATIONS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const current = NOTIFICATIONS[index];
  const Icon = current.icon;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] overflow-hidden border-b border-[#93C5FD]/40 bg-white shadow-[0_8px_30px_rgba(37,99,235,0.12)]">
      {/* Strong premium light backdrop */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#DBEAFE] via-white to-[#E0F2FE]" />
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#2563EB] via-[#38BDF8] to-[#2563EB]" />
      <div className="pointer-events-none absolute -left-10 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-[#2563EB]/15 blur-2xl" />
      <div className="pointer-events-none absolute -right-10 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-[#38BDF8]/20 blur-2xl" />

      <div className="container-page relative flex h-12 items-center justify-between gap-4">
        {/* Rotating announcement — center stage */}
        <div className="relative min-w-0 flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ y: 18, opacity: 0, filter: "blur(4px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -18, opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="flex items-center gap-3"
            >
              <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563EB] to-[#38BDF8] shadow-lg shadow-blue-500/30">
                <Icon className="h-4 w-4 text-white" />
                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#22C55E] ring-2 ring-white" />
              </span>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="hidden rounded-md bg-[#2563EB]/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#1D4ED8] sm:inline">
                    {current.label}
                  </span>
                  <p className="truncate text-[13px] font-semibold tracking-[-0.015em] text-[#0F172A] sm:text-[14px]">
                    {current.text}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress indicators */}
        <div className="hidden items-center gap-1.5 md:flex">
          {NOTIFICATIONS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show notification ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-6 bg-[#2563EB] shadow-sm shadow-blue-500/40"
                  : "w-1.5 bg-[#94A3B8]/50 hover:bg-[#64748B]"
              }`}
            />
          ))}
        </div>

        {/* Right utilities */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <SyncOpsDrawer>
            <button
              type="button"
              className="group inline-flex items-center gap-1.5 rounded-full border-2 border-[#2563EB] bg-gradient-to-r from-[#EFF6FF] to-white px-3.5 py-1.5 text-[11px] font-semibold text-[#0F172A] shadow-[0_0_0_3px_rgba(37,99,235,0.12),0_4px_14px_rgba(37,99,235,0.18)] transition-all hover:-translate-y-0.5 hover:border-[#1D4ED8] hover:shadow-[0_0_0_4px_rgba(37,99,235,0.16),0_8px_20px_rgba(37,99,235,0.22)]"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#2563EB]" />
              <span>
                Powered by{" "}
                <span className="font-bold text-[#2563EB]">SyncOps</span>
              </span>
            </button>
          </SyncOpsDrawer>

          <Link
            href="#"
            className="hidden items-center gap-1 rounded-full bg-[#0F172A] px-3.5 py-1.5 text-[11px] font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#1E293B] md:inline-flex"
          >
            Message from the CEO
            <ArrowRight className="h-3 w-3" />
          </Link>

          <div className="hidden h-5 w-px bg-[#CBD5E1] sm:block" aria-hidden />

          <div className="flex items-center gap-1">
            {socials.map(({ label, href, Icon: SocialIcon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#475569] transition-all hover:bg-[#2563EB]/10 hover:text-[#2563EB]"
              >
                <SocialIcon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

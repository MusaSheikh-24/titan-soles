"use client";

import {
  Sparkles,
  Image,
  Mic,
  Brain,
  GitCompare,
  ShieldCheck,
  Truck,
  Heart,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "motion/react";
import { FadeUp } from "@/components/ui/fade-up";
import { SectionShell } from "@/components/ui/section-shell";
import { WHY_TITAN_AI } from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconMap = {
  sparkles: Sparkles,
  image: Image,
  mic: Mic,
  brain: Brain,
  "git-compare": GitCompare,
  "shield-check": ShieldCheck,
  truck: Truck,
  heart: Heart,
} as const;

export function WhyTitanAI() {
  return (
    <SectionShell
      theme="dark"
      className="relative overflow-hidden"
    >
      {/* Ambient backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[#061221]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_20%_30%,rgba(37,99,235,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_85%_70%,rgba(56,189,248,0.06),transparent_55%)]" />
      </div>

      <div className="container-page relative z-10">
        {/* Header */}
        <FadeUp>
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#38BDF8]/90">
              Why Titan AI
            </p>
            <h2 className="text-[32px] font-bold tracking-[-0.035em] text-white sm:text-[40px] lg:text-[44px]">
              Built for Smarter Shopping
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-[#94A3B8]">
              AI-powered discovery, verified sellers, and a seamless shopping
              experience — all in one place.
            </p>
          </div>
        </FadeUp>

        {/* Cards grid */}
        <div className="mt-10 grid auto-rows-[minmax(130px,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {WHY_TITAN_AI.map((feature, i) => {
            const Icon =
              iconMap[feature.icon as keyof typeof iconMap] ?? Sparkles;
            const isLarge = feature.span === "lg";
            const span = isLarge
              ? "col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-2"
              : "lg:col-span-1";

            return (
              <FadeUp key={feature.id} delay={i * 0.04}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "group relative h-full overflow-hidden rounded-[22px]",
                    "border border-white/[0.08] bg-[#0B1729]/70 p-6 sm:p-7",
                    "shadow-[0_8px_32px_rgba(0,0,0,0.22)] backdrop-blur-xl",
                    "transition-all duration-300",
                    "hover:border-white/[0.14] hover:shadow-[0_16px_48px_rgba(37,99,235,0.12)]",
                    span,
                    isLarge && "min-h-[260px] sm:min-h-[280px]"
                  )}
                >
                  {/* Accent glow on hover */}
                  <div className="pointer-events-none absolute inset-0 rounded-[22px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.035] via-transparent to-transparent" />
                    <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#2563EB]/15 blur-3xl" />
                  </div>

                  {/* Icon */}
                  <div
                    className={cn(
                      "relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563EB]/90 to-[#38BDF8]/85 shadow-[0_8px_24px_rgba(37,99,235,0.28)]",
                      isLarge ? "h-12 w-12" : "h-10 w-10"
                    )}
                  >
                    <Icon
                      className={cn(
                        "text-white",
                        isLarge ? "h-6 w-6" : "h-5 w-5"
                      )}
                      strokeWidth={1.7}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className={cn(
                      "relative mt-4 font-semibold text-white leading-snug tracking-[-0.01em]",
                      isLarge ? "text-lg sm:text-xl" : "text-sm sm:text-base"
                    )}
                  >
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={cn(
                      "relative mt-1.5 leading-relaxed text-[#94A3B8]",
                      isLarge ? "text-sm sm:text-[15px]" : "text-sm"
                    )}
                  >
                    {feature.description}
                  </p>

                  {/* Bottom-right arrow icon on hover */}
                  <div className="pointer-events-none absolute bottom-4 right-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 sm:-translate-x-2 sm:translate-y-2">
                    <ArrowUpRight className="h-4 w-4 text-[#38BDF8]/70" />
                  </div>
                </motion.div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}

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
} from "lucide-react";
import { motion } from "motion/react";
import { FadeUp } from "@/components/ui/fade-up";
import { SectionHeader } from "@/components/ui/section-header";
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
    <SectionShell theme="light">
      <div className="container-page">
        <FadeUp>
          <SectionHeader
            eyebrow="Why Titan AI"
            title="Built for Smarter Shopping"
            subtitle="AI-powered discovery, verified sellers, and a seamless shopping experience — all in one place."
          />
        </FadeUp>

        <div className="mt-8 grid auto-rows-[minmax(120px,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
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
                  whileHover={{ y: -3 }}
                  className={cn(
                    "group relative h-full overflow-hidden rounded-[20px] border border-border bg-card transition-all hover:border-primary/25 hover:card-shadow-hover",
                    isLarge ? "p-6 lg:p-7" : "p-5",
                    span,
                    isLarge && "min-h-50 sm:min-h-55"
                  )}
                >
                  <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary/10 blur-2xl opacity-70 transition-opacity group-hover:opacity-100" />
                  <div
                    className={cn(
                      "relative flex items-center justify-center rounded-2xl bg-linear-to-br from-primary/15 to-accent/10",
                      isLarge ? "h-12 w-12" : "h-10 w-10"
                    )}
                  >
                    <Icon
                      className={cn(
                        "text-primary",
                        isLarge ? "h-6 w-6" : "h-5 w-5"
                      )}
                    />
                  </div>
                  <h3
                    className={cn(
                      "relative mt-4 font-semibold text-foreground leading-snug",
                      isLarge ? "text-lg sm:text-xl" : "text-sm sm:text-base"
                    )}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={cn(
                      "relative mt-1.5 leading-relaxed text-muted",
                      isLarge ? "text-sm sm:text-[15px]" : "text-sm"
                    )}
                  >
                    {feature.description}
                  </p>
                </motion.div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}

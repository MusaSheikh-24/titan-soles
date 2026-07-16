"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { FadeUp } from "@/components/ui/fade-up";
import { SectionShell } from "@/components/ui/section-shell";
import { MARKETPLACE_STATS } from "@/lib/constants";
import { Building2, Package, Store, Sparkles } from "lucide-react";

const icons = [Building2, Package, Store, Sparkles];

function AnimatedStat({
  value,
  suffix = "",
  label,
}: {
  value: string;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const numericValue = parseInt(value.replace(/\D/g, ""), 10);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(numericValue * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, numericValue]);

  return (
    <div ref={ref}>
      <p className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
        {display.toLocaleString()}
        <span className="text-primary">{suffix}</span>
      </p>
      <p className="mt-1.5 text-sm font-medium text-muted">{label}</p>
    </div>
  );
}

export function MarketplaceStats() {
  return (
    <SectionShell theme="light" padded={false} className="py-8 lg:py-10">
      <div className="container-page">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {MARKETPLACE_STATS.map((stat, i) => {
            const Icon = icons[i] ?? Sparkles;
            return (
              <FadeUp key={stat.label} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="rounded-[20px] border border-border bg-card p-5 card-shadow transition-shadow hover:card-shadow-hover lg:p-6"
                >
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <AnimatedStat
                    value={stat.value}
                    suffix={stat.suffix}
                    label={stat.label}
                  />
                </motion.div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}

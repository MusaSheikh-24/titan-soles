"use client";

import { useRef } from "react";
import {
  Search,
  Sparkles,
  GitCompare,
  Target,
  ShoppingBag,
  Clock3,
} from "lucide-react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  useInView,
  type MotionValue,
} from "motion/react";
import { SectionShell } from "@/components/ui/section-shell";
import { HOW_IT_WORKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { HowItWorksStep } from "@/types";

const iconMap = {
  search: Search,
  sparkles: Sparkles,
  "git-compare": GitCompare,
  target: Target,
  "shopping-bag": ShoppingBag,
} as const;

function JourneyCard({
  step,
  index,
  align,
  progress,
}: {
  step: HowItWorksStep;
  index: number;
  align: "left" | "right";
  progress: MotionValue<number>;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const Icon = iconMap[step.icon as keyof typeof iconMap] ?? Sparkles;
  const isLeft = align === "left";

  const start = index / HOW_IT_WORKS.length;
  const end = (index + 0.85) / HOW_IT_WORKS.length;
  const active = useTransform(progress, [start, end], [0.35, 1]);

  return (
    <div className="relative py-8 lg:py-10">
      {/* Hairline connector toward card */}
      <motion.div
        style={{ opacity: active }}
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-[5.5rem] z-10 hidden h-px lg:block",
          isLeft
            ? "left-[calc(50%+14px)] w-[min(88px,7vw)] bg-gradient-to-r from-[#38BDF8]/70 to-transparent"
            : "right-[calc(50%+14px)] w-[min(88px,7vw)] bg-gradient-to-l from-[#38BDF8]/70 to-transparent"
        )}
      />

      {/* Timeline node */}
      <motion.div
        style={{ opacity: active }}
        className="absolute top-[5.15rem] left-[17px] z-20 -translate-x-1/2 lg:left-1/2"
      >
        <span className="block h-2.5 w-2.5 rounded-full bg-[#38BDF8] shadow-[0_0_12px_rgba(56,189,248,0.55)] ring-[3px] ring-[#061221]" />
      </motion.div>

      <div
        className={cn(
          "relative z-10 pl-11 lg:pl-0",
          isLeft
            ? "lg:mr-auto lg:w-[min(440px,42%)] lg:pr-10"
            : "lg:ml-auto lg:w-[min(440px,42%)] lg:pl-10"
        )}
      >
        <motion.article
          ref={cardRef}
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 20, x: isLeft ? -24 : 24 }
          }
          animate={
            isInView
              ? { opacity: 1, y: 0, x: 0 }
              : reduceMotion
                ? { opacity: 1, y: 0, x: 0 }
                : { opacity: 0, y: 20, x: isLeft ? -24 : 24 }
          }
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          whileHover={
            reduceMotion
              ? undefined
              : { y: -4, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }
          }
          className={cn(
            "group relative overflow-hidden rounded-[22px]",
            "border border-white/[0.08] bg-[#0B1729]/72 p-6 sm:p-7",
            "shadow-[0_8px_32px_rgba(0,0,0,0.22)] backdrop-blur-xl",
            "transition-[border-color,box-shadow] duration-300",
            "hover:border-white/[0.14] hover:shadow-[0_16px_48px_rgba(37,99,235,0.12)]"
          )}
        >
          {/* Quiet accent wash */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.035] via-transparent to-transparent" />

          <div className="relative flex items-start justify-between gap-4">
            <motion.div
              animate={
                reduceMotion
                  ? undefined
                  : { y: [0, -4, 0] }
              }
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.25,
              }}
              className="relative"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563EB]/90 to-[#38BDF8]/85 shadow-[0_8px_24px_rgba(37,99,235,0.28)] sm:h-16 sm:w-16">
                <Icon className="h-6 w-6 text-white sm:h-7 sm:w-7" strokeWidth={1.7} />
              </div>
            </motion.div>

            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.03] text-[11px] font-semibold tracking-wide text-white/70">
              {String(step.step).padStart(2, "0")}
            </span>
          </div>

          <h3 className="relative mt-5 text-[22px] font-semibold tracking-[-0.025em] text-white sm:text-[24px]">
            {step.title}
          </h3>

          <p className="relative mt-2.5 max-w-[36ch] text-[15px] leading-relaxed text-[#94A3B8] sm:text-[16px]">
            {step.description}
          </p>

          <div className="relative mt-5 flex items-center gap-2 text-[12px] font-medium text-[#64748B]">
            <Clock3 className="h-3.5 w-3.5 text-[#38BDF8]/80" />
            <span>{step.time}</span>
          </div>
        </motion.article>
      </div>
    </div>
  );
}

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 45%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 32,
    restDelta: 0.001,
  });

  const activeProgress = reduceMotion ? scrollYProgress : smoothProgress;
  const lineScale = useTransform(activeProgress, [0, 1], [0, 1]);

  return (
    <SectionShell
      theme="dark"
      padded={false}
      className="relative overflow-hidden"
    >
      {/* Soft, restrained atmosphere */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[#061221]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_0%,rgba(37,99,235,0.14),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_35%_30%_at_80%_70%,rgba(56,189,248,0.06),transparent_60%)]" />
        <div className="journey-grid absolute inset-0 opacity-[0.18]" />
      </div>

      <div
        ref={sectionRef}
        className="container-page relative z-10 py-20 lg:py-28"
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#38BDF8]/90">
            Process
          </p>
          <h2 className="text-[36px] font-bold tracking-[-0.035em] text-white sm:text-[44px] lg:text-[48px]">
            How It Works
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-[#94A3B8] sm:text-[16px]">
            From search to purchase — a seamless, verified experience.
          </p>
        </motion.div>

        <div className="relative mt-14 lg:mt-16">
          {/* Slim timeline spine */}
          <div className="absolute top-6 bottom-6 left-[17px] w-px overflow-hidden lg:left-1/2 lg:-translate-x-1/2">
            <div className="absolute inset-0 bg-white/[0.06]" />
            <motion.div
              style={{ scaleY: lineScale, transformOrigin: "top" }}
              className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-[#2563EB] via-[#38BDF8] to-[#2563EB]/40"
            />
          </div>

          <div className="relative">
            {HOW_IT_WORKS.map((step, i) => (
              <JourneyCard
                key={step.step}
                step={step}
                index={i}
                align={i % 2 === 0 ? "left" : "right"}
                progress={activeProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

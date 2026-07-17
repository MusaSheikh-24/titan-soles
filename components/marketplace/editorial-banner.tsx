"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface EditorialBlock {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  image: string;
  tone?: "light" | "dark";
}

interface EditorialBannerProps {
  block: EditorialBlock;
  variant?: "full" | "split" | "compact";
  className?: string;
}

export function EditorialBanner({
  block,
  variant = "full",
  className,
}: EditorialBannerProps) {
  const dark = block.tone !== "light";

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative overflow-hidden rounded-[24px]",
        // ~18% shorter than prior banners — still impactful
        variant === "full" && "min-h-[230px] sm:min-h-[295px] lg:min-h-[345px]",
        variant === "split" && "min-h-[200px] sm:min-h-[260px]",
        variant === "compact" && "min-h-[170px] sm:min-h-[200px]",
        className
      )}
    >
      <img
        src={block.image}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className={cn(
          "absolute inset-0",
          dark
            ? "bg-gradient-to-r from-black/70 via-black/35 to-transparent"
            : "bg-gradient-to-r from-white/90 via-white/55 to-transparent"
        )}
      />
      <div className="relative z-10 flex h-full min-h-[inherit] flex-col justify-end p-7 sm:p-9 lg:p-12">
        <p
          className={cn(
            "text-[12px] font-semibold uppercase tracking-[0.14em]",
            dark ? "text-white/70" : "text-[#6B7280]"
          )}
        >
          {block.eyebrow}
        </p>
        <h2
          className={cn(
            "mt-2.5 max-w-xl font-semibold tracking-tight",
            variant === "compact"
              ? "text-[26px] sm:text-[30px]"
              : "text-[32px] sm:text-[42px] lg:text-[48px]",
            "leading-[1.05]",
            dark ? "text-white" : "text-[#111111]"
          )}
        >
          {block.title}
        </h2>
        <p
          className={cn(
            "mt-3 max-w-md text-[15px] leading-relaxed sm:text-[16px]",
            dark ? "text-white/75" : "text-[#6B7280]"
          )}
        >
          {block.subtitle}
        </p>
        <button
          type="button"
          className={cn(
            "mt-6 inline-flex w-fit items-center gap-2 rounded-full px-5 py-3 text-[13px] font-semibold transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]",
            dark
              ? "bg-white text-[#111111]"
              : "bg-[#111111] text-white"
          )}
        >
          {block.cta}
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </div>
    </motion.section>
  );
}

/** Lifestyle tile used inside Pattern D */
export function LifestyleTile({
  image,
  label,
  className,
}: {
  image: string;
  label: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative overflow-hidden rounded-[24px]",
        "aspect-[16/10] sm:aspect-auto sm:h-full sm:min-h-[220px] lg:min-h-[260px]",
        className
      )}
    >

      <img
        src={image}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      <p className="absolute bottom-5 left-5 right-5 text-[15px] font-semibold tracking-tight text-white">
        {label}
      </p>
    </motion.div>
  );
}

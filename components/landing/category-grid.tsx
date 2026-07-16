"use client";

import Image from "next/image";
import {
  Zap,
  Footprints,
  Gem,
  Trophy,
  Mountain,
  Briefcase,
  Smile,
  Sparkles,
  Trees,
  Circle,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "motion/react";
import { FadeUp } from "@/components/ui/fade-up";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionShell } from "@/components/ui/section-shell";
import { CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconMap = {
  zap: Zap,
  footprints: Footprints,
  gem: Gem,
  trophy: Trophy,
  mountain: Mountain,
  briefcase: Briefcase,
  smile: Smile,
  sparkles: Sparkles,
  trees: Trees,
  circle: Circle,
} as const;

export function CategoryGrid() {
  return (
    <SectionShell theme="light">
      <div className="container-page">
        <FadeUp>
          <SectionHeader
            eyebrow="Browse"
            title="Shop by Category"
            subtitle="Premium collections from verified stores worldwide."
            href="#"
            linkLabel="See all"
          />
        </FadeUp>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {CATEGORIES.map((category, i) => {
            const Icon =
              iconMap[category.icon as keyof typeof iconMap] ?? Sparkles;
            const isFeatured = i === 0 && category.productCount >= 800;
            const isPopular = category.productCount >= 800;

            return (
              <FadeUp key={category.id} delay={i * 0.04}>
                <motion.a
                  href={`#${category.id}`}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "group relative block overflow-hidden rounded-[20px] bg-slate-100 card-shadow",
                    isFeatured
                      ? "aspect-4/5 sm:col-span-2 sm:row-span-2"
                      : "aspect-4/5"
                  )}
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                  <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                    <Icon className="h-4 w-4 text-white" />
                  </div>

                  {isPopular && (
                    <div className="absolute right-3 top-3 rounded-full bg-linear-to-r from-amber-500 to-orange-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-lg">
                      Popular
                    </div>
                  )}

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3.5">
                    <div>
                      <h3 className={cn(
                        "font-semibold text-white",
                        isFeatured ? "text-lg sm:text-xl" : "text-sm sm:text-base"
                      )}>
                        {category.name}
                      </h3>
                      <p className="mt-0.5 text-[11px] text-white/60">
                        {category.productCount.toLocaleString()} products
                      </p>
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/15 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </motion.a>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}

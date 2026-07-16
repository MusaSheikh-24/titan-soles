"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, ShieldCheck, BadgeCheck, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AISearchBar, PopularSearches } from "@/features/ai-assistant/ai-search-bar";
import { HeroVisual } from "@/components/landing/hero-visual";
import { TRUST_BADGES } from "@/lib/constants";

interface HeroProps {
  onOpenAI: (query?: string) => void;
}

const trustIcons = [ShieldCheck, BadgeCheck, Headphones];

export function Hero({ onOpenAI }: HeroProps) {
  const router = useRouter();

  return (
    <section className="theme-dark hero-gradient relative overflow-hidden pt-30 pb-12 text-foreground lg:pt-33 lg:pb-16">
      <div className="container-page relative">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6 xl:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-accent">
                <Sparkles className="h-3.5 w-3.5" />
                AI-Powered Footwear Discovery
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="text-hero font-bold tracking-tight text-white"
            >
              Find Your Perfect Shoes with{" "}
              <span className="gradient-text">Titan AI</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mt-4 max-w-lg text-base leading-relaxed text-muted"
            >
              Discover premium footwear through natural conversation, visual
              search, and verified marketplace intelligence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="mt-7"
              id="search"
            >
              <AISearchBar onOpen={onOpenAI} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="mt-4"
            >
              <PopularSearches
                onSelect={(term) =>
                  onOpenAI(`Show me the best ${term.toLowerCase()} shoes`)
                }
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-7 flex flex-wrap gap-3"
            >
              <Button size="lg" onClick={() => onOpenAI()} className="gap-2">
                <Sparkles className="h-4 w-4" />
                Start with Titan AI
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => router.push("/marketplace")}
                className="gap-2"
              >
                Browse Marketplace
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="mt-6 flex flex-wrap items-center gap-4"
            >
              {TRUST_BADGES.map((badge, i) => {
                const Icon = trustIcons[i] ?? ShieldCheck;
                return (
                  <div key={badge} className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Icon className="h-3.5 w-3.5 text-accent" />
                    {badge}
                  </div>
                );
              })}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.2 }}
            className="relative lg:col-span-6"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
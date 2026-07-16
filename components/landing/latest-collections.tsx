"use client";

import Image from "next/image";
import { ArrowUpRight, Sparkles, Calendar, ImageIcon } from "lucide-react";
import { motion } from "motion/react";
import { FadeUp } from "@/components/ui/fade-up";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionShell } from "@/components/ui/section-shell";
import { COLLECTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface CollectionCardProps {
  collection: (typeof COLLECTIONS)[0];
  index: number;
}

function CollectionCard({ collection, index }: CollectionCardProps) {
  const isSeasonal = !!collection.season;
  const isTrending = collection.itemCount >= 500;
  const isFirst = index === 0;

  return (
    <FadeUp delay={index * 0.05}>
      <motion.a
        href={`#${collection.id}`}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          "group relative mb-5 block break-inside-avoid overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40 transition-all duration-500",
          "hover:border-white/20 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]",
          collection.tall ? "aspect-3/4" : "aspect-4/3"
        )}
      >
        {/* Background image with enhanced zoom */}
        <Image
          src={collection.image}
          alt={collection.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={index === 0}
        />

        {/* Multi-layer gradient overlay for depth */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-transparent" />

        {/* Radial glow effect on hover */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(56,189,248,0.15),transparent_70%)]" />
        </div>

        {/* Accent bar with gradient */}
        <div className="absolute bottom-0 left-0 right-0 z-20 h-1 origin-left scale-x-0 bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500 transition-transform duration-500 ease-out group-hover:scale-x-100" />

        {/* Top badges */}
        <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-2">
          {isFirst && (
            <Badge variant="featured">
              <Sparkles className="h-3 w-3" />
              Featured
            </Badge>
          )}
          {isSeasonal && (
            <Badge variant="seasonal">
              <Calendar className="h-3 w-3" />
              {collection.season}
            </Badge>
          )}
          {isTrending && !isFirst && (
            <Badge variant="trending">
              <Sparkles className="h-3 w-3" />
              Trending
            </Badge>
          )}
        </div>

        {/* Bottom content */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0 flex-1 space-y-2">
              <h3 className="text-lg font-bold tracking-tight text-white sm:text-xl">
                {collection.name}
              </h3>
              <div className="flex items-center gap-1.5 text-xs font-medium text-white/70">
                <ImageIcon className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
                <span>{collection.itemCount.toLocaleString()} items</span>
              </div>
            </div>

            {/* Arrow button */}
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-md transition-all duration-300",
                "border border-white/10 group-hover:border-white/20",
                "sm:-translate-x-2 sm:opacity-0 sm:group-hover:translate-x-0 sm:group-hover:opacity-100"
              )}
            >
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-0 sm:-rotate-45" />
            </div>
          </div>
        </div>
      </motion.a>
    </FadeUp>
  );
}

interface BadgeProps {
  children: React.ReactNode;
  variant: "featured" | "seasonal" | "trending";
}

function Badge({ children, variant }: BadgeProps) {
  const variants = {
    featured:
      "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/30 text-white shadow-cyan-500/20",
    seasonal: "bg-white/10 border-white/20 text-white/90",
    trending:
      "bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-400/30 text-amber-200 shadow-amber-500/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide backdrop-blur-md shadow-lg",
        variants[variant]
      )}
    >
      {children}
    </span>
  );
}

export function LatestCollections() {
  return (
    <SectionShell theme="dark">
      <div className="container-page">
        <FadeUp>
          <SectionHeader
            eyebrow="Gallery"
            title="Latest Collections"
            subtitle="Curated drops from verified stores, updated weekly."
            href="#"
            linkLabel="View all"
          />
        </FadeUp>

        <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {COLLECTIONS.map((collection, i) => (
            <CollectionCard key={collection.id} collection={collection} index={i} />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
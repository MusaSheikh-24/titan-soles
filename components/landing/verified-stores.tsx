"use client";

import { Star, ShieldCheck, ArrowUpRight, MapPin, Package, Users } from "lucide-react";
import { motion } from "motion/react";
import { FadeUp } from "@/components/ui/fade-up";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionShell } from "@/components/ui/section-shell";
import { Button } from "@/components/ui/button";
import { VERIFIED_STORES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function VerifiedStores() {
  return (
    <SectionShell theme="light" id="stores" className="bg-white">
      <div className="container-page">
        <FadeUp>
          <SectionHeader
            eyebrow="Partners"
            title="Popular Verified Stores"
            subtitle="Shop with confidence from top-rated partner stores."
            href="#"
            linkLabel="Browse all stores"
          />
        </FadeUp>

        <div className="mt-10  flex gap-5 overflow-x-auto pb-4 scrollbar-hide lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
          {VERIFIED_STORES.map((store, i) => (
            <FadeUp key={store.id} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="group relative w-70 shrink-0 cursor-pointer rounded-3xl bg-white p-5 shadow-sm ring-1 ring-border transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 lg:w-auto"
              >
                {/* Hover background wash */}
                <div className="absolute inset-0 -z-10 rounded-3xl bg-linear-to-br from-primary/0 to-accent/0 opacity-0 transition-opacity duration-300 group-hover:from-primary/3 group-hover:to-accent/3 group-hover:opacity-100" />

                {/* Top row: logo + badge */}
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-accent text-xl font-bold text-white shadow-lg shadow-primary/25">
                    {store.logo}
                  </div>

                  {store.verified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-[11px] font-semibold text-success ring-1 ring-success/20">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Verified
                    </span>
                  )}
                </div>

                {/* Store name + location */}
                <div className="mt-4">
                  <h3 className="text-base font-bold text-gray-900 transition-colors group-hover:text-primary">
                    {store.name}
                  </h3>
                  {store.location && (
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                      <MapPin className="h-3.5 w-3.5 text-primary/60" />
                      {store.location}
                    </div>
                  )}
                </div>

                {/* Rating row */}
                <div className="mt-3 flex items-center gap-1.5">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className={cn(
                          "h-3.5 w-3.5",
                          starIndex < Math.floor(store.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "fill-gray-200 text-gray-200"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-gray-900">{store.rating}</span>
                  <span className="text-xs text-muted">rating</span>
                </div>

                {/* Stats row */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 rounded-xl border border-border bg-gray-50/50 px-3 py-2.5 transition-colors group-hover:border-primary/20 group-hover:bg-primary/2">
                    <Package className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-[10px] text-muted">Products</p>
                      <p className="text-sm font-bold text-gray-900">{store.products}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-border bg-gray-50/50 px-3 py-2.5 transition-colors group-hover:border-accent/20 group-hover:bg-accent/2">
                    <Users className="h-4 w-4 text-accent" />
                    <div>
                      <p className="text-[10px] text-muted">Followers</p>
                      <p className="text-sm font-bold text-gray-900">{store.followers}</p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <Button
                  size="sm"
                  className="mt-5 w-full gap-2 rounded-xl border border-border bg-white font-semibold text-gray-700 shadow-sm transition-all hover:border-primary/30 hover:bg-primary hover:text-white hover:shadow-md hover:shadow-primary/20"
                >
                  Visit Store
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
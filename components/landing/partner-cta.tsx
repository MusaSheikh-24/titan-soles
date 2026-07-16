"use client";

import {
  ArrowRight,
  Store,
  TrendingUp,
  Package,
  ShoppingCart,
  DollarSign,
  Check,
} from "lucide-react";
import { motion } from "motion/react";
import { FadeUp } from "@/components/ui/fade-up";
import { Button } from "@/components/ui/button";
import { PartnerTimelineDecor } from "@/components/landing/partner-timeline-decor";
import { PARTNER_BENEFITS, PARTNER_CHECKLIST } from "@/lib/constants";

export function PartnerCTA() {
  return (
    <section id="partner" className="section-padding bg-white">
      <div className="container-page">
        <FadeUp>
          <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-lg sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute inset-0 z-0">
              <div className="absolute top-0 right-0 h-100 w-100 rounded-full bg-primary/6 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-accent/4 blur-3xl" />
            </div>

            <PartnerTimelineDecor />

            <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  For Store Partners
                </p>
                <h2 className="mt-3 text-section font-bold tracking-tight text-gray-900">
                  Become a Verified Store
                </h2>
                <p className="mt-3 text-base leading-relaxed text-gray-500">
                  Join the future of footwear retail. Reach AI-powered shoppers
                  and grow with premium placement on Titan Soles.
                </p>

                <ul className="mt-6 space-y-2.5">
                  {PARTNER_BENEFITS.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2.5">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-success/10">
                        <Check className="h-3.5 w-3.5 text-success" />
                      </div>
                      <span className="text-sm text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 grid grid-cols-2 gap-2">
                  {PARTNER_CHECKLIST.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-xs text-gray-500"
                    >
                      <Check className="mb-1.5 h-3.5 w-3.5 text-primary" />
                      {item}
                    </div>
                  ))}
                </div>

                <Button
                  size="lg"
                  className="mt-8 gap-2 bg-linear-to-r from-primary to-accent text-white shadow-lg shadow-primary/25 hover:from-primary/90 hover:to-accent/90"
                >
                  Become a Verified Store
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="relative hidden lg:block">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="rounded-[20px] border border-gray-200 bg-white p-5 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-accent">
                          <Store className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Store Dashboard</p>
                          <p className="text-lg font-bold text-gray-900">
                            Premium Soles Co.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-success" />
                        <span className="text-[11px] font-medium text-success">
                          Top Rated
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-2.5">
                      {[
                        { icon: DollarSign, label: "Revenue", value: "$48.2K", change: "+12%" },
                        { icon: ShoppingCart, label: "Orders", value: "847", change: "+8%" },
                        { icon: Package, label: "Products", value: "156", change: "+3" },
                        { icon: TrendingUp, label: "Views", value: "12.4K", change: "+24%" },
                      ].map((stat) => {
                        const Icon = stat.icon;
                        return (
                          <div
                            key={stat.label}
                            className="rounded-2xl border border-gray-100 bg-gray-50 p-3.5"
                          >
                            <div className="flex items-center gap-1.5 text-gray-400">
                              <Icon className="h-3.5 w-3.5" />
                              <span className="text-[11px]">{stat.label}</span>
                            </div>
                            <p className="mt-1.5 text-lg font-bold text-gray-900">
                              {stat.value}
                            </p>
                            <p className="text-[11px] font-medium text-success">
                              {stat.change}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-3 h-20 rounded-2xl border border-gray-100 bg-linear-to-r from-primary/5 to-accent/5 p-3">
                      <p className="text-[11px] text-gray-400">Weekly Analytics</p>
                      <div className="mt-2 flex h-8 items-end gap-1">
                        {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-sm bg-linear-to-t from-primary to-accent"
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
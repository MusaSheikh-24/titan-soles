"use client";

import {
  Sparkles,
  Zap,
  ShieldCheck,
  BarChart3,
  Workflow,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Workflow,
    title: "Operations OS",
    description: "Unify inventory, orders, and store verification in one flow.",
  },
  {
    icon: Zap,
    title: "AI Automation",
    description: "Automate matching, pricing signals, and fulfillment checks.",
  },
  {
    icon: ShieldCheck,
    title: "Trust Layer",
    description: "Manual + AI verification for every partner store.",
  },
  {
    icon: BarChart3,
    title: "Realtime Insights",
    description: "Live analytics for marketplace performance and growth.",
  },
];

interface SyncOpsDrawerProps {
  children: React.ReactNode;
}

export function SyncOpsDrawer({ children }: SyncOpsDrawerProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader className="border-b border-[#E2E8F0] bg-gradient-to-br from-[#EFF6FF] via-white to-[#F0F9FF]">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#38BDF8] shadow-lg shadow-blue-500/25">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <SheetTitle className="text-xl">
            Powered by{" "}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#0284C7] bg-clip-text text-transparent">
              SyncOps
            </span>
          </SheetTitle>
          <SheetDescription className="text-[15px] leading-relaxed">
            The operations and intelligence layer behind Titan Soles — built for
            verified marketplaces, AI discovery, and premium commerce.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-5 flex items-center gap-2 rounded-2xl border border-[#BBF7D0] bg-[#F0FDF4] px-3.5 py-2.5 text-sm text-[#166534]">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            Trusted infrastructure for Titan Soles marketplace
          </div>

          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#64748B]">
            What SyncOps powers
          </h3>

          <div className="space-y-3">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 transition-colors hover:border-[#BFDBFE] hover:bg-[#EFF6FF]"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-[#E2E8F0]">
                    <Icon className="h-4 w-4 text-[#2563EB]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0F172A]">{title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-[#64748B]">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-[#E2E8F0] bg-white p-6">
          <Button className="w-full gap-2 rounded-2xl" asChild>
            <a href="https://syncops.com" target="_blank" rel="noreferrer">
              Visit SyncOps
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
          <p className="mt-3 text-center text-xs text-[#94A3B8]">
            Enterprise ops platform for AI-powered marketplaces
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

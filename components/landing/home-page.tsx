"use client";

import { useState, useCallback } from "react";
import { TopNotificationBar } from "@/components/layout/top-notification-bar";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Hero } from "@/components/landing/hero";
import { MarketplaceStats } from "@/components/landing/marketplace-stats";
import { CategoryGrid } from "@/components/landing/category-grid";
import { TrendingProducts } from "@/components/landing/trending-products";
import { AISection } from "@/components/landing/ai-section";
import { WhyTitanAI } from "@/components/landing/why-titan-ai";
import { VerifiedStores } from "@/components/landing/verified-stores";
import { LatestCollections } from "@/components/landing/latest-collections";
import { HowItWorks } from "@/components/landing/how-it-works";
import { PartnerCTA } from "@/components/landing/partner-cta";
import { AIChatDialog } from "@/features/ai-assistant/ai-chat-dialog";

export function HomePage() {
  const [aiOpen, setAiOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState<string | undefined>();

  const handleOpenAI = useCallback((query?: string) => {
    setAiQuery(query);
    setAiOpen(true);
  }, []);

  const handleOpenChange = useCallback((open: boolean) => {
    setAiOpen(open);
    if (!open) setAiQuery(undefined);
  }, []);

  return (
    <>
      <TopNotificationBar />
      <Navbar onOpenAI={() => handleOpenAI()} />
      <main>
        <Hero onOpenAI={handleOpenAI} />
        <MarketplaceStats />
        <CategoryGrid />
        <TrendingProducts />
        <AISection onOpenAI={() => handleOpenAI()} />
        <WhyTitanAI />
        <VerifiedStores />
        <LatestCollections />
        <HowItWorks />
        <PartnerCTA />
      </main>
      <Footer />
      <MobileNav onOpenAI={() => handleOpenAI()} />
      <AIChatDialog
        open={aiOpen}
        onOpenChange={handleOpenChange}
        initialQuery={aiQuery}
      />
    </>
  );
}

"use client";

import { useState } from "react";
import { SellerSidebar } from "@/components/seller/seller-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { AIChatDialog } from "@/features/ai-assistant/ai-chat-dialog";
import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/seller": "Dashboard",
  "/seller/products": "My Products",
  "/seller/orders": "Orders",
  "/seller/analytics": "Analytics",
  "/seller/settings": "Settings",
};

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const pathname = usePathname();

  const title = pageTitles[pathname] ?? "Seller";

  return (
    <div className="flex h-screen bg-background">
      <SellerSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader
          title={title}
          onMenuToggle={() => setMobileOpen(true)}
          onOpenAI={() => setAiOpen(true)}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="container-page py-6 md:py-8">{children}</div>
        </main>
      </div>
      <AIChatDialog open={aiOpen} onOpenChange={setAiOpen} />
    </div>
  );
}

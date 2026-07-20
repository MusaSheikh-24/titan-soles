"use client";

import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { AIChatDialog } from "@/features/ai-assistant/ai-chat-dialog";
import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/profile": "My Profile",
  "/dashboard/wishlist": "Wishlist",
  "/dashboard/requests": "My Requests",
  "/dashboard/request-history": "Request History",
  "/dashboard/notifications": "Notifications",
  "/dashboard/settings": "Settings",
  "/dashboard/help": "Help & Support",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const pathname = usePathname();

  const title = pageTitles[pathname] ?? "Dashboard";

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar
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
        <main className="flex-1 overflow-y-auto theme-light bg-background">
          <div className="container-page py-6 md:py-8">{children}</div>
        </main>
      </div>
      <AIChatDialog open={aiOpen} onOpenChange={setAiOpen} />
    </div>
  );
}

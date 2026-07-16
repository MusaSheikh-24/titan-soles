"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { AIChatDialog } from "@/features/ai-assistant/ai-chat-dialog";
import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/products": "Products",
  "/admin/orders": "Orders",
  "/admin/users": "Users",
  "/admin/analytics": "Analytics",
  "/admin/messages": "Messages",
  "/admin/settings": "Settings",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const pathname = usePathname();

  const title = pageTitles[pathname] ?? "Admin";

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar
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

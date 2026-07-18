"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/logo";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  X,
  Home,
} from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/seller", label: "Dashboard", icon: LayoutDashboard },
  { href: "/seller/products", label: "My Products", icon: Package },
  { href: "/seller/orders", label: "Orders", icon: ShoppingCart },
  { href: "/seller/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/seller/settings", label: "Settings", icon: Settings },
];

interface SellerSidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function SellerSidebar({
  collapsed = false,
  onToggle,
  mobileOpen = false,
  onMobileClose,
}: SellerSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-border px-5">
        <Link href="/" className={cn("transition-all", collapsed && "scale-90")}>
          <Logo variant="dark" />
        </Link>
        <button
          onClick={onMobileClose ?? onToggle}
          className="flex h-8 w-8 items-center justify-center rounded-xl text-muted transition-colors hover:bg-white/5 hover:text-foreground lg:hidden"
        >
          <X className="h-4 w-4" />
        </button>
        <button
          onClick={onToggle}
          className="hidden h-8 w-8 items-center justify-center rounded-xl text-muted transition-colors hover:bg-white/5 hover:text-foreground lg:flex"
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map((item) => {
          const isActive =
            item.href === "/seller"
              ? pathname === "/seller"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={cn(
                "group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "text-muted hover:bg-white/5 hover:text-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute inset-0 -z-10 rounded-2xl bg-primary shadow-lg shadow-primary/20"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}

        {/* Logout */}
        <button
          onClick={() => {
            onMobileClose?.();
            handleLogout();
          }}
          className={cn(
            "group relative flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all duration-200 text-muted hover:bg-white/5 hover:text-foreground",
            collapsed && "justify-center px-2"
          )}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </nav>

      {/* Bottom section */}
      <div className="border-t border-border p-4">
        <Link
          href="/"
          className={cn(
            "group mb-3 flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all duration-200 text-muted hover:bg-white/5 hover:text-foreground",
            collapsed && "justify-center px-2"
          )}
        >
          <Home className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Back to Home</span>}
        </Link>
        <div className="flex items-center gap-3 rounded-2xl bg-white/3 p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-primary to-accent text-[10px] font-bold text-white">
            TS
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">Seller Portal</p>
              <p className="truncate text-xs text-muted">Titan Soles</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden border-r border-border bg-background lg:flex lg:flex-col",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onMobileClose}
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative z-10 flex h-full w-72 flex-col border-r border-border bg-background"
          >
            {sidebarContent}
          </motion.aside>
        </div>
      )}
    </>
  );
}

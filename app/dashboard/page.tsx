"use client";

import { StatCard } from "@/components/admin/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import {
  Heart,
  MessageSquare,
  Clock,
  Bell,
  Package,
  ShieldCheck,
  ArrowUpRight,
  TrendingUp,
  Sparkles,
  Search,
  LayoutGrid,
} from "lucide-react";

const stats = [
  { title: "Wishlist Items", value: "12", change: "+3", trend: "up" as const, icon: Heart, iconColor: "text-rose-500" as const },
  { title: "Active Requests", value: "4", change: "+1", trend: "up" as const, icon: MessageSquare, iconColor: "text-blue-600" as const },
  { title: "Completed", value: "18", change: "+5", trend: "up" as const, icon: Clock, iconColor: "text-emerald-600" as const },
  { title: "Notifications", value: "7", change: "+2", trend: "up" as const, icon: Bell, iconColor: "text-amber-600" as const },
];

const recentRequests = [
  { id: "#RQ-1042", product: "Nike Air Max 90", seller: "Premium Kicks", amount: "$189.00", status: "pending", time: "2 min ago" },
  { id: "#RQ-1041", product: "Adidas Ultraboost 5", seller: "Sneaker Vault", amount: "$210.00", status: "accepted", time: "15 min ago" },
  { id: "#RQ-1040", product: "New Balance 574", seller: "Urban Footwear", amount: "$145.00", status: "negotiating", time: "32 min ago" },
  { id: "#RQ-1039", product: "ASICS Gel-Kayano 30", seller: "Runner's Hub", amount: "$175.00", status: "completed", time: "1h ago" },
  { id: "#RQ-1038", product: "Converse Chuck 70 Hi", seller: "Sneaker Vault", amount: "$95.00", status: "declined", time: "2h ago" },
  { id: "#RQ-1037", product: "Vans Old Skool", seller: "Urban Footwear", amount: "$75.00", status: "completed", time: "3h ago" },
];

const wishlistItems = [
  { name: "Air Max 90", price: "$189", store: "Premium Kicks", inStock: true },
  { name: "Ultraboost 5", price: "$210", store: "Sneaker Vault", inStock: true },
  { name: "Classic Leather", price: "$145", store: "Urban Footwear", inStock: false },
  { name: "Gel-Kayano 30", price: "$175", store: "Runner's Hub", inStock: true },
];

const requestStatusStyles: Record<string, string> = {
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  accepted: "bg-blue-50 text-blue-700 border-blue-200",
  negotiating: "bg-amber-50 text-amber-700 border-amber-200",
  pending: "bg-orange-50 text-orange-700 border-orange-200",
  declined: "bg-red-50 text-red-700 border-red-200",
};

export default function UserDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* ── Page header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome back, {user?.name?.split(" ")[0] ?? "User"}
          </h1>
          <p className="text-sm text-gray-500">Here&apos;s what&apos;s happening in your sneaker world.</p>
        </div>
        <Button className="gap-2 shadow-sm rounded-xl h-10" asChild>
          <Link href="/marketplace">
            <Search className="h-4 w-4" />
            Browse Marketplace
          </Link>
        </Button>
      </div>

      {/* ── Stats grid ── */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* ── Activity + Quick Actions ── */}
      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
          <Card className="shadow-sm border-gray-200 rounded-2xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-gray-50/80 to-white border-b border-gray-100">
              <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-blue-600" />
                Recent Requests
              </CardTitle>
              <Link href="/dashboard/requests">
                <Button variant="ghost" size="sm" className="gap-1 text-xs text-gray-500 hover:text-blue-600 hover:bg-blue-50">
                  View All <ArrowUpRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {recentRequests.map((req) => (
                  <div key={req.id} className="flex items-center justify-between px-6 py-3.5 transition-colors hover:bg-gray-50 group">
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 text-xs font-semibold text-gray-600 group-hover:from-blue-50 group-hover:to-blue-100 group-hover:text-blue-600 transition-all">
                        {req.id.slice(-4)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{req.product}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{req.seller} · {req.amount}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={`border px-2.5 py-0.5 text-[11px] font-medium rounded-lg ${requestStatusStyles[req.status]}`}>
                        {req.status}
                      </Badge>
                      <span className="text-xs text-gray-400 tabular-nums">{req.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="h-full shadow-sm border-gray-200 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-50/80 to-white border-b border-gray-100">
              <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <LayoutGrid className="h-4 w-4 text-blue-600" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-5">
              <Button className="w-full justify-start gap-3 h-12 rounded-xl shadow-sm" asChild>
                <Link href="/marketplace">
                  <Search className="h-4 w-4" />
                  Browse Products
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-12 border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 rounded-xl" asChild>
                <Link href="/dashboard/wishlist">
                  <Heart className="h-4 w-4" />
                  View Wishlist
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-12 border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 rounded-xl" asChild>
                <Link href="/dashboard/requests">
                  <MessageSquare className="h-4 w-4" />
                  My Requests
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-12 border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 rounded-xl" asChild>
                <Link href="/dashboard/notifications">
                  <Bell className="h-4 w-4" />
                  Notifications
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* ── Wishlist + Tips ── */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="shadow-sm border-gray-200 rounded-2xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-gray-50/80 to-white border-b border-gray-100">
              <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <Heart className="h-4 w-4 text-rose-500" />
                Wishlist
              </CardTitle>
              <Link href="/dashboard/wishlist">
                <Button variant="ghost" size="sm" className="gap-1 text-xs text-gray-500 hover:text-rose-600 hover:bg-rose-50">
                  View All <ArrowUpRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {wishlistItems.map((item) => (
                  <div key={item.name} className="flex items-center justify-between px-6 py-3.5 transition-colors hover:bg-gray-50 group">
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-500 group-hover:bg-rose-100 transition-colors">
                        <Heart className="h-4 w-4" fill="currentColor" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{item.store} · {item.price}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${
                      item.inStock ? "bg-emerald-50 text-emerald-700" : "bg-gray-50 text-gray-500"
                    }`}>
                      {item.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="h-full shadow-sm border-gray-200 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-50/80 to-white border-b border-gray-100">
              <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Tips & Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3.5 p-5">
              <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/50 p-4 transition-all hover:shadow-sm hover:border-blue-300/50">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10">
                    <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">AI-Powered Discovery</p>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed pl-9">
                  Use Titan AI to find sneakers that match your style. Our AI analyzes trends and preferences to recommend the perfect pair.
                </p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200/50 p-4 transition-all hover:shadow-sm hover:border-emerald-300/50">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">Verified Sellers Only</p>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed pl-9">
                  Every seller on Titan Soles is verified. Your purchases are protected by our authentication guarantee.
                </p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/50 p-4 transition-all hover:shadow-sm hover:border-amber-300/50">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10">
                    <Package className="h-3.5 w-3.5 text-amber-600" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">Request & Negotiate</p>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed pl-9">
                  Found something you like? Send a request to the seller. You can negotiate pricing and shipping directly.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

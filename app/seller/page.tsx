"use client";

import { StatCard } from "@/components/admin/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import {
  Package,
  ShoppingCart,
  DollarSign,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  Plus,
  Eye,
  TrendingUp,
  LayoutGrid,
} from "lucide-react";

const stats = [
  { title: "Total Products", value: "156", change: "+12", trend: "up" as const, icon: Package, iconColor: "text-blue-600" as const },
  { title: "Total Orders", value: "847", change: "+8.2%", trend: "up" as const, icon: ShoppingCart, iconColor: "text-emerald-600" as const },
  { title: "Total Revenue", value: "$48,250", change: "+18.5%", trend: "up" as const, icon: DollarSign, iconColor: "text-amber-600" as const },
  { title: "Pending Orders", value: "23", change: "-5", trend: "down" as const, icon: Clock, iconColor: "text-rose-600" as const },
];

const recentOrders = [
  { id: "#1042", customer: "Sarah Johnson", product: "Air Max 90", amount: "$189.00", status: "completed", time: "2 min ago" },
  { id: "#1041", customer: "Mike Chen", product: "Ultraboost 5", amount: "$210.00", status: "processing", time: "15 min ago" },
  { id: "#1040", customer: "Emily Rodriguez", product: "Classic Leather", amount: "$145.00", status: "pending", time: "32 min ago" },
  { id: "#1039", customer: "Alex Thompson", product: "Gel-Kayano 30", amount: "$175.00", status: "completed", time: "1h ago" },
  { id: "#1038", customer: "Jessica Park", product: "Chuck 70 Hi", amount: "$95.00", status: "pending", time: "2h ago" },
];

const bestSellers = [
  { name: "Air Max 90", price: "$189", sold: 342, revenue: "$64,638", growth: "+18%" },
  { name: "Ultraboost 5", price: "$210", sold: 287, revenue: "$60,270", growth: "+12%" },
  { name: "Classic Leather", price: "$145", sold: 231, revenue: "$33,495", growth: "+24%" },
  { name: "Gel-Kayano 30", price: "$175", sold: 198, revenue: "$34,650", growth: "-3%" },
  { name: "Chuck 70 Hi", price: "$95", sold: 156, revenue: "$14,820", growth: "+8%" },
];

const salesData = [
  { month: "Jan", sales: 12400 },
  { month: "Feb", sales: 18200 },
  { month: "Mar", sales: 15800 },
  { month: "Apr", sales: 22100 },
  { month: "May", sales: 19500 },
  { month: "Jun", sales: 28400 },
  { month: "Jul", sales: 25600 },
  { month: "Aug", sales: 32100 },
  { month: "Sep", sales: 29800 },
  { month: "Oct", sales: 35400 },
  { month: "Nov", sales: 41200 },
  { month: "Dec", sales: 38200 },
];

const statusStyles: Record<string, string> = {
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  processing: "bg-blue-50 text-blue-700 border-blue-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

export default function SellerDashboard() {
  const { user } = useAuth();
  const maxSales = Math.max(...salesData.map((d) => d.sales));

  return (
    <div className="space-y-8">
      {/* ── Page header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome back, {user?.name?.split(" ")[0] ?? "Seller"}
          </h1>
          <p className="text-sm text-gray-500">Here&apos;s what&apos;s happening with your store today.</p>
        </div>
        <Button className="gap-2 shadow-sm rounded-xl h-10" asChild>
          <Link href="/seller/products">
            <Plus className="h-4 w-4" />
            Add Product
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

      {/* ── Sales Chart + Quick Actions ── */}
      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
          <Card className="shadow-sm border-gray-200 rounded-2xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between bg-linear-to-r from-gray-50/80 to-white border-b border-gray-100">
              <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                Sales Overview
              </CardTitle>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                <span className="font-medium text-emerald-600">+18.5%</span>
                <span>vs last year</span>
              </div>
            </CardHeader>
            <CardContent className="p-5">
              <div className="flex items-end gap-2 h-44">
                {salesData.map((d) => (
                  <div key={d.month} className="flex flex-1 flex-col items-center gap-1.5">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(d.sales / maxSales) * 100}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="w-full max-w-8 rounded-lg bg-linear-to-t from-blue-500 to-blue-300 hover:from-blue-600 hover:to-blue-400 transition-colors cursor-pointer"
                    />
                    <span className="text-[10px] text-gray-400">{d.month}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="h-full shadow-sm border-gray-200 rounded-2xl overflow-hidden">
            <CardHeader className="bg-linear-to-r from-gray-50/80 to-white border-b border-gray-100">
              <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <LayoutGrid className="h-4 w-4 text-blue-600" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-5">
              <Button className="w-full justify-start gap-3 h-12 rounded-xl shadow-sm" asChild>
                <Link href="/seller/products">
                  <Plus className="h-4 w-4" />
                  Add Product
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-12 border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 rounded-xl" asChild>
                <Link href="/seller/orders">
                  <Eye className="h-4 w-4" />
                  View Orders
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-12 border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 rounded-xl" asChild>
                <Link href="/seller/analytics">
                  <TrendingUp className="h-4 w-4" />
                  View Analytics
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-12 border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 rounded-xl" asChild>
                <Link href="/seller/settings">
                  <Package className="h-4 w-4" />
                  Store Settings
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* ── Recent Orders + Best Sellers ── */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="shadow-sm border-gray-200 rounded-2xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between bg-linear-to-r from-gray-50/80 to-white border-b border-gray-100">
              <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <ShoppingCart className="h-4 w-4 text-blue-600" />
                Recent Orders
              </CardTitle>
              <Link href="/seller/orders">
                <Button variant="ghost" size="sm" className="gap-1 text-xs text-gray-500 hover:text-blue-600 hover:bg-blue-50">
                  View All <ArrowUpRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between px-6 py-3.5 transition-colors hover:bg-gray-50 group">
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-gray-100 to-gray-200 text-xs font-semibold text-gray-600 group-hover:from-blue-50 group-hover:to-blue-100 group-hover:text-blue-600 transition-all">
                        {order.id.slice(-3)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{order.customer}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{order.product} · {order.amount}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={`border px-2.5 py-0.5 text-[11px] font-medium rounded-lg ${statusStyles[order.status]}`}>
                        {order.status}
                      </Badge>
                      <span className="text-xs text-gray-400 tabular-nums">{order.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="shadow-sm border-gray-200 rounded-2xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between bg-linear-to-r from-gray-50/80 to-white border-b border-gray-100">
              <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <Package className="h-4 w-4 text-amber-500" />
                Best Selling Products
              </CardTitle>
              <Link href="/seller/products">
                <Button variant="ghost" size="sm" className="gap-1 text-xs text-gray-500 hover:text-blue-600 hover:bg-blue-50">
                  View All <ArrowUpRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {bestSellers.map((product, i) => (
                  <div key={product.name} className="flex items-center justify-between px-6 py-3.5 transition-colors hover:bg-gray-50 group">
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-blue-50 to-blue-100 text-xs font-bold text-blue-600 group-hover:from-blue-100 group-hover:to-blue-200 transition-all">
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{product.sold} units sold · {product.price}</p>
                      </div>

                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">{product.revenue}</p>
                      <span className={`text-xs font-medium ${product.growth.startsWith("+") ? "text-emerald-600" : "text-red-600"}`}>
                        {product.growth}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

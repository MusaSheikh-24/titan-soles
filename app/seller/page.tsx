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
} from "lucide-react";

// ── Mock Data ──

const stats = [
  { title: "Total Products", value: "156", change: "+12", trend: "up" as const, icon: Package, iconColor: "text-primary" as const },
  { title: "Total Orders", value: "847", change: "+8.2%", trend: "up" as const, icon: ShoppingCart, iconColor: "text-success" as const },
  { title: "Total Revenue", value: "$48,250", change: "+18.5%", trend: "up" as const, icon: DollarSign, iconColor: "text-accent" as const },
  { title: "Pending Orders", value: "23", change: "-5", trend: "down" as const, icon: Clock, iconColor: "text-warning" as const },
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
  completed: "bg-success/10 text-success border-success/20",
  processing: "bg-accent/10 text-accent border-accent/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  cancelled: "bg-danger/10 text-danger border-danger/20",
};

const statusIcons: Record<string, React.ReactNode> = {
  completed: <CheckCircle2 className="h-3 w-3" />,
  processing: <Clock className="h-3 w-3" />,
  pending: <Clock className="h-3 w-3" />,
  cancelled: <CheckCircle2 className="h-3 w-3" />,
};

export default function SellerDashboard() {
  const { user } = useAuth();
  const maxSales = Math.max(...salesData.map((d) => d.sales));

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-section text-foreground">Welcome back, {user?.name?.split(" ")[0] ?? "Seller"}</h2>
          <p className="mt-1 text-muted">Here&apos;s what&apos;s happening with your store today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-1.5" asChild>
            <Link href="/seller/products">
              <Plus className="h-4 w-4" />
              Add Product
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Sales Overview Chart + Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sales Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Sales Overview</CardTitle>
              <div className="flex items-center gap-2 text-xs text-muted">
                <TrendingUp className="h-3.5 w-3.5 text-success" />
                <span className="font-medium text-success">+18.5%</span>
                <span>vs last year</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2 h-44">
                {salesData.map((d) => (
                  <div key={d.month} className="flex flex-1 flex-col items-center gap-1.5">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(d.sales / maxSales) * 100}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="w-full max-w-8 rounded-lg bg-linear-to-t from-primary/60 to-primary/30 hover:from-primary/80 hover:to-primary/50 transition-colors cursor-pointer"
                    />
                    <span className="text-[10px] text-muted">{d.month}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start gap-3 h-12" asChild>
                <Link href="/seller/products">
                  <Plus className="h-4 w-4" />
                  Add Product
                </Link>
              </Button>
              <Button variant="secondary" className="w-full justify-start gap-3 h-12" asChild>
                <Link href="/seller/orders">
                  <Eye className="h-4 w-4" />
                  View Orders
                </Link>
              </Button>
              <Button variant="secondary" className="w-full justify-start gap-3 h-12" asChild>
                <Link href="/seller/analytics">
                  <TrendingUp className="h-4 w-4" />
                  View Analytics
                </Link>
              </Button>
              <Button variant="secondary" className="w-full justify-start gap-3 h-12" asChild>
                <Link href="/seller/settings">
                  <Package className="h-4 w-4" />
                  Store Settings
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Orders + Best Selling Products */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Link href="/seller/orders">
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  View All <ArrowUpRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between px-6 py-3.5 transition-colors hover:bg-white/2">
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/4 text-xs font-medium text-muted">
                        {order.id.slice(-3)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{order.customer}</p>
                        <p className="text-xs text-muted">{order.product} · {order.amount}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={`flex items-center gap-1 border px-2 py-0.5 text-[11px] ${statusStyles[order.status]}`}>
                        {statusIcons[order.status]}
                        {order.status}
                      </Badge>
                      <span className="text-xs text-muted">{order.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Best Selling Products */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Best Selling Products</CardTitle>
              <Link href="/seller/products">
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  View All <ArrowUpRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {bestSellers.map((product, i) => (
                  <div key={product.name} className="flex items-center justify-between px-6 py-3.5 transition-colors hover:bg-white/2">
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-xs font-semibold text-primary">
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{product.name}</p>
                        <p className="text-xs text-muted">{product.sold} units sold · {product.price}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{product.revenue}</p>
                      <span className={`text-xs font-medium ${product.growth.startsWith("+") ? "text-success" : "text-danger"}`}>
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

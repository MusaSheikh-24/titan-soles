"use client";

import { StatCard } from "@/components/admin/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { exportToCSV } from "@/lib/export-csv";
import Link from "next/link";
import {
  DollarSign,
  ShoppingBag,
  Users,
  Eye,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  XCircle,
  Package,
  Plus,
  Download,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const stats = [
  { title: "Total Revenue", value: "$84,250", change: "+12.5%", trend: "up" as const, icon: DollarSign, iconColor: "text-primary" as const },
  { title: "Active Orders", value: "1,482", change: "+8.2%", trend: "up" as const, icon: ShoppingBag, iconColor: "text-success" as const },
  { title: "Total Users", value: "24.5K", change: "+3.1%", trend: "up" as const, icon: Users, iconColor: "text-accent" as const },
  { title: "Conversion Rate", value: "3.24%", change: "-0.8%", trend: "down" as const, icon: Eye, iconColor: "text-warning" as const },
];

const recentOrders = [
  { id: "#1042", customer: "Sarah Johnson", product: "Air Max 90", amount: "$189.00", status: "completed", time: "2 min ago" },
  { id: "#1041", customer: "Mike Chen", product: "Ultraboost 5", amount: "$210.00", status: "processing", time: "15 min ago" },
  { id: "#1040", customer: "Emily Rodriguez", product: "Classic Leather", amount: "$145.00", status: "pending", time: "32 min ago" },
  { id: "#1039", customer: "Alex Thompson", product: "Gel-Kayano 30", amount: "$175.00", status: "completed", time: "1h ago" },
  { id: "#1038", customer: "Jessica Park", product: "Chuck 70 Hi", amount: "$95.00", status: "cancelled", time: "2h ago" },
];

const topProducts = [
  { name: "Air Max 90", sales: 342, revenue: "$64,638", change: "+18%" },
  { name: "Ultraboost 5", sales: 287, revenue: "$60,270", change: "+12%" },
  { name: "Classic Leather", sales: 231, revenue: "$33,495", change: "+24%" },
  { name: "Gel-Kayano 30", sales: 198, revenue: "$34,650", change: "-3%" },
  { name: "Chuck 70 Hi", sales: 156, revenue: "$14,820", change: "+8%" },
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
  cancelled: <XCircle className="h-3 w-3" />,
};

export default function AdminDashboard() {
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [reporting, setReporting] = useState(false);

  const handleDownloadReport = () => {
    setReporting(true);
    const summary = [
      { metric: "Total Revenue", value: "$84,250", change: "+12.5%" },
      { metric: "Active Orders", value: "1,482", change: "+8.2%" },
      { metric: "Total Users", value: "24.5K", change: "+3.1%" },
      { metric: "Conversion Rate", value: "3.24%", change: "-0.8%" },
    ];
    const topProductsExport = topProducts.map((p) => ({
      product: p.name,
      sales: String(p.sales),
      revenue: p.revenue,
      growth: p.change,
    }));
    exportToCSV(
      summary,
      [
        { key: "metric", label: "Metric" },
        { key: "value", label: "Value" },
        { key: "change", label: "Change" },
      ],
      `dashboard-report-${new Date().toISOString().split("T")[0]}`
    );
    setTimeout(() => setReporting(false), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-section text-foreground">Welcome back, John</h2>
          <p className="mt-1 text-muted">Here&apos;s what&apos;s happening with your marketplace today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-1.5" onClick={handleDownloadReport} disabled={reporting}>
            <Download className="h-4 w-4" />
            {reporting ? "Downloading..." : "Download Report"}
          </Button>
          <Dialog open={productDialogOpen} onOpenChange={setProductDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1.5">
                <Plus className="h-4 w-4" />
                New Product
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Product</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Product Name</label>
                  <Input placeholder="e.g. Air Max 90" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Brand</label>
                    <Input placeholder="Nike" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Price</label>
                    <Input placeholder="$189" type="number" />
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="outline" size="sm" onClick={() => setProductDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={() => setProductDialogOpen(false)}>
                    Add Product
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
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

      {/* Two-column layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Link href="/admin/orders">
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  View All <ArrowUpRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between px-6 py-3.5 transition-colors hover:bg-white/[0.02]">
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] text-xs font-medium text-muted">
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

        {/* Top Products */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Top Products</CardTitle>
              <Link href="/admin/products">
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  View All <ArrowUpRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {topProducts.map((product, i) => (
                  <div key={product.name} className="flex items-center justify-between px-6 py-3.5 transition-colors hover:bg-white/[0.02]">
                    <div className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-xs font-semibold text-primary">
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{product.name}</p>
                        <p className="text-xs text-muted">{product.sales} units sold</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{product.revenue}</p>
                      <span className={`text-xs font-medium ${product.change.startsWith("+") ? "text-success" : "text-danger"}`}>
                        {product.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Activity feed */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New seller registered", detail: "Premium Sneakers Co.", time: "12m ago", type: "user" },
                { action: "Product listed", detail: "Nike Air Force 1 '07 (3 variants)", time: "28m ago", type: "product" },
                { action: "Order shipped", detail: "#1037 to David Kim", time: "45m ago", type: "order" },
                { action: "Review flagged", detail: "Product: Ultraboost 5", time: "1h ago", type: "flag" },
                { action: "AI recommendations updated", detail: "12 new products analyzed", time: "2h ago", type: "ai" },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-xl text-xs ${
                    activity.type === "user" ? "bg-primary/10 text-primary" : activity.type === "product" ? "bg-success/10 text-success" : activity.type === "order" ? "bg-accent/10 text-accent" : activity.type === "flag" ? "bg-warning/10 text-warning" : "bg-gradient-to-br from-primary/10 to-accent/10 text-accent"
                  }`}>
                    {activity.type === "user" ? "U" : activity.type === "product" ? "P" : activity.type === "order" ? "O" : activity.type === "flag" ? "!" : "AI"}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted">{activity.detail}</p>
                  </div>
                  <span className="text-xs text-muted">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

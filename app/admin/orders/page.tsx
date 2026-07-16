"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  ShoppingCart,
  MoreHorizontal,
  Download,
  CheckCircle2,
  Clock,
  XCircle,
  Package,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import { useTableSort } from "@/lib/use-table-sort";
import { exportToCSV } from "@/lib/export-csv";

const orders = [
  { id: "#1042", customer: "Sarah Johnson", email: "sarah.j@email.com", product: "Air Max 90", amount: 189, status: "completed", date: "2026-07-16", items: 2 },
  { id: "#1041", customer: "Mike Chen", email: "mike.chen@email.com", product: "Ultraboost 5", amount: 210, status: "shipped", date: "2026-07-16", items: 1 },
  { id: "#1040", customer: "Emily Rodriguez", email: "emily.r@email.com", product: "Classic Leather", amount: 145, status: "processing", date: "2026-07-15", items: 1 },
  { id: "#1039", customer: "Alex Thompson", email: "alex.t@email.com", product: "Gel-Kayano 30", amount: 175, status: "pending", date: "2026-07-15", items: 1 },
  { id: "#1038", customer: "Jessica Park", email: "jessica.p@email.com", product: "Chuck 70 Hi ×2", amount: 190, status: "completed", date: "2026-07-14", items: 2 },
  { id: "#1037", customer: "David Kim", email: "david.k@email.com", product: "Old Skool", amount: 85, status: "shipped", date: "2026-07-14", items: 1 },
  { id: "#1036", customer: "Lisa Wang", email: "lisa.w@email.com", product: "990v6", amount: 220, status: "cancelled", date: "2026-07-13", items: 1 },
  { id: "#1035", customer: "James Wilson", email: "james.w@email.com", product: "Speedcross 5", amount: 165, status: "completed", date: "2026-07-13", items: 3 },
  { id: "#1034", customer: "Olivia Brown", email: "olivia.b@email.com", product: "Cloudstratus", amount: 190, status: "processing", date: "2026-07-12", items: 1 },
  { id: "#1033", customer: "Ryan Taylor", email: "ryan.t@email.com", product: "LeBron XXI", amount: 210, status: "completed", date: "2026-07-12", items: 1 },
];

const statusStyles: Record<string, string> = {
  completed: "bg-success/10 text-success border-success/20",
  shipped: "bg-primary/10 text-primary border-primary/20",
  processing: "bg-accent/10 text-accent border-accent/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  cancelled: "bg-danger/10 text-danger border-danger/20",
};

const statusIcons: Record<string, React.ReactNode> = {
  completed: <CheckCircle2 className="h-3 w-3" />,
  shipped: <Truck className="h-3 w-3" />,
  processing: <Package className="h-3 w-3" />,
  pending: <Clock className="h-3 w-3" />,
  cancelled: <XCircle className="h-3 w-3" />,
};

export default function AdminOrders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        !searchQuery ||
        o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.product.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || o.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const { sorted, sort, toggleSort } = useTableSort(filtered, "date");

  const stats = useMemo(() => {
    const total = orders.length;
    const completedOrders = orders.filter((o) => o.status === "completed").length;
    const processingOrders = orders.filter((o) => o.status === "processing" || o.status === "pending").length;
    const revenue = orders.filter((o) => o.status !== "cancelled").reduce((sum, o) => sum + o.amount, 0);
    return { total, completed: completedOrders, processing: processingOrders, revenue };
  }, []);

  const filteredRevenue = filtered
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.amount, 0);

  const handleExport = () => {
    exportToCSV(
      filtered.map((o) => ({
        ...o,
        amount: `$${o.amount}`,
      })),
      [
        { key: "id", label: "Order ID" },
        { key: "customer", label: "Customer" },
        { key: "email", label: "Email" },
        { key: "product", label: "Product" },
        { key: "amount", label: "Amount" },
        { key: "status", label: "Status" },
        { key: "date", label: "Date" },
      ],
      `orders-export-${new Date().toISOString().split("T")[0]}`
    );
  };

  const filterChips = [
    { key: "all", label: "All" },
    { key: "completed", label: "Completed" },
    { key: "shipped", label: "Shipped" },
    { key: "processing", label: "Processing" },
    { key: "pending", label: "Pending" },
    { key: "cancelled", label: "Cancelled" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats row — reactive to filters */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total Orders", value: stats.total.toLocaleString(), change: "+8.2%", up: true, filtered: filtered.length !== stats.total },
          { label: "Completed", value: stats.completed.toLocaleString(), change: "+12%", up: true },
          { label: "Processing", value: stats.processing.toLocaleString(), change: "-3%", up: false },
          { label: "Revenue", value: `$${filteredRevenue >= 0 ? filteredRevenue.toLocaleString() : "0"}`, change: "+15%", up: true },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-4 card-shadow transition-all duration-200">
            <p className="text-xs text-muted">{s.label}</p>
            <p className="mt-1 text-xl font-semibold text-foreground">{s.value}</p>
            <span className={cn("text-xs font-medium", s.up ? "text-success" : "text-danger")}>
              {s.change}
            </span>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted">
            {filtered.length} of {orders.length} orders
            {statusFilter !== "all" && ` · ${statusFilter}`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-56 rounded-2xl border-white/5 bg-white/[0.04] pl-9 text-sm placeholder:text-muted/60"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-1.5" onClick={handleExport}>
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Status chips */}
      <div className="flex flex-wrap items-center gap-2">
        {filterChips.map((chip) => (
          <button
            key={chip.key}
            onClick={() => setStatusFilter(chip.key)}
            className={cn(
              "chip",
              statusFilter === chip.key ? "chip-active" : "chip-idle"
            )}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Orders table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardHeader className="border-b border-border pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">All Orders</CardTitle>
              <span className="text-xs text-muted">{filtered.length} orders</span>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    {[
                      { key: "id", label: "Order" },
                      { key: "customer", label: "Customer" },
                      { key: "product", label: "Product" },
                      { key: "amount", label: "Amount" },
                      { key: "status", label: "Status" },
                      { key: "date", label: "Date" },
                    ].map(({ key, label }) => (
                      <th
                        key={key}
                        className="cursor-pointer whitespace-nowrap px-6 py-3 text-left text-xs font-medium text-muted transition-colors hover:text-foreground"
                        onClick={() => toggleSort(key)}
                      >
                        <div className="flex items-center gap-1">
                          {label}
                          <ArrowUpDown className={cn("h-3 w-3", sort.key === key ? "text-primary" : "text-border")} />
                        </div>
                      </th>
                    ))}
                    <th className="px-6 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {sorted.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-sm text-muted">
                        No orders match your filters
                      </td>
                    </tr>
                  ) : (
                    sorted.map((order, i) => (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.02 }}
                        className="transition-colors hover:bg-white/[0.02]"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04]">
                              <ShoppingCart className="h-4 w-4 text-muted" />
                            </div>
                            <span className="text-sm font-medium text-foreground">{order.id}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-foreground">{order.customer}</p>
                          <p className="text-xs text-muted">{order.email}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">
                          {order.product}
                          <span className="ml-2 text-xs text-muted">×{order.items}</span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-foreground">${order.amount}</td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className={cn("flex w-fit items-center gap-1 border px-2 py-0.5 text-[11px]", statusStyles[order.status])}>
                            {statusIcons[order.status]}
                            {order.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted">{order.date}</td>
                        <td className="px-6 py-4">
                          <button className="flex h-8 w-8 items-center justify-center rounded-xl text-muted transition-colors hover:bg-white/5 hover:text-foreground">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

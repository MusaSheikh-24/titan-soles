"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  ShoppingCart,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  ArrowUpDown,
} from "lucide-react";

interface Order {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: "pending" | "processing" | "shipped" | "completed" | "cancelled";
  date: string;
  email: string;
}

const initialOrders: Order[] = [
  { id: "#1042", customer: "Sarah Johnson", product: "Air Max 90", amount: "$189.00", status: "completed", date: "2026-07-18", email: "sarah@example.com" },
  { id: "#1041", customer: "Mike Chen", product: "Ultraboost 5", amount: "$210.00", status: "processing", date: "2026-07-18", email: "mike@example.com" },
  { id: "#1040", customer: "Emily Rodriguez", product: "Classic Leather", amount: "$145.00", status: "pending", date: "2026-07-17", email: "emily@example.com" },
  { id: "#1039", customer: "Alex Thompson", product: "Gel-Kayano 30", amount: "$175.00", status: "shipped", date: "2026-07-17", email: "alex@example.com" },
  { id: "#1038", customer: "Jessica Park", product: "Chuck 70 Hi", amount: "$95.00", status: "pending", date: "2026-07-16", email: "jessica@example.com" },
  { id: "#1037", customer: "David Kim", product: "Cloud 5", amount: "$140.00", status: "shipped", date: "2026-07-16", email: "david@example.com" },
  { id: "#1036", customer: "Lisa Wang", product: "990v5", amount: "$185.00", status: "completed", date: "2026-07-15", email: "lisa@example.com" },
  { id: "#1035", customer: "James Wilson", product: "Old Skool", amount: "$75.00", status: "cancelled", date: "2026-07-15", email: "james@example.com" },
  { id: "#1034", customer: "Maria Garcia", product: "Air Max 90", amount: "$189.00", status: "completed", date: "2026-07-14", email: "maria@example.com" },
  { id: "#1033", customer: "Tom Brown", product: "Ultraboost 5", amount: "$210.00", status: "processing", date: "2026-07-14", email: "tom@example.com" },
];

const statusStyles: Record<string, string> = {
  pending: "bg-warning/10 text-warning border-warning/20",
  processing: "bg-accent/10 text-accent border-accent/20",
  shipped: "bg-primary/10 text-primary border-primary/20",
  completed: "bg-success/10 text-success border-success/20",
  cancelled: "bg-danger/10 text-danger border-danger/20",
};

const statusIcons: Record<string, React.ReactNode> = {
  pending: <Clock className="h-3 w-3" />,
  processing: <Clock className="h-3 w-3" />,
  shipped: <Truck className="h-3 w-3" />,
  completed: <CheckCircle2 className="h-3 w-3" />,
  cancelled: <XCircle className="h-3 w-3" />,
};

const nextStatus: Record<string, string> = {
  pending: "processing",
  processing: "shipped",
  shipped: "completed",
};

export default function SellerOrders() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [sortKey, setSortKey] = useState<string>("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = orders
    .filter((o) => filter === "all" || o.status === filter)
    .filter(
      (o) =>
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.customer.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const valA = a[sortKey as keyof Order] ?? "";
      const valB = b[sortKey as keyof Order] ?? "";
      return sortDir === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const updateStatus = (orderId: string) => {
    setOrders(
      orders.map((o) => {
        if (o.id !== orderId) return o;
        const next = nextStatus[o.status];
        return next ? { ...o, status: next as Order["status"] } : o;
      })
    );
  };

  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const processingCount = orders.filter((o) => o.status === "processing").length;
  const shippedCount = orders.filter((o) => o.status === "shipped").length;

  const filters = ["all", "pending", "processing", "shipped", "completed", "cancelled"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-section text-foreground">Orders</h2>
          <p className="mt-1 text-muted">Manage and track your customer orders.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-warning/10">
              <Clock className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-xs text-muted">Pending</p>
              <p className="text-lg font-semibold text-foreground">{pendingCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/10">
              <Clock className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted">Processing</p>
              <p className="text-lg font-semibold text-foreground">{processingCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
              <Truck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted">Shipped</p>
              <p className="text-lg font-semibold text-foreground">{shippedCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 rounded-2xl border-white/5 bg-white/[0.04] pl-9 text-sm placeholder:text-muted/60"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-white/[0.04] text-muted hover:text-foreground hover:bg-white/[0.06]"
              }`}
            >
              {f === "all" ? "All" : f.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card>
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
                  ].map((col) => (
                    <th
                      key={col.key}
                      onClick={() => toggleSort(col.key)}
                      className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors"
                    >
                      <div className="flex items-center gap-1">
                        {col.label}
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                  ))}
                  <th className="px-6 py-3 text-right text-xs font-medium text-muted uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((order, i) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="px-6 py-3.5 text-sm font-medium text-foreground">{order.id}</td>
                    <td className="px-6 py-3.5">
                      <div>
                        <p className="text-sm text-foreground">{order.customer}</p>
                        <p className="text-xs text-muted">{order.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-sm text-muted">{order.product}</td>
                    <td className="px-6 py-3.5 text-sm text-foreground">{order.amount}</td>
                    <td className="px-6 py-3.5">
                      <Badge variant="outline" className={`flex items-center gap-1 border px-2 py-0.5 text-[11px] w-fit ${statusStyles[order.status]}`}>
                        {statusIcons[order.status]}
                        {order.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-3.5 text-sm text-muted">{order.date}</td>
                    <td className="px-6 py-3.5 text-right">
                      {order.status !== "completed" && order.status !== "cancelled" && nextStatus[order.status] && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => updateStatus(order.id)}
                        >
                          Mark as {nextStatus[order.status]}
                        </Button>
                      )}
                    </td>
                  </motion.tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-sm text-muted">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

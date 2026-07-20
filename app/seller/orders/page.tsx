"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  ShoppingCart,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  ArrowUpDown,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  processing: "bg-blue-50 text-blue-700 border-blue-200",
  shipped: "bg-purple-50 text-purple-700 border-purple-200",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
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
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Orders</h1>
        <p className="text-sm text-gray-500">Manage and track your customer orders.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="shadow-sm border-gray-200 rounded-xl">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Pending</p>
              <p className="text-lg font-semibold text-gray-900">{pendingCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-gray-200 rounded-xl">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Processing</p>
              <p className="text-lg font-semibold text-gray-900">{processingCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-gray-200 rounded-xl">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
              <Truck className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Shipped</p>
              <p className="text-lg font-semibold text-gray-900">{shippedCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 pl-10 border-gray-200 bg-white rounded-xl focus:ring-blue-500/20"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-3.5 w-3.5 text-gray-400 mr-0.5" />
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "cursor-pointer rounded-full px-4 py-1.5 text-xs font-medium transition-all",
                filter === f
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              {f === "all" ? "All" : f.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card className="shadow-sm border-gray-200 rounded-2xl overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
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
                      className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-900 transition-colors"
                    >
                      <div className="flex items-center gap-1">
                        {col.label}
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                  ))}
                  <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((order, i) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="px-6 py-3.5 text-sm font-semibold text-gray-900">{order.id}</td>
                    <td className="px-6 py-3.5">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                        <p className="text-xs text-gray-500">{order.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-sm text-gray-500">{order.product}</td>
                    <td className="px-6 py-3.5 text-sm font-medium text-gray-900">{order.amount}</td>
                    <td className="px-6 py-3.5">
                      <Badge variant="outline" className={`border px-2.5 py-0.5 text-[10px] font-medium rounded-lg w-fit ${statusStyles[order.status]}`}>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-3.5 text-sm text-gray-500">{order.date}</td>
                    <td className="px-6 py-3.5 text-right">
                      {order.status !== "completed" && order.status !== "cancelled" && nextStatus[order.status] && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs rounded-xl border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
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
                    <td colSpan={7} className="px-6 py-12 text-center text-sm text-gray-500">
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

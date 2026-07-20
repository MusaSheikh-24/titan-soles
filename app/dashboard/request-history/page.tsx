"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import {
  Clock,
  Search,
  ShieldCheck,
  X,
  ChevronDown,
  ChevronUp,
  Archive,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HistoryItem {
  id: string;
  product: string;
  seller: string;
  amount: string;
  status: "completed" | "declined" | "cancelled";
  date: string;
  details: { label: string; value: string }[];
}

const history: HistoryItem[] = [
  { id: "RQ-1037", product: "Vans Old Skool", seller: "Urban Footwear", amount: "$75.00", status: "completed", date: "Jun 15, 2026", details: [
    { label: "Order Date", value: "Jun 12, 2026" },
    { label: "Delivery Date", value: "Jun 15, 2026" },
    { label: "Payment", value: "Visa •••• 4242" },
    { label: "Shipping", value: "Standard (3-5 days)" },
  ]},
  { id: "RQ-1036", product: "Nike Dunk Low", seller: "Premium Kicks", amount: "$135.00", status: "completed", date: "Jun 10, 2026", details: [
    { label: "Order Date", value: "Jun 7, 2026" },
    { label: "Delivery Date", value: "Jun 10, 2026" },
    { label: "Payment", value: "PayPal" },
    { label: "Shipping", value: "Express (1-2 days)" },
  ]},
  { id: "RQ-1035", product: "Air Jordan 1 Retro", seller: "Sneaker Vault", amount: "$250.00", status: "declined", date: "Jun 5, 2026", details: [
    { label: "Request Date", value: "Jun 3, 2026" },
    { label: "Reason", value: "Item sold to another buyer" },
  ]},
  { id: "RQ-1034", product: "Yeezy 350 V2", seller: "Urban Footwear", amount: "$320.00", status: "cancelled", date: "May 28, 2026", details: [
    { label: "Request Date", value: "May 25, 2026" },
    { label: "Reason", value: "Changed mind — found better deal" },
  ]},
  { id: "RQ-1033", product: "ASICS Gel-Lyte III", seller: "Runner's Hub", amount: "$130.00", status: "completed", date: "May 20, 2026", details: [
    { label: "Order Date", value: "May 17, 2026" },
    { label: "Delivery Date", value: "May 20, 2026" },
    { label: "Payment", value: "Visa •••• 4242" },
    { label: "Shipping", value: "Standard (3-5 days)" },
  ]},
];

const statusStyles: Record<string, string> = {
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  declined: "bg-red-50 text-red-700 border-red-200",
  cancelled: "bg-gray-50 text-gray-600 border-gray-200",
};

const statusIcons: Record<string, React.ReactNode> = {
  completed: <ShieldCheck className="h-3 w-3" />,
  declined: <X className="h-3 w-3" />,
  cancelled: <Clock className="h-3 w-3" />,
};

export default function RequestHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = history.filter((item) => {
    const matchesSearch =
      item.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.seller.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filters = ["all", "completed", "declined", "cancelled"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Request History</h1>
          <p className="text-sm text-gray-500">View all your past requests and orders.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 pl-10 border-gray-200 bg-white rounded-xl focus:ring-blue-500/20"
          />
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap items-center gap-2">
        <Filter className="h-3.5 w-3.5 text-gray-400 mr-0.5" />
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setStatusFilter(f)}
            className={cn(
              "cursor-pointer rounded-full px-4 py-1.5 text-xs font-medium transition-all",
              statusFilter === f
                ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20"
                : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* History list */}
      <Card className="shadow-sm border-gray-200 rounded-2xl overflow-hidden">
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 mb-4 shadow-sm">
                <Archive className="h-7 w-7 text-gray-400" />
              </div>
              <p className="text-base font-semibold text-gray-900">No history found</p>
              <p className="text-sm text-gray-500 mt-1">Your completed and past requests will appear here.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filtered.map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                    className="flex w-full cursor-pointer items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50 group"
                  >
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 text-xs font-bold text-gray-600 group-hover:from-blue-50 group-hover:to-blue-100 group-hover:text-blue-600 transition-all">
                        {item.id.slice(-4)}
                      </div>
                      <div className="text-left min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-semibold text-gray-900">{item.product}</p>
                          <Badge variant="outline" className={`border px-2 py-0.5 text-[10px] font-medium rounded-lg ${statusStyles[item.status]}`}>
                            <span className="flex items-center gap-1">
                              {statusIcons[item.status]}
                              {item.status}
                            </span>
                          </Badge>
                        </div>
                        <p className="mt-0.5 text-xs text-gray-500 truncate">{item.seller} · {item.amount} · {item.date}</p>
                      </div>
                    </div>
                    <div className="shrink-0 ml-4 text-gray-400 group-hover:text-gray-600 transition-colors">
                      {expanded === item.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                  </button>

                  {expanded === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-gray-100 bg-gradient-to-r from-gray-50/80 to-white px-6 py-4"
                    >
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        {item.details.map((d) => (
                          <div key={d.label} className="space-y-0.5">
                            <p className="text-xs text-gray-500 font-medium">{d.label}</p>
                            <p className="text-sm font-semibold text-gray-900">{d.value}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

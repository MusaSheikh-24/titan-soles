"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import {
  MessageSquare,
  Search,
  ArrowUpRight,
  Clock,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  X,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RequestItem {
  id: string;
  product: string;
  seller: string;
  amount: string;
  status: "pending" | "accepted" | "negotiating" | "completed" | "declined";
  time: string;
  message: string;
}

const requests: RequestItem[] = [
  { id: "RQ-1042", product: "Nike Air Max 90", seller: "Premium Kicks", amount: "$189.00", status: "pending", time: "2 min ago", message: "Hi, I'm interested in this pair. Is it still available?" },
  { id: "RQ-1041", product: "Adidas Ultraboost 5", seller: "Sneaker Vault", amount: "$210.00", status: "accepted", time: "15 min ago", message: "Great condition, can we proceed with the order?" },
  { id: "RQ-1040", product: "New Balance 574", seller: "Urban Footwear", amount: "$145.00", status: "negotiating", time: "32 min ago", message: "Would you consider $130 for this pair?" },
  { id: "RQ-1039", product: "ASICS Gel-Kayano 30", seller: "Runner's Hub", amount: "$175.00", status: "completed", time: "1h ago", message: "Perfect! I'll take it." },
  { id: "RQ-1038", product: "Converse Chuck 70 Hi", seller: "Sneaker Vault", amount: "$95.00", status: "declined", time: "2h ago", message: "Is this still available?" },
];

const statusStyles: Record<string, string> = {
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  accepted: "bg-blue-50 text-blue-700 border-blue-200",
  negotiating: "bg-amber-50 text-amber-700 border-amber-200",
  pending: "bg-orange-50 text-orange-700 border-orange-200",
  declined: "bg-red-50 text-red-700 border-red-200",
};

const statusIcons: Record<string, React.ReactNode> = {
  completed: <ShieldCheck className="h-3 w-3" />,
  accepted: <Sparkles className="h-3 w-3" />,
  negotiating: <TrendingUp className="h-3 w-3" />,
  pending: <Clock className="h-3 w-3" />,
  declined: <X className="h-3 w-3" />,
};

export default function RequestsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = requests.filter((req) => {
    const matchesSearch =
      req.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.seller.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filters = ["all", "pending", "accepted", "negotiating", "completed", "declined"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Requests</h1>
          <p className="text-sm text-gray-500">Track and manage your seller requests.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search requests..."
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

      {/* Requests list */}
      <Card className="shadow-sm border-gray-200 rounded-2xl overflow-hidden">
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 mb-4 shadow-sm">
                <MessageSquare className="h-7 w-7 text-blue-400" />
              </div>
              <p className="text-base font-semibold text-gray-900">No requests found</p>
              <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filtered.map((req) => (
                <div key={req.id} className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50 group">
                  <div className="flex items-start gap-4 min-w-0 flex-1">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 text-xs font-bold text-blue-600 group-hover:from-blue-100 group-hover:to-blue-200 transition-all">
                      {req.id.slice(-4)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-gray-900">{req.product}</p>
                        <Badge variant="outline" className={`border px-2 py-0.5 text-[10px] font-medium rounded-lg ${statusStyles[req.status]}`}>
                          <span className="flex items-center gap-1">
                            {statusIcons[req.status]}
                            {req.status}
                          </span>
                        </Badge>
                      </div>
                      <p className="mt-0.5 text-xs text-gray-500 truncate">{req.seller} · {req.amount}</p>
                      <p className="mt-1 text-xs text-gray-400 line-clamp-1 italic">&ldquo;{req.message}&rdquo;</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-4">
                    <span className="text-xs text-gray-400 tabular-nums whitespace-nowrap">{req.time}</span>
                    <Button variant="ghost" size="sm" className="gap-1 text-xs text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl">
                      View <ArrowUpRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

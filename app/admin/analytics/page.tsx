"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { exportToCSV } from "@/lib/export-csv";
import {
  TrendingUp,
  Users,
  ShoppingBag,
  Eye,
  Download,
  ChevronDown,
} from "lucide-react";

const weekData = [
  { day: "Mon", views: 18500, orders: 124, revenue: 22100 },
  { day: "Tue", views: 20200, orders: 146, revenue: 25800 },
  { day: "Wed", views: 17800, orders: 118, revenue: 19800 },
  { day: "Thu", views: 22400, orders: 162, revenue: 28600 },
  { day: "Fri", views: 19800, orders: 139, revenue: 24300 },
  { day: "Sat", views: 16200, orders: 98, revenue: 17400 },
  { day: "Sun", views: 14800, orders: 87, revenue: 15900 },
];

const monthData = [
  { day: "Week 1", views: 125000, orders: 780, revenue: 142000 },
  { day: "Week 2", views: 138000, orders: 845, revenue: 158000 },
  { day: "Week 3", views: 142000, orders: 892, revenue: 162000 },
  { day: "Week 4", views: 151000, orders: 924, revenue: 174000 },
];

const ranges = ["Last 7 Days", "Last 30 Days", "Last Quarter"] as const;
type Range = typeof ranges[number];

const metrics = [
  { label: "Page Views", value: "142.5K", change: "+12.3%", icon: Eye, color: "text-primary" },
  { label: "Unique Visitors", value: "38.2K", change: "+8.7%", icon: Users, color: "text-accent" },
  { label: "Conversion Rate", value: "3.24%", change: "+0.8%", icon: TrendingUp, color: "text-success" },
  { label: "Avg. Order Value", value: "$148", change: "+5.2%", icon: ShoppingBag, color: "text-warning" },
];

export default function AdminAnalytics() {
  const [range, setRange] = useState<Range>("Last 7 Days");
  const [rangeOpen, setRangeOpen] = useState(false);

  const data = range === "Last 7 Days" ? weekData : monthData;
  const maxViews = Math.max(...data.map((d) => d.views));
  const maxRevenue = Math.max(...data.map((d) => d.revenue));

  const handleExport = () => {
    exportToCSV(
      data,
      [
        { key: "day", label: "Day" },
        { key: "views", label: "Page Views" },
        { key: "orders", label: "Orders" },
        { key: "revenue", label: "Revenue" },
      ],
      `analytics-${range.toLowerCase().replace(/\s+/g, "-")}-${new Date().toISOString().split("T")[0]}`
    );
  };

  return (
    <div className="space-y-6">
      {/* Header with range picker */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted">Track performance metrics and growth trends</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setRangeOpen(!rangeOpen)}
              className="flex h-10 items-center gap-2 rounded-2xl border border-border bg-white/[0.04] px-4 text-sm text-foreground hover:bg-white/[0.06]"
            >
              {range}
              <ChevronDown className="h-3.5 w-3.5 text-muted" />
            </button>
            {rangeOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setRangeOpen(false)} />
                <div className="absolute right-0 top-11 z-50 w-44 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
                  {ranges.map((r) => (
                    <button
                      key={r}
                      onClick={() => { setRange(r); setRangeOpen(false); }}
                      className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-white/[0.03] ${
                        range === r ? "text-primary font-medium" : "text-foreground"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <Button variant="outline" size="sm" className="gap-1.5" onClick={handleExport}>
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted">{m.label}</p>
                    <p className="mt-1 text-2xl font-semibold text-foreground">{m.value}</p>
                  </div>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                    m.color === "text-primary" ? "bg-primary/10" : m.color === "text-accent" ? "bg-accent/10" : m.color === "text-success" ? "bg-success/10" : "bg-warning/10"
                  }`}>
                    <m.icon className={`h-5 w-5 ${m.color}`} />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1.5">
                  <span className="text-sm font-medium text-success">{m.change}</span>
                  <span className="text-xs text-muted">vs last period</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader>
              <CardTitle>Page Views</CardTitle>
              <CardDescription>{range.toLowerCase()} — daily unique page views</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between gap-2" style={{ height: 160 }}>
                {data.map((d) => (
                  <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                    <div className="w-full rounded-lg bg-gradient-to-t from-primary/60 to-primary/30 transition-all hover:from-primary/80" style={{ height: `${(d.views / maxViews) * 140}px` }} />
                    <span className="text-[11px] text-muted">{d.day}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle>Revenue</CardTitle>
              <CardDescription>{range.toLowerCase()} — daily revenue trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between gap-2" style={{ height: 160 }}>
                {data.map((d) => (
                  <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                    <div className="w-full rounded-lg bg-gradient-to-t from-accent/60 to-accent/30 transition-all hover:from-accent/80" style={{ height: `${(d.revenue / maxRevenue) * 140}px` }} />
                    <span className="text-[11px] text-muted">{d.day}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Traffic Sources */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Where your visitors are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { source: "Direct", percentage: 32, visits: "45.6K", color: "bg-primary" },
                { source: "Organic Search", percentage: 28, visits: "39.9K", color: "bg-accent" },
                { source: "Social Media", percentage: 22, visits: "31.4K", color: "bg-success" },
                { source: "Referral", percentage: 18, visits: "25.7K", color: "bg-warning" },
              ].map((s) => (
                <div key={s.source} className="rounded-2xl border border-border bg-white/[0.02] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{s.source}</p>
                    <span className="text-xs text-muted">{s.visits}</span>
                  </div>
                  <div className="mb-2 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                    <div className={`h-full rounded-full ${s.color} transition-all`} style={{ width: `${s.percentage}%` }} />
                  </div>
                  <p className="text-right text-xs font-medium text-foreground">{s.percentage}%</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

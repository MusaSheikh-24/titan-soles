"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/admin/stat-card";
import { TrendingUp, DollarSign, Users, ShoppingCart, BarChart3 } from "lucide-react";

const stats = [
  { title: "Total Revenue", value: "$48,250", change: "+18.5%", trend: "up" as const, icon: DollarSign, iconColor: "text-emerald-600" as const },
  { title: "Total Orders", value: "847", change: "+8.2%", trend: "up" as const, icon: ShoppingCart, iconColor: "text-blue-600" as const },
  { title: "Conversion Rate", value: "3.24%", change: "+0.8%", trend: "up" as const, icon: TrendingUp, iconColor: "text-purple-600" as const },
  { title: "Active Customers", value: "1,245", change: "+12.3%", trend: "up" as const, icon: Users, iconColor: "text-amber-600" as const },
];

const monthlyData = [
  { month: "Jan", revenue: 12400, orders: 210 },
  { month: "Feb", revenue: 18200, orders: 285 },
  { month: "Mar", revenue: 15800, orders: 248 },
  { month: "Apr", revenue: 22100, orders: 312 },
  { month: "May", revenue: 19500, orders: 278 },
  { month: "Jun", revenue: 28400, orders: 365 },
  { month: "Jul", revenue: 25600, orders: 340 },
  { month: "Aug", revenue: 32100, orders: 392 },
  { month: "Sep", revenue: 29800, orders: 378 },
  { month: "Oct", revenue: 35400, orders: 410 },
  { month: "Nov", revenue: 41200, orders: 456 },
  { month: "Dec", revenue: 38200, orders: 430 },
];

const trafficSources = [
  { source: "Organic Search", percentage: 42, color: "bg-blue-500" },
  { source: "AI Recommendations", percentage: 28, color: "bg-cyan-500" },
  { source: "Direct Traffic", percentage: 15, color: "bg-emerald-500" },
  { source: "Social Media", percentage: 10, color: "bg-amber-500" },
  { source: "Referral", percentage: 5, color: "bg-rose-500" },
];

const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));

export default function SellerAnalytics() {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Analytics</h1>
        <p className="text-sm text-gray-500">Track your store&apos;s performance and growth.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Revenue Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="shadow-sm border-gray-200 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-50/80 to-white border-b border-gray-100">
              <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-blue-600" />
                Monthly Revenue
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <div className="flex items-end gap-2 h-48">
                {monthlyData.map((d) => (
                  <div key={d.month} className="flex flex-1 flex-col items-center gap-1.5">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="w-full max-w-[32px] rounded-lg bg-gradient-to-t from-blue-500 to-blue-300 hover:from-blue-600 hover:to-blue-400 transition-colors cursor-pointer"
                    />
                    <span className="text-[10px] text-gray-400">{d.month}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="h-2.5 w-2.5 rounded bg-blue-500" />
                  Revenue
                </div>
                <p className="text-lg font-bold text-gray-900">$298,600</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Traffic Sources */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="shadow-sm border-gray-200 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-50/80 to-white border-b border-gray-100">
              <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-purple-600" />
                Traffic Sources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 p-5">
              {trafficSources.map((source) => (
                <div key={source.source}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-gray-900">{source.source}</span>
                    <span className="text-sm font-bold text-gray-900">{source.percentage}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${source.percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                      className={`h-full rounded-full ${source.color}`}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

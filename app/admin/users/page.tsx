"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  MoreHorizontal,
  Shield,
  Store,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useTableSort } from "@/lib/use-table-sort";

const users = [
  { id: "USR-001", name: "Sarah Johnson", email: "sarah.j@email.com", role: "buyer", orders: 12, spent: 1840, joined: "2026-01-15", status: "active" },
  { id: "USR-002", name: "Mike Chen", email: "mike.chen@email.com", role: "seller", orders: 0, spent: 0, joined: "2026-02-20", status: "active", store: "Premium Kicks" },
  { id: "USR-003", name: "Emily Rodriguez", email: "emily.r@email.com", role: "buyer", orders: 8, spent: 920, joined: "2026-03-05", status: "active" },
  { id: "USR-004", name: "Alex Thompson", email: "alex.t@email.com", role: "seller", orders: 0, spent: 0, joined: "2026-01-10", status: "active", store: "Sneaker Vault" },
  { id: "USR-005", name: "Jessica Park", email: "jessica.p@email.com", role: "buyer", orders: 24, spent: 3450, joined: "2025-11-08", status: "active" },
  { id: "USR-006", name: "David Kim", email: "david.k@email.com", role: "admin", orders: 0, spent: 0, joined: "2025-10-01", status: "active" },
  { id: "USR-007", name: "Lisa Wang", email: "lisa.w@email.com", role: "buyer", orders: 3, spent: 375, joined: "2026-05-12", status: "suspended" },
  { id: "USR-008", name: "James Wilson", email: "james.w@email.com", role: "seller", orders: 0, spent: 0, joined: "2026-04-01", status: "active", store: "Urban Footwear" },
  { id: "USR-009", name: "Olivia Brown", email: "olivia.b@email.com", role: "buyer", orders: 7, spent: 1105, joined: "2026-02-28", status: "active" },
  { id: "USR-010", name: "Ryan Taylor", email: "ryan.t@email.com", role: "seller", orders: 0, spent: 0, joined: "2026-03-15", status: "pending", store: "Velocity Sneakers" },
];

const statusStyles: Record<string, string> = {
  active: "bg-success/10 text-success border-success/20",
  suspended: "bg-danger/10 text-danger border-danger/20",
  pending: "bg-warning/10 text-warning border-warning/20",
};

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q) ||
        (u.store?.toLowerCase().includes(q) ?? false);
      const matchesRole = roleFilter === "all" || u.role === roleFilter;
      const matchesStatus = statusFilter === "all" || u.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [searchQuery, roleFilter, statusFilter]);

  const { sorted, sort, toggleSort } = useTableSort(filtered, "name");

  const roleChips = ["all", "buyer", "seller", "admin"];
  const statusChips = ["all", "active", "suspended", "pending"];

  const stats = useMemo(() => {
    return {
      total: users.length,
      active: users.filter((u) => u.status === "active").length,
      sellers: users.filter((u) => u.role === "seller").length,
      totalSpent: users.reduce((s, u) => s + u.spent, 0),
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-border bg-card p-4 card-shadow">
          <p className="text-xs text-muted">Total Users</p>
          <p className="mt-1 text-xl font-semibold text-foreground">{stats.total}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 card-shadow">
          <p className="text-xs text-muted">Active</p>
          <p className="mt-1 text-xl font-semibold text-foreground">{stats.active}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 card-shadow">
          <p className="text-xs text-muted">Sellers</p>
          <p className="mt-1 text-xl font-semibold text-foreground">{stats.sellers}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 card-shadow">
          <p className="text-xs text-muted">Total Spent</p>
          <p className="mt-1 text-xl font-semibold text-foreground">${stats.totalSpent.toLocaleString()}</p>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted">
            {filtered.length} of {users.length} users
            {roleFilter !== "all" && ` · ${roleFilter}`}
            {statusFilter !== "all" && ` · ${statusFilter}`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-56 rounded-2xl border-white/5 bg-white/4 p-9 text-sm placeholder:text-muted/60"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className={cn("gap-1.5", (roleFilter !== "all" || statusFilter !== "all") && "bg-primary/10 text-primary border-primary/30")}
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {(roleFilter !== "all" || statusFilter !== "all") && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                {(roleFilter !== "all" ? 1 : 0) + (statusFilter !== "all" ? 1 : 0)}
              </span>
            )}
          </Button>
          <Button size="sm" className="gap-1.5">Invite User</Button>
        </div>
      </div>

      {/* Filter chips */}
      {showFilters && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-white/2 p-4">
          <span className="text-xs font-medium text-muted">Role:</span>
          {roleChips.map((r) => (
            <button key={r} onClick={() => setRoleFilter(r)} className={cn("chip", roleFilter === r ? "chip-active" : "chip-idle")}>{r}</button>
          ))}
          <span className="ml-2 text-xs font-medium text-muted">Status:</span>
          {statusChips.map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)} className={cn("chip", statusFilter === s ? "chip-active" : "chip-idle")}>{s}</button>
          ))}
          {(roleFilter !== "all" || statusFilter !== "all" || searchQuery) && (
            <button onClick={() => { setRoleFilter("all"); setStatusFilter("all"); setSearchQuery(""); }} className="ml-auto flex items-center gap-1 text-xs text-muted hover:text-foreground">
              <X className="h-3 w-3" /> Clear all
            </button>
          )}
        </motion.div>
      )}

      {/* Users table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardHeader className="border-b border-border pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">All Users</CardTitle>
              <span className="text-xs text-muted">{filtered.length} users</span>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    {[{ key: "name", label: "User" }, { key: "role", label: "Role" }, { key: "orders", label: "Orders" }, { key: "spent", label: "Total Spent" }, { key: "joined", label: "Joined" }, { key: "status", label: "Status" }].map(({ key, label }) => (
                      <th key={key} className="cursor-pointer whitespace-nowrap px-6 py-3 text-left text-xs font-medium text-muted transition-colors hover:text-foreground" onClick={() => toggleSort(key)}>
                        <div className="flex items-center gap-1">{label}<ArrowUpDown className={cn("h-3 w-3", sort.key === key ? "text-primary" : "text-border")} /></div>
                      </th>
                    ))}
                    <th className="px-6 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {sorted.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-sm text-muted">No users match your filters</td>
                    </tr>
                  ) : (
                    sorted.map((user, i) => (
                      <motion.tr key={user.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }} className="transition-colors hover:bg-white/2">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-primary/20 to-accent/20 text-sm font-bold text-primary">
                              {user.name.split(" ").map(n => n[0]).join("")}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">{user.name}</p>
                              <p className="text-xs text-muted">{user.email}</p>
                              {user.store && <p className="text-xs text-accent">{user.store}</p>}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className={cn("flex w-fit items-center gap-1 border px-2 py-0.5 text-[11px]", user.role === "admin" ? "bg-primary/10 text-primary border-primary/20" : user.role === "seller" ? "bg-accent/10 text-accent border-accent/20" : "bg-white/5 text-muted border-border")}>
                            {user.role === "admin" ? <Shield className="h-3 w-3" /> : user.role === "seller" ? <Store className="h-3 w-3" /> : null}
                            {user.role}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">{user.orders}</td>
                        <td className="px-6 py-4 text-sm text-foreground">${user.spent.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-muted">{user.joined}</td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className={cn("border px-2 py-0.5 text-[11px]", statusStyles[user.status])}>{user.status}</Badge>
                        </td>
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

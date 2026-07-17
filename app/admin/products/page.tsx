"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  Plus,
  SlidersHorizontal,
  ArrowUpDown,
  Package,
  MoreHorizontal,
  X,
  CheckCircle2,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useTableSort } from "@/lib/use-table-sort";

const products = [
  { id: "PRD-001", name: "Air Max 90", brand: "Nike", price: 189, stock: 45, status: "active", sales: 342, rating: 4.8, category: "Running" },
  { id: "PRD-002", name: "Ultraboost 5", brand: "Adidas", price: 210, stock: 28, status: "active", sales: 287, rating: 4.7, category: "Running" },
  { id: "PRD-003", name: "Classic Leather", brand: "Reebok", price: 145, stock: 12, status: "active", sales: 231, rating: 4.5, category: "Casual" },
  { id: "PRD-004", name: "Gel-Kayano 30", brand: "ASICS", price: 175, stock: 8, status: "low", sales: 198, rating: 4.6, category: "Running" },
  { id: "PRD-005", name: "Chuck 70 Hi", brand: "Converse", price: 95, stock: 62, status: "active", sales: 156, rating: 4.3, category: "Casual" },
  { id: "PRD-006", name: "Old Skool", brand: "Vans", price: 85, stock: 34, status: "active", sales: 143, rating: 4.4, category: "Lifestyle" },
  { id: "PRD-007", name: "990v6", brand: "New Balance", price: 220, stock: 3, status: "low", sales: 89, rating: 4.9, category: "Running" },
  { id: "PRD-008", name: "Speedcross 5", brand: "Salomon", price: 165, stock: 0, status: "out", sales: 67, rating: 4.2, category: "Trail" },
  { id: "PRD-009", name: "LeBron XXI", brand: "Nike", price: 210, stock: 18, status: "active", sales: 112, rating: 4.1, category: "Basketball" },
  { id: "PRD-010", name: "Cloudstratus", brand: "On Running", price: 190, stock: 22, status: "active", sales: 94, rating: 4.6, category: "Running" },
];

const statusStyles: Record<string, string> = {
  active: "bg-success/10 text-success border-success/20",
  low: "bg-warning/10 text-warning border-warning/20",
  out: "bg-danger/10 text-danger border-danger/20",
};

const allBrands = [...new Set(products.map((p) => p.brand))].sort();

type ProductKey = "name" | "brand" | "price" | "stock" | "sales" | "rating" | "status";

export default function AdminProducts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [brandFilter, setBrandFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addedName, setAddedName] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || p.status === statusFilter;
      const matchesBrand = brandFilter === "all" || p.brand === brandFilter;
      return matchesSearch && matchesStatus && matchesBrand;
    });
  }, [searchQuery, statusFilter, brandFilter]);

  const { sorted, sort, toggleSort } = useTableSort(filtered, "name");

  const filterChips = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "low", label: "Low Stock" },
    { key: "out", label: "Out of Stock" },
  ];

  const columns: { key: ProductKey; label: string }[] = [
    { key: "name", label: "Product" },
    { key: "brand", label: "Brand" },
    { key: "price", label: "Price" },
    { key: "stock", label: "Stock" },
    { key: "sales", label: "Sales" },
    { key: "rating", label: "Rating" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted">
            {filtered.length} of {products.length} products
            {statusFilter !== "all" && ` · ${statusFilter.replace("low", "low stock").replace("out", "out of stock")}`}
            {brandFilter !== "all" && ` · ${brandFilter}`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-56 rounded-2xl border-white/5 bg-white/4 pl-9 text-sm placeholder:text-muted/60"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className={cn("gap-1.5", showFilters && "bg-primary/10 text-primary border-primary/30")}
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {(statusFilter !== "all" || brandFilter !== "all") && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                {(statusFilter !== "all" ? 1 : 0) + (brandFilter !== "all" ? 1 : 0)}
              </span>
            )}
          </Button>
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1.5">
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Product</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Product Name</label>
                  <Input
                    placeholder="e.g. Air Max 90"
                    value={addedName}
                    onChange={(e) => setAddedName(e.target.value)}
                  />
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
                  <Button variant="outline" size="sm" onClick={() => setAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button size="sm">Add Product</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filter chips */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-white/2 p-4"
        >
          <span className="text-xs font-medium text-muted">Status:</span>
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
          <span className="ml-2 text-xs font-medium text-muted">Brand:</span>
          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="h-9 rounded-2xl border border-border bg-card px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Brands</option>
            {allBrands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          {(statusFilter !== "all" || brandFilter !== "all" || searchQuery) && (
            <button
              onClick={() => { setStatusFilter("all"); setBrandFilter("all"); setSearchQuery(""); }}
              className="ml-auto flex items-center gap-1 text-xs text-muted hover:text-foreground"
            >
              <X className="h-3 w-3" /> Clear all
            </button>
          )}
        </motion.div>
      )}

      {/* Product table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardHeader className="border-b border-border pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">All Products</CardTitle>
              <span className="text-xs text-muted">{filtered.length} products</span>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    {columns.map(({ key, label }) => (
                      <th
                        key={key}
                        className="cursor-pointer whitespace-nowrap px-6 py-3 text-left text-xs font-medium text-muted transition-colors hover:text-foreground"
                        onClick={() => toggleSort(key)}
                      >
                        <div className="flex items-center gap-1">
                          {label}
                          <ArrowUpDown className={cn(
                            "h-3 w-3 transition-colors",
                            sort.key === key ? "text-primary" : "text-border"
                          )} />
                        </div>
                      </th>
                    ))}
                    <th className="px-6 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {sorted.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center text-sm text-muted">
                        No products match your filters
                      </td>
                    </tr>
                  ) : (
                    sorted.map((product, i) => (
                      <motion.tr
                        key={product.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.02 }}
                        className="transition-colors hover:bg-white/2"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/4">
                              <Package className="h-4 w-4 text-muted" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">{product.name}</p>
                              <p className="text-xs text-muted">{product.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">{product.brand}</td>
                        <td className="px-6 py-4 text-sm text-foreground">${product.price}</td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "text-sm font-medium",
                            product.stock <= 5 && product.stock > 0 ? "text-warning" : product.stock === 0 ? "text-danger" : "text-foreground"
                          )}>
                            {product.stock === 0 ? "Out of stock" : product.stock}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">{product.sales}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 text-sm text-foreground">
                            ★ <span>{product.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className={cn("border px-2 py-0.5 text-[11px]", statusStyles[product.status])}>
                            {product.status === "active" ? "Active" : product.status === "low" ? "Low Stock" : "Out of Stock"}
                          </Badge>
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
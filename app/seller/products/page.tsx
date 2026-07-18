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
  Plus,
  Search,
  Pencil,
  Trash2,
  Package,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  stock: number;
  status: "active" | "draft" | "out_of_stock";
  sales: number;
  revenue: string;
}

const initialProducts: Product[] = [
  { id: "1", name: "Air Max 90", brand: "Nike", price: 189, stock: 45, status: "active", sales: 342, revenue: "$64,638" },
  { id: "2", name: "Ultraboost 5", brand: "Adidas", price: 210, stock: 28, status: "active", sales: 287, revenue: "$60,270" },
  { id: "3", name: "Classic Leather", brand: "Reebok", price: 145, stock: 62, status: "active", sales: 231, revenue: "$33,495" },
  { id: "4", name: "Gel-Kayano 30", brand: "Asics", price: 175, stock: 0, status: "out_of_stock", sales: 198, revenue: "$34,650" },
  { id: "5", name: "Chuck 70 Hi", brand: "Converse", price: 95, stock: 120, status: "active", sales: 156, revenue: "$14,820" },
  { id: "6", name: "Old Skool", brand: "Vans", price: 75, stock: 88, status: "draft", sales: 0, revenue: "$0" },
  { id: "7", name: "990v5", brand: "New Balance", price: 185, stock: 34, status: "active", sales: 124, revenue: "$22,940" },
  { id: "8", name: "Cloud 5", brand: "On Running", price: 140, stock: 0, status: "out_of_stock", sales: 89, revenue: "$12,460" },
];

const statusStyles: Record<string, string> = {
  active: "bg-success/10 text-success border-success/20",
  draft: "bg-muted/10 text-muted border-muted/20",
  out_of_stock: "bg-danger/10 text-danger border-danger/20",
};

export default function SellerProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: "", brand: "", price: "", stock: "" });

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = products.filter((p) => p.status === "active").length;
  const lowStock = products.filter((p) => p.stock > 0 && p.stock < 20).length;

  const resetForm = () => setForm({ name: "", brand: "", price: "", stock: "" });

  const handleAdd = () => {
    const newProduct: Product = {
      id: String(Date.now()),
      name: form.name,
      brand: form.brand,
      price: Number(form.price),
      stock: Number(form.stock),
      status: "draft",
      sales: 0,
      revenue: "$0",
    };
    setProducts([newProduct, ...products]);
    setAddOpen(false);
    resetForm();
  };

  const handleEdit = () => {
    if (!selectedProduct) return;
    setProducts(
      products.map((p) =>
        p.id === selectedProduct.id
          ? { ...p, name: form.name, brand: form.brand, price: Number(form.price), stock: Number(form.stock) }
          : p
      )
    );
    setEditOpen(false);
    resetForm();
  };

  const handleDelete = () => {
    if (!selectedProduct) return;
    setProducts(products.filter((p) => p.id !== selectedProduct.id));
    setDeleteOpen(false);
  };

  const openEdit = (product: Product) => {
    setSelectedProduct(product);
    setForm({ name: product.name, brand: product.brand, price: String(product.price), stock: String(product.stock) });
    setEditOpen(true);
  };

  const openDelete = (product: Product) => {
    setSelectedProduct(product);
    setDeleteOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-section text-foreground">My Products</h2>
          <p className="mt-1 text-muted">Manage your product catalog.</p>
        </div>
        <Button size="sm" className="gap-1.5" onClick={() => { resetForm(); setAddOpen(true); }}>
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted">Total Products</p>
              <p className="text-lg font-semibold text-foreground">{products.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-success/10">
              <CheckCircle2 className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-xs text-muted">Active</p>
              <p className="text-lg font-semibold text-foreground">{activeCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-warning/10">
              <AlertCircle className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-xs text-muted">Low Stock</p>
              <p className="text-lg font-semibold text-foreground">{lowStock}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-10 rounded-2xl border-white/5 bg-white/[0.04] pl-9 text-sm placeholder:text-muted/60"
        />
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Brand</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Sales</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-muted uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((product, i) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="px-6 py-3.5 text-sm font-medium text-foreground">{product.name}</td>
                    <td className="px-6 py-3.5 text-sm text-muted">{product.brand}</td>
                    <td className="px-6 py-3.5 text-sm text-foreground">${product.price}</td>
                    <td className="px-6 py-3.5 text-sm">
                      <span className={cn(product.stock === 0 ? "text-danger" : product.stock < 20 ? "text-warning" : "text-foreground")}>
                        {product.stock === 0 ? "Out of stock" : product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <Badge variant="outline" className={`border px-2 py-0.5 text-[11px] ${statusStyles[product.status]}`}>
                        {product.status.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="px-6 py-3.5 text-sm text-muted">{product.sales}</td>
                    <td className="px-6 py-3.5 text-sm text-foreground">{product.revenue}</td>
                    <td className="px-6 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(product)}
                          className="flex h-8 w-8 items-center justify-center rounded-xl text-muted transition-colors hover:bg-white/5 hover:text-foreground"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => openDelete(product)}
                          className="flex h-8 w-8 items-center justify-center rounded-xl text-muted transition-colors hover:bg-white/5 hover:text-danger"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-sm text-muted">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Product Name</label>
              <Input placeholder="e.g. Air Max 90" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Brand</label>
                <Input placeholder="Nike" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Price</label>
                <Input placeholder="$189" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Stock</label>
              <Input placeholder="50" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" size="sm" onClick={() => setAddOpen(false)}>Cancel</Button>
              <Button size="sm" onClick={handleAdd} disabled={!form.name || !form.brand || !form.price}>Add Product</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Product Name</label>
              <Input placeholder="e.g. Air Max 90" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Brand</label>
                <Input placeholder="Nike" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Price</label>
                <Input placeholder="$189" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Stock</label>
              <Input placeholder="50" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" size="sm" onClick={() => setEditOpen(false)}>Cancel</Button>
              <Button size="sm" onClick={handleEdit}>Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted pt-2">
            Are you sure you want to delete <strong className="text-foreground">{selectedProduct?.name}</strong>? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" size="sm" onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <Button variant="default" size="sm" className="bg-danger hover:bg-danger/90 text-white" onClick={handleDelete}>
              Delete Product
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

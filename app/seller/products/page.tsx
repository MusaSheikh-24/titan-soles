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
  Filter,
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
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  draft: "bg-gray-50 text-gray-600 border-gray-200",
  out_of_stock: "bg-red-50 text-red-700 border-red-200",
};

const filters = ["all", "active", "draft", "out_of_stock"];

export default function SellerProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: "", brand: "", price: "", stock: "" });

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || p.status === filter;
    return matchesSearch && matchesFilter;
  });

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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Products</h1>
          <p className="text-sm text-gray-500">Manage your product catalog.</p>
        </div>
        <Button size="sm" className="gap-1.5 rounded-xl shadow-sm" onClick={() => { resetForm(); setAddOpen(true); }}>
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="shadow-sm border-gray-200 rounded-xl">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Products</p>
              <p className="text-lg font-semibold text-gray-900">{products.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-gray-200 rounded-xl">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Active</p>
              <p className="text-lg font-semibold text-gray-900">{activeCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-gray-200 rounded-xl">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
              <AlertCircle className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Low Stock</p>
              <p className="text-lg font-semibold text-gray-900">{lowStock}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search products..."
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
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Brand</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Sales</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((product, i) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="px-6 py-3.5 text-sm font-semibold text-gray-900">{product.name}</td>
                    <td className="px-6 py-3.5 text-sm text-gray-500">{product.brand}</td>
                    <td className="px-6 py-3.5 text-sm text-gray-900 font-medium">${product.price}</td>
                    <td className="px-6 py-3.5 text-sm">
                      <span className={cn(
                        "font-medium",
                        product.stock === 0 ? "text-red-600" : product.stock < 20 ? "text-amber-600" : "text-gray-900"
                      )}>
                        {product.stock === 0 ? "Out of stock" : product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <Badge variant="outline" className={`border px-2.5 py-0.5 text-[10px] font-medium rounded-lg ${statusStyles[product.status]}`}>
                        {product.status.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="px-6 py-3.5 text-sm text-gray-500">{product.sales}</td>
                    <td className="px-6 py-3.5 text-sm font-medium text-gray-900">{product.revenue}</td>
                    <td className="px-6 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(product)}
                          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => openDelete(product)}
                          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-sm text-gray-500">
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
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Add Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">Product Name</label>
              <Input placeholder="e.g. Air Max 90" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border-gray-200 bg-white rounded-xl" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">Brand</label>
                <Input placeholder="Nike" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} className="border-gray-200 bg-white rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">Price</label>
                <Input placeholder="$189" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="border-gray-200 bg-white rounded-xl" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">Stock</label>
              <Input placeholder="50" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="border-gray-200 bg-white rounded-xl" />
            </div>
            <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
              <Button variant="outline" size="sm" className="rounded-xl border-gray-200 text-gray-700" onClick={() => setAddOpen(false)}>Cancel</Button>
              <Button size="sm" className="rounded-xl shadow-sm" onClick={handleAdd} disabled={!form.name || !form.brand || !form.price}>Add Product</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Edit Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">Product Name</label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border-gray-200 bg-white rounded-xl" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">Brand</label>
                <Input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} className="border-gray-200 bg-white rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">Price</label>
                <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="border-gray-200 bg-white rounded-xl" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">Stock</label>
              <Input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="border-gray-200 bg-white rounded-xl" />
            </div>
            <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
              <Button variant="outline" size="sm" className="rounded-xl border-gray-200 text-gray-700" onClick={() => setEditOpen(false)}>Cancel</Button>
              <Button size="sm" className="rounded-xl shadow-sm" onClick={handleEdit}>Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Delete Product</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600 pt-2">
            Are you sure you want to delete <strong className="text-gray-900">{selectedProduct?.name}</strong>? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button variant="outline" size="sm" className="rounded-xl border-gray-200 text-gray-700" onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <Button size="sm" className="rounded-xl shadow-sm bg-red-600 hover:bg-red-700" onClick={handleDelete}>
              Delete Product
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

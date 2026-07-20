"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import Link from "next/link";
import {
  Heart,
  Search,
  ArrowUpRight,
  Trash2,
  Store,
  ShoppingBag,
  PackageOpen,
  Sparkles,
} from "lucide-react";

const wishlistItems = [
  { id: 1, name: "Nike Air Max 90", brand: "Nike", price: 189, store: "Premium Kicks", inStock: true, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop" },
  { id: 2, name: "Adidas Ultraboost 5", brand: "Adidas", price: 210, store: "Sneaker Vault", inStock: true, image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=200&h=200&fit=crop" },
  { id: 3, name: "New Balance 574", brand: "New Balance", price: 145, store: "Urban Footwear", inStock: false, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&h=200&fit=crop" },
  { id: 4, name: "ASICS Gel-Kayano 30", brand: "ASICS", price: 175, store: "Runner's Hub", inStock: true, image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=200&h=200&fit=crop" },
  { id: 5, name: "Converse Chuck 70 Hi", brand: "Converse", price: 95, store: "Sneaker Vault", inStock: true, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop" },
  { id: 6, name: "Vans Old Skool", brand: "Vans", price: 75, store: "Urban Footwear", inStock: false, image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=200&h=200&fit=crop" },
];

export default function WishlistPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState(wishlistItems);

  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Wishlist</h1>
          <p className="text-sm text-gray-500">{items.length} items saved for later.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search wishlist..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 pl-10 border-gray-200 bg-white rounded-xl focus:ring-blue-500/20"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center py-24 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-50 to-rose-100 mb-5 shadow-sm">
            <PackageOpen className="h-9 w-9 text-rose-400" />
          </div>
          <p className="text-xl font-semibold text-gray-900">Your wishlist is empty</p>
          <p className="mt-1.5 text-sm text-gray-500 max-w-sm">Start browsing and save your favorite sneakers to come back to them later.</p>
          <Button className="mt-6 rounded-xl shadow-sm" asChild>
            <Link href="/marketplace">
              <Sparkles className="h-4 w-4" />
              Browse Marketplace
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <button
                onClick={() => removeItem(item.id)}
                className="absolute right-3 top-3 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/90 text-gray-400 opacity-0 shadow-sm backdrop-blur-sm transition-all hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              <div className="aspect-square overflow-hidden bg-gray-50">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1.5">
                  <Store className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500 font-medium">{item.store}</span>
                </div>
                <h3 className="mt-1.5 font-semibold text-gray-900">{item.name}</h3>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">${item.price}</span>
                  <Badge variant="outline" className={`text-[10px] font-medium px-2.5 py-1 rounded-lg ${
                    item.inStock
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-gray-50 text-gray-500 border-gray-200"
                  }`}>
                    {item.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" className="flex-1 gap-1.5 rounded-xl shadow-sm" disabled={!item.inStock}>
                    <ShoppingBag className="h-3.5 w-3.5" />
                    Request
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-1.5 rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50" asChild>
                    <Link href={`/product/${item.id}`}>
                      View <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

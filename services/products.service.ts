import type { Product } from "@/types";
import { TRENDING_PRODUCTS } from "@/lib/constants";
import { apiClient } from "./api-client";

export async function getTrendingProducts(): Promise<Product[]> {
  try {
    return await apiClient<Product[]>("/products/trending");
  } catch {
    return TRENDING_PRODUCTS;
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    return await apiClient<Product[]>(
      `/products/search?q=${encodeURIComponent(query)}`
    );
  } catch {
    return TRENDING_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
    );
  }
}

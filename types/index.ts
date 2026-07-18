export type UserRole = "buyer" | "seller";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  aiRecommended?: boolean;
  aiMatch?: number;
  badge?: string;
  discount?: string;
  comfortScore?: number;
  popularityScore?: number;
  verifiedStore?: string;
  seller?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
  icon?: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
  icon: string;
  time: string;
}

export interface MarketplaceStat {
  value: string;
  label: string;
  suffix?: string;
}

export interface VerifiedStore {
  id: string;
  name: string;
  logo: string;
  rating: number;
  products: number;
  followers: string;
  location?: string;
  verified: boolean;
}

export interface Collection {
  id: string;
  name: string;
  image: string;
  itemCount: number;
  season?: string;
  tall?: boolean;
}

export interface SellerVideo {
  id: string;
  src: string;
  poster: string;
  caption: string;
  likes: string;
  comments: string;
  shares: string;
  /** Filter metadata */
  brand: string;
  store: string;
  category: "Running" | "Lifestyle" | "Basketball" | "Casual" | "Formal";
  trending?: boolean;
  newDrop?: boolean;
  seller: {
    id: string;
    name: string;
    logo: string;
    verified: boolean;
    followers: string;
  };
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
}

export interface WhyAIFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  span?: "sm" | "md" | "lg";
}

import type { Metadata } from "next";
import { VideosPage } from "@/features/videos/videos-page";

export const metadata: Metadata = {
  title: "Seller Videos — Titan Soles",
  description:
    "Watch TikTok-style product videos from verified footwear sellers. Swipe to discover shoes, stores, and drops.",
};

export default function VideosRoute() {
  return <VideosPage />;
}

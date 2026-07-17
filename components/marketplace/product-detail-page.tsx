"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Sparkles,
  Play,
  Store,
  Star,
  Truck,
  RotateCcw,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { AIChatDialog } from "@/features/ai-assistant/ai-chat-dialog";
import { ProductCard } from "./product-card";
import { QuickViewDrawer } from "./quick-view-drawer";
import {
  getProductById,
  getProductMedia,
  getRelatedProducts,
  type Product,
} from "./products-data";
import { cn } from "@/lib/utils";

export function ProductDetailPage({ productId }: { productId: string }) {
  const router = useRouter();
  const product = useMemo(
    () => getProductById(Number(productId)),
    [productId]
  );

  const [aiOpen, setAiOpen] = useState(false);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [saved, setSaved] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.backgroundColor;
    const prevBody = body.style.backgroundColor;
    const prevScheme = html.style.colorScheme;
    html.style.backgroundColor = "#FAFAFA";
    html.style.colorScheme = "light";
    body.style.backgroundColor = "#FAFAFA";
    return () => {
      html.style.backgroundColor = prevHtml;
      html.style.colorScheme = prevScheme;
      body.style.backgroundColor = prevBody;
    };
  }, []);

  useEffect(() => {
    setMediaIndex(0);
    setSelectedSize(null);
    setSelectedColor(0);
    setSaved(false);
    window.scrollTo(0, 0);
  }, [productId]);

  if (!product) {
    return (
      <div className="theme-light flex min-h-screen flex-col bg-[#FAFAFA] text-[#111111]">
        <Navbar variant="light" offsetTop={0} onOpenAI={() => setAiOpen(true)} />
        <main className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
          <p className="text-[22px] font-semibold tracking-tight">
            Product not found
          </p>
          <p className="mt-2 text-[15px] text-[#6B7280]">
            This pair may have moved or is no longer listed.
          </p>
          <Link
            href="/marketplace"
            className="mt-8 inline-flex h-11 items-center rounded-full bg-[#111111] px-6 text-[13px] font-semibold text-white"
          >
            Back to marketplace
          </Link>
        </main>
        <Footer />
        <AIChatDialog open={aiOpen} onOpenChange={setAiOpen} />
      </div>
    );
  }

  const media = getProductMedia(product);
  const current = media[mediaIndex] ?? media[0];
  const related = getRelatedProducts(product, 4);
  const discount =
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0;

  const openQuickView = (p: Product) => {
    setQuickViewProduct(p);
    setDrawerOpen(true);
  };

  return (
    <div className="theme-light min-h-screen bg-[#FAFAFA] text-[#111111] antialiased selection:bg-[#2563EB]/15">
      <Navbar variant="light" offsetTop={0} onOpenAI={() => setAiOpen(true)} />

      <main className="pb-24 pt-20 sm:pt-24">
        <div className="container-page">
          <button
            type="button"
            onClick={() => {
              if (window.history.length > 1) router.back();
              else router.push("/marketplace");
            }}
            className="mb-8 inline-flex items-center gap-2 text-[13px] font-medium text-[#6B7280] transition-colors hover:text-[#111111]"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
            Back
          </button>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-[#F3F3F3]">
                {current?.type === "video" ? (
                  <video
                    key={current.src}
                    src={current.src}
                    poster={current.poster}
                    muted
                    loop
                    playsInline
                    autoPlay
                    controls
                    className="h-full w-full object-cover object-center"
                  />
                ) : current ? (
                  <img
                    key={current.src}
                    src={current.src}
                    alt={`${product.brand} ${product.name}`}
                    className="h-full w-full object-cover object-center"
                  />
                ) : null}

                <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
                  {discount > 0 && (
                    <span className="rounded-full bg-[#111111] px-2.5 py-1 text-[11px] font-semibold text-white">
                      −{discount}%
                    </span>
                  )}
                  {product.aiRecommended && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#2563EB] px-2.5 py-1 text-[11px] font-semibold text-white">
                      <Sparkles className="h-3 w-3" />
                      AI pick
                    </span>
                  )}
                  <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-medium text-[#111111]">
                    {product.condition}
                  </span>
                </div>
              </div>

              {media.length > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {media.map((item, i) => (
                    <button
                      key={`${item.type}-${i}`}
                      type="button"
                      onClick={() => setMediaIndex(i)}
                      className={cn(
                        "relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl ring-2 transition-all duration-200 sm:h-[72px] sm:w-[72px]",
                        i === mediaIndex
                          ? "ring-[#111111]"
                          : "ring-transparent opacity-70 hover:opacity-100"
                      )}
                      aria-label={
                        item.type === "video"
                          ? `Video ${i + 1}`
                          : `Image ${i + 1}`
                      }
                    >
                      {item.type === "video" ? (
                        <>
                          <img
                            src={item.poster}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                          <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <Play className="h-3.5 w-3.5 fill-white text-white" />
                          </span>
                        </>
                      ) : (
                        <img
                          src={item.src}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col lg:pt-2"
            >
              <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#6B7280]">
                {product.brand}
              </p>
              <h1 className="mt-2 text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] text-[#111111] sm:text-[40px]">
                {product.name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-[14px]">
                <span className="inline-flex items-center gap-1.5 font-semibold text-[#111111]">
                  <Star className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" />
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-[#6B7280]">
                  {product.reviews.toLocaleString()} reviews
                </span>
                <span className="text-[#D1D5DB]">·</span>
                <span className="text-[#6B7280]">{product.category}</span>
                <span className="text-[#D1D5DB]">·</span>
                <span className="text-[#6B7280]">{product.gender}</span>
              </div>

              <p className="mt-4 inline-flex items-center gap-1.5 text-[14px] text-[#6B7280]">
                <Store className="h-4 w-4" strokeWidth={1.75} />
                {product.store}
                {product.verified && (
                  <span className="inline-flex items-center gap-1 text-[#111111]">
                    <ShieldCheck className="h-4 w-4 text-[#22C55E]" />
                    Verified
                  </span>
                )}
              </p>

              <div className="mt-8 flex flex-wrap items-baseline gap-3">
                <span className="text-[36px] font-semibold tracking-tight tabular-nums text-[#111111]">
                  ${product.price}
                </span>
                {discount > 0 && (
                  <>
                    <span className="text-[18px] tabular-nums text-[#6B7280] line-through">
                      ${product.originalPrice}
                    </span>
                    <span className="rounded-full bg-black/[0.04] px-2.5 py-1 text-[12px] font-semibold text-[#111111]">
                      Save {discount}%
                    </span>
                  </>
                )}
              </div>

              <div className="mt-10">
                <p className="text-[13px] font-semibold text-[#111111]">
                  Color
                </p>
                <div className="mt-3 flex gap-2.5">
                  {product.colors.map((color, idx) => (
                    <button
                      key={`${color}-${idx}`}
                      type="button"
                      onClick={() => setSelectedColor(idx)}
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full ring-2 ring-offset-2 transition-all",
                        selectedColor === idx
                          ? "ring-[#111111]"
                          : "ring-transparent hover:ring-black/20"
                      )}
                      aria-label={`Color ${idx + 1}`}
                      aria-pressed={selectedColor === idx}
                    >
                      <span
                        className="h-7 w-7 rounded-full border border-black/10"
                        style={{ backgroundColor: color }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-semibold text-[#111111]">
                    Size
                  </p>
                  {selectedSize && (
                    <span className="text-[12px] text-[#6B7280]">
                      US {selectedSize}
                    </span>
                  )}
                </div>
                <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "h-12 rounded-2xl text-[14px] font-medium tabular-nums transition-all duration-200",
                        selectedSize === size
                          ? "bg-[#111111] text-white"
                          : "border border-black/[0.08] bg-white text-[#111111] hover:border-black/20"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-10 flex gap-3">
                <button
                  type="button"
                  className="inline-flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-[#111111] text-[14px] font-semibold text-white transition-all duration-200 hover:bg-black active:scale-[0.98]"
                >
                  <ShoppingBag className="h-4 w-4" strokeWidth={1.75} />
                  Add to bag
                  {selectedSize ? ` · ${selectedSize}` : ""}
                </button>
                <button
                  type="button"
                  onClick={() => setSaved((v) => !v)}
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-full border border-black/[0.08] bg-white transition-all duration-200 hover:bg-[#FAFAFA]",
                    saved && "text-rose-500"
                  )}
                  aria-label={saved ? "Remove from wishlist" : "Save"}
                >
                  <Heart
                    className="h-5 w-5"
                    strokeWidth={1.75}
                    fill={saved ? "currentColor" : "none"}
                  />
                </button>
              </div>

              <div className="mt-10 space-y-4 border-t border-black/[0.06] pt-8">
                <div className="flex gap-3">
                  <ShieldCheck
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#22C55E]"
                    strokeWidth={1.75}
                  />
                  <div>
                    <p className="text-[14px] font-semibold text-[#111111]">
                      Authenticated
                    </p>
                    <p className="mt-0.5 text-[13px] leading-relaxed text-[#6B7280]">
                      Every pair is verified by Titan Soles before it ships.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Truck
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#111111]"
                    strokeWidth={1.75}
                  />
                  <div>
                    <p className="text-[14px] font-semibold text-[#111111]">
                      Fast delivery
                    </p>
                    <p className="mt-0.5 text-[13px] leading-relaxed text-[#6B7280]">
                      Ships from {product.store} with tracked nationwide shipping.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <RotateCcw
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#111111]"
                    strokeWidth={1.75}
                  />
                  <div>
                    <p className="text-[14px] font-semibold text-[#111111]">
                      Easy returns
                    </p>
                    <p className="mt-0.5 text-[13px] leading-relaxed text-[#6B7280]">
                      14-day returns on unused items in original packaging.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {related.length > 0 && (
            <section className="mt-20 sm:mt-24">
              <div className="mb-8 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#6B7280]">
                    More like this
                  </p>
                  <h2 className="mt-1.5 text-[24px] font-semibold tracking-tight text-[#111111] sm:text-[28px]">
                    You may also like
                  </h2>
                </div>
                <Link
                  href="/marketplace"
                  className="shrink-0 text-[13px] font-semibold text-[#111111] transition-opacity hover:opacity-70"
                >
                  View all
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onQuickView={openQuickView}
                    aspect="3/4"
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
      <MobileNav onOpenAI={() => setAiOpen(true)} />

      <QuickViewDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        product={quickViewProduct}
      />

      <AIChatDialog open={aiOpen} onOpenChange={setAiOpen} />
    </div>
  );
}

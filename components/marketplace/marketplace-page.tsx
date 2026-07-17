"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { TitanSearch } from "@/components/search/titan-search";
import { FilterDrawer } from "./filter-drawer";
import { QuickViewDrawer } from "./quick-view-drawer";
import {
  PatternA,
  PatternB,
  PatternC,
  PatternD,
  ProductSkeleton,
  LifestyleBreak,
} from "./bento-patterns";
import {
  EditorialBanner,
  type EditorialBlock,
} from "./editorial-banner";
import { MarketplacePagination } from "./marketplace-pagination";
import {
  PRODUCTS,
  TOTAL_CATALOG_COUNT,
  PAGE_SIZE,
  type Product,
  type Condition,
} from "./products-data";

/** Products between lifestyle photography breaks */
const LIFESTYLE_EVERY = 30;

const EDITORIALS: EditorialBlock[] = [
  {
    id: "summer",
    eyebrow: "Seasonal edit",
    title: "Summer Collection",
    subtitle: "Breathable silhouettes and light tones for warmer miles.",
    cta: "Shop the edit",
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1600&h=900&fit=crop",
    tone: "dark",
  },
  {
    id: "running",
    eyebrow: "Performance",
    title: "Running Essentials",
    subtitle: "Engineered cushioning and carbon-ready race day tools.",
    cta: "Explore running",
    image:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1600&h=900&fit=crop",
    tone: "dark",
  },
  {
    id: "speed",
    eyebrow: "Designed for",
    title: "Designed for Speed",
    subtitle: "Lightweight uppers and responsive plates for faster turns.",
    cta: "Shop speed",
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1600&h=900&fit=crop",
    tone: "dark",
  },
  {
    id: "new",
    eyebrow: "Just landed",
    title: "New Arrivals",
    subtitle: "Fresh drops from verified stores — authenticated and ready.",
    cta: "See what's new",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&h=900&fit=crop",
    tone: "dark",
  },
  {
    id: "limited",
    eyebrow: "Exclusive",
    title: "Limited Edition",
    subtitle: "Rare colorways and numbered releases, while they last.",
    cta: "View limited",
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1600&h=900&fit=crop",
    tone: "dark",
  },
];

const LIFESTYLE = [
  {
    image:
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=900&h=1200&fit=crop",
    label: "City miles",
  },
  {
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=900&h=1200&fit=crop",
    label: "Weekend rotation",
  },
  {
    image:
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=900&h=1200&fit=crop",
    label: "Track to street",
  },
];

type Section =
  | { type: "pattern-a"; products: Product[]; key: string }
  | { type: "pattern-b"; products: Product[]; key: string }
  | { type: "pattern-c"; products: Product[]; key: string; editorial: EditorialBlock }
  | {
      type: "pattern-d";
      products: Product[];
      key: string;
      lifestyle?: (typeof LIFESTYLE)[number];
    }
  | { type: "promo"; editorial: EditorialBlock; key: string }
  | {
      type: "lifestyle";
      lifestyle: (typeof LIFESTYLE)[number];
      key: string;
    };

function take(list: Product[], start: number, n: number) {
  return list.slice(start, start + n);
}

/**
 * Build rotating A→B→C→D sections. Never repeats the same pattern consecutively.
 * Inserts a full-width lifestyle break every ~25–35 products.
 */
function buildSections(products: Product[]): Section[] {
  const sections: Section[] = [];
  let i = 0;
  let cycle = 0;
  let editorialIdx = 0;
  let lifestyleIdx = 0;
  let productsSinceLifestyle = 0;
  let lastPattern: "a" | "b" | "c" | "d" | null = null;
  let guard = 0;

  const nextPattern = (): "a" | "b" | "c" | "d" => {
    const order: Array<"a" | "b" | "c" | "d"> = ["a", "b", "c", "d"];
    let pick = order[cycle % 4];
    if (pick === lastPattern) {
      pick = order[(cycle + 1) % 4];
      cycle++;
    }
    return pick;
  };

  while (i < products.length && guard < 80) {
    guard++;

    if (
      productsSinceLifestyle >= LIFESTYLE_EVERY &&
      i < products.length
    ) {
      const life = LIFESTYLE[lifestyleIdx % LIFESTYLE.length];
      lifestyleIdx++;
      sections.push({
        type: "lifestyle",
        lifestyle: life,
        key: `life-${lifestyleIdx}-${i}`,
      });
      productsSinceLifestyle = 0;
    }

    const pattern = nextPattern();
    lastPattern = pattern;

    if (pattern === "a") {
      const chunk = take(products, i, 7);
      if (chunk.length < 3) break;
      sections.push({
        type: "pattern-a",
        products: chunk,
        key: `a-${cycle}-${chunk[0].id}`,
      });
      i += chunk.length;
      productsSinceLifestyle += chunk.length;
      const promo = EDITORIALS[editorialIdx % EDITORIALS.length];
      editorialIdx++;
      sections.push({
        type: "promo",
        editorial: promo,
        key: `promo-${cycle}-${promo.id}`,
      });
    } else if (pattern === "b") {
      const chunk = take(products, i, 7);
      if (chunk.length < 3) break;
      sections.push({
        type: "pattern-b",
        products: chunk,
        key: `b-${cycle}-${chunk[0].id}`,
      });
      i += chunk.length;
      productsSinceLifestyle += chunk.length;
    } else if (pattern === "c") {
      const ed = EDITORIALS[editorialIdx % EDITORIALS.length];
      editorialIdx++;
      const chunk = take(products, i, 6);
      if (chunk.length < 4) break;
      sections.push({
        type: "pattern-c",
        products: chunk,
        key: `c-${cycle}-${chunk[0].id}`,
        editorial: ed,
      });
      i += chunk.length;
      productsSinceLifestyle += chunk.length;
    } else {
      const chunk = take(products, i, 9);
      if (chunk.length < 5) break;
      sections.push({
        type: "pattern-d",
        products: chunk,
        key: `d-${cycle}-${chunk[0].id}`,
        lifestyle: LIFESTYLE[lifestyleIdx % LIFESTYLE.length],
      });
      lifestyleIdx++;
      i += chunk.length;
      productsSinceLifestyle += chunk.length;
    }

    cycle++;
  }

  return sections;
}

export function MarketplacePage() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<Condition[]>(
    []
  );
  const [priceMax, setPriceMax] = useState(500);
  const [page, setPage] = useState(1);
  const [initialReady, setInitialReady] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.backgroundColor;
    const prevBody = body.style.backgroundColor;
    const prevScheme = html.style.colorScheme;
    html.style.backgroundColor = "#FAFAFA";
    html.style.colorScheme = "light";
    body.style.backgroundColor = "#FAFAFA";
    const t = window.setTimeout(() => setInitialReady(true), 180);
    return () => {
      window.clearTimeout(t);
      html.style.backgroundColor = prevHtml;
      html.style.colorScheme = prevScheme;
      body.style.backgroundColor = prevBody;
    };
  }, []);

  const resetPaging = () => setPage(1);

  /** All marketplace search stays in the textbox — no AI chat panel */
  const runSearch = useCallback((query?: string) => {
    if (typeof query === "string") {
      setSearchQuery(query);
    }
    resetPaging();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];
    const q = searchQuery.toLowerCase().trim();

    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.store.toLowerCase().includes(q)
      );
    }

    if (selectedBrands.length) {
      list = list.filter((p) => selectedBrands.includes(p.brand));
    }
    if (selectedGenders.length) {
      list = list.filter((p) => selectedGenders.includes(p.gender));
    }
    if (selectedCategories.length) {
      list = list.filter((p) => selectedCategories.includes(p.category));
    }
    if (selectedConditions.length) {
      list = list.filter((p) => selectedConditions.includes(p.condition));
    }
    list = list.filter((p) => p.price <= priceMax);

    return list;
  }, [
    searchQuery,
    selectedBrands,
    selectedGenders,
    selectedCategories,
    selectedConditions,
    priceMax,
  ]);

  // Extended catalog for pagination against TOTAL_CATALOG_COUNT
  const catalog = useMemo(() => {
    if (!filteredProducts.length) return [];
    const target =
      filteredProducts.length === PRODUCTS.length
        ? TOTAL_CATALOG_COUNT
        : Math.max(filteredProducts.length, filteredProducts.length * 12);
    const out: Product[] = [];
    for (let i = 0; i < target; i++) {
      const base = filteredProducts[i % filteredProducts.length];
      out.push({
        ...base,
        id: base.id * 10000 + i,
      });
    }
    return out;
  }, [filteredProducts]);

  const displayTotal = catalog.length;
  const totalPages = Math.max(1, Math.ceil(displayTotal / PAGE_SIZE));

  const pageProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return catalog.slice(start, start + PAGE_SIZE);
  }, [catalog, page]);

  const sections = useMemo(
    () => buildSections(pageProducts),
    [pageProducts]
  );

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [page, totalPages]);

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedGenders([]);
    setSelectedCategories([]);
    setSelectedConditions([]);
    setPriceMax(500);
    setSearchQuery("");
    resetPaging();
  };

  const drawerFiltersActive =
    selectedBrands.length > 0 ||
    selectedGenders.length > 0 ||
    selectedCategories.length > 0 ||
    selectedConditions.length > 0 ||
    priceMax !== 500;

  const hasActiveFilters = drawerFiltersActive || searchQuery.length > 0;

  const activeFilterChips = useMemo(() => {
    const chips: { id: string; label: string; onRemove: () => void }[] = [];

    selectedCategories.forEach((c) => {
      chips.push({
        id: `cat-${c}`,
        label: c,
        onRemove: () => {
          setSelectedCategories((prev) => prev.filter((x) => x !== c));
          resetPaging();
        },
      });
    });
    selectedBrands.forEach((b) => {
      chips.push({
        id: `brand-${b}`,
        label: b,
        onRemove: () => {
          setSelectedBrands((prev) => prev.filter((x) => x !== b));
          resetPaging();
        },
      });
    });
    selectedGenders.forEach((g) => {
      chips.push({
        id: `gender-${g}`,
        label: g,
        onRemove: () => {
          setSelectedGenders((prev) => prev.filter((x) => x !== g));
          resetPaging();
        },
      });
    });
    selectedConditions.forEach((c) => {
      chips.push({
        id: `cond-${c}`,
        label: c,
        onRemove: () => {
          setSelectedConditions((prev) => prev.filter((x) => x !== c));
          resetPaging();
        },
      });
    });
    if (priceMax !== 500) {
      chips.push({
        id: "price",
        label: `Up to $${priceMax}`,
        onRemove: () => {
          setPriceMax(500);
          resetPaging();
        },
      });
    }

    return chips;
  }, [
    selectedBrands,
    selectedGenders,
    selectedCategories,
    selectedConditions,
    priceMax,
  ]);

  const openQuickView = (p: Product) => {
    setQuickViewProduct(p);
    setIsDrawerOpen(true);
  };

  return (
    <div className="theme-light min-h-screen bg-[#FAFAFA] text-[#111111] antialiased selection:bg-[#2563EB]/15">
      <Navbar variant="light" offsetTop={0} onOpenAI={() => runSearch()} />

      <main>
        {/* Hero — search + tools + active filter chips */}
        <section className="relative z-50 overflow-visible">
          <div className="container-page flex flex-col items-center pb-7 pt-20 sm:pb-8 sm:pt-24 lg:pt-28">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl text-center text-[28px] font-semibold leading-[1.1] tracking-[-0.035em] text-[#111111] sm:text-[34px] lg:text-[40px]"
            >
              Find your next pair
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-50 mt-6 w-full max-w-xl"
            >
              <TitanSearch
                variant="light"
                compact
                value={searchQuery}
                onChange={(v) => {
                  setSearchQuery(v);
                  resetPaging();
                }}
                onAskAI={(q) => {
                  if (q?.toLowerCase().includes("look like this image")) return;
                  runSearch(q);
                }}
                onSubmit={() => runSearch()}
                onFilter={() => setFiltersOpen(true)}
                filterActive={drawerFiltersActive}
                placeholder="Search sneakers, brands..."
                aiLabel="Search"
              />

              {activeFilterChips.length > 0 && (
                <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                  {activeFilterChips.map((chip) => (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={chip.onRemove}
                      className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white py-1 pl-3 pr-2 text-[12px] font-medium text-[#111111] transition-colors hover:border-black/15 hover:bg-[#FAFAFA]"
                    >
                      {chip.label}
                      <span className="flex h-4 w-4 items-center justify-center rounded-full text-[#6B7280] hover:bg-black/[0.06] hover:text-[#111111]">
                        <X className="h-3 w-3" strokeWidth={2} />
                      </span>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedBrands([]);
                      setSelectedGenders([]);
                      setSelectedCategories([]);
                      setSelectedConditions([]);
                      setPriceMax(500);
                      resetPaging();
                    }}
                    className="px-2 py-1 text-[12px] font-medium text-[#6B7280] transition-colors hover:text-[#111111]"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Product grid */}
        <section className="pb-20 pt-4 sm:pt-6 lg:pt-8">
          <div className="container-page">
            <AnimatePresence mode="wait">
              {!initialReady ? (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
                >
                  {Array.from({ length: 8 }).map((_, i) => (
                    <ProductSkeleton key={i} aspect="3/4" />
                  ))}
                </motion.div>
              ) : catalog.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center py-24 text-center"
                >
                  <p className="text-[22px] font-semibold tracking-tight text-[#111111]">
                    Nothing matched
                  </p>
                  <p className="mt-2 text-[15px] text-[#6B7280]">
                    Try a different brand, model, or clear your search.
                  </p>
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="mt-8 h-11 rounded-full bg-[#111111] px-6 text-[13px] font-semibold text-white"
                  >
                    Clear search
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="catalog"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-12 sm:gap-14 lg:gap-16"
                >
                  {sections.map((section) => {
                    if (section.type === "lifestyle") {
                      return (
                        <div key={section.key}>
                          <LifestyleBreak
                            image={section.lifestyle.image}
                            label={section.lifestyle.label}
                          />
                        </div>
                      );
                    }

                    if (section.type === "promo") {
                      return (
                        <div key={section.key}>
                          <EditorialBanner
                            block={section.editorial}
                            variant="full"
                          />
                        </div>
                      );
                    }

                    if (section.type === "pattern-a") {
                      return (
                        <div key={section.key}>
                          <PatternA
                            products={section.products}
                            onQuickView={openQuickView}
                          />
                        </div>
                      );
                    }

                    if (section.type === "pattern-b") {
                      return (
                        <div key={section.key}>
                          <PatternB
                            products={section.products}
                            onQuickView={openQuickView}
                          />
                        </div>
                      );
                    }

                    if (section.type === "pattern-c") {
                      return (
                        <div
                          key={section.key}
                          className="space-y-12 sm:space-y-14"
                        >
                          <EditorialBanner
                            block={section.editorial}
                            variant="split"
                          />
                          <PatternC
                            products={section.products}
                            onQuickView={openQuickView}
                          />
                        </div>
                      );
                    }

                    return (
                      <div key={section.key}>
                        <PatternD
                          products={section.products}
                          onQuickView={openQuickView}
                          lifestyleImage={section.lifestyle?.image}
                          lifestyleLabel={section.lifestyle?.label}
                        />
                      </div>
                    );
                  })}

                  <div className="pb-4 pt-4">
                    <MarketplacePagination
                      page={page}
                      totalPages={Math.min(totalPages, 26)}
                      totalItems={displayTotal}
                      pageSize={PAGE_SIZE}
                      onPageChange={(p) => {
                        setPage(p);
                        window.scrollTo({ top: 200, behavior: "smooth" });
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <Footer />
      <MobileNav onOpenAI={() => runSearch()} />

      <FilterDrawer
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        selectedBrands={selectedBrands}
        setSelectedBrands={(v) => {
          setSelectedBrands(v);
          resetPaging();
        }}
        selectedGenders={selectedGenders}
        setSelectedGenders={(v) => {
          setSelectedGenders(v);
          resetPaging();
        }}
        selectedCategories={selectedCategories}
        setSelectedCategories={(v) => {
          setSelectedCategories(v);
          resetPaging();
        }}
        selectedConditions={selectedConditions}
        setSelectedConditions={(v) => {
          setSelectedConditions(v);
          resetPaging();
        }}
        priceMax={priceMax}
        setPriceMax={(v) => {
          setPriceMax(v);
          resetPaging();
        }}
        clearAllFilters={clearAllFilters}
        hasActiveFilters={hasActiveFilters}
      />

      <QuickViewDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        product={quickViewProduct}
      />
    </div>
  );
}

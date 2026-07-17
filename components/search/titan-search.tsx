"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Search,
  Sparkles,
  Mic,
  X,
  Camera,
  SlidersHorizontal,
  Clock,
  TrendingUp,
  Tag,
  Wand2,
  CornerDownLeft,
  Loader2,
} from "lucide-react";
import { PRODUCTS } from "@/components/marketplace/products-data";
import { cn } from "@/lib/utils";

const DEFAULT_PLACEHOLDER = "Ask anything...";

const RECENT_KEY = "titansoles-marketplace-recent";
const MAX_RECENT = 6;

const TRENDING = [
  { title: "Samba OG", description: "Adidas · Lifestyle staple" },
  { title: "Air Max 90", description: "Nike · Retro runner" },
  { title: "990v5", description: "New Balance · Premium daily" },
  { title: "White sneakers under $120", description: "Trending this week" },
];

const POPULAR_BRANDS = [
  { title: "Nike", description: "Iconic performance & lifestyle" },
  { title: "Adidas", description: "Samba, Gazelle, Ultraboost" },
  { title: "New Balance", description: "Made in USA classics" },
  { title: "Hoka", description: "Max-cushion runners" },
];

const AI_SUGGESTIONS = [
  {
    title: "Jordan under $200 for basketball",
    description: "Price · sport · verified authentic",
  },
  {
    title: "Find breathing trail shoes under $160",
    description: "AI will match cushion, grip & climate",
  },
  {
    title: "Minimalist white sneakers for office",
    description: "Quiet luxury · verified authentic",
  },
  {
    title: "Compare Ultraboost vs Gel-Kayano",
    description: "Fit, energy return & durability",
  },
];

type RowKind = "recent" | "trending" | "brand" | "ai" | "product";

interface SuggestRow {
  id: string;
  kind: RowKind;
  title: string;
  description: string;
  image?: string;
  query?: string;
}

export type TitanSearchProps = {
  variant?: "light" | "dark";
  value?: string;
  onChange?: (value: string) => void;
  onAskAI: (query?: string) => void;
  onSubmit?: () => void;
  onFilter?: () => void;
  filterActive?: boolean;
  className?: string;
  showDropdown?: boolean;
  placeholder?: string;
  aiLabel?: string;
  /** Smaller controls + type for premium marketplace hero */
  compact?: boolean;
};

function loadRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    if (!raw) return ["Nike Dunk", "New Balance 550", "black runners"];
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed.slice(0, MAX_RECENT) : [];
  } catch {
    return [];
  }
}

function saveRecent(items: string[]) {
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(items.slice(0, MAX_RECENT)));
  } catch {
    /* ignore */
  }
}

function isMac(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Mac|iPhone|iPad|iPod/.test(navigator.platform);
}

export function TitanSearch({
  variant = "light",
  value: valueProp,
  onChange,
  onAskAI,
  onSubmit,
  onFilter,
  filterActive = false,
  className,
  showDropdown: showDropdownProp = true,
  placeholder = DEFAULT_PLACEHOLDER,
  aiLabel = "AI",
  compact = false,
}: TitanSearchProps) {
  const isControlled = valueProp !== undefined;
  const [localQuery, setLocalQuery] = useState(valueProp ?? "");
  const value = isControlled ? valueProp : localQuery;

  const setQuery = useCallback(
    (next: string) => {
      if (!isControlled) setLocalQuery(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );

  useEffect(() => {
    if (isControlled) setLocalQuery(valueProp);
  }, [isControlled, valueProp]);

  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const isDark = variant === "dark";

  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [placeholderSoft, setPlaceholderSoft] = useState(true);
  const [modKey, setModKey] = useState("Ctrl");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setRecent(loadRecent());
    setModKey(isMac() ? "⌘" : "Ctrl");
  }, []);

  useEffect(() => {
    if (value) return;
    if (focused) {
      setPlaceholderSoft(false);
      const t = setTimeout(() => setPlaceholderSoft(true), 180);
      return () => clearTimeout(t);
    }
    const id = setInterval(() => {
      setPlaceholderSoft((v) => !v);
    }, 2800);
    return () => clearInterval(id);
  }, [value, focused]);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, []);

  const pushRecent = useCallback((q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    setRecent((prev) => {
      const next = [trimmed, ...prev.filter((x) => x !== trimmed)].slice(
        0,
        MAX_RECENT
      );
      saveRecent(next);
      return next;
    });
  }, []);

  const rows = useMemo((): SuggestRow[] => {
    const q = value.trim().toLowerCase();

    if (!q) {
      const recentRows: SuggestRow[] = recent.map((r, i) => ({
        id: `recent-${i}`,
        kind: "recent",
        title: r,
        description: "Recent search",
        query: r,
      }));
      const trendingRows: SuggestRow[] = TRENDING.map((t, i) => ({
        id: `trend-${i}`,
        kind: "trending",
        title: t.title,
        description: t.description,
        query: t.title,
      }));
      const brandRows: SuggestRow[] = POPULAR_BRANDS.map((b, i) => ({
        id: `brand-${i}`,
        kind: "brand",
        title: b.title,
        description: b.description,
        query: b.title,
      }));
      const aiRows: SuggestRow[] = AI_SUGGESTIONS.map((a, i) => ({
        id: `ai-${i}`,
        kind: "ai",
        title: a.title,
        description: a.description,
        query: a.title,
      }));
      return [...recentRows, ...trendingRows, ...brandRows, ...aiRows];
    }

    const products: SuggestRow[] = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    )
      .slice(0, 4)
      .map((p) => ({
        id: `product-${p.id}`,
        kind: "product" as const,
        title: p.name,
        description: `${p.brand} · $${p.price}`,
        image: p.images[0] ?? p.image,
        query: p.name,
      }));

    const brands: SuggestRow[] = POPULAR_BRANDS.filter((b) =>
      b.title.toLowerCase().includes(q)
    ).map((b, i) => ({
      id: `brand-f-${i}`,
      kind: "brand" as const,
      title: b.title,
      description: b.description,
      query: b.title,
    }));

    const ai: SuggestRow[] = [
      {
        id: "ai-ask",
        kind: "ai",
        title: `Ask Titan AI about “${value.trim()}”`,
        description: "Natural language · visual match · size advice",
        query: value.trim(),
      },
      ...AI_SUGGESTIONS.filter((a) => a.title.toLowerCase().includes(q)).map(
        (a, i) => ({
          id: `ai-f-${i}`,
          kind: "ai" as const,
          title: a.title,
          description: a.description,
          query: a.title,
        })
      ),
    ];

    const trending: SuggestRow[] = TRENDING.filter((t) =>
      t.title.toLowerCase().includes(q)
    ).map((t, i) => ({
      id: `trend-f-${i}`,
      kind: "trending" as const,
      title: t.title,
      description: t.description,
      query: t.title,
    }));

    return [...ai, ...products, ...brands, ...trending];
  }, [value, recent]);

  const grouped = useMemo(() => {
    const order: { key: RowKind; label: string }[] = value.trim()
      ? [
          { key: "ai", label: "AI Suggestions" },
          { key: "product", label: "Products" },
          { key: "brand", label: "Popular Brands" },
          { key: "trending", label: "Trending" },
        ]
      : [
          { key: "recent", label: "Recent Searches" },
          { key: "trending", label: "Trending" },
          { key: "brand", label: "Popular Brands" },
          { key: "ai", label: "AI Suggestions" },
        ];

    return order
      .map((section) => ({
        ...section,
        items: rows.filter((r) => r.kind === section.key),
      }))
      .filter((s) => s.items.length > 0);
  }, [rows, value]);

  const flatRows = useMemo(
    () => grouped.flatMap((g) => g.items),
    [grouped]
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [value, open]);

  const commitSearch = useCallback(
    (q: string, askAI = false) => {
      const trimmed = q.trim();
      if (!trimmed) {
        onAskAI();
        return;
      }
      pushRecent(trimmed);
      setQuery(trimmed);
      setOpen(false);
      if (askAI || trimmed.length > 12) {
        setLoading(true);
        onAskAI(trimmed);
        setTimeout(() => setLoading(false), 900);
      } else {
        onSubmit?.();
      }
    },
    [onAskAI, setQuery, onSubmit, pushRecent]
  );

  const activateRow = (row: SuggestRow) => {
    if (row.kind === "ai") {
      commitSearch(row.query || row.title, true);
      return;
    }
    setQuery(row.query || row.title);
    pushRecent(row.query || row.title);
    setOpen(false);
    onSubmit?.();
  };

  const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(true);
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      inputRef.current?.blur();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, Math.max(flatRows.length - 1, 0)));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const row = flatRows[activeIndex];
      if (open && row) activateRow(row);
      else commitSearch(value);
    }
  };

  const startVoice = () => {
    type RecCtor = new () => {
      lang: string;
      interimResults: boolean;
      start: () => void;
      onresult: ((event: { results: SpeechRecognitionResultList }) => void) | null;
      onerror: (() => void) | null;
      onend: (() => void) | null;
    };

    const w = window as unknown as {
      SpeechRecognition?: RecCtor;
      webkitSpeechRecognition?: RecCtor;
    };
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;

    if (!SR) {
      onAskAI("I'd like to search by voice");
      return;
    }

    const recognition = new SR();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    setListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript ?? "";
      if (transcript) {
        setQuery(transcript);
        setOpen(true);
      }
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognition.start();
  };

  const showDropdown =
    showDropdownProp && open && (focused || value.length > 0);
  const active = focused || hovered;

  let flatCounter = -1;

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative mx-auto w-full",
        compact ? "max-w-[640px]" : "max-w-[800px]",
        className
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          commitSearch(value);
        }}
        className="relative"
      >
        <motion.div
          animate={{ scale: focused ? (compact ? 1.005 : 1.01) : 1 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "relative flex items-center rounded-full",
            "backdrop-blur-[20px]",
            "transition-[box-shadow,border-color,background-color] duration-200 ease-out",
            compact
              ? "h-12 py-1.5 pl-4 pr-2"
              : "h-16 py-2.5 pl-6 pr-3",
            isDark
              ? cn(
                  "border border-white/10 bg-white/[0.06] text-white",
                  !focused &&
                    !hovered &&
                    "shadow-[0_12px_40px_rgba(0,0,0,0.25)]",
                  !focused &&
                    hovered &&
                    "border-white/[0.14] shadow-[0_20px_60px_rgba(0,0,0,0.35)]",
                  focused &&
                    "border-primary/40 bg-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_0_4px_rgba(var(--primary),0.12),0_0_32px_rgba(var(--primary),0.18)]"
                )
              : cn(
                  "border bg-[rgba(255,255,255,0.92)]",
                  !focused &&
                    !hovered &&
                    (compact
                      ? "border-[rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
                      : "border-[rgba(0,0,0,0.05)] shadow-[0_12px_40px_rgba(0,0,0,0.06)]"),
                  !focused &&
                    hovered &&
                    (compact
                      ? "border-[rgba(0,0,0,0.08)] shadow-[0_8px_28px_rgba(0,0,0,0.06)]"
                      : "border-[rgba(0,0,0,0.06)] shadow-[0_20px_60px_rgba(0,0,0,0.09)]"),
                  focused &&
                    (compact
                      ? "border-[rgba(0,0,0,0.1)] bg-white shadow-[0_8px_28px_rgba(0,0,0,0.07)]"
                      : "border-[rgba(0,0,0,0.08)] bg-[rgba(255,255,255,0.98)] shadow-[0_20px_60px_rgba(0,0,0,0.10)]")
                )
          )}
        >
          <Search
            className={cn(
              "shrink-0 transition-colors duration-200",
              compact ? "h-3.5 w-3.5" : "h-4 w-4",
              isDark
                ? focused
                  ? "text-white"
                  : "text-slate-400"
                : focused
                  ? "text-[#111111]"
                  : "text-[#8A8A8A]"
            )}
            strokeWidth={1.75}
            aria-hidden
          />

          <div className={cn("relative min-w-0 flex-1", compact ? "ml-3" : "ml-4")}>
            <input
              ref={inputRef}
              type="search"
              value={value}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => {
                setFocused(true);
                setOpen(true);
              }}
              onKeyDown={onInputKeyDown}
              role="combobox"
              aria-expanded={showDropdown}
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={
                showDropdown && flatRows[activeIndex]
                  ? `${listId}-${flatRows[activeIndex].id}`
                  : undefined
              }
              aria-label="Search marketplace"
              autoComplete="off"
              spellCheck={false}
              className={cn(
                "w-full bg-transparent font-medium tracking-[-0.01em]",
                "placeholder:text-transparent focus:outline-none",
                "[&::-webkit-search-cancel-button]:hidden",
                compact ? "h-9 text-[14px]" : "h-11 text-[18px]",
                isDark
                  ? "text-white caret-white"
                  : "text-[#111111] caret-[#111111]"
              )}
            />

            {!value && (
              <motion.span
                aria-hidden
                animate={{
                  opacity: placeholderSoft ? 1 : 0.45,
                  y: placeholderSoft ? 0 : 2,
                  filter: focused
                    ? "blur(0px)"
                    : placeholderSoft
                      ? "blur(0px)"
                      : "blur(1px)",
                }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className={cn(
                  "pointer-events-none absolute inset-y-0 left-0 flex items-center font-medium tracking-[-0.01em]",
                  compact ? "text-[14px]" : "text-[18px]",
                  isDark ? "text-slate-500" : "text-[#8A8A8A]"
                )}
              >
                {placeholder}
              </motion.span>
            )}
          </div>

          <div className={cn("flex shrink-0 items-center", compact ? "ml-1 gap-0.5" : "ml-2 gap-1.5")}>
            <AnimatePresence mode="popLayout">
              {value ? (
                <motion.button
                  key="clear"
                  type="button"
                  initial={{ opacity: 0, scale: 0.86 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.86 }}
                  transition={{ duration: 0.18 }}
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  className={cn(
                    "flex items-center justify-center rounded-full transition-all duration-200",
                    compact ? "h-8 w-8" : "h-9 w-9",
                    isDark
                      ? "text-slate-400 hover:bg-white/5 hover:text-accent"
                      : "text-[#8A8A8A] hover:bg-black/[0.04] hover:text-[#111111]"
                  )}
                  aria-label="Clear search"
                >
                  <X className={cn(compact ? "h-3.5 w-3.5" : "h-4 w-4")} strokeWidth={1.75} />
                </motion.button>
              ) : mounted && !compact ? (
                <motion.span
                  key="shortcut"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: active ? 1 : 0.7 }}
                  exit={{ opacity: 0 }}
                  className="hidden items-center sm:inline-flex"
                  aria-hidden
                >
                  <kbd
                    className={cn(
                      "rounded-md border px-1.5 py-0.5 text-[10px] font-medium tracking-wide",
                      isDark
                        ? "border-white/10 bg-white/[0.06] text-slate-400"
                        : "border-black/[0.06] bg-black/[0.03] text-[#6B7280]"
                    )}
                  >
                    {modKey}K
                  </kbd>
                </motion.span>
              ) : null}
            </AnimatePresence>

            {/* Camera + mic — compact marketplace + full landing */}
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className={cn(
                "flex items-center justify-center rounded-full transition-all duration-200 hover:scale-105",
                compact ? "h-8 w-8" : "h-9 w-9",
                isDark
                  ? "text-slate-400 hover:bg-white/5 hover:text-accent"
                  : "text-[#8A8A8A] hover:bg-black/[0.04] hover:text-[#111111]"
              )}
              aria-label="Image search"
              title="Search by image"
            >
              <Camera
                className={cn(compact ? "h-3.5 w-3.5" : "h-4 w-4")}
                strokeWidth={1.75}
              />
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={() => {
                setLoading(true);
                onAskAI("Find sneakers that look like this image");
                setTimeout(() => setLoading(false), 900);
              }}
            />

            {!compact && (
              <div
                className={cn(
                  "mx-0.5 h-5 w-px",
                  isDark ? "bg-white/10" : "bg-black/[0.08]"
                )}
                aria-hidden
              />
            )}

            <button
              type="button"
              onClick={startVoice}
              className={cn(
                "relative flex items-center justify-center rounded-full transition-all duration-200",
                compact ? "h-8 w-8" : "h-9 w-9",
                listening
                  ? isDark
                    ? "bg-primary text-white shadow-[0_0_0_4px_rgba(var(--primary),0.2)]"
                    : "bg-[#111111] text-white shadow-[0_0_0_4px_rgba(17,17,17,0.08)]"
                  : isDark
                    ? "text-slate-400 hover:scale-105 hover:bg-white/5 hover:text-accent"
                    : "text-[#8A8A8A] hover:scale-105 hover:bg-black/[0.04] hover:text-[#111111]"
              )}
              aria-label="Voice search"
              aria-pressed={listening}
            >
              {listening && (
                <span
                  className={cn(
                    "absolute inset-0 animate-ping rounded-full",
                    isDark ? "bg-primary/20" : "bg-[#111111]/20"
                  )}
                />
              )}
              <Mic
                className={cn("relative", compact ? "h-3.5 w-3.5" : "h-4 w-4")}
                strokeWidth={1.75}
              />
            </button>

            {onFilter && (
              <button
                type="button"
                onClick={onFilter}
                className={cn(
                  "relative inline-flex items-center justify-center rounded-full transition-all duration-200",
                  compact
                    ? "h-8 gap-1 px-2.5 text-[12px] font-medium"
                    : "h-9 w-9 hover:scale-105",
                  filterActive
                    ? isDark
                      ? "bg-white/10 text-white"
                      : "bg-black/[0.06] text-[#111111]"
                    : isDark
                      ? "text-slate-400 hover:bg-white/5 hover:text-accent"
                      : "text-[#6B7280] hover:bg-black/[0.04] hover:text-[#111111]"
                )}
                aria-label="Open filters"
                aria-pressed={filterActive}
                title="Filters"
              >
                <SlidersHorizontal
                  className={cn(compact ? "h-3.5 w-3.5" : "h-4 w-4")}
                  strokeWidth={1.75}
                />
                {compact && <span>Filter</span>}
                {filterActive && (
                  <span
                    className={cn(
                      "rounded-full bg-[#2563EB]",
                      compact
                        ? "ml-0.5 h-1.5 w-1.5"
                        : "absolute right-1.5 top-1.5 h-1.5 w-1.5"
                    )}
                  />
                )}
              </button>
            )}

            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => commitSearch(value, !compact)}
              disabled={loading}
              className={cn(
                "relative inline-flex items-center gap-1.5 overflow-hidden rounded-full font-semibold text-white",
                "transition-shadow duration-200 disabled:opacity-80",
                compact
                  ? "ml-0.5 h-9 px-3.5 text-[12px]"
                  : "ml-0.5 h-[46px] gap-2 px-[18px] text-[14px]",
                isDark
                  ? cn(
                      "bg-primary shadow-[0_8px_24px_rgba(var(--primary),0.35),0_0_0_1px_rgba(255,255,255,0.08)_inset]",
                      "hover:shadow-[0_12px_32px_rgba(var(--primary),0.45),0_0_24px_rgba(var(--primary),0.3)]"
                    )
                  : cn(
                      "bg-[#111111]",
                      compact
                        ? "shadow-[0_4px_14px_rgba(0,0,0,0.14)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.18)]"
                        : "shadow-[0_8px_24px_rgba(0,0,0,0.18),0_0_0_1px_rgba(255,255,255,0.06)_inset] hover:shadow-[0_12px_32px_rgba(0,0,0,0.24),0_0_24px_rgba(17,17,17,0.18)]"
                    )
              )}
              aria-label={aiLabel}
            >
              {loading ? (
                <Loader2 className={cn(compact ? "h-3.5 w-3.5" : "h-4 w-4", "animate-spin")} strokeWidth={2} />
              ) : compact ? (
                <Search className="h-3.5 w-3.5" strokeWidth={2} />
              ) : (
                <motion.span
                  animate={{ rotate: [0, 12, -8, 0], scale: [1, 1.08, 1] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="inline-flex"
                >
                  <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
                </motion.span>
              )}
              <span>{aiLabel}</span>
            </motion.button>
          </div>
        </motion.div>
      </form>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            id={listId}
            role="listbox"
            initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 6, filter: "blur(4px)" }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "absolute left-0 right-0 top-[calc(100%+10px)] z-50 overflow-hidden",
              "rounded-[28px] backdrop-blur-[24px]",
              isDark
                ? "border border-white/[0.08] bg-[#0B1728]/96 shadow-[0_24px_80px_rgba(0,0,0,0.45),0_8px_24px_rgba(0,0,0,0.2)]"
                : "border border-black/[0.05] bg-[rgba(255,255,255,0.96)] shadow-[0_24px_80px_rgba(0,0,0,0.10),0_8px_24px_rgba(0,0,0,0.04)]"
            )}
          >
            <div className="max-h-[min(420px,60vh)] overflow-y-auto overscroll-contain p-2.5 scrollbar-hide">
              {flatRows.length === 0 ? (
                <div className="px-4 py-10 text-center">
                  <p
                    className={cn(
                      "text-[15px] font-medium",
                      isDark ? "text-white" : "text-[#111111]"
                    )}
                  >
                    No matches
                  </p>
                  <p
                    className={cn(
                      "mt-1 text-[13px]",
                      isDark ? "text-slate-400" : "text-[#8A8A8A]"
                    )}
                  >
                    Try another term or ask AI.
                  </p>
                </div>
              ) : (
                grouped.map((section) => (
                  <div key={section.key} className="mb-1.5 last:mb-0">
                    <div className="flex items-center justify-between px-3 pb-1.5 pt-2">
                      <p
                        className={cn(
                          "text-[11px] font-semibold uppercase tracking-[0.08em]",
                          isDark ? "text-slate-400" : "text-[#8A8A8A]"
                        )}
                      >
                        {section.label}
                      </p>
                      {section.key === "recent" && recent.length > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            setRecent([]);
                            saveRecent([]);
                          }}
                          className={cn(
                            "text-[11px] font-medium transition-colors",
                            isDark
                              ? "text-slate-400 hover:text-white"
                              : "text-[#8A8A8A] hover:text-[#111111]"
                          )}
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    <ul className="space-y-0.5">
                      {section.items.map((row) => {
                        flatCounter += 1;
                        const index = flatCounter;
                        const isActive = index === activeIndex;
                        return (
                          <li key={row.id}>
                            <button
                              type="button"
                              id={`${listId}-${row.id}`}
                              role="option"
                              aria-selected={isActive}
                              onMouseEnter={() => setActiveIndex(index)}
                              onClick={() => activateRow(row)}
                              className={cn(
                                "flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-all duration-200",
                                isDark
                                  ? isActive
                                    ? "bg-white/5"
                                    : "hover:bg-white/5"
                                  : isActive
                                    ? "bg-black/[0.04]"
                                    : "hover:bg-black/[0.03]"
                              )}
                            >
                              <RowIcon
                                row={row}
                                active={isActive}
                                isDark={isDark}
                              />
                              <div className="min-w-0 flex-1">
                                <p
                                  className={cn(
                                    "truncate text-[14px] font-medium tracking-[-0.01em]",
                                    isDark ? "text-white" : "text-[#111111]"
                                  )}
                                >
                                  {row.title}
                                </p>
                                <p
                                  className={cn(
                                    "mt-0.5 truncate text-[12px]",
                                    isDark ? "text-slate-400" : "text-[#8A8A8A]"
                                  )}
                                >
                                  {row.description}
                                </p>
                              </div>
                              {isActive && (
                                <span
                                  className={cn(
                                    "hidden items-center gap-1 text-[11px] sm:inline-flex",
                                    isDark ? "text-slate-400" : "text-[#8A8A8A]"
                                  )}
                                >
                                  <CornerDownLeft className="h-3 w-3" />
                                  Enter
                                </span>
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))
              )}
            </div>

            <div
              className={cn(
                "flex items-center justify-between border-t px-4 py-2.5",
                isDark ? "border-white/[0.08]" : "border-black/[0.04]"
              )}
            >
              <div
                className={cn(
                  "flex items-center gap-1.5 text-[11px]",
                  isDark ? "text-slate-400" : "text-[#8A8A8A]"
                )}
              >
                <Sparkles
                  className={cn(
                    "h-3 w-3",
                    isDark ? "text-primary" : "text-[#111111]/70"
                  )}
                />
                Powered by Titan AI
              </div>
              <div
                className={cn(
                  "hidden items-center gap-3 text-[11px] sm:flex",
                  isDark ? "text-slate-400" : "text-[#8A8A8A]"
                )}
              >
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>Esc Close</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RowIcon({
  row,
  active,
  isDark,
}: {
  row: SuggestRow;
  active: boolean;
  isDark: boolean;
}) {
  const shell = cn(
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-200",
    isDark
      ? active
        ? "bg-primary text-white"
        : "bg-white/[0.06] text-slate-400"
      : active
        ? "bg-[#111111] text-white"
        : "bg-black/[0.04] text-[#6B7280]"
  );

  if (row.kind === "product" && row.image) {
    return (
      <span
        className={cn(
          "relative h-9 w-9 shrink-0 overflow-hidden rounded-xl",
          isDark
            ? "bg-white/[0.06] ring-1 ring-white/[0.08]"
            : "bg-[#F3F3F3] ring-1 ring-black/[0.05]"
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={row.image} alt="" className="h-full w-full object-cover" />
      </span>
    );
  }

  const Icon =
    row.kind === "recent"
      ? Clock
      : row.kind === "trending"
        ? TrendingUp
        : row.kind === "brand"
          ? Tag
          : row.kind === "ai"
            ? Wand2
            : Search;

  return (
    <span className={shell}>
      <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
    </span>
  );
}

export { TitanSearch as MarketplaceSearch };

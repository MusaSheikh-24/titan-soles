"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MarketplacePaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

function pageWindow(current: number, total: number): (number | "…")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 3) {
    return [1, 2, 3, 4, 5, "…", total];
  }
  if (current >= total - 2) {
    return [1, "…", total - 4, total - 3, total - 2, total - 1, total];
  }
  return [1, "…", current - 1, current, current + 1, "…", total];
}

export function MarketplacePagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: MarketplacePaginationProps) {
  const start = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);
  const pages = pageWindow(page, totalPages);

  return (
    <div className="flex flex-col items-center gap-8 pt-4">
      <p className="text-[14px] font-normal text-[#6B7280]">
        Showing{" "}
        <span className="font-medium text-[#111111]">
          {start}–{end}
        </span>{" "}
        of{" "}
        <span className="font-medium text-[#111111]">
          {totalItems.toLocaleString()}
        </span>{" "}
        sneakers
      </p>

      <nav
        className="flex items-center gap-1.5"
        aria-label="Pagination"
      >
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.05] bg-white text-[#111111] transition-all duration-[250ms] hover:bg-black/[0.03] disabled:pointer-events-none disabled:opacity-30"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
        </button>

        {pages.map((p, i) =>
          p === "…" ? (
            <span
              key={`ellipsis-${i}`}
              className="flex h-10 w-10 items-center justify-center text-[14px] text-[#6B7280]"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              aria-current={p === page ? "page" : undefined}
              className={cn(
                "flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-[14px] font-medium transition-all duration-[250ms]",
                p === page
                  ? "bg-[#111111] text-white shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
                  : "border border-black/[0.05] bg-white text-[#111111] hover:bg-black/[0.03]"
              )}
            >
              {p}
            </button>
          )
        )}

        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.05] bg-white text-[#111111] transition-all duration-[250ms] hover:bg-black/[0.03] disabled:pointer-events-none disabled:opacity-30"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </nav>
    </div>
  );
}

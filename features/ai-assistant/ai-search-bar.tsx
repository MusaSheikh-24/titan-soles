"use client";

import { motion } from "motion/react";
import { TitanSearch } from "@/components/search/titan-search";
import { POPULAR_SEARCHES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface AISearchBarProps {
  onOpen: (query?: string) => void;
  className?: string;
}

/** Landing hero entry — shared TitanSearch DNA (dark variant) */
export function AISearchBar({ onOpen, className }: AISearchBarProps) {
  return (
    <TitanSearch
      variant="dark"
      onAskAI={onOpen}
      onSubmit={() => onOpen()}
      className={cn("max-w-none", className)}
    />
  );
}

export function PopularSearches({
  onSelect,
}: {
  onSelect: (term: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-slate-500">Trending:</span>
      {POPULAR_SEARCHES.map((term, i) => (
        <motion.button
          key={term}
          type="button"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + i * 0.03 }}
          onClick={() => onSelect(term)}
          className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-xs font-medium text-slate-300 transition-all duration-200 hover:border-primary/30 hover:bg-primary/10 hover:text-accent"
        >
          {term}
        </motion.button>
      ))}
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import type { Condition } from "./products-data";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBrands: string[];
  setSelectedBrands: (v: string[]) => void;
  selectedGenders: string[];
  setSelectedGenders: (v: string[]) => void;
  selectedCategories: string[];
  setSelectedCategories: (v: string[]) => void;
  selectedConditions: Condition[];
  setSelectedConditions: (v: Condition[]) => void;
  priceMax: number;
  setPriceMax: (v: number) => void;
  clearAllFilters: () => void;
  hasActiveFilters: boolean;
}

const BRANDS = [
  "Nike",
  "Adidas",
  "New Balance",
  "Vans",
  "Hoka",
  "Converse",
  "Asics",
  "Puma",
];
const GENDERS = ["Men", "Women", "Kids", "Unisex"];
const CATEGORIES = [
  "Running",
  "Lifestyle",
  "Basketball",
  "Casual",
  "Formal",
];
const CONDITIONS: Condition[] = [
  "NEW",
  "LIKE NEW",
  "OPEN BOX",
  "USED",
  "REFURBISHED",
];

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-[14px] font-medium transition-all duration-[250ms] ${
        active
          ? "bg-[#111111] text-white"
          : "border border-black/[0.05] bg-[#FAFAFA] text-[#6B7280] hover:text-[#111111]"
      }`}
    >
      {label}
    </button>
  );
}

function toggle<T extends string>(list: T[], item: T, set: (v: T[]) => void) {
  set(list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);
}

export function FilterDrawer({
  isOpen,
  onClose,
  selectedBrands,
  setSelectedBrands,
  selectedGenders,
  setSelectedGenders,
  selectedCategories,
  setSelectedCategories,
  selectedConditions,
  setSelectedConditions,
  priceMax,
  setPriceMax,
  clearAllFilters,
  hasActiveFilters,
}: FilterDrawerProps) {
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90]">
      <button
        type="button"
        className="absolute inset-0 bg-[#111111]/25 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close filters"
      />
      <aside
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-[0_0_80px_rgba(0,0,0,0.12)] animate-in slide-in-from-right duration-[250ms]"
        role="dialog"
        aria-modal="true"
        aria-label="All filters"
      >
        <div className="flex items-center justify-between px-8 py-6">
          <div>
            <h2 className="text-[20px] font-medium tracking-tight text-[#111111]">
              Filters
            </h2>
            <p className="mt-1 text-[14px] text-[#6B7280]">
              Brand, gender, category & more
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#6B7280] transition-all duration-[250ms] hover:bg-black/[0.04] hover:text-[#111111]"
            aria-label="Close"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 space-y-10 overflow-y-auto px-8 pb-8">
          <section>
            <h3 className="text-[14px] font-medium text-[#111111]">Brand</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {BRANDS.map((b) => (
                <Chip
                  key={b}
                  label={b}
                  active={selectedBrands.includes(b)}
                  onClick={() => toggle(selectedBrands, b, setSelectedBrands)}
                />
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-[14px] font-medium text-[#111111]">Gender</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {GENDERS.map((g) => (
                <Chip
                  key={g}
                  label={g}
                  active={selectedGenders.includes(g)}
                  onClick={() =>
                    toggle(selectedGenders, g, setSelectedGenders)
                  }
                />
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-[14px] font-medium text-[#111111]">Category</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <Chip
                  key={c}
                  label={c}
                  active={selectedCategories.includes(c)}
                  onClick={() =>
                    toggle(selectedCategories, c, setSelectedCategories)
                  }
                />
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-[14px] font-medium text-[#111111]">
              Condition
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {CONDITIONS.map((c) => (
                <Chip
                  key={c}
                  label={c}
                  active={selectedConditions.includes(c)}
                  onClick={() =>
                    toggle(selectedConditions, c, setSelectedConditions)
                  }
                />
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] font-medium text-[#111111]">Price</h3>
              <span className="text-[14px] text-[#6B7280]">Up to ${priceMax}</span>
            </div>
            <input
              type="range"
              min={50}
              max={500}
              step={10}
              value={priceMax}
              onChange={(e) => setPriceMax(parseInt(e.target.value, 10))}
              className="mt-5 w-full accent-[#111111]"
            />
          </section>
        </div>

        <div className="flex gap-3 border-t border-black/[0.05] px-8 py-5">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="h-14 flex-1 rounded-full text-[14px] font-medium text-[#6B7280] transition-all duration-[250ms] hover:bg-[#FAFAFA] hover:text-[#111111]"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="h-14 flex-[2] rounded-full bg-[#111111] text-[14px] font-medium text-white transition-all duration-[250ms] hover:bg-black"
          >
            Show results
          </button>
        </div>
      </aside>
    </div>
  );
}

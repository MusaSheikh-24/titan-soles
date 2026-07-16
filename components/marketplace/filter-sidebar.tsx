"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

interface FilterSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;
    selectedBrands: string[];
    setSelectedBrands: (brands: string[]) => void;
    priceRange: [number, number];
    setPriceRange: (range: [number, number]) => void;
    minRating: number;
    setMinRating: (rating: number) => void;
    clearAllFilters: () => void;
    hasActiveFilters: boolean;
}

const categories = ["Running", "Sneakers", "Casual", "Formal", "Sports", "Basketball", "Luxury", "Outdoor"];
const brands = ["Nike", "Adidas", "Reebok", "New Balance", "Puma", "Asics", "Cole Haan"];

export function FilterSidebar({
    isOpen,
    onClose,
    selectedCategories,
    setSelectedCategories,
    selectedBrands,
    setSelectedBrands,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    clearAllFilters,
    hasActiveFilters,
}: FilterSidebarProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const toggleCategory = (category: string) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const toggleBrand = (brand: string) => {
        if (selectedBrands.includes(brand)) {
            setSelectedBrands(selectedBrands.filter((b) => b !== brand));
        } else {
            setSelectedBrands([...selectedBrands, brand]);
        }
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-60 shrink-0">
                <div className="sticky top-28 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="h-full overflow-y-auto">
                        <div className="px-5 pt-5 pb-3 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                                {hasActiveFilters && (
                                    <button
                                        onClick={clearAllFilters}
                                        className="text-sm text-blue-600 font-medium hover:text-blue-700 underline underline-offset-2 cursor-pointer"
                                    >
                                        Clear all
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="px-5 py-5 space-y-6">
                            {/* Categories */}
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-3 text-sm">Category</h4>
                                <div className="space-y-3">
                                    {categories.map((category) => (
                                        <label key={category} className="flex items-center gap-3 cursor-pointer group min-h-11">
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(category)}
                                                onChange={() => toggleCategory(category)}
                                                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 shrink-0 cursor-pointer"
                                            />
                                            <span className="text-gray-700 group-hover:text-gray-900 transition text-sm leading-tight">
                                                {category}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-3 text-sm">Price Range</h4>
                                <div className="space-y-3">
                                    <input
                                        type="range"
                                        min="0"
                                        max="500"
                                        step="10"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                        className="w-full accent-blue-600 h-2 cursor-pointer"
                                    />
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">${priceRange[0]}</span>
                                        <span className="text-sm font-semibold text-gray-900">${priceRange[1]}+</span>
                                    </div>
                                </div>
                            </div>

                            {/* Brands */}
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-3 text-sm">Brand</h4>
                                <div className="space-y-3">
                                    {brands.map((brand) => (
                                        <label key={brand} className="flex items-center gap-3 cursor-pointer group min-h-11">
                                            <input
                                                type="checkbox"
                                                checked={selectedBrands.includes(brand)}
                                                onChange={() => toggleBrand(brand)}
                                                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 shrink-0 cursor-pointer"
                                            />
                                            <span className="text-gray-700 group-hover:text-gray-900 transition text-sm leading-tight">
                                                {brand}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Rating */}
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-3 text-sm">Minimum Rating</h4>
                                <div className="space-y-3">
                                    {[4, 3, 2, 1].map((rating) => (
                                        <label key={rating} className="flex items-center gap-3 cursor-pointer group min-h-11">
                                            <input
                                                type="radio"
                                                name="rating"
                                                checked={minRating === rating}
                                                onChange={() => setMinRating(rating)}
                                                className="w-5 h-5 border-gray-300 text-blue-600 focus:ring-blue-500 shrink-0 cursor-pointer"
                                            />
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg
                                                        key={i}
                                                        className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300 fill-current"}`}
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                                <span className="text-sm text-gray-500 ml-1">& Up</span>
                                            </div>
                                        </label>
                                    ))}
                                    <label className="flex items-center gap-3 cursor-pointer group min-h-11">
                                        <input
                                            type="radio"
                                            name="rating"
                                            checked={minRating === 0}
                                            onChange={() => setMinRating(0)}
                                            className="w-5 h-5 border-gray-300 text-blue-600 focus:ring-blue-500 shrink-0 cursor-pointer"
                                        />
                                        <span className="text-sm text-gray-700">All Ratings</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Sidebar - HIGHEST Z-INDEX */}
            <div
                className={`lg:hidden fixed inset-0 z-9999 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
            >
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

                {/* Sidebar Panel */}
                <div
                    className={`absolute right-0 top-0 bottom-0 w-full sm:w-80 bg-white shadow-2xl transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                >
                    {/* Mobile Header with Close Button */}
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between shadow-sm z-10">
                        <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                        <button
                            onClick={onClose}
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
                            aria-label="Close filters"
                        >
                            <X className="w-5 h-5" strokeWidth={2.5} />
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="overflow-y-auto h-[calc(100%-73px)] px-5 py-5 space-y-6">
                        {/* Categories */}
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-3 text-sm">Category</h4>
                            <div className="space-y-3">
                                {categories.map((category) => (
                                    <label key={category} className="flex items-center gap-3 cursor-pointer group min-h-11">
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(category)}
                                            onChange={() => toggleCategory(category)}
                                            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 shrink-0 cursor-pointer"
                                        />
                                        <span className="text-gray-700 group-hover:text-gray-900 transition text-sm leading-tight">
                                            {category}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-3 text-sm">Price Range</h4>
                            <div className="space-y-3">
                                <input
                                    type="range"
                                    min="0"
                                    max="500"
                                    step="10"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                    className="w-full accent-blue-600 h-2 cursor-pointer"
                                />
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">${priceRange[0]}</span>
                                    <span className="text-sm font-semibold text-gray-900">${priceRange[1]}+</span>
                                </div>
                            </div>
                        </div>

                        {/* Brands */}
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-3 text-sm">Brand</h4>
                            <div className="space-y-3">
                                {brands.map((brand) => (
                                    <label key={brand} className="flex items-center gap-3 cursor-pointer group min-h-11">
                                        <input
                                            type="checkbox"
                                            checked={selectedBrands.includes(brand)}
                                            onChange={() => toggleBrand(brand)}
                                            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 shrink-0 cursor-pointer"
                                        />
                                        <span className="text-gray-700 group-hover:text-gray-900 transition text-sm leading-tight">
                                            {brand}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Rating */}
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-3 text-sm">Minimum Rating</h4>
                            <div className="space-y-3">
                                {[4, 3, 2, 1].map((rating) => (
                                    <label key={rating} className="flex items-center gap-3 cursor-pointer group min-h-11">
                                        <input
                                            type="radio"
                                            name="rating"
                                            checked={minRating === rating}
                                            onChange={() => setMinRating(rating)}
                                            className="w-5 h-5 border-gray-300 text-blue-600 focus:ring-blue-500 shrink-0 cursor-pointer"
                                        />
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300 fill-current"}`}
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                            <span className="text-sm text-gray-500 ml-1">& Up</span>
                                        </div>
                                    </label>
                                ))}
                                <label className="flex items-center gap-3 cursor-pointer group min-h-11">
                                    <input
                                        type="radio"
                                        name="rating"
                                        checked={minRating === 0}
                                        onChange={() => setMinRating(0)}
                                        className="w-5 h-5 border-gray-300 text-blue-600 focus:ring-blue-500 shrink-0 cursor-pointer"
                                    />
                                    <span className="text-sm text-gray-700">All Ratings</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
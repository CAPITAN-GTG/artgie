'use client';

import { ArrowRight, ShoppingCart, SlidersHorizontal, X } from 'lucide-react';
import { products, categories, Product } from '../data/products';
import { useState } from 'react';

type SortOption = 'default' | 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';

export default function ProductsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [showFilters, setShowFilters] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Filter products
  let filteredProducts = products;
  
  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      selectedCategories.includes(product.category)
    );
  }

  if (inStockOnly) {
    filteredProducts = filteredProducts.filter(product => product.inStock);
  }

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setInStockOnly(false);
  };

  const activeFiltersCount = selectedCategories.length + (inStockOnly ? 1 : 0);

  return (
    <main className="min-h-screen pt-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        {/* Header */}
          <div className="mb-6">
          <h1 className="text-[28px] md:text-[36px] font-bold text-[#001f3f] dark:text-[#3498db] mb-2">
            All Signs
          </h1>
          <p className="text-[13px] text-gray-600 dark:text-gray-400">
            Custom signs in corroplast and metal - Single or double-sided
          </p>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-[#001f3f] dark:bg-[#2980b9] text-white rounded-lg text-[13px] font-medium hover:bg-[#003d7a] dark:hover:bg-[#3498db] transition-colors"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="bg-white text-[#001f3f] px-2 py-0.5 rounded-full text-[11px] font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-[220px] flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sticky top-24 transition-colors duration-300">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[15px] font-bold text-[#001f3f] dark:text-[#3498db]">Filters</h2>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-[11px] text-gray-600 dark:text-gray-400 hover:text-[#001f3f] dark:hover:text-[#3498db] underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Stock Filter */}
              <div className="mb-5 pb-5 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-[13px] font-semibold text-gray-900 dark:text-gray-100 mb-3">Availability</h3>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 accent-[#001f3f] cursor-pointer"
                  />
                  <span className="text-[12px] text-gray-700 dark:text-gray-300">In Stock Only</span>
                </label>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="text-[13px] font-semibold text-gray-900 dark:text-gray-100 mb-3">Categories</h3>
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {categories.filter(c => c !== 'All').map((category) => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="w-4 h-4 accent-[#001f3f] dark:accent-[#3498db] cursor-pointer"
                      />
                      <span className="text-[12px] text-gray-700 dark:text-gray-300">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile Filters Overlay */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setShowFilters(false)}>
              <div className="absolute left-0 top-0 bottom-0 w-[280px] bg-white dark:bg-gray-800 p-4 overflow-y-auto transition-colors duration-300" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[16px] font-bold text-[#001f3f] dark:text-[#3498db]">Filters</h2>
                  <button onClick={() => setShowFilters(false)} className="p-1">
                    <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>

                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="w-full mb-4 py-2 text-[12px] text-gray-600 dark:text-gray-400 hover:text-[#001f3f] dark:hover:text-[#3498db] underline"
                  >
                    Clear all filters
                  </button>
                )}

                {/* Stock Filter */}
                <div className="mb-5 pb-5 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-[14px] font-semibold text-gray-900 dark:text-gray-100 mb-3">Availability</h3>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="w-4 h-4 accent-[#001f3f] cursor-pointer"
                    />
                    <span className="text-[13px] text-gray-700 dark:text-gray-300">In Stock Only</span>
                  </label>
                </div>

                {/* Category Filter */}
                <div>
                  <h3 className="text-[14px] font-semibold text-gray-900 dark:text-gray-100 mb-3">Categories</h3>
                  <div className="space-y-2.5">
                    {categories.filter(c => c !== 'All').map((category) => (
                      <label key={category} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="w-4 h-4 accent-[#001f3f] dark:accent-[#3498db] cursor-pointer"
                        />
                        <span className="text-[13px] text-gray-700 dark:text-gray-300">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full mt-6 bg-[#001f3f] dark:bg-[#2980b9] text-white py-3 rounded-lg text-[14px] font-medium hover:bg-[#003d7a] dark:hover:bg-[#3498db] transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="flex items-center justify-between mb-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 transition-colors duration-300">
              <div className="text-[13px] text-gray-600 dark:text-gray-400">
                {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
              </div>
              <div className="flex items-center gap-2">
                <label className="text-[12px] text-gray-600 dark:text-gray-400 hidden sm:inline">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="text-[12px] border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-pointer hover:border-[#001f3f] dark:hover:border-[#3498db] focus:outline-none focus:border-[#001f3f] dark:focus:border-[#3498db] transition-colors"
                >
                  <option value="default">Default</option>
                  <option value="name-asc">Name: A-Z</option>
                  <option value="name-desc">Name: Z-A</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-[#001f3f] dark:hover:border-[#3498db] hover:shadow-md transition-all duration-300 group"
                >
                  {/* Product Image/Icon */}
                  <div className="bg-gray-100 dark:bg-gray-700 h-[120px] flex items-center justify-center text-[40px] group-hover:bg-[#001f3f]/5 dark:group-hover:bg-[#3498db]/10 transition-colors">
                    {product.image}
                  </div>

                  {/* Product Info */}
                  <div className="p-3">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-[13px] font-bold text-[#001f3f] dark:text-[#3498db] leading-tight line-clamp-2 flex-1">
                        {product.name}
                      </h3>
                      {!product.inStock && (
                        <span className="text-[9px] bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 px-1 py-[2px] rounded-full font-medium ml-1 whitespace-nowrap">
                          Out
                        </span>
                      )}
                    </div>
                    
                    <p className="text-[11px] text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="space-y-[2px] mb-2 text-[10px] text-gray-500 dark:text-gray-400">
                      <div className="flex justify-between">
                        <span>Size:</span>
                        <span className="font-medium text-gray-700 dark:text-gray-300">{product.size}"</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Material:</span>
                        <span className="font-medium text-gray-700 dark:text-gray-300">{product.material}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sides:</span>
                        <span className="font-medium text-gray-700 dark:text-gray-300">{product.sides}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                      <div className="text-[16px] font-bold text-[#001f3f] dark:text-[#3498db]">
                        ${product.price}
                      </div>
                      <button
                        disabled={!product.inStock}
                        className={`flex items-center gap-1 px-2 py-[6px] rounded-md text-[11px] font-medium transition-all duration-200 ${
                          product.inStock
                            ? 'bg-[#001f3f] dark:bg-[#2980b9] text-white hover:bg-[#003d7a] dark:hover:bg-[#3498db]'
                            : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart className="h-3 w-3" />
                        {product.inStock ? 'Add' : 'Out'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <p className="text-gray-500 dark:text-gray-400 text-[14px] mb-2">No products found</p>
                <button
                  onClick={clearFilters}
                  className="text-[13px] text-[#001f3f] dark:text-[#3498db] hover:underline font-medium"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}


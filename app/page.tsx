'use client';

import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { products } from './data/products';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="relative pt-20 pb-20 md:pb-28 px-4 overflow-hidden min-h-[70vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero.jpg" 
            alt="Custom Signs" 
            className="w-full h-full object-cover opacity-100 dark:opacity-100"
          />
          <div className="absolute dark:bg-black/85 inset-0"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center w-full">
          <h1 className="text-[40px] md:text-[60px] lg:text-[72px] font-bold text-[#001f3f] dark:text-[#3498db] mb-6 leading-tight">
            Custom Signs for Every Need
          </h1>
          <p className="text-[16px] md:text-[20px] text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Professional signage in corroplast and metal. Available in single or double-sided.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center bg-[#001f3f] dark:bg-[#2980b9] text-white px-8 py-4 rounded-lg hover:bg-[#003d7a] dark:hover:bg-[#3498db] transition-all duration-200 font-medium text-[16px] gap-2 group shadow-xl"
            >
              Shop Now
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center border-2 border-[#001f3f] dark:border-[#3498db] text-[#001f3f] dark:text-[#3498db] px-8 py-4 rounded-lg hover:bg-[#001f3f] hover:text-white dark:hover:bg-[#3498db] dark:hover:text-white transition-all duration-200 font-medium text-[16px] gap-2 group"
            >
              View Catalog
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section id="shop" className="py-12 md:py-16 px-4 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-[28px] md:text-[36px] font-bold text-[#001f3f] dark:text-[#3498db] mb-1">
                Featured Signs
              </h2>
              <p className="text-[13px] md:text-[14px] text-gray-600 dark:text-gray-400">
                Explore our sign collection - Corroplast & Metal
              </p>
            </div>
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center gap-2 text-[13px] text-[#001f3f] dark:text-[#3498db] hover:text-[#003d7a] dark:hover:text-[#60a5fa] font-medium transition-colors"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Carousel Container */}
          <div className="relative group">
            {/* Left Arrow */}
            {canScrollLeft && (
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/95 dark:bg-gray-800/95 hover:bg-white dark:hover:bg-gray-800 shadow-lg rounded-full p-2 transition-all opacity-0 group-hover:opacity-100"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5 text-[#001f3f] dark:text-[#3498db]" />
              </button>
            )}

            {/* Right Arrow */}
            {canScrollRight && (
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/95 dark:bg-gray-800/95 hover:bg-white dark:hover:bg-gray-800 shadow-lg rounded-full p-2 transition-all opacity-0 group-hover:opacity-100"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5 text-[#001f3f] dark:text-[#3498db]" />
              </button>
            )}

            {/* Scrollable Products */}
            <div
              ref={scrollContainerRef}
              className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-[160px] sm:w-[180px] bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden hover:border-[#001f3f] dark:hover:border-[#3498db] hover:shadow-md transition-all duration-300 group/card"
                >
                  {/* Product Image/Icon */}
                  <div className="bg-gray-100 dark:bg-gray-600 h-[120px] flex items-center justify-center text-[40px] group-hover/card:bg-[#001f3f]/5 dark:group-hover/card:bg-[#3498db]/10 transition-colors">
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

                    <div className="text-[16px] font-bold text-[#001f3f] dark:text-[#3498db] mb-2">
                      ${product.price}
                    </div>

                    <button
                      disabled={!product.inStock}
                      className={`w-full py-[6px] rounded-md text-[11px] font-medium transition-all duration-200 ${
                        product.inStock
                          ? 'bg-[#001f3f] dark:bg-[#2980b9] text-white hover:bg-[#003d7a] dark:hover:bg-[#3498db]'
                          : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* View All Button - Mobile */}
          <div className="mt-6 sm:hidden text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-[13px] text-[#001f3f] dark:text-[#3498db] hover:text-[#003d7a] dark:hover:text-[#60a5fa] font-medium transition-colors"
            >
              View All Signs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section with Hero Background */}
      <section className="relative py-16 md:py-24 px-4 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero.jpg" 
            alt="Quality Signs" 
            className="w-full h-full object-cover opacity-25 dark:opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/95 to-gray-100/90 dark:from-gray-900/90 dark:via-gray-900/95 dark:to-gray-950/90"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[32px] md:text-[44px] font-bold text-[#001f3f] dark:text-[#3498db] mb-4">
              Why Choose Artgie?
            </h2>
            <p className="text-[15px] md:text-[17px] text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We deliver quality custom signs that make your business stand out
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
              <div className="text-[40px] mb-4">✨</div>
              <h3 className="text-[18px] font-bold text-[#001f3f] dark:text-[#3498db] mb-2">
                Premium Quality
              </h3>
              <p className="text-[13px] text-gray-600 dark:text-gray-300">
                High-grade corroplast and metal materials for long-lasting durability
              </p>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
              <div className="text-[40px] mb-4">⚡</div>
              <h3 className="text-[18px] font-bold text-[#001f3f] dark:text-[#3498db] mb-2">
                Fast Production
              </h3>
              <p className="text-[13px] text-gray-600 dark:text-gray-300">
                Quick turnaround times without compromising on quality
              </p>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
              <div className="text-[40px] mb-4">💰</div>
              <h3 className="text-[18px] font-bold text-[#001f3f] dark:text-[#3498db] mb-2">
                Best Value
              </h3>
              <p className="text-[13px] text-gray-600 dark:text-gray-300">
                Competitive pricing on all custom signs - single or double-sided
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center bg-[#001f3f] dark:bg-[#2980b9] text-white px-8 py-4 rounded-lg hover:bg-[#003d7a] dark:hover:bg-[#3498db] transition-all duration-200 font-medium text-[15px] gap-2 group shadow-lg"
            >
              Explore All Products
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

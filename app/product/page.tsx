"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductList from "@/components/ProductList";
import Filter from "@/components/Filter";
import Image from "next/image";
import Logo from "@/public/logo.png";
import SearchComponent from "@/components/SearchComponent";
import { dummyProducts } from "@/lib/dummyData";
import { FilterState, ProductData } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

const ProductPage = () => {
  const searchParams = useSearchParams();
  const [filterState, setFilterState] = useState<FilterState>({
    brand: [],
    priceRange: [],
    rating: [],
  });
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleFilterChange = (
    filter: keyof FilterState,
    value: string | number,
  ) => {
    setFilterState((prevState) => ({
      ...prevState,
      [filter]: prevState[filter].includes(value)
        ? prevState[filter].filter((v) => v !== value)
        : [...prevState[filter], value],
    }));
  };

  const filteredProducts = dummyProducts.filter((product: ProductData) => {
    // Filter based on search query
    const searchQuery = searchParams.get("q") || "";
    if (
      searchQuery.trim() &&
      !product.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter based on brand query
    const brandFilter = searchParams.get("brand") || "";
    if (brandFilter && product.brand !== brandFilter) {
      return false;
    }

    // Filter based on brand
    if (
      filterState.brand.length > 0 &&
      !filterState.brand.includes(product.brand)
    ) {
      return false;
    }

    // Filter based on price range
    if (
      filterState.priceRange.length > 0 &&
      !filterState.priceRange.some((range) => {
        if (range === 500) {
          return product.discountedPrice < 500;
        } else if (range === 2500) {
          return product.discountedPrice >= 2000;
        } else {
          return (
            product.discountedPrice >= range - 500 &&
            product.discountedPrice < range + 500
          );
        }
      })
    ) {
      return false;
    }

    // Filter based on rating
    if (
      filterState.rating.length > 0 &&
      !filterState.rating.some(
        (rating) =>
          product.rating >= rating - 0.5 && product.rating < rating + 0.5,
      )
    ) {
      return false;
    }

    return true;
  });

  // Simulate loading data after 2 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-background bg-cover bg-center relative min-h-screen">
      <div className="container mx-auto px-4">
        {/* Logo */}
        <div className="relative z-20">
          <Image
            src={Logo}
            alt="logo"
            width={86}
            height={45}
            className="absolute top-4 right-4 sm:top-8 sm:right-8"
          />
        </div>
        {/* Search Component */}
        <div className="py-10">
          {isLoading ? (
            <Skeleton className="h-10 w-full max-w-md" />
          ) : (
            <SearchComponent />
          )}
        </div>
        {/* Filter and Product List Container */}
        <div className="bg-white rounded-md p-4 z-10">
          <h1 className="text-xl md:text-3xl p-4">Search Results</h1>
          {isLoading ? (
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-64">
                <Skeleton className="h-64 w-full" />
              </div>
              <div className="flex-1">{/* No Skeleton for ProductList */}</div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-64">
                {/* For larger screens, always show the Filter component */}
                <div className="hidden md:block">
                  <Filter
                    filterState={filterState}
                    onFilterChange={handleFilterChange}
                  />
                </div>

                {/* For smaller screens, show a button to toggle the Filter component */}
                <div className="md:hidden">
                  <button
                    className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded w-full"
                    onClick={() => setIsFilterVisible(!isFilterVisible)}
                  >
                    {isFilterVisible ? "Hide Filters" : "Show Filters"}
                  </button>
                  {isFilterVisible && (
                    <Filter
                      filterState={filterState}
                      onFilterChange={handleFilterChange}
                    />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <ProductList products={filteredProducts} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

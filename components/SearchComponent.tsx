"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { dummyProducts } from "@/lib/dummyData";
import { ProductData } from "@/types";

interface TrendItem {
  id: number;
  image: string;
  name: string;
  link: string;
}

interface SuggestionItem {
  id: number;
  name: string;
  link: string;
}

const getTrendItems = () => {
  const trendItems = dummyProducts
    .filter((product) => product.rating >= 4.5)
    .map((product) => ({
      id: product.id,
      image: product.image,
      name: product.name,
      link: `/product/${product.id}`,
    }));

  return trendItems;
};

const getSuggestionItems = () => {
  const brandCounts = dummyProducts.reduce(
    (counts: { [key: string]: number }, product: ProductData) => {
      counts[product.brand] = (counts[product.brand] || 0) + 1;
      return counts;
    },
    {},
  );

  const popularBrands = Object.entries(brandCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([brand]) => brand);

  const suggestionItems = popularBrands.map((brand, index) => ({
    id: index + 1,
    name: `${brand} products`,
    link: `/product?brand=${encodeURIComponent(brand)}`,
  }));

  return suggestionItems;
};

const trends = getTrendItems();
const suggestions = getSuggestionItems();

const SearchComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const commandListRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (
        commandListRef.current &&
        !commandListRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const searchQuery = encodeURIComponent(searchTerm.trim());
      router.push(`/product?q=${searchQuery}`);
    }
  };

const handleLinkClick = (e:any, link) => {
  e.preventDefault(); // Prevent the default link behavior
  router.push(link); // Navigate to the link
  setIsOpen(false); // Close the ComponentList
};



  return (
    <div className="w-full relative">
      <Command className="bg-transparent w-full md:w-1/2 mx-auto">
        <div className="bg-white rounded-md p-1 w-full max-w-3xl z-50">
          <CommandInput
            //@ts-ignore
            ref={inputRef}
            placeholder="Search for products..."
            value={searchTerm}
            onValueChange={setSearchTerm}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            onClick={() => setIsOpen(true)}
            className="w-full"
          />
        </div>
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex flex-col items-center pt-20">
            <CommandList
              ref={commandListRef}
              className="bg-white rounded-md p-4 z-50 w-full max-w-3xl mt-4"
            >
              <CommandGroup heading="Latest Trends">
  {trends && (
    <div className="flex flex-row space-x-1 overflow-x-auto">
      {trends.map((trend) => (
        <div
          key={trend.id}
          onClick={(event) => handleLinkClick(e, trend.link)}
          className="hover:bg-gray-200 transition-colors duration-200"
        >
          <CommandItem value={trend.name}>
            <div className="flex flex-col items-center gap-1 justify-center">
              <div className="w-[127px] h-[190px]">
                <Image
                  src={trend.image}
                  alt={trend.name}
                  width={127}
                  height={190}
                />
              </div>
              <div className="text-[10px]">{trend.name}</div>
            </div>
          </CommandItem>
        </div>
      ))}
    </div>
  )}
</CommandGroup>
<CommandGroup heading="Popular Suggestions">
  {suggestions &&
    suggestions.map((suggestion) => (
      <div
        key={suggestion.id}
        onClick={(event) => handleLinkClick(e, suggestion.link)}
        className="hover:bg-gray-200 transition-colors duration-200"
      >
        <CommandItem value={suggestion.name} className="text-[12px]">
          {suggestion.name}
        </CommandItem>
      </div>
    ))}
</CommandGroup>
              <CommandEmpty>No results found.</CommandEmpty>
            </CommandList>
          </div>
        )}
      </Command>
    </div>
  );
};

export default SearchComponent;

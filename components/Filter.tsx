import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FilterState } from "@/types";

const brands = ["Brand A", "Brand B", "Brand C", "Brand D", "Brand E"];
const ratings = [
  { value: 5 },
  { value: 4 },
  { value: 3 },
  { value: 2 },
  { value: 1 },
];
const priceRanges = [
  { label: "Under Rs. 500", value: 500 },
  { label: "Rs. 500 - Rs. 1,000", value: 1000 },
  { label: "Rs. 1,000 - Rs. 1,500", value: 1500 },
  { label: "Rs. 1,500 - Rs. 2,000", value: 2000 },
  { label: "Above Rs. 2,000", value: 2500 },
];

interface FilterProps {
  filterState: FilterState;
  onFilterChange: (filter: keyof FilterState, value: string | number) => void;
}

const Filter: React.FC<FilterProps> = ({ filterState, onFilterChange }) => {
  const handleBrandChange = (brand: string) => {
    onFilterChange("brand", brand);
  };

  const handlePriceRangeChange = (range: number) => {
    onFilterChange("priceRange", range);
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange("rating", rating);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="brands">
            <AccordionTrigger>Brands</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2 mt-2">
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={filterState.brand.includes(brand)}
                      onCheckedChange={() => handleBrandChange(brand)}
                    />
                    <Label htmlFor={`brand-${brand}`} className="ml-2">
                      {brand}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="priceRange">
            <AccordionTrigger>Price Range</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2 mt-2">
                {priceRanges.map(({ label, value }) => (
                  <div key={value} className="flex items-center">
                    <Checkbox
                      id={`price-${value}`}
                      checked={filterState.priceRange.includes(value)}
                      onCheckedChange={() => handlePriceRangeChange(value)}
                    />
                    <Label htmlFor={`price-${value}`} className="ml-2">
                      {label}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="rating">
            <AccordionTrigger>Rating</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2 mt-2">
                {ratings.map(({ value }) => (
                  <div key={value} className="flex items-center">
                    <Checkbox
                      id={`rating-${value}`}
                      checked={filterState.rating.includes(value)}
                      onCheckedChange={() => handleRatingChange(value)}
                    />
                    <Label htmlFor={`rating-${value}`} className="ml-2">
                      {Array.from({ length: value }, (_, i) => (
                        <span key={i} className="text-yellow-400">
                          &#9733;
                        </span>
                      ))}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter>
        <Separator />
      </CardFooter>
    </Card>
  );
};

export default Filter;

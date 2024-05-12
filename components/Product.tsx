"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ProductData } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

const Product: React.FC<ProductData> = ({
  id,
  name,
  brand,
  price,
  discountedPrice,
  rating,
  numRatings,
  image,
  isInWishlist = false,
}) => {
  const [inWishlist, setInWishlist] = useState<boolean>(isInWishlist);
  const [showViewButton, setShowViewButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleWishlistToggle = () => {
    setInWishlist((prevState) => !prevState);
  };

  // Simulate loading data after 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Card className="w-52 mx-auto md:w-52">
        <Skeleton className="h-72" />
        <div className="p-4">
          <Skeleton className="h-4 w-1/2 mb-2" />
          <Skeleton className="h-4 w-1/3 mb-2" />
          <Skeleton className="h-4 w-1/4 mb-2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </Card>
    );
  }

  return (
    <Card
      className="w-52 mx-auto md:w-52"
      onMouseEnter={() => setShowViewButton(true)}
      onMouseLeave={() => setShowViewButton(false)}
    >
      <div className="relative h-72">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded-t-md"
        />
        <button
          className={cn(
            "absolute top-2 right-2 p-2 rounded-full transition-colors duration-300",
            {
              "bg-red-600 text-white": inWishlist,
              "bg-gray-200 text-gray-600 hover:bg-gray-300": !inWishlist,
            },
          )}
          onClick={handleWishlistToggle}
        >
          <Heart className="w-5 h-5 fill-current" />
        </button>
        {showViewButton && (
          <Link
            href={`/product/${id}`}
            className="absolute bottom-0 left-0 right-0 bg-blue-500 text-white text-center py-2"
          >
            View Product
          </Link>
        )}
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{brand}</p>
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500 line-through">Rs. {price}</p>
          <p className="text-sm font-semibold text-blue-500">Rs. {discountedPrice}</p>
        </div>
        <div className="flex items-center">
          {Array.from({ length: Math.floor(rating) }, (_, i) => (
            <span key={i} className="text-yellow-400">
              &#9733;
            </span>
          ))}
          {rating % 1 !== 0 && <span className="text-yellow-400">&#9734;</span>}
          <span className="ml-2 text-gray-500">({numRatings})</span>
        </div>
      </div>
    </Card>
  );
};

export default Product;

export interface ProductData {
  id: number;
  name: string;
  brand: string;
  price: number;
  discountedPrice: number;
  rating: number;
  numRatings: number;
  image: string;
  isInWishlist: boolean;
}

export interface FilterState {
  brand: string[];
  priceRange: number[];
  rating: number[];
}

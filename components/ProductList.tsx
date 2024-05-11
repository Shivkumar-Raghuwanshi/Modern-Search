import React from "react";
import Product from "@/components/Product";
import { ProductData } from "@/types";

interface ProductListProps {
  products: ProductData[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <Product
          key={product.id}
          id={product.id}
          name={product.name}
          brand={product.brand}
          price={product.price}
          discountedPrice={product.discountedPrice}
          rating={product.rating}
          numRatings={product.numRatings}
          image={product.image}
          isInWishlist={product.isInWishlist}
        />
      ))}
    </div>
  );
};

export default ProductList;

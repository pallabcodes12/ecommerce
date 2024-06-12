"use client";

import React from "react";
import { type Product } from "@/lib/schemas/productSchema";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProductCard: React.FC<{ item: Product }> = ({ item }) => {
  const [productItem, setProductItem] = React.useState(item);

  const router = useRouter();

  const handleClick = () => {
    router.push(`/products/${item.id}`);
  };

  return (
    <div onClick={handleClick}>
      {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
      <Image
        src={item?.thumbnail}
        alt="product-image"
        width={1000}
        height={1000}
        className="cursor-pointer"
      />
      <ul>
        {/* {item.variants.map((variant: any) => {
          return <li key={variant.id}>{variant.price}</li>;
        })} */}
      </ul>
    </div>
  );
};

export default ProductCard;

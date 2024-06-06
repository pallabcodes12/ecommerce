"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Button = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/products");
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg"
      onClick={handleClick}
    >
      Shop Now
    </button>
  );
};

export default Button;

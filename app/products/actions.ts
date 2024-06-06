"use server";

import { getProduct, getProducts } from "@/utils/getProducts";

export async function fetchProducts(cache: RequestCache = "no-cache") {
  return await getProducts(cache);
}

export async function fetchProduct(cache: RequestCache = "no-cache", slug: string | number) {
  return await getProduct(cache, slug);
}

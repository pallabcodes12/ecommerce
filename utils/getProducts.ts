export async function getProducts(cache: RequestCache = "no-cache") {
  try {
    const res = await fetch("https://dummyjson.com/products?limit=5", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: cache,
    });

    const response = await res.json();

    response.products = response.products.map((item: any) => {
      item.variants = Array.from({ length: 3 }).map((_, i) => ({
        id: `${item.id}-variant-${i}`,
        price: (item.price * 5 * (i + 1)).toFixed(2),
      }));
      return item;
    });

    return response;
  } catch (error: unknown) {
    throw error;
  }
}

export async function getProduct(
  cache: RequestCache = "no-cache",
  slug: string | number
) {
  if (isNaN(Number(slug))) {
    throw new Error("An error occurred while fetching the product");
  }

  try {
    const res = await fetch(`https://dummyjson.com/products/${Number(slug)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: cache,
    });

    const product = await res.json();

    return product;
  } catch (error: unknown) {
    throw error;
  }
}

import ProductList from "@/components/product-list";

export default async function Products() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ProductList />
    </main>
  );
}

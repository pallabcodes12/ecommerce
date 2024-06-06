import ProductDetail from "@/components/product-detail";

export default async function Product() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ProductDetail />
    </main>
  );
}

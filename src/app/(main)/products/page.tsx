import ProductGrid from "@/components/product-grid";
import { products } from "@/lib/products";

export default function ProductsPage() {
  const allProducts = products;

  return (
    <div className="container py-8">
      <section className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          All Our Products
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Browse our full selection of high-quality meats.
        </p>
      </section>

      <section className="my-8">
        <ProductGrid products={allProducts} />
      </section>
    </div>
  );
}

import AiMeatSearch from "@/components/ai-meat-search";
import ProductGrid from "@/components/product-grid";
import { products } from "@/lib/products";

export default function DashboardPage() {
  // In a real app, you would fetch products from your database.
  const allProducts = products;

  return (
    <div className="container py-8">
      <section className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          Discover Our Finest Cuts
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Use our AI assistant to find exactly what you're looking for, or browse our selection below.
        </p>
      </section>

      <section className="my-8">
        <AiMeatSearch />
      </section>

      <section>
        <h2 className="font-headline text-3xl font-bold mb-6">Our Products</h2>
        <ProductGrid products={allProducts} />
      </section>
    </div>
  );
}

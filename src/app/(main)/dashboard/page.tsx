'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Product } from '@/lib/types';
import AiMeatSearch from "@/components/ai-meat-search";
import ProductGrid from "@/components/product-grid";
import { Loader2 } from 'lucide-react';
import { products as sampleProducts } from '@/lib/products';

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const productsCollection = collection(db, 'products');
        const productsQuery = query(productsCollection, orderBy('createdAt', 'desc'));
        const productsSnapshot = await getDocs(productsQuery);
        let fetchedProducts = productsSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            description: data.description,
            price: data.price,
            imageId: data.imageId,
          };
        });

        if (fetchedProducts.length === 0) {
          fetchedProducts = sampleProducts;
        }

        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts(sampleProducts);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

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
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <p className="text-center py-16 text-muted-foreground">
            No products available at the moment.
          </p>
        )}
      </section>
    </div>
  );
}

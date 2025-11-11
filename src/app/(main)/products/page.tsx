
'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Product } from '@/lib/types';
import ProductGrid from "@/components/product-grid";
import { Loader2 } from 'lucide-react';
import { products as sampleProducts } from '@/lib/products';

export default function ProductsPage() {
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
            imageUrl: data.imageUrl,
          };
        });
        
        if (fetchedProducts.length === 0) {
          setProducts(sampleProducts);
        } else {
          setProducts(fetchedProducts);
        }

      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts(sampleProducts); // Fallback to sample products on error
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
          All Our Products
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Browse our full selection of high-quality meats.
        </p>
      </section>

      <section className="my-8">
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

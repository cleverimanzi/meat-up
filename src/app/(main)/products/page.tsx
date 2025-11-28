'use client';

import { useEffect, useState, useMemo } from 'react';
import type { Product } from '@/lib/types';
import ProductGrid from "@/components/product-grid";
import { Loader2 } from 'lucide-react';
import { products as sampleProducts } from '@/lib/products';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'createdAt-desc';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [sortOption, setSortOption] = useState<SortOption>('createdAt-desc');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = useMemo(() => {
    const allCategories = products.map(p => p.category);
    return ['all', ...Array.from(new Set(allCategories))];
  }, [products]);
  
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const productsCollection = collection(db, 'products');
        const productsQuery = query(productsCollection, orderBy('createdAt', 'desc'));
        const productsSnapshot = await getDocs(productsQuery);
        let fetchedProducts: Product[] = productsSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            description: data.description,
            price: data.price,
            imageUrl: data.imageUrl,
            category: data.category || 'other',
            createdAt: data.createdAt?.toDate() || new Date(),
          };
        });

        const combinedProducts = [...fetchedProducts, ...sampleProducts.filter(sp => !fetchedProducts.some(fp => fp.id === sp.id))];
        setProducts(combinedProducts);

      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts(sampleProducts);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let processableProducts = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      processableProducts = processableProducts.filter(p => p.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      processableProducts = processableProducts.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    switch (sortOption) {
      case 'price-asc':
        processableProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        processableProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        processableProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case 'name-desc':
        processableProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'createdAt-desc':
         processableProducts.sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
        break;
    }

    return processableProducts;
  }, [products, sortOption, selectedCategory, searchTerm]);

  return (
    <div className="container py-8">
      <section className="text-center mb-8">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          All Our Products
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Browse our full selection of high-quality, fresh meats.
        </p>
      </section>

      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center p-4 rounded-lg border bg-card">
         <Input 
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
        <div className="flex flex-wrap items-center gap-4">
           <Select onValueChange={(value) => setSelectedCategory(value)} value={selectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select onValueChange={(value: SortOption) => setSortOption(value)} value={sortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt-desc">Newest</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A-Z</SelectItem>
              <SelectItem value="name-desc">Name: Z-A</SelectItem>
            </SelectContent>
          </Select>

        </div>
      </div>

      <section>
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredAndSortedProducts.length > 0 ? (
          <ProductGrid products={filteredAndSortedProducts} />
        ) : (
          <p className="text-center py-16 text-muted-foreground">
            No products match your criteria.
          </p>
        )}
      </section>
    </div>
  );
}

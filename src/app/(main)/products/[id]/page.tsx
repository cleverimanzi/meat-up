'use client';

import { useParams } from 'next/navigation';
import { products } from '@/lib/products';
import { Product } from '@/lib/types';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Loader2, ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params;
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      setLoading(true);
      try {
        // First, try fetching from Firestore
        const docRef = doc(db, 'products', id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
           setProduct({
            id: docSnap.id,
            name: data.name,
            description: data.description,
            price: data.price,
            imageUrl: data.imageUrl,
          });
        } else {
          // Fallback to local products if not in Firestore
          const foundProduct = products.find((p) => p.id === id);
          if (foundProduct) {
            setProduct(foundProduct);
          }
        }
      } catch (error) {
         console.error("Error fetching product:", error);
         // Fallback to local products on error
         const foundProduct = products.find((p) => p.id === id);
         if (foundProduct) {
            setProduct(foundProduct);
         }
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast({
        title: 'Added to Cart',
        description: `${product.name} has been added to your cart.`,
      });
    }
  };

  if (loading) {
    return (
      <div className="container py-12 flex justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="text-muted-foreground">Sorry, we couldn't find the product you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <Card>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative aspect-square w-full rounded-t-lg md:rounded-l-lg md:rounded-t-none overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-8">
            <CardHeader className="p-0">
              <CardTitle className="font-headline text-4xl mb-2">{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <CardDescription className="text-lg">
                {product.description}
              </CardDescription>
              <p className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</p>
              <Button onClick={handleAddToCart} size="lg">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}

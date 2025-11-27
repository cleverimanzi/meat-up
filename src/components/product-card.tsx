'use client';

import Image from 'next/image';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import type { Product } from '@/lib/types';
import { ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/use-cart';
import Link from 'next/link';

export default function ProductCard({ product }: { product: Product }) {
  const { toast } = useToast();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: 'Added to Cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link href={`/products/${product.id}`}>
        <CardHeader className="p-0">
          <div className="relative aspect-video w-full overflow-hidden">
            {product.imageUrl && (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <CardTitle className="font-headline text-xl leading-tight group-hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        </CardContent>
      </Link>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <p className="text-xl font-bold text-primary">
          ${product.price.toFixed(2)}
        </p>
        <Button onClick={handleAddToCart} size="sm">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

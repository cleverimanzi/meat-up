'use client';

import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-3xl">
            <ShoppingCart /> Your Shopping Cart
          </CardTitle>
        </CardHeader>
        <CardContent>
          {cartItems.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p>Your cart is currently empty.</p>
              <Button asChild className="mt-4">
                <Link href="/dashboard">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map(item => {
                return (
                  <div key={item.id} className="flex items-center justify-between gap-4 border-b pb-4">
                    <div className="flex items-center gap-4">
                       <div className="relative h-16 w-16 rounded-md overflow-hidden">
                        {item.imageUrl && <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />}
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                        className="w-20 text-center"
                      />
                      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} aria-label="Remove item">
                        <Trash2 className="h-5 w-5 text-destructive" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
        {cartItems.length > 0 && (
          <CardFooter className="flex flex-col items-stretch gap-4">
             <div className="flex justify-between items-center font-bold text-xl">
              <span>Subtotal:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={clearCart}>Clear Cart</Button>
                <Button>Proceed to Checkout</Button>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Shipping and taxes calculated at checkout.
            </p>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

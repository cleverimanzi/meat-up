'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader2, Smartphone } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/hooks/use-auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Image from 'next/image';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  address: z.string().min(5, { message: 'Address must be at least 5 characters.' }),
  city: z.string().min(2, { message: 'City must be at least 2 characters.' }),
  zip: z.string().min(5, { message: 'ZIP code must be at least 5 characters.' }),
  phone: z.string().regex(/^(078|079|072|073)\d{7}$/, { message: 'Please enter a valid Rwandan phone number.' }),
});

export default function CheckoutPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
      city: '',
      zip: '',
      phone: '',
    },
  });
  
  if (cartItems.length === 0) {
    router.replace('/dashboard');
    return null;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    if (!user) {
      toast({ variant: 'destructive', title: 'Authentication Error', description: 'You must be logged in to place an order.' });
      setIsLoading(false);
      return;
    }

    try {
      // Simulate sending payment request
      toast({
        title: 'Payment Request Sent',
        description: 'Please check your phone to approve the transaction.',
      });

      const orderData = {
        customerName: values.name,
        customerEmail: user.email,
        customerAddress: `${values.address}, ${values.city}, ${values.zip}`,
        paymentPhone: values.phone,
        items: cartItems.map(item => ({ id: item.id, name: item.name, quantity: item.quantity, price: item.price })),
        amount: cartTotal,
        date: serverTimestamp(),
        status: 'pending_payment',
      };

      // We add the order to the database with a "pending" status
      const docRef = await addDoc(collection(db, 'orders'), orderData);
      
      // We can clear the cart and redirect assuming the user will approve.
      // In a real app, you'd wait for a webhook confirmation.
      clearCart();
      router.push(`/order-success?orderId=${docRef.id}`);

    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Order Failed',
        description: error.message || 'There was a problem placing your order.',
      });
      setIsLoading(false);
    }
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Shipping & Payment</CardTitle>
              <CardDescription>Enter your details to complete the purchase.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <h3 className="font-bold text-lg mb-2">Shipping Information</h3>
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem><FormLabel>Address</FormLabel><FormControl><Input placeholder="123 Main St" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                   <div className="grid grid-cols-2 gap-4">
                      <FormField control={form.control} name="city" render={({ field }) => (
                        <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="Anytown" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="zip" render={({ field }) => (
                        <FormItem><FormLabel>ZIP Code</FormLabel><FormControl><Input placeholder="12345" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                  </div>
                  
                  <h3 className="font-bold text-lg pt-4 mb-2 flex items-center gap-2"><Smartphone /> Mobile Money Payment</h3>
                   <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Phone Number</FormLabel>
                      <FormControl><Input placeholder="078..." {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <p className="text-xs text-muted-foreground">
                    A payment request for **${cartTotal.toFixed(2)} RWF** will be sent to this number. The payment will be made to merchant number **0780104812**.
                  </p>

                  <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin" /> : `Pay $${cartTotal.toFixed(2)}`}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="relative h-12 w-12 rounded-md overflow-hidden">
                              <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                          </div>
                          <div>
                              <p className="font-semibold">{item.name}</p>
                              <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                ))}
                <div className="border-t pt-4 mt-4 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

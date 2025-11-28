'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Product } from '@/lib/types';

const formSchema = z.object({
  name: z.string().min(3, { message: 'Product name must be at least 3 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  price: z.coerce.number().positive({ message: 'Price must be a positive number.' }),
  imageUrl: z.string().url({ message: 'Please enter a valid image URL.' }),
});

export default function EditProductPage() {
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      imageUrl: '',
    },
  });

  useEffect(() => {
    if (!id) return;
    
    async function fetchProduct() {
      setIsFetching(true);
      try {
        const docRef = doc(db, 'products', id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const productData = docSnap.data() as Product;
          form.reset(productData);
        } else {
          toast({ variant: 'destructive', title: 'Error', description: 'Product not found.' });
          router.push('/admin/manage-products');
        }
      } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to fetch product data.' });
      } finally {
        setIsFetching(false);
      }
    }

    fetchProduct();
  }, [id, form, router, toast]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const docRef = doc(db, 'products', id as string);
      await updateDoc(docRef, values);

      toast({
        title: 'Product Updated',
        description: `${values.name} has been successfully updated.`,
      });
      router.push('/admin/manage-products');
    } catch (error: any) {
      console.error("Error updating product: ", error);
      toast({
        variant: 'destructive',
        title: 'Failed to Update Product',
        description: error.message || 'Please check permissions or try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (isFetching) {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </div>
    )
  }

  return (
    <div className="container py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Edit Product</CardTitle>
          <CardDescription>
            Update the form below to edit the product details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Prime Ribeye Steak" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the product in detail..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price ($)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="25.99" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/image.jpg" {...field} />
                      </FormControl>
                       <FormDescription>
                        Enter the full web address for the product image.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-2">
                 <Button type="button" variant="outline" onClick={() => router.push('/admin/manage-products')}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin" /> : 'Save Changes'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

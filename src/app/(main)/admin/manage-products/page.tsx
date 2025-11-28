'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Product } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button, buttonVariants } from '@/components/ui/button';
import { Loader2, Trash2, Edit } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ManageProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [productToDelete, setProductToDelete] = useState<{id: string, name: string} | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const productsCollection = collection(db, 'products');
      const productsQuery = query(productsCollection, orderBy('createdAt', 'desc'));
      const productsSnapshot = await getDocs(productsQuery);
      const fetchedProducts = productsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          description: data.description,
          price: data.price,
          imageUrl: data.imageUrl,
        };
      });
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
       toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not fetch products.',
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteClick = (product: {id: string, name: string}) => {
    setProductToDelete(product);
    setIsAlertOpen(true);
  };
  
  const confirmDelete = async () => {
    if (!productToDelete) return;

    try {
      await deleteDoc(doc(db, 'products', productToDelete.id));
      toast({
        title: 'Product Deleted',
        description: `${productToDelete.name} has been successfully removed.`,
      });
      fetchProducts(); // Refresh the list after deletion
    } catch (error) {
       toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not delete product. Please try again.',
      });
    } finally {
      setIsAlertOpen(false);
      setProductToDelete(null);
    }
  };

  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Manage Products</CardTitle>
          <CardDescription>View, edit, or delete your products.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
             <div className="flex justify-center items-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : products.length > 0 ? (
             <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                    <TableRow key={product.id}>
                       <TableCell>
                        <div className="relative h-12 w-12 rounded-md overflow-hidden">
                           {product.imageUrl && <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right space-x-2">
                         <Button variant="outline" size="sm" onClick={() => router.push(`/admin/edit-product/${product.id}`)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                         </Button>
                         <Button variant="destructive" size="sm" onClick={() => handleDeleteClick({id: product.id, name: product.name})}>
                           <Trash2 className="mr-2 h-4 w-4" /> Delete
                         </Button>
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center py-16 text-muted-foreground">
              No products found. Add some from the Admin Dashboard.
            </p>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure to delete this product?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the product "{productToDelete?.name}".
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setProductToDelete(null)}>No</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className={buttonVariants({ variant: "destructive" })}>Yes</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
    </div>
  );
}

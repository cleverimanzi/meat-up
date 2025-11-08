import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

export default function CartPage() {
  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-3xl">
            <ShoppingCart /> Your Shopping Cart
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-16 text-muted-foreground">
            <p>Your cart is currently empty.</p>
            <p className="mt-2 text-sm">Shopping cart functionality will be implemented here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

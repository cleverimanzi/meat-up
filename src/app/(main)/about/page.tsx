import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">About MeatUp</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Welcome to MeatUp, your premier destination for high-quality, fresh meat delivered right to your doorstep. We believe that everyone deserves access to the best cuts of meat, without the hassle of visiting a traditional butcher shop.
          </p>
          <p>
            Our mission is to connect discerning customers with trusted local suppliers and butchers. We are committed to quality, freshness, and convenience. Every product on our platform is carefully selected to meet our high standards, ensuring you receive only the best for your meals.
          </p>
          <p>
            Thank you for choosing MeatUp. We look forward to serving you.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

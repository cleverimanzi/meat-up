import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Contact Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Have questions? We're here to help. Reach out to us through any of the methods below.
          </p>
          <div className="flex items-center gap-4">
            <Mail className="h-5 w-5 text-primary"/>
            <span>support@meatup.com</span>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="h-5 w-5 text-primary"/>
            <span>1-800-MEAT-UPP</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

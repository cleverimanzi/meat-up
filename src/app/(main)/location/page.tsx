import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function LocationPage() {
  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Our Location</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Come visit us at our main branch. We're always happy to see you!
          </p>
          <div className="flex items-center gap-4">
            <MapPin className="h-5 w-5 text-primary"/>
            <span>123 Butcher Lane, Meatsville, 54321</span>
          </div>
          <div className="flex items-center gap-4">
            <Mail className="h-5 w-5 text-primary"/>
            <span>support@meatup.com</span>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="h-5 w-5 text-primary"/>
            <span>1-800-MEAT-UPP</span>
          </div>
          <div className="mt-6 h-64 w-full rounded-lg bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">Map placeholder</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function LocationPage() {
  const locations = ["NYABIHU", "BIGOGWE", "WEST"];

  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Our Locations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            Find us at any of our branches. We're always happy to see you!
          </p>
          
          <div className="space-y-4">
            {locations.map((location) => (
              <div key={location} className="flex items-center gap-4">
                <MapPin className="h-5 w-5 text-primary"/>
                <span>{location}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center gap-4">
              <Mail className="h-5 w-5 text-primary"/>
              <span>japetimanzi@gmail.com</span>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="h-5 w-5 text-primary"/>
              <span>1-800-MEAT-UPP</span>
            </div>
          </div>

          <div className="mt-6 h-64 w-full rounded-lg bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">Map placeholder</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

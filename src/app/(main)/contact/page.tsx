import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Contact Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            Get in touch with us. We're always happy to hear from you!
          </p>
          
          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center gap-4">
              <Mail className="h-5 w-5 text-primary"/>
              <span>japhetimanzi@gmail.com</span>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="h-5 w-5 text-primary"/>
              <span>+250780104812</span>
            </div>
             <div className="flex items-center gap-4">
                <MapPin className="h-5 w-5 text-primary"/>
                <span>NYABIHU, BIGOGWE, WEST</span>
              </div>
               <div className="flex items-center gap-4">
                <MessageCircle className="h-5 w-5 text-primary"/>
                <a href="https://wa.me/250780104812" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Chat on WhatsApp
                </a>
              </div>
          </div>

          <div className="mt-6 h-96 w-full rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.356586071853!2d29.44400651475459!3d-1.6122094988015626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMzYnNDMuOSJTIDI5wrAyNic0NS43IkU!5e0!3m2!1sen!2sus!4v1620310934567!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

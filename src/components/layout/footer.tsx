import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container flex h-16 flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} MeatUp. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
            <Twitter className="h-5 w-5" />
          </Link>
          <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
            <Facebook className="h-5 w-5" />
          </Link>
          <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
            <Instagram className="h-5 w-5" />
          </Link>
          <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
            <Linkedin className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

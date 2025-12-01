'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { Beef } from 'lucide-react';

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="relative text-neutral-200 transition-colors hover:text-white group"
  >
    {children}
    <span className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"></span>
  </Link>
);

export default function LandingHeader() {
  return (
    <header className="absolute top-0 z-50 w-full bg-transparent">
      <div className="container flex h-20 items-center">
        <Link href="/" className="mr-6 flex items-center gap-2">
          <Beef className="h-8 w-8 text-primary" />
          <span className="font-headline text-xl font-bold text-white">
            MeatUp
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <NavLink href="/products">Products</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" asChild className="text-white hover:bg-white/10 hover:text-white">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
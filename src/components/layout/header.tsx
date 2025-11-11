'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { useAuth } from '@/hooks/use-auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { ShoppingCart, User, LogOut, Beef, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/use-cart';

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="relative text-foreground/80 transition-colors hover:text-foreground"
  >
    {children}
    <span className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"></span>
  </Link>
);

const ADMIN_EMAIL = 'japhetimanzi@gmail.com';

export default function Header() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const { itemCount } = useCart();
  const isAdmin = user?.email === ADMIN_EMAIL;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({ title: 'Logged out successfully.' });
      router.push('/');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Logout Failed',
        description: 'There was a problem logging you out.',
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/dashboard" className="mr-6 flex items-center gap-2">
          <Beef className="h-8 w-8 text-primary" />
          <span className="font-headline text-xl font-bold">MeatUp</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex group">
          <NavLink href="/dashboard">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          <NavLink href="/products">Product</NavLink>
          {isAdmin && (
             <NavLink href="/admin">
                <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4" /> Admin
                </div>
            </NavLink>
          )}
        </nav>
        <div className="ml-auto flex items-center gap-4">
          {user ? (
            <>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/cart" className="relative">
                  {itemCount > 0 && (
                     <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {itemCount}
                    </span>
                  )}
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Cart</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/profile">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Profile</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Logout</span>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

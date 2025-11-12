'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Loader2, MessageCircle } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ADMIN_EMAIL = 'japhetimanzi@gmail.com';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user) {
      router.push('/login');
      return;
    }
    
    const isAdmin = user.email === ADMIN_EMAIL;

    if (pathname.startsWith('/admin') && !isAdmin) {
        router.push('/dashboard');
    }

  }, [user, loading, router, pathname]);

  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
       <Link href="https://wa.me/250780104812" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="rounded-full shadow-lg h-16 w-16 p-0 flex items-center justify-center"
        >
          <MessageCircle className="h-8 w-8" />
          <span className="sr-only">Chat on WhatsApp</span>
        </Button>
      </Link>
    </div>
  );
}

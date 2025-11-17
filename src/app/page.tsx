'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import TypingAnimation from '@/components/typing-animation';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import BackgroundCarousel from '@/components/background-carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function WelcomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const carouselImages = PlaceHolderImages.filter(p => 
    ['custom-bg-1', 'custom-bg-2', 'custom-bg-3', 'custom-bg-4'].includes(p.id)
  );

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading || user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full">
      <BackgroundCarousel images={carouselImages} />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
        <h1 className="font-headline text-5xl font-bold tracking-tight md:text-7xl">
          Welcome to MeatUp
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-neutral-200 md:text-xl">
          Quality Meat Delivered to Your Doorstep!
        </p>
        <TypingAnimation
          className="mt-4 font-headline text-2xl font-semibold text-primary-foreground md:text-3xl"
          phrases={[
            'Fresh Meat...',
            'Delivered Fast...',
            'Trusted Quality...',
          ]}
        />
        <div className="mt-8 flex gap-4">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

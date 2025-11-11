import type { Metadata } from 'next';
import './globals.css';
import { Alegreya } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import AuthProvider from '@/components/providers/auth-provider';
import { CartProvider } from '@/components/providers/cart-provider';

const alegreya = Alegreya({
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'MeatUp - Quality Meat Delivered',
  description:
    'MeatUp is an online platform for buying and selling high-quality meat products.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn('font-body antialiased', alegreya.variable)}
      >
        <AuthProvider>
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

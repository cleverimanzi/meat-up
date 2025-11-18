'use client';

import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';

function OrderSuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');

    return (
        <div className="container py-12 flex items-center justify-center">
        <Card className="w-full max-w-lg text-center">
            <CardHeader className="items-center">
                <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                <CardTitle className="font-headline text-3xl">Thank You for Your Order!</CardTitle>
                <CardDescription className="text-lg">
                    Your purchase has been confirmed.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {orderId && (
                    <p className="text-muted-foreground">
                        Your Order ID is: <span className="font-mono text-foreground">{orderId}</span>
                    </p>
                )}
                <p>You will receive an email confirmation shortly.</p>
                <Button asChild className="mt-6">
                    <Link href="/dashboard">Continue Shopping</Link>
                </Button>
            </CardContent>
        </Card>
    </div>
    )
}


export default function OrderSuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OrderSuccessContent />
        </Suspense>
    )
}

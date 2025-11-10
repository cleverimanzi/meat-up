'use client';

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }
  
  const getInitials = (email: string) => {
    const parts = email.split('@');
    return parts[0].substring(0, 2).toUpperCase();
  }

  return (
    <div className="container py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">User Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-3xl">
                {user.email ? getInitials(user.email) : <User />}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-2xl font-bold">{user.displayName || 'User'}</p>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground pt-4">Profile editing functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
}

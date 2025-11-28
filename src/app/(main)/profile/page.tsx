'use client';

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

  const isJaphet = user.email === 'japhetimanzi@gmail.com';
  const customImage = 'https://scontent.fkgl4-2.fna.fbcdn.net/v/t39.30808-6/578528255_122141215502956139_7691644703532553414_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=z9sj0A1xY84Q7kNvwFgX90T&_nc_oc=AdmRPKXqUiLvZfRNZSVa5ipRIDGLh1r1r-SEpPkYdRwFABtavUUA_7LS26kcgRVT5Ag&_nc_zt=23&_nc_ht=scontent.fkgl4-2.fna&_nc_gid=c80FVbkcnPSAAnbnx-xktQ&oh=00_AfjJYubDapwNKMrhJoKImEUquKHbmnYbWQ6VJy9SskIwRA&oe=692F1CE9';
  const photoUrl = isJaphet ? customImage : user.photoURL;

  return (
    <div className="container py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">User Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              {photoUrl && <AvatarImage src={photoUrl} alt={user.displayName || user.email || 'User'} />}
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

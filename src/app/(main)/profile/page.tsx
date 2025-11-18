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
  const customImage = 'https://scontent.cdninstagram.com/v/t51.82787-15/575962426_17865298542490056_8201826088818671119_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=108&ig_cache_key=Mzc2MDQyNjIyNDgzODI3Njg3Mw%3D%3D.3-ccb1-7&ccb=1-7&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjYzM3g4NTMuc2RyLkMzIn0%3D&_nc_ohc=4VAf84VbqVkQ7kNvwEijy1z&_nc_oc=AdmokpjctSlJjdtvL15XdB2KqCwnZrtPwdnt_PLm5FgKfF0LH_CsjbzvNXxL2bZhe8k&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=-ME8raPIQYfrXqUPs5MsVA&oh=00_Afh44Tq_z62TgcUZOyNAWYp-oA06pzila1rIw3TpnT8Zjw&oe=6921DA22';
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

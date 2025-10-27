import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface SellerProfileProps {
  name: string;
  avatar?: string;
  rating: number;
  totalSales: number;
  joinDate: string;
  description?: string;
  isPremium?: boolean;
  socialLinks?: {
    instagram?: string;
    telegram?: string;
    whatsapp?: string;
  };
  activeListings: number;
}

const SellerProfile = ({
  name,
  avatar,
  rating,
  totalSales,
  joinDate,
  description,
  isPremium = false,
  socialLinks,
  activeListings
}: SellerProfileProps) => {
  return (
    <Card className="animate-fade-in">
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-6">
          <Avatar className="h-20 w-20 border-4 border-primary/20">
            {avatar ? (
              <AvatarImage src={avatar} alt={name} />
            ) : (
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-accent text-white">
                {name[0]}
              </AvatarFallback>
            )}
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold font-display">{name}</h2>
              {isPremium && (
                <Badge className="bg-gradient-to-r from-primary to-accent">
                  <Icon name="Crown" size={12} className="mr-1" />
                  Premium
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Icon name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-foreground">{rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="ShoppingBag" size={16} />
                <span>{totalSales} продаж</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Calendar" size={16} />
                <span>С {joinDate}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="sm" className="rounded-xl">
                <Icon name="MessageCircle" size={16} className="mr-2" />
                Написать
              </Button>
              <Button size="sm" variant="outline" className="rounded-xl">
                <Icon name="Phone" size={16} className="mr-2" />
                Позвонить
              </Button>
            </div>
          </div>
        </div>

        {description && (
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {description}
          </p>
        )}

        {socialLinks && (
          <div className="flex items-center gap-2 mb-4 pb-4 border-b">
            <span className="text-sm font-medium text-muted-foreground">Соцсети:</span>
            {socialLinks.instagram && (
              <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg">
                <Icon name="Instagram" size={18} />
              </Button>
            )}
            {socialLinks.telegram && (
              <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg">
                <Icon name="Send" size={18} />
              </Button>
            )}
            {socialLinks.whatsapp && (
              <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg">
                <Icon name="Phone" size={18} />
              </Button>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-muted/50">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="Package" size={18} className="text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Активных</span>
            </div>
            <p className="text-2xl font-bold font-display">{activeListings}</p>
          </div>
          
          <div className="p-4 rounded-xl bg-muted/50">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="TrendingUp" size={18} className="text-green-500" />
              <span className="text-sm font-medium text-muted-foreground">Продаж</span>
            </div>
            <p className="text-2xl font-bold font-display">{totalSales}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SellerProfile;

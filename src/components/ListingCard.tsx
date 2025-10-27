import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface ListingCardProps {
  id: number;
  title: string;
  price: string;
  image: string;
  location: string;
  category: string;
  isPremium?: boolean;
  seller: {
    name: string;
    avatar?: string;
    rating: number;
  };
  onFavoriteToggle?: (id: number) => void;
  isFavorite?: boolean;
}

const ListingCard = ({
  id,
  title,
  price,
  image,
  location,
  category,
  isPremium = false,
  seller,
  onFavoriteToggle,
  isFavorite = false
}: ListingCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer animate-fade-in">
      <CardHeader className="p-0 relative">
        {isPremium && (
          <Badge className="absolute top-3 left-3 z-10 bg-gradient-to-r from-primary to-accent">
            <Icon name="Zap" size={12} className="mr-1" />
            Premium
          </Badge>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle?.(id);
          }}
          className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform"
        >
          <Icon
            name="Heart"
            size={16}
            className={cn(
              'transition-colors',
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700 dark:text-gray-300'
            )}
          />
        </button>
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
        </div>
        <h4 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h4>
        <p className="text-2xl font-bold font-display text-primary mb-2">
          {price}
        </p>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="MapPin" size={14} />
            <span>{location}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 border-t">
        <div className="flex items-center gap-2 w-full">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-xs bg-primary/10">
              {seller.name[0]}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{seller.name}</span>
          <div className="ml-auto flex items-center gap-1 text-sm">
            <Icon name="Star" size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{seller.rating}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ListingCard;

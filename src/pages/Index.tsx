import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

const categories = [
  { icon: 'Smartphone', label: 'Электроника', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' },
  { icon: 'Shirt', label: 'Одежда', color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300' },
  { icon: 'Home', label: 'Дом', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  { icon: 'Car', label: 'Авто', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
  { icon: 'Briefcase', label: 'Работа', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' },
  { icon: 'Package', label: 'Ещё', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' }
];

const mockListings = [
  {
    id: 1,
    title: 'iPhone 15 Pro Max 256GB',
    price: '89 990 ₽',
    image: 'https://cdn.poehali.dev/projects/6d5514bc-f453-4ac7-ba9c-251d71a9647c/files/a657fec3-7d16-4b6a-a47d-202e3ca37263.jpg',
    location: 'Москва',
    category: 'Электроника',
    isPremium: true,
    seller: { name: 'TechStore', avatar: '', rating: 4.8 }
  },
  {
    id: 2,
    title: 'Джинсовая куртка Levi\'s',
    price: '4 500 ₽',
    image: 'https://cdn.poehali.dev/projects/6d5514bc-f453-4ac7-ba9c-251d71a9647c/files/57317e4a-3c26-4b48-a79c-ec8aaf1dab14.jpg',
    location: 'Санкт-Петербург',
    category: 'Одежда',
    isPremium: false,
    seller: { name: 'FashionHub', avatar: '', rating: 4.5 }
  },
  {
    id: 3,
    title: 'Скандинавский диван',
    price: '35 000 ₽',
    image: 'https://cdn.poehali.dev/projects/6d5514bc-f453-4ac7-ba9c-251d71a9647c/files/be9d2cfe-6d38-4155-b8f1-7daed3634de3.jpg',
    location: 'Казань',
    category: 'Дом',
    isPremium: true,
    seller: { name: 'HomeDesign', avatar: '', rating: 4.9 }
  },
  {
    id: 4,
    title: 'MacBook Air M2',
    price: '95 000 ₽',
    image: 'https://cdn.poehali.dev/projects/6d5514bc-f453-4ac7-ba9c-251d71a9647c/files/a657fec3-7d16-4b6a-a47d-202e3ca37263.jpg',
    location: 'Москва',
    category: 'Электроника',
    isPremium: false,
    seller: { name: 'AppleShop', avatar: '', rating: 4.7 }
  }
];

const Index = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(false);

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
              <Icon name="Sparkles" size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold font-display bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              MarketAI
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              <Icon name={isDark ? 'Sun' : 'Moon'} size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="Bell" size={20} />
            </Button>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                ИИ
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container px-4 py-6">
        <div className="mb-6 animate-fade-in">
          <h2 className="text-3xl font-bold font-display mb-2">
            Найди всё, что нужно
          </h2>
          <p className="text-muted-foreground">
            ИИ-помощник поможет найти идеальное предложение
          </p>
        </div>

        <div className="relative mb-8 animate-scale-in">
          <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Что ищете? ИИ подскажет категорию..."
            className="h-14 pl-12 pr-14 text-base rounded-2xl border-2 focus-visible:ring-2 focus-visible:ring-primary"
          />
          <Button size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl">
            <Icon name="Camera" size={18} />
          </Button>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold font-display">Категории</h3>
            <Button variant="ghost" size="sm">
              Все
              <Icon name="ChevronRight" size={16} className="ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-muted/50 transition-all hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className={cn('h-12 w-12 rounded-xl flex items-center justify-center', cat.color)}>
                  <Icon name={cat.icon as any} size={24} />
                </div>
                <span className="text-xs font-medium text-center">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="Sparkles" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold font-display">Рекомендации для вас</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockListings.map((listing, idx) => (
              <Card
                key={listing.id}
                className="group overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in cursor-pointer"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <CardHeader className="p-0 relative">
                  {listing.isPremium && (
                    <Badge className="absolute top-3 left-3 z-10 bg-gradient-to-r from-primary to-accent">
                      <Icon name="Zap" size={12} className="mr-1" />
                      Premium
                    </Badge>
                  )}
                  <button
                    onClick={() => toggleFavorite(listing.id)}
                    className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <Icon
                      name="Heart"
                      size={16}
                      className={cn(
                        'transition-colors',
                        favorites.includes(listing.id) ? 'fill-red-500 text-red-500' : 'text-gray-700 dark:text-gray-300'
                      )}
                    />
                  </button>
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </CardHeader>
                
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {listing.category}
                    </Badge>
                  </div>
                  <h4 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {listing.title}
                  </h4>
                  <p className="text-2xl font-bold font-display text-primary mb-2">
                    {listing.price}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="MapPin" size={14} />
                      <span>{listing.location}</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0 border-t">
                  <div className="flex items-center gap-2 w-full">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs bg-primary/10">
                        {listing.seller.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{listing.seller.name}</span>
                    <div className="ml-auto flex items-center gap-1 text-sm">
                      <Icon name="Star" size={14} className="fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{listing.seller.rating}</span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-8 p-6 rounded-3xl bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 border-2 border-primary/20">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
              <Icon name="Sparkles" size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-display mb-2">
                ИИ поможет с объявлением
              </h3>
              <p className="text-muted-foreground mb-4">
                Загрузите фото — и получите готовое описание, категорию и теги автоматически
              </p>
              <Button className="rounded-xl">
                <Icon name="Plus" size={18} className="mr-2" />
                Создать объявление
              </Button>
            </div>
          </div>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden">
        <div className="flex items-center justify-around h-16 px-4">
          {[
            { id: 'home', icon: 'Home', label: 'Главная' },
            { id: 'search', icon: 'Search', label: 'Поиск' },
            { id: 'create', icon: 'PlusCircle', label: 'Создать' },
            { id: 'favorites', icon: 'Heart', label: 'Избранное' },
            { id: 'profile', icon: 'User', label: 'Профиль' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex flex-col items-center gap-1 transition-colors',
                activeTab === tab.id ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <Icon name={tab.icon as any} size={22} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Index;

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import ListingCard from '@/components/ListingCard';
import SellerProfile from '@/components/SellerProfile';

const categories = [
  { icon: 'Smartphone', label: 'Электроника', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  { icon: 'Shirt', label: 'Одежда', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' },
  { icon: 'Home', label: 'Дом', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
  { icon: 'Car', label: 'Авто', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' },
  { icon: 'Briefcase', label: 'Работа', color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300' },
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
    seller: { name: 'TechStore', avatar: '', rating: 4.8 },
    description: 'Новый iPhone 15 Pro Max с титановым корпусом, чипом A17 Pro и камерой 48 МП. Полный комплект, гарантия.'
  },
  {
    id: 2,
    title: 'Джинсовая куртка Levi\'s',
    price: '4 500 ₽',
    image: 'https://cdn.poehali.dev/projects/6d5514bc-f453-4ac7-ba9c-251d71a9647c/files/57317e4a-3c26-4b48-a79c-ec8aaf1dab14.jpg',
    location: 'Санкт-Петербург',
    category: 'Одежда',
    isPremium: false,
    seller: { name: 'FashionHub', avatar: '', rating: 4.5 },
    description: 'Классическая джинсовая куртка Levi\'s, размер M, отличное состояние.'
  },
  {
    id: 3,
    title: 'Скандинавский диван',
    price: '35 000 ₽',
    image: 'https://cdn.poehali.dev/projects/6d5514bc-f453-4ac7-ba9c-251d71a9647c/files/be9d2cfe-6d38-4155-b8f1-7daed3634de3.jpg',
    location: 'Казань',
    category: 'Дом',
    isPremium: true,
    seller: { name: 'HomeDesign', avatar: '', rating: 4.9 },
    description: 'Современный скандинавский диван в минималистичном стиле. Раскладной, экологичные материалы.'
  },
  {
    id: 4,
    title: 'MacBook Air M2',
    price: '95 000 ₽',
    image: 'https://cdn.poehali.dev/projects/6d5514bc-f453-4ac7-ba9c-251d71a9647c/files/a657fec3-7d16-4b6a-a47d-202e3ca37263.jpg',
    location: 'Москва',
    category: 'Электроника',
    isPremium: false,
    seller: { name: 'AppleShop', avatar: '', rating: 4.7 },
    description: 'MacBook Air 13" с чипом M2, 8GB RAM, 256GB SSD. Как новый, использовался 3 месяца.'
  },
  {
    id: 5,
    title: 'Кроссовки Nike Air Max',
    price: '7 200 ₽',
    image: 'https://cdn.poehali.dev/projects/6d5514bc-f453-4ac7-ba9c-251d71a9647c/files/57317e4a-3c26-4b48-a79c-ec8aaf1dab14.jpg',
    location: 'Екатеринбург',
    category: 'Одежда',
    isPremium: false,
    seller: { name: 'SneakerZone', avatar: '', rating: 4.6 },
    description: 'Оригинальные кроссовки Nike Air Max, размер 42, новые с бирками.'
  },
  {
    id: 6,
    title: 'PlayStation 5',
    price: '52 000 ₽',
    image: 'https://cdn.poehali.dev/projects/6d5514bc-f453-4ac7-ba9c-251d71a9647c/files/a657fec3-7d16-4b6a-a47d-202e3ca37263.jpg',
    location: 'Новосибирск',
    category: 'Электроника',
    isPremium: true,
    seller: { name: 'GamersPlace', avatar: '', rating: 4.9 },
    description: 'Sony PlayStation 5 с дисководом, 2 геймпада, 5 игр в комплекте.'
  }
];

const Index = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedListing, setSelectedListing] = useState<typeof mockListings[0] | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSellerProfileOpen, setIsSellerProfileOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState('relevance');

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const filteredListings = mockListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || listing.category === selectedCategory;
    const price = parseInt(listing.price.replace(/[^\d]/g, ''));
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedListings = [...filteredListings].sort((a, b) => {
    if (sortBy === 'price-asc') {
      return parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, ''));
    }
    if (sortBy === 'price-desc') {
      return parseInt(b.price.replace(/[^\d]/g, '')) - parseInt(a.price.replace(/[^\d]/g, ''));
    }
    if (sortBy === 'rating') {
      return b.seller.rating - a.seller.rating;
    }
    return 0;
  });

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleListingClick = (listing: typeof mockListings[0]) => {
    setSelectedListing(listing);
  };

  const handleSellerClick = () => {
    setSelectedListing(null);
    setIsSellerProfileOpen(true);
  };

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Icon name="Store" size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold font-display text-primary">
              iMarket
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
                ЮР
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container px-4 py-6 max-w-7xl mx-auto">
        <div className="mb-6 animate-fade-in">
          <h2 className="text-3xl font-bold font-display mb-2">
            Найди всё, что нужно
          </h2>
          <p className="text-muted-foreground">
            Интеллектуальный поиск и персональные рекомендации
          </p>
        </div>

        <div className="flex gap-2 mb-8 animate-scale-in">
          <div className="relative flex-1">
            <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск по объявлениям..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 pl-12 pr-4 text-base rounded-2xl border-2 focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>
          <Button 
            size="icon" 
            variant="outline"
            onClick={() => setIsFilterOpen(true)}
            className="h-14 w-14 rounded-2xl border-2"
          >
            <Icon name="SlidersHorizontal" size={20} />
          </Button>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold font-display">Категории</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              Все
              <Icon name="ChevronRight" size={16} className="ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => handleCategoryClick(cat.label)}
                className={cn(
                  'flex flex-col items-center gap-2 p-4 rounded-2xl transition-all hover:scale-105 animate-fade-in',
                  selectedCategory === cat.label 
                    ? 'bg-primary/10 ring-2 ring-primary' 
                    : 'hover:bg-muted/50'
                )}
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

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Icon name="Sparkles" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold font-display">
              {selectedCategory || searchQuery ? 'Результаты' : 'Рекомендации для вас'}
            </h3>
            <Badge variant="secondary">{sortedListings.length}</Badge>
          </div>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] rounded-xl">
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">По релевантности</SelectItem>
              <SelectItem value="price-asc">Сначала дешёвые</SelectItem>
              <SelectItem value="price-desc">Сначала дорогие</SelectItem>
              <SelectItem value="rating">По рейтингу</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {sortedListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
            {sortedListings.map((listing, idx) => (
              <div
                key={listing.id}
                onClick={() => handleListingClick(listing)}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <ListingCard
                  {...listing}
                  onFavoriteToggle={toggleFavorite}
                  isFavorite={favorites.includes(listing.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Icon name="SearchX" size={64} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
            <p className="text-muted-foreground mb-4">Попробуйте изменить параметры поиска</p>
            <Button onClick={() => {
              setSearchQuery('');
              setSelectedCategory(null);
              setPriceRange([0, 100000]);
            }}>
              Сбросить фильтры
            </Button>
          </div>
        )}

        <div className="mt-8 p-6 rounded-3xl bg-primary/5 border-2 border-primary/20">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0">
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
            { id: 'favorites', icon: 'Heart', label: 'Избранное', badge: favorites.length },
            { id: 'profile', icon: 'User', label: 'Профиль' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id === 'favorites') {
                  setSelectedCategory(null);
                  setSearchQuery('');
                }
              }}
              className={cn(
                'flex flex-col items-center gap-1 transition-colors relative',
                activeTab === tab.id ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <Icon name={tab.icon as any} size={22} />
              {tab.badge && tab.badge > 0 && (
                <Badge className="absolute -top-1 -right-2 h-5 w-5 p-0 flex items-center justify-center text-[10px]">
                  {tab.badge}
                </Badge>
              )}
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <Dialog open={!!selectedListing} onOpenChange={() => setSelectedListing(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedListing && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-display">{selectedListing.title}</DialogTitle>
                <DialogDescription className="flex items-center gap-2 text-base">
                  <Icon name="MapPin" size={16} />
                  {selectedListing.location}
                  <Badge variant="secondary" className="ml-2">{selectedListing.category}</Badge>
                  {selectedListing.isPremium && (
                    <Badge className="bg-primary">
                      <Icon name="Zap" size={12} className="mr-1" />
                      Premium
                    </Badge>
                  )}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <img
                  src={selectedListing.image}
                  alt={selectedListing.title}
                  className="w-full aspect-video object-cover rounded-2xl"
                />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold font-display text-primary">
                      {selectedListing.price}
                    </p>
                  </div>
                  <Button
                    variant={favorites.includes(selectedListing.id) ? 'default' : 'outline'}
                    onClick={() => toggleFavorite(selectedListing.id)}
                  >
                    <Icon name="Heart" size={18} className="mr-2" />
                    {favorites.includes(selectedListing.id) ? 'В избранном' : 'В избранное'}
                  </Button>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Описание</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedListing.description}
                  </p>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Продавец</h4>
                  <div 
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={handleSellerClick}
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10">
                        {selectedListing.seller.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold">{selectedListing.seller.name}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Icon name="Star" size={14} className="fill-yellow-400 text-yellow-400" />
                        <span>{selectedListing.seller.rating}</span>
                      </div>
                    </div>
                    <Icon name="ChevronRight" size={20} />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 rounded-xl h-12">
                    <Icon name="MessageCircle" size={18} className="mr-2" />
                    Написать
                  </Button>
                  <Button variant="outline" className="flex-1 rounded-xl h-12">
                    <Icon name="Phone" size={18} className="mr-2" />
                    Позвонить
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Фильтры</SheetTitle>
          </SheetHeader>
          
          <div className="space-y-6 mt-6">
            <div>
              <label className="text-sm font-medium mb-3 block">Категория</label>
              <Select value={selectedCategory || 'all'} onValueChange={(v) => setSelectedCategory(v === 'all' ? null : v)}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все категории</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.label} value={cat.label}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-3 block">
                Цена: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} ₽
              </label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={100000}
                step={1000}
                className="mt-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-3 block">Сортировка</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">По релевантности</SelectItem>
                  <SelectItem value="price-asc">Сначала дешёвые</SelectItem>
                  <SelectItem value="price-desc">Сначала дорогие</SelectItem>
                  <SelectItem value="rating">По рейтингу</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              className="w-full rounded-xl"
              onClick={() => setIsFilterOpen(false)}
            >
              Применить фильтры
            </Button>
            
            <Button 
              variant="outline"
              className="w-full rounded-xl"
              onClick={() => {
                setPriceRange([0, 100000]);
                setSelectedCategory(null);
                setSortBy('relevance');
              }}
            >
              Сбросить
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={isSellerProfileOpen} onOpenChange={setIsSellerProfileOpen}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Профиль продавца</SheetTitle>
          </SheetHeader>
          
          <div className="mt-6">
            <SellerProfile
              name="TechStore"
              rating={4.8}
              totalSales={142}
              joinDate="Янв 2023"
              description="Официальный магазин Apple техники. Все товары оригинальные с гарантией. Быстрая доставка по всей России."
              isPremium={true}
              socialLinks={{
                instagram: '@techstore',
                telegram: '@techstore_ru',
                whatsapp: '+79991234567'
              }}
              activeListings={23}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Index;

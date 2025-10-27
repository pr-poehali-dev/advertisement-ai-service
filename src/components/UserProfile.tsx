import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface UserProfileProps {
  listings: any[];
  favorites: number[];
  onEditListing?: (id: number) => void;
  onDeleteListing?: (id: number) => void;
}

const UserProfile = ({ listings, favorites, onEditListing, onDeleteListing }: UserProfileProps) => {
  const [userName, setUserName] = useState('Юрий');
  const [userPhone, setUserPhone] = useState('+7 999 123-45-67');
  const [userEmail, setUserEmail] = useState('user@imarket.ru');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const myListings = listings.filter(l => l.seller.name === 'Вы');
  const favoriteListings = listings.filter(l => favorites.includes(l.id));

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast.success('Профиль обновлён');
  };

  const handleDeleteListing = (id: number) => {
    if (window.confirm('Удалить объявление?')) {
      onDeleteListing?.(id);
      toast.success('Объявление удалено');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-4 border-primary/20">
              <AvatarFallback className="text-2xl font-bold bg-primary text-white">
                {userName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold font-display mb-1">{userName}</h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Icon name="Package" size={16} />
                  <span>{myListings.length} объявлений</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Heart" size={16} />
                  <span>{favoriteListings.length} избранных</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                  <span>4.8</span>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
              className="rounded-xl"
            >
              <Icon name={isEditing ? 'X' : 'Pencil'} size={16} className="mr-2" />
              {isEditing ? 'Отмена' : 'Редактировать'}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <Tabs defaultValue="listings" className="w-full">
            <TabsList className="grid w-full grid-cols-3 rounded-2xl">
              <TabsTrigger value="listings" className="rounded-xl">
                <Icon name="Package" size={16} className="mr-2" />
                Мои объявления
              </TabsTrigger>
              <TabsTrigger value="favorites" className="rounded-xl">
                <Icon name="Heart" size={16} className="mr-2" />
                Избранное
              </TabsTrigger>
              <TabsTrigger value="settings" className="rounded-xl">
                <Icon name="Settings" size={16} className="mr-2" />
                Настройки
              </TabsTrigger>
            </TabsList>

            <TabsContent value="listings" className="space-y-4 mt-6">
              {myListings.length > 0 ? (
                <div className="grid gap-4">
                  {myListings.map(listing => (
                    <Card key={listing.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="flex gap-4 p-4">
                        <img 
                          src={listing.image} 
                          alt={listing.title}
                          className="w-24 h-24 object-cover rounded-xl flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold truncate">{listing.title}</h3>
                              <p className="text-sm text-muted-foreground">{listing.location}</p>
                            </div>
                            <Badge variant="secondary">{listing.category}</Badge>
                          </div>
                          <p className="text-lg font-bold text-primary mb-3">{listing.price}</p>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => onEditListing?.(listing.id)}
                              className="rounded-lg"
                            >
                              <Icon name="Pencil" size={14} className="mr-1" />
                              Редактировать
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleDeleteListing(listing.id)}
                              className="rounded-lg"
                            >
                              <Icon name="Trash2" size={14} className="mr-1" />
                              Удалить
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon name="PackageOpen" size={64} className="mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Нет объявлений</h3>
                  <p className="text-muted-foreground mb-4">Создайте своё первое объявление</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="favorites" className="space-y-4 mt-6">
              {favoriteListings.length > 0 ? (
                <div className="grid gap-4">
                  {favoriteListings.map(listing => (
                    <Card key={listing.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="flex gap-4 p-4">
                        <img 
                          src={listing.image} 
                          alt={listing.title}
                          className="w-24 h-24 object-cover rounded-xl flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold truncate">{listing.title}</h3>
                              <p className="text-sm text-muted-foreground">{listing.location}</p>
                            </div>
                            <Badge variant="secondary">{listing.category}</Badge>
                          </div>
                          <p className="text-lg font-bold text-primary mb-2">{listing.price}</p>
                          <div className="flex items-center gap-2 text-sm">
                            <Avatar className="h-5 w-5">
                              <AvatarFallback className="text-[10px] bg-primary/10">
                                {listing.seller.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-muted-foreground">{listing.seller.name}</span>
                            <Icon name="Star" size={12} className="fill-yellow-400 text-yellow-400 ml-2" />
                            <span className="text-muted-foreground">{listing.seller.rating}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon name="HeartOff" size={64} className="mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Нет избранных</h3>
                  <p className="text-muted-foreground">Добавляйте понравившиеся объявления в избранное</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="settings" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <h3 className="font-semibold">Личные данные</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Имя</Label>
                    <Input
                      id="name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      disabled={!isEditing}
                      className="mt-2 rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      disabled={!isEditing}
                      className="mt-2 rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      disabled={!isEditing}
                      className="mt-2 rounded-xl"
                    />
                  </div>
                  {isEditing && (
                    <Button 
                      onClick={handleSaveProfile}
                      className="w-full rounded-xl"
                    >
                      <Icon name="Check" size={16} className="mr-2" />
                      Сохранить изменения
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="font-semibold">Уведомления</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon name="Bell" size={20} className="text-primary" />
                      <div>
                        <p className="font-medium">Push-уведомления</p>
                        <p className="text-sm text-muted-foreground">Новые сообщения и предложения</p>
                      </div>
                    </div>
                    <Switch 
                      checked={notifications}
                      onCheckedChange={setNotifications}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon name="Mail" size={20} className="text-primary" />
                      <div>
                        <p className="font-medium">Email-рассылка</p>
                        <p className="text-sm text-muted-foreground">Новинки и акции</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="font-semibold">Внешний вид</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon name="Moon" size={20} className="text-primary" />
                      <div>
                        <p className="font-medium">Тёмная тема</p>
                        <p className="text-sm text-muted-foreground">Включить тёмный режим</p>
                      </div>
                    </div>
                    <Switch 
                      checked={darkMode}
                      onCheckedChange={(checked) => {
                        setDarkMode(checked);
                        document.documentElement.classList.toggle('dark', checked);
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-destructive/50">
                <CardContent className="p-6">
                  <Button 
                    variant="destructive" 
                    className="w-full rounded-xl"
                    onClick={() => {
                      if (window.confirm('Вы уверены, что хотите выйти?')) {
                        toast.success('Вы вышли из аккаунта');
                      }
                    }}
                  >
                    <Icon name="LogOut" size={16} className="mr-2" />
                    Выйти из аккаунта
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;

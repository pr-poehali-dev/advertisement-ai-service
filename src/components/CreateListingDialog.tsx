import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface CreateListingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateListing: (listing: any) => void;
}

const categories = ['Электроника', 'Одежда', 'Дом', 'Авто', 'Работа', 'Услуги'];
const conditions = ['Новое', 'Как новое', 'Хорошее', 'Удовлетворительное'];
const cities = ['Москва', 'Санкт-Петербург', 'Казань', 'Екатеринбург', 'Новосибирск', 'Нижний Новгород'];

const CreateListingDialog = ({ open, onOpenChange, onCreateListing }: CreateListingDialogProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateWithAI = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const aiSuggestions = {
        title: 'iPhone 14 Pro 128GB Тёмно-синий',
        description: 'Продаю iPhone 14 Pro в отличном состоянии. Используется 6 месяцев, без царапин и повреждений. В комплекте: оригинальная коробка, зарядное устройство, кабель. Аккумулятор держит 100%. Полностью исправен, все функции работают.',
        category: 'Электроника',
        condition: 'Как новое'
      };
      
      setTitle(aiSuggestions.title);
      setDescription(aiSuggestions.description);
      setCategory(aiSuggestions.category);
      setCondition(aiSuggestions.condition);
      setIsGenerating(false);
      
      toast.success('ИИ заполнил объявление!', {
        description: 'Проверьте данные и отредактируйте при необходимости'
      });
    }, 1500);
  };

  const handleSubmit = () => {
    if (!title || !price || !category || !location) {
      toast.error('Заполните обязательные поля');
      return;
    }

    const newListing = {
      id: Date.now(),
      title,
      description,
      price: `${parseInt(price).toLocaleString()} ₽`,
      category,
      condition,
      location,
      image: imageUrl || 'https://cdn.poehali.dev/projects/6d5514bc-f453-4ac7-ba9c-251d71a9647c/files/a657fec3-7d16-4b6a-a47d-202e3ca37263.jpg',
      isPremium: false,
      seller: { name: 'Вы', avatar: '', rating: 4.8 }
    };

    onCreateListing(newListing);
    
    setTitle('');
    setDescription('');
    setPrice('');
    setCategory('');
    setCondition('');
    setLocation('');
    setImageUrl('');
    
    onOpenChange(false);
    
    toast.success('Объявление создано!', {
      description: 'Ваше объявление опубликовано и видно всем пользователям'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display flex items-center gap-2">
            <Icon name="Plus" size={24} className="text-primary" />
            Создать объявление
          </DialogTitle>
          <DialogDescription>
            Заполните данные или воспользуйтесь ИИ-помощником
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="p-4 rounded-2xl bg-primary/5 border-2 border-primary/20">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                <Icon name="Sparkles" size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">ИИ-помощник</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Загрузите фото или опишите товар — ИИ автоматически заполнит поля
                </p>
                <Button 
                  onClick={generateWithAI}
                  disabled={isGenerating}
                  size="sm"
                  className="rounded-xl"
                >
                  {isGenerating ? (
                    <>
                      <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                      Генерация...
                    </>
                  ) : (
                    <>
                      <Icon name="Wand2" size={16} className="mr-2" />
                      Заполнить с помощью ИИ
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div>
              <Label htmlFor="title">Название <span className="text-destructive">*</span></Label>
              <Input
                id="title"
                placeholder="iPhone 15 Pro Max 256GB"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 rounded-xl"
              />
            </div>

            <div>
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                placeholder="Подробное описание товара..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2 rounded-xl min-h-[120px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Цена, ₽ <span className="text-destructive">*</span></Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="50000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="mt-2 rounded-xl"
                />
              </div>

              <div>
                <Label htmlFor="category">Категория <span className="text-destructive">*</span></Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="mt-2 rounded-xl">
                    <SelectValue placeholder="Выберите" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="condition">Состояние</Label>
                <Select value={condition} onValueChange={setCondition}>
                  <SelectTrigger className="mt-2 rounded-xl">
                    <SelectValue placeholder="Выберите" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map(cond => (
                      <SelectItem key={cond} value={cond}>{cond}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location">Город <span className="text-destructive">*</span></Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="mt-2 rounded-xl">
                    <SelectValue placeholder="Выберите" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="image">Ссылка на фото (опционально)</Label>
              <Input
                id="image"
                placeholder="https://..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="mt-2 rounded-xl"
              />
              {imageUrl && (
                <div className="mt-2 rounded-xl overflow-hidden">
                  <img src={imageUrl} alt="Preview" className="w-full h-40 object-cover" />
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t">
            <Button 
              onClick={handleSubmit}
              className="flex-1 rounded-xl h-12"
            >
              <Icon name="Check" size={18} className="mr-2" />
              Опубликовать
            </Button>
            <Button 
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 rounded-xl h-12"
            >
              Отмена
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateListingDialog;

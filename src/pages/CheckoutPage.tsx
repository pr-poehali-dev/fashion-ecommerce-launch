import { useState } from 'react';
import { CartItem } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface CheckoutPageProps {
  items: CartItem[];
  onBack: () => void;
  onOrderComplete: () => void;
}

export default function CheckoutPage({ items, onBack, onOrderComplete }: CheckoutPageProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    comment: '',
    paymentMethod: 'card',
    deliveryMethod: 'courier'
  });

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const delivery = formData.deliveryMethod === 'pickup' ? 0 : subtotal >= 5000 ? 0 : 500;
  const total = subtotal + delivery;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Заказ оформлен!",
      description: `Спасибо за заказ! Мы свяжемся с вами по телефону ${formData.phone} для подтверждения.`,
    });

    setTimeout(() => {
      onOrderComplete();
    }, 2000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <Button variant="ghost" className="mb-6" onClick={onBack}>
        <Icon name="ChevronLeft" size={20} className="mr-2" />
        Назад к корзине
      </Button>

      <h1 className="text-4xl font-bold mb-8">Оформление заказа</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Контактные данные</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Имя *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Фамилия *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Способ доставки</h2>
              <RadioGroup value={formData.deliveryMethod} onValueChange={(value) => handleChange('deliveryMethod', value)}>
                <div className="flex items-center space-x-2 border rounded p-4 cursor-pointer hover:bg-muted">
                  <RadioGroupItem value="courier" id="courier" />
                  <Label htmlFor="courier" className="flex-1 cursor-pointer">
                    <div className="font-medium">Курьерская доставка</div>
                    <div className="text-sm text-muted-foreground">
                      {subtotal >= 5000 ? 'Бесплатно' : '500 ₽'} • 1-2 дня по Москве
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded p-4 cursor-pointer hover:bg-muted">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                    <div className="font-medium">Самовывоз</div>
                    <div className="text-sm text-muted-foreground">Бесплатно • Москва, ул. Примерная, 123</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {formData.deliveryMethod === 'courier' && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Адрес доставки</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="city">Город *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Адрес *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      placeholder="Улица, дом, квартира"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Индекс</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => handleChange('postalCode', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <h2 className="text-2xl font-semibold mb-4">Способ оплаты</h2>
              <RadioGroup value={formData.paymentMethod} onValueChange={(value) => handleChange('paymentMethod', value)}>
                <div className="flex items-center space-x-2 border rounded p-4 cursor-pointer hover:bg-muted">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer">
                    <div className="font-medium">Банковская карта</div>
                    <div className="text-sm text-muted-foreground">Visa, Mastercard, МИР</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded p-4 cursor-pointer hover:bg-muted">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash" className="flex-1 cursor-pointer">
                    <div className="font-medium">Наличные при получении</div>
                    <div className="text-sm text-muted-foreground">Оплата курьеру</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="comment">Комментарий к заказу</Label>
              <Textarea
                id="comment"
                value={formData.comment}
                onChange={(e) => handleChange('comment', e.target.value)}
                placeholder="Дополнительная информация для курьера"
                rows={3}
              />
            </div>

            <Button type="submit" size="lg" className="w-full md:w-auto">
              Оформить заказ на {total.toLocaleString('ru-RU')} ₽
            </Button>
          </form>
        </div>

        <div>
          <div className="sticky top-24 border rounded-lg p-6 bg-muted/30">
            <h3 className="font-semibold text-lg mb-4">Ваш заказ</h3>
            
            <div className="space-y-4 mb-6">
              {items.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="w-16 h-20 bg-muted rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm line-clamp-1">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">{item.size} • {item.color}</p>
                    <p className="text-sm mt-1">
                      {item.quantity} × {item.product.price.toLocaleString('ru-RU')} ₽
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Подытог</span>
                <span>{subtotal.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Доставка</span>
                <span>{delivery === 0 ? 'Бесплатно' : `${delivery} ₽`}</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between font-semibold text-lg">
              <span>Итого</span>
              <span>{total.toLocaleString('ru-RU')} ₽</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

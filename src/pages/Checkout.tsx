import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/contexts/CartContext';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    comment: '',
    deliveryMethod: 'courier',
    paymentMethod: 'card',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast.error('Заполните все обязательные поля');
      return;
    }

    toast.success('Заказ успешно оформлен! Мы свяжемся с вами в ближайшее время.');
    clearCart();
    navigate('/');
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-4xl font-bold mb-8">Оформление заказа</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6">Контактные данные</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Имя *</Label>
                    <Input
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Фамилия *</Label>
                    <Input
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6">Адрес доставки</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="city">Город *</Label>
                    <Input
                      id="city"
                      required
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Адрес *</Label>
                    <Input
                      id="address"
                      required
                      placeholder="Улица, дом, квартира"
                      value={formData.address}
                      onChange={e => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">Индекс</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={e => setFormData({ ...formData, zipCode: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6">Способ доставки</h2>
                <RadioGroup
                  value={formData.deliveryMethod}
                  onValueChange={value => setFormData({ ...formData, deliveryMethod: value })}
                >
                  <div className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted">
                    <RadioGroupItem value="courier" id="courier" />
                    <div className="flex-1">
                      <Label htmlFor="courier" className="cursor-pointer">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon name="Truck" size={18} />
                          <span className="font-semibold">Курьерская доставка</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Доставка по указанному адресу от 1 до 7 дней
                        </p>
                      </Label>
                    </div>
                    <span className="font-semibold">Бесплатно</span>
                  </div>

                  <div className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <div className="flex-1">
                      <Label htmlFor="pickup" className="cursor-pointer">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon name="Store" size={18} />
                          <span className="font-semibold">Самовывоз</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Забрать в пункте выдачи
                        </p>
                      </Label>
                    </div>
                    <span className="font-semibold">Бесплатно</span>
                  </div>
                </RadioGroup>
              </div>

              <div className="border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6">Способ оплаты</h2>
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={value => setFormData({ ...formData, paymentMethod: value })}
                >
                  <div className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name="CreditCard" size={18} />
                        <span className="font-semibold">Банковская карта</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Visa, MasterCard, МИР
                      </p>
                    </Label>
                  </div>

                  <div className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name="Wallet" size={18} />
                        <span className="font-semibold">При получении</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Наличными или картой курьеру
                      </p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6">Комментарий к заказу</h2>
                <Textarea
                  placeholder="Дополнительная информация для курьера"
                  value={formData.comment}
                  onChange={e => setFormData({ ...formData, comment: e.target.value })}
                  rows={4}
                />
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="border rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Ваш заказ</h2>

                <div className="space-y-4 mb-6">
                  {items.map((item, index) => (
                    <div key={`${item.product.id}-${item.size}-${item.color}-${index}`} className="flex gap-3">
                      <div className="w-16 h-20 flex-shrink-0 overflow-hidden rounded bg-muted">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 text-sm">
                        <p className="font-medium line-clamp-1">{item.product.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {item.size} / {item.color}
                        </p>
                        <p className="text-muted-foreground text-xs">Кол-во: {item.quantity}</p>
                        <p className="font-semibold mt-1">
                          {(item.product.price * item.quantity).toLocaleString('ru-RU')} ₽
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 py-4 border-y">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Товары</span>
                    <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Доставка</span>
                    <span>Бесплатно</span>
                  </div>
                </div>

                <div className="flex justify-between items-center py-4">
                  <span className="font-semibold">Итого</span>
                  <span className="text-2xl font-bold">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Подтвердить заказ
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

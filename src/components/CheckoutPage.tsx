import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface CheckoutPageProps {
  cartItems: any[];
  onBack: () => void;
  onOrderComplete: () => void;
}

export default function CheckoutPage({ cartItems, onBack, onOrderComplete }: CheckoutPageProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'card'
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 5000 ? 0 : 300;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Заказ оформлен!",
      description: "Мы свяжемся с вами в ближайшее время для подтверждения заказа.",
    });

    setTimeout(() => {
      onOrderComplete();
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-6"
      >
        <Icon name="ArrowLeft" size={20} className="mr-2" />
        Вернуться в корзину
      </Button>

      <h1 className="text-4xl font-bold mb-8">Оформление заказа</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Контактные данные</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Имя *</Label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Фамилия *</Label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон *</Label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Адрес доставки</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">Адрес *</Label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Улица, дом, квартира"
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">Город *</Label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Индекс *</Label>
                    <input
                      id="postalCode"
                      name="postalCode"
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Способ оплаты</h2>
              <div className="space-y-3">
                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <div className="flex items-center gap-2">
                    <Icon name="CreditCard" size={20} />
                    <span>Банковская карта</span>
                  </div>
                </label>
                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <div className="flex items-center gap-2">
                    <Icon name="Wallet" size={20} />
                    <span>Наличными при получении</span>
                  </div>
                </label>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full">
              Подтвердить заказ
            </Button>
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Ваш заказ</h2>
            
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-16 h-20 flex-shrink-0 overflow-hidden rounded bg-muted">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.selectedSize} • x{item.quantity}
                    </p>
                    <p className="text-sm font-semibold mt-1">
                      {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Товары</span>
                <span>{subtotal.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Доставка</span>
                <span>{shipping === 0 ? 'Бесплатно' : `${shipping} ₽`}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Итого</span>
                <span>{total.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

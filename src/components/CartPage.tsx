import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  selectedSize?: string;
  selectedColor?: string;
  quantity: number;
}

interface CartPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export default function CartPage({ 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout,
  onContinueShopping 
}: CartPageProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 5000 ? 0 : 300;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full bg-muted">
            <Icon name="ShoppingBag" size={40} className="text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Корзина пуста</h2>
          <p className="text-muted-foreground mb-8">
            Добавьте товары в корзину, чтобы оформить заказ
          </p>
          <Button onClick={onContinueShopping}>
            Перейти в каталог
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Корзина</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
              <div className="w-24 h-32 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold mb-1">{item.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {item.selectedSize && `Размер: ${item.selectedSize}`}
                  {item.selectedColor && ` • Цвет: ${item.selectedColor}`}
                </p>
                <p className="font-bold mb-3">{item.price.toLocaleString('ru-RU')} ₽</p>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="px-3 py-1 hover:bg-muted transition-colors"
                    >
                      <Icon name="Minus" size={16} />
                    </button>
                    <span className="px-4 py-1 border-x">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-muted transition-colors"
                    >
                      <Icon name="Plus" size={16} />
                    </button>
                  </div>

                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <Icon name="Trash2" size={16} className="mr-2" />
                    Удалить
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Итого</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Товары ({cartItems.length})</span>
                <span className="font-medium">{subtotal.toLocaleString('ru-RU')} ₽</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Доставка</span>
                <span className="font-medium">
                  {shipping === 0 ? 'Бесплатно' : `${shipping} ₽`}
                </span>
              </div>

              {subtotal < 5000 && (
                <p className="text-sm text-muted-foreground">
                  До бесплатной доставки: {(5000 - subtotal).toLocaleString('ru-RU')} ₽
                </p>
              )}

              <div className="border-t pt-3 flex justify-between text-lg font-bold">
                <span>Всего</span>
                <span>{total.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>

            <Button 
              className="w-full mb-3"
              size="lg"
              onClick={onCheckout}
            >
              Оформить заказ
            </Button>

            <Button 
              variant="outline" 
              className="w-full"
              onClick={onContinueShopping}
            >
              Продолжить покупки
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

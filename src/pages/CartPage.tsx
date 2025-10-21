import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Icon name="ShoppingBag" size={64} className="mx-auto text-muted-foreground" />
          <h2 className="text-2xl font-bold">Корзина пуста</h2>
          <p className="text-muted-foreground">Добавьте товары из каталога</p>
          <Link to="/catalog">
            <Button size="lg">Перейти в каталог</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Корзина</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <div key={`${item.product.id}-${item.size}-${item.color}-${index}`} className="bg-card border rounded-lg p-4">
                <div className="flex gap-4">
                  <div className="w-24 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{item.product.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.product.brand}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                      >
                        <Icon name="X" size={20} />
                      </Button>
                    </div>

                    <div className="flex gap-4 text-sm">
                      <span>Размер: <strong>{item.size}</strong></span>
                      <span>Цвет: <strong>{item.color}</strong></span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 border rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                        >
                          <Icon name="Minus" size={16} />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                        >
                          <Icon name="Plus" size={16} />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-bold">{(item.product.price * item.quantity).toLocaleString('ru-RU')} ₽</p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-muted-foreground">
                            {item.product.price.toLocaleString('ru-RU')} ₽ за шт.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card border rounded-lg p-6 sticky top-24 space-y-4">
              <h2 className="text-xl font-bold">Итого</h2>
              
              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Товары ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
                  <span>{getTotalPrice().toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Доставка</span>
                  <span className="text-green-600 font-semibold">
                    {getTotalPrice() >= 5000 ? 'Бесплатно' : '300 ₽'}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>К оплате</span>
                <span>
                  {(getTotalPrice() + (getTotalPrice() >= 5000 ? 0 : 300)).toLocaleString('ru-RU')} ₽
                </span>
              </div>

              <Link to="/checkout">
                <Button size="lg" className="w-full">
                  Оформить заказ
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
              </Link>

              <Link to="/catalog">
                <Button size="lg" variant="outline" className="w-full">
                  Продолжить покупки
                </Button>
              </Link>

              {getTotalPrice() < 5000 && (
                <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-3 text-sm">
                  <p className="text-blue-900 dark:text-blue-100">
                    Добавьте товаров на{' '}
                    <strong>{(5000 - getTotalPrice()).toLocaleString('ru-RU')} ₽</strong>{' '}
                    для бесплатной доставки
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

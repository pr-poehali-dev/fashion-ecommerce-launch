import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/types/product';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  onRemoveItem: (index: number) => void;
  onUpdateQuantity: (index: number, quantity: number) => void;
  onCheckout: () => void;
}

export default function CartSheet({ 
  open, 
  onOpenChange, 
  items, 
  onRemoveItem, 
  onUpdateQuantity,
  onCheckout 
}: CartSheetProps) {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col animate-slide-in-right">
        <SheetHeader>
          <SheetTitle className="text-2xl">Корзина</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <Icon name="ShoppingBag" size={64} className="text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Корзина пуста</p>
            <Button 
              onClick={() => onOpenChange(false)} 
              variant="outline" 
              className="mt-4"
            >
              Продолжить покупки
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-6">
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="flex gap-4 animate-fade-in">
                    <div className="w-24 h-32 bg-muted rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2 mb-1">
                        <h4 className="font-medium line-clamp-1">{item.product.name}</h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 flex-shrink-0"
                          onClick={() => onRemoveItem(index)}
                        >
                          <Icon name="X" size={16} />
                        </Button>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.size} • {item.color}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border rounded">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onUpdateQuantity(index, Math.max(1, item.quantity - 1))}
                          >
                            <Icon name="Minus" size={14} />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                          >
                            <Icon name="Plus" size={14} />
                          </Button>
                        </div>
                        
                        <span className="font-semibold">
                          {(item.product.price * item.quantity).toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Подытог</span>
                  <span>{total.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Доставка</span>
                  <span>{total >= 5000 ? 'Бесплатно' : '500 ₽'}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Итого</span>
                  <span>{(total >= 5000 ? total : total + 500).toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={onCheckout}
              >
                Оформить заказ
              </Button>
              
              {total < 5000 && (
                <p className="text-xs text-center text-muted-foreground">
                  Добавьте товаров на {(5000 - total).toLocaleString('ru-RU')} ₽ для бесплатной доставки
                </p>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

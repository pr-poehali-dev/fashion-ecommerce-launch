import { useState } from 'react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface ProductPageProps {
  product: Product;
  onAddToCart: (size: string, color: string) => void;
  onBack: () => void;
}

export default function ProductPage({ product, onAddToCart, onBack }: ProductPageProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(selectedSize, selectedColor);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <Button variant="ghost" className="mb-6" onClick={onBack}>
        <Icon name="ChevronLeft" size={20} className="mr-2" />
        Назад к каталогу
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="relative aspect-[3/4] bg-muted rounded overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {discount > 0 && (
              <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground text-lg px-3 py-1">
                -{discount}%
              </Badge>
            )}
          </div>
          
          {product.images && product.images.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, index) => (
                <div key={index} className="aspect-square bg-muted rounded overflow-hidden cursor-pointer hover:opacity-75 transition-opacity">
                  <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-muted-foreground mb-2">{product.brand}</p>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold">{product.price.toLocaleString('ru-RU')} ₽</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  {product.originalPrice.toLocaleString('ru-RU')} ₽
                </span>
              )}
            </div>

            {product.description && (
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-base font-semibold mb-3 block">Размер</Label>
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <div key={size}>
                      <RadioGroupItem value={size} id={`size-${size}`} className="peer sr-only" />
                      <Label
                        htmlFor={`size-${size}`}
                        className="flex items-center justify-center px-4 py-2 border rounded cursor-pointer hover:bg-muted transition-colors peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground peer-data-[state=checked]:border-primary"
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-semibold mb-3 block">Цвет</Label>
              <RadioGroup value={selectedColor} onValueChange={setSelectedColor}>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map(color => (
                    <div key={color}>
                      <RadioGroupItem value={color} id={`color-${color}`} className="peer sr-only" />
                      <Label
                        htmlFor={`color-${color}`}
                        className="flex items-center gap-2 px-4 py-2 border rounded cursor-pointer hover:bg-muted transition-colors peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground peer-data-[state=checked]:border-primary"
                      >
                        <div
                          className="w-5 h-5 rounded-full border border-border"
                          style={{
                            backgroundColor: color === 'Белый' ? '#FFFFFF' :
                                           color === 'Черный' ? '#000000' :
                                           color === 'Серый' ? '#8E9196' :
                                           color === 'Бежевый' ? '#F5F5DC' :
                                           color === 'Синий' ? '#1E3A8A' :
                                           color === 'Голубой' ? '#93C5FD' :
                                           color === 'Коричневый' ? '#78350F' : '#E5E7EB'
                          }}
                        />
                        {color}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-semibold mb-3 block">Количество</Label>
              <div className="flex items-center border rounded w-fit">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Icon name="Minus" size={18} />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Icon name="Plus" size={18} />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              size="lg" 
              className="w-full"
              onClick={handleAddToCart}
            >
              <Icon name="ShoppingBag" size={20} className="mr-2" />
              Добавить в корзину
            </Button>
            
            <Button size="lg" variant="outline" className="w-full">
              <Icon name="Heart" size={20} className="mr-2" />
              В избранное
            </Button>
          </div>

          <div className="space-y-3 pt-6 border-t">
            <div className="flex items-center gap-3 text-sm">
              <Icon name="Truck" size={20} className="text-muted-foreground" />
              <span>Бесплатная доставка от 5000 ₽</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Icon name="RotateCcw" size={20} className="text-muted-foreground" />
              <span>Возврат в течение 14 дней</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Icon name="Shield" size={20} className="text-muted-foreground" />
              <span>Гарантия качества</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

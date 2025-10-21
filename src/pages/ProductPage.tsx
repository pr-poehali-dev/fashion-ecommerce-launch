import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Icon name="AlertCircle" size={64} className="mx-auto mb-4 text-muted-foreground" />
        <h2 className="text-2xl font-bold mb-4">Товар не найден</h2>
        <Link to="/catalog">
          <Button>Вернуться в каталог</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Пожалуйста, выберите размер и цвет');
      return;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/catalog" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <Icon name="ChevronLeft" size={16} />
            <span className="ml-1">Назад в каталог</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-[3/4] rounded-lg overflow-hidden bg-muted">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-muted border cursor-pointer hover:border-primary">
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-bold">{product.price.toLocaleString('ru-RU')} ₽</span>
                {product.oldPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      {product.oldPrice.toLocaleString('ru-RU')} ₽
                    </span>
                    <span className="bg-destructive text-destructive-foreground px-2 py-1 rounded text-sm font-semibold">
                      -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <Separator />

            <div>
              <Label className="text-base font-semibold mb-3 block">Выберите размер</Label>
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map(size => (
                    <div key={size}>
                      <RadioGroupItem 
                        value={size} 
                        id={`size-${size}`} 
                        className="peer sr-only" 
                      />
                      <Label
                        htmlFor={`size-${size}`}
                        className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-semibold mb-3 block">Выберите цвет</Label>
              <RadioGroup value={selectedColor} onValueChange={setSelectedColor}>
                <div className="grid grid-cols-2 gap-2">
                  {product.colors.map(color => (
                    <div key={color}>
                      <RadioGroupItem 
                        value={color} 
                        id={`color-${color}`} 
                        className="peer sr-only" 
                      />
                      <Label
                        htmlFor={`color-${color}`}
                        className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        {color}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-semibold mb-3 block">Количество</Label>
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Icon name="Minus" size={16} />
                </Button>
                <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Icon name="Plus" size={16} />
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                size="lg" 
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <Icon name="ShoppingBag" size={20} className="mr-2" />
                {product.inStock ? 'Добавить в корзину' : 'Нет в наличии'}
              </Button>
              <Button size="lg" variant="outline">
                <Icon name="Heart" size={20} />
              </Button>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <Icon name="Truck" size={20} />
                <span>Бесплатная доставка от 5000₽</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Icon name="RefreshCw" size={20} />
                <span>Возврат в течение 30 дней</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Icon name="Shield" size={20} />
                <span>Гарантия качества</span>
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="description">
                <AccordionTrigger>Описание товара</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{product.description}</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="delivery">
                <AccordionTrigger>Доставка и оплата</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Доставка по Москве - 1-2 дня, по России - 3-7 дней.
                    Оплата: картой онлайн или наличными при получении.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="returns">
                <AccordionTrigger>Возврат и обмен</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Вы можете вернуть товар в течение 30 дней с момента покупки.
                    Товар должен быть в оригинальной упаковке и без следов использования.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Похожие товары</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map(p => (
                <Link key={p.id} to={`/product/${p.id}`} className="group">
                  <div className="bg-card rounded-lg overflow-hidden border transition-shadow hover:shadow-lg">
                    <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                      <img 
                        src={p.image} 
                        alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground mb-1">{p.brand}</p>
                      <h3 className="font-semibold mb-2 line-clamp-2">{p.name}</h3>
                      <span className="text-lg font-bold">{p.price.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}

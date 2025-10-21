import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { products } from '@/data/products';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const product = products.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Товар не найден</h2>
            <Button onClick={() => navigate('/catalog')}>Вернуться в каталог</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Выберите размер');
      return;
    }
    if (!selectedColor) {
      toast.error('Выберите цвет');
      return;
    }

    addItem(product, selectedSize, selectedColor, quantity);
    toast.success('Товар добавлен в корзину');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-8 flex-1">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Назад
        </Button>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="aspect-[3/4] overflow-hidden rounded-lg mb-4 bg-muted">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                      selectedImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold">{product.price.toLocaleString('ru-RU')} ₽</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {product.originalPrice.toLocaleString('ru-RU')} ₽
                  </span>
                )}
              </div>

              <div className="flex gap-2 mb-6">
                {product.isNew && <Badge>НОВИНКА</Badge>}
                {product.isSale && <Badge variant="destructive">SALE</Badge>}
                {product.inStock ? (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    В наличии
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-red-600 border-red-600">
                    Нет в наличии
                  </Badge>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Выберите размер</h3>
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <div key={size}>
                      <RadioGroupItem value={size} id={`size-${size}`} className="sr-only peer" />
                      <Label
                        htmlFor={`size-${size}`}
                        className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-muted bg-background hover:bg-muted cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground transition-colors"
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Выберите цвет</h3>
              <RadioGroup value={selectedColor} onValueChange={setSelectedColor}>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <div key={color}>
                      <RadioGroupItem value={color} id={`color-${color}`} className="sr-only peer" />
                      <Label
                        htmlFor={`color-${color}`}
                        className="flex px-4 h-12 items-center justify-center rounded-lg border-2 border-muted bg-background hover:bg-muted cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground transition-colors"
                      >
                        {color}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Количество</h3>
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

            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <Icon name="ShoppingBag" size={20} className="mr-2" />
                Добавить в корзину
              </Button>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-3">Описание</h3>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <div className="border-t pt-6 space-y-4">
              <div className="flex items-start gap-3">
                <Icon name="Truck" size={20} className="text-muted-foreground mt-1" />
                <div>
                  <p className="font-medium">Доставка по России</p>
                  <p className="text-sm text-muted-foreground">От 1 до 7 дней</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Icon name="RefreshCw" size={20} className="text-muted-foreground mt-1" />
                <div>
                  <p className="font-medium">Легкий возврат</p>
                  <p className="text-sm text-muted-foreground">В течение 14 дней</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Icon name="Shield" size={20} className="text-muted-foreground mt-1" />
                <div>
                  <p className="font-medium">Гарантия качества</p>
                  <p className="text-sm text-muted-foreground">Оригинальная продукция</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

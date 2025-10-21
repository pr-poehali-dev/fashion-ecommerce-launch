import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  description: string;
  category: string;
  brand: string;
  sizes: string[];
  colors: string[];
}

interface ProductPageProps {
  productId: number;
  onAddToCart: (product: any) => void;
  onBack: () => void;
}

export default function ProductPage({ productId, onAddToCart, onBack }: ProductPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const product: Product = {
    id: productId,
    name: 'Черная водолазка',
    price: 4990,
    images: [
      'https://cdn.poehali.dev/projects/baef792c-50c2-4af8-9a36-58ce57169685/files/9d51716b-8480-4233-ab80-78ac876508fb.jpg',
      'https://cdn.poehali.dev/projects/baef792c-50c2-4af8-9a36-58ce57169685/files/ba4443f2-076f-42ec-9e9c-536fe4c09ce9.jpg',
      'https://cdn.poehali.dev/projects/baef792c-50c2-4af8-9a36-58ce57169685/files/45e29006-f112-4368-90b3-705718bc6b92.jpg'
    ],
    description: 'Классическая черная водолазка из высококачественного трикотажа. Идеально подходит для создания базового гардероба. Комфортная посадка, не сковывает движения. Состав: 95% хлопок, 5% эластан.',
    category: 'Базовый гардероб',
    brand: 'NOIR',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Черный', 'Белый', 'Серый']
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Пожалуйста, выберите размер');
      return;
    }
    onAddToCart({
      ...product,
      selectedSize,
      selectedColor: selectedColor || product.colors[0]
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
        Назад к каталогу
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="aspect-[3/4] overflow-hidden rounded-lg mb-4 bg-muted">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((image, index) => (
              <div 
                key={index}
                className={`aspect-square overflow-hidden rounded-lg cursor-pointer border-2 ${
                  selectedImage === index ? 'border-primary' : 'border-transparent'
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img 
                  src={image} 
                  alt={`${product.name} - фото ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <Badge className="mb-3">{product.category}</Badge>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-3xl font-bold mb-6">{product.price.toLocaleString('ru-RU')} ₽</p>
          
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-6 mb-8">
            <div>
              <h3 className="font-semibold mb-3">Размер</h3>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border-2 rounded-lg font-medium transition-colors ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Цвет</h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border-2 rounded-lg font-medium transition-colors ${
                      selectedColor === color
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Button 
            size="lg" 
            className="w-full mb-4"
            onClick={handleAddToCart}
          >
            Добавить в корзину
          </Button>

          <div className="border-t pt-6 space-y-4">
            <div className="flex items-start gap-3">
              <Icon name="Truck" size={20} className="text-muted-foreground mt-1" />
              <div>
                <p className="font-medium">Бесплатная доставка</p>
                <p className="text-sm text-muted-foreground">При заказе от 5000 ₽</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Icon name="RefreshCw" size={20} className="text-muted-foreground mt-1" />
              <div>
                <p className="font-medium">Возврат 14 дней</p>
                <p className="text-sm text-muted-foreground">Без лишних вопросов</p>
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
  );
}

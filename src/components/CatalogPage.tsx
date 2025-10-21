import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  sizes: string[];
  colors: string[];
}

interface CatalogPageProps {
  onProductClick: (productId: number) => void;
  onAddToCart: (product: Product) => void;
}

export default function CatalogPage({ onProductClick, onAddToCart }: CatalogPageProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const products: Product[] = [
    {
      id: 1,
      name: 'Черная водолазка',
      price: 4990,
      image: 'https://cdn.poehali.dev/projects/baef792c-50c2-4af8-9a36-58ce57169685/files/9d51716b-8480-4233-ab80-78ac876508fb.jpg',
      category: 'Базовый гардероб',
      brand: 'NOIR',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Черный']
    },
    {
      id: 2,
      name: 'Белая рубашка',
      price: 3990,
      image: 'https://cdn.poehali.dev/projects/baef792c-50c2-4af8-9a36-58ce57169685/files/ba4443f2-076f-42ec-9e9c-536fe4c09ce9.jpg',
      category: 'Рубашки',
      brand: 'NOIR',
      sizes: ['S', 'M', 'L'],
      colors: ['Белый']
    },
    {
      id: 3,
      name: 'Бежевый тренч',
      price: 12990,
      image: 'https://cdn.poehali.dev/projects/baef792c-50c2-4af8-9a36-58ce57169685/files/058ae2e5-ef17-46e5-a721-30564cc9cdc3.jpg',
      category: 'Верхняя одежда',
      brand: 'Premium',
      sizes: ['M', 'L', 'XL'],
      colors: ['Бежевый']
    },
    {
      id: 4,
      name: 'Серый свитер',
      price: 5990,
      image: 'https://cdn.poehali.dev/projects/baef792c-50c2-4af8-9a36-58ce57169685/files/45e29006-f112-4368-90b3-705718bc6b92.jpg',
      category: 'Свитеры',
      brand: 'NOIR',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Серый']
    },
    {
      id: 5,
      name: 'Черная кожаная куртка',
      price: 15990,
      image: 'https://cdn.poehali.dev/projects/baef792c-50c2-4af8-9a36-58ce57169685/files/abca6b2b-047b-4121-9a55-623f1b9ceb85.jpg',
      category: 'Верхняя одежда',
      brand: 'Premium',
      sizes: ['M', 'L'],
      colors: ['Черный']
    },
    {
      id: 6,
      name: 'Синие джинсы',
      price: 6990,
      image: 'https://cdn.poehali.dev/projects/baef792c-50c2-4af8-9a36-58ce57169685/files/f19aa78e-492e-4ff1-a19d-8d87637c15ef.jpg',
      category: 'Брюки',
      brand: 'NOIR',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Синий']
    }
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Черный', 'Белый', 'Серый', 'Бежевый', 'Синий'];
  const brands = ['NOIR', 'Premium'];

  const toggleFilter = (filterArray: string[], setFilter: (arr: string[]) => void, value: string) => {
    if (filterArray.includes(value)) {
      setFilter(filterArray.filter(item => item !== value));
    } else {
      setFilter([...filterArray, value]);
    }
  };

  const filteredProducts = products.filter(product => {
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    const sizeMatch = selectedSizes.length === 0 || product.sizes.some(size => selectedSizes.includes(size));
    const colorMatch = selectedColors.length === 0 || product.colors.some(color => selectedColors.includes(color));
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    
    return priceMatch && sizeMatch && colorMatch && brandMatch;
  });

  const resetFilters = () => {
    setPriceRange([0, 15000]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedBrands([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Каталог</h1>
        <p className="text-muted-foreground">Найдено товаров: {filteredProducts.length}</p>
      </div>

      <div className="flex gap-8">
        <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0`}>
          <div className="sticky top-24 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Фильтры</h3>
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                Сбросить
              </Button>
            </div>

            <div>
              <h4 className="font-medium mb-3">Цена</h4>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={15000}
                step={500}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{priceRange[0]} ₽</span>
                <span>{priceRange[1]} ₽</span>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Размер</h4>
              <div className="space-y-2">
                {sizes.map((size) => (
                  <div key={size} className="flex items-center">
                    <Checkbox
                      id={`size-${size}`}
                      checked={selectedSizes.includes(size)}
                      onCheckedChange={() => toggleFilter(selectedSizes, setSelectedSizes, size)}
                    />
                    <Label htmlFor={`size-${size}`} className="ml-2 cursor-pointer">
                      {size}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Цвет</h4>
              <div className="space-y-2">
                {colors.map((color) => (
                  <div key={color} className="flex items-center">
                    <Checkbox
                      id={`color-${color}`}
                      checked={selectedColors.includes(color)}
                      onCheckedChange={() => toggleFilter(selectedColors, setSelectedColors, color)}
                    />
                    <Label htmlFor={`color-${color}`} className="ml-2 cursor-pointer">
                      {color}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Бренд</h4>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={() => toggleFilter(selectedBrands, setSelectedBrands, brand)}
                    />
                    <Label htmlFor={`brand-${brand}`} className="ml-2 cursor-pointer">
                      {brand}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Icon name="SlidersHorizontal" size={20} className="mr-2" />
              Фильтры
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group">
                <div 
                  className="aspect-[3/4] overflow-hidden rounded-lg mb-4 bg-muted cursor-pointer"
                  onClick={() => onProductClick(product.id)}
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                  <h3 
                    className="font-semibold cursor-pointer hover:underline"
                    onClick={() => onProductClick(product.id)}
                  >
                    {product.name}
                  </h3>
                  <p className="font-bold">{product.price.toLocaleString('ru-RU')} ₽</p>
                  <Button 
                    className="w-full"
                    onClick={() => onAddToCart(product)}
                  >
                    Добавить в корзину
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Товары не найдены</p>
              <Button onClick={resetFilters}>Сбросить фильтры</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

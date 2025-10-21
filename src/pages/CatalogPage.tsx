import { useState, useMemo } from 'react';
import { Product, Filters } from '@/types/product';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { allSizes, allColors, allBrands } from '@/data/products';

interface CatalogPageProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

export default function CatalogPage({ products, onProductClick }: CatalogPageProps) {
  const [filters, setFilters] = useState<Filters>({
    sizes: [],
    colors: [],
    brands: [],
    priceRange: [0, 30000]
  });

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (filters.sizes.length > 0 && !product.sizes.some(s => filters.sizes.includes(s))) {
        return false;
      }
      if (filters.colors.length > 0 && !product.colors.some(c => filters.colors.includes(c))) {
        return false;
      }
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }
      return true;
    });
  }, [products, filters]);

  const toggleFilter = (type: keyof Filters, value: string) => {
    setFilters(prev => {
      const currentArray = prev[type] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(v => v !== value)
        : [...currentArray, value];
      return { ...prev, [type]: newArray };
    });
  };

  const resetFilters = () => {
    setFilters({
      sizes: [],
      colors: [],
      brands: [],
      priceRange: [0, 30000]
    });
  };

  const FiltersContent = () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-semibold mb-4">Размер</h3>
        <div className="grid grid-cols-4 gap-2">
          {allSizes.map(size => (
            <div key={size} className="flex items-center">
              <Checkbox
                id={`size-${size}`}
                checked={filters.sizes.includes(size)}
                onCheckedChange={() => toggleFilter('sizes', size)}
              />
              <Label htmlFor={`size-${size}`} className="ml-2 cursor-pointer text-sm">
                {size}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Цвет</h3>
        <div className="space-y-2">
          {allColors.map(color => (
            <div key={color} className="flex items-center">
              <Checkbox
                id={`color-${color}`}
                checked={filters.colors.includes(color)}
                onCheckedChange={() => toggleFilter('colors', color)}
              />
              <Label htmlFor={`color-${color}`} className="ml-2 cursor-pointer flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full border border-border"
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
                <span className="text-sm">{color}</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Бренд</h3>
        <div className="space-y-2">
          {allBrands.map(brand => (
            <div key={brand} className="flex items-center">
              <Checkbox
                id={`brand-${brand}`}
                checked={filters.brands.includes(brand)}
                onCheckedChange={() => toggleFilter('brands', brand)}
              />
              <Label htmlFor={`brand-${brand}`} className="ml-2 cursor-pointer text-sm">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Цена</h3>
        <Slider
          value={filters.priceRange}
          onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
          max={30000}
          step={500}
          className="mb-4"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{filters.priceRange[0].toLocaleString('ru-RU')} ₽</span>
          <span>{filters.priceRange[1].toLocaleString('ru-RU')} ₽</span>
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={resetFilters}>
        Сбросить фильтры
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-8">Каталог</h1>

      <div className="flex gap-8">
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <FiltersContent />
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Найдено товаров: {filteredProducts.length}
            </p>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <Icon name="SlidersHorizontal" size={18} className="mr-2" />
                  Фильтры
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Фильтры</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FiltersContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="Package" size={64} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Товары не найдены</p>
              <Button variant="outline" className="mt-4" onClick={resetFilters}>
                Сбросить фильтры
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => onProductClick(product)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

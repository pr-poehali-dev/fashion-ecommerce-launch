import { useState, useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { Filters } from '@/components/catalog/Filters';
import { products, categories } from '@/data/products';
import { Filters as FiltersType } from '@/types/product';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [filters, setFilters] = useState<FiltersType>({
    sizes: [],
    colors: [],
    brands: [],
    priceRange: [0, 30000],
  });

  const maxPrice = Math.max(...products.map(p => p.price));

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (selectedCategory !== 'Все' && product.category !== selectedCategory) {
        return false;
      }

      if (filters.sizes.length > 0 && !filters.sizes.some(size => product.sizes.includes(size))) {
        return false;
      }

      if (filters.colors.length > 0 && !filters.colors.some(color => product.colors.includes(color))) {
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
  }, [selectedCategory, filters]);

  const resetFilters = () => {
    setFilters({
      sizes: [],
      colors: [],
      brands: [],
      priceRange: [0, maxPrice],
    });
    setSelectedCategory('Все');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Каталог</h1>
          <p className="text-muted-foreground">Найдите свой стиль</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 items-center">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              size="sm"
            >
              {category}
            </Button>
          ))}
          
          {(filters.sizes.length > 0 || 
            filters.colors.length > 0 || 
            filters.brands.length > 0 || 
            selectedCategory !== 'Все') && (
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              <Icon name="X" size={16} className="mr-2" />
              Сбросить фильтры
            </Button>
          )}
        </div>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">Фильтры</h2>
              </div>
              <Filters filters={filters} onFiltersChange={setFilters} maxPrice={maxPrice} />
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Найдено товаров: {filteredProducts.length}
              </p>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <Icon name="SlidersHorizontal" size={16} className="mr-2" />
                    Фильтры
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <div className="mt-6">
                    <h2 className="font-semibold mb-4">Фильтры</h2>
                    <Filters filters={filters} onFiltersChange={setFilters} maxPrice={maxPrice} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <Icon name="SearchX" size={64} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Товары не найдены</h3>
                <p className="text-muted-foreground mb-6">
                  Попробуйте изменить параметры фильтрации
                </p>
                <Button onClick={resetFilters}>Сбросить все фильтры</Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

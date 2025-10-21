import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Filters as FiltersType } from '@/types/product';
import { allBrands, allColors, allSizes } from '@/data/products';

interface FiltersProps {
  filters: FiltersType;
  onFiltersChange: (filters: FiltersType) => void;
  maxPrice: number;
}

export const Filters = ({ filters, onFiltersChange, maxPrice }: FiltersProps) => {
  const toggleArrayFilter = (key: keyof FiltersType, value: string) => {
    const currentArray = filters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    onFiltersChange({ ...filters, [key]: newArray });
  };

  return (
    <div className="w-full">
      <Accordion type="multiple" defaultValue={['size', 'color', 'brand', 'price']} className="w-full">
        <AccordionItem value="size">
          <AccordionTrigger className="text-sm font-semibold">Размер</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {allSizes.map(size => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox
                    id={`size-${size}`}
                    checked={filters.sizes.includes(size)}
                    onCheckedChange={() => toggleArrayFilter('sizes', size)}
                  />
                  <Label htmlFor={`size-${size}`} className="text-sm cursor-pointer">
                    {size}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="color">
          <AccordionTrigger className="text-sm font-semibold">Цвет</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {allColors.map(color => (
                <div key={color} className="flex items-center space-x-2">
                  <Checkbox
                    id={`color-${color}`}
                    checked={filters.colors.includes(color)}
                    onCheckedChange={() => toggleArrayFilter('colors', color)}
                  />
                  <Label htmlFor={`color-${color}`} className="text-sm cursor-pointer">
                    {color}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brand">
          <AccordionTrigger className="text-sm font-semibold">Бренд</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {allBrands.map(brand => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={filters.brands.includes(brand)}
                    onCheckedChange={() => toggleArrayFilter('brands', brand)}
                  />
                  <Label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer">
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-semibold">Цена</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                min={0}
                max={maxPrice}
                step={100}
                value={filters.priceRange}
                onValueChange={(value) =>
                  onFiltersChange({ ...filters, priceRange: value as [number, number] })
                }
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm">
                <span>{filters.priceRange[0].toLocaleString('ru-RU')} ₽</span>
                <span>{filters.priceRange[1].toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

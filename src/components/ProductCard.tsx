import { Product } from '@/types/product';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card 
      className="group cursor-pointer overflow-hidden border-0 shadow-none hover:shadow-lg transition-all duration-300"
      onClick={onClick}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {discount > 0 && (
          <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground">
            -{discount}%
          </Badge>
        )}
      </div>
      
      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
        <h3 className="font-medium mb-2 line-clamp-1">{product.name}</h3>
        
        <div className="flex items-center gap-2">
          <span className="font-semibold">{product.price.toLocaleString('ru-RU')} ₽</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {product.originalPrice.toLocaleString('ru-RU')} ₽
            </span>
          )}
        </div>

        <div className="flex gap-1 mt-3">
          {product.colors.slice(0, 4).map((color, index) => (
            <div
              key={index}
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
              title={color}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-xs text-muted-foreground ml-1">+{product.colors.length - 4}</span>
          )}
        </div>
      </div>
    </Card>
  );
}

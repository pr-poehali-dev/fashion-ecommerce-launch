import { Product } from '@/types/product';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';

interface HomePageProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onNavigate: (page: string) => void;
}

export default function HomePage({ products, onProductClick, onNavigate }: HomePageProps) {
  const featuredProducts = products.filter(p => p.featured);

  return (
    <div className="animate-fade-in">
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center bg-muted overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40" />
        <img 
          src="https://cdn.poehali.dev/projects/baef792c-50c2-4af8-9a36-58ce57169685/files/5724ba56-dea6-4143-a6d0-ed21e386c798.jpg" 
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 text-center px-4 text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            МИНИМАЛИЗМ<br />В КАЖДОЙ ДЕТАЛИ
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Откройте для себя коллекцию стильной одежды, созданной для тех, кто ценит качество и простоту
          </p>
          <Button 
            size="lg" 
            className="bg-white text-black hover:bg-white/90 font-semibold px-8"
            onClick={() => onNavigate('catalog')}
          >
            Смотреть каталог
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-primary-foreground">🚚</span>
            </div>
            <h3 className="font-semibold mb-2">Быстрая доставка</h3>
            <p className="text-sm text-muted-foreground">Доставка по России за 3-7 дней</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-primary-foreground">✓</span>
            </div>
            <h3 className="font-semibold mb-2">Гарантия качества</h3>
            <p className="text-sm text-muted-foreground">Только премиум материалы</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-primary-foreground">↻</span>
            </div>
            <h3 className="font-semibold mb-2">Легкий возврат</h3>
            <p className="text-sm text-muted-foreground">14 дней на возврат товара</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-8 text-center">Популярные товары</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={() => onProductClick(product)}
            />
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => onNavigate('catalog')}
          >
            Смотреть весь каталог
          </Button>
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Подпишитесь на новости</h2>
            <p className="text-muted-foreground mb-6">
              Получайте информацию о новых коллекциях и эксклюзивных предложениях
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Ваш email"
                className="flex-1 px-4 py-2 rounded border bg-background"
              />
              <Button>Подписаться</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

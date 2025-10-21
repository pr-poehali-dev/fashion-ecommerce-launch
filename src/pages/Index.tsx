import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

type Page = 'home' | 'catalog' | 'product' | 'cart' | 'checkout' | 'contacts';

export default function Index() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [cartItems, setCartItems] = useState<any[]>([]);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const featuredProducts = [
    {
      id: 1,
      name: 'Черная водолазка',
      price: 4990,
      image: 'https://cdn.poehali.dev/projects/baef792c-50c2-4af8-9a36-58ce57169685/files/9d51716b-8480-4233-ab80-78ac876508fb.jpg',
      category: 'Базовый гардероб'
    },
    {
      id: 2,
      name: 'Белая рубашка',
      price: 3990,
      image: 'https://cdn.poehali.dev/projects/baef792c-50c2-4af8-9a36-58ce57169685/files/ba4443f2-076f-42ec-9e9c-536fe4c09ce9.jpg',
      category: 'Рубашки'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        cartItemsCount={cartItems.length} 
        onCartClick={() => handleNavigate('cart')}
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />

      <main className="flex-1">
        <section className="relative h-[600px] md:h-[700px] flex items-center">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://cdn.poehali.dev/projects/baef792c-50c2-4af8-9a36-58ce57169685/files/682e199d-1237-4cb7-8121-fd0c838afe67.jpg)'
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Минимализм в каждой детали
              </h1>
              <p className="text-lg md:text-xl mb-8 text-white/90">
                Откройте для себя коллекцию стильной и качественной одежды
              </p>
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-white/90"
                onClick={() => handleNavigate('catalog')}
              >
                Смотреть коллекцию
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Избранное</h2>
              <p className="text-muted-foreground">Самые популярные модели этого сезона</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="group cursor-pointer"
                  onClick={() => handleNavigate('product')}
                >
                  <div className="aspect-[3/4] overflow-hidden rounded-lg mb-4 bg-muted">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="font-bold">{product.price.toLocaleString('ru-RU')} ₽</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => handleNavigate('catalog')}
              >
                Все товары
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Icon name="Truck" size={28} />
                </div>
                <h3 className="font-semibold mb-2">Бесплатная доставка</h3>
                <p className="text-sm text-muted-foreground">При заказе от 5000 ₽</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Icon name="RefreshCw" size={28} />
                </div>
                <h3 className="font-semibold mb-2">Легкий возврат</h3>
                <p className="text-sm text-muted-foreground">14 дней на возврат товара</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Icon name="Shield" size={28} />
                </div>
                <h3 className="font-semibold mb-2">Гарантия качества</h3>
                <p className="text-sm text-muted-foreground">Только проверенные бренды</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Подпишитесь на новости</h2>
            <p className="text-muted-foreground mb-8">
              Получайте информацию о новых коллекциях и эксклюзивных предложениях
            </p>
            <form className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Ваш email"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button type="submit">Подписаться</Button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

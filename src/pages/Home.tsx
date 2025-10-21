import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/ProductCard';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { products } from '@/data/products';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

export default function Home() {
  const newProducts = products.filter(p => p.isNew).slice(0, 4);
  const saleProducts = products.filter(p => p.isSale).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://cdn.poehali.dev/projects/baef792c-50c2-4af8-9a36-58ce57169685/files/1eac8f98-702a-4626-a2a8-848abddcb7da.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Новая коллекция
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in">
            Минимализм и стиль в каждой детали
          </p>
          <Link to="/catalog">
            <Button size="lg" className="animate-fade-in">
              Смотреть каталог
            </Button>
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Icon name="Truck" size={32} className="text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Быстрая доставка</h3>
            <p className="text-sm text-muted-foreground">
              Доставка по России от 1 дня
            </p>
          </div>

          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Icon name="Shield" size={32} className="text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Гарантия качества</h3>
            <p className="text-sm text-muted-foreground">
              Проверенные бренды и материалы
            </p>
          </div>

          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Icon name="RefreshCw" size={32} className="text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Легкий возврат</h3>
            <p className="text-sm text-muted-foreground">
              Возврат товара в течение 14 дней
            </p>
          </div>
        </div>
      </section>

      {newProducts.length > 0 && (
        <section className="container mx-auto px-4 py-16 border-t">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Новинки</h2>
            <Link to="/catalog">
              <Button variant="outline">Все новинки</Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {newProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {saleProducts.length > 0 && (
        <section className="container mx-auto px-4 py-16 border-t">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Распродажа</h2>
            <Link to="/catalog">
              <Button variant="outline">Все товары со скидкой</Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {saleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <section className="bg-muted/40 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Часто задаваемые вопросы</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Как долго идет доставка?</AccordionTrigger>
                <AccordionContent>
                  Доставка по Москве осуществляется в течение 1-2 дней, по России - от 3 до 7 дней в зависимости от региона.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Можно ли вернуть товар?</AccordionTrigger>
                <AccordionContent>
                  Да, вы можете вернуть товар в течение 14 дней с момента получения, если он не был в использовании и сохранена товарная упаковка.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Какие способы оплаты доступны?</AccordionTrigger>
                <AccordionContent>
                  Мы принимаем оплату картами Visa, MasterCard, МИР, а также через СБП и электронные кошельки.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Как узнать свой размер?</AccordionTrigger>
                <AccordionContent>
                  На странице каждого товара есть подробная размерная сетка. Также вы можете связаться с нашей поддержкой для консультации.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function HomePage() {
  const categories = [
    {
      title: 'Новая коллекция',
      description: 'Осень-Зима 2025',
      image: 'https://cdn.poehali.dev/projects/baef792c-50c2-4af8-9a36-58ce57169685/files/3134346f-0bac-45ce-9873-7b32dc0ee654.jpg',
    },
    {
      title: 'Базовый гардероб',
      description: 'Стиль на каждый день',
      image: 'https://cdn.poehali.dev/projects/baef792c-50c2-4af8-9a36-58ce57169685/files/9d25ba07-b54c-4054-aeee-ab7c4cfcac0f.jpg',
    },
    {
      title: 'Аксессуары',
      description: 'Завершающие штрихи',
      image: 'https://cdn.poehali.dev/projects/baef792c-50c2-4af8-9a36-58ce57169685/files/b58b6f5b-b892-4a5a-88c4-c8de84733d86.jpg',
    },
  ];

  const features = [
    {
      icon: 'Truck',
      title: 'Бесплатная доставка',
      description: 'При заказе от 5000₽',
    },
    {
      icon: 'RefreshCw',
      title: 'Возврат 30 дней',
      description: 'Без лишних вопросов',
    },
    {
      icon: 'Shield',
      title: 'Гарантия качества',
      description: 'Проверенные бренды',
    },
    {
      icon: 'Headphones',
      title: 'Поддержка 24/7',
      description: 'Всегда на связи',
    },
  ];

  const faqItems = [
    {
      question: 'Как оформить заказ?',
      answer: 'Выберите понравившиеся товары, добавьте их в корзину и перейдите к оформлению. Заполните форму с контактными данными и адресом доставки.',
    },
    {
      question: 'Какие способы оплаты доступны?',
      answer: 'Мы принимаем оплату банковскими картами (Visa, Mastercard, МИР), электронными кошельками и наличными при получении.',
    },
    {
      question: 'Сколько времени занимает доставка?',
      answer: 'Доставка по Москве занимает 1-2 дня, по России - 3-7 дней в зависимости от региона. При оформлении заказа вы получите точный срок доставки.',
    },
    {
      question: 'Могу ли я вернуть товар?',
      answer: 'Да, вы можете вернуть товар в течение 30 дней с момента получения, если он не был в использовании и сохранена оригинальная упаковка.',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-br from-muted to-background overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://cdn.poehali.dev/projects/baef792c-50c2-4af8-9a36-58ce57169685/files/3134346f-0bac-45ce-9873-7b32dc0ee654.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 text-center space-y-6 px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            НОВАЯ КОЛЛЕКЦИЯ
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Стиль, который подчеркивает вашу индивидуальность
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/catalog">
              <Button size="lg" className="text-base px-8">
                Смотреть каталог
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-base px-8">
              Узнать больше
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link 
              key={index}
              to="/catalog"
              className="group relative overflow-hidden rounded-lg aspect-[3/4] animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img 
                src={category.image} 
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                <p className="text-white/80 text-sm mb-1">{category.description}</p>
                <h3 className="text-white text-2xl font-bold mb-3">{category.title}</h3>
                <Button variant="secondary" size="sm" className="w-fit">
                  Смотреть
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="text-center space-y-3 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground">
                  <Icon name={feature.icon as any} size={24} />
                </div>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Часто задаваемые вопросы
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base font-semibold">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Подпишитесь на рассылку
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Получайте информацию о новых коллекциях и эксклюзивных предложениях
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Ваш email"
              className="flex-1 px-4 py-3 rounded-md text-foreground"
            />
            <Button variant="secondary" size="lg">
              Подписаться
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

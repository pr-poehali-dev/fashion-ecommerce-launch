import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

export default function ContactsPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Сообщение отправлено!",
      description: "Мы свяжемся с вами в ближайшее время.",
    });

    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Контакты</h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Свяжитесь с нами любым удобным способом. Мы всегда рады помочь!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-8">Форма обратной связи</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Ваше имя *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="subject">Тема сообщения</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="message">Сообщение *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  rows={6}
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full md:w-auto">
                Отправить сообщение
              </Button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-8">Информация для связи</h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="MapPin" size={24} className="text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Адрес магазина</h3>
                  <p className="text-muted-foreground">
                    г. Москва, ул. Примерная, д. 123<br />
                    Ежедневно с 10:00 до 21:00
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="Phone" size={24} className="text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Телефон</h3>
                  <a href="tel:+79001234567" className="text-muted-foreground hover:text-foreground transition-colors">
                    +7 (900) 123-45-67
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">Пн-Вс, 9:00 - 22:00</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="Mail" size={24} className="text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a href="mailto:info@minimalist.ru" className="text-muted-foreground hover:text-foreground transition-colors">
                    info@minimalist.ru
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">Ответим в течение 24 часов</p>
                </div>
              </div>
            </div>

            <div className="bg-muted rounded-lg p-6">
              <h3 className="font-semibold mb-4">Мы в социальных сетях</h3>
              <div className="flex gap-4">
                <a 
                  href="#" 
                  className="w-10 h-10 bg-background rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Icon name="Instagram" size={20} />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-background rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Icon name="Facebook" size={20} />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-background rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Icon name="Twitter" size={20} />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-background rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Icon name="MessageCircle" size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Часто задаваемые вопросы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-background rounded-lg p-6">
              <h3 className="font-semibold mb-2">Как отследить мой заказ?</h3>
              <p className="text-sm text-muted-foreground">
                После отправки вы получите трек-номер на email для отслеживания доставки.
              </p>
            </div>
            <div className="bg-background rounded-lg p-6">
              <h3 className="font-semibold mb-2">Можно ли обменять товар?</h3>
              <p className="text-sm text-muted-foreground">
                Да, обмен возможен в течение 14 дней при сохранении товарного вида.
              </p>
            </div>
            <div className="bg-background rounded-lg p-6">
              <h3 className="font-semibold mb-2">Есть ли программа лояльности?</h3>
              <p className="text-sm text-muted-foreground">
                Да, зарегистрированные пользователи получают бонусы за покупки.
              </p>
            </div>
            <div className="bg-background rounded-lg p-6">
              <h3 className="font-semibold mb-2">Как узнать свой размер?</h3>
              <p className="text-sm text-muted-foreground">
                На каждой карточке товара есть таблица размеров с подробными измерениями.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

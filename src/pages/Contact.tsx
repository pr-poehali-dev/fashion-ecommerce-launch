import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Заполните все обязательные поля');
      return;
    }

    toast.success('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Свяжитесь с нами</h1>
            <p className="text-lg text-muted-foreground">
              Мы всегда рады помочь вам с любыми вопросами
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Контактная информация</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="MapPin" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Адрес</h3>
                      <p className="text-muted-foreground">
                        г. Москва, ул. Примерная, д. 123
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Phone" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Телефон</h3>
                      <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                      <p className="text-sm text-muted-foreground">Пн-Пт: 9:00 - 20:00</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Mail" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-muted-foreground">info@style-shop.ru</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Clock" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Режим работы</h3>
                      <p className="text-muted-foreground">Пн-Вс: 10:00 - 21:00</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Мы в соцсетях</h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="h-12 w-12 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Icon name="Instagram" size={24} />
                  </a>
                  <a
                    href="#"
                    className="h-12 w-12 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Icon name="Facebook" size={24} />
                  </a>
                  <a
                    href="#"
                    className="h-12 w-12 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Icon name="Twitter" size={24} />
                  </a>
                </div>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit} className="border rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Напишите нам</h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Имя *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ваше имя"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="example@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Тема</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Тема сообщения"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Сообщение *</Label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Расскажите, чем мы можем вам помочь"
                      rows={6}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Отправить сообщение
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

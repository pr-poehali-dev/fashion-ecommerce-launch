import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">ELEGANCE</h3>
            <p className="text-sm text-muted-foreground">
              Стильная одежда для современных людей
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <Icon name="Instagram" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Facebook" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Twitter" size={20} />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Покупателям</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#catalog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Каталог
                </a>
              </li>
              <li>
                <a href="#delivery" className="text-muted-foreground hover:text-foreground transition-colors">
                  Доставка и оплата
                </a>
              </li>
              <li>
                <a href="#returns" className="text-muted-foreground hover:text-foreground transition-colors">
                  Возврат товара
                </a>
              </li>
              <li>
                <a href="#size-guide" className="text-muted-foreground hover:text-foreground transition-colors">
                  Таблица размеров
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Информация</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                  О нас
                </a>
              </li>
              <li>
                <a href="#contacts" className="text-muted-foreground hover:text-foreground transition-colors">
                  Контакты
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Политика конфиденциальности
                </a>
              </li>
              <li>
                <a href="#terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Условия использования
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center space-x-2">
                <Icon name="Phone" size={16} />
                <span>+7 (999) 123-45-67</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="Mail" size={16} />
                <span>info@elegance.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} />
                <span>Москва, ул. Примерная, 1</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2025 ELEGANCE. Все права защищены.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <img src="https://placehold.co/50x30/png?text=VISA" alt="Visa" className="h-6" />
            <img src="https://placehold.co/50x30/png?text=MC" alt="Mastercard" className="h-6" />
            <img src="https://placehold.co/50x30/png?text=MIR" alt="Mir" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
}
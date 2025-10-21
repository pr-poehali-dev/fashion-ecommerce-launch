import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

type Page = 'home' | 'catalog' | 'product' | 'checkout' | 'contacts';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onNavigate: (page: Page) => void;
  currentPage: Page;
}

export default function Header({ cartItemsCount, onCartClick, onNavigate, currentPage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <button onClick={() => onNavigate('home')} className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold tracking-tight">ELEGANCE</h1>
          </button>

          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => onNavigate('home')} 
              className={`text-sm font-medium transition-colors hover:text-primary ${currentPage === 'home' ? 'text-primary' : ''}`}
            >
              Главная
            </button>
            <button 
              onClick={() => onNavigate('catalog')} 
              className={`text-sm font-medium transition-colors hover:text-primary ${currentPage === 'catalog' ? 'text-primary' : ''}`}
            >
              Каталог
            </button>
            <button 
              onClick={() => onNavigate('contacts')} 
              className={`text-sm font-medium transition-colors hover:text-primary ${currentPage === 'contacts' ? 'text-primary' : ''}`}
            >
              Контакты
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Icon name="Search" size={20} />
            </Button>
            
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Icon name="User" size={20} />
            </Button>
            
            <Button variant="ghost" size="icon" className="relative" onClick={onCartClick}>
              <Icon name="ShoppingBag" size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Button>

            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-4 border-t animate-fade-in">
            <button 
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className="block py-2 text-sm font-medium hover:text-primary w-full text-left"
            >
              Главная
            </button>
            <button 
              onClick={() => { onNavigate('catalog'); setMobileMenuOpen(false); }}
              className="block py-2 text-sm font-medium hover:text-primary w-full text-left"
            >
              Каталог
            </button>
            <button 
              onClick={() => { onNavigate('contacts'); setMobileMenuOpen(false); }}
              className="block py-2 text-sm font-medium hover:text-primary w-full text-left"
            >
              Контакты
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
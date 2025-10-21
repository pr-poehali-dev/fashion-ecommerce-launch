import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Классическая белая футболка',
    brand: 'Essential',
    price: 2990,
    image: 'https://cdn.poehali.dev/projects/baef792c-50c2-4af8-9a36-58ce57169685/files/afc81104-869a-44c0-824e-945094d7f96e.jpg',
    category: 'Футболки',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Белый', 'Черный', 'Серый'],
    description: 'Базовая футболка из 100% органического хлопка. Идеально подходит для создания минималистичных образов.',
    featured: true
  },
  {
    id: '2',
    name: 'Черная водолазка',
    brand: 'Premium',
    price: 4990,
    image: 'https://cdn.poehali.dev/projects/baef792c-50c2-4af8-9a36-58ce57169685/files/71f3aaa8-a777-495e-8e9a-3a0f55d0878a.jpg',
    category: 'Водолазки',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Черный', 'Бежевый', 'Серый'],
    description: 'Элегантная водолазка из мериносовой шерсти. Тепло и стильно.',
    featured: true
  },
  {
    id: '3',
    name: 'Минималистичные джинсы',
    brand: 'Denim Co',
    price: 6990,
    originalPrice: 8990,
    image: 'https://cdn.poehali.dev/projects/baef792c-50c2-4af8-9a36-58ce57169685/files/b7481fc6-3b69-493c-bcf4-904bd2e7b164.jpg',
    category: 'Джинсы',
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Синий', 'Черный'],
    description: 'Прямые джинсы классического кроя. Универсальная модель на каждый день.',
    featured: true
  },
  {
    id: '4',
    name: 'Оверсайз худи',
    brand: 'Street',
    price: 5490,
    image: 'https://cdn.poehali.dev/projects/baef792c-50c2-4af8-9a36-58ce57169685/files/b7a24f2d-ea18-4fb2-b9c5-5d7c6dba17a7.jpg',
    category: 'Худи',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Черный', 'Серый', 'Бежевый', 'Белый'],
    description: 'Комфортное худи свободного кроя. Идеально для повседневной носки.',
    featured: false
  },
  {
    id: '5',
    name: 'Рубашка из льна',
    brand: 'Natural',
    price: 5990,
    image: 'https://cdn.poehali.dev/projects/baef792c-50c2-4af8-9a36-58ce57169685/files/b7481fc6-3b69-493c-bcf4-904bd2e7b164.jpg',
    category: 'Рубашки',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Белый', 'Бежевый', 'Голубой'],
    description: 'Легкая льняная рубашка. Дышащая ткань для жарких дней.',
    featured: false
  },
  {
    id: '6',
    name: 'Кожаная куртка',
    brand: 'Premium',
    price: 24990,
    originalPrice: 29990,
    image: 'https://cdn.poehali.dev/projects/baef792c-50c2-4af8-9a36-58ce57169685/files/1eac8f98-702a-4626-a2a8-848abddcb7da.jpg',
    category: 'Куртки',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Черный', 'Коричневый'],
    description: 'Классическая куртка из натуральной кожи. Вневременной стиль.',
    featured: true
  },
  {
    id: '7',
    name: 'Спортивные брюки',
    brand: 'Active',
    price: 3990,
    image: 'https://cdn.poehali.dev/projects/baef792c-50c2-4af8-9a36-58ce57169685/files/b7a24f2d-ea18-4fb2-b9c5-5d7c6dba17a7.jpg',
    category: 'Брюки',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Черный', 'Серый', 'Синий'],
    description: 'Удобные брюки для активного образа жизни.',
    featured: false
  },
  {
    id: '8',
    name: 'Шерстяной свитер',
    brand: 'Warm',
    price: 7990,
    image: 'https://cdn.poehali.dev/projects/baef792c-50c2-4af8-9a36-58ce57169685/files/1eac8f98-702a-4626-a2a8-848abddcb7da.jpg',
    category: 'Свитера',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Серый', 'Бежевый', 'Черный'],
    description: 'Теплый свитер из шерсти мериноса. Для холодных дней.',
    featured: false
  }
];

export const categories = ['Все', 'Футболки', 'Водолазки', 'Джинсы', 'Худи', 'Рубашки', 'Куртки', 'Брюки', 'Свитера'];
export const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36'];
export const allColors = ['Белый', 'Черный', 'Серый', 'Бежевый', 'Синий', 'Голубой', 'Коричневый'];
export const allBrands = ['Essential', 'Premium', 'Denim Co', 'Street', 'Natural', 'Active', 'Warm'];

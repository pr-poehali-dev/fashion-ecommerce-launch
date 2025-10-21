import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartSheet from '@/components/CartSheet';
import HomePage from '@/pages/HomePage';
import CatalogPage from '@/pages/CatalogPage';
import ProductPage from '@/pages/ProductPage';
import CheckoutPage from '@/pages/CheckoutPage';
import ContactsPage from '@/pages/ContactsPage';
import { Toaster } from '@/components/ui/toaster';
import { Product, CartItem } from '@/types/product';
import { products } from '@/data/products';

type Page = 'home' | 'catalog' | 'product' | 'checkout' | 'contacts';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };

  const handleAddToCart = (size: string, color: string) => {
    if (!selectedProduct) return;

    const existingItemIndex = cartItems.findIndex(
      item =>
        item.product.id === selectedProduct.id &&
        item.size === size &&
        item.color === color
    );

    if (existingItemIndex >= 0) {
      const newCart = [...cartItems];
      newCart[existingItemIndex].quantity += 1;
      setCartItems(newCart);
    } else {
      setCartItems([...cartItems, {
        product: selectedProduct,
        size,
        color,
        quantity: 1
      }]);
    }

    setCartOpen(true);
  };

  const handleRemoveFromCart = (index: number) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    const newCart = [...cartItems];
    newCart[index].quantity = quantity;
    setCartItems(newCart);
  };

  const handleCheckout = () => {
    setCartOpen(false);
    setCurrentPage('checkout');
  };

  const handleOrderComplete = () => {
    setCartItems([]);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            products={products}
            onProductClick={handleProductClick}
            onNavigate={handleNavigate}
          />
        );
      case 'catalog':
        return (
          <CatalogPage
            products={products}
            onProductClick={handleProductClick}
          />
        );
      case 'product':
        return selectedProduct ? (
          <ProductPage
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onBack={() => handleNavigate('catalog')}
          />
        ) : null;
      case 'checkout':
        return (
          <CheckoutPage
            items={cartItems}
            onBack={() => setCartOpen(true)}
            onOrderComplete={handleOrderComplete}
          />
        );
      case 'contacts':
        return <ContactsPage />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setCartOpen(true)}
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />

      <main className="flex-1">
        {renderPage()}
      </main>

      <Footer />

      <CartSheet
        open={cartOpen}
        onOpenChange={setCartOpen}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
      />

      <Toaster />
    </div>
  );
}

export default App;

import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  prices: { shop: string; price: number; currency: string }[];
  rating: number;
  reviews: number;
}

interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  text: string;
}

interface CartItem extends Product {
  selectedShop: string;
  selectedPrice: number;
}

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  const products: Product[] = [
    {
      id: 1,
      name: 'Беспроводные наушники',
      description: 'Premium качество звука с шумоподавлением',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
      prices: [
        { shop: 'TechStore', price: 8999, currency: '₽' },
        { shop: 'ElectroMarket', price: 9499, currency: '₽' },
        { shop: 'GadgetHub', price: 8750, currency: '₽' },
      ],
      rating: 4.8,
      reviews: 234,
    },
    {
      id: 2,
      name: 'Умные часы',
      description: 'Фитнес-трекер с множеством функций',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
      prices: [
        { shop: 'WatchWorld', price: 15999, currency: '₽' },
        { shop: 'TechStore', price: 16500, currency: '₽' },
        { shop: 'SmartGear', price: 15499, currency: '₽' },
      ],
      rating: 4.6,
      reviews: 189,
    },
    {
      id: 3,
      name: 'Рюкзак для ноутбука',
      description: 'Водонепроницаемый, вместительный',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
      prices: [
        { shop: 'BagShop', price: 3499, currency: '₽' },
        { shop: 'TravelGear', price: 3799, currency: '₽' },
        { shop: 'UrbanStyle', price: 3299, currency: '₽' },
      ],
      rating: 4.7,
      reviews: 156,
    },
    {
      id: 4,
      name: 'Кроссовки спортивные',
      description: 'Комфорт и стиль для активной жизни',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
      prices: [
        { shop: 'SportZone', price: 6999, currency: '₽' },
        { shop: 'RunStyle', price: 7299, currency: '₽' },
        { shop: 'AthleteShop', price: 6799, currency: '₽' },
      ],
      rating: 4.9,
      reviews: 412,
    },
  ];

  const reviews: Review[] = [
    {
      id: 1,
      name: 'Анна Смирнова',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna',
      rating: 5,
      text: 'Отличный сервис! Нашла самую выгодную цену на телефон. Экономия составила почти 3000 рублей!',
    },
    {
      id: 2,
      name: 'Дмитрий Иванов',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry',
      rating: 5,
      text: 'Удобно сравнивать цены в разных магазинах. Интерфейс простой и понятный.',
    },
    {
      id: 3,
      name: 'Елена Петрова',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
      rating: 4,
      text: 'Хороший выбор товаров, быстрая доставка информации. Рекомендую!',
    },
  ];

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const addToCart = (product: Product) => {
    const lowestPrice = product.prices.reduce((min, p) =>
      p.price < min.price ? p : min
    );
    const cartItem: CartItem = {
      ...product,
      selectedShop: lowestPrice.shop,
      selectedPrice: lowestPrice.price,
    };
    setCart((prev) => [...prev, cartItem]);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.selectedPrice, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover-scale">
                    <Icon name="Menu" size={24} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <nav className="flex flex-col gap-4 mt-8">
                    <a
                      href="#"
                      className="text-lg font-medium hover:text-primary transition-colors story-link"
                    >
                      Как заказать
                    </a>
                    <a
                      href="#"
                      className="text-lg font-medium hover:text-primary transition-colors story-link"
                    >
                      Поддержка
                    </a>
                    <a
                      href="#"
                      className="text-lg font-medium hover:text-primary transition-colors story-link"
                    >
                      Регистрация/Вход
                    </a>
                    <a
                      href="#"
                      className="text-lg font-medium hover:text-primary transition-colors story-link"
                    >
                      Контакты
                    </a>
                  </nav>
                </SheetContent>
              </Sheet>

              <h1 className="text-3xl font-bold text-primary font-montserrat">
                NEXTON
              </h1>

              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover-scale"
                  onClick={() => setSearchOpen(!searchOpen)}
                >
                  <Icon name="Search" size={20} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover-scale relative"
                >
                  <Icon name="Heart" size={20} />
                  {favorites.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-orange-500">
                      {favorites.length}
                    </Badge>
                  )}
                </Button>
                <Sheet open={cartOpen} onOpenChange={setCartOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover-scale relative"
                    >
                      <Icon name="ShoppingCart" size={20} />
                      {cart.length > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-orange-500">
                          {cart.length}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-full sm:max-w-lg">
                    <div className="flex flex-col h-full">
                      <h2 className="text-2xl font-bold mb-6">Корзина</h2>
                      {cart.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center text-gray-400">
                          <div className="text-center">
                            <Icon name="ShoppingCart" size={64} className="mx-auto mb-4 opacity-30" />
                            <p>Корзина пуста</p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex-1 overflow-auto space-y-4">
                            {cart.map((item, index) => (
                              <Card key={index}>
                                <CardContent className="p-4">
                                  <div className="flex gap-4">
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-20 h-20 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                      <h3 className="font-medium">{item.name}</h3>
                                      <p className="text-sm text-gray-500">
                                        {item.selectedShop}
                                      </p>
                                      <p className="text-lg font-bold text-primary mt-1">
                                        {item.selectedPrice} ₽
                                      </p>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => removeFromCart(index)}
                                    >
                                      <Icon name="X" size={20} />
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                          <div className="border-t pt-4 mt-4">
                            <div className="flex justify-between items-center mb-4">
                              <span className="text-lg font-medium">Итого:</span>
                              <span className="text-2xl font-bold text-primary">
                                {cartTotal} ₽
                              </span>
                            </div>
                            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                              Оформить заказ
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </SheetContent>
                </Sheet>
                <Button variant="ghost" size="icon" className="hover-scale">
                  <Icon name="User" size={20} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t bg-gray-50 animate-fade-in">
            <div className="container mx-auto px-4 py-4">
              <div className="relative max-w-2xl mx-auto">
                <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery('');
                  }}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-6">
            <a
              href="#"
              className="font-medium hover:text-primary transition-colors"
            >
              Главная
            </a>
            <a
              href="#"
              className="font-medium hover:text-primary transition-colors"
            >
              Каталог
            </a>
            <a
              href="#"
              className="font-medium hover:text-primary transition-colors"
            >
              Категории
            </a>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-blue-600 to-orange-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-4 font-montserrat animate-fade-in">
            Сравнивайте цены по всему миру
          </h2>
          <p className="text-xl mb-8 animate-fade-in">
            Находите лучшие предложения от разных магазинов в одном месте
          </p>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-gray-100 text-lg px-8 hover-scale"
            onClick={() => {
              const catalogSection = document.getElementById('catalog');
              catalogSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Начать покупки
          </Button>
        </div>
      </section>

      <section id="catalog" className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold font-montserrat">Популярные товары</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Icon name="SlidersHorizontal" size={16} className="mr-2" />
              Фильтры
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="ArrowUpDown" size={16} className="mr-2" />
              Сортировка
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-in"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className={`absolute top-2 right-2 bg-white/90 hover:bg-white ${
                    favorites.includes(product.id) ? 'text-red-500' : ''
                  }`}
                  onClick={() => toggleFavorite(product.id)}
                >
                  <Icon
                    name={favorites.includes(product.id) ? 'Heart' : 'Heart'}
                    size={20}
                    className={favorites.includes(product.id) ? 'fill-current' : ''}
                  />
                </Button>
              </div>
              <CardContent className="p-4">
                <h3 
                  className="font-bold text-lg mb-2 cursor-pointer hover:text-primary transition-colors"
                  onClick={() => setSelectedProduct(product)}
                >
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                <div className="flex items-center gap-1 mb-3">
                  <Icon name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-gray-500">
                    ({product.reviews} отзывов)
                  </span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Лучшая цена:</span>
                    <span className="text-2xl font-bold text-primary">
                      {Math.min(...product.prices.map((p) => p.price))} ₽
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {product.prices.length} магазинов
                  </p>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex gap-2">
                <Button variant="outline" className="flex-1 hover-scale">
                  Магазины
                </Button>
                <Button
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white hover-scale"
                  onClick={() => addToCart(product)}
                >
                  В корзину
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 font-montserrat">
            Отзывы покупателей
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <Card key={review.id} className="animate-fade-in hover-scale">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar>
                      <AvatarImage src={review.avatar} />
                      <AvatarFallback>{review.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{review.name}</h3>
                      <div className="flex gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={14}
                            className="fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
          {selectedProduct && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
              <div className="lg:col-span-2">
                <DialogHeader>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-4 z-10"
                    onClick={() => setSelectedProduct(null)}
                  >
                    <Icon name="X" size={24} />
                  </Button>
                </DialogHeader>

                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-96 object-cover rounded-lg mb-6"
                />

                <h1 className="text-3xl font-bold mb-4 font-montserrat">
                  {selectedProduct.name}
                </h1>

                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={20} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-medium">{selectedProduct.rating}</span>
                  </div>
                  <span className="text-gray-500">
                    ({selectedProduct.reviews} отзывов)
                  </span>
                </div>

                <Separator className="my-6" />

                <div>
                  <h2 className="text-xl font-bold mb-4">Описание</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {selectedProduct.description}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Этот товар доступен в {selectedProduct.prices.length} магазинах по разным ценам.
                    Выберите наиболее подходящее предложение справа и совершите выгодную покупку!
                  </p>
                </div>

                <Separator className="my-6" />

                <div>
                  <h2 className="text-xl font-bold mb-4">Отзывы покупателей</h2>
                  <div className="space-y-4">
                    {reviews.slice(0, 2).map((review) => (
                      <Card key={review.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={review.avatar} />
                              <AvatarFallback>{review.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{review.name}</h3>
                              <div className="flex gap-1">
                                {Array.from({ length: review.rating }).map((_, i) => (
                                  <Icon
                                    key={i}
                                    name="Star"
                                    size={14}
                                    className="fill-yellow-400 text-yellow-400"
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-600">{review.text}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-6">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-bold mb-4">Сравнение цен</h2>
                      <div className="space-y-4">
                        {selectedProduct.prices
                          .sort((a, b) => a.price - b.price)
                          .map((priceInfo, index) => (
                            <div
                              key={index}
                              className={`p-4 rounded-lg border-2 transition-all ${
                                index === 0
                                  ? 'border-primary bg-blue-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold">{priceInfo.shop}</h3>
                                    {index === 0 && (
                                      <Badge className="bg-green-500">
                                        Лучшая цена
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-2xl font-bold text-primary">
                                    {priceInfo.price} {priceInfo.currency}
                                  </p>
                                </div>
                              </div>
                              {index > 0 && (
                                <p className="text-sm text-gray-500 mb-3">
                                  +{priceInfo.price - selectedProduct.prices.sort((a, b) => a.price - b.price)[0].price} ₽ дороже
                                </p>
                              )}
                              <Button
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                                onClick={() => {
                                  addToCart(selectedProduct);
                                  setSelectedProduct(null);
                                }}
                              >
                                Купить здесь
                              </Button>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 font-montserrat">NEXTON</h3>
              <p className="text-gray-400">
                Международный маркетплейс для выгодных покупок
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Покупателям</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Как заказать
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Доставка
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Оплата
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Компания</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    О нас
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Контакты
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Вакансии
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Соцсети</h4>
              <div className="flex gap-3">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Icon name="Facebook" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Icon name="Twitter" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 NEXTON. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
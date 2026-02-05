import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Flame, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import RequestQuoteModal from '@/components/rfq/RequestQuoteModal';

const products = [
  {
    id: 1,
    name: 'Wireless Bluetooth Earbuds Pro',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80',
    price: 12.50,
    priceRange: '$12.50 - $18.00',
    moq: 100,
    rating: 4.8,
    reviews: 256,
    verified: true,
    badge: 'hot',
    discount: 15,
  },
  {
    id: 2,
    name: 'Industrial CNC Machine Parts',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80',
    price: 450,
    priceRange: '$450 - $680',
    moq: 10,
    rating: 4.9,
    reviews: 89,
    verified: true,
    badge: 'verified',
  },
  {
    id: 3,
    name: 'Premium Cotton T-Shirts Bulk',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
    price: 3.20,
    priceRange: '$3.20 - $5.50',
    moq: 500,
    rating: 4.7,
    reviews: 412,
    verified: true,
    badge: 'new',
  },
  {
    id: 4,
    name: 'Smart Home Security Camera',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    price: 28.90,
    priceRange: '$28.90 - $45.00',
    moq: 50,
    rating: 4.6,
    reviews: 178,
    verified: true,
    discount: 20,
  },
  {
    id: 5,
    name: 'Organic Green Tea Extract',
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&q=80',
    price: 8.50,
    priceRange: '$8.50 - $12.00',
    moq: 200,
    rating: 4.9,
    reviews: 334,
    verified: true,
    badge: 'verified',
  },
  {
    id: 6,
    name: 'LED Strip Lights RGB',
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?w=400&q=80',
    price: 2.80,
    priceRange: '$2.80 - $4.50',
    moq: 300,
    rating: 4.5,
    reviews: 567,
    verified: false,
    badge: 'hot',
    discount: 25,
  },
  {
    id: 7,
    name: 'Professional Hair Dryer',
    image: 'https://images.unsplash.com/photo-1522338242042-2d1c53d14b0a?w=400&q=80',
    price: 15.00,
    priceRange: '$15.00 - $22.00',
    moq: 100,
    rating: 4.7,
    reviews: 223,
    verified: true,
  },
  {
    id: 8,
    name: 'Stainless Steel Water Bottles',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80',
    price: 4.50,
    priceRange: '$4.50 - $7.00',
    moq: 200,
    rating: 4.8,
    reviews: 445,
    verified: true,
    badge: 'new',
  },
];

const ProductsSection: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [requestQuoteProduct, setRequestQuoteProduct] = useState<{
    id: string;
    name: string;
    image: string;
    supplierId?: string;
    supplierName?: string;
    moq: number;
    price?: number;
  } | null>(null);

  const getBadgeContent = (badge?: string) => {
    switch (badge) {
      case 'hot':
        return { icon: Flame, text: t('products.hot'), className: 'bg-destructive text-destructive-foreground' };
      case 'verified':
        return { icon: ShieldCheck, text: t('products.verified'), className: 'bg-success text-success-foreground' };
      case 'new':
        return { icon: null, text: t('products.new'), className: 'bg-accent text-accent-foreground' };
      default:
        return null;
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-muted/30">
      <div className="container px-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 md:mb-12">
          <div>
            <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">{t('products.title')}</h2>
            <p className="section-subtitle text-sm sm:text-base md:text-lg mt-2">{t('products.subtitle')}</p>
          </div>
          <Button 
            variant="outline" 
            className="gap-2 self-start sm:self-auto w-full sm:w-auto text-sm md:text-base"
            onClick={() => navigate('/products')}
          >
            {t('products.viewMore')}
            <ArrowRight className="h-4 w-4 shrink-0" />
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {products.map((product, index) => {
            const badgeInfo = getBadgeContent(product.badge);
            
            return (
              <div
                key={product.id}
                className="group relative bg-card rounded-xl md:rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 md:hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Premium Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:via-accent/10 group-hover:to-accent/5 transition-all duration-500 rounded-xl md:rounded-2xl pointer-events-none z-0" />
                
                {/* Image Container with Glassmorphism Overlay */}
                <div className="relative aspect-square overflow-hidden bg-muted/50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 md:group-hover:scale-125"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Badges - Premium Design */}
                  <div className="absolute top-2 start-2 sm:top-3 sm:start-3 flex flex-col gap-1.5 sm:gap-2 z-10">
                    {product.discount && (
                      <span className="bg-gradient-to-r from-destructive to-destructive/80 text-destructive-foreground px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold shadow-lg backdrop-blur-sm border border-destructive-foreground/20">
                        -{product.discount}%
                      </span>
                    )}
                    {badgeInfo && (
                      <Badge className={`${badgeInfo.className} gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 shadow-lg backdrop-blur-sm border border-current/20 text-[10px] sm:text-xs`}>
                        {badgeInfo.icon && <badgeInfo.icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />}
                        <span className="font-semibold leading-tight">{badgeInfo.text}</span>
                      </Badge>
                    )}
                  </div>

                  {/* Quick Action - Premium Overlay */}
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center z-20 p-3 sm:p-4">
                    <div className="flex flex-col gap-2 sm:gap-3 items-center w-full max-w-[90%]">
                      <Button 
                        className="btn-gradient-accent rounded-xl sm:rounded-2xl px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 shadow-2xl hover:shadow-glow font-semibold scale-90 group-hover:scale-100 transition-all duration-300 text-sm sm:text-base w-full sm:w-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          setRequestQuoteProduct({
                            id: product.id.toString(),
                            name: product.name,
                            image: product.image,
                            supplierId: `supplier-${product.id}`,
                            supplierName: 'TechGlobal Industries Ltd.',
                            moq: product.moq,
                            price: product.price,
                          });
                        }}
                      >
                        Request Quote
                        <ArrowRight className="ms-2 h-4 w-4 shrink-0" />
                      </Button>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <Button 
                          variant="outline" 
                          className="rounded-xl px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 bg-background/80 backdrop-blur-sm border-2 hover:bg-background text-xs sm:text-sm flex-1 sm:flex-initial"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/products/${product.id}`);
                          }}
                        >
                          View Details
                        </Button>
                        <Button 
                          variant="outline" 
                          className="rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 bg-background/80 backdrop-blur-sm border-2 hover:bg-background text-xs sm:text-sm flex-1 sm:flex-initial"
                          onClick={(e) => {
                            e.stopPropagation();
                            addItem({
                              productId: product.id.toString(),
                              name: product.name,
                              image: product.image,
                              supplierId: `supplier-${product.id}`,
                              supplierName: 'TechGlobal Industries Ltd.',
                              supplierCountry: 'China',
                              supplierVerified: product.verified,
                              supplierEscrowSupported: true,
                              unitPrice: product.price,
                              quantity: product.moq,
                              moq: product.moq,
                              inStock: true,
                              currency: 'USD',
                            });
                            toast({
                              title: language === 'fa' ? 'اضافه شد به سبد' : language === 'ar' ? 'تمت الإضافة إلى السلة' : 'Added to Cart',
                              description: language === 'fa'
                                ? `${product.name} به سبد خرید شما اضافه شد.`
                                : language === 'ar'
                                ? `تمت إضافة ${product.name} إلى سلة التسوق الخاصة بك.`
                                : `${product.name} has been added to your cart.`,
                            });
                          }}
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Floating Action Buttons */}
                  <div className="absolute top-3 end-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background border border-border/50 shadow-lg"
                    >
                      <Star className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background border border-border/50 shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        addItem({
                          productId: product.id.toString(),
                          name: product.name,
                          image: product.image,
                          supplierId: `supplier-${product.id}`,
                          supplierName: 'TechGlobal Industries Ltd.',
                          supplierCountry: 'China',
                          supplierVerified: product.verified,
                          supplierEscrowSupported: true,
                          unitPrice: product.price,
                          quantity: product.moq,
                          moq: product.moq,
                          inStock: true,
                          currency: 'USD',
                        });
                        toast({
                          title: language === 'fa' ? 'اضافه شد به سبد' : language === 'ar' ? 'تمت الإضافة إلى السلة' : 'Added to Cart',
                          description: language === 'fa'
                            ? `${product.name} به سبد خرید شما اضافه شد.`
                            : language === 'ar'
                            ? `تمت إضافة ${product.name} إلى سلة التسوق الخاصة بك.`
                            : `${product.name} has been added to your cart.`,
                        });
                      }}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Content - Premium Typography */}
                <div className="relative z-10 p-5 space-y-4 bg-card">
                  {/* Verified Badge */}
                  {product.verified && (
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 bg-success/10 text-success px-3 py-1 rounded-full text-xs font-semibold border border-success/20">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        {t('products.verified')}
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="font-bold text-base text-foreground line-clamp-2 group-hover:text-accent transition-colors leading-snug">
                    {product.name}
                  </h3>

                  {/* Price - Premium Design */}
                  <div className="space-y-2 pt-2 border-t border-border/50">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                        {product.priceRange.split(' - ')[0]}
                      </span>
                      {product.priceRange.includes(' - ') && (
                        <>
                          <span className="text-muted-foreground">-</span>
                          <span className="text-lg font-semibold text-muted-foreground">
                            {product.priceRange.split(' - ')[1]}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-medium">{t('products.moq')}:</span>
                      <span className="bg-muted px-2 py-0.5 rounded-md font-semibold">{product.moq} pcs</span>
                    </div>
                  </div>

                  {/* Rating - Enhanced */}
                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="font-bold text-sm">{product.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        ({product.reviews})
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-7 px-3 rounded-lg hover:bg-accent/10 hover:text-accent"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Get current compare items from localStorage or create new
                        const currentCompare = JSON.parse(localStorage.getItem('compareProducts') || '[]');
                        const productId = product.id.toString();
                        
                        if (!currentCompare.includes(productId)) {
                          const newCompare = [...currentCompare, productId].slice(0, 4); // Max 4 products
                          localStorage.setItem('compareProducts', JSON.stringify(newCompare));
                          navigate(`/compare?ids=${newCompare.join(',')}`);
                        } else {
                          // If already in compare, just navigate
                          navigate(`/compare?ids=${currentCompare.join(',')}`);
                        }
                      }}
                    >
                      {language === 'fa' ? 'مقایسه' : language === 'ar' ? 'مقارنة' : 'Compare'}
                    </Button>
                  </div>
                </div>

                {/* Hover Border Glow */}
                <div className="absolute inset-0 rounded-2xl border-2 border-accent/0 group-hover:border-accent/30 transition-all duration-500 pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Load More - Premium Button */}
        <div className="text-center mt-16">
          <Button 
            size="lg" 
            className="btn-gradient-primary rounded-2xl px-12 py-7 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
            onClick={() => navigate('/products')}
          >
            {t('products.viewMore')}
            <ArrowRight className="ms-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Request Quote Modal */}
      {requestQuoteProduct && (
        <RequestQuoteModal
          isOpen={!!requestQuoteProduct}
          onClose={() => setRequestQuoteProduct(null)}
          productId={requestQuoteProduct.id}
          productName={requestQuoteProduct.name}
          productImage={requestQuoteProduct.image}
          supplierId={requestQuoteProduct.supplierId}
          supplierName={requestQuoteProduct.supplierName}
          moq={requestQuoteProduct.moq}
          defaultPrice={requestQuoteProduct.price}
        />
      )}
    </section>
  );
};

export default ProductsSection;

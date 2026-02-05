import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Share2, Star, ShieldCheck, Building2, Package, DollarSign, Truck, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import RequestQuoteModal from '@/components/rfq/RequestQuoteModal';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language, dir } = useLanguage();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [requestQuoteOpen, setRequestQuoteOpen] = useState(false);

  // Mock product data
  const product = {
    id: id || '1',
    name: 'Wireless Bluetooth Earbuds Pro',
    category: 'Electronics > Audio',
    price: 15.50,
    minPrice: 12.50,
    maxPrice: 18.00,
    moq: 100,
    rating: 4.8,
    reviews: 1250,
    verified: true,
    inStock: true,
    supplier: {
      id: 'supplier-1',
      name: 'TechGlobal Industries Ltd.',
      country: 'China',
      verified: true,
      rating: 4.9,
    },
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    ],
    description: 'Premium wireless earbuds with active noise cancellation, 30-hour battery life, and premium sound quality.',
    features: [
      'Active Noise Cancellation',
      '30-hour Battery Life',
      'IPX7 Waterproof',
      'Touch Controls',
      'Wireless Charging',
    ],
  };

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      image: product.images[0],
      supplierId: product.supplier.id,
      supplierName: product.supplier.name,
      supplierCountry: product.supplier.country,
      supplierVerified: product.supplier.verified,
      supplierEscrowSupported: true,
      unitPrice: product.price,
      quantity: product.moq,
      moq: product.moq,
      inStock: product.inStock,
      currency: 'USD',
    });
    toast({
      title: 'Added to Cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header />
      <div className="container py-6 sm:py-8 md:py-12 px-4">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4 sm:mb-5 md:mb-6 gap-2 text-sm sm:text-base"
        >
          <ArrowLeft className={cn("h-4 w-4 shrink-0", dir === 'rtl' && "rotate-180")} />
          <span>Back</span>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7 md:gap-8 mb-8 sm:mb-10 md:mb-12">
          {/* Product Images */}
          <div className="space-y-3 sm:space-y-4">
            <div className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-muted border-2 border-border">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              {product.images.map((img, i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden bg-muted border border-border cursor-pointer hover:border-accent transition-colors">
                  <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap">
                <Badge variant="secondary" className="text-xs sm:text-sm">{product.category}</Badge>
                {product.verified && (
                  <Badge className="bg-success text-success-foreground gap-1 text-xs sm:text-sm">
                    <ShieldCheck className="h-3 w-3 shrink-0" />
                    Verified
                  </Badge>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-3 sm:mb-4 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 flex-wrap">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400 shrink-0" />
                  <span className="font-bold text-sm sm:text-base">{product.rating}</span>
                  <span className="text-xs sm:text-sm text-muted-foreground">({product.reviews} reviews)</span>
                </div>
              </div>
            </div>

            {/* Price */}
            <Card className="p-4 sm:p-5 md:p-6 bg-muted/50">
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1 leading-tight">Price Range</p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-accent leading-none">
                    ${product.minPrice} - ${product.maxPrice}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-tight">Per unit (MOQ: {product.moq} units)</p>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <Package className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                  <span>MOQ: {product.moq} units</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <Truck className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                  <span>Shipping: Worldwide</span>
                </div>
              </div>
            </Card>

            {/* Supplier Info */}
            <Card className="p-4 sm:p-5 md:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Building2 className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary shrink-0" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1 flex-wrap">
                    <h3 className="font-bold text-sm sm:text-base leading-tight">{product.supplier.name}</h3>
                    {product.supplier.verified && (
                      <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-success shrink-0" />
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1 leading-tight">{product.supplier.country}</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 shrink-0" />
                    <span className="text-xs sm:text-sm font-medium">{product.supplier.rating}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="shrink-0 text-xs sm:text-sm h-9 sm:h-10 px-3 sm:px-4"
                  onClick={() => navigate(`/suppliers/${product.supplier.id}`)}
                >
                  View Supplier
                </Button>
              </div>
            </Card>

            {/* Actions */}
            <div className="flex gap-2 sm:gap-3 flex-wrap">
              <Button
                onClick={() => setRequestQuoteOpen(true)}
                className="flex-1 sm:flex-initial btn-gradient-accent rounded-lg sm:rounded-xl h-10 sm:h-12 text-sm sm:text-base font-semibold px-4 sm:px-6 whitespace-nowrap min-w-0"
              >
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 me-1.5 sm:me-2 shrink-0" />
                <span className="line-clamp-1">{language === 'fa' ? 'درخواست استعلام قیمت' : language === 'ar' ? 'طلب استعلام السعر' : 'Request Quote'}</span>
              </Button>
              <Button
                onClick={handleAddToCart}
                className="flex-1 sm:flex-initial btn-gradient-primary rounded-lg sm:rounded-xl h-10 sm:h-12 text-sm sm:text-base font-semibold px-4 sm:px-6 whitespace-nowrap min-w-0"
              >
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 me-1.5 sm:me-2 shrink-0" />
                <span className="line-clamp-1">{language === 'fa' ? 'افزودن به سبد' : language === 'ar' ? 'إضافة إلى السلة' : 'Add to Cart'}</span>
              </Button>
              <Button variant="outline" size="icon" className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl shrink-0">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
              </Button>
              <Button variant="outline" size="icon" className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl shrink-0">
                <Share2 className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
              </Button>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="p-4 sm:p-5 md:p-6">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full sm:w-auto flex-wrap h-auto mb-4 sm:mb-5 md:mb-6">
              <TabsTrigger value="description" className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2">Description</TabsTrigger>
              <TabsTrigger value="features" className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2">Features</TabsTrigger>
              <TabsTrigger value="specifications" className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2">Specifications</TabsTrigger>
              <TabsTrigger value="reviews" className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4 sm:mt-5 md:mt-6">
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed px-2">{product.description}</p>
            </TabsContent>
            <TabsContent value="features" className="mt-4 sm:mt-5 md:mt-6">
              <ul className="space-y-2 sm:space-y-3">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 sm:gap-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="specifications" className="mt-4 sm:mt-5 md:mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-muted/30">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1 leading-tight">Battery Life</p>
                  <p className="text-sm sm:text-base font-semibold leading-tight">30 hours</p>
                </div>
                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-muted/30">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1 leading-tight">Waterproof</p>
                  <p className="text-sm sm:text-base font-semibold leading-tight">IPX7</p>
                </div>
                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-muted/30">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1 leading-tight">Connectivity</p>
                  <p className="text-sm sm:text-base font-semibold leading-tight">Bluetooth 5.0</p>
                </div>
                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-muted/30">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1 leading-tight">Weight</p>
                  <p className="text-sm sm:text-base font-semibold leading-tight">50g</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4 sm:mt-5 md:mt-6">
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed px-2">Reviews section coming soon...</p>
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      {/* Request Quote Modal */}
      <RequestQuoteModal
        isOpen={requestQuoteOpen}
        onClose={() => setRequestQuoteOpen(false)}
        productId={product.id}
        productName={product.name}
        productImage={product.images[0]}
        supplierId={product.supplier.id}
        supplierName={product.supplier.name}
        moq={product.moq}
        defaultPrice={product.price}
      />

      <Footer />
    </div>
  );
};

export default ProductDetail;


import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, X, ShoppingCart, Star, ShieldCheck, Building2, Package, Truck, DollarSign, Eye, Trash2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CompareProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  priceRange: string;
  moq: number;
  rating: number;
  reviews: number;
  verified: boolean;
  supplier: {
    id: string;
    name: string;
    country: string;
    verified: boolean;
    rating: number;
  };
  category?: string;
  inStock?: boolean;
  deliveryTime?: string;
}

const Compare: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { addItem } = useCart();
  const { toast } = useToast();

  // Get products from URL params
  const productIds = searchParams.get('ids')?.split(',') || [];
  
  const [products, setProducts] = useState<CompareProduct[]>([]);

  // Mock product data - In real app, fetch from API based on productIds
  useEffect(() => {
    const mockProducts: CompareProduct[] = productIds
      .filter(id => id)
      .map(id => {
        // Mock data based on ID - In real app, fetch from API
        const mockData: Record<string, CompareProduct> = {
          '1': {
            id: '1',
            name: 'Wireless Bluetooth Earbuds Pro',
            image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80',
            price: 12.50,
            priceRange: '$12.50 - $18.00',
            moq: 100,
            rating: 4.8,
            reviews: 256,
            verified: true,
            category: 'Electronics > Audio',
            inStock: true,
            deliveryTime: '7-15 days',
            supplier: {
              id: 'supplier-1',
              name: 'TechGlobal Industries Ltd.',
              country: 'China',
              verified: true,
              rating: 4.9,
            },
          },
          '2': {
            id: '2',
            name: 'Industrial CNC Machine Parts',
            image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80',
            price: 450,
            priceRange: '$450 - $680',
            moq: 10,
            rating: 4.9,
            reviews: 89,
            verified: true,
            category: 'Machinery > Industrial',
            inStock: true,
            deliveryTime: '14-30 days',
            supplier: {
              id: 'supplier-2',
              name: 'Industrial Solutions Inc.',
              country: 'Germany',
              verified: true,
              rating: 4.8,
            },
          },
          '3': {
            id: '3',
            name: 'Premium Cotton T-Shirts Bulk',
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
            price: 3.20,
            priceRange: '$3.20 - $5.50',
            moq: 500,
            rating: 4.7,
            reviews: 412,
            verified: true,
            category: 'Apparel > Clothing',
            inStock: true,
            deliveryTime: '10-20 days',
            supplier: {
              id: 'supplier-3',
              name: 'Textile Manufacturing Co.',
              country: 'India',
              verified: true,
              rating: 4.6,
            },
          },
          '4': {
            id: '4',
            name: 'Smart Home Security Camera',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
            price: 28.90,
            priceRange: '$28.90 - $45.00',
            moq: 50,
            rating: 4.6,
            reviews: 178,
            verified: true,
            category: 'Electronics > Security',
            inStock: true,
            deliveryTime: '7-14 days',
            supplier: {
              id: 'supplier-4',
              name: 'SmartTech Solutions',
              country: 'China',
              verified: true,
              rating: 4.7,
            },
          },
        };
        return mockData[id] || null;
      })
      .filter((p): p is CompareProduct => p !== null);
    
    setProducts(mockProducts);
  }, [productIds]);

  const handleRemove = (productId: string) => {
    const newIds = productIds.filter(id => id !== productId);
    if (newIds.length > 0) {
      setSearchParams({ ids: newIds.join(',') });
    } else {
      navigate('/');
    }
  };

  const handleAddToCart = (product: CompareProduct) => {
    addItem({
      productId: product.id,
      name: product.name,
      image: product.image,
      supplierId: product.supplier.id,
      supplierName: product.supplier.name,
      supplierCountry: product.supplier.country,
      supplierVerified: product.supplier.verified,
      supplierEscrowSupported: true,
      unitPrice: product.price,
      quantity: product.moq,
      moq: product.moq,
      inStock: product.inStock ?? true,
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
  };

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <Header />
        <div className="container py-12 md:py-16">
          <Card className="p-12 text-center">
            <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">
              {language === 'fa' ? 'محصولی برای مقایسه وجود ندارد' : language === 'ar' ? 'لا توجد منتجات للمقارنة' : 'No Products to Compare'}
            </h2>
            <p className="text-muted-foreground mb-6">
              {language === 'fa'
                ? 'لطفاً محصولاتی را برای مقایسه انتخاب کنید'
                : language === 'ar'
                ? 'يرجى اختيار المنتجات للمقارنة'
                : 'Please select products to compare'}
            </p>
            <Button onClick={() => navigate('/')}>
              {language === 'fa' ? 'بازگشت به خانه' : language === 'ar' ? 'العودة إلى الصفحة الرئيسية' : 'Back to Home'}
            </Button>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header />
      <div className="container py-8 md:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="gap-2"
            >
              <ArrowLeft className={cn("h-4 w-4", dir === 'rtl' && "rotate-180")} />
              {language === 'fa' ? 'بازگشت' : language === 'ar' ? 'رجوع' : 'Back'}
            </Button>
            <div>
              <h1 className="text-3xl font-bold">
                {language === 'fa' ? 'مقایسه محصولات' : language === 'ar' ? 'مقارنة المنتجات' : 'Compare Products'}
              </h1>
              <p className="text-muted-foreground mt-1">
                {language === 'fa'
                  ? `${products.length} محصول برای مقایسه`
                  : language === 'ar'
                  ? `${products.length} منتج للمقارنة`
                  : `${products.length} products to compare`}
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="sticky start-0 z-10 bg-muted/50 p-4 text-start font-semibold min-w-[200px]">
                    {language === 'fa' ? 'مشخصات' : language === 'ar' ? 'المواصفات' : 'Specifications'}
                  </th>
                  {products.map((product) => (
                    <th key={product.id} className="p-4 text-center align-top min-w-[280px] border-s border-border relative">
                      <div className="flex flex-col items-center gap-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 end-2 h-8 w-8 z-20"
                          onClick={() => handleRemove(product.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <div className="relative w-full aspect-square max-w-[200px] rounded-xl overflow-hidden bg-muted border-2 border-border mb-2">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="font-bold text-lg line-clamp-2">{product.name}</h3>
                        {product.verified && (
                          <Badge className="bg-success text-success-foreground gap-1">
                            <ShieldCheck className="h-3 w-3" />
                            {t('products.verified')}
                          </Badge>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Price */}
                <tr className="border-b border-border">
                  <td className="sticky start-0 z-10 bg-background p-4 font-semibold">
                    {language === 'fa' ? 'قیمت' : language === 'ar' ? 'السعر' : 'Price'}
                  </td>
                  {products.map((product) => (
                    <td key={product.id} className="p-4 text-center border-s border-border">
                      <div className="font-bold text-xl text-accent">{product.priceRange}</div>
                    </td>
                  ))}
                </tr>

                {/* MOQ */}
                <tr className="border-b border-border bg-muted/30">
                  <td className="sticky start-0 z-10 bg-muted/30 p-4 font-semibold">
                    {language === 'fa' ? 'حداقل سفارش' : language === 'ar' ? 'الحد الأدنى للطلب' : 'MOQ'}
                  </td>
                  {products.map((product) => (
                    <td key={product.id} className="p-4 text-center border-s border-border">
                      <div className="flex items-center justify-center gap-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span>{product.moq.toLocaleString()} {language === 'fa' ? 'واحد' : language === 'ar' ? 'وحدة' : 'units'}</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Rating */}
                <tr className="border-b border-border">
                  <td className="sticky start-0 z-10 bg-background p-4 font-semibold">
                    {language === 'fa' ? 'امتیاز' : language === 'ar' ? 'التقييم' : 'Rating'}
                  </td>
                  {products.map((product) => (
                    <td key={product.id} className="p-4 text-center border-s border-border">
                      <div className="flex items-center justify-center gap-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold">{product.rating}</span>
                        <span className="text-sm text-muted-foreground">({product.reviews.toLocaleString()})</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Supplier */}
                <tr className="border-b border-border bg-muted/30">
                  <td className="sticky start-0 z-10 bg-muted/30 p-4 font-semibold">
                    {language === 'fa' ? 'تأمین‌کننده' : language === 'ar' ? 'المورد' : 'Supplier'}
                  </td>
                  {products.map((product) => (
                    <td key={product.id} className="p-4 text-center border-s border-border">
                      <div className="space-y-2">
                        <div className="flex items-center justify-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <span className="font-semibold">{product.supplier.name}</span>
                          {product.supplier.verified && (
                            <ShieldCheck className="h-4 w-4 text-success" />
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">{product.supplier.country}</div>
                        <div className="flex items-center justify-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{product.supplier.rating}</span>
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Delivery Time */}
                {products.some(p => p.deliveryTime) && (
                  <tr className="border-b border-border">
                    <td className="sticky start-0 z-10 bg-background p-4 font-semibold">
                      {language === 'fa' ? 'زمان تحویل' : language === 'ar' ? 'وقت التسليم' : 'Delivery Time'}
                    </td>
                    {products.map((product) => (
                      <td key={product.id} className="p-4 text-center border-s border-border">
                        <div className="flex items-center justify-center gap-2">
                          <Truck className="h-4 w-4 text-muted-foreground" />
                          <span>{product.deliveryTime || '-'}</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                )}

                {/* Stock Status */}
                {products.some(p => p.inStock !== undefined) && (
                  <tr className="border-b border-border bg-muted/30">
                    <td className="sticky start-0 z-10 bg-muted/30 p-4 font-semibold">
                      {language === 'fa' ? 'موجودی' : language === 'ar' ? 'المخزون' : 'Stock Status'}
                    </td>
                    {products.map((product) => (
                      <td key={product.id} className="p-4 text-center border-s border-border">
                        <Badge variant={product.inStock ? 'default' : 'secondary'}>
                          {product.inStock
                            ? (language === 'fa' ? 'موجود' : language === 'ar' ? 'متوفر' : 'In Stock')
                            : (language === 'fa' ? 'ناموجود' : language === 'ar' ? 'غير متوفر' : 'Out of Stock')}
                        </Badge>
                      </td>
                    ))}
                  </tr>
                )}

                {/* Actions */}
                <tr>
                  <td className="sticky start-0 z-10 bg-background p-4 font-semibold">
                    {language === 'fa' ? 'عملیات' : language === 'ar' ? 'الإجراءات' : 'Actions'}
                  </td>
                  {products.map((product) => (
                    <td key={product.id} className="p-4 border-s border-border">
                      <div className="flex flex-col gap-2">
                        <Button
                          onClick={() => navigate(`/products/${product.id}`)}
                          variant="outline"
                          className="w-full gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          {language === 'fa' ? 'مشاهده جزئیات' : language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                        </Button>
                        <Button
                          onClick={() => handleAddToCart(product)}
                          className="w-full gap-2 btn-gradient-primary"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          {language === 'fa' ? 'افزودن به سبد' : language === 'ar' ? 'إضافة إلى السلة' : 'Add to Cart'}
                        </Button>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Compare;


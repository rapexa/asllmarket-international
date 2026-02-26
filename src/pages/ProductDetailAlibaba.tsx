import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ShoppingCart, Heart, Share2, Star, ShieldCheck, Building2, 
  Package, Truck, MessageSquare, ChevronRight, Check, Info
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import RequestQuoteModal from '@/components/rfq/RequestQuoteModal';
import { productService, supplierService, Product, Supplier } from '@/services';

const ProductDetailAlibaba: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language, dir } = useLanguage();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [requestQuoteOpen, setRequestQuoteOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const [productData, supplierData] = await Promise.all([
          productService.getById(id),
          productService.getById(id).then(p => supplierService.getById(p.supplierId)).catch(() => null),
        ]);
        setProduct(productData);
        setSupplier(supplierData);
      } catch (error) {
        console.error('Failed to load product:', error);
        toast({ title: 'Error', description: 'Failed to load product', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-12 flex items-center justify-center">
          <div className="text-muted-foreground">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images?.length > 0 ? product.images : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'];
  const price = Number(product.price) ?? 0;
  const discount = product.discount ?? 0;
  const finalPrice = discount > 0 ? price * (1 - discount / 100) : price;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <button onClick={() => navigate('/')} className="hover:text-foreground">Home</button>
          <ChevronRight className="h-4 w-4" />
          <button onClick={() => navigate('/products')} className="hover:text-foreground">Products</button>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Images - مثل Alibaba */}
          <div className="lg:col-span-1">
            <Card className="p-4 sticky top-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-muted mb-4">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {discount > 0 && (
                  <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                    {discount}% OFF
                  </Badge>
                )}
                {product.featured && (
                  <Badge className="absolute top-3 right-3 bg-accent">
                    {language === 'fa' ? 'برجسته' : language === 'ar' ? 'مميز' : 'Featured'}
                  </Badge>
                )}
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-5 gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={cn(
                      "aspect-square rounded-lg overflow-hidden border-2 transition-all",
                      selectedImage === idx ? "border-primary" : "border-transparent hover:border-muted-foreground"
                    )}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Middle: Product Info - مثل Alibaba */}
          <div className="lg:col-span-1 space-y-6">
            {/* Title */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-3">{product.name}</h1>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{(Number(product.rating) ?? 0).toFixed(1)}</span>
                  <span className="text-muted-foreground">({product.reviewCount ?? 0} reviews)</span>
                </div>
                <span className="text-muted-foreground">{product.totalSold ?? 0} sold</span>
              </div>
            </div>

            {/* Price - مثل Alibaba */}
            <Card className="p-6 bg-gradient-to-br from-primary/5 via-violet-500/5 to-accent/5">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-primary">${finalPrice.toFixed(2)}</span>
                {discount > 0 && (
                  <span className="text-xl text-muted-foreground line-through">${price.toFixed(2)}</span>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                Min. order: {product.moq ?? 1} {language === 'fa' ? 'عدد' : language === 'ar' ? 'قطعة' : 'pieces'}
              </div>
            </Card>

            {/* Badges مثل Alibaba */}
            <div className="flex flex-wrap gap-2">
              {product.featured && (
                <Badge variant="secondary" className="gap-1">
                  <Check className="h-3 w-3" />
                  Lower priced than similar
                </Badge>
              )}
              <Badge variant="secondary" className="gap-1">
                <Truck className="h-3 w-3" />
                FREE shipping
              </Badge>
              {product.verified && (
                <Badge variant="secondary" className="gap-1 bg-success/10 text-success">
                  <ShieldCheck className="h-3 w-3" />
                  Verified
                </Badge>
              )}
            </div>

            {/* Variations */}
            {product.variations && product.variations.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Variations</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variations.map((variation, idx) => (
                    <Button key={idx} variant="outline" className="rounded-xl">
                      {variation}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Attributes - مثل Alibaba */}
            <Card className="p-4">
              <h3 className="font-bold mb-3">Key attributes</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-muted-foreground">Material</div>
                  <div className="font-medium">{product.material ?? 'N/A'}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">MOQ</div>
                  <div className="font-medium">{product.moq ?? 1} pieces</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Brand</div>
                  <div className="font-medium">{product.brand ?? 'Generic'}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Stock</div>
                  <div className="font-medium">{product.stockQuantity} available</div>
                </div>
              </div>
            </Card>

            {/* Description */}
            <div>
              <h3 className="font-bold mb-3">Product Description</h3>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>
          </div>

          {/* Right: Supplier Info & Actions - مثل Alibaba */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="p-6 sticky top-4">
              {/* Supplier Info */}
              {supplier && (
                <div className="mb-6 pb-6 border-b">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
                      <img
                        src={supplier.logo || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&q=80'}
                        alt={supplier.companyName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold truncate">{supplier.companyName}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{supplier.country}</span>
                        {supplier.verified && (
                          <Badge variant="secondary" className="text-xs gap-1">
                            <ShieldCheck className="h-3 w-3" />
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate(`/suppliers/${supplier.id}`)}
                  >
                    <Building2 className="h-4 w-4 me-2" />
                    View Supplier
                  </Button>
                </div>
              )}

              {/* Order Actions - مثل Alibaba */}
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-2 block">Quantity</label>
                  <Input
                    type="number"
                    min={product.moq ?? 1}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="text-center"
                  />
                </div>

                <Button
                  className="w-full btn-gradient-accent py-6 text-lg rounded-xl"
                  onClick={() => setRequestQuoteOpen(true)}
                >
                  <MessageSquare className="h-5 w-5 me-2" />
                  {language === 'fa' ? 'درخواست قیمت' : language === 'ar' ? 'طلب عرض أسعار' : 'Start Order'}
                </Button>

                <Button
                  variant="outline"
                  className="w-full py-6 rounded-xl border-2"
                  onClick={() => {
                    addItem({
                      id: product.id,
                      name: product.name,
                      price: finalPrice,
                      quantity,
                      image: images[0],
                      moq: product.moq ?? 1,
                      supplierId: product.supplierId,
                    });
                    toast({ title: 'Added to cart', description: `${product.name} added successfully` });
                  }}
                >
                  <ShoppingCart className="h-5 w-5 me-2" />
                  {language === 'fa' ? 'افزودن به سبد' : language === 'ar' ? 'إضافة إلى السلة' : 'Add to cart'}
                </Button>

                <Button
                  variant="ghost"
                  className="w-full py-6 rounded-xl"
                  onClick={() => setRequestQuoteOpen(true)}
                >
                  {language === 'fa' ? 'گفتگو با تامین‌کننده' : language === 'ar' ? 'الدردشة' : 'Chat now'}
                </Button>
              </div>

              {/* Protection - مثل Alibaba */}
              <div className="mt-6 pt-6 border-t space-y-3">
                <h4 className="font-bold flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  ASL.com order protection
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Secure payments with SSL encryption</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">On-time delivery or 10% compensation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Money-back protection for quality issues</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            {language === 'fa' ? 'محصولات مرتبط' : language === 'ar' ? 'منتجات ذات صلة' : 'Related searches'}
          </h2>
          <div className="flex flex-wrap gap-2">
            {['Similar Products', 'Same Category', 'Same Supplier', 'Trending Now'].map((tag, idx) => (
              <Button key={idx} variant="outline" className="rounded-full">
                {tag}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <RequestQuoteModal
        open={requestQuoteOpen}
        onClose={() => setRequestQuoteOpen(false)}
        product={product}
      />

      <Footer />
    </div>
  );
};

export default ProductDetailAlibaba;

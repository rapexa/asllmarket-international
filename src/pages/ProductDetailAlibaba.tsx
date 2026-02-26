import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ShoppingCart, Heart, Star, ChevronRight, ChevronLeft,
  Package, Shield, Truck, MessageSquare, Check, Camera
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
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
  const [selectedTab, setSelectedTab] = useState<'wholesale' | 'customization'>('wholesale');

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const productData = await productService.getById(id);
        setProduct(productData);
        
        try {
          const supplierData = await supplierService.getById(productData.supplierId);
          setSupplier(supplierData);
        } catch (e) {
          console.error('Failed to load supplier:', e);
        }
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

  const images = product.images?.length > 0 ? product.images : (product.imageUrl ? [product.imageUrl] : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80']);
  const price = Number(product.price) ?? 0;
  const discountPercent = product.discountPercent ?? 0;
  const originalPrice = discountPercent > 0 ? price / (1 - discountPercent / 100) : price * 1.11;
  const sellingTags: string[] = product.sellingPointTags
    ? (() => { try { const t = JSON.parse(product.sellingPointTags); return Array.isArray(t) ? t : [product.sellingPointTags]; } catch { return product.sellingPointTags.split(',').map((s: string) => s.trim()).filter(Boolean); } })()
    : [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb */}
      <div className="border-b bg-background">
        <div className="container py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <button onClick={() => navigate('/')} className="hover:text-foreground">Home & Garden</button>
            <ChevronRight className="h-4 w-4" />
            <button className="hover:text-foreground">Dinnerware</button>
            <ChevronRight className="h-4 w-4" />
            <button className="hover:text-foreground">Bar & Wine</button>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Cocktail Glasses</span>
          </div>
        </div>
      </div>

      <div className="container py-6">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left: Image Gallery - Alibaba style */}
          <div className="lg:col-span-5">
            {/* Badge */}
            <div className="mb-3">
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">SAVE</span>
            </div>

            {/* Title & Rating */}
            <h1 className="text-2xl font-bold mb-3">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn("h-4 w-4", i < Math.floor(product.rating ?? 0) ? "fill-orange-400 text-orange-400" : "text-gray-300")} />
                ))}
                <span className="font-semibold ml-1">{(Number(product.rating) ?? 0).toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">(1 review)</span>
              </div>
              <span className="text-sm text-muted-foreground">{(product as { totalSold?: number }).totalSold ?? 4} sold</span>
              <div className="flex items-center gap-1 text-sm">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="text-green-600 font-medium">certified</span>
              </div>
            </div>

            {/* Supplier Info */}
            {supplier && (
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg mb-4">
                <div className="w-10 h-10 rounded overflow-hidden bg-white">
                  <img
                    src={supplier.logo || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&q=80'}
                    alt={supplier.companyName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{supplier.companyName}</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {supplier.verified && (
                      <>
                        <Check className="h-3 w-3 text-blue-600" />
                        <span className="text-blue-600">Verified</span>
                      </>
                    )}
                    <span>Custom Manufacturer</span>
                    <span>8 yrs</span>
                    <span className="flex items-center gap-1">
                      🇨🇳 CN
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Main Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-black mb-4">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain"
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}
                disabled={selectedImage === 0}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white disabled:opacity-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setSelectedImage(Math.min(images.length - 1, selectedImage + 1))}
                disabled={selectedImage === images.length - 1}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white disabled:opacity-50"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {discountPercent > 0 && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-500 text-white">{discountPercent}% OFF</Badge>
                </div>
              )}
              {/* Icons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white">
                  <Camera className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={cn(
                    "flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden",
                    selectedImage === idx ? "border-primary" : "border-transparent"
                  )}
                >
                  <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Tabs: Photos, Video, Attributes */}
            <div className="flex gap-6 border-b mt-6">
              <button className="pb-2 border-b-2 border-foreground font-medium">Photos</button>
              <button className="pb-2 text-muted-foreground hover:text-foreground">Video</button>
              <button className="pb-2 text-muted-foreground hover:text-foreground">Attributes</button>
            </div>
          </div>

          {/* Right: Product Info & Order */}
          <div className="lg:col-span-7">
            {/* Tabs: Wholesale / Customization */}
            <div className="flex gap-1 border-b mb-6">
              <button
                onClick={() => setSelectedTab('wholesale')}
                className={cn(
                  "px-6 py-3 font-medium border-b-2 transition-colors",
                  selectedTab === 'wholesale' ? "border-primary text-primary" : "border-transparent text-muted-foreground"
                )}
              >
                Wholesale
              </button>
              <button
                onClick={() => setSelectedTab('customization')}
                className={cn(
                  "px-6 py-3 font-medium border-b-2 transition-colors",
                  selectedTab === 'customization' ? "border-primary text-primary" : "border-transparent text-muted-foreground"
                )}
              >
                Customization
              </button>
            </div>

            {/* FREE shipping / First order FREE shipping */}
            {(product.freeShipping || product.firstOrderFreeShipping) && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-orange-600" />
                  <span className="font-medium">
                    <span className="text-orange-600">
                      {product.firstOrderFreeShipping ? 'First order, FREE shipping' : 'FREE shipping'}
                    </span>
                    {product.freeShipping && !product.firstOrderFreeShipping ? ' capped at €17.08' : ''}
                  </span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            )}

            {/* Eligible for instalments */}
            <div className="text-sm text-muted-foreground mb-4">
              Eligible for instalments ⓘ
            </div>

            {/* Pricing */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-4 mb-6">
              {(discountPercent > 0 || sellingTags.length > 0) && (
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {discountPercent > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">{discountPercent}% off</span>
                  )}
                  {sellingTags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-xs text-red-600 font-medium">{tag}</span>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">1,000 - 9,999 pieces</div>
                  <div className="text-3xl font-bold text-red-600">€{price.toFixed(2)}</div>
                  {originalPrice > price && (
                    <div className="text-sm text-muted-foreground line-through">€{originalPrice.toFixed(2)}</div>
                  )}
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">&gt;= 10,000 pieces</div>
                  <div className="text-3xl font-bold text-red-600">€{(price * 0.94).toFixed(2)}</div>
                  {originalPrice > price && (
                    <div className="text-sm text-muted-foreground line-through">€{(originalPrice * 0.94).toFixed(2)}</div>
                  )}
                </div>
              </div>

              <div className="text-xs text-muted-foreground mt-3">
                *Taxes and import charges will be calculated at checkout
              </div>
            </div>

            {/* Variations */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold">Variations</h3>
                <button className="text-sm text-primary hover:underline">Edit selections</button>
              </div>
              
              <div className="mb-4">
                <div className="text-sm font-medium mb-2">color</div>
                <div className="flex gap-2">
                  <button className="w-12 h-12 rounded border-2 border-primary bg-white"></button>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="border rounded-lg p-4 mb-6">
              <h3 className="font-bold mb-3">Shipping</h3>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">Premium</span>
                    <span className="text-sm">
                      <span className="text-orange-600">Alibaba.com</span> Logistics
                    </span>
                  </div>
                  <div className="text-sm">
                    Shipping fee: <span className="text-red-600 font-bold">€13,691.20</span>{' '}
                    <span className="text-muted-foreground line-through">€13,706.20</span> for 1,000 pieces
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Guaranteed delivery by Mar 29
                  </div>
                </div>
                <button className="text-sm text-primary hover:underline">Change</button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <Button
                className="flex-1 bg-primary hover:bg-primary/90 text-white py-6 rounded-full text-lg font-semibold"
                onClick={() => {
                  toast({ title: 'Order Started', description: 'Redirecting to checkout...' });
                }}
              >
                Start order
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-2 py-6 rounded-full text-lg font-semibold"
                onClick={() => {
                  addItem({
                    productId: product.id,
                    name: product.name,
                    image: images[0],
                    supplierId: product.supplierId,
                    supplierName: supplier?.companyName ?? 'Supplier',
                    supplierCountry: supplier?.country ?? '',
                    supplierVerified: supplier?.verified ?? false,
                    supplierEscrowSupported: true,
                    unitPrice: price,
                    quantity: product.moq ?? 1,
                    moq: product.moq ?? 1,
                    inStock: (product.stockQuantity ?? 0) > 0,
                    currency: product.currency ?? 'USD',
                  });
                  toast({ title: 'Added to cart', description: product.name });
                }}
              >
                Add to cart
              </Button>
              <Button
                variant="outline"
                className="px-6 border-2 py-6 rounded-full text-lg font-semibold"
              >
                Chat now
              </Button>
            </div>

            {/* Special Offer */}
            <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-4 mb-6">
              <div className="font-bold text-red-600 mb-1">€10 off every €100</div>
              <div className="text-sm text-muted-foreground">4 interest-free payments with</div>
            </div>

            {/* Protection */}
            <div className="border rounded-lg p-4">
              <h3 className="font-bold mb-3">ASL.com order protection</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <div className="font-medium">Secure payments</div>
                </div>
                <div className="text-muted-foreground">
                  Every payment you make on ASL.com is secured with strict SSL encryption and PCI DSS data protection protocols
                </div>
                
                <div className="flex items-start gap-2 mt-3">
                  <div className="font-medium">Delivery via</div>
                </div>
                <div className="text-muted-foreground">
                  Expect your order to be delivered before scheduled dates or receive a 10% delay compensation
                </div>
                
                <div className="flex items-start gap-2 mt-3">
                  <div className="font-medium">Money-back protection</div>
                </div>
                <div className="text-muted-foreground">
                  Claim a refund if your order doesn't ship, is missing, or arrives with product issues
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetailAlibaba;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, Building2, ShieldCheck, Star, MapPin, Globe, Package, 
  Users, Award, MessageSquare, Factory, TrendingUp, CheckCircle2,
  Mail, Phone, Truck, DollarSign, Clock
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { supplierService, Supplier, productService, Product } from '@/services';

const SupplierDetailAlibaba: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language, dir } = useLanguage();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const [supplierData, productsData] = await Promise.all([
          supplierService.getById(id),
          productService.list({ supplierId: id, limit: 8 }),
        ]);
        setSupplier(supplierData);
        setProducts(productsData.items || []);
      } catch (error) {
        console.error('Failed to load supplier:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-12 flex items-center justify-center">
          <div className="text-muted-foreground">Loading supplier...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!supplier) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Supplier not found</h2>
          <Button onClick={() => navigate('/products')}>Browse Products</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const capabilities = [
    { icon: Factory, label: 'OEM/ODM Service', value: 'Available' },
    { icon: Truck, label: 'Trade Assurance', value: 'Supported' },
    { icon: DollarSign, label: 'Annual Revenue', value: `$${(Number(supplier.totalRevenue) ?? 0).toLocaleString()}` },
    { icon: Users, label: 'Employees', value: supplier.employees || '100-500' },
    { icon: Globe, label: 'Export Markets', value: 'Global' },
    { icon: Clock, label: 'Response Time', value: supplier.responseTime ? `< ${supplier.responseTime}h` : '< 24h' },
  ];

  const certificates = [
    'ISO 9001:2015',
    'CE Certificate',
    'FDA Registration',
    'RoHS Compliant',
    'BSCI Audit',
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner - مثل علی‌بابا */}
      <div className="bg-gradient-to-r from-primary via-violet-900/90 to-accent/40 text-white py-12">
        <div className="container">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 gap-2 text-white hover:bg-white/10"
          >
            <ArrowLeft className={cn("h-4 w-4", dir === 'rtl' && "rotate-180")} />
            {language === 'fa' ? 'بازگشت' : language === 'ar' ? 'رجوع' : 'Back'}
          </Button>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Company Logo */}
            <div className="w-32 h-32 rounded-2xl overflow-hidden bg-white border-4 border-white/30 shadow-2xl shrink-0">
              <img
                src={supplier.logo || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=300&q=80'}
                alt={supplier.companyName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Company Info */}
            <div className="flex-1">
              <div className="flex items-start gap-3 mb-4">
                <h1 className="text-3xl md:text-4xl font-bold">
                  {supplier.companyName}
                </h1>
                {supplier.verified && (
                  <Badge className="bg-success text-success-foreground gap-1">
                    <ShieldCheck className="h-4 w-4" />
                    {language === 'fa' ? 'تایید شده' : language === 'ar' ? 'موثوق' : 'Verified'}
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {supplier.city}, {supplier.country}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">{(Number(supplier.rating) ?? 0).toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  {supplier.totalProducts}+ {language === 'fa' ? 'محصول' : language === 'ar' ? 'منتجات' : 'Products'}
                </div>
              </div>

              <p className="text-white/90 leading-relaxed max-w-3xl">
                {supplier.description || 'Leading manufacturer and exporter of quality products.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Capabilities - مثل علی‌بابا */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Factory className="h-6 w-6 text-primary" />
                {language === 'fa' ? 'قابلیت‌های شرکت' : language === 'ar' ? 'قدرات الشركة' : 'Company Capabilities'}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {capabilities.map((cap, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <cap.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{cap.label}</div>
                      <div className="font-semibold">{cap.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Products Grid */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Package className="h-6 w-6 text-primary" />
                  {language === 'fa' ? 'محصولات' : language === 'ar' ? 'المنتجات' : 'Products'}
                </h2>
                <Button variant="ghost" onClick={() => navigate(`/products?supplierId=${id}`)}>
                  {language === 'fa' ? 'مشاهده همه' : language === 'ar' ? 'عرض الكل' : 'View All'}
                  <ArrowRight className={cn("h-4 w-4 ms-2", dir === 'rtl' && "rotate-180")} />
                </Button>
              </div>
              
              {products.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  {language === 'fa' ? 'محصولی یافت نشد' : language === 'ar' ? 'لا توجد منتجات' : 'No products available'}
                </p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => navigate(`/products/${product.id}`)}
                      className="group cursor-pointer bg-card rounded-xl overflow-hidden border hover:shadow-lg transition-all"
                    >
                      <div className="relative aspect-square overflow-hidden bg-muted">
                        <img
                          src={product.images?.[0] ?? (product as any).imageUrl ?? 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop'}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="text-sm font-medium line-clamp-2 mb-2 min-h-[40px]">{product.name}</h3>
                        <div className="text-primary font-bold">
                          ${(Number(product.price) ?? 0).toFixed(2)}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          MOQ: {product.moq ?? 1}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Certificates - مثل علی‌بابا */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Award className="h-6 w-6 text-success" />
                {language === 'fa' ? 'گواهینامه‌ها' : language === 'ar' ? 'الشهادات' : 'Certificates'}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {certificates.map((cert, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-xl border-2 border-success/20 bg-success/5 hover:bg-success/10 transition-colors">
                    <CheckCircle2 className="h-6 w-6 text-success shrink-0" />
                    <span className="font-semibold">{cert}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* About Company */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Building2 className="h-6 w-6 text-primary" />
                {language === 'fa' ? 'درباره شرکت' : language === 'ar' ? 'عن الشركة' : 'About Company'}
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>{supplier.description || 'We are a leading manufacturer and supplier with years of experience in the industry.'}</p>
                <div className="grid md:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>
                      <span className="font-semibold text-foreground">{supplier.employees || '100-500'}</span> Employees
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    <span>
                      <span className="font-semibold text-foreground">Worldwide</span> Markets
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar - Contact & Stats */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="p-6 sticky top-4">
              <h3 className="text-xl font-bold mb-4">
                {language === 'fa' ? 'تماس با تامین‌کننده' : language === 'ar' ? 'اتصل بالمورد' : 'Contact Supplier'}
              </h3>
              <div className="space-y-3">
                <Button className="w-full btn-gradient-accent rounded-xl py-6 text-base">
                  <MessageSquare className="h-5 w-5 me-2" />
                  {language === 'fa' ? 'ارسال پیام' : language === 'ar' ? 'إرسال رسالة' : 'Send Message'}
                </Button>
                <Button variant="outline" className="w-full rounded-xl py-6 text-base border-2">
                  {language === 'fa' ? 'درخواست قیمت' : language === 'ar' ? 'طلب عرض أسعار' : 'Request Quote'}
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-primary font-medium">{supplier.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{supplier.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{supplier.address || `${supplier.city}, ${supplier.country}`}</span>
                </div>
              </div>
            </Card>

            {/* Stats Card - مثل علی‌بابا */}
            <Card className="p-6 bg-gradient-to-br from-primary/5 via-violet-500/5 to-accent/5">
              <h3 className="text-lg font-bold mb-4">
                {language === 'fa' ? 'آمار تامین‌کننده' : language === 'ar' ? 'إحصائيات المورد' : 'Supplier Stats'}
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{language === 'fa' ? 'میزان پاسخ' : language === 'ar' ? 'معدل الاستجابة' : 'Response Rate'}</span>
                  <span className="font-bold text-success">{(Number(supplier.responseRate) ?? 0).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{language === 'fa' ? 'زمان پاسخ' : language === 'ar' ? 'وقت الاستجابة' : 'Response Time'}</span>
                  <span className="font-bold">{supplier.responseTime ? `< ${supplier.responseTime}h` : '< 24h'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{language === 'fa' ? 'امتیاز' : language === 'ar' ? 'التقييم' : 'Rating'}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold">{(Number(supplier.rating) ?? 0).toFixed(1)}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{language === 'fa' ? 'سفارش‌ها' : language === 'ar' ? 'الطلبات' : 'Total Orders'}</span>
                  <span className="font-bold text-primary">{(Number(supplier.totalOrders) ?? 0).toLocaleString()}+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{language === 'fa' ? 'تأسیس' : language === 'ar' ? 'تأسست' : 'Established'}</span>
                  <span className="font-bold">{supplier.established || new Date(supplier.createdAt).getFullYear()}</span>
                </div>
              </div>
            </Card>

            {/* Verification Badge */}
            {supplier.verified && (
              <Card className="p-6 bg-gradient-to-br from-success/10 to-success/5 border-2 border-success/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-success flex items-center justify-center">
                    <ShieldCheck className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-success">
                      {language === 'fa' ? 'تأمین‌کننده تایید شده' : language === 'ar' ? 'مورد موثوق' : 'Verified Supplier'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {language === 'fa' ? 'توسط ASL Market تایید شده' : language === 'ar' ? 'تم التحقق من قبل ASL Market' : 'Verified by ASL Market'}
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SupplierDetailAlibaba;

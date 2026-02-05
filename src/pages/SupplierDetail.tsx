import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, ShieldCheck, Star, MapPin, Globe, Package, Users, Award, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const SupplierDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language, dir } = useLanguage();
  const navigate = useNavigate();

  // Mock supplier data
  const supplier = {
    id: id || 'supplier-1',
    name: 'TechGlobal Industries Ltd.',
    country: 'China',
    city: 'Shenzhen',
    verified: true,
    rating: 4.9,
    totalOrders: 10000,
    responseRate: '98%',
    responseTime: '< 2 hours',
    established: 2010,
    employees: '500-1000',
    mainProducts: [
      'Electronics',
      'Consumer Goods',
      'Audio Equipment',
      'Smart Devices',
    ],
    description: 'Leading manufacturer of electronics and consumer goods with over 10 years of experience in global trade.',
    certifications: [
      'ISO 9001 Certified',
      'CE Certified',
      'FCC Certified',
    ],
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header />
      <div className="container py-8 md:py-12">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 gap-2"
        >
          <ArrowLeft className={cn("h-4 w-4", dir === 'rtl' && "rotate-180")} />
          Back
        </Button>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Supplier Header */}
            <Card className="p-8">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-muted border-2 border-border shrink-0">
                  <img
                    src={supplier.image}
                    alt={supplier.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h1 className="text-3xl font-extrabold text-foreground">
                      {supplier.name}
                    </h1>
                    {supplier.verified && (
                      <Badge className="bg-success text-success-foreground gap-1">
                        <ShieldCheck className="h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{supplier.city}, {supplier.country}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{supplier.rating}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {supplier.description}
                  </p>
                </div>
              </div>
            </Card>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-6 text-center">
                <Package className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">{supplier.totalOrders.toLocaleString()}+</p>
                <p className="text-sm text-muted-foreground">Total Orders</p>
              </Card>
              <Card className="p-6 text-center">
                <MessageSquare className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">{supplier.responseRate}</p>
                <p className="text-sm text-muted-foreground">Response Rate</p>
              </Card>
              <Card className="p-6 text-center">
                <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">{supplier.established}</p>
                <p className="text-sm text-muted-foreground">Established</p>
              </Card>
            </div>

            {/* Details Tabs */}
            <Card className="p-6">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="products">Products</TabsTrigger>
                  <TabsTrigger value="certifications">Certifications</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-6 space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Main Products</h3>
                    <div className="flex flex-wrap gap-2">
                      {supplier.mainProducts.map((product, i) => (
                        <Badge key={i} variant="secondary">{product}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Company Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>Employees: {supplier.employees}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span>Export Markets: Worldwide</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="products" className="mt-6">
                  <p className="text-muted-foreground">Products list coming soon...</p>
                </TabsContent>
                <TabsContent value="certifications" className="mt-6">
                  <div className="space-y-3">
                    {supplier.certifications.map((cert, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <Award className="h-5 w-5 text-primary" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-bold mb-4">Contact Supplier</h3>
              <div className="space-y-3">
                <Button className="w-full btn-gradient-primary rounded-xl">
                  <MessageSquare className="h-4 w-4 me-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full rounded-xl">
                  Request Quote
                </Button>
                <Button variant="outline" className="w-full rounded-xl">
                  View Products
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold mb-4">Supplier Stats</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Response Time</span>
                  <span className="font-semibold">{supplier.responseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Response Rate</span>
                  <span className="font-semibold">{supplier.responseRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rating</span>
                  <span className="font-semibold">{supplier.rating} / 5.0</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SupplierDetail;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Building2, MapPin, CheckCircle2, Clock, DollarSign, Truck, Star, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNotifications } from '@/contexts/NotificationContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const RFQResponses: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const navigate = useNavigate();
  const { notifications, markAsRead } = useNotifications();

  // Mark related notifications as read
  React.useEffect(() => {
    notifications
      .filter(n => n.actionUrl?.includes('/rfq/responses'))
      .forEach(n => {
        if (!n.read) markAsRead(n.id);
      });
  }, [notifications, markAsRead]);

  // Mock RFQ data
  const rfq = {
    id: 'rfq-1',
    title: 'Industrial Pumps - Request for Quote',
    description: 'We are looking for industrial pumps with the following specifications: Flow rate 100-500 GPM, Pressure 50-200 PSI',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    quantity: 50,
    status: 'open',
  };

  // Mock responses
  const responses = [
    {
      id: 'resp-1',
      supplier: {
        id: 'supplier-1',
        name: 'TechGlobal Industries Ltd.',
        country: 'China',
        verified: true,
        rating: 4.9,
        totalOrders: 1250,
        avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&q=80',
      },
      quote: {
        unitPrice: 450,
        totalPrice: 22500,
        currency: 'USD',
        moq: 10,
        estimatedDelivery: 30,
        paymentTerms: 'T/T, L/C, Escrow',
      },
      specifications: {
        flowRate: '100-500 GPM',
        pressure: '50-200 PSI',
        material: 'Stainless Steel',
        warranty: '2 years',
      },
      submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'pending',
      message: 'We can provide high-quality industrial pumps that meet all your specifications. Our products are certified and widely used in similar applications.',
    },
    {
      id: 'resp-2',
      supplier: {
        id: 'supplier-2',
        name: 'Industrial Solutions Inc.',
        country: 'Germany',
        verified: true,
        rating: 4.8,
        totalOrders: 890,
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&q=80',
      },
      quote: {
        unitPrice: 520,
        totalPrice: 26000,
        currency: 'USD',
        moq: 20,
        estimatedDelivery: 45,
        paymentTerms: 'T/T, L/C',
      },
      specifications: {
        flowRate: '100-500 GPM',
        pressure: '50-200 PSI',
        material: 'Cast Iron / Stainless Steel',
        warranty: '3 years',
      },
      submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: 'pending',
      message: 'Our industrial pumps are manufactured according to European standards and come with comprehensive warranty coverage.',
    },
    {
      id: 'resp-3',
      supplier: {
        id: 'supplier-3',
        name: 'Global Pumps Co.',
        country: 'United States',
        verified: true,
        rating: 4.7,
        totalOrders: 560,
        avatar: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&q=80',
      },
      quote: {
        unitPrice: 480,
        totalPrice: 24000,
        currency: 'USD',
        moq: 15,
        estimatedDelivery: 35,
        paymentTerms: 'T/T, Escrow',
      },
      specifications: {
        flowRate: '100-500 GPM',
        pressure: '50-200 PSI',
        material: 'Stainless Steel',
        warranty: '2 years',
      },
      submittedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      status: 'pending',
      message: 'We offer competitive pricing and fast delivery. All our products are tested and certified.',
    },
  ];

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

        {/* Header */}
        <Card className="p-6 mb-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="h-6 w-6 text-primary" />
                <h1 className="text-3xl md:text-4xl font-extrabold text-foreground">
                  RFQ Responses
                </h1>
                <Badge variant="default" className="gap-1">
                  {responses.length} Responses
                </Badge>
              </div>
              <h2 className="text-xl font-semibold mb-2">{rfq.title}</h2>
              <p className="text-muted-foreground mb-3">{rfq.description}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Created {rfq.createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                <span>Quantity: {rfq.quantity} units</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Responses */}
        <div className="space-y-4">
          {responses.map((response, index) => (
            <Card key={response.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Column - Supplier Info */}
                <div className="lg:w-64 shrink-0">
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={response.supplier.avatar}
                      alt={response.supplier.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold truncate">{response.supplier.name}</h3>
                        {response.supplier.verified && (
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{response.supplier.country}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-semibold">{response.supplier.rating}</span>
                        <span className="text-xs text-muted-foreground">
                          ({response.supplier.totalOrders} orders)
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                        onClick={() => navigate(`/suppliers/${response.supplier.id}`)}
                      >
                        <Building2 className="h-3 w-3 me-2" />
                        View Supplier
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Middle Column - Quote Details */}
                <div className="flex-1 space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">{response.message}</p>
                  </div>

                  {/* Specifications */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-xl">
                    {Object.entries(response.specifications).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-xs text-muted-foreground mb-1 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="font-semibold text-sm">{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Quote Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Unit Price:</span>
                      <span className="font-bold">${response.quote.unitPrice}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Total:</span>
                      <span className="font-bold text-lg">${response.quote.totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">MOQ:</span>
                      <span className="font-semibold">{response.quote.moq} units</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Delivery:</span>
                      <span className="font-semibold">{response.quote.estimatedDelivery} days</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Payment:</span>
                      <span className="font-semibold ms-1">{response.quote.paymentTerms}</span>
                    </div>
                  </div>
                </div>

                {/* Right Column - Actions */}
                <div className="lg:w-48 shrink-0 space-y-3">
                  <div className="text-end mb-4">
                    <p className="text-xs text-muted-foreground mb-1">Submitted</p>
                    <p className="text-sm font-semibold">
                      {response.submittedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => {
                      // In a real app, this would accept the quote
                      navigate(`/orders/new?rfq=${rfq.id}&response=${response.id}`);
                    }}
                  >
                    Accept Quote
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => navigate(`/messages?supplier=${response.supplier.id}`)}
                  >
                    <MessageSquare className="h-4 w-4" />
                    Message Supplier
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => navigate(`/suppliers/${response.supplier.id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {responses.length === 0 && (
          <Card className="p-12 text-center">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold mb-2">No responses yet</h3>
            <p className="text-muted-foreground">
              Suppliers will be notified and can submit quotes. Check back later.
            </p>
          </Card>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default RFQResponses;


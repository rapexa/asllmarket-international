import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
import { rfqService, RFQ, RFQResponse, supplierService, Supplier } from '@/services';

interface UIRFQ {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  quantity?: number;
}

interface UIResponse {
  id: string;
  supplier: {
    id: string;
    name: string;
    country: string;
    verified: boolean;
    rating: number;
    totalOrders: number;
    avatar?: string;
  };
  quote: {
    unitPrice: number;
    totalPrice: number;
    currency: string;
    moq: number;
    estimatedDelivery: number;
    paymentTerms?: string;
  };
  specifications: Record<string, string>;
  submittedAt: string;
  status: RFQResponse['status'];
  message?: string;
}

const RFQResponses: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const navigate = useNavigate();
  const { notifications, markAsRead } = useNotifications();
  const [searchParams] = useSearchParams();
  const [rfq, setRfq] = useState<UIRFQ | null>(null);
  const [responses, setResponses] = useState<UIResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const rfqId = searchParams.get('rfqId') || undefined;

  // Mark related notifications as read
  React.useEffect(() => {
    notifications
      .filter(n => n.actionUrl?.includes('/rfq/responses'))
      .forEach(n => {
        if (!n.read) markAsRead(n.id);
      });
  }, [notifications, markAsRead]);

  useEffect(() => {
    const loadData = async () => {
      if (!rfqId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const rfq = await rfqService.getById(rfqId);
        const respRes = await rfqService.listResponses(rfqId);
        const respItems = respRes.items || [];

        const uiRfq: UIRFQ = {
          id: rfq.id,
          title: rfq.productName,
          description: rfq.specifications || '',
          createdAt: rfq.createdAt,
          quantity: rfq.quantity,
        };
        setRfq(uiRfq);

        const supplierIds = Array.from(new Set(respItems.map(r => r.supplierId)));
        const supplierMap: Record<string, Supplier | null> = {};

        await Promise.all(
          supplierIds.map(async (sid) => {
            try {
              const s = await supplierService.getById(sid);
              supplierMap[sid] = s;
            } catch {
              supplierMap[sid] = null;
            }
          })
        );

        const uiResponses: UIResponse[] = respItems.map((r: RFQResponse) => {
          const sup = supplierMap[r.supplierId] || null;
          let specs: Record<string, string> = {};
          if (r.specifications) {
            try {
              const parsed = JSON.parse(r.specifications);
              if (parsed && typeof parsed === 'object') {
                specs = Object.fromEntries(
                  Object.entries(parsed).map(([k, v]) => [k, String(v)])
                );
              } else {
                specs = { details: r.specifications };
              }
            } catch {
              specs = { details: r.specifications };
            }
          }

          return {
            id: r.id,
            supplier: {
              id: r.supplierId,
              name: sup?.companyName || `Supplier ${r.supplierId}`,
              country: sup?.country || '',
              verified: sup?.verified ?? false,
              rating: sup?.rating ?? 0,
              totalOrders: sup?.totalOrders ?? 0,
              avatar: sup?.logo,
            },
            quote: {
              unitPrice: r.unitPrice,
              totalPrice: r.totalPrice,
              currency: r.currency,
              moq: r.moq,
              estimatedDelivery: r.estimatedDelivery,
              paymentTerms: r.paymentTerms,
            },
            specifications: specs,
            submittedAt: r.submittedAt,
            status: r.status,
            message: r.message,
          };
        });

        setResponses(uiResponses);
      } catch (e) {
        console.error('Failed to load RFQ responses:', e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [rfqId]);

  if (!rfqId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <Header />
        <div className="container py-12 flex items-center justify-center">
          <Card className="p-8 text-center max-w-md">
            <h2 className="text-xl font-bold mb-2">RFQ not specified</h2>
            <p className="text-muted-foreground mb-4">
              Open this page with a valid <code className="px-1 py-0.5 rounded bg-muted">rfqId</code> query parameter.
            </p>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading || !rfq) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <Header />
        <div className="container py-12 flex items-center justify-center">
          <span className="text-muted-foreground">
            {language === 'fa'
              ? 'در حال بارگذاری پیشنهادات...'
              : language === 'ar'
              ? 'جارٍ تحميل العروض...'
              : 'Loading RFQ responses...'}
          </span>
        </div>
        <Footer />
      </div>
    );
  }

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
                  Created {new Date(rfq.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                {rfq.quantity && <span>Quantity: {rfq.quantity} units</span>}
              </div>
            </div>
          </div>
        </Card>

        {/* Responses */}
        <div className="space-y-4">
          {responses.map((response) => (
            <Card key={response.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Column - Supplier Info */}
                <div className="lg:w-64 shrink-0">
                  <div className="flex items-start gap-4 mb-4">
                    {response.supplier.avatar && (
                      <img
                        src={response.supplier.avatar}
                        alt={response.supplier.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                    )}
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
                      {new Date(response.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => {
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


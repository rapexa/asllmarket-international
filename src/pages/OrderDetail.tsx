import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, DollarSign, Truck, Calendar, CheckCircle2, Clock, XCircle, Building2, MapPin, Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNotifications } from '@/contexts/NotificationContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language, dir } = useLanguage();
  const navigate = useNavigate();
  const { notifications, markAsRead } = useNotifications();

  // Mark related notifications as read
  React.useEffect(() => {
    notifications
      .filter(n => n.actionUrl?.includes(`/orders/${id}`))
      .forEach(n => {
        if (!n.read) markAsRead(n.id);
      });
  }, [id, notifications, markAsRead]);

  // Mock order data
  const order = {
    id: id || '12345',
    status: 'pending_payment',
    orderDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    estimatedDelivery: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    totalAmount: 12500,
    currency: 'USD',
    paymentMethod: 'Escrow',
    paymentStatus: 'pending',
    shippingAddress: {
      company: 'TechCorp Inc.',
      address: '123 Business Street',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'United States',
    },
    supplier: {
      id: 'supplier-1',
      name: 'TechGlobal Industries Ltd.',
      country: 'China',
      verified: true,
      contact: {
        phone: '+86 123 456 7890',
        email: 'contact@techglobal.com',
      },
    },
    items: [
      {
        id: 'item-1',
        productId: 'product-1',
        name: 'Wireless Bluetooth Earbuds Pro',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&q=80',
        quantity: 500,
        unitPrice: 25,
        totalPrice: 12500,
        moq: 100,
      },
    ],
    timeline: [
      { status: 'order_placed', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), description: 'Order placed' },
      { status: 'payment_pending', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), description: 'Waiting for payment' },
    ],
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: any }> = {
      order_placed: { label: 'Order Placed', variant: 'secondary', icon: Package },
      payment_pending: { label: 'Payment Pending', variant: 'outline', icon: Clock },
      payment_confirmed: { label: 'Payment Confirmed', variant: 'default', icon: CheckCircle2 },
      processing: { label: 'Processing', variant: 'secondary', icon: Clock },
      shipped: { label: 'Shipped', variant: 'default', icon: Truck },
      delivered: { label: 'Delivered', variant: 'default', icon: CheckCircle2 },
      cancelled: { label: 'Cancelled', variant: 'destructive', icon: XCircle },
    };
    return statusMap[status] || statusMap.order_placed;
  };

  const statusInfo = getStatusBadge(order.status);

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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground">
                Order #{order.id}
              </h1>
              <Badge variant={statusInfo.variant} className="gap-2 text-sm py-2 px-4">
                <statusInfo.icon className="h-4 w-4" />
                {statusInfo.label}
              </Badge>
            </div>
            <p className="text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Placed on {order.orderDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate(`/orders/${id}/payment`)}>
              <DollarSign className="h-4 w-4 me-2" />
              {order.paymentStatus === 'pending' ? 'Pay Now' : 'View Payment'}
            </Button>
            <Button variant="outline">
              <Package className="h-4 w-4 me-2" />
              Track Shipment
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/products/${item.productId}`)}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{item.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Qty: {item.quantity}</span>
                        <span>Unit: ${item.unitPrice}</span>
                      </div>
                    </div>
                    <div className="text-end">
                      <p className="font-bold text-lg">${item.totalPrice.toLocaleString()}</p>
                      <Badge variant="secondary" className="mt-1">
                        MOQ: {item.moq}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Order Timeline */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Order Timeline</h2>
              <div className="space-y-4">
                {order.timeline.map((event, index) => {
                  const eventStatusInfo = getStatusBadge(event.status);
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center border-2",
                          index === order.timeline.length - 1
                            ? "bg-primary border-primary text-primary-foreground"
                            : "bg-muted border-muted-foreground/30"
                        )}>
                          <eventStatusInfo.icon className="h-5 w-5" />
                        </div>
                        {index < order.timeline.length - 1 && (
                          <div className="w-0.5 h-full bg-border my-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold">{eventStatusInfo.label}</p>
                          <p className="text-sm text-muted-foreground">
                            {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Right Column - Summary */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">${order.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold">Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method</span>
                  <Badge variant="outline">{order.paymentMethod}</Badge>
                </div>
                <div className="border-t border-border pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-extrabold text-primary">
                      ${order.totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Shipping Address */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Shipping Address
              </h2>
              <div className="space-y-2 text-sm">
                <p className="font-semibold">{order.shippingAddress.company}</p>
                <p className="text-muted-foreground">{order.shippingAddress.address}</p>
                <p className="text-muted-foreground">
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                </p>
                <p className="text-muted-foreground">{order.shippingAddress.country}</p>
              </div>
            </Card>

            {/* Supplier Info */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Supplier
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold mb-1">{order.supplier.name}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {order.supplier.country}
                  </div>
                  {order.supplier.verified && (
                    <Badge variant="default" className="mt-2 gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="space-y-2 pt-3 border-t border-border">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start gap-2"
                    onClick={() => navigate(`/suppliers/${order.supplier.id}`)}
                  >
                    <Building2 className="h-4 w-4" />
                    View Supplier
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                    <Mail className="h-4 w-4" />
                    Contact Supplier
                  </Button>
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

export default OrderDetail;


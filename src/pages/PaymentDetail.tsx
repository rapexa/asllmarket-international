import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign, CheckCircle2, Clock, Shield, Lock, CreditCard, Building2, Package, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNotifications } from '@/contexts/NotificationContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

const PaymentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language, dir } = useLanguage();
  const navigate = useNavigate();
  const { notifications, markAsRead } = useNotifications();
  const [paymentMethod, setPaymentMethod] = useState('escrow');

  // Mark related notifications as read
  React.useEffect(() => {
    notifications
      .filter(n => n.actionUrl?.includes(`/orders/${id}/payment`))
      .forEach(n => {
        if (!n.read) markAsRead(n.id);
      });
  }, [id, notifications, markAsRead]);

  // Mock payment data
  const order = {
    id: id || '12345',
    totalAmount: 12500,
    currency: 'USD',
    status: 'pending',
    paymentMethod: 'Escrow',
    orderDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    supplier: {
      id: 'supplier-1',
      name: 'TechGlobal Industries Ltd.',
      verified: true,
    },
    items: [
      {
        name: 'Wireless Bluetooth Earbuds Pro',
        quantity: 500,
        unitPrice: 25,
        totalPrice: 12500,
      },
    ],
  };

  const handlePayment = () => {
    // In a real app, this would process the payment
    navigate(`/orders/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header />
      <div className="container py-8 md:py-12 max-w-4xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(`/orders/${id}`)}
          className="mb-6 gap-2"
        >
          <ArrowLeft className={cn("h-4 w-4", dir === 'rtl' && "rotate-180")} />
          Back to Order
        </Button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground">
              Payment for Order #{order.id}
            </h1>
            <Badge variant={order.status === 'pending' ? 'outline' : 'default'} className="gap-2 text-sm py-2 px-4">
              {order.status === 'pending' ? (
                <>
                  <Clock className="h-4 w-4" />
                  Pending
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Paid
                </>
              )}
            </Badge>
          </div>
          <p className="text-muted-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Due date: {order.dueDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Escrow Info Alert */}
        <Alert className="mb-6 border-primary/50 bg-primary/5">
          <Shield className="h-5 w-5 text-primary" />
          <AlertTitle className="font-bold">Secure Escrow Payment</AlertTitle>
          <AlertDescription>
            Your payment will be held securely in escrow until the order is delivered and confirmed. This protects both you and the supplier.
          </AlertDescription>
        </Alert>

        {/* Payment Summary */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Package className="h-5 w-5" />
            Order Summary
          </h2>
          <div className="space-y-3 mb-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity} × ${item.unitPrice}</p>
                </div>
                <p className="font-bold">${item.totalPrice.toLocaleString()}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">${order.totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-semibold">Calculated separately</span>
            </div>
            <div className="border-t border-border pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total Amount</span>
                <span className="text-3xl font-extrabold text-primary">
                  ${order.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Payment Method */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Method
          </h2>
          <div className="space-y-3">
            <div
              className={cn(
                "p-4 rounded-xl border-2 cursor-pointer transition-all",
                paymentMethod === 'escrow'
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              )}
              onClick={() => setPaymentMethod('escrow')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                    paymentMethod === 'escrow' ? "border-primary" : "border-border"
                  )}>
                    {paymentMethod === 'escrow' && (
                      <div className="w-3 h-3 rounded-full bg-primary" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Lock className="h-4 w-4 text-primary" />
                      <span className="font-semibold">Escrow Payment (Recommended)</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Secure payment held until order delivery
                    </p>
                  </div>
                </div>
                <Badge variant="default" className="gap-1">
                  <Shield className="h-3 w-3" />
                  Secure
                </Badge>
              </div>
            </div>
            <div
              className={cn(
                "p-4 rounded-xl border-2 cursor-pointer transition-all",
                paymentMethod === 'direct'
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              )}
              onClick={() => setPaymentMethod('direct')}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                  paymentMethod === 'direct' ? "border-primary" : "border-border"
                )}>
                  {paymentMethod === 'direct' && (
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  )}
                </div>
                <div>
                  <span className="font-semibold">Direct Payment</span>
                  <p className="text-sm text-muted-foreground">
                    Immediate payment to supplier
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Supplier Info */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Supplier Information
          </h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Supplier</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{order.supplier.name}</span>
                {order.supplier.verified && (
                  <Badge variant="default" className="gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Payment Actions */}
        <Card className="p-6 bg-primary/5 border-primary/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
              <p className="text-3xl font-extrabold text-primary">
                ${order.totalAmount.toLocaleString()}
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => navigate(`/orders/${id}`)}
                className="flex-1 md:flex-none"
              >
                Cancel
              </Button>
              <Button
                onClick={handlePayment}
                className="flex-1 md:flex-none gap-2"
                size="lg"
              >
                <Lock className="h-4 w-4" />
                {paymentMethod === 'escrow' ? 'Pay with Escrow' : 'Pay Now'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentDetail;


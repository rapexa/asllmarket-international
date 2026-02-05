import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowRight, Building2, Shield, Lock, Trash2, Plus, Minus, AlertCircle, Save, FileText } from 'lucide-react';
import { useCart, CartItem } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const Cart: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    items,
    removeItem,
    updateQuantity,
    getTotal,
    getSubtotalBySupplier,
    getGroupedBySupplier,
    itemCount,
  } = useCart();

  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());
  const groupedItems = getGroupedBySupplier();

  const handleQuantityChange = async (item: CartItem, newQuantity: number) => {
    if (newQuantity < item.moq) {
      toast({
        title: 'Minimum Order Quantity',
        description: `Minimum order quantity for this product is ${item.moq} units.`,
        variant: 'destructive',
      });
      return;
    }

    setUpdatingItems(prev => new Set(prev).add(item.id));
    updateQuantity(item.id, newQuantity);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    setUpdatingItems(prev => {
      const next = new Set(prev);
      next.delete(item.id);
      return next;
    });
  };

  const handleRemove = (item: CartItem) => {
    removeItem(item.id);
    toast({
      title: 'Item Removed',
      description: `${item.name} has been removed from your cart.`,
    });
  };

  const handleCheckout = (supplierId: string) => {
    // Check if user is logged in
    const isAuthenticated = localStorage.getItem('authToken');
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/cart' } } });
      return;
    }
    // Navigate to checkout
    navigate(`/checkout?supplier=${supplierId}`);
  };

  const handleRequestQuote = (supplierId: string) => {
    const isAuthenticated = localStorage.getItem('authToken');
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/cart' } } });
      return;
    }
    navigate(`/request-quote?supplier=${supplierId}`);
  };

  const formatPrice = (price: number, currency: string = 'USD') => {
    return new Intl.NumberFormat(language === 'fa' ? 'fa-IR' : language === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <Header />
        <div className="container py-20">
          <Card className="p-12 md:p-16 text-center max-w-2xl mx-auto">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Start adding products to your cart to begin your B2B journey
            </p>
            <Button
              onClick={() => navigate('/')}
              className="btn-gradient-primary rounded-xl px-8"
            >
              Browse Products
              <ArrowRight className={cn("ms-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
            </Button>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const total = getTotal();
  const estimatedShipping = total * 0.05; // 5% of total
  const taxes = total * 0.1; // 10% tax
  const grandTotal = total + estimatedShipping + taxes;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header />
      <div className="container py-8 md:py-12">
        {/* Cart Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-2">
                Your Business Cart
              </h1>
              <p className="text-lg text-muted-foreground">
                Review, compare and proceed securely
              </p>
            </div>
            <div className="text-end">
              <div className="text-3xl font-bold text-accent">{itemCount}</div>
              <div className="text-sm text-muted-foreground">Items</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items - Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {Object.entries(groupedItems).map(([supplierId, supplierItems], supplierIndex) => {
              const supplier = supplierItems[0];
              const subtotal = getSubtotalBySupplier(supplierId);

              return (
                <Card
                  key={supplierId}
                  className="p-6 md:p-8 border-2 animate-fade-in"
                  style={{ animationDelay: `${supplierIndex * 0.1}s` }}
                >
                  {/* Supplier Header */}
                  <div className="flex items-start justify-between mb-6 pb-6 border-b border-border">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-foreground">
                            {supplier.supplierName}
                          </h3>
                          {supplier.supplierVerified && (
                            <Badge className="bg-success text-success-foreground gap-1">
                              <Shield className="h-3 w-3" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {supplier.supplierCountry}
                        </p>
                        {supplier.supplierEscrowSupported && (
                          <div className="flex items-center gap-2 text-xs text-success">
                            <Lock className="h-3 w-3" />
                            <span>Escrow Protection Available</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-lg"
                      onClick={() => {
                        // Contact supplier
                      }}
                    >
                      Contact
                    </Button>
                  </div>

                  {/* Products List */}
                  <div className="space-y-4 mb-6">
                    {supplierItems.map((item, itemIndex) => (
                      <div
                        key={item.id}
                        className="flex gap-4 p-4 rounded-xl border border-border hover:bg-muted/50 transition-all group animate-fade-in"
                        style={{ animationDelay: `${(supplierIndex * 0.1) + (itemIndex * 0.05)}s` }}
                      >
                        {/* Product Image */}
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-muted shrink-0 group-hover:scale-105 transition-transform duration-300">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h4 
                            className="font-semibold text-foreground mb-1 group-hover:text-accent transition-colors line-clamp-2 cursor-pointer"
                            onClick={() => navigate(`/products/${item.productId}`)}
                          >
                            {item.name}
                          </h4>
                          {item.variant && (
                            <p className="text-sm text-muted-foreground mb-2">
                              Variant: {item.variant}
                            </p>
                          )}
                          <div className="flex items-center gap-4 mt-3">
                            <div>
                              <p className="text-xs text-muted-foreground">Unit Price</p>
                              <p className="font-bold text-accent">
                                {formatPrice(item.unitPrice, item.currency)}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Total</p>
                              <p className="font-bold text-foreground">
                                {formatPrice(item.unitPrice * item.quantity, item.currency)}
                              </p>
                            </div>
                          </div>
                          {item.quantity < item.moq && (
                            <Alert className="mt-3 bg-warning/10 border-warning/20">
                              <AlertCircle className="h-4 w-4 text-warning" />
                              <AlertDescription className="text-warning text-xs">
                                Minimum order quantity: {item.moq} units
                              </AlertDescription>
                            </Alert>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex flex-col items-end gap-3">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-lg"
                              onClick={() => handleQuantityChange(item, item.quantity - 1)}
                              disabled={item.quantity <= 1 || updatingItems.has(item.id)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => {
                                const val = parseInt(e.target.value) || 1;
                                handleQuantityChange(item, val);
                              }}
                              className="w-16 h-8 text-center text-sm font-semibold rounded-lg"
                              min={1}
                              disabled={updatingItems.has(item.id)}
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-lg"
                              onClick={() => handleQuantityChange(item, item.quantity + 1)}
                              disabled={updatingItems.has(item.id)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleRemove(item)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Supplier Actions */}
                  <div className="flex flex-wrap gap-3 pt-6 border-t border-border">
                    <Button
                      onClick={() => handleCheckout(supplierId)}
                      className="btn-gradient-primary rounded-xl flex-1 min-w-[140px]"
                    >
                      Proceed to Checkout
                      <ArrowRight className={cn("ms-2 h-4 w-4", dir === 'rtl' && "rotate-180")} />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleRequestQuote(supplierId)}
                      className="rounded-xl flex-1 min-w-[140px]"
                    >
                      <FileText className="h-4 w-4 me-2" />
                      Request Quote
                    </Button>
                    <Button
                      variant="ghost"
                      className="rounded-xl"
                    >
                      <Save className="h-4 w-4 me-2" />
                      Save for Later
                    </Button>
                  </div>

                  {/* Supplier Subtotal */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-between text-lg font-bold">
                      <span>Subtotal ({supplierItems.length} items):</span>
                      <span className="text-accent">{formatPrice(subtotal, supplier.currency)}</span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Cart Summary - Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="p-6 border-2 animate-fade-in">
                <h3 className="text-xl font-bold mb-6">Order Summary</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
                    <span className="font-semibold">{formatPrice(total)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Estimated Shipping</span>
                    <span className="font-semibold">{formatPrice(estimatedShipping)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Taxes</span>
                    <span className="font-semibold">{formatPrice(taxes)}</span>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-accent text-xl">{formatPrice(grandTotal)}</span>
                    </div>
                  </div>
                </div>

                {/* Escrow Protection */}
                <Alert className="mb-6 bg-success/10 border-success/20">
                  <Lock className="h-4 w-4 text-success" />
                  <AlertDescription className="text-success text-xs">
                    <strong>Escrow Protection:</strong> Your payment is secured until order completion
                  </AlertDescription>
                </Alert>

                {/* Main CTA */}
                <div className="space-y-3">
                  <Button
                    onClick={() => {
                      const isAuthenticated = localStorage.getItem('authToken');
                      if (!isAuthenticated) {
                        navigate('/login', { state: { from: { pathname: '/cart' } } });
                        return;
                      }
                      navigate('/checkout');
                    }}
                    className="w-full btn-gradient-primary rounded-xl h-12 text-base font-semibold"
                  >
                    Continue to Checkout
                    <ArrowRight className={cn("ms-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const isAuthenticated = localStorage.getItem('authToken');
                      if (!isAuthenticated) {
                        navigate('/login', { state: { from: { pathname: '/cart' } } });
                        return;
                      }
                      navigate('/request-quote');
                    }}
                    className="w-full rounded-xl h-12"
                  >
                    <FileText className="h-4 w-4 me-2" />
                    Request Final Quote
                  </Button>
                </div>

                {/* Security Notice */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Secure B2B transaction platform</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;


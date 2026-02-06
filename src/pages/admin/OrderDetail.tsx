import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Package,
  User,
  Building2,
  MapPin,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Truck,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  FileText,
  CreditCard,
  ShoppingCart,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AdminLayout from '@/components/admin/AdminLayout';
import { cn } from '@/lib/utils';
import { orderService, Order } from '@/services';

interface OrderDetailData {
  id: string;
  orderNumber: string;
  orderDate: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  buyer: {
    id: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    address: string;
  };
  supplier: {
    id: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    country: string;
    city: string;
  };
  product: {
    id: string;
    name: string;
    image: string;
    sku: string;
    category: string;
  };
  quantity: number;
  unitPrice: number;
  subtotal: number;
  shippingCost: number;
  tax: number;
  discount: number;
  totalAmount: number;
  currency: string;
  shippingAddress: {
    name: string;
    company?: string;
    address: string;
    city: string;
    state?: string;
    country: string;
    zipCode: string;
    phone: string;
  };
  billingAddress: {
    name: string;
    company?: string;
    address: string;
    city: string;
    state?: string;
    country: string;
    zipCode: string;
  };
  paymentMethod: {
    type: string;
    last4?: string;
    expiryDate?: string;
  };
  shippingMethod: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  deliveryDate?: string;
  notes?: string;
  history: Array<{
    date: string;
    status: string;
    description: string;
    user?: string;
  }>;
}

const OrderDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<string>('');
  const [statusNotes, setStatusNotes] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [order, setOrder] = useState<OrderDetailData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getStatusBadge = (status: OrderDetailData['status']) => {
    const config = {
      pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
      confirmed: { label: 'Confirmed', className: 'bg-blue-100 text-blue-700 border-blue-300' },
      processing: { label: 'Processing', className: 'bg-purple-100 text-purple-700 border-purple-300' },
      shipped: { label: 'Shipped', className: 'bg-cyan-100 text-cyan-700 border-cyan-300' },
      delivered: { label: 'Delivered', className: 'bg-green-100 text-green-700 border-green-300' },
      cancelled: { label: 'Cancelled', className: 'bg-gray-100 text-gray-700 border-gray-300' },
      refunded: { label: 'Refunded', className: 'bg-red-100 text-red-700 border-red-300' },
    };
    const { label, className } = config[status];
    return <Badge variant="outline" className={className}>{label}</Badge>;
  };

  const getPaymentStatusBadge = (status: OrderDetailData['paymentStatus']) => {
    const config = {
      pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
      paid: { label: 'Paid', className: 'bg-green-100 text-green-700 border-green-300' },
      failed: { label: 'Failed', className: 'bg-red-100 text-red-700 border-red-300' },
      refunded: { label: 'Refunded', className: 'bg-orange-100 text-orange-700 border-orange-300' },
    };
    const { label, className } = config[status];
    return <Badge variant="outline" className={className}>{label}</Badge>;
  };

  const handleStatusUpdate = async () => {
    if (!newStatus || !id || !order) return;
    try {
      await orderService.updateStatus(id, {
        status: newStatus as any,
        trackingNumber: order.trackingNumber,
        deliveredAt: order.deliveryDate,
      });
      const updated = await orderService.getById(id);
      setOrder(mapOrderToDetail(updated));
      setStatusDialogOpen(false);
      setNewStatus('');
      setStatusNotes('');
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (e) {
      console.error('Failed to update order status:', e);
    }
  };

  const mapOrderToDetail = (o: Order): OrderDetailData => {
    return {
      id: o.id,
      orderNumber: o.orderNumber,
      orderDate: o.createdAt,
      status: o.status,
      paymentStatus: o.paymentStatus,
      buyer: {
        id: o.buyerId,
        name: `Buyer ${o.buyerId.substring(0, 6)}`,
        company: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        address: '',
      },
      supplier: {
        id: o.supplierId,
        name: `Supplier ${o.supplierId.substring(0, 6)}`,
        company: '',
        email: '',
        phone: '',
        country: '',
        city: '',
      },
      product: {
        id: o.productId,
        name: `Product ${o.productId.substring(0, 6)}`,
        image: '',
        sku: '',
        category: '',
      },
      quantity: o.quantity,
      unitPrice: o.unitPrice,
      subtotal: o.unitPrice * o.quantity,
      shippingCost: 0,
      tax: 0,
      discount: 0,
      totalAmount: o.totalAmount,
      currency: o.currency,
      shippingAddress: {
        name: '',
        company: '',
        address: o.shippingAddress,
        city: '',
        state: '',
        country: '',
        zipCode: '',
        phone: '',
      },
      billingAddress: {
        name: '',
        company: '',
        address: o.shippingAddress,
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      paymentMethod: {
        type: o.paymentMethod,
        last4: undefined,
        expiryDate: undefined,
      },
      shippingMethod: o.shippingMethod,
      trackingNumber: o.trackingNumber,
      estimatedDelivery: o.estimatedDelivery,
      deliveryDate: o.deliveredAt,
      notes: '',
      history: [
        {
          date: o.createdAt,
          status: 'Order Created',
          description: 'Order was created',
        },
      ],
    };
  };

  useEffect(() => {
    const loadOrder = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const o = await orderService.getById(id);
        setOrder(mapOrderToDetail(o));
      } catch (e) {
        console.error('Failed to load order detail:', e);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [id]);

  if (loading || !order) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <span className="text-muted-foreground">Loading order...</span>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/admin/orders')}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold">Order Details</h1>
              {getStatusBadge(order.status)}
              {getPaymentStatusBadge(order.paymentStatus)}
            </div>
            <p className="text-muted-foreground mt-1">Order #{order.orderNumber}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 me-2" />
              Export
            </Button>
            <Button
              variant="outline"
              onClick={() => setStatusDialogOpen(true)}
            >
              Update Status
            </Button>
          </div>
        </div>

        {updateSuccess && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <span className="text-green-800 font-medium">Order status updated successfully!</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Order information and product details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={order.product.image} alt={order.product.name} />
                    <AvatarFallback><Package className="h-8 w-8" /></AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-semibold text-lg">{order.product.name}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      SKU: {order.product.sku} • Category: {order.product.category}
                    </div>
                    <div className="flex items-center gap-6 mt-3">
                      <div>
                        <span className="text-sm text-muted-foreground">Quantity:</span>
                        <span className="font-medium ms-2">{order.quantity.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Unit Price:</span>
                        <span className="font-medium ms-2">
                          {order.currency} {order.unitPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">
                      {order.currency} {order.subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">
                      {order.currency} {order.shippingCost.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium">
                      {order.currency} {order.tax.toLocaleString()}
                    </span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span className="font-medium">-{order.currency} {order.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{order.currency} {order.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Buyer & Supplier Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Buyer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-sm text-muted-foreground">Name</Label>
                    <div className="font-medium">{order.buyer.name}</div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Company</Label>
                    <div className="font-medium">{order.buyer.company}</div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{order.buyer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{order.buyer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{order.buyer.city}, {order.buyer.country}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Supplier Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-sm text-muted-foreground">Name</Label>
                    <div className="font-medium">{order.supplier.name}</div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Company</Label>
                    <div className="font-medium">{order.supplier.company}</div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{order.supplier.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{order.supplier.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{order.supplier.city}, {order.supplier.country}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Shipping & Billing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="font-medium">{order.shippingAddress.name}</div>
                  {order.shippingAddress.company && (
                    <div className="text-sm text-muted-foreground">{order.shippingAddress.company}</div>
                  )}
                  <div className="text-sm">{order.shippingAddress.address}</div>
                  <div className="text-sm">
                    {order.shippingAddress.city}
                    {order.shippingAddress.state && `, ${order.shippingAddress.state}`}
                    {order.shippingAddress.zipCode && ` ${order.shippingAddress.zipCode}`}
                  </div>
                  <div className="text-sm">{order.shippingAddress.country}</div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Phone: {order.shippingAddress.phone}
                  </div>
                  {order.trackingNumber && (
                    <div className="mt-3 p-2 bg-cyan-50 border border-cyan-200 rounded">
                      <div className="text-sm font-medium text-cyan-900">Tracking Number</div>
                      <div className="text-sm text-cyan-700">{order.trackingNumber}</div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Billing Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="font-medium">{order.billingAddress.name}</div>
                  {order.billingAddress.company && (
                    <div className="text-sm text-muted-foreground">{order.billingAddress.company}</div>
                  )}
                  <div className="text-sm">{order.billingAddress.address}</div>
                  <div className="text-sm">
                    {order.billingAddress.city}
                    {order.billingAddress.state && `, ${order.billingAddress.state}`}
                    {order.billingAddress.zipCode && ` ${order.billingAddress.zipCode}`}
                  </div>
                  <div className="text-sm">{order.billingAddress.country}</div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Payment Method</span>
                  <span className="font-medium">
                    {order.paymentMethod.type}
                    {order.paymentMethod.last4 && ` •••• ${order.paymentMethod.last4}`}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Payment Status</span>
                  {getPaymentStatusBadge(order.paymentStatus)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Shipping Method</span>
                  <span className="font-medium">{order.shippingMethod}</span>
                </div>
                {order.estimatedDelivery && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Estimated Delivery</span>
                    <span className="font-medium">
                      {new Date(order.estimatedDelivery).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Order History
                </CardTitle>
                <CardDescription>Timeline of order events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.history.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={cn(
                          "w-3 h-3 rounded-full",
                          index === order.history.length - 1 ? "bg-primary" : "bg-muted"
                        )} />
                        {index < order.history.length - 1 && (
                          <div className="w-0.5 h-full bg-border mt-1" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{event.status}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(event.date).toLocaleString()}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {event.description}
                        </div>
                        {event.user && (
                          <div className="text-xs text-muted-foreground mt-1">
                            by {event.user}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Info */}
            <Card>
              <CardHeader>
                <CardTitle>Order Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-sm text-muted-foreground">Order Number</Label>
                  <div className="font-medium">{order.orderNumber}</div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Order Date</Label>
                  <div className="font-medium">
                    {new Date(order.orderDate).toLocaleString()}
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Order Status</Label>
                  <div className="mt-1">{getStatusBadge(order.status)}</div>
                </div>
                {order.deliveryDate && (
                  <div>
                    <Label className="text-sm text-muted-foreground">Delivery Date</Label>
                    <div className="font-medium">
                      {new Date(order.deliveryDate).toLocaleDateString()}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setStatusDialogOpen(true)}
                >
                  Update Status
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 me-2" />
                  Download Invoice
                </Button>
                <Button variant="outline" className="w-full" onClick={() => navigate('/admin/orders')}>
                  <ArrowLeft className="h-4 w-4 me-2" />
                  Back to Orders
                </Button>
              </CardContent>
            </Card>

            {/* Notes */}
            {order.notes && (
              <Card>
                <CardHeader>
                  <CardTitle>Order Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{order.notes}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Update Status Dialog */}
        <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Order Status</DialogTitle>
              <DialogDescription>
                Update the status of order #{order.orderNumber}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>New Status</Label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Notes (Optional)</Label>
                <Textarea
                  placeholder="Add notes about this status update..."
                  value={statusNotes}
                  onChange={(e) => setStatusNotes(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setStatusDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleStatusUpdate} disabled={!newStatus}>
                Update Status
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default OrderDetail;

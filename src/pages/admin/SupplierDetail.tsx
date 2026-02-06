import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle2,
  XCircle,
  Package,
  ShoppingCart,
  DollarSign,
  Star,
  Edit,
  Download,
  FileText,
  CreditCard,
  TrendingUp,
  AlertCircle,
  Globe,
  Clock,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AdminLayout from '@/components/admin/AdminLayout';
import { cn } from '@/lib/utils';
import { supplierService, Supplier } from '@/services';

interface SupplierDetailData {
  id: string;
  companyName: string;
  legalName: string;
  contactName: string;
  email: string;
  phone: string;
  website?: string;
  country: string;
  city: string;
  address: string;
  zipCode?: string;
  logo?: string;
  verified: boolean;
  verificationDate?: string;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  subscription: 'free' | 'silver' | 'gold' | 'diamond';
  subscriptionStartDate: string;
  subscriptionEndDate?: string;
  totalProducts: number;
  activeProducts: number;
  totalOrders: number;
  completedOrders: number;
  totalRevenue: number;
  rating: number;
  reviewCount: number;
  joinDate: string;
  lastActive: string;
  description?: string;
  businessType: string;
  registrationNumber?: string;
  taxId?: string;
  bankAccount?: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  };
  documents?: {
    businessLicense?: string;
    taxCertificate?: string;
    other?: string[];
  };
}

const SupplierDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<SupplierDetailData['status'] | ''>('');
  const [statusChangeReason, setStatusChangeReason] = useState('');
  const [supplier, setSupplier] = useState<SupplierDetailData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getStatusBadge = (status: SupplierDetailData['status']) => {
    const config = {
      active: { label: 'Active', className: 'bg-green-100 text-green-700 border-green-300' },
      inactive: { label: 'Inactive', className: 'bg-gray-100 text-gray-700 border-gray-300' },
      suspended: { label: 'Suspended', className: 'bg-red-100 text-red-700 border-red-300' },
      pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
    };
    const { label, className } = config[status];
    return <Badge variant="outline" className={className}>{label}</Badge>;
  };

  const getSubscriptionBadge = (subscription: SupplierDetailData['subscription']) => {
    const config = {
      free: { label: 'Free', className: 'bg-gray-100 text-gray-700 border-gray-300' },
      silver: { label: 'Silver', className: 'bg-slate-100 text-slate-700 border-slate-300' },
      gold: { label: 'Gold', className: 'bg-amber-100 text-amber-700 border-amber-300' },
      diamond: { label: 'Diamond', className: 'bg-cyan-100 text-cyan-700 border-cyan-300' },
    };
    const { label, className } = config[subscription];
    return <Badge variant="outline" className={className}>{label}</Badge>;
  };

  const handleStatusUpdate = () => {
    if (newStatus && supplier) {
      setSupplier(prev => prev ? { ...prev, status: newStatus } : prev);
      setStatusDialogOpen(false);
      setNewStatus('');
      setStatusChangeReason('');
      // TODO: wire to adminService.updateSupplierStatus if needed
    }
  };

  const recentOrders = [
    { id: '1', orderNumber: 'ORD-1', date: new Date().toISOString(), amount: 0, status: 'n/a' },
  ];

  const topProducts = [
    { id: '1', name: 'Product', sales: 0, revenue: 0 },
  ];

  useEffect(() => {
    const loadSupplier = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const apiSupplier: Supplier = await supplierService.getById(id);
        const mapped: SupplierDetailData = {
          id: apiSupplier.id,
          companyName: apiSupplier.companyName,
          legalName: apiSupplier.companyName,
          contactName: apiSupplier.contactName,
          email: apiSupplier.email,
          phone: apiSupplier.phone,
          website: '',
          country: apiSupplier.country,
          city: apiSupplier.city,
          address: apiSupplier.address,
          zipCode: '',
          logo: apiSupplier.logo,
          verified: apiSupplier.verified,
          verificationDate: '',
          status: apiSupplier.status,
          subscription: apiSupplier.subscription,
          subscriptionStartDate: apiSupplier.createdAt,
          subscriptionEndDate: undefined,
          totalProducts: apiSupplier.totalProducts,
          activeProducts: apiSupplier.totalProducts,
          totalOrders: apiSupplier.totalOrders,
          completedOrders: apiSupplier.totalOrders,
          totalRevenue: apiSupplier.totalRevenue,
          rating: apiSupplier.rating,
          reviewCount: 0,
          joinDate: apiSupplier.createdAt,
          lastActive: apiSupplier.updatedAt,
          description: apiSupplier.description,
          businessType: '',
          registrationNumber: undefined,
          taxId: undefined,
          bankAccount: undefined,
          documents: undefined,
        };
        setSupplier(mapped);
      } catch (error) {
        console.error('Failed to load supplier detail:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSupplier();
  }, [id]);

  if (loading || !supplier) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <span className="text-muted-foreground">Loading supplier...</span>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => navigate('/admin/suppliers')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={supplier.logo} alt={supplier.companyName} />
                <AvatarFallback><Building2 className="h-8 w-8" /></AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">{supplier.companyName}</h1>
                <p className="text-muted-foreground mt-1">Supplier ID: {supplier.id}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" onClick={() => navigate(`/admin/suppliers/${supplier.id}/edit`)}>
              <Edit className="h-4 w-4 me-2" />
              Edit Supplier
            </Button>
            <Button variant="outline" onClick={() => navigate(`/suppliers/${supplier.id}`)}>
              <Globe className="h-4 w-4 me-2" />
              View Public Page
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 me-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Products</CardDescription>
              <CardTitle className="text-2xl">{supplier.totalProducts}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                {supplier.activeProducts} active
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Orders</CardDescription>
              <CardTitle className="text-2xl">{supplier.totalOrders}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                {supplier.completedOrders} completed
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Revenue</CardDescription>
              <CardTitle className="text-2xl">${(supplier.totalRevenue / 1000).toFixed(0)}K</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 me-1" />
                +12.5% from last month
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Rating</CardDescription>
              <CardTitle className="text-2xl">{supplier.rating}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-muted-foreground">({supplier.reviewCount} reviews)</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Information */}
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Basic company details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Company Name</Label>
                    <div className="font-medium mt-1">{supplier.companyName}</div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Legal Name</Label>
                    <div className="font-medium mt-1">{supplier.legalName}</div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Business Type</Label>
                    <div className="font-medium mt-1">{supplier.businessType}</div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Registration Number</Label>
                    <div className="font-medium mt-1">{supplier.registrationNumber || 'N/A'}</div>
                  </div>
                  {supplier.description && (
                    <div className="sm:col-span-2">
                      <Label className="text-sm text-muted-foreground">Description</Label>
                      <p className="text-sm mt-1">{supplier.description}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Contact details and location</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label className="text-sm text-muted-foreground">Contact Person</Label>
                      <div className="font-medium">{supplier.contactName}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label className="text-sm text-muted-foreground">Email</Label>
                      <div className="font-medium">{supplier.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label className="text-sm text-muted-foreground">Phone</Label>
                      <div className="font-medium">{supplier.phone}</div>
                    </div>
                  </div>
                  {supplier.website && (
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <Label className="text-sm text-muted-foreground">Website</Label>
                        <a href={supplier.website} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
                          {supplier.website}
                        </a>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3 sm:col-span-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label className="text-sm text-muted-foreground">Address</Label>
                      <div className="font-medium">{supplier.address}</div>
                      <div className="text-sm text-muted-foreground">
                        {supplier.city}, {supplier.country} {supplier.zipCode && `- ${supplier.zipCode}`}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Status */}
            <Card>
              <CardHeader>
                <CardTitle>Account Status</CardTitle>
                <CardDescription>Account verification and status information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Verification Status</Label>
                    <div className="mt-2">
                      {supplier.verified ? (
                        <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                          <CheckCircle2 className="h-3 w-3 me-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-300">
                          <XCircle className="h-3 w-3 me-1" />
                          Unverified
                        </Badge>
                      )}
                    </div>
                    {supplier.verificationDate && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Verified on {new Date(supplier.verificationDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Account Status</Label>
                    <div className="mt-2">
                      {getStatusBadge(supplier.status)}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 h-7 text-xs"
                      onClick={() => {
                        setNewStatus(supplier.status);
                        setStatusDialogOpen(true);
                      }}
                    >
                      Change Status
                    </Button>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Subscription Plan</Label>
                    <div className="mt-2">
                      {getSubscriptionBadge(supplier.subscription)}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Since {new Date(supplier.subscriptionStartDate).toLocaleDateString()}
                      {supplier.subscriptionEndDate && (
                        <> • Expires {new Date(supplier.subscriptionEndDate).toLocaleDateString()}</>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Member Since</Label>
                    <div className="font-medium mt-1">
                      {new Date(supplier.joinDate).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Last active: {new Date(supplier.lastActive).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Latest orders from this supplier</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/admin/orders')}>
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/admin/orders/${order.id}`)}
                    >
                      <div>
                        <div className="font-medium">{order.orderNumber}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(order.date).toLocaleDateString()} • ${order.amount.toLocaleString()}
                        </div>
                      </div>
                      <Badge variant="outline">{order.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Products */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Top Products</CardTitle>
                    <CardDescription>Best performing products</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/admin/products')}>
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/admin/products/${product.id}`)}
                    >
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {product.sales} sales • ${(product.revenue / 1000).toFixed(0)}K revenue
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Financial Information */}
            <Card>
              <CardHeader>
                <CardTitle>Financial Information</CardTitle>
                <CardDescription>Bank and tax details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {supplier.taxId && (
                  <div>
                    <Label className="text-sm text-muted-foreground">Tax ID</Label>
                    <div className="font-medium mt-1">{supplier.taxId}</div>
                  </div>
                )}
                {supplier.bankAccount && (
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm text-muted-foreground">Bank Name</Label>
                      <div className="font-medium mt-1">{supplier.bankAccount.bankName}</div>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Account Number</Label>
                      <div className="font-medium mt-1">{supplier.bankAccount.accountNumber}</div>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Account Holder</Label>
                      <div className="font-medium mt-1">{supplier.bankAccount.accountHolder}</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Documents */}
            {supplier.documents && (
              <Card>
                <CardHeader>
                  <CardTitle>Documents</CardTitle>
                  <CardDescription>Company documents and certificates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {supplier.documents.businessLicense && (
                    <Button variant="outline" className="w-full justify-start" onClick={() => window.open(supplier.documents!.businessLicense, '_blank')}>
                      <FileText className="h-4 w-4 me-2" />
                      Business License
                      <Download className="h-4 w-4 ms-auto" />
                    </Button>
                  )}
                  {supplier.documents.taxCertificate && (
                    <Button variant="outline" className="w-full justify-start" onClick={() => window.open(supplier.documents!.taxCertificate, '_blank')}>
                      <FileText className="h-4 w-4 me-2" />
                      Tax Certificate
                      <Download className="h-4 w-4 ms-auto" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate(`/admin/suppliers/${supplier.id}/edit`)}>
                  <Edit className="h-4 w-4 me-2" />
                  Edit Supplier
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate(`/suppliers/${supplier.id}`)}>
                  <Globe className="h-4 w-4 me-2" />
                  View Public Page
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate(`/admin/orders?supplier=${supplier.id}`)}>
                  <ShoppingCart className="h-4 w-4 me-2" />
                  View Orders
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate(`/admin/products?supplier=${supplier.id}`)}>
                  <Package className="h-4 w-4 me-2" />
                  View Products
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Status Update Dialog */}
        <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Supplier Status</DialogTitle>
              <DialogDescription>
                Change the status of {supplier.companyName}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>New Status</Label>
                <Select value={newStatus} onValueChange={(value) => setNewStatus(value as SupplierDetailData['status'])}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Reason (Optional)</Label>
                <Textarea
                  placeholder="Enter reason for status change..."
                  value={statusChangeReason}
                  onChange={(e) => setStatusChangeReason(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setStatusDialogOpen(false)}>Cancel</Button>
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

export default SupplierDetail;

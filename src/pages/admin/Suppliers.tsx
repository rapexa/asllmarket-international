import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  MoreVertical,
  Eye,
  Edit,
  User,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Building2,
  Download,
  Filter,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AdminLayout from '@/components/admin/AdminLayout';
import { cn } from '@/lib/utils';
import { adminService, AdminSupplier } from '@/services';

const Suppliers: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedSubscription, setSelectedSubscription] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [loading, setLoading] = useState(true);
  const [suppliers, setSuppliers] = useState<AdminSupplier[]>([]);

  // Load suppliers from backend
  useEffect(() => {
    const loadSuppliers = async () => {
      try {
        setLoading(true);
        const response = await adminService.listSuppliers({
          limit: 100,
          offset: 0,
          status: selectedStatus !== 'all' ? selectedStatus : undefined,
          subscription: selectedSubscription !== 'all' ? selectedSubscription : undefined,
        });
        setSuppliers(response.items || []);
      } catch (error) {
        console.error('Failed to load suppliers:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSuppliers();
  }, [selectedStatus, selectedSubscription]);

  const handleStatusChange = async (supplierId: string, newStatus: 'active' | 'inactive' | 'suspended' | 'pending') => {
    try {
      await adminService.updateSupplierStatus(supplierId, { status: newStatus, reason: 'Admin action' });
      // Reload suppliers
      const response = await adminService.listSuppliers({
        limit: 100,
        offset: 0,
        status: selectedStatus !== 'all' ? selectedStatus : undefined,
        subscription: selectedSubscription !== 'all' ? selectedSubscription : undefined,
      });
      setSuppliers(response.items || []);
    } catch (error) {
      console.error('Failed to update supplier status:', error);
    }
  };

  // Mock data for fallback
  const mockSuppliers: any[] = [
    {
      id: '1',
      companyName: 'Tech Supplier Co.',
      contactName: 'John Smith',
      email: 'john@techsupplier.com',
      phone: '+1-234-567-8900',
      country: 'China',
      city: 'Shanghai',
      verified: true,
      status: 'active',
      subscription: 'gold',
      totalProducts: 150,
      totalOrders: 456,
      totalRevenue: 2345678,
      rating: 4.8,
      joinDate: '2023-01-15',
    },
    {
      id: '2',
      companyName: 'Audio Solutions Ltd.',
      contactName: 'Sarah Johnson',
      email: 'sarah@audiosolutions.com',
      phone: '+1-555-123-4567',
      country: 'USA',
      city: 'New York',
      verified: true,
      status: 'active',
      subscription: 'diamond',
      totalProducts: 89,
      totalOrders: 234,
      totalRevenue: 1234567,
      rating: 4.9,
      joinDate: '2022-11-20',
    },
    {
      id: '3',
      companyName: 'Wearables Co.',
      contactName: 'Li Wei',
      email: 'liwei@wearables.com',
      phone: '+86-138-0013-8000',
      country: 'China',
      city: 'Shenzhen',
      verified: true,
      status: 'active',
      subscription: 'silver',
      totalProducts: 67,
      totalOrders: 189,
      totalRevenue: 987654,
      rating: 4.6,
      joinDate: '2023-03-10',
    },
    {
      id: '4',
      companyName: 'Computing Inc.',
      contactName: 'David Chen',
      email: 'david@computing.com',
      phone: '+886-2-1234-5678',
      country: 'Taiwan',
      city: 'Taipei',
      verified: false,
      status: 'pending',
      subscription: 'free',
      totalProducts: 12,
      totalOrders: 0,
      totalRevenue: 0,
      rating: 0,
      joinDate: '2024-02-01',
    },
    {
      id: '5',
      companyName: 'Mobile Devices Ltd.',
      contactName: 'Kim Soo',
      email: 'kim@mobiledevices.com',
      phone: '+82-2-1234-5678',
      country: 'South Korea',
      city: 'Seoul',
      verified: true,
      status: 'suspended',
      subscription: 'silver',
      totalProducts: 45,
      totalOrders: 76,
      totalRevenue: 456789,
      rating: 3.8,
      joinDate: '2023-06-15',
    },
  ];

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const sortedSuppliers = [...filteredSuppliers].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    if (sortBy === 'products') return b.totalProducts - a.totalProducts;
    if (sortBy === 'revenue') return b.totalRevenue - a.totalRevenue;
    if (sortBy === 'name') return a.companyName.localeCompare(b.companyName);
    return 0;
  });

  const getStatusBadge = (status: string) => {
    const config: Record<string, { label: string; className: string }> = {
      active: { label: 'Active', className: 'bg-green-100 text-green-700 border-green-300' },
      inactive: { label: 'Inactive', className: 'bg-gray-100 text-gray-700 border-gray-300' },
      suspended: { label: 'Suspended', className: 'bg-red-100 text-red-700 border-red-300' },
      pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
    };
    const { label, className } = config[status] || config.active;
    return <Badge variant="outline" className={className}>{label}</Badge>;
  };

  const getSubscriptionBadge = (subscription: string) => {
    const config: Record<string, { label: string; className: string }> = {
      free: { label: 'Free', className: 'bg-gray-100 text-gray-700 border-gray-300' },
      silver: { label: 'Silver', className: 'bg-slate-100 text-slate-700 border-slate-300' },
      gold: { label: 'Gold', className: 'bg-amber-100 text-amber-700 border-amber-300' },
      diamond: { label: 'Diamond', className: 'bg-cyan-100 text-cyan-700 border-cyan-300' },
    };
    const { label, className } = config[subscription] || config.free;
    return <Badge variant="outline" className={className}>{label}</Badge>;
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Suppliers Management</h1>
            <p className="text-muted-foreground mt-1">Manage all suppliers on the platform</p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" onClick={() => {}}>
              <Download className="h-4 w-4 me-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Suppliers</CardDescription>
              <CardTitle className="text-2xl">{suppliers.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                {suppliers.filter(s => s.status === 'active').length} active
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Verified Suppliers</CardDescription>
              <CardTitle className="text-2xl">{suppliers.filter(s => s.verified).length}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                {((suppliers.filter(s => s.verified).length / suppliers.length) * 100).toFixed(0)}% verified
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Premium Plans</CardDescription>
              <CardTitle className="text-2xl">
                {suppliers.filter(s => ['gold', 'diamond'].includes(s.subscription)).length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Gold & Diamond subscribers
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Pending Verification</CardDescription>
              <CardTitle className="text-2xl">
                {suppliers.filter(s => !s.verified || s.status === 'pending').length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Require attention
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute start-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search suppliers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ps-9"
                />
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedSubscription} onValueChange={setSelectedSubscription}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Subscription" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Plans</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="silver">Silver</SelectItem>
                  <SelectItem value="gold">Gold</SelectItem>
                  <SelectItem value="diamond">Diamond</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="products">Most Products</SelectItem>
                  <SelectItem value="revenue">Highest Revenue</SelectItem>
                  <SelectItem value="name">Name: A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Suppliers Table */}
        <Card>
          <CardHeader>
            <CardTitle>Suppliers ({sortedSuppliers.length})</CardTitle>
            <CardDescription>All suppliers in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Verified</TableHead>
                    <TableHead>Subscription</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedSuppliers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={11} className="text-center py-8 text-muted-foreground">
                        No suppliers found
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedSuppliers.map((supplier) => (
                      <TableRow key={supplier.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback><Building2 className="h-5 w-5" /></AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{supplier.companyName}</div>
                              <div className="text-sm text-muted-foreground">
                                ID: {supplier.id.substring(0, 8)}...
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{supplier.contactName}</div>
                            <div className="text-sm text-muted-foreground">{supplier.email}</div>
                            <div className="text-sm text-muted-foreground">{supplier.phone}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{supplier.city}</div>
                            <div className="text-sm text-muted-foreground">{supplier.country}</div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(supplier.status)}</TableCell>
                        <TableCell>
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
                        </TableCell>
                        <TableCell>{getSubscriptionBadge(supplier.subscription)}</TableCell>
                        <TableCell className="font-medium">{supplier.totalProducts}</TableCell>
                        <TableCell className="font-medium">{supplier.totalOrders}</TableCell>
                        <TableCell className="font-medium">
                          ${(supplier.totalRevenue / 1000).toFixed(0)}K
                        </TableCell>
                        <TableCell>
                          {supplier.rating > 0 ? (
                            <div className="flex items-center gap-1">
                              <span className="font-medium">{supplier.rating}</span>
                              <span className="text-yellow-500">★</span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => navigate(`/admin/suppliers/${supplier.id}`)}>
                                <Eye className="h-4 w-4 me-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => navigate(`/suppliers/${supplier.id}`)}>
                                <Building2 className="h-4 w-4 me-2" />
                                View Public Page
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => navigate(`/admin/suppliers/${supplier.id}/edit`)}>
                                <Edit className="h-4 w-4 me-2" />
                                Edit
                              </DropdownMenuItem>
                              {supplier.status !== 'active' && (
                                <DropdownMenuItem onClick={() => handleStatusChange(supplier.id, 'active')}>
                                  <CheckCircle2 className="h-4 w-4 me-2" />
                                  Activate
                                </DropdownMenuItem>
                              )}
                              {supplier.status !== 'suspended' && (
                                <DropdownMenuItem onClick={() => handleStatusChange(supplier.id, 'suspended')}>
                                  <AlertCircle className="h-4 w-4 me-2" />
                                  Suspend
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Suppliers;

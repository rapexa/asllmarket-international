import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  MoreVertical,
  Eye,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Download,
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
import { rfqService } from '@/services';

const RFQManagement: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [loading, setLoading] = useState(true);
  const [rfqs, setRfqs] = useState<any[]>([]);

  // Load RFQs from backend
  useEffect(() => {
    const loadRFQs = async () => {
      try {
        setLoading(true);
        const response = await rfqService.admin.list({ limit: 100, offset: 0 });
        setRfqs(response.items || []);
      } catch (error) {
        console.error('Failed to load RFQs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRFQs();
  }, []);

  // Mock data for fallback
  const mockRFQs: any[] = [
    {
      id: '1',
      rfqNumber: 'RFQ-2024-001',
      buyerName: 'ABC Trading Co.',
      buyerCountry: 'USA',
      productName: 'Smartphone Pro Max 256GB',
      quantity: 1000,
      unit: 'pieces',
      budget: 899000,
      currency: 'USD',
      status: 'active',
      responses: 12,
      submittedAt: '2024-02-20',
      expiresAt: '2024-03-20',
    },
    {
      id: '2',
      rfqNumber: 'RFQ-2024-002',
      buyerName: 'Global Electronics Ltd.',
      buyerCountry: 'UK',
      productName: 'Wireless Bluetooth Headphones',
      quantity: 5000,
      unit: 'pieces',
      budget: 645000,
      currency: 'USD',
      status: 'active',
      responses: 8,
      submittedAt: '2024-02-18',
      expiresAt: '2024-03-18',
    },
    {
      id: '3',
      rfqNumber: 'RFQ-2024-003',
      buyerName: 'Mobile Devices Inc.',
      buyerCountry: 'Canada',
      productName: 'Smart Watch Series 8',
      quantity: 2000,
      unit: 'pieces',
      budget: 598000,
      currency: 'USD',
      status: 'closed',
      responses: 15,
      submittedAt: '2024-01-15',
      expiresAt: '2024-02-15',
    },
    {
      id: '4',
      rfqNumber: 'RFQ-2024-004',
      buyerName: 'Tech Retail Group',
      buyerCountry: 'Germany',
      productName: 'Laptop Ultra 15"',
      quantity: 500,
      unit: 'pieces',
      budget: 749500,
      currency: 'USD',
      status: 'submitted',
      responses: 0,
      submittedAt: '2024-02-25',
      expiresAt: '2024-03-25',
    },
    {
      id: '5',
      rfqNumber: 'RFQ-2024-005',
      buyerName: 'Electronics Wholesale',
      buyerCountry: 'France',
      productName: 'Tablet Air 11"',
      quantity: 1500,
      unit: 'pieces',
      budget: 898500,
      currency: 'USD',
      status: 'cancelled',
      responses: 3,
      submittedAt: '2024-02-10',
    },
  ];

  const filteredRFQs = rfqs.filter((rfq) => {
    const matchesSearch =
      rfq.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rfq.productName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rfq.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || rfq.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const sortedRFQs = [...filteredRFQs].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    if (sortBy === 'budget-low') return (a.budget || 0) - (b.budget || 0);
    if (sortBy === 'budget-high') return (b.budget || 0) - (a.budget || 0);
    return 0;
  });

  const getStatusBadge = (status: string) => {
    const config: Record<string, { label: string; className: string }> = {
      draft: { label: 'Draft', className: 'bg-gray-100 text-gray-700 border-gray-300' },
      submitted: { label: 'Submitted', className: 'bg-blue-100 text-blue-700 border-blue-300' },
      active: { label: 'Active', className: 'bg-green-100 text-green-700 border-green-300' },
      closed: { label: 'Closed', className: 'bg-gray-100 text-gray-700 border-gray-300' },
      cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-700 border-red-300' },
    };
    const { label, className } = config[status] || config.draft;
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
            <h1 className="text-2xl sm:text-3xl font-bold">RFQ Management</h1>
            <p className="text-muted-foreground mt-1">Manage all RFQ requests on the platform</p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 me-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active RFQs</CardDescription>
              <CardTitle className="text-2xl">
                {rfqs.filter(r => r.status === 'active').length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Submitted</CardDescription>
              <CardTitle className="text-2xl text-blue-600">
                {rfqs.filter(r => r.status === 'submitted').length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Closed</CardDescription>
              <CardTitle className="text-2xl text-gray-600">
                {rfqs.filter(r => r.status === 'closed').length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Cancelled</CardDescription>
              <CardTitle className="text-2xl text-red-600">
                {rfqs.filter(r => r.status === 'cancelled').length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total</CardDescription>
              <CardTitle className="text-2xl">
                {rfqs.length}
              </CardTitle>
            </CardHeader>
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
                  placeholder="Search RFQs..."
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
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="budget-low">Budget: Low to High</SelectItem>
                  <SelectItem value="budget-high">Budget: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* RFQs Table */}
        <Card>
          <CardHeader>
            <CardTitle>RFQ Requests ({sortedRFQs.length})</CardTitle>
            <CardDescription>All RFQ requests in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>RFQ #</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Buyer</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Responses</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedRFQs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                        No RFQs found
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedRFQs.map((rfq) => (
                      <TableRow key={rfq.id}>
                        <TableCell className="font-medium">RFQ-{rfq.id.substring(0, 8)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback><FileText className="h-5 w-5" /></AvatarFallback>
                            </Avatar>
                            <div className="max-w-[200px]">
                              <div className="font-medium truncate">{rfq.productName || rfq.title}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">Buyer #{rfq.buyerId?.substring(0, 6) || 'N/A'}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {rfq.quantity?.toLocaleString() || 0} {rfq.unit || 'pcs'}
                        </TableCell>
                        <TableCell className="font-medium">
                          {rfq.currency || 'USD'} {rfq.budget ? (rfq.budget / 1000).toFixed(0) : '0'}K
                        </TableCell>
                        <TableCell>{getStatusBadge(rfq.status)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {rfq.responseCount || 0} {rfq.responseCount === 1 ? 'response' : 'responses'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(rfq.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {rfq.deadline ? new Date(rfq.deadline).toLocaleDateString() : '-'}
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
                              <DropdownMenuItem onClick={() => navigate(`/admin/rfq/${rfq.id}`)}>
                                <Eye className="h-4 w-4 me-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => navigate(`/rfq/responses?rfqId=${rfq.id}`)}>
                                <FileText className="h-4 w-4 me-2" />
                                View Responses
                              </DropdownMenuItem>
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

export default RFQManagement;

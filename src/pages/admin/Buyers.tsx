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
  Download,
  Mail,
  Phone,
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
import { adminService, BuyerListItem } from '@/services';

const Buyers: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [loading, setLoading] = useState(true);
  const [buyers, setBuyers] = useState<BuyerListItem[]>([]);

  // Load buyers from backend
  useEffect(() => {
    const loadBuyers = async () => {
      try {
        setLoading(true);
        const response = await adminService.listBuyers({ limit: 100, offset: 0 });
        setBuyers(response.items || []);
      } catch (error) {
        console.error('Failed to load buyers:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBuyers();
  }, []);

  // Filter and sort buyers
  const filteredBuyers = buyers
    .filter((buyer) => {
      const matchesSearch = 
        buyer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        buyer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        buyer.phone.includes(searchQuery);
      const matchesStatus = selectedStatus === 'all' || buyer.status === selectedStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortBy === 'mostOrders') {
        return b.totalOrders - a.totalOrders;
      } else if (sortBy === 'mostSpent') {
        return b.totalSpent - a.totalSpent;
      }
      return 0;
    });

  // Mock data for fallback (keep it but use real data when available)
  const mockBuyers: any[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1-234-567-8900',
      country: 'USA',
      city: 'New York',
      company: 'ABC Trading Co.',
      verified: true,
      status: 'active',
      totalOrders: 45,
      totalSpent: 234567,
      joinDate: '2023-01-15',
      lastActive: '2024-02-25',
    },
    {
      id: '2',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@example.com',
      phone: '+44-20-1234-5678',
      country: 'UK',
      city: 'London',
      company: 'Global Electronics Ltd.',
      verified: true,
      status: 'active',
      totalOrders: 78,
      totalSpent: 567890,
      joinDate: '2022-11-20',
      lastActive: '2024-02-24',
    },
    {
      id: '3',
      firstName: 'David',
      lastName: 'Chen',
      email: 'david.chen@example.com',
      phone: '+1-416-123-4567',
      country: 'Canada',
      city: 'Toronto',
      verified: false,
      status: 'active',
      totalOrders: 12,
      totalSpent: 34567,
      joinDate: '2023-06-10',
      lastActive: '2024-02-20',
    },
    {
      id: '4',
      firstName: 'Maria',
      lastName: 'Garcia',
      email: 'maria.garcia@example.com',
      phone: '+49-30-1234-5678',
      country: 'Germany',
      city: 'Berlin',
      company: 'Tech Retail Group',
      verified: true,
      status: 'suspended',
      totalOrders: 23,
      totalSpent: 123456,
      joinDate: '2023-03-15',
      lastActive: '2024-01-30',
    },
    {
      id: '5',
      firstName: 'Jean',
      lastName: 'Dubois',
      email: 'jean.dubois@example.com',
      phone: '+33-1-2345-6789',
      country: 'France',
      city: 'Paris',
      verified: false,
      status: 'inactive',
      totalOrders: 5,
      totalSpent: 12345,
      joinDate: '2023-09-20',
      lastActive: '2023-12-15',
    },
  ];

  const handleStatusChange = async (buyerId: string, newStatus: 'active' | 'inactive' | 'suspended') => {
    try {
      await adminService.updateUserStatus(buyerId, { status: newStatus, reason: 'Admin action' });
      // Reload buyers after status change
      const response = await adminService.listBuyers({ limit: 100, offset: 0 });
      setBuyers(response.items || []);
    } catch (error) {
      console.error('Failed to update user status:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { label: string; className: string }> = {
      active: { label: 'Active', className: 'bg-green-100 text-green-700 border-green-300' },
      inactive: { label: 'Inactive', className: 'bg-gray-100 text-gray-700 border-gray-300' },
      suspended: { label: 'Suspended', className: 'bg-red-100 text-red-700 border-red-300' },
    };
    const { label, className } = config[status] || config.active;
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
            <h1 className="text-2xl sm:text-3xl font-bold">Buyers Management</h1>
            <p className="text-muted-foreground mt-1">Manage all buyers on the platform</p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 me-2" />
              Export
            </Button>
          </div>
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
                  placeholder="Search buyers..."
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
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="orders">Most Orders</SelectItem>
                  <SelectItem value="spent">Highest Spent</SelectItem>
                  <SelectItem value="name">Name: A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Buyers Table */}
        <Card>
          <CardHeader>
            <CardTitle>Buyers ({filteredBuyers.length})</CardTitle>
            <CardDescription>All buyers in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Buyer</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBuyers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                        No buyers found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBuyers.map((buyer) => {
                      const nameParts = buyer.fullName.split(' ');
                      const initials = nameParts.length >= 2 
                        ? nameParts[0][0] + nameParts[nameParts.length - 1][0]
                        : nameParts[0][0];
                      
                      return (
                        <TableRow key={buyer.id} className="cursor-pointer hover:bg-muted/50">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback>{initials}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{buyer.fullName}</div>
                                <div className="text-sm text-muted-foreground">
                                  ID: {buyer.id.substring(0, 8)}...
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="flex items-center gap-1 text-sm">
                                <Mail className="h-3 w-3 text-muted-foreground" />
                                {buyer.email}
                              </div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Phone className="h-3 w-3" />
                                {buyer.phone}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{buyer.country}</div>
                          </TableCell>
                          <TableCell>{getStatusBadge(buyer.status)}</TableCell>
                          <TableCell className="font-medium">{buyer.totalOrders}</TableCell>
                          <TableCell className="font-medium">
                            ${buyer.totalSpent.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(buyer.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(buyer.lastActive).toLocaleDateString()}
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
                                <DropdownMenuItem onClick={() => navigate(`/admin/buyers/${buyer.id}`)}>
                                  <Eye className="h-4 w-4 me-2" />
                                  View Details
                                </DropdownMenuItem>
                                {buyer.status !== 'active' && (
                                  <DropdownMenuItem onClick={() => handleStatusChange(buyer.id, 'active')}>
                                    <CheckCircle2 className="h-4 w-4 me-2" />
                                    Activate
                                  </DropdownMenuItem>
                                )}
                                {buyer.status !== 'suspended' && (
                                  <DropdownMenuItem onClick={() => handleStatusChange(buyer.id, 'suspended')}>
                                    <AlertCircle className="h-4 w-4 me-2" />
                                    Suspend
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })
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

export default Buyers;

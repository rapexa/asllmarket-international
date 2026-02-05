import React, { useState, useEffect } from 'react';
import {
  Download,
  Calendar,
  FileText,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Package,
  ShoppingCart,
  Filter,
  FileSpreadsheet,
  FileDown,
  BarChart3,
  PieChart as PieChartIcon,
  Loader2,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import AdminLayout from '@/components/admin/AdminLayout';
import { cn } from '@/lib/utils';
import { adminService } from '@/services';

type ReportType = 'sales' | 'users' | 'products' | 'orders';
type ExportFormat = 'pdf' | 'excel' | 'csv';

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState<ReportType>('sales');
  const [timeRange, setTimeRange] = useState('30d');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<ExportFormat>('pdf');
  const [isExporting, setIsExporting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [salesData, setSalesData] = useState<any[]>([]);
  const [usersData, setUsersData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [productsData] = useState<any[]>([
    { category: 'Electronics', active: 45000, pending: 5000, inactive: 8000, total: 58000 },
    { category: 'Apparel', active: 32000, pending: 3500, inactive: 4500, total: 40000 },
    { category: 'Home & Garden', active: 28000, pending: 2800, inactive: 3200, total: 34000 },
    { category: 'Automotive', active: 18000, pending: 2000, inactive: 2500, total: 22500 },
    { category: 'Others', active: 25000, pending: 3000, inactive: 4000, total: 32000 },
  ]);
  const [ordersData] = useState<any[]>([
    { month: 'Jan', total: 480, completed: 450, pending: 25, cancelled: 5 },
    { month: 'Feb', total: 520, completed: 490, pending: 22, cancelled: 8 },
    { month: 'Mar', total: 650, completed: 620, pending: 20, cancelled: 10 },
    { month: 'Apr', total: 580, completed: 550, pending: 18, cancelled: 12 },
    { month: 'May', total: 720, completed: 690, pending: 20, cancelled: 10 },
    { month: 'Jun', total: 820, completed: 780, pending: 30, cancelled: 10 },
  ]);
  const [topSuppliers] = useState<any[]>([
    { name: 'Tech Solutions Inc.', orders: 1240, revenue: 850000, rating: 4.8 },
    { name: 'Global Electronics Ltd.', orders: 980, revenue: 720000, rating: 4.7 },
    { name: 'Premium Goods Co.', orders: 850, revenue: 680000, rating: 4.9 },
    { name: 'Smart Devices Corp.', orders: 720, revenue: 540000, rating: 4.6 },
    { name: 'Quality Products Inc.', orders: 650, revenue: 480000, rating: 4.5 },
  ]);

  // Load data from backend
  useEffect(() => {
    const loadReportData = async () => {
      try {
        setLoading(true);
        const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;

        const [salesResponse, userStatsResponse, categoryStatsResponse, topProductsResponse] = await Promise.all([
          adminService.getSalesData(days),
          adminService.getUserStats(days),
          adminService.getCategoryStats(),
          adminService.getTopProducts(10),
        ]);

        // Transform sales data
        setSalesData(salesResponse.items.map(item => ({
          month: new Date(item.date).toLocaleDateString('en-US', { month: 'short' }),
          sales: item.sales,
          orders: item.orders,
          revenue: item.sales,
        })));

        // Transform user stats
        setUsersData(userStatsResponse.items.map(item => ({
          month: new Date(item.date).toLocaleDateString('en-US', { month: 'short' }),
          newUsers: item.newUsers,
          activeUsers: item.activeUsers,
          buyers: item.buyers,
          suppliers: item.suppliers,
        })));

        // Transform category stats for revenue data
        const revenueDataFromBackend = categoryStatsResponse.items.map(item => ({
          name: item.categoryName,
          value: item.percentage,
          amount: item.revenue,
          orders: item.productCount,
        }));
        
        setCategoryData(revenueDataFromBackend);

        // Transform top products
        setTopProducts(topProductsResponse.items.map(item => ({
          name: item.productName,
          sales: item.salesCount,
          revenue: item.revenue,
          growth: item.change,
        })));

      } catch (error) {
        console.error('Failed to load report data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadReportData();
  }, [timeRange]);

  // Use categoryData as revenueData for pie chart
  const revenueData = categoryData.length > 0 ? categoryData : [
    { name: 'Electronics', value: 35, amount: 885200 },
    { name: 'Apparel', value: 28, amount: 707520 },
    { name: 'Home & Garden', value: 20, amount: 505600 },
    { name: 'Automotive', value: 12, amount: 303360 },
    { name: 'Others', value: 5, amount: 126400 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const handleExport = async () => {
    setIsExporting(true);
    // Simulate export
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsExporting(false);
    setExportDialogOpen(false);
    // In real app, trigger download
    alert(`Report exported as ${exportFormat.toUpperCase()}`);
  };

  const getReportStats = () => {
    switch (reportType) {
      case 'sales':
        return {
          total: '$2,528,000',
          change: '+12.5%',
          trend: 'up',
          label: 'Total Revenue',
          secondary: '2,889 Orders',
        };
      case 'users':
        return {
          total: '45,678',
          change: '+15.3%',
          trend: 'up',
          label: 'Total Users',
          secondary: '1,010 New This Month',
        };
      case 'products':
        return {
          total: '234,567',
          change: '+5.7%',
          trend: 'up',
          label: 'Total Products',
          secondary: '128,000 Active',
        };
      case 'orders':
        return {
          total: '2,889',
          change: '+8.2%',
          trend: 'up',
          label: 'Total Orders',
          secondary: '$2,528,000 Revenue',
        };
      default:
        return {
          total: '0',
          change: '0%',
          trend: 'up',
          label: 'Total',
          secondary: '',
        };
    }
  };

  const stats = getReportStats();

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
            <h1 className="text-2xl sm:text-3xl font-bold">Reports & Analytics</h1>
            <p className="text-muted-foreground mt-1">Generate and export detailed reports</p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" onClick={() => setExportDialogOpen(true)}>
              <Download className="h-4 w-4 me-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
            <CardDescription>Customize your report parameters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Report Type</Label>
                <Select value={reportType} onValueChange={(value) => setReportType(value as ReportType)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales">Sales Report</SelectItem>
                    <SelectItem value="users">Users Report</SelectItem>
                    <SelectItem value="products">Products Report</SelectItem>
                    <SelectItem value="orders">Orders Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Time Range</Label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                    <SelectItem value="1y">Last year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {timeRange === 'custom' && (
                <>
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </>
              )}
              {reportType === 'sales' && (
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="apparel">Apparel</SelectItem>
                      <SelectItem value="home">Home & Garden</SelectItem>
                      <SelectItem value="automotive">Automotive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Report Type Selector */}
        <Card>
          <CardHeader>
            <CardTitle>Report Type</CardTitle>
            <CardDescription>Select the type of report you want to generate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Button
                variant={reportType === 'sales' ? 'default' : 'outline'}
                className={cn(
                  "h-auto flex-col py-4",
                  reportType === 'sales' && "bg-primary text-primary-foreground"
                )}
                onClick={() => setReportType('sales')}
              >
                <DollarSign className="h-5 w-5 mb-2" />
                <span className="text-sm font-medium">Sales</span>
              </Button>
              <Button
                variant={reportType === 'users' ? 'default' : 'outline'}
                className={cn(
                  "h-auto flex-col py-4",
                  reportType === 'users' && "bg-primary text-primary-foreground"
                )}
                onClick={() => setReportType('users')}
              >
                <Users className="h-5 w-5 mb-2" />
                <span className="text-sm font-medium">Users</span>
              </Button>
              <Button
                variant={reportType === 'products' ? 'default' : 'outline'}
                className={cn(
                  "h-auto flex-col py-4",
                  reportType === 'products' && "bg-primary text-primary-foreground"
                )}
                onClick={() => setReportType('products')}
              >
                <Package className="h-5 w-5 mb-2" />
                <span className="text-sm font-medium">Products</span>
              </Button>
              <Button
                variant={reportType === 'orders' ? 'default' : 'outline'}
                className={cn(
                  "h-auto flex-col py-4",
                  reportType === 'orders' && "bg-primary text-primary-foreground"
                )}
                onClick={() => setReportType('orders')}
              >
                <ShoppingCart className="h-5 w-5 mb-2" />
                <span className="text-sm font-medium">Orders</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>{stats.label}</CardDescription>
              <CardTitle className="text-2xl">{stats.total}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={cn(
                "flex items-center text-sm",
                stats.trend === 'up' ? "text-green-600" : "text-red-600"
              )}>
                {stats.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 me-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 me-1" />
                )}
                {stats.change} from last period
              </div>
              {stats.secondary && (
                <div className="text-xs text-muted-foreground mt-1">{stats.secondary}</div>
              )}
            </CardContent>
          </Card>
          {reportType === 'sales' && (
            <>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Orders</CardDescription>
                  <CardTitle className="text-2xl">2,889</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="h-4 w-4 me-1" />
                    +8.2% from last period
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Average Order Value</CardDescription>
                  <CardTitle className="text-2xl">$875</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="h-4 w-4 me-1" />
                    +4.1% from last period
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Conversion Rate</CardDescription>
                  <CardTitle className="text-2xl">3.2%</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="h-4 w-4 me-1" />
                    +0.3% from last period
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main Chart */}
          <Card>
            <CardHeader>
              <CardTitle>
                {reportType === 'sales' && 'Sales & Revenue Overview'}
                {reportType === 'users' && 'User Growth'}
                {reportType === 'products' && 'Products by Category'}
                {reportType === 'orders' && 'Orders Overview'}
              </CardTitle>
              <CardDescription>
                {reportType === 'sales' && 'Sales and revenue trends over time'}
                {reportType === 'users' && 'New and active users growth'}
                {reportType === 'products' && 'Product distribution across categories'}
                {reportType === 'orders' && 'Order trends and completion rates'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {reportType === 'sales' && (
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="sales" stroke="#0088FE" fill="#0088FE" fillOpacity={0.6} name="Sales ($)" />
                    <Area type="monotone" dataKey="revenue" stroke="#00C49F" fill="#00C49F" fillOpacity={0.6} name="Revenue ($)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
              {reportType === 'users' && (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={usersData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="newUsers" fill="#0088FE" name="New Users" />
                    <Bar dataKey="activeUsers" fill="#00C49F" name="Active Users" />
                  </BarChart>
                </ResponsiveContainer>
              )}
              {reportType === 'products' && (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={productsData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="category" type="category" width={100} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="active" fill="#00C49F" name="Active" />
                    <Bar dataKey="pending" fill="#FFBB28" name="Pending" />
                    <Bar dataKey="inactive" fill="#FF8042" name="Inactive" />
                  </BarChart>
                </ResponsiveContainer>
              )}
              {reportType === 'orders' && (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={ordersData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="total" stroke="#0088FE" strokeWidth={2} name="Total Orders" />
                    <Line type="monotone" dataKey="completed" stroke="#00C49F" strokeWidth={2} name="Completed" />
                    <Line type="monotone" dataKey="pending" stroke="#FFBB28" strokeWidth={2} name="Pending" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Secondary Chart */}
          <Card>
            <CardHeader>
              <CardTitle>
                {reportType === 'sales' && 'Revenue by Category'}
                {reportType === 'users' && 'User Distribution'}
                {reportType === 'products' && 'Product Status'}
                {reportType === 'orders' && 'Order Status Distribution'}
              </CardTitle>
              <CardDescription>
                {reportType === 'sales' && 'Revenue distribution across product categories'}
                {reportType === 'users' && 'Buyers vs Suppliers distribution'}
                {reportType === 'products' && 'Product status breakdown'}
                {reportType === 'orders' && 'Order status breakdown'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {reportType === 'sales' && (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={revenueData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {revenueData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
              {reportType === 'users' && (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Buyers', value: 75 },
                        { name: 'Suppliers', value: 25 },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      <Cell fill="#0088FE" />
                      <Cell fill="#00C49F" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
              {reportType === 'products' && (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={productsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#0088FE" name="Total Products" />
                  </BarChart>
                </ResponsiveContainer>
              )}
              {reportType === 'orders' && (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Completed', value: 85 },
                        { name: 'Pending', value: 10 },
                        { name: 'Cancelled', value: 5 },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      <Cell fill="#00C49F" />
                      <Cell fill="#FFBB28" />
                      <Cell fill="#FF8042" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Data Tables */}
        {(reportType === 'sales' || reportType === 'orders') && (
          <Card>
            <CardHeader>
              <CardTitle>
                {reportType === 'sales' && 'Top Products'}
                {reportType === 'orders' && 'Top Suppliers'}
              </CardTitle>
              <CardDescription>
                {reportType === 'sales' && 'Best performing products by sales'}
                {reportType === 'orders' && 'Top suppliers by order volume'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rank</TableHead>
                      <TableHead>Name</TableHead>
                      {reportType === 'sales' && (
                        <>
                          <TableHead>Sales</TableHead>
                          <TableHead>Revenue</TableHead>
                          <TableHead>Growth</TableHead>
                        </>
                      )}
                      {reportType === 'orders' && (
                        <>
                          <TableHead>Orders</TableHead>
                          <TableHead>Revenue</TableHead>
                          <TableHead>Rating</TableHead>
                        </>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportType === 'sales' && topProducts.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">#{index + 1}</TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.sales.toLocaleString()}</TableCell>
                        <TableCell className="font-medium">${product.revenue.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className={cn(
                            "flex items-center gap-1",
                            product.growth > 0 ? "text-green-600" : "text-red-600"
                          )}>
                            {product.growth > 0 ? (
                              <TrendingUp className="h-4 w-4" />
                            ) : (
                              <TrendingDown className="h-4 w-4" />
                            )}
                            {product.growth > 0 ? '+' : ''}{product.growth}%
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {reportType === 'orders' && topSuppliers.map((supplier, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">#{index + 1}</TableCell>
                        <TableCell className="font-medium">{supplier.name}</TableCell>
                        <TableCell>{supplier.orders.toLocaleString()}</TableCell>
                        <TableCell className="font-medium">${supplier.revenue.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className="font-medium">{supplier.rating}</span>
                            <span className="text-muted-foreground">/ 5.0</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Export Dialog */}
        <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Export Report</DialogTitle>
              <DialogDescription>
                Choose the format and export your {reportType} report
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Export Format</Label>
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant={exportFormat === 'pdf' ? 'default' : 'outline'}
                    className="h-auto flex-col py-4"
                    onClick={() => setExportFormat('pdf')}
                  >
                    <FileText className="h-5 w-5 mb-2" />
                    <span className="text-sm">PDF</span>
                  </Button>
                  <Button
                    variant={exportFormat === 'excel' ? 'default' : 'outline'}
                    className="h-auto flex-col py-4"
                    onClick={() => setExportFormat('excel')}
                  >
                    <FileSpreadsheet className="h-5 w-5 mb-2" />
                    <span className="text-sm">Excel</span>
                  </Button>
                  <Button
                    variant={exportFormat === 'csv' ? 'default' : 'outline'}
                    className="h-auto flex-col py-4"
                    onClick={() => setExportFormat('csv')}
                  >
                    <FileDown className="h-5 w-5 mb-2" />
                    <span className="text-sm">CSV</span>
                  </Button>
                </div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-sm font-medium mb-1">Report Details:</div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>Type: {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report</div>
                  <div>Time Range: {timeRange === 'custom' ? `${startDate} to ${endDate}` : timeRange}</div>
                  {selectedCategory !== 'all' && <div>Category: {selectedCategory}</div>}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setExportDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleExport} disabled={isExporting}>
                {isExporting ? (
                  <>
                    <Loader2 className="h-4 w-4 me-2 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 me-2" />
                    Export Report
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default Reports;
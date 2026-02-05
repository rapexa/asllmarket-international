import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Calendar,
  Filter,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  PieChart as PieChartIcon,
  FileText,
  Eye,
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
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import AdminLayout from '@/components/admin/AdminLayout';
import { cn } from '@/lib/utils';

const SalesDetails: React.FC = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('30d');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data - Daily sales for last 30 days
  const dailySalesData = [
    { date: '2024-01-01', sales: 45000, orders: 125, revenue: 47250, returns: 5 },
    { date: '2024-01-02', sales: 52000, orders: 145, revenue: 54600, returns: 3 },
    { date: '2024-01-03', sales: 48000, orders: 132, revenue: 50400, returns: 7 },
    { date: '2024-01-04', sales: 61000, orders: 168, revenue: 64050, returns: 4 },
    { date: '2024-01-05', sales: 55000, orders: 152, revenue: 57750, returns: 6 },
    { date: '2024-01-06', sales: 49000, orders: 138, revenue: 51450, returns: 2 },
    { date: '2024-01-07', sales: 53000, orders: 147, revenue: 55650, returns: 5 },
    { date: '2024-01-08', sales: 57000, orders: 158, revenue: 59850, returns: 4 },
    { date: '2024-01-09', sales: 62000, orders: 172, revenue: 65100, returns: 3 },
    { date: '2024-01-10', sales: 58000, orders: 161, revenue: 60900, returns: 6 },
    { date: '2024-01-11', sales: 64000, orders: 178, revenue: 67200, returns: 5 },
    { date: '2024-01-12', sales: 59000, orders: 164, revenue: 61950, returns: 4 },
    { date: '2024-01-13', sales: 66000, orders: 183, revenue: 69300, returns: 7 },
    { date: '2024-01-14', sales: 61000, orders: 169, revenue: 64050, returns: 3 },
    { date: '2024-01-15', sales: 68000, orders: 189, revenue: 71400, returns: 5 },
    { date: '2024-01-16', sales: 63000, orders: 175, revenue: 66150, returns: 4 },
    { date: '2024-01-17', sales: 70000, orders: 194, revenue: 73500, returns: 6 },
    { date: '2024-01-18', sales: 65000, orders: 180, revenue: 68250, returns: 5 },
    { date: '2024-01-19', sales: 72000, orders: 200, revenue: 75600, returns: 4 },
    { date: '2024-01-20', sales: 67000, orders: 186, revenue: 70350, returns: 6 },
    { date: '2024-01-21', sales: 74000, orders: 205, revenue: 77700, returns: 5 },
    { date: '2024-01-22', sales: 69000, orders: 191, revenue: 72450, returns: 4 },
    { date: '2024-01-23', sales: 76000, orders: 211, revenue: 79800, returns: 7 },
    { date: '2024-01-24', sales: 71000, orders: 197, revenue: 74550, returns: 5 },
    { date: '2024-01-25', sales: 78000, orders: 216, revenue: 81900, returns: 4 },
    { date: '2024-01-26', sales: 73000, orders: 203, revenue: 76650, returns: 6 },
    { date: '2024-01-27', sales: 80000, orders: 222, revenue: 84000, returns: 5 },
    { date: '2024-01-28', sales: 75000, orders: 208, revenue: 78750, returns: 4 },
    { date: '2024-01-29', sales: 82000, orders: 228, revenue: 86100, returns: 6 },
    { date: '2024-01-30', sales: 77000, orders: 214, revenue: 80850, returns: 5 },
  ];

  // Monthly comparison
  const monthlyData = [
    { month: 'Jul', sales: 1850000, orders: 5120, revenue: 1942500, growth: 8.5 },
    { month: 'Aug', sales: 1920000, orders: 5320, revenue: 2016000, growth: 3.8 },
    { month: 'Sep', sales: 2100000, orders: 5820, revenue: 2205000, growth: 9.4 },
    { month: 'Oct', sales: 2250000, orders: 6240, revenue: 2362500, growth: 7.1 },
    { month: 'Nov', sales: 2400000, orders: 6660, revenue: 2520000, growth: 6.7 },
    { month: 'Dec', sales: 2650000, orders: 7350, revenue: 2782500, growth: 10.4 },
  ];

  // Revenue by category
  const categoryRevenue = [
    { name: 'Electronics', revenue: 850000, orders: 2340, percentage: 35, growth: 12.5 },
    { name: 'Apparel', value: 25, revenue: 600000, orders: 1680, percentage: 25, growth: 8.3 },
    { name: 'Home & Garden', revenue: 480000, orders: 1320, percentage: 20, growth: 15.7 },
    { name: 'Automotive', revenue: 360000, orders: 990, percentage: 15, growth: 5.2 },
    { name: 'Other', revenue: 120000, orders: 330, percentage: 5, growth: 3.1 },
  ];

  // Top products
  const topProducts = [
    { id: 1, name: 'Smartphone Pro Max 256GB', sales: 1234, revenue: 1108800, avgOrder: 899, growth: 12.5 },
    { id: 2, name: 'Wireless Headphones Premium', sales: 987, revenue: 127323, avgOrder: 129, growth: 8.3 },
    { id: 3, name: 'Laptop Ultra 15" 512GB', sales: 765, revenue: 1147350, avgOrder: 1499, growth: -5.2 },
    { id: 4, name: 'Smart Watch Series 8', sales: 654, revenue: 195546, avgOrder: 299, growth: 15.7 },
    { id: 5, name: 'Tablet Air 12.9" 256GB', sales: 543, revenue: 325257, avgOrder: 599, growth: 3.1 },
    { id: 6, name: 'Gaming Mouse Pro', sales: 432, revenue: 51840, avgOrder: 120, growth: 9.8 },
    { id: 7, name: 'Mechanical Keyboard RGB', sales: 321, revenue: 48150, avgOrder: 150, growth: 7.2 },
    { id: 8, name: 'Monitor 27" 4K', sales: 298, revenue: 447000, avgOrder: 1500, growth: 11.4 },
  ];

  // Top customers
  const topCustomers = [
    { id: 1, name: 'ABC Trading Co.', orders: 156, revenue: 140400, avgOrder: 900, status: 'VIP' },
    { id: 2, name: 'Global Import Ltd.', orders: 134, revenue: 120600, avgOrder: 900, status: 'VIP' },
    { id: 3, name: 'Tech Solutions Inc.', orders: 98, revenue: 147000, avgOrder: 1500, status: 'Premium' },
    { id: 4, name: 'Retail Partners Group', orders: 87, revenue: 78300, avgOrder: 900, status: 'Premium' },
    { id: 5, name: 'Electronics Wholesale', orders: 76, revenue: 114000, avgOrder: 1500, status: 'Standard' },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Calculate totals
  const totalSales = dailySalesData.reduce((sum, day) => sum + day.sales, 0);
  const totalOrders = dailySalesData.reduce((sum, day) => sum + day.orders, 0);
  const totalRevenue = dailySalesData.reduce((sum, day) => sum + day.revenue, 0);
  const totalReturns = dailySalesData.reduce((sum, day) => sum + day.returns, 0);
  const avgOrderValue = totalRevenue / totalOrders;
  const returnRate = (totalReturns / totalOrders) * 100;

  // Calculate growth
  const salesGrowth = 12.5;
  const ordersGrowth = 8.2;
  const revenueGrowth = 10.3;

  return (
    <AdminLayout>
      <div className="space-y-6 p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => navigate('/admin')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Sales Details</h1>
              <p className="text-muted-foreground mt-1">Comprehensive sales analytics and insights</p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" onClick={() => {}}>
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
            <CardDescription>Customize your sales data view</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Sales</CardDescription>
              <CardTitle className="text-2xl">${(totalSales / 1000).toFixed(0)}K</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={cn(
                "flex items-center text-sm",
                salesGrowth > 0 ? "text-green-600" : "text-red-600"
              )}>
                {salesGrowth > 0 ? (
                  <TrendingUp className="h-4 w-4 me-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 me-1" />
                )}
                {salesGrowth > 0 ? '+' : ''}{salesGrowth}% from last period
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Orders</CardDescription>
              <CardTitle className="text-2xl">{totalOrders.toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={cn(
                "flex items-center text-sm",
                ordersGrowth > 0 ? "text-green-600" : "text-red-600"
              )}>
                {ordersGrowth > 0 ? (
                  <TrendingUp className="h-4 w-4 me-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 me-1" />
                )}
                {ordersGrowth > 0 ? '+' : ''}{ordersGrowth}% from last period
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Revenue</CardDescription>
              <CardTitle className="text-2xl">${(totalRevenue / 1000).toFixed(0)}K</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={cn(
                "flex items-center text-sm",
                revenueGrowth > 0 ? "text-green-600" : "text-red-600"
              )}>
                {revenueGrowth > 0 ? (
                  <TrendingUp className="h-4 w-4 me-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 me-1" />
                )}
                {revenueGrowth > 0 ? '+' : ''}{revenueGrowth}% from last period
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Average Order Value</CardDescription>
              <CardTitle className="text-2xl">${avgOrderValue.toFixed(0)}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Return rate: {returnRate.toFixed(1)}%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Sales Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Sales Trend</CardTitle>
              <CardDescription>Sales and revenue over the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={dailySalesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="sales" stroke="#0088FE" fill="#0088FE" fillOpacity={0.6} name="Sales ($)" />
                  <Area type="monotone" dataKey="revenue" stroke="#00C49F" fill="#00C49F" fillOpacity={0.6} name="Revenue ($)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monthly Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Comparison</CardTitle>
              <CardDescription>Sales performance by month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#0088FE" name="Sales ($)" />
                  <Bar dataKey="revenue" fill="#00C49F" name="Revenue ($)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Revenue by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Category</CardTitle>
            <CardDescription>Sales distribution across product categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryRevenue}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} ${percentage}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="percentage"
                  >
                    {categoryRevenue.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                {categoryRevenue.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                      <div>
                        <div className="font-medium">{category.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {category.orders} orders
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${(category.revenue / 1000).toFixed(0)}K</div>
                      <div className={cn(
                        "text-xs flex items-center gap-1",
                        category.growth > 0 ? "text-green-600" : "text-red-600"
                      )}>
                        {category.growth > 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {category.growth > 0 ? '+' : ''}{category.growth}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>Best performing products by sales volume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Sales</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Avg Order</TableHead>
                    <TableHead>Growth</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topProducts.map((product, index) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">#{index + 1}</TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.sales.toLocaleString()}</TableCell>
                      <TableCell className="font-medium">${product.revenue.toLocaleString()}</TableCell>
                      <TableCell>${product.avgOrder}</TableCell>
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
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Top Customers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Customers</CardTitle>
            <CardDescription>Customers with highest order volume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Avg Order</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topCustomers.map((customer, index) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">#{index + 1}</TableCell>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.orders}</TableCell>
                      <TableCell className="font-medium">${customer.revenue.toLocaleString()}</TableCell>
                      <TableCell>${customer.avgOrder}</TableCell>
                      <TableCell>
                        <Badge variant={customer.status === 'VIP' ? 'default' : customer.status === 'Premium' ? 'secondary' : 'outline'}>
                          {customer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default SalesDetails;

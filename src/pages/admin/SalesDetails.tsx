import React, { useState, useEffect } from 'react';
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
import { adminService } from '@/services';

const SalesDetails: React.FC = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('30d');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState<boolean>(true);

  const [dailySalesData, setDailySalesData] = useState<
    { date: string; sales: number; orders: number; revenue: number; returns: number }[]
  >([]);

  const [monthlyData, setMonthlyData] = useState<
    { month: string; sales: number; orders: number; revenue: number; growth: number }[]
  >([]);

  const [categoryRevenue, setCategoryRevenue] = useState<
    { name: string; revenue: number; orders: number; percentage: number; growth: number }[]
  >([]);

  const [topProducts, setTopProducts] = useState<
    { id: string; name: string; sales: number; revenue: number; avgOrder: number; growth: number }[]
  >([]);

  const [topCustomers, setTopCustomers] = useState<
    { id: string; name: string; orders: number; revenue: number; avgOrder: number; status: 'VIP' | 'Premium' | 'Standard' }[]
  >([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const days =
          timeRange === '7d' ? 7 :
          timeRange === '30d' ? 30 :
          timeRange === '90d' ? 90 :
          timeRange === '1y' ? 365 : 30;

        const [salesRes, categoryRes, topProductsRes, buyersRes] = await Promise.all([
          adminService.getSalesData(days),
          adminService.getCategoryStats(),
          adminService.getTopProducts(8),
          adminService.listBuyers({ limit: 5, offset: 0 }),
        ]);

        const salesItems = salesRes.items || [];
        const mappedDaily = salesItems.map((d) => ({
          date: d.date,
          sales: d.sales,
          orders: d.orders,
          revenue: d.sales,
          returns: 0,
        }));
        setDailySalesData(mappedDaily);

        const monthMap: Record<string, { sales: number; orders: number; revenue: number }> = {};
        mappedDaily.forEach((d) => {
          const m = new Date(d.date);
          const key = `${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, '0')}`;
          if (!monthMap[key]) {
            monthMap[key] = { sales: 0, orders: 0, revenue: 0 };
          }
          monthMap[key].sales += d.sales;
          monthMap[key].orders += d.orders;
          monthMap[key].revenue += d.revenue;
        });
        const months = Object.entries(monthMap)
          .sort(([a], [b]) => (a > b ? 1 : -1))
          .slice(-6);
        const monthly = months.map(([key, val], index) => {
          const date = new Date(`${key}-01`);
          const prev = index > 0 ? months[index - 1][1].sales : val.sales;
          const growth = prev ? ((val.sales - prev) / prev) * 100 : 0;
          return {
            month: date.toLocaleString('en-US', { month: 'short' }),
            sales: val.sales,
            orders: val.orders,
            revenue: val.revenue,
            growth: parseFloat(growth.toFixed(1)),
          };
        });
        setMonthlyData(monthly);

        const catItems = categoryRes.items || [];
        const mappedCats = catItems.map((c) => ({
          name: c.categoryName,
          revenue: c.revenue,
          orders: c.productCount,
          percentage: c.percentage,
          growth: 0,
        }));
        setCategoryRevenue(mappedCats);

        const topItems = topProductsRes.items || [];
        const mappedTop = topItems.map((p) => {
          const avgOrder = p.salesCount ? p.revenue / p.salesCount : 0;
          return {
            id: p.productId,
            name: p.productName,
            sales: p.salesCount,
            revenue: p.revenue,
            avgOrder: Math.round(avgOrder),
            growth: p.change,
          };
        });
        setTopProducts(mappedTop);

        const buyerItems = buyersRes.items || [];
        const mappedCustomers = buyerItems.map((b) => {
          const avgOrder = b.totalOrders ? b.totalSpent / b.totalOrders : 0;
          const status: 'VIP' | 'Premium' | 'Standard' =
            b.totalSpent >= 200000 ? 'VIP' :
            b.totalSpent >= 100000 ? 'Premium' :
            'Standard';
          return {
            id: b.id,
            name: b.fullName || b.email,
            orders: b.totalOrders,
            revenue: b.totalSpent,
            avgOrder: Math.round(avgOrder),
            status,
          };
        });
        setTopCustomers(mappedCustomers);
      } catch (e) {
        console.error('Failed to load sales details:', e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [timeRange]);

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

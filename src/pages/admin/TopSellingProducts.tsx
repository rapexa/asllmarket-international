import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Filter,
  Search,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Package,
  Eye,
  BarChart3,
  Calendar,
  ArrowUpDown,
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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import AdminLayout from '@/components/admin/AdminLayout';
import { cn } from '@/lib/utils';

const TopSellingProducts: React.FC = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('30d');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('sales');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Mock data - Extended list of top selling products
  const allTopProducts = [
    { id: 1, name: 'Smartphone Pro Max 256GB', category: 'Electronics', sales: 1234, revenue: 1108800, avgOrder: 899, growth: 12.5, stock: 450, status: 'active' },
    { id: 2, name: 'Wireless Headphones Premium', category: 'Electronics', sales: 987, revenue: 127323, avgOrder: 129, growth: 8.3, stock: 320, status: 'active' },
    { id: 3, name: 'Laptop Ultra 15" 512GB', category: 'Electronics', sales: 765, revenue: 1147350, avgOrder: 1499, growth: -5.2, stock: 180, status: 'active' },
    { id: 4, name: 'Smart Watch Series 8', category: 'Electronics', sales: 654, revenue: 195546, avgOrder: 299, growth: 15.7, stock: 280, status: 'active' },
    { id: 5, name: 'Tablet Air 12.9" 256GB', category: 'Electronics', sales: 543, revenue: 325257, avgOrder: 599, growth: 3.1, stock: 150, status: 'active' },
    { id: 6, name: 'Gaming Mouse Pro', category: 'Electronics', sales: 432, revenue: 51840, avgOrder: 120, growth: 9.8, stock: 500, status: 'active' },
    { id: 7, name: 'Mechanical Keyboard RGB', category: 'Electronics', sales: 321, revenue: 48150, avgOrder: 150, growth: 7.2, stock: 380, status: 'active' },
    { id: 8, name: 'Monitor 27" 4K', category: 'Electronics', sales: 298, revenue: 447000, avgOrder: 1500, growth: 11.4, stock: 120, status: 'active' },
    { id: 9, name: 'Wireless Charger Stand', category: 'Electronics', sales: 287, revenue: 43050, avgOrder: 150, growth: 6.5, stock: 600, status: 'active' },
    { id: 10, name: 'USB-C Hub 7-in-1', category: 'Electronics', sales: 265, revenue: 39750, avgOrder: 150, growth: 4.8, stock: 450, status: 'active' },
    { id: 11, name: 'Cotton T-Shirt Premium', category: 'Apparel', sales: 1234, revenue: 61700, avgOrder: 50, growth: 18.2, stock: 2000, status: 'active' },
    { id: 12, name: 'Denim Jeans Classic', category: 'Apparel', sales: 987, revenue: 98700, avgOrder: 100, growth: 12.5, stock: 1500, status: 'active' },
    { id: 13, name: 'Leather Jacket', category: 'Apparel', sales: 654, revenue: 196200, avgOrder: 300, growth: 9.3, stock: 400, status: 'active' },
    { id: 14, name: 'Running Shoes Pro', category: 'Apparel', sales: 543, revenue: 108600, avgOrder: 200, growth: 15.7, stock: 800, status: 'active' },
    { id: 15, name: 'Backpack Travel 30L', category: 'Apparel', sales: 432, revenue: 86400, avgOrder: 200, growth: 7.8, stock: 600, status: 'active' },
    { id: 16, name: 'Coffee Maker Deluxe', category: 'Home & Garden', sales: 321, revenue: 96300, avgOrder: 300, growth: 11.2, stock: 250, status: 'active' },
    { id: 17, name: 'Air Purifier HEPA', category: 'Home & Garden', sales: 298, revenue: 89400, avgOrder: 300, growth: 8.9, stock: 180, status: 'active' },
    { id: 18, name: 'Robot Vacuum Cleaner', category: 'Home & Garden', sales: 265, revenue: 132500, avgOrder: 500, growth: 13.5, stock: 120, status: 'active' },
    { id: 19, name: 'LED Desk Lamp', category: 'Home & Garden', sales: 234, revenue: 35100, avgOrder: 150, growth: 5.6, stock: 800, status: 'active' },
    { id: 20, name: 'Smart Thermostat', category: 'Home & Garden', sales: 198, revenue: 59400, avgOrder: 300, growth: 10.3, stock: 300, status: 'active' },
    { id: 21, name: 'Car Phone Mount', category: 'Automotive', sales: 456, revenue: 45600, avgOrder: 100, growth: 14.2, stock: 1000, status: 'active' },
    { id: 22, name: 'Dash Cam 4K', category: 'Automotive', sales: 345, revenue: 103500, avgOrder: 300, growth: 9.7, stock: 400, status: 'active' },
    { id: 23, name: 'Car Charger Fast', category: 'Automotive', sales: 287, revenue: 28700, avgOrder: 100, growth: 6.4, stock: 1200, status: 'active' },
    { id: 24, name: 'Tire Pressure Monitor', category: 'Automotive', sales: 198, revenue: 59400, avgOrder: 300, growth: 8.1, stock: 350, status: 'active' },
    { id: 25, name: 'Car Seat Cover Set', category: 'Automotive', sales: 165, revenue: 49500, avgOrder: 300, growth: 4.5, stock: 500, status: 'active' },
  ];

  // Filter and sort products
  const filteredProducts = allTopProducts
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      let aValue: number;
      let bValue: number;

      switch (sortBy) {
        case 'sales':
          aValue = a.sales;
          bValue = b.sales;
          break;
        case 'revenue':
          aValue = a.revenue;
          bValue = b.revenue;
          break;
        case 'growth':
          aValue = a.growth;
          bValue = b.growth;
          break;
        case 'name':
          return sortOrder === 'asc' 
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        default:
          aValue = a.sales;
          bValue = b.sales;
      }

      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

  // Chart data - Top 10 by sales
  const chartData = filteredProducts.slice(0, 10).map(product => ({
    name: product.name.length > 15 ? product.name.substring(0, 15) + '...' : product.name,
    sales: product.sales,
    revenue: product.revenue / 1000, // In thousands
  }));

  // Summary stats
  const totalSales = filteredProducts.reduce((sum, p) => sum + p.sales, 0);
  const totalRevenue = filteredProducts.reduce((sum, p) => sum + p.revenue, 0);
  const avgGrowth = filteredProducts.reduce((sum, p) => sum + p.growth, 0) / filteredProducts.length;
  const totalProducts = filteredProducts.length;

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

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
              <h1 className="text-2xl sm:text-3xl font-bold">Top Selling Products</h1>
              <p className="text-muted-foreground mt-1">Comprehensive view of best performing products</p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" onClick={() => {}}>
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
              <CardTitle className="text-2xl">{totalProducts}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <Package className="h-4 w-4 me-1" />
                Active products
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Sales</CardDescription>
              <CardTitle className="text-2xl">{totalSales.toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <ShoppingCart className="h-4 w-4 me-1" />
                Units sold
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Revenue</CardDescription>
              <CardTitle className="text-2xl">${(totalRevenue / 1000).toFixed(0)}K</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <DollarSign className="h-4 w-4 me-1" />
                Generated revenue
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Average Growth</CardDescription>
              <CardTitle className="text-2xl">{avgGrowth > 0 ? '+' : ''}{avgGrowth.toFixed(1)}%</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={cn(
                "flex items-center text-sm",
                avgGrowth > 0 ? "text-green-600" : "text-red-600"
              )}>
                {avgGrowth > 0 ? (
                  <TrendingUp className="h-4 w-4 me-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 me-1" />
                )}
                Sales growth
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
            <CardDescription>Filter and search products</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
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
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Apparel">Apparel</SelectItem>
                    <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                    <SelectItem value="Automotive">Automotive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Sort By</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="revenue">Revenue</SelectItem>
                    <SelectItem value="growth">Growth</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Top 10 Products by Sales</CardTitle>
              <CardDescription>Sales volume comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#0088FE" name="Sales" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Top 10 Products by Revenue</CardTitle>
              <CardDescription>Revenue comparison (in thousands)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#00C49F" strokeWidth={2} name="Revenue ($K)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Top Selling Products</CardTitle>
            <CardDescription>
              Showing {filteredProducts.length} products sorted by {sortBy} ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Rank</TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 -ml-3"
                        onClick={() => handleSort('name')}
                      >
                        Product Name
                        <ArrowUpDown className={cn(
                          "h-3 w-3 ms-2",
                          sortBy === 'name' ? 'opacity-100' : 'opacity-40'
                        )} />
                      </Button>
                    </TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 -ml-3"
                        onClick={() => handleSort('sales')}
                      >
                        Sales
                        <ArrowUpDown className={cn(
                          "h-3 w-3 ms-2",
                          sortBy === 'sales' ? 'opacity-100' : 'opacity-40'
                        )} />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 -ml-3"
                        onClick={() => handleSort('revenue')}
                      >
                        Revenue
                        <ArrowUpDown className={cn(
                          "h-3 w-3 ms-2",
                          sortBy === 'revenue' ? 'opacity-100' : 'opacity-40'
                        )} />
                      </Button>
                    </TableHead>
                    <TableHead>Avg Order</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 -ml-3"
                        onClick={() => handleSort('growth')}
                      >
                        Growth
                        <ArrowUpDown className={cn(
                          "h-3 w-3 ms-2",
                          sortBy === 'growth' ? 'opacity-100' : 'opacity-40'
                        )} />
                      </Button>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product, index) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">#{index + 1}</TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell>{product.sales.toLocaleString()}</TableCell>
                      <TableCell className="font-medium">${product.revenue.toLocaleString()}</TableCell>
                      <TableCell>${product.avgOrder}</TableCell>
                      <TableCell>
                        <span className={cn(
                          "text-sm",
                          product.stock < 200 ? "text-red-600 font-medium" : "text-muted-foreground"
                        )}>
                          {product.stock}
                        </span>
                      </TableCell>
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
                          <span className="text-sm font-medium">
                            {product.growth > 0 ? '+' : ''}{product.growth}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/products/${product.id}`)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No products found matching your criteria.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default TopSellingProducts;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  FolderOpen,
  Eye,
  Download,
  Upload,
  Folder
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
import { categories, Category } from '@/data/categories';
import { getCategoryName } from '@/data/categories';
import AdminLayout from '@/components/admin/AdminLayout';
import { useLanguage } from '@/contexts/LanguageContext';

const AdminCategories: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = categories.filter((category) => {
    const name = getCategoryName(category, language);
    return name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           category.id.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <AdminLayout>
      <div className="space-y-6 p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Categories Management</h1>
            <p className="text-muted-foreground mt-1">Manage all product categories</p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 me-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 me-2" />
              Import
            </Button>
            <Button>
              <Plus className="h-4 w-4 me-2" />
              Add Category
            </Button>
          </div>
        </div>

        {/* Search */}
        <Card>
          <CardHeader>
            <CardTitle>Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute start-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ps-9"
              />
            </div>
          </CardContent>
        </Card>

        {/* Categories Table */}
        <Card>
          <CardHeader>
            <CardTitle>Categories ({filteredCategories.length})</CardTitle>
            <CardDescription>All categories in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Icon</TableHead>
                    <TableHead>Subcategories</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Suppliers</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead>Trending</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCategories.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        No categories found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCategories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{getCategoryName(category, language)}</div>
                            <div className="text-sm text-muted-foreground">
                              ID: {category.id}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-2xl">{category.icon}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {category.subcategories.length} subcategories
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{category.productCount.toLocaleString()}</TableCell>
                        <TableCell className="font-medium">{category.supplierCount.toLocaleString()}</TableCell>
                        <TableCell>
                          {category.featured ? (
                            <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                              Yes
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-300">
                              No
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {category.trending ? (
                            <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-300">
                              Yes
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-300">
                              No
                            </Badge>
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
                              <DropdownMenuItem onClick={() => navigate(`/admin/categories/${category.id}`)}>
                                <Eye className="h-4 w-4 me-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => navigate(`/admin/categories/${category.id}/edit`)}>
                                <Edit className="h-4 w-4 me-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 me-2" />
                                Delete
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

export default AdminCategories;

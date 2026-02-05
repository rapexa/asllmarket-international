import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  ArrowLeft,
  Package,
  Upload,
  X,
  Image as ImageIcon,
  Plus,
  Trash2,
  Save,
  Loader2,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import AdminLayout from '@/components/admin/AdminLayout';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

const productSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Please select a category'),
  supplier: z.string().min(1, 'Please select a supplier'),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  moq: z.number().int().min(1, 'MOQ must be at least 1'),
  stock: z.number().int().min(0, 'Stock cannot be negative'),
  status: z.enum(['active', 'inactive', 'pending']),
  specifications: z.string().optional(),
  shippingInfo: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

const categories = [
  'Consumer Electronics',
  'Apparel',
  'Home & Garden',
  'Automotive',
  'Sports & Outdoors',
  'Health & Beauty',
  'Toys & Games',
  'Food & Beverage',
  'Industrial & Scientific',
  'Other',
];

const mockSuppliers = [
  { id: '1', name: 'Tech Supplier Co.', country: 'China' },
  { id: '2', name: 'Audio Solutions Ltd.', country: 'USA' },
  { id: '3', name: 'Computing Inc.', country: 'Taiwan' },
  { id: '4', name: 'Wearables Co.', country: 'China' },
  { id: '5', name: 'Mobile Devices Ltd.', country: 'South Korea' },
];

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const { language, dir } = useLanguage();
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      status: 'pending',
      stock: 0,
      moq: 1,
      price: 0,
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = [...images, ...files];
    setImages(newImages);

    // Create previews
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In real app, upload images and create product
      console.log('Product data:', data);
      console.log('Images:', images);

      setSubmitSuccess(true);
      setTimeout(() => {
        navigate('/admin/products');
      }, 2000);
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
          <Card className="w-full max-w-md text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <Package className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl">Product Created Successfully!</CardTitle>
              <CardDescription>Redirecting to products page...</CardDescription>
            </CardHeader>
          </Card>
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
            onClick={() => navigate('/admin/products')}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold">Add New Product</h1>
            <p className="text-muted-foreground mt-1">Create a new product listing</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Essential product details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Product Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      {...register('name')}
                      placeholder="Enter product name"
                      className={cn(errors.name && 'border-destructive')}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">
                      Description <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      {...register('description')}
                      placeholder="Enter detailed product description"
                      className={cn('min-h-[120px]', errors.description && 'border-destructive')}
                    />
                    {errors.description && (
                      <p className="text-sm text-destructive">{errors.description.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">
                        Category <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={watch('category')}
                        onValueChange={(value) => setValue('category', value)}
                      >
                        <SelectTrigger
                          id="category"
                          className={cn(errors.category && 'border-destructive')}
                        >
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <p className="text-sm text-destructive">{errors.category.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="supplier">
                        Supplier <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={watch('supplier')}
                        onValueChange={(value) => setValue('supplier', value)}
                      >
                        <SelectTrigger
                          id="supplier"
                          className={cn(errors.supplier && 'border-destructive')}
                        >
                          <SelectValue placeholder="Select supplier" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockSuppliers.map((supplier) => (
                            <SelectItem key={supplier.id} value={supplier.id}>
                              {supplier.name} ({supplier.country})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.supplier && (
                        <p className="text-sm text-destructive">{errors.supplier.message}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing & Inventory */}
              <Card>
                <CardHeader>
                  <CardTitle>Pricing & Inventory</CardTitle>
                  <CardDescription>Set product pricing and stock information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">
                        Price (USD) <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        {...register('price', { valueAsNumber: true })}
                        placeholder="0.00"
                        className={cn(errors.price && 'border-destructive')}
                      />
                      {errors.price && (
                        <p className="text-sm text-destructive">{errors.price.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="moq">
                        MOQ <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="moq"
                        type="number"
                        {...register('moq', { valueAsNumber: true })}
                        placeholder="1"
                        className={cn(errors.moq && 'border-destructive')}
                      />
                      {errors.moq && (
                        <p className="text-sm text-destructive">{errors.moq.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="stock">
                        Stock Quantity <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="stock"
                        type="number"
                        {...register('stock', { valueAsNumber: true })}
                        placeholder="0"
                        className={cn(errors.stock && 'border-destructive')}
                      />
                      {errors.stock && (
                        <p className="text-sm text-destructive">{errors.stock.message}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Product Images */}
              <Card>
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                  <CardDescription>Upload product images (up to 10 images)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Product ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {images.length < 10 && (
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                        <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">Add Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  {images.length === 0 && (
                    <Alert>
                      <ImageIcon className="h-4 w-4" />
                      <AlertDescription>
                        At least one product image is recommended for better visibility.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Additional Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Information</CardTitle>
                  <CardDescription>Optional product details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="specifications">Specifications</Label>
                    <Textarea
                      id="specifications"
                      {...register('specifications')}
                      placeholder="Enter product specifications (e.g., dimensions, weight, materials)"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shippingInfo">Shipping Information</Label>
                    <Textarea
                      id="shippingInfo"
                      {...register('shippingInfo')}
                      placeholder="Enter shipping details (e.g., shipping methods, delivery time, packaging)"
                      className="min-h-[100px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Status</CardTitle>
                  <CardDescription>Set product status</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select
                    value={watch('status')}
                    onValueChange={(value) => setValue('status', value as 'active' | 'inactive' | 'pending')}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-300">
                            Pending
                          </Badge>
                        </div>
                      </SelectItem>
                      <SelectItem value="active">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                            Active
                          </Badge>
                        </div>
                      </SelectItem>
                      <SelectItem value="inactive">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-300">
                            Inactive
                          </Badge>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 me-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 me-2" />
                        Create Product
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate('/admin/products')}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card>
                <CardHeader>
                  <CardTitle>Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Use clear, high-quality product images</li>
                    <li>• Provide detailed descriptions for better visibility</li>
                    <li>• Set accurate pricing and MOQ</li>
                    <li>• Include shipping information</li>
                    <li>• Products will be reviewed before going live</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddProduct;

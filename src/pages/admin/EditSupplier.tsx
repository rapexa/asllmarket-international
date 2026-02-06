import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  ArrowLeft,
  Save,
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  FileText,
  Loader2,
  CheckCircle2,
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
import { supplierService, Supplier, UpdateSupplierRequest } from '@/services';

const supplierSchema = z.object({
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  legalName: z.string().min(2, 'Legal name must be at least 2 characters'),
  contactName: z.string().min(2, 'Contact name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(5, 'Phone number must be at least 5 characters'),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  zipCode: z.string().optional(),
  status: z.enum(['active', 'inactive', 'suspended', 'pending']),
  subscription: z.enum(['free', 'silver', 'gold', 'diamond']),
  description: z.string().optional(),
  businessType: z.string().min(1, 'Business type is required'),
  registrationNumber: z.string().optional(),
  taxId: z.string().optional(),
});

type SupplierFormInputs = z.infer<typeof supplierSchema>;

const EditSupplier: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SupplierFormInputs>({
    resolver: zodResolver(supplierSchema),
  });

  useEffect(() => {
    const loadSupplier = async () => {
      if (!id) return;
      try {
        setInitialLoading(true);
        const supplier: Supplier = await supplierService.getById(id);
        const defaults: SupplierFormInputs = {
          companyName: supplier.companyName,
          legalName: supplier.companyName,
          contactName: supplier.contactName,
          email: supplier.email,
          phone: supplier.phone,
          website: '',
          country: supplier.country,
          city: supplier.city,
          address: supplier.address,
          zipCode: '',
          status: supplier.status,
          subscription: supplier.subscription,
          description: supplier.description,
          businessType: '',
          registrationNumber: '',
          taxId: '',
        };
        (Object.keys(defaults) as (keyof SupplierFormInputs)[]).forEach((key) => {
          setValue(key, defaults[key]);
        });
      } catch (error) {
        console.error('Failed to load supplier:', error);
        setSubmitError('Failed to load supplier data. Please try again.');
      } finally {
        setInitialLoading(false);
      }
    };

    loadSupplier();
  }, [id, setValue]);

  const onSubmit = async (data: SupplierFormInputs) => {
    if (!id) return;
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const payload: UpdateSupplierRequest = {
        companyName: data.companyName,
        contactName: data.contactName,
        phone: data.phone,
        address: data.address,
        city: data.city,
        description: data.description,
        status: data.status,
        subscription: data.subscription,
      };

      await supplierService.update(id, payload);
      setSubmitSuccess(true);
      setTimeout(() => {
        navigate(`/admin/suppliers/${id}`);
      }, 2000);
    } catch (error) {
      console.error('Failed to update supplier:', error);
      setSubmitError('Failed to update supplier. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (initialLoading) {
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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => navigate(`/admin/suppliers/${id}`)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Edit Supplier</h1>
              <p className="text-muted-foreground mt-1">Update supplier information</p>
            </div>
          </div>
        </div>

        {/* Success/Error Messages */}
        {submitSuccess && (
          <Alert className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription>
              Supplier updated successfully! Redirecting...
            </AlertDescription>
          </Alert>
        )}
        {submitError && (
          <Alert variant="destructive">
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Basic company details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    {...register('companyName')}
                    className={cn(errors.companyName && 'border-red-500')}
                  />
                  {errors.companyName && (
                    <p className="text-sm text-red-500">{errors.companyName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="legalName">Legal Name *</Label>
                  <Input
                    id="legalName"
                    {...register('legalName')}
                    className={cn(errors.legalName && 'border-red-500')}
                  />
                  {errors.legalName && (
                    <p className="text-sm text-red-500">{errors.legalName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type *</Label>
                  <Input
                    id="businessType"
                    {...register('businessType')}
                    placeholder="e.g., Manufacturer & Exporter"
                    className={cn(errors.businessType && 'border-red-500')}
                  />
                  {errors.businessType && (
                    <p className="text-sm text-red-500">{errors.businessType.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">Registration Number</Label>
                  <Input
                    id="registrationNumber"
                    {...register('registrationNumber')}
                    placeholder="Optional"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    {...register('description')}
                    rows={3}
                    placeholder="Company description..."
                  />
                </div>
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
                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Person *</Label>
                  <Input
                    id="contactName"
                    {...register('contactName')}
                    className={cn(errors.contactName && 'border-red-500')}
                  />
                  {errors.contactName && (
                    <p className="text-sm text-red-500">{errors.contactName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    className={cn(errors.email && 'border-red-500')}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    {...register('phone')}
                    className={cn(errors.phone && 'border-red-500')}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    {...register('website')}
                    placeholder="https://example.com"
                    className={cn(errors.website && 'border-red-500')}
                  />
                  {errors.website && (
                    <p className="text-sm text-red-500">{errors.website.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    {...register('country')}
                    className={cn(errors.country && 'border-red-500')}
                  />
                  {errors.country && (
                    <p className="text-sm text-red-500">{errors.country.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    {...register('city')}
                    className={cn(errors.city && 'border-red-500')}
                  />
                  {errors.city && (
                    <p className="text-sm text-red-500">{errors.city.message}</p>
                  )}
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    {...register('address')}
                    className={cn(errors.address && 'border-red-500')}
                  />
                  {errors.address && (
                    <p className="text-sm text-red-500">{errors.address.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input
                    id="zipCode"
                    {...register('zipCode')}
                    placeholder="Optional"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID</Label>
                  <Input
                    id="taxId"
                    {...register('taxId')}
                    placeholder="Optional"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Status and subscription information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select
                    value={watch('status')}
                    onValueChange={(value) => setValue('status', value as SupplierFormInputs['status'])}
                  >
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.status && (
                    <p className="text-sm text-red-500">{errors.status.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subscription">Subscription Plan *</Label>
                  <Select
                    value={watch('subscription')}
                    onValueChange={(value) => setValue('subscription', value as SupplierFormInputs['subscription'])}
                  >
                    <SelectTrigger id="subscription">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="silver">Silver</SelectItem>
                      <SelectItem value="gold">Gold</SelectItem>
                      <SelectItem value="diamond">Diamond</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.subscription && (
                    <p className="text-sm text-red-500">{errors.subscription.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(`/admin/suppliers/${id}`)}
            >
              Cancel
            </Button>
            <Button type="submit" className="btn-gradient-primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 me-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 me-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditSupplier;

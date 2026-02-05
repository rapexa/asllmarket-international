import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SlidersHorizontal, Search, X, ArrowRight, Building2, Package, DollarSign, MapPin, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

const AdvancedSearch: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    query: '',
    type: 'all',
    category: '',
    minPrice: '',
    maxPrice: '',
    supplierCountry: '',
    verifiedOnly: false,
    minRating: '',
    inStock: false,
    moq: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    
    if (formData.query) params.set('q', formData.query);
    if (formData.type !== 'all') params.set('type', formData.type);
    if (formData.category) params.set('category', formData.category);
    if (formData.minPrice) params.set('minPrice', formData.minPrice);
    if (formData.maxPrice) params.set('maxPrice', formData.maxPrice);
    if (formData.supplierCountry) params.set('country', formData.supplierCountry);
    if (formData.verifiedOnly) params.set('verified', 'true');
    if (formData.minRating) params.set('rating', formData.minRating);
    if (formData.inStock) params.set('inStock', 'true');
    if (formData.moq) params.set('moq', formData.moq);

    navigate(`/search?${params.toString()}`);
  };

  const handleReset = () => {
    setFormData({
      query: '',
      type: 'all',
      category: '',
      minPrice: '',
      maxPrice: '',
      supplierCountry: '',
      verifiedOnly: false,
      minRating: '',
      inStock: false,
      moq: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header />
      <div className="container py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <SlidersHorizontal className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
                Advanced Search
              </h1>
              <p className="text-muted-foreground">
                Use filters to find exactly what you're looking for
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Search */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">Search Terms</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="query" className="mb-2">Keywords</Label>
                    <Input
                      id="query"
                      value={formData.query}
                      onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                      placeholder="Enter keywords, product names, or descriptions..."
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type" className="mb-2">Search Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData({ ...formData, type: value })}
                    >
                      <SelectTrigger id="type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="products">Products</SelectItem>
                        <SelectItem value="suppliers">Suppliers</SelectItem>
                        <SelectItem value="categories">Categories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category" className="mb-2">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="machinery">Machinery</SelectItem>
                        <SelectItem value="apparel">Apparel</SelectItem>
                        <SelectItem value="home">Home & Garden</SelectItem>
                        <SelectItem value="beauty">Beauty</SelectItem>
                        <SelectItem value="food">Food & Beverages</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              {/* Price Range */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-bold">Price Range</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="minPrice" className="mb-2">Minimum Price (USD)</Label>
                    <Input
                      id="minPrice"
                      type="number"
                      value={formData.minPrice}
                      onChange={(e) => setFormData({ ...formData, minPrice: e.target.value })}
                      placeholder="0"
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxPrice" className="mb-2">Maximum Price (USD)</Label>
                    <Input
                      id="maxPrice"
                      type="number"
                      value={formData.maxPrice}
                      onChange={(e) => setFormData({ ...formData, maxPrice: e.target.value })}
                      placeholder="10000"
                      min="0"
                    />
                  </div>
                </div>
              </Card>

              {/* Supplier Filters */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Building2 className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-bold">Supplier Filters</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="supplierCountry" className="mb-2">Supplier Country</Label>
                    <Select
                      value={formData.supplierCountry}
                      onValueChange={(value) => setFormData({ ...formData, supplierCountry: value })}
                    >
                      <SelectTrigger id="supplierCountry">
                        <SelectValue placeholder="Any country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="china">China</SelectItem>
                        <SelectItem value="usa">United States</SelectItem>
                        <SelectItem value="india">India</SelectItem>
                        <SelectItem value="germany">Germany</SelectItem>
                        <SelectItem value="japan">Japan</SelectItem>
                        <SelectItem value="south-korea">South Korea</SelectItem>
                        <SelectItem value="turkey">Turkey</SelectItem>
                        <SelectItem value="uae">UAE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="verifiedOnly"
                      checked={formData.verifiedOnly}
                      onCheckedChange={(checked) => setFormData({ ...formData, verifiedOnly: checked as boolean })}
                    />
                    <Label htmlFor="verifiedOnly" className="cursor-pointer">
                      Verified suppliers only
                    </Label>
                  </div>
                  <div>
                    <Label htmlFor="minRating" className="mb-2">Minimum Rating</Label>
                    <Select
                      value={formData.minRating}
                      onValueChange={(value) => setFormData({ ...formData, minRating: value })}
                    >
                      <SelectTrigger id="minRating">
                        <SelectValue placeholder="Any rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4.5">4.5+ Stars</SelectItem>
                        <SelectItem value="4.0">4.0+ Stars</SelectItem>
                        <SelectItem value="3.5">3.5+ Stars</SelectItem>
                        <SelectItem value="3.0">3.0+ Stars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              {/* Product Filters */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Package className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-bold">Product Filters</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="inStock"
                      checked={formData.inStock}
                      onCheckedChange={(checked) => setFormData({ ...formData, inStock: checked as boolean })}
                    />
                    <Label htmlFor="inStock" className="cursor-pointer">
                      In stock only
                    </Label>
                  </div>
                  <div>
                    <Label htmlFor="moq" className="mb-2">Maximum MOQ</Label>
                    <Input
                      id="moq"
                      type="number"
                      value={formData.moq}
                      onChange={(e) => setFormData({ ...formData, moq: e.target.value })}
                      placeholder="Enter maximum MOQ"
                      min="1"
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar - Quick Actions */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button
                    type="submit"
                    className="w-full btn-gradient-primary rounded-xl h-12"
                  >
                    <Search className="h-5 w-5 me-2" />
                    Search
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleReset}
                    className="w-full rounded-xl"
                  >
                    <X className="h-4 w-4 me-2" />
                    Reset Filters
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => navigate('/search')}
                    className="w-full rounded-xl"
                  >
                    <ArrowRight className={cn("h-4 w-4 me-2", dir === 'rtl' && "rotate-180")} />
                    Back to Simple Search
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="font-semibold mb-3">Search Tips</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Use specific keywords for better results</li>
                    <li>• Combine multiple filters for precise search</li>
                    <li>• Verified suppliers are more reliable</li>
                    <li>• Check MOQ before placing orders</li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AdvancedSearch;


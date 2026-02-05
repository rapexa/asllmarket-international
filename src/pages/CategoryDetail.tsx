import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Package, TrendingUp, Filter, Grid, List, ChevronRight, Home, Star, Zap, Building2, ShoppingBag, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getCategoryById, getCategoryName, getSubCategoryName } from '@/data/categories';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

const CategoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language, dir } = useLanguage();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');

  const category = getCategoryById(id || '1');
  
  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <Header />
        <div className="container py-8 md:py-12">
          <Card className="p-12 text-center">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold mb-2">Category not found</h3>
            <p className="text-muted-foreground mb-6">
              The category you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate('/categories')}>
              Browse All Categories
            </Button>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const categoryName = getCategoryName(category, language);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header />
      <div className="container py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-colors flex items-center gap-1">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <ChevronRight className={cn("h-4 w-4", dir === 'rtl' && "rotate-180")} />
          <Link to="/categories" className="hover:text-foreground transition-colors">
            Categories
          </Link>
          <ChevronRight className={cn("h-4 w-4", dir === 'rtl' && "rotate-180")} />
          <span className="text-foreground font-semibold">{categoryName}</span>
        </div>

        {/* Premium Category Banner */}
        <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden mb-8 group">
          <img
            src={category.image}
            alt={categoryName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className={cn(
            "absolute inset-0 bg-gradient-to-t",
            category.gradient,
            "opacity-90"
          )} />
          <div className="absolute inset-0 flex items-end p-8 md:p-12">
            <div className="w-full z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl border border-white/30">
                  {category.icon}
                </div>
                <div className="flex items-center gap-2">
                  {category.featured && (
                    <Badge className="bg-white/20 backdrop-blur-md border-white/30 text-white gap-1">
                      <Star className="h-3 w-3 fill-white" />
                      Featured
                    </Badge>
                  )}
                  {category.trending && (
                    <Badge className="bg-white/20 backdrop-blur-md border-white/30 text-white gap-1">
                      <Zap className="h-3 w-3" />
                      Trending
                    </Badge>
                  )}
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">
                {categoryName}
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-6 max-w-3xl">
                {language === 'fa' ? category.descriptionFa : language === 'ar' ? category.descriptionAr : category.descriptionEn}
              </p>
              <div className="flex items-center gap-8 flex-wrap">
                <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-xl border border-white/30">
                  <p className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {category.productCount.toLocaleString()}+
                  </p>
                  <p className="text-sm text-white/90">Products</p>
                </div>
                <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-xl border border-white/30">
                  <p className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {category.supplierCount.toLocaleString()}+
                  </p>
                  <p className="text-sm text-white/90">Suppliers</p>
                </div>
                <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-xl border border-white/30">
                  <p className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {category.subcategories.length}
                  </p>
                  <p className="text-sm text-white/90">Subcategories</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Bar */}
        <Card className="p-4 md:p-6 mb-6 border-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-accent" />
                Subcategories
              </h2>
              <Badge variant="secondary" className="text-base py-2 px-4">
                {category.subcategories.length} items
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] rounded-xl border-2">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="products">Most Products</SelectItem>
                  <SelectItem value="trending">Trending</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-1 border-2 rounded-xl p-1">
                <Button
                  type="button"
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  className="h-10 w-10 rounded-lg"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  className="h-10 w-10 rounded-lg"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Subcategories Display */}
        <div className={cn(
          "grid gap-4 md:gap-6 mb-8",
          viewMode === 'grid' 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1"
        )}>
          {category.subcategories
            .sort((a, b) => {
              if (sortBy === 'products') return b.productCount - a.productCount;
              if (sortBy === 'trending') {
                if (a.trending && !b.trending) return -1;
                if (!a.trending && b.trending) return 1;
              }
              if (sortBy === 'name') {
                return getSubCategoryName(a, language).localeCompare(getSubCategoryName(b, language));
              }
              return 0;
            })
            .map((subcat, index) => (
              <Card
                key={subcat.id}
                className={cn(
                  "p-6 cursor-pointer transition-all duration-300 group",
                  "hover:border-accent/50 hover:shadow-xl hover:-translate-y-1",
                  "border-2 animate-fade-in"
                )}
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => navigate(`/search?q=${encodeURIComponent(getSubCategoryName(subcat, language))}&type=products&category=${category.id}&subcategory=${subcat.id}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  {subcat.icon && (
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                      {subcat.icon}
                    </div>
                  )}
                  {subcat.trending && (
                    <Badge variant="default" className="gap-1 bg-accent">
                      <TrendingUp className="h-3 w-3" />
                      Hot
                    </Badge>
                  )}
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-accent transition-colors line-clamp-2">
                  {getSubCategoryName(subcat, language)}
                </h3>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    {subcat.productCount.toLocaleString()} products
                  </p>
                  <ChevronRight
                    className={cn(
                      "h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all",
                      dir === 'rtl' && "rotate-180"
                    )}
                  />
                </div>
              </Card>
            ))}
        </div>

        {/* CTA Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Explore All Products</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Browse through all products in this category from verified global suppliers
            </p>
            <Button
              onClick={() => navigate(`/search?q=${encodeURIComponent(categoryName)}&type=products&category=${category.id}`)}
              className="w-full gap-2 rounded-xl px-8 py-6 text-lg"
            >
              <Package className="h-5 w-5" />
              View All Products
            </Button>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-accent/10 to-primary/10 border-2 border-accent/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold">Find Suppliers</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Connect with verified suppliers specializing in this category
            </p>
            <Button
              variant="outline"
              onClick={() => navigate(`/search?q=${encodeURIComponent(categoryName)}&type=suppliers&category=${category.id}`)}
              className="w-full gap-2 rounded-xl px-8 py-6 text-lg border-2"
            >
              <Building2 className="h-5 w-5" />
              Browse Suppliers
            </Button>
          </Card>
        </div>

        {/* Additional Actions */}
        <Card className="p-6 border-2">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              onClick={() => navigate('/search/advanced')}
              className="gap-2 rounded-xl px-8 py-6 text-lg border-2"
            >
              <Filter className="h-5 w-5" />
              Advanced Search
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/categories')}
              className="gap-2 rounded-xl px-8 py-6 text-lg"
            >
              <ArrowLeft className={cn("h-5 w-5", dir === 'rtl' && "rotate-180")} />
              Back to Categories
            </Button>
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryDetail;

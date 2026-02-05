import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ChevronDown, ChevronRight, Search, TrendingUp, Sparkles, Grid3x3, List, Filter, ArrowRight, Star, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { categories, getCategoryName, getSubCategoryName, getFeaturedCategories, getTrendingCategories } from '@/data/categories';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

const Categories: React.FC = () => {
  const { language, dir } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['1', '2', '3', '4']);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterBy, setFilterBy] = useState<'all' | 'featured' | 'trending'>('all');

  const featuredCategories = useMemo(() => getFeaturedCategories(), []);
  const trendingCategories = useMemo(() => getTrendingCategories(), []);

  const filteredCategories = useMemo(() => {
    let result = categories;
    
    // Filter by type
    if (filterBy === 'featured') {
      result = featuredCategories;
    } else if (filterBy === 'trending') {
      result = trendingCategories;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(cat => {
        const name = getCategoryName(cat, language).toLowerCase();
        const desc = cat.descriptionEn.toLowerCase();
        const subMatch = cat.subcategories.some(sub => 
          getSubCategoryName(sub, language).toLowerCase().includes(query)
        );
        return name.includes(query) || desc.includes(query) || subMatch;
      });
    }
    
    return result;
  }, [searchQuery, filterBy, language, featuredCategories, trendingCategories]);

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/categories/${categoryId}`);
  };

  const handleSubCategoryClick = (subcategoryId: string, categoryId: string, subcategoryName: string) => {
    navigate(`/search?q=${encodeURIComponent(subcategoryName)}&type=products&category=${categoryId}&subcategory=${subcategoryId}`);
  };

  const totalProducts = categories.reduce((sum, cat) => sum + cat.productCount, 0);
  const totalSuppliers = categories.reduce((sum, cat) => sum + cat.supplierCount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header />
      <div className="container py-8 md:py-12">
        {/* Premium Header Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-accent font-semibold text-sm uppercase tracking-wider">
                <Sparkles className="h-4 w-4" />
                <span>Browse All Categories</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
                Product Categories
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                Explore our comprehensive range of products from verified global suppliers
              </p>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              <Card className="p-4 md:p-6 text-center border-2 border-primary/20 bg-primary/5">
                <div className="text-2xl md:text-3xl font-extrabold text-primary mb-1">
                  {totalProducts.toLocaleString().slice(0, -3)}K+
                </div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium">Products</div>
              </Card>
              <Card className="p-4 md:p-6 text-center border-2 border-accent/20 bg-accent/5">
                <div className="text-2xl md:text-3xl font-extrabold text-accent mb-1">
                  {totalSuppliers.toLocaleString().slice(0, -3)}K+
                </div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium">Suppliers</div>
              </Card>
              <Card className="p-4 md:p-6 text-center border-2 border-success/20 bg-success/5">
                <div className="text-2xl md:text-3xl font-extrabold text-success mb-1">
                  {categories.length}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium">Categories</div>
              </Card>
            </div>
          </div>

          {/* Search & Filters Bar */}
          <Card className="p-4 md:p-6 border-2">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute start-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search categories..."
                  className="w-full ps-12 pe-12 py-6 text-base rounded-xl border-2 focus:border-primary transition-colors"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center gap-2">
                <Button
                  variant={filterBy === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilterBy('all')}
                  className="gap-2 rounded-xl"
                >
                  <Grid3x3 className="h-4 w-4" />
                  All
                </Button>
                <Button
                  variant={filterBy === 'featured' ? 'default' : 'outline'}
                  onClick={() => setFilterBy('featured')}
                  className="gap-2 rounded-xl"
                >
                  <Star className="h-4 w-4" />
                  Featured
                </Button>
                <Button
                  variant={filterBy === 'trending' ? 'default' : 'outline'}
                  onClick={() => setFilterBy('trending')}
                  className="gap-2 rounded-xl"
                >
                  <TrendingUp className="h-4 w-4" />
                  Trending
                </Button>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 border rounded-xl p-1">
                <Button
                  type="button"
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  className="h-10 w-10 rounded-lg"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3x3 className="h-4 w-4" />
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
          </Card>
        </div>

        {/* Categories Display */}
        {filteredCategories.length === 0 ? (
          <Card className="p-12 md:p-16 text-center">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold mb-2">No categories found</h3>
            <p className="text-muted-foreground mb-6">
              Try different search terms or filters
            </p>
            <Button onClick={() => { setSearchQuery(''); setFilterBy('all'); }}>
              Clear Filters
            </Button>
          </Card>
        ) : viewMode === 'grid' ? (
          /* Grid View - Premium Card Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredCategories.map((category, index) => (
              <Card
                key={category.id}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border-2 cursor-pointer",
                  "hover:border-accent/50 transition-all duration-500",
                  "hover:shadow-2xl hover:-translate-y-2",
                  "animate-fade-in"
                )}
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => handleCategoryClick(category.id)}
              >
                {/* Background Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={category.image}
                    alt={getCategoryName(category, language)}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-t",
                    category.gradient,
                    "opacity-80 group-hover:opacity-90 transition-opacity duration-500"
                  )} />
                </div>

                {/* Content */}
                <div className="relative p-6 text-white z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl border border-white/30 group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <div className="flex flex-col items-end gap-2">
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

                  <h3 className="text-2xl font-extrabold mb-2 group-hover:-translate-y-1 transition-transform duration-300">
                    {getCategoryName(category, language)}
                  </h3>
                  <p className="text-sm text-white/90 mb-4 line-clamp-2">
                    {category.descriptionEn}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/20">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="font-semibold">{category.productCount.toLocaleString()}+</span>
                      <span className="opacity-75">Products</span>
                    </div>
                    <ArrowRight className={cn(
                      "h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300",
                      dir === 'rtl' && "rotate-180"
                    )} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          /* List View - Accordion Layout */
          <Card className="p-6 md:p-8 border-2">
            <Accordion
              type="multiple"
              value={expandedCategories}
              onValueChange={setExpandedCategories}
              className="w-full"
            >
              {filteredCategories.map((category, index) => (
                <AccordionItem
                  key={category.id}
                  value={category.id}
                  className={cn(
                    "border-b border-border last:border-b-0",
                    "animate-fade-in"
                  )}
                  style={{ animationDelay: `${index * 0.03}s` }}
                >
                  <AccordionTrigger className="hover:no-underline py-6 group">
                    <div className="flex items-center gap-4 flex-1 text-start">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                        {category.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="text-xl md:text-2xl font-bold text-foreground">
                            {getCategoryName(category, language)}
                          </h3>
                          {category.featured && (
                            <Badge variant="secondary" className="gap-1">
                              <Star className="h-3 w-3 fill-current" />
                              Featured
                            </Badge>
                          )}
                          {category.trending && (
                            <Badge variant="default" className="gap-1 bg-accent">
                              <Zap className="h-3 w-3" />
                              Trending
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                          {category.descriptionEn}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="font-semibold text-foreground">
                            {category.productCount.toLocaleString()}+ Products
                          </span>
                          <span>•</span>
                          <span>{category.supplierCount.toLocaleString()}+ Suppliers</span>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 animate-accordion-down">
                    <div className="ps-18 md:ps-20 space-y-4">
                      {/* Subcategories Grid */}
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {category.subcategories.map((subcat) => (
                          <Button
                            key={subcat.id}
                            variant="outline"
                            className={cn(
                              "h-auto py-4 px-5 justify-between rounded-xl",
                              "hover:bg-accent/10 hover:border-accent transition-all group",
                              "border-2"
                            )}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSubCategoryClick(subcat.id, category.id, getSubCategoryName(subcat, language));
                            }}
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              {subcat.icon && (
                                <span className="text-xl shrink-0">{subcat.icon}</span>
                              )}
                              <div className="flex-1 min-w-0 text-start">
                                <div className="font-semibold truncate mb-1">
                                  {getSubCategoryName(subcat, language)}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {subcat.productCount.toLocaleString()} products
                                </div>
                              </div>
                            </div>
                            {subcat.trending && (
                              <Badge variant="default" className="ms-2 shrink-0 text-xs">
                                <TrendingUp className="h-3 w-3" />
                              </Badge>
                            )}
                            <ChevronRight
                              className={cn(
                                "h-4 w-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ms-2",
                                dir === 'rtl' && "rotate-180"
                              )}
                            />
                          </Button>
                        ))}
                      </div>
                      
                      {/* View All Button */}
                      <div className="pt-2">
                        <Button
                          variant="ghost"
                          className="gap-2 font-semibold"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCategoryClick(category.id);
                          }}
                        >
                          View All {getCategoryName(category, language)}
                          <ArrowRight className={cn("h-4 w-4", dir === 'rtl' && "rotate-180")} />
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        )}

        {/* Bottom CTA Section */}
        <Card className="mt-12 p-8 md:p-12 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border-2 border-primary/20 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Use our advanced search or request a product from our global supplier network
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate('/search/advanced')}
              className="gap-2 rounded-xl px-8 py-6 text-lg"
            >
              <Filter className="h-5 w-5" />
              Advanced Search
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/search?type=products')}
              className="gap-2 rounded-xl px-8 py-6 text-lg border-2"
            >
              <Search className="h-5 w-5" />
              Browse All Products
            </Button>
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Categories;

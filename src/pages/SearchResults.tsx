import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, Grid, List, Star, ShieldCheck, Building2, Package, Sparkles, X, ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { searchService, SearchResponse } from '@/services';

type ViewMode = 'grid' | 'list';
type ResultType = 'all' | 'products' | 'suppliers' | 'categories';

interface SearchResult {
  id: string;
  type: 'product' | 'supplier' | 'category';
  title: string;
  subtitle?: string;
  image?: string;
  price?: string;
  rating?: number;
  verified?: boolean;
  badge?: string;
  description?: string;
}

const SearchResults: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const type = (searchParams.get('type') || 'all') as ResultType;

  const [searchQuery, setSearchQuery] = useState(query);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeTab, setActiveTab] = useState<ResultType>(type);
  const [sortBy, setSortBy] = useState('relevance');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load search results from backend
  useEffect(() => {
    const doSearch = async () => {
      if (!query) {
        setResults([]);
        return;
      }
      setIsLoading(true);
      try {
        const response: SearchResponse = await searchService.search({
          q: query,
          limit: 50,
          offset: 0,
        });

        const productResults: SearchResult[] = (response.products || []).map((p) => ({
          id: p.id,
          type: 'product',
          title: p.name,
          subtitle: p.description,
          image: typeof p.images === 'string' ? p.images : undefined,
          price: `${p.currency} ${p.price.toFixed(2)}`,
          rating: p.rating,
          verified: true,
          description: p.description,
        }));

        const supplierResults: SearchResult[] = (response.suppliers || []).map((s) => ({
          id: s.id,
          type: 'supplier',
          title: s.companyName,
          subtitle: s.country,
          image: s.logo,
          rating: s.rating,
          verified: s.verified,
          description: s.description,
        }));

        // Derive simple category results from product categories (best-effort)
        const categoryMap = new Map<string, SearchResult>();
        for (const p of response.products || []) {
          if (!p.id) continue;
          const categoryId = p.id.split('-')[0]; // placeholder grouping strategy
          if (!categoryMap.has(categoryId)) {
            categoryMap.set(categoryId, {
              id: categoryId,
              type: 'category',
              title: `Category ${categoryId}`,
              subtitle: undefined,
              description: undefined,
            });
          }
        }

        const nextResults = [
          ...productResults,
          ...supplierResults,
          ...Array.from(categoryMap.values()),
        ];

        setResults(nextResults);
      } catch (error) {
        console.error('Search failed:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    doSearch();
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim(), type: activeTab });
    }
  };

  const handleTabChange = (value: string) => {
    const newType = value as ResultType;
    setActiveTab(newType);
    setSearchParams({ q: query, type: newType });
  };

  const filteredResults = results.filter(r => {
    if (activeTab === 'all') return true;
    if (activeTab === 'products') return r.type === 'product';
    if (activeTab === 'suppliers') return r.type === 'supplier';
    if (activeTab === 'categories') return r.type === 'category';
    return true;
  });

  const formatPrice = (price: string) => price;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header />
      <div className="container py-6 sm:py-8 md:py-12 px-4">
        {/* Search Header */}
        <div className="mb-6 sm:mb-7 md:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary shrink-0" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-1 sm:mb-2 leading-tight">
                Search Results
              </h1>
              {query && (
                <p className="text-xs sm:text-sm text-muted-foreground leading-tight">
                  {isLoading ? 'Searching...' : `Found ${filteredResults.length} results for "${query}"`}
                </p>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-4 sm:mb-5 md:mb-6">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <div className="relative flex-1">
                <Search className="absolute start-3 sm:start-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground shrink-0" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, suppliers, categories..."
                  className="w-full ps-10 sm:ps-12 pe-10 sm:pe-12 py-4 sm:py-5 md:py-6 text-sm sm:text-base rounded-lg sm:rounded-xl border-2"
                />
                {searchQuery && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute end-1.5 sm:end-2 top-1/2 -translate-y-1/2 h-7 w-7 sm:h-8 sm:w-8 shrink-0"
                    onClick={() => setSearchQuery('')}
                  >
                    <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                  </Button>
                )}
              </div>
              <Button type="submit" className="btn-gradient-primary rounded-lg sm:rounded-xl px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 text-sm sm:text-base w-full sm:w-auto whitespace-nowrap">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 me-2 shrink-0" />
                Search
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/search/advanced')}
                className="rounded-lg sm:rounded-xl px-4 sm:px-6 py-4 sm:py-5 md:py-6 text-sm sm:text-base w-full sm:w-auto whitespace-nowrap"
              >
                <SlidersHorizontal className="h-4 w-4 sm:h-5 sm:w-5 me-2 shrink-0" />
                Advanced
              </Button>
            </div>
          </form>

          {/* Tabs & Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full md:w-auto">
              <TabsList className="w-full md:w-auto flex-wrap h-auto">
                <TabsTrigger value="all" className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2">All</TabsTrigger>
                <TabsTrigger value="products" className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2">Products</TabsTrigger>
                <TabsTrigger value="suppliers" className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2">Suppliers</TabsTrigger>
                <TabsTrigger value="categories" className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2">Categories</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[160px] md:w-[180px] h-9 sm:h-10 text-xs sm:text-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-1 border rounded-lg p-0.5 sm:p-1">
                <Button
                  type="button"
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  className="h-7 w-7 sm:h-8 sm:w-8 rounded shrink-0"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                </Button>
                <Button
                  type="button"
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  className="h-7 w-7 sm:h-8 sm:w-8 rounded shrink-0"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="text-center py-12 sm:py-16 md:py-20 px-4">
            <div className="inline-flex items-center gap-2 text-muted-foreground text-sm sm:text-base">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce shrink-0" style={{ animationDelay: '0s' }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce shrink-0" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce shrink-0" style={{ animationDelay: '0.4s' }} />
              <span className="ms-2 whitespace-nowrap">Searching...</span>
            </div>
          </div>
        ) : filteredResults.length === 0 ? (
          <Card className="p-8 sm:p-10 md:p-12 text-center">
            <Search className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-muted-foreground mx-auto mb-3 sm:mb-4 opacity-50 shrink-0" />
            <h3 className="text-lg sm:text-xl font-bold mb-2 leading-tight px-2">No results found</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-5 md:mb-6 px-4 leading-relaxed">
              Try different keywords or use our advanced search
            </p>
            <Button
              onClick={() => navigate('/search/advanced')}
              variant="outline"
              className="gap-2 text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3"
            >
              <SlidersHorizontal className="h-4 w-4 shrink-0" />
              Advanced Search
            </Button>
          </Card>
        ) : (
          <div className={cn(
            "grid gap-4 sm:gap-5 md:gap-6",
            viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
          )}>
            {filteredResults.map((result) => (
              <Card
                key={result.id}
                className={cn(
                  "overflow-hidden border-2 hover:border-accent/50 transition-all cursor-pointer group",
                  viewMode === 'list' && "flex gap-3 sm:gap-4"
                )}
                onClick={() => {
                  if (result.type === 'product') {
                    navigate(`/products/${result.id}`);
                  } else if (result.type === 'supplier') {
                    navigate(`/suppliers/${result.id}`);
                  } else if (result.type === 'category') {
                    navigate(`/categories/${result.id}`);
                  }
                }}
              >
                {/* Image */}
                {viewMode === 'grid' ? (
                  <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden bg-muted">
                    {result.image ? (
                      <img
                        src={result.image}
                        alt={result.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        {result.type === 'supplier' ? (
                          <Building2 className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-muted-foreground shrink-0" />
                        ) : result.type === 'category' ? (
                          <Package className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-muted-foreground shrink-0" />
                        ) : (
                          <Package className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-muted-foreground shrink-0" />
                        )}
                      </div>
                    )}
                    {result.badge && (
                      <Badge className="absolute top-2 start-2 sm:top-3 sm:start-3 text-xs px-2 py-0.5">
                        {result.badge}
                      </Badge>
                    )}
                    {result.verified && (
                      <div className="absolute top-2 end-2 sm:top-3 sm:end-3">
                        <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-success shrink-0" />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 shrink-0 overflow-hidden bg-muted rounded-lg">
                    {result.image ? (
                      <img
                        src={result.image}
                        alt={result.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        {result.type === 'supplier' ? (
                          <Building2 className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-muted-foreground shrink-0" />
                        ) : result.type === 'category' ? (
                          <Package className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-muted-foreground shrink-0" />
                        ) : (
                          <Package className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-muted-foreground shrink-0" />
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Content */}
                <div className={cn("p-3 sm:p-4", viewMode === 'list' && "flex-1 min-w-0")}>
                  <div className="flex items-start justify-between gap-2 mb-1.5 sm:mb-2">
                    <h3 className="font-bold text-base sm:text-lg group-hover:text-accent transition-colors line-clamp-2 leading-tight flex-1 min-w-0">
                      {result.title}
                    </h3>
                    {result.badge && viewMode === 'list' && (
                      <Badge variant="secondary" className="text-xs shrink-0">{result.badge}</Badge>
                    )}
                  </div>
                  {result.subtitle && (
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1.5 sm:mb-2 leading-tight">{result.subtitle}</p>
                  )}
                  {result.description && (
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 line-clamp-2 leading-relaxed">
                      {result.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between gap-2 sm:gap-4 flex-wrap">
                    <div className="flex items-center gap-2 sm:gap-3 sm:gap-4 flex-wrap">
                      {result.price && (
                        <span className="font-bold text-sm sm:text-base text-accent leading-tight">{result.price}</span>
                      )}
                      {result.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400 shrink-0" />
                          <span className="text-xs sm:text-sm font-medium leading-tight">{result.rating}</span>
                        </div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1.5 sm:gap-2 text-xs sm:text-sm h-7 sm:h-8 px-2 sm:px-3 shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (result.type === 'product') {
                          navigate(`/products/${result.id}`);
                        } else if (result.type === 'supplier') {
                          navigate(`/suppliers/${result.id}`);
                        } else if (result.type === 'category') {
                          navigate(`/categories/${result.id}`);
                        }
                      }}
                    >
                      <span>View</span>
                      <ArrowRight className={cn("h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0", dir === 'rtl' && "rotate-180")} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SearchResults;


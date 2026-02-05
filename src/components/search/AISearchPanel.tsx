import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, TrendingUp, Package, Building2, X, ArrowRight, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface SearchSuggestion {
  id: string;
  type: 'product' | 'supplier' | 'category';
  title: string;
  subtitle?: string;
  image?: string;
  price?: string;
  badge?: string;
}

interface AISearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectSuggestion: (suggestion: SearchSuggestion) => void;
}

const AISearchPanel: React.FC<AISearchPanelProps> = ({
  isOpen,
  onClose,
  searchQuery,
  onSearchChange,
  onSelectSuggestion,
}) => {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock suggestions - در واقعیت از API می‌آید
  useEffect(() => {
    if (searchQuery.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
        // Mock data
        setSuggestions([
          {
            id: '1',
            type: 'product',
            title: 'Wireless Bluetooth Earbuds Pro',
            subtitle: 'Electronics > Audio',
            image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&q=80',
            price: '$12.50 - $18.00',
            badge: 'Hot Deal',
          },
          {
            id: '2',
            type: 'supplier',
            title: 'TechGlobal Industries Ltd.',
            subtitle: 'Verified Supplier • 4.9★',
            image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&q=80',
          },
          {
            id: '3',
            type: 'category',
            title: 'Electronics & Technology',
            subtitle: '125K+ Products',
          },
          {
            id: '4',
            type: 'product',
            title: 'Industrial CNC Machine Parts',
            subtitle: 'Machinery > Industrial',
            image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=100&q=80',
            price: '$450 - $680',
            badge: 'Verified',
          },
        ]);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className={cn(
          "absolute top-20 start-1/2 -translate-x-1/2 w-full max-w-4xl mx-4",
          dir === 'rtl' && "start-auto end-1/2 translate-x-1/2"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="bg-card border-2 border-accent/20 shadow-2xl rounded-2xl overflow-hidden animate-scale-in">
          {/* Search Input */}
          <div className="p-4 border-b border-border bg-muted/30">
            <div className="relative flex items-center gap-3">
              <div className="relative flex-1">
                <Sparkles className="absolute start-4 top-1/2 -translate-y-1/2 h-5 w-5 text-accent animate-pulse" />
                <Input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder={t('nav.search')}
                  className="w-full ps-12 pe-12 py-6 text-lg rounded-xl border-2 border-accent/30 focus:border-accent bg-background"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute end-2 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => onSearchChange('')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Button
                className="btn-gradient-accent rounded-xl px-6 py-6 gap-2"
                onClick={() => {
                  if (searchQuery.trim()) {
                    // Save to recent searches
                    const updated = [searchQuery.trim(), ...recentSearches.filter(s => s !== searchQuery.trim())].slice(0, 5);
                    setRecentSearches(updated);
                    localStorage.setItem('recentSearches', JSON.stringify(updated));
                    
                    // Navigate to search results
                    onClose();
                    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                  }
                }}
              >
                <Search className="h-5 w-5" />
                {dir === 'rtl' ? 'جستجو' : 'Search'}
              </Button>
            </div>

            {/* AI Indicator */}
            <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-accent" />
              <span>AI-powered search • Live suggestions</span>
            </div>
          </div>

          {/* Suggestions Panel */}
          <div className="max-h-[600px] overflow-y-auto">
            {isTyping ? (
              <div className="p-8 text-center">
                <div className="inline-flex items-center gap-2 text-muted-foreground">
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  <span className="ms-2">AI is thinking...</span>
                </div>
              </div>
            ) : searchQuery.length > 0 && suggestions.length > 0 ? (
              <div className="p-4 space-y-2">
                {/* AI Explanation Card */}
                <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl p-4 mb-4 border border-accent/20">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                      <Sparkles className="h-5 w-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">AI Summary</h4>
                      <p className="text-sm text-muted-foreground">
                        Found {suggestions.length} results for "{searchQuery}". Best matches include verified products and suppliers.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Suggestions List */}
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    onClick={() => {
                      onSelectSuggestion(suggestion);
                      onClose();
                      // Navigate based on type
                      if (suggestion.type === 'product') {
                        navigate(`/products/${suggestion.id}`);
                      } else if (suggestion.type === 'supplier') {
                        navigate(`/suppliers/${suggestion.id}`);
                      } else if (suggestion.type === 'category') {
                        navigate(`/categories/${suggestion.id}`);
                      }
                    }}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 cursor-pointer transition-all group border border-transparent hover:border-accent/20"
                  >
                    {/* Image/Icon */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted shrink-0">
                      {suggestion.image ? (
                        <img
                          src={suggestion.image}
                          alt={suggestion.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          {suggestion.type === 'supplier' ? (
                            <Building2 className="h-8 w-8 text-muted-foreground" />
                          ) : suggestion.type === 'category' ? (
                            <Package className="h-8 w-8 text-muted-foreground" />
                          ) : (
                            <Package className="h-8 w-8 text-muted-foreground" />
                          )}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors truncate">
                          {suggestion.title}
                        </h4>
                        {suggestion.badge && (
                          <Badge variant="secondary" className="shrink-0">
                            {suggestion.badge}
                          </Badge>
                        )}
                      </div>
                      {suggestion.subtitle && (
                        <p className="text-sm text-muted-foreground mb-1">{suggestion.subtitle}</p>
                      )}
                      {suggestion.price && (
                        <p className="text-sm font-semibold text-accent">{suggestion.price}</p>
                      )}
                    </div>

                    {/* Arrow */}
                    <ArrowRight className={cn(
                      "h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0",
                      dir === 'rtl' && "rotate-180"
                    )} />
                  </div>
                ))}
              </div>
            ) : searchQuery.length === 0 ? (
              <div className="p-6">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Recent Searches</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((search, i) => (
                        <Button
                          key={i}
                          variant="outline"
                          size="sm"
                          className="rounded-full"
                          onClick={() => onSearchChange(search)}
                        >
                          {search}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trending Searches */}
                <div>
                  <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    <span>Trending Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Wireless Earbuds', 'CNC Machines', 'Cotton T-Shirts', 'LED Lights', 'Industrial Pumps'].map((term, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                        onClick={() => onSearchChange(term)}
                      >
                        {term}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* AI Chat Example */}
                <div className="mt-6 p-4 bg-muted/50 rounded-xl border border-border">
                  <div className="flex items-start gap-3 mb-3">
                    <Sparkles className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">Try AI Search</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Ask in natural language:
                      </p>
                      <div className="space-y-2">
                        {[
                          'Show me suppliers for industrial pumps under $1000',
                          'Find verified electronics suppliers in China',
                          'Best deals on bulk cotton t-shirts',
                        ].map((example, i) => (
                          <Button
                            key={i}
                            variant="ghost"
                            className="w-full justify-start text-left text-sm h-auto py-2 px-3 rounded-lg hover:bg-background"
                            onClick={() => onSearchChange(example)}
                          >
                            "{example}"
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No results found for "{searchQuery}"</p>
                <p className="text-sm mt-2">Try different keywords or use AI search</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AISearchPanel;


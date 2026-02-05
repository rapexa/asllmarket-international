import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Image as ImageIcon, Video, Sparkles, X, Filter, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import ImageUploadModal from './ImageUploadModal';
import VideoUploadModal from './VideoUploadModal';
import AdvancedFiltersPanel from './AdvancedFiltersPanel';

interface AdvancedSearchBoxProps {
  className?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

const AdvancedSearchBox: React.FC<AdvancedSearchBoxProps> = ({
  className,
  onFocus,
  onBlur,
}) => {
  const { t, language, dir } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle search suggestions
  useEffect(() => {
    if (searchQuery.length > 1) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
        // Mock suggestions - در واقعیت از API می‌آید
        setSuggestions([
          { id: '1', type: 'product', title: `${searchQuery} products`, category: 'Electronics' },
          { id: '2', type: 'supplier', title: `${searchQuery} suppliers`, category: 'Verified' },
          { id: '3', type: 'category', title: `${searchQuery} category`, category: 'Main' },
        ]);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
        setSuggestions([]);
        onBlur?.();
      }
    };

    if (isFocused) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isFocused, onBlur]);

  const handleSearch = (query: string = searchQuery) => {
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query)}&type=products`);
    setIsFocused(false);
    setSuggestions([]);
  };

  const handleImageSearch = (imageUrl: string) => {
    // In real app, this would analyze the image and search
    navigate(`/search?type=image&image=${encodeURIComponent(imageUrl)}`);
    setImageModalOpen(false);
    toast({
      title: 'Image search started',
      description: 'Analyzing your image and finding similar products...',
    });
  };

  const handleVideoSearch = (videoUrl: string) => {
    // In real app, this would analyze video frames and search
    navigate(`/search?type=video&video=${encodeURIComponent(videoUrl)}`);
    setVideoModalOpen(false);
    toast({
      title: 'Video search started',
      description: 'Analyzing video frames and finding matching products...',
    });
  };

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setIsFocused(false);
      setSuggestions([]);
      inputRef.current?.blur();
    }
  };

  const placeholderText = language === 'fa' 
    ? 'جستجوی محصولات، تأمین‌کنندگان یا دسته‌بندی‌ها…'
    : language === 'ar'
    ? 'البحث عن المنتجات أو الموردين أو الفئات…'
    : 'Search products, suppliers, or categories…';

  return (
    <>
      <div ref={containerRef} className={cn("relative w-full", className)}>
        <div
          className={cn(
            "relative flex items-center gap-2 rounded-xl border-2 bg-background/80 backdrop-blur-sm transition-all duration-200",
            "hover:border-border",
            isFocused ? "border-accent shadow-lg shadow-accent/10" : "border-border/50",
            "overflow-hidden"
          )}
        >
          {/* Search Icon */}
          <div className="absolute start-4 top-1/2 -translate-y-1/2 flex items-center gap-2 z-10 pointer-events-none">
            <Sparkles className={cn(
              "h-4 w-4 transition-all duration-200",
              isFocused ? "text-accent animate-pulse" : "text-muted-foreground"
            )} />
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>

          {/* Input Field */}
          <Input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            placeholder={placeholderText}
            className={cn(
              "flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0",
              "ps-24 pe-40 py-6 text-base",
              "placeholder:text-muted-foreground"
            )}
          />

          {/* Action Icons Container */}
          <div className={cn(
            "absolute end-2 top-1/2 -translate-y-1/2 flex items-center gap-1",
            dir === 'rtl' && "flex-row-reverse"
          )}>
            {/* Image Search Icon */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={cn(
                "h-9 w-9 rounded-lg hover:bg-muted transition-all duration-200",
                "relative group"
              )}
              onClick={(e) => {
                e.stopPropagation();
                setImageModalOpen(true);
              }}
              title={language === 'fa' ? 'جستجوی تصویر' : language === 'ar' ? 'بحث الصورة' : 'Image search'}
            >
              <ImageIcon className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
            </Button>

            {/* Video Search Icon */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={cn(
                "h-9 w-9 rounded-lg hover:bg-muted transition-all duration-200",
                "relative group"
              )}
              onClick={(e) => {
                e.stopPropagation();
                setVideoModalOpen(true);
              }}
              title={language === 'fa' ? 'جستجوی ویدیو' : language === 'ar' ? 'بحث الفيديو' : 'Video search'}
            >
              <Video className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
            </Button>

            {/* Filter Toggle */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={cn(
                "h-9 w-9 rounded-lg hover:bg-muted transition-all duration-200",
                "relative group",
                filtersOpen && "bg-accent/10 text-accent"
              )}
              onClick={(e) => {
                e.stopPropagation();
                setFiltersOpen(!filtersOpen);
              }}
              title={language === 'fa' ? 'فیلترها' : language === 'ar' ? 'المرشحات' : 'Filters'}
            >
              <Filter className={cn(
                "h-4 w-4 transition-colors",
                filtersOpen ? "text-accent" : "text-muted-foreground group-hover:text-accent"
              )} />
            </Button>

            {/* Search Button */}
            <Button
              type="button"
              size="sm"
              className={cn(
                "h-9 px-4 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90",
                "font-semibold gap-2 transition-all duration-200",
                "hidden sm:flex"
              )}
              onClick={() => handleSearch()}
            >
              {isTyping ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span className="hidden lg:inline">
                    {language === 'fa' ? 'جستجو' : language === 'ar' ? 'بحث' : 'Search'}
                  </span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Search Suggestions Dropdown */}
        {isFocused && suggestions.length > 0 && (
          <div className={cn(
            "absolute top-full start-0 end-0 mt-2 bg-card border-2 border-border rounded-xl shadow-2xl z-50",
            "max-h-96 overflow-y-auto animate-slide-down"
          )}>
            <div className="p-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  className={cn(
                    "w-full text-start p-3 rounded-lg hover:bg-muted transition-colors",
                    "flex items-center gap-3 group"
                  )}
                  onClick={() => {
                    setSearchQuery(suggestion.title);
                    handleSearch(suggestion.title);
                  }}
                >
                  <Search className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{suggestion.title}</div>
                    <div className="text-sm text-muted-foreground">{suggestion.category}</div>
                  </div>
                  <span className="text-xs text-muted-foreground capitalize">{suggestion.type}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Filters Panel */}
        <AdvancedFiltersPanel
          isOpen={filtersOpen}
          onClose={() => setFiltersOpen(false)}
          onApply={(filters) => {
            // Apply filters to search
            const params = new URLSearchParams({ q: searchQuery || '', ...filters });
            navigate(`/search?${params.toString()}`);
            setFiltersOpen(false);
          }}
        />
      </div>

      {/* Image Upload Modal */}
      <ImageUploadModal
        isOpen={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        onUpload={handleImageSearch}
      />

      {/* Video Upload Modal */}
      <VideoUploadModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        onUpload={handleVideoSearch}
      />
    </>
  );
};

export default AdvancedSearchBox;


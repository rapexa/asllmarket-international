import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronRight, Search, Package, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/contexts/LanguageContext';
import { categories, getCategoryName, getSubCategoryName } from '@/data/categories';
import { cn } from '@/lib/utils';

interface CategoriesSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const CategoriesSidePanel: React.FC<CategoriesSidePanelProps> = ({
  isOpen,
  onClose,
}) => {
  const { language, dir } = useLanguage();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Reset selected category when panel closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedCategory(null);
      setSearchQuery('');
    }
  }, [isOpen]);

  // Prevent body scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Filter categories based on search
  const filteredCategories = categories.filter(cat => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const name = getCategoryName(cat, language).toLowerCase();
    const desc = cat.descriptionEn.toLowerCase();
    const subMatch = cat.subcategories.some(sub =>
      getSubCategoryName(sub, language).toLowerCase().includes(query)
    );
    return name.includes(query) || desc.includes(query) || subMatch;
  });

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleSubCategoryClick = (categoryId: string, subcategoryId: string, subcategoryName: string) => {
    navigate(`/search?q=${encodeURIComponent(subcategoryName)}&type=products&category=${categoryId}&subcategory=${subcategoryId}`);
    onClose();
  };

  const handleCategoryViewAll = (categoryId: string) => {
    navigate(`/categories/${categoryId}`);
    onClose();
  };

  const selectedCategoryData = selectedCategory
    ? categories.find(cat => cat.id === selectedCategory)
    : null;

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Side Panel */}
      <div
        className={cn(
          "fixed top-0 bottom-0 z-50 bg-card shadow-2xl",
          "w-full sm:w-[650px] lg:w-[750px] transition-transform duration-300 ease-in-out",
          "flex flex-col max-h-screen overflow-hidden",
          dir === 'rtl'
            ? isOpen
              ? "end-0 translate-x-0"
              : "end-0 translate-x-full"
            : isOpen
            ? "start-0 translate-x-0"
            : "start-0 -translate-x-full"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border shrink-0 bg-card">
          <div className="flex items-center gap-3">
            {selectedCategoryData && (
              <Button
                variant="ghost"
                size="icon"
                className="sm:hidden h-9 w-9"
                onClick={() => setSelectedCategory(null)}
              >
                <ArrowLeft className={cn("h-5 w-5", dir === 'rtl' && "rotate-180")} />
              </Button>
            )}
            <h2 className="text-lg sm:text-xl font-bold">
              {language === 'fa' ? 'همه دسته‌بندی‌ها' : language === 'ar' ? 'جميع الفئات' : 'All Categories'}
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-9 w-9"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-border shrink-0 bg-card">
          <div className="relative">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'fa' ? 'جستجوی دسته‌بندی...' : language === 'ar' ? 'البحث عن الفئات...' : 'Search categories...'}
              className="w-full ps-10 pe-4 py-2 h-11 rounded-xl"
            />
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="flex-1 flex overflow-hidden min-h-0">
          {/* Left Column - Main Categories */}
          <div className={cn(
            "w-full sm:w-[300px] lg:w-[340px] border-e border-border flex flex-col shrink-0",
            selectedCategoryData && "hidden sm:flex"
          )}>
            <ScrollArea className="flex-1">
              <div className="p-2 space-y-1">
                {filteredCategories.length === 0 ? (
                  <div className="p-8 text-center">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-sm text-muted-foreground">
                      {language === 'fa' ? 'نتیجه‌ای یافت نشد' : language === 'ar' ? 'لا توجد نتائج' : 'No results found'}
                    </p>
                  </div>
                ) : (
                  filteredCategories.map((category) => (
                    <button
                      key={category.id}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl",
                        "text-start transition-all duration-200",
                        "hover:bg-muted/60 active:scale-[0.98]",
                        selectedCategory === category.id
                          ? "bg-accent/15 text-accent font-semibold border-2 border-accent/30 shadow-sm"
                          : "text-foreground border-2 border-transparent"
                      )}
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      <span className="text-2xl shrink-0">{category.icon}</span>
                      <span className="flex-1 min-w-0 truncate text-sm font-medium leading-tight">
                        {getCategoryName(category, language)}
                      </span>
                      <ChevronRight
                        className={cn(
                          "h-4 w-4 shrink-0 transition-opacity",
                          selectedCategory === category.id ? "opacity-100 text-accent" : "opacity-40",
                          dir === 'rtl' && "rotate-180"
                        )}
                      />
                    </button>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Right Column - Subcategories */}
          {selectedCategoryData ? (
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
              <ScrollArea className="flex-1">
                <div className="p-4 sm:p-6">
                  {/* Category Header */}
                  <div className="mb-6 pb-6 border-b border-border">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
                        {selectedCategoryData.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-foreground truncate">
                          {getCategoryName(selectedCategoryData, language)}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {language === 'fa'
                        ? selectedCategoryData.descriptionFa
                        : language === 'ar'
                        ? selectedCategoryData.descriptionAr
                        : selectedCategoryData.descriptionEn}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="font-medium">
                        {selectedCategoryData.productCount.toLocaleString()}+ {language === 'fa' ? 'محصول' : language === 'ar' ? 'منتج' : 'Products'}
                      </span>
                      <span>•</span>
                      <span className="font-medium">
                        {selectedCategoryData.supplierCount.toLocaleString()}+ {language === 'fa' ? 'تأمین‌کننده' : language === 'ar' ? 'مورد' : 'Suppliers'}
                      </span>
                    </div>
                  </div>

                  {/* Subcategories List */}
                  <div className="space-y-2 mb-6">
                    {selectedCategoryData.subcategories.map((subcat) => (
                      <button
                        key={subcat.id}
                        className={cn(
                          "w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl",
                          "text-start transition-all duration-200",
                          "hover:bg-muted/60 hover:border-accent/30 active:scale-[0.98]",
                          "border-2 border-transparent group"
                        )}
                        onClick={() => handleSubCategoryClick(selectedCategoryData.id, subcat.id, getSubCategoryName(subcat, language))}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {subcat.icon && (
                            <span className="text-xl shrink-0">{subcat.icon}</span>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate group-hover:text-accent transition-colors">
                              {getSubCategoryName(subcat, language)}
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5">
                              {subcat.productCount.toLocaleString()} {language === 'fa' ? 'محصول' : language === 'ar' ? 'منتج' : 'products'}
                            </div>
                          </div>
                          {subcat.trending && (
                            <span className="text-xs text-accent font-semibold shrink-0 bg-accent/10 px-2 py-1 rounded-md">
                              🔥
                            </span>
                          )}
                        </div>
                        <ChevronRight
                          className={cn(
                            "h-4 w-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground",
                            dir === 'rtl' && "rotate-180"
                          )}
                        />
                      </button>
                    ))}
                  </div>

                  {/* View All Button */}
                  <Button
                    variant="outline"
                    className="w-full gap-2 h-11 rounded-xl font-semibold border-2 hover:bg-accent/10 hover:border-accent/30"
                    onClick={() => handleCategoryViewAll(selectedCategoryData.id)}
                  >
                    {language === 'fa' ? 'مشاهده همه' : language === 'ar' ? 'عرض الكل' : 'View All'}
                    <ChevronRight className={cn("h-4 w-4", dir === 'rtl' && "rotate-180")} />
                  </Button>
                </div>
              </ScrollArea>
            </div>
          ) : (
            /* Empty State for Subcategories (Mobile) */
            <div className="flex-1 flex items-center justify-center p-8 sm:hidden">
              <div className="text-center">
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-sm text-muted-foreground font-medium">
                  {language === 'fa' ? 'یک دسته را انتخاب کنید' : language === 'ar' ? 'اختر فئة' : 'Select a category'}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {language === 'fa' ? 'برای مشاهده زیردسته‌ها' : language === 'ar' ? 'لعرض الفئات الفرعية' : 'to view subcategories'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoriesSidePanel;

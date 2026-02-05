import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronRight, Box } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: string[];
  featured?: boolean;
}

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
}

const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose, categories }) => {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 top-[120px] z-40 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Mega Menu - Full Screen */}
      <div
        className={cn(
          "fixed top-[120px] start-0 w-full bg-card border-t-2 border-accent/20 shadow-2xl z-50",
          "animate-slide-down mega-menu-container",
          "h-[calc(100vh-120px)] overflow-y-auto"
        )}
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={(e) => {
          e.stopPropagation();
        }}
        onMouseLeave={(e) => {
          const relatedTarget = e.relatedTarget as HTMLElement;
          if (!relatedTarget || !e.currentTarget.contains(relatedTarget)) {
            setTimeout(() => onClose(), 200);
          }
        }}
      >
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column - Main Categories */}
            <div className="lg:col-span-3 border-e border-border pe-8">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-6">
                Main Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-4 h-auto py-4 px-4 rounded-xl",
                      "hover:bg-muted/50 transition-all duration-200",
                      hoveredCategory === category.id && "bg-accent/10 text-accent border-2 border-accent/30"
                    )}
                    onMouseEnter={() => setHoveredCategory(category.id)}
                    onClick={() => {
                      navigate(`/categories/${category.id}`);
                      onClose();
                    }}
                  >
                    <span className="text-2xl shrink-0">{category.icon}</span>
                    <div className="flex-1 text-start min-w-0">
                      <div className="font-bold text-base">{category.name}</div>
                    </div>
                    <ChevronRight
                      className={cn(
                        "h-5 w-5 shrink-0 opacity-0 transition-opacity",
                        hoveredCategory === category.id && "opacity-100",
                        dir === 'rtl' && "rotate-180"
                      )}
                    />
                  </Button>
                ))}
              </div>
            </div>

            {/* Middle Column - Subcategories */}
            <div className="lg:col-span-6 border-e border-border pe-8">
              {hoveredCategory ? (
                <div className="animate-fade-in h-full">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-6">
                    {categories.find(cat => cat.id === hoveredCategory)?.name} Subcategories
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {categories
                      .find(cat => cat.id === hoveredCategory)
                      ?.subcategories.map((sub, i) => (
                        <Button
                          key={i}
                          variant="ghost"
                          className={cn(
                            "w-full justify-between text-sm font-medium text-foreground",
                            "hover:bg-muted/50 rounded-xl px-5 py-3 h-auto group border border-transparent hover:border-accent/20"
                          )}
                          onClick={() => {
                            navigate(`/search?q=${encodeURIComponent(sub)}&type=products`);
                            onClose();
                          }}
                        >
                          <span className="truncate">{sub}</span>
                          <ChevronRight
                            className={cn(
                              "h-4 w-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-accent",
                              dir === 'rtl' && "rotate-180"
                            )}
                          />
                        </Button>
                      ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-6 rounded-xl border-2 border-accent/30 text-accent hover:bg-accent/10 h-12 font-semibold"
                    onClick={() => {
                      navigate(`/categories/${hoveredCategory}`);
                      onClose();
                    }}
                  >
                    View All {categories.find(cat => cat.id === hoveredCategory)?.name}
                    <ArrowRight
                      className={cn(
                        "ms-2 h-5 w-5",
                        dir === 'rtl' && "rotate-180"
                      )}
                    />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full min-h-[300px]">
                  <div className="text-center space-y-3">
                    <Box className="h-16 w-16 text-muted-foreground mx-auto opacity-50" />
                    <p className="text-base font-medium text-muted-foreground">
                      Select a category to view subcategories
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Quick Links & Featured */}
            <div className="lg:col-span-3 space-y-8">
              {/* Quick Links */}
              <div>
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-6">
                  Quick Links
                </h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start rounded-xl h-auto py-4 px-5 border-2 hover:border-accent/30"
                    onClick={() => {
                      navigate('/search?type=products&featured=true');
                      onClose();
                    }}
                  >
                    <div className="text-start flex-1">
                      <div className="font-bold text-sm mb-1">Top Products</div>
                      <div className="text-xs text-muted-foreground">Best sellers</div>
                    </div>
                    <ArrowRight className={cn("h-4 w-4 shrink-0", dir === 'rtl' && "rotate-180")} />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start rounded-xl h-auto py-4 px-5 border-2 hover:border-accent/30"
                    onClick={() => {
                      navigate('/search?type=suppliers&verified=true');
                      onClose();
                    }}
                  >
                    <div className="text-start flex-1">
                      <div className="font-bold text-sm mb-1">Popular Suppliers</div>
                      <div className="text-xs text-muted-foreground">Verified only</div>
                    </div>
                    <ArrowRight className={cn("h-4 w-4 shrink-0", dir === 'rtl' && "rotate-180")} />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start rounded-xl h-auto py-4 px-5 border-2 hover:border-accent/30"
                    onClick={() => {
                      navigate('/categories');
                      onClose();
                    }}
                  >
                    <div className="text-start flex-1">
                      <div className="font-bold text-sm mb-1">All Categories</div>
                      <div className="text-xs text-muted-foreground">Browse all</div>
                    </div>
                    <ArrowRight className={cn("h-4 w-4 shrink-0", dir === 'rtl' && "rotate-180")} />
                  </Button>
                </div>
              </div>

              {/* Featured Banners */}
              <div>
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-6">
                  Featured
                </h3>
                <div className="space-y-3">
                  {[
                    { title: 'Weekly Deals', desc: 'Up to 50% off', color: 'from-red-500 to-orange-500', url: '/search?type=products&featured=true' },
                    { title: 'New Arrivals', desc: 'Latest products', color: 'from-blue-500 to-cyan-500', url: '/search?type=products&sort=newest' },
                    { title: 'Verified Only', desc: 'Trusted suppliers', color: 'from-green-500 to-emerald-500', url: '/search?type=suppliers&verified=true' },
                  ].map((banner, i) => (
                    <div
                      key={i}
                      className={cn(
                        "relative overflow-hidden rounded-xl p-5 text-white cursor-pointer group",
                        "bg-gradient-to-br", banner.color,
                        "hover:scale-[1.02] transition-transform duration-200 border-2 border-transparent hover:border-white/20"
                      )}
                      onClick={() => {
                        navigate(banner.url);
                        onClose();
                      }}
                    >
                      <h4 className="font-bold text-base mb-1">{banner.title}</h4>
                      <p className="text-sm opacity-90">{banner.desc}</p>
                      <ArrowRight
                        className={cn(
                          "absolute bottom-4 end-4 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity",
                          dir === 'rtl' && "rotate-180"
                        )}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MegaMenu;


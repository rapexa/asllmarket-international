import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shirt, Laptop, Dumbbell, Sparkles, Package, 
  ChevronRight, TrendingUp, Star
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { categoryService, Category } from '@/services/category.service';

const CategoryMenuSection: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.list();
        setCategories(response.items || []);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const getIcon = (index: number) => {
    const icons = [Package, Shirt, Laptop, Dumbbell, Sparkles, Package];
    return icons[index % icons.length];
  };

  const getName = (cat: Category) => {
    if (language === 'fa') return cat.nameFa;
    if (language === 'ar') return cat.nameAr;
    return cat.nameEn;
  };

  if (loading) {
    return (
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="animate-pulse flex items-center gap-2 px-4 py-2 rounded-lg bg-muted min-w-[150px] h-10" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
          {/* All Categories Button */}
          <button
            onClick={() => navigate('/categories')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors whitespace-nowrap group"
          >
            <Package className="h-4 w-4 text-primary group-hover:text-accent transition-colors" />
            <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground">
              {language === 'fa' ? 'همه دسته‌بندی‌ها' : language === 'ar' ? 'جميع الفئات' : 'All Categories'}
            </span>
            <ChevronRight className="h-3 w-3 text-muted-foreground group-hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          {/* Dynamic Categories from API */}
          {categories.slice(0, 8).map((cat, idx) => {
            const IconComponent = getIcon(idx);
            return (
              <button
                key={cat.id}
                onClick={() => navigate(`/categories/${cat.id}`)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors whitespace-nowrap group"
              >
                <IconComponent className="h-4 w-4 text-primary group-hover:text-accent transition-colors" />
                <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground">
                  {getName(cat)}
                </span>
                {cat.trending && (
                  <TrendingUp className="h-3 w-3 text-accent" />
                )}
                <ChevronRight className="h-3 w-3 text-muted-foreground group-hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryMenuSection;

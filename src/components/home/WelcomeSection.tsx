import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, TrendingUp, Zap, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const WelcomeSection: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const username = "RAPEXA"; // یا از auth context بگیرید

  return (
    <div className="bg-background border-b">
      <div className="container py-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            {language === 'fa' ? `به ASL Market خوش آمدید، ${username}` : `Welcome to ASL Market, ${username}`}
          </h2>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/post-request')}
              className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-border hover:border-primary transition-colors"
            >
              <FileText className="h-5 w-5" />
              <span className="font-medium">
                {language === 'fa' ? 'درخواست قیمت' : language === 'ar' ? 'طلب عرض أسعار' : 'Request for Quotation'}
              </span>
            </button>
            
            <button
              onClick={() => navigate('/products?sort=ranking')}
              className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-border hover:border-primary transition-colors"
            >
              <TrendingUp className="h-5 w-5" />
              <span className="font-medium">
                {language === 'fa' ? 'برترین رتبه‌ها' : language === 'ar' ? 'أعلى التصنيفات' : 'Top Ranking'}
              </span>
            </button>
            
            <button
              onClick={() => navigate('/products?filter=custom')}
              className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-border hover:border-primary transition-colors"
            >
              <Zap className="h-5 w-5" />
              <span className="font-medium">
                {language === 'fa' ? 'سفارشی‌سازی سریع' : language === 'ar' ? 'التخصيص السريع' : 'Fast customization'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;

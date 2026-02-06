import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HelpCircle, 
  Search,
  MessageSquare,
  Mail,
  Phone,
  ArrowRight,
  ChevronRight,
  Sparkles,
  X,
  BookOpen,
  ShoppingCart,
  User,
  Building2,
  CreditCard,
  Shield,
  Package,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';
import { cmsService, FAQItem } from '@/services';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqCategories = [
  { id: 'all', label: 'All', labelFa: 'همه', labelAr: 'الكل', icon: HelpCircle },
  { id: 'getting-started', label: 'Getting Started', labelFa: 'شروع کار', labelAr: 'البدء', icon: BookOpen },
  { id: 'account', label: 'Account', labelFa: 'حساب کاربری', labelAr: 'الحساب', icon: User },
  { id: 'buying', label: 'Buying', labelFa: 'خرید', labelAr: 'الشراء', icon: ShoppingCart },
  { id: 'selling', label: 'Selling', labelFa: 'فروش', labelAr: 'البيع', icon: Package },
  { id: 'payment', label: 'Payment', labelFa: 'پرداخت', labelAr: 'الدفع', icon: CreditCard },
  { id: 'security', label: 'Security', labelFa: 'امنیت', labelAr: 'الأمان', icon: Shield },
];


const FAQ: React.FC = () => {
  const { language, dir } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [filteredFAQs, setFilteredFAQs] = useState<FAQ[]>([]);

  useEffect(() => {
    const loadFAQs = async () => {
      try {
        const res = await cmsService.listFAQs();
        const items: FAQ[] = (res.items || []).map((f: FAQItem) => ({
          id: Number.NaN, // numeric id not used for backend references
          question: f.questionEn,
          questionFa: f.questionFa,
          questionAr: f.questionAr,
          answer: f.answerEn,
          answerFa: f.answerFa,
          answerAr: f.answerAr,
          category: f.category,
          popular: f.popular,
        }));
        setFaqs(items);
        setFilteredFAQs(items);
      } catch (e) {
        console.error('Failed to load FAQs:', e);
      }
    };

    loadFAQs();
  }, []);

  // Filter FAQs
  React.useEffect(() => {
    let filtered = [...faqs];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(faq => {
        const question = language === 'fa' ? faq.questionFa : language === 'ar' ? faq.questionAr : faq.question;
        const answer = language === 'fa' ? faq.answerFa : language === 'ar' ? faq.answerAr : faq.answer;
        return (
          question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          answer.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    setFilteredFAQs(filtered);
  }, [searchQuery, selectedCategory, language, faqs]);

  const getQuestion = (faq: FAQ) => {
    if (language === 'fa') return faq.questionFa;
    if (language === 'ar') return faq.questionAr;
    return faq.question;
  };

  const getAnswer = (faq: FAQ) => {
    if (language === 'fa') return faq.answerFa;
    if (language === 'ar') return faq.answerAr;
    return faq.answer;
  };

  const getCategoryLabel = (category: typeof faqCategories[0]) => {
    if (language === 'fa') return category.labelFa;
    if (language === 'ar') return category.labelAr;
    return category.label;
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'all';

  const popularFAQs = faqs.filter(faq => faq.popular);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 start-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 end-10 w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-primary/10 backdrop-blur-xl px-6 py-3 rounded-full text-sm font-semibold border border-primary/20">
              <HelpCircle className="h-5 w-5 text-primary" />
              <span className="text-primary font-bold">
                {language === 'fa' ? 'سوالات متداول' : language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              <span className="block text-foreground">
                {language === 'fa' ? 'سوالات متداول' : language === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}
              </span>
              <span className="block mt-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {language === 'fa' ? 'پاسخ سوالات شما' : language === 'ar' ? 'إجابات أسئلتك' : 'Find Answers to Your Questions'}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {language === 'fa'
                ? 'پاسخ سوالات متداول درباره استفاده از ASL Market'
                : language === 'ar'
                ? 'إجابات الأسئلة الشائعة حول استخدام ASL Market'
                : 'Answers to common questions about using ASL Market'}
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto pt-4">
              <div className="relative">
                <Search className="absolute start-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'fa' ? 'جستجوی سوالات...' : language === 'ar' ? 'البحث عن الأسئلة...' : 'Search questions...'}
                  className="w-full ps-12 pe-4 h-14 rounded-2xl text-lg shadow-xl"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute end-2 top-1/2 -translate-y-1/2 h-10 w-10"
                    onClick={() => setSearchQuery('')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-muted/30 border-y border-border">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {faqCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all text-sm font-medium",
                    selectedCategory === category.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{getCategoryLabel(category)}</span>
                </button>
              );
            })}
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                {language === 'fa' ? 'پاک کردن' : language === 'ar' ? 'مسح' : 'Clear'}
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Popular FAQs */}
      {popularFAQs.length > 0 && !hasActiveFilters && (
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
                <Sparkles className="h-4 w-4 text-accent" />
                <span className="text-sm font-semibold text-accent">
                  {language === 'fa' ? 'محبوب' : language === 'ar' ? 'شائع' : 'Popular'}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                {language === 'fa' ? 'سوالات پرتکرار' : language === 'ar' ? 'الأسئلة الأكثر شيوعاً' : 'Most Popular Questions'}
              </h2>
              <p className="text-xl text-muted-foreground">
                {language === 'fa'
                  ? 'سوالاتی که بیشترین جستجو را دارند'
                  : language === 'ar'
                  ? 'الأسئلة الأكثر بحثاً'
                  : 'Questions that are searched most often'}
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {popularFAQs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={`faq-${faq.id}`}
                    className="bg-card border-2 border-border rounded-xl px-6 hover:border-primary/50 transition-colors"
                  >
                    <AccordionTrigger className="text-start hover:no-underline py-4">
                      <div className="flex items-start gap-3 flex-1">
                        <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="font-semibold text-foreground text-left">
                          {getQuestion(faq)}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4 ps-8">
                      <p className="text-muted-foreground leading-relaxed">
                        {getAnswer(faq)}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      )}

      {/* All FAQs Section */}
      <section className="py-20">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
                {language === 'fa' ? 'همه سوالات' : language === 'ar' ? 'جميع الأسئلة' : 'All Questions'}
              </h2>
              <p className="text-muted-foreground">
                {language === 'fa'
                  ? `${filteredFAQs.length} سوال پیدا شد`
                  : language === 'ar'
                  ? `تم العثور على ${filteredFAQs.length} سؤال`
                  : `${filteredFAQs.length} questions found`}
              </p>
            </div>
          </div>

          {filteredFAQs.length === 0 ? (
            <Card className="p-12 text-center">
              <HelpCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-bold mb-2">
                {language === 'fa' ? 'سوالی یافت نشد' : language === 'ar' ? 'لم يتم العثور على سؤال' : 'No Questions Found'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {language === 'fa'
                  ? 'لطفاً فیلترها را تغییر دهید یا کلمه جستجوی دیگری را امتحان کنید'
                  : language === 'ar'
                  ? 'يرجى تغيير المرشحات أو تجربة كلمة بحث أخرى'
                  : 'Please try changing filters or search with different keywords'}
              </p>
              <Button variant="outline" onClick={clearFilters}>
                {language === 'fa' ? 'پاک کردن فیلترها' : language === 'ar' ? 'مسح المرشحات' : 'Clear Filters'}
              </Button>
            </Card>
          ) : (
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={`faq-${faq.id}`}
                    className="bg-card border-2 border-border rounded-xl px-6 hover:border-primary/50 transition-colors"
                  >
                    <AccordionTrigger className="text-start hover:no-underline py-4">
                      <div className="flex items-start gap-3 flex-1">
                        <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div className="flex-1 text-start">
                          <span className="font-semibold text-foreground block">
                            {getQuestion(faq)}
                          </span>
                          {faq.popular && (
                            <Badge variant="secondary" className="mt-2 text-xs">
                              {language === 'fa' ? 'محبوب' : language === 'ar' ? 'شائع' : 'Popular'}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4 ps-8">
                      <p className="text-muted-foreground leading-relaxed">
                        {getAnswer(faq)}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                  {language === 'fa' ? 'هنوز پاسخ خود را پیدا نکردید؟' : language === 'ar' ? 'لم تجد إجابتك بعد؟' : 'Still Can\'t Find Your Answer?'}
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  {language === 'fa'
                    ? 'تیم پشتیبانی ما 24/7 آماده کمک به شما است'
                    : language === 'ar'
                    ? 'فريق الدعم لدينا متاح على مدار الساعة لمساعدتك'
                    : 'Our support team is available 24/7 to help you'}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="btn-gradient-primary rounded-xl px-8 py-6 font-semibold"
                  onClick={() => navigate('/contact')}
                >
                  <Mail className="me-2 h-5 w-5" />
                  {language === 'fa' ? 'تماس با پشتیبانی' : language === 'ar' ? 'اتصل بالدعم' : 'Contact Support'}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-xl px-8 py-6 font-semibold"
                  onClick={() => navigate('/help')}
                >
                  <BookOpen className="me-2 h-5 w-5" />
                  {language === 'fa' ? 'مرکز راهنما' : language === 'ar' ? 'مركز المساعدة' : 'Help Center'}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;


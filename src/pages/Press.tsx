import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Newspaper, 
  Calendar, 
  Download,
  ArrowRight,
  Search,
  Filter,
  FileText,
  Image as ImageIcon,
  Video,
  Award,
  TrendingUp,
  Globe,
  Mail,
  Phone,
  Sparkles,
  X,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PressRelease {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: 'announcement' | 'partnership' | 'award' | 'milestone' | 'product';
  publishedAt: string;
  featured?: boolean;
  attachments?: {
    type: 'pdf' | 'image' | 'video';
    name: string;
    url: string;
  }[];
}

const mockPressReleases: PressRelease[] = [
  {
    id: 1,
    title: 'ASL Market Reaches $2B in Transaction Volume',
    excerpt: 'ASL Market announces a major milestone, reaching $2 billion in total transaction volume across its global B2B marketplace platform.',
    content: 'Full content here...',
    category: 'milestone',
    publishedAt: '2024-01-20',
    featured: true,
    attachments: [
      { type: 'pdf', name: 'Press Release PDF', url: '#' },
      { type: 'image', name: 'Company Logo', url: '#' },
    ],
  },
  {
    id: 2,
    title: 'ASL Market Partners with Leading Logistics Companies',
    excerpt: 'New strategic partnerships announced to enhance global shipping and logistics capabilities for B2B transactions.',
    content: 'Full content here...',
    category: 'partnership',
    publishedAt: '2024-01-18',
    attachments: [
      { type: 'pdf', name: 'Partnership Details', url: '#' },
    ],
  },
  {
    id: 3,
    title: 'ASL Market Wins Best B2B Platform Award 2024',
    excerpt: 'Recognized as the leading B2B marketplace platform for innovation and customer satisfaction.',
    content: 'Full content here...',
    category: 'award',
    publishedAt: '2024-01-15',
    featured: true,
    attachments: [
      { type: 'image', name: 'Award Certificate', url: '#' },
      { type: 'video', name: 'Award Ceremony', url: '#' },
    ],
  },
  {
    id: 4,
    title: 'New AI-Powered Matching System Launched',
    excerpt: 'Revolutionary AI technology helps buyers and suppliers find perfect matches faster and more accurately.',
    content: 'Full content here...',
    category: 'product',
    publishedAt: '2024-01-12',
    attachments: [
      { type: 'pdf', name: 'Product Sheet', url: '#' },
    ],
  },
  {
    id: 5,
    title: 'ASL Market Expands to 190+ Countries',
    excerpt: 'Global expansion milestone achieved, now serving businesses in over 190 countries worldwide.',
    content: 'Full content here...',
    category: 'milestone',
    publishedAt: '2024-01-10',
    attachments: [
      { type: 'pdf', name: 'Expansion Report', url: '#' },
      { type: 'image', name: 'World Map', url: '#' },
    ],
  },
  {
    id: 6,
    title: 'Major Security Update: Enhanced Escrow System',
    excerpt: 'New security features and enhanced Escrow system provide even better protection for B2B transactions.',
    content: 'Full content here...',
    category: 'announcement',
    publishedAt: '2024-01-08',
    attachments: [
      { type: 'pdf', name: 'Security Update', url: '#' },
    ],
  },
];

const mediaKit = {
  logo: { name: 'Company Logo', formats: ['PNG', 'SVG', 'PDF'], url: '#' },
  brandGuidelines: { name: 'Brand Guidelines', formats: ['PDF'], url: '#' },
  pressPhotos: { name: 'Press Photos', formats: ['JPG', 'PNG'], url: '#' },
  factSheet: { name: 'Company Fact Sheet', formats: ['PDF'], url: '#' },
};

const Press: React.FC = () => {
  const { language, dir } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredReleases, setFilteredReleases] = useState<PressRelease[]>(mockPressReleases);

  // Filter releases
  React.useEffect(() => {
    let filtered = [...mockPressReleases];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(release =>
        release.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        release.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(release => release.category === selectedCategory);
    }

    setFilteredReleases(filtered);
  }, [searchQuery, selectedCategory]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (language === 'fa') {
      return date.toLocaleDateString('fa-IR');
    } else if (language === 'ar') {
      return date.toLocaleDateString('ar-SA');
    }
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, { en: string; fa: string; ar: string }> = {
      announcement: { en: 'Announcement', fa: 'اعلان', ar: 'إعلان' },
      partnership: { en: 'Partnership', fa: 'همکاری', ar: 'شراكة' },
      award: { en: 'Award', fa: 'جایزه', ar: 'جائزة' },
      milestone: { en: 'Milestone', fa: 'نقطه عطف', ar: 'معلم' },
      product: { en: 'Product', fa: 'محصول', ar: 'منتج' },
    };
    const label = labels[category] || { en: category, fa: category, ar: category };
    return language === 'fa' ? label.fa : language === 'ar' ? label.ar : label.en;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      announcement: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
      partnership: 'bg-green-500/10 text-green-600 border-green-500/20',
      award: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
      milestone: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
      product: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    };
    return colors[category] || 'bg-muted text-muted-foreground';
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'all';

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
              <Newspaper className="h-5 w-5 text-primary" />
              <span className="text-primary font-bold">
                {language === 'fa' ? 'اخبار و رسانه' : language === 'ar' ? 'الأخبار والوسائط' : 'Press & Media'}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              <span className="block text-foreground">
                {language === 'fa' ? 'مرکز رسانه' : language === 'ar' ? 'مركز الوسائط' : 'Press Center'}
              </span>
              <span className="block mt-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {language === 'fa' ? 'اخبار و اطلاعیه‌های رسمی' : language === 'ar' ? 'الأخبار والإعلانات الرسمية' : 'News & Official Announcements'}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {language === 'fa'
                ? 'آخرین اخبار، اطلاعیه‌ها و منابع رسانه‌ای ASL Market'
                : language === 'ar'
                ? 'آخر الأخبار والإعلانات والموارد الإعلامية لـ ASL Market'
                : 'Latest news, announcements, and media resources from ASL Market'}
            </p>
          </div>
        </div>
      </section>

      {/* Press Releases Section */}
      <section className="py-20">
        <div className="container">
          {/* Search and Filters */}
          <Card className="p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'fa' ? 'جستجوی اطلاعیه‌ها...' : language === 'ar' ? 'البحث عن الإعلانات...' : 'Search releases...'}
                  className="w-full ps-10 pe-4 h-12 rounded-xl"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-[200px] h-12 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {language === 'fa' ? 'همه دسته‌ها' : language === 'ar' ? 'جميع الفئات' : 'All Categories'}
                  </SelectItem>
                  <SelectItem value="announcement">{getCategoryLabel('announcement')}</SelectItem>
                  <SelectItem value="partnership">{getCategoryLabel('partnership')}</SelectItem>
                  <SelectItem value="award">{getCategoryLabel('award')}</SelectItem>
                  <SelectItem value="milestone">{getCategoryLabel('milestone')}</SelectItem>
                  <SelectItem value="product">{getCategoryLabel('product')}</SelectItem>
                </SelectContent>
              </Select>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="h-12 px-4 rounded-xl gap-2"
                >
                  <X className="h-4 w-4" />
                  {language === 'fa' ? 'پاک کردن' : language === 'ar' ? 'مسح' : 'Clear'}
                </Button>
              )}
            </div>
          </Card>

          {/* Featured Release */}
          {filteredReleases.filter(r => r.featured).length > 0 && (
            <Card className="mb-8 overflow-hidden border-2 border-primary/20 hover:border-primary/50 transition-all group">
              <div className="p-8 bg-gradient-to-br from-primary/5 to-accent/5">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <Badge className="mb-3 bg-primary text-primary-foreground">
                      {language === 'fa' ? 'ویژه' : language === 'ar' ? 'مميز' : 'Featured'}
                    </Badge>
                    <Badge className={cn("ms-2", getCategoryColor(filteredReleases.find(r => r.featured)?.category || ''))}>
                      {getCategoryLabel(filteredReleases.find(r => r.featured)?.category || '')}
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-3 group-hover:text-primary transition-colors">
                      {filteredReleases.find(r => r.featured)?.title}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-4">
                      {filteredReleases.find(r => r.featured)?.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(filteredReleases.find(r => r.featured)?.publishedAt || '')}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {filteredReleases.find(r => r.featured)?.attachments?.map((attachment, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      className="gap-2"
                      onClick={() => window.open(attachment.url, '_blank')}
                    >
                      {attachment.type === 'pdf' && <FileText className="h-4 w-4" />}
                      {attachment.type === 'image' && <ImageIcon className="h-4 w-4" />}
                      {attachment.type === 'video' && <Video className="h-4 w-4" />}
                      {attachment.name}
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* Releases List */}
          {filteredReleases.length === 0 ? (
            <Card className="p-12 text-center">
              <Newspaper className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-bold mb-2">
                {language === 'fa' ? 'اطلاعیه‌ای یافت نشد' : language === 'ar' ? 'لم يتم العثور على إعلان' : 'No Releases Found'}
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
            <div className="space-y-6">
              {filteredReleases
                .filter(r => !r.featured)
                .map((release) => (
                  <Card
                    key={release.id}
                    className="p-6 md:p-8 hover:shadow-xl transition-all border-2 border-border hover:border-primary/50 group"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-3">
                              <Badge className={cn(getCategoryColor(release.category))}>
                                {getCategoryLabel(release.category)}
                              </Badge>
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                              {release.title}
                            </h3>
                            <p className="text-muted-foreground mb-4 leading-relaxed">
                              {release.excerpt}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(release.publishedAt)}</span>
                          </div>
                        </div>

                        {/* Attachments */}
                        {release.attachments && release.attachments.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {release.attachments.map((attachment, i) => (
                              <Button
                                key={i}
                                variant="outline"
                                size="sm"
                                className="gap-2"
                                onClick={() => window.open(attachment.url, '_blank')}
                              >
                                {attachment.type === 'pdf' && <FileText className="h-3.5 w-3.5" />}
                                {attachment.type === 'image' && <ImageIcon className="h-3.5 w-3.5" />}
                                {attachment.type === 'video' && <Video className="h-3.5 w-3.5" />}
                                {attachment.name}
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          )}
        </div>
      </section>

      {/* Media Kit Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
                {language === 'fa' ? 'رسانه‌کیت' : language === 'ar' ? 'مجموعة الوسائط' : 'Media Kit'}
              </h2>
              <p className="text-xl text-muted-foreground">
                {language === 'fa'
                  ? 'دانلود لوگو، راهنمای برند و منابع رسانه‌ای'
                  : language === 'ar'
                  ? 'تحميل الشعار ودليل العلامة التجارية والموارد الإعلامية'
                  : 'Download logos, brand guidelines, and media resources'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(mediaKit).map(([key, item]) => (
                <Card key={key} className="p-6 hover:shadow-xl transition-all border-2 border-border hover:border-primary/50 group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.formats.map((format, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {format}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 shrink-0"
                      onClick={() => window.open(item.url, '_blank')}
                    >
                      <Download className="h-4 w-4" />
                      {language === 'fa' ? 'دانلود' : language === 'ar' ? 'تحميل' : 'Download'}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Press Contact Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                  {language === 'fa' ? 'تماس با رسانه' : language === 'ar' ? 'اتصال الوسائط' : 'Press Contact'}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {language === 'fa'
                    ? 'برای سوالات رسانه‌ای یا درخواست مصاحبه با ما تماس بگیرید'
                    : language === 'ar'
                    ? 'اتصل بنا للأسئلة الإعلامية أو طلبات المقابلات'
                    : 'Contact us for media inquiries or interview requests'}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {language === 'fa' ? 'ایمیل' : language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                    </h3>
                    <a href="mailto:press@aslmarket.com" className="text-primary hover:underline">
                      press@aslmarket.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shrink-0">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {language === 'fa' ? 'تلفن' : language === 'ar' ? 'الهاتف' : 'Phone'}
                    </h3>
                    <a href="tel:+1234567890" className="text-primary hover:underline">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Press;


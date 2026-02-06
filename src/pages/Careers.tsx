import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign,
  ArrowRight,
  Sparkles,
  Users,
  TrendingUp,
  Heart,
  Zap,
  Globe,
  Building2,
  Code,
  BarChart3,
  Shield,
  Search,
  Filter,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';
import { cmsService, JobItem } from '@/services';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  experience: string;
  salary?: string;
  posted: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

const Careers: React.FC = () => {
  const { language, dir } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const res = await cmsService.listJobs();
        const items: Job[] = (res.items || []).map((j: JobItem) => {
          let requirements: string[] = [];
          let benefits: string[] = [];
          try {
            requirements = j.requirements ? JSON.parse(j.requirements) : [];
          } catch {
            requirements = [];
          }
          try {
            benefits = j.benefits ? JSON.parse(j.benefits) : [];
          } catch {
            benefits = [];
          }
          return {
            id: Number.NaN,
            title: j.title,
            department: j.department,
            location: j.location,
            type: j.jobType,
            experience: j.experience,
            salary: j.salary,
            posted: j.postedAt || '',
            description: j.description,
            requirements,
            benefits,
          };
        });
        setJobs(items);
        setFilteredJobs(items);
      } catch (e) {
        console.error('Failed to load jobs:', e);
      }
    };
    loadJobs();
  }, []);

  // Filter jobs
  React.useEffect(() => {
    let filtered = [...jobs];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Department filter
    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(job => job.department === selectedDepartment);
    }

    // Location filter
    if (selectedLocation !== 'all') {
      if (selectedLocation === 'remote') {
        filtered = filtered.filter(job => job.location.toLowerCase().includes('remote'));
      } else {
        filtered = filtered.filter(job => job.location.toLowerCase().includes(selectedLocation.toLowerCase()));
      }
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(job => job.type === selectedType);
    }

    setFilteredJobs(filtered);
  }, [searchQuery, selectedDepartment, selectedLocation, selectedType, jobs]);

  const departments = ['Engineering', 'Product', 'Design', 'Sales', 'Analytics', 'Marketing'];
  const locations = ['Remote', 'San Francisco', 'New York', 'London', 'Berlin', 'Dubai', 'Singapore'];

  const benefits = [
    {
      icon: Heart,
      title: language === 'fa' ? 'سلامت و رفاه' : language === 'ar' ? 'الصحة والرفاهية' : 'Health & Wellness',
      description: language === 'fa'
        ? 'بیمه سلامت کامل، باشگاه ورزشی و برنامه‌های سلامتی'
        : language === 'ar'
        ? 'تأمين صحي كامل وصالة ألعاب رياضية وبرامج صحية'
        : 'Comprehensive health insurance, gym membership, and wellness programs',
    },
    {
      icon: Zap,
      title: language === 'fa' ? 'یادگیری و رشد' : language === 'ar' ? 'التعلم والنمو' : 'Learning & Growth',
      description: language === 'fa'
        ? 'بودجه یادگیری، کنفرانس‌ها و فرصت‌های توسعه حرفه‌ای'
        : language === 'ar'
        ? 'ميزانية التعلم والمؤتمرات وفرص التطوير المهني'
        : 'Learning budget, conferences, and professional development opportunities',
    },
    {
      icon: Globe,
      title: language === 'fa' ? 'کار از راه دور' : language === 'ar' ? 'العمل عن بُعد' : 'Remote Work',
      description: language === 'fa'
        ? 'انعطاف‌پذیری برای کار از هر کجای جهان'
        : language === 'ar'
        ? 'المرونة للعمل من أي مكان في العالم'
        : 'Flexibility to work from anywhere in the world',
    },
    {
      icon: TrendingUp,
      title: language === 'fa' ? 'گزینه‌های سهام' : language === 'ar' ? 'خيارات الأسهم' : 'Stock Options',
      description: language === 'fa'
        ? 'مشارکت در موفقیت شرکت از طریق گزینه‌های سهام'
        : language === 'ar'
        ? 'المشاركة في نجاح الشركة من خلال خيارات الأسهم'
        : 'Share in the company\'s success through stock options',
    },
  ];

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'full-time':
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'part-time':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'contract':
        return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      case 'remote':
        return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDepartment('all');
    setSelectedLocation('all');
    setSelectedType('all');
  };

  const hasActiveFilters = searchQuery || selectedDepartment !== 'all' || selectedLocation !== 'all' || selectedType !== 'all';

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
              <Briefcase className="h-5 w-5 text-primary" />
              <span className="text-primary font-bold">
                {language === 'fa' ? 'فرصت‌های شغلی' : language === 'ar' ? 'الفرص الوظيفية' : 'Career Opportunities'}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              <span className="block text-foreground">
                {language === 'fa' ? 'به تیم ما بپیوندید' : language === 'ar' ? 'انضم إلى فريقنا' : 'Join Our Team'}
              </span>
              <span className="block mt-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {language === 'fa' ? 'و آینده تجارت را شکل دهید' : language === 'ar' ? 'وشكل مستقبل التجارة' : '& Shape the Future of Trade'}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {language === 'fa'
                ? 'ما در حال ساخت بزرگترین پلتفرم B2B جهانی هستیم و به افراد با استعداد نیاز داریم که به ما کمک کنند'
                : language === 'ar'
                ? 'نحن نبني أكبر منصة B2B عالمية ونحتاج إلى أشخاص موهوبين لمساعدتنا'
                : 'We\'re building the world\'s largest B2B platform and need talented people to help us'}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12">
              {[
                { value: '500+', label: language === 'fa' ? 'کارمند' : language === 'ar' ? 'موظف' : 'Employees', icon: Users },
                { value: '50+', label: language === 'fa' ? 'موقعیت باز' : language === 'ar' ? 'منصب مفتوح' : 'Open Positions', icon: Briefcase },
                { value: '30+', label: language === 'fa' ? 'کشور' : language === 'ar' ? 'دولة' : 'Countries', icon: Globe },
                { value: '100%', label: language === 'fa' ? 'پشتیبانی از راه دور' : language === 'ar' ? 'دعم عن بُعد' : 'Remote Support', icon: Zap },
              ].map((stat, index) => (
                <Card
                  key={index}
                  className="p-6 bg-card/50 backdrop-blur-xl border border-border/50 hover:border-primary/50 transition-all group"
                >
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                  <div className="text-3xl font-extrabold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
              {language === 'fa' ? 'چرا ASL Market را انتخاب کنید؟' : language === 'ar' ? 'لماذا تختار ASL Market؟' : 'Why Choose ASL Market?'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === 'fa'
                ? 'مزایا و امکاناتی که ما برای تیم خود ارائه می‌دهیم'
                : language === 'ar'
                ? 'المزايا والفوائد التي نقدمها لفريقنا'
                : 'Benefits and perks we offer to our team'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="p-6 relative overflow-hidden border-2 border-border hover:border-primary/50 transition-all hover:shadow-xl group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <benefit.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="py-20">
        <div className="container">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
              {language === 'fa' ? 'موقعیت‌های شغلی باز' : language === 'ar' ? 'المناصب المفتوحة' : 'Open Positions'}
            </h2>
            <p className="text-xl text-muted-foreground">
              {language === 'fa'
                ? `${filteredJobs.length} موقعیت شغلی پیدا شد`
                : language === 'ar'
                ? `تم العثور على ${filteredJobs.length} منصب`
                : `${filteredJobs.length} positions found`}
            </p>
          </div>

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
                  placeholder={language === 'fa' ? 'جستجوی موقعیت‌های شغلی...' : language === 'ar' ? 'البحث عن المناصب...' : 'Search positions...'}
                  className="w-full ps-10 pe-4 h-12 rounded-xl"
                />
              </div>

              {/* Department Filter */}
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-full lg:w-[200px] h-12 rounded-xl">
                  <SelectValue placeholder={language === 'fa' ? 'دپارتمان' : language === 'ar' ? 'القسم' : 'Department'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{language === 'fa' ? 'همه دپارتمان‌ها' : language === 'ar' ? 'جميع الأقسام' : 'All Departments'}</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Location Filter */}
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-full lg:w-[200px] h-12 rounded-xl">
                  <SelectValue placeholder={language === 'fa' ? 'موقعیت' : language === 'ar' ? 'الموقع' : 'Location'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{language === 'fa' ? 'همه موقعیت‌ها' : language === 'ar' ? 'جميع المواقع' : 'All Locations'}</SelectItem>
                  {locations.map(loc => (
                    <SelectItem key={loc} value={loc.toLowerCase()}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Type Filter */}
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full lg:w-[180px] h-12 rounded-xl">
                  <SelectValue placeholder={language === 'fa' ? 'نوع' : language === 'ar' ? 'النوع' : 'Type'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{language === 'fa' ? 'همه انواع' : language === 'ar' ? 'جميع الأنواع' : 'All Types'}</SelectItem>
                  <SelectItem value="full-time">{language === 'fa' ? 'تمام وقت' : language === 'ar' ? 'دوام كامل' : 'Full-time'}</SelectItem>
                  <SelectItem value="part-time">{language === 'fa' ? 'پاره وقت' : language === 'ar' ? 'دوام جزئي' : 'Part-time'}</SelectItem>
                  <SelectItem value="contract">{language === 'fa' ? 'قراردادی' : language === 'ar' ? 'عقد' : 'Contract'}</SelectItem>
                  <SelectItem value="remote">{language === 'fa' ? 'راه دور' : language === 'ar' ? 'عن بُعد' : 'Remote'}</SelectItem>
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

          {/* Jobs List */}
          {filteredJobs.length === 0 ? (
            <Card className="p-12 text-center">
              <Briefcase className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-bold mb-2">
                {language === 'fa' ? 'موقعیتی یافت نشد' : language === 'ar' ? 'لم يتم العثور على منصب' : 'No Positions Found'}
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
              {filteredJobs.map((job) => (
                <Card
                  key={job.id}
                  className="p-6 md:p-8 hover:shadow-xl transition-all border-2 border-border hover:border-primary/50 group"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Job Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {job.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 mb-4">
                            <Badge variant="outline" className="gap-1.5">
                              <Building2 className="h-3.5 w-3.5" />
                              {job.department}
                            </Badge>
                            <Badge variant="outline" className="gap-1.5">
                              <MapPin className="h-3.5 w-3.5" />
                              {job.location}
                            </Badge>
                            <Badge className={cn("gap-1.5", getTypeBadgeColor(job.type))}>
                              {job.type === 'full-time' ? (language === 'fa' ? 'تمام وقت' : language === 'ar' ? 'دوام كامل' : 'Full-time') :
                               job.type === 'part-time' ? (language === 'fa' ? 'پاره وقت' : language === 'ar' ? 'دوام جزئي' : 'Part-time') :
                               job.type === 'contract' ? (language === 'fa' ? 'قراردادی' : language === 'ar' ? 'عقد' : 'Contract') :
                               (language === 'fa' ? 'راه دور' : language === 'ar' ? 'عن بُعد' : 'Remote')}
                            </Badge>
                            <Badge variant="outline" className="gap-1.5">
                              <Clock className="h-3.5 w-3.5" />
                              {job.experience}
                            </Badge>
                          </div>
                        </div>
                        {job.salary && (
                          <div className="text-end shrink-0">
                            <div className="flex items-center gap-1.5 text-success font-bold text-lg">
                              <DollarSign className="h-5 w-5" />
                              {job.salary}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {language === 'fa' ? 'سالانه' : language === 'ar' ? 'سنوياً' : 'per year'}
                            </p>
                          </div>
                        )}
                      </div>

                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        {job.benefits.slice(0, 3).map((benefit, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                        {job.benefits.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{job.benefits.length - 3} {language === 'fa' ? 'بیشتر' : language === 'ar' ? 'أكثر' : 'more'}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          {job.posted}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex lg:flex-col gap-3 shrink-0">
                      <Button
                        className="btn-gradient-primary rounded-xl px-6 h-12 font-semibold group/btn"
                        onClick={() => navigate(`/careers/${job.id}`)}
                      >
                        {language === 'fa' ? 'مشاهده جزئیات' : language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                        <ArrowRight className={cn("ms-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform", dir === 'rtl' && "rotate-180")} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary-light to-accent text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-extrabold">
              {language === 'fa' ? 'موقعیت مناسب شما را پیدا نکردید؟' : language === 'ar' ? 'لم تجد المنصب المناسب؟' : 'Didn\'t Find the Right Position?'}
            </h2>
            <p className="text-xl text-primary-foreground/90">
              {language === 'fa'
                ? 'ما همیشه به دنبال استعدادهای جدید هستیم. رزومه خود را برای ما ارسال کنید'
                : language === 'ar'
                ? 'نبحث دائماً عن مواهب جديدة. أرسل لنا سيرتك الذاتية'
                : 'We\'re always looking for new talent. Send us your resume'}
            </p>
            <Button
              size="lg"
              className="bg-background text-foreground hover:bg-background/90 rounded-2xl text-lg px-10 py-7 shadow-2xl font-semibold group"
              onClick={() => navigate('/contact')}
            >
              <span>
                {language === 'fa' ? 'ارسال رزومه' : language === 'ar' ? 'إرسال السيرة الذاتية' : 'Send Resume'}
              </span>
              <ArrowRight className={cn("ms-2 h-5 w-5 group-hover:translate-x-1 transition-transform", dir === 'rtl' && "rotate-180")} />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;


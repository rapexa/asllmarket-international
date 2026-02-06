import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { 
  MessageSquare, 
  Send,
  Star,
  Bug,
  Lightbulb,
  Heart,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Frown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';
import { cmsService } from '@/services';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const feedbackSchema = z.object({
  type: z.enum(['bug', 'feature', 'general', 'improvement', 'other']).default('general'),
  rating: z.number().min(1).max(5).optional(),
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  email: z.string().email('Invalid email address').optional(),
  page: z.string().optional(),
  screenshot: z.string().optional(),
});

type FeedbackForm = z.infer<typeof feedbackSchema>;

const Feedback: React.FC = () => {
  const { language, dir } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<string>('general');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    reset,
  } = useForm<FeedbackForm>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      type: 'general',
      rating: undefined,
      title: '',
      description: '',
      email: '',
      page: '',
      screenshot: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: FeedbackForm) => {
    setIsSubmitting(true);

    try {
      const subjectPrefix = `[${data.type.toUpperCase()}]`;
      const ratingPart = rating ? ` [rating=${rating}]` : '';
      const subject = `${subjectPrefix}${ratingPart} ${data.title}`;

      const detailsLines: string[] = [];
      if (data.page) detailsLines.push(`Page: ${data.page}`);
      if (data.screenshot) detailsLines.push(`Screenshot: ${data.screenshot}`);
      if (rating) detailsLines.push(`Rating: ${rating}/5`);

      const messageBody = [
        data.description,
        '',
        detailsLines.length ? '--- Details ---' : '',
        ...detailsLines,
      ].filter(Boolean).join('\n');

      await cmsService.submitContact({
        name: data.email || 'Anonymous',
        email: data.email || 'no-reply@aslmarket.com',
        phone: '',
        company: '',
        subject,
        message: messageBody,
        inquiryType: 'other',
      });

      // Show success toast
      toast({
        title: language === 'fa' ? 'بازخورد ارسال شد' : language === 'ar' ? 'تم إرسال الملاحظات' : 'Feedback Submitted',
        description: language === 'fa'
          ? 'بازخورد شما با موفقیت ارسال شد. از مشارکت شما متشکریم!'
          : language === 'ar'
          ? 'تم إرسال ملاحظاتك بنجاح. شكراً لمساهمتك!'
          : 'Your feedback has been submitted successfully. Thank you for your contribution!',
      });

      // Reset form
      reset();
      setRating(0);
      setSelectedType('general');
    } catch (error) {
      toast({
        title: language === 'fa' ? 'خطا' : language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'fa'
          ? 'خطا در ارسال بازخورد. لطفاً دوباره تلاش کنید.'
          : language === 'ar'
          ? 'خطأ في إرسال الملاحظات. يرجى المحاولة مرة أخرى.'
          : 'Error submitting feedback. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const feedbackTypes = [
    {
      value: 'bug',
      label: language === 'fa' ? 'گزارش باگ' : language === 'ar' ? 'تقرير خطأ' : 'Bug Report',
      icon: Bug,
      color: 'from-red-500 to-rose-500',
      description: language === 'fa' ? 'مشکلی پیدا کردید؟ به ما اطلاع دهید' : language === 'ar' ? 'وجدت مشكلة؟ أخبرنا' : 'Found an issue? Let us know',
    },
    {
      value: 'feature',
      label: language === 'fa' ? 'پیشنهاد ویژگی' : language === 'ar' ? 'اقتراح ميزة' : 'Feature Request',
      icon: Lightbulb,
      color: 'from-yellow-500 to-amber-500',
      description: language === 'fa' ? 'ایده‌ای برای بهبود دارید؟' : language === 'ar' ? 'لديك فكرة للتحسين؟' : 'Have an idea for improvement?',
    },
    {
      value: 'general',
      label: language === 'fa' ? 'بازخورد عمومی' : language === 'ar' ? 'ملاحظات عامة' : 'General Feedback',
      icon: MessageSquare,
      color: 'from-blue-500 to-cyan-500',
      description: language === 'fa' ? 'نظرات و پیشنهادات خود را به اشتراک بگذارید' : language === 'ar' ? 'شارك ملاحظاتك واقتراحاتك' : 'Share your thoughts and suggestions',
    },
    {
      value: 'improvement',
      label: language === 'fa' ? 'پیشنهاد بهبود' : language === 'ar' ? 'اقتراح تحسين' : 'Improvement Suggestion',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-500',
      description: language === 'fa' ? 'چطور می‌توانیم بهتر شویم؟' : language === 'ar' ? 'كيف يمكننا التحسن؟' : 'How can we improve?',
    },
    {
      value: 'other',
      label: language === 'fa' ? 'سایر' : language === 'ar' ? 'أخرى' : 'Other',
      icon: AlertCircle,
      color: 'from-gray-500 to-slate-500',
      description: language === 'fa' ? 'موضوع دیگری دارید؟' : language === 'ar' ? 'لديك موضوع آخر؟' : 'Have something else?',
    },
  ];

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
              <MessageSquare className="h-5 w-5 text-primary" />
              <span className="text-primary font-bold">
                {language === 'fa' ? 'بازخورد' : language === 'ar' ? 'الملاحظات' : 'Feedback'}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              <span className="block text-foreground">
                {language === 'fa' ? 'بازخورد شما مهم است' : language === 'ar' ? 'ملاحظاتك مهمة' : 'Your Feedback Matters'}
              </span>
              <span className="block mt-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {language === 'fa' ? 'به ما کمک کنید بهتر شویم' : language === 'ar' ? 'ساعدنا على التحسن' : 'Help Us Improve'}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {language === 'fa'
                ? 'نظرات، پیشنهادات و گزارش‌های شما به ما کمک می‌کند تا ASL Market را بهتر کنیم'
                : language === 'ar'
                ? 'ملاحظاتك واقتراحاتك وتقاريرك تساعدنا على تحسين ASL Market'
                : 'Your comments, suggestions, and reports help us make ASL Market better'}
            </p>
          </div>
        </div>
      </section>

      {/* Feedback Form Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <Card className="p-6 md:p-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Feedback Type Selection */}
                <div className="space-y-4">
                  <Label className="text-lg font-bold text-foreground">
                    {language === 'fa' ? 'نوع بازخورد' : language === 'ar' ? 'نوع الملاحظات' : 'Feedback Type'} <span className="text-destructive">*</span>
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {feedbackTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => {
                            setSelectedType(type.value);
                            setValue('type', type.value as any, { shouldValidate: true });
                          }}
                          className={cn(
                            "p-4 rounded-xl border-2 transition-all text-start group",
                            selectedType === type.value
                              ? "border-primary bg-primary/10 shadow-lg scale-105"
                              : "border-border hover:border-primary/50 hover:shadow-md"
                          )}
                        >
                          <div className={cn(
                            "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-3",
                            type.color
                          )}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <h3 className={cn(
                            "font-semibold mb-1 transition-colors",
                            selectedType === type.value ? "text-primary" : "text-foreground"
                          )}>
                            {type.label}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {type.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Rating (Optional) */}
                <div className="space-y-4">
                  <Label className="text-lg font-bold text-foreground">
                    {language === 'fa' ? 'امتیاز کلی' : language === 'ar' ? 'التقييم العام' : 'Overall Rating'}
                    <span className="text-muted-foreground text-xs ms-2 font-normal">
                      ({language === 'fa' ? 'اختیاری' : language === 'ar' ? 'اختياري' : 'Optional'})
                    </span>
                  </Label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => {
                          setRating(star);
                          setValue('rating', star, { shouldValidate: true });
                        }}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={cn(
                            "h-8 w-8 transition-colors",
                            star <= rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          )}
                        />
                      </button>
                    ))}
                    {rating > 0 && (
                      <span className="ms-4 text-sm font-semibold text-foreground">
                        {rating === 5 && (language === 'fa' ? 'عالی!' : language === 'ar' ? 'ممتاز!' : 'Excellent!')}
                        {rating === 4 && (language === 'fa' ? 'خوب' : language === 'ar' ? 'جيد' : 'Good')}
                        {rating === 3 && (language === 'fa' ? 'متوسط' : language === 'ar' ? 'متوسط' : 'Average')}
                        {rating === 2 && (language === 'fa' ? 'ضعیف' : language === 'ar' ? 'ضعيف' : 'Poor')}
                        {rating === 1 && (language === 'fa' ? 'خیلی ضعیف' : language === 'ar' ? 'ضعيف جداً' : 'Very Poor')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-semibold">
                    {language === 'fa' ? 'عنوان' : language === 'ar' ? 'العنوان' : 'Title'} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    {...register('title')}
                    placeholder={language === 'fa' ? 'عنوان بازخورد خود را وارد کنید' : language === 'ar' ? 'أدخل عنوان ملاحظاتك' : 'Enter your feedback title'}
                    className={cn("h-12 rounded-xl", errors.title && "border-destructive")}
                    disabled={isSubmitting}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">{errors.title.message}</p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-semibold">
                    {language === 'fa' ? 'توضیحات' : language === 'ar' ? 'الوصف' : 'Description'} <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    {...register('description')}
                    placeholder={language === 'fa'
                      ? 'بازخورد خود را به تفصیل شرح دهید...'
                      : language === 'ar'
                      ? 'اوصف ملاحظاتك بالتفصيل...'
                      : 'Describe your feedback in detail...'}
                    className={cn("min-h-[150px] rounded-xl", errors.description && "border-destructive")}
                    disabled={isSubmitting}
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive">{errors.description.message}</p>
                  )}
                </div>

                {/* Email and Page */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold">
                      {language === 'fa' ? 'ایمیل' : language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                      <span className="text-muted-foreground text-xs ms-1 font-normal">
                        ({language === 'fa' ? 'اختیاری' : language === 'ar' ? 'اختياري' : 'Optional'})
                      </span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder={language === 'fa' ? 'ایمیل شما' : language === 'ar' ? 'بريدك الإلكتروني' : 'Your email'}
                      className="h-12 rounded-xl"
                      disabled={isSubmitting}
                    />
                    <p className="text-xs text-muted-foreground">
                      {language === 'fa'
                        ? 'برای پیگیری بازخورد شما'
                        : language === 'ar'
                        ? 'لمتابعة ملاحظاتك'
                        : 'To follow up on your feedback'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="page" className="text-sm font-semibold">
                      {language === 'fa' ? 'صفحه مربوطه' : language === 'ar' ? 'الصفحة ذات الصلة' : 'Related Page'}
                      <span className="text-muted-foreground text-xs ms-1 font-normal">
                        ({language === 'fa' ? 'اختیاری' : language === 'ar' ? 'اختياري' : 'Optional'})
                      </span>
                    </Label>
                    <Input
                      id="page"
                      type="text"
                      {...register('page')}
                      placeholder={language === 'fa' ? 'مثلاً: /products' : language === 'ar' ? 'مثل: /products' : 'e.g., /products'}
                      className="h-12 rounded-xl"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(-1)}
                    disabled={isSubmitting}
                    className="flex-1 h-12 rounded-xl"
                  >
                    {language === 'fa' ? 'بازگشت' : language === 'ar' ? 'رجوع' : 'Cancel'}
                  </Button>
                  <Button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className="flex-1 btn-gradient-primary h-12 rounded-xl font-semibold"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        <span>{language === 'fa' ? 'در حال ارسال...' : language === 'ar' ? 'جاري الإرسال...' : 'Submitting...'}</span>
                      </div>
                    ) : (
                      <>
                        {language === 'fa' ? 'ارسال بازخورد' : language === 'ar' ? 'إرسال الملاحظات' : 'Submit Feedback'}
                        <Send className={cn("ms-2 h-4 w-4", dir === 'rtl' && "rotate-180")} />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Card>

            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/20">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-foreground mb-2">
                  {language === 'fa' ? 'ایده‌های شما' : language === 'ar' ? 'أفكارك' : 'Your Ideas'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'fa'
                    ? 'پیشنهادات شما به ما کمک می‌کند تا ویژگی‌های جدید اضافه کنیم'
                    : language === 'ar'
                    ? 'اقتراحاتك تساعدنا على إضافة ميزات جديدة'
                    : 'Your suggestions help us add new features'}
                </p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/20">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4">
                  <Bug className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-foreground mb-2">
                  {language === 'fa' ? 'گزارش مشکلات' : language === 'ar' ? 'تقرير المشاكل' : 'Report Issues'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'fa'
                    ? 'باگ‌ها و مشکلات را گزارش دهید تا سریع‌تر رفع شوند'
                    : language === 'ar'
                    ? 'أبلغ عن الأخطاء والمشاكل لإصلاحها بسرعة'
                    : 'Report bugs and issues so we can fix them quickly'}
                </p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/20">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-foreground mb-2">
                  {language === 'fa' ? 'قدردانی' : language === 'ar' ? 'التقدير' : 'Appreciation'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'fa'
                    ? 'اگر چیزی را دوست دارید، به ما بگویید!'
                    : language === 'ar'
                    ? 'إذا أعجبك شيء، أخبرنا!'
                    : 'If you love something, let us know!'}
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Thank You Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              {language === 'fa' ? 'از شما متشکریم!' : language === 'ar' ? 'شكراً لك!' : 'Thank You!'}
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              {language === 'fa'
                ? 'بازخورد شما برای ما بسیار ارزشمند است و به ما کمک می‌کند تا ASL Market را بهتر کنیم'
                : language === 'ar'
                ? 'ملاحظاتك قيمة جداً بالنسبة لنا وتساعدنا على تحسين ASL Market'
                : 'Your feedback is extremely valuable to us and helps us improve ASL Market'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/help')}
                className="gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                {language === 'fa' ? 'مرکز راهنما' : language === 'ar' ? 'مركز المساعدة' : 'Help Center'}
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/contact')}
                className="gap-2"
              >
                <Send className="h-4 w-4" />
                {language === 'fa' ? 'تماس با ما' : language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Feedback;


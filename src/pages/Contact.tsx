import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  MessageSquare,
  Clock,
  Globe,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Building2,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  inquiryType: z.enum(['general', 'sales', 'support', 'partnership', 'careers', 'other']).default('general'),
});

type ContactForm = z.infer<typeof contactSchema>;

const Contact: React.FC = () => {
  const { language, dir } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: '',
      inquiryType: 'general',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In real app, send to backend
      console.log('Contact Form Submitted:', data);

      // Show success toast
      toast({
        title: language === 'fa' ? 'پیام ارسال شد' : language === 'ar' ? 'تم إرسال الرسالة' : 'Message Sent',
        description: language === 'fa'
          ? 'پیام شما با موفقیت ارسال شد. ما در اسرع وقت با شما تماس خواهیم گرفت.'
          : language === 'ar'
          ? 'تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.'
          : 'Your message has been sent successfully. We will contact you soon.',
      });

      // Reset form
      reset();
    } catch (error) {
      toast({
        title: language === 'fa' ? 'خطا' : language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'fa'
          ? 'خطا در ارسال پیام. لطفاً دوباره تلاش کنید.'
          : language === 'ar'
          ? 'خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.'
          : 'Error sending message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: language === 'fa' ? 'ایمیل' : language === 'ar' ? 'البريد الإلكتروني' : 'Email',
      content: 'info@aslmarket.com',
      link: 'mailto:info@aslmarket.com',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Phone,
      title: language === 'fa' ? 'تلفن' : language === 'ar' ? 'الهاتف' : 'Phone',
      content: '+1 (234) 567-890',
      link: 'tel:+1234567890',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: MapPin,
      title: language === 'fa' ? 'آدرس' : language === 'ar' ? 'العنوان' : 'Address',
      content: language === 'fa' ? 'دفتر مرکزی، نیویورک، ایالات متحده' : language === 'ar' ? 'المكتب الرئيسي، نيويورك، الولايات المتحدة' : 'Headquarters, New York, USA',
      link: '#',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Clock,
      title: language === 'fa' ? 'ساعات کاری' : language === 'ar' ? 'ساعات العمل' : 'Business Hours',
      content: language === 'fa' ? 'دوشنبه - جمعه: 9 صبح - 6 عصر' : language === 'ar' ? 'الاثنين - الجمعة: 9 ص - 6 م' : 'Monday - Friday: 9 AM - 6 PM',
      link: '#',
      color: 'from-orange-500 to-red-500',
    },
  ];

  const inquiryTypes = [
    { value: 'general', label: language === 'fa' ? 'عمومی' : language === 'ar' ? 'عام' : 'General Inquiry' },
    { value: 'sales', label: language === 'fa' ? 'فروش' : language === 'ar' ? 'المبيعات' : 'Sales' },
    { value: 'support', label: language === 'fa' ? 'پشتیبانی' : language === 'ar' ? 'الدعم' : 'Support' },
    { value: 'partnership', label: language === 'fa' ? 'همکاری' : language === 'ar' ? 'الشراكة' : 'Partnership' },
    { value: 'careers', label: language === 'fa' ? 'استخدام' : language === 'ar' ? 'الوظائف' : 'Careers' },
    { value: 'other', label: language === 'fa' ? 'سایر' : language === 'ar' ? 'أخرى' : 'Other' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-24">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-10 start-5 sm:top-20 sm:start-10 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 end-5 sm:bottom-20 sm:end-10 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container relative z-10 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-7 md:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-primary/10 backdrop-blur-xl px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold border border-primary/20 flex-wrap justify-center">
              <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
              <span className="text-primary font-bold whitespace-nowrap">
                {language === 'fa' ? 'تماس با ما' : language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight px-2">
              <span className="block text-foreground">
                {language === 'fa' ? 'با ما در ارتباط باشید' : language === 'ar' ? 'ابق على اتصال' : 'Get In Touch'}
              </span>
              <span className="block mt-2 sm:mt-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {language === 'fa' ? 'ما اینجا هستیم تا کمک کنیم' : language === 'ar' ? 'نحن هنا للمساعدة' : 'We\'re Here to Help'}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
              {language === 'fa'
                ? 'سوالی دارید؟ پیشنهادی دارید؟ یا فقط می‌خواهید سلام کنید؟ ما دوست داریم از شما بشنویم'
                : language === 'ar'
                ? 'هل لديك سؤال؟ اقتراح؟ أو تريد فقط أن تقول مرحباً؟ نحن نحب أن نسمع منك'
                : 'Have a question? A suggestion? Or just want to say hello? We\'d love to hear from you'}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-4 sm:p-5 md:p-6 lg:p-8">
                <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                    <Send className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
                    {language === 'fa' ? 'ارسال پیام' : language === 'ar' ? 'إرسال رسالة' : 'Send Us a Message'}
                  </h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5 md:space-y-6">
                  {/* Inquiry Type */}
                  <div className="space-y-2">
                    <Label htmlFor="inquiryType" className="text-xs sm:text-sm font-semibold">
                      {language === 'fa' ? 'نوع درخواست' : language === 'ar' ? 'نوع الاستفسار' : 'Inquiry Type'} <span className="text-destructive">*</span>
                    </Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                      {inquiryTypes.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setValue('inquiryType', type.value as any, { shouldValidate: true })}
                          className={cn(
                            "p-2.5 sm:p-3 rounded-lg sm:rounded-xl border-2 transition-all text-xs sm:text-sm font-medium leading-tight",
                            watch('inquiryType') === type.value
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border hover:border-primary/50 text-muted-foreground"
                          )}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-semibold">
                        {language === 'fa' ? 'نام' : language === 'ar' ? 'الاسم' : 'Name'} <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        {...register('name')}
                        placeholder={language === 'fa' ? 'نام شما' : language === 'ar' ? 'اسمك' : 'Your name'}
                        className={cn("h-12 rounded-xl", errors.name && "border-destructive")}
                        disabled={isSubmitting}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold">
                        {language === 'fa' ? 'ایمیل' : language === 'ar' ? 'البريد الإلكتروني' : 'Email'} <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        placeholder={language === 'fa' ? 'ایمیل شما' : language === 'ar' ? 'بريدك الإلكتروني' : 'Your email'}
                        className={cn("h-12 rounded-xl", errors.email && "border-destructive")}
                        disabled={isSubmitting}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone and Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-semibold">
                        {language === 'fa' ? 'تلفن' : language === 'ar' ? 'الهاتف' : 'Phone'}
                        <span className="text-muted-foreground text-xs ms-1">({language === 'fa' ? 'اختیاری' : language === 'ar' ? 'اختياري' : 'Optional'})</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...register('phone')}
                        placeholder={language === 'fa' ? 'شماره تماس' : language === 'ar' ? 'رقم الهاتف' : 'Phone number'}
                        className="h-12 rounded-xl"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-sm font-semibold">
                        {language === 'fa' ? 'شرکت' : language === 'ar' ? 'الشركة' : 'Company'}
                        <span className="text-muted-foreground text-xs ms-1">({language === 'fa' ? 'اختیاری' : language === 'ar' ? 'اختياري' : 'Optional'})</span>
                      </Label>
                      <Input
                        id="company"
                        type="text"
                        {...register('company')}
                        placeholder={language === 'fa' ? 'نام شرکت' : language === 'ar' ? 'اسم الشركة' : 'Company name'}
                        className="h-12 rounded-xl"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-semibold">
                      {language === 'fa' ? 'موضوع' : language === 'ar' ? 'الموضوع' : 'Subject'} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="subject"
                      type="text"
                      {...register('subject')}
                      placeholder={language === 'fa' ? 'موضوع پیام' : language === 'ar' ? 'موضوع الرسالة' : 'Message subject'}
                      className={cn("h-12 rounded-xl", errors.subject && "border-destructive")}
                      disabled={isSubmitting}
                    />
                    {errors.subject && (
                      <p className="text-sm text-destructive">{errors.subject.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-semibold">
                      {language === 'fa' ? 'پیام' : language === 'ar' ? 'الرسالة' : 'Message'} <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      {...register('message')}
                      placeholder={language === 'fa'
                        ? 'پیام خود را اینجا بنویسید...'
                        : language === 'ar'
                        ? 'اكتب رسالتك هنا...'
                        : 'Write your message here...'}
                      className={cn("min-h-[150px] rounded-xl", errors.message && "border-destructive")}
                      disabled={isSubmitting}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className="w-full btn-gradient-primary h-11 sm:h-12 rounded-xl font-semibold text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin shrink-0" />
                        <span className="whitespace-nowrap">{language === 'fa' ? 'در حال ارسال...' : language === 'ar' ? 'جاري الإرسال...' : 'Sending...'}</span>
                      </div>
                    ) : (
                      <>
                        <span className="whitespace-nowrap">{language === 'fa' ? 'ارسال پیام' : language === 'ar' ? 'إرسال الرسالة' : 'Send Message'}</span>
                        <Send className={cn("ms-2 h-4 w-4 shrink-0", dir === 'rtl' && "rotate-180")} />
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 sm:top-24 space-y-4 sm:space-y-5 md:space-y-6">
                {/* Contact Information */}
                <Card className="p-4 sm:p-5 md:p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/10">
                  <h3 className="text-base sm:text-lg font-bold text-foreground mb-4 sm:mb-5 md:mb-6 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
                    <span>{language === 'fa' ? 'اطلاعات تماس' : language === 'ar' ? 'معلومات الاتصال' : 'Contact Information'}</span>
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    {contactInfo.map((info, index) => (
                      <a
                        key={index}
                        href={info.link}
                        className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-card/50 hover:bg-card border border-border/50 hover:border-primary/50 transition-all group"
                      >
                        <div className={cn("w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0", info.color)}>
                          <info.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white shrink-0" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-xs sm:text-sm text-foreground mb-1 group-hover:text-primary transition-colors leading-tight">
                            {info.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-muted-foreground break-words leading-relaxed">
                            {info.content}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </Card>

                {/* Quick Links */}
                <Card className="p-4 sm:p-5 md:p-6 bg-muted/50">
                  <h4 className="font-semibold text-xs sm:text-sm mb-3 sm:mb-4 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-accent shrink-0" />
                    <span>{language === 'fa' ? 'لینک‌های سریع' : language === 'ar' ? 'روابط سريعة' : 'Quick Links'}</span>
                  </h4>
                  <div className="space-y-1.5 sm:space-y-2">
                    {[
                      { label: language === 'fa' ? 'درباره ما' : language === 'ar' ? 'عنا' : 'About Us', href: '/about' },
                      { label: language === 'fa' ? 'فرصت‌های شغلی' : language === 'ar' ? 'الوظائف' : 'Careers', href: '/careers' },
                      { label: language === 'fa' ? 'مرکز راهنما' : language === 'ar' ? 'مركز المساعدة' : 'Help Center', href: '/help' },
                      { label: language === 'fa' ? 'سوالات متداول' : language === 'ar' ? 'الأسئلة الشائعة' : 'FAQ', href: '/faq' },
                    ].map((link, i) => (
                      <Link
                        key={i}
                        to={link.href}
                        className="block text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors py-1.5 sm:py-2 leading-relaxed"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </Card>

                {/* Support Hours */}
                <Card className="p-4 sm:p-5 md:p-6 bg-accent/5 border-accent/20">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-accent shrink-0" />
                    <h4 className="font-semibold text-xs sm:text-sm leading-tight">
                      {language === 'fa' ? 'پشتیبانی 24/7' : language === 'ar' ? 'دعم على مدار الساعة' : '24/7 Support'}
                    </h4>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {language === 'fa'
                      ? 'تیم پشتیبانی ما همیشه آماده کمک به شما است. در هر زمان از روز یا شب با ما تماس بگیرید.'
                      : language === 'ar'
                      ? 'فريق الدعم لدينا دائماً جاهز لمساعدتك. اتصل بنا في أي وقت من النهار أو الليل.'
                      : 'Our support team is always ready to help you. Contact us anytime, day or night.'}
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;


import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2, FileText, Clock, ArrowRight, Home } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const RFQSuccess: React.FC = () => {
  const { language, dir } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const productId = searchParams.get('productId');
  const rfqId = searchParams.get('rfqId') || `RFQ-${Date.now()}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header />
      <div className="container py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center animate-scale-in">
                <CheckCircle2 className="h-16 w-16 text-green-600" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl font-bold">
              {language === 'fa' ? 'درخواست با موفقیت ارسال شد!' : language === 'ar' ? 'تم إرسال الطلب بنجاح!' : 'Request Submitted Successfully!'}
            </h1>
            <p className="text-lg text-muted-foreground">
              {language === 'fa'
                ? 'درخواست استعلام قیمت شما ثبت شد و به تأمین‌کنندگان ارسال می‌شود'
                : language === 'ar'
                ? 'تم تسجيل طلب استعلام السعر وسيتم إرساله إلى الموردين'
                : 'Your quote request has been registered and will be sent to suppliers'}
            </p>
          </div>

          {/* RFQ Info Card */}
          <Card className="p-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <FileText className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'fa' ? 'شناسه درخواست' : language === 'ar' ? 'معرف الطلب' : 'Request ID'}
                  </p>
                  <p className="font-bold text-lg">{rfqId}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'fa' ? 'زمان پاسخ' : language === 'ar' ? 'وقت الرد' : 'Response Time'}
                  </p>
                  <p className="font-medium">
                    {language === 'fa'
                      ? 'معمولاً 24-48 ساعت'
                      : language === 'ar'
                      ? 'عادة 24-48 ساعة'
                      : 'Usually 24-48 hours'}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Next Steps */}
          <Card className="p-6 mb-6 bg-primary/5 border-primary/20">
            <h3 className="font-semibold mb-4">
              {language === 'fa' ? 'مراحل بعدی' : language === 'ar' ? 'الخطوات التالية' : 'Next Steps'}
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">1</span>
                </div>
                <span>
                  {language === 'fa'
                    ? 'درخواست شما به تأمین‌کنندگان مرتبط ارسال می‌شود'
                    : language === 'ar'
                    ? 'سيتم إرسال طلبك إلى الموردين ذوي الصلة'
                    : 'Your request will be sent to relevant suppliers'}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">2</span>
                </div>
                <span>
                  {language === 'fa'
                    ? 'تأمین‌کنندگان پیشنهادات خود را ارسال می‌کنند'
                    : language === 'ar'
                    ? 'سيقوم الموردون بإرسال عروضهم'
                    : 'Suppliers will submit their quotes'}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">3</span>
                </div>
                <span>
                  {language === 'fa'
                    ? 'شما می‌توانید پیشنهادات را مقایسه و بهترین را انتخاب کنید'
                    : language === 'ar'
                    ? 'يمكنك مقارنة العروض واختيار الأفضل'
                    : 'You can compare quotes and choose the best one'}
                </span>
              </li>
            </ul>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => navigate(`/rfq/responses?rfqId=${rfqId}`)}
              className="flex-1 btn-gradient-primary h-12"
            >
              {language === 'fa' ? 'مشاهده پاسخ‌ها' : language === 'ar' ? 'عرض الردود' : 'View Responses'}
              <ArrowRight className={cn("ms-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="flex-1 h-12"
            >
              <Home className={cn("me-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
              {language === 'fa' ? 'بازگشت به خانه' : language === 'ar' ? 'العودة إلى الصفحة الرئيسية' : 'Back to Home'}
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RFQSuccess;


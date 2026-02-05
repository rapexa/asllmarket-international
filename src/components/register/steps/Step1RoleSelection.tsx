import React, { useState } from 'react';
import { ShoppingBag, Building2, User, Users, Store, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { UserRole } from '../RegisterFlow';

interface Step1RoleSelectionProps {
  onNext: (data: { role: UserRole }) => void;
  selectedRole: UserRole | null;
  autoSelect?: UserRole;
}

const roles = [
  {
    id: 'buyer' as UserRole,
    icon: ShoppingBag,
    title: 'Buyer',
    titleFa: 'خریدار',
    titleAr: 'مشتري',
    description: 'I want to find products and suppliers',
    descriptionFa: 'می‌خواهم محصولات و تأمین‌کنندگان را پیدا کنم',
    descriptionAr: 'أريد العثور على المنتجات والموردين',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    iconColor: 'text-green-500',
  },
  {
    id: 'supplier' as UserRole,
    icon: Building2,
    title: 'Supplier',
    titleFa: 'تأمین‌کننده',
    titleAr: 'مورد',
    description: 'I want to sell products globally',
    descriptionFa: 'می‌خواهم محصولات را به صورت جهانی بفروشم',
    descriptionAr: 'أريد بيع المنتجات عالمياً',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    iconColor: 'text-blue-500',
  },
  {
    id: 'visitor' as UserRole,
    icon: User,
    title: 'Visitor / Agent',
    titleFa: 'بازدیدکننده / نماینده',
    titleAr: 'زائر / وكيل',
    description: 'I want to collaborate, visit or find opportunities',
    descriptionFa: 'می‌خواهم همکاری کنم، بازدید کنم یا فرصت‌ها را پیدا کنم',
    descriptionAr: 'أريد التعاون أو الزيارة أو العثور على الفرص',
    color: 'from-orange-500 to-amber-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    iconColor: 'text-orange-500',
  },
  {
    id: 'both' as UserRole,
    icon: Users,
    title: 'Both Buyer & Supplier',
    titleFa: 'هم خریدار و هم تأمین‌کننده',
    titleAr: 'مشتري ومورد',
    description: 'I want to buy and sell',
    descriptionFa: 'می‌خواهم هم خرید و هم فروش انجام دهم',
    descriptionAr: 'أريد الشراء والبيع',
    color: 'from-purple-500 to-violet-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    iconColor: 'text-purple-500',
  },
  {
    id: 'market' as UserRole,
    icon: Store,
    title: 'Market',
    titleFa: 'بازار',
    titleAr: 'السوق',
    description: 'I want to create a marketplace or trading platform',
    descriptionFa: 'می‌خواهم یک بازار یا پلتفرم تجاری ایجاد کنم',
    descriptionAr: 'أريد إنشاء سوق أو منصة تجارية',
    color: 'from-teal-500 to-cyan-500',
    bgColor: 'bg-teal-500/10',
    borderColor: 'border-teal-500/30',
    iconColor: 'text-teal-500',
  },
];

const Step1RoleSelection: React.FC<Step1RoleSelectionProps> = ({ onNext, selectedRole, autoSelect }) => {
  const { t, language, dir } = useLanguage();
  const [selected, setSelected] = useState<UserRole | null>(selectedRole || autoSelect || null);

  // Auto-select and proceed if autoSelect is provided
  React.useEffect(() => {
    if (autoSelect && !selectedRole) {
      setSelected(autoSelect);
      // Auto-proceed to next step after a short delay
      const timer = setTimeout(() => {
        onNext({ role: autoSelect });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [autoSelect, selectedRole, onNext]);

  const getTitle = (role: typeof roles[0]) => {
    if (language === 'fa') return role.titleFa;
    if (language === 'ar') return role.titleAr;
    return role.title;
  };

  const getDescription = (role: typeof roles[0]) => {
    if (language === 'fa') return role.descriptionFa;
    if (language === 'ar') return role.descriptionAr;
    return role.description;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground">
          Create Your ASL Market Account
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Select how you want to use the platform
        </p>
      </div>

      {/* Role Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = selected === role.id;

          return (
            <Card
              key={role.id}
              onClick={() => setSelected(role.id)}
              className={cn(
                "relative p-6 md:p-8 cursor-pointer transition-all duration-300",
                "hover:shadow-xl hover:-translate-y-1",
                "border-2",
                isSelected
                  ? `${role.borderColor} ${role.bgColor} shadow-lg scale-[1.02]`
                  : "border-border hover:border-primary/50"
              )}
            >
              {/* Selection Indicator */}
              {isSelected && (
                <div className={cn(
                  "absolute top-4 end-4 w-8 h-8 rounded-full flex items-center justify-center",
                  `bg-gradient-to-br ${role.color} text-white shadow-lg`
                )}>
                  <Check className="h-5 w-5" />
                </div>
              )}

              {/* Icon */}
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center mb-6",
                role.bgColor,
                isSelected && "scale-110"
              )}>
                <Icon className={cn("h-8 w-8", role.iconColor)} />
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-foreground">
                  {getTitle(role)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {getDescription(role)}
                </p>
              </div>

              {/* Hover Gradient */}
              <div className={cn(
                "absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 hover:opacity-5 transition-opacity pointer-events-none",
                role.color
              )} />
            </Card>
          );
        })}
      </div>

      {/* CTA */}
      <div className="flex justify-center pt-8">
        <Button
          size="lg"
          onClick={() => {
            if (selected) {
              onNext({ role: selected });
            }
          }}
          disabled={!selected}
          className="btn-gradient-primary rounded-2xl px-12 py-6 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
          <ArrowRight className={cn("ms-2 h-5 w-5", dir === 'rtl' && "rotate-180")} />
        </Button>
      </div>
    </div>
  );
};

export default Step1RoleSelection;


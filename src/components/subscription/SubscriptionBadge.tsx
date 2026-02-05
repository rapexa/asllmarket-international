import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { SubscriptionPlan, subscriptionPlans, getPlanName } from '@/types/subscription';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface SubscriptionBadgeProps {
  plan: SubscriptionPlan;
  showTooltip?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SubscriptionBadge: React.FC<SubscriptionBadgeProps> = ({
  plan,
  showTooltip = true,
  size = 'md',
  className,
}) => {
  const { language } = useLanguage();
  const config = subscriptionPlans[plan];

  const getTooltipText = () => {
    if (language === 'fa') {
      return `${config.nameFa} Supplier - ${config.descriptionFa}`;
    }
    if (language === 'ar') {
      return `${config.nameAr} Supplier - ${config.descriptionAr}`;
    }
    return `${config.name} Supplier - ${config.description}`;
  };

  const badge = (
    <Badge
      variant="outline"
      className={cn(
        "inline-flex items-center gap-1.5 font-semibold",
        config.bgColor,
        config.borderColor,
        config.color,
        size === 'sm' && "text-xs px-2 py-0.5",
        size === 'md' && "text-sm px-2.5 py-1",
        size === 'lg' && "text-base px-3 py-1.5",
        className
      )}
    >
      {plan === 'diamond' && '💎'}
      {plan === 'gold' && '🥇'}
      {plan === 'silver' && '🥈'}
      {plan === 'free' && '🆓'}
      {getPlanName(plan, language)}
    </Badge>
  );

  if (showTooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {badge}
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">{getTooltipText()}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return badge;
};

export default SubscriptionBadge;


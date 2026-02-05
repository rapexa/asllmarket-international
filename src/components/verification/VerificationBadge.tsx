import React from 'react';
import { CheckCircle2, Clock, XCircle, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { VerificationStatus, verificationStatusConfig } from '@/types/verification';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface VerificationBadgeProps {
  status: VerificationStatus;
  showTooltip?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  status,
  showTooltip = true,
  size = 'md',
  className,
}) => {
  const { language } = useLanguage();
  const config = verificationStatusConfig[status];

  const getIcon = () => {
    switch (status) {
      case 'verified':
        return <CheckCircle2 className={cn(
          size === 'sm' ? "h-3 w-3" : size === 'md' ? "h-4 w-4" : "h-5 w-5"
        )} />;
      case 'pending':
        return <Clock className={cn(
          size === 'sm' ? "h-3 w-3" : size === 'md' ? "h-4 w-4" : "h-5 w-5"
        )} />;
      case 'rejected':
        return <XCircle className={cn(
          size === 'sm' ? "h-3 w-3" : size === 'md' ? "h-4 w-4" : "h-5 w-5"
        )} />;
      case 'needs_update':
        return <AlertCircle className={cn(
          size === 'sm' ? "h-3 w-3" : size === 'md' ? "h-4 w-4" : "h-5 w-5"
        )} />;
      default:
        return null;
    }
  };

  const getLabel = () => {
    if (language === 'fa') return config.labelFa;
    if (language === 'ar') return config.labelAr;
    return config.label;
  };

  const getTooltipText = () => {
    if (status === 'verified') {
      return language === 'fa'
        ? 'هویت و کسب‌وکار تأیید شده توسط ASL Market'
        : language === 'ar'
        ? 'الهوية والأعمال مؤكدة من ASL Market'
        : 'Identity and business verified by ASL Market';
    }
    return getLabel();
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
      {getIcon()}
      {getLabel()}
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

export default VerificationBadge;


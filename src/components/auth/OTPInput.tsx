import React, { useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  value,
  onChange,
  onComplete,
  error,
  disabled = false,
  className,
}) => {
  const { language, dir } = useLanguage();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, digit: string) => {
    if (disabled) return;
    
    // Only allow digits
    if (digit && !/^\d$/.test(digit)) return;

    const newValue = value.split('');
    newValue[index] = digit;
    const updatedValue = newValue.join('').slice(0, length);
    
    onChange(updatedValue);

    // Auto-focus next input
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Call onComplete when all digits are filled
    if (updatedValue.length === length) {
      onComplete?.(updatedValue);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    
    if (pastedData) {
      onChange(pastedData);
      const nextIndex = Math.min(pastedData.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
      
      if (pastedData.length === length) {
        onComplete?.(pastedData);
      }
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-sm font-semibold">
        {language === 'fa' ? 'کد تأیید' : language === 'ar' ? 'رمز التحقق' : 'Verification Code'} <span className="text-destructive">*</span>
      </Label>
      <div className={cn("flex gap-2", dir === 'rtl' && "flex-row-reverse")}>
        {Array.from({ length }).map((_, index) => (
          <Input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[index] || ''}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={cn(
              "h-14 w-14 text-center text-2xl font-bold rounded-xl",
              error && "border-destructive",
              "focus:ring-2 focus:ring-primary"
            )}
            disabled={disabled}
          />
        ))}
      </div>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export default OTPInput;


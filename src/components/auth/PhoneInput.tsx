import React, { useState } from 'react';
import { Phone, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { countryCodes, getCountryName, type CountryCode } from '@/data/countryCodes';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList, CommandItem } from '@/components/ui/command';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  countryCode: string;
  onCountryCodeChange: (code: string) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  countryCode,
  onCountryCodeChange,
  error,
  disabled = false,
  className,
}) => {
  const { language, dir } = useLanguage();
  const [open, setOpen] = useState(false);

  const selectedCountry = countryCodes.find(c => c.code === countryCode) || countryCodes[0];

  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-sm font-semibold">
        {language === 'fa' ? 'شماره موبایل' : language === 'ar' ? 'رقم الهاتف' : 'Mobile Number'} <span className="text-destructive">*</span>
      </Label>
      <div className="flex gap-2">
        {/* Country Code Selector */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "h-12 w-[140px] shrink-0 justify-between rounded-xl",
                error && "border-destructive"
              )}
              disabled={disabled}
              type="button"
            >
              <span className="text-lg me-1">{selectedCountry.flag}</span>
              <span className="text-sm font-medium">{selectedCountry.dialCode}</span>
              <ChevronDown className={cn("h-4 w-4 ms-1 opacity-50", dir === 'rtl' && "rotate-180")} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0" align={dir === 'rtl' ? 'end' : 'start'}>
            <Command>
              <CommandInput placeholder={language === 'fa' ? 'جستجو...' : language === 'ar' ? 'بحث...' : 'Search...'} />
              <CommandEmpty>
                {language === 'fa' ? 'نتیجه‌ای یافت نشد' : language === 'ar' ? 'لا توجد نتائج' : 'No results found'}
              </CommandEmpty>
              <CommandGroup className="max-h-[300px] overflow-auto">
                {countryCodes.map((country) => (
                  <CommandItem
                    key={country.code}
                    value={`${country.name} ${country.dialCode}`}
                    onSelect={() => {
                      onCountryCodeChange(country.code);
                      setOpen(false);
                    }}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <span className="text-xl">{country.flag}</span>
                    <span className="flex-1">{getCountryName(country, language)}</span>
                    <span className="text-sm text-muted-foreground">{country.dialCode}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Phone Number Input */}
        <div className="relative flex-1">
          <Phone className={cn(
            "absolute top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground",
            dir === 'rtl' ? "end-4" : "start-4"
          )} />
          <Input
            type="tel"
            value={value}
            onChange={(e) => {
              const phoneValue = e.target.value.replace(/\D/g, '');
              onChange(phoneValue);
            }}
            placeholder={language === 'fa' ? '9123456789' : language === 'ar' ? '9123456789' : '1234567890'}
            className={cn(
              "h-12 rounded-xl",
              dir === 'rtl' ? "pe-12" : "ps-12",
              error && "border-destructive"
            )}
            disabled={disabled}
          />
        </div>
      </div>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export default PhoneInput;


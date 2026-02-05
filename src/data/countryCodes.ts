export interface CountryCode {
  code: string;
  name: string;
  nameFa: string;
  nameAr: string;
  dialCode: string;
  flag: string;
}

export const countryCodes: CountryCode[] = [
  { code: 'US', name: 'United States', nameFa: 'ایالات متحده', nameAr: 'الولايات المتحدة', dialCode: '+1', flag: '🇺🇸' },
  { code: 'IR', name: 'Iran', nameFa: 'ایران', nameAr: 'إيران', dialCode: '+98', flag: '🇮🇷' },
  { code: 'SA', name: 'Saudi Arabia', nameFa: 'عربستان سعودی', nameAr: 'المملكة العربية السعودية', dialCode: '+966', flag: '🇸🇦' },
  { code: 'AE', name: 'United Arab Emirates', nameFa: 'امارات متحده عربی', nameAr: 'الإمارات العربية المتحدة', dialCode: '+971', flag: '🇦🇪' },
  { code: 'CN', name: 'China', nameFa: 'چین', nameAr: 'الصين', dialCode: '+86', flag: '🇨🇳' },
  { code: 'IN', name: 'India', nameFa: 'هند', nameAr: 'الهند', dialCode: '+91', flag: '🇮🇳' },
  { code: 'GB', name: 'United Kingdom', nameFa: 'انگلستان', nameAr: 'المملكة المتحدة', dialCode: '+44', flag: '🇬🇧' },
  { code: 'DE', name: 'Germany', nameFa: 'آلمان', nameAr: 'ألمانيا', dialCode: '+49', flag: '🇩🇪' },
  { code: 'FR', name: 'France', nameFa: 'فرانسه', nameAr: 'فرنسا', dialCode: '+33', flag: '🇫🇷' },
  { code: 'IT', name: 'Italy', nameFa: 'ایتالیا', nameAr: 'إيطاليا', dialCode: '+39', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', nameFa: 'اسپانیا', nameAr: 'إسبانيا', dialCode: '+34', flag: '🇪🇸' },
  { code: 'TR', name: 'Turkey', nameFa: 'ترکیه', nameAr: 'تركيا', dialCode: '+90', flag: '🇹🇷' },
  { code: 'PK', name: 'Pakistan', nameFa: 'پاکستان', nameAr: 'باكستان', dialCode: '+92', flag: '🇵🇰' },
  { code: 'BD', name: 'Bangladesh', nameFa: 'بنگلادش', nameAr: 'بنغلاديش', dialCode: '+880', flag: '🇧🇩' },
  { code: 'EG', name: 'Egypt', nameFa: 'مصر', nameAr: 'مصر', dialCode: '+20', flag: '🇪🇬' },
  { code: 'IQ', name: 'Iraq', nameFa: 'عراق', nameAr: 'العراق', dialCode: '+964', flag: '🇮🇶' },
  { code: 'JO', name: 'Jordan', nameFa: 'اردن', nameAr: 'الأردن', dialCode: '+962', flag: '🇯🇴' },
  { code: 'LB', name: 'Lebanon', nameFa: 'لبنان', nameAr: 'لبنان', dialCode: '+961', flag: '🇱🇧' },
  { code: 'KW', name: 'Kuwait', nameFa: 'کویت', nameAr: 'الكويت', dialCode: '+965', flag: '🇰🇼' },
  { code: 'OM', name: 'Oman', nameFa: 'عمان', nameAr: 'عمان', dialCode: '+968', flag: '🇴🇲' },
  { code: 'QA', name: 'Qatar', nameFa: 'قطر', nameAr: 'قطر', dialCode: '+974', flag: '🇶🇦' },
  { code: 'BH', name: 'Bahrain', nameFa: 'بحرین', nameAr: 'البحرين', dialCode: '+973', flag: '🇧🇭' },
  { code: 'YE', name: 'Yemen', nameFa: 'یمن', nameAr: 'اليمن', dialCode: '+967', flag: '🇾🇪' },
  { code: 'JP', name: 'Japan', nameFa: 'ژاپن', nameAr: 'اليابان', dialCode: '+81', flag: '🇯🇵' },
  { code: 'KR', name: 'South Korea', nameFa: 'کره جنوبی', nameAr: 'كوريا الجنوبية', dialCode: '+82', flag: '🇰🇷' },
  { code: 'SG', name: 'Singapore', nameFa: 'سنگاپور', nameAr: 'سنغافورة', dialCode: '+65', flag: '🇸🇬' },
  { code: 'MY', name: 'Malaysia', nameFa: 'مالزی', nameAr: 'ماليزيا', dialCode: '+60', flag: '🇲🇾' },
  { code: 'TH', name: 'Thailand', nameFa: 'تایلند', nameAr: 'تايلاند', dialCode: '+66', flag: '🇹🇭' },
  { code: 'ID', name: 'Indonesia', nameFa: 'اندونزی', nameAr: 'إندونيسيا', dialCode: '+62', flag: '🇮🇩' },
  { code: 'PH', name: 'Philippines', nameFa: 'فیلیپین', nameAr: 'الفلبين', dialCode: '+63', flag: '🇵🇭' },
  { code: 'VN', name: 'Vietnam', nameFa: 'ویتنام', nameAr: 'فيتنام', dialCode: '+84', flag: '🇻🇳' },
  { code: 'RU', name: 'Russia', nameFa: 'روسیه', nameAr: 'روسيا', dialCode: '+7', flag: '🇷🇺' },
  { code: 'BR', name: 'Brazil', nameFa: 'برزیل', nameAr: 'البرازيل', dialCode: '+55', flag: '🇧🇷' },
  { code: 'MX', name: 'Mexico', nameFa: 'مکزیک', nameAr: 'المكسيك', dialCode: '+52', flag: '🇲🇽' },
  { code: 'CA', name: 'Canada', nameFa: 'کانادا', nameAr: 'كندا', dialCode: '+1', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', nameFa: 'استرالیا', nameAr: 'أستراليا', dialCode: '+61', flag: '🇦🇺' },
  { code: 'NZ', name: 'New Zealand', nameFa: 'نیوزیلند', nameAr: 'نيوزيلندا', dialCode: '+64', flag: '🇳🇿' },
];

export const getCountryName = (country: CountryCode, language: 'en' | 'fa' | 'ar'): string => {
  if (language === 'fa') return country.nameFa;
  if (language === 'ar') return country.nameAr;
  return country.name;
};



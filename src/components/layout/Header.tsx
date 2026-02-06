import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, User, Globe, ShoppingCart, Sparkles, Bell, Home, Package, Building2, FileText, Truck, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useCart } from '@/contexts/CartContext';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import NotificationPanel from '@/components/notifications/NotificationPanel';
import { Language, languages } from '@/lib/i18n';
import AdvancedSearchBox from '@/components/search/AdvancedSearchBox';
import CategoriesSidePanel from '@/components/categories/CategoriesSidePanel';
import BackendStatus from '@/components/layout/BackendStatus';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const { t, language, setLanguage, dir } = useLanguage();
  const { theme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [categoriesPanelOpen, setCategoriesPanelOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-card/80 border-b border-border/50">
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground">
          <div className="container flex items-center justify-between py-2 px-4 text-xs md:text-sm">
            <div className="hidden lg:flex items-center gap-3 md:gap-4">
              <span className="opacity-90 font-medium whitespace-nowrap">🌍 Global B2B Trade Platform</span>
              <span className="text-accent/80 font-semibold hidden xl:inline">|</span>
              <span className="opacity-90 whitespace-nowrap hidden xl:inline">✅ 100,000+ Verified Suppliers</span>
              <span className="text-accent/80 font-semibold hidden xl:inline">|</span>
              <span className="opacity-90 whitespace-nowrap hidden xl:inline">🚀 AI-Powered Search</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3 ms-auto">
              <BackendStatus />
              <ThemeToggle variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-light/50 h-8 w-8 md:h-9 md:w-9" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-light/50 gap-1.5 md:gap-2 h-8 px-2 md:px-3">
                    <Globe className="h-3.5 w-3.5 md:h-4 md:w-4 shrink-0" />
                    <span className="hidden sm:inline text-xs md:text-sm whitespace-nowrap">{languages[language].flag} {languages[language].name}</span>
                    <span className="sm:hidden">{languages[language].flag}</span>
                    <ChevronDown className="h-3 w-3 md:h-3.5 md:w-3.5 shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={dir === 'rtl' ? 'start' : 'end'} className="min-w-[140px]">
                  {(Object.keys(languages) as Language[]).map((lang) => (
                    <DropdownMenuItem
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={cn("cursor-pointer", language === lang && 'bg-accent/10')}
                    >
                      <span className="me-2">{languages[lang].flag}</span>
                      <span className="text-sm">{languages[lang].name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="bg-card/50 backdrop-blur-sm">
          <div className="container flex items-center justify-between py-3 md:py-4 gap-2 md:gap-4 px-4">
            {/* Hamburger Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex h-9 md:h-10 w-9 md:w-10 shrink-0"
              onClick={() => setCategoriesPanelOpen(true)}
              aria-label={t('nav.categories')}
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 md:gap-3 shrink-0 group">
              <div className="relative">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
                  <span className="text-primary-foreground font-bold text-lg md:text-xl">A</span>
                </div>
                <div className="absolute -top-0.5 -end-0.5 md:-top-1 md:-end-1 w-3 h-3 md:w-4 md:h-4 bg-accent rounded-full border-2 border-card animate-pulse" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-lg md:text-xl text-foreground group-hover:text-primary transition-colors leading-tight">
                  ASL Market
                </h1>
                <p className="text-[9px] md:text-[10px] text-muted-foreground -mt-0.5 font-medium leading-tight">
                  International Trade
                </p>
              </div>
            </Link>

            {/* Advanced Search Box */}
            <div className="hidden md:flex flex-1 max-w-2xl lg:max-w-3xl mx-4 lg:mx-8">
              <AdvancedSearchBox
                onFocus={() => {
                  setSearchFocused(true);
                }}
                onBlur={() => {
                  setSearchFocused(false);
                }}
              />
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-1.5 lg:gap-2">
              <NotificationPanel />
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative h-9 w-9 lg:h-10 lg:w-10"
                onClick={() => navigate('/cart')}
              >
                <ShoppingCart className="h-4 w-4 lg:h-5 lg:w-5" />
                {itemCount > 0 && (
                  <span className="absolute top-0.5 end-0.5 lg:top-1 lg:end-1 min-w-[18px] h-[18px] lg:min-w-[20px] lg:h-5 bg-accent text-accent-foreground rounded-full text-[9px] lg:text-[10px] font-bold flex items-center justify-center px-1 lg:px-1.5 animate-scale-in">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </Button>

              {/* Auth Area: show Login/Register when not authenticated, Profile menu when logged in */}
              {!isAuthenticated ? (
                <>
                  <Button 
                    variant="ghost" 
                    className="gap-1.5 lg:gap-2 h-9 lg:h-10 px-3 lg:px-4 text-sm"
                    onClick={() => navigate('/login')}
                  >
                    <User className="h-4 w-4 shrink-0" />
                    <span className="hidden lg:inline whitespace-nowrap">{t('nav.login')}</span>
                  </Button>
                  <Button 
                    className="btn-gradient-primary rounded-xl px-4 lg:px-6 h-9 lg:h-10 text-sm lg:text-base whitespace-nowrap"
                    onClick={() => navigate('/register')}
                  >
                    {t('nav.register')}
                  </Button>
                </>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="gap-1.5 lg:gap-2 h-9 lg:h-10 px-3 lg:px-4 text-sm"
                    >
                      <User className="h-4 w-4 shrink-0" />
                      <span className="hidden lg:inline whitespace-nowrap">
                        {user?.fullName || user?.email}
                      </span>
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align={dir === 'rtl' ? 'start' : 'end'}>
                    <DropdownMenuItem
                      onClick={() => {
                        const role = user?.role;
                        if (role === 'buyer') navigate('/dashboard/buyer');
                        else if (role === 'supplier') navigate('/dashboard/supplier');
                        else if (role === 'market') navigate('/dashboard/market');
                        else if (role === 'visitor') navigate('/dashboard/visitor');
                        else navigate('/dashboard');
                      }}
                    >
                      {t('nav.dashboard') || 'Dashboard'}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate('/profile')}
                    >
                      {t('nav.profile') || 'Profile'}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        logout();
                        navigate('/');
                      }}
                    >
                      {t('nav.logout') || 'Logout'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9 shrink-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

        </div>
      </header>

      {/* Mobile Menu - Outside Header */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop Overlay */}
          <div 
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Mobile Menu Panel */}
          <div 
            className="md:hidden fixed inset-x-0 top-[120px] bottom-0 bg-card border-t-2 border-primary/20 shadow-2xl z-[70] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Menu Content */}
            <div className="container py-4 sm:py-5 space-y-4 sm:space-y-5 px-4 pb-8">
              {/* Mobile Search Section */}
              <div className="pb-3 sm:pb-4 border-b border-border/50">
                <AdvancedSearchBox />
              </div>

              {/* Main Navigation Links - Like Desktop */}
              <div className="space-y-1 sm:space-y-1.5 pb-3 sm:pb-4 border-b border-border/50">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-base sm:text-lg font-semibold py-4 sm:py-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors"
                  onClick={() => {
                    navigate('/');
                    setMobileMenuOpen(false);
                  }}
                >
                  <Home className="h-5 w-5 me-3 shrink-0" />
                  {t('nav.home')}
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-base sm:text-lg font-semibold py-4 sm:py-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors"
                  onClick={() => {
                    setCategoriesPanelOpen(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  <Menu className="h-5 w-5 me-3 shrink-0" />
                  {t('nav.categories')}
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-base sm:text-lg font-semibold py-4 sm:py-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors"
                  onClick={() => {
                    navigate('/products');
                    setMobileMenuOpen(false);
                  }}
                >
                  <Package className="h-5 w-5 me-3 shrink-0" />
                  {t('nav.products')}
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-base sm:text-lg font-semibold py-4 sm:py-5 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors"
                  onClick={() => {
                    navigate('/suppliers');
                    setMobileMenuOpen(false);
                  }}
                >
                  <Building2 className="h-5 w-5 me-3 shrink-0" />
                  {t('nav.suppliers')}
                </Button>
              </div>

              {/* Trade Section - Like Footer */}
              <div className="space-y-1 sm:space-y-1.5 pb-3 sm:pb-4 border-b border-border/50">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 sm:mb-4 px-2">
                  Trade
                </h3>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-base sm:text-lg py-3.5 sm:py-4 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors"
                  onClick={() => {
                    navigate('/buyers');
                    setMobileMenuOpen(false);
                  }}
                >
                  <User className="h-5 w-5 me-3 shrink-0" />
                  For Buyers
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-base sm:text-lg py-3.5 sm:py-4 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors"
                  onClick={() => {
                    navigate('/suppliers');
                    setMobileMenuOpen(false);
                  }}
                >
                  <Building2 className="h-5 w-5 me-3 shrink-0" />
                  For Suppliers
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-base sm:text-lg py-3.5 sm:py-4 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors"
                  onClick={() => {
                    navigate('/trade-assurance');
                    setMobileMenuOpen(false);
                  }}
                >
                  <FileText className="h-5 w-5 me-3 shrink-0" />
                  Trade Assurance
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-base sm:text-lg py-3.5 sm:py-4 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors"
                  onClick={() => {
                    navigate('/logistics');
                    setMobileMenuOpen(false);
                  }}
                >
                  <Truck className="h-5 w-5 me-3 shrink-0" />
                  Logistics
                </Button>
              </div>

              {/* Quick Links - Like Footer */}
              <div className="space-y-1 sm:space-y-1.5 pb-3 sm:pb-4 border-b border-border/50">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 sm:mb-4 px-2">
                  Quick Links
                </h3>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-base sm:text-lg py-3.5 sm:py-4 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors"
                  onClick={() => {
                    navigate('/about');
                    setMobileMenuOpen(false);
                  }}
                >
                  <User className="h-5 w-5 me-3 shrink-0" />
                  About Us
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-base sm:text-lg py-3.5 sm:py-4 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors"
                  onClick={() => {
                    navigate('/help');
                    setMobileMenuOpen(false);
                  }}
                >
                  <HelpCircle className="h-5 w-5 me-3 shrink-0" />
                  Help Center
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-base sm:text-lg py-3.5 sm:py-4 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors"
                  onClick={() => {
                    navigate('/faq');
                    setMobileMenuOpen(false);
                  }}
                >
                  <HelpCircle className="h-5 w-5 me-3 shrink-0" />
                  FAQ
                </Button>
              </div>

              {/* Mobile Actions - Like Desktop Right Actions */}
              <div className="flex items-center gap-2 sm:gap-3 pt-3 sm:pt-4 pb-3 sm:pb-4 border-b border-border/50">
                <div className="flex-1">
                  <NotificationPanel />
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-xl hover:bg-primary/10 transition-colors"
                  onClick={() => {
                    navigate('/cart');
                    setMobileMenuOpen(false);
                  }}
                >
                  <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
                  {itemCount > 0 && (
                    <span className="absolute top-1 end-1 min-w-[18px] h-[18px] bg-accent text-accent-foreground rounded-full text-[9px] font-bold flex items-center justify-center px-1 animate-scale-in">
                      {itemCount > 99 ? '99+' : itemCount}
                    </span>
                  )}
                </Button>
                <ThemeToggle variant="ghost" size="icon" className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl" />
              </div>

              {/* Mobile Auth - Like Desktop */}
              <div className="space-y-2 sm:space-y-3 pt-2 sm:pt-3 pb-6">
                <Button 
                  variant="outline" 
                  className="w-full py-4 sm:py-5 text-base sm:text-lg font-semibold rounded-xl border-2 hover:bg-primary/10 hover:border-primary/50 transition-colors flex items-center justify-center gap-2"
                  onClick={() => {
                    navigate('/login');
                    setMobileMenuOpen(false);
                  }}
                >
                  <User className="h-5 w-5 shrink-0" />
                  {t('nav.login')}
                </Button>
                <Button 
                  className="w-full py-4 sm:py-5 text-base sm:text-lg font-semibold btn-gradient-primary rounded-xl shadow-lg hover:shadow-xl transition-all"
                  onClick={() => {
                    navigate('/register');
                    setMobileMenuOpen(false);
                  }}
                >
                  {t('nav.register')}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Categories Side Panel */}
      <CategoriesSidePanel
        isOpen={categoriesPanelOpen}
        onClose={() => setCategoriesPanelOpen(false)}
      />
    </>
  );
};

export default Header;

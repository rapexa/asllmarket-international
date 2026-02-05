import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const footerLinks = {
    company: [
      { label: t('footer.about'), href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
      { label: 'Press', href: '/press' },
    ],
    support: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: t('footer.help'), href: '/help' },
      { label: t('footer.contact'), href: '/contact' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Feedback', href: '/feedback' },
    ],
    legal: [
      { label: t('footer.terms'), href: '/terms' },
      { label: t('footer.privacy'), href: '/privacy' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Compliance', href: '/compliance' },
    ],
    trade: [
      { label: 'For Buyers', href: '/buyers' },
      { label: 'For Suppliers', href: '/suppliers' },
      { label: 'Trade Assurance', href: '/trade-assurance' },
      { label: 'Logistics', href: '/logistics' },
    ],
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container py-10 md:py-12 lg:py-16 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
                <span className="text-accent-foreground font-bold text-xl md:text-2xl">A</span>
              </div>
              <div>
                <h2 className="font-bold text-xl md:text-2xl">ASL Market</h2>
                <p className="text-xs md:text-sm opacity-80 mt-0.5">{t('footer.tagline')}</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 mb-4 md:mb-6 text-sm md:text-base max-w-sm leading-relaxed">
              Connecting buyers and suppliers worldwide. Your trusted partner for international B2B trade.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
              <a href="mailto:info@aslmarket.com" className="flex items-center gap-2 md:gap-3 text-primary-foreground/80 hover:text-accent transition-colors text-sm md:text-base break-all">
                <Mail className="h-4 w-4 shrink-0" />
                <span>info@aslmarket.com</span>
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-2 md:gap-3 text-primary-foreground/80 hover:text-accent transition-colors text-sm md:text-base">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+1 (234) 567-890</span>
              </a>
              <div className="flex items-center gap-2 md:gap-3 text-primary-foreground/80 text-sm md:text-base">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>Global Operations</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 md:gap-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-primary-light/50 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                  aria-label={`Social media ${i + 1}`}
                >
                  <Icon className="h-4 w-4 md:h-5 md:w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4">Company</h3>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  {link.href === '/careers' || link.href === '/about' || link.href === '/blog' || link.href === '/press' ? (
                    <Link to={link.href} className="text-primary-foreground/70 hover:text-accent transition-colors text-sm md:text-base block py-1">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-primary-foreground/70 hover:text-accent transition-colors text-sm md:text-base block py-1">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4">Support</h3>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  {link.href === '/contact' || link.href === '/help' || link.href === '/faq' || link.href === '/feedback' || link.href === '/dashboard' ? (
                    <Link to={link.href} className="text-primary-foreground/70 hover:text-accent transition-colors text-sm md:text-base block py-1">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-primary-foreground/70 hover:text-accent transition-colors text-sm md:text-base block py-1">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4">Trade</h3>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.trade.map((link) => (
                <li key={link.href}>
                  {link.href === '/buyers' || link.href === '/suppliers' || link.href === '/trade-assurance' || link.href === '/logistics' ? (
                    <Link to={link.href} className="text-primary-foreground/70 hover:text-accent transition-colors text-sm md:text-base block py-1">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-primary-foreground/70 hover:text-accent transition-colors text-sm md:text-base block py-1">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-light/30">
        <div className="container py-4 md:py-6 px-4 flex flex-col md:flex-row items-center justify-center md:justify-between gap-3 md:gap-4">
          <p className="text-primary-foreground/60 text-xs md:text-sm text-center md:text-start order-2 md:order-1">{t('footer.copyright')}</p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-xs md:text-sm order-1 md:order-2">
            {footerLinks.legal.map((link) => (
              link.href === '/terms' || link.href === '/privacy' || link.href === '/cookies' || link.href === '/compliance' ? (
                <Link key={link.href} to={link.href} className="text-primary-foreground/60 hover:text-accent transition-colors whitespace-nowrap px-1">
                  {link.label}
                </Link>
              ) : (
                <a key={link.href} href={link.href} className="text-primary-foreground/60 hover:text-accent transition-colors whitespace-nowrap px-1">
                  {link.label}
                </a>
              )
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageCircle, Instagram } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const footerLinks = {
    company: [
      { label: t('footer.about'), href: '/about' },
      { label: t('footer.careers'), href: '/careers' },
      { label: t('footer.blog'), href: '/blog' },
    ],
    support: [
      { label: t('footer.dashboard'), href: '/dashboard' },
      { label: t('footer.help'), href: '/help' },
      { label: t('footer.contact'), href: '/contact' },
      { label: t('footer.faq'), href: '/faq' },
      { label: t('footer.feedback'), href: '/feedback' },
    ],
    legal: [
      { label: t('footer.terms'), href: '/terms' },
      { label: t('footer.privacy'), href: '/privacy' },
      { label: t('footer.cookiePolicy'), href: '/cookies' },
      { label: t('footer.compliance'), href: '/compliance' },
    ],
    trade: [
      { label: t('footer.forBuyers'), href: '/buyers' },
      { label: t('footer.forSuppliers'), href: '/suppliers' },
      { label: t('footer.tradeAssurance'), href: '/trade-assurance' },
      { label: t('footer.logistics'), href: '/logistics' },
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
              {t('footer.description')}
            </p>
            
            {/* Contact Info - چندزبانه */}
            <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
              <a href="mailto:info@asllmarket.org" className="flex items-center gap-2 md:gap-3 text-primary-foreground/80 hover:text-accent transition-colors text-sm md:text-base break-all">
                <Mail className="h-4 w-4 shrink-0" />
                <span>info@asllmarket.org</span>
              </a>
              <a href="tel:+982188922936" className="flex items-center gap-2 md:gap-3 text-primary-foreground/80 hover:text-accent transition-colors text-sm md:text-base">
                <Phone className="h-4 w-4 shrink-0" />
                <span>۰۲۱-۸۸۹۲۲۹۳۶-۹</span>
              </a>
              <a href="https://t.me/alirezaasll" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 md:gap-3 text-primary-foreground/80 hover:text-accent transition-colors text-sm md:text-base">
                <MessageCircle className="h-4 w-4 shrink-0" />
                <span>@alirezaasll ({t('footer.telegramSupport')})</span>
              </a>
              <a href="tel:+989120211407" className="flex items-center gap-2 md:gap-3 text-primary-foreground/80 hover:text-accent transition-colors text-sm md:text-base">
                <Phone className="h-4 w-4 shrink-0" />
                <span>۰۹۱۲-۰۲۱۱۴۰۷</span>
              </a>
              <div className="flex items-center gap-2 md:gap-3 text-primary-foreground/80 text-sm md:text-base">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>{t('footer.address')}</span>
              </div>
            </div>

            {/* Social Links - تلگرام، واتسپ، اینستاگرام */}
            <div className="flex gap-3 md:gap-4">
              <a
                href="https://t.me/alirezaasll"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-primary-light/50 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Telegram"
              >
                <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
              </a>
              <a
                href="#"
                className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-primary-light/50 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="WhatsApp"
                title="WhatsApp (به‌زودی)"
              >
                <svg className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/alirezaasll"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-primary-light/50 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 md:h-5 md:w-5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  {link.href === '/careers' || link.href === '/about' || link.href === '/blog' ? (
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
            <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4">{t('footer.support')}</h3>
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
            <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4">{t('footer.trade')}</h3>
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
          <p className="text-primary-foreground/60 text-xs md:text-sm text-center md:text-start order-2 md:order-1">{t('footer.copyright').replace('{year}', String(new Date().getFullYear()))}</p>
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


import { Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <footer id="contact" className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h4 className="text-2xl font-bold mb-4 text-white">Jetleg</h4>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              {t('footer.brandDescription')}
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-accent hover:text-primary transition-jetleg"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-accent hover:text-primary transition-jetleg"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-1 lg:col-span-1">
            <h4 className="text-lg font-semibold mb-6 text-white">{t('footer.menu')}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-accent transition-jetleg">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/top-deals" className="text-primary-foreground/80 hover:text-accent transition-jetleg">
                  {t('nav.deals')}
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-primary-foreground/80 hover:text-accent transition-jetleg">
                  {t('nav.howItWorks')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-foreground/80 hover:text-accent transition-jetleg">
                  {t('nav.about')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div className="md:col-span-1 lg:col-span-1">
            <h4 className="text-lg font-semibold mb-6 text-white">{t('footer.support')}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/faq" className="text-primary-foreground/80 hover:text-accent transition-jetleg">
                  {t('footer.faq')}
                </Link>
              </li>
              <li>
                <Link to="/customer-service" className="text-primary-foreground/80 hover:text-accent transition-jetleg">
                  {t('footer.customerService')}
                </Link>
              </li>
              <li>
                <Link to="/for-operators" className="text-primary-foreground/80 hover:text-accent transition-jetleg">
                  {t('footer.operators')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="md:col-span-2 lg:col-span-1">
            <h4 className="text-lg font-semibold mb-6 text-white">{t('footer.contact')}</h4>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-accent" />
                <a 
                  href="mailto:hello@jetleg.com" 
                  className="text-primary-foreground/80 hover:text-accent transition-jetleg"
                >
                  {t('footer.email')}
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-accent" />
                <a 
                  href="tel:+32123456789" 
                  className="text-primary-foreground/80 hover:text-accent transition-jetleg"
                >
                  {t('footer.phone')}
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-foreground/60 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Jetleg. {t('footer.copyright')}
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy-policy" className="text-primary-foreground/60 hover:text-accent transition-jetleg">
                {t('footer.privacy')}
              </Link>
              <Link to="/terms-conditions" className="text-primary-foreground/60 hover:text-accent transition-jetleg">
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

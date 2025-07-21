import { Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h4 className="text-2xl font-bold mb-4 text-white">Jetleg</h4>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              De toekomst van slim en luxueus reizen. Ontdek exclusieve empty leg vluchten voor een fractie van de prijs.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-accent hover:text-primary transition-jetleg"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
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
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Snelmenu</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-accent transition-jetleg">
                  Home
                </a>
              </li>
              <li>
                <a href="#deals" className="text-primary-foreground/80 hover:text-accent transition-jetleg">
                  Top Deals
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-primary-foreground/80 hover:text-accent transition-jetleg">
                  Hoe het werkt
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-accent transition-jetleg">
                  Over Ons
                </a>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Support</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-accent transition-jetleg">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-accent transition-jetleg">
                  Klantenservice
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-accent transition-jetleg">
                  Voor Operatoren
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-accent transition-jetleg">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-accent transition-jetleg">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-accent" />
                <a 
                  href="mailto:info@jetleg.com" 
                  className="text-primary-foreground/80 hover:text-accent transition-jetleg"
                >
                  info@jetleg.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-accent" />
                <a 
                  href="tel:+32123456789" 
                  className="text-primary-foreground/80 hover:text-accent transition-jetleg"
                >
                  +32 (0)1 234 56 789
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-accent mt-1" />
                <address className="text-primary-foreground/80 not-italic">
                  Jetleg HQ<br />
                  Brussels Airport<br />
                  1930 Zaventem, België
                </address>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-foreground/60 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Jetleg. Alle rechten voorbehouden.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-primary-foreground/60 hover:text-accent transition-jetleg">
                Cookiebeleid
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent transition-jetleg">
                AVG/GDPR
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent transition-jetleg">
                Algemene Voorwaarden
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
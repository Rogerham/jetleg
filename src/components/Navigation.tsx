import { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const {
    t
  } = useTranslation();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const isActive = (path: string) => location.pathname === path;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsUserMenuOpen(false);
    };
    if (isUserMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isUserMenuOpen]);
  return <header className="bg-card shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="hover:opacity-80 transition-jetleg">
            <img src="/lovable-uploads/98279cd3-d5a1-4405-ae12-29b927f1dbd6.png" alt="Jetleg - The smartest way to fly private" className="h-20 w-auto" />
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`${isActive('/') ? 'text-accent' : 'text-muted-foreground'} hover:text-accent transition-jetleg font-medium`}>
            {t('nav.home')}
          </Link>
          <Link to="/top-deals" className={`${isActive('/top-deals') ? 'text-accent' : 'text-muted-foreground'} hover:text-accent transition-jetleg font-medium`}>
            {t('nav.deals')}
          </Link>
          <Link to="/how-it-works" className={`${isActive('/how-it-works') ? 'text-accent' : 'text-muted-foreground'} hover:text-accent transition-jetleg font-medium`}>
            {t('nav.howItWorks')}
          </Link>
          <Link to="/about" className={`${isActive('/about') ? 'text-accent' : 'text-muted-foreground'} hover:text-accent transition-jetleg font-medium`}>
            {t('nav.about')}
          </Link>
          <Link to="/contact" className={`${isActive('/contact') ? 'text-accent' : 'text-muted-foreground'} hover:text-accent transition-jetleg font-medium`}>
            {t('nav.contact')}
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <LanguageSelector />
          
          <div className="relative">
            <button onClick={e => {
            e.stopPropagation();
            setIsUserMenuOpen(!isUserMenuOpen);
          }} className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-accent transition-jetleg">
              <User className="h-5 w-5" />
              <span>{t('nav.account')}</span>
            </button>
            
            {/* User Dropdown */}
            {isUserMenuOpen && <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
                <div className="py-1">
                  <Link to="/login" className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors" onClick={() => setIsUserMenuOpen(false)}>
                    {t('nav.login')}
                  </Link>
                  <Link to="/register" className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors" onClick={() => setIsUserMenuOpen(false)}>
                    {t('nav.register')}
                  </Link>
                  <hr className="my-1 border-border" />
                  <Link to="/my-bookings" className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors" onClick={() => setIsUserMenuOpen(false)}>
                    {t('nav.myBookings')}
                  </Link>
                  <Link to="/profile" className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors" onClick={() => setIsUserMenuOpen(false)}>
                    {t('nav.profile')}
                  </Link>
                </div>
              </div>}
          </div>
        </div>
        
        <div className="md:hidden flex items-center space-x-2">
          <LanguageSelector />
          <button onClick={toggleMenu} className="text-primary p-2 hover:bg-muted rounded-lg transition-jetleg">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {isMenuOpen && <div className="md:hidden px-6 pb-4 bg-card border-t border-border">
          <Link to="/" className={`block py-3 ${isActive('/') ? 'text-accent' : 'text-muted-foreground'} hover:text-accent transition-jetleg`} onClick={() => setIsMenuOpen(false)}>
            {t('nav.home')}
          </Link>
          <Link to="/top-deals" className={`block py-3 ${isActive('/top-deals') ? 'text-accent' : 'text-muted-foreground'} hover:text-accent transition-jetleg`} onClick={() => setIsMenuOpen(false)}>
            {t('nav.deals')}
          </Link>
          <Link to="/how-it-works" className={`block py-3 ${isActive('/how-it-works') ? 'text-accent' : 'text-muted-foreground'} hover:text-accent transition-jetleg`} onClick={() => setIsMenuOpen(false)}>
            {t('nav.howItWorks')}
          </Link>
          <Link to="/about" className={`block py-3 ${isActive('/about') ? 'text-accent' : 'text-muted-foreground'} hover:text-accent transition-jetleg`} onClick={() => setIsMenuOpen(false)}>
            {t('nav.about')}
          </Link>
          <Link to="/contact" className={`block py-3 ${isActive('/contact') ? 'text-accent' : 'text-muted-foreground'} hover:text-accent transition-jetleg`} onClick={() => setIsMenuOpen(false)}>
            {t('nav.contact')}
          </Link>
          <div className="mt-4 space-y-2">
            <Link to="/login" className="block w-full btn-jetleg-outline text-center" onClick={() => setIsMenuOpen(false)}>
              {t('nav.login')}
            </Link>
            <Link to="/register" className="block w-full btn-jetleg-secondary text-center" onClick={() => setIsMenuOpen(false)}>
              {t('nav.register')}
            </Link>
            <Link to="/my-bookings" className="block py-2 text-center text-muted-foreground hover:text-accent transition-jetleg" onClick={() => setIsMenuOpen(false)}>
              {t('nav.myBookings')}
            </Link>
          </div>
        </div>}
    </header>;
};
export default Navigation;
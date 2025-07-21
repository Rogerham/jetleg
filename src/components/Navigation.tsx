
import { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();

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

  // Scroll to section for anchor links
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-card shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-primary">
          <Link to="/" className="hover:text-accent transition-jetleg">
            Jetleg
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`${isActive('/') ? 'text-accent' : 'text-muted-foreground'} hover:text-accent transition-jetleg font-medium`}
          >
            Home
          </Link>
          <Link 
            to="/top-deals" 
            className={`${isActive('/top-deals') ? 'text-accent' : 'text-muted-foreground'} hover:text-accent transition-jetleg font-medium`}
          >
            Top Deals
          </Link>
          <Link 
            to="/how-it-works" 
            className={`${isActive('/how-it-works') ? 'text-accent' : 'text-muted-foreground'} hover:text-accent transition-jetleg font-medium`}
          >
            Hoe het werkt
          </Link>
          <Link 
            to="/about" 
            className={`${isActive('/about') ? 'text-accent' : 'text-muted-foreground'} hover:text-accent transition-jetleg font-medium`}
          >
            Over ons
          </Link>
          <Link 
            to="/contact" 
            className={`${isActive('/contact') ? 'text-accent' : 'text-muted-foreground'} hover:text-accent transition-jetleg font-medium`}
          >
            Contact
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsUserMenuOpen(!isUserMenuOpen);
              }}
              className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-accent transition-jetleg"
            >
              <User className="h-5 w-5" />
              <span>Account</span>
            </button>
            
            {/* User Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
                <div className="py-1">
                  <Link 
                    to="/login" 
                    className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Inloggen
                  </Link>
                  <Link 
                    to="/register" 
                    className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Registreren
                  </Link>
                  <hr className="my-1 border-border" />
                  <Link 
                    to="/my-bookings" 
                    className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Mijn boekingen
                  </Link>
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Profiel
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <button 
          onClick={toggleMenu}
          className="md:hidden text-primary p-2 hover:bg-muted rounded-lg transition-jetleg"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-6 pb-4 bg-card border-t border-border">
          <Link 
            to="/" 
            className={`block py-3 ${isActive('/') ? 'text-accent' : 'text-muted-foreground'} hover:text-accent transition-jetleg`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/top-deals" 
            className={`block py-3 ${isActive('/top-deals') ? 'text-accent' : 'text-muted-foreground'} hover:text-accent transition-jetleg`}
            onClick={() => setIsMenuOpen(false)}
          >
            Top Deals
          </Link>
          <Link 
            to="/how-it-works" 
            className={`block py-3 ${isActive('/how-it-works') ? 'text-accent' : 'text-muted-foreground'} hover:text-accent transition-jetleg`}
            onClick={() => setIsMenuOpen(false)}
          >
            Hoe het werkt
          </Link>
          <Link 
            to="/about" 
            className={`block py-3 ${isActive('/about') ? 'text-accent' : 'text-muted-foreground'} hover:text-accent transition-jetleg`}
            onClick={() => setIsMenuOpen(false)}
          >
            Over ons
          </Link>
          <Link 
            to="/contact" 
            className={`block py-3 ${isActive('/contact') ? 'text-accent' : 'text-muted-foreground'} hover:text-accent transition-jetleg`}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <div className="mt-4 space-y-2">
            <Link 
              to="/login" 
              className="block w-full btn-jetleg-outline text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Inloggen
            </Link>
            <Link 
              to="/register" 
              className="block w-full btn-jetleg-secondary text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Registreren
            </Link>
            <Link 
              to="/my-bookings" 
              className="block py-2 text-center text-muted-foreground hover:text-accent transition-jetleg"
              onClick={() => setIsMenuOpen(false)}
            >
              Mijn boekingen
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;

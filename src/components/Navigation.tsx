import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-card shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-primary">
          <a href="#" className="hover:text-accent transition-jetleg">
            Jetleg
          </a>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#deals" className="text-muted-foreground hover:text-accent transition-jetleg font-medium">
            Top Deals
          </a>
          <a href="#how-it-works" className="text-muted-foreground hover:text-accent transition-jetleg font-medium">
            Hoe het werkt
          </a>
          <a href="#contact" className="text-muted-foreground hover:text-accent transition-jetleg font-medium">
            Contact
          </a>
        </div>
        
        <div className="hidden md:block">
          <button className="btn-jetleg-secondary">
            Login / Registreer
          </button>
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
          <a href="#deals" className="block py-3 text-muted-foreground hover:text-accent transition-jetleg">
            Top Deals
          </a>
          <a href="#how-it-works" className="block py-3 text-muted-foreground hover:text-accent transition-jetleg">
            Hoe het werkt
          </a>
          <a href="#contact" className="block py-3 text-muted-foreground hover:text-accent transition-jetleg">
            Contact
          </a>
          <button className="mt-4 w-full btn-jetleg-secondary">
            Login / Registreer
          </button>
        </div>
      )}
    </header>
  );
};

export default Navigation;
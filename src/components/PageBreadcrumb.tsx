
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const PageBreadcrumb = ({ items, className = '' }: PageBreadcrumbProps) => {
  const { t } = useTranslation();

  const allItems = [
    { label: t('nav.home'), href: '/' },
    ...items
  ];

  return (
    <nav className={`flex items-center space-x-1 text-sm text-muted-foreground ${className}`} aria-label="Breadcrumb">
      {allItems.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
          
          {index === 0 && <Home className="h-4 w-4 mr-1" />}
          
          {item.href && index < allItems.length - 1 ? (
            <Link 
              to={item.href} 
              className="hover:text-accent transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className={index === allItems.length - 1 ? 'text-foreground font-medium' : ''}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default PageBreadcrumb;

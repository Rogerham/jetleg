
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  backTo?: string;
  className?: string;
}

const PageHeader = ({ 
  title, 
  subtitle, 
  showBackButton = false, 
  backTo = '/', 
  className = '' 
}: PageHeaderProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBackClick = () => {
    navigate(backTo);
  };

  return (
    <section className={`page-header ${className}`}>
      <div className="container mx-auto px-6">
        {showBackButton && (
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={handleBackClick}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              {t('common.backToHome')}
            </button>
          </div>
        )}
        
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-page-title mb-4 animate-fade-in text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-white/90 animate-fade-in">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHeader;

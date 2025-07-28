
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  backButtonText?: string;
  className?: string;
}

const PageHeader = ({ 
  title, 
  subtitle, 
  showBackButton = false, 
  backButtonText,
  className = ""
}: PageHeaderProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const defaultBackText = backButtonText || t('common.backToHome', 'Back to Home');

  return (
    <div className={`bg-gradient-to-r from-primary to-primary/80 text-white py-8 ${className}`}>
      <div className="container mx-auto px-6">
        {showBackButton && (
          <div className="flex items-center gap-4 mb-4">
            <button 
              onClick={() => navigate('/')} 
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              {defaultBackText}
            </button>
          </div>
        )}
        
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
          {subtitle && (
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;

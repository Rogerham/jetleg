
import SearchWithSuggestions from './SearchWithSuggestions';
import heroImage from '@/assets/hero-bg.jpg';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="hero-jetleg text-white min-h-[70vh] flex items-center" style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`
    }}>
      <div className="container mx-auto px-6 py-12 md:py-16 text-center">
        <div className="animate-fade-in">
          <h1 className="text-hero mb-6 text-white drop-shadow-lg">{t('hero.title')}</h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto drop-shadow-md">
            {t('hero.subtitle')}
          </p>
        </div>
        
        {/* Enhanced Search Form */}
        <SearchWithSuggestions />
      </div>
    </section>
  );
};

export default HeroSection;

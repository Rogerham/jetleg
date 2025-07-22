
import { Eye } from 'lucide-react';
import FlightCard from './FlightCard';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAllFlights } from '@/hooks/useFlights';

const DealsSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: flights = [], isLoading, error } = useAllFlights();

  // Get the first 3 flights as featured deals
  const featuredDeals = flights.slice(0, 3);

  if (isLoading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-title text-foreground mb-4">
              {t('deals.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('deals.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map((index) => (
              <div key={index} className="card-jetleg h-64 animate-pulse bg-muted"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || featuredDeals.length === 0) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-title text-foreground mb-4">
              {t('deals.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('deals.subtitle')}
            </p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Geen deals beschikbaar op dit moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-title text-foreground mb-4">
            {t('deals.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('deals.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredDeals.map((deal, index) => (
            <div key={deal.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <FlightCard {...deal} />
            </div>
          ))}
        </div>
        
        <div className="text-center animate-fade-in">
          <button
            onClick={() => navigate('/deals')}
            className="btn-jetleg-primary inline-flex items-center gap-2"
          >
            <Eye className="h-5 w-5" />
            {t('deals.viewAll')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;

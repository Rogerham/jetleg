
import { Eye } from 'lucide-react';
import FlightCard from './FlightCard';
import { useNavigate } from 'react-router-dom';
import parisImage from '@/assets/paris-aerial.jpg';
import londonImage from '@/assets/london-aerial.jpg';
import ibizaImage from '@/assets/ibiza-aerial.jpg';
import { useTranslation } from 'react-i18next';

const DealsSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const featuredDeals = [
    {
      id: '1',
      route: {
        from: 'Paris',
        to: 'Nice',
        fromCode: 'CDG',
        toCode: 'NCE'
      },
      date: '12 Dec 2024',
      aircraft: 'Citation CJ3',
      maxPassengers: 6,
      price: 8500,
      discount: 65,
      image: parisImage,
      imageAlt: 'Paris aerial view'
    },
    {
      id: '2',
      route: {
        from: 'London',
        to: 'Zurich',
        fromCode: 'LTN',
        toCode: 'ZUR'
      },
      date: '15 Dec 2024',
      aircraft: 'Phenom 300',
      maxPassengers: 8,
      price: 12000,
      discount: 58,
      image: londonImage,
      imageAlt: 'London aerial view'
    },
    {
      id: '3',
      route: {
        from: 'Barcelona',
        to: 'Ibiza',
        fromCode: 'BCN',
        toCode: 'IBZ'
      },
      date: '18 Dec 2024',
      aircraft: 'King Air 350',
      maxPassengers: 9,
      price: 4200,
      discount: 72,
      image: ibizaImage,
      imageAlt: 'Ibiza aerial view'
    }
  ];

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

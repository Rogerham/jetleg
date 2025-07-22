
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
      departure_airport: 'Paris (CDG)',
      arrival_airport: 'Nice (NCE)',
      departure_time: '2024-12-12T10:00:00Z',
      arrival_time: '2024-12-12T11:30:00Z',
      price_per_seat: 8500,
      available_seats: 6,
      operator: 'Elite Jets',
      flight_duration: '1h 30m',
      jets: {
        brand: 'Cessna',
        model: 'Citation CJ3',
        type: 'Light Jet',
        seating_capacity: 6,
        range_km: 3700,
        description: 'Luxurious light jet perfect for European routes',
        image_url: parisImage
      }
    },
    {
      id: '2',
      departure_airport: 'London (LTN)',
      arrival_airport: 'Zurich (ZUR)',
      departure_time: '2024-12-15T14:00:00Z',
      arrival_time: '2024-12-15T16:30:00Z',
      price_per_seat: 12000,
      available_seats: 8,
      operator: 'Sky Elite',
      flight_duration: '2h 30m',
      jets: {
        brand: 'Embraer',
        model: 'Phenom 300',
        type: 'Light Jet',
        seating_capacity: 8,
        range_km: 3334,
        description: 'Modern and efficient jet for business travel',
        image_url: londonImage
      }
    },
    {
      id: '3',
      departure_airport: 'Barcelona (BCN)',
      arrival_airport: 'Ibiza (IBZ)',
      departure_time: '2024-12-18T16:30:00Z',
      arrival_time: '2024-12-18T17:45:00Z',
      price_per_seat: 4200,
      available_seats: 9,
      operator: 'Mediterranean Air',
      flight_duration: '1h 15m',
      jets: {
        brand: 'King Air',
        model: '350',
        type: 'Turboprop',
        seating_capacity: 9,
        range_km: 1806,
        description: 'Perfect for short Mediterranean hops',
        image_url: ibizaImage
      }
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

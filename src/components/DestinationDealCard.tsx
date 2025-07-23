
import { MapPin, Plane, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DestinationDeal } from '@/types/destinationDeals';
import { getBestFlightForDestination } from '@/utils/destinationUtils';
import { useCurrency } from '@/contexts/CurrencyContext';

interface DestinationDealCardProps {
  deal: DestinationDeal;
}

const DestinationDealCard = ({ deal }: DestinationDealCardProps) => {
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const { t } = useTranslation();

  const handleExploreDeals = () => {
    // Navigate to search results with the destination pre-filled
    navigate('/search-results', {
      state: {
        searchParams: {
          to: `${deal.destination} (${deal.destinationCode})`,
          from: '',
          date: 'flexible',
          passengers: '1'
        }
      }
    });
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    console.log(`Image failed to load for ${deal.destination}: ${target.src}`);
    
    // Try fallback to destination-photos bucket
    if (!target.src.includes('destination-photos')) {
      const fallbackUrl = `https://dtvvyopjzdmbnpgwhkbi.supabase.co/storage/v1/object/public/destination-photos/${deal.destination.toLowerCase()}.jpg`;
      console.log(`Trying fallback image: ${fallbackUrl}`);
      target.src = fallbackUrl;
    } else {
      // Final fallback to default hero image
      console.log(`Using final fallback image for ${deal.destination}`);
      target.src = '/src/assets/hero-bg.jpg';
    }
  };

  // Get translated destination and country names
  const translatedDestination = t(`destinations.${deal.destination}`, { defaultValue: deal.destination });
  const translatedCountry = t(`countries.${deal.countryKey}`, { defaultValue: deal.countryKey });

  // Get operator text with proper pluralization
  const operatorText = deal.operatorCount === 1 
    ? t('destinationDeals.oneOperator')
    : t('destinationDeals.multipleOperators');

  // Generate description using translation
  const description = t('destinationDeals.discoverDestination', {
    destination: translatedDestination,
    country: translatedCountry,
    count: deal.operatorCount,
    operators: operatorText
  });

  return (
    <div className="card-jetleg hover:scale-[1.03] transition-all duration-200 h-full flex flex-col group">
      <div className="relative overflow-hidden">
        <img 
          src={deal.imageUrl} 
          alt={`${translatedDestination}, ${translatedCountry}`}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="deal-badge text-white bg-accent">
            {t('destinationDeals.from')} {formatPrice(deal.minPrice)}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-2xl font-bold mb-1">{translatedDestination}</h3>
          <p className="text-white/90 text-sm">{translatedCountry}</p>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-muted-foreground mb-4 flex-grow">
          {description}
        </p>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-muted-foreground">
              <Plane className="h-4 w-4 mr-2 text-accent" />
              <span>{deal.flights.length} {t('destinationDeals.flightsAvailable')}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Users className="h-4 w-4 mr-2 text-accent" />
              <span>{deal.totalAvailableSeats} {t('destinationDeals.seats')}</span>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2 text-accent" />
            <span>
              {deal.operators.length} {t('destinationDeals.operators')}: {deal.operators.slice(0, 2).join(', ')}
              {deal.operators.length > 2 ? ` +${deal.operators.length - 2} ${t('destinationDeals.more')}` : ''}
            </span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-auto">
          <div>
            <p className="text-sm text-muted-foreground">{t('destinationDeals.from')}</p>
            <p className="text-3xl font-bold text-foreground">
              {formatPrice(deal.minPrice)}
            </p>
          </div>
          <button 
            onClick={handleExploreDeals}
            className="btn-jetleg-secondary hover:bg-accent hover:text-primary-foreground"
          >
            {t('destinationDeals.viewDeals')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationDealCard;


import { MapPin, Plane, Users, Euro } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DestinationDeal } from '@/types/destinationDeals';
import { getBestFlightForDestination } from '@/utils/destinationUtils';
import { useCurrency } from '@/contexts/CurrencyContext';

interface DestinationDealCardProps {
  deal: DestinationDeal;
}

const DestinationDealCard = ({ deal }: DestinationDealCardProps) => {
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();

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

  const bestFlight = getBestFlightForDestination(deal);

  return (
    <div className="card-jetleg hover:scale-[1.03] transition-all duration-200 h-full flex flex-col group">
      <div className="relative overflow-hidden">
        <img 
          src={deal.imageUrl} 
          alt={`${deal.destination}, ${deal.country}`}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = '/src/assets/hero-bg.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="deal-badge text-white bg-accent">
            Vanaf {formatPrice(deal.minPrice)}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-2xl font-bold mb-1">{deal.destination}</h3>
          <p className="text-white/90 text-sm">{deal.country}</p>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-muted-foreground mb-4 flex-grow">
          {deal.description}
        </p>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-muted-foreground">
              <Plane className="h-4 w-4 mr-2 text-accent" />
              <span>{deal.flights.length} vluchten beschikbaar</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Users className="h-4 w-4 mr-2 text-accent" />
              <span>{deal.totalAvailableSeats} plaatsen</span>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2 text-accent" />
            <span>{deal.operators.length} operators: {deal.operators.slice(0, 2).join(', ')}{deal.operators.length > 2 ? ` +${deal.operators.length - 2} meer` : ''}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-auto">
          <div>
            <p className="text-sm text-muted-foreground">Vanaf</p>
            <p className="text-3xl font-bold text-foreground">
              {formatPrice(deal.minPrice)}
            </p>
          </div>
          <button 
            onClick={handleExploreDeals}
            className="btn-jetleg-secondary hover:bg-accent hover:text-primary-foreground"
          >
            Bekijk Deals
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationDealCard;

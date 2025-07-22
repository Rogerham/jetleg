
import { Plane, Clock, Users, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface FlightCardProps {
  id: string;
  route: {
    from: string;
    to: string;
    fromCode: string;
    toCode: string;
  };
  date: string;
  aircraft: string;
  maxPassengers: number;
  price: number;
  discount: number;
  image: string;
  imageAlt: string;
}

const FlightCard = ({ 
  id,
  route, 
  date, 
  aircraft, 
  maxPassengers, 
  price, 
  discount, 
  image, 
  imageAlt 
}: FlightCardProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBooking = () => {
    // Navigate to the booking flow with the flight ID
    navigate(`/booking/${id}`, {
      state: {
        flight: {
          id,
          route,
          date,
          aircraft,
          maxPassengers,
          price,
          discount,
          image,
          imageAlt
        }
      }
    });
  };

  const getRouteDescription = () => {
    if (route.from === 'Paris' || route.from === 'Parijs') {
      return t('deals.parisNice.description');
    } else if (route.from === 'London' || route.from === 'Londen') {
      return t('deals.londonZurich.description');
    } else {
      return t('deals.barcelonaIbiza.description');
    }
  };

  return (
    <div className="card-jetleg @media (hover: hover) { hover:scale-105 } transition-all duration-200 h-full flex flex-col">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={imageAlt} 
          className="w-full h-48 object-cover @media (hover: hover) { hover:scale-110 } transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <span className="deal-badge text-white bg-accent">
            {discount}% {t('deals.discount')}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-grow">
            <h3 className="text-xl font-bold text-foreground mb-1">
              {route.from} ({route.fromCode}) → {route.to} ({route.toCode})
            </h3>
            <p className="text-muted-foreground">
              {getRouteDescription()}
            </p>
          </div>
        </div>
        
        <div className="space-y-3 mb-6 flex-grow">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2 text-accent" />
            <span><strong>{t('deals.date')}:</strong> {date}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Plane className="h-4 w-4 mr-2 text-accent" />
            <span><strong>{t('deals.aircraft')}:</strong> {aircraft}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-2 text-accent" />
            <span><strong>{t('deals.passengers')}:</strong> {t('deals.upTo')} {maxPassengers}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-auto">
          <div>
            <p className="text-3xl font-bold text-foreground">
              € {price.toLocaleString('nl-NL')}
            </p>
            <p className="text-sm text-muted-foreground">{t('deals.perFlight')}</p>
          </div>
          <button 
            onClick={handleBooking}
            className="btn-jetleg-secondary hover:bg-accent hover:text-primary-foreground"
          >
            {t('deals.bookNow')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;

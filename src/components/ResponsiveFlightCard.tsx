
import { Clock, Users, Plane, MapPin } from 'lucide-react';
import { formatDistance } from 'date-fns';
import { useCurrency } from '@/contexts/CurrencyContext';
import type { Flight } from '@/hooks/useFlights';

interface ResponsiveFlightCardProps extends Flight {
  showImage?: boolean;
  imagePosition?: 'left' | 'right' | 'none';
}

const ResponsiveFlightCard = ({ 
  showImage = true, 
  imagePosition = 'left',
  ...flight 
}: ResponsiveFlightCardProps) => {
  const { formatPrice } = useCurrency();

  const handleBookNow = () => {
    console.log('Booking flight:', flight.id);
  };

  return (
    <div className="card-jetleg p-4 sm:p-6 hover:scale-105 transition-all duration-200 h-full flex flex-col">
      {/* Mobile Layout - No Image */}
      <div className="block sm:hidden">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <MapPin className="h-4 w-4 text-accent" />
              <span>{flight.from} → {flight.to}</span>
            </div>
            <h3 className="font-semibold text-foreground mb-2">{flight.aircraft}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{flight.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{flight.passengers} pax</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">vanaf</p>
            <p className="text-2xl font-bold text-foreground">{formatPrice(flight.price)}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            <p>Vertrek: {flight.departureTime}</p>
            <p>Operator: {flight.operator}</p>
          </div>
          <button 
            onClick={handleBookNow}
            className="btn-jetleg-primary text-sm px-4 py-2"
          >
            Boek Nu
          </button>
        </div>
      </div>

      {/* Tablet Layout - Image Right */}
      <div className="hidden sm:block md:hidden">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <MapPin className="h-4 w-4 text-accent" />
              <span>{flight.from} → {flight.to}</span>
            </div>
            <h3 className="font-semibold text-foreground mb-2">{flight.aircraft}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{flight.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{flight.passengers} pax</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground mb-4">
              <p>Vertrek: {flight.departureTime}</p>
              <p>Operator: {flight.operator}</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">vanaf</p>
                <p className="text-2xl font-bold text-foreground">{formatPrice(flight.price)}</p>
              </div>
              <button 
                onClick={handleBookNow}
                className="btn-jetleg-primary"
              >
                Boek Nu
              </button>
            </div>
          </div>
          {showImage && (
            <div className="w-32 h-24 flex-shrink-0">
              <img 
                src={flight.imageUrl} 
                alt={flight.aircraft}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = '/src/assets/hero-bg.jpg';
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout - Standard */}
      <div className="hidden md:block">
        <div className="flex gap-4">
          {showImage && imagePosition === 'left' && (
            <div className="w-32 h-24 flex-shrink-0">
              <img 
                src={flight.imageUrl} 
                alt={flight.aircraft}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = '/src/assets/hero-bg.jpg';
                }}
              />
            </div>
          )}
          
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <MapPin className="h-4 w-4 text-accent" />
              <span>{flight.from} → {flight.to}</span>
            </div>
            <h3 className="font-semibold text-foreground mb-2">{flight.aircraft}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{flight.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{flight.passengers} pax</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Vertrek: {flight.departureTime}</p>
              <p>Operator: {flight.operator}</p>
            </div>
          </div>
          
          {showImage && imagePosition === 'right' && (
            <div className="w-32 h-24 flex-shrink-0">
              <img 
                src={flight.imageUrl} 
                alt={flight.aircraft}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = '/src/assets/hero-bg.jpg';
                }}
              />
            </div>
          )}
          
          <div className="flex flex-col items-end justify-between">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">vanaf</p>
              <p className="text-2xl font-bold text-foreground">{formatPrice(flight.price)}</p>
            </div>
            <button 
              onClick={handleBookNow}
              className="btn-jetleg-primary mt-4"
            >
              Boek Nu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveFlightCard;


import { Plane, Clock, Users, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div className="card-jetleg animate-scale-hover">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={imageAlt} 
          className="w-full h-48 object-cover transition-jetleg hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <span className="deal-badge text-white bg-accent">
            {discount}% Besparing
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-1">
              {route.from} ({route.fromCode}) → {route.to} ({route.toCode})
            </h3>
            <p className="text-muted-foreground">
              {route.from === 'Parijs' ? 'Vlieg naar de Côte d\'Azur in stijl.' :
               route.from === 'Londen' ? 'Perfect voor een zakelijke trip of een weekend in de Alpen.' :
               'Start je vakantie op het Witte Eiland met ultieme luxe.'}
            </p>
          </div>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2 text-accent" />
            <span><strong>Datum:</strong> {date}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Plane className="h-4 w-4 mr-2 text-accent" />
            <span><strong>Vliegtuig:</strong> {aircraft}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-2 text-accent" />
            <span><strong>Passagiers:</strong> Tot {maxPassengers}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-3xl font-bold text-foreground">
              € {price.toLocaleString('nl-NL')}
            </p>
            <p className="text-sm text-muted-foreground">per vlucht</p>
          </div>
          <button 
            onClick={handleBooking}
            className="btn-jetleg-secondary hover:bg-accent hover:text-primary-foreground"
          >
            Boek Nu
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;

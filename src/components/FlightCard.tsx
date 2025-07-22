import { Plane, Clock, Users, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { extractAirportCode, extractCityName } from '@/utils/flightUtils';

interface FlightCardProps {
  id: string;
  departure_airport: string;
  arrival_airport: string;
  departure_time: string;
  arrival_time: string;
  price_per_seat: number;
  available_seats: number;
  operator: string;
  flight_duration: string;
  jet_id: number;
  jets: {
    brand: string;
    model: string;
    type: string;
    seating_capacity: number;
    range_km: number;
    description: string;
    image_url: string;
  } | null;
}

const FlightCard = ({ 
  id,
  departure_airport,
  arrival_airport,
  departure_time,
  arrival_time,
  price_per_seat,
  available_seats,
  operator,
  flight_duration,
  jet_id,
  jets
}: FlightCardProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Add null checks and fallback values
  const jetData = jets || {
    brand: 'Unknown',
    model: 'Aircraft',
    type: 'Private Jet',
    seating_capacity: available_seats,
    range_km: 0,
    description: `${operator} - Private Aircraft`,
    image_url: '/src/assets/jet-interior.jpg'
  };

  const handleBooking = () => {
    navigate(`/booking/${id}`, {
      state: {
        flight: {
          id,
          departure_airport,
          arrival_airport,
          departure_time,
          arrival_time,
          price_per_seat,
          available_seats,
          operator,
          flight_duration,
          jet_id,
          jets: jetData
        }
      }
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('nl-NL', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nl-NL');
  };

  const getRouteDescription = () => {
    if (jetData.description) {
      return jetData.description;
    }
    return `${operator} - ${jetData.brand} ${jetData.model}`;
  };

  const getAircraftDetails = () => {
    return `${jetData.brand} ${jetData.model}`;
  };

  return (
    <div className="card-jetleg hover:scale-[1.03] transition-all duration-200 h-full flex flex-col">
      <div className="relative overflow-hidden">
        <img 
          src={jetData.image_url} 
          alt={`${jetData.brand} ${jetData.model}`} 
          className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            // Fallback image if the original fails to load
            e.currentTarget.src = '/src/assets/jet-interior.jpg';
          }}
        />
        <div className="absolute top-4 right-4">
          <span className="deal-badge text-white bg-accent">
            {operator}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-grow">
            <h3 className="text-xl font-bold text-foreground mb-1">
              {extractCityName(departure_airport)} ({extractAirportCode(departure_airport)}) → {extractCityName(arrival_airport)} ({extractAirportCode(arrival_airport)})
            </h3>
            <p className="text-muted-foreground">
              {getRouteDescription()}
            </p>
          </div>
        </div>
        
        <div className="space-y-3 mb-6 flex-grow">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2 text-accent" />
            <span><strong>Datum:</strong> {formatDate(departure_time)}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2 text-accent" />
            <span><strong>Vertrek:</strong> {formatTime(departure_time)} - {formatTime(arrival_time)} ({flight_duration})</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Plane className="h-4 w-4 mr-2 text-accent" />
            <span><strong>Vliegtuig:</strong> {getAircraftDetails()}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-2 text-accent" />
            <span><strong>Beschikbaar:</strong> {available_seats} plaatsen</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-auto">
          <div>
            <p className="text-3xl font-bold text-foreground">
              € {price_per_seat.toLocaleString('nl-NL')}
            </p>
            <p className="text-sm text-muted-foreground">per persoon</p>
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

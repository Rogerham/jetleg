
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FlightCard from '@/components/FlightCard';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import parisImage from '@/assets/paris-aerial.jpg';
import londonImage from '@/assets/london-aerial.jpg';
import ibizaImage from '@/assets/ibiza-aerial.jpg';
import jetInteriorImage from '@/assets/jet-interior.jpg';

const TopDeals = () => {
  const navigate = useNavigate();
  
  const allDeals = [
    {
      id: '1',
      departure_airport: 'Parijs (LBG)',
      arrival_airport: 'Nice (NCE)',
      departure_time: '2025-07-28T09:00:00Z',
      arrival_time: '2025-07-28T10:30:00Z',
      price_per_seat: 4500,
      available_seats: 8,
      operator: 'Elite European Jets',
      flight_duration: '1h 30m',
      jets: {
        brand: 'Cessna',
        model: 'Citation XLS',
        type: 'Mid-size Jet',
        seating_capacity: 8,
        range_km: 4074,
        description: 'Luxurious mid-size jet voor European routes',
        image_url: parisImage
      }
    },
    {
      id: '2',
      departure_airport: 'Londen (FAB)',
      arrival_airport: 'Genève (GVA)',
      departure_time: '2025-07-30T11:00:00Z',
      arrival_time: '2025-07-30T13:30:00Z',
      price_per_seat: 3800,
      available_seats: 6,
      operator: 'British Elite Air',
      flight_duration: '2h 30m',
      jets: {
        brand: 'Embraer',
        model: 'Phenom 300',
        type: 'Light Jet',
        seating_capacity: 6,
        range_km: 3334,
        description: 'Modern light jet perfect for business travel',
        image_url: londonImage
      }
    },
    {
      id: '3',
      departure_airport: 'Amsterdam (AMS)',
      arrival_airport: 'Ibiza (IBZ)',
      departure_time: '2025-08-02T15:00:00Z',
      arrival_time: '2025-08-02T17:30:00Z',
      price_per_seat: 7200,
      available_seats: 9,
      operator: 'Dutch Elite Aviation',
      flight_duration: '2h 30m',
      jets: {
        brand: 'Bombardier',
        model: 'Challenger 350',
        type: 'Super Mid-size Jet',
        seating_capacity: 9,
        range_km: 5926,
        description: 'Spacious super mid-size jet for luxury travel',
        image_url: ibizaImage
      }
    },
    {
      id: '4',
      departure_airport: 'Brussel (BRU)',
      arrival_airport: 'Monaco (MCM)',
      departure_time: '2025-08-05T13:00:00Z',
      arrival_time: '2025-08-05T15:00:00Z',
      price_per_seat: 5200,
      available_seats: 7,
      operator: 'Monaco Elite Jets',
      flight_duration: '2h 00m',
      jets: {
        brand: 'Cessna',
        model: 'Citation CJ3+',
        type: 'Light Jet',
        seating_capacity: 7,
        range_km: 3797,
        description: 'Premium light jet to the French Riviera',
        image_url: jetInteriorImage
      }
    },
    {
      id: '5',
      departure_airport: 'München (MUC)',
      arrival_airport: 'Sankt Moritz (SMV)',
      departure_time: '2025-08-08T08:00:00Z',
      arrival_time: '2025-08-08T09:15:00Z',
      price_per_seat: 3200,
      available_seats: 8,
      operator: 'Alpine Air Services',
      flight_duration: '1h 15m',
      jets: {
        brand: 'Pilatus',
        model: 'PC-12',
        type: 'Turboprop',
        seating_capacity: 8,
        range_km: 2730,
        description: 'Perfect turboprop for alpine destinations',
        image_url: jetInteriorImage
      }
    },
    {
      id: '6',
      departure_airport: 'Madrid (MAD)',
      arrival_airport: 'Mallorca (PMI)',
      departure_time: '2025-08-10T12:00:00Z',
      arrival_time: '2025-08-10T13:30:00Z',
      price_per_seat: 4800,
      available_seats: 9,
      operator: 'Iberian Elite',
      flight_duration: '1h 30m',
      jets: {
        brand: 'Embraer',
        model: 'Legacy 450',
        type: 'Mid-size Jet',
        seating_capacity: 9,
        range_km: 4260,
        description: 'Comfortable mid-size jet to the Balearic Islands',
        image_url: ibizaImage
      }
    },
    {
      id: '7',
      departure_airport: 'Zürich (ZUR)',
      arrival_airport: 'Courchevel (CVF)',
      departure_time: '2025-08-12T07:30:00Z',
      arrival_time: '2025-08-12T08:45:00Z',
      price_per_seat: 2800,
      available_seats: 4,
      operator: 'Swiss Alpine Jets',
      flight_duration: '1h 15m',
      jets: {
        brand: 'Cessna',
        model: 'Citation Mustang',
        type: 'Very Light Jet',
        seating_capacity: 4,
        range_km: 2130,
        description: 'Compact jet perfect for short alpine routes',
        image_url: jetInteriorImage
      }
    },
    {
      id: '8',
      departure_airport: 'Rome (FCO)',
      arrival_airport: 'Sardinië (CAG)',
      departure_time: '2025-08-15T14:30:00Z',
      arrival_time: '2025-08-15T16:00:00Z',
      price_per_seat: 6500,
      available_seats: 8,
      operator: 'Italian Premium Air',
      flight_duration: '1h 30m',
      jets: {
        brand: 'Bombardier',
        model: 'Learjet 75',
        type: 'Mid-size Jet',
        seating_capacity: 8,
        range_km: 3815,
        description: 'Stylish mid-size jet to beautiful Sardinia',
        image_url: jetInteriorImage
      }
    },
    {
      id: '9',
      departure_airport: 'Düsseldorf (DUS)',
      arrival_airport: 'Sylt (GWT)',
      departure_time: '2025-08-18T10:00:00Z',
      arrival_time: '2025-08-18T11:00:00Z',
      price_per_seat: 2200,
      available_seats: 11,
      operator: 'North Sea Aviation',
      flight_duration: '1h 00m',
      jets: {
        brand: 'King Air',
        model: '350',
        type: 'Turboprop',
        seating_capacity: 11,
        range_km: 1806,
        description: 'Reliable turboprop to the North Sea island',
        image_url: londonImage
      }
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <div className="bg-primary text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={() => navigate('/')} 
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Terug naar home
            </button>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Nieuwste Empty Leg Deals</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Ontdek onze volledige collectie van last-minute privéjet aanbiedingen naar de mooiste bestemmingen in Europa en daarbuiten.
            </p>
          </div>
        </div>
      </div>

      {/* Deals Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allDeals.map(deal => (
              <div key={deal.id} className="h-full">
                <FlightCard {...deal} />
              </div>
            ))}
          </div>
          
          {/* Load More */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Meer deals worden dagelijks toegevoegd. Meld je aan voor onze nieuwsbrief voor de laatste aanbiedingen.
            </p>
            <button className="btn-jetleg-outline">
              Nieuwsbrief Aanmelden
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TopDeals;

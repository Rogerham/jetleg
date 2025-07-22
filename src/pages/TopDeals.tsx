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
      route: {
        from: 'Parijs',
        to: 'Nice',
        fromCode: 'LBG',
        toCode: 'NCE'
      },
      date: '28 juli 2025',
      aircraft: 'Cessna Citation XLS',
      maxPassengers: 8,
      price: 4500,
      discount: 30,
      image: parisImage,
      imageAlt: 'Luchtfoto van Parijs met de Eiffeltoren'
    },
    {
      id: '2',
      route: {
        from: 'Londen',
        to: 'Genève',
        fromCode: 'FAB',
        toCode: 'GVA'
      },
      date: '30 juli 2025',
      aircraft: 'Embraer Phenom 300',
      maxPassengers: 6,
      price: 3800,
      discount: 45,
      image: londonImage,
      imageAlt: 'Luchtfoto van Londen met de Thames'
    },
    {
      id: '3',
      route: {
        from: 'Amsterdam',
        to: 'Ibiza',
        fromCode: 'AMS',
        toCode: 'IBZ'
      },
      date: '2 augustus 2025',
      aircraft: 'Bombardier Challenger 350',
      maxPassengers: 9,
      price: 7200,
      discount: 25,
      image: ibizaImage,
      imageAlt: 'Luchtfoto van Ibiza kustlijn'
    },
    {
      id: '4',
      route: {
        from: 'Brussel',
        to: 'Monaco',
        fromCode: 'BRU',
        toCode: 'MCM'
      },
      date: '5 augustus 2025',
      aircraft: 'Cessna Citation CJ3+',
      maxPassengers: 7,
      price: 5200,
      discount: 35,
      image: jetInteriorImage,
      imageAlt: 'Luxe privéjet interieur naar Monaco'
    },
    {
      id: '5',
      route: {
        from: 'München',
        to: 'Sankt Moritz',
        fromCode: 'MUC',
        toCode: 'SMV'
      },
      date: '8 augustus 2025',
      aircraft: 'Pilatus PC-12',
      maxPassengers: 8,
      price: 3200,
      discount: 40,
      image: jetInteriorImage,
      imageAlt: 'Privéjet naar de Alpen'
    },
    {
      id: '6',
      route: {
        from: 'Madrid',
        to: 'Mallorca',
        fromCode: 'MAD',
        toCode: 'PMI'
      },
      date: '10 augustus 2025',
      aircraft: 'Embraer Legacy 450',
      maxPassengers: 9,
      price: 4800,
      discount: 28,
      image: ibizaImage,
      imageAlt: 'Vlucht naar de Balearen'
    },
    {
      id: '7',
      route: {
        from: 'Zürich',
        to: 'Courchevel',
        fromCode: 'ZUR',
        toCode: 'CVF'
      },
      date: '12 augustus 2025',
      aircraft: 'Cessna Citation Mustang',
      maxPassengers: 4,
      price: 2800,
      discount: 50,
      image: jetInteriorImage,
      imageAlt: 'Vlucht naar Frans skigebied'
    },
    {
      id: '8',
      route: {
        from: 'Rome',
        to: 'Sardinië',
        fromCode: 'FCO',
        toCode: 'CAG'
      },
      date: '15 augustus 2025',
      aircraft: 'Bombardier Learjet 75',
      maxPassengers: 8,
      price: 6500,
      discount: 22,
      image: jetInteriorImage,
      imageAlt: 'Vlucht naar Sardinië'
    },
    {
      id: '9',
      route: {
        from: 'Düsseldorf',
        to: 'Sylt',
        fromCode: 'DUS',
        toCode: 'GWT'
      },
      date: '18 augustus 2025',
      aircraft: 'King Air 350',
      maxPassengers: 11,
      price: 2200,
      discount: 55,
      image: londonImage,
      imageAlt: 'Vlucht naar Noordzee-eiland'
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

import FlightCard from './FlightCard';
import parisImage from '@/assets/paris-aerial.jpg';
import londonImage from '@/assets/london-aerial.jpg';
import ibizaImage from '@/assets/ibiza-aerial.jpg';

const DealsSection = () => {
  const featuredDeals = [
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
    }
  ];

  return (
    <section id="deals" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-title text-foreground mb-4">
            Populaire Empty Leg Deals
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Grijp je kans met deze last-minute aanbiedingen. De beschikbaarheid is beperkt, dus wees er snel bij!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDeals.map((deal) => (
            <FlightCard key={deal.id} {...deal} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="btn-jetleg-outline">
            Bekijk Alle Deals
          </button>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
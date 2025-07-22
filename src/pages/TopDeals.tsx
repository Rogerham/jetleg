
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FlightCard from '@/components/FlightCard';
import { ArrowLeft, Plane } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAllFlights } from '@/hooks/useFlights';

const TopDeals = () => {
  const navigate = useNavigate();
  const { data: flights = [], isLoading, error } = useAllFlights();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        
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

        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Plane className="h-16 w-16 text-accent mx-auto mb-4 animate-pulse" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Deals laden...</h3>
                <p className="text-muted-foreground">We zoeken de beste beschikbare deals voor je.</p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        
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

        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center py-20">
              <Plane className="h-16 w-16 text-destructive mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Er is een fout opgetreden</h3>
              <p className="text-muted-foreground mb-4">We konden geen deals laden. Probeer het opnieuw.</p>
              <button
                onClick={() => window.location.reload()}
                className="btn-jetleg-primary"
              >
                Opnieuw proberen
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

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
          {flights.length === 0 ? (
            <div className="text-center py-20">
              <Plane className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Geen deals beschikbaar</h3>
              <p className="text-muted-foreground mb-4">
                Er zijn momenteel geen deals beschikbaar. Kom later terug voor nieuwe aanbiedingen.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {flights.map(deal => (
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
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TopDeals;

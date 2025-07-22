
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import DestinationDealCard from '@/components/DestinationDealCard';
import { ArrowLeft, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDestinationDeals } from '@/hooks/useDestinationDeals';

const TopDeals = () => {
  const navigate = useNavigate();
  const { data: destinationDeals = [], isLoading, error } = useDestinationDeals();

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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Top Bestemmingen</h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Ontdek de beste empty leg deals naar Europa's mooiste bestemmingen. Gegroepeerd per bestemming voor het beste overzicht.
              </p>
            </div>
          </div>
        </div>

        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-accent mx-auto mb-4 animate-pulse" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Bestemmingen laden...</h3>
                <p className="text-muted-foreground">We zoeken de beste beschikbare bestemmingen voor je.</p>
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Top Bestemmingen</h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Ontdek de beste empty leg deals naar Europa's mooiste bestemmingen. Gegroepeerd per bestemming voor het beste overzicht.
              </p>
            </div>
          </div>
        </div>

        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center py-20">
              <MapPin className="h-16 w-16 text-destructive mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Er is een fout opgetreden</h3>
              <p className="text-muted-foreground mb-4">We konden geen bestemmingen laden. Probeer het opnieuw.</p>
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Top Bestemmingen</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Ontdek de beste empty leg deals naar Europa's mooiste bestemmingen. Gegroepeerd per bestemming voor het beste overzicht.
            </p>
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {destinationDeals.length === 0 ? (
            <div className="text-center py-20">
              <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Geen bestemmingen beschikbaar</h3>
              <p className="text-muted-foreground mb-4">
                Er zijn momenteel geen bestemmingen beschikbaar. Kom later terug voor nieuwe aanbiedingen.
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Unieke Bestemmingen
                </h2>
                <p className="text-muted-foreground">
                  Wees er snel bij om als eerste de droomcharter naar jouw favoriete bestemming te boeken. 'First come, first served.'
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {destinationDeals.map((deal, index) => (
                  <div key={deal.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <DestinationDealCard deal={deal} />
                  </div>
                ))}
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

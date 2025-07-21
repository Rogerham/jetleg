import { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/hero-bg.jpg';

const HeroSection = () => {
  const { toast } = useToast();
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: '',
    passengers: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Zoekfunctie nog niet actief",
      description: "Onze ontwikkelaars werken hard om de zoekfunctie te implementeren. Binnenkort kun je hier live vluchten zoeken!",
    });
  };

  return (
    <section 
      className="hero-jetleg text-white min-h-[80vh] flex items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`
      }}
    >
      <div className="container mx-auto px-6 py-24 md:py-32 text-center">
        <div className="animate-fade-in">
          <h1 className="text-hero mb-6 text-white">
            Vlieg Privé, Betaal Minder
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto">
            Ontdek exclusieve empty leg vluchten en ervaar luxe reizen voor een fractie van de prijs.
          </p>
        </div>
        
        {/* Search Form */}
        <div className="search-form-jetleg max-w-5xl mx-auto animate-fade-in">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div className="text-left">
              <label htmlFor="from" className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Van
              </label>
              <input 
                type="text" 
                id="from"
                value={searchData.from}
                onChange={(e) => handleInputChange('from', e.target.value)}
                placeholder="bv. Brussel" 
                className="input-jetleg"
              />
            </div>
            
            <div className="text-left">
              <label htmlFor="to" className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Naar
              </label>
              <input 
                type="text" 
                id="to"
                value={searchData.to}
                onChange={(e) => handleInputChange('to', e.target.value)}
                placeholder="bv. Nice" 
                className="input-jetleg"
              />
            </div>
            
            <div className="text-left">
              <label htmlFor="date" className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Datum
              </label>
              <input 
                type="date" 
                id="date"
                value={searchData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="input-jetleg"
              />
            </div>
            
            <div className="text-left">
              <label htmlFor="passengers" className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Passagiers
              </label>
              <input 
                type="number" 
                id="passengers"
                value={searchData.passengers}
                onChange={(e) => handleInputChange('passengers', e.target.value)}
                placeholder="2" 
                min="1" 
                max="20"
                className="input-jetleg"
              />
            </div>
            
            <button type="submit" className="btn-jetleg-primary w-full lg:col-span-1 flex items-center justify-center gap-2">
              <Search className="h-5 w-5" />
              Zoek Vluchten
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
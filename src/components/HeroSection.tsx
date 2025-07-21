import SearchWithSuggestions from './SearchWithSuggestions';
import heroImage from '@/assets/hero-bg.jpg';
const HeroSection = () => {
  return <section className="hero-jetleg text-white min-h-[80vh] flex items-center" style={{
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`
  }}>
      <div className="container mx-auto px-6 py-24 md:py-32 text-center">
        <div className="animate-fade-in">
          <h1 className="text-hero mb-6 text-white">Vlieg privé, betaal minder</h1>
          <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto">
            Ontdek exclusieve empty leg vluchten en ervaar luxe reizen voor een fractie van de prijs.
          </p>
        </div>
        
        {/* Enhanced Search Form */}
        <SearchWithSuggestions />
      </div>
    </section>;
};
export default HeroSection;

import { Eye } from 'lucide-react';
import { useState, useEffect } from 'react';
import FlightCard from './FlightCard';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDealsFlights } from '@/hooks/useFlights';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const DealsSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: flights = [], isLoading, error } = useDealsFlights();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // Get the first 3 flights as featured deals
  const featuredDeals = flights.slice(0, 3);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (isLoading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-title text-foreground mb-4">
              {t('deals.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('deals.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map((index) => (
              <div key={index} className="card-jetleg h-64 animate-pulse bg-muted"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || featuredDeals.length === 0) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-title text-foreground mb-4">
              {t('deals.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('deals.subtitle')}
            </p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Geen deals beschikbaar op dit moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-title text-foreground mb-4">
            {t('deals.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('deals.subtitle')}
          </p>
        </div>
        
        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-3 gap-8 mb-12">
          {featuredDeals.map((deal, index) => (
            <div key={deal.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <FlightCard {...deal} />
            </div>
          ))}
        </div>

        {/* Mobile/Tablet Carousel */}
        <div className="lg:hidden mb-12">
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {featuredDeals.map((deal, index) => (
                <CarouselItem key={deal.id} className="pl-2 md:pl-4 md:basis-1/2">
                  <div className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <FlightCard {...deal} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
          
          {/* Navigation Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index + 1 === current 
                    ? 'bg-accent' 
                    : 'bg-muted-foreground/30'
                }`}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center animate-fade-in">
          <button
            onClick={() => navigate('/deals')}
            className="btn-jetleg-primary inline-flex items-center gap-2"
          >
            <Eye className="h-5 w-5" />
            {t('deals.viewAll')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;

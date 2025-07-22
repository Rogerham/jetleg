
import { useState, useEffect } from 'react';
import FlightCard from './FlightCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi } from '@/components/ui/carousel';
import parisImage from '@/assets/paris-aerial.jpg';
import londonImage from '@/assets/london-aerial.jpg';
import ibizaImage from '@/assets/ibiza-aerial.jpg';

const DealsSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

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

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section id="deals" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-title text-foreground mb-4">Recente deals</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Grijp je kans met deze last-minute aanbiedingen. De beschikbaarheid is beperkt, dus wees er snel bij!
          </p>
        </div>
        
        {/* Mobile and Tablet Carousel */}
        <div className="lg:hidden mb-8">
          <div className="relative">
            <Carousel 
              className="w-full max-w-sm sm:max-w-md md:max-w-2xl mx-auto"
              setApi={setApi}
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {featuredDeals.map(deal => (
                  <CarouselItem key={deal.id} className="pl-2 md:pl-4 md:basis-1/2">
                    <div className="p-1 h-full">
                      <div className="h-full">
                        <FlightCard {...deal} />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex -left-12 h-10 w-10 bg-white/95 hover:bg-white border-2 border-border shadow-lg backdrop-blur-sm" />
              <CarouselNext className="hidden sm:flex -right-12 h-10 w-10 bg-white/95 hover:bg-white border-2 border-border shadow-lg backdrop-blur-sm" />
            </Carousel>
          </div>
          
          {/* Navigation Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: count }, (_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === current - 1 
                    ? 'bg-primary w-6' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2'
                }`}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {featuredDeals.map(deal => (
            <div key={deal.id} className="h-full">
              <FlightCard {...deal} />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="/top-deals" className="btn-jetleg-outline">Bekijk alle deals</a>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;

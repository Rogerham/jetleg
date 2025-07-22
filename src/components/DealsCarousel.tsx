
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import FlightCard from './FlightCard';
import { Button } from '@/components/ui/button';
import type { CarouselApi } from '@/components/ui/carousel';
import type { Flight } from '@/hooks/useFlights';

interface DealsCarouselProps {
  deals: Flight[];
  className?: string;
}

const DealsCarousel = ({ deals, className = '' }: DealsCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

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

  const scrollTo = (index: number) => {
    api?.scrollTo(index);
  };

  if (deals.length === 0) {
    return null;
  }

  return (
    <div className={`relative ${className}`}>
      {/* Increased padding to prevent clipping on mobile/tablet */}
      <div className="px-4 sm:px-6 md:px-8">
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "center",
            loop: false, // Disabled infinite loop
          }}
        >
          <CarouselContent className="-ml-4 sm:-ml-6 md:-ml-8">
            {deals.map((deal) => (
              <CarouselItem key={deal.id} className="pl-4 sm:pl-6 md:pl-8 md:basis-1/2 lg:basis-1/3">
                {/* Increased padding around cards to prevent clipping when hovering */}
                <div className="p-4 h-full">
                  <FlightCard {...deal} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Desktop Navigation Arrows */}
          <div className="hidden lg:block">
            <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-border shadow-lg" />
            <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-border shadow-lg" />
          </div>
          
          {/* Tablet Navigation - Overlapping Arrows */}
          <div className="hidden sm:block lg:hidden">
            <CarouselPrevious className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-border shadow-lg z-10" />
            <CarouselNext className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-border shadow-lg z-10" />
          </div>

          {/* Mobile Navigation - Overlapping Arrows */}
          <div className="block sm:hidden">
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-border shadow-lg z-10 h-10 w-10" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-border shadow-lg z-10 h-10 w-10" />
          </div>
        </Carousel>
      </div>

      {/* Mobile Navigation Dots */}
      <div className="flex justify-center gap-2 mt-8 sm:hidden">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              current === index + 1
                ? 'bg-primary w-6'
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Tablet Navigation - Dots */}
      <div className="hidden sm:flex lg:hidden justify-center gap-2 mt-6">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              current === index + 1
                ? 'bg-primary w-6'
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default DealsCarousel;

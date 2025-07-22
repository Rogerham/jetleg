
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
      {/* Add extra padding to prevent clipping on mobile/tablet - increased bottom padding */}
      <div className="px-2 sm:px-4 md:px-6 pb-4">
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "center",
            loop: false, // Disable infinite loop
          }}
        >
          <CarouselContent className="-ml-2 sm:-ml-3 md:-ml-6">
            {deals.map((deal) => (
              <CarouselItem key={deal.id} className="pl-2 sm:pl-3 md:pl-6 md:basis-1/2 lg:basis-1/3">
                {/* Increased padding around cards to prevent clipping during hover */}
                <div className="p-3 h-full">
                  <FlightCard {...deal} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Desktop Navigation Arrows */}
          <div className="hidden lg:block">
            <CarouselPrevious className="absolute -left-8 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-border shadow-lg" />
            <CarouselNext className="absolute -right-8 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-border shadow-lg" />
          </div>
          
          {/* Tablet Navigation - Overlapping Arrows */}
          <div className="hidden sm:block lg:hidden">
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-border shadow-lg z-10" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-border shadow-lg z-10" />
          </div>
        </Carousel>
      </div>

      {/* Mobile Navigation - Non-overlapping buttons above dots */}
      <div className="flex justify-center items-center gap-4 mt-4 sm:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => api?.scrollPrev()}
          disabled={current === 1}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="flex gap-2">
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
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => api?.scrollNext()}
          disabled={current === count}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Tablet Navigation - Dots Only */}
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

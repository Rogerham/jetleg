
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
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
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
      {/* Increased padding to prevent shadow clipping - extra padding on all sides */}
      <div className="px-4 sm:px-6 md:px-8 py-6">
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "center",
            loop: false,
          }}
        >
          <CarouselContent className="-ml-2 sm:-ml-3 md:-ml-6">
            {deals.map((deal) => (
              <CarouselItem key={deal.id} className="pl-2 sm:pl-3 md:pl-6 md:basis-1/2 lg:basis-1/3">
                {/* Increased padding around cards to prevent shadow clipping during hover */}
                <div className="p-4 h-full">
                  <FlightCard {...deal} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Desktop Navigation Arrows */}
          <div className="hidden lg:block">
            <CarouselPrevious className="absolute -left-10 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-border shadow-lg" />
            <CarouselNext className="absolute -right-10 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-border shadow-lg" />
          </div>
        </Carousel>
      </div>

      {/* Mobile & Tablet Navigation - Always visible but disabled when not scrollable */}
      <div className="flex justify-center items-center gap-4 mt-2 lg:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => api?.scrollPrev()}
          disabled={!canScrollPrev}
          className="h-8 w-8 p-0 transition-all duration-200"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="flex gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                current === index
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
          disabled={!canScrollNext}
          className="h-8 w-8 p-0 transition-all duration-200"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DealsCarousel;


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
      {/* Add extra padding to prevent clipping on mobile/tablet */}
      <div className="px-2 sm:px-4 md:px-6">
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "center",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-3 sm:-ml-4 md:-ml-6">
            {deals.map((deal) => (
              <CarouselItem key={deal.id} className="pl-3 sm:pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3">
                {/* Add padding around cards to prevent clipping when hovering */}
                <div className="p-2 h-full">
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

      {/* Mobile Navigation Dots Only */}
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

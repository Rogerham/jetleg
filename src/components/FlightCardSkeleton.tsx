
import { Skeleton } from '@/components/ui/skeleton';

const FlightCardSkeleton = () => {
  return (
    <div className="card-jetleg overflow-hidden">
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
          {/* Flight Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-3">
              <div className="text-center">
                <Skeleton className="h-6 w-16 mb-1" />
                <Skeleton className="h-4 w-10" />
              </div>
              
              <div className="flex-1 relative">
                <Skeleton className="h-[1px] w-full" />
                <div className="absolute top-[-8px] left-1/2 transform -translate-x-1/2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                </div>
                <div className="text-center mt-1">
                  <Skeleton className="h-3 w-12 mx-auto" />
                </div>
              </div>
              
              <div className="text-center">
                <Skeleton className="h-6 w-16 mb-1" />
                <Skeleton className="h-4 w-10" />
              </div>
            </div>
            
            <div className="space-y-1">
              <Skeleton className="h-5 w-32" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="lg:col-span-1 hidden lg:block">
            <Skeleton className="w-full h-24 rounded-lg" />
          </div>

          {/* Price & Book */}
          <div className="lg:col-span-1 text-center lg:text-right">
            <Skeleton className="h-8 w-24 mb-4 mx-auto lg:ml-auto lg:mr-0" />
            <Skeleton className="h-10 w-full lg:w-24 lg:ml-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightCardSkeleton;

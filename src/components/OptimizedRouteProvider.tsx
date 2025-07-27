
import { useLocation } from 'react-router-dom';
import SearchResults from '@/pages/SearchResults';
import OptimizedSearchResults from '@/pages/OptimizedSearchResults';

const OptimizedRouteProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  // Replace SearchResults with OptimizedSearchResults for better performance
  if (location.pathname === '/search-results') {
    return <OptimizedSearchResults />;
  }
  
  return <>{children}</>;
};

export default OptimizedRouteProvider;

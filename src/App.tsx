
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Index from '@/pages/Index';
import SearchResults from '@/pages/SearchResults';
import TopDeals from '@/pages/TopDeals';
import HowItWorks from '@/pages/HowItWorks';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import MyBookings from '@/pages/MyBookings';
import Profile from '@/pages/Profile';
import BookingFlow from '@/pages/BookingFlow';
import BookingConfirmation from '@/pages/BookingConfirmation';
import FAQ from '@/pages/FAQ';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsConditions from '@/pages/TermsConditions';
import CookiePolicy from '@/pages/CookiePolicy';
import GDPR from '@/pages/GDPR';
import CustomerService from '@/pages/CustomerService';
import ForOperators from '@/pages/ForOperators';
import NotFound from '@/pages/NotFound';
import OptimizedRouteProvider from '@/components/OptimizedRouteProvider';
import { CurrencyProvider } from '@/contexts/CurrencyContext';
import { AuthProvider } from '@/contexts/AuthContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CurrencyProvider>
          <Router>
            <div className="min-h-screen bg-background text-foreground">
              <Navigation />
              <OptimizedRouteProvider>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/search-results" element={<SearchResults />} />
                  <Route path="/top-deals" element={<TopDeals />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/my-bookings" element={<MyBookings />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/booking/:flightId" element={<BookingFlow />} />
                  <Route path="/booking-confirmation" element={<BookingConfirmation />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsConditions />} />
                  <Route path="/cookies" element={<CookiePolicy />} />
                  <Route path="/gdpr" element={<GDPR />} />
                  <Route path="/customer-service" element={<CustomerService />} />
                  <Route path="/for-operators" element={<ForOperators />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </OptimizedRouteProvider>
              <Footer />
              <Toaster />
            </div>
          </Router>
        </CurrencyProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;


import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import '@/i18n/config';
import Index from "./pages/Index";
import SearchResults from "./pages/SearchResults";
import BookingFlow from "./pages/BookingFlow";
import BookingConfirmation from "./pages/BookingConfirmation";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import TopDeals from "./pages/TopDeals";
import HowItWorks from "./pages/HowItWorks";
import FAQ from "./pages/FAQ";
import CustomerService from "./pages/CustomerService";
import ForOperators from "./pages/ForOperators";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import CookiePolicy from "./pages/CookiePolicy";
import GDPR from "./pages/GDPR";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import MyBookings from "./pages/MyBookings";

const queryClient = new QueryClient();

// Component to handle scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/booking/:flightId" element={<BookingFlow />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/top-deals" element={<TopDeals />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/customer-service" element={<CustomerService />} />
            <Route path="/for-operators" element={<ForOperators />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/gdpr" element={<GDPR />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;


import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./components/ThemeProvider";
import ModularSearchDemo from "./pages/ModularSearchDemo";
import SearchResults from "./pages/SearchResults";
import BookingFlow from "./pages/BookingFlow";
import "./i18n/config";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <AuthProvider>
        <CurrencyProvider>
          <TooltipProvider>
            <Toaster />
            <BrowserRouter>
              <ScrollToTop />
              <div className="min-h-screen flex flex-col">
                <Navigation />
                <main className="flex-1">
                  <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                      {navItems.map(({ to, page }) => (
                        <Route key={to} path={to} element={page} />
                      ))}
                      <Route path="/search-results" element={<SearchResults />} />
                      <Route path="/modular-demo" element={<ModularSearchDemo />} />
                      {/* Consolidated booking routes - all point to BookingFlow */}
                      <Route path="/booking/:id" element={<BookingFlow />} />
                      <Route path="/booking/:flightId" element={<BookingFlow />} />
                      <Route path="/booking-flow/:flightId" element={<BookingFlow />} />
                    </Routes>
                  </Suspense>
                </main>
                <Footer />
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </CurrencyProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

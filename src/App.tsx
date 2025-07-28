
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
import ModularSearchDemo from "./pages/ModularSearchDemo";
import SearchResults from "./pages/SearchResults";
import "./i18n/config";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </CurrencyProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

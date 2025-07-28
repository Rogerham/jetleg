
import { Home, Plane, Info, Phone, User, BookOpen, Shield, HelpCircle, Users } from "lucide-react";
import Index from "./pages/Index";
import TopDeals from "./pages/TopDeals";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";
import BookingFlow from "./pages/BookingFlow";
import BookingConfirmation from "./pages/BookingConfirmation";
import SearchResults from "./pages/SearchResults";
import OptimizedSearchResults from "./pages/OptimizedSearchResults";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import CookiePolicy from "./pages/CookiePolicy";
import GDPR from "./pages/GDPR";
import FAQ from "./pages/FAQ";
import CustomerService from "./pages/CustomerService";
import ForOperators from "./pages/ForOperators";
import NotFound from "./pages/NotFound";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: Home,
    page: <Index />,
  },
  {
    title: "Top Deals",
    to: "/top-deals",
    icon: Plane,
    page: <TopDeals />,
  },
  {
    title: "How It Works",
    to: "/how-it-works",
    icon: BookOpen,
    page: <HowItWorks />,
  },
  {
    title: "About",
    to: "/about",
    icon: Info,
    page: <About />,
  },
  {
    title: "Contact",
    to: "/contact",
    icon: Phone,
    page: <Contact />,
  },
  {
    title: "Login",
    to: "/login",
    icon: User,
    page: <Login />,
  },
  {
    title: "Register",
    to: "/register",
    icon: User,
    page: <Register />,
  },
  {
    title: "My Bookings",
    to: "/my-bookings",
    icon: BookOpen,
    page: <MyBookings />,
  },
  {
    title: "Profile",
    to: "/profile",
    icon: User,
    page: <Profile />,
  },
  {
    title: "Booking Flow",
    to: "/booking/:id",
    icon: Plane,
    page: <BookingFlow />,
  },
  {
    title: "Booking Confirmation",
    to: "/booking-confirmation/:id",
    icon: Plane,
    page: <BookingConfirmation />,
  },
  {
    title: "Search Results",
    to: "/search",
    icon: Plane,
    page: <SearchResults />,
  },
  {
    title: "Optimized Search Results",
    to: "/search-optimized",
    icon: Plane,
    page: <OptimizedSearchResults />,
  },
  {
    title: "Privacy Policy",
    to: "/privacy",
    icon: Shield,
    page: <PrivacyPolicy />,
  },
  {
    title: "Terms & Conditions",
    to: "/terms",
    icon: Shield,
    page: <TermsConditions />,
  },
  {
    title: "Cookie Policy",
    to: "/cookies",
    icon: Shield,
    page: <CookiePolicy />,
  },
  {
    title: "GDPR",
    to: "/gdpr",
    icon: Shield,
    page: <GDPR />,
  },
  {
    title: "FAQ",
    to: "/faq",
    icon: HelpCircle,
    page: <FAQ />,
  },
  {
    title: "Customer Service",
    to: "/customer-service",
    icon: HelpCircle,
    page: <CustomerService />,
  },
  {
    title: "For Operators",
    to: "/for-operators",
    icon: Users,
    page: <ForOperators />,
  },
  {
    title: "Not Found",
    to: "*",
    icon: Info,
    page: <NotFound />,
  },
];

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Plane, Calendar, Clock, ArrowRight, Sun, Moon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Mock data - replace with actual API call
const mockBookings = [
    // ... (mock data remains the same)
];

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState(mockBookings);
  const { t } = useTranslation();

  // useEffect to fetch bookings when component mounts
  // useEffect(() => {
  //   if (user) {
  //     // Fetch bookings from your API
  //     // fetch(`/api/bookings?userId=${user.id}`)
  //     //   .then(res => res.json())
  //     //   .then(data => setBookings(data));
  //   }
  // }, [user]);

  if (!user) {
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground">Toegang geweigerd</h1>
        <p className="text-muted-foreground mt-4">Je moet ingelogd zijn om je boekingen te bekijken.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Mijn Boekingen</h1>
          <p className="text-muted-foreground">Bekijk en beheer al je vluchten</p>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center card-jetleg p-12">
            <h2 className="text-xl font-semibold text-foreground">Nog geen boekingen</h2>
            <p className="text-muted-foreground mt-2">Het lijkt erop dat je nog geen vluchten hebt geboekt.</p>
            <button className="btn-jetleg-primary mt-6">Zoek Vluchten</button>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map(booking => (
                // ... (booking card code remains the same)
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
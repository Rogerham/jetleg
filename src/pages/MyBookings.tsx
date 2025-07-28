
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Plane, Calendar, Clock, ArrowRight, Sun, Moon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Mock data - replace with actual API call
const mockBookings = [
  {
    id: 1,
    flightNumber: 'EL-789',
    departure: {
      airport: 'Amsterdam (AMS)',
      time: '14:30',
      date: '2024-02-15'
    },
    arrival: {
      airport: 'Nice (NCE)',
      time: '16:45',
      date: '2024-02-15'
    },
    aircraft: 'Citation CJ3+',
    passengers: 4,
    status: 'confirmed',
    price: 3500,
    bookingDate: '2024-01-20'
  },
  {
    id: 2,
    flightNumber: 'EL-456',
    departure: {
      airport: 'London (LTN)',
      time: '09:15',
      date: '2024-03-01'
    },
    arrival: {
      airport: 'Geneva (GVA)',
      time: '12:30',
      date: '2024-03-01'
    },
    aircraft: 'Phenom 300',
    passengers: 2,
    status: 'upcoming',
    price: 4200,
    bookingDate: '2024-02-05'
  }
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
              <div key={booking.id} className="card-jetleg p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Plane className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Vlucht {booking.flightNumber}</h3>
                        <p className="text-sm text-muted-foreground">{booking.aircraft}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                      }`}>
                        {booking.status === 'confirmed' ? 'Bevestigd' : 'Aankomend'}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-center">
                          <div className="font-semibold text-foreground">{booking.departure.time}</div>
                          <div className="text-sm text-muted-foreground">{booking.departure.airport}</div>
                          <div className="text-xs text-muted-foreground">{booking.departure.date}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-8 h-px bg-border"></div>
                          <ArrowRight className="w-4 h-4" />
                          <div className="w-8 h-px bg-border"></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 justify-end md:justify-start">
                        <div className="text-center">
                          <div className="font-semibold text-foreground">{booking.arrival.time}</div>
                          <div className="text-sm text-muted-foreground">{booking.arrival.airport}</div>
                          <div className="text-xs text-muted-foreground">{booking.arrival.date}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Geboekt op {booking.bookingDate}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {booking.passengers} passagier{booking.passengers > 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground mb-2">€{booking.price.toLocaleString()}</div>
                    <button className="btn-jetleg-primary">Details bekijken</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;

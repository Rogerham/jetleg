import { useNavigate } from 'react-router-dom';
import { Check, Download, Mail, MapPin, Calendar, Clock, Users, Plane } from 'lucide-react';

const BookingConfirmation = () => {
  const navigate = useNavigate();

  const bookingDetails = {
    confirmationNumber: 'JL-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    flight: {
      route: { from: 'Brussels', to: 'Nice', fromCode: 'BRU', toCode: 'NCE' },
      date: '15 augustus 2024',
      departure: '14:30',
      arrival: '16:15',
      duration: '1h 45m',
      aircraft: 'Cessna Citation CJ3+'
    },
    passengers: ['John Doe', 'Jane Doe'],
    totalPrice: 4900,
    contactEmail: 'john.doe@example.com'
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Boeking bevestigd!</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Je vlucht is succesvol geboekt. Een bevestiging is verzonden naar {bookingDetails.contactEmail}
            </p>
            <div className="bg-accent/10 text-accent px-6 py-3 rounded-lg inline-block">
              <span className="font-medium">Bevestigingsnummer: {bookingDetails.confirmationNumber}</span>
            </div>
          </div>

          {/* Booking Details */}
          <div className="card-jetleg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Vluchtdetails</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Flight Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {bookingDetails.flight.route.from} → {bookingDetails.flight.route.to}
                    </div>
                    <div className="text-muted-foreground">
                      {bookingDetails.flight.route.fromCode} → {bookingDetails.flight.route.toCode}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{bookingDetails.flight.date}</div>
                    <div className="text-muted-foreground">Datum van vertrek</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {bookingDetails.flight.departure} - {bookingDetails.flight.arrival}
                    </div>
                    <div className="text-muted-foreground">Vliegduur: {bookingDetails.flight.duration}</div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Plane className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{bookingDetails.flight.aircraft}</div>
                    <div className="text-muted-foreground">Vliegtuigtype</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{bookingDetails.passengers.length} passagiers</div>
                    <div className="text-muted-foreground">
                      {bookingDetails.passengers.join(', ')}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 font-bold text-lg">€</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">€{bookingDetails.totalPrice.toLocaleString()}</div>
                    <div className="text-muted-foreground">Totaal betaald</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="card-jetleg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Volgende stappen</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-accent/5 rounded-lg">
                <Mail className="h-6 w-6 text-accent mt-1" />
                <div>
                  <div className="font-medium text-foreground">Check je e-mail</div>
                  <div className="text-muted-foreground">
                    Een bevestiging met alle details en je ticket is verzonden naar {bookingDetails.contactEmail}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-accent/5 rounded-lg">
                <Clock className="h-6 w-6 text-accent mt-1" />
                <div>
                  <div className="font-medium text-foreground">Arriveer op tijd</div>
                  <div className="text-muted-foreground">
                    Wees 30 minuten voor vertrek aanwezig bij de private terminal
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-accent/5 rounded-lg">
                <Users className="h-6 w-6 text-accent mt-1" />
                <div>
                  <div className="font-medium text-foreground">Neem je documenten mee</div>
                  <div className="text-muted-foreground">
                    Zorg ervoor dat je paspoort geldig is en alle passagiers hun ID bij zich hebben
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-jetleg-primary flex items-center gap-2">
              <Download className="h-5 w-5" />
              Download Ticket
            </button>
            <button className="btn-jetleg-outline flex items-center gap-2">
              <Mail className="h-5 w-5" />
              E-mail opnieuw verzenden
            </button>
            <button 
              onClick={() => navigate('/')}
              className="btn-jetleg-secondary"
            >
              Terug naar home
            </button>
          </div>

          {/* Contact Info */}
          <div className="text-center mt-12 p-6 bg-muted/30 rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">Vragen over je boeking?</h3>
            <p className="text-muted-foreground mb-4">
              Ons team staat klaar om je te helpen
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <a href="mailto:support@jetleg.be" className="text-accent hover:underline">
                support@jetleg.be
              </a>
              <a href="tel:+32123456789" className="text-accent hover:underline">
                +32 1 234 56 789
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
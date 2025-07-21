import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefoon',
      details: ['+32 1 234 56 789', 'Ma-Vr: 08:00 - 20:00', 'Za-Zo: 10:00 - 18:00']
    },
    {
      icon: Mail,
      title: 'E-mail',
      details: ['info@jetleg.be', 'support@jetleg.be', 'Respons binnen 2 uur']
    },
    {
      icon: MapPin,
      title: 'Adres',
      details: ['Jetleg BV', 'Luchthavenlaan 42', '1930 Zaventem, België']
    },
    {
      icon: Clock,
      title: 'Openingstijden',
      details: ['Maandag - Vrijdag: 08:00 - 20:00', 'Weekend: 10:00 - 18:00', '24/7 noodlijn beschikbaar']
    }
  ];

  const subjects = [
    'Algemene vraag',
    'Boekingshulp',
    'Klacht',
    'Partnerschap',
    'Media aanvraag',
    'Anders'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Incomplete gegevens",
        description: "Vul alle verplichte velden in.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Bericht verzonden!",
      description: "We nemen binnen 24 uur contact met je op.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-hero mb-6">Contact</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Heb je vragen over onze vluchten of wil je hulp bij je boeking? 
            Ons vriendelijke team staat klaar om je te helpen.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="card-jetleg p-6 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-3">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-muted-foreground text-sm">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form & Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="card-jetleg p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Stuur ons een bericht</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Naam *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="input-jetleg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      E-mailadres *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="input-jetleg"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Telefoonnummer
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="input-jetleg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Onderwerp
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="input-jetleg"
                    >
                      <option value="">Selecteer onderwerp</option>
                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Bericht *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={6}
                    className="input-jetleg resize-none"
                    placeholder="Beschrijf je vraag of opmerking..."
                    required
                  />
                </div>

                <button type="submit" className="btn-jetleg-primary w-full flex items-center justify-center gap-2">
                  <Send className="h-5 w-5" />
                  Verstuur bericht
                </button>
              </form>
            </div>

            {/* Additional Info */}
            <div className="space-y-8">
              {/* FAQ Quick Links */}
              <div className="card-jetleg p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-accent" />
                  Veelgestelde vragen
                </h3>
                <div className="space-y-3">
                  <a href="#" className="block text-muted-foreground hover:text-accent transition-colors">
                    Hoe boek ik een empty leg vlucht?
                  </a>
                  <a href="#" className="block text-muted-foreground hover:text-accent transition-colors">
                    Wat zijn de annuleringsvoorwaarden?
                  </a>
                  <a href="#" className="block text-muted-foreground hover:text-accent transition-colors">
                    Welke documenten heb ik nodig?
                  </a>
                  <a href="#" className="block text-muted-foreground hover:text-accent transition-colors">
                    Kan ik mijn vlucht wijzigen?
                  </a>
                  <a href="#" className="block text-muted-foreground hover:text-accent transition-colors">
                    Hoe werkt de betaling?
                  </a>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="card-jetleg p-6 bg-destructive/5 border-destructive/20">
                <h3 className="font-semibold text-foreground mb-4">Noodcontact</h3>
                <p className="text-muted-foreground mb-3">
                  Voor dringende zaken buiten kantooruren kun je ons 24/7 bereiken:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-destructive" />
                    <span className="font-medium text-foreground">+32 800 123 456</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-destructive" />
                    <span className="font-medium text-foreground">emergency@jetleg.be</span>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="card-jetleg p-6">
                <h3 className="font-semibold text-foreground mb-4">Bezoekadres</h3>
                <div className="bg-muted/30 h-48 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">
                      Luchthavenlaan 42<br />
                      1930 Zaventem, België
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  Gelegen op 5 minuten van Brussels Airport. Gratis parkeren beschikbaar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
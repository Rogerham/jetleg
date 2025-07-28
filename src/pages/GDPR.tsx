import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Shield, Eye, Edit, Trash2, Download, XCircle } from 'lucide-react';

const GDPR = () => {
  const rights = [
    {
      icon: Eye,
      title: "Recht op inzage",
      description: "U hebt het recht om te weten welke persoonsgegevens wij van u verwerken."
    },
    {
      icon: Edit,
      title: "Recht op rectificatie",
      description: "U kunt verzoeken om onjuiste of onvolledige gegevens te corrigeren."
    },
    {
      icon: Trash2,
      title: "Recht op verwijdering",
      description: "Ook bekend als 'recht om vergeten te worden' - u kunt verzoeken om verwijdering van uw gegevens."
    },
    {
      icon: XCircle,
      title: "Recht op beperking",
      description: "U kunt verzoeken om de verwerking van uw gegevens te beperken in bepaalde omstandigheden."
    },
    {
      icon: Download,
      title: "Recht op overdraagbaarheid",
      description: "U kunt uw gegevens in een gestructureerd, gangbaar formaat opvragen."
    },
    {
      icon: Shield,
      title: "Recht van bezwaar",
      description: "U kunt bezwaar maken tegen bepaalde verwerkingen van uw persoonsgegevens."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-hero mb-6">
              GDPR & Uw Rechten
            </h1>
            <p className="text-xl text-white/90">
              Ontdek hoe wij uw privacy beschermen conform de Algemene Verordening Gegevensbescherming (AVG/GDPR).
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-title text-foreground mb-6">
                  Wat is de GDPR?
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  De Algemene Verordening Gegevensbescherming (GDPR) is een Europese wet die sinds 25 mei 2018 van kracht is. Deze wet geeft u meer controle over uw persoonsgegevens en verplicht organisaties om transparant te zijn over hoe zij gegevens verzamelen en gebruiken.
                </p>
                <p className="text-muted-foreground">
                  Bij Jetleg nemen wij uw privacy en gegevensbescherming zeer serieus. Wij hebben alle nodige maatregelen genomen om volledig GDPR-compliant te zijn.
                </p>
              </div>
              
              <div className="card-jetleg p-8">
                <div className="text-center">
                  <Shield className="h-20 w-20 text-accent mx-auto mb-6" />
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    100% GDPR Compliant
                  </h3>
                  <p className="text-muted-foreground">
                    Onze systemen en processen zijn volledig afgestemd op de GDPR-vereisten voor maximale bescherming van uw privacy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Your Rights */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-title text-foreground mb-4">
              Uw rechten onder de GDPR
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              De GDPR geeft u verschillende rechten betreffende uw persoonsgegevens. Hier is een overzicht van wat u kunt verwachten.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rights.map((right, index) => (
              <div key={index} className="card-jetleg p-6">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                  <right.icon className="h-8 w-8 text-accent" />
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {right.title}
                </h3>
                
                <p className="text-muted-foreground">
                  {right.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Exercise Rights */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-title text-foreground mb-8 text-center">
              Hoe uw rechten uitoefenen?
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="card-jetleg p-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Online verzoek indienen
                </h3>
                <p className="text-muted-foreground mb-6">
                  De snelste manier om uw rechten uit te oefenen is via ons online formulier. Wij verwerken uw verzoek binnen 30 dagen.
                </p>
                <button className="btn-jetleg-primary w-full">
                  Online Verzoek Indienen
                </button>
              </div>
              
              <div className="card-jetleg p-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Contact opnemen
                </h3>
                <p className="text-muted-foreground mb-6">
                  U kunt ook direct contact opnemen met ons privacy team voor persoonlijke ondersteuning bij uw verzoek.
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Email:</strong> privacy@jetleg.be</p>
                  <p><strong>Telefoon:</strong> +32 2 123 45 67</p>
                  <p><strong>Post:</strong> Jetleg Privacy Officer, Rue de la Loi 1, 1000 Brussel</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Processing */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-title text-foreground mb-8 text-center">
              Hoe wij uw gegevens verwerken
            </h2>
            
            <div className="space-y-8">
              <div className="card-jetleg p-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Rechtsgronden voor verwerking</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Contractuele noodzaak</h4>
                    <p className="text-sm text-muted-foreground">Voor het uitvoeren van onze diensten en contracten met u.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Gerechtvaardigd belang</h4>
                    <p className="text-sm text-muted-foreground">Voor marketing, analytics en verbetering van onze diensten.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Toestemming</h4>
                    <p className="text-sm text-muted-foreground">Voor nieuwsbrieven en niet-essentiële cookies.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Wettelijke verplichting</h4>
                    <p className="text-sm text-muted-foreground">Voor boekhouding en compliance met luchtvaartregels.</p>
                  </div>
                </div>
              </div>
              
              <div className="card-jetleg p-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Internationale overdrachten</h3>
                <p className="text-muted-foreground mb-4">
                  Soms is het nodig om uw gegevens over te dragen naar landen buiten de EU/EER. Dit doen wij alleen wanneer:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Het land een adequaat beschermingsniveau heeft volgens de Europese Commissie</li>
                  <li>Er passende waarborgen zijn getroffen (zoals Standard Contractual Clauses)</li>
                  <li>U uitdrukkelijke toestemming hebt gegeven</li>
                  <li>Het noodzakelijk is voor de uitvoering van uw contract</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Breach */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="card-jetleg p-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Wat doen wij bij een datalek?
              </h2>
              <p className="text-muted-foreground mb-6">
                In het onwaarschijnlijke geval van een datalek, hebben wij strikte procedures om uw gegevens te beschermen:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-accent font-bold">72h</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Melding aan autoriteiten</h4>
                  <p className="text-sm text-muted-foreground">Binnen 72 uur melden wij elk datalek aan de Gegevensbeschermingsautoriteit.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-accent font-bold">24h</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Informatieverstrekking</h4>
                  <p className="text-sm text-muted-foreground">Getroffen gebruikers worden binnen 24 uur geïnformeerd over het incident.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-accent font-bold">0h</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Directe actie</h4>
                  <p className="text-sm text-muted-foreground">Onmiddellijke maatregelen om verdere schade te voorkomen.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DPO Contact */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-title text-foreground mb-4">
              Onze Data Protection Officer
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Voor alle privacy-gerelateerde vragen kunt u direct contact opnemen met onze Data Protection Officer (DPO).
            </p>
            
            <div className="card-jetleg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Sarah De Vries</h3>
                  <p className="text-muted-foreground mb-4">Gecertificeerde Data Protection Officer</p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><strong>Email:</strong> dpo@jetleg.be</p>
                    <p><strong>Telefoon:</strong> +32 2 123 45 68</p>
                    <p><strong>Reactietijd:</strong> Binnen 48 uur</p>
                  </div>
                </div>
                
                <div>
                  <button className="btn-jetleg-primary w-full">
                    Contact DPO
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complaints */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-title text-foreground mb-8 text-center">
              Klacht indienen
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="card-jetleg p-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Bij Jetleg
                </h3>
                <p className="text-muted-foreground mb-6">
                  Heeft u een klacht over hoe wij uw persoonsgegevens behandelen? Neem eerst contact met ons op. Wij lossen de meeste problemen snel en effectief op.
                </p>
                <button className="btn-jetleg-outline w-full">
                  Klacht Indienen
                </button>
              </div>
              
              <div className="card-jetleg p-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Bij de Gegevensbeschermingsautoriteit
                </h3>
                <p className="text-muted-foreground mb-6">
                  U hebt altijd het recht om een klacht in te dienen bij de Belgische Gegevensbeschermingsautoriteit als u niet tevreden bent met onze behandeling van uw gegevens.
                </p>
                <a 
                  href="https://www.gegevensbeschermingsautoriteit.be" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-jetleg-outline w-full block text-center"
                >
                  Naar GBA Website
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GDPR;
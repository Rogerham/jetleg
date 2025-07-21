import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-hero mb-6">
              Privacybeleid
            </h1>
            <p className="text-xl text-white/90">
              Laatste update: 21 juli 2025
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="space-y-8">
              
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Inleiding</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    Jetleg ("wij", "ons", "de website") respecteert uw privacy en zet zich in voor de bescherming van uw persoonsgegevens. Dit privacybeleid informeert u over hoe wij uw persoonsgegevens verzamelen, gebruiken en beschermen wanneer u onze website bezoekt of onze diensten gebruikt.
                  </p>
                  <p>
                    Door gebruik te maken van onze website en diensten, stemt u in met de praktijken die in dit beleid worden beschreven.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Welke gegevens verzamelen wij?</h2>
                <div className="text-muted-foreground space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Persoonlijke identificatiegegevens</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Naam en contactgegevens (e-mailadres, telefoonnummer)</li>
                    <li>Adresgegevens voor facturering en communicatie</li>
                    <li>Reisdocumentgegevens (paspoortnummer, nationaliteit)</li>
                    <li>Betalingsgegevens (creditcard informatie, factuurgegevens)</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-foreground mt-6">Technische gegevens</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>IP-adres en browserinformatie</li>
                    <li>Cookies en vergelijkbare tracking technologieën</li>
                    <li>Website gebruiksgegevens en voorkeuren</li>
                    <li>Apparaat- en connectie-informatie</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-foreground mt-6">Vluchtgerelateerde gegevens</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Zoekgeschiedenis en voorkeuren</li>
                    <li>Boekingsdetails en reishistorie</li>
                    <li>Speciale verzoeken en dieetwensen</li>
                    <li>Feedback en beoordelingen</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Hoe gebruiken wij uw gegevens?</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>Wij gebruiken uw persoonsgegevens voor de volgende doeleinden:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Dienstverlening:</strong> Voor het verwerken van boekingen, betalingen en het leveren van onze diensten</li>
                    <li><strong>Communicatie:</strong> Voor het versturen van boekingsbevestigingen, updates en klantenservice</li>
                    <li><strong>Verbetering:</strong> Voor het analyseren en verbeteren van onze website en diensten</li>
                    <li><strong>Marketing:</strong> Voor het versturen van nieuwsbrieven en promotionele content (met uw toestemming)</li>
                    <li><strong>Juridische verplichtingen:</strong> Voor het naleven van wettelijke vereisten en regelgeving</li>
                    <li><strong>Veiligheid:</strong> Voor het beschermen tegen fraude en misbruik</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Gegevens delen</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>Wij delen uw persoonsgegevens alleen in de volgende situaties:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Vliegtuigoperators:</strong> Voor het uitvoeren van uw geboekte vluchten</li>
                    <li><strong>Betalingsdienstverleners:</strong> Voor het verwerken van betalingen</li>
                    <li><strong>Technische dienstverleners:</strong> Voor website hosting, analytics en klantenservice</li>
                    <li><strong>Juridische vereisten:</strong> Wanneer dit wettelijk verplicht is</li>
                  </ul>
                  <p>
                    Wij verkopen uw persoonsgegevens nooit aan derden voor marketingdoeleinden.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Gegevensbescherming</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>Wij implementeren passende technische en organisatorische maatregelen om uw persoonsgegevens te beschermen:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>SSL-encryptie voor alle datatransmissies</li>
                    <li>Veilige servers met beperkte toegang</li>
                    <li>Regelmatige beveiligingsaudits en updates</li>
                    <li>Getraind personeel met strikte confidentialiteitsverplichtingen</li>
                    <li>Backup- en herstelprotocollen</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Uw rechten</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>Onder de GDPR en andere privacywetten hebt u de volgende rechten:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Recht op toegang:</strong> U kunt inzage vragen in uw persoonsgegevens</li>
                    <li><strong>Recht op rectificatie:</strong> U kunt correctie vragen van onjuiste gegevens</li>
                    <li><strong>Recht op verwijdering:</strong> U kunt verwijdering van uw gegevens vragen</li>
                    <li><strong>Recht op beperking:</strong> U kunt beperking van verwerking vragen</li>
                    <li><strong>Recht op overdracht:</strong> U kunt uw gegevens in een digitaal formaat opvragen</li>
                    <li><strong>Recht van bezwaar:</strong> U kunt bezwaar maken tegen bepaalde verwerkingen</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Cookies</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>Onze website gebruikt cookies voor:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Essentiële functies (inloggen, winkelwagen)</li>
                    <li>Website analytics (Google Analytics)</li>
                    <li>Marketingdoeleinden (met uw toestemming)</li>
                    <li>Personalisatie van content</li>
                  </ul>
                  <p>
                    U kunt uw cookie-voorkeuren beheren via onze cookie-instellingen of uw browserinstellingen.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Bewaartermijnen</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>Wij bewaren uw persoonsgegevens niet langer dan nodig:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Accountgegevens:</strong> Tot 3 jaar na laatste activiteit</li>
                    <li><strong>Boekingsgegevens:</strong> 7 jaar voor boekhoudkundige doeleinden</li>
                    <li><strong>Marketinggegevens:</strong> Tot u zich uitschrijft</li>
                    <li><strong>Website analytics:</strong> 26 maanden</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">9. Wijzigingen in dit beleid</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    Wij kunnen dit privacybeleid van tijd tot tijd bijwerken. Belangrijke wijzigingen worden gecommuniceerd via e-mail of een kennisgeving op onze website. De datum van de laatste update staat bovenaan dit document.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">10. Contact</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>Voor vragen over dit privacybeleid of uw rechten, kunt u contact met ons opnemen:</p>
                  <div className="bg-card p-6 rounded-xl">
                    <p><strong>Jetleg Privacy Team</strong></p>
                    <p>E-mail: privacy@jetleg.be</p>
                    <p>Telefoon: +32 2 123 45 67</p>
                    <p>Adres: Jetleg Belgium, Rue de la Loi 1, 1000 Brussel</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
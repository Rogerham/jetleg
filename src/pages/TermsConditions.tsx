import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';

const TermsConditions = () => {
  const { t } = useTranslation();
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-12 ">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-hero mb-6">
              {t('termsConditions.title')}
            </h1>
            <p className="text-xl text-white/90">
              {t('termsConditions.lastUpdate')}
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="space-y-8">
              
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Definities</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>In deze algemene voorwaarden wordt verstaan onder:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Jetleg:</strong> Jetleg Belgium BVBA, gevestigd te Rue de la Loi 1, 1000 Brussel</li>
                    <li><strong>Platform:</strong> De website www.jetleg.be en bijbehorende applicaties</li>
                    <li><strong>Gebruiker:</strong> Elke persoon die gebruik maakt van het platform</li>
                    <li><strong>Empty Leg:</strong> Een privéjet vlucht zonder passagiers</li>
                    <li><strong>Operator:</strong> De vliegtuigmaatschappij die de vlucht uitvoert</li>
                    <li><strong>Boeking:</strong> Een gereserveerde vlucht via het platform</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Toepasselijkheid</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    Deze algemene voorwaarden zijn van toepassing op alle overeenkomsten tussen Jetleg en gebruikers van het platform. Door gebruik te maken van onze diensten, accepteert u deze voorwaarden volledig.
                  </p>
                  <p>
                    Eventuele afwijkingen van deze voorwaarden zijn alleen geldig indien uitdrukkelijk schriftelijk overeengekomen.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Dienstverlening</h2>
                <div className="text-muted-foreground space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">3.1 Platform functie</h3>
                  <p>
                    Jetleg functioneert als bemiddelingsplatform tussen gebruikers en vliegtuigoperators. Wij faciliteren de boeking van empty leg vluchten maar voeren de vluchten niet zelf uit.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-foreground">3.2 Beschikbaarheid</h3>
                  <p>
                    Alle vluchten zijn onder voorbehoud van beschikbaarheid. Wij garanderen niet dat een aangeboden vlucht daadwerkelijk beschikbaar blijft tot het moment van boeking.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-foreground">3.3 Prijzen</h3>
                  <p>
                    Alle prijzen zijn inclusief BTW maar exclusief eventuele luchthavenbelastingen, catering of andere extra services, tenzij anders vermeld.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Boekingsproces</h2>
                <div className="text-muted-foreground space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">4.1 Boekingsbevestiging</h3>
                  <p>
                    Een boeking is pas definitief na ontvangst van de volledige betaling en schriftelijke bevestiging van zowel Jetleg als de operator.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-foreground">4.2 Reisdocumenten</h3>
                  <p>
                    De gebruiker is verantwoordelijk voor het hebben van geldige reisdocumenten (paspoort, visa, etc.) voor de beoogde bestemming.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-foreground">4.3 Passagiersgegevens</h3>
                  <p>
                    Correcte passagiersgegevens moeten minimaal 24 uur voor vertrek worden verstrekt. Onjuiste gegevens kunnen leiden tot weigering van vervoer.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Betaling</h2>
                <div className="text-muted-foreground space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">5.1 Betalingsvoorwaarden</h3>
                  <p>
                    Betaling dient volledig te worden voldaan op het moment van boeking, tenzij anders overeengekomen. Wij accepteren creditcards, bankoverschrijvingen en andere goedgekeurde betaalmethoden.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-foreground">5.2 Valuta</h3>
                  <p>
                    Alle prijzen worden weergegeven in Euro's (EUR). Bij betalingen in andere valuta's kunnen wisselkoers fluctuaties van toepassing zijn.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Annulering en wijzigingen</h2>
                <div className="text-muted-foreground space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">6.1 Annulering door gebruiker</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Meer dan 24 uur voor vertrek: 25% annuleringskosten</li>
                    <li>12-24 uur voor vertrek: 50% annuleringskosten</li>
                    <li>Minder dan 12 uur voor vertrek: 100% annuleringskosten</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-foreground">6.2 Annulering door operator</h3>
                  <p>
                    Bij annulering door de operator ontvangt u een volledige terugbetaling of alternatieve vluchtopties. Jetleg is niet aansprakelijk voor extra kosten.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-foreground">6.3 Wijzigingen</h3>
                  <p>
                    Wijzigingen zijn beperkt mogelijk en afhankelijk van beschikbaarheid. Voor wijzigingen kunnen extra kosten in rekening worden gebracht.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Aansprakelijkheid</h2>
                <div className="text-muted-foreground space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">7.1 Beperking aansprakelijkheid</h3>
                  <p>
                    Jetleg's aansprakelijkheid is beperkt tot de hoogte van de geboekte vliegprijs. Wij zijn niet aansprakelijk voor indirecte schade, gevolgschade of gederfde winst.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-foreground">7.2 Operator aansprakelijkheid</h3>
                  <p>
                    De vliegtuigoperator is verantwoordelijk voor de uitvoering van de vlucht conform internationale luchtvaartregulaties. Jetleg treedt op als bemiddelaar.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-foreground">7.3 Verzekering</h3>
                  <p>
                    Wij adviseren sterk om een reisverzekering af te sluiten die annulering, medische kosten en bagageverlies dekt.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Baggage</h2>
                <div className="text-muted-foreground space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">8.1 Bagagelimieten</h3>
                  <p>
                    Bagagelimieten variëren per vliegtuigtype en worden aangegeven bij elke vlucht. Extra bagage kan tegen meerprijs worden toegevoegd.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-foreground">8.2 Verboden items</h3>
                  <p>
                    De standaard IATA/ICAO regels voor gevaarlijke goederen zijn van toepassing. Verboden items mogen niet worden meegenomen.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">9. Privacy en gegevensbescherming</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    Voor informatie over hoe wij uw persoonsgegevens verzamelen, gebruiken en beschermen, verwijzen wij naar ons 
                    <a href="/privacy-policy" className="text-accent hover:underline"> Privacybeleid</a>.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">10. Intellectueel eigendom</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    Alle content op het platform, inclusief teksten, afbeeldingen, logo's en software, is eigendom van Jetleg of haar licentiegevers. Reproductie zonder toestemming is verboden.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">11. Toepasselijk recht en geschillen</h2>
                <div className="text-muted-foreground space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">11.1 Toepasselijk recht</h3>
                  <p>
                    Op deze overeenkomst is Belgisch recht van toepassing.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-foreground">11.2 Geschillenbeslechting</h3>
                  <p>
                    Alle geschillen worden voorgelegd aan de bevoegde rechtbank in Brussel, tenzij wettelijke bepalingen anders voorschrijven.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">12. Wijzigingen en slotbepalingen</h2>
                <div className="text-muted-foreground space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">12.1 Wijzigingen voorwaarden</h3>
                  <p>
                    Jetleg behoudt zich het recht voor deze voorwaarden te wijzigen. Gebruikers worden minimaal 30 dagen vooraf geïnformeerd over belangrijke wijzigingen.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-foreground">12.2 Ongeldigheid bepalingen</h3>
                  <p>
                    Indien een bepaling van deze voorwaarden nietig of ongeldig wordt verklaard, blijven de overige bepalingen volledig van kracht.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">13. Contact</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>Voor vragen over deze algemene voorwaarden kunt u contact met ons opnemen:</p>
                  <div className="bg-card p-6 rounded-xl">
                    <p><strong>Jetleg Belgium BVBA</strong></p>
                    <p>E-mail: legal@jetleg.be</p>
                    <p>Telefoon: +32 2 123 45 67</p>
                    <p>Adres: Rue de la Loi 1, 1000 Brussel</p>
                    <p>BTW-nummer: BE0123.456.789</p>
                    <p>Ondernemingsnummer: 0123.456.789</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default TermsConditions;
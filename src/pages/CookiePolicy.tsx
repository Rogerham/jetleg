const CookiePolicy = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-hero mb-6">
              Cookiebeleid
            </h1>
            <p className="text-xl text-white/90">
              Laatste update: 21 juli 2025
            </p>
          </div>
        </div>
      </section>

      {/* Cookie Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="space-y-8">
              
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Wat zijn cookies?</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    Cookies zijn kleine tekstbestanden die op uw apparaat worden opgeslagen wanneer u een website bezoekt. Ze bevatten informatie over uw websitebezoek en helpen ons de functionaliteit en prestaties van onze website te verbeteren.
                  </p>
                  <p>
                    Cookies kunnen niet worden gebruikt om u persoonlijk te identificeren, maar ze kunnen wel informatie over uw browser en voorkeuren opslaan.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Welke cookies gebruiken wij?</h2>
                <div className="text-muted-foreground space-y-6">
                  
                  <div className="bg-card p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-foreground mb-3">Essentiële cookies</h3>
                    <p className="mb-3">Deze cookies zijn noodzakelijk voor het functioneren van de website.</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Sessie cookies:</strong> Voor inloggen en winkelwagen functionaliteit</li>
                      <li><strong>Beveiligings cookies:</strong> Voor bescherming tegen aanvallen</li>
                      <li><strong>Voorkeur cookies:</strong> Voor het onthouden van uw taalvoorkeur</li>
                    </ul>
                    <div className="mt-3 text-sm">
                      <strong>Bewaartermijn:</strong> Sessieduur of tot 1 jaar<br/>
                      <strong>Toestemming vereist:</strong> Nee (functioneel noodzakelijk)
                    </div>
                  </div>

                  <div className="bg-card p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-foreground mb-3">Analytics cookies</h3>
                    <p className="mb-3">Deze cookies helpen ons begrijpen hoe bezoekers onze website gebruiken.</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Google Analytics:</strong> Voor website statistieken en gebruikersgedrag</li>
                      <li><strong>Prestatie cookies:</strong> Voor het meten van laadtijden en errors</li>
                      <li><strong>Heatmap cookies:</strong> Voor het analyseren van klikgedrag</li>
                    </ul>
                    <div className="mt-3 text-sm">
                      <strong>Bewaartermijn:</strong> Tot 26 maanden<br/>
                      <strong>Toestemming vereist:</strong> Ja
                    </div>
                  </div>

                  <div className="bg-card p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-foreground mb-3">Marketing cookies</h3>
                    <p className="mb-3">Deze cookies worden gebruikt voor gepersonaliseerde reclame.</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Facebook Pixel:</strong> Voor retargeting op sociale media</li>
                      <li><strong>Google Ads:</strong> Voor het tonen van relevante advertenties</li>
                      <li><strong>Affiliate cookies:</strong> Voor het bijhouden van verwijzingen</li>
                    </ul>
                    <div className="mt-3 text-sm">
                      <strong>Bewaartermijn:</strong> Tot 12 maanden<br/>
                      <strong>Toestemming vereist:</strong> Ja
                    </div>
                  </div>

                  <div className="bg-card p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-foreground mb-3">Functionele cookies</h3>
                    <p className="mb-3">Deze cookies verbeteren de functionaliteit van de website.</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Chat cookies:</strong> Voor de live chat functionaliteit</li>
                      <li><strong>Video cookies:</strong> Voor het afspelen van embedded video's</li>
                      <li><strong>Social media cookies:</strong> Voor het delen van content</li>
                    </ul>
                    <div className="mt-3 text-sm">
                      <strong>Bewaartermijn:</strong> Tot 6 maanden<br/>
                      <strong>Toestemming vereist:</strong> Ja
                    </div>
                  </div>

                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Third-party cookies</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>Onze website maakt gebruik van diensten van derde partijen die hun eigen cookies kunnen plaatsen:</p>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-card rounded-xl overflow-hidden">
                      <thead>
                        <tr className="bg-muted">
                          <th className="text-left p-4 font-semibold text-foreground">Service</th>
                          <th className="text-left p-4 font-semibold text-foreground">Doel</th>
                          <th className="text-left p-4 font-semibold text-foreground">Privacy Policy</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-border">
                          <td className="p-4">Google Analytics</td>
                          <td className="p-4">Website statistieken</td>
                          <td className="p-4">
                            <a href="https://policies.google.com/privacy" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
                              Google Privacy Policy
                            </a>
                          </td>
                        </tr>
                        <tr className="border-t border-border">
                          <td className="p-4">Facebook</td>
                          <td className="p-4">Social media integratie</td>
                          <td className="p-4">
                            <a href="https://www.facebook.com/privacy/explanation" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
                              Facebook Privacy Policy
                            </a>
                          </td>
                        </tr>
                        <tr className="border-t border-border">
                          <td className="p-4">Stripe</td>
                          <td className="p-4">Betalingsverwerking</td>
                          <td className="p-4">
                            <a href="https://stripe.com/privacy" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
                              Stripe Privacy Policy
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Uw cookie-instellingen beheren</h2>
                <div className="text-muted-foreground space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Via onze website</h3>
                  <p>
                    U kunt uw cookie-voorkeuren aanpassen via de cookie-banner die verschijnt bij uw eerste bezoek, of via de cookie-instellingen link in de footer van onze website.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-foreground">Via uw browser</h3>
                  <p>U kunt cookies ook beheren via uw browserinstellingen:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Chrome:</strong> Instellingen → Privacy en beveiliging → Cookies</li>
                    <li><strong>Firefox:</strong> Instellingen → Privacy & Beveiliging → Cookies</li>
                    <li><strong>Safari:</strong> Voorkeuren → Privacy → Cookies</li>
                    <li><strong>Edge:</strong> Instellingen → Cookies en siterechten</li>
                  </ul>
                  
                  <div className="bg-accent/10 p-6 rounded-xl mt-6">
                    <p className="text-accent font-semibold mb-2">Let op:</p>
                    <p>Het uitschakelen van essentiële cookies kan de functionaliteit van onze website beïnvloeden. Sommige functies werken mogelijk niet correct zonder cookies.</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Do Not Track</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    Onze website respecteert "Do Not Track" signalen van uw browser. Wanneer deze instelling is geactiveerd, plaatsen wij geen tracking cookies voor marketing doeleinden.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Bewaartermijnen</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>Verschillende cookies hebben verschillende bewaartermijnen:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Sessie cookies:</strong> Worden verwijderd wanneer u uw browser sluit</li>
                    <li><strong>Persistente cookies:</strong> Blijven opgeslagen voor een bepaalde periode</li>
                    <li><strong>Analytics cookies:</strong> Maximum 26 maanden</li>
                    <li><strong>Marketing cookies:</strong> Maximum 12 maanden</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Wijzigingen in dit cookiebeleid</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    Wij kunnen dit cookiebeleid van tijd tot tijd bijwerken om wijzigingen in onze praktijken of wet- en regelgeving te reflecteren. Controleer deze pagina regelmatig voor updates.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Contact</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>Voor vragen over ons cookiebeleid kunt u contact met ons opnemen:</p>
                  <div className="bg-card p-6 rounded-xl">
                    <p><strong>Jetleg Privacy Team</strong></p>
                    <p>E-mail: privacy@jetleg.be</p>
                    <p>Telefoon: +32 2 123 45 67</p>
                    <p>Adres: Rue de la Loi 1, 1000 Brussel</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Cookie Settings CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-title text-foreground mb-4">
              Cookie-instellingen beheren
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Pas uw cookie-voorkeuren aan volgens uw wensen.
            </p>
            <button className="btn-jetleg-primary">
              Cookie-instellingen openen
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CookiePolicy;
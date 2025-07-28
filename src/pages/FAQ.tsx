import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const faqCategories = [{
    title: "Algemeen",
    faqs: [{
      question: "Wat is Jetleg?",
      answer: "Jetleg is een platform dat gespecialiseerd is in empty leg vluchten - privéjet vluchten die anders leeg zouden vliegen. Wij bieden deze vluchten aan tegen sterk gereduceerde prijzen, waardoor privéjet reizen toegankelijker wordt."
    }, {
      question: "Wat is een empty leg vlucht?",
      answer: "Een empty leg vlucht ontstaat wanneer een privéjet moet terugkeren naar zijn basis zonder passagiers, of moet verplaatsen naar een nieuwe locatie voor de volgende klant. In plaats van leeg te vliegen, bieden operators deze vluchten aan tegen gereduceerde prijzen."
    }, {
      question: "Hoe groot zijn de besparingen?",
      answer: "Empty leg vluchten kunnen tot 75% goedkoper zijn dan reguliere privéjet charters. De exacte besparingen hangen af van de route, het vliegtuigtype en de timing van de vlucht."
    }, {
      question: "Is Jetleg veilig?",
      answer: "Absoluut. Alle vluchten worden uitgevoerd door gecertificeerde operators die voldoen aan de hoogste veiligheidsnormen. Onze partners hebben alle benodigde licenties en certificeringen voor commerciële vluchten."
    }]
  }, {
    title: "Boeken en Betalen",
    faqs: [{
      question: "Hoe boek ik een vlucht?",
      answer: "Het boeken is eenvoudig: zoek een vlucht op onze website, selecteer je gewenste optie, vul je gegevens in en betaal veilig online. Je ontvangt direct een bevestiging per email."
    }, {
      question: "Welke betaalmethoden accepteren jullie?",
      answer: "Wij accepteren alle gangbare creditcards (Visa, Mastercard, American Express), iDEAL, bankoverschrijving en andere lokale betaalmethoden afhankelijk van je locatie."
    }, {
      question: "Kan ik mijn boeking annuleren?",
      answer: "Annuleringsvoorwaarden variëren per vlucht en operator. Over het algemeen zijn empty legs minder flexibel dan reguliere charters. Controleer altijd de specifieke voorwaarden bij het boeken."
    }, {
      question: "Krijg ik een factuur?",
      answer: "Ja, na betaling ontvang je automatisch een factuur per email. Voor bedrijfsboekingen kunnen we aangepaste facturen verstrekken met je bedrijfsgegevens."
    }]
  }, {
    title: "Vluchtdetails",
    faqs: [{
      question: "Hoe ver van tevoren zijn empty legs beschikbaar?",
      answer: "Empty legs zijn vaak last-minute beschikbaar, van enkele uren tot maximaal 2 weken van tevoren. De meeste deals worden 24-72 uur vooraf gepubliceerd."
    }, {
      question: "Kan ik de vertrektijd wijzigen?",
      answer: "Beperkte flexibiliteit is mogelijk, maar wijzigingen zijn afhankelijk van de operator en het vliegschema. Kleine aanpassingen (1-2 uur) zijn soms mogelijk tegen meerprijs."
    }, {
      question: "Wat gebeurt er bij slecht weer?",
      answer: "Bij slecht weer volgen we standaard luchtvaartprotocollen. Vluchten kunnen worden uitgesteld of geannuleerd voor je veiligheid. In dat geval krijg je een volledige terugbetaling of alternatieve opties."
    }, {
      question: "Zijn maaltijden en drankjes inbegrepen?",
      answer: "Standaard catering is meestal inbegrepen. Voor speciale dieetwensen of premium catering kunnen extra kosten gelden. Dit wordt duidelijk aangegeven bij het boeken."
    }]
  }, {
    title: "Praktische zaken",
    faqs: [{
      question: "Hoeveel bagage mag ik meenemen?",
      answer: "Bagagelimieten variëren per vliegtuigtype. Doorgaans is 20-30kg handbagage en 20-50kg ruimbagage toegestaan. Exacte limieten zie je bij de vluchtdetails."
    }, {
      question: "Moet ik vroeger inchecken?",
      answer: "Voor privéjets is inchecken veel sneller. Kom 15-30 minuten voor vertrek aan bij de terminal. Op kleinere luchthavens kan dit nog korter zijn."
    }, {
      question: "Kan ik mijn huisdier meenemen?",
      answer: "Huisdieren zijn vaak toegestaan op privéjets, afhankelijk van de operator en bestemming. Informeer bij het boeken naar de specifieke regels en eventuele extra kosten."
    }, {
      question: "Welke documenten heb ik nodig?",
      answer: "Je hebt een geldig paspoort nodig voor internationale vluchten en een identiteitskaart voor binnenlandse vluchten. Controleer visa-vereisten voor je bestemming."
    }]
  }];
  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-12 ">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-hero mb-6">
              Veelgestelde Vragen
            </h1>
            <p className="text-xl text-white/90">
              Vind antwoorden op de meest gestelde vragen over empty leg vluchten en ons platform.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {faqCategories.map((category, categoryIndex) => <div key={categoryIndex} className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-8">
                  {category.title}
                </h2>
                
                <div className="space-y-4">
                  {category.faqs.map((faq, faqIndex) => {
                const globalIndex = categoryIndex * 100 + faqIndex;
                const isOpen = openFAQ === globalIndex;
                return <div key={faqIndex} className="card-jetleg overflow-hidden">
                        <button onClick={() => toggleFAQ(globalIndex)} className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/30 transition-colors">
                          <h3 className="text-lg font-semibold text-foreground pr-4">
                            {faq.question}
                          </h3>
                          {isOpen ? <Minus className="h-5 w-5 text-accent flex-shrink-0" /> : <Plus className="h-5 w-5 text-accent flex-shrink-0" />}
                        </button>
                        
                        {isOpen && <div className="px-6 pb-6">
                            <div className="text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </div>
                          </div>}
                      </div>;
              })}
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-title text-foreground mb-4">
              Nog vragen?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Ons customer service team staat klaar om je te helpen. Neem contact met ons op voor persoonlijke ondersteuning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-jetleg-primary">
                Neem Contact Op
              </a>
              <a href="/customer-service" className="btn-jetleg-outline">
                Klantenservice
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default FAQ;

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FAQ = () => {
  const { t } = useTranslation();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  
  const faqCategories = [
    {
      title: t('faq.categories.general.title'),
      faqs: [
        {
          question: t('faq.categories.general.questions.0'),
          answer: t('faq.categories.general.answers.0')
        },
        {
          question: t('faq.categories.general.questions.1'),
          answer: t('faq.categories.general.answers.1')
        },
        {
          question: t('faq.categories.general.questions.2'),
          answer: t('faq.categories.general.answers.2')
        },
        {
          question: t('faq.categories.general.questions.3'),
          answer: t('faq.categories.general.answers.3')
        }
      ]
    },
    {
      title: t('faq.categories.booking.title'),
      faqs: [
        {
          question: t('faq.categories.booking.questions.0'),
          answer: t('faq.categories.booking.answers.0')
        },
        {
          question: t('faq.categories.booking.questions.1'),
          answer: t('faq.categories.booking.answers.1')
        },
        {
          question: t('faq.categories.booking.questions.2'),
          answer: t('faq.categories.booking.answers.2')
        },
        {
          question: t('faq.categories.booking.questions.3'),
          answer: t('faq.categories.booking.answers.3')
        }
      ]
    },
    {
      title: t('faq.categories.flights.title'),
      faqs: [
        {
          question: t('faq.categories.flights.questions.0'),
          answer: t('faq.categories.flights.answers.0')
        },
        {
          question: t('faq.categories.flights.questions.1'),
          answer: t('faq.categories.flights.answers.1')
        },
        {
          question: t('faq.categories.flights.questions.2'),
          answer: t('faq.categories.flights.answers.2')
        },
        {
          question: t('faq.categories.flights.questions.3'),
          answer: t('faq.categories.flights.answers.3')
        }
      ]
    },
    {
      title: t('faq.categories.practical.title'),
      faqs: [
        {
          question: t('faq.categories.practical.questions.0'),
          answer: t('faq.categories.practical.answers.0')
        },
        {
          question: t('faq.categories.practical.questions.1'),
          answer: t('faq.categories.practical.answers.1')
        },
        {
          question: t('faq.categories.practical.questions.2'),
          answer: t('faq.categories.practical.answers.2')
        },
        {
          question: t('faq.categories.practical.questions.3'),
          answer: t('faq.categories.practical.answers.3')
        }
      ]
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Standardized Page Header */}
      <PageHeader
        title={t('faq.hero.title')}
        subtitle={t('faq.hero.subtitle')}
      />

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
    </div>
  );
};

export default FAQ;

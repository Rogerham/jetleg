
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import TimelineContainer from '@/components/TimelineContainer';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HowItWorks = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleFAQClick = () => {
    navigate('/faq');
  };

  const faqs = [
    {
      question: t('howItWorks.faq.questions.0'),
      answer: t('howItWorks.faq.answers.0')
    },
    {
      question: t('howItWorks.faq.questions.1'),
      answer: t('howItWorks.faq.answers.1')
    },
    {
      question: t('howItWorks.faq.questions.2'),
      answer: t('howItWorks.faq.answers.2')
    },
    {
      question: t('howItWorks.faq.questions.3'),
      answer: t('howItWorks.faq.answers.3')
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-hero mb-6 animate-fade-in">
              {t('howItWorks.hero.title')}
            </h1>
            <p className="text-xl text-white/90 mb-8 animate-fade-in">
              {t('howItWorks.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <TimelineContainer />

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-title text-foreground mb-4">
              {t('howItWorks.faq.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('howItWorks.faq.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="card-jetleg p-6">
                <h3 className="font-semibold text-foreground mb-3">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button onClick={handleFAQClick} className="btn-jetleg-primary">
              {t('howItWorks.faq.viewAll')}
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-title text-foreground mb-4">
              {t('howItWorks.cta.title')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t('howItWorks.cta.subtitle')}
            </p>
            <a href="/" className="btn-jetleg-primary">
              {t('howItWorks.cta.button')}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;

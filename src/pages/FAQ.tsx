import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { ChevronDown, Search } from 'lucide-react';

const FAQ = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const faqData = [
    {
      id: '1',
      question: t('faq.questions.q1'),
      answer: t('faq.answers.a1'),
    },
    {
      id: '2',
      question: t('faq.questions.q2'),
      answer: t('faq.answers.a2'),
    },
    {
      id: '3',
      question: t('faq.questions.q3'),
      answer: t('faq.answers.a3'),
    },
    {
      id: '4',
      question: t('faq.questions.q4'),
      answer: t('faq.answers.a4'),
    },
    {
      id: '5',
      question: t('faq.questions.q5'),
      answer: t('faq.answers.a5'),
    },
    {
      id: '6',
      question: t('faq.questions.q6'),
      answer: t('faq.answers.a6'),
    },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleAccordion = (id: string) => {
    setExpanded((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const filteredFaqs = faqData.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Breadcrumb Section */}
        <section className="py-6 bg-muted/20">
          <div className="container mx-auto px-6">
            <PageBreadcrumb 
              items={[
                { label: 'FAQ' }
              ]}
            />
          </div>
        </section>

        {/* Hero Section */}
        <section className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              {t('faq.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('faq.subtitle')}
            </p>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-8 bg-muted/50">
          <div className="container mx-auto px-6">
            <div className="relative">
              <input
                type="text"
                placeholder={t('faq.searchPlaceholder')}
                className="w-full px-4 py-3 rounded-full border border-input bg-background shadow-sm focus:outline-none focus:border-accent text-sm md:text-base"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Items */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="space-y-4">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => (
                  <div key={faq.id} className="bg-card rounded-lg shadow-md overflow-hidden">
                    <button
                      className="flex items-center justify-between w-full p-4 text-left text-base font-medium text-foreground focus:outline-none transition-colors hover:bg-muted"
                      onClick={() => toggleAccordion(faq.id)}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${expanded[faq.id] ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {expanded[faq.id] && (
                      <div className="p-4 border-t border-border text-sm text-muted-foreground">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground">
                  {t('faq.noResults')}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;

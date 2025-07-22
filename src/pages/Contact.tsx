import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError('');

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setSubmitError(t('contact.submitError') || 'Er is een fout opgetreden. Probeer het later opnieuw.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Breadcrumb Section */}
        <section className="py-6 bg-muted/20">
          <div className="container mx-auto px-6">
            <PageBreadcrumb 
              items={[
                { label: t('nav.contact') }
              ]}
            />
          </div>
        </section>

        {/* Hero Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">
            <h1 className="text-title text-foreground mb-6">{t('contact.title')}</h1>
            <p className="text-lg text-muted-foreground mb-12">{t('contact.description')}</p>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-accent" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t('contact.email')}</h3>
                  <p className="text-muted-foreground">info@jetleg.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-accent" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t('contact.phone')}</h3>
                  <p className="text-muted-foreground">+31 20 123 4567</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-accent" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t('contact.address')}</h3>
                  <p className="text-muted-foreground">Keizersgracht 123, 1015 CJ Amsterdam</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="h-6 w-6 text-accent" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t('contact.openingHours')}</h3>
                  <p className="text-muted-foreground">{t('contact.openingHoursDetails')}</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                    {t('contact.form.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder={t('contact.form.namePlaceholder')}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                    {t('contact.form.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder={t('contact.form.emailPlaceholder')}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1">
                  {t('contact.form.subject')}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder={t('contact.form.subjectPlaceholder')}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder={t('contact.form.messagePlaceholder')}
                />
              </div>

              {submitError && (
                <p className="text-destructive text-sm">{submitError}</p>
              )}
              {submitSuccess && (
                <p className="text-green-600 text-sm">{t('contact.submitSuccess')}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-jetleg-primary inline-flex items-center gap-2"
              >
                <Send className="h-5 w-5" />
                {isSubmitting ? t('contact.sending') : t('contact.sendMessage')}
              </button>
            </form>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;

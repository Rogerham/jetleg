
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
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
      title: t('contact.info.phone.title'),
      details: t('contact.info.phone.details', { returnObjects: true }) as string[]
    },
    {
      icon: Mail,
      title: t('contact.info.email.title'),
      details: t('contact.info.email.details', { returnObjects: true }) as string[]
    },
    {
      icon: MapPin,
      title: t('contact.info.address.title'),
      details: t('contact.info.address.details', { returnObjects: true }) as string[]
    },
    {
      icon: Clock,
      title: t('contact.info.hours.title'),
      details: t('contact.info.hours.details', { returnObjects: true }) as string[]
    }
  ];

  const subjects = t('contact.form.subjects', { returnObjects: true }) as string[];

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
        title: t('contact.validation.incomplete'),
        description: t('contact.validation.fillRequired'),
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: t('contact.validation.success'),
      description: t('contact.validation.response'),
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
          <h1 className="text-hero mb-6">{t('contact.hero.title')}</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {t('contact.hero.subtitle')}
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
              <h2 className="text-2xl font-semibold text-foreground mb-6">{t('contact.form.title')}</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('contact.form.name')} {t('contact.form.required')}
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
                      {t('contact.form.email')} {t('contact.form.required')}
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
                      {t('contact.form.phone')}
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
                      {t('contact.form.subject')}
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="input-jetleg"
                    >
                      <option value="">{t('contact.form.selectSubject')}</option>
                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.form.message')} {t('contact.form.required')}
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={6}
                    className="input-jetleg resize-none"
                    placeholder={t('contact.form.messagePlaceholder')}
                    required
                  />
                </div>

                <button type="submit" className="btn-jetleg-primary w-full flex items-center justify-center gap-2">
                  <Send className="h-5 w-5" />
                  {t('contact.form.submit')}
                </button>
              </form>
            </div>

            {/* Additional Info */}
            <div className="space-y-8">
              {/* FAQ Quick Links */}
              <div className="card-jetleg p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-accent" />
                  {t('contact.faq.title')}
                </h3>
                <div className="space-y-3">
                  {(t('contact.faq.questions', { returnObjects: true }) as string[]).map((question, index) => (
                    <a key={index} href="#" className="block text-muted-foreground hover:text-accent transition-colors">
                      {question}
                    </a>
                  ))}
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="card-jetleg p-6 bg-destructive/5 border-destructive/20">
                <h3 className="font-semibold text-foreground mb-4">{t('contact.emergency.title')}</h3>
                <p className="text-muted-foreground mb-3">
                  {t('contact.emergency.description')}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-destructive" />
                    <span className="font-medium text-foreground">{t('contact.emergency.phone')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-destructive" />
                    <span className="font-medium text-foreground">{t('contact.emergency.email')}</span>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="card-jetleg p-6">
                <h3 className="font-semibold text-foreground mb-4">{t('contact.location.title')}</h3>
                <div className="bg-muted/30 h-48 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground whitespace-pre-line">
                      {t('contact.location.address')}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  {t('contact.location.note')}
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

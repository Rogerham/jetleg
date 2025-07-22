
import { Plane, DollarSign, Clock, Shield } from 'lucide-react';
import jetInteriorImage from '@/assets/jet-interior.jpg';
import { useTranslation } from 'react-i18next';

const HowItWorks = () => {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: DollarSign,
      title: t('howItWorks.benefits.savings.title'),
      description: t('howItWorks.benefits.savings.description')
    },
    {
      icon: Clock,
      title: t('howItWorks.benefits.availability.title'),
      description: t('howItWorks.benefits.availability.description')
    },
    {
      icon: Plane,
      title: t('howItWorks.benefits.premium.title'),
      description: t('howItWorks.benefits.premium.description')
    },
    {
      icon: Shield,
      title: t('howItWorks.benefits.reliable.title'),
      description: t('howItWorks.benefits.reliable.description')
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-title text-foreground mb-6">
            {t('howItWorks.title')}
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          <div className="animate-fade-in">
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p dangerouslySetInnerHTML={{ __html: t('howItWorks.description1') }} />
              <p dangerouslySetInnerHTML={{ __html: t('howItWorks.description2') }} />
              <p dangerouslySetInnerHTML={{ __html: t('howItWorks.description3') }} />
            </div>
          </div>
          
          <div className="animate-fade-in flex justify-center lg:justify-end">
            <div className="max-w-md w-full">
              <img 
                src={jetInteriorImage} 
                alt="Luxe interieur van een privéjet" 
                className="w-full h-64 sm:h-80 lg:h-64 object-cover rounded-2xl shadow-2xl animate-scale-hover" 
              />
            </div>
          </div>
        </div>
        
        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center p-6 bg-muted/20 rounded-2xl card-jetleg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                <benefit.icon className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

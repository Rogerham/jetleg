import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password, name);
       toast({
        title: "Registratie Succesvol",
        description: "Je account is aangemaakt. Je wordt ingelogd.",
      });
      navigate('/profile');
    } catch (error) {
       toast({
        title: "Registratie Mislukt",
        description: "Er is een fout opgetreden. Probeer het opnieuw.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-md w-full space-y-8 card-jetleg p-10">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
            {t('register.title')}
          </h2>
           <p className="mt-2 text-center text-sm text-muted-foreground">
            {t('register.or')} {' '}
            <Link to="/login" className="font-medium text-accent hover:text-accent-dark">
              {t('register.signIn')}
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">{t('register.name')}</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="input-jetleg rounded-t-md"
                placeholder={t('register.name')}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">{t('register.email')}</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input-jetleg"
                placeholder={t('register.email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">{t('register.password')}</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="input-jetleg rounded-b-md"
                placeholder={t('register.password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button type="submit" className="btn-jetleg-primary w-full">
              {t('register.createAccount')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
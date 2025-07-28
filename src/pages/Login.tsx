import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast({
        title: "Login Succesvol",
        description: "Je wordt doorgestuurd naar je profiel.",
      });
      navigate('/profile');
    } catch (error) {
      toast({
        title: "Login Mislukt",
        description: "Controleer je e-mail en wachtwoord.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-md w-full space-y-8 card-jetleg p-10">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
            {t('login.title')}
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            {t('login.or')} {' '}
            <Link to="/register" className="font-medium text-accent hover:text-accent-dark">
              {t('login.createAccount')}
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">{t('login.email')}</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input-jetleg rounded-t-md"
                placeholder={t('login.email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">{t('login.password')}</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="input-jetleg rounded-b-md"
                placeholder={t('login.password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground">
                {t('login.rememberMe')}
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-accent hover:text-accent-dark">
                {t('login.forgotPassword')}
              </a>
            </div>
          </div>

          <div>
            <button type="submit" className="btn-jetleg-primary w-full">
              {t('login.signIn')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

import { useTranslation } from 'react-i18next';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface ValidationError {
  field: string;
  message: string;
}

interface SearchFormValidationProps {
  errors: ValidationError[];
  onDismiss: () => void;
}

const SearchFormValidation = ({ errors, onDismiss }: SearchFormValidationProps) => {
  const { t } = useTranslation();

  if (errors.length === 0) return null;

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        <div className="space-y-1">
          {errors.map((error, index) => (
            <div key={index}>{error.message}</div>
          ))}
        </div>
        <button
          onClick={onDismiss}
          className="mt-2 text-sm underline hover:no-underline"
        >
          {t('common.dismiss')}
        </button>
      </AlertDescription>
    </Alert>
  );
};

export default SearchFormValidation;

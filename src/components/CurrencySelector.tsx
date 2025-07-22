
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';

const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  const currencies = [
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
  ];

  const currentCurrency = currencies.find(c => c.code === currency) || currencies[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-primary-foreground/80 hover:text-accent transition-colors"
      >
        <span>{currentCurrency.symbol} {currentCurrency.code}</span>
        <ChevronDown className="h-3 w-3" />
      </button>

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 bg-card border border-border rounded-lg shadow-lg min-w-[120px] z-50">
          {currencies.map((curr) => (
            <button
              key={curr.code}
              onClick={() => {
                setCurrency(curr.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-accent/10 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                currency === curr.code ? 'bg-accent/20 text-accent font-medium' : 'text-foreground'
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{curr.symbol}</span>
                <span>{curr.code}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;

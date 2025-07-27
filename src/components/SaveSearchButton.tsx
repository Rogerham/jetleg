
import { useState } from 'react';
import { Heart, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useSavedSearches } from '@/hooks/useSavedSearches';
import AlertPreferencesDialog from './AlertPreferencesDialog';

interface SaveSearchButtonProps {
  searchCriteria: {
    from: string;
    to: string;
    date: string;
    passengers: string;
    filters?: any;
  };
}

const SaveSearchButton = ({ searchCriteria }: SaveSearchButtonProps) => {
  const { saveSearch, isSaving } = useSavedSearches();
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [savedSearchId, setSavedSearchId] = useState<string | null>(null);

  const handleSaveSearch = async () => {
    try {
      const savedSearch = await saveSearch(searchCriteria);
      setSavedSearchId(savedSearch.id);
      setShowAlertDialog(true);
    } catch (error) {
      console.error('Failed to save search:', error);
    }
  };

  return (
    <>
      <button 
        onClick={handleSaveSearch}
        disabled={isSaving}
        className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-accent hover:text-accent/80 border border-accent/20 hover:border-accent/40 rounded-full bg-accent/5 hover:bg-accent/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Heart className="h-4 w-4 group-hover:scale-110 transition-transform" />
        <span>{isSaving ? 'Opslaan...' : 'Zoekopdracht opslaan'}</span>
      </button>

      <AlertPreferencesDialog
        isOpen={showAlertDialog}
        onClose={() => setShowAlertDialog(false)}
        savedSearchId={savedSearchId}
      />
    </>
  );
};

export default SaveSearchButton;

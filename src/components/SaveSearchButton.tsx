
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
      <Button 
        variant="outline" 
        onClick={handleSaveSearch}
        disabled={isSaving}
        className="flex items-center gap-2"
      >
        <Heart className="h-4 w-4" />
        {isSaving ? 'Saving...' : 'Save Search'}
      </Button>

      <AlertPreferencesDialog
        isOpen={showAlertDialog}
        onClose={() => setShowAlertDialog(false)}
        savedSearchId={savedSearchId}
      />
    </>
  );
};

export default SaveSearchButton;

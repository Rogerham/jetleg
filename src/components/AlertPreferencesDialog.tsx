
import { useState, useEffect } from 'react';
import { Bell, Info, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAlertPreferences } from '@/hooks/useSavedSearches';

interface AlertPreferencesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  savedSearchId: string | null;
}

const AlertPreferencesDialog = ({ isOpen, onClose, savedSearchId }: AlertPreferencesDialogProps) => {
  const { alertPreferences, saveAlertPreferences, isSaving } = useAlertPreferences(savedSearchId || undefined);
  
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [phoneNotifications, setPhoneNotifications] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (alertPreferences) {
      setEmailNotifications(alertPreferences.email_notifications);
      setPhoneNotifications(alertPreferences.phone_notifications);
      setEmailAddress(alertPreferences.email_address || '');
      setPhoneNumber(alertPreferences.phone_number || '');
    }
  }, [alertPreferences]);

  const handleSave = async () => {
    if (!savedSearchId) return;

    try {
      await saveAlertPreferences({
        saved_search_id: savedSearchId,
        email_notifications: emailNotifications,
        phone_notifications: phoneNotifications,
        email_address: emailNotifications ? emailAddress : null,
        phone_number: phoneNotifications ? phoneNumber : null
      });
      onClose();
    } catch (error) {
      console.error('Failed to save alert preferences:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-accent" />
            Set Up Flight Alerts
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Get notified when new empty leg flights matching your search criteria become available. 
                    This helps you find the best deals on private jet flights.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Your search has been saved! Now configure how you'd like to be notified about new flight opportunities.
          </p>

          {/* Email Notifications */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications" className="text-sm font-medium">
                Email Notifications
              </Label>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            {emailNotifications && (
              <Input
                type="email"
                placeholder="Enter your email address"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                className="text-sm"
              />
            )}
          </div>

          {/* Phone Notifications */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="phone-notifications" className="text-sm font-medium">
                SMS Notifications
              </Label>
              <Switch
                id="phone-notifications"
                checked={phoneNotifications}
                onCheckedChange={setPhoneNotifications}
              />
            </div>
            {phoneNotifications && (
              <Input
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="text-sm"
              />
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Skip for Now
            </Button>
            <Button 
              onClick={handleSave}
              disabled={isSaving || (!emailNotifications && !phoneNotifications)}
            >
              {isSaving ? 'Saving...' : 'Save Preferences'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AlertPreferencesDialog;

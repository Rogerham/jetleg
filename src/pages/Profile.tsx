
import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface ProfileData {
  first_name: string;
  last_name: string;
  phone: string;
  created_at: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData>({
    first_name: '',
    last_name: '',
    phone: '',
    created_at: ''
  });
  const [editData, setEditData] = useState<ProfileData>({
    first_name: '',
    last_name: '',
    phone: '',
    created_at: ''
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          toast.error('Fout bij het laden van profielgegevens');
        } else if (data) {
          setProfileData(data);
          setEditData(data);
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Er is een fout opgetreden');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: editData.first_name,
          last_name: editData.last_name,
          phone: editData.phone,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating profile:', error);
        toast.error('Fout bij het opslaan van profielgegevens');
      } else {
        setProfileData(editData);
        setIsEditing(false);
        toast.success('Profiel succesvol bijgewerkt');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Er is een fout opgetreden bij het opslaan');
    }
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-6 py-16">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
              <p className="text-muted-foreground">Profiel laden...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Mijn Profiel</h1>
              <p className="text-muted-foreground">Beheer je persoonlijke informatie en voorkeuren</p>
            </div>
            
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="btn-jetleg-outline flex items-center gap-2"
              >
                <Edit2 className="h-4 w-4" />
                Bewerken
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="btn-jetleg-primary flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Opslaan
                </button>
                <button
                  onClick={handleCancel}
                  className="btn-jetleg-outline flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Annuleren
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="card-jetleg p-6 text-center">
                <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-12 w-12 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {profileData.first_name} {profileData.last_name}
                </h3>
                <p className="text-muted-foreground mb-4">{user.email}</p>
                <div className="text-sm text-muted-foreground">
                  Lid sinds {profileData.created_at ? new Date(profileData.created_at).toLocaleDateString('nl-NL', { 
                    year: 'numeric', 
                    month: 'long' 
                  }) : 'onbekend'}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <div className="card-jetleg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Persoonlijke Informatie</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Voornaam</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.first_name}
                        onChange={(e) => handleInputChange('first_name', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent"
                      />
                    ) : (
                      <p className="text-foreground">{profileData.first_name || 'Niet ingesteld'}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Achternaam</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.last_name}
                        onChange={(e) => handleInputChange('last_name', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent"
                      />
                    ) : (
                      <p className="text-foreground">{profileData.last_name || 'Niet ingesteld'}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">E-mail</label>
                    <p className="text-foreground flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {user.email}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">E-mail kan niet worden gewijzigd</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Telefoon</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent"
                      />
                    ) : (
                      <p className="text-foreground flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        {profileData.phone || 'Niet ingesteld'}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="card-jetleg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Account Informatie
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">Account aangemaakt</span>
                    <span className="text-muted-foreground">
                      {profileData.created_at ? new Date(profileData.created_at).toLocaleDateString('nl-NL') : 'Onbekend'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">E-mail geverifieerd</span>
                    <span className="text-muted-foreground">
                      {user.email_confirmed_at ? 'Ja' : 'Nee'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;

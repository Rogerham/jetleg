
import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Jan',
    lastName: 'Janssen',
    email: 'jan.janssen@email.com',
    phone: '+32 123 456 789',
    dateOfBirth: '1985-06-15',
    address: {
      street: 'Voorbeeldstraat 123',
      city: 'Brussel',
      postalCode: '1000',
      country: 'België'
    },
    preferences: {
      currency: 'EUR',
      language: 'nl',
      notifications: true
    }
  });

  const [editData, setEditData] = useState(profileData);

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith('address.')) {
      const addressField = field.split('.')[1];
      setEditData(prev => ({
        ...prev,
        address: { ...prev.address, [addressField]: value }
      }));
    } else if (field.startsWith('preferences.')) {
      const prefField = field.split('.')[1];
      setEditData(prev => ({
        ...prev,
        preferences: { ...prev.preferences, [prefField]: value === 'true' ? true : false }
      }));
    } else {
      setEditData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

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
                  {profileData.firstName} {profileData.lastName}
                </h3>
                <p className="text-muted-foreground mb-4">{profileData.email}</p>
                <div className="text-sm text-muted-foreground">
                  Lid sinds december 2023
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
                        value={editData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent"
                      />
                    ) : (
                      <p className="text-foreground">{profileData.firstName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Achternaam</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent"
                      />
                    ) : (
                      <p className="text-foreground">{profileData.lastName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">E-mail</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent"
                      />
                    ) : (
                      <p className="text-foreground flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        {profileData.email}
                      </p>
                    )}
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
                        {profileData.phone}
                      </p>
                    )}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">Geboortedatum</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent"
                      />
                    ) : (
                      <p className="text-foreground flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {new Date(profileData.dateOfBirth).toLocaleDateString('nl-NL')}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="card-jetleg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Adres
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">Straat</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.address.street}
                        onChange={(e) => handleInputChange('address.street', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent"
                      />
                    ) : (
                      <p className="text-foreground">{profileData.address.street}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Postcode</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.address.postalCode}
                        onChange={(e) => handleInputChange('address.postalCode', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent"
                      />
                    ) : (
                      <p className="text-foreground">{profileData.address.postalCode}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Stad</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.address.city}
                        onChange={(e) => handleInputChange('address.city', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent"
                      />
                    ) : (
                      <p className="text-foreground">{profileData.address.city}</p>
                    )}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">Land</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.address.country}
                        onChange={(e) => handleInputChange('address.country', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent"
                      />
                    ) : (
                      <p className="text-foreground">{profileData.address.country}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div className="card-jetleg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Voorkeuren</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">E-mail notificaties</span>
                    {isEditing ? (
                      <select
                        value={editData.preferences.notifications.toString()}
                        onChange={(e) => handleInputChange('preferences.notifications', e.target.value)}
                        className="px-3 py-1 border border-border rounded bg-background text-foreground"
                      >
                        <option value="true">Aan</option>
                        <option value="false">Uit</option>
                      </select>
                    ) : (
                      <span className="text-muted-foreground">
                        {profileData.preferences.notifications ? 'Aan' : 'Uit'}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">Valuta</span>
                    <span className="text-muted-foreground">EUR (€)</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">Taal</span>
                    <span className="text-muted-foreground">Nederlands</span>
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

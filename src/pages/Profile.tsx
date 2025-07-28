
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, Edit, Save, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user?.user_metadata?.first_name || 'John',
        lastName: user?.user_metadata?.last_name || 'Doe',
        email: user?.email || 'john.doe@example.com',
        phone: user?.user_metadata?.phone || '+32 499 99 99 99',
    });

    if (!user) {
        navigate('/login');
        return null;
    }

    const handleLogout = async () => {
        await signOut();
        navigate('/');
        toast({ title: "Succesvol uitgelogd." });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        // Here you would typically call an API to update the user's profile
        console.log("Saving data:", formData);
        setIsEditing(false);
        toast({ title: "Profiel bijgewerkt", description: "Je gegevens zijn opgeslagen." });
    };

    return (
        <div className="container mx-auto px-6 py-16">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-foreground">Mijn Profiel</h1>
                    <button
                        onClick={handleLogout}
                        className="btn-jetleg-outline flex items-center gap-2"
                    >
                        <LogOut className="h-4 w-4" />
                        Uitloggen
                    </button>
                </div>

                <div className="card-jetleg p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-1 text-center">
                            <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-accent/10 flex items-center justify-center">
                                <User className="w-16 h-16 text-accent" />
                            </div>
                            <h2 className="text-2xl font-semibold text-foreground">{formData.firstName} {formData.lastName}</h2>
                            <p className="text-muted-foreground">{formData.email}</p>
                        </div>

                        <div className="md:col-span-2 space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-semibold text-foreground">Persoonlijke Gegevens</h3>
                                <button onClick={() => isEditing ? handleSave() : setIsEditing(true)} className="btn-jetleg-primary flex items-center gap-2">
                                    {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                                    {isEditing ? 'Opslaan' : 'Bewerken'}
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        <User className="w-4 h-4 inline mr-2" />
                                        Voornaam
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="input-jetleg w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        <User className="w-4 h-4 inline mr-2" />
                                        Achternaam
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="input-jetleg w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        <Mail className="w-4 h-4 inline mr-2" />
                                        E-mail
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="input-jetleg w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        <Phone className="w-4 h-4 inline mr-2" />
                                        Telefoon
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="input-jetleg w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

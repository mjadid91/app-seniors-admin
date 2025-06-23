
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "../../stores/authStore";
import { useUserProfile } from "../../hooks/useUserProfile";
import ProfileImageSection from "./ProfileImageSection";
import ProfileFormFields from "./ProfileFormFields";
import ProfileSaveActions from "./ProfileSaveActions";
import ProfileLoading from "./ProfileLoading";

const ProfileSection = () => {
  const { user } = useAuthStore();
  const { profile, isLoading, isSaving, saveProfile } = useUserProfile();
  
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    languePreferee: "Français",
    langueId: 1,
    devise: "Euro (€)",
    deviseId: 1,
    niveauLangue: 5
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Synchroniser formData avec le profil chargé
  useEffect(() => {
    if (profile && !isLoading) {
      console.log('Synchronisation du profil avec le formulaire:', profile);
      setFormData({
        prenom: profile.prenom || "",
        nom: profile.nom || "",
        email: profile.email || "",
        telephone: profile.telephone || "",
        languePreferee: profile.languePreferee || "Français",
        langueId: profile.langueId || 1,
        devise: profile.devise || "Euro (€)",
        deviseId: profile.deviseId || 1,
        niveauLangue: profile.niveauLangue || 5
      });
      setProfileImage(profile.photo || null);
    }
  }, [profile, isLoading]);

  const handleInputChange = (field: string, value: string | number) => {
    console.log('Changement de champ:', field, value);
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    console.log('Sauvegarde du profil avec les données:', formData);
    const success = await saveProfile({
      ...formData,
      photo: profileImage || undefined
    });

    if (success) {
      console.log('Profil sauvegardé avec succès');
    }
  };

  const getInitials = () => {
    return `${formData.prenom?.[0] || profile?.prenom?.[0] || ''}${formData.nom?.[0] || profile?.nom?.[0] || ''}`;
  };

  if (isLoading) {
    return <ProfileLoading />;
  }

  return (
    <Card className="animate-scale-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-xl">👤</span>
          Profil administrateur
        </CardTitle>
        <CardDescription>
          Gérez vos informations personnelles et préférences de compte
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <ProfileImageSection
          profileImage={profileImage}
          initials={getInitials()}
          onImageChange={setProfileImage}
        />

        <ProfileFormFields
          formData={formData}
          onInputChange={handleInputChange}
        />

        <ProfileSaveActions
          onSave={handleSave}
          isSaving={isSaving}
        />

        {/* Section de debug pour vérifier les données */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-xs">
          <p><strong>Debug - Données actuelles :</strong></p>
          <p>Langue ID: {formData.langueId} - {formData.languePreferee}</p>
          <p>Devise ID: {formData.deviseId} - {formData.devise}</p>
          <p>Niveau langue: {formData.niveauLangue}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;

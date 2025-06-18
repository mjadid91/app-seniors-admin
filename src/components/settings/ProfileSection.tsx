
import { useState } from "react";
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
    languePreferee: "fr",
    devise: "EUR"
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Synchroniser formData avec le profil chargé
  useState(() => {
    if (profile && !isLoading) {
      setFormData({
        prenom: profile.prenom,
        nom: profile.nom,
        email: profile.email,
        telephone: profile.telephone,
        languePreferee: profile.languePreferee,
        devise: profile.devise
      });
      setProfileImage(profile.photo || null);
    }
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const success = await saveProfile({
      ...formData,
      photo: profileImage || undefined
    });

    if (success) {
      console.log('Profil sauvegardé avec succès');
    }
  };

  const getInitials = () => {
    return `${formData.prenom?.[0] || profile.prenom?.[0] || ''}${formData.nom?.[0] || profile.nom?.[0] || ''}`;
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
      </CardContent>
    </Card>
  );
};

export default ProfileSection;

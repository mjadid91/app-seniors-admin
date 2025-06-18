
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "../../stores/authStore";
import { useUserProfile } from "../../hooks/useUserProfile";
import { Upload } from "lucide-react";

const ProfileSection = () => {
  const { user } = useAuthStore();
  const { profile, isLoading, isSaving, saveProfile } = useUserProfile();
  const { toast } = useToast();
  
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Vérifier le type de fichier
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Erreur",
          description: "Veuillez sélectionner un fichier image valide.",
          variant: "destructive",
        });
        return;
      }

      // Vérifier la taille du fichier (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Erreur",
          description: "La taille du fichier ne doit pas dépasser 5MB.",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfileImage(result);
        toast({
          title: "Image téléchargée",
          description: "Votre photo de profil a été mise à jour. N'oubliez pas de sauvegarder.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    toast({
      title: "Image supprimée",
      description: "Votre photo de profil a été supprimée. N'oubliez pas de sauvegarder.",
    });
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
    return (
      <Card className="animate-scale-in">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600">Chargement de votre profil...</p>
          </div>
        </CardContent>
      </Card>
    );
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
        {/* Section Photo de profil */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Photo de profil</Label>
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profileImage || profile.photo || undefined} alt="Photo de profil" />
              <AvatarFallback className="text-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="relative overflow-hidden"
                  asChild
                >
                  <label className="cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" />
                    Télécharger
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </label>
                </Button>
                
                {(profileImage || profile.photo) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRemoveImage}
                    className="text-red-600 hover:text-red-700"
                  >
                    Supprimer
                  </Button>
                )}
              </div>
              
              <p className="text-xs text-muted-foreground">
                JPG, PNG ou GIF. Taille max: 5MB.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="prenom">Prénom</Label>
              <Input
                id="prenom"
                value={formData.prenom}
                onChange={(e) => handleInputChange("prenom", e.target.value)}
                className="transition-all duration-200 focus:scale-[1.02]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nom">Nom</Label>
              <Input
                id="nom"
                value={formData.nom}
                onChange={(e) => handleInputChange("nom", e.target.value)}
                className="transition-all duration-200 focus:scale-[1.02]"
              />
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="transition-all duration-200 focus:scale-[1.02]"
            />
          </div>

          <div className="space-y-2 mt-4">
            <Label htmlFor="telephone">Téléphone</Label>
            <Input
              id="telephone"
              type="tel"
              value={formData.telephone}
              onChange={(e) => handleInputChange("telephone", e.target.value)}
              placeholder="+33 1 23 45 67 89"
              className="transition-all duration-200 focus:scale-[1.02]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label>Langue</Label>
              <Select value={formData.languePreferee} onValueChange={(value) => handleInputChange("languePreferee", value)}>
                <SelectTrigger className="transition-all duration-200 hover:border-blue-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Devise</Label>
              <Select value={formData.devise} onValueChange={(value) => handleInputChange("devise", value)}>
                <SelectTrigger className="transition-all duration-200 hover:border-blue-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                  <SelectItem value="USD">Dollar ($)</SelectItem>
                  <SelectItem value="GBP">Livre (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200">
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="w-full md:w-auto transition-all duration-200 hover:scale-105"
          >
            {isSaving ? "Enregistrement..." : "Enregistrer les modifications"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProfileImageSectionProps {
  profileImage: string | null;
  initials: string;
  onImageChange: (imageData: string | null) => void;
}

const ProfileImageSection = ({ profileImage, initials, onImageChange }: ProfileImageSectionProps) => {
  const { toast } = useToast();

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
        onImageChange(result);
        toast({
          title: "Image téléchargée",
          description: "Votre photo de profil a été mise à jour. N'oubliez pas de sauvegarder.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    onImageChange(null);
    toast({
      title: "Image supprimée",
      description: "Votre photo de profil a été supprimée. N'oubliez pas de sauvegarder.",
    });
  };

  return (
    <div className="space-y-4">
      <Label className="text-base font-medium">Photo de profil</Label>
      <div className="flex items-center gap-6">
        <Avatar className="h-20 w-20">
          <AvatarImage src={profileImage || undefined} alt="Photo de profil" />
          <AvatarFallback className="text-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            {initials}
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
            
            {profileImage && (
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
  );
};

export default ProfileImageSection;

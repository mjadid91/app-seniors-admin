
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { useProfileImage } from "@/hooks/useProfileImage";

interface ProfileImageSectionProps {
  profileImage: string | null;
  initials: string;
  onImageChange: (imageData: string | null) => void;
}

const ProfileImageSection = ({ profileImage, initials, onImageChange }: ProfileImageSectionProps) => {
  const { uploadProfileImage, removeProfileImage, uploading } = useProfileImage();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = await uploadProfileImage(file);
      if (imageUrl) {
        onImageChange(imageUrl);
      }
    }
  };

  const handleRemoveImage = async () => {
    const success = await removeProfileImage();
    if (success) {
      onImageChange('');
    }
  };

  return (
    <div className="space-y-4">
      <Label className="text-base font-medium">Photo de profil</Label>
      <div className="flex items-center gap-6">
        <Avatar className="h-20 w-20">
          <AvatarImage src={profileImage && profileImage.trim() !== '' ? profileImage : undefined} alt="Photo de profil" />
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
              disabled={uploading}
              asChild
            >
              <label className={uploading ? "cursor-not-allowed" : "cursor-pointer"}>
                <Upload className="h-4 w-4 mr-2" />
                {uploading ? "Upload..." : "Télécharger"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </label>
            </Button>
            
            {profileImage && profileImage.trim() !== '' && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleRemoveImage}
                disabled={uploading}
                className="text-red-600 hover:text-red-700"
              >
                {uploading ? "Suppression..." : "Supprimer"}
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

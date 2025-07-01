
import { Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";

const DocumentsUpload = () => {
  const { toast } = useToast();
  const { user } = useAuthStore();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    if (!user?.id) {
      toast({
        title: "Erreur d'authentification",
        description: "Vous devez être connecté pour uploader des documents.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Vérifier la taille du fichier (max 50MB)
        if (file.size > 50 * 1024 * 1024) {
          toast({
            title: "Fichier trop volumineux",
            description: `${file.name} dépasse la limite de 50MB.`,
            variant: "destructive",
          });
          continue;
        }

        // Générer un nom de fichier unique
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

        // Uploader vers Supabase Storage
        const { data, error } = await supabase.storage
          .from('documents')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: true
          });

        if (error) {
          console.error('Erreur upload:', error);
          toast({
            title: "Erreur d'upload",
            description: `Impossible d'uploader ${file.name}.`,
            variant: "destructive",
          });
          continue;
        }

        // Obtenir l'URL publique
        const { data: publicData } = supabase.storage
          .from('documents')
          .getPublicUrl(fileName);

        if (publicData?.publicUrl) {
          // Insérer le document dans la base de données avec l'ID utilisateur
          const { error: dbError } = await supabase
            .from('Document')
            .insert({
              Titre: file.name,
              TypeFichier: fileExt?.toUpperCase() || 'UNKNOWN',
              TailleFichier: file.size / (1024 * 1024), // Convertir en MB
              URLFichier: publicData.publicUrl,
              Statut: 'Brouillon',
              IDCategorieDocument: 1, // Catégorie par défaut, vous pouvez la changer
              IDUtilisateurs: parseInt(user.id), // Assurer que l'ID utilisateur est défini
            });

          if (dbError) {
            console.error('Erreur base de données:', dbError);
            toast({
              title: "Erreur",
              description: `Impossible d'enregistrer ${file.name} en base.`,
              variant: "destructive",
            });
          } else {
            toast({
              title: "Upload réussi",
              description: `${file.name} a été uploadé et enregistré.`,
            });
          }
        }
      }
    } catch (error) {
      console.error('Erreur lors de l\'upload:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <Upload className="h-6 w-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-slate-800">Upload rapide</h3>
      </div>
      <div 
        className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <FileText className="h-8 w-8 text-slate-400 mx-auto mb-2" />
        <p className="text-slate-600 mb-2">Glissez vos fichiers ici</p>
        <Button 
          variant="outline" 
          size="sm" 
          disabled={isUploading}
          asChild
        >
          <label className="cursor-pointer">
            {isUploading ? "Upload en cours..." : "Parcourir les fichiers"}
            <input
              type="file"
              multiple
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
              disabled={isUploading}
            />
          </label>
        </Button>
      </div>
    </div>
  );
};

export default DocumentsUpload;

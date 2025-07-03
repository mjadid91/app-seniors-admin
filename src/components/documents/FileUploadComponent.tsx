
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, File, X } from 'lucide-react';
import { useFileOperations } from '@/hooks/useFileOperations';

interface FileUploadComponentProps {
  categories: string[];
  onUploadSuccess?: () => void;
}

const FileUploadComponent = ({ categories, onUploadSuccess }: FileUploadComponentProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadFile, uploading } = useFileOperations();

  // Mapping des catégories vers leurs IDs - adapté selon les données de la base
  const getCategoryId = (categoryName: string): number => {
    const categoryMap: Record<string, number> = {
      'Documents administratifs': 1,
      'Documents médicaux': 2,
      'Documents personnels': 3,
      'Rapports': 4,
      'Autres': 5
    };
    return categoryMap[categoryName] || 1;
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Vérifier la taille du fichier (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('Le fichier est trop volumineux. Taille maximale : 10MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedCategory) {
      alert('Veuillez sélectionner un fichier et une catégorie');
      return;
    }

    try {
      await uploadFile(selectedFile, getCategoryId(selectedCategory), () => {
        // Réinitialiser le formulaire après succès
        setSelectedFile(null);
        setSelectedCategory('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        onUploadSuccess?.();
      });
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Uploader un document
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Sélectionner un fichier
          </label>
          <Input
            ref={fileInputRef}
            type="file"
            onChange={handleFileSelect}
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
            disabled={uploading}
          />
          <p className="text-xs text-slate-500 mt-1">
            Formats acceptés : PDF, DOC, DOCX, TXT, JPG, PNG, GIF (max 10MB)
          </p>
        </div>

        {selectedFile && (
          <div className="flex items-center gap-2 p-2 bg-slate-50 rounded">
            <File className="h-4 w-4 text-blue-600" />
            <span className="text-sm flex-1">{selectedFile.name}</span>
            <span className="text-xs text-slate-500">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeSelectedFile}
              disabled={uploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">
            Catégorie
          </label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory} disabled={uploading}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleUpload}
          disabled={!selectedFile || !selectedCategory || uploading}
          className="w-full"
        >
          {uploading ? 'Upload en cours...' : 'Uploader le document'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default FileUploadComponent;

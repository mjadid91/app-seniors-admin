
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface DocumentFormData {
  name: string;
  category: string;
  status: string;
  description: string;
  utilisateurId: string;
}

interface DocumentFormFieldsProps {
  formData: DocumentFormData;
  categories: string[];
  users: { id: number; fullName: string }[];
  onFormDataChange: (formData: DocumentFormData) => void;
  onFileChange: (file: File | null) => void;
}

const DocumentFormFields = ({
  formData,
  categories,
  users,
  onFormDataChange,
  onFileChange
}: DocumentFormFieldsProps) => {
  const handleFieldChange = (field: keyof DocumentFormData, value: string) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(e.target.files[0]);
    }
  };

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name">Nom du document *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleFieldChange('name', e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="utilisateur">Utilisateur concerné *</Label>
        <Select value={formData.utilisateurId} onValueChange={(value) => handleFieldChange('utilisateurId', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Choisir un utilisateur" />
          </SelectTrigger>
          <SelectContent>
            {users.map(user => (
              <SelectItem key={user.id} value={user.id.toString()}>
                {user.fullName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="category">Catégorie *</Label>
        <Select value={formData.category} onValueChange={(value) => handleFieldChange('category', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner une catégorie" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="status">Statut</Label>
        <Select value={formData.status} onValueChange={(value) => handleFieldChange('status', value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Brouillon">Brouillon</SelectItem>
            <SelectItem value="Publié">Publié</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="file">Fichier</Label>
        <Input
          id="file"
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.txt"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description (optionnel)</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleFieldChange('description', e.target.value)}
          rows={3}
          placeholder="Description du document..."
        />
      </div>
    </>
  );
};

export default DocumentFormFields;

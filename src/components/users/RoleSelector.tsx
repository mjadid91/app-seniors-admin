
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUserCategories } from "../../hooks/useUserCategories";
import { UserFormData } from "../../hooks/useUserFormData";

interface RoleSelectorProps {
  formData: UserFormData;
  setFormData: (data: UserFormData) => void;
  error?: string;
}

const RoleSelector = ({ formData, setFormData, error }: RoleSelectorProps) => {
  const { categories, loading: categoriesLoading } = useUserCategories();

  const getCategoryDescription = (category: any) => {
    // Descriptions spécifiques selon les nouvelles catégories
    if (category.IDCatUtilisateurs === 1) return " (Senior - Personne âgée)";
    if (category.IDCatUtilisateurs === 4) return " (Aidant professionnel)";
    if (category.IDCatUtilisateurs === 5) return " (Administrateur - Accès complet)";
    if (category.IDCatUtilisateurs === 6) return " (Modérateur - Modération)";
    if (category.IDCatUtilisateurs === 7) return " (Visualisateur)";
    if (category.IDCatUtilisateurs === 8) return " (Support)";
    
    // Descriptions génériques basées sur les flags pour les autres catégories
    if (category.EstAdministrateur) return " (Accès complet)";
    if (category.EstModerateur) return " (Modération)";
    if (category.EstSupport) return " (Support technique)";
    if (category.EstSenior) return " (Personne âgée)";
    if (category.EstAidant) return " (Professionnel d'aide)";
    if (category.EstTuteur) return " (Tuteur légal)";
    if (category.EstOrganisme) return " (Structure organisationnelle)";
    return " (Visualisation uniquement)";
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="role">Catégorie d'utilisateur *</Label>
      {categoriesLoading ? (
        <div className="flex items-center gap-2 p-2 border rounded">
          <div className="w-4 h-4 border border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm text-gray-600">Chargement des catégories...</span>
        </div>
      ) : (
        <Select 
          value={formData.categoryId.toString()} 
          onValueChange={(value) => setFormData({ ...formData, categoryId: parseInt(value) })}
          required
        >
          <SelectTrigger className={error ? "border-red-500" : ""}>
            <SelectValue placeholder="Sélectionner une catégorie" />
          </SelectTrigger>
          <SelectContent>
            {categories
                .filter(cat => [5, 6, 7, 8].includes(cat.IDCatUtilisateurs))
                .map((category) => (
                    <SelectItem key={category.IDCatUtilisateurs} value={category.IDCatUtilisateurs.toString()}>
                      {category.LibelleCategorie}
                      {getCategoryDescription(category)}
                    </SelectItem>
                ))}
          </SelectContent>
        </Select>
      )}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      <p className="text-xs text-muted-foreground">
        Sélectionnez la catégorie appropriée. Les seniors (catégorie 1) et aidants (catégorie 4) auront automatiquement leurs profils spécifiques créés.
      </p>
    </div>
  );
};

export default RoleSelector;

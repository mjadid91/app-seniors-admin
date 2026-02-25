import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUserCategories } from "../../hooks/useUserCategories";
import { UserFormData } from "../../hooks/useUserFormData";

// ✅ CORRECTION 1 : Définition de l'interface pour une catégorie
export interface UserCategory {
  IDCatUtilisateurs: number;
  LibelleCategorie: string;
  EstAdministrateur: boolean;
  EstModerateur: boolean;
  EstSupport: boolean;
  EstSenior: boolean;
  EstAidant: boolean;
  EstTuteur: boolean;
  EstOrganisme: boolean;
}

interface RoleSelectorProps {
  formData: UserFormData;
  setFormData: (data: UserFormData) => void;
}

const RoleSelector = ({ formData, setFormData }: RoleSelectorProps) => {
  // ✅ CORRECTION 2 : On s'assure que categories est bien typé (déduit du hook si possible)
  const { categories, loading: categoriesLoading } = useUserCategories();

  // ✅ CORRECTION 3 : Remplacement de "any" par "UserCategory"
  const getCategoryDescription = (category: UserCategory) => {
    // Descriptions spécifiques selon les nouvelles catégories (ID fixes)
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
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {/* ✅ Typage automatique grâce au map sur UserCategory[] */}
                {(categories as UserCategory[])
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
        <p className="text-xs text-muted-foreground">
          Sélectionnez la catégorie appropriée. Les seniors (catégorie 1) et aidants (catégorie 4) auront automatiquement leurs profils spécifiques créés.
        </p>
      </div>
  );
};

export default RoleSelector;
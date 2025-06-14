
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUserCategories } from "../../hooks/useUserCategories";
import { UserFormData } from "../../hooks/useUserFormData";

interface RoleSelectorProps {
  formData: UserFormData;
  setFormData: (data: UserFormData) => void;
}

const RoleSelector = ({ formData, setFormData }: RoleSelectorProps) => {
  const { categories, loading: categoriesLoading } = useUserCategories();

  return (
    <div className="space-y-2">
      <Label htmlFor="role">Rôle *</Label>
      {categoriesLoading ? (
        <div className="flex items-center gap-2 p-2 border rounded">
          <div className="w-4 h-4 border border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm text-gray-600">Chargement des rôles...</span>
        </div>
      ) : (
        <Select 
          value={formData.categoryId.toString()} 
          onValueChange={(value) => setFormData({ ...formData, categoryId: parseInt(value) })}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un rôle" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem 
                key={category.IDCatUtilisateurs} 
                value={category.IDCatUtilisateurs.toString()}
              >
                {category.LibelleCategorie}
                {category.EstAdministrateur && " (Accès complet)"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <p className="text-xs text-muted-foreground">
        Les rôles sont basés sur les attributs de la table CatUtilisateurs : Administrateur, Modérateur, Support, Visualisateur
      </p>
    </div>
  );
};

export default RoleSelector;

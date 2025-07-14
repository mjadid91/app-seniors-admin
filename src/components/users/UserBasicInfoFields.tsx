
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserFormData } from "../../hooks/useUserFormData";

interface UserBasicInfoFieldsProps {
  formData: UserFormData;
  setFormData: (data: UserFormData) => void;
}

const UserBasicInfoFields = ({ formData, setFormData }: UserBasicInfoFieldsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="prenom">Prénom *</Label>
        <Input
          id="prenom"
          value={formData.prenom}
          onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="nom">Nom *</Label>
        <Input
          id="nom"
          value={formData.nom}
          onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
          required
        />
      </div>
    </div>
  );
};

export default UserBasicInfoFields;

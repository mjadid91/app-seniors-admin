
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProfileFormData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  languePreferee: string;
  devise: string;
}

interface ProfileFormFieldsProps {
  formData: ProfileFormData;
  onInputChange: (field: string, value: string) => void;
}

const ProfileFormFields = ({ formData, onInputChange }: ProfileFormFieldsProps) => {
  return (
    <div className="border-t border-slate-200 pt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="prenom">Prénom</Label>
          <Input
            id="prenom"
            value={formData.prenom}
            onChange={(e) => onInputChange("prenom", e.target.value)}
            className="transition-all duration-200 focus:scale-[1.02]"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="nom">Nom</Label>
          <Input
            id="nom"
            value={formData.nom}
            onChange={(e) => onInputChange("nom", e.target.value)}
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
          onChange={(e) => onInputChange("email", e.target.value)}
          className="transition-all duration-200 focus:scale-[1.02]"
        />
      </div>

      <div className="space-y-2 mt-4">
        <Label htmlFor="telephone">Téléphone</Label>
        <Input
          id="telephone"
          type="tel"
          value={formData.telephone}
          onChange={(e) => onInputChange("telephone", e.target.value)}
          placeholder="+33 1 23 45 67 89"
          className="transition-all duration-200 focus:scale-[1.02]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="space-y-2">
          <Label>Langue</Label>
          <Select value={formData.languePreferee} onValueChange={(value) => onInputChange("languePreferee", value)}>
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
          <Select value={formData.devise} onValueChange={(value) => onInputChange("devise", value)}>
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
  );
};

export default ProfileFormFields;


import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserFormData } from "../../hooks/useUserFormData";

interface PreferencesFieldsProps {
  formData: UserFormData;
  setFormData: (data: UserFormData) => void;
}

const PreferencesFields = ({ formData, setFormData }: PreferencesFieldsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="langue">Langue préférée</Label>
        <Select value={formData.languePreferee} onValueChange={(value) => setFormData({ ...formData, languePreferee: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fr">Français</SelectItem>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Español</SelectItem>
            <SelectItem value="de">Deutsch</SelectItem>
            <SelectItem value="it">Italiano</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="devise">Devise</Label>
        <Select value={formData.devise} onValueChange={(value) => setFormData({ ...formData, devise: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="EUR">Euro (€)</SelectItem>
            <SelectItem value="USD">Dollar US ($)</SelectItem>
            <SelectItem value="GBP">Livre Sterling (£)</SelectItem>
            <SelectItem value="CHF">Franc Suisse (CHF)</SelectItem>
            <SelectItem value="CAD">Dollar Canadien (CAD)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PreferencesFields;

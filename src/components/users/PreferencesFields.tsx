import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { UserFormData } from "../../hooks/useUserFormData";
import { useSupabaseLangues } from "@/hooks/useSupabaseLangues";
import { useSupabaseDevises } from "@/hooks/useSupabaseDevises";

interface PreferencesFieldsProps {
  formData: UserFormData;
  setFormData: (data: UserFormData) => void;
}

const PreferencesFields = ({ formData, setFormData }: PreferencesFieldsProps) => {
  const { langues, loading: loadingLangues } = useSupabaseLangues();
  const { devises, loading: loadingDevises } = useSupabaseDevises();

  return (
      <div className="grid grid-cols-2 gap-4">
        {/* LANGUE */}
        <div className="space-y-2">
          <Label htmlFor="langue">Langue préférée</Label>
          {loadingLangues ? (
              <div className="text-sm text-gray-500">Chargement...</div>
          ) : (
              <Select
                  value={formData.languePreferee}
                  onValueChange={(value) => setFormData({ ...formData, languePreferee: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner..." />
                </SelectTrigger>
                <SelectContent>
                  {langues.map((langue) => (
                      <SelectItem key={langue.IDLangue} value={langue.Titre}>
                        {langue.Titre}
                      </SelectItem>
                  ))}
                </SelectContent>
              </Select>
          )}
        </div>

        {/* DEVISE */}
        <div className="space-y-2">
          <Label htmlFor="devise">Devise</Label>
          {loadingDevises ? (
              <div className="text-sm text-gray-500">Chargement...</div>
          ) : (
              <Select
                  value={formData.devise}
                  onValueChange={(value) => setFormData({ ...formData, devise: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner..." />
                </SelectTrigger>
                <SelectContent>
                  {devises.map((devise) => (
                      <SelectItem key={devise.IDDevise} value={devise.Titre}>
                        {devise.Titre}
                      </SelectItem>
                  ))}
                </SelectContent>
              </Select>
          )}
        </div>
      </div>
  );
};

export default PreferencesFields;

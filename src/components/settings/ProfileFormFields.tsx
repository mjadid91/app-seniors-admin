
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSupabaseLangues } from "@/hooks/useSupabaseLangues";
import { useSupabaseDevises } from "@/hooks/useSupabaseDevises";

interface ProfileFormData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  languePreferee: string;
  langueId: number;
  devise: string;
  deviseId: number;
  niveauLangue: number;
}

interface ProfileFormFieldsProps {
  formData: ProfileFormData;
  onInputChange: (field: string, value: string | number) => void;
}

const ProfileFormFields = ({ formData, onInputChange }: ProfileFormFieldsProps) => {
  const { langues, loading: loadingLangues } = useSupabaseLangues();
  const { devises, loading: loadingDevises } = useSupabaseDevises();

  const handleLangueChange = (langueId: string) => {
    const langue = langues.find(l => l.IDLangue.toString() === langueId);
    if (langue) {
      onInputChange("langueId", parseInt(langueId));
      onInputChange("languePreferee", langue.Titre);
    }
  };

  const handleDeviseChange = (deviseId: string) => {
    const devise = devises.find(d => d.IDDevise.toString() === deviseId);
    if (devise) {
      onInputChange("deviseId", parseInt(deviseId));
      onInputChange("devise", devise.Titre);
    }
  };

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
          <Label>Langue préférée</Label>
          {loadingLangues ? (
            <div className="text-sm text-gray-500">Chargement des langues...</div>
          ) : (
            <Select 
              value={formData.langueId?.toString() || ""} 
              onValueChange={handleLangueChange}
            >
              <SelectTrigger className="transition-all duration-200 hover:border-blue-300">
                <SelectValue placeholder="Sélectionner une langue" />
              </SelectTrigger>
              <SelectContent>
                {langues.map((langue) => (
                  <SelectItem key={langue.IDLangue} value={langue.IDLangue.toString()}>
                    {langue.Titre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="space-y-2">
          <Label>Devise</Label>
          {loadingDevises ? (
            <div className="text-sm text-gray-500">Chargement des devises...</div>
          ) : (
            <Select 
              value={formData.deviseId?.toString() || ""} 
              onValueChange={handleDeviseChange}
            >
              <SelectTrigger className="transition-all duration-200 hover:border-blue-300">
                <SelectValue placeholder="Sélectionner une devise" />
              </SelectTrigger>
              <SelectContent>
                {devises.map((devise) => (
                  <SelectItem key={devise.IDDevise} value={devise.IDDevise.toString()}>
                    {devise.Titre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {formData.langueId && (
        <div className="space-y-2 mt-4">
          <Label>Niveau de langue</Label>
          <Select 
            value={formData.niveauLangue?.toString() || "5"} 
            onValueChange={(value) => onInputChange("niveauLangue", parseInt(value))}
          >
            <SelectTrigger className="transition-all duration-200 hover:border-blue-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Débutant</SelectItem>
              <SelectItem value="2">Élémentaire</SelectItem>
              <SelectItem value="3">Intermédiaire</SelectItem>
              <SelectItem value="4">Avancé</SelectItem>
              <SelectItem value="5">Natif/Courant</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default ProfileFormFields;

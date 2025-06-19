
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { usePasswordUtils } from "@/hooks/usePasswordUtils";
import { Partner } from "./types";
import { X, Plus } from "lucide-react";

interface AddPartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPartner: (partner: Omit<Partner, 'id'>) => void;
}

interface PartnerFormData {
  // Données utilisateur
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  
  // Données partenaire
  raisonSociale: string;
  adresse: string;
  
  // Services saisis manuellement
  services: string[];
}

const AddPartnerModal = ({ isOpen, onClose, onAddPartner }: AddPartnerModalProps) => {
  const [formData, setFormData] = useState<PartnerFormData>({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    raisonSociale: "",
    adresse: "",
    services: []
  });
  
  const [newService, setNewService] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { generatePassword, hashPassword, isGenerating } = usePasswordUtils();

  const handleAddService = () => {
    if (newService.trim() && !formData.services.includes(newService.trim())) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, newService.trim()]
      }));
      setNewService("");
    }
  };

  const handleRemoveService = (serviceToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter(service => service !== serviceToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddService();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Générer et hasher le mot de passe
      const temporaryPassword = generatePassword();
      const hashedPassword = await hashPassword(temporaryPassword);
      const currentDate = new Date().toISOString();

      console.log('Starting partner creation process...');

      // 2. Créer l'utilisateur
      const { data: userData, error: userError } = await supabase
        .from('Utilisateurs')
        .insert({
          Nom: formData.nom,
          Prenom: formData.prenom,
          Email: formData.email,
          Telephone: formData.telephone,
          DateNaissance: '1970-01-01', // Valeur par défaut
          Adresse: formData.adresse,
          Genre: 'Non précisé',
          MotDePasse: hashedPassword,
          IDCatUtilisateurs: 3, // Rôle Organisme
          DateInscription: currentDate.split('T')[0],
          Commentaire: 'Compte partenaire créé automatiquement',
          DateModification: currentDate,
          LangueSite: 'fr',
          Photo: '',
          EstDesactive: false,
          EstRGPD: false
        })
        .select()
        .single();

      if (userError) {
        console.error('Erreur création utilisateur:', userError);
        throw userError;
      }

      console.log('Utilisateur créé:', userData);

      // 3. Créer le partenaire
      const { data: partenaireData, error: partenaireError } = await supabase
        .from('Partenaire')
        .insert({
          RaisonSociale: formData.raisonSociale,
          Email: formData.email,
          Telephone: formData.telephone,
          Adresse: formData.adresse,
          IDCatUtilisateurs: 3
        })
        .select()
        .single();

      if (partenaireError) {
        console.error('Erreur création partenaire:', partenaireError);
        throw partenaireError;
      }

      console.log('Partenaire créé:', partenaireData);

      // 4. Créer et associer les services saisis
      if (formData.services.length > 0) {
        // Créer les nouveaux services dans ServicePartenaire
        const servicesData = formData.services.map(serviceName => ({
          NomService: serviceName
        }));

        const { data: createdServices, error: servicesCreationError } = await supabase
          .from('ServicePartenaire')
          .insert(servicesData)
          .select();

        if (servicesCreationError) {
          console.error('Erreur création services:', servicesCreationError);
          throw servicesCreationError;
        }

        console.log('Services créés:', createdServices);

        // Associer les services au partenaire
        const servicesAssociations = createdServices.map(service => ({
          IDPartenaire: partenaireData.IDPartenaire,
          IDServicePartenaire: service.IDServicePartenaire
        }));

        const { error: associationError } = await supabase
          .from('Partenaire_Services')
          .insert(servicesAssociations);

        if (associationError) {
          console.error('Erreur association services:', associationError);
          throw associationError;
        }

        console.log('Services associés avec succès');
      }

      // 5. Envoyer l'email avec les identifiants
      try {
        const { error: emailError } = await supabase.functions.invoke('send-partner-credentials', {
          body: {
            email: formData.email,
            nom: `${formData.prenom} ${formData.nom}`,
            password: temporaryPassword,
            raisonSociale: formData.raisonSociale
          }
        });

        if (emailError) {
          console.warn('Erreur envoi email:', emailError);
          // Ne pas bloquer le processus si l'email échoue
        }
      } catch (emailError) {
        console.warn('Erreur lors de l\'envoi de l\'email:', emailError);
        // Ne pas bloquer le processus si l'email échoue
      }

      // 6. Créer l'objet Partner pour l'affichage
      const newPartner: Omit<Partner, 'id'> = {
        nom: formData.raisonSociale,
        type: "Organisme",
        email: formData.email,
        telephone: formData.telephone,
        adresse: formData.adresse,
        statut: "Actif",
        evaluation: 0,
        services: formData.services,
        dateInscription: currentDate.split('T')[0]
      };

      onAddPartner(newPartner);
      
      toast({
        title: "Partenaire créé",
        description: `${formData.raisonSociale} a été créé avec succès. Un email avec les identifiants a été envoyé.`,
      });

      // Reset form
      setFormData({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        raisonSociale: "",
        adresse: "",
        services: []
      });
      setNewService("");
      onClose();

    } catch (error: any) {
      console.error('Erreur lors de la création du partenaire:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer le partenaire. " + (error.message || ''),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nouveau partenaire</DialogTitle>
          <DialogDescription>
            Créer un nouveau compte partenaire avec utilisateur associé.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations utilisateur */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Informations de l'utilisateur</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prenom">Prénom</Label>
                <Input
                  id="prenom"
                  value={formData.prenom}
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nom">Nom</Label>
                <Input
                  id="nom"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone</Label>
                <Input
                  id="telephone"
                  value={formData.telephone}
                  onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Informations partenaire */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Informations du partenaire</h3>
            
            <div className="space-y-2">
              <Label htmlFor="raisonSociale">Raison sociale</Label>
              <Input
                id="raisonSociale"
                value={formData.raisonSociale}
                onChange={(e) => setFormData({ ...formData, raisonSociale: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adresse">Adresse</Label>
              <Input
                id="adresse"
                value={formData.adresse}
                onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Services proposés */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Services proposés</h3>
            
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Saisissez les services proposés par ce partenaire :
              </p>
              
              {/* Ajout de nouveau service */}
              <div className="flex gap-2">
                <Input
                  placeholder="Nom du service"
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={handleAddService}
                  disabled={!newService.trim()}
                  size="sm"
                  className="shrink-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Liste des services ajoutés */}
              {formData.services.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Services ajoutés :</p>
                  <div className="space-y-2 max-h-32 overflow-y-auto border rounded-md p-3 bg-muted/50">
                    {formData.services.map((service, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-background px-3 py-2 rounded border"
                      >
                        <span className="text-sm">{service}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveService(service)}
                          className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formData.services.length} service(s) ajouté(s)
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading || isGenerating}
            >
              {isLoading ? "Création..." : "Créer le partenaire"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPartnerModal;

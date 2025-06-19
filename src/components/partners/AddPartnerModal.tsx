
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { usePasswordUtils } from "@/hooks/usePasswordUtils";
import { usePartnerServices } from "@/hooks/usePartnerServices";
import { Partner } from "./types";

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
  
  // Services sélectionnés
  selectedServices: number[];
}

const AddPartnerModal = ({ isOpen, onClose, onAddPartner }: AddPartnerModalProps) => {
  const [formData, setFormData] = useState<PartnerFormData>({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    raisonSociale: "",
    adresse: "",
    selectedServices: []
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { generatePassword, hashPassword, isGenerating } = usePasswordUtils();
  const { services, loading: servicesLoading } = usePartnerServices();

  console.log('Services chargés:', services);
  console.log('Services loading:', servicesLoading);

  const handleServiceToggle = (serviceId: number) => {
    console.log('Toggle service:', serviceId);
    setFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceId)
        ? prev.selectedServices.filter(id => id !== serviceId)
        : [...prev.selectedServices, serviceId]
    }));
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

      // 4. Associer les services sélectionnés
      if (formData.selectedServices.length > 0) {
        const servicesAssociations = formData.selectedServices.map(serviceId => ({
          IDPartenaire: partenaireData.IDPartenaire,
          IDServicePartenaire: serviceId
        }));

        const { error: servicesError } = await supabase
          .from('Partenaire_Services')
          .insert(servicesAssociations);

        if (servicesError) {
          console.error('Erreur association services:', servicesError);
          throw servicesError;
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
      const selectedServiceNames = services
        .filter(service => formData.selectedServices.includes(service.IDServicePartenaire))
        .map(service => service.NomService);

      const newPartner: Omit<Partner, 'id'> = {
        nom: formData.raisonSociale,
        type: "Organisme",
        email: formData.email,
        telephone: formData.telephone,
        adresse: formData.adresse,
        statut: "Actif",
        evaluation: 0,
        services: selectedServiceNames,
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
        selectedServices: []
      });
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
            
            {servicesLoading ? (
              <div className="flex items-center justify-center p-4">
                <p className="text-sm text-muted-foreground">Chargement des services...</p>
              </div>
            ) : services.length === 0 ? (
              <div className="flex items-center justify-center p-4 border rounded bg-muted/50">
                <p className="text-sm text-muted-foreground">Aucun service disponible</p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Sélectionnez les services proposés par ce partenaire :
                </p>
                <div className="grid grid-cols-1 gap-3 max-h-48 overflow-y-auto border rounded-md p-4 bg-background">
                  {services.map((service) => (
                    <div key={service.IDServicePartenaire} className="flex items-center space-x-3">
                      <Checkbox
                        id={`service-${service.IDServicePartenaire}`}
                        checked={formData.selectedServices.includes(service.IDServicePartenaire)}
                        onCheckedChange={() => handleServiceToggle(service.IDServicePartenaire)}
                      />
                      <Label 
                        htmlFor={`service-${service.IDServicePartenaire}`}
                        className="text-sm font-normal cursor-pointer flex-1"
                      >
                        {service.NomService}
                      </Label>
                    </div>
                  ))}
                </div>
                
                {formData.selectedServices.length > 0 && (
                  <div className="text-xs text-muted-foreground">
                    {formData.selectedServices.length} service(s) sélectionné(s)
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading || isGenerating || servicesLoading}
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

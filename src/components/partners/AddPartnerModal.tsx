
import { useState, useEffect } from "react";
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
  
  // Services sélectionnés
  selectedServiceIds: number[];
}

const AddPartnerModal = ({ isOpen, onClose, onAddPartner }: AddPartnerModalProps) => {
  const [formData, setFormData] = useState<PartnerFormData>({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    raisonSociale: "",
    adresse: "",
    selectedServiceIds: []
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [newServiceName, setNewServiceName] = useState("");
  const [isAddingService, setIsAddingService] = useState(false);
  const [showAddServiceForm, setShowAddServiceForm] = useState(false);
  const { toast } = useToast();
  const { generatePassword, hashPassword, isGenerating } = usePasswordUtils();
  const { services, loading: servicesLoading, refetch: refetchServices } = usePartnerServices();

  // Refetch services when modal opens
  useEffect(() => {
    if (isOpen) {
      refetchServices();
    }
  }, [isOpen, refetchServices]);

  const handleServiceToggle = (serviceId: number, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      selectedServiceIds: checked 
        ? [...prev.selectedServiceIds, serviceId]
        : prev.selectedServiceIds.filter(id => id !== serviceId)
    }));
  };

  const handleAddNewService = async () => {
    if (!newServiceName.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir un nom de service.",
        variant: "destructive"
      });
      return;
    }

    setIsAddingService(true);
    try {
      const { data, error } = await supabase
        .from('ServicePartenaire')
        .insert({
          NomService: newServiceName.trim()
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Actualiser la liste des services
      await refetchServices();
      
      // Sélectionner automatiquement le nouveau service
      setFormData(prev => ({
        ...prev,
        selectedServiceIds: [...prev.selectedServiceIds, data.IDServicePartenaire]
      }));

      // Réinitialiser le formulaire d'ajout
      setNewServiceName("");
      setShowAddServiceForm(false);

      toast({
        title: "Service créé",
        description: `Le service "${newServiceName}" a été créé et sélectionné.`,
      });

    } catch (error: any) {
      console.error('Erreur lors de la création du service:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer le service. " + (error.message || ''),
        variant: "destructive"
      });
    } finally {
      setIsAddingService(false);
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
            IDCatUtilisateurs: 3,
            DateInscription: currentDate
          })
          .select()
          .single();



      if (partenaireError) {
        console.error('Erreur création partenaire:', partenaireError);
        throw partenaireError;
      }

      console.log('Partenaire créé:', partenaireData);

      // 4. Associer les services sélectionnés
      if (formData.selectedServiceIds.length > 0) {
        const servicesAssociations = formData.selectedServiceIds.map(serviceId => ({
          IDPartenaire: partenaireData.IDPartenaire,
          IDServicePartenaire: serviceId
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
        }
      } catch (emailError) {
        console.warn('Erreur lors de l\'envoi de l\'email:', emailError);
      }

      // 6. Créer l'objet Partner pour l'affichage
      const selectedServiceNames = services
        .filter(service => formData.selectedServiceIds.includes(service.IDServicePartenaire))
        .map(service => service.NomService);

      const newPartner: Omit<Partner, 'id'> = {
        nom: formData.raisonSociale,
        raisonSociale: formData.raisonSociale, // Ajout de la propriété manquante
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
        selectedServiceIds: []
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
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Services proposés</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowAddServiceForm(!showAddServiceForm)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Ajouter un service
              </Button>
            </div>

            {/* Formulaire d'ajout de service */}
            {showAddServiceForm && (
              <div className="border rounded-lg p-4 bg-muted/50 space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="newServiceName">Nom du nouveau service</Label>
                  <Input
                    id="newServiceName"
                    value={newServiceName}
                    onChange={(e) => setNewServiceName(e.target.value)}
                    placeholder="Ex: Aide à domicile, Livraison de repas..."
                    disabled={isAddingService}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleAddNewService}
                    disabled={isAddingService || !newServiceName.trim()}
                  >
                    {isAddingService ? "Ajout..." : "Créer le service"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowAddServiceForm(false);
                      setNewServiceName("");
                    }}
                    disabled={isAddingService}
                  >
                    Annuler
                  </Button>
                </div>
              </div>
            )}
            
            {servicesLoading ? (
              <p className="text-sm text-muted-foreground">Chargement des services...</p>
            ) : services.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Aucun service disponible. Utilisez le bouton "Ajouter un service" pour en créer.
              </p>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Sélectionnez les services proposés par ce partenaire :
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-40 overflow-y-auto border rounded-md p-4">
                  {services.map((service) => (
                    <div key={service.IDServicePartenaire} className="flex items-center space-x-2">
                      <Checkbox
                        id={`service-${service.IDServicePartenaire}`}
                        checked={formData.selectedServiceIds.includes(service.IDServicePartenaire)}
                        onCheckedChange={(checked) => 
                          handleServiceToggle(service.IDServicePartenaire, checked as boolean)
                        }
                      />
                      <Label 
                        htmlFor={`service-${service.IDServicePartenaire}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {service.NomService}
                      </Label>
                    </div>
                  ))}
                </div>

                {formData.selectedServiceIds.length > 0 && (
                  <div className="text-xs text-muted-foreground">
                    {formData.selectedServiceIds.length} service(s) sélectionné(s)
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

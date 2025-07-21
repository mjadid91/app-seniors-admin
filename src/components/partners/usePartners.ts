import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Partner, BonPlan, PartnerForSelect } from "./types";

// Helper types for DB rows
type DBPartner = {
  IDPartenaire: number;
  RaisonSociale: string;
  Email: string;
  Telephone: string;
  Adresse: string;
  // TypePartenaire can be used as "type" if needed
  TypePartenaire?: string;
  DateInscription?: string;
};

type DBServicePartenaire = {
  IDServicePartenaire: number;
  NomService: string;
};

type DBPartenaireService = {
  IDPartenaire: number | null;
  IDServicePartenaire: number | null;
};

type DBBonPlan = {
  IDBonPlan: number;
  TitreBonPlan: string;
  DescriptionBonPlan: string;
  TypeReduction: string;
  PourcentageReduction: number;
  DateDebutReduction: string;
  DateFinReduction: string;
  CodePromo: string;
  StatutBonPlan: string;
  IDPartenaire: number | null;
};

// Helper function to determine status based on dates
const getComputedStatus = (statut: string, dateDebut: string, dateFin: string): string => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison
  
  const startDate = new Date(dateDebut);
  startDate.setHours(0, 0, 0, 0);
  
  const endDate = new Date(dateFin);
  endDate.setHours(23, 59, 59, 999); // End of day for end date

  // If end date is in the past, it's expired regardless of original status
  if (endDate < today) {
    return "Expiré";
  }
  
  // If original status is "Actif"
  if (statut === "Actif") {
    // If start date is in the future, it's pending
    if (startDate > today) {
      return "En attente";
    }
    // If we're between start and end dates, it's active
    if (startDate <= today && today <= endDate) {
      return "Actif";
    }
  }
  
  // Return original status for other cases
  return statut;
};

export const usePartners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [bonsPlans, setBonsPlans] = useState<BonPlan[]>([]);
  const [rawPartners, setRawPartners] = useState<DBPartner[]>([]);
  const [services, setServices] = useState<DBServicePartenaire[]>([]);
  const [partenaireServices, setPartenaireServices] = useState<DBPartenaireService[]>([]);

  const { toast } = useToast();

  // Fetch all partners
  const fetchPartners = useCallback(async () => {
    const { data, error } = await supabase
      .from("Partenaire")
      .select("*");
    if (error) {
      toast({ title: "Erreur", description: "Impossible de charger les partenaires.", variant: "destructive" });
      return;
    }
    setRawPartners(data as DBPartner[]);
  }, [toast]);

  // Fetch all services
  const fetchServices = useCallback(async () => {
    const { data, error } = await supabase
      .from("ServicePartenaire")
      .select("*");
    if (error) {
      toast({ title: "Erreur", description: "Impossible de charger les services partenaires.", variant: "destructive" });
      return;
    }
    setServices(data as DBServicePartenaire[]);
  }, [toast]);

  // Fetch partner-services connection table
  const fetchPartenaireServices = useCallback(async () => {
    const { data, error } = await supabase
      .from("Partenaire_Services")
      .select("*");
    if (error) {
      toast({ title: "Erreur", description: "Impossible de charger les liaisons partenaires/services.", variant: "destructive" });
      return;
    }
    setPartenaireServices(data as DBPartenaireService[]);
  }, [toast]);

  // Compose partner full data
  useEffect(() => {
    // Only process when necessary data are fetched (services and partenaireServices can be empty)
    if (!rawPartners.length) return;

    const buildPartners: Partner[] = rawPartners.map((p) => {
      // Find service IDs for this partner
      const serviceIds = partenaireServices
        .filter(ps => ps.IDPartenaire === p.IDPartenaire)
        .map(ps => ps.IDServicePartenaire);

      // Get service names for display
      const serviceNames = services
        .filter(s => serviceIds.includes(s.IDServicePartenaire))
        .map(s => s.NomService);

      // Use TypePartenaire if available, fallback to "Partenaire"
      const type = p.TypePartenaire || "Partenaire";

      // Fake some extra fields for now
      return {
        id: p.IDPartenaire,
        nom: p.RaisonSociale,
        raisonSociale: p.RaisonSociale, // Ajout de la propriété manquante
        type,
        email: p.Email,
        telephone: p.Telephone,
        adresse: p.Adresse,
        statut: "Actif",
        evaluation: 5,
        services: serviceNames,
        dateInscription: p.DateInscription || "",
      };
    });
    setPartners(buildPartners);
  }, [rawPartners, services, partenaireServices]);

  // Update expired bons plans in database
  const updateExpiredBonsPlans = useCallback(async (expiredIds: number[]) => {
    if (expiredIds.length === 0) return;

    const { error } = await supabase
      .from("BonPlan")
      .update({ StatutBonPlan: "Expiré" })
      .in("IDBonPlan", expiredIds);

    if (error) {
      console.error("Erreur lors de la mise à jour des bons plans expirés:", error);
    } else {
      console.log(`${expiredIds.length} bon(s) plan(s) mis à jour en statut Expiré`);
    }
  }, []);

  // Fetch bons plans with status computation and automatic updates
  const fetchBonsPlans = useCallback(async () => {
    // Get BonPlan with the partner name joined
    const { data, error } = await supabase
      .from("BonPlan")
      .select("*");
    if (error) {
      toast({ title: "Erreur", description: "Impossible de charger les bons plans.", variant: "destructive" });
      return;
    }

    // Process bons plans and compute statuses
    const expiredIds: number[] = [];
    const processedBonsPlans = (data as DBBonPlan[]).map((b) => {
      let partenaireNom = "";
      if (b.IDPartenaire && rawPartners.length > 0) {
        const found = rawPartners.find((p) => p.IDPartenaire === b.IDPartenaire);
        partenaireNom = found?.RaisonSociale || "";
      }

      const computedStatus = getComputedStatus(
        b.StatutBonPlan, 
        b.DateDebutReduction, 
        b.DateFinReduction
      );

      // If status changed to expired and wasn't already expired in DB, track for update
      if (computedStatus === "Expiré" && b.StatutBonPlan !== "Expiré") {
        expiredIds.push(b.IDBonPlan);
      }

      return {
        id: b.IDBonPlan,
        titre: b.TitreBonPlan,
        partenaire: partenaireNom,
        description: b.DescriptionBonPlan,
        typeReduction: b.TypeReduction,
        valeurReduction: b.TypeReduction === "pourcentage" ? b.PourcentageReduction : b.PourcentageReduction,
        dateDebutReduction: b.DateDebutReduction,
        dateFinReduction: b.DateFinReduction,
        codePromo: b.CodePromo,
        statut: computedStatus, // Use computed status instead of DB status
      };
    });

    // Update expired bons plans in database
    await updateExpiredBonsPlans(expiredIds);

    setBonsPlans(processedBonsPlans);
  }, [rawPartners, toast, updateExpiredBonsPlans]);

  // Initial fetch on mount
  useEffect(() => {
    fetchPartners();
    fetchServices();
    fetchPartenaireServices();
  }, [fetchPartners, fetchServices, fetchPartenaireServices]);

  // Re-fetch bons plans every time partners table is updated
  useEffect(() => {
    if (rawPartners.length) {
      fetchBonsPlans();
    }
  }, [rawPartners, fetchBonsPlans]);

  // Handlers - mise à jour de handleAddPartner pour être plus simple
  const handleAddPartner = async (newPartnerData: Omit<Partner, 'id'>) => {
    // Cette fonction est maintenant principalement pour la mise à jour de l'état local
    // La création réelle est gérée dans AddPartnerModal
    toast({
      title: "Partenaire ajouté",
      description: `${newPartnerData.nom} a été ajouté avec succès.`,
    });
    
    // Recharger les données pour avoir les informations à jour
    await Promise.all([
      fetchPartners(),
      fetchServices(),
      fetchPartenaireServices()
    ]);
  };

  const handleUpdatePartner = async (updatedPartner: Partner) => {
    const { error } = await supabase
      .from("Partenaire")
      .update({
        RaisonSociale: updatedPartner.raisonSociale,
        Email: updatedPartner.email,
        Telephone: updatedPartner.telephone,
        Adresse: updatedPartner.adresse,
      })
      .eq("IDPartenaire", updatedPartner.id);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier le partenaire.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Partenaire modifié",
        description: `${updatedPartner.raisonSociale} a été mis à jour avec succès.`,
      });
      fetchPartners();
    }
  };

  const handleDeletePartner = async (partnerId: number) => {
    try {
      // D'abord récupérer les informations du partenaire pour trouver l'utilisateur associé
      const { data: partnerData, error: partnerFetchError } = await supabase
        .from("Partenaire")
        .select("Email")
        .eq("IDPartenaire", partnerId)
        .single();

      if (partnerFetchError) {
        toast({
          title: "Erreur",
          description: "Impossible de récupérer les informations du partenaire.",
          variant: "destructive"
        });
        return;
      }

      // Supprimer les bons plans associés
      const { error: bonPlanError } = await supabase
        .from("BonPlan")
        .delete()
        .eq("IDPartenaire", partnerId);

      if (bonPlanError) {
        toast({
          title: "Erreur",
          description: "Erreur lors de la suppression des bons plans associés.",
          variant: "destructive"
        });
        return;
      }

      // Supprimer les relations services
      const { error: servicesError } = await supabase
        .from("Partenaire_Services")
        .delete()
        .eq("IDPartenaire", partnerId);

      if (servicesError) {
        toast({
          title: "Erreur",
          description: "Erreur lors de la suppression des services associés.",
          variant: "destructive"
        });
        return;
      }

      // Supprimer le partenaire
      const { error: partnerError } = await supabase
        .from("Partenaire")
        .delete()
        .eq("IDPartenaire", partnerId);

      if (partnerError) {
        toast({
          title: "Erreur",
          description: "Impossible de supprimer le partenaire.",
          variant: "destructive"
        });
        return;
      }

      // Supprimer l'utilisateur associé s'il existe
      if (partnerData.Email) {
        const { error: userError } = await supabase
          .from("Utilisateurs")
          .delete()
          .eq("Email", partnerData.Email);

        if (userError) {
          console.warn("Erreur lors de la suppression de l'utilisateur associé:", userError);
          // Ne pas faire échouer toute l'opération si la suppression de l'utilisateur échoue
        }
      }

      toast({
        title: "Partenaire supprimé",
        description: "Le partenaire et ses dépendances ont été supprimés avec succès.",
      });

      // Recharger toutes les données pour s'assurer que l'interface se met à jour correctement
      await Promise.all([
        fetchPartners(),
        fetchBonsPlans(),
        fetchServices(),
        fetchPartenaireServices()
      ]);
      
    } catch (error) {
      console.error("Erreur lors de la suppression du partenaire:", error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite lors de la suppression.",
        variant: "destructive"
      });
    }
  };

  const handleContactPartner = (partner: Partner) => {
    toast({
      title: "Contact partenaire",
      description: `Ouverture du contact avec ${partner.nom}`,
    });
    window.location.href = `mailto:${partner.email}?subject=Contact depuis AppSeniors Admin`;
  };

  // For bon plans, basic implementation (edit/add/delete: only update local state + refetch for now)
  const handleAddBonPlan = async (newBonPlanData: Omit<BonPlan, 'id'>) => {
    // Find partner ID by name
    const partnerRow = rawPartners.find(p => p.RaisonSociale === newBonPlanData.partenaire);
    const partnerId = partnerRow?.IDPartenaire;
    if (!partnerId) {
      toast({
        title: "Erreur",
        description: "Partenaire non trouvé pour ce bon plan.",
        variant: "destructive"
      });
      return;
    }
    const { error } = await supabase.from("BonPlan").insert({
      TitreBonPlan: newBonPlanData.titre,
      DescriptionBonPlan: newBonPlanData.description,
      TypeReduction: newBonPlanData.typeReduction,
      PourcentageReduction: newBonPlanData.valeurReduction,
      DateDebutReduction: newBonPlanData.dateDebutReduction,
      DateFinReduction: newBonPlanData.dateFinReduction,
      CodePromo: newBonPlanData.codePromo,
      StatutBonPlan: newBonPlanData.statut,
      IDPartenaire: partnerId,
    });
    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le bon plan.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Bon plan ajouté",
        description: `Le bon plan "${newBonPlanData.titre}" a été ajouté.`,
      });
      fetchBonsPlans();
    }
  };

  const handleEditBonPlan = async (updatedBonPlan: BonPlan) => {
    // Find partner ID by name
    const partnerRow = rawPartners.find(p => p.RaisonSociale === updatedBonPlan.partenaire);
    const partnerId = partnerRow?.IDPartenaire;
    if (!partnerId) {
      toast({
        title: "Erreur",
        description: "Partenaire non trouvé pour ce bon plan.",
        variant: "destructive"
      });
      return;
    }
    const { error } = await supabase.from("BonPlan")
      .update({
        TitreBonPlan: updatedBonPlan.titre,
        DescriptionBonPlan: updatedBonPlan.description,
        TypeReduction: updatedBonPlan.typeReduction,
        PourcentageReduction: updatedBonPlan.valeurReduction,
        DateDebutReduction: updatedBonPlan.dateDebutReduction,
        DateFinReduction: updatedBonPlan.dateFinReduction,
        CodePromo: updatedBonPlan.codePromo,
        StatutBonPlan: updatedBonPlan.statut,
        IDPartenaire: partnerId,
      })
      .eq("IDBonPlan", updatedBonPlan.id);
    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier le bon plan.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Bon plan modifié",
        description: `Le bon plan "${updatedBonPlan.titre}" a été mis à jour.`,
      });
      fetchBonsPlans();
    }
  };

  const handleDeleteBonPlan = async (id: number) => {
    const { error } = await supabase
      .from("BonPlan")
      .delete()
      .eq("IDBonPlan", id);
    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le bon plan.",
        variant: "destructive"
      });
    } else {
      toast({ title: "Bon plan supprimé", description: "Suppression réussie." });
      fetchBonsPlans();
    }
  };

  // Used for bon plan modal (partner selection)
  const getPartenairesForSelect = (): PartnerForSelect[] => {
    return partners.map(partner => ({
      id: partner.id,
      name: partner.nom
    }));
  };

  return {
    partners,
    bonsPlans,
    handleAddPartner,
    handleContactPartner,
    handleAddBonPlan,
    handleEditBonPlan,
    handleDeleteBonPlan,
    getPartenairesForSelect,
    handleUpdatePartner,
    handleDeletePartner
  };
};

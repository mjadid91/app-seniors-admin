
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
    // Only process when all necessary data are fetched
    if (!rawPartners.length || !services.length || !partenaireServices.length) return;

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
        type,
        email: p.Email,
        telephone: p.Telephone,
        adresse: p.Adresse,
        statut: "Actif", // No field, so always "Actif"
        evaluation: 5,   // No evaluation field
        services: serviceNames,
        dateInscription: "", // Not available in schema
      };
    });
    setPartners(buildPartners);
  }, [rawPartners, services, partenaireServices]);

  // Fetch bons plans
  const fetchBonsPlans = useCallback(async () => {
    // Get BonPlan with the partner name joined
    // Since no join in Supabase, do in code
    const { data, error } = await supabase
      .from("BonPlan")
      .select("*");
    if (error) {
      toast({ title: "Erreur", description: "Impossible de charger les bons plans.", variant: "destructive" });
      return;
    }
    // We'll attach partner name by looking for the partner in rawPartners
    setBonsPlans(
      (data as DBBonPlan[]).map((b) => {
        let partenaireNom = "";
        if (b.IDPartenaire && rawPartners.length > 0) {
          const found = rawPartners.find((p) => p.IDPartenaire === b.IDPartenaire);
          partenaireNom = found?.RaisonSociale || "";
        }
        return {
          id: b.IDBonPlan,
          titre: b.TitreBonPlan,
          partenaire: partenaireNom,
          description: b.DescriptionBonPlan,
          typeReduction: b.TypeReduction,
          valeurReduction: b.TypeReduction === "pourcentage" ? b.PourcentageReduction : b.PourcentageReduction, // For both cases
          dateDebutReduction: b.DateDebutReduction,
          dateFinReduction: b.DateFinReduction,
          codePromo: b.CodePromo,
          statut: b.StatutBonPlan,
        };
      })
    );
  }, [rawPartners, toast]);

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

  // Handlers (for now, only toasts and refetch; you can implement full CRUD next step if needed)
  const handleAddPartner = async (newPartnerData: Omit<Partner, 'id'>) => {
    const { error } = await supabase.from("Partenaire").insert({
      RaisonSociale: newPartnerData.nom,
      Email: newPartnerData.email,
      Telephone: newPartnerData.telephone,
      Adresse: newPartnerData.adresse,
      TypePartenaire: newPartnerData.type,
    });
    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le partenaire.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Partenaire ajouté",
        description: `${newPartnerData.nom} a été ajouté avec succès.`,
      });
      fetchPartners();
      fetchPartenaireServices();
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
    getPartenairesForSelect
  };
};


import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Partner, BonPlan, PartnerForSelect } from "./types";

export const usePartners = () => {
  const [partners, setPartners] = useState<Partner[]>([
    {
      id: 1,
      nom: "Services Plus",
      type: "Prestataire de services",
      email: "contact@servicesplus.fr",
      telephone: "01 23 45 67 89",
      adresse: "15 rue de la République, 75001 Paris",
      statut: "Actif",
      evaluation: 4.8,
      services: ["Ménage", "Jardinage", "Bricolage"],
      dateInscription: "2023-01-15"
    },
    {
      id: 2,
      nom: "Aide à Domicile Pro",
      type: "Aide à domicile",
      email: "info@aidedomicilepro.fr",
      telephone: "01 34 56 78 90",
      adresse: "8 avenue des Champs, 69001 Lyon",
      statut: "Actif",
      evaluation: 4.6,
      services: ["Aide à domicile", "Courses", "Compagnie"],
      dateInscription: "2023-03-22"
    },
    {
      id: 3,
      nom: "Tech Senior",
      type: "Support technique",
      email: "support@techsenior.fr",
      telephone: "01 45 67 89 01",
      adresse: "22 rue du Commerce, 33000 Bordeaux",
      statut: "En attente",
      evaluation: 4.2,
      services: ["Support informatique", "Installation", "Formation"],
      dateInscription: "2024-01-10"
    }
  ]);

  const [bonsPlans, setBonsPlans] = useState<BonPlan[]>([
    {
      id: 1,
      titre: "Réduction ménage 20%",
      partenaire: "Services Plus",
      description: "Bénéficiez de 20% de réduction sur tous les services de ménage pour les nouveaux clients seniors",
      typeReduction: "pourcentage",
      valeurReduction: 20,
      dateDebutReduction: "2024-06-01",
      dateFinReduction: "2024-12-31",
      codePromo: "SENIOR20",
      statut: "Actif"
    },
    {
      id: 2,
      titre: "Première consultation gratuite",
      partenaire: "Tech Senior",
      description: "Première consultation informatique offerte pour tout nouveau client senior, incluant diagnostic et conseils personnalisés",
      typeReduction: "gratuit",
      valeurReduction: 0,
      dateDebutReduction: "2024-05-15",
      dateFinReduction: "2024-08-31",
      codePromo: "WELCOME",
      statut: "Actif"
    },
    {
      id: 3,
      titre: "Aide à domicile -15€",
      partenaire: "Aide à Domicile Pro",
      description: "Réduction de 15€ sur votre première prestation d'aide à domicile d'une durée minimum de 3 heures",
      typeReduction: "montant",
      valeurReduction: 15,
      dateDebutReduction: "2024-06-10",
      dateFinReduction: "2024-09-30",
      codePromo: "AIDE15",
      statut: "Actif"
    }
  ]);

  const { toast } = useToast();

  const handleAddPartner = (newPartnerData: Omit<Partner, 'id'>) => {
    const newPartner: Partner = {
      ...newPartnerData,
      id: partners.length + 1
    };
    setPartners(prev => [...prev, newPartner]);
    toast({
      title: "Partenaire ajouté",
      description: `${newPartnerData.nom} a été ajouté avec succès.`,
    });
  };

  const handleContactPartner = (partner: Partner) => {
    toast({
      title: "Contact partenaire",
      description: `Ouverture du contact avec ${partner.nom}`,
    });
    window.location.href = `mailto:${partner.email}?subject=Contact depuis AppSeniors Admin`;
  };

  const handleAddBonPlan = (newBonPlanData: Omit<BonPlan, 'id'>) => {
    const newBonPlan: BonPlan = {
      ...newBonPlanData,
      id: bonsPlans.length + 1
    };
    setBonsPlans(prev => [...prev, newBonPlan]);
  };

  const handleEditBonPlan = (updatedBonPlan: BonPlan) => {
    setBonsPlans(prev => 
      prev.map(bonPlan => 
        bonPlan.id === updatedBonPlan.id ? updatedBonPlan : bonPlan
      )
    );
  };

  const handleDeleteBonPlan = (id: number) => {
    setBonsPlans(prev => prev.filter(bonPlan => bonPlan.id !== id));
  };

  const getPartenairesForSelect = (): PartnerForSelect[] => {
    return partners.map(partner => ({
      id: partner.id,
      name: partner.nom // Map French 'nom' to English 'name'
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

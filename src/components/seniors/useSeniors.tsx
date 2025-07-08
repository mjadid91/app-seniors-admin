
import { useState, useEffect } from "react";
import { Senior, Aidant, SeniorsStats } from "../../types/seniors";
import { useSupabaseSeniors } from "../../hooks/useSupabaseSeniors";
import { useToast } from "@/hooks/use-toast";

export const useSeniors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSeniors, setFilteredSeniors] = useState<Senior[]>([]);
  const [filteredAidants, setFilteredAidants] = useState<Aidant[]>([]);
  const [stats, setStats] = useState<SeniorsStats>({
    totalSeniors: 0,
    seniorsActifs: 0,
    totalAidants: 0,
    aidantsActifs: 0,
    humeurPositive: 0,
    humeurNegative: 0
  });

  // États pour les modales
  const [isAddSeniorModalOpen, setIsAddSeniorModalOpen] = useState(false);
  const [isEditSeniorModalOpen, setIsEditSeniorModalOpen] = useState(false);
  const [isEditAidantModalOpen, setIsEditAidantModalOpen] = useState(false);
  const [isDeleteSeniorModalOpen, setIsDeleteSeniorModalOpen] = useState(false);
  const [isDeleteAidantModalOpen, setIsDeleteAidantModalOpen] = useState(false);
  const [selectedSenior, setSelectedSenior] = useState<Senior | null>(null);
  const [selectedAidant, setSelectedAidant] = useState<Aidant | null>(null);

  const { 
    seniors, 
    aidants, 
    loading, 
    error, 
    refetch, 
    addSenior, 
    updateSenior, 
    deleteSenior, 
    updateAidant, 
    deleteAidant 
  } = useSupabaseSeniors();
  const { toast } = useToast();

  // Calculate stats when data changes
  useEffect(() => {
    if (seniors.length > 0 || aidants.length > 0) {
      const newStats: SeniorsStats = {
        totalSeniors: seniors.length,
        seniorsActifs: seniors.filter(s => s.statut === 'actif').length,
        totalAidants: aidants.length,
        aidantsActifs: aidants.filter(a => a.statut === 'actif').length,
        humeurPositive: 0, // À implémenter selon les données d'humeur
        humeurNegative: 0   // À implémenter selon les données d'humeur
      };
      setStats(newStats);
    }
  }, [seniors, aidants]);

  // Filter seniors and aidants based on search term
  useEffect(() => {
    const filterData = (data: (Senior | Aidant)[], searchTerm: string) => {
      if (!searchTerm.trim()) return data;
      
      const term = searchTerm.toLowerCase();
      return data.filter(item => 
        item.nom.toLowerCase().includes(term) ||
        item.prenom.toLowerCase().includes(term) ||
        item.email.toLowerCase().includes(term)
      );
    };

    setFilteredSeniors(filterData(seniors, searchTerm) as Senior[]);
    setFilteredAidants(filterData(aidants, searchTerm) as Aidant[]);
  }, [searchTerm, seniors, aidants]);

  const handleAddSenior = () => {
    setIsAddSeniorModalOpen(true);
  };

  const handleEditSenior = (senior: Senior) => {
    setSelectedSenior(senior);
    setIsEditSeniorModalOpen(true);
  };

  const handleDeleteSenior = (senior: Senior) => {
    setSelectedSenior(senior);
    setIsDeleteSeniorModalOpen(true);
  };

  const handleEditAidant = (aidant: Aidant) => {
    setSelectedAidant(aidant);
    setIsEditAidantModalOpen(true);
  };

  const handleDeleteAidant = (aidant: Aidant) => {
    setSelectedAidant(aidant);
    setIsDeleteAidantModalOpen(true);
  };

  const handleAddSeniorSubmit = async (seniorData: {
    nom: string;
    prenom: string;
    email: string;
    telephone?: string;
    dateNaissance?: string;
    adresse?: string;
    genre?: string;
    niveauAutonomie?: 'faible' | 'moyen' | 'eleve';
  }) => {
    try {
      await addSenior(seniorData);
      toast({
        title: "Senior ajouté",
        description: `${seniorData.prenom} ${seniorData.nom} a été ajouté avec succès.`,
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du senior:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le senior.",
        variant: "destructive"
      });
    }
  };

  const handleSaveSenior = async (updatedSenior: Senior) => {
    try {
      await updateSenior(updatedSenior.id, updatedSenior);
      toast({
        title: "Senior modifié",
        description: `${updatedSenior.prenom} ${updatedSenior.nom} a été modifié avec succès.`,
      });
    } catch (error) {
      console.error('Erreur lors de la modification du senior:', error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier le senior.",
        variant: "destructive"
      });
    }
  };

  const handleSaveAidant = async (updatedAidant: Aidant) => {
    try {
      await updateAidant(updatedAidant.id, updatedAidant);
      toast({
        title: "Aidant modifié",
        description: `${updatedAidant.prenom} ${updatedAidant.nom} a été modifié avec succès.`,
      });
    } catch (error) {
      console.error('Erreur lors de la modification de l\'aidant:', error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier l'aidant.",
        variant: "destructive"
      });
    }
  };

  const handleConfirmDeleteSenior = async (senior: Senior) => {
    try {
      await deleteSenior(senior.id);
      toast({
        title: "Senior supprimé",
        description: `${senior.prenom} ${senior.nom} a été supprimé avec succès.`,
      });
    } catch (error) {
      console.error('Erreur lors de la suppression du senior:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le senior.",
        variant: "destructive"
      });
    }
  };

  const handleConfirmDeleteAidant = async (aidant: Aidant) => {
    try {
      await deleteAidant(aidant.id);
      toast({
        title: "Aidant supprimé",
        description: `${aidant.prenom} ${aidant.nom} a été supprimé avec succès.`,
      });
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'aidant:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'aidant.",
        variant: "destructive"
      });
    }
  };

  return {
    // State
    searchTerm,
    seniors,
    aidants,
    filteredSeniors,
    filteredAidants,
    stats,
    loading,
    error,
    
    // Modal states
    isAddSeniorModalOpen,
    isEditSeniorModalOpen,
    isEditAidantModalOpen,
    isDeleteSeniorModalOpen,
    isDeleteAidantModalOpen,
    selectedSenior,
    selectedAidant,
    
    // Actions
    setSearchTerm,
    handleAddSenior,
    handleEditSenior,
    handleDeleteSenior,
    handleEditAidant,
    handleDeleteAidant,
    handleAddSeniorSubmit,
    handleSaveSenior,
    handleSaveAidant,
    handleConfirmDeleteSenior,
    handleConfirmDeleteAidant,
    refetch,
    
    // Modal controls
    setIsAddSeniorModalOpen,
    setIsEditSeniorModalOpen,
    setIsEditAidantModalOpen,
    setIsDeleteSeniorModalOpen,
    setIsDeleteAidantModalOpen
  };
};

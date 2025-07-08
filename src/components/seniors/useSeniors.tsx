
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
  const [isEditSeniorModalOpen, setIsEditSeniorModalOpen] = useState(false);
  const [isEditAidantModalOpen, setIsEditAidantModalOpen] = useState(false);
  const [isDeleteSeniorModalOpen, setIsDeleteSeniorModalOpen] = useState(false);
  const [isDeleteAidantModalOpen, setIsDeleteAidantModalOpen] = useState(false);
  const [selectedSenior, setSelectedSenior] = useState<Senior | null>(null);
  const [selectedAidant, setSelectedAidant] = useState<Aidant | null>(null);

  const { seniors, aidants, loading, error, refetch } = useSupabaseSeniors();
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

  const handleSaveSenior = (updatedSenior: Senior) => {
    // Ici, vous pouvez ajouter la logique pour sauvegarder en base de données
    console.log('Sauvegarde senior:', updatedSenior);
    // Pour l'instant, on simule juste la sauvegarde
    refetch();
  };

  const handleSaveAidant = (updatedAidant: Aidant) => {
    // Ici, vous pouvez ajouter la logique pour sauvegarder en base de données
    console.log('Sauvegarde aidant:', updatedAidant);
    // Pour l'instant, on simule juste la sauvegarde
    refetch();
  };

  const handleConfirmDeleteSenior = (senior: Senior) => {
    // Ici, vous pouvez ajouter la logique pour supprimer en base de données
    console.log('Suppression senior:', senior);
    // Pour l'instant, on simule juste la suppression
    refetch();
  };

  const handleConfirmDeleteAidant = (aidant: Aidant) => {
    // Ici, vous pouvez ajouter la logique pour supprimer en base de données
    console.log('Suppression aidant:', aidant);
    // Pour l'instant, on simule juste la suppression
    refetch();
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
    isEditSeniorModalOpen,
    isEditAidantModalOpen,
    isDeleteSeniorModalOpen,
    isDeleteAidantModalOpen,
    selectedSenior,
    selectedAidant,
    
    // Actions
    setSearchTerm,
    handleEditSenior,
    handleDeleteSenior,
    handleEditAidant,
    handleDeleteAidant,
    handleSaveSenior,
    handleSaveAidant,
    handleConfirmDeleteSenior,
    handleConfirmDeleteAidant,
    refetch,
    
    // Modal controls
    setIsEditSeniorModalOpen,
    setIsEditAidantModalOpen,
    setIsDeleteSeniorModalOpen,
    setIsDeleteAidantModalOpen
  };
};

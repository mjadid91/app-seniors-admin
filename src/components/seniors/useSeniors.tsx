
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
    toast({
      title: "Modification senior",
      description: `Modification de ${senior.prenom} ${senior.nom} (fonctionnalité à implémenter)`,
    });
  };

  const handleDeleteSenior = (senior: Senior) => {
    toast({
      title: "Suppression senior",
      description: `Suppression de ${senior.prenom} ${senior.nom} (fonctionnalité à implémenter)`,
      variant: "destructive"
    });
  };

  const handleEditAidant = (aidant: Aidant) => {
    toast({
      title: "Modification aidant",
      description: `Modification de ${aidant.prenom} ${aidant.nom} (fonctionnalité à implémenter)`,
    });
  };

  const handleDeleteAidant = (aidant: Aidant) => {
    toast({
      title: "Suppression aidant",
      description: `Suppression de ${aidant.prenom} ${aidant.nom} (fonctionnalité à implémenter)`,
      variant: "destructive"
    });
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
    
    // Actions
    setSearchTerm,
    handleEditSenior,
    handleDeleteSenior,
    handleEditAidant,
    handleDeleteAidant,
    refetch
  };
};


import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface DocumentFormData {
  name: string;
  category: string;
  status: string;
  description: string;
  utilisateurId: string;
}

export const useDocumentForm = (isOpen: boolean) => {
  const [formData, setFormData] = useState<DocumentFormData>({
    name: "",
    category: "",
    status: "Brouillon",
    description: "",
    utilisateurId: ""
  });
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [users, setUsers] = useState<{ id: number; fullName: string }[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      loadCategories();
      loadUsers();
    }
  }, [isOpen, toast]);

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("CategorieDocument")
        .select("IDCategorieDocument, NomCategorie");

      if (error) {
        toast({ title: "Erreur", description: "Échec du chargement des catégories.", variant: "destructive" });
        return;
      }

      setCategories(data.map((cat) => cat.NomCategorie));
    } catch (error) {
      console.error('Erreur lors du chargement des catégories:', error);
      toast({ title: "Erreur", description: "Échec du chargement des catégories.", variant: "destructive" });
    }
  };

  const loadUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("Utilisateurs")
        .select("IDUtilisateurs, Nom, Prenom");

      if (error) {
        toast({ title: "Erreur", description: "Échec du chargement des utilisateurs.", variant: "destructive" });
        return;
      }

      setUsers(data.map(user => ({
        id: user.IDUtilisateurs,
        fullName: `${user.Prenom} ${user.Nom}`
      })));
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error);
      toast({ title: "Erreur", description: "Échec du chargement des utilisateurs.", variant: "destructive" });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      status: "Brouillon",
      description: "",
      utilisateurId: ""
    });
    setFile(null);
  };

  const validateForm = () => {
    if (!formData.name || !formData.category || !formData.utilisateurId) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  return {
    formData,
    setFormData,
    file,
    setFile,
    isLoading,
    setIsLoading,
    categories,
    users,
    resetForm,
    validateForm,
    toast
  };
};

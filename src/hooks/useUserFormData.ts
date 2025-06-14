
import { useState } from 'react';

interface UserFormData {
  nom: string;
  prenom: string;
  email: string;
  categoryId: number;
  languePreferee: string;
  devise: string;
}

export const useUserFormData = () => {
  const [formData, setFormData] = useState<UserFormData>({
    nom: "",
    prenom: "",
    email: "",
    categoryId: 0,
    languePreferee: "",
    devise: ""
  });

  const resetFormData = () => {
    setFormData({
      nom: "",
      prenom: "",
      email: "",
      categoryId: 0,
      languePreferee: "",
      devise: ""
    });
  };

  return {
    formData,
    setFormData,
    resetFormData
  };
};

export type { UserFormData };

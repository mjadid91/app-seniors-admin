
import { useState } from 'react';

export const usePasswordUtils = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  // Générer un mot de passe aléatoire
  const generatePassword = (): string => {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    return password;
  };

  // Hasher le mot de passe (simple hachage pour la démo)
  const hashPassword = async (password: string): Promise<string> => {
    setIsGenerating(true);
    try {
      // Dans un vrai environnement, utilisez bcrypt ou une méthode plus sécurisée
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      return hashHex;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generatePassword,
    hashPassword,
    isGenerating
  };
};

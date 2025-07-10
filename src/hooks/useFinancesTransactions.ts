
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface FinanceTransaction {
  id: number;
  type: string;
  utilisateur: string;
  montant: number;
  commission: number;
  date: string;
  statut: string;
  // Ajouter les identifiants spécifiques pour chaque type
  originalId?: number;
  idCommande?: number;
  idActiviteRemuneree?: number;
  idServicePostMortem?: number;
}

export const useFinancesTransactions = () => {
  return useQuery<FinanceTransaction[]>({
    queryKey: ["finances-transactions"],
    queryFn: async () => {
      console.log("Récupération des transactions...");
      
      // Récupérer les commandes
      const { data: commandes, error: errorCommandes } = await supabase
        .from("Commande")
        .select(`
          IDCommande,
          MontantTotal,
          StatutCommande,
          DateCommande,
          IDUtilisateurPayeur
        `);

      // Récupérer les activités rémunérées
      const { data: activites, error: errorActivites } = await supabase
        .from("ActiviteRemuneree_Utilisateurs")
        .select(`
          IDActiviteRemuneree,
          MontantRevenu,
          StatutPaiement,
          DateTransaction,
          IDUtilisateurs
        `);

      // Pour l'instant, on ne récupère pas les services post-mortem car la table n'existe pas
      // const { data: services, error: errorServices } = await supabase
      //   .from("ServicePostMortem")
      //   .select(`...`);

      if (errorCommandes || errorActivites) {
        console.error("Erreurs lors du chargement:", { errorCommandes, errorActivites });
        throw new Error("Erreur lors du chargement des transactions");
      }

      const transactions: FinanceTransaction[] = [];

      // Récupérer les informations des utilisateurs en une seule requête
      const allUserIds = [
        ...(commandes?.map(c => c.IDUtilisateurPayeur).filter(Boolean) || []),
        ...(activites?.map(a => a.IDUtilisateurs).filter(Boolean) || [])
      ];

      const uniqueUserIds = [...new Set(allUserIds)];
      
      let usersData: { [key: number]: { Nom: string; Prenom: string } } = {};
      
      if (uniqueUserIds.length > 0) {
        const { data: users } = await supabase
          .from("Utilisateurs")
          .select("IDUtilisateurs, Nom, Prenom")
          .in("IDUtilisateurs", uniqueUserIds);
        
        if (users) {
          usersData = users.reduce((acc, user) => {
            acc[user.IDUtilisateurs] = { Nom: user.Nom, Prenom: user.Prenom };
            return acc;
          }, {} as { [key: number]: { Nom: string; Prenom: string } });
        }
      }

      // Traiter les commandes
      commandes?.forEach(commande => {
        const commission = commande.MontantTotal * 0.05; // 5% de commission par défaut
        const user = commande.IDUtilisateurPayeur ? usersData[commande.IDUtilisateurPayeur] : null;
        
        transactions.push({
          id: commande.IDCommande,
          originalId: commande.IDCommande,
          idCommande: commande.IDCommande,
          type: "Commande",
          utilisateur: user ? `${user.Prenom} ${user.Nom}` : "Inconnu",
          montant: commande.MontantTotal || 0,
          commission: commission,
          date: commande.DateCommande,
          statut: commande.StatutCommande || "En attente"
        });
      });

      // Traiter les activités
      activites?.forEach(activite => {
        const commission = activite.MontantRevenu * 0.05;
        const user = activite.IDUtilisateurs ? usersData[activite.IDUtilisateurs] : null;
        
        transactions.push({
          id: activite.IDActiviteRemuneree || 0,
          originalId: activite.IDActiviteRemuneree,
          idActiviteRemuneree: activite.IDActiviteRemuneree,
          type: "Activite",
          utilisateur: user ? `${user.Prenom} ${user.Nom}` : "Inconnu",
          montant: activite.MontantRevenu || 0,
          commission: commission,
          date: activite.DateTransaction,
          statut: activite.StatutPaiement || "En attente"
        });
      });

      console.log("Transactions récupérées:", transactions);
      return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    },
  });
};

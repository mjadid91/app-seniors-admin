
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
  idDonCagnotte?: number;
}

export const useFinancesTransactions = () => {
  return useQuery<FinanceTransaction[]>({
    queryKey: ["finances-transactions"],
    queryFn: async () => {
      console.log("Récupération des transactions...");
      
      const transactions: FinanceTransaction[] = [];

      try {
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

        // Récupérer les services post-mortem
        const { data: services, error: errorServices } = await supabase
          .from("ServicePostMortem")
          .select(`
            IDServicePostMortem,
            MontantPrestation,
            DateService,
            Prestataire,
            StatutService
          `);

        // Récupérer les dons
        const { data: dons, error: errorDons } = await supabase
          .from("DonCagnotte")
          .select(`
            IDDonCagnotte,
            Montant,
            DateDon,
            IDDonateur,
            MessageDon
          `);

        // Récupérer les commissions
        const { data: commissions, error: errorCommissions } = await supabase
          .from("VersementCommissions")
          .select(`
            IDVersementCommissions,
            MontantCommission,
            DateVersement,
            MoyenVersement,
            TypeTransaction,
            PourcentageCommission,
            IDCommande,
            IDActiviteRemuneree,
            IDDonCagnotte,
            IDServicePostMortem
          `);

        if (errorCommandes || errorActivites || errorServices || errorDons || errorCommissions) {
          console.error("Erreurs lors du chargement:", { 
            errorCommandes, 
            errorActivites, 
            errorServices, 
            errorDons, 
            errorCommissions 
          });
          throw new Error("Erreur lors du chargement des transactions");
        }

        // Récupérer les informations des utilisateurs
        const allUserIds = [
          ...(commandes?.map(c => c.IDUtilisateurPayeur).filter(Boolean) || []),
          ...(activites?.map(a => a.IDUtilisateurs).filter(Boolean) || []),
          ...(dons?.map(d => d.IDDonateur).filter(Boolean) || [])
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
          const user = commande.IDUtilisateurPayeur ? usersData[commande.IDUtilisateurPayeur] : null;
          const commission = commissions?.find(c => c.IDCommande === commande.IDCommande);
          
          transactions.push({
            id: commande.IDCommande,
            originalId: commande.IDCommande,
            idCommande: commande.IDCommande,
            type: "Commande",
            utilisateur: user ? `${user.Prenom} ${user.Nom}` : "Inconnu",
            montant: commande.MontantTotal || 0,
            commission: commission?.MontantCommission || (commande.MontantTotal || 0) * 0.05,
            date: commande.DateCommande,
            statut: commande.StatutCommande || "En attente"
          });
        });

        // Traiter les activités
        activites?.forEach(activite => {
          const user = activite.IDUtilisateurs ? usersData[activite.IDUtilisateurs] : null;
          const commission = commissions?.find(c => c.IDActiviteRemuneree === activite.IDActiviteRemuneree);
          
          transactions.push({
            id: activite.IDActiviteRemuneree || 0,
            originalId: activite.IDActiviteRemuneree,
            idActiviteRemuneree: activite.IDActiviteRemuneree,
            type: "Activite",
            utilisateur: user ? `${user.Prenom} ${user.Nom}` : "Inconnu",
            montant: activite.MontantRevenu || 0,
            commission: commission?.MontantCommission || (activite.MontantRevenu || 0) * 0.05,
            date: activite.DateTransaction,
            statut: activite.StatutPaiement || "En attente"
          });
        });

        // Traiter les services post-mortem
        services?.forEach(service => {
          const commission = commissions?.find(c => c.IDServicePostMortem === service.IDServicePostMortem);
          
          transactions.push({
            id: service.IDServicePostMortem,
            originalId: service.IDServicePostMortem,
            idServicePostMortem: service.IDServicePostMortem,
            type: "PostMortem",
            utilisateur: service.Prestataire || "Inconnu",
            montant: service.MontantPrestation || 0,
            commission: commission?.MontantCommission || (service.MontantPrestation || 0) * 0.05,
            date: service.DateService,
            statut: service.StatutService || "En attente"
          });
        });

        // Traiter les dons
        dons?.forEach(don => {
          const user = don.IDDonateur ? usersData[don.IDDonateur] : null;
          const commission = commissions?.find(c => c.IDDonCagnotte === don.IDDonCagnotte);
          
          transactions.push({
            id: don.IDDonCagnotte,
            originalId: don.IDDonCagnotte,
            idDonCagnotte: don.IDDonCagnotte,
            type: "Don",
            utilisateur: user ? `${user.Prenom} ${user.Nom}` : "Inconnu",
            montant: don.Montant || 0,
            commission: commission?.MontantCommission || (don.Montant || 0) * 0.05,
            date: don.DateDon,
            statut: "Validé"
          });
        });

        console.log("Transactions récupérées:", transactions);
        return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      } catch (error) {
        console.error("Erreur lors de la récupération des transactions:", error);
        throw error;
      }
    },
  });
};

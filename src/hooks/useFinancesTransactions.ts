
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
  categorie_type: string;
  original_id: number;
  id_utilisateurs?: number;
  id_commande?: number;
  id_activite_remuneree?: number;
  id_service_post_mortem?: number;
  id_don_cagnotte?: number;
  // Legacy fields for backward compatibility
  originalId?: number;
  idCommande?: number;
  idActiviteRemuneree?: number;
  idServicePostMortem?: number;
  idDonCagnotte?: number;
}

export const useFinancesTransactions = () => {
  return useQuery<FinanceTransaction[]>({
    queryKey: ["finances-transactions"],
    // Refetch automatiquement toutes les 2 minutes pour les données financières
    refetchInterval: 2 * 60 * 1000,
    // Garder les données fraîches pendant 1 minute seulement
    staleTime: 1 * 60 * 1000,
    queryFn: async () => {
      console.log("Récupération des transactions...");
      
      try {
        // Récupération des paramètres de commission
        const { data: commissionRates, error: commissionError } = await supabase
          .from("ParametresCommission")
          .select("*");

        if (commissionError) {
          console.error("Erreur lors du chargement des taux de commission:", commissionError);
        }

        const getCommissionRate = (type: string) => {
          const rate = commissionRates?.find(r => r.TypeTransaction === type);
          return rate ? rate.Pourcentage : 5.0; // 5% par défaut
        };

        // Récupération des transactions d'activités rémunérées
        const { data: activiteTransactions, error: activiteError } = await supabase
          .from("ActiviteRemuneree_Utilisateurs")
          .select(`
            *,
            Utilisateurs(Nom, Prenom)
          `)
          .order("DateTransaction", { ascending: false });

        if (activiteError) {
          console.error("Erreur activités:", activiteError);
        }

        // Récupération des commandes
        const { data: commandeTransactions, error: commandeError } = await supabase
          .from("Commande")
          .select(`
            *,
            Utilisateurs(Nom, Prenom)
          `)
          .order("DateCommande", { ascending: false });

        if (commandeError) {
          console.error("Erreur commandes:", commandeError);
        }

        // Récupération des services post-mortem
        const { data: postMortemTransactions, error: postMortemError } = await supabase
          .from("ServicePostMortem")
          .select(`
            *
          `)
          .order("DateService", { ascending: false });

        if (postMortemError) {
          console.error("Erreur services post-mortem:", postMortemError);
        }

        // Récupération des dons (SANS commission)
        const { data: donTransactions, error: donError } = await supabase
          .from("DonCagnotte")
          .select(`
            *,
            Utilisateurs(Nom, Prenom)
          `)
          .order("DateDon", { ascending: false });

        if (donError) {
          console.error("Erreur dons:", donError);
        }

        const transactions: FinanceTransaction[] = [];

        // Traitement des activités rémunérées (AVEC commission)
        activiteTransactions?.forEach((transaction, index) => {
          const commissionRate = getCommissionRate('Activite');
          const commission = (transaction.MontantRevenu * commissionRate) / 100;
          
          transactions.push({
            id: index + 1,
            type: 'Activité rémunérée',
            utilisateur: transaction.Utilisateurs ? 
              `${transaction.Utilisateurs.Prenom} ${transaction.Utilisateurs.Nom}` : 
              'Utilisateur inconnu',
            montant: transaction.MontantRevenu || 0,
            commission: commission,
            date: transaction.DateTransaction,
            statut: transaction.StatutPaiement,
            categorie_type: 'activite',
            original_id: transaction.IDActiviteRemuneree,
            id_utilisateurs: transaction.IDUtilisateurs,
            id_activite_remuneree: transaction.IDActiviteRemuneree,
            // Legacy fields
            originalId: transaction.IDActiviteRemuneree,
            idActiviteRemuneree: transaction.IDActiviteRemuneree
          });
        });

        // Traitement des commandes (AVEC commission)
        commandeTransactions?.forEach((transaction, index) => {
          const commissionRate = getCommissionRate('Commande');
          const commission = (transaction.MontantTotal * commissionRate) / 100;
          
          transactions.push({
            id: index + 10000,
            type: 'Commande',
            utilisateur: transaction.Utilisateurs ? 
              `${transaction.Utilisateurs.Prenom} ${transaction.Utilisateurs.Nom}` : 
              'Utilisateur inconnu',
            montant: transaction.MontantTotal || 0,
            commission: commission,
            date: transaction.DateCommande,
            statut: transaction.StatutCommande,
            categorie_type: 'commande',
            original_id: transaction.IDCommande,
            id_utilisateurs: transaction.IDUtilisateurPayeur,
            id_commande: transaction.IDCommande,
            // Legacy fields
            originalId: transaction.IDCommande,
            idCommande: transaction.IDCommande
          });
        });

        // Traitement des services post-mortem (AVEC commission)
        postMortemTransactions?.forEach((transaction, index) => {
          const commissionRate = getCommissionRate('PostMortem');
          const commission = (transaction.MontantPrestation * commissionRate) / 100;
          
          transactions.push({
            id: index + 20000,
            type: 'Service post-mortem',
            utilisateur: transaction.Prestataire || 'Prestataire inconnu',
            montant: transaction.MontantPrestation || 0,
            commission: commission,
            date: transaction.DateService,
            statut: transaction.StatutService || 'En cours',
            categorie_type: 'postmortem',
            original_id: transaction.IDServicePostMortem,
            id_service_post_mortem: transaction.IDServicePostMortem,
            // Legacy fields
            originalId: transaction.IDServicePostMortem,
            idServicePostMortem: transaction.IDServicePostMortem
          });
        });

        // Traitement des dons (SANS commission)
        donTransactions?.forEach((transaction, index) => {
          transactions.push({
            id: index + 30000,
            type: 'Don cagnotte',
            utilisateur: transaction.Utilisateurs ? 
              `${transaction.Utilisateurs.Prenom} ${transaction.Utilisateurs.Nom}` : 
              'Donateur inconnu',
            montant: transaction.Montant || 0,
            commission: 0, // PAS DE COMMISSION pour les dons
            date: transaction.DateDon,
            statut: 'Validé',
            categorie_type: 'don',
            original_id: transaction.IDDonCagnotte,
            id_utilisateurs: transaction.IDDonateur,
            id_don_cagnotte: transaction.IDDonCagnotte,
            // Legacy fields
            originalId: transaction.IDDonCagnotte,
            idDonCagnotte: transaction.IDDonCagnotte
          });
        });

        // Tri par date décroissante
        transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        console.log("Transactions traitées:", transactions);
        return transactions;
      } catch (error) {
        console.error("Erreur lors de la récupération des transactions:", error);
        throw error;
      }
    },
  });
};


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
          Utilisateurs!Commande_IDUtilisateurPayeur_fkey(Nom, Prenom)
        `);

      // Récupérer les activités rémunérées
      const { data: activites, error: errorActivites } = await supabase
        .from("ActiviteRemuneree_Utilisateurs")
        .select(`
          IDActiviteRemuneree,
          MontantRevenu,
          StatutPaiement,
          DateTransaction,
          Utilisateurs!ActiviteRemuneree_Utilisateurs_IDUtilisateurs_fkey(Nom, Prenom)
        `);

      // Récupérer les services post-mortem
      const { data: services, error: errorServices } = await supabase
        .from("ServicePostMortem")
        .select(`
          IDServicePostMortem,
          MontantUtilise,
          StatutService,
          DateService,
          Utilisateurs!ServicePostMortem_IDUtilisateurs_fkey(Nom, Prenom)
        `);

      if (errorCommandes || errorActivites || errorServices) {
        console.error("Erreurs lors du chargement:", { errorCommandes, errorActivites, errorServices });
        throw new Error("Erreur lors du chargement des transactions");
      }

      const transactions: FinanceTransaction[] = [];

      // Traiter les commandes
      commandes?.forEach(commande => {
        const commission = commande.MontantTotal * 0.05; // 5% de commission par défaut
        transactions.push({
          id: commande.IDCommande,
          originalId: commande.IDCommande,
          idCommande: commande.IDCommande,
          type: "Commande",
          utilisateur: commande.Utilisateurs ? `${commande.Utilisateurs.Prenom} ${commande.Utilisateurs.Nom}` : "Inconnu",
          montant: commande.MontantTotal || 0,
          commission: commission,
          date: commande.DateCommande,
          statut: commande.StatutCommande || "En attente"
        });
      });

      // Traiter les activités
      activites?.forEach(activite => {
        const commission = activite.MontantRevenu * 0.05;
        transactions.push({
          id: activite.IDActiviteRemuneree,
          originalId: activite.IDActiviteRemuneree,
          idActiviteRemuneree: activite.IDActiviteRemuneree,
          type: "Activite",
          utilisateur: activite.Utilisateurs ? `${activite.Utilisateurs.Prenom} ${activite.Utilisateurs.Nom}` : "Inconnu",
          montant: activite.MontantRevenu || 0,
          commission: commission,
          date: activite.DateTransaction,
          statut: activite.StatutPaiement || "En attente"
        });
      });

      // Traiter les services post-mortem
      services?.forEach(service => {
        const montant = parseFloat(service.MontantUtilise || "0");
        const commission = montant * 0.05;
        transactions.push({
          id: service.IDServicePostMortem,
          originalId: service.IDServicePostMortem,
          idServicePostMortem: service.IDServicePostMortem,
          type: "PostMortem",
          utilisateur: service.Utilisateurs ? `${service.Utilisateurs.Prenom} ${service.Utilisateurs.Nom}` : "Inconnu",
          montant: montant,
          commission: commission,
          date: service.DateService,
          statut: service.StatutService || "En attente"
        });
      });

      console.log("Transactions récupérées:", transactions);
      return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    },
  });
};


# 💰 Prompt Lovable - Gestion Financière

## 🎯 Objectif
Créer la page de gestion des transactions financières avec calcul automatique des commissions et interface moderne.

## 📋 Instructions générales

### 1. Structure de la page
Page `/finances` avec système d'onglets Shadcn/UI :
- **Onglet "Transactions"** : Historique complet avec tableau responsive
- **Onglet "Commissions"** : Gestion des taux de commission
- **Interface moderne** : Cards, tooltips, badges colorés
- **Actions contextuelles** : Menu dropdown par transaction

### 2. Types de données TypeScript
```typescript
interface FinanceTransaction {
  id: number;
  originalId?: number;
  idCommande?: number;
  idActiviteRemuneree?: number;
  idServicePostMortem?: number;
  type: 'Commande' | 'Activite' | 'PostMortem' | 'Don';
  utilisateur: string;
  montant: number;
  commission: number;
  date: string;
  statut: 'Payé' | 'En attente' | 'Annulé' | 'Remboursé';
}

interface CommissionRate {
  TypeTransaction: string;
  Pourcentage: number;
}
```

### 3. Composants principaux

#### `Finances.tsx` (Page principale)
- **Tabs Shadcn/UI** : Navigation entre sections
- **TooltipProvider** : Explications des calculs
- **Bouton ajout** : Modal d'ajout de transaction
- **Tableau responsive** : Avec scroll horizontal si nécessaire

#### `TransactionActionsMenu.tsx`
- **DropdownMenu** : Actions Voir/Modifier/Supprimer
- **États multiples** : Gestion indépendante des modals
- **Icônes Lucide** : Eye, Edit, Trash2

### 4. Modals de gestion

#### `TransactionDetailsModal.tsx`
- **Cards informatives** : Informations générales + calculs financiers
- **Icônes contextuelles** : Calculator, DollarSign, Percent, Receipt
- **Calculs détaillés** : Formule step-by-step affichée
- **Layout responsive** : Grid adaptatif

#### `EditTransactionModal.tsx`
- **Formulaire** : Montant et statut éditables
- **Select Shadcn/UI** : Pour les statuts
- **Validation** : Contrôles montant positif
- **Support multi-types** : Commande, Activité, PostMortem

#### `DeleteTransactionModal.tsx`
- **Confirmation sécurisée** : Affichage détails complets
- **AlertTriangle** : Icône d'avertissement
- **Informations critiques** : Type, montant, utilisateur, ID
- **Gestion d'erreurs** : Try/catch avec logs détaillés

#### `AddTransactionModal.tsx`
- **Sélection type** : Dropdown pour choisir le type
- **Formulaires conditionnels** : Un composant par type
- **État local** : Gestion du type sélectionné
- **Réinitialisation** : Reset à la fermeture

### 5. Gestion des commissions

#### `CommissionManagement.tsx`
- **Table Shadcn/UI** : Affichage des taux
- **Dialog d'édition** : Modal pour ajouter/modifier
- **Validation** : Pourcentage 0-100%
- **CRUD complet** : Ajout, modification, suppression
- **Types supportés** : Commande, Activité, PostMortem

### 6. Hook principal

#### `useFinancesTransactions.ts`
```typescript
export const useFinancesTransactions = () => {
  return useQuery<FinanceTransaction[]>({
    queryKey: ["finances-transactions"],
    queryFn: async () => {
      // Récupération des commandes
      const { data: commandes } = await supabase
        .from("Commande")
        .select(`IDCommande, MontantTotal, StatutCommande, DateCommande, IDUtilisateurPayeur`);

      // Récupération des activités
      const { data: activites } = await supabase
        .from("ActiviteRemuneree_Utilisateurs") 
        .select(`IDActiviteRemuneree, MontantRevenu, StatutPaiement, DateTransaction, IDUtilisateurs`);

      // Récupération des utilisateurs en une requête
      const allUserIds = [...commandes.map(c => c.IDUtilisateurPayeur), ...activites.map(a => a.IDUtilisateurs)];
      const { data: users } = await supabase
        .from("Utilisateurs")
        .select("IDUtilisateurs, Nom, Prenom")
        .in("IDUtilisateurs", uniqueUserIds);

      // Transformation et calculs
      const transactions: FinanceTransaction[] = [];
      
      // Processing commandes + activités avec commission 5% par défaut
      // Tri par date décroissante
    },
  });
};
```

### 7. Intégration Supabase

#### Tables utilisées
- **`Commande`** : Commandes marketplace (MontantTotal, StatutCommande, DateCommande)
- **`ActiviteRemuneree_Utilisateurs`** : Revenus activités (MontantRevenu, StatutPaiement)
- **`Utilisateurs`** : Noms complets (Nom, Prenom)
- **`ParametresCommission`** : Taux configurables (TypeTransaction, Pourcentage)

#### Calculs côté client
```typescript
const commission = montant * 0.05; // 5% par défaut
const montantNet = montant - commission;
const pourcentage = ((commission / montant) * 100).toFixed(2);
```

### 8. Interface utilisateur moderne

#### Design Shadcn/UI
- **Tabs** : Navigation fluide entre sections
- **Tables** : Headers fixes, lignes hover
- **Badges** : Colorés par statut (vert=payé, jaune=attente, gris=autres)
- **Tooltips** : Explications des calculs avec icône Info
- **Cards** : Présentation élégante pour détails

#### Responsive design
- **Tables** : `overflow-x-auto` pour scroll horizontal
- **Grids** : Adaptation mobile avec `grid-cols-1 md:grid-cols-3`
- **Modals** : `max-w-2xl` pour les détails, standard pour édition
- **Spacing** : Utilisation cohérente des classes Tailwind

### 9. Validation et feedback

#### Contrôles
- **Montants** : Positifs, format décimal
- **Pourcentages** : Entre 0 et 100
- **Statuts** : Valeurs autorisées uniquement
- **Types** : Selon enum défini

#### Notifications
- **Toast Sonner** : Feedback sur toutes les actions
- **Messages contextuels** : Succès, erreurs, avertissements
- **Loading states** : Boutons désactivés pendant traitement

### 10. Optimisations

#### Performance
- **React Query** : Cache intelligent des données
- **Jointures optimisées** : Une requête utilisateurs pour tous les IDs
- **Memoization** : Calculs répétitifs évités
- **Lazy loading** : Modals chargées à la demande

#### UX/UI
- **États de chargement** : Skeleton ou spinners
- **Actions désactivées** : Pendant les opérations
- **Confirmations** : Pour actions destructives
- **Tooltips informatifs** : Aide contextuelle

### 11. Gestion d'erreurs

#### Logs détaillés
```typescript
console.log("Récupération des transactions...");
console.log("Transactions récupérées:", transactions);
console.error("Erreur lors de la suppression:", error);
```

#### Try/catch robuste
- **Opérations Supabase** : Gestion des erreurs réseau
- **Validation** : Contrôles avant soumission
- **Fallbacks** : Valeurs par défaut si données manquantes

### 12. Accessibilité et UX

#### Accessibilité
- **Labels** : Tous les inputs ont des labels
- **ARIA** : Descriptions pour éléments complexes
- **Keyboard navigation** : Support complet
- **Contrast** : Respect des ratios WCAG

#### Expérience utilisateur
- **Feedback immédiat** : Actions confirmées visuellement
- **Undo possible** : Pour actions non-destructives
- **États persistants** : Préservation des filtres
- **Navigation intuitive** : Breadcrumbs si nécessaire

Créez une interface financière moderne et complète avec calculs automatiques, gestion des commissions, et expérience utilisateur optimisée pour les besoins administratifs.

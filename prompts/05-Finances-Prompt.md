
# 💰 Prompt Lovable - Gestion Financière

## 🎯 Objectif
Créer la page de gestion des transactions financières avec calcul automatique des commissions.

## 📋 Instructions

### 1. Structure de la page
Page `/finances` avec système d'onglets :
- Onglet "Transactions" : historique complet
- Onglet "Commissions" : gestion des taux
- Tableaux avec tri et filtrage
- Métriques financières en en-tête

### 2. Types de données
```typescript
interface Transaction {
  id: string;
  date: Date;
  type: 'Activité rémunérée' | 'Don cagnotte' | 'Commande' | 'Commission versée' | 'Service post-mortem';
  utilisateur: string;
  montant: number;
  commission: number;
  montantNet: number;
  statut: 'Payé' | 'En attente' | 'Annulé' | 'Remboursé';
  moyenPaiement?: string;
}

interface ParametreCommission {
  id: string;
  typeTransaction: string;
  pourcentage: number;
}
```

### 3. Composants principaux

#### Finances.tsx (Page principale)
- Tabs Shadcn/UI
- Métriques financières globales
- Tableau des transactions
- Section gestion des commissions

#### FinancesStats.tsx
- Chiffre d'affaires total
- Commissions générées
- Revenus nets
- Nombre de transactions
- Graphique d'évolution mensuelle

#### TransactionTable.tsx
Colonnes :
- Date (formatée)
- Type (badge coloré)
- Utilisateur (nom complet)
- Montant (€, formaté)
- Commission (€, avec tooltip calcul)
- Net (€, formaté)
- Statut (badge)
- Actions (menu dropdown)

### 4. Calculs automatiques
```typescript
// Formules de calcul
const calculerCommission = (montant: number, pourcentage: number) => {
  return montant * (pourcentage / 100);
};

const calculerNet = (montant: number, commission: number) => {
  return montant - commission;
};
```

### 5. Modals de gestion

#### AddTransactionModal.tsx
Formulaire dynamique selon le type :
- Sélection du type de transaction
- Champs conditionnels selon le type
- Calcul automatique de la commission
- Aperçu du montant net

#### TransactionDetailsModal.tsx
- Détails complets de la transaction
- Formule de calcul de commission
- Historique des modifications
- Justificatifs/documents

#### EditTransactionModal.tsx
- Modification des montants
- Changement de statut
- Mise à jour des moyens de paiement
- Recalcul automatique

#### DeleteTransactionModal.tsx
- Confirmation avec impact
- Suppression transaction + commission
- Avertissement irréversibilité

#### TransactionActionsMenu.tsx
- Dropdown avec actions contextuelles
- Voir détails
- Modifier
- Supprimer
- Télécharger reçu

### 6. Gestion des commissions

#### CommissionManagement.tsx
- Tableau des taux par type
- CRUD complet sur les taux
- Validation 0-100%
- Historique des modifications

#### Taux par défaut
```typescript
const TAUX_DEFAUT = {
  'Commande': 10.0,
  'Activite': 15.0,
  'PostMortem': 5.0,
  'Don': 0.0 // Pas de commission sur les dons
};
```

### 7. Hooks personnalisés

#### useFinancesTransactions.ts
```typescript
interface FinancesHookReturn {
  transactions: Transaction[];
  parametresCommission: ParametreCommission[];
  loading: boolean;
  error: string | null;
  addTransaction: (data: CreateTransactionData) => Promise<void>;
  updateTransaction: (id: string, data: Partial<Transaction>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  updateCommissionRate: (type: string, pourcentage: number) => Promise<void>;
}
```

### 8. Intégration Supabase

#### Tables utilisées
- `VersementCommissions` : commissions calculées
- `ParametresCommission` : taux par type
- `Commande` : commandes marketplace
- `ActiviteRemuneree_Utilisateurs` : revenus activités
- `DonCagnotte` : dons (sans commission)
- `ServicePostMortem` : services post-mortem

#### Triggers automatiques
- Calcul commission à l'insertion
- Mise à jour des montants nets
- Vérification des contraintes

### 9. Fonctionnalités avancées

#### Filtrage et recherche
- Filtrage par période
- Filtrage par type de transaction
- Recherche par utilisateur
- Filtrage par statut

#### Exportation
- Export CSV avec filtres
- Rapports périodiques
- Graphiques exportables
- Données comptables

#### Analytics
- Graphiques de tendances
- Répartition par type
- Top utilisateurs
- Évolution mensuelle

### 10. Interface utilisateur

#### Design
- Tableau responsive avec scroll horizontal
- Tooltips explicatifs sur calculs
- Badges colorés par statut/type
- Formatage monétaire cohérent

#### Interactions
- Tri par colonnes
- Pagination intelligente
- Actions en lot
- Recherche temps réel

### 11. Validation et sécurité
- Validation des montants positifs
- Vérification des taux 0-100%
- Audit trail des modifications
- Contrôle d'accès strict

### 12. Optimisations
- Memoization des calculs
- Pagination côté serveur
- Cache intelligent
- Calculs en temps réel

### 13. Tooltips et aide
- Explication des formules
- Aide contextuelle
- Glossaire financier
- FAQ intégrée

### 14. Notifications
- Alertes sur anomalies
- Notifications de paiement
- Rappels d'échéance
- Alertes de seuil

Créez une interface financière complète avec calculs automatiques, gestion des commissions et reporting avancé, optimisée pour les besoins comptables et administratifs.

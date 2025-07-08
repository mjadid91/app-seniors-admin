
# 💰 Documentation – Page Finances

## 🧭 Objectif

La page **Finances** (`Finances.tsx`) centralise la gestion des transactions financières et des commissions de la plateforme AppSeniors.

---

## 📊 Composant principal

### 💰 Interface principale (`Finances.tsx`)
- **Tabs** : Transactions et Gestion des Commissions
- **Tableau** : Historique complet des transactions
- **Métriques** : Montants, commissions, montants nets
- **Tooltips** : Explications des calculs de commission

---

## 💳 Gestion des transactions

### 📋 Affichage (`TransactionTable`)
- **Colonnes** : Date, Type, Utilisateur, Montant, Commission, Net, Statut, Actions
- **Calculs automatiques** : Commission = Montant × Pourcentage
- **Statuts** : Payé, En attente, Annulé, Remboursé
- **Actions** : Menu déroulant par transaction (Voir, Modifier, Supprimer)

### ➕ Ajout (`AddTransactionModal.tsx`)
- **Types supportés** :
  - Activité rémunérée (`AddActivityRevenueForm.tsx`)
  - Don (`AddDonForm.tsx`)
  - Commande (`AddCommandeForm.tsx`) 
  - Commission (`AddCommissionForm.tsx`)
  - Service post-mortem (`AddPostMortemForm.tsx`)

### ⚙️ Actions sur transactions

#### 👁️ Détails (`TransactionDetailsModal.tsx`)
- **Vue complète** : Toutes les informations de la transaction
- **Calculs détaillés** : Montant, commission, net avec formules
- **Interface** : Cards avec icônes et couleurs par type
- **Formules** : Explication step-by-step des calculs

#### ✏️ Modification (`EditTransactionModal.tsx`)
- **Champs éditables** : Montant, statut
- **Validation** : Contrôles de cohérence des données
- **Mise à jour** : Tables concernées selon le type de transaction
- **Support** : Commande, Activité, PostMortem

#### 🗑️ Suppression (`DeleteTransactionModal.tsx`)
- **Confirmation** : Modal sécurisée avec détails complets
- **Impact** : Suppression transaction + commission associée
- **Vérification** : Affichage des informations critiques
- **Sécurité** : Avertissement irréversibilité

#### 🔧 Menu actions (`TransactionActionsMenu.tsx`)
- **Dropdown** : Actions disponibles par transaction
- **Icônes** : Voir (Eye), Modifier (Edit), Supprimer (Trash)
- **États** : Gestion des modals multiples

---

## 💼 Gestion des commissions

### ⚙️ Interface (`CommissionManagement.tsx`)
- **Table** : Taux par type de transaction
- **CRUD complet** : Ajout, modification, suppression des taux
- **Types supportés** : Commande, Activité, Post Mortem
- **Validation** : Contrôles 0-100% et types autorisés
- **Interface** : Dialog pour édition, confirmation pour suppression

### 🔄 Calcul automatique
- **Taux par défaut** : 5% si aucun taux configuré
- **Application** : Automatique lors du chargement des transactions
- **Formule** : Commission = Montant × (Pourcentage / 100)

---

## 🗄️ Base de données

### 📊 Tables utilisées
- **`ParametresCommission`** : Taux par type de transaction
- **`Commande`** : Commandes marketplace
- **`ActiviteRemuneree_Utilisateurs`** : Revenus activités
- **`Utilisateurs`** : Informations utilisateurs (nom, prénom)

### 🔧 Relations
- **Jointures** : Récupération des noms utilisateurs
- **Calculs** : Commissions calculées côté client
- **Tri** : Par date décroissante

---

## 🔧 Hook principal

### 📡 `useFinancesTransactions.ts`
- **Requête unifiée** : Récupère toutes les transactions de sources multiples
- **Sources** : Commandes et Activités rémunérées
- **Jointures** : Avec table Utilisateurs pour noms complets
- **Calculs** : Commissions automatiques (5% par défaut)
- **Tri** : Par date décroissante
- **IDs tracking** : originalId, idCommande, idActiviteRemuneree pour actions

---

## 🎨 Interface

### 📱 Design responsive
- **Tabs Shadcn/UI** : Navigation entre Transactions et Commissions
- **Table responsive** : Défilement horizontal si nécessaire
- **Tooltips** : Aide contextuelle sur calculs de commission
- **Badges colorés** : Statuts (vert/jaune/gris) et types visuels
- **Cards** : Présentation moderne pour détails

### 🔄 Fonctionnalités
- **Actions contextuelles** : Menu dropdown par ligne
- **Modals multiples** : Gestion d'état indépendante
- **Notifications** : Feedback via Sonner toast
- **Validation** : Contrôles formulaires avant soumission
- **Calculs temps réel** : Affichage commission et net

---

## 🎯 Fonctionnalités implémentées

### ✅ Actuellement disponible
- Affichage transactions avec calculs automatiques
- Gestion CRUD complète des taux de commission
- Actions complètes sur transactions (voir/modifier/supprimer)
- Interface moderne avec Tabs et composants Shadcn/UI
- Tooltips explicatifs pour les calculs financiers
- Support multi-types de transactions
- Validation et feedback utilisateur

### ⏳ Non implémenté
- Triggers Supabase automatiques pour calculs
- Export de données
- Filtrage avancé par période/type
- Analytics et graphiques
- Historique des modifications
- Justificatifs/documents attachés

La page Finances offre une interface complète pour la gestion financière avec calculs automatiques et actions CRUD sur transactions et commissions.

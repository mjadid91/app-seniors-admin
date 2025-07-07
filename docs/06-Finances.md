
# 💰 Documentation – Page Finances

## 🧭 Objectif

La page **Finances** (`Finances.tsx`) centralise la gestion des transactions financières et des commissions de la plateforme AppSeniors.

---

## 📊 Composant principal

### 💰 Interface principale (`Finances.tsx`)
- **Tabs** : Transactions et Gestion des Commissions
- **Tableau** : Historique complet des transactions
- **Métriques** : Montants, commissions, montants nets
- **Tooltips** : Explications des calculs

---

## 💳 Gestion des transactions

### 📋 Affichage
- **Colonnes** : Date, Type, Utilisateur, Montant, Commission, Net, Statut
- **Calculs automatiques** : Commission = Montant × Pourcentage
- **Statuts** : Payé, En attente, Annulé, Remboursé
- **Actions** : Menu déroulant par transaction

### ➕ Ajout (`AddTransactionModal.tsx`)
- **Types supportés** :
  - Activité rémunérée (`AddActivityRevenueForm.tsx`)
  - Don (`AddDonForm.tsx`)
  - Commande (`AddCommandeForm.tsx`)
  - Commission (`AddCommissionForm.tsx`)
  - Service post-mortem (`AddPostMortemForm.tsx`)

### ⚙️ Actions sur transactions

#### 👁️ Détails (`TransactionDetailsModal.tsx`)
- **Vue complète** : Toutes les informations
- **Calculs détaillés** : Montant, commission, net
- **Formules** : Explication des calculs

#### ✏️ Modification (`EditTransactionModal.tsx`)
- **Champs éditables** : Montant, statut, moyen de paiement
- **Validation** : Contrôles de cohérence
- **Mise à jour** : Tables concernées selon le type

#### 🗑️ Suppression (`DeleteTransactionModal.tsx`)
- **Confirmation** : Modal sécurisée avec détails
- **Impact** : Suppression transaction + commission associée
- **Vérification** : Affichage des informations critiques

#### 🔧 Menu actions (`TransactionActionsMenu.tsx`)
- **Dropdown** : Actions disponibles par transaction
- **Icônes** : Voir, Modifier, Supprimer
- **Permissions** : Actions selon les droits

---

## 💼 Gestion des commissions

### ⚙️ Interface (`CommissionManagement.tsx`)
- **Table** : Taux par type de transaction
- **CRUD** : Ajout, modification, suppression des taux
- **Types** : Commande, Activité, Post Mortem
- **Validation** : Contrôles 0-100% et types autorisés

### 🔄 Calcul automatique
- **Triggers Supabase** : Calcul à l'insertion
- **Fonctions** :
  - `create_commission_from_commande()`
  - `create_commission_from_activite()`
  - `create_commission_from_postmortem()`

---

## 🗄️ Base de données

### 📊 Tables utilisées
- **`ParametresCommission`** : Taux par type de transaction
- **`VersementCommissions`** : Commissions calculées
- **`Commande`** : Commandes marketplace
- **`ActiviteRemuneree_Utilisateurs`** : Revenus activités
- **`ServicePostMortem`** : Services post-mortem
- **`DonCagnotte`** : Dons (sans commission)

### 🔧 Fonctions automatiques
- **Calcul de commission** : Automatique à l'insertion
- **Pourcentages configurables** : Via table ParametresCommission
- **Défaut 5%** : Si aucun taux configuré

---

## 🔧 Hook principal

### 📡 `useFinancesTransactions.ts`
- **Requête unifiée** : Récupère toutes les transactions
- **Jointures** : Avec utilisateurs et commissions
- **Calculs** : Montants nets automatiques
- **Types** : Différenciation par source de données

---

## 🎨 Interface

### 📱 Design responsive
- **Tabs Shadcn/UI** : Navigation entre sections
- **Table responsive** : Défilement horizontal si nécessaire
- **Tooltips** : Aide contextuelle sur les calculs
- **Badges colorés** : Statuts et types visuels

### 🔄 Fonctionnalités
- **Tri** : Par toutes les colonnes
- **Calculs temps réel** : Commissions et nets
- **Actions contextuelles** : Menu par ligne
- **Notifications** : Feedback via Sonner

---

## 🎯 Résumé

**Note importante** : Cette page ne contient que les éléments actuellement implémentés dans le code. Aucune fonctionnalité de filtrage avancé, export ou analytics n'est présente.

La page Finances comprend :
- Tableau des transactions avec calculs automatiques
- Gestion des taux de commission configurables
- Actions CRUD sur les transactions
- Formulaires d'ajout par type de transaction
- Calcul automatique des commissions via triggers Supabase
- Interface moderne avec Tabs et composants Shadcn/UI
- Tooltips explicatifs pour les calculs financiers

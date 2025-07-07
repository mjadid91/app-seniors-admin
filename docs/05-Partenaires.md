
# 🤝 Documentation – Page Partenaires

## 🧭 Objectif

La page **Partenaires** (`Partners.tsx`) gère l'écosystème des organisations partenaires et leurs offres promotionnelles sur AppSeniors.

---

## 🏢 Composants principaux

### 📊 Statistiques (`PartnerStats.tsx`)
- **Métriques** : Nombre de partenaires, bons plans actifs
- **Cartes** : Affichage visuel des KPI
- **Statuts** : Répartition par état des partenaires

### 🔍 Filtres (`PartnerFilters.tsx`)
- **Critères** : Par statut, secteur, localisation
- **Recherche** : Nom du partenaire ou service
- **Interface** : Composants de filtrage Shadcn/UI

---

## 🤝 Gestion des partenaires

### 📋 Liste (`PartnersListSection.tsx`)
- **Affichage** : Grid de cartes partenaires
- **Composant** : `PartnerCard.tsx` pour chaque partenaire
- **Actions** : Voir détails, éditer, gérer les offres

### ➕ Ajout (`AddPartnerModal.tsx`)
- **Formulaire** : Informations partenaire
- **Champs** : Nom, secteur, contact, description
- **Validation** : Contrôles de saisie obligatoires

### 👁️ Détails (`PartnerDetailsModal.tsx`)
- **Vue complète** : Toutes les informations partenaire
- **Services** : Liste des prestations proposées
- **Historique** : Activité et statistiques

---

## 🎁 Gestion des bons plans

### 📦 Section (`BonPlansSection.tsx`)
- **Affichage** : Liste des offres promotionnelles
- **Composant** : `BonPlanCard.tsx` pour chaque offre
- **Statuts** : Actif, expiré, à venir

### ➕ Création (`AddBonPlanModal.tsx`)
- **Formulaire** : Titre, description, réduction, validité
- **Types** : Pourcentage, montant fixe, service gratuit
- **Partenaire** : Association à un partenaire existant

### ✏️ Modification (`EditBonPlanModal.tsx`)
- **Édition** : Modification des offres existantes
- **Validation** : Dates, montants, conditions
- **Statut** : Activation/désactivation

### 👁️ Visualisation (`ViewBonPlanModal.tsx`)
- **Détails** : Informations complètes de l'offre
- **Utilisation** : Statistiques d'usage
- **Validité** : Dates et conditions

### 🗑️ Suppression (`DeleteBonPlanModal.tsx`)
- **Confirmation** : Modal de suppression sécurisée
- **Vérification** : Impact sur les utilisations en cours

---

## 🔧 Services et hooks

### 📡 Gestion des données
- **`usePartners.ts`** : Hook principal pour les partenaires
- **`usePartnerServices.ts`** : Gestion des services partenaires
- **`usePartnerPrestations.ts`** : Liaison avec les prestations

### 🏗️ Types
- **`types.ts`** : Définitions TypeScript
- **Interfaces** : Partner, BonPlan, Service
- **États** : Statuts et catégories

---

## 🗄️ Base de données

### 📊 Tables utilisées
- **`Partenaire`** : Informations des organisations
- **`BonPlan`** : Offres promotionnelles
- **`Partenaire_Services`** : Services proposés
- **`BonPlan_Utilisateurs`** : Utilisation des offres

---

## 🎨 Interface

### 📱 Layout adaptatif
- **Tabs** : Onglets Partenaires/Bons Plans
- **Grid responsive** : Cartes adaptatives
- **Modals** : Actions détaillées
- **Filters** : Panneau de filtrage

### 🔄 Fonctionnalités
- **Recherche** : Temps réel sur nom/secteur
- **Tri** : Par statut, date, performance
- **Actions** : CRUD complet
- **Notifications** : Feedback utilisateur via Sonner

---

## 🎯 Résumé

La page Partenaires permet :
- Gestion complète des organisations partenaires
- Création et suivi des offres promotionnelles
- Interface moderne avec Tabs et Cards
- Système de filtrage et recherche avancé
- Intégration complète avec la base Supabase
- Actions CRUD pour partenaires et bons plans

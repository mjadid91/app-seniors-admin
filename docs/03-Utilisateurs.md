
# 👥 Documentation – Page Utilisateurs

## 🧭 Objectif

La page **Utilisateurs** (`UserManagement.tsx`) permet de gérer les comptes utilisateurs administratifs de la plateforme AppSeniors.

---

## 👤 Types d'utilisateurs gérés

### 🛡️ Catégories administratives uniquement
- **Administrateurs** : Accès complet à la plateforme
- **Modérateurs** : Gestion du contenu et modération
- **Support** : Assistance aux utilisateurs
- **Visualisateurs** : Accès en lecture seule

**Note importante** : Cette page ne gère QUE les utilisateurs administratifs, pas les seniors ni les aidants de la plateforme.

---

## 🔍 Composants implémentés

### 📊 Statistiques (`UserStats.tsx`)
- **Métriques** : Nombre d'utilisateurs par rôle
- **Cartes** : Affichage visuel des statistiques
- **Calculs** : Via `userStatsUtils.ts`

### 🔍 Recherche (`UserSearch.tsx`)
- **Champ de recherche** : Filtrage par nom, email
- **Filtres temps réel** : Mise à jour instantanée
- **Utilities** : `userFilterUtils.ts` pour la logique

### 📋 Tableau (`UserTable.tsx`)
- **Affichage** : Liste des utilisateurs administratifs
- **Colonnes** : Nom, Email, Rôle, Statut, Actions
- **Actions** : Modifier, Supprimer, Changer de rôle

---

## ⚙️ Fonctionnalités de gestion

### ➕ Création (`AddUserModal.tsx`)
- **Formulaire** : Informations de base utilisateur
- **Composants** :
  - `UserCreationForm.tsx` : Formulaire principal
  - `UserBasicInfoFields.tsx` : Champs de base
  - `EmailField.tsx` : Validation email
  - `RoleSelector.tsx` : Sélection du rôle
  - `PasswordGenerator.tsx` : Génération de mot de passe

### ✏️ Modification (`EditUserModal.tsx`)
- **Édition** : Informations utilisateur existant
- **Gestion des rôles** : `RoleManager.tsx`
- **Préférences** : `PreferencesFields.tsx`

### 🗑️ Suppression (`DeleteUserConfirm.tsx`)
- **Confirmation** : Modal de confirmation sécurisée
- **Vérification** : `PasswordConfirmation.tsx`

---

## 🔧 Hooks et utilitaires

### 📡 Hooks de données
- **`useUserManagement.tsx`** : Logique principale
- **`useSupabaseUsers.ts`** : Intégration Supabase
- **`useEmailValidation.ts`** : Validation email
- **`usePasswordUtils.ts`** : Utilitaires mot de passe

### 🏗️ Hooks CRUD
- **`useUserCrud.ts`** : Opérations Create/Update/Delete
- **`useUserFetch.ts`** : Récupération des données

### 📊 Types et utilitaires
- **`userTypes.ts`** : Définitions TypeScript
- **`userMockData.ts`** : Données de test
- **`userConversion.ts`** : Conversion de données

---

## 🎨 Interface

### 📱 Layout principal
- **Header** : Titre et bouton d'ajout
- **Stats** : Cartes de statistiques
- **Search** : Barre de recherche
- **Table** : Liste des utilisateurs
- **Modals** : Actions CRUD

### 🔄 États de l'interface
- **Loading** : Skeletons pendant le chargement
- **Empty** : Message si aucun utilisateur
- **Error** : Gestion des erreurs

---

## 🎯 Résumé

La page Utilisateurs permet :
- Gestion exclusive des utilisateurs administratifs
- CRUD complet (Create, Read, Update, Delete)
- Recherche et filtrage en temps réel
- Statistiques par rôle administratif
- Interface moderne avec Shadcn/UI
- Hooks personnalisés pour la gestion des données

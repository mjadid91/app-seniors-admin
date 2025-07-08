
# 👥 Documentation – Page Utilisateurs

## 🧭 Objectif

La page **Utilisateurs** centralise la gestion complète des utilisateurs de la plateforme AppSeniors, incluant les seniors, aidants, et autres types d'utilisateurs.

---

## 📊 Composants principaux

### 👥 Interface principale (`UserManagement.tsx`)
- **Tabs** : Seniors et Aidants
- **Statistiques** : Cartes de métriques par catégorie
- **Recherche** : Filtrage en temps réel
- **Actions** : Ajout d'utilisateurs par type

---

## 👴 Gestion des Seniors

### 📋 Affichage (`SeniorsTable.tsx`)
- **Colonnes** : 
  - Senior (avatar + nom/prénom + ville)
  - Email, Téléphone, Genre
  - Niveau autonomie (badges colorés)
  - Date d'inscription, Statut
  - Actions (Modifier/Supprimer)

### ➕ Ajout (`AddSeniorModal.tsx`)
- **Formulaire complet** : Informations personnelles et préférences
- **Champs** : Nom, prénom, email, téléphone, genre, ville, niveau autonomie
- **Validation** : Contrôles email unique et champs requis

### ✏️ Modification (`EditSeniorModal.tsx`)
- **Édition** : Tous les champs modifiables
- **Pré-remplissage** : Données existantes chargées automatiquement
- **Mise à jour** : Refresh automatique après modification

### 🗑️ Suppression (`DeleteSeniorModal.tsx`)
- **Confirmation** : Modal sécurisée avec détails
- **Cascade** : Suppression senior + utilisateur associé
- **Vérification** : Affichage des informations à supprimer

---

## 🤝 Gestion des Aidants  

### 📋 Affichage (`AidantsTable.tsx`)
- **Colonnes** :
  - Nom, Prénom, Email, Téléphone, Genre
  - Date d'inscription, Statut (badges colorés)
  - Tarif horaire, Expérience
  - Actions (Modifier/Supprimer)

### ➕ Ajout (`AddAidantModal.tsx`)
- **Formulaire** : Informations personnelles + professionnelles
- **Champs** : Données de base + tarif horaire + expérience
- **Création** : Utilisateur + profil Aidant liés

### ✏️ Modification (`EditAidantModal.tsx`)
- **Édition complète** : Informations personnelles et professionnelles
- **Tarification** : Modification tarif horaire
- **Expérience** : Mise à jour description

### 🗑️ Suppression (`DeleteAidantModal.tsx`)
- **Confirmation sécurisée** : Détails avant suppression
- **Cascade** : Aidant + Utilisateur + relations
- **Impact** : Vérification des dépendances

---

## 📊 Statistiques (`UserStats.tsx`)

### 📈 Métriques affichées
- **Total utilisateurs** : Comptage global
- **Seniors actifs** : Statut actif uniquement  
- **Aidants disponibles** : Aidants avec statut actif
- **Nouvelles inscriptions** : Derniers 30 jours

### 🎨 Présentation
- **Cards** : Interface moderne avec icônes
- **Couleurs** : Différenciation par type de métrique
- **Animations** : Transitions fluides

---

## 🔍 Recherche et filtrage

### 🔎 Composant recherche (`UserSearch.tsx`)
- **Recherche temps réel** : Filtrage instantané
- **Champs** : Nom, prénom, email
- **Performance** : Debouncing pour optimisation

### 🏷️ Badges et statuts
- **Statuts** : actif (vert), inactif (gris), suspendu (rouge), en_attente (jaune)
- **Autonomie** : faible (rouge), moyen (jaune), élevé (vert)
- **Genre** : Affichage "Non renseigné" si vide ou "Non précisé"

---

## 🗄️ Base de données

### 📊 Tables utilisées
- **`Utilisateurs`** : Table principale des utilisateurs
- **`Seniors`** : Profils seniors (niveau autonomie, ville)
- **`Aidant`** : Profils aidants (tarif, expérience)
- **`CatUtilisateurs`** : Catégories d'utilisateurs

### 🔗 Relations
- **Seniors** → Utilisateurs (IDUtilisateurs)
- **Aidant** → Utilisateurs (IDUtilisateurs)
- **Cascade** : Suppression en cascade lors de la suppression

---

## 🔧 Hooks personnalisés

### 📡 `useSeniors.tsx`
- **Récupération** : Seniors avec jointure Utilisateurs
- **Mutations** : Ajout, modification, suppression
- **Cache** : Invalidation automatique après modifications

### 🔄 `useUserManagement.tsx`
- **Gestion globale** : Coordination des actions utilisateurs
- **États** : Modals, loading, erreurs
- **Permissions** : Vérification des droits d'accès

---

## 🎨 Interface utilisateur

### 📱 Design responsive
- **Tables** : Défilement horizontal sur mobile
- **Modals** : Adaptées aux petits écrans
- **Navigation** : Tabs Shadcn/UI
- **Formulaires** : Layout responsive avec grid

### 🔄 Interactions
- **Actions rapides** : Boutons modifier/supprimer
- **Feedback** : Notifications toast
- **Loading** : États de chargement
- **Validation** : Messages d'erreur contextuels

---

## 🔐 Permissions

### 👀 Rôles et accès
- **Viewers** : Actions de modification désactivées
- **Managers** : Accès complet CRUD
- **Permissions** : Vérification via `usePermissions`

### 🛡️ Sécurité
- **Validation** : Côté client et serveur
- **Confirmation** : Actions destructives sécurisées
- **Audit** : Tracking des modifications

---

## 🎯 Fonctionnalités implémentées

### ✅ Actuellement disponible
- Gestion complète Seniors et Aidants
- CRUD complet avec modals dédiées
- Recherche et filtrage en temps réel
- Statistiques et métriques
- Interface responsive et moderne
- Gestion des permissions et rôles
- Validation et feedback utilisateur
- Tables avec actions contextuelles

### ⏳ Potentielles améliorations
- Import/Export en masse
- Historique des modifications
- Photos de profil
- Système de notifications
- Analytics avancées
- Filtrage avancé par critères multiples

La page Utilisateurs offre une interface complète pour la gestion des utilisateurs avec des fonctionnalités CRUD avancées et une expérience utilisateur optimisée.

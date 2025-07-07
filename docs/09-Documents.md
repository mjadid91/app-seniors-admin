
# 📄 Documentation – Page Documents

## 🧭 Objectif

La page **Documents** (`Documents.tsx`) centralise la gestion de tous les fichiers et documents de la plateforme AppSeniors.

---

## 📊 Composants principaux

### 📈 Statistiques (`DocumentsStats.tsx`)
- **Métriques** : Nombre total, par catégorie, taille
- **Cartes** : Affichage visuel des KPI documents
- **Statuts** : Répartition par état des documents

### 🔍 En-tête (`DocumentsHeader.tsx`)
- **Titre** : Navigation et titre de section
- **Actions rapides** : Boutons d'actions principales
- **Breadcrumb** : Navigation hiérarchique

### ⚡ Actions rapides (`DocumentsQuickActions.tsx`)
- **Raccourcis** : Actions fréquentes
- **Boutons** : Upload, création, filtrage
- **Interface** : Accès rapide aux fonctionnalités

---

## 🔍 Gestion et affichage

### 🔎 Filtres (`DocumentsFilters.tsx`)
- **Critères** : Par catégorie, statut, date, taille
- **Recherche** : Nom du document ou contenu
- **Interface** : Composants de filtrage avancés

### 📋 Tableau (`DocumentsTable.tsx`)
- **Colonnes** : Nom, Catégorie, Taille, Date, Statut, Actions
- **Tri** : Par toutes les colonnes
- **Pagination** : Navigation dans les listes

---

## 📤 Gestion des fichiers

### ⬆️ Upload (`DocumentsUpload.tsx`)
- **Composant** : `FileUploadComponent.tsx`
- **Drag & Drop** : Interface intuitive
- **Validation** : Types et tailles de fichiers
- **Progress** : Indicateur de progression

### ➕ Ajout (`AddDocumentModal.tsx`)
- **Formulaire** : `DocumentFormFields.tsx`
- **Métadonnées** : Titre, catégorie, description
- **Hook** : `useDocumentForm.tsx` pour la logique

### ✏️ Modification (`EditDocumentModal.tsx`)
- **Édition** : Modification des métadonnées
- **Validation** : Contrôles de cohérence
- **Mise à jour** : Sauvegarde des changements

### 👁️ Visualisation (`ViewDocumentModal.tsx`)
- **Aperçu** : Affichage du document
- **Détails** : Toutes les métadonnées
- **Actions** : Téléchargement, partage

---

## 🔧 Hooks et utilitaires

### 📡 Hooks de données
- **`useDocuments.tsx`** : Hook principal de gestion
- **`useDocumentForm.tsx`** : Logique des formulaires
- **`useFileOperations.ts`** : Opérations sur fichiers

### 🗄️ Intégration Supabase
- **Storage** : Bucket `documents` configuré
- **Table** : `Document` avec métadonnées
- **RLS** : Politiques de sécurité configurées

---

## 📊 Base de données

### 🗃️ Tables utilisées
- **`Document`** : Métadonnées des fichiers
- **`CategorieDocument`** : Catégories disponibles
- **`Utilisateurs`** : Propriétaires des documents

### 💾 Storage Supabase
- **Bucket** : `documents` (public)
- **Organisation** : Par utilisateur et catégorie
- **Sécurité** : RLS activé avec politiques publiques

---

## 🎨 Interface

### 📱 Layout responsive
- **Header** : Actions et navigation
- **Stats** : Métriques en cartes
- **Filters** : Panneau de filtrage
- **Table** : Liste principale des documents
- **Modals** : Actions détaillées

### 🔄 Fonctionnalités
- **Upload multiple** : Plusieurs fichiers simultanément
- **Prévisualisation** : Aperçu des documents
- **Téléchargement** : Accès aux fichiers
- **Recherche** : Temps réel sur métadonnées

---

## 🎯 Résumé

La page Documents permet :
- Gestion complète des fichiers et métadonnées
- Upload avec drag & drop et progress
- Système de catégorisation avancé
- Recherche et filtrage puissants
- Prévisualisation et téléchargement
- Intégration complète avec Supabase Storage
- Interface moderne et responsive

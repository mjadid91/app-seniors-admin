
# 🛠️ Documentation – Page Prestations

## 🧭 Objectif

La page **Prestations** permet de gérer les services et domaines d'intervention disponibles sur la plateforme AppSeniors.

---

## 🎯 Composants implémentés

### 📊 Statistiques (`PrestationStatsCards.tsx`)
- **Métriques** : Nombre de prestations, domaines, etc.
- **Cartes** : Affichage visuel des statistiques
- **Indicateurs** : Statuts des prestations

### 🔍 Filtres (`PrestationFilters.tsx`)
- **Filtrage** : Par domaine, statut, date
- **Recherche** : Par titre ou description
- **Interface** : Composants Shadcn/UI

### 📋 Tableau (`PrestationTable.tsx`)
- **Affichage** : Liste des prestations
- **Colonnes** : Titre, Domaine, Tarif, Statut, Actions
- **Actions** : Voir, Modifier, Supprimer

### 📈 Suivi (`PrestationTracking.tsx`)
- **Monitoring** : Suivi des prestations actives
- **États** : En cours, terminées, annulées
- **Métriques** : Performance et statistiques

---

## ⚙️ Modals de gestion

### ➕ Ajout de prestation (`AddPrestationModal.tsx`)
- **Formulaire** : Titre, description, domaine, tarif
- **Validation** : Contrôles de saisie
- **Intégration** : Supabase pour la sauvegarde

### ✏️ Modification (`EditPrestationModal.tsx`)
- **Édition** : Modification des prestations existantes
- **Pré-remplissage** : Données actuelles
- **Mise à jour** : Sauvegarde des modifications

### 👁️ Détails (`PrestationDetailsModal.tsx`)
- **Vue complète** : Tous les détails d'une prestation
- **Historique** : Utilisations et évaluations
- **Statistiques** : Métriques de performance

### 🏷️ Domaines (`AddDomaineModal.tsx`)
- **Gestion** : Ajout de nouveaux domaines
- **Organisation** : Catégorisation des prestations
- **Structure** : Hiérarchie des services

---

## 🔧 Intégration base de données

### 📡 Hook principal
- **`useSupabasePrestations.ts`** : Interface avec Supabase
- **Tables** : `Prestation`, `Domaine`
- **Relations** : Liaison prestations-domaines

### 🗄️ Tables utilisées
- **Prestation** : Services disponibles
- **Domaine** : Catégories de prestations
- **MiseEnRelation** : Liaisons prestations-utilisateurs

---

## 🎨 Interface

### 📱 Layout responsive
- **Header** : Titre et actions rapides
- **Stats** : Cartes de métriques
- **Filters** : Outils de filtrage
- **Table** : Liste principale
- **Modals** : Actions détaillées

### 🔄 Fonctionnalités
- **Tri** : Par colonnes du tableau
- **Pagination** : Navigation dans les listes
- **Recherche** : Temps réel
- **Actions groupées** : Opérations multiples

---

## 🎯 Résumé

La page Prestations offre :
- Gestion complète des services disponibles
- Organisation par domaines d'intervention
- Statistiques et suivi des performances
- Interface moderne et responsive
- Intégration complète avec Supabase
- Actions CRUD pour prestations et domaines

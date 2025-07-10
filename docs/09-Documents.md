
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

## 🏛️ Documents Patrimoniaux

## 🧭 Objectif
Gérer les documents à forte sensibilité déposés par les seniors : testaments, actes de propriété, documents bancaires ou notariés.

### 📥 Ajout d'un document patrimonial

- **Composant** : `AddPatrimonialDocumentModal.tsx`
- **Champs requis** :
    - **Type de document** : liste prédéfinie (ex. testament, acte de propriété, etc.)
    - **Fichier** : formats acceptés (PDF, Word, JPEG, PNG), taille maximale 10MB
- **Upload** :
    - Stockage dans **Supabase Storage** : bucket `documents`, dossier `patrimonial/`
    - URL générée automatiquement
    - Insertion des métadonnées dans la table `DocumentPatrimonial`

```sql
CREATE TABLE public."DocumentPatrimonial" (
  "IDDocumentPatrimonial" bigserial PRIMARY KEY,
  "TypeDocument" varchar(50) NOT NULL,
  "URLDocument" varchar(50) NOT NULL,
  "IDSeniors" bigint,
  FOREIGN KEY ("IDSeniors") REFERENCES "Seniors" ("IDSeniors")
);
CREATE INDEX idx_document_patrimonial_seniors ON public."DocumentPatrimonial" ("IDSeniors");
```
### 👁️ Règles de confidentialité

| Rôle             | Droits d'accès                                                                 |
|------------------|---------------------------------------------------------------------------------|
| 👵 **Senior**     | Peut **voir** et **télécharger** ses propres documents                         |
| 👨‍⚖️ **Admin**      | Peut **voir** qu’un document a été déposé (**type**, **date**) mais **pas le télécharger** |
| 🔒 **Autres rôles** | **Aucun accès** (documents invisibles)                                       |

---

### ✅ Affichage

- Liste des documents **filtrée automatiquement** selon le rôle de l'utilisateur
- Icône spéciale 👁️ pour les **admins** indiquant **la présence d’un fichier**
- Section intégrée dans `Documents.tsx`, **juste après les statistiques**


---

## 🔧 Hooks et utilitaires

### 📡 Hooks de données
- **`useDocuments.tsx`** : Hook principal de gestion
- **`useDocumentForm.tsx`** : Logique des formulaires
- **`useFileOperations.ts`** : Opérations sur fichiers
- **`usePatrimonialDocuments.tsx`** : Gestion spécifique des documents patrimoniaux

### 🗄️ Intégration Supabase
- **Storage** : Bucket `documents` configuré
- **Table** : `Document` avec métadonnées, `CategorieDocument` pour les catégories et `DocumentPatrimonial` pour les documents sensibles
- **RLS** : Politiques de sécurité configurées au niveau du rôle utilisateur

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

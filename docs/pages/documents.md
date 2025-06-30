
# Page Documents

## Vue d'ensemble

La page de gestion documentaire centralise tous les documents de l'organisation et des utilisateurs.

## Sections

### 1. En-tête et actions (DocumentsHeader)

**Objectif :** Navigation et actions principales

**Fonctionnalités :**
- Upload de nouveaux documents
- Actions rapides (DocumentsQuickActions)
- Filtres et recherche (DocumentsFilters)
- Statistiques rapides (DocumentsStats)

### 2. Système d'upload (DocumentsUpload)

**Objectif :** Téléchargement sécurisé de fichiers

**Fonctionnalités :**
- Drag & drop multiple
- Validation des formats
- Aperçu avant upload
- Barre de progression
- Gestion des erreurs

**Formats supportés :**
- PDF, DOC, DOCX
- Images (JPG, PNG, GIF)
- Feuilles de calcul (XLS, XLSX)
- Présentations (PPT, PPTX)

### 3. Table des documents (DocumentsTable)

**Objectif :** Gestion et consultation des documents

**Fonctionnalités :**
- Liste paginée avec tri
- Prévisualisation rapide
- Actions contextuelles
- Gestion des versions
- Contrôle d'accès

### 4. Modales de gestion

#### AddDocumentModal
- Ajout manuel de documents
- Métadonnées personnalisées
- Catégorisation
- Permissions d'accès

#### EditDocumentModal
- Modification des métadonnées
- Changement de catégorie
- Mise à jour des permissions

#### ViewDocumentModal
- Prévisualisation intégrée
- Téléchargement sécurisé
- Historique des consultations
- Commentaires et annotations

## Démo explicative

### Processus d'upload de document
1. Sélection des fichiers (drag & drop ou sélection)
2. Validation automatique des formats
3. Saisie des métadonnées obligatoires
4. Choix de la catégorie et permissions
5. Upload avec indicateur de progression
6. Confirmation et indexation

### Gestion des catégories
- **Administratif** : Documents officiels
- **Juridique** : Contrats, CGU, mentions légales
- **Financier** : Factures, devis, rapports
- **Technique** : Documentations, guides
- **Formation** : Supports pédagogiques
- **Personnel** : Documents utilisateurs

### Contrôle d'accès
- **Public** : Accessible à tous
- **Interne** : Équipe administrative seulement
- **Restreint** : Groupes spécifiques
- **Privé** : Créateur uniquement

## Tables utilisées dans la BD

### Tables principales
- **Document** : Informations des documents
  - IDDocument, Titre, TypeFichier
  - URLFichier, TailleFichier, DateUpload
  - IDUtilisateurs, IDCategorieDocument, Statut

- **CategorieDocument** : Classification
  - IDCategorieDocument, NomCategorie

### Tables de gestion
- **VersionDocument** : Historique des versions (table implicite)
- **PermissionDocument** : Contrôle d'accès (table implicite)
- **ConsultationDocument** : Suivi des accès (table implicite)

### Tables de métadonnées
- **TagDocument** : Étiquetage pour recherche (table implicite)
- **CommentaireDocument** : Annotations (table implicite)

## Fonctionnalités techniques

### Stockage sécurisé
- Chiffrement des fichiers sensibles
- Sauvegarde automatique
- Réplication géographique
- Contrôle d'intégrité

### Recherche avancée
- Recherche textuelle dans les contenus
- Filtres combinés multiples
- Recherche par métadonnées
- Historique des recherches

### Gestion des versions
- Versionning automatique
- Comparaison entre versions
- Restauration de versions antérieures
- Archivage des anciennes versions

## Intégrations

### Supabase Storage
- Stockage cloud sécurisé
- APIs de gestion de fichiers
- Policies de sécurité
- CDN pour l'optimisation

### Prévisualisation
- Aperçu PDF intégré
- Miniatures d'images
- Lecture de documents Office
- Métadonnées EXIF

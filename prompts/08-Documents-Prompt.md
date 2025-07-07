
# 📄 Prompt Lovable - Gestion des Documents

## 🎯 Objectif
Créer la page de gestion documentaire avec upload, catégorisation et prévisualisation.

## 📋 Instructions

### 1. Structure de la page
Page `/documents` avec :
- En-tête avec statistiques
- Actions rapides (upload, créer dossier)
- Filtres et recherche
- Vue liste/grille des documents
- Prévisualisation intégrée

### 2. Types de données
```typescript
interface Document {
  id: string;
  titre: string;
  typeFichier: string;
  tailleFichier: number;
  urlFichier: string;
  dateUpload: Date;
  statut: 'Brouillon' | 'Publié' | 'Archivé';
  categorie: CategorieDocument;
  utilisateur: string;
  description?: string;
}

interface CategorieDocument {
  id: string;
  nomCategorie: string;
  couleur: string;
  icone: string;
}
```

### 3. Composants principaux

#### DocumentsStats.tsx
- Nombre total de documents
- Espace utilisé/disponible
- Documents par catégorie
- Activité récente
- Graphique d'évolution

#### DocumentsHeader.tsx
- Titre de la section
- Breadcrumb navigation
- Actions principales
- Recherche globale

#### DocumentsQuickActions.tsx
- Bouton upload multiple
- Création de dossier
- Import par lots
- Raccourcis clavier

#### DocumentsFilters.tsx
- Filtre par catégorie
- Filtre par type de fichier
- Filtre par statut
- Filtre par date
- Taille de fichier
- Recherche avancée

### 4. Affichage des documents

#### DocumentsTable.tsx
Vue tabulaire avec colonnes :
- Nom (avec icône type)
- Catégorie (badge)
- Taille (formatée)
- Date upload
- Statut (badge)
- Actions (menu)

#### DocumentsGrid.tsx
Vue en grille avec :
- Aperçu/thumbnail
- Nom du document
- Métadonnées essentielles
- Actions au survol

#### DocumentCard.tsx
- Prévisualisation du fichier
- Informations du document
- Actions rapides
- Indicateurs de statut

### 5. Gestion des fichiers

#### DocumentsUpload.tsx
- **FileUploadComponent.tsx** : Composant d'upload
- Drag & drop interface
- Upload multiple
- Barre de progression
- Validation des types
- Limite de taille

#### Fonctionnalités upload
- Glisser-déposer
- Sélection multiple
- Progression en temps réel
- Validation côté client
- Gestion des erreurs
- Retry automatique

### 6. Modals de gestion

#### AddDocumentModal.tsx
- **DocumentFormFields.tsx** : Champs du formulaire
- Titre (requis)
- Catégorie (sélecteur)
- Description (optionnelle)
- Statut initial
- Tags/mots-clés

#### EditDocumentModal.tsx
- Modification des métadonnées
- Changement de catégorie
- Mise à jour du statut
- Historique des versions
- Préservation du fichier

#### ViewDocumentModal.tsx
- Prévisualisation du document
- Détails complets
- Historique d'accès
- Actions disponibles
- Téléchargement

### 7. Système de catégories

#### Catégories prédéfinies
```typescript
const CATEGORIES_DEFAUT = [
  { nom: 'Administratif', couleur: 'blue', icone: 'FileText' },
  { nom: 'Juridique', couleur: 'red', icone: 'Scale' },
  { nom: 'Médical', couleur: 'green', icone: 'Heart' },
  { nom: 'Financier', couleur: 'yellow', icone: 'Calculator' },
  { nom: 'Personnel', couleur: 'purple', icone: 'User' },
  { nom: 'Formation', couleur: 'orange', icone: 'BookOpen' }
];
```

#### Gestion des catégories
- CRUD complet
- Attribution de couleurs
- Icônes personnalisées
- Tri et organisation

### 8. Hooks personnalisés

#### useDocuments.tsx
```typescript
interface DocumentsHookReturn {
  documents: Document[];
  categories: CategorieDocument[];
  loading: boolean;
  error: string | null;
  uploadDocument: (file: File, metadata: DocumentMetadata) => Promise<void>;
  updateDocument: (id: string, data: Partial<Document>) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
  downloadDocument: (id: string) => Promise<void>;
}
```

#### useFileOperations.ts
- Upload vers Supabase Storage
- Validation des fichiers
- Gestion des erreurs
- Progression des uploads

#### useDocumentForm.tsx
- Logique des formulaires
- Validation Zod
- État des champs
- Soumission des données

### 9. Intégration Supabase

#### Storage Configuration
- Bucket `documents` (public)
- Types MIME autorisés
- Limite de taille (50MB)
- Organisation par utilisateur

#### Tables utilisées
- `Document` : métadonnées des fichiers
- `CategorieDocument` : catégories disponibles
- `Utilisateurs` : propriétaires

#### RLS Policies
- Lecture publique temporaire
- Écriture par utilisateur
- Suppression contrôlée
- Audit des accès

### 10. Prévisualisation

#### Types supportés
- Images (JPG, PNG, GIF, WebP)
- PDF (viewer intégré)
- Texte (TXT, MD)
- Office (aperçu via API)
- Vidéo (player HTML5)

#### Composant Preview
- Détection automatique du type
- Fallback pour types non supportés
- Zoom et navigation
- Téléchargement direct

### 11. Recherche et filtres

#### Recherche full-text
- Contenu des métadonnées
- Recherche dans le nom
- Mots-clés et tags
- Résultats pertinents

#### Filtres avancés
- Combinaisons multiples
- Sauvegarde des filtres
- Filtres rapides
- Tri personnalisé

### 12. Interface utilisateur

#### Design
- Vue adaptable (liste/grille)
- Drag & drop visuel
- Indicateurs de progression
- Feedback utilisateur

#### Actions contextuelles
- Menu par document
- Actions en lot
- Raccourcis clavier
- Gestes tactiles

### 13. Sécurité et permissions

#### Contrôle d'accès
- Permissions par document
- Rôles utilisateurs
- Audit trail
- Historique des actions

#### Validation des fichiers
- Types MIME autorisés
- Scan antivirus (optionnel)
- Validation des extensions
- Limite de taille

### 14. Performance

#### Optimisations
- Lazy loading des images
- Pagination intelligente
- Cache des métadonnées
- Compression des uploads

#### Indexation
- Index sur les métadonnées
- Recherche optimisée
- Tri performant
- Requêtes optimisées

### 15. Fonctionnalités avancées

#### Versioning
- Historique des versions
- Comparaison de versions
- Restauration
- Annotations

#### Collaboration
- Partage de documents
- Commentaires
- Notifications
- Workflow d'approbation

#### Export/Import
- Export par lots
- Formats multiples
- Import ZIP
- Synchronisation

### 16. Notifications
- Upload terminé
- Erreurs de traitement
- Espace de stockage
- Expiration de documents

Créez un système de gestion documentaire complet avec interface moderne, upload performant et fonctionnalités avancées de recherche et prévisualisation.


# 📄 Spécifications - Module Documents

## 🎯 Objectif
Gestion complète des documents de la plateforme : upload, stockage, organisation et accès sécurisé.

## 📋 Fonctionnalités principales

### 1. Gestion documentaire standard
#### Types de documents
- **Documents administratifs** : Contrats, factures, justificatifs
- **Documents informatifs** : Guides, procédures, FAQ
- **Documents légaux** : CGU, politiques de confidentialité
- **Documents marketing** : Brochures, présentations
- **Documents techniques** : Manuels, spécifications

#### Upload et stockage
- **Formats supportés** : PDF, DOC/DOCX, XLS/XLSX, JPG, PNG
- **Taille maximale** : 10MB par fichier
- **Stockage** : Supabase Storage bucket `documents`
- **Organisation** : Dossiers par catégories et utilisateurs

### 2. Documents patrimoniaux (haute sécurité)
#### Types spécifiques
- **Testaments** : Documents de dernières volontés
- **Mandats** : Procurations et délégations
- **Assurances** : Polices d'assurance vie/décès
- **Patrimoine** : Inventaires, évaluations
- **Directives anticipées** : Volontés médicales

#### Sécurité renforcée
- **Accès restreint** : Administrateurs uniquement
- **Chiffrement** : Fichiers chiffrés en base
- **Audit complet** : Traçabilité de tous les accès
- **Signature numérique** : Vérification authenticité
- **Sauvegarde** : Multiple et géo-distribuée

### 3. Système de catégorisation
#### Catégories principales
- **Administratif** : Documents de gestion courante
- **Juridique** : Contrats, conventions, réglementations
- **Financier** : Factures, devis, rapports comptables
- **Marketing** : Supports commerciaux et communication
- **Technique** : Documentation système et procédures
- **Personnel** : Documents RH et formation
- **Patrimonial** : Documents sensibles seniors

## 🔒 Permissions par rôle

| Action | Admin | Modérateur | Support | Visualisateur |
|--------|-------|------------|---------|---------------|
| Voir documents | ✅ | ❌ | ❌ | ✅ |
| Upload documents | ✅ | ❌ | ❌ | ❌ |
| Modifier documents | ✅ | ❌ | ❌ | ❌ |
| Supprimer documents | ✅ | ❌ | ❌ | ❌ |
| Gérer catégories | ✅ | ❌ | ❌ | ❌ |
| Accès patrimoniaux | ✅ | ❌ | ❌ | ❌ |
| Télécharger documents | ✅ | ❌ | ❌ | ✅ |

## 📊 Structure des données

### Table Document
```typescript
interface Document {
  IDDocument: number;
  Titre: string;
  TypeFichier: string; // 'pdf', 'doc', 'xlsx', etc.
  URLFichier: string; // URL Supabase Storage
  TailleFichier: number; // en bytes
  DateUpload: string;
  IDUtilisateurs: number; // Utilisateur ayant uploadé
  IDCategorieDocument: number;
  Statut: 'brouillon' | 'publié' | 'archivé' | 'supprimé';
  MotsCles?: string[]; // Tags pour recherche
  Description?: string;
  VersionDocument: number; // Versioning
}
```

### Table CategorieDocument
```typescript
interface CategorieDocument {
  IDCategorieDocument: number;
  NomCategorie: string;
  Description?: string;
  CategorieParent?: number; // Hiérarchie
  CouleurAffichage: string; // Code couleur interface
  IconeCategorie?: string; // Icône représentative
  EstRestreinte: boolean; // Accès limité
}
```

### Table DocumentPatrimonial
```typescript
interface DocumentPatrimonial {
  IDDocumentPatrimonial: number;
  IDSeniors: number;
  TypeDocument: 'testament' | 'mandat' | 'assurance' | 'patrimoine' | 'directives';
  URLDocument: string; // Fichier chiffré
  DateCreation: string;
  CleChiffrement: string; // Clé de déchiffrement
  EmpreinteNumerique: string; // Hash du fichier
  StatutVerification: 'en_attente' | 'verifie' | 'rejete';
  DateDerniereVerification?: string;
  CommentaireVerification?: string;
}
```

### Table HistoriqueAccesDocument
```typescript
interface HistoriqueAccesDocument {
  IDHistorique: number;
  IDDocument: number;
  IDUtilisateur: number;
  TypeAcces: 'consultation' | 'telechargement' | 'modification';
  DateAcces: string;
  AdresseIP: string;
  Navigateur: string;
  Duree?: number; // Temps de consultation en secondes
}
```

## 🔧 API Routes

### Documents standard

#### GET /documents
**Description** : Liste des documents  
**Paramètres** :
- `categorie` : Filtre par catégorie
- `statut` : Filtre par statut
- `utilisateur` : Documents d'un utilisateur
- `recherche` : Recherche dans titre/mots-clés
- `dateDebut`, `dateFin` : Période d'upload

**Réponse** :
```json
{
  "data": [
    {
      "id": 123,
      "titre": "Guide utilisation plateforme",
      "type": "pdf",
      "taille": 2048576,
      "dateUpload": "2024-07-15T10:30:00Z",
      "auteur": "Jean Admin",
      "categorie": "Technique",
      "statut": "publié",
      "nombreTelechargements": 45
    }
  ],
  "total": 156,
  "categories": [
    {
      "id": 1,
      "nom": "Administratif",
      "couleur": "#3B82F6",
      "nombreDocuments": 23
    }
  ]
}
```

#### POST /documents
**Description** : Upload d'un nouveau document  
**Content-Type** : multipart/form-data  
**Body** :
```
titre: "Nouveau guide utilisateur"
description: "Guide d'utilisation mis à jour"
categorie: 1
motsCles: ["guide", "utilisateur", "aide"]
fichier: [fichier binaire]
```

#### PUT /documents/{id}
**Description** : Modifier les métadonnées d'un document  
**Body** :
```json
{
  "titre": "Guide utilisateur v2.0",
  "description": "Version mise à jour",
  "categorie": 1,
  "statut": "publié",
  "motsCles": ["guide", "v2", "utilisateur"]
}
```

#### DELETE /documents/{id}
**Description** : Supprimer un document  
**Règles** : Soft delete, document marqué comme "supprimé"

#### GET /documents/{id}/download
**Description** : Télécharger un document  
**Réponse** : Fichier binaire avec headers appropriés  
**Audit** : Enregistrement automatique de l'accès

### Catégories

#### GET /documents/categories
**Description** : Liste hiérarchique des catégories  
**Réponse** :
```json
{
  "categories": [
    {
      "id": 1,
      "nom": "Administratif",
      "parent": null,
      "couleur": "#3B82F6",
      "icone": "folder",
      "sousCategories": [
        {
          "id": 2,
          "nom": "Contrats",
          "nombreDocuments": 12
        }
      ]
    }
  ]
}
```

#### POST /documents/categories
**Body** :
```json
{
  "nom": "Formation",
  "description": "Documents de formation",
  "parent": null,
  "couleur": "#10B981",
  "icone": "academic-cap"
}
```

### Documents patrimoniaux

#### GET /documents/patrimoniaux
**Description** : Liste des documents patrimoniaux  
**Permissions** : Administrateurs uniquement  
**Paramètres** :
- `senior` : Documents d'un senior spécifique
- `type` : Type de document patrimonial
- `statut` : Statut de vérification

#### POST /documents/patrimoniaux
**Description** : Upload document patrimonial  
**Body** : Multipart avec chiffrement automatique  
**Audit** : Traçabilité complète obligatoire

#### GET /documents/patrimoniaux/{id}/decrypt
**Description** : Accès sécurisé à un document chiffré  
**Authentification** : Double validation requise  
**Audit** : Log détaillé avec justification

### Recherche et filtres

#### GET /documents/recherche
**Description** : Recherche avancée dans les documents  
**Paramètres** :
- `query` : Terme de recherche
- `categories` : Array de catégories
- `types` : Types de fichiers
- `auteurs` : Utilisateurs ayant uploadé
- `dateMin`, `dateMax` : Période

#### GET /documents/statistiques
**Description** : Statistiques d'utilisation  
**Réponse** :
```json
{
  "totalDocuments": 1247,
  "espacUtilise": "2.3 GB",
  "telechargementsTotal": 5689,
  "documentsPlusPopulaires": [
    {
      "id": 123,
      "titre": "Guide utilisateur",
      "telechargements": 456
    }
  ],
  "repartitionCategories": {
    "Administratif": 234,
    "Technique": 189,
    "Juridique": 145
  }
}
```

## 📋 Règles métier

### Validation des uploads
- **Taille maximale** : 10MB par fichier
- **Types autorisés** : Liste configurable par admin
- **Scan antivirus** : Vérification automatique obligatoire
- **Doublon** : Détection par hash MD5 du fichier
- **Nom de fichier** : Sanitisation et normalisation

### Gestion des versions
- **Versioning automatique** : Nouvelle version si modification
- **Conservation historique** : Toutes les versions conservées
- **Accès versions** : Possibilité de revenir à version antérieure
- **Suppression cascade** : Suppression de toutes les versions

### Sécurité et accès
- **Contrôle d'accès** : Basé sur les rôles utilisateurs
- **Documents sensibles** : Chiffrement AES-256
- **Audit trail** : Tous les accès enregistrés
- **Rétention** : Politique de conservation configurable
- **RGPD** : Anonymisation sur demande

### Storage et performance
- **CDN** : Distribution via Supabase CDN
- **Compression** : Optimisation automatique des images
- **Cache** : Mise en cache des documents fréquents
- **Backup** : Sauvegarde quotidienne automatique
- **Archivage** : Documents anciens vers stockage froid

### Notifications et alertes
- **Upload réussi** : Confirmation à l'auteur
- **Partage document** : Notification aux destinataires
- **Expiration** : Alerte documents avec date limite
- **Quota atteint** : Notification avant limite stockage
- **Accès inhabituel** : Alerte sécurité si activité suspecte

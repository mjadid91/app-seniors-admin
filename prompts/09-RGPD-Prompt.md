
# 🔒 Prompt Lovable - Gestion RGPD

## 🎯 Objectif
Créer la page de gestion RGPD avec demandes utilisateurs, documents légaux et consentements.

## 📋 Instructions

### 1. Structure de la page
Page `/rgpd` avec système d'onglets :
- Onglet "Demandes" : gestion des requêtes RGPD
- Onglet "Documents" : politiques et CGU
- Onglet "Consentements" : gestion des cookies
- Dashboard de conformité

### 2. Types de données
```typescript
interface DemandeRGPD {
  id: string;
  utilisateur: {
    nom: string;
    prenom: string;
    email: string;
  };
  typeDemande: 'acces' | 'rectification' | 'suppression' | 'portabilite' | 'opposition';
  dateDemande: Date;
  dateEcheance: Date;
  dateTraitement?: Date;
  statut: 'en_attente' | 'en_cours' | 'terminee' | 'rejetee';
  traitePar?: string;
  commentaire?: string;
}

interface DocumentRGPD {
  id: string;
  titre: string;
  typeDoc: 'politique' | 'cgu' | 'consentement' | 'procedure';
  urlFichier: string;
  dateCreation: Date;
  dateMiseAJour: Date;
  version: string;
  statut: 'brouillon' | 'publie' | 'archive';
}

interface ConsentementCookies {
  id: string;
  utilisateur: string;
  typeCookie: 'fonctionnels' | 'analytiques' | 'marketing' | 'personnalisation';
  statut: boolean;
  dateConsentement: Date;
  dateExpiration: Date;
  ipAddress: string;
}
```

### 3. Composants principaux

#### RGPD.tsx (Page principale)
- Tabs avec compteurs
- Dashboard de conformité
- Alertes d'échéance
- Métriques de performance

#### RGPDStats.tsx
- Demandes en cours
- Délais de conformité
- Taux de traitement
- Risques de non-conformité
- Graphique des tendances

#### DemandesRGPDTable.tsx
- Liste des demandes par statut
- Tri par échéance
- Indicateurs visuels d'urgence
- Actions rapides

#### DocumentsRGPDTable.tsx
- Bibliothèque de documents
- Versions et historique
- Statuts de publication
- Gestion des templates

### 4. Gestion des demandes

#### AddDemandeRGPDModal.tsx
Formulaire avec :
- Sélection de l'utilisateur
- Type de demande (radio buttons)
- Description détaillée
- Calcul automatique de l'échéance
- Assignation optionnelle

#### EditDemandeRGPDModal.tsx
- Modification du statut
- Assignation à un responsable
- Ajout de commentaires
- Extension d'échéance justifiée
- Historique des modifications

#### ProcessRequestModal.tsx
Workflow de traitement :
- Vérification d'identité
- Actions entreprises
- Documents générés
- Validation finale
- Notification utilisateur

#### DemandeDetailsModal.tsx
- Détails complets
- Timeline du traitement
- Documents associés
- Communications utilisateur
- Actions disponibles

### 5. Gestion des documents

#### AddDocumentRGPDModal.tsx
- Titre et type de document
- Upload du fichier
- Métadonnées légales
- Système de versioning
- Planification de publication

#### DocumentRGPDViewer.tsx
- Prévisualisation intégrée
- Annotations légales
- Comparaison de versions
- Validation juridique
- Export multiple formats

### 6. Gestion des consentements

#### AddConsentementModal.tsx
- Types de cookies
- Granularité du consentement
- Durée de validité
- Méthode de collecte
- Traçabilité complète

#### ConsentementStats.tsx
- Taux de consentement par type
- Évolution temporelle
- Analyse géographique
- Renouvellements nécessaires

### 7. Système d'échéances

#### Calcul automatique
```typescript
const calculerEcheance = (typeDemande: string, dateDemande: Date) => {
  const delaiJours = {
    'acces': 30,
    'rectification': 30,
    'suppression': 30,
    'portabilite': 30,
    'opposition': 30
  };
  
  const echeance = new Date(dateDemande);
  echeance.setDate(echeance.getDate() + delaiJours[typeDemande]);
  
  return echeance;
};
```

#### Alertes d'échéance
- Notification J-7
- Alerte J-3
- Urgence J-1
- Dépassement (critique)

### 8. Hooks personnalisés

#### useSupabaseRGPD.ts
```typescript
interface RGPDHookReturn {
  demandes: DemandeRGPD[];
  documents: DocumentRGPD[];
  consentements: ConsentementCookies[];
  loading: boolean;
  error: string | null;
  addDemande: (data: CreateDemandeData) => Promise<void>;
  updateDemande: (id: string, data: Partial<DemandeRGPD>) => Promise<void>;
  processDemande: (id: string, action: ProcessAction) => Promise<void>;
  addDocument: (data: CreateDocumentData) => Promise<void>;
  updateConsentement: (data: ConsentementData) => Promise<void>;
}
```

#### useFileOperationsRGPD.ts
- Upload vers bucket `documents-rgpd`
- Validation des documents légaux
- Versioning automatique
- Archivage sécurisé

### 9. Workflow de conformité

#### États des demandes
1. **En attente** : Demande reçue
2. **En cours** : Traitement débuté
3. **Terminée** : Demande traitée
4. **Rejetée** : Demande non valide

#### Processus de traitement
1. Réception et validation
2. Vérification d'identité
3. Collecte des données
4. Traitement et anonymisation
5. Génération des rapports
6. Livraison à l'utilisateur

### 10. Intégration base de données

#### Tables utilisées
- `DemandeRGPD` : demandes utilisateurs
- `DocumentRGPD` : documents légaux
- `ConsentementCookies` : consentements
- `Utilisateurs` : données personnelles

#### Storage Supabase
- Bucket `documents-rgpd` (public)
- Organisation par type et version
- Politique de rétention
- Backup automatique

### 11. Rapports et audit

#### Rapports de conformité
- Respect des délais
- Types de demandes
- Efficacité du traitement
- Risques identifiés

#### Audit trail
- Toutes les actions tracées
- Horodatage précis
- Utilisateur responsable
- Modifications apportées

### 12. Interface utilisateur

#### Design de conformité
- Codes couleur pour urgence
- Timeline des actions
- Badges de statut
- Indicateurs de progression

#### Couleurs par urgence
- Vert : Dans les délais
- Orange : Attention (< 7 jours)
- Rouge : Urgent (< 3 jours)
- Rouge foncé : Dépassé

### 13. Notifications automatiques

#### Système d'alertes
- Nouvelles demandes
- Échéances approchant
- Demandes en retard
- Consentements à renouveler

#### Templates d'emails
- Accusé de réception
- Demande d'information
- Livraison des données
- Notification de traitement

### 14. Sécurité et confidentialité

#### Protection des données
- Chiffrement des données sensibles
- Accès restreint par rôle
- Logs d'accès détaillés
- Anonymisation automatique

#### Conformité technique
- Respect des standards RGPD
- Procédures documentées
- Formation des utilisateurs
- Audits réguliers

### 15. Fonctionnalités avancées

#### Automatisation
- Reconnaissance du type de demande
- Pré-traitement automatique
- Génération de réponses
- Workflow intelligent

#### Intégration
- APIs externes pour validation
- Connexion avec outils légaux
- Export vers systèmes tiers
- Synchronisation des politiques

### 16. Tableau de bord exécutif
- KPIs de conformité
- Risques identifiés
- Recommandations d'action
- Rapports pour direction

Créez un système RGPD complet avec gestion des demandes, workflow de conformité, et interface dédiée pour assurer le respect des réglementations de protection des données.

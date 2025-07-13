
# 🔒 Spécifications - Module RGPD

## 🎯 Objectif
Gestion de la conformité RGPD : demandes des utilisateurs, consentements, et protection des données.

## 📋 Fonctionnalités principales

### 1. Gestion des demandes RGPD
#### Types de demandes
- **Droit d'accès** : Copie de toutes les données personnelles
- **Droit de rectification** : Correction des données incorrectes
- **Droit à l'effacement** : Suppression des données ("droit à l'oubli")
- **Droit à la portabilité** : Export des données dans un format standard
- **Droit d'opposition** : Opposition au traitement des données
- **Limitation du traitement** : Restriction de l'utilisation des données

#### Workflow de traitement
1. **Réception** : Demande créée par l'utilisateur ou l'admin
2. **Vérification identité** : Validation de l'identité du demandeur
3. **Évaluation** : Analyse de la légitimité de la demande
4. **Traitement** : Mise en œuvre de la demande
5. **Réponse** : Communication du résultat au demandeur
6. **Archivage** : Conservation de la trace pour audit

### 2. Gestion des consentements
#### Types de consentements
- **Cookies fonctionnels** : Nécessaires au fonctionnement
- **Cookies analytiques** : Mesure d'audience et statistiques
- **Cookies marketing** : Publicité ciblée et remarketing
- **Communications** : Newsletters, SMS, notifications push
- **Profilage** : Analyse comportementale et personnalisation
- **Partage avec tiers** : Transmission à des partenaires

#### Granularité des consentements
- **Consentement global** : Acceptation ou refus général
- **Consentement par finalité** : Choix spécifique par usage
- **Consentement temporaire** : Durée limitée configurable
- **Révocation** : Possibilité de retirer le consentement

### 3. Documents et politiques
#### Documents légaux
- **Politique de confidentialité** : Traitement des données personnelles
- **Conditions générales d'utilisation** : Règles d'usage plateforme
- **Politique des cookies** : Usage des traceurs
- **Mentions légales** : Informations légales obligatoires
- **Charte données** : Engagement protection données

#### Versioning des documents
- **Historique complet** : Conservation de toutes les versions
- **Notification changements** : Alerte utilisateurs si modification
- **Acceptation requise** : Re-consentement si changement majeur
- **Archive légale** : Conservation pour obligations légales

## 🔒 Permissions par rôle

| Action | Admin | Modérateur | Support | Visualisateur |
|--------|-------|------------|---------|---------------|
| Voir demandes RGPD | ✅ | ❌ | ❌ | ✅ |
| Traiter demandes | ✅ | ❌ | ❌ | ❌ |
| Gérer consentements | ✅ | ❌ | ❌ | ❌ |
| Modifier documents | ✅ | ❌ | ❌ | ❌ |
| Export données | ✅ | ❌ | ❌ | ❌ |
| Voir rapports | ✅ | ❌ | ❌ | ✅ |

## 📊 Structure des données

### Table DemandeRGPD
```typescript
interface DemandeRGPD {
  IDDemandeRGPD: number;
  IDUtilisateurs: number;
  TypeDemande: 'acces' | 'rectification' | 'effacement' | 'portabilite' | 'opposition' | 'limitation';
  DateDemande: string;
  Statut: 'en_attente' | 'en_cours' | 'terminee' | 'rejetee';
  MotifDemande: string;
  DocumentsJoints?: string[]; // Justificatifs d'identité
  DateEcheance: string; // 30 jours max
  TraitePar?: number; // ID utilisateur responsable
  DateTraitement?: string;
  ReponseTraitement?: string;
  FichiersReponse?: string[]; // Documents générés
}
```

### Table ConsentementCookies
```typescript
interface ConsentementCookies {
  IDConsentement: number;
  IDUtilisateurs: number;
  TypeCookie: 'fonctionnels' | 'analytiques' | 'marketing' | 'personnalisation';
  Statut: boolean; // Accepté ou refusé
  DateConsentement: string;
  DateExpiration?: string; // Si consentement temporaire
  VersionPolitique: string; // Version de la politique acceptée
  AdresseIP: string; // Pour traçabilité
  UserAgent: string; // Navigateur utilisé
  MoyenConsentement: 'banner' | 'settings' | 'registration'; // Comment obtenu
}
```

### Table DocumentRGPD
```typescript
interface DocumentRGPD {
  IDDocumentRGPD: number;
  Titre: string;
  TypeDoc: 'politique_confidentialite' | 'cgu' | 'cookies' | 'mentions_legales' | 'charte';
  URLFichier: string; // Stockage sécurisé
  DateMiseAJour: string;
  VersionDocument: string; // Numérotation sémantique
  ChangementsMajeurs: boolean; // Nécessite re-consentement
  StatutPublication: 'brouillon' | 'publie' | 'archive';
  LangueDocument: string; // Support multi-langues
  ResumeMaJ?: string; // Résumé des modifications
}
```

### Table HistoriqueConsentements
```typescript
interface HistoriqueConsentement {
  IDHistorique: number;
  IDUtilisateurs: number;
  TypeAction: 'acceptation' | 'refus' | 'modification' | 'revocation';
  DetailAction: string; // JSON avec détails spécifiques
  DateAction: string;
  AdresseIP: string;
  ContexteAction: string; // Page/section où l'action a eu lieu
  VersionPolitique: string;
}
```

## 🔧 API Routes

### Demandes RGPD

#### GET /rgpd/demandes
**Description** : Liste des demandes RGPD  
**Paramètres** :
- `statut` : Filtre par statut
- `type` : Type de demande
- `utilisateur` : Demandes d'un utilisateur
- `echeance` : Demandes proches de l'échéance
- `dateDebut`, `dateFin` : Période

**Réponse** :
```json
{
  "data": [
    {
      "id": 123,
      "type": "acces",
      "utilisateur": {
        "nom": "Dupont",
        "prenom": "Marie",
        "email": "marie.dupont@email.com"
      },
      "dateDemande": "2024-07-15T10:00:00Z",
      "echeance": "2024-08-14T10:00:00Z",
      "statut": "en_cours",
      "jourRestants": 18,
      "traitePar": "Jean Admin"
    }
  ],
  "alertes": {
    "echeanceProche": 3,
    "enRetard": 1
  }
}
```

#### POST /rgpd/demandes
**Description** : Créer une demande RGPD  
**Body** :
```json
{
  "idUtilisateur": 456,
  "type": "effacement",
  "motif": "Ne souhaite plus utiliser le service",
  "documentsIdentite": ["carte_identite.pdf"],
  "coordonnesContact": "marie@email.com"
}
```

#### PUT /rgpd/demandes/{id}/traiter
**Description** : Traiter une demande  
**Body** :
```json
{
  "statut": "terminee",
  "reponse": "Données supprimées conformément à la demande",
  "fichiersReponse": ["confirmation_suppression.pdf"],
  "actionsMenees": [
    "Suppression données utilisateur",
    "Anonymisation historique commandes",
    "Notification partenaires"
  ]
}
```

### Consentements

#### GET /rgpd/consentements/{idUtilisateur}
**Description** : Consentements d'un utilisateur  
**Réponse** :
```json
{
  "utilisateur": {
    "id": 456,
    "email": "marie@email.com"
  },
  "consentements": {
    "fonctionnels": {
      "statut": true,
      "obligatoire": true,
      "date": "2024-07-01T10:00:00Z"
    },
    "analytiques": {
      "statut": true,
      "date": "2024-07-01T10:00:00Z",
      "expiration": "2024-12-31T23:59:59Z"
    },
    "marketing": {
      "statut": false,
      "dateRefus": "2024-07-01T10:00:00Z"
    }
  },
  "historiqueComplet": [
    {
      "action": "acceptation",
      "type": "analytiques",
      "date": "2024-07-01T10:00:00Z"
    }
  ]
}
```

#### POST /rgpd/consentements
**Description** : Enregistrer des consentements  
**Body** :
```json
{
  "idUtilisateur": 456,
  "consentements": {
    "analytiques": true,
    "marketing": false,
    "personnalisation": true
  },
  "versionPolitique": "v2.1.0",
  "contexte": "settings_page"
}
```

#### POST /rgpd/consentements/{idUtilisateur}/revoquer
**Description** : Révoquer des consentements  
**Body** :
```json
{
  "types": ["marketing", "personnalisation"],
  "motif": "Ne souhaite plus recevoir de communications"
}
```

### Documents légaux

#### GET /rgpd/documents
**Description** : Liste des documents RGPD  
**Paramètres** :
- `type` : Type de document
- `statut` : publié, brouillon, archive
- `langue` : Langue du document

#### POST /rgpd/documents
**Description** : Créer/modifier un document  
**Body** :
```json
{
  "titre": "Politique de confidentialité",
  "type": "politique_confidentialite",
  "contenu": "Base64 encoded content",
  "version": "v2.2.0",
  "changementsMajeurs": true,
  "langues": ["fr", "en"],
  "resumeMaJ": "Ajout section cookies marketing"
}
```

### Rapports et audit

#### GET /rgpd/rapport-conformite
**Description** : Rapport de conformité RGPD  
**Réponse** :
```json
{
  "periode": {
    "debut": "2024-01-01",
    "fin": "2024-07-31"
  },
  "demandes": {
    "total": 45,
    "traitees": 42,
    "enCours": 2,
    "enRetard": 1,
    "delaiMoyenTraitement": "12 jours"
  },
  "consentements": {
    "totalUtilisateurs": 1250,
    "tauxConsentementAnalytiques": 78.5,
    "tauxConsentementMarketing": 45.2,
    "revocations": 23
  },
  "violations": {
    "nombre": 0,
    "derniereViolation": null
  }
}
```

## 📋 Règles métier

### Délais légaux
- **Réponse aux demandes** : 30 jours maximum (+ 30 jours si complexe)
- **Notification violation** : 72h à l'autorité de contrôle
- **Information utilisateurs** : Sans délai si risque élevé
- **Conservation données** : Durées définies par finalité

### Validation des demandes
1. **Vérification identité** : Pièce d'identité obligatoire
2. **Légitimité** : Contrôle du bien-fondé de la demande
3. **Faisabilité technique** : Vérification possibilité traitement
4. **Impact tiers** : Analyse répercussions sur autres personnes

### Gestion des consentements
- **Consentement éclairé** : Information claire et complète
- **Consentement spécifique** : Par finalité de traitement
- **Consentement libre** : Sans contrainte ni pression
- **Révocable** : Facilité de retrait du consentement
- **Preuve** : Conservation des preuves de consentement

### Automatisations
- **Rappels d'échéance** : Notification 7 et 2 jours avant
- **Purge automatique** : Suppression données expirées
- **Mise à jour consentements** : Notification si nouvelles finalités
- **Rapport mensuel** : Génération automatique statistiques

### Sécurité et traçabilité
- **Chiffrement** : Toutes les données sensibles chiffrées
- **Logs d'audit** : Traçabilité complète des actions
- **Accès restreint** : Principe du moindre privilège
- **Sauvegarde sécurisée** : Backup chiffré quotidien
- **Tests réguliers** : Vérification procédures de récupération

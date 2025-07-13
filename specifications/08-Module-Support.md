
# 📞 Spécifications - Module Support

## 🎯 Objectif
Gestion complète du support client avec système de tickets, assignation et suivi des résolutions.

## 📋 Fonctionnalités principales

### 1. Gestion des tickets
#### Création de tickets
- **Canaux de création** : Interface admin, formulaire client, email
- **Informations obligatoires** : Sujet, Description, Utilisateur concerné
- **Classification automatique** : Priorité et catégorie suggérées
- **Assignation** : Automatique ou manuelle selon la charge

#### Types de demandes
- **Support technique** : Problèmes d'utilisation plateforme
- **Support prestation** : Questions sur services en cours
- **Facturation** : Problèmes de paiement, remboursements
- **Compte utilisateur** : Modification profil, mot de passe
- **Partenariat** : Demandes commerciales
- **Réclamation** : Litiges et mécontentements

#### Niveaux de priorité
- **Critique** : Service indisponible, urgence médicale
- **Haute** : Problème bloquant pour l'utilisateur
- **Normale** : Demande standard sans urgence
- **Basse** : Question générale, amélioration suggérée

### 2. Workflow de traitement
#### États des tickets
- **Nouveau** : Ticket créé, en attente d'assignation
- **En cours** : Pris en charge par un agent
- **En attente** : Attente retour client ou information externe
- **Résolu** : Solution apportée, ticket fermé
- **Fermé** : Ticket définitivement clos

#### Assignation automatique
- **Règles de routage** : Par catégorie et compétence agent
- **Équilibrage charge** : Répartition équitable des tickets
- **Disponibilité agents** : Prise en compte des congés/absences
- **Escalade automatique** : Transfert si délai dépassé

### 3. Communication et suivi
#### Système de réponses
- **Réponses internes** : Notes entre agents support
- **Réponses client** : Communication avec l'utilisateur
- **Templates** : Réponses pré-formatées fréquentes
- **Notifications** : Alertes automatiques par email

#### SLA (Service Level Agreement)
- **Critique** : Première réponse < 1h, résolution < 4h
- **Haute** : Première réponse < 4h, résolution < 24h
- **Normale** : Première réponse < 24h, résolution < 72h
- **Basse** : Première réponse < 72h, résolution < 7 jours

## 🔒 Permissions par rôle

| Action | Admin | Modérateur | Support | Visualisateur |
|--------|-------|------------|---------|---------------|
| Voir tous tickets | ✅ | ❌ | ✅* | ❌ |
| Créer ticket | ✅ | ❌ | ✅ | ❌ |
| Assigner ticket | ✅ | ❌ | ✅** | ❌ |
| Répondre ticket | ✅ | ❌ | ✅* | ❌ |
| Résoudre ticket | ✅ | ❌ | ✅* | ❌ |
| Voir statistiques | ✅ | ❌ | ✅ | ❌ |
| Gérer catégories | ✅ | ❌ | ❌ | ❌ |

*Uniquement tickets assignés  
**Peut réassigner ses propres tickets

## 📊 Structure des données

### Vue support_dashboard_view
```typescript
interface SupportTicketDB {
  id: number;
  sujet: string;
  message: string | null;
  date_creation: string | null;
  statut: "en_attente" | "en_cours" | "resolu";
  priorite: "basse" | "normale" | "haute" | "critique";
  id_utilisateur: number | null;
  utilisateur_nom: string | null;
  utilisateur_prenom: string | null;
  utilisateur_email: string | null;
  id_prestation_support: number | null;
  id_intervenant: number | null;
  assigne_nom: string | null;
  assigne_prenom: string | null;
  assigne_email: string | null;
  date_resolution?: string | null;
}
```

### Table SupportClient
```typescript
interface SupportClient {
  IDTicketClient: number;
  IDUtilisateur: number;
  SujetDemande: string;
  MessageDemande: string;
  StatutDemande: 'nouveau' | 'en_cours' | 'en_attente' | 'resolu' | 'ferme';
  PrioriteDemande: 'basse' | 'normale' | 'haute' | 'critique';
  CategorieDemande: string;
  DateCreation: string;
  DateResolution?: string;
  DateDerniereActivite: string;
  IDPrestation?: number; // Si lié à une prestation
  FichiersJoints?: string[]; // URLs des fichiers
}
```

### Table PrestationSupport
```typescript
interface PrestationSupport {
  IDPrestationSupport: number;
  IDTicketClient: number;
  IDIntervenant: number; // Agent support assigné
  DateAssignation: string;
  DateDebutTraitement?: string;
  DateFinTraitement?: string;
  TempsTraitement?: number; // en minutes
  CommentaireInterne?: string;
}
```

### Table ReponsesSupport
```typescript
interface ReponseSupport {
  IDReponseSupport: number;
  IDTicketClient: number;
  IDAuteur: number;
  TypeReponse: 'client' | 'support' | 'interne';
  ContenuReponse: string;
  DateReponse: string;
  FichiersJoints?: string[];
  EstVisible: boolean; // Visible au client ou interne uniquement
}
```

## 🔧 API Routes

### Tickets

#### GET /support/tickets
**Description** : Liste des tickets support  
**Paramètres** :
- `statut` : Filtre par statut
- `priorite` : Filtre par priorité
- `assigne` : Tickets assignés à un agent spécifique
- `categorie` : Filtre par catégorie
- `dateDebut`, `dateFin` : Période de création
- `recherche` : Recherche dans sujet/contenu

**Réponse** :
```json
{
  "data": [
    {
      "id": 1247,
      "sujet": "Problème de connexion",
      "statut": "en_cours",
      "priorite": "normale",
      "client": {
        "nom": "Dupont",
        "prenom": "Marie",
        "email": "marie.dupont@email.com"
      },
      "assigne": {
        "nom": "Martin",
        "prenom": "Jean"
      },
      "dateCreation": "2024-07-15T09:30:00Z",
      "dernierMessage": "2024-07-15T14:20:00Z"
    }
  ],
  "total": 156,
  "statistiques": {
    "nouveaux": 12,
    "enCours": 23,
    "enAttente": 8,
    "resolus": 113
  }
}
```

#### POST /support/tickets
**Description** : Créer un nouveau ticket  
**Body** :
```json
{
  "idUtilisateur": 456,
  "sujet": "Remboursement prestation",
  "message": "Je souhaite un remboursement pour la prestation du 10/07",
  "priorite": "normale",
  "categorie": "facturation",
  "idPrestation": 789,
  "fichiersJoints": ["facture.pdf", "justificatif.jpg"]
}
```

#### PUT /support/tickets/{id}
**Description** : Modifier un ticket  
**Body** :
```json
{
  "statut": "en_cours",
  "priorite": "haute",
  "assigneA": 123,
  "commentaireInterne": "Escalade nécessaire"
}
```

#### POST /support/tickets/{id}/resoudre
**Description** : Marquer un ticket comme résolu  
**Body** :
```json
{
  "solution": "Problème résolu par réinitialisation du mot de passe",
  "tempsResolution": 45,
  "satisfactionClient": 5
}
```

### Réponses

#### GET /support/tickets/{id}/reponses
**Description** : Historique des échanges d'un ticket  
**Réponse** :
```json
{
  "reponses": [
    {
      "id": 1,
      "auteur": {
        "nom": "Client",
        "type": "client"
      },
      "contenu": "Message initial du client",
      "date": "2024-07-15T09:30:00Z",
      "fichiersJoints": []
    },
    {
      "id": 2,
      "auteur": {
        "nom": "Jean Martin",
        "type": "support"
      },
      "contenu": "Merci pour votre message. Pouvez-vous préciser...",
      "date": "2024-07-15T10:15:00Z",
      "fichiersJoints": []
    }
  ]
}
```

#### POST /support/tickets/{id}/reponses
**Description** : Ajouter une réponse  
**Body** :
```json
{
  "contenu": "Votre problème est maintenant résolu",
  "typeReponse": "support",
  "estVisible": true,
  "notifierClient": true,
  "fichiersJoints": ["solution.pdf"]
}
```

### Assignation

#### PUT /support/tickets/{id}/assigner
**Description** : Assigner un ticket à un agent  
**Body** :
```json
{
  "idAgent": 123,
  "motif": "Spécialiste facturation",
  "notifierAgent": true
}
```

#### GET /support/agents/disponibles
**Description** : Liste des agents support disponibles  
**Réponse** :
```json
{
  "agents": [
    {
      "id": 123,
      "nom": "Jean Martin",
      "specialites": ["technique", "compte"],
      "ticketsEnCours": 5,
      "disponible": true
    }
  ]
}
```

### Statistiques

#### GET /support/stats
**Description** : Statistiques globales du support  
**Paramètres** :
- `periode` : jour, semaine, mois, annee

**Réponse** :
```json
{
  "ticketsTotal": 1247,
  "ticketsOuverts": 43,
  "tempsReponseAmoyen": "2h30m",
  "tempsResolutionAmoyen": "24h15m",
  "satisfactionMoyenne": 4.2,
  "slaRespectePremierContact": 89.5,
  "slaRespecteResolution": 82.3,
  "repartitionPriorite": {
    "critique": 2,
    "haute": 8,
    "normale": 28,
    "basse": 5
  },
  "evolutionMensuelle": [
    {
      "mois": "2024-06",
      "nouveau": 89,
      "resolus": 95,
      "satisfactionMoyenne": 4.1
    }
  ]
}
```

## 📋 Règles métier

### Assignation automatique
1. **Catégorisation** : Analyse du contenu pour classification
2. **Compétences** : Matching avec spécialités des agents
3. **Charge de travail** : Équilibrage du nombre de tickets
4. **Priorité** : Tickets critiques/hauts assignés en priorité
5. **Disponibilité** : Prise en compte planning et congés

### Escalade automatique
- **Sans première réponse** : Escalade après délai SLA + 50%
- **Ticket en attente** : Relance automatique après 48h
- **Satisfaction faible** : Révision par superviseur si note < 3
- **Réclamation** : Transfert automatique vers manager

### Notifications automatiques
#### Pour les clients
- **Création ticket** : Confirmation avec numéro de référence
- **Assignation** : Notification agent en charge
- **Réponse agent** : Email avec contenu réponse
- **Résolution** : Demande d'évaluation satisfaction

#### Pour les agents
- **Nouveau ticket assigné** : Notification immédiate
- **Réponse client** : Alerte nouvelle réponse
- **Escalade** : Notification si ticket remonté
- **SLA proche** : Alerte délai bientôt dépassé

### Mesure de performance
- **Temps de première réponse** : Objectif selon priorité
- **Temps de résolution** : Suivi global et par agent
- **Taux de résolution** : % tickets résolus en une fois
- **Satisfaction client** : Enquête automatique post-résolution
- **Réouverture** : % tickets rouverts (objectif < 5%)

### Intégration Edge Functions
- **Envoi emails** : Notifications automatiques clients/agents
- **Templates dynamiques** : Personnalisation selon contexte
- **Pièces jointes** : Gestion fichiers dans réponses
- **Webhooks** : Intégration systèmes externes (CRM, etc.)

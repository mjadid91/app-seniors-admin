
# 🎭 Spécifications - Module Modération

## 🎯 Objectif
Surveillance et gestion des contenus générés par les utilisateurs sur les forums et groupes.

## 📋 Fonctionnalités principales

### 1. Surveillance des contenus
#### Sources de contenu à modérer
- **Posts de forum** : Publications dans les discussions publiques
- **Messages de groupes** : Communications dans les groupes privés
- **Signalements** : Contenus signalés par les utilisateurs
- **Réponses forum** : Commentaires sur les sujets de discussion

#### Détection automatique
- **Mots-clés interdits** : Liste configurable de termes prohibés
- **Volume anormal** : Détection de spam par fréquence
- **Signalements répétés** : Alerte sur contenus souvent signalés

### 2. Gestion des signalements
#### Types de signalements
- **Contenu inapproprié** : Langage offensant, discrimination
- **Spam** : Messages publicitaires non sollicités
- **Informations fausses** : Désinformation sur la santé/services
- **Violation vie privée** : Partage de données personnelles
- **Harcèlement** : Comportements abusifs répétés

#### Workflow de traitement
1. **Réception** : Signalement créé par utilisateur
2. **Évaluation** : Analyse par équipe modération
3. **Action** : Validation, masquage, suppression ou rejet
4. **Notification** : Retour au signalant et à l'auteur
5. **Suivi** : Archivage et statistiques

### 3. Actions de modération
#### Actions disponibles
- **Valider** : Contenu conforme, pas d'action
- **Masquer** : Contenu caché mais conservé
- **Supprimer** : Suppression définitive du contenu
- **Avertir** : Notification à l'auteur
- **Suspendre** : Blocage temporaire du compte
- **Bannir** : Exclusion définitive (admin uniquement)

## 🔒 Permissions par rôle

| Action | Admin | Modérateur | Support | Visualisateur |
|--------|-------|------------|---------|---------------|
| Voir modération | ✅ | ✅ | ❌ | ❌ |
| Traiter signalements | ✅ | ✅ | ❌ | ❌ |
| Masquer contenu | ✅ | ✅ | ❌ | ❌ |
| Supprimer contenu | ✅ | ✅ | ❌ | ❌ |
| Suspendre utilisateur | ✅ | ❌ | ❌ | ❌ |
| Bannir utilisateur | ✅ | ❌ | ❌ | ❌ |
| Gérer paramètres | ✅ | ❌ | ❌ | ❌ |

## 📊 Structure des données

### Table SignalementContenu
```typescript
interface SignalementContenu {
  IDSignalementContenu: number;
  IDUtilisateurSignalant: number;
  TypeContenu: 'forum' | 'groupe' | 'message';
  IDReponseForum?: number;
  IDMessageGroupe?: number;
  MotifSignalement: string;
  DescriptionSignalement: string;
  DateSignalement: string;
  Traité: boolean;
  ActionModeration?: string;
  IDModerateur?: number;
  DateTraitement?: string;
  CommentaireModeration?: string;
}
```

### Table ReponseForum
```typescript
interface ReponseForum {
  IDReponseForum: number;
  IDSujetForum: number;
  IDUtilisateurs: number;
  ContenuReponse: string;
  DateReponse: string;
  EstMasque: boolean;
  EstSupprime: boolean;
  NombreSignalements: number;
}
```

### Table MessageGroupe
```typescript
interface MessageGroupe {
  IDMessageGroupe: number;
  IDGroupe: number;
  IDUtilisateurs: number;
  Contenu: string;
  DateEnvoi: string;
  EstMasque: boolean;
  EstSupprime: boolean;
  NombreSignalements: number;
}
```

### Table ActionsModeration
```typescript
interface ActionModeration {
  IDActionModeration: number;
  IDModerateur: number;
  TypeAction: 'valider' | 'masquer' | 'supprimer' | 'avertir' | 'suspendre';
  IDContenuCible: number;
  TypeContenu: string;
  DateAction: string;
  MotifAction: string;
  CommentaireAction?: string;
  DureeSuspension?: number; // en jours
}
```

## 🔧 API Routes

### Signalements

#### GET /moderation/signalements
**Description** : Liste des signalements  
**Paramètres** :
- `statut` : traité, non_traité, en_cours
- `type` : forum, groupe, message
- `motif` : Type de signalement
- `moderateur` : Signalements assignés à un modérateur
- `dateDebut`, `dateFin` : Période

**Réponse** :
```json
{
  "data": [
    {
      "id": 123,
      "type": "forum",
      "motif": "contenu_inapproprie",
      "auteurContenu": "Jean Dupont",
      "signalant": "Marie Martin",
      "dateSignalement": "2024-07-15T14:30:00Z",
      "statut": "non_traité",
      "contenu": "Message forum à modérer...",
      "priorite": "normale"
    }
  ],
  "total": 45,
  "nonTraites": 12
}
```

#### POST /moderation/signalements
**Description** : Créer un signalement  
**Body** :
```json
{
  "typeContenu": "forum",
  "idContenu": 456,
  "motif": "spam",
  "description": "Message publicitaire répétitif"
}
```

#### PUT /moderation/signalements/{id}/traiter
**Description** : Traiter un signalement  
**Body** :
```json
{
  "action": "masquer",
  "motif": "Contenu non conforme aux CGU",
  "commentaire": "Langage inapproprié détecté",
  "notifierAuteur": true
}
```

### Contenus

#### GET /moderation/posts-forum
**Description** : Posts de forum récents  
**Paramètres** :
- `signales` : true/false (filtre contenus signalés)
- `auteur` : Filtre par auteur
- `dateDebut`, `dateFin` : Période

#### GET /moderation/messages-groupes
**Description** : Messages de groupes récents  
**Paramètres** : Similaires aux posts forum

#### PUT /moderation/contenu/{type}/{id}/masquer
**Description** : Masquer un contenu  
**Paramètres** :
- `type` : forum, groupe
- `id` : ID du contenu
**Body** :
```json
{
  "motif": "Violation des règles communautaires",
  "notifierAuteur": true,
  "dureeExclusion": 0
}
```

#### PUT /moderation/contenu/{type}/{id}/supprimer
**Description** : Supprimer définitivement un contenu  
**Restrictions** : Confirmation requise, action irréversible

### Actions utilisateurs

#### POST /moderation/utilisateurs/{id}/avertir
**Description** : Envoyer un avertissement  
**Body** :
```json
{
  "motif": "Non-respect des règles",
  "message": "Votre dernier message ne respecte pas...",
  "niveauAvertissement": 1
}
```

#### POST /moderation/utilisateurs/{id}/suspendre
**Description** : Suspendre un utilisateur  
**Body** :
```json
{
  "duree": 7,
  "motif": "Récidive comportement inapproprié",
  "interdireConnexion": true,
  "interdirePublication": true
}
```

### Statistiques

#### GET /moderation/stats
**Description** : Statistiques de modération  
**Réponse** :
```json
{
  "signalementsEnAttente": 12,
  "contenusModeresCeMois": 89,
  "actionsParType": {
    "valides": 45,
    "masques": 23,
    "supprimes": 12,
    "avertissements": 15
  },
  "tempsReponseAmoyen": "2h30m",
  "utilisateursSuspendus": 3
}
```

## 📋 Règles métier

### Workflow de modération
1. **Signalement reçu** : Notification automatique équipe modération
2. **Assignation** : Attribution selon disponibilité modérateur
3. **Évaluation sous 24h** : Délai maximum de première réponse
4. **Action décidée** : Choix de l'action appropriée
5. **Notification automatique** : Information parties concernées
6. **Archivage** : Conservation historique pour audit

### Critères de modération
- **Gravité** : Léger, Modéré, Grave, Critique
- **Récidive** : Prise en compte de l'historique utilisateur
- **Impact** : Nombre de personnes affectées
- **Contexte** : Circonstances particulières du contenu

### Escalade automatique
- **24h sans traitement** : Notification superviseur
- **Contenu critique** : Alerte immédiate administrateur
- **Récidive utilisateur** : Révision du statut automatique
- **Volume anormal** : Alerte équipe technique

### Notifications et communications
- **Signalant** : Confirmation de prise en compte + résolution
- **Auteur du contenu** : Information si action prise
- **Équipe modération** : Rapports quotidiens d'activité
- **Administration** : Alertes sur cas critiques

### Conservation des données
- **Contenus masqués** : Conservation 6 mois pour appel
- **Contenus supprimés** : Sauvegarde technique 30 jours
- **Historique modération** : Conservation permanente pour audit
- **Signalements** : Archive complète pour statistiques

### Appels et recours
- **Délai d'appel** : 15 jours après notification
- **Procédure** : Révision par modérateur différent
- **Escalade** : Administrateur en dernier recours
- **Décision finale** : Non contestable après révision admin

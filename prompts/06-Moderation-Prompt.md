
# 🎭 Prompt Lovable - Système de Modération

## 🎯 Objectif
Créer la page de modération pour surveiller et gérer les contenus de la plateforme (forums, groupes, signalements).

## 📋 Instructions

### 1. Structure de la page
Page `/moderation` avec système d'onglets :
- Onglet "Signalements" : gestion des rapports
- Onglet "Posts Forum" : modération des publications
- Onglet "Messages Groupes" : surveillance des conversations
- Statistiques de modération en en-tête

### 2. Types de données
```typescript
interface Signalement {
  id: string;
  type: 'contenu_inapproprie' | 'spam' | 'harcelement' | 'autre';
  contenu: string;
  rapporteur: string;
  dateSignalement: Date;
  statut: 'nouveau' | 'en_cours' | 'resolu' | 'rejete';
  priorite: 'faible' | 'normale' | 'haute' | 'critique';
  assigneA?: string;
}

interface ForumPost {
  id: string;
  titre: string;
  contenu: string;
  auteur: string;
  datePublication: Date;
  statut: 'public' | 'masque' | 'supprime';
  signalements: number;
}

interface GroupMessage {
  id: string;
  contenu: string;
  auteur: string;
  groupe: string;
  dateEnvoi: Date;
  statut: 'public' | 'masque' | 'supprime';
  signalements: number;
}
```

### 3. Composants principaux

#### ModerationStats.tsx
- Signalements en attente
- Contenus modérés aujourd'hui
- Utilisateurs sanctionnés
- Temps de résolution moyen
- Graphique d'activité

#### SignalementsTable.tsx
- Liste des signalements par priorité
- Badges colorés par type/statut
- Actions rapides (approuver/rejeter)
- Détails au clic

#### ForumPostsTable.tsx
- Posts avec nombre de signalements
- Aperçu du contenu
- Actions de modération
- Filtrage par statut

#### GroupMessagesTable.tsx
- Messages de groupes signalés
- Contexte de conversation
- Modération granulaire
- Actions par message

### 4. Modals de modération

#### ViewSignalementModal.tsx
- Détails complets du signalement
- Historique des actions
- Commentaires modérateurs
- Preuve/contexte

#### ModerationActionsModal.tsx
Actions disponibles :
- Valider le contenu
- Masquer temporairement
- Supprimer définitivement
- Avertir l'utilisateur
- Suspendre le compte
- Marquer comme spam

#### ViewForumPostModal.tsx
- Contenu complet du post
- Réponses associées
- Profil de l'auteur
- Actions de modération

#### ViewGroupMessageModal.tsx
- Message avec contexte
- Conversation du groupe
- Participants concernés
- Historique de modération

### 5. Actions de modération

#### Types d'actions
```typescript
interface ModerationAction {
  type: 'approve' | 'hide' | 'delete' | 'warn' | 'suspend' | 'ban';
  reason: string;
  duration?: number; // en jours
  publicNote?: string;
  privateNote?: string;
}
```

#### Workflow de modération
1. Réception du signalement
2. Assignation à un modérateur
3. Évaluation du contenu
4. Décision et action
5. Notification aux parties
6. Suivi et appel

### 6. Hooks personnalisés

#### useModerationStats.ts
```typescript
interface ModerationStatsReturn {
  stats: {
    signalementsEnAttente: number;
    contenusModeres: number;
    utilisateursSanctionnes: number;
    tempsResolutionMoyen: number;
  };
  loading: boolean;
  error: string | null;
}
```

#### useSignalements.ts
- CRUD sur signalements
- Assignation aux modérateurs
- Historique des actions
- Statistiques par type

#### useModerationActions.ts
- Exécution des actions
- Notifications automatiques
- Logging des décisions
- Suivi des sanctions

### 7. Système de priorités

#### Algorithme de priorité
```typescript
const calculerPriorite = (signalement: Signalement) => {
  let score = 0;
  
  // Type de signalement
  if (signalement.type === 'harcelement') score += 3;
  if (signalement.type === 'contenu_inapproprie') score += 2;
  if (signalement.type === 'spam') score += 1;
  
  // Nombre de signalements similaires
  score += signalement.occurrences * 0.5;
  
  // Ancienneté
  const heures = (Date.now() - signalement.dateSignalement.getTime()) / (1000 * 60 * 60);
  if (heures > 24) score += 1;
  if (heures > 72) score += 2;
  
  return score > 4 ? 'critique' : 
         score > 2 ? 'haute' : 
         score > 1 ? 'normale' : 'faible';
};
```

### 8. Interface utilisateur

#### Design
- Tabs avec compteurs d'éléments
- Système de badges colorés
- Interface responsive
- Actions contextuelles

#### Couleurs par statut
- Nouveau : Orange
- En cours : Bleu
- Résolu : Vert
- Rejeté : Gris

#### Couleurs par priorité
- Critique : Rouge
- Haute : Orange
- Normale : Bleu
- Faible : Gris

### 9. Fonctionnalités avancées

#### Filtrage intelligent
- Par type de signalement
- Par statut de modération
- Par priorité
- Par modérateur assigné
- Par période

#### Actions en lot
- Approuver plusieurs signalements
- Rejeter en masse
- Assignation groupée
- Export pour audit

#### Historique et audit
- Log de toutes les actions
- Traçabilité des décisions
- Rapports d'activité
- Métriques de performance

### 10. Notifications

#### Système d'alertes
- Nouveaux signalements critiques
- Signalements non traités > 24h
- Utilisateurs multirécidivistes
- Pics d'activité inhabituelle

#### Communications
- Notifications aux utilisateurs
- Emails aux modérateurs
- Rappels d'actions
- Rapports hebdomadaires

### 11. Intégration base de données

#### Tables utilisées
- `Forum` et `ReponseForum`
- `Groupe` et `MessageGroupe`
- `Signalement` (à créer)
- `Utilisateurs`
- `ActionModeration` (à créer)

#### Triggers et fonctions
- Auto-assignation selon charge
- Escalade automatique
- Notifications push
- Archivage automatique

### 12. Sécurité et permissions

#### Contrôle d'accès
- Seuls les modérateurs et admins
- Logs des actions sensibles
- Validation des permissions
- Audit trail complet

#### Protection des données
- Anonymisation des rapports
- Suppression sécurisée
- Respect RGPD
- Archivage conforme

### 13. Performance et optimisation
- Pagination intelligente
- Cache des statistiques
- Indexation des recherches
- Optimisation des requêtes

Créez un système de modération professionnel avec workflow complet, priorisation intelligente et interface intuitive pour maintenir la qualité des contenus sur la plateforme.


# 📞 Prompt Lovable - Système de Support Client

## 🎯 Objectif
Créer la page de gestion des tickets de support avec workflow complet et notifications automatiques.

## 📋 Instructions

### 1. Structure de la page
Page `/support` avec :
- Vue d'ensemble des tickets
- Filtrage par statut/priorité
- Actions de gestion
- Système de réponses

### 2. Types de données
```typescript
interface SupportTicket {
  id: string;
  sujet: string;
  message: string;
  utilisateur: {
    nom: string;
    prenom: string;
    email: string;
  };
  dateCreation: Date;
  statut: 'nouveau' | 'en_cours' | 'en_attente' | 'resolu' | 'ferme';
  priorite: 'basse' | 'normale' | 'haute' | 'critique';
  assigneA?: string;
  dateResolution?: Date;
  satisfaction?: number;
}

interface TicketReply {
  id: string;
  ticketId: string;
  auteur: string;
  contenu: string;
  dateReponse: Date;
  type: 'client' | 'support' | 'system';
  fichierJoint?: string;
}
```

### 3. Composants principaux

#### Support.tsx (Page principale)
- Vue Kanban ou Liste
- Filtres par statut/priorité
- Recherche par contenu
- Actions en lot

#### SupportStats.tsx
- Tickets ouverts
- Temps de résolution moyen
- Satisfaction client
- Charge par agent
- Graphiques de tendances

#### TicketCard.tsx
- Affichage compact du ticket
- Indicateurs visuels (priorité, statut)
- Actions rapides
- Preview du contenu

#### TicketList.tsx
- Vue tabulaire des tickets
- Tri par colonnes
- Pagination
- Sélection multiple

### 4. Modals de gestion

#### AddTicketModal.tsx
Formulaire de création :
- Utilisateur (sélecteur)
- Sujet (requis)
- Description (requis)
- Priorité (auto ou manuelle)
- Catégorie de problème

#### SupportTicketModal.tsx
Vue détaillée avec :
- **TicketHeader.tsx** : Sujet, statut, priorité
- **TicketDescription.tsx** : Message initial
- **TicketStatusInfo.tsx** : Infos de statut
- **TicketResolutionInfo.tsx** : Détails résolution
- **TicketActions.tsx** : Actions disponibles
- **TicketReplyForm.tsx** : Formulaire de réponse
- Historique des échanges
- Fichiers joints

#### TicketResponseModal.tsx
- Éditeur de réponse enrichi
- Templates de réponses
- Pièces jointes
- Prévisualisation

#### ResolveTicketModal.tsx
- Solution fournie
- Note de résolution
- Demande d'évaluation
- Actions de clôture

#### TicketAssignmentForm.tsx
- Sélection de l'agent
- Charge de travail
- Compétences requises
- Notification automatique

### 5. Workflow de gestion

#### États des tickets
1. **Nouveau** : Ticket créé
2. **En cours** : Pris en charge
3. **En attente** : Attente client
4. **Résolu** : Solution fournie
5. **Fermé** : Ticket clôturé

#### Transitions automatiques
- Nouveau → En cours (assignation)
- En cours → En attente (réponse support)
- En attente → En cours (réponse client)
- En cours → Résolu (solution)
- Résolu → Fermé (validation client)

### 6. Système de priorités

#### Calcul automatique
```typescript
const calculerPriorite = (ticket: SupportTicket) => {
  let score = 0;
  
  // Mots-clés critiques
  const motsCritiques = ['urgent', 'bloqué', 'panne', 'sécurité'];
  if (motsCritiques.some(mot => ticket.message.toLowerCase().includes(mot))) {
    score += 3;
  }
  
  // Type d'utilisateur
  if (ticket.utilisateur.type === 'premium') score += 1;
  
  // Historique
  if (ticket.utilisateur.ticketsOuverts > 3) score += 1;
  
  return score >= 4 ? 'critique' :
         score >= 2 ? 'haute' :
         score >= 1 ? 'normale' : 'basse';
};
```

### 7. Hooks personnalisés

#### useSupabaseSupportTickets.ts
```typescript
interface SupportTicketsHookReturn {
  tickets: SupportTicket[];
  loading: boolean;
  error: string | null;
  addTicket: (data: CreateTicketData) => Promise<void>;
  updateTicket: (id: string, data: Partial<SupportTicket>) => Promise<void>;
  addReply: (ticketId: string, reply: CreateReplyData) => Promise<void>;
  assignTicket: (ticketId: string, agentId: string) => Promise<void>;
  resolveTicket: (ticketId: string, solution: string) => Promise<void>;
}
```

#### useSupportTicketMutations.ts
- Opérations CRUD optimisées
- Gestion des erreurs
- Optimistic updates
- Cache invalidation

#### useTicketPermissions.ts
- Contrôle d'accès par rôle
- Permissions sur actions
- Visibilité des tickets
- Assignation autorisée

### 8. Système de notifications

#### Edge Function : send-ticket-response
```typescript
// Déjà implémentée dans le projet
// Envoi automatique d'emails sur :
// - Nouveau ticket
// - Réponse support
// - Changement de statut
// - Résolution
```

#### Templates d'emails
- Accusé de réception
- Mise à jour de statut
- Demande d'information
- Résolution et feedback

### 9. Interface utilisateur

#### Design
- Cards avec badges colorés
- Timeline des échanges
- Éditeur de texte enrichi
- Drag & drop pour fichiers

#### Couleurs par statut
- Nouveau : Bleu
- En cours : Orange
- En attente : Jaune
- Résolu : Vert
- Fermé : Gris

#### Couleurs par priorité
- Critique : Rouge foncé
- Haute : Rouge
- Normale : Bleu
- Basse : Gris

### 10. Fonctionnalités avancées

#### Système de templates
- Réponses pré-écrites
- Personnalisation
- Catégories de problèmes
- Macros automatiques

#### SLA et métriques
- Temps de première réponse
- Temps de résolution
- Satisfaction client
- Charge par agent

#### Recherche et filtrage
- Recherche full-text
- Filtres multiples
- Sauvegarde des vues
- Tri personnalisé

### 11. Intégration base de données

#### Tables utilisées
- `TicketClient` : tickets principaux
- `TicketReply` : réponses et échanges
- `PrestationSupport` : assignations
- `Utilisateurs` : clients et agents

#### Vues optimisées
- `support_dashboard_view` : vue d'ensemble
- Agrégations pour statistiques
- Index pour performance

### 12. Gestion des fichiers
- Upload de pièces jointes
- Prévisualisation des images
- Téléchargement sécurisé
- Stockage organisé

### 13. Rapports et analytics
- Tableaux de bord
- Rapports périodiques
- Métriques d'équipe
- Tendances de satisfaction

### 14. Optimisations
- Pagination intelligente
- Cache des requêtes
- Notifications temps réel
- Synchronisation multi-utilisateurs

### 15. Accessibilité
- Navigation clavier
- Lecteurs d'écran
- Contrastes élevés
- Textes alternatifs

Créez un système de support professionnel avec workflow automatisé, notifications intelligentes et interface moderne pour assurer une excellente expérience client.

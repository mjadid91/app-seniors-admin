
# Implémentation de la fonctionnalité d'ajout de tickets support

## Objectif
Permettre aux administrateurs de créer des tickets support via un formulaire et de consulter toutes les informations utiles pour intervenir rapidement.

## Système de statuts des tickets

### Statuts disponibles
1. **"en_attente"** : Ticket créé mais non assigné à un agent
2. **"en_cours"** : Ticket assigné à un agent de support
3. **"resolu"** : Ticket résolu par un agent de support ou un administrateur

### Logique de gestion des statuts
- **Création de ticket** : 
  - Si aucun agent n'est sélectionné → statut "en_attente"
  - Si un agent est sélectionné → statut "en_cours"
- **Assignation d'agent** : Le statut passe automatiquement à "en_cours"
- **Résolution** : Seuls les agents assignés ou les administrateurs peuvent résoudre un ticket

## Modifications apportées

### 1. Ajout du bouton "Ajouter un ticket" dans Support.tsx

**Localisation :** `src/components/support/Support.tsx`

**Ajouts :**
- État pour contrôler l'ouverture/fermeture de la modale
- Bouton pour ouvrir la modale d'ajout
- Composant AddTicketModal avec gestion des callbacks
- Mise à jour des labels de statuts pour correspondre aux nouveaux statuts

### 2. Création du formulaire d'ajout de ticket dans AddTicketModal.tsx

**Localisation :** `src/components/support/AddTicketModal.tsx`

**Fonctionnalités implémentées :**
- Formulaire avec les champs requis :
  - Sujet du ticket
  - Description du problème
  - Sélection du client
  - Priorité
  - Agent de support (optionnel)

**Logique de soumission :**
```typescript
// Déterminer le statut initial
const statutInitial = formData.agentId ? "en_cours" : "en_attente";

const { data: ticketData, error: ticketError } = await supabase
  .from('SupportClient')
  .insert({
    Sujet: formData.sujet,
    DescriptionDemande: formData.descriptionDemande,
    IDUtilisateursClient: parseInt(formData.clientId),
    Priorite: formData.priorite,
    StatutDemande: statutInitial,
    DateEnvoi: new Date().toISOString().split('T')[0]
  })
```

**Assignation automatique d'agent (si sélectionné) :**
```typescript
if (formData.agentId && ticketData) {
  const { error: prestationError } = await supabase
    .from('PrestationSupport')
    .insert({
      IDTicketClient: ticketData.IDTicketClient,
      IDIntervenant: parseInt(formData.agentId)
    });
}
```

### 3. Mise à jour de la logique d'assignation dans TicketAssignmentForm.tsx

**Localisation :** `src/components/support/TicketAssignmentForm.tsx`

**Changements :**
- Assignation d'un agent met automatiquement le statut à "en_cours"
- Notification utilisateur de la mise à jour du statut

### 4. Mise à jour des composants d'affichage

**Fichiers modifiés :**
- `src/components/support/TicketStatusInfo.tsx`
- `src/components/support/TicketResolutionInfo.tsx`
- `src/hooks/useTicketPermissions.ts`
- `src/hooks/useSupabaseSupportTickets.ts`

**Changements :**
- Mise à jour des labels et couleurs pour les nouveaux statuts
- Adaptation des types TypeScript
- Logique de permissions pour la résolution des tickets

### 5. Mise à jour de la résolution des tickets

**Localisation :** `src/hooks/useSupportTicketMutations.ts`

**Changements :**
- Résolution des tickets met le statut à "resolu"
- Ajout de la date de résolution

## Fonctionnalités résultantes

1. **Création de tickets** : Les administrateurs peuvent créer des tickets avec statut automatique
2. **Sélection de clients** : Liste déroulante des utilisateurs disponibles
3. **Assignation d'agents** : Possibilité d'assigner directement un agent ou plus tard
4. **Gestion des priorités** : 4 niveaux de priorité (Faible, Normale, Haute, Urgente)
5. **Statuts cohérents** : Système de statuts logique et automatisé
6. **Permissions de résolution** : Seuls les agents assignés et administrateurs peuvent résoudre
7. **Affichage des descriptions** : Les vraies descriptions des tickets sont maintenant affichées
8. **Rafraîchissement automatique** : La liste se met à jour après création/modification d'un ticket

## Workflow des statuts

1. **Création** :
   - Sans agent → "en_attente"
   - Avec agent → "en_cours"

2. **Assignation** :
   - Ticket "en_attente" → "en_cours"

3. **Résolution** :
   - Ticket "en_cours" ou "en_attente" → "resolu"
   - Seuls les agents assignés ou administrateurs peuvent résoudre

## Base de données

Le système utilise les tables Supabase suivantes :
- `SupportClient` : Stockage des tickets avec statuts
- `PrestationSupport` : Association tickets/agents
- `Utilisateurs` : Liste des clients et agents

## Tests recommandés

1. Créer un ticket sans agent (vérifier statut "en_attente")
2. Créer un ticket avec agent (vérifier statut "en_cours")
3. Assigner un agent à un ticket en attente (vérifier changement de statut)
4. Résoudre un ticket en tant qu'agent assigné
5. Résoudre un ticket en tant qu'administrateur
6. Vérifier les permissions de résolution selon les rôles
7. Contrôler l'affichage des statuts dans l'interface


# 📞 Documentation – Page Support

## 🧭 Objectif

La page **Support** (`Support.tsx`) centralise la gestion des tickets de support client et l'assistance aux utilisateurs de la plateforme.

---

## 🎫 Composants principaux

### 📋 Interface principale (`Support.tsx`)
- **Liste des tickets** : Affichage de tous les tickets de support
- **Filtrage** : Par statut, priorité, assignation
- **Actions** : Création, consultation, traitement
- **Statistiques** : Métriques de support

### ➕ Création (`AddTicketModal.tsx`)
- **Formulaire** : Titre, description, priorité, catégorie
- **Assignation** : Attribution automatique ou manuelle
- **Validation** : Contrôles de saisie obligatoires

---

## 🔧 Gestion des tickets

### 👁️ Consultation (`SupportTicketModal.tsx`)
- **Détails complets** : Toutes les informations du ticket
- **Composants intégrés** :
  - **`TicketHeader.tsx`** : En-tête avec statut et priorité
  - **`TicketDescription.tsx`** : Description détaillée
  - **`TicketStatusInfo.tsx`** : Informations de statut
  - **`TicketResolutionInfo.tsx`** : Détails de résolution
  - **`TicketActions.tsx`** : Actions disponibles

### 💬 Réponses et communication
- **`TicketReplyForm.tsx`** : Formulaire de réponse
- **`TicketResponseModal.tsx`** : Modal de réponse détaillée
- **Historique** : Conversation complète du ticket

### ⚙️ Gestion avancée
- **`TicketAssignmentForm.tsx`** : Attribution des tickets
- **`ResolveTicketModal.tsx`** : Résolution et clôture
- **Workflows** : Processus de traitement structuré

---

## 🔧 Hooks et services

### 📡 Hooks de données
- **`useSupabaseSupportTickets.ts`** : Interface principale Supabase
- **`useSupportTicketMutations.ts`** : Opérations CRUD
- **`useSupportUsers.ts`** : Gestion des utilisateurs support
- **`useTicketPermissions.ts`** : Contrôle d'accès

### 🗄️ Base de données
- **`SupportTicket`** : Table principale des tickets
- **`TicketReply`** : Réponses et conversations
- **`Utilisateurs`** : Assignation et gestion

---

## 🔔 Intégration Edge Functions

### 📧 Notifications automatiques
- **`send-ticket-response/index.ts`** : Envoi d'emails automatiques
- **Déclencheurs** : Nouvelle réponse, changement de statut
- **Templates** : Messages personnalisés selon le contexte

---

## 🎨 Interface

### 📱 Design modulaire
- **Cards** : Affichage des tickets par cartes
- **Badges** : Statuts et priorités visuels
- **Forms** : Formulaires Shadcn/UI
- **Modals** : Actions détaillées

### 🔄 États des tickets
- **Nouveau** : Ticket créé, en attente
- **En cours** : Pris en charge par un agent
- **En attente** : Attente de réponse client
- **Résolu** : Ticket clôturé avec solution
- **Fermé** : Ticket terminé définitivement

### 🎯 Priorités
- **Basse** : Demandes non urgentes
- **Normale** : Demandes standard
- **Haute** : Problèmes importants
- **Critique** : Problèmes bloquants

---

## 🎯 Résumé

La page Support comprend :
- Gestion complète des tickets de support
- Interface de conversation avec historique
- Système d'assignation et de workflow
- Notifications automatiques par email
- Hooks personnalisés pour toutes les opérations
- Interface moderne avec statuts visuels
- Intégration complète avec Supabase et Edge Functions

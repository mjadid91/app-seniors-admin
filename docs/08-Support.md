
# 📞 Documentation – Page Support

## 🧭 Objectif

La page **Support** (`Support.tsx`) centralise la gestion des tickets de support client et l'assistance aux utilisateurs de la plateforme AppSeniors.

---

## 🎫 Composants principaux

### 📋 Interface principale (`Support.tsx`)
- **Liste des tickets** : Affichage de tous les tickets de support depuis Supabase
- **Statistiques** : Cartes résumant les tickets par statut (En attente, En cours, Résolus, Total)
- **Filtrage** : Par statut avec menu déroulant
- **Actions** : Consultation détaillée des tickets
- **Bouton d'ajout** : Création de nouveaux tickets

### ➕ Création (`AddTicketModal.tsx`)
- **Formulaire complet** : Sélection utilisateur, sujet, message, priorité
- **Validation** : Contrôles de saisie obligatoires
- **Intégration Supabase** : Sauvegarde directe en base

---

## 🔧 Gestion des tickets

### 👁️ Consultation (`SupportTicketModal.tsx`)
- **Modal détaillée** : Vue complète du ticket avec onglets
- **Composants intégrés** :
  - **`TicketHeader.tsx`** : En-tête avec informations principales
  - **`TicketDescription.tsx`** : Description du ticket
  - **`TicketStatusInfo.tsx`** : Informations de statut
  - **`TicketResolutionInfo.tsx`** : Détails de résolution si résolu
  - **`TicketActions.tsx`** : Actions disponibles (résoudre, fermer)

### 📝 Onglets de gestion
- **Répondre** : Formulaire pour ajouter des réponses
- **Assignation** : Attribution des tickets aux agents

### 💬 Réponses et communication
- **`TicketReplyForm.tsx`** : Formulaire de réponse avec validation
- **`TicketReplies.tsx`** : Affichage de l'historique des réponses
- **Intégration Edge Function** : Notifications automatiques par email

### ⚙️ Gestion avancée
- **`TicketAssignmentForm.tsx`** : Attribution et réassignation des tickets
- **`ResolveTicketModal.tsx`** : Résolution avec note optionnelle
- **Permissions** : Contrôle d'accès via `useTicketPermissions`

---

## 🗄️ Base de données

### 📊 Vue principale
- **`support_dashboard_view`** : Vue Supabase optimisée
- **Données utilisateur** : Nom, prénom, email des clients
- **Assignation** : Informations sur l'agent assigné
- **Dates** : Création et résolution

### 🎯 Tables utilisées
- **Support via vue** : Accès aux tickets avec jointures
- **TicketReply** : Système de réponses (implémenté)
- **PrestationSupport** : Assignations des tickets

---

## 🔔 Intégration Edge Functions

### 📧 Notifications automatiques
- **`send-ticket-response/index.ts`** : Fonction de notification email
- **Déclencheurs** : Nouvelle réponse, changement de statut
- **Templates** : Messages personnalisés selon le contexte

---

## 🔧 Hooks et services

### 📡 Hooks principaux
- **`useSupabaseSupportTickets.ts`** : Interface principale pour récupérer les tickets
- **`useSupportTicketMutations.ts`** : Opérations de modification (résolution, assignation)
- **`useSupportReplies.ts`** : Gestion des réponses aux tickets
- **`useTicketPermissions.ts`** : Contrôle d'accès par rôle
- **`useSupportUsers.ts`** : Gestion des utilisateurs pour assignation

### 🎨 Interface utilisateur

### 📱 Design moderne
- **Cards colorées** : Statistiques visuelles par statut
- **Badges** : Statuts et priorités avec couleurs distinctives
- **Table responsive** : Liste des tickets avec tri et filtrage
- **Modals** : Actions détaillées avec onglets

### 🔄 États des tickets
- **En attente** : Nouveau ticket (rouge)
- **En cours** : Pris en charge (jaune)
- **Résolu** : Ticket clôturé (vert)

### 🎯 Priorités
- **Haute** : Rouge - Problèmes urgents
- **Normale** : Bleu - Demandes standard
- **Basse** : Gris - Demandes non prioritaires

---

## ✅ Fonctionnalités implémentées

### 🎮 Actions disponibles
- ✅ **Création** : Nouveau ticket avec formulaire complet
- ✅ **Consultation** : Vue détaillée avec toutes les informations
- ✅ **Réponse** : Système de réponses fonctionnel
- ✅ **Assignation** : Attribution aux agents support
- ✅ **Résolution** : Marquage comme résolu avec note
- ✅ **Filtrage** : Par statut dans l'interface
- ✅ **Statistiques** : Décompte par catégorie

### 🔗 Intégrations
- ✅ **Supabase** : Base de données complète
- ✅ **Edge Functions** : Notifications email automatiques
- ✅ **Permissions** : Contrôle d'accès par rôle
- ✅ **React Query** : Cache et synchronisation

---

## 🎯 Résumé

La page Support est **complètement fonctionnelle** avec :
- Interface de gestion des tickets connectée à Supabase
- Système de réponses et d'assignation opérationnel
- Notifications automatiques par email
- Hooks personnalisés pour toutes les opérations
- Interface moderne avec statuts visuels
- Permissions et contrôle d'accès intégrés
- Composants modulaires et maintenables

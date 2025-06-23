
# Script Vidéo - AppSeniors Admin

## Introduction

Bienvenue dans cette démonstration de l'application AppSeniors Admin.

Dans cette vidéo, je vais vous présenter les fonctionnalités principales que j'ai développées pendant mon stage, et qui sont aujourd'hui entièrement fonctionnelles.

Je vous montrerai chaque page de l'interface, à quoi elle sert, comment elle fonctionne, et le code que j'ai mis en place côté React pour que tout s'affiche correctement.

---

## 0. Page de Connexion
### Description
La page de connexion permet aux administrateurs, modérateurs, support, etc., d’accéder à la plateforme AppSeniors Admin de manière sécurisée.

### Fonctionnalités principales
- Authentification via Supabase
- Gestion des rôles (Admin, Modérateur, Support)
- Redirection vers le tableau de bord après connexion réussie
- Gestion des erreurs de connexion

### Code principal
**Fichiers principaux :**
- `src/components/auth/LoginPage.tsx` - Composant de la page de connexion
- `src/hooks/useSupabaseAuth.ts` - Hook pour l'authentification Supabase
- `src/components/auth/ProtectedRoute.tsx` - Si l’utilisateur n’est pas connecté, il est redirigé automatiquement vers la page /login grâce au composant ProtectedRoute
- `src/stores/authStore.ts` - Le système utilise Zustand pour stocker l’état de l’utilisateur connecté
## 1. Tableau de bord (Dashboard)

### Description
Cette page permet d'afficher les dernières actualités récentes, autrement dit les dernières insertions de certaines tables importantes de la base de données, comme l'ajout d'un utilisateur, d'un signalement, d'un groupe, etc.

### Fonctionnalités
- Affichage des activités récentes
- Cartes de statistiques globales
- Graphiques de tendances

### Code principal
**Fichiers impliqués :**
- `src/components/dashboard/Dashboard.tsx` - Composant principal du tableau de bord
- `src/components/dashboard/useRecentActivities.ts` - Hook pour récupérer les activités récentes
- `src/components/dashboard/RecentActivity.tsx` - Composant d'affichage des activités
- `src/components/dashboard/StatsCard.tsx` - Cartes de statistiques
- `src/components/dashboard/ActivityChart.tsx` - Graphiques d'activité
- `src/components/dashboard/useDashboardStats.ts` - Hook pour les statistiques

### Base de données
- Utilise une vue SQL `v_activitesrecentes` pour faciliter l'affichage des dernières insertions

---

## 2. Gestion des Utilisateurs

### Description
Cette page permet de gérer tous les utilisateurs du système : seniors, aidants, tuteurs, administrateurs, etc.

### Fonctionnalités principales
- Tableau de tous les utilisateurs avec informations clés
- Recherche et filtrage par statut ou rôle
- Ajout, modification et suppression d'utilisateurs
- Gestion des rôles et permissions
- Statistiques globales sur les utilisateurs

### Code principal
**Fichiers principaux :**
- `src/components/users/UserManagement.tsx` - Composant principal
- `src/components/users/UserTable.tsx` - Tableau des utilisateurs
- `src/components/users/AddUserModal.tsx` - Modal d'ajout d'utilisateur
- `src/components/users/EditUserModal.tsx` - Modal de modification
- `src/components/users/UserCreationForm.tsx` - Formulaire de création
- `src/components/users/RoleSelector.tsx` - Sélecteur de rôles
- `src/components/users/PasswordGenerator.tsx` - Générateur de mots de passe
- `src/components/users/PasswordConfirmation.tsx` - Confirmation de mot de passe
- `src/components/users/UserStats.tsx` - Statistiques utilisateurs
- `src/components/users/UserSearch.tsx` - Barre de recherche

**Hooks et utilitaires :**
- `src/hooks/useSupabaseUsers.ts` - Hook pour interroger Supabase
- `src/components/users/useUserManagement.tsx` - Logique métier de gestion
- `src/hooks/useUserCategories.ts` - Gestion des catégories d'utilisateurs
- `src/components/users/useEmailValidation.ts` - Validation des emails

**Composants spécialisés :**
- `src/components/users/UserBasicInfoFields.tsx` - Champs d'informations de base
- `src/components/users/EmailField.tsx` - Champ email avec validation
- `src/components/users/PreferencesFields.tsx` - Préférences utilisateur
- `src/components/users/UserFormActions.tsx` - Actions de formulaire
- `src/components/users/RoleManager.tsx` - Gestionnaire de rôles
- `src/components/ui/role-badge.tsx` - Badge de rôle

### Tables utilisées
- `Utilisateurs` - Table principale des utilisateurs
- `CatUtilisateurs` - Catégories et rôles des utilisateurs
- `Langue` - Langues préférées
- `Devise` - Devises utilisées

### Trigger SQL automatique
Lors de l'ajout d'un utilisateur, un trigger SQL s'active pour créer automatiquement un profil dans la table `Seniors` ou `Aidant` selon le rôle sélectionné.

---

## 3. Suivi des Prestations

### Description
La page Prestations permet de suivre toutes les prestations réalisées entre seniors et aidants sur la plateforme AppSeniors.

### Fonctionnalités principales
- Cartes de statistiques (en attente, en cours, terminées, chiffre d'affaires)
- Tableau des prestations avec détails complets
- Filtrage par statut de prestation
- Modal de détails pour chaque prestation
- Ajout de nouvelles prestations et domaines

### Code principal
**Fichiers principaux :**
- `src/components/prestations/PrestationTracking.tsx` - Composant principal
- `src/components/prestations/PrestationTable.tsx` - Tableau des prestations
- `src/components/prestations/PrestationStatsCards.tsx` - Cartes de statistiques
- `src/components/prestations/PrestationFilters.tsx` - Filtres par statut
- `src/components/prestations/PrestationDetailsModal.tsx` - Modal de détails
- `src/components/prestations/AddPrestationModal.tsx` - Modal d'ajout
- `src/components/prestations/AddDomaineModal.tsx` - Modal d'ajout de domaine

**Hooks :**
- `src/hooks/useSupabasePrestations.ts` - Récupération des données Supabase

### Tables utilisées
- `Prestation` - Intitulé, tarif, date, domaine
- `MiseEnRelation` - Association prestations/seniors/aidants
- `Seniors` et `Aidant` - Noms des bénéficiaires et intervenants
- `Evaluation` - Notes et évaluations
- `MiseEnRelation_Prestation` - Liaison entre entités
- `Domaine` - Domaines de prestations

---

## 4. Modération

### Description
La page Modération permet de visualiser et gérer les contenus signalés dans les forums publics et les groupes de discussion.

### Fonctionnalités principales
- Deux onglets : Forums et Groupes
- Tableau des messages/sujets signalés
- Nombre de signalements et statut
- Modals de détails pour modération
- Actions de modération (masquer, approuver, etc.)

### Code principal
**Fichiers principaux :**
- `src/components/moderation/Moderation.tsx` - Composant principal
- `src/components/moderation/ForumPostsTable.tsx` - Tableau des posts de forum
- `src/components/moderation/GroupMessagesTable.tsx` - Tableau des messages de groupe
- `src/components/moderation/ViewForumPostModal.tsx` - Modal détails forum
- `src/components/moderation/ViewGroupMessageModal.tsx` - Modal détails groupe
- `src/components/moderation/ModerationActionsModal.tsx` - Actions de modération
- `src/components/moderation/ModerationStats.tsx` - Statistiques de modération

**Hooks et types :**
- `src/components/moderation/useForumPosts.ts` - Hook pour posts de forum
- `src/components/moderation/useGroupMessages.ts` - Hook pour messages de groupe
- `src/components/moderation/types.ts` - Types TypeScript
- `src/components/moderation/useModerationStats.ts` - Statistiques
- `src/hooks/useModerationActions.ts` - Actions de modération

### Tables utilisées
- `Forum`, `SujetForum`, `ReponseForum` - Données des forums
- `Groupe`, `MessageGroupe` - Données des groupes
- `SignalementContenu` - Signalements des contenus
- Tables de liaisons pour retrouver auteurs et signalements

---

## 5. Support Client

### Description
La page Support permet de gérer les tickets envoyés par les utilisateurs qui rencontrent des problèmes techniques ou ont besoin d'assistance.

### Fonctionnalités principales
- Tableau des tickets avec statuts
- Consultation des détails de chaque ticket
- Système de réponse aux tickets
- Assignation des tickets aux agents support
- Résolution et suivi des tickets

### Code principal
**Fichiers principaux :**
- `src/components/support/Support.tsx` - Composant principal
- `src/components/support/SupportTicketModal.tsx` - Modal de détails ticket
- `src/components/support/TicketAssignmentForm.tsx` - Formulaire d'assignation
- `src/components/support/TicketReplyForm.tsx` - Formulaire de réponse
- `src/components/support/ResolveTicketModal.tsx` - Modal de résolution
- `src/components/support/AddTicketModal.tsx` - Ajout de ticket
- `src/components/support/TicketHeader.tsx` - En-tête de ticket
- `src/components/support/TicketStatusInfo.tsx` - Informations de statut
- `src/components/support/TicketResolutionInfo.tsx` - Informations de résolution
- `src/components/support/TicketDescription.tsx` - Description du ticket
- `src/components/support/TicketActions.tsx` - Actions disponibles
- `src/components/support/TicketResponseModal.tsx` - Modal de réponse

**Hooks :**
- `src/hooks/useSupabaseSupportTickets.ts` - Récupération des tickets
- `src/hooks/useSupportTicketMutations.ts` - Mutations des tickets
- `src/hooks/useTicketPermissions.ts` - Gestion des permissions

### Tables utilisées
- `Utilisateurs` - Identification client et employé support
- `SupportClient` - Tickets envoyés par les utilisateurs
- `PrestationSupport` - Assignation des tickets aux intervenants

---

## 6. Gestion des Documents

### Description
La page Documents permet de gérer une bibliothèque de documents avec upload, catégorisation et gestion des statuts.

### Fonctionnalités principales
- Tableau des documents avec métadonnées
- Upload de nouveaux documents
- Catégorisation des documents
- Gestion des statuts (brouillon/publié)
- Visualisation et téléchargement
- Statistiques globales

### Code principal
**Fichiers principaux :**
- `src/components/documents/Documents.tsx` - Composant principal
- `src/components/documents/DocumentsTable.tsx` - Tableau des documents
- `src/components/documents/AddDocumentModal.tsx` - Modal d'ajout
- `src/components/documents/EditDocumentModal.tsx` - Modal de modification
- `src/components/documents/ViewDocumentModal.tsx` - Modal de visualisation
- `src/components/documents/DocumentsStats.tsx` - Statistiques
- `src/components/documents/DocumentsFilters.tsx` - Filtres et recherche
- `src/components/documents/DocumentsHeader.tsx` - En-tête de page
- `src/components/documents/DocumentsUpload.tsx` - Zone d'upload
- `src/components/documents/DocumentsQuickActions.tsx` - Actions rapides
- `src/components/documents/DocumentFormFields.tsx` - Champs de formulaire

**Hooks :**
- `src/components/documents/useDocuments.tsx` - Hook principal de gestion
- `src/components/documents/useDocumentForm.tsx` - Logique de formulaire

### Tables utilisées
- `Document` - Table principale des documents
- `CategorieDocument` - Catégories de documents
- `Utilisateurs` - Liaison avec les expéditeurs

---

## 7. Gestion des Partenaires

### Description
Interface de gestion des partenaires commerciaux et de leurs bons plans.

### Fonctionnalités principales
- Liste des partenaires avec filtres
- Gestion des services partenaires
- Création et gestion des bons plans
- Statistiques de partenariat

### Code principal
**Fichiers principaux :**
- `src/components/partners/Partners.tsx` - Composant principal
- `src/components/partners/PartnerCard.tsx` - Carte partenaire
- `src/components/partners/AddPartnerModal.tsx` - Ajout de partenaire
- `src/components/partners/BonPlansSection.tsx` - Section bons plans
- `src/components/partners/AddBonPlanModal.tsx` - Ajout de bon plan

---

## 8. Gestion RGPD

### Description
Interface pour traiter les demandes RGPD des utilisateurs (accès, rectification, suppression).

### Code principal
- `src/components/rgpd/RGPD.tsx` - Interface principale
- `src/components/rgpd/ProcessRequestModal.tsx` - Traitement des demandes

---

## 9. Seniors et Aidants

### Description
Pages spécialisées pour la gestion des profils seniors et aidants.

### Code principal
**Seniors :**
- `src/components/seniors/SeniorsList.tsx` - Liste des seniors
- `src/components/seniors/SeniorDetailsModal.tsx` - Détails d'un senior

**Aidants :**
- `src/components/users/AidantsTable.tsx` - Tableau des aidants
- `src/components/seniors/AidantDetailsModal.tsx` - Détails d'un aidant

---

## Architecture générale

### Composants de base
- `src/components/layout/DashboardLayout.tsx` - Layout principal
- `src/components/layout/Sidebar.tsx` - Navigation latérale
- `src/components/layout/Header.tsx` - En-tête de l'application
- `src/components/auth/LoginPage.tsx` - Page de connexion
- `src/components/auth/ProtectedRoute.tsx` - Protection des routes

### Configuration
- `src/App.tsx` - Point d'entrée principal
- `src/stores/authStore.ts` - Store d'authentification
- `src/integrations/supabase/client.ts` - Client Supabase

### Hooks utilitaires
- `src/hooks/useSupabaseAuth.ts` - Authentification Supabase
- `src/hooks/usePermissions.ts` - Gestion des permissions
- `src/hooks/use-toast.ts` - Notifications toast

---

## Technologies utilisées

- **Frontend :** React 18, TypeScript, Tailwind CSS
- **UI Components :** Shadcn/UI, Lucide React icons
- **Backend :** Supabase (PostgreSQL, Auth, Storage)
- **State Management :** Zustand, TanStack Query
- **Routing :** React Router DOM
- **Build :** Vite

Cette architecture modulaire permet une maintenance facile et une évolutivité optimale de l'application AppSeniors Admin.

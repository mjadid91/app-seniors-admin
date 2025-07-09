# Script Vidéo - AppSeniors Admin

## Introduction

Bienvenue dans cette vidéo de démonstration de l’application **AppSeniors Admin**.  
Je vais vous présenter les principales fonctionnalités que j’ai développées ces dernieres semaines et jours, en expliquant à chaque fois l’utilité de chaque page, son fonctionnement, et les fichiers clés du code React qui permettent d’obtenir ce résultat.

---

## 0. Page de Connexion

Pour commencer, la page de connexion permet aux administrateurs, modérateurs, agents support et visualisateur d’accéder à la plateforme de façon sécurisée.  
L’authentification s’appuie sur Supabase, avec une gestion des rôles pour rediriger chaque utilisateur vers le bon espace après connexion.  
En cas d’erreur, un message s’affiche pour guider l’utilisateur.

Les fichiers principaux pour cette partie sont :
- `src/components/auth/LoginPage.tsx` pour l’interface de connexion,
- `src/hooks/useSupabaseAuth.ts` pour la logique d’authentification,
- `src/components/auth/ProtectedRoute.tsx` qui protège les routes privées,
- et `src/stores/authStore.ts` qui gère l’état de l’utilisateur connecté.

---

## 1. Tableau de bord (Dashboard)

Le tableau de bord affiche un résumé des dernières activités importantes sur la plateforme, comme l’ajout d’un utilisateur, d’un signalement ou d’un groupe.  
On y retrouve des cartes de statistiques globales et des graphiques de tendances pour suivre l’évolution de l’activité.

Le code s’appuie sur :
- `src/components/dashboard/Dashboard.tsx` pour la structure principale,
- `src/components/dashboard/RecentActivity.tsx` et `useRecentActivities.ts` pour l’affichage des activités récentes,
- `src/components/dashboard/StatsCard.tsx` pour les statistiques,
- et `src/components/dashboard/ActivityChart.tsx` pour les graphiques.

Les données proviennent d’une vue SQL dédiée, `v_activitesrecentes`, qui simplifie la récupération des dernières actions.

---

## 2. Gestion des Utilisateurs

La page de gestion des utilisateurs permet d’administrer tous les profils : seniors, aidants, tuteurs, administrateurs, etc.  
On peut rechercher, filtrer, ajouter, modifier ou supprimer un utilisateur, et gérer ses rôles et permissions.  
Des statistiques globales sont aussi disponibles.

Les composants principaux sont :
- `src/components/users/UserManagement.tsx` pour la gestion globale,
- `UserTable.tsx` pour l’affichage du tableau,
- `AddUserModal.tsx` et `EditUserModal.tsx` pour les formulaires d’ajout et de modification,
- ainsi que des composants spécialisés pour la création, la sélection de rôles, la génération de mot de passe, etc.

La logique métier s’appuie sur des hooks comme `useSupabaseUsers.ts` et `useUserManagement.tsx`.  
Lorsqu’on ajoute un utilisateur, un trigger SQL crée automatiquement un profil dans la table `Seniors` ou `Aidant` selon le rôle choisi.

---

## 3. Suivi des Prestations

La page Prestations permet de suivre toutes les prestations réalisées entre seniors et aidants.  
On y trouve des cartes de statistiques (en attente, en cours, terminées, chiffre d’affaires), un tableau détaillé, des filtres par statut, et la possibilité d’ajouter de nouvelles prestations ou domaines.

Le code principal se trouve dans :
- `src/components/prestations/PrestationTracking.tsx` pour la vue globale,
- `PrestationTable.tsx` pour le tableau,
- `PrestationStatsCards.tsx` pour les statistiques,
- et des modals pour les détails ou l’ajout.

Les données sont récupérées via le hook `useSupabasePrestations.ts` et proviennent de plusieurs tables : `Prestation`, `MiseEnRelation`, `Seniors`, `Aidant`, `Evaluation`, etc.

---

## 4. Modération

La page Modération permet de visualiser et traiter les contenus signalés dans les forums publics et les groupes de discussion.  
Deux onglets séparent les forums et les groupes.  
On peut consulter le nombre de signalements, le statut, et agir via des modals dédiés (masquer, approuver, etc.).

Les fichiers clés sont :
- `src/components/moderation/Moderation.tsx` pour la structure,
- `ForumPostsTable.tsx` et `GroupMessagesTable.tsx` pour les tableaux,
- des modals pour les détails et actions,
- et des hooks pour la récupération et la gestion des signalements.

Les données proviennent des tables `Forum`, `SujetForum`, `Groupe`, `MessageGroupe`, et `SignalementContenu`.

---

## 5. Support Client

La page Support centralise la gestion des tickets envoyés par les utilisateurs.  
On peut consulter les tickets, répondre, assigner à un agent support, et suivre leur résolution.

Le code s’appuie sur :
- `src/components/support/Support.tsx` pour la vue principale,
- des modals pour les détails, la réponse, l’assignation ou la résolution,
- et des hooks pour la récupération et la mutation des tickets.

Les tickets sont stockés dans la table `SupportClient` et liés aux utilisateurs et aux agents via les tables `Utilisateurs` et `PrestationSupport`.

---

## 6. Gestion des Documents

La page Documents permet de gérer une bibliothèque de documents: upload, catégorisation, gestion des statuts, visualisation et téléchargement.  
On y retrouve un tableau, des filtres, des statistiques, et des actions rapides.

Les composants principaux sont:
- `src/components/documents/Documents.tsx` pour la structure,
- `DocumentsTable.tsx` pour l’affichage,
- des modals pour l’ajout, la modification et la visualisation,
- et des hooks pour la gestion des documents.

Les documents sont stockés dans la table `Document`, avec des catégories (`CategorieDocument`) et une liaison avec les utilisateurs.

---

## 7. Gestion des Partenaires

Cette interface permet de gérer les partenaires commerciaux et leurs bons plans.  
On peut filtrer la liste, gérer les services proposés, créer ou modifier des bons plans, et consulter des statistiques.

Les fichiers principaux sont :
- `src/components/partners/Partners.tsx` pour la vue globale,
- `PartnerCard.tsx` pour l’affichage des partenaires,
- et des modals pour l’ajout de partenaires ou de bons plans.

---

## 8. Gestion RGPD

La page RGPD permet de traiter les demandes des utilisateurs concernant leurs données personnelles (accès, rectification, suppression).  
L’interface principale et le traitement des demandes sont gérés par :
- `src/components/rgpd/RGPD.tsx`
- et `ProcessRequestModal.tsx`.

## Architecture générale

L’application repose sur une architecture modulaire :
- Un layout principal (`DashboardLayout.tsx`), une sidebar et un header pour la navigation,
- Un point d’entrée unique (`App.tsx`),
- Un store d’authentification (`authStore.ts`),
- Et un client Supabase pour toutes les requêtes.

Des hooks utilitaires facilitent la gestion de l’authentification, des permissions et des notifications toast.

---

## Technologies utilisées

L’application est développée avec **React 18** et **TypeScript**, stylisée avec **Tailwind CSS** et les composants **Shadcn/UI**.  
Le backend repose sur **Supabase** (PostgreSQL, Auth, Storage).  
La gestion d’état utilise **Zustand** et **TanStack Query**.  
Le routage est assuré par **React Router DOM** et le build par **Vite**.

Cette architecture modulaire garantit une maintenance facile et une grande évolutivité pour AppSeniors Admin.

# Script Vidéo - AppSeniors Admin

## Introduction

Bienvenue dans cette vidéo de démonstration de l'application **AppSeniors Admin**.  
Je vais vous présenter les principales fonctionnalités que j'ai développées, en expliquant à chaque fois l'utilité de chaque page, son fonctionnement optimisé, et les fichiers clés du code React qui permettent d'obtenir ce résultat performant.

---

## 0. Page de Connexion

Pour commencer, la page de connexion permet aux administrateurs, modérateurs, agents support et visualisateurs d'accéder à la plateforme de façon ultra-sécurisée.  
L'authentification s'appuie sur Supabase avec une gestion avancée des rôles et des sessions persistantes.  
Le système inclut une validation en temps réel, des messages d'erreur détaillés, et une redirection intelligente selon les permissions utilisateur.

Les fichiers principaux pour cette partie sont :
- `src/components/auth/LoginPage.tsx` pour l'interface de connexion optimisée,
- `src/hooks/useSupabaseAuth.ts` pour la logique d'authentification robuste,
- `src/components/auth/ProtectedRoute.tsx` qui protège les routes privées avec contrôle granulaire,
- et `src/stores/authStore.ts` qui gère l'état global de l'utilisateur connecté.

---

## 1. Tableau de bord (Dashboard)

Le tableau de bord affiche un résumé complet des dernières activités importantes sur la plateforme, comme l'ajout d'utilisateurs, de signalements ou de groupes, avec mise à jour en temps réel.  
On y retrouve des cartes de statistiques dynamiques et des graphiques de tendances interactifs pour suivre l'évolution de l'activité avec précision.

Le code s'appuie sur :
- `src/components/dashboard/Dashboard.tsx` pour la structure principale optimisée,
- `src/components/dashboard/RecentActivity.tsx` et `useRecentActivities.ts` pour l'affichage des activités en temps réel,
- `src/components/dashboard/StatsCard.tsx` pour les statistiques dynamiques,
- et `src/components/dashboard/ActivityChart.tsx` pour les graphiques interactifs.

Les données proviennent d'une vue SQL dédiée, `v_activitesrecentes`, qui optimise les performances et simplifie la récupération des dernières actions.

---

## 2. Gestion des Utilisateurs

La page de gestion des utilisateurs permet d'administrer efficacement tous les profils : seniors, aidants, tuteurs, administrateurs, avec recherche avancée et filtrage intelligent.  
On peut rechercher, filtrer, ajouter, modifier ou supprimer un utilisateur, gérer ses rôles et permissions de façon granulaire.  
Des statistiques globales en temps réel sont également disponibles avec export possible.

Les composants principaux sont :
- `src/components/users/UserManagement.tsx` pour la gestion globale optimisée,
- `UserTable.tsx` pour l'affichage du tableau avec pagination et tri,
- `AddUserModal.tsx` et `EditUserModal.tsx` pour les formulaires validés,
- ainsi que des composants spécialisés pour la création, la sélection de rôles, la génération sécurisée de mots de passe.

La logique métier s'appuie sur des hooks optimisés comme `useSupabaseUsers.ts` et `useUserManagement.tsx`.  
Lorsqu'on ajoute un utilisateur, un trigger SQL crée automatiquement un profil dans la table `Seniors` ou `Aidant` selon le rôle choisi, garantissant la cohérence des données.

---

## 3. Suivi des Prestations

La page Prestations permet de suivre en détail toutes les prestations réalisées entre seniors et aidants avec tableaux de bord avancés.  
On y trouve des cartes de statistiques (en attente, en cours, terminées, chiffre d'affaires), un tableau détaillé avec filtres intelligents, et la possibilité d'ajouter de nouvelles prestations ou domaines.

Le code principal se trouve dans :
- `src/components/prestations/PrestationTracking.tsx` pour la vue globale optimisée,
- `PrestationTable.tsx` pour le tableau avec tri et pagination,
- `PrestationStatsCards.tsx` pour les statistiques en temps réel,
- et des modals pour les détails complets ou l'ajout rapide.

Les données sont récupérées via le hook optimisé `useSupabasePrestations.ts` et proviennent de plusieurs tables : `Prestation`, `MiseEnRelation`, `Seniors`, `Aidant`, `Evaluation`, avec jointures optimisées.

---

## 4. Modération

La page Modération permet de visualiser et traiter efficacement les contenus signalés dans les forums publics et les groupes de discussion.  
Deux onglets séparent clairement les forums et les groupes avec filtrage avancé.  
On peut consulter le nombre de signalements, le statut, et agir rapidement via des modals dédiés (masquer, approuver, sanctionner).

Les fichiers clés sont :
- `src/components/moderation/Moderation.tsx` pour la structure optimisée,
- `ForumPostsTable.tsx` et `GroupMessagesTable.tsx` pour les tableaux interactifs,
- des modals pour les détails et actions rapides,
- et des hooks pour la récupération et la gestion optimisée des signalements.

Les données proviennent des tables `Forum`, `SujetForum`, `Groupe`, `MessageGroupe`, et `SignalementContenu` avec requêtes optimisées.

---

## 5. Support Client

La page Support centralise efficacement la gestion des tickets envoyés par les utilisateurs avec système de priorités.  
On peut consulter les tickets, répondre rapidement, assigner à un agent support, et suivre leur résolution avec SLA.

Le code s'appuie sur :
- `src/components/support/Support.tsx` pour la vue principale optimisée,
- des modals pour les détails, la réponse rapide, l'assignation intelligente ou la résolution,
- et des hooks pour la récupération et la mutation optimisée des tickets.

Les tickets sont stockés dans la table `SupportClient` et liés aux utilisateurs et aux agents via les tables `Utilisateurs` et `PrestationSupport` avec intégrité référentielle.

---

## 6. Gestion des Documents

La page Documents permet de gérer une bibliothèque complète de documents: upload optimisé, catégorisation automatique, gestion des statuts, visualisation et téléchargement sécurisé.  
On y retrouve un tableau interactif, des filtres avancés, des statistiques, et des actions rapides.

**Amélioration récente importante** : Le système d'upload de documents patrimoniaux a été corrigé pour gérer les URLs longues générées par Supabase Storage, résolvant les erreurs de limite de caractères.

Les composants principaux sont:
- `src/components/documents/Documents.tsx` pour la structure optimisée,
- `DocumentsTable.tsx` pour l'affichage avec tri et recherche,
- des modals pour l'ajout, la modification et la visualisation sécurisée,
- et des hooks pour la gestion optimisée des documents avec stockage Supabase.

Les documents sont stockés dans la table `Document`, avec des catégories (`CategorieDocument`) et une liaison sécurisée avec les utilisateurs. Le champ `URLDocument` a été optimisé pour accepter des URLs de toute longueur.

---

## 7. Gestion des Partenaires

Cette interface permet de gérer efficacement les partenaires commerciaux et leurs bons plans avec suivi des performances.  
On peut filtrer la liste, gérer les services proposés, créer ou modifier des bons plans, et consulter des statistiques détaillées.

Les fichiers principaux sont :
- `src/components/partners/Partners.tsx` pour la vue globale optimisée,
- `PartnerCard.tsx` pour l'affichage des partenaires avec actions rapides,
- et des modals pour l'ajout de partenaires ou de bons plans avec validation.

---

## 8. Gestion RGPD

La page RGPD permet de traiter conformément les demandes des utilisateurs concernant leurs données personnelles (accès, rectification, suppression) avec respect des délais légaux.  
L'interface principale et le traitement des demandes sont gérés par :
- `src/components/rgpd/RGPD.tsx` pour la gestion complète,
- et `ProcessRequestModal.tsx` pour le traitement sécurisé.

## Architecture générale optimisée

L'application repose sur une architecture modulaire et performante :
- Un layout principal (`DashboardLayout.tsx`), une sidebar responsive et un header pour la navigation fluide,
- Un point d'entrée unique (`App.tsx`) avec routage optimisé,
- Un store d'authentification (`authStore.ts`) avec persistance,
- Et un client Supabase configuré pour toutes les requêtes avec cache intelligent.

Des hooks utilitaires facilitent la gestion de l'authentification, des permissions et des notifications toast en temps réel.

---

## Technologies utilisées

L'application est développée avec **React 18** et **TypeScript** pour la robustesse, stylisée avec **Tailwind CSS** et les composants **Shadcn/UI** pour la cohérence.  
Le backend repose sur **Supabase** (PostgreSQL, Auth, Storage) avec sécurité RLS.  
La gestion d'état utilise **Zustand** et **TanStack Query** pour les performances.  
Le routage est assuré par **React Router DOM** et le build optimisé par **Vite**.

Cette architecture modulaire et performante garantit une maintenance facile, une grande évolutivité et une expérience utilisateur optimale pour AppSeniors Admin.

---

## Améliorations récentes

- **Upload de documents** : Correction du bug de limitation de caractères pour les URLs Supabase
- **Performance** : Optimisation des requêtes et du cache
- **UX** : Amélioration des feedbacks utilisateur et des transitions
- **Sécurité** : Renforcement de la validation et de la protection des données

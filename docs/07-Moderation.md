
# 🎭 Documentation – Page Modération

## 🧭 Objectif

La page **Modération** (`Moderation.tsx`) centralise les outils de surveillance et de gestion des contenus sur la plateforme AppSeniors.

---

## 📊 Composants principaux

### 📈 Statistiques (`ModerationStats.tsx`)
- **Hook** : `useModerationStats.ts`
- **Métriques** : Signalements, posts forum, messages groupes
- **Cartes** : Affichage visuel des KPI de modération
- **Tendances** : Évolution des contenus à modérer

### 🚨 Signalements (`SignalementsTable.tsx`)
- **Liste** : Tous les signalements utilisateurs
- **Statuts** : Nouveau, En cours, Résolu, Rejeté
- **Actions** : Traiter, Valider, Rejeter
- **Filtrage** : Par statut et date

---

## 📝 Gestion des contenus

### 💬 Posts de forum (`ForumPostsTable.tsx`)
- **Hook** : `useForumPosts.ts`
- **Affichage** : Liste des publications forum
- **Modération** : Validation, suppression, masquage
- **Modal** : `ViewForumPostModal.tsx` pour consultation détaillée

### 👥 Messages de groupes (`GroupMessagesTable.tsx`)
- **Hook** : `useGroupMessages.ts`
- **Surveillance** : Messages dans les groupes communautaires
- **Actions** : Modération des conversations
- **Modal** : `ViewGroupMessageModal.tsx` pour détails

---

## ⚙️ Actions de modération

### 🔧 Modal d'actions (`ModerationActionsModal.tsx`)
- **Hook** : `useModerationActions.ts`
- **Actions disponibles** :
  - Valider le contenu
  - Masquer temporairement
  - Supprimer définitivement
  - Avertir l'utilisateur
  - Suspendre le compte

### ➕ Ajouts rapides
- **Forum** : `AddForumModal.tsx` et `AddForumSubjectModal.tsx`
- **Groupes** : `AddGroupMembersModal.tsx` et `AddGroupMessageModal.tsx`
- **Signalements** : `AddSignalementModal.tsx`

---

## 🔧 Hooks et utilitaires

### 📡 Hooks de données
- **`useModerationStats.ts`** : Statistiques globales
- **`useForumPosts.ts`** : Gestion des posts forum
- **`useGroupMessages.ts`** : Messages de groupes
- **`useModerationActions.ts`** : Actions de modération
- **`useSignalements.ts`** : Gestion des signalements

### 🛠️ Utilitaires
- **`utils.ts`** : Fonctions utilitaires
- **`types.ts`** : Définitions TypeScript
- **`mockData.ts`** : Données de test pour développement

---

## 🗄️ Base de données

### 📊 Tables utilisées
- **`Forum`** et **`ReponseForum`** : Contenus forum
- **`Groupe`** et **`MessageGroupe`** : Messages groupes
- **`Signalement`** : Signalements utilisateurs (table supposée)
- **`Utilisateurs`** : Informations modérateurs

---

## 🎨 Interface

### 📱 Layout principal
- **Tabs** : Navigation entre types de contenus
- **Tables** : Listes avec actions de modération
- **Modals** : Actions détaillées et consultations
- **Stats** : Cartes de métriques en en-tête

### 🔄 Fonctionnalités
- **Tri et filtrage** : Par statut, date, auteur
- **Actions groupées** : Traitement multiple
- **Statuts visuels** : Badges colorés
- **Notifications** : Feedback des actions

---

## 🎯 Résumé

La page Modération permet :
- Surveillance des contenus forum et groupes
- Gestion des signalements utilisateurs
- Actions de modération graduées
- Statistiques de l'activité de modération
- Interface centralisée pour tous les contenus
- Outils d'ajout rapide pour tests et gestion

# Gestion des Utilisateurs

## Description générale
Module complet de gestion des utilisateurs de la plateforme AppSeniors, permettant la création, modification, suppression et visualisation des profils utilisateurs avec leurs rôles et permissions.

## Fonctionnalités principales

### 1. Liste des utilisateurs
- **Table complète** avec pagination
- **Colonnes affichées** :
  - Photo de profil
  - Nom et prénom
  - Email
  - Rôle(s)
  - Statut (actif/inactif)
  - Date d'inscription
  - Dernière connexion
- **Tri** par chaque colonne
- **Recherche** par nom, email ou ID

### 2. Filtres avancés
- **Filtre par rôle** : Senior, Aidant, Modérateur, Support, Admin
- **Filtre par statut** : Actif, Inactif, Suspendu
- **Filtre par date** : Date d'inscription, dernière connexion
- **Filtre par localisation** : Ville, département, région

### 3. Gestion des rôles
- **Système de rôles multiples** :
  - Senior : Bénéficiaire des services
  - Aidant : Prestataire de services
  - Tuteur : Accompagnant de senior
  - Modérateur : Modération du contenu
  - Support : Support technique
  - Administrateur : Accès complet
- **Attribution/retrait de rôles** en temps réel
- **Validation des permissions** selon les rôles

### 4. Création d'utilisateur
- **Formulaire complet** de création
- **Champs obligatoires** :
  - Nom, prénom, email
  - Mot de passe temporaire
  - Rôle initial
- **Champs optionnels** :
  - Téléphone, adresse
  - Photo de profil
  - Préférences de langue
- **Génération automatique** de mot de passe sécurisé
- **Envoi d'email** de bienvenue avec identifiants

### 5. Modification d'utilisateur
- **Édition de toutes les informations** personnelles
- **Gestion des mots de passe** :
  - Réinitialisation
  - Génération de nouveau mot de passe
  - Historique des mots de passe
- **Modification des rôles** et permissions
- **Gestion du statut** (activation/désactivation)

### 6. Actions en lot
- **Sélection multiple** d'utilisateurs
- **Actions groupées** :
  - Suppression en masse
  - Modification de statut
  - Assignation de rôles
  - Export de données

### 7. Statistiques utilisateurs
- **Répartition par rôles** (graphique circulaire)
- **Évolution des inscriptions** (graphique temporel)
- **Taux d'activité** par période
- **Métriques de connexion** et engagement

## Composants techniques

### Structure des fichiers
```
src/components/users/
├── UserManagement.tsx (composant principal)
├── UserTable.tsx (tableau des utilisateurs)
├── AddUserModal.tsx (création d'utilisateur)
├── EditUserModal.tsx (modification d'utilisateur)
├── DeleteUserConfirm.tsx (confirmation suppression)
├── UserStats.tsx (statistiques)
├── UserSearch.tsx (recherche et filtres)
├── RoleManager.tsx (gestion des rôles)
├── RoleSelector.tsx (sélecteur de rôles)
├── UserBasicInfoFields.tsx (champs info de base)
├── EmailField.tsx (champ email avec validation)
├── PasswordGenerator.tsx (générateur de mot de passe)
├── PasswordConfirmation.tsx (confirmation mdp)
├── PreferencesFields.tsx (préférences utilisateur)
├── UserFormActions.tsx (actions de formulaire)
├── UserManagementActions.tsx (actions de gestion)
├── UserManagementModals.tsx (modales de gestion)
├── AidantsTable.tsx (table spécifique aidants)
├── SeniorsTable.tsx (table spécifique seniors)
└── UserCreationForm.tsx (formulaire de création)
```

### Hooks personnalisés
```
src/hooks/
├── useSupabaseUsers.ts (CRUD utilisateurs)
├── useUserManagement.tsx (logique de gestion)
├── useEmailValidation.ts (validation email)
├── usePasswordUtils.ts (utilitaires mot de passe)
├── usePermissions.ts (gestion permissions)
├── useUserCategories.ts (catégories utilisateurs)
├── useUserFormData.ts (données de formulaire)
├── useUserProfile.ts (profil utilisateur)
├── useUsersSelect.ts (sélection utilisateurs)
└── operations/
    ├── useUserCrud.ts (opérations CRUD)
    └── useUserFetch.ts (récupération données)
```

### Types et utilitaires
```
src/components/users/
├── userTypes.ts (types TypeScript)
├── userMockData.ts (données de test)
├── userFilterUtils.ts (utilitaires de filtrage)
└── userStatsUtils.ts (calculs statistiques)
```

## Intégrations base de données

### Tables principales
- `Utilisateurs` : Informations de base des utilisateurs
- `CatUtilisateurs` : Catégories et rôles des utilisateurs
- `Seniors` : Données spécifiques aux seniors
- `Aidant` : Données spécifiques aux aidants
- `HistoriqueConnexion` : Historique des connexions

### Relations importantes
- `Utilisateurs.IDCatUtilisateurs → CatUtilisateurs.IDCatUtilisateurs`
- `Seniors.IDUtilisateurSenior → Utilisateurs.IDUtilisateurs`
- `Aidant.IDUtilisateurs → Utilisateurs.IDUtilisateurs`

### Sécurité et permissions
- **Row Level Security (RLS)** activé
- **Politiques d'accès** par rôle
- **Chiffrement des mots de passe**
- **Validation des emails** unique
- **Audit trail** des modifications

## Fonctionnalités avancées

### 1. Import/Export
- **Import CSV** d'utilisateurs en masse
- **Export Excel** avec filtres appliqués
- **Modèles de fichiers** pour l'import
- **Validation des données** importées

### 2. Notifications
- **Emails automatiques** :
  - Bienvenue à l'inscription
  - Réinitialisation de mot de passe
  - Modification de rôle
  - Suspension de compte
- **Notifications in-app** pour les changements

### 3. Tableau de bord utilisateur
- **Vue détaillée** de chaque utilisateur
- **Historique d'activités**
- **Prestations associées**
- **Évaluations et commentaires**
- **Documents uploadés**

### 4. Intégration avec d'autres modules
- **Prestations** : Aidants et leurs services
- **Support** : Tickets liés aux utilisateurs
- **RGPD** : Demandes de données personnelles
- **Finances** : Transactions et paiements
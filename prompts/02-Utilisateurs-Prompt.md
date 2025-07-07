
# 👥 Prompt Lovable - Gestion des Utilisateurs

## 🎯 Objectif
Créer la page de gestion des utilisateurs administratifs avec CRUD complet et système de permissions.

## 📋 Instructions

### 1. Structure principale
Page `/users` avec :
- En-tête avec titre et bouton "Ajouter un utilisateur"
- Cartes de statistiques par rôle
- Barre de recherche temps réel
- Tableau des utilisateurs avec actions

### 2. Types d'utilisateurs (administratifs uniquement)
```typescript
type UserRole = 'administrateur' | 'moderateur' | 'support' | 'visualisateur';

interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: UserRole;
  statut: 'Actif' | 'Inactif';
  dateInscription: Date;
  photoProfil?: string;
}
```

### 3. Composants à créer

#### UserStats.tsx
- 4 cartes : Total, Actifs, Inactifs, Admins
- Calculs automatiques depuis la liste
- Icônes Lucide React appropriées

#### UserSearch.tsx
- Input avec icône de recherche
- Filtrage temps réel par nom/email
- Debounce de 300ms

#### UserTable.tsx
- Colonnes : Photo, Nom, Email, Rôle, Statut, Actions
- Tri par colonnes
- Badges colorés pour rôles et statuts
- Menu actions : Modifier, Supprimer, Changer rôle

#### UserManagementActions.tsx
- Bouton "Ajouter utilisateur"
- Actions groupées (si sélection multiple)
- Export CSV (optionnel)

### 4. Modals de gestion

#### AddUserModal.tsx
Formulaire avec :
- Nom, Prénom (requis)
- Email (validation + unicité)
- Rôle (sélecteur)
- Génération automatique du mot de passe
- Validation Zod

#### EditUserModal.tsx
- Modification des informations
- Changement de rôle
- Activation/désactivation
- Préservation des données existantes

#### DeleteUserConfirm.tsx
- Confirmation sécurisée
- Affichage des informations utilisateur
- Avertissement sur l'irréversibilité

### 5. Hooks personnalisés

#### useSupabaseUsers.ts
```typescript
interface UserHookReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  addUser: (userData: CreateUserData, password: string) => Promise<void>;
  updateUser: (id: string, data: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  fetchUsers: () => Promise<void>;
}
```

#### useUserCategories.ts
- Gestion des catégories d'utilisateurs
- Mapping ID vers rôles
- Correspondance avec base de données

### 6. Système de permissions
```typescript
// Permissions par rôle
const ROLE_PERMISSIONS = {
  administrateur: ['VIEW_USERS', 'MANAGE_USERS', 'DELETE_USERS'],
  moderateur: ['VIEW_MODERATION'],
  support: ['VIEW_SUPPORT', 'MANAGE_SUPPORT'],
  visualisateur: ['VIEW_*'] // Lecture seule
};
```

### 7. Intégration Supabase
- Table `Utilisateurs` avec `CatUtilisateurs`
- Triggers automatiques pour rôles spécialisés
- RLS selon les permissions
- Gestion des sessions auth

### 8. Fonctionnalités avancées
- Recherche et filtrage temps réel
- Tri multi-colonnes
- Pagination si > 100 utilisateurs
- Actions en lot
- Historique des modifications

### 9. Validation et sécurité
- Validation côté client (Zod)
- Vérification des permissions
- Confirmation pour actions destructives
- Logs des actions administratives

### 10. UI/UX
- Interface moderne avec Shadcn/UI
- États de chargement appropriés
- Messages de succès/erreur via Sonner
- Responsive design
- Skeletons pendant loading

### 11. Optimisations
- Virtualization pour grandes listes
- Debounce sur recherche
- Cache des requêtes
- Optimistic updates

**Important** : Cette page ne gère QUE les utilisateurs administratifs, pas les seniors ni les aidants de la plateforme.

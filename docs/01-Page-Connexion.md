
# 🔐 Documentation – Page de Connexion

## 🧭 Objectif

La page de **Connexion** (`LoginPage.tsx`) constitue le point d'entrée de l'application AppSeniors Admin avec authentification Supabase complète et gestion des mots de passe.

---

## 🎯 Fonctionnalités implémentées

### 🔑 Authentification Supabase complète
- **Formulaire de connexion** : Email et mot de passe avec validation
- **Gestion des erreurs** : Affichage des messages d'erreur détaillés de Supabase
- **Redirection automatique** : Vers le dashboard après connexion réussie
- **États de chargement** : Indicateurs visuels pendant l'authentification
- **Mot de passe oublié** : Lien vers la page de réinitialisation (`/forgot-password`)
- **Réinitialisation de mot de passe** : Page dédiée pour définir un nouveau mot de passe

### 🔐 Pages d'authentification
1. **Page de connexion** (`/connexion`) - Authentification principale
2. **Page mot de passe oublié** (`/forgot-password`) - Demande de réinitialisation par email
3. **Page de réinitialisation** (`/reset-password`) - Définition du nouveau mot de passe

### 🛡️ Sécurité et sessions
- **Protection des routes** : Via `ProtectedRoute.tsx` avec gestion des permissions
- **Sessions Supabase** : Gestion automatique des sessions et tokens JWT
- **State management** : Via Zustand (`authStore.ts`) et hook personnalisé `useSupabaseAuth.ts`
- **Persistance des sessions** : Maintien de la connexion entre les visites
- **Conversion des utilisateurs** : Mapping des utilisateurs Supabase vers le type `User` de l'application

### 🎨 Interface utilisateur

#### 📱 Design moderne
- **Composants Shadcn/UI** : Card, Input, Button, Label avec design cohérent
- **Design responsive** : Adaptation mobile/desktop optimisée
- **Feedback visuel** : États de chargement, erreurs et succès avec animations
- **Thème cohérent** : Palette de couleurs AppSeniors (bleus et gris)
- **Gradient de fond** : Arrière-plan dégradé avec motif de grille

#### 🔧 Structure technique
- **Hook personnalisé** : `useSupabaseAuth.ts` pour toute la logique d'authentification
- **Store Zustand** : Gestion centralisée de l'état d'authentification avec persistance
- **Client Supabase** : Intégration complète via `@/integrations/supabase/client`
- **Types TypeScript** : Typage strict pour la sécurité et maintenabilité
- **Routage protégé** : Redirection automatique basée sur l'état d'authentification

---

## 🔄 Flux d'authentification

### Connexion
1. **Page Index** (`/`) vérifie l'état d'authentification
2. **Redirection automatique** vers `/connexion` si non authentifié
3. **Formulaire de connexion** avec validation côté client
4. **Authentification Supabase** avec gestion d'erreurs
5. **Synchronisation** de l'état global via Zustand
6. **Redirection** vers le dashboard après succès

### Réinitialisation de mot de passe
1. **Lien "Mot de passe oublié"** sur la page de connexion
2. **Saisie de l'email** sur `/forgot-password`
3. **Email de réinitialisation** envoyé par Supabase
4. **Clic sur le lien** redirige vers `/reset-password`
5. **Définition du nouveau mot de passe** avec confirmation
6. **Redirection automatique** vers la page de connexion

---

## 🎯 Améliorations récentes

- **Gestion complète des mots de passe** : Pages dédiées pour l'oubli et la réinitialisation
- **Sécurité renforcée** : Validation des mots de passe et tokens Supabase
- **UX optimisée** : Messages de confirmation et transitions fluides
- **États de chargement** : Feedback visuel pendant toutes les opérations
- **Gestion d'erreurs** : Messages d'erreur contextuels et clairs

---

## 🏗️ Architecture technique

### Composants principaux
- **LoginPage.tsx** : Interface de connexion principale
- **ForgotPasswordPage.tsx** : Demande de réinitialisation de mot de passe
- **ResetPasswordPage.tsx** : Définition du nouveau mot de passe
- **ProtectedRoute.tsx** : Protection des routes avec contrôle d'accès
- **useSupabaseAuth.ts** : Hook personnalisé pour l'authentification
- **authStore.ts** : Store Zustand pour l'état global

### Intégration Supabase
- **Authentification** : `supabase.auth.signInWithPassword()`
- **Réinitialisation** : `supabase.auth.resetPasswordForEmail()`
- **Mise à jour** : `supabase.auth.updateUser()`
- **Sessions** : Gestion automatique des tokens et refresh
- **Sécurité** : Row Level Security (RLS) pour la protection des données

---

## 🎯 Résumé

La page de connexion offre désormais :
- **Authentification complète** via Supabase avec toutes les fonctionnalités de gestion de mot de passe
- **Interface moderne** et responsive avec composants Shadcn/UI
- **Sécurité robuste** avec sessions JWT et protection des routes
- **Gestion d'état avancée** avec Zustand et persistance des données
- **Expérience utilisateur optimale** avec feedback visuel et gestion d'erreurs contextuelle
- **Flow complet** de réinitialisation de mot de passe intégré à Supabase

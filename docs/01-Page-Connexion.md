
# 🔐 Documentation – Page de Connexion

## 🧭 Objectif

La page de **Connexion** (`LoginPage.tsx`) constitue le point d'entrée de l'application AppSeniors Admin avec authentification Supabase.

---

## 🎯 Fonctionnalités implémentées

### 🔑 Authentification Supabase
- **Formulaire de connexion** : Email et mot de passe
- **Validation des champs** : Contrôles de saisie
- **Gestion des erreurs** : Affichage des messages d'erreur
- **Redirection automatique** : Vers le dashboard après connexion réussie

### 🛡️ Sécurité
- **Protection des routes** : Via `ProtectedRoute.tsx`
- **Sessions Supabase** : Gestion automatique des sessions
- **State management** : Via Zustand (`authStore.ts`)

---

## 🎨 Interface

### 📱 Design
- **Composants Shadcn/UI** : Card, Input, Button, Label
- **Design responsive** : Adaptation mobile/desktop
- **Feedback visuel** : États de chargement et erreurs

### 🔧 Structure technique
- **Hook personnalisé** : `useSupabaseAuth.ts`
- **Store Zustand** : Gestion de l'état d'authentification
- **Client Supabase** : Intégration via `@/integrations/supabase/client`

---

## 🎯 Résumé

La page de connexion offre :
- Authentification sécurisée via Supabase
- Interface utilisateur moderne avec Shadcn/UI
- Gestion d'état robuste avec Zustand
- Protection des routes administratives

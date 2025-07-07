
# ⚙️ Documentation – Page Paramètres

## 🧭 Objectif

La page **Paramètres** (`Settings.tsx`) permet aux administrateurs de gérer leur profil et les configurations personnelles de l'application.

---

## 👤 Composants principaux

### 🖼️ Image de profil (`ProfileImageSection.tsx`)
- **Upload** : Téléchargement d'avatar
- **Hook** : `useProfileImage.ts` pour la gestion
- **Storage** : Bucket Supabase `avatars`
- **Formats** : Support des images courantes

### 📝 Informations personnelles (`ProfileSection.tsx`)
- **Composants intégrés** :
  - **`ProfileFormFields.tsx`** : Champs du formulaire
  - **`ProfileLoading.tsx`** : États de chargement
  - **`ProfileSaveActions.tsx`** : Actions de sauvegarde

---

## ⚙️ Sections de configuration

### 🔔 Notifications (`NotificationsSection.tsx`)
- **Types** : Email, push, dans l'application
- **Fréquence** : Immédiate, quotidienne, hebdomadaire
- **Catégories** : Par type d'événement
- **Préférences** : Granularité fine des alertes

### 🎨 Préférences (`PreferencesSection.tsx`)
- **Interface** : Thème, langue, devise
- **Localisation** : Région et fuseau horaire
- **Accessibilité** : Options d'ergonomie
- **Affichage** : Densité, format des dates

### 🔒 Sécurité (`SecuritySection.tsx`)
- **Mot de passe** : Changement sécurisé
- **Sessions** : Gestion des connexions actives
- **2FA** : Authentification à deux facteurs (si implémenté)
- **Historique** : Connexions récentes

---

## 🔧 Hooks et utilitaires

### 📡 Hooks de données
- **`useUserProfile.ts`** : Gestion du profil utilisateur
- **`useProfileImage.ts`** : Upload et gestion d'images
- **`useNotifications.ts`** : Préférences de notifications

### 🗄️ Intégration base de données
- **`Utilisateurs`** : Informations personnelles
- **`Parametres`** : Configurations utilisateur
- **`Notifications`** : Préférences de notifications

---

## 💾 Storage et fichiers

### 🖼️ Avatars
- **Bucket** : `avatars` (public)
- **Formats** : JPG, PNG, WebP
- **Taille** : Limitation et redimensionnement
- **CDN** : Accès optimisé via Supabase

---

## 🎨 Interface

### 📱 Layout organisé
- **Navigation** : Sections clairement définies
- **Forms** : Formulaires Shadcn/UI
- **Preview** : Aperçu des changements
- **Actions** : Sauvegarde et annulation

### 🔄 Fonctionnalités
- **Auto-save** : Sauvegarde automatique (optionnelle)
- **Validation** : Contrôles de saisie
- **Reset** : Retour aux valeurs par défaut
- **Export** : Sauvegarde des préférences

---

## 🎯 Résumé

La page Paramètres permet :
- Gestion complète du profil administrateur
- Configuration des préférences d'interface
- Paramétrage des notifications
- Gestion de la sécurité du compte
- Upload et gestion d'avatar
- Interface moderne et intuitive
- Sauvegarde granulaire des préférences

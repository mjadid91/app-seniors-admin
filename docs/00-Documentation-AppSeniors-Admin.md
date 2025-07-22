# 📋 Documentation AppSeniors Admin

## 🎯 Vue d'ensemble

Cette documentation couvre l'application **AppSeniors Admin**, une interface d'administration complète pour la gestion de la plateforme AppSeniors.

## 📑 Table des matières

### Pages documentées
- ✅ [Page de Connexion](./01-Page-Connexion.md)
- ✅ [Dashboard](./02-Dashboard.md)
- ✅ [Gestion des Utilisateurs](./03-Utilisateurs.md)
- ✅ [Prestations](./04-Prestations.md)
- ✅ [Partenaires](./05-Partenaires.md)
- ✅ [Finances](./06-Finances.md)
- ✅ [Modération](./07-Moderation.md)
- ✅ [Support Client](./08-Support.md)
- ✅ [Documents](./09-Documents.md)
- ✅ [RGPD](./10-RGPD.md)
- ✅ [Paramètres](./11-Parametres.md)

## 🏗️ Architecture technique

### Technologies utilisées
- **Frontend** : React 18 + TypeScript
- **Backend** : Supabase (PostgreSQL + API REST)
- **Styling** : Tailwind CSS + Shadcn/UI
- **State Management** : Zustand + React Query
- **Authentification** : Supabase Auth

### Design System
- **Palette de couleurs** : Système de tokens sémantiques
- **Composants** : Bibliothèque Shadcn/UI personnalisée
- **Responsive** : Mobile-first avec breakpoints adaptatifs
- **Icônes** : Lucide React

## 🎯 Module Support (Fonctionnel)

Le module **Support** est entièrement fonctionnel et opérationnel :

### Fonctionnalités opérationnelles
- ✅ **Gestion des tickets** : Création, attribution, suivi
- ✅ **Système de réponses** : Messages et fichiers joints
- ✅ **Attribution** : Assignation automatique et manuelle
- ✅ **Notifications** : Alertes temps réel
- ✅ **Interface** : Design moderne et responsive
- ✅ **Permissions** : Contrôle d'accès par rôles
- ✅ **Base de données** : Tables et relations complètes

### Architecture technique Support
- **Hooks personnalisés** : Gestion des données avec React Query
- **Composants modulaires** : Architecture scalable
- **TypeScript** : Typage strict pour la robustesse
- **Cache intelligent** : Optimisation des performances
- **Design responsive** : Adaptation tous écrans

## 🔧 Structure du projet

L'application suit une architecture modulaire avec :
- Composants réutilisables dans `/components/ui`
- Modules métier dans `/components/[module]`
- Hooks personnalisés dans `/hooks`
- Intégration Supabase centralisée
- Système de routage protégé

# AppSeniors Admin Center

Une application d'administration complète pour la plateforme AppSeniors, permettant la gestion des utilisateurs, du support client, des partenaires, et bien plus encore.

## 🚀 Fonctionnalités

### 📊 Tableau de bord
- Vue d'ensemble des statistiques principales
- Graphiques d'activité en temps réel
- Activités récentes du système

### 👥 Gestion des utilisateurs
- Gestion complète des profils utilisateurs (seniors, aidants, tuteurs)
- Système de rôles et permissions
- Création et modification des comptes utilisateurs

### 🎯 Support client
- Système de tickets de support avec assignation
- Interface de réponse et résolution des tickets
- Suivi des statuts et priorités
- Modalités de résolution avec notes

### 🤝 Gestion des partenaires
- Annuaire des partenaires
- Système de bons plans et promotions
- Évaluation et suivi des partenaires

### 📋 Prestations
- Catalogue des prestations disponibles
- Suivi des demandes et mises en relation
- Gestion des tarifs et disponibilités

### 🛡️ Modération
- Modération des contenus des forums
- Surveillance des messages de groupes
- Outils de signalement et sanctions

### 📄 Gestion documentaire
- Upload et organisation des documents
- Catégorisation automatique
- Système de versions et d'archivage

### 💰 Finances
- Suivi des transactions
- Rapports financiers
- Gestion des paiements

### 🔒 RGPD
- Gestion des demandes RGPD
- Suivi de la conformité
- Outils d'export et suppression des données

## 🛠️ Technologies utilisées

- **Frontend**: React 18 + TypeScript
- **Build tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Database**: Supabase
- **Authentication**: Supabase Auth
- **Icons**: Lucide React
- **Charts**: Recharts
- **Form Handling**: React Hook Form + Zod

## 📦 Installation

### Prérequis
- Node.js 18+ et npm
- Compte Supabase configuré

### Configuration

1. **Cloner le repository**
```bash
git clone https://github.com/mjadid91/app-seniors-admin.git
cd app-seniors-admin
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration Supabase**
   - Créer un projet sur [Supabase](https://supabase.com)
   - Configurer les variables d'environnement dans `.env.local`:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Démarrer le serveur de développement**
```bash
npm run dev
```

L'application sera disponible sur `http://localhost:5173`

## 🔧 Scripts disponibles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Preview de la build
npm run preview

# Linting
npm run lint
```

## 🏗️ Structure du projet

```
src/
├── components/           # Composants React réutilisables
│   ├── auth/            # Composants d'authentification
│   ├── dashboard/       # Composants du tableau de bord
│   ├── support/         # Système de support client
│   ├── users/           # Gestion des utilisateurs
│   ├── partners/        # Gestion des partenaires
│   ├── documents/       # Gestion documentaire
│   ├── finances/        # Module financier
│   ├── moderation/      # Outils de modération
│   ├── rgpd/           # Module RGPD
│   ├── layout/         # Composants de mise en page
│   └── ui/             # Composants UI de base (shadcn/ui)
├── hooks/              # Hooks React personnalisés
├── stores/             # Stores Zustand
├── integrations/       # Intégrations externes (Supabase)
├── lib/               # Utilitaires et helpers
└── pages/             # Pages principales
```

## 🔐 Authentification et autorisations

L'application utilise un système de rôles basé sur Supabase Auth :

- **Administrateur** : Accès complet à toutes les fonctionnalités
- **Modérateur** : Gestion des contenus et modération
- **Support** : Accès au système de tickets et support client
- **Visualisateur** : Accès en lecture seule aux données

## 📋 Fonctionnalités principales

### Système de support
- **Tickets** : Création, assignation et résolution
- **Priorités** : Gestion des niveaux d'urgence
- **Suivi** : Historique complet des interactions
- **Notifications** : Alertes en temps réel

### Gestion des utilisateurs
- **Profils** : Informations complètes des utilisateurs
- **Catégories** : Seniors, aidants, tuteurs, organismes
- **Permissions** : Contrôle granulaire des accès
- **Statistiques** : Métriques d'utilisation

### Interface utilisateur
- **Design responsive** : Optimisé pour tous les écrans
- **Mode sombre/clair** : Thème adaptatif
- **Navigation intuitive** : Menu latéral et fil d'Ariane
- **Composants accessibles** : Respect des standards WCAG

## 🚀 Déploiement

### Déploiement automatique avec Lovable
1. Connecter votre compte GitHub dans l'interface Lovable
2. Cliquer sur "Publish" dans l'éditeur
3. Votre application sera déployée automatiquement

### Déploiement manuel
1. **Build de production**
```bash
npm run build
```

2. **Déployer le dossier `dist/`** sur votre hébergeur préféré :
   - Vercel
   - Netlify
   - Heroku
   - Firebase Hosting

## 🔧 Configuration avancée

### Variables d'environnement
```env
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optionnel : Configuration additionnelle
VITE_APP_ENV=production
```

### Base de données
L'application utilise Supabase avec les tables principales :
- `Utilisateurs` : Gestion des comptes utilisateurs
- `SupportClient` : Système de tickets
- `Partenaire` : Annuaire des partenaires
- `Document` : Gestion documentaire
- `DemandeRGPD` : Conformité RGPD

## 🤝 Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commiter vos changements (`git commit -m 'Ajout d'une nouvelle fonctionnalité'`)
4. Pousser vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📝 License

Ce projet est sous licence privée. Tous droits réservés.

## 📞 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Contacter l'équipe de développement

## 🔄 Changelog

### Version 1.0.0
- Interface d'administration complète
- Système de support client
- Gestion des utilisateurs et partenaires
- Module RGPD
- Système d'authentification

---

**AppSeniors Admin Center** - Plateforme d'administration pour services seniors


# 🏥 AppSeniors Admin

**Panneau d'administration complet pour la plateforme AppSeniors**

Une interface d'administration moderne et sécurisée dédiée à la gestion d'une plateforme modulaire pour seniors, aidants, partenaires et administrateurs.

---

## 🔍 Présentation du projet

AppSeniors Admin est un tableau de bord administratif permettant la gestion complète d'un écosystème digital dédié aux seniors. Cette plateforme facilite la coordination entre les différents acteurs (seniors, aidants, partenaires, administrateurs) et offre une vue d'ensemble sur l'ensemble des services proposés.

### 🎯 Objectifs principaux
- Centraliser la gestion des utilisateurs et leurs profils
- Superviser les prestations et activités rémunérées
- Administrer les services de fin de vie (cagnottes, post-mortem)
- Assurer la conformité RGPD et la gestion documentaire
- Fournir un support client efficace
- Modérer les contenus (forums, groupes)

---

## ⚙️ Technologies utilisées

### Frontend
- **React 18** - Framework JavaScript moderne
- **TypeScript** - Typage statique pour une meilleure maintenabilité
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS** - Framework CSS utilitaire
- **shadcn/ui** - Composants UI modernes et accessibles
- **React Router Dom** - Navigation côté client
- **TanStack Query** - Gestion d'état et cache pour les requêtes
- **React Hook Form + Zod** - Gestion et validation des formulaires
- **Recharts** - Graphiques et visualisations
- **Lucide React** - Icônes SVG

### Backend & Infrastructure
- **Supabase** - Backend-as-a-Service complet
- **PostgreSQL** - Base de données relationnelle
- **Supabase Auth** - Authentification et autorisation
- **Row Level Security (RLS)** - Sécurité au niveau des lignes
- **Edge Functions** - Fonctions serverless
- **Supabase Storage** - Stockage de fichiers

### Outils de développement
- **ESLint** - Linter JavaScript/TypeScript
- **Prettier** - Formatage du code
- **Git** - Contrôle de version

---

## 🏗️ Structure du projet

```
src/
├── components/           # Composants React réutilisables
│   ├── auth/            # Authentification et protection de routes
│   ├── dashboard/       # Tableau de bord principal
│   ├── documents/       # Gestion documentaire
│   ├── finances/        # Gestion financière et commissions
│   ├── layout/          # Composants de mise en page
│   ├── moderation/      # Outils de modération
│   ├── partners/        # Gestion des partenaires
│   ├── prestations/     # Services et prestations
│   ├── rgpd/           # Conformité RGPD
│   ├── seniors/        # Gestion des seniors
│   ├── settings/       # Paramètres utilisateur
│   ├── support/        # Support client
│   ├── ui/             # Composants UI de base (shadcn/ui)
│   └── users/          # Gestion des utilisateurs
├── hooks/              # Hooks React personnalisés
├── integrations/       # Intégrations externes (Supabase)
├── lib/               # Utilitaires et helpers
├── pages/             # Pages de l'application
├── stores/            # Gestion d'état global (Zustand)
├── types/             # Types TypeScript
└── main.tsx           # Point d'entrée de l'application
```

---

## 🚀 Instructions d'installation

### Prérequis
- **Node.js** (version 18 ou supérieure)
- **npm** ou **yarn**
- **Compte Supabase** actif

### 1. Cloner le projet
```bash
git clone https://github.com/votre-org/appseniors-admin.git
cd appseniors-admin
```

### 2. Installer les dépendances
```bash
npm install
# ou
yarn install
```

### 3. Configuration de l'environnement
Créez un fichier `.env.local` à la racine du projet :

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Application
VITE_APP_URL=http://localhost:5173
```

### 4. Configuration Supabase
1. Créez un nouveau projet sur [Supabase](https://supabase.com)
2. Exécutez les migrations SQL depuis le dossier `supabase/migrations/`
3. Configurez les politiques RLS selon vos besoins
4. Activez l'authentification par email

### 5. Lancer l'application
```bash
npm run dev
# ou
yarn dev
```

L'application sera accessible sur `http://localhost:5173`

---

## 🔐 Sécurité et accès

### Système de rôles
- **Administrateur** : Accès complet à toutes les fonctionnalités
- **Support** : Gestion des tickets et assistance utilisateurs
- **Modérateur** : Modération des contenus et signalements
- **Visualisateur** : Consultation en lecture seule

### Sécurité implémentée
- ✅ **Row Level Security (RLS)** activé sur toutes les tables sensibles
- ✅ **Authentification JWT** via Supabase Auth
- ✅ **Validation côté client et serveur** avec Zod
- ✅ **Protection des routes** selon les rôles utilisateur
- ✅ **Chiffrement des données sensibles** en base
- ✅ **Audit trail** pour les actions critiques

### Configuration des permissions
```sql
-- Exemple de politique RLS pour les utilisateurs
CREATE POLICY "Admins can view all users" ON "Utilisateurs"
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'administrateur'
  )
);
```

---

## 📂 Organisation des dossiers

### `/components`
Composants React organisés par domaine fonctionnel. Chaque dossier contient ses propres hooks, types et utilitaires.

### `/hooks`
Hooks personnalisés pour la logique métier, les appels API et la gestion d'état.

### `/integrations`
Configuration et types pour les services externes (Supabase).

### `/pages`
Composants de pages correspondant aux routes principales de l'application.

### `/stores`
Stores Zustand pour la gestion d'état global (authentification, préférences).

---

## 📊 Fonctionnalités principales

### 👥 Gestion des utilisateurs
- Création et modification des profils (Seniors, Aidants, Partenaires)
- Système de rôles et permissions
- Historique des connexions et activités
- Gestion des préférences et paramètres

### 🛠️ Prestations et services
- Catalogue des prestations disponibles
- Suivi des activités rémunérées
- Gestion des domaines de compétences
- Statistiques et rapports d'activité

### 💰 Gestion financière
- Cagnottes de décès et dons
- Commissions automatiques
- Services post-mortem
- Suivi des transactions et facturations

### 📄 Documents et RGPD
- Stockage sécurisé des documents
- Gestion des consentements RGPD
- Documents patrimoniaux
- Conformité réglementaire

### 🎫 Support client
- Système de tickets intégré
- Attribution automatique des intervenants
- Suivi des résolutions
- Base de connaissances

### 🛡️ Modération
- Surveillance des forums et groupes
- Gestion des signalements
- Outils de modération en temps réel
- Historique des actions

### 🤝 Partenariats
- Gestion des partenaires commerciaux
- Bons plans et réductions
- Services partenaires
- Statistiques d'utilisation

---

## 🧪 Tests & vérifications à faire avant mise en production

### Checklist de sécurité
- [ ] Vérifier les politiques RLS sur toutes les tables
- [ ] Tester l'isolation des données par rôle
- [ ] Valider l'authentification multi-facteurs
- [ ] Contrôler les autorisations d'upload de fichiers
- [ ] Audit des logs de sécurité

### Performance
- [ ] Optimisation des requêtes SQL
- [ ] Mise en cache des données statiques
- [ ] Compression des images et assets
- [ ] Test de charge sur les endpoints critiques
- [ ] Monitoring des performances client

### Fonctionnel
- [ ] Tests de régression sur les flux critiques
- [ ] Validation des formulaires complexes
- [ ] Test des notifications en temps réel
- [ ] Vérification des exports de données
- [ ] Test de compatibilité navigateurs

### RGPD et conformité
- [ ] Validation des consentements
- [ ] Test du droit à l'oubli
- [ ] Vérification des exports de données personnelles
- [ ] Audit des accès aux données sensibles

---

## 🧠 Bonnes pratiques appliquées

### Code Quality
- **TypeScript strict** pour éviter les erreurs runtime
- **ESLint + Prettier** pour un code uniforme
- **Composants réutilisables** avec props typées
- **Hooks personnalisés** pour la logique métier
- **Gestion d'erreur centralisée** avec try/catch

### Architecture
- **Séparation des responsabilités** (UI/Logic/Data)
- **Pattern de repository** pour les appels API
- **State management** approprié (local vs global)
- **Lazy loading** des composants lourds
- **Memoization** pour les calculs coûteux

### Sécurité
- **Validation des inputs** côté client et serveur
- **Sanitisation des données** utilisateur
- **Principes de moindre privilège** pour les accès
- **Chiffrement des données sensibles**
- **Audit trail** pour les actions critiques

### UX/UI
- **Design system cohérent** avec shadcn/ui
- **Responsive design** mobile-first
- **Accessibilité** (ARIA, navigation clavier)
- **Loading states** et feedback utilisateur
- **Messages d'erreur explicites**

---

## 🙋 FAQ ou problèmes connus

### ❓ "Requested path is invalid" lors de la connexion
**Solution :** Vérifiez la configuration des URL de redirection dans Supabase :
- Site URL : URL de votre application
- Redirect URLs : URLs autorisées pour les redirections

### ❓ Les images ne s'affichent pas depuis Supabase Storage
**Solution :** Vérifiez que :
- Le bucket est configuré comme public
- Les politiques RLS du storage sont correctes
- L'URL générée est valide

### ❓ Erreur 403 sur certaines actions
**Solution :** Contrôlez les politiques RLS et les rôles utilisateur :
```sql
-- Vérifier les rôles d'un utilisateur
SELECT * FROM user_roles WHERE user_id = 'uuid-utilisateur';
```

### ❓ Performance lente sur les grandes listes
**Solution :** Implémentez la pagination et l'infinite scroll :
- Utilisez `LIMIT` et `OFFSET` dans les requêtes
- Activez la virtualisation pour les longues listes
- Mettez en cache les données fréquemment consultées

### ❓ Problèmes de synchronisation temps réel
**Solution :** Vérifiez la configuration Supabase Realtime :
- Activez les publications sur les tables concernées
- Contrôlez les politiques RLS pour les subscriptions

---

## 👨‍💻 Auteurs & contributeurs

### Équipe principale
- **Lead Developer** - Développement et architecture
- **UI/UX Designer** - Interface utilisateur et expérience
- **DevOps Engineer** - Infrastructure et déploiement
- **Product Owner** - Spécifications et tests

### Comment contribuer
1. Fork le projet
2. Créez une branche pour votre feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Committez vos changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créez une Pull Request

### Standards de contribution
- Respecter les conventions de nommage TypeScript
- Ajouter des tests pour les nouvelles fonctionnalités
- Documenter les fonctions complexes
- Suivre les guidelines ESLint configurées

---

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

## 🔗 Liens utiles

- [Documentation Supabase](https://supabase.com/docs)
- [Guide shadcn/ui](https://ui.shadcn.com)
- [React Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**AppSeniors Admin** - Interface d'administration moderne pour l'écosystème digital des seniors 🏥

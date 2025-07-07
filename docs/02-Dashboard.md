
# 📊 Documentation – Dashboard

## 🧭 Objectif

Le **Dashboard** (`Dashboard.tsx`) est la page d'accueil qui affiche les statistiques et activités récentes de la plateforme AppSeniors.

---

## 📈 Composants implémentés

### 📊 Cartes de statistiques (`StatsCard.tsx`)
- **Composant réutilisable** : Affichage des métriques clés
- **Props** : `title`, `value`, `icon`, `trend`
- **Design** : Cards Shadcn/UI avec icônes Lucide

### 📈 Graphique d'activité (`ActivityChart.tsx`)
- **Bibliothèque** : Recharts pour les visualisations
- **Types de graphiques** : Courbes, barres, aires
- **Données** : Métriques d'activité temporelles

### 📋 Activités récentes (`RecentActivity.tsx`)
- **Liste d'activités** : Dernières actions sur la plateforme
- **Formatage** : Dates, utilisateurs, actions
- **Interface** : Liste scrollable avec détails

---

## 🔧 Hooks personnalisés

### 📊 `useDashboardStats.ts`
- **Fonction** : Récupération des statistiques
- **React Query** : Cache et synchronisation des données
- **Types** : Interface TypeScript pour les stats

### 📝 `useRecentActivities.ts`
- **Fonction** : Récupération des activités récentes
- **Données** : Historique des actions utilisateurs
- **Pagination** : Gestion des listes longues

---

## 🎨 Interface

### 📱 Layout responsive
- **Grid Tailwind** : Organisation des composants
- **Cards** : Conteneurs pour chaque section
- **Icônes** : Lucide React pour la visualisation

### 🔄 Temps réel
- **React Query** : Actualisation automatique
- **Cache intelligent** : Optimisation des performances
- **Loading states** : Indicateurs de chargement

---

## 🎯 Résumé

Le Dashboard comprend :
- Cartes de statistiques avec métriques clés
- Graphiques interactifs via Recharts
- Liste des activités récentes
- Hooks personnalisés pour la gestion des données
- Interface responsive et moderne

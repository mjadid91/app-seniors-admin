# Dashboard - Page d'accueil de l'administration

## Description générale
Le Dashboard est la page d'accueil de l'interface d'administration AppSeniors. Il fournit une vue d'ensemble des indicateurs clés de performance (KPI) et des statistiques en temps réel.

## Fonctionnalités principales

### 1. Statistiques générales
- **Cartes de statistiques** : Affichage de 4 cartes principales
  - Nombre total d'utilisateurs
  - Nombre de prestations actives
  - Revenus du mois
  - Nombre de tickets de support ouverts
- **Graphiques de tendances** : Évolution des métriques sur les 12 derniers mois
- **Indicateurs de performance** : Taux de croissance et comparaisons période précédente

### 2. Graphique d'activité
- **Graphique en aires** montrant l'évolution de l'activité
- **Filtres temporels** : 7 jours, 30 jours, 3 mois, 12 mois
- **Données affichées** :
  - Nouvelles inscriptions
  - Prestations réalisées
  - Revenus générés

### 3. Activités récentes
- **Liste des dernières actions** sur la plateforme
- **Types d'activités** :
  - Nouveaux utilisateurs inscrits
  - Prestations créées/terminées
  - Tickets de support ouverts
  - Commandes passées
- **Horodatage** et détails de chaque activité

### 4. Alerts et notifications
- **Zone d'alertes** pour les actions urgentes
- **Notifications système** importantes
- **Indicateurs visuels** pour attirer l'attention

## Composants techniques

### Structure des fichiers
```
src/components/dashboard/
├── Dashboard.tsx (composant principal)
├── StatsCard.tsx (cartes de statistiques)
├── ActivityChart.tsx (graphique d'activité)
├── RecentActivity.tsx (activités récentes)
├── useDashboardStats.ts (hook pour les stats)
└── useRecentActivities.ts (hook pour les activités)
```

### Hooks personnalisés
- `useDashboardStats()` : Récupération des statistiques générales
- `useRecentActivities()` : Gestion des activités récentes
- Intégration avec React Query pour le cache et la synchronisation

### Design system
- Utilisation des tokens de couleur du thème
- Composants UI cohérents (Card, Button, etc.)
- Responsive design pour mobile et desktop
- Animations subtiles pour améliorer l'UX

## Intégrations base de données

### Tables utilisées
- `Utilisateurs` : Comptage des utilisateurs
- `MiseEnRelation` : Statistiques des prestations
- `ActiviteRemuneree_Utilisateurs` : Revenus
- `TicketClient` : Support
- `Notifications` : Activités récentes

### Requêtes optimisées
- Agrégations pour les statistiques
- Jointures pour enrichir les données
- Pagination pour les activités récentes
- Cache intelligent avec React Query

## Performance
- Chargement asynchrone des données
- Skeleton loaders pendant le chargement
- Mise en cache des requêtes fréquentes
- Optimisation des re-rendus avec useMemo/useCallback
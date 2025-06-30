
# Page Dashboard

## Vue d'ensemble

Le tableau de bord principal fournit une vue d'ensemble de l'activité de l'application AppSeniors.

## Sections

### 1. Statistiques principales (StatsCard)

**Objectif :** Afficher les métriques clés de l'application

**Fonctionnalités :**
- Nombre total d'utilisateurs
- Utilisateurs actifs
- Prestations en cours
- Revenus du mois

**Tables utilisées :**
- `Utilisateurs` - Comptage des utilisateurs
- `MiseEnRelation` - Prestations actives
- `Commande` - Calcul des revenus

### 2. Graphique d'activité (ActivityChart)

**Objectif :** Visualiser l'évolution de l'activité dans le temps

**Fonctionnalités :**
- Graphique linéaire des inscriptions
- Évolution des prestations
- Tendances mensuelles

**Technologies :**
- Recharts pour la visualisation
- Données agrégées par mois

### 3. Activité récente (RecentActivity)

**Objectif :** Afficher les dernières actions importantes

**Fonctionnalités :**
- Nouvelles inscriptions
- Prestations récentes
- Transactions financières
- Signalements

**Tables utilisées :**
- `Utilisateurs` - Nouvelles inscriptions
- `MiseEnRelation` - Prestations récentes
- Système de notifications

## Démo explicative

### Cas d'usage principal
1. L'administrateur accède au dashboard
2. Visualise immédiatement les KPIs principaux
3. Analyse les tendances via le graphique
4. Surveille l'activité récente

### Scénarios d'utilisation
- **Monitoring quotidien :** Vérification rapide de l'état de l'application
- **Analyse de performance :** Suivi des métriques clés
- **Détection d'anomalies :** Identification rapide de problèmes

## Code principal

Fichiers concernés :
- `src/components/dashboard/Dashboard.tsx`
- `src/components/dashboard/StatsCard.tsx`
- `src/components/dashboard/ActivityChart.tsx`
- `src/components/dashboard/RecentActivity.tsx`

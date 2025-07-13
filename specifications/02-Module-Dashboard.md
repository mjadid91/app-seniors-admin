
# 📊 Spécifications - Module Dashboard

## 🎯 Objectif
Fournir une vue d'ensemble des métriques clés et de l'activité de la plateforme.

## 📋 Fonctionnalités principales

### 1. Statistiques générales
- **Nombre total d'utilisateurs** (par catégorie)
- **Prestations actives/terminées**
- **Revenus du mois**
- **Tickets de support en attente**
- **Signalements non traités**

### 2. Graphiques d'activité
- **Évolution mensuelle des inscriptions**
- **Répartition des prestations par domaine**
- **Chiffre d'affaires mensuel**

### 3. Activités récentes
- **Dernières inscriptions**
- **Prestations récentes**
- **Tickets support récents**

## 🔒 Permissions par rôle

| Action | Admin | Modérateur | Support | Visualisateur |
|--------|-------|------------|---------|---------------|
| Voir le dashboard | ✅ | ✅ | ✅ | ✅ |
| Exporter les données | ✅ | ❌ | ❌ | ❌ |

## 📊 Sources de données

### Tables utilisées
- `Utilisateurs` - Statistiques utilisateurs
- `MiseEnRelation` - Prestations actives
- `SupportClient` - Tickets support
- `SignalementContenu` - Signalements
- `VersementCommissions` - Données financières

### Hooks personnalisés
- `useDashboardStats.ts` - Récupération des statistiques
- `useRecentActivities.ts` - Activités récentes

## 🔧 API Routes

### GET /dashboard/stats
**Description** : Récupère les statistiques générales
**Permissions** : Tous les rôles authentifiés
**Réponse** :
```json
{
  "totalUsers": 1250,
  "activeServices": 45,
  "monthlyRevenue": 15420.50,
  "pendingTickets": 12,
  "unresolvedReports": 3
}
```

### GET /dashboard/activities
**Description** : Récupère les activités récentes
**Paramètres** : 
- `limit` (optionnel, défaut: 10)
- `type` (optionnel: "users", "services", "tickets")
**Permissions** : Tous les rôles authentifiés

## 📈 Règles métier

### Calculs de métriques
- **Utilisateurs actifs** : Connectés dans les 30 derniers jours
- **Prestations actives** : Statut "en_cours" ou "en_attente"
- **Revenus mensuels** : Commissions perçues du mois en cours
- **Tickets prioritaires** : Statut "haute" ou "critique"

### Mise à jour des données
- **Temps réel** : Statistiques mises à jour toutes les 5 minutes
- **Cache** : Données cached pendant 2 minutes côté client
- **Actualisation manuelle** : Bouton de refresh disponible

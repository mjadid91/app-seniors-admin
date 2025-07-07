
# 🚀 Prompt Lovable - Dashboard AppSeniors Admin

## 🎯 Objectif
Créer le dashboard principal de l'application AppSeniors Admin avec statistiques, graphiques et activités récentes.

## 📋 Instructions

### 1. Structure de base
Créez une page dashboard responsive avec :
- En-tête avec titre "Dashboard AppSeniors"
- Grid responsive pour les cartes de statistiques
- Section graphiques d'activité
- Section activités récentes

### 2. Composants à créer

#### StatsCard.tsx
```typescript
interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}
```
- Carte avec fond blanc, ombre légère
- Icône colorée à gauche
- Titre et valeur affichés
- Indicateur de tendance optionnel (vert/rouge)

#### ActivityChart.tsx
- Utiliser Recharts (déjà installé)
- Graphique en aires avec données d'activité
- Couleurs : bleu primaire (#3B82F6)
- Responsive avec hauteur 300px

#### RecentActivity.tsx
- Liste des 10 dernières activités
- Format : [Heure] [Type] - [Description]
- Badges colorés pour les types d'activité
- Scroll vertical si nécessaire

### 3. Hooks de données

#### useDashboardStats.ts
```typescript
interface DashboardStats {
  totalUsers: number;
  activeServices: number;
  totalRevenue: number;
  supportTickets: number;
}
```
- Utiliser React Query pour les données
- Simuler les données si nécessaire
- Gestion des états loading/error

#### useRecentActivities.ts
```typescript
interface Activity {
  id: string;
  type: 'user' | 'service' | 'support' | 'finance';
  title: string;
  description: string;
  timestamp: Date;
}
```

### 4. Layout et design
- Utiliser Tailwind CSS
- Composants Shadcn/UI (Card, Badge, etc.)
- Palette de couleurs :
  - Primaire : #3B82F6 (bleu)
  - Secondaire : #64748B (gris)
  - Succès : #10B981 (vert)
  - Danger : #EF4444 (rouge)

### 5. Fonctionnalités
- Actualisation automatique toutes les 30 secondes
- Responsive design (mobile-first)
- États de chargement avec skeletons
- Gestion d'erreurs avec retry

### 6. Intégration
- Utiliser ProtectedRoute pour sécuriser
- Navigation depuis le Sidebar
- Breadcrumbs pour la navigation

### 7. Optimisations
- Lazy loading des composants
- Memoization des calculs
- Optimistic updates pour les interactions
- Cache intelligent des données

### 8. Accessibilité
- ARIA labels appropriés
- Navigation au clavier
- Contrastes suffisants
- Textes alternatifs pour les icônes

Créez une interface moderne, performante et accessible qui correspond aux standards de l'application AppSeniors Admin.

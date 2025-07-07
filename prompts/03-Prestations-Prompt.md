
# 🛠️ Prompt Lovable - Gestion des Prestations

## 🎯 Objectif
Créer la page de gestion des prestations et services avec domaines, tracking et statistiques.

## 📋 Instructions

### 1. Structure de la page
Page `/prestations` avec :
- En-tête avec titre et actions rapides
- Cartes de statistiques prestations
- Filtres et recherche
- Tableau des prestations
- Modals de gestion

### 2. Types de données
```typescript
interface Prestation {
  id: string;
  titre: string;
  description: string;
  tarifIndicatif: number;
  dateCreation: Date;
  domaine: Domaine;
  statut: 'active' | 'inactive' | 'archive';
}

interface Domaine {
  id: string;
  titre: string;
  description?: string;
}
```

### 3. Composants principaux

#### PrestationStatsCards.tsx
- Total prestations
- Prestations actives
- Domaines disponibles
- Revenus moyens par prestation
- Icônes Lucide appropriées

#### PrestationFilters.tsx
- Filtre par domaine (Select)
- Filtre par statut (Badges)
- Recherche par titre/description
- Période de création (DatePicker)

#### PrestationTable.tsx
Colonnes :
- Titre (avec description tronquée)
- Domaine (badge coloré)
- Tarif indicatif (formaté en €)
- Date création
- Statut (badge)
- Actions (menu dropdown)

#### PrestationTracking.tsx
- Graphique des prestations par mois
- Répartition par domaine (donut chart)
- Tendances et évolutions
- Utiliser Recharts

### 4. Modals de gestion

#### AddPrestationModal.tsx
Formulaire avec :
- Titre (requis, max 100 caractères)
- Description (requis, max 500 caractères)
- Domaine (sélecteur avec création rapide)
- Tarif indicatif (optionnel, en €)
- Validation Zod complète

#### EditPrestationModal.tsx
- Pré-remplissage des données
- Modification de tous les champs
- Historique des modifications
- Confirmation des changements

#### PrestationDetailsModal.tsx
- Vue complète de la prestation
- Statistiques d'utilisation
- Historique des mises en relation
- Évaluations et notes

#### AddDomaineModal.tsx
- Création rapide de domaines
- Titre unique requis
- Description optionnelle
- Validation et duplication

### 5. Hooks personnalisés

#### useSupabasePrestations.ts
```typescript
interface PrestationHookReturn {
  prestations: Prestation[];
  domaines: Domaine[];
  loading: boolean;
  error: string | null;
  addPrestation: (data: CreatePrestationData) => Promise<void>;
  updatePrestation: (id: string, data: Partial<Prestation>) => Promise<void>;
  deletePrestation: (id: string) => Promise<void>;
  addDomaine: (data: CreateDomaineData) => Promise<void>;
}
```

### 6. Intégration base de données
Tables utilisées :
- `Prestation` : services disponibles
- `Domaine` : catégories de prestations
- `MiseEnRelation` : utilisation des prestations

Relations :
- Prestation.IDDomaine → Domaine.IDDomaine
- MiseEnRelation.IDPrestation → Prestation.IDPrestation

### 7. Fonctionnalités avancées

#### Recherche et filtrage
- Recherche full-text dans titre/description
- Filtrage par domaine multiple
- Tri par date, tarif, popularité
- Filtres persistants en session

#### Statistiques et analytics
- Prestations les plus demandées
- Revenus par prestation
- Évolution temporelle
- Taux de satisfaction

#### Gestion des domaines
- CRUD complet sur domaines
- Réorganisation des prestations
- Fusion de domaines
- Statistiques par domaine

### 8. Interface utilisateur

#### Design
- Cards modernes avec ombres subtiles
- Couleurs par domaine cohérentes
- Badges et statuts visuels
- Responsive design complet

#### Interactions
- Survol avec preview
- Drag & drop pour réorganiser
- Actions rapides (clavier)
- Feedback immédiat

### 9. Validation et erreurs
- Validation Zod côté client
- Vérification unicité titres
- Gestion des erreurs réseau
- Messages d'erreur contextuels

### 10. Performance
- Pagination intelligente
- Lazy loading des données
- Cache avec React Query
- Optimistic updates

### 11. Sécurité et permissions
- Contrôle d'accès par rôle
- Validation des modifications
- Audit trail des changements
- Protection CSRF

### 12. Exportation
- Export CSV/Excel
- Rapports personnalisés
- Graphiques exportables
- Données filtrées

Créez une interface professionnelle pour la gestion complète des prestations avec une UX optimisée et des performances excellentes.

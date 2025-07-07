
# 🤝 Prompt Lovable - Gestion des Partenaires

## 🎯 Objectif
Créer la page de gestion des partenaires et de leurs offres promotionnelles (bons plans).

## 📋 Instructions

### 1. Structure de la page
Page `/partners` avec système d'onglets :
- Onglet "Partenaires" : gestion des organisations
- Onglet "Bons Plans" : gestion des offres promotionnelles
- Statistiques en en-tête
- Filtres et recherche par onglet

### 2. Types de données
```typescript
interface Partner {
  id: string;
  raisonSociale: string;
  email: string;
  telephone: string;
  adresse: string;
  dateInscription: Date;
  statut: 'actif' | 'inactif' | 'suspendu';
  secteur: string;
}

interface BonPlan {
  id: string;
  titre: string;
  description: string;
  partenaire: Partner;
  typeReduction: 'pourcentage' | 'montant' | 'gratuit';
  valeurReduction: number;
  codePromo: string;
  dateDebut: Date;
  dateFin: Date;
  statut: 'actif' | 'expire' | 'a_venir';
}
```

### 3. Composants principaux

#### PartnerStats.tsx
- Nombre total de partenaires
- Partenaires actifs
- Bons plans actifs
- Revenus générés par partenariats
- Graphique d'évolution mensuelle

#### PartnerFilters.tsx
- Recherche par nom/secteur
- Filtre par statut
- Filtre par secteur d'activité
- Filtre par date d'inscription

#### PartnersListSection.tsx
- Grid de cartes partenaires
- Informations essentielles visibles
- Actions rapides par carte
- Pagination avec infinite scroll

#### PartnerCard.tsx
- Design moderne avec logo/avatar
- Nom, secteur, statut
- Nombre de bons plans actifs
- Actions : Voir, Éditer, Gérer offres

### 4. Gestion des partenaires

#### AddPartnerModal.tsx
Formulaire avec :
- Raison sociale (requis)
- Email (validation + format)
- Téléphone (format français)
- Adresse complète
- Secteur d'activité (sélecteur)
- Validation Zod complète

#### PartnerDetailsModal.tsx
- Informations complètes
- Historique des bons plans
- Statistiques d'utilisation
- Graphique des performances
- Actions de gestion

#### EditPartnerModal.tsx
- Modification des informations
- Changement de statut
- Historique des modifications
- Confirmation des changements

### 5. Gestion des bons plans

#### BonPlansSection.tsx
- Liste des offres avec filtres
- Tri par date d'expiration
- Badges de statut colorés
- Actions rapides

#### BonPlanCard.tsx
- Titre et description
- Partenaire associé
- Type et valeur de réduction
- Dates de validité
- Code promo (copiable)

#### AddBonPlanModal.tsx
Formulaire avec :
- Titre et description
- Sélection du partenaire
- Type de réduction (radio buttons)
- Valeur de réduction
- Dates de validité (DatePicker)
- Code promo (auto-généré ou manuel)

#### ViewBonPlanModal.tsx
- Détails complets de l'offre
- Statistiques d'utilisation
- Historique des utilisations
- Graphique de performance

#### EditBonPlanModal.tsx
- Modification des détails
- Extension de validité
- Changement de statut
- Duplication d'offre

#### DeleteBonPlanModal.tsx
- Confirmation avec impact
- Affichage des utilisations en cours
- Option d'archivage vs suppression

### 6. Hooks personnalisés

#### usePartners.ts
```typescript
interface PartnerHookReturn {
  partners: Partner[];
  bonPlans: BonPlan[];
  loading: boolean;
  error: string | null;
  addPartner: (data: CreatePartnerData) => Promise<void>;
  updatePartner: (id: string, data: Partial<Partner>) => Promise<void>;
  deletePartner: (id: string) => Promise<void>;
  addBonPlan: (data: CreateBonPlanData) => Promise<void>;
  updateBonPlan: (id: string, data: Partial<BonPlan>) => Promise<void>;
  deleteBonPlan: (id: string) => Promise<void>;
}
```

#### usePartnerServices.ts
- Gestion des services partenaires
- Liaison avec prestations
- Calcul des commissions

### 7. Intégration base de données
Tables utilisées :
- `Partenaire` : organisations partenaires
- `BonPlan` : offres promotionnelles
- `BonPlan_Utilisateurs` : utilisation des offres
- `Partenaire_Services` : services proposés

### 8. Fonctionnalités avancées

#### Système de codes promo
- Génération automatique unique
- Validation et expiration
- Utilisation limitée/illimitée
- Tracking d'utilisation

#### Analytics et reporting
- Dashboard des performances
- ROI par partenaire
- Tendances d'utilisation
- Rapports personnalisés

#### Notifications
- Alertes d'expiration
- Seuils d'utilisation
- Nouveaux partenaires
- Performance en baisse

### 9. Interface utilisateur

#### Design
- Tabs Shadcn/UI pour navigation
- Cards avec hover effects
- Badges colorés par statut
- Interface responsive

#### Interactions
- Recherche temps réel
- Filtrage instantané
- Actions contextuelles
- Feedback visuel

### 10. Validation et sécurité
- Validation Zod stricte
- Vérification unicité emails
- Sanitization des données
- Contrôle d'accès par rôle

### 11. Performance
- Lazy loading des images
- Pagination intelligente
- Cache des requêtes
- Optimistic updates

### 12. Fonctionnalités bonus
- Import/export CSV
- Templates de bons plans
- Système de notifications
- Intégration email marketing

Créez une interface complète pour gérer l'écosystème des partenaires avec leurs offres promotionnelles, optimisée pour la performance et l'expérience utilisateur.

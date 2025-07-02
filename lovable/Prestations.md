# Gestion des Prestations

## Description générale
Module de gestion complète des prestations proposées sur la plateforme AppSeniors, incluant la création, modification, suivi et facturation des services entre aidants et seniors.

## Fonctionnalités principales

### 1. Catalogue des prestations
- **Liste complète** des prestations disponibles
- **Catégorisation** par domaines :
  - Aide à domicile
  - Accompagnement médical
  - Services de proximité
  - Loisirs et sorties
  - Aide administrative
- **Recherche** par mot-clé, catégorie, prix
- **Filtres avancés** par disponibilité, localisation, tarif

### 2. Gestion des domaines
- **Création/modification** des domaines de prestations
- **Hiérarchie** des catégories et sous-catégories
- **Codes métiers** associés
- **Tarifs indicatifs** par domaine

### 3. Mise en relation aidant/senior
- **Matching automatique** selon les critères
- **Propositions personnalisées** aux seniors
- **Candidatures** des aidants aux besoins
- **Validation** des mises en relation
- **Suivi** du statut des prestations

### 4. Calendrier et planification
- **Vue calendrier** des prestations planifiées
- **Créneaux de disponibilité** des aidants
- **Récurrence** des prestations régulières
- **Gestion des annulations** et reports
- **Rappels automatiques**

### 5. Tracking et suivi
- **États des prestations** :
  - En attente
  - Confirmée
  - En cours
  - Terminée
  - Annulée
- **Historique détaillé** de chaque prestation
- **Temps passé** et facturation
- **Rapports d'activité** périodiques

### 6. Évaluations et feedback
- **Système de notation** (1-5 étoiles)
- **Commentaires** détaillés
- **Évaluations croisées** aidant/senior
- **Modération** des avis
- **Statistiques** de satisfaction

## Composants techniques

### Structure des fichiers
```
src/components/prestations/
├── PrestationTable.tsx (tableau principal)
├── PrestationStatsCards.tsx (cartes statistiques)
├── PrestationFilters.tsx (filtres avancés)
├── PrestationTracking.tsx (suivi des prestations)
├── PrestationDetailsModal.tsx (détails d'une prestation)
├── AddPrestationModal.tsx (création de prestation)
├── EditPrestationModal.tsx (modification)
├── AddDomaineModal.tsx (gestion des domaines)
└── usePartnerPrestations.ts (hook principal)
```

### Hooks personnalisés
- `useSupabasePrestations()` : CRUD des prestations
- `usePartnerPrestations()` : Gestion des prestations partenaires
- `usePrestationTracking()` : Suivi en temps réel
- `usePrestationStats()` : Calculs statistiques

## Base de données

### Tables principales
- `Prestation` : Catalogue des prestations
- `MiseEnRelation` : Relations aidant/senior
- `BesoinSenior` : Besoins exprimés par les seniors
- `PrestationAidant` : Propositions des aidants
- `Domaine` : Domaines de prestations
- `Competences` : Compétences des aidants

### Vues calculées
- `prestations_dashboard_view` : Vue consolidée pour le dashboard
- Agrégations pour les statistiques
- Jointures optimisées pour les performances

## Workflow type

### 1. Expression du besoin
1. **Senior** exprime un besoin via l'interface
2. **Validation** du besoin par modération
3. **Notification** aux aidants correspondants
4. **Matching automatique** selon critères

### 2. Proposition et sélection
1. **Aidants qualifiés** proposent leurs services
2. **Senior** consulte les propositions
3. **Sélection** de l'aidant préféré
4. **Confirmation** de la mise en relation

### 3. Planification
1. **Définition** des créneaux de disponibilité
2. **Planification** des interventions
3. **Validation** par les deux parties
4. **Rappels** automatiques avant intervention

### 4. Réalisation
1. **Début** de l'intervention (check-in)
2. **Suivi** en temps réel si nécessaire
3. **Fin** de l'intervention (check-out)
4. **Validation** de la prestation réalisée

### 5. Évaluation et paiement
1. **Évaluation mutuelle** aidant/senior
2. **Validation** de la facture
3. **Traitement** du paiement
4. **Clôture** de la prestation

## Fonctionnalités avancées

### 1. Intelligence artificielle
- **Algorithme de matching** aidant/senior
- **Recommandations** personnalisées
- **Optimisation** des plannings
- **Prédiction** des besoins futurs

### 2. Géolocalisation
- **Calcul de distance** aidant/senior
- **Optimisation** des déplacements
- **Frais de déplacement** automatiques
- **Zones d'intervention** définies

### 3. Intégrations externes
- **Calendriers** (Google, Outlook)
- **Paiements** sécurisés
- **Notifications** SMS/Email
- **APIs** de géolocalisation

### 4. Reporting et analytics
- **Tableaux de bord** personnalisés
- **KPIs** de performance
- **Analyse** des tendances
- **Exports** de données détaillées
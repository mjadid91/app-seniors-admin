
# Page Partenaires

## Vue d'ensemble

La page partenaires gère l'écosystème des partenaires commerciaux et leurs offres promotionnelles.

## Sections

### 1. Liste des partenaires (PartnersListSection)

**Objectif :** Gestion complète des partenaires

**Fonctionnalités :**
- Affichage des partenaires avec filtres
- Ajout de nouveaux partenaires
- Gestion des services partenaires
- Contact direct avec les partenaires

**Composants :**
- `PartnerCard` - Carte individuelle partenaire
- `PartnerFilters` - Filtres de recherche
- `AddPartnerModal` - Création partenaire
- `AddServiceModal` - Ajout de services

**Tables utilisées :**
- `Partenaire` - Informations partenaires
- `ServicePartenaire` - Services disponibles
- `Partenaire_Services` - Association partenaire-services

### 2. Bons plans partenaires (BonPlansSection)

**Objectif :** Gestion des offres promotionnelles

**Fonctionnalités :**
- Création et édition de bons plans
- Gestion des codes promo
- Suivi des statuts (Actif, En attente, Expiré)
- Calcul automatique des échéances

**Composants :**
- `BonPlanCard` - Affichage individuel
- `AddBonPlanModal` - Création bon plan
- `EditBonPlanModal` - Modification
- `ViewBonPlanModal` - Consultation détaillée
- `DeleteBonPlanModal` - Suppression sécurisée

**Tables utilisées :**
- `BonPlan` - Offres promotionnelles
- `BonPlan_Utilisateurs` - Utilisation par les utilisateurs

### 3. Statistiques partenaires (PartnerStats)

**Objectif :** Métriques et analytics des partenariats

**Fonctionnalités :**
- Nombre de partenaires actifs
- Taux d'utilisation des bons plans
- Revenus générés par partenariat
- Performance par catégorie

## Démo explicative

### Processus d'ajout d'un partenaire
1. Clic sur "Nouveau partenaire"
2. Saisie des informations de base (nom, email, téléphone)
3. Sélection des services proposés
4. Configuration des tarifs et conditions
5. Validation et activation

### Gestion des bons plans
1. Sélection du partenaire
2. Définition de l'offre (titre, description)
3. Configuration de la réduction (%, montant, gratuit)
4. Définition des dates de validité
5. Génération du code promo
6. Publication et suivi

### Cycle de vie d'un bon plan
- **En attente** : Créé mais pas encore actif
- **Actif** : Utilisable par les clients
- **Expiré** : Date de fin dépassée (calcul automatique)

## Tables utilisées dans la BD

### Tables principales
- **Partenaire** : Informations de base des partenaires
  - IDPartenaire, RaisonSociale, Email, Telephone, Adresse
  - DateInscription, TypePartenaire

- **BonPlan** : Offres promotionnelles
  - IDBonPlan, TitreBonPlan, DescriptionBonPlan
  - TypeReduction, PourcentageReduction
  - DateDebutReduction, DateFinReduction
  - CodePromo, StatutBonPlan, IDPartenaire

### Tables de services
- **ServicePartenaire** : Services disponibles
  - IDServicePartenaire, NomService

- **Partenaire_Services** : Association partenaire-services
  - IDPartenaire, IDServicePartenaire

### Tables d'utilisation
- **BonPlan_Utilisateurs** : Suivi d'utilisation
  - IDBonPlan, IDUtilisateurs, DateUtilisation
  - StatutUtilisation, IDCommande

## Fonctionnalités avancées

### Gestion automatique des statuts
Le système met automatiquement à jour les statuts des bons plans :
- Vérification quotidienne des dates d'expiration
- Passage automatique en statut "Expiré"
- Notifications aux partenaires

### Système de codes promo
- Génération automatique de codes uniques
- Validation côté client
- Suivi des utilisations
- Statistiques d'usage

## Permissions et sécurité

### Accès partenaires
- Interface dédiée pour les partenaires
- Gestion de leurs propres bons plans
- Statistiques d'utilisation
- Communication avec les clients

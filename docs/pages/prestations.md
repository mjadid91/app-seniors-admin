
# Page Prestations

## Vue d'ensemble

La page prestations gère l'ensemble des services proposés aux seniors et leur organisation par domaines.

## Sections

### 1. Statistiques des prestations (PrestationStatsCards)

**Objectif :** Vue d'ensemble de l'activité des prestations

**Fonctionnalités :**
- Nombre total de prestations disponibles
- Prestations actives/inactives
- Prestations les plus demandées
- Revenus générés par domaine

**Tables utilisées :**
- `Prestation` - Catalogue des prestations
- `MiseEnRelation` - Prestations réalisées
- `Domaine` - Catégorisation

### 2. Table des prestations (PrestationTable)

**Objectif :** Gestion complète du catalogue

**Fonctionnalités :**
- Affichage paginé avec filtres
- Tri par domaine, tarif, popularité
- Actions CRUD complètes
- Gestion des tarifs indicatifs

**Filtres disponibles :**
- Par domaine d'activité
- Par tranche de tarif
- Par statut (actif/inactif)
- Par date de création

### 3. Suivi des prestations (PrestationTracking)

**Objectif :** Monitoring des prestations en cours

**Fonctionnalités :**
- État des prestations actives
- Planification et calendrier
- Suivi des paiements
- Évaluations clients

**Tables utilisées :**
- `MiseEnRelation` - Relations client-aidant
- `Commande` - Gestion des paiements
- `Evaluation` - Retours clients

### 4. Modales de gestion

#### AddPrestationModal
- Création de nouvelles prestations
- Association aux domaines
- Définition des tarifs
- Description détaillée

#### EditPrestationModal
- Modification des prestations existantes
- Mise à jour des tarifs
- Changement de domaine

#### AddDomaineModal
- Création de nouveaux domaines
- Organisation du catalogue

## Démo explicative

### Processus de création d'une prestation
1. Clic sur "Nouvelle prestation"
2. Sélection du domaine d'activité
3. Saisie du titre et description
4. Définition du tarif indicatif
5. Configuration des paramètres
6. Validation et publication

### Gestion des domaines
1. Organisation par catégories logiques
2. Regroupement des prestations similaires
3. Facilitation de la recherche
4. Statistiques par domaine

### Suivi d'une prestation
1. Demande client (BesoinSenior)
2. Propositions d'aidants (PrestationAidant)
3. Sélection et mise en relation
4. Réalisation de la prestation
5. Paiement et évaluation

## Tables utilisées dans la BD

### Tables principales
- **Prestation** : Catalogue des services
  - IDPrestation, Titre, Description
  - TarifIndicatif, DateCreation, IDDomaine

- **Domaine** : Catégorisation des prestations
  - IDDomaine, DomaineTitre

### Tables de demande
- **BesoinSenior** : Demandes des seniors
  - IDBesoinSenior, Titre, Description
  - TypeBesoin, DatePublication, Statut, IDSeniors

- **PrestationAidant** : Propositions des aidants
  - IDPrestationAidant, IDAidant, IDBesoinSenior
  - DateProposition, commentaires, StatutProposition

### Tables de réalisation
- **MiseEnRelation** : Relations actives
  - IDMiseEnRelation, IDAidant, IDSeniors, IDPrestation
  - DatePrestation, DurePrestation, TarifPreste, Statut

- **Evaluation** : Retours d'expérience
  - IDEvaluation, Note, Commentaire
  - DateEvaluation, IDUtilisateurs, IDMiseEnRelation

### Tables géographiques
- **Prestation_Localisation** : Zones de service
  - IDPrestation, IDLocalisation

- **Localisation** : Données géographiques
  - IDLocalisation, Adresse, Ville, CodePostal
  - Latitude, Longitude

## Workflow complet

### Du besoin à la prestation
1. **Identification du besoin** : Senior exprime un besoin
2. **Catalogage** : Association à une prestation existante
3. **Recherche d'aidants** : Matching par compétences et localisation
4. **Propositions** : Aidants soumettent leurs offres
5. **Sélection** : Senior choisit son aidant
6. **Réalisation** : Prestation effectuée
7. **Paiement** : Transaction sécurisée
8. **Évaluation** : Retour d'expérience mutuel

### Gestion des tarifs
- Tarifs indicatifs par prestation
- Négociation possible entre parties
- Commissions plateforme
- Gestion des promotions partenaires


# Schéma de base de données AppSeniors

## Vue d'ensemble

La base de données AppSeniors utilise PostgreSQL et est organisée autour de plusieurs domaines fonctionnels interconnectés.

## Domaines principaux

### 1. Gestion des utilisateurs
- **Utilisateurs** : Table centrale des comptes
- **CatUtilisateurs** : Catégorisation des types d'utilisateurs
- **Seniors** : Données spécifiques aux seniors
- **Aidant** : Profils professionnels des aidants

### 2. Prestations et services
- **Prestation** : Catalogue des services
- **Domaine** : Organisation par domaines d'activité
- **MiseEnRelation** : Relations entre seniors et aidants
- **BesoinSenior** : Demandes de services

### 3. Partenariats commerciaux
- **Partenaire** : Entreprises partenaires
- **BonPlan** : Offres promotionnelles
- **ServicePartenaire** : Services proposés par les partenaires

### 4. Commerce et transactions
- **Commande** : Transactions financières
- **Produit** : Catalogue de produits
- **Facture** : Documents comptables
- **MoyenPaiement** : Méthodes de paiement

### 5. Communication et contenu
- **Forum** : Espaces de discussion
- **MessageGroupe** : Messages dans les groupes
- **Notifications** : Système de notifications

### 6. Conformité et sécurité
- **DemandeRGPD** : Gestion des droits RGPD
- **ConsentementCookies** : Consentements utilisateurs
- **HistoriqueConnexion** : Suivi des connexions

## Architecture technique

### Clés primaires
- Toutes les tables utilisent des clés primaires auto-incrémentées (BIGINT)
- Convention de nommage : `ID[NomTable]`

### Relations
- Clés étrangères systématiques pour maintenir l'intégrité
- Relations many-to-many via tables de liaison
- Contraintes de référence avec actions ON DELETE/UPDATE

### Indexation
- Index automatiques sur les clés primaires
- Index composites sur les colonnes fréquemment requêtées
- Index partiels pour optimiser les performances

### Sécurité
- Row Level Security (RLS) activé sur les tables sensibles
- Policies de sécurité par rôle utilisateur
- Chiffrement des données sensibles

## Types de données

### Identification
- **BIGINT** : Identifiants uniques
- **UUID** : Identifiants universels (auth Supabase)

### Texte
- **VARCHAR** : Chaînes de caractères limitées
- **TEXT** : Contenu de longueur variable
- **CHARACTER VARYING** : Alias de VARCHAR

### Numérique
- **NUMERIC** : Valeurs décimales précises (tarifs, montants)
- **INTEGER/SMALLINT** : Nombres entiers
- **BOOLEAN** : Valeurs binaires

### Temporel
- **DATE** : Dates sans heure
- **TIMESTAMP** : Date et heure complètes
- **TIME** : Heures uniquement

### Binaire
- **BYTEA** : Données binaires (fichiers)

## Contraintes et validations

### Contraintes de domaine
- NOT NULL sur les champs obligatoires
- Valeurs par défaut appropriées
- Check constraints pour les énumérations

### Contraintes référentielles
- Foreign keys vers les tables parentes
- Actions CASCADE/RESTRICT selon les besoins
- Validation de l'intégrité référentielle

### Contraintes métier
- Validation des formats (email, téléphone)
- Cohérence des dates (début < fin)
- Limites numériques (tarifs > 0)

## Fonctions et triggers

### Fonctions système
- `insert_into_seniors_or_aidant()` : Création automatique des profils spécialisés
- Fonctions de validation des données
- Utilitaires de calcul et d'agrégation

### Triggers
- Mise à jour automatique des timestamps
- Validation des données avant insertion
- Synchronisation des tables liées
- Audit et traçabilité

## Performance et optimisation

### Stratégies d'indexation
- Index B-tree pour les recherches exactes
- Index GIN pour la recherche textuelle
- Index partiels pour les requêtes filtrées

### Partitioning
- Partitioning par date pour les tables d'historique
- Amélioration des performances sur les grandes tables

### Maintenance
- Vacuum automatique
- Analyse statistique régulière
- Réindexation périodique


# Page Utilisateurs

## Vue d'ensemble

La page de gestion des utilisateurs permet l'administration complète des comptes utilisateurs (seniors et aidants).

## Sections

### 1. Statistiques utilisateurs (UserStats)

**Objectif :** Vue d'ensemble des utilisateurs par catégorie

**Fonctionnalités :**
- Nombre total d'utilisateurs
- Répartition seniors/aidants
- Utilisateurs actifs vs inactifs
- Nouvelles inscriptions

**Tables utilisées :**
- `Utilisateurs` - Données utilisateurs principales
- `CatUtilisateurs` - Catégorisation des utilisateurs
- `Seniors` - Données spécifiques aux seniors
- `Aidant` - Données spécifiques aux aidants

### 2. Liste des seniors (SeniorsTable)

**Objectif :** Gestion des comptes seniors

**Fonctionnalités :**
- Affichage liste paginée
- Filtres par statut, niveau d'autonomie
- Actions : voir détails, modifier, désactiver
- Gestion des tuteurs légaux

**Tables utilisées :**
- `Seniors` - Informations principales
- `Utilisateurs` - Données personnelles
- `ContactUrgence` - Contacts d'urgence

### 3. Liste des aidants (AidantsTable)

**Objectif :** Gestion des comptes aidants

**Fonctionnalités :**
- Profils professionnels
- Compétences et tarifs
- Évaluations et avis
- Disponibilités

**Tables utilisées :**
- `Aidant` - Profil professionnel
- `Aidant_Competences` - Compétences
- `Evaluation` - Avis clients
- `MiseEnRelation` - Historique prestations

### 4. Modales de gestion

#### AddUserModal
- Création de nouveaux comptes
- Assignation automatique des rôles
- Validation des données

#### EditUserModal  
- Modification des informations
- Changement de statut
- Gestion des permissions

#### DeleteUserConfirm
- Suppression sécurisée
- Archivage des données
- Respect RGPD

## Démo explicative

### Processus de création d'utilisateur
1. Clic sur "Nouveau utilisateur"
2. Sélection du type (Senior/Aidant)
3. Saisie des informations personnelles
4. Configuration du profil spécifique
5. Validation et création

### Gestion des aidants
1. Consultation de la liste
2. Filtrage par compétences/tarifs
3. Visualisation du profil détaillé
4. Modification des informations
5. Gestion des évaluations

## Tables utilisées dans la BD

### Tables principales
- **Utilisateurs** : Données personnelles communes
- **CatUtilisateurs** : Catégorisation des types d'utilisateurs
- **Seniors** : Informations spécifiques aux seniors
- **Aidant** : Profils professionnels des aidants

### Tables de liaison
- **Aidant_Competences** : Compétences des aidants
- **Langue_Utilisateurs** : Langues parlées
- **Devise_Utilisateurs** : Préférences de devise

### Tables de suivi
- **HistoriqueConnexion** : Historique des connexions
- **Evaluation** : Évaluations des prestations
- **ContactUrgence** : Contacts d'urgence des seniors

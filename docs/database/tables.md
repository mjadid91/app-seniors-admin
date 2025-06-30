
# Tables principales de la base de données

## Tables utilisateurs

### Utilisateurs
Table centrale contenant les informations de base de tous les utilisateurs.

**Colonnes principales :**
- `IDUtilisateurs` : Identifiant unique (BIGINT, PK)
- `Nom, Prenom` : Identité de l'utilisateur
- `Email` : Adresse email unique
- `Telephone` : Numéro de téléphone
- `DateNaissance` : Date de naissance
- `IDCatUtilisateurs` : Référence vers la catégorie

**Usage :** Point central pour l'authentification et les données personnelles.

### CatUtilisateurs
Définit les types d'utilisateurs et leurs permissions.

**Colonnes principales :**
- `IDCatUtilisateurs` : Identifiant unique
- `EstSenior` : Booléen indiquant si c'est un senior
- `EstAidant` : Booléen pour les aidants
- `EstAdministrateur` : Booléen pour les admins
- `EstModerateur` : Booléen pour les modérateurs

**Usage :** Système de rôles et permissions granulaires.

### Seniors
Informations spécifiques aux utilisateurs seniors.

**Colonnes principales :**
- `IDSeniors` : Identifiant unique
- `IDUtilisateurSenior` : Référence vers Utilisateurs
- `NiveauAutonomie` : Niveau d'autonomie (1-5)
- `EstRGPD` : Consentement RGPD
- `IDTuteur` : Référence vers un tuteur légal

**Usage :** Profil et besoins spécifiques des seniors.

### Aidant
Profils professionnels des aidants.

**Colonnes principales :**
- `IDAidant` : Identifiant unique
- `IDUtilisateurs` : Référence vers Utilisateurs
- `Experience` : Description de l'expérience
- `TarifAidant` : Tarif horaire pratiqué

**Usage :** Gestion des profils professionnels et tarification.

## Tables prestations

### Prestation
Catalogue des services disponibles.

**Colonnes principales :**
- `IDPrestation` : Identifiant unique
- `Titre` : Nom de la prestation
- `Description` : Description détaillée
- `TarifIndicatif` : Tarif de référence
- `IDDomaine` : Domaine d'activité

**Usage :** Catalogue centralisé des services proposés.

### Domaine
Organisation des prestations par domaines.

**Colonnes principales :**
- `IDDomaine` : Identifiant unique
- `DomaineTitre` : Nom du domaine

**Exemples :** Aide ménagère, Jardinage, Informatique, Santé.

### MiseEnRelation
Relations actives entre seniors et aidants.

**Colonnes principales :**
- `IDMiseEnRelation` : Identifiant unique
- `IDSeniors` : Référence vers le senior
- `IDAidant` : Référence vers l'aidant
- `IDPrestation` : Service concerné
- `DatePrestation` : Date de réalisation
- `Statut` : État de la prestation
- `TarifPreste` : Tarif appliqué

**Usage :** Suivi des prestations en cours et réalisées.

### BesoinSenior
Demandes de services émises par les seniors.

**Colonnes principales :**
- `IDBesoinSenior` : Identifiant unique
- `IDSeniors` : Senior demandeur
- `Titre` : Résumé du besoin
- `Description` : Description détaillée
- `TypeBesoin` : Catégorie du besoin
- `Statut` : État de la demande

**Usage :** Gestion des demandes de services.

## Tables partenaires

### Partenaire
Entreprises partenaires de la plateforme.

**Colonnes principales :**
- `IDPartenaire` : Identifiant unique
- `RaisonSociale` : Nom de l'entreprise
- `Email` : Contact principal
- `Telephone` : Numéro de contact
- `Adresse` : Adresse physique
- `DateInscription` : Date d'adhésion

**Usage :** Gestion des partenariats commerciaux.

### BonPlan
Offres promotionnelles des partenaires.

**Colonnes principales :**
- `IDBonPlan` : Identifiant unique
- `TitreBonPlan` : Titre de l'offre
- `DescriptionBonPlan` : Description détaillée
- `TypeReduction` : Type (pourcentage, montant, gratuit)
- `PourcentageReduction` : Valeur de la réduction
- `DateDebutReduction` : Date de début
- `DateFinReduction` : Date de fin
- `CodePromo` : Code promotionnel
- `StatutBonPlan` : État de l'offre
- `IDPartenaire` : Partenaire concerné

**Usage :** Gestion des offres promotionnelles.

## Tables commerce

### Commande
Transactions financières de la plateforme.

**Colonnes principales :**
- `IDCommande` : Identifiant unique
- `MontantTotal` : Montant total de la commande
- `StatutCommande` : État de la commande
- `DateCommande` : Date de création
- `TypeCommande` : Type de transaction
- `IDUtilisateurPayeur` : Utilisateur payeur
- `IDMoyenPaiement` : Méthode de paiement

**Usage :** Suivi des transactions financières.

### Produit
Catalogue des produits disponibles.

**Colonnes principales :**
- `IDProduit` : Identifiant unique
- `Titre` : Nom du produit
- `Description` : Description détaillée
- `Prix` : Prix unitaire
- `Stock` : Quantité disponible
- `TypeProduit` : Catégorie du produit
- `estLouable` : Possibilité de location

**Usage :** Gestion du catalogue produits.

## Tables communication

### Forum
Espaces de discussion thématiques.

**Colonnes principales :**
- `IDForum` : Identifiant unique
- `TitreForum` : Nom du forum
- `DescriptionForum` : Description du sujet
- `Categorie` : Catégorie thématique
- `estPublic` : Visibilité publique
- `IDCreateur` : Créateur du forum

**Usage :** Organisation des discussions communautaires.

### MessageGroupe
Messages dans les groupes de discussion.

**Colonnes principales :**
- `IDMessageGroupe` : Identifiant unique
- `IDGroupe` : Groupe concerné
- `IDUtilisateurs` : Auteur du message
- `Contenu` : Contenu du message
- `DateEnvoi` : Date d'envoi

**Usage :** Communication dans les groupes.

## Tables conformité

### DemandeRGPD
Gestion des droits RGPD des utilisateurs.

**Colonnes principales :**
- `IDDemandeRGPD` : Identifiant unique
- `IDUtilisateurs` : Utilisateur demandeur
- `TypeDemande` : Type de demande RGPD
- `Statut` : État de traitement
- `DateDemande` : Date de création
- `DateEcheance` : Échéance légale
- `TraitePar` : Agent traitant

**Usage :** Conformité RGPD et gestion des droits.

### ConsentementCookies
Gestion des consentements aux cookies.

**Colonnes principales :**
- `IDConsentement` : Identifiant unique
- `IDUtilisateurs` : Utilisateur concerné
- `TypeCookie` : Type de cookie
- `Statut` : Consentement accordé/retiré
- `DateConsentement` : Date du consentement

**Usage :** Conformité cookies et RGPD.

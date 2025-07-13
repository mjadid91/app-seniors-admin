
# 🤝 Spécifications - Module Partenaires

## 🎯 Objectif
Gérer l'écosystème des partenaires et leurs offres promotionnelles (bons plans).

## 📋 Fonctionnalités principales

### 1. Gestion des partenaires
#### Création d'un partenaire
- **Informations obligatoires** : Raison sociale, Email, Téléphone, Adresse
- **Type de partenariat** : Commercial, Institutionnel, Associatif
- **Statut** : Actif, Inactif, En négociation, Suspendu
- **Contact principal** : Nom, fonction, coordonnées

#### Profil partenaire
- **Présentation** : Description, logo, site web
- **Secteur d'activité** : Santé, Services, Commerce, Loisirs
- **Zone de couverture** : Locale, Régionale, Nationale
- **Conditions commerciales** : Remises négociées, durée du partenariat

### 2. Gestion des bons plans
#### Création d'offres
- **Informations générales** : Titre, Description, Conditions d'utilisation
- **Type de réduction** : Pourcentage, Montant fixe, Service gratuit
- **Validité** : Date début/fin, nombre d'utilisations max
- **Code promo** : Génération automatique ou manuel
- **Restrictions** : Âge minimum, zone géographique, première commande

#### Suivi des utilisations
- **Statistiques** : Nombre d'utilisations, taux de conversion
- **Utilisateurs** : Qui a utilisé quoi et quand
- **Performance** : ROI par bon plan

### 3. Services partenaires
#### Catalogue de services
- **Services proposés** : Liste des prestations partenaire
- **Tarification** : Grille tarifaire négociée
- **Disponibilité** : Créneaux et zones de service
- **Conditions** : Modalités spécifiques du partenaire

## 🔒 Permissions par rôle

| Action | Admin | Modérateur | Support | Visualisateur |
|--------|-------|------------|---------|---------------|
| Voir partenaires | ✅ | ❌ | ❌ | ✅ |
| Créer partenaire | ✅ | ❌ | ❌ | ❌ |
| Modifier partenaire | ✅ | ❌ | ❌ | ❌ |
| Supprimer partenaire | ✅ | ❌ | ❌ | ❌ |
| Gérer bons plans | ✅ | ❌ | ❌ | ❌ |
| Voir statistiques | ✅ | ❌ | ❌ | ✅ |
| Exporter données | ✅ | ❌ | ❌ | ❌ |

## 📊 Structure des données

### Table Partenaire
```typescript
interface Partenaire {
  IDPartenaire: number;
  RaisonSociale: string;
  Email: string;
  Telephone: string;
  Adresse: string;
  TypePartenaire: 'commercial' | 'institutionnel' | 'associatif';
  Statut: 'actif' | 'inactif' | 'en_negociation' | 'suspendu';
  DateInscription: string;
  ContactPrincipal: {
    nom: string;
    fonction: string;
    email: string;
    telephone: string;
  };
  SecteurActivite: string;
  ZoneCouverture: 'locale' | 'regionale' | 'nationale';
  SiteWeb?: string;
  Logo?: string;
  Description?: string;
}
```

### Table BonPlan
```typescript
interface BonPlan {
  IDBonPlan: number;
  IDPartenaire: number;
  TitreBonPlan: string;
  DescriptionBonPlan: string;
  TypeReduction: 'pourcentage' | 'montant_fixe' | 'service_gratuit';
  PourcentageReduction?: number;
  MontantReduction?: number;
  CodePromo: string;
  DateDebutReduction: string;
  DateFinReduction: string;
  NombreUtilisationsMax?: number;
  NombreUtilisationsActuel: number;
  StatutBonPlan: 'actif' | 'inactif' | 'expire' | 'epuise';
  Conditions?: string;
  RestrictionsAge?: number;
  ZoneGeographique?: string;
}
```

### Table BonPlan_Utilisateurs
```typescript
interface UtilisationBonPlan {
  IDUtilisateur: number;
  IDBonPlan: number;
  DateUtilisation: string;
  MontantReduction: number;
  IDCommande?: number;
  StatutUtilisation: 'utilise' | 'rembourse' | 'annule';
}
```

### Table Partenaire_Services
```typescript
interface ServicePartenaire {
  IDServicePartenaire: number;
  IDPartenaire: number;
  NomService: string;
  Description: string;
  TarifNormal: number;
  TarifNegocie: number;
  Disponibilite: string;
  Conditions: string;
}
```

## 🔧 API Routes

### Partenaires

#### GET /partenaires
**Description** : Liste des partenaires  
**Paramètres** :
- `statut` : Filtre par statut
- `secteur` : Filtre par secteur d'activité
- `zone` : Filtre par zone de couverture
- `search` : Recherche par nom/secteur

**Réponse** :
```json
{
  "data": [
    {
      "id": 1,
      "raisonSociale": "Pharmacie Martin",
      "email": "contact@pharmacie-martin.fr",
      "telephone": "0145678901",
      "statut": "actif",
      "secteurActivite": "Santé",
      "bonPlansActifs": 3
    }
  ],
  "total": 45,
  "page": 1
}
```

#### POST /partenaires
**Description** : Créer un nouveau partenaire  
**Body** :
```json
{
  "raisonSociale": "Coiffure Senior Plus",
  "email": "contact@coiffure-senior.fr",
  "telephone": "0123456789",
  "adresse": "15 rue de la Coupe, 75001 Paris",
  "typePartenaire": "commercial",
  "secteurActivite": "Services",
  "contactPrincipal": {
    "nom": "Marie Dupont",
    "fonction": "Gérante",
    "email": "marie@coiffure-senior.fr",
    "telephone": "0123456789"
  }
}
```

#### PUT /partenaires/{id}
**Description** : Modifier un partenaire  
**Restrictions** : Vérification des bons plans actifs

#### DELETE /partenaires/{id}
**Description** : Supprimer un partenaire  
**Règles** : Archivage des bons plans associés

### Bons plans

#### GET /bons-plans
**Description** : Liste des bons plans  
**Paramètres** :
- `partenaire` : Filtre par partenaire
- `statut` : actif, inactif, expire
- `type` : Type de réduction
- `dateDebut`, `dateFin` : Période de validité

#### POST /bons-plans
**Description** : Créer un bon plan  
**Body** :
```json
{
  "idPartenaire": 5,
  "titre": "10% sur tous les soins",
  "description": "Remise de 10% sur l'ensemble des prestations",
  "typeReduction": "pourcentage",
  "pourcentageReduction": 10,
  "dateDebut": "2024-07-01",
  "dateFin": "2024-12-31",
  "codePromo": "SENIOR10",
  "nombreUtilisationsMax": 1000,
  "conditions": "Valable une seule fois par client"
}
```

#### PUT /bons-plans/{id}/statut
**Description** : Activer/désactiver un bon plan  
**Body** :
```json
{
  "statut": "actif"
}
```

### Statistiques

#### GET /partenaires/{id}/statistiques
**Description** : Statistiques d'un partenaire  
**Réponse** :
```json
{
  "bonPlansActifs": 5,
  "totalUtilisations": 1247,
  "chiffresAffairesGenere": 15420.50,
  "clientsUniques": 423,
  "tauxConversion": 12.5,
  "meilleurBonPlan": {
    "titre": "20% première commande",
    "utilisations": 456
  }
}
```

#### GET /bons-plans/{id}/utilisations
**Description** : Détail des utilisations d'un bon plan  
**Paramètres** :
- `dateDebut`, `dateFin` : Période
- `page`, `limit` : Pagination

## 📋 Règles métier

### Validation des bons plans
- **Dates cohérentes** : Date fin > Date début
- **Réductions valides** : Pourcentage 1-100%, montant > 0
- **Code promo unique** : Vérification d'unicité
- **Nombre d'utilisations** : Limite respectée

### Gestion des expirations
- **Vérification quotidienne** : Mise à jour automatique des statuts
- **Notification partenaire** : Alerte 7 jours avant expiration
- **Archive automatique** : Bons plans expirés archivés après 30 jours

### Utilisation des bons plans
- **Vérification validité** : Date, statut, nombre d'utilisations
- **Une utilisation par commande** : Pas de cumul possible
- **Historique complet** : Traçabilité de chaque utilisation
- **Calcul automatique** : Application de la réduction

### Facturation partenaires
- **Commission variable** : Selon type de partenariat
- **Facturation mensuelle** : Récapitulatif des utilisations
- **Remboursement automatique** : En cas d'annulation commande

### Notifications automatiques
- **Nouveau partenaire** : Email de bienvenue avec guide
- **Bon plan créé** : Confirmation avec récapitulatif
- **Seuil d'utilisation** : Alerte à 80% des utilisations max
- **Statistiques mensuelles** : Rapport d'activité automatique


# 🛠️ Spécifications - Module Prestations

## 🎯 Objectif
Gérer l'ensemble des services proposés sur la plateforme et suivre leur réalisation.

## 📋 Fonctionnalités principales

### 1. Gestion des prestations
#### Créer une prestation
- **Champs obligatoires** : Titre, Description, Domaine, Tarif indicatif
- **Champs optionnels** : Durée estimée, Prérequis, Instructions spéciales
- **Validation** : Vérification des doublons sur titre + domaine

#### Modifier une prestation
- **Informations générales** : Titre, Description, Tarif
- **Statut** : Active/Inactive/Archivée
- **Historique** : Conservation des versions précédentes

#### Domaines d'intervention
- **Gestion des domaines** : Ajout/Modification/Suppression
- **Hiérarchie** : Domaines parents et sous-domaines
- **Association** : Liaison prestations ↔ domaines

### 2. Suivi des prestations
#### États des prestations
- **En attente** : Demande créée, pas encore assignée
- **En cours** : Aidant assigné, prestation en réalisation
- **Terminée** : Prestation réalisée, en attente d'évaluation
- **Annulée** : Annulation par le senior ou l'aidant
- **Refusée** : Refusée par l'aidant ou pour non-conformité

#### Mise en relation
- **Attribution automatique** : Basée sur compétences et disponibilités
- **Attribution manuelle** : Choix de l'aidant par l'administrateur
- **Historique complet** : Traçabilité de toutes les étapes

### 3. Évaluations et suivi qualité
#### Système d'évaluation
- **Note** : Échelle de 1 à 5 étoiles
- **Commentaires** : Obligatoires si note < 3
- **Critères** : Ponctualité, Qualité, Communication, Propreté

## 🔒 Permissions par rôle

| Action | Admin | Modérateur | Support | Visualisateur |
|--------|-------|------------|---------|---------------|
| Voir prestations | ✅ | ❌ | ❌ | ✅ |
| Créer prestation | ✅ | ❌ | ❌ | ❌ |
| Modifier prestation | ✅ | ❌ | ❌ | ❌ |
| Supprimer prestation | ✅ | ❌ | ❌ | ❌ |
| Gérer domaines | ✅ | ❌ | ❌ | ❌ |
| Assigner aidants | ✅ | ❌ | ❌ | ❌ |
| Voir évaluations | ✅ | ❌ | ❌ | ✅ |

## 📊 Structure des données

### Table Prestation
```typescript
interface Prestation {
  IDPrestation: number;
  Titre: string;
  Description: string;
  TarifIndicatif: number;
  IDDomaine: number;
  DateCreation: string;
  Statut: 'active' | 'inactive' | 'archivee';
  DureeEstimee?: number; // en minutes
  Prerequisites?: string;
}
```

### Table Domaine
```typescript
interface Domaine {
  IDDomaine: number;
  DomaineTitre: string;
  DomaineParent?: number;
  Description?: string;
  IconeUrl?: string;
}
```

### Table MiseEnRelation
```typescript
interface MiseEnRelation {
  IDMiseEnRelation: number;
  IDPrestation: number;
  IDSeniors: number;
  IDAidant?: number;
  DatePrestation: string;
  DurePrestation: number;
  TarifPreste: number;
  Statut: 'en_attente' | 'en_cours' | 'terminee' | 'annulee' | 'refusee';
  DatePaiement?: string;
  IDUtilisateurPayeur: number;
  IDCommande?: number;
}
```

### Table Evaluation
```typescript
interface Evaluation {
  IDEvaluation: number;
  IDMiseEnRelation: number;
  IDUtilisateurs: number; // Évaluateur
  Note: 1 | 2 | 3 | 4 | 5;
  Commentaire: string;
  DateEvaluation: string;
  Criteres: {
    ponctualite: number;
    qualite: number;
    communication: number;
    proprete: number;
  };
}
```

## 🔧 API Routes

### Prestations

#### GET /prestations
**Description** : Liste des prestations  
**Paramètres** :
- `page`, `limit` : Pagination
- `domaine` : Filtre par domaine
- `statut` : Filtre par statut
- `search` : Recherche textuelle

#### POST /prestations
**Description** : Créer une prestation  
**Body** :
```json
{
  "titre": "Aide au ménage",
  "description": "Nettoyage complet du domicile",
  "tarifIndicatif": 25.00,
  "domaine": 1,
  "dureeEstimee": 120
}
```

#### PUT /prestations/{id}
**Description** : Modifier une prestation  
**Restrictions** : Impossible si prestations actives en cours

#### DELETE /prestations/{id}
**Description** : Supprimer une prestation  
**Règles** : Soft delete, archivage automatique

### Domaines

#### GET /domaines
**Description** : Liste hiérarchique des domaines

#### POST /domaines
**Body** :
```json
{
  "titre": "Aide domestique",
  "parent": null,
  "description": "Services d'aide à domicile"
}
```

### Mises en relation

#### GET /mises-en-relation
**Description** : Suivi des prestations en cours  
**Paramètres** :
- `statut` : Filtre par statut
- `aidant` : Prestations d'un aidant spécifique
- `senior` : Prestations d'un senior spécifique
- `dateDebut`, `dateFin` : Période

#### POST /mises-en-relation
**Description** : Créer une mise en relation  
**Body** :
```json
{
  "idPrestation": 5,
  "idSenior": 123,
  "datePrestation": "2024-07-20T14:00:00Z",
  "dureeEstimee": 120,
  "instructions": "Clés sous le paillasson"
}
```

#### PUT /mises-en-relation/{id}/assigner
**Description** : Assigner un aidant  
**Body** :
```json
{
  "idAidant": 45,
  "tarifNegocie": 28.00
}
```

#### PUT /mises-en-relation/{id}/statut
**Description** : Changer le statut  
**Body** :
```json
{
  "statut": "terminee",
  "commentaire": "Prestation réalisée avec succès"
}
```

### Évaluations

#### POST /evaluations
**Description** : Ajouter une évaluation  
**Body** :
```json
{
  "idMiseEnRelation": 789,
  "note": 5,
  "commentaire": "Excellent service",
  "criteres": {
    "ponctualite": 5,
    "qualite": 5,
    "communication": 4,
    "proprete": 5
  }
}
```

## 📋 Règles métier

### Attribution automatique d'aidants
1. **Compétences** : Vérification domaine d'intervention
2. **Disponibilité** : Créneaux libres dans l'agenda
3. **Géolocalisation** : Distance max 20km du senior
4. **Évaluations** : Note moyenne > 3.5
5. **Préférences** : Historique des demandes senior

### Gestion des tarifs
- **Tarif indicatif** : Base de négociation
- **Tarif négocié** : Prix final convenu
- **Commission plateforme** : 5% sur chaque prestation
- **Paiement** : Après validation de la prestation

### Annulations et remboursements
- **Annulation > 24h** : Remboursement intégral
- **Annulation < 24h** : Pénalité de 20%
- **Annulation < 2h** : Pénalité de 50%
- **No-show** : Facturation intégrale

### Contrôle qualité
- **Évaluation obligatoire** : Pour prestations terminées
- **Seuil d'alerte** : Note moyenne aidant < 3.0
- **Sanctions** : Suspension temporaire si répétition
- **Formation** : Proposition d'amélioration continue

### Notifications automatiques
- **Nouvelle prestation** : Notification aux aidants qualifiés
- **Attribution** : Confirmation senior + aidant
- **Rappel RDV** : 24h et 2h avant
- **Demande d'évaluation** : 2h après fin prestation

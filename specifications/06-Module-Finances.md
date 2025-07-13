
# 💰 Spécifications - Module Finances

## 🎯 Objectif
Gestion complète des aspects financiers : transactions, commissions, revenus et reporting.

## 📋 Fonctionnalités principales

### 1. Gestion des transactions
#### Types de transactions
- **Commandes** : Achats de produits/services
- **Prestations** : Services d'aidants
- **Activités rémunérées** : Services proposés par seniors
- **Services post-mortem** : Prestations funéraires
- **Dons cagnottes** : Contributions aux cagnottes décès

#### Suivi des paiements
- **Statuts** : En attente, Payé, Échoué, Remboursé, Annulé
- **Moyens de paiement** : CB, Virement, Chèque, Espèces
- **Réconciliation** : Rapprochement bancaire automatique

### 2. Système de commissions
#### Calcul automatique des commissions
- **Commandes** : 5% du montant total
- **Prestations** : 5% du tarif négocié
- **Activités rémunérées** : 5% du revenu
- **Services post-mortem** : 5% de la prestation
- **Dons cagnottes** : 5% du montant du don

#### Gestion des commissions
- **Versement automatique** : Tous les 15 du mois
- **Seuil minimum** : 10€ pour déclencher un versement
- **Historique complet** : Traçabilité de tous les versements

### 3. Rapports financiers
#### Tableau de bord financier
- **Chiffre d'affaires mensuel** : Par type de transaction
- **Commissions perçues** : Total et détail par source
- **Évolution** : Graphiques mensuels/annuels
- **Prévisions** : Projections basées sur l'historique

#### Exports et reporting
- **Export Excel/CSV** : Toutes les transactions
- **Rapports comptables** : Compatible avec logiciels de gestion
- **Déclarations fiscales** : Données préformatées

## 🔒 Permissions par rôle

| Action | Admin | Modérateur | Support | Visualisateur |
|--------|-------|------------|---------|---------------|
| Voir finances | ✅ | ❌ | ❌ | ✅ |
| Ajouter transaction | ✅ | ❌ | ❌ | ❌ |
| Modifier transaction | ✅ | ❌ | ❌ | ❌ |
| Supprimer transaction | ✅ | ❌ | ❌ | ❌ |
| Gérer commissions | ✅ | ❌ | ❌ | ❌ |
| Exporter données | ✅ | ❌ | ❌ | ❌ |
| Voir rapports | ✅ | ❌ | ❌ | ✅ |

## 📊 Structure des données

### Vue v_financestransactions
```typescript
interface FinanceTransaction {
  id: number;
  type: string; // 'Commande', 'Prestation', 'Activité', 'PostMortem', 'Don'
  utilisateur: string; // Nom complet de l'utilisateur
  montant: number;
  commission: number;
  date: string;
  statut: string;
  categorie_type: string;
  original_id: number; // ID de la transaction source
  id_utilisateurs?: number;
  id_commande?: number;
  id_activite_remuneree?: number;
  id_service_post_mortem?: number;
  id_don_cagnotte?: number;
}
```

### Table VersementCommissions
```typescript
interface VersementCommission {
  IDVersementCommission: number;
  MontantCommission: number;
  DateVersement: string;
  MoyenVersement: string;
  TypeTransaction: string;
  PourcentageCommission: number;
  IDCommande?: number;
  IDActiviteRemuneree?: number;
  IDServicePostMortem?: number;
  IDDonCagnotte?: number;
}
```

### Table ParametresCommission
```typescript
interface ParametreCommission {
  IDParametreCommission: number;
  TypeTransaction: string;
  Pourcentage: number; // Défaut: 5.0
}
```

### Tables sources
- **Commande** : Achats de produits/services
- **ActiviteRemuneree_Utilisateurs** : Revenus d'activités
- **ServicePostMortem_Utilisateurs** : Prestations funéraires
- **DonCagnotte** : Contributions aux cagnottes

## 🔧 API Routes

### Transactions

#### GET /finances/transactions
**Description** : Liste de toutes les transactions  
**Paramètres** :
- `type` : Filtre par type de transaction
- `utilisateur` : Filtre par utilisateur
- `dateDebut`, `dateFin` : Période
- `statut` : Filtre par statut
- `page`, `limit` : Pagination

**Réponse** :
```json
{
  "data": [
    {
      "id": 1,
      "type": "Commande",
      "utilisateur": "Jean Dupont",
      "montant": 150.00,
      "commission": 7.50,
      "date": "2024-07-15T10:30:00Z",
      "statut": "Payée",
      "originalId": 123
    }
  ],
  "total": 1247,
  "page": 1
}
```

#### POST /finances/transactions
**Description** : Ajouter une transaction manuelle  
**Body** :
```json
{
  "type": "Commande",
  "montant": 89.99,
  "utilisateur": 456,
  "description": "Achat produit spécial",
  "moyenPaiement": "carte_bancaire"
}
```

#### PUT /finances/transactions/{id}
**Description** : Modifier une transaction  
**Restrictions** : Impossible si commission déjà versée

#### DELETE /finances/transactions/{id}
**Description** : Supprimer une transaction  
**Règles** : Soft delete avec raison obligatoire

### Commissions

#### GET /finances/commissions
**Description** : Historique des commissions  
**Paramètres** :
- `type` : Type de transaction source
- `dateDebut`, `dateFin` : Période de versement
- `statut` : versée, en_attente, annulee

#### GET /finances/commissions/a-verser
**Description** : Commissions en attente de versement  
**Réponse** :
```json
{
  "totalAVerser": 2347.50,
  "nombreTransactions": 156,
  "prochainVersement": "2024-08-15",
  "details": [
    {
      "type": "Commande",
      "montant": 1250.30,
      "transactions": 89
    }
  ]
}
```

#### POST /finances/commissions/verser
**Description** : Déclencher le versement des commissions  
**Body** :
```json
{
  "moyenVersement": "virement_bancaire",
  "dateVersement": "2024-07-30"
}
```

### Rapports

#### GET /finances/stats
**Description** : Statistiques financières globales  
**Paramètres** :
- `periode` : mois, trimestre, annee
- `annee` : Année de référence

**Réponse** :
```json
{
  "chiffresAffaires": {
    "total": 125430.50,
    "evolution": 12.5,
    "parType": {
      "commandes": 85200.30,
      "prestations": 25100.80,
      "activites": 15129.40
    }
  },
  "commissions": {
    "total": 6271.53,
    "taux": 5.0,
    "versees": 5895.30,
    "enAttente": 376.23
  }
}
```

#### GET /finances/export
**Description** : Export des données financières  
**Paramètres** :
- `format` : csv, excel, pdf
- `type` : transactions, commissions, rapports
- `dateDebut`, `dateFin` : Période

## 📋 Règles métier

### Calcul automatique des commissions
1. **Déclenchement** : À la création de chaque transaction
2. **Pourcentage** : Récupéré depuis ParametresCommission
3. **Valeur par défaut** : 5% si pas de configuration
4. **Calcul** : Montant × (Pourcentage / 100)
5. **Arrondi** : 2 décimales, arrondi au centime supérieur

### Triggers automatiques
- **Nouvelle commande** → Création commission
- **Nouvelle activité rémunérée** → Création commission
- **Nouveau service post-mortem** → Création commission
- **Nouveau don cagnotte** → Création commission

### Versement des commissions
- **Fréquence** : Le 15 de chaque mois
- **Seuil minimum** : 10€ par bénéficiaire
- **Report** : Montants < seuil reportés au mois suivant
- **Moyen** : Virement bancaire automatique
- **Notification** : Email de confirmation aux bénéficiaires

### Gestion des remboursements
- **Commande annulée** : Commission automatiquement annulée
- **Remboursement partiel** : Recalcul de la commission
- **Délai de carence** : 7 jours avant versement définitif

### Contrôles et validations
- **Montants négatifs** : Interdits sauf cas de remboursement
- **Dates cohérentes** : Vérification temporelle
- **Doublons** : Détection automatique des transactions similaires
- **Réconciliation** : Vérification avec données bancaires

### Reporting et conformité
- **Audit trail** : Traçabilité complète de toutes les opérations
- **Sauvegarde quotidienne** : Backup des données financières
- **Conformité RGPD** : Anonymisation des exports sur demande
- **Déclarations fiscales** : Génération automatique des documents

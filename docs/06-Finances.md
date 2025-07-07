
# 💰 Documentation – Page Finances

## 🧭 Objectif général

La page **Finances** de l'application AppSeniors Admin a pour but de permettre aux administrateurs de :
- Suivre l'ensemble des transactions financières réalisées sur la plateforme
- Gérer les commissions que la plateforme perçoit automatiquement sur certaines opérations
- Accéder à une vue claire des flux monétaires par type de transaction
- Réaliser des actions (consultation, modification, suppression) sur les lignes de transactions

---

## 📂 Contenu de la page Finances

Chaque ligne représente une **transaction financière**, et peut concerner :
- Une commande passée dans AppSeniors Market
- Une activité rémunérée proposée par un senior
- Un service post-mortem financé via une cagnotte

Les dons sont également visibles, mais **ne génèrent pas de commission** (valeur solidaire du projet).

---

## 🧮 Calcul des commissions

Lorsqu'une transaction est ajoutée, la plateforme prélève automatiquement une **commission** si la nature de l'opération le permet.

Le calcul est effectué via ce schéma :

```
MontantCommission = MontantTotal * (Pourcentage / 100)
```

- Le pourcentage n'est **pas codé en dur** : il est défini dynamiquement via la table `ParametresCommission`
- Chaque ligne de commission est enregistrée dans la table `VersementCommissions`
- Le champ `"MoyenVersement"` est renseigné par défaut comme `"Plateforme interne"` (modifiable si besoin)

La commission s'applique aux types suivants :
- Commande
- Activité rémunérée
- Service post-mortem

Les **dons** sont **exclus** de ce mécanisme pour respecter l'aspect éthique.

---

## ⚙️ Table ParametresCommission

Une interface d'administration permet de :
- Consulter les pourcentages en vigueur par type de transaction
- Les modifier dynamiquement
- En ajouter ou supprimer si l'évolution de la plateforme l'exige

Le champ `TypeTransaction` est une **liste sécurisée** contenant :
- `Commande`
- `Activite`
- `PostMortem`

Une contrainte SQL (`CHECK`) empêche toute saisie invalide.

---

## 🧑‍💼 Colonne "Utilisateur"

Chaque transaction est associée à un **utilisateur déclencheur** :
- Pour les commandes : l'utilisateur ayant payé
- Pour les activités : l'utilisateur concerné par le revenu
- Pour les dons : le donateur
- Pour les services post-mortem : celui qui a géré ou commandé le service

Cette colonne est utile pour :
- Suivre l'origine d'un flux
- Filtrer par utilisateur
- Vérifier l'historique

---

## 📊 Fonctionnalités de gestion

### 🔍 Recherche et filtrage
- **Par type** : Commande, Activité, Don, Post-mortem
- **Par statut** : Payé, En attente, Annulé, Remboursé
- **Par période** : Filtrage par dates
- **Par utilisateur** : Transactions d'un utilisateur spécifique
- **Par montant** : Seuils minimum et maximum

### 📋 Actions disponibles
- **👁️ Consulter** : Voir les détails complets d'une transaction
- **✏️ Modifier** : Éditer montant, statut, moyens de paiement
- **🗑️ Supprimer** : Suppression avec confirmation sécurisée
- **📄 Exporter** : Génération de rapports financiers

---

## 💹 Métriques et analyses

### 📈 Indicateurs clés
- **Chiffre d'affaires total** : Somme de toutes les transactions
- **Commissions perçues** : Total des revenus de la plateforme
- **Montant net** : Somme après déduction des commissions
- **Évolution mensuelle** : Tendances et croissance

### 📊 Répartition
- **Par type de transaction** : Distribution des revenus
- **Par période** : Analyse temporelle
- **Par utilisateur** : Top contributeurs
- **Par statut** : Répartition des états de paiement

---

## 🔧 Outils d'administration

### 🎛️ Gestion des commissions
- **Taux configurables** : Modification des pourcentages par type
- **Calcul automatique** : Application automatique lors des transactions
- **Traçabilité** : Historique des modifications de taux
- **Validation** : Contrôles de cohérence

### 📋 Rapports financiers
- **Rapports mensuels** : Synthèse périodique
- **Analyses de tendances** : Évolutions et projections
- **Détail par catégorie** : Répartition fine des revenus
- **Export comptable** : Formats compatibles avec les logiciels comptables

---

## 🛡️ Sécurité et traçabilité

### 🔒 Contrôles d'accès
- **Permissions** : Accès limité aux administrateurs financiers
- **Audit trail** : Traçabilité de toutes les modifications
- **Validation** : Confirmation requise pour les actions critiques
- **Sauvegarde** : Backup automatique des données financières

### 📝 Conformité
- **RGPD** : Respect de la protection des données
- **Comptabilité** : Conformité aux normes comptables
- **Archivage** : Conservation légale des documents
- **Contrôles** : Vérifications périodiques

---

## 🔧 Fonctions attendues côté admin

- 👁️ Consulter chaque transaction dans le détail
- ✏️ Modifier certaines valeurs (montant, moyen de paiement…)
- 🗑️ Supprimer proprement une transaction (avec confirmation)
- 📊 Affichage clair des montants, des pourcentages, des commissions calculées

---

## 🎯 Résumé

La page Finances est un outil de gestion central :
- Elle automatise la génération de revenus pour la plateforme
- Elle respecte les valeurs éthiques du projet
- Elle donne une vision comptable claire
- Elle reste modifiable dynamiquement par les administrateurs
- Elle offre des outils d'analyse et de reporting complets
- Elle garantit la sécurité et la conformité des données financières


# Tests manuels - Gestion Financière

## 🎯 Objectif
Vérifier la gestion complète des aspects financiers : transactions, commissions, revenus et reporting.

## 💰 Gestion des transactions

### Types de transactions
- [ ] Créer une transaction de type "Commande"
- [ ] Créer une transaction de type "Prestation"
- [ ] Créer une transaction de type "Activité rémunérée"
- [ ] Créer une transaction de type "Service post-mortem"
- [ ] Créer une transaction de type "Don cagnotte"

### Création de transaction
- [ ] Saisir tous les champs obligatoires
- [ ] Associer à un utilisateur
- [ ] Définir le montant et la devise
- [ ] Calculer automatiquement la commission (5%)
- [ ] Enregistrer la date de transaction

### Statuts de paiement
- [ ] Transaction "En attente"
- [ ] Transaction "Payée"
- [ ] Transaction "Échouée"
- [ ] Transaction "Remboursée"
- [ ] Transaction "Annulée"

## 🏦 Système de commissions

### Calcul automatique
- [ ] Vérifier le calcul à 5% sur les commandes
- [ ] Vérifier le calcul à 5% sur les prestations
- [ ] Vérifier le calcul à 5% sur les activités rémunérées
- [ ] Vérifier le calcul à 5% sur les services post-mortem
- [ ] Vérifier le calcul à 5% sur les dons cagnottes

### Configuration des paramètres
- [ ] Modifier le pourcentage de commission par type
- [ ] Sauvegarder les nouveaux paramètres
- [ ] Appliquer aux nouvelles transactions
- [ ] Conserver l'historique des anciens taux

### Versement des commissions
- [ ] Calculer le total des commissions à verser
- [ ] Respecter le seuil minimum de 10€
- [ ] Programmer le versement du 15 du mois
- [ ] Enregistrer les versements effectués
- [ ] Reporter les montants inférieurs au seuil

## 📊 Vue financière consolidée

### Vue v_financestransactions
- [ ] Afficher toutes les transactions consolidées
- [ ] Voir le type, utilisateur, montant, commission
- [ ] Filtrer par type de transaction
- [ ] Filtrer par utilisateur
- [ ] Filtrer par période

### Calculs et totaux
- [ ] Total des transactions par type
- [ ] Total des commissions perçues
- [ ] Chiffre d'affaires mensuel
- [ ] Évolution par rapport au mois précédent

## 🔍 Filtrage et recherche

### Filtres disponibles
- [ ] Filtrer par type de transaction
- [ ] Filtrer par utilisateur spécifique
- [ ] Filtrer par période (date début/fin)
- [ ] Filtrer par statut de paiement
- [ ] Combiner plusieurs filtres

### Recherche et tri
- [ ] Rechercher par nom d'utilisateur
- [ ] Trier par montant (croissant/décroissant)
- [ ] Trier par date de transaction
- [ ] Trier par montant de commission
- [ ] Pagination des résultats

## 📈 Rapports financiers

### Tableau de bord financier
- [ ] Chiffre d'affaires mensuel par type de transaction
- [ ] Total des commissions perçues
- [ ] Graphiques d'évolution mensuelle/annuelle
- [ ] Projections basées sur l'historique

### Statistiques détaillées
- [ ] Répartition des revenus par source
- [ ] Performance par type de transaction
- [ ] Analyse des tendances
- [ ] Comparaisons périodiques

## 💾 Export et reporting

### Formats d'export
- [ ] Export Excel (.xlsx)
- [ ] Export CSV
- [ ] Export PDF pour rapports
- [ ] Données compatibles avec logiciels comptables

### Rapports périodiques
- [ ] Rapport mensuel automatique
- [ ] Rapport trimestriel
- [ ] Rapport annuel
- [ ] Rapports sur mesure par période

## 🔒 Permissions par rôle

### Contrôle d'accès
- [ ] Administrateur : Accès complet à toutes les fonctions
- [ ] Modérateur : Lecture seule
- [ ] Support : Lecture seule
- [ ] Visualisateur : Accès aux rapports uniquement

### Actions par rôle
- [ ] Création de transaction (Admin uniquement)
- [ ] Modification de transaction (Admin uniquement)
- [ ] Suppression de transaction (Admin uniquement)
- [ ] Gestion des commissions (Admin uniquement)
- [ ] Export des données (Admin uniquement)

## ⚙️ Gestion des moyens de paiement

### Types de paiement
- [ ] Carte bancaire
- [ ] Virement bancaire
- [ ] Chèque
- [ ] Espèces
- [ ] Autres moyens

### Réconciliation bancaire
- [ ] Rapprochement automatique des paiements
- [ ] Identification des écarts
- [ ] Marquage des transactions réconciliées
- [ ] Génération de rapports de réconciliation

## 🚨 Règles métier et validations

### Validations automatiques
- [ ] Montants positifs obligatoires (sauf remboursements)
- [ ] Dates cohérentes avec la réalité
- [ ] Détection automatique des doublons
- [ ] Vérification avec les données bancaires

### Gestion des remboursements
- [ ] Commande annulée → Commission automatiquement annulée
- [ ] Remboursement partiel → Recalcul de la commission
- [ ] Délai de carence de 7 jours avant versement définitif
- [ ] Traçabilité complète des annulations

## 📊 Monitoring et performance

### Suivi temps réel
- [ ] Mise à jour automatique des statistiques
- [ ] Notifications pour transactions importantes
- [ ] Alertes pour échecs de paiement
- [ ] Monitoring des seuils de commission

### Audit et traçabilité
- [ ] Log de toutes les opérations financières
- [ ] Horodatage précis de chaque action
- [ ] Identification des utilisateurs
- [ ] Sauvegarde quotidienne des données financières

## 🧪 Tests de stress financier
- [ ] Créer un grand volume de transactions
- [ ] Tester les calculs sur de gros montants
- [ ] Vérifier la performance avec beaucoup de données
- [ ] Simuler des pics d'activité
- [ ] Contrôler la cohérence des totaux

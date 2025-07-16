
# Tests manuels - Gestion Financière

## 🎯 Objectif
Vérifier la gestion complète des aspects financiers avec des transactions réelles et des calculs précis.

## 💰 Gestion des transactions réelles

### ✅ Scénario : Transaction Prestation - Sofia chez Marcel
**Contexte :** Prestation d'aide ménagère terminée
**Données de la transaction :**
- **Type :** Prestation
- **Aidant :** Sofia Lopez
- **Senior :** Marcel Durand
- **Date :** 15 mai 2024, 14h-17h
- **Durée :** 3 heures
- **Tarif horaire :** 18€/h
- **Montant total :** 54€
- **Commission plateforme :** 2.70€ (5%)
- **Montant aidant :** 51.30€

**Étapes :**
1. Se connecter en tant qu'admin@appseniors.fr
2. Vérifier la création automatique de la transaction
3. Contrôler les calculs de commission
4. Valider le statut "Payée"

**Résultat attendu :**
- Transaction créée automatiquement à la fin de prestation
- Commission calculée correctement : 54€ × 5% = 2.70€
- Statut "Payée" après validation de Marcel
- Reversement programmé pour Sofia

### ✅ Scénario : Transaction Commande - Matériel médical
**Contexte :** Commande de matériel médical par Mme Moreau
**Données de la transaction :**
- **Type :** Commande
- **Client :** Germaine Moreau (92 ans)
- **Produit :** Déambulateur pliable + coussin orthopédique
- **Prix unitaire :** 89€ + 25€ = 114€
- **Quantité :** 1 de chaque
- **Frais de livraison :** 8€
- **Total commande :** 122€
- **Commission :** 6.10€ (5%)
- **Moyen de paiement :** Carte bancaire

**Étapes :**
1. Créer la transaction type "Commande"
2. Ajouter les détails des produits
3. Calculer les frais et commission
4. Enregistrer le paiement par carte

**Résultat attendu :**
- Transaction enregistrée avec tous les détails
- Commission sur le montant HT (114€ × 5% = 5.70€)
- Frais de livraison non commissionnés
- Facture générée automatiquement

### ✅ Scénario : Transaction Activité Rémunérée - Cours d'informatique
**Contexte :** Senior donnant des cours d'informatique
**Données de la transaction :**
- **Type :** Activité rémunérée
- **Senior formateur :** Pierre Lecomte (68 ans, ancien informaticien)
- **Service :** Cours informatique débutants
- **Client :** Marie Dubois (72 ans)
- **Tarif :** 25€/heure
- **Durée :** 2 heures
- **Total :** 50€
- **Commission :** 2.50€ (5%)
- **Revenus senior :** 47.50€

**Étapes :**
1. Créer la transaction "Activité rémunérée"
2. Associer Pierre comme prestataire
3. Enregistrer la séance de 2h
4. Calculer la commission plateforme

**Résultat attendu :**
- Revenus complémentaires pour Pierre
- Commission prélevée automatiquement
- Paiement programmé sous 48h
- Comptabilisation dans les revenus seniors

## 🏦 Système de commissions détaillé

### ✅ Scénario : Calcul commission variable par type
**Configuration des taux :**
- **Prestations aide à domicile :** 5%
- **Commandes matériel médical :** 4%
- **Activités rémunérées seniors :** 3%
- **Services post-mortem :** 7%
- **Dons cagnottes :** 2%

**Tests de calculs :**
1. **Prestation 60€ → Commission 3€** (5%)
2. **Commande 150€ → Commission 6€** (4%)
3. **Cours senior 40€ → Commission 1.20€** (3%)
4. **Service funéraire 200€ → Commission 14€** (7%)
5. **Don cagnotte 100€ → Commission 2€** (2%)

**Résultat attendu :**
- Calculs automatiques selon le type
- Configuration modifiable par les admins
- Historique des taux conservé

### ✅ Scénario : Versement mensuel des commissions
**Période :** Mai 2024
**Aidant :** Sofia Lopez
**Activité du mois :**
- 12 prestations réalisées
- Total facturé : 648€ (12 × 54€ moyenne)
- Commissions dues : 32.40€
- Seuil minimum : 10€ ✓

**Détail des prestations :**
- Semaine 1 : 3 prestations, 162€
- Semaine 2 : 4 prestations, 216€
- Semaine 3 : 3 prestations, 162€
- Semaine 4 : 2 prestations, 108€

**Étapes :**
1. Générer le récapitulatif mensuel automatique
2. Vérifier le calcul total (648€ × 5% = 32.40€)
3. Contrôler le dépassement du seuil (32.40€ > 10€)
4. Programmer le versement du 15 juin

**Résultat attendu :**
- Versement automatique le 15/06/2024
- Récapitulatif détaillé envoyé à Sofia
- Justificatifs fiscaux générés
- Mise à jour des revenus annuels

## 💳 Gestion des moyens de paiement

### ✅ Scénario : Paiement carte bancaire avec échec
**Transaction :** Commande de Marcel (89€)
**Tentative 1 :** Carte bancaire refusée (provisions insuffisantes)
**Tentative 2 :** Autre carte acceptée

**Étapes :**
1. Première tentative de paiement
2. Réception du refus bancaire
3. Notification à Marcel
4. Nouvelle tentative avec autre carte
5. Validation du paiement

**Résultat attendu :**
- Première transaction marquée "Échouée"
- Email automatique à Marcel avec solutions
- Deuxième transaction "Payée"
- Commande processée normalement

### ✅ Scénario : Paiement par virement bancaire
**Transaction :** Prestation récurrente Marcel/Sofia (montant important)
**Montant :** 216€ (4 prestations mensuelles)
**Mode :** Virement SEPA mensuel automatique

**Configuration virement :**
- **IBAN Marcel :** FR76 1234 5678 9012 3456 789
- **IBAN Sofia :** FR14 9876 5432 1098 7654 321
- **Fréquence :** Tous les 15 du mois
- **Référence :** APPSENIORS-MAI2024-ML-SL

**Résultat attendu :**
- Prélèvement automatique chez Marcel
- Versement automatique à Sofia (moins commission)
- Reconciliation bancaire automatique
- Notifications de confirmation envoyées

## 📊 Vue financière consolidée

### ✅ Scénario : Dashboard financier mensuel complet
**Période :** Mai 2024
**Données consolidées attendues :**

**Revenus par type :**
- Prestations : 15,420€ (289 prestations × 53€ moyenne)
- Commandes : 8,750€ (125 commandes × 70€ moyenne)
- Activités rémunérées : 2,340€ (117 heures × 20€ moyenne)
- Services post-mortem : 1,200€ (6 services × 200€ moyenne)
- Dons cagnottes : 890€ (89 dons × 10€ moyenne)

**Total chiffre d'affaires :** 28,600€

**Commissions perçues :**
- Prestations : 771€ (5%)
- Commandes : 350€ (4%)
- Activités : 70€ (3%)
- Post-mortem : 84€ (7%)
- Dons : 18€ (2%)

**Total commissions :** 1,293€

**Étapes :**
1. Générer le rapport mensuel consolidé
2. Vérifier la cohérence des totaux
3. Analyser l'évolution vs avril 2024
4. Identifier les tendances

**Résultat attendu :**
- Dashboard avec graphiques d'évolution
- Répartition par type de transaction
- Comparaison mois précédent (+12% CA)
- Projections pour juin 2024

## 🔍 Filtrage et recherche financière

### ✅ Scénario : Recherche de transactions par utilisateur
**Recherche :** Toutes les transactions de Marcel Durand
**Période :** 3 derniers mois (mars-mai 2024)

**Transactions attendues :**
1. **Prestations (12) :** 648€ total
   - Mars : 4 prestations, 216€
   - Avril : 4 prestations, 216€
   - Mai : 4 prestations, 216€

2. **Commandes (3) :** 267€ total
   - Déambulateur : 122€
   - Médicaments : 67€
   - Coussin thérapeutique : 78€

3. **Dons cagnottes (2) :** 75€ total
   - Don Mme Moreau : 50€
   - Don M. Petit : 25€

**Total dépensé :** 990€ sur 3 mois

**Étapes :**
1. Utiliser le filtre "Utilisateur : Marcel Durand"
2. Définir la période mars-mai 2024
3. Vérifier tous les types de transactions
4. Exporter le récapitulatif

**Résultat attendu :**
- Liste complète et chronologique
- Calcul automatique des totaux
- Export Excel avec détails
- Graphique d'évolution mensuelle

### ✅ Scénario : Analyse des revenus par aidant
**Aidant analysé :** Sofia Lopez
**Période :** Année 2024 (janvier-mai)

**Revenus détaillés :**
- **Janvier :** 8 prestations, 432€ brut, 410.40€ net
- **Février :** 10 prestations, 540€ brut, 513€ net
- **Mars :** 11 prestations, 594€ brut, 564.30€ net
- **Avril :** 13 prestations, 702€ brut, 666.90€ net
- **Mai :** 12 prestations, 648€ brut, 615.60€ net

**Total 5 mois :** 2,916€ brut, 2,770.20€ net
**Commission totale :** 145.80€

**Résultat attendu :**
- Évolution croissante de l'activité
- Revenus nets calculés automatiquement
- Graphique de progression mensuelle
- Estimation revenus annuels : ~7,000€

## 💸 Gestion des remboursements

### ✅ Scénario : Remboursement prestation annulée
**Contexte :** Prestation annulée par Marcel < 2h avant (pénalité 50%)
**Transaction originale :** 54€ (3h × 18€)
**Pénalité :** 27€ (50%)
**Remboursement :** 27€

**Étapes du remboursement :**
1. Calcul automatique de la pénalité
2. Création transaction "Remboursement"
3. Reversement partiel à Marcel (27€)
4. Compensation partielle à Sofia (13.50€)
5. Commission ajustée

**Résultat attendu :**
- Transaction remboursement créée
- Montants calculés selon les règles
- Notifications aux deux parties
- Mise à jour des statistiques

### ✅ Scénario : Remboursement produit défectueux
**Contexte :** Déambulateur défectueux retourné par Mme Moreau
**Commande originale :** 122€ (produit + livraison)
**Produit défectueux :** 89€
**Remboursement :** 89€ (produit seulement)
**Livraison non remboursée :** 8€

**Étapes :**
1. Signalement du défaut par Mme Moreau
2. Validation par le service client
3. Remboursement partiel de 89€
4. Création avoir automatique

**Résultat attendu :**
- Remboursement de 89€ seulement
- Frais de livraison conservés
- Avoir généré pour future commande
- Commission réajustée (-3.56€)

## 📈 Reporting et export

### ✅ Scénario : Rapport trimestriel pour comptabilité
**Période :** Q1 2024 (janvier-mars)
**Format :** Export Excel détaillé

**Données à exporter :**
- Toutes les transactions par mois
- Détail des commissions par type
- TVA applicable par transaction
- Réconciliation bancaire
- Créances et dettes

**Colonnes du rapport :**
- Date, Type, Utilisateur, Montant HT, TVA, TTC
- Commission, Net à verser, Statut, Référence

**Résultat attendu :**
- Fichier Excel structuré et exploitable
- Données compatibles logiciel comptable
- Totaux et sous-totaux automatiques
- Prêt pour transmission expert-comptable

## 🔐 Sécurité et audit financier

### ✅ Scénario : Audit trail des modifications financières
**Action testée :** Modification d'une transaction par admin
**Transaction :** Prestation Sofia/Marcel (54€ → 60€)
**Motif :** Heure supplémentaire non comptée

**Modifications tracées :**
- **Utilisateur :** admin@appseniors.fr
- **Date/heure :** 16/05/2024 09:30:15
- **Champ modifié :** Montant total
- **Ancienne valeur :** 54€
- **Nouvelle valeur :** 60€
- **Motif :** "Heure supplémentaire ajoutée"

**Résultat attendu :**
- Historique complet des modifications
- Traçabilité par utilisateur et date
- Impossibilité de supprimer l'historique
- Alertes pour modifications importantes

## 📱 Interface mobile finance

### ✅ Scénario : Consultation revenus sur mobile (aidant)
**Utilisateur :** Sofia sur son iPhone
**Objectif :** Consulter ses revenus du mois

**Fonctionnalités mobiles :**
- Revenus du mois en cours
- Détail par prestation
- Prochains versements
- Historique simplifié

**Résultat attendu :**
- Interface adaptée mobile
- Informations essentielles visibles
- Navigation tactile optimisée
- Données synchronisées temps réel

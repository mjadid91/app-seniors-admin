# Gestion Financière

## Description générale
Module complet de gestion financière de la plateforme AppSeniors, couvrant les transactions, commissions, facturation, et reporting financier avec intégration comptable.

## Fonctionnalités principales

### 1. Vue d'ensemble financière
- **Tableau de bord** avec KPIs financiers :
  - Chiffre d'affaires mensuel/annuel
  - Commissions générées
  - Transactions en cours
  - Revenus par type de service
- **Graphiques** de tendances financières
- **Comparaisons** périodiques
- **Alertes** de seuils atteints

### 2. Gestion des transactions
- **Historique complet** de toutes les transactions
- **Types de transactions** :
  - Paiements de prestations
  - Commissions partenaires
  - Remboursements
  - Dons vers cagnottes
  - Achats de produits
- **Statuts** détaillés :
  - En attente
  - Validé
  - En cours de traitement
  - Terminé
  - Annulé/Remboursé

### 3. Système de commissions
- **Calcul automatique** selon les règles définies
- **Taux variables** par type de service
- **Paliers** de commission selon le volume
- **Versements périodiques** aux partenaires
- **Suivi** des commissions dues et versées
- **Rapports** de commissions détaillés

### 4. Facturation
- **Génération automatique** des factures
- **Templates** personnalisables
- **Numérotation** séquentielle
- **Mentions légales** obligatoires
- **Export** PDF et impression
- **Envoi automatique** par email

### 5. Moyens de paiement
- **Cartes bancaires** (Visa, Mastercard, Amex)
- **Virements SEPA**
- **Prélèvements automatiques**
- **PayPal** et portefeuilles numériques
- **Chèques** (pour certains services)
- **Paiement différé** pour les seniors

### 6. Gestion comptable
- **Export comptable** vers logiciels (Sage, Ciel, etc.)
- **Balance** des comptes
- **Journal** des écritures
- **TVA** et déclarations
- **Lettrage** automatique
- **Réconciliation bancaire**

## Composants techniques

### Structure des fichiers
```
src/components/finances/
├── Finances.tsx (composant principal)
├── AddTransactionModal.tsx (nouvelle transaction)
├── AddActivityRevenueForm.tsx (revenus d'activité)
├── AddCommandeForm.tsx (nouvelle commande)
├── AddCommissionForm.tsx (versement commission)
├── AddDonForm.tsx (nouveau don)
├── AddPostMortemForm.tsx (service post-mortem)
└── useFinancesTransactions.ts (hook principal)
```

### Hooks personnalisés
- `useFinancesTransactions()` : Gestion des transactions
- `useCommissionCalculation()` : Calculs de commissions
- `useInvoiceGeneration()` : Génération de factures
- `usePaymentProcessing()` : Traitement des paiements

## Base de données

### Tables principales
- `Commande` : Commandes et achats
- `ActiviteRemuneree_Utilisateurs` : Revenus d'activités
- `DonCagnotte` : Dons vers les cagnottes
- `VersementCommissions` : Versements de commissions
- `ServicePostMortem` : Services post-décès
- `Facture` : Factures émises
- `MoyenPaiement` : Moyens de paiement utilisés

### Vue consolidée
```sql
CREATE VIEW v_financestransactions AS
-- Consolidation de toutes les transactions financières
SELECT * FROM ActiviteRemuneree_Utilisateurs
UNION ALL
SELECT * FROM DonCagnotte  
UNION ALL
SELECT * FROM Commande
-- etc.
```

## Types de transactions

### 1. Revenus d'activités rémunérées
- **Services** rendus par les aidants
- **Calcul** selon le temps passé et tarif horaire
- **Commission** prélevée (15% par défaut)
- **Versement** à l'aidant après déduction
- **Suivi** des statuts de paiement

### 2. Commandes de produits
- **Achats** de produits du catalogue
- **Équipements médicaux** et aides techniques
- **Produits** du quotidien et alimentation
- **Commission** sur les ventes (10% par défaut)
- **Livraison** et suivi des commandes

### 3. Dons et cagnottes
- **Dons** solidaires entre utilisateurs
- **Cagnottes** pour projets spécifiques
- **Transparence** totale des montants
- **Pas de commission** prélevée
- **Traçabilité** complète des dons

### 4. Services post-mortem
- **Services** liés au décès d'un senior
- **Utilisation** des cagnottes constituées
- **Prestataires** funéraires partenaires
- **Gestion** des héritages et successions
- **Accompagnement** administratif

## Calcul des commissions

### 1. Règles de base
- **Activités rémunérées** : 15% du montant HT
- **Commandes produits** : 10% du montant HT
- **Services spécialisés** : Taux négociés individuellement
- **Volume discounts** : Réductions selon les paliers
- **Minimum garanti** : Commission minimale par transaction

### 2. Paliers de volume
- **0-1000€/mois** : Taux plein
- **1000-5000€/mois** : -1% de commission
- **5000-15000€/mois** : -2% de commission
- **+15000€/mois** : -3% de commission
- **Négociation** possible pour gros volumes

### 3. Versements
- **Périodicité** : Mensuelle par défaut
- **Seuil minimum** : 50€ de commission
- **Report** si seuil non atteint
- **Virements automatiques** le 15 du mois
- **Facture** de commission émise automatiquement

## Gestion des factures

### 1. Types de factures
- **Factures clients** : Pour les prestations
- **Factures fournisseurs** : Vers les partenaires
- **Factures de commission** : Vers AppSeniors
- **Avoirs** : Remboursements et corrections
- **Devis** : Estimations avant commande

### 2. Contenu obligatoire
- **Numéro** unique et séquentiel
- **Date** d'émission et d'échéance
- **Coordonnées** émetteur et destinataire
- **Détail** des prestations/produits
- **TVA** applicable et montants
- **Mentions légales** obligatoires

### 3. Workflow de facturation
1. **Génération** automatique après prestation
2. **Validation** par le responsable
3. **Envoi** automatique par email
4. **Suivi** des paiements
5. **Relances** automatiques si impayé

## Moyens de paiement

### 1. Paiements en ligne
- **Cartes bancaires** : Via Stripe/PayPal
- **Wallets** : Apple Pay, Google Pay
- **Virement instantané** : SEPA Instant
- **Cryptomonnaies** : Bitcoin, Ethereum (optionnel)

### 2. Paiements traditionnels
- **Chèques** : Encaissement manuel
- **Virements** : SEPA classique
- **Espèces** : Pour petits montants
- **Prélèvement** : Pour abonnements

### 3. Sécurité des paiements
- **PCI DSS** : Conformité totale
- **3D Secure** : Authentification renforcée
- **Chiffrement** : SSL/TLS pour toutes les transactions
- **Anti-fraude** : Détection automatique
- **Assurance** : Couverture des impayés

## Reporting financier

### 1. Tableaux de bord
- **Revenus** en temps réel
- **Commissions** générées
- **Marges** par type de service
- **Évolution** mensuelle/annuelle
- **Prévisions** basées sur les tendances

### 2. Rapports périodiques
- **Rapport mensuel** : Synthèse complète
- **Rapport trimestriel** : Analyse approfondie
- **Rapport annuel** : Bilan et perspectives
- **Rapports sur mesure** : Selon besoins

### 3. Analytics avancés
- **Segmentation** par utilisateur/partenaire
- **Cohort analysis** : Rétention et LTV
- **Churn rate** : Taux d'attrition
- **ROI** par canal d'acquisition
- **Prédictions** ML pour revenus futurs

## Intégrations comptables

### 1. Logiciels supportés
- **Sage** : Ligne 100, X3
- **Ciel** : Comptabilité, Gestion
- **EBP** : Comptabilité Pro
- **QuickBooks** : Version française
- **Format FEC** : Export réglementaire

### 2. Synchronisation
- **Export automatique** quotidien/hebdomadaire
- **Mapping** des comptes comptables
- **TVA** et écritures automatiques
- **Lettrage** des paiements
- **Réconciliation** bancaire

### 3. Conformité réglementaire
- **TVA** : Déclarations automatiques
- **DEB** : Déclarations d'échanges UE
- **FEC** : Fichier des écritures comptables
- **Archivage** légal des documents
- **Audit trail** complet

## Fonctionnalités avancées

### 1. Intelligence artificielle
- **Détection** de fraude en temps réel
- **Optimisation** des taux de commission
- **Prédiction** des revenus futurs
- **Segmentation** automatique des clients
- **Recommandations** de pricing

### 2. Multi-devises
- **Support** EUR, USD, GBP, CHF
- **Taux de change** temps réel
- **Facturation** en devise locale
- **Conversion** automatique
- **Couverture** de change optionnelle

### 3. API et intégrations
- **API REST** complète
- **Webhooks** pour événements
- **Intégration** banques (PSD2)
- **Connect** avec ERPs externes
- **Synchronisation** bidirectionnelle
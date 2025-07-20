# Tests - Module Finances - Ajout de Transactions

## Vue d'ensemble
Ce document décrit les jeux de tests pour toutes les fonctionnalités d'ajout de transactions dans le module Finances de l'application AppSeniors Admin.

## Prérequis
- Utilisateur connecté avec les droits d'accès au module Finances
- Base de données avec des données de test (utilisateurs, partenaires, organismes, cagnottes)

---

## 1. Tests - Ajout d'Activité Rémunérée

### Test 1.1 : Ajout d'activité rémunérée - Cas nominal
**Objectif :** Vérifier l'ajout d'une nouvelle activité rémunérée

**Étapes :**
1. Naviguer vers le module Finances
2. Cliquer sur "Ajouter une transaction"
3. Sélectionner "Activité rémunérée"
4. Remplir les champs :
   - Utilisateur : Sélectionner un senior existant
   - Montant : 150.00
   - Date : Date actuelle
   - Statut : "En attente"
5. Cliquer sur "Ajouter"

**Résultat attendu :**
- Message de succès affiché
- Transaction ajoutée dans la liste
- Commission calculée automatiquement (5% par défaut)
- Modal fermé

### Test 1.2 : Ajout d'activité rémunérée - Champs obligatoires
**Objectif :** Vérifier la validation des champs obligatoires

**Étapes :**
1. Ouvrir le formulaire d'ajout d'activité rémunérée
2. Laisser des champs obligatoires vides
3. Tenter de soumettre

**Résultat attendu :**
- Messages d'erreur pour les champs manquants
- Formulaire non soumis

### Test 1.3 : Ajout d'activité rémunérée - Montant invalide
**Étapes :**
1. Remplir le formulaire avec un montant négatif ou non numérique
2. Soumettre

**Résultat attendu :**
- Erreur de validation
- Formulaire non soumis

---

## 2. Tests - Ajout de Commande

### Test 2.1 : Ajout de commande - Cas nominal
**Objectif :** Vérifier l'ajout d'une nouvelle commande

**Étapes :**
1. Sélectionner "Commande" dans les types de transaction
2. Remplir les champs :
   - Utilisateur payeur : Sélectionner un utilisateur
   - Type de commande : "Produit"
   - Montant total : 75.50
   - Date : Date actuelle
   - Statut : "En attente"
3. Soumettre

**Résultat attendu :**
- Commande créée avec succès
- Commission calculée automatiquement
- Trigger de création de commission activé

### Test 2.2 : Ajout de commande - Validation montant
**Étapes :**
1. Saisir un montant de 0 ou négatif
2. Soumettre

**Résultat attendu :**
- Erreur de validation
- Message "Le montant doit être supérieur à 0"

---

## 3. Tests - Ajout de Commission

### Test 3.1 : Ajout de commission manuelle - Cas nominal
**Objectif :** Vérifier l'ajout d'une commission manuelle

**Étapes :**
1. Sélectionner "Commission" 
2. Remplir :
   - Type de transaction : "Autre"
   - Montant commission : 25.00
   - Date versement : Date actuelle
   - Moyen versement : "Virement"
3. Soumettre

**Résultat attendu :**
- Commission ajoutée dans VersementCommissions
- Transaction visible dans la liste

### Test 3.2 : Ajout de commission - Pourcentage invalide
**Étapes :**
1. Remplir avec un pourcentage > 100% ou < 0%
2. Soumettre

**Résultat attendu :**
- Erreur de validation
- Pourcentage limité entre 0 et 100

---

## 4. Tests - Ajout de Don Cagnotte

### Test 4.1 : Ajout de don - Cas nominal
**Objectif :** Vérifier l'ajout d'un don à une cagnotte

**Étapes :**
1. Sélectionner "Don cagnotte"
2. Remplir :
   - Cagnotte : Sélectionner une cagnotte "Ouverte"
   - Donateur : Sélectionner un utilisateur
   - Montant : 50.00
   - Message : "Don en mémoire"
   - Date : Date actuelle
3. Soumettre

**Résultat attendu :**
- Don ajouté à DonCagnotte
- Montant total de la cagnotte mis à jour
- Aucune commission (commission = 0 pour les dons)
- Statut cagnotte peut passer à "En cours"

### Test 4.2 : Don vers cagnotte fermée
**Étapes :**
1. Sélectionner une cagnotte avec statut "Terminée"
2. Tenter d'ajouter un don

**Résultat attendu :**
- Erreur : "Impossible de donner à une cagnotte fermée"
- Don non créé

### Test 4.3 : Don sans cagnotte sélectionnée
**Étapes :**
1. Laisser le champ cagnotte vide
2. Soumettre

**Résultat attendu :**
- Erreur de validation
- Message "Veuillez sélectionner une cagnotte"

---

## 5. Tests - Ajout de Service Post-Mortem

### Test 5.1 : Service post-mortem - Cas nominal complet
**Objectif :** Vérifier l'ajout d'un service post-mortem avec tous les champs

**Étapes :**
1. Sélectionner "Service post-mortem"
2. Remplir tous les champs :
   - Nom service : "Crémation"
   - Description : "Service de crémation complet"
   - Montant : 2500.00
   - Date service : Date actuelle
   - Prestataire : "Pompes Funèbres Martin"
   - Créateur : Sélectionner un utilisateur Admin/Aidant
   - Cagnotte associée : Sélectionner une cagnotte
3. Soumettre

**Résultat attendu :**
- Service post-mortem créé avec IDCreateur
- Commission calculée (trigger activé)
- Lien avec cagnotte établi si sélectionnée

### Test 5.2 : Service post-mortem - Sans cagnotte
**Étapes :**
1. Remplir le formulaire sans sélectionner de cagnotte
2. Soumettre

**Résultat attendu :**
- Service créé avec IDCagnotteDeces = NULL
- Reste fonctionnel

### Test 5.3 : Service post-mortem - Créateur invalide
**Étapes :**
1. Ne pas sélectionner de créateur
2. Soumettre

**Résultat attendu :**
- Erreur : "Veuillez sélectionner un créateur"
- Formulaire non soumis

### Test 5.4 : Validation limites de caractères
**Étapes :**
1. Saisir plus de 50 caractères dans Nom service
2. Saisir plus de 50 caractères dans Description
3. Soumettre

**Résultat attendu :**
- Champs tronqués à 50 caractères max
- Validation côté interface

---

## 6. Tests - Ajout de Cagnotte

### Test 6.1 : Création de cagnotte - Cas nominal
**Objectif :** Vérifier la création d'une nouvelle cagnotte

**Étapes :**
1. Sélectionner "Ajouter Cagnotte"
2. Remplir :
   - Titre : "Mémoire de Jean Dupont"
   - Description : "Cagnotte pour les obsèques"
   - Senior : Sélectionner un senior
   - Date ouverture : Date actuelle
   - Date clôture : Date future (+30 jours)
3. Soumettre

**Résultat attendu :**
- Cagnotte créée avec statut "Ouverte"
- MontantTotal initialisé à 0
- Trigger d'initialisation activé

### Test 6.2 : Cagnotte - Dates invalides
**Étapes :**
1. Date clôture antérieure à date ouverture
2. Soumettre

**Résultat attendu :**
- Erreur : "La date de clôture doit être postérieure à l'ouverture"

---

## 7. Tests - Intégration et Commissions

### Test 7.1 : Calcul automatique des commissions
**Objectif :** Vérifier que les triggers de commission fonctionnent

**Étapes :**
1. Ajouter une activité rémunérée de 100€
2. Vérifier dans VersementCommissions

**Résultat attendu :**
- Commission de 5€ créée automatiquement (5%)
- TypeTransaction = "Activite"

### Test 7.2 : Commission personnalisée
**Étapes :**
1. Modifier le pourcentage dans ParametresCommission pour "Commande" → 10%
2. Ajouter une commande de 200€
3. Vérifier la commission

**Résultat attendu :**
- Commission de 20€ (10%)

### Test 7.3 : Commission pour don (doit être 0)
**Étapes :**
1. Ajouter un don de 100€
2. Vérifier VersementCommissions

**Résultat attendu :**
- Commission = 0€ pour les dons
- Enregistrement créé mais montant = 0

---

## 8. Tests - Interface et UX

### Test 8.1 : Navigation entre types
**Étapes :**
1. Ouvrir différents types de formulaires
2. Vérifier que les champs spécifiques apparaissent

**Résultat attendu :**
- Formulaires adaptés à chaque type
- Pas de champs résiduels

### Test 8.2 : Messages utilisateur
**Étapes :**
1. Tester tous les cas de succès/erreur
2. Vérifier les toasts

**Résultat attendu :**
- Messages clairs et informatifs
- Pas d'erreurs techniques exposées

### Test 8.3 : Actualisation des listes
**Étapes :**
1. Ajouter une transaction
2. Vérifier que la liste se met à jour

**Résultat attendu :**
- Nouvelle transaction visible immédiatement
- Totaux recalculés

---

## 9. Tests - Cas Limites et Erreurs

### Test 9.1 : Connexion base de données perdue
**Simulation :** Couper temporairement la connexion

**Résultat attendu :**
- Messages d'erreur appropriés
- Pas de crash d'application

### Test 9.2 : Utilisateurs supprimés
**Étapes :**
1. Référencer un utilisateur puis le supprimer
2. Tenter d'ajouter une transaction

**Résultat attendu :**
- Gestion gracieuse des références cassées

### Test 9.3 : Montants très élevés
**Étapes :**
1. Saisir un montant > 999999
2. Vérifier le traitement

**Résultat attendu :**
- Validation des limites numériques
- Pas d'overflow

---

## 10. Tests de Performance

### Test 10.1 : Ajout en masse
**Étapes :**
1. Ajouter 50 transactions rapidement
2. Mesurer les temps de réponse

**Résultat attendu :**
- Performance acceptable (<2s par transaction)
- Pas de dégradation progressive

### Test 10.2 : Concurrent users
**Simulation :** Plusieurs utilisateurs ajoutent simultanément

**Résultat attendu :**
- Pas de conflits de données
- Cohérence des commissions

---

## Critères de Validation Globaux

✅ **Succès si :**
- Tous les types de transactions peuvent être ajoutés
- Commissions calculées correctement
- Triggers fonctionnent
- Interface responsive et intuitive
- Validation appropriée
- Messages d'erreur clairs

❌ **Échec si :**
- Crash lors d'ajout
- Commissions incorrectes
- Données incohérentes
- Interface cassée
- Erreurs SQL exposées

---

## Données de Test Requises

**Utilisateurs :**
- 1 Admin (IDCatUtilisateurs = 5)
- 1 Aidant (IDCatUtilisateurs = 4) 
- 2 Seniors (IDCatUtilisateurs = 1)

**Cagnottes :**
- 1 Cagnotte "Ouverte"
- 1 Cagnotte "En cours"
- 1 Cagnotte "Terminée"

**Paramètres :**
- Commission par défaut : 5%
- Commissions spécifiques par type

## Notes d'Exécution
- Tester sur différents navigateurs
- Vérifier responsive mobile
- Tester avec/sans JavaScript
- Valider accessibilité
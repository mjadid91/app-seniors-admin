
# Tests manuels - Gestion des Partenaires

## 🎯 Objectif
Vérifier la gestion complète de l'écosystème partenaires avec des exemples concrets de l'application AppSeniors.

## 🤝 Gestion des partenaires réels

### ✅ Scénario : Création d'un partenaire - Pharmacie
**Données de test :**
- **Raison sociale :** Pharmacie du Centre
- **Secteur d'activité :** Santé
- **Adresse :** 45 avenue de la République, 75011 Paris
- **Téléphone :** 01 43 55 67 89
- **Email :** contact@pharmacie-centre.fr
- **Site web :** www.pharmacie-centre.fr
- **Contact principal :** Dr. Marie Lefevre
- **Type de partenariat :** Commercial
- **Zone de couverture :** Locale (Paris 11e)

**Conditions commerciales :**
- **Commission négociée :** 3% sur les ventes
- **Remise seniors :** 10% sur médicaments non remboursés
- **Livraison gratuite :** Commandes > 30€

**Étapes :**
1. Se connecter en tant qu'admin@appseniors.fr
2. Aller dans Partenaires → Ajouter un partenaire
3. Remplir toutes les informations
4. Négocier les conditions commerciales
5. Valider la création

**Résultat attendu :**
- Partenaire créé avec statut "Actif"
- Email de bienvenue envoyé avec guide partenaire
- Accès créé pour la Pharmacie du Centre
- Prêt à créer des bons plans

### ✅ Scénario : Création d'un partenaire - Service de transport
**Données de test :**
- **Raison sociale :** TransSenior Plus
- **Secteur d'activité :** Services
- **Adresse :** 12 rue Gambetta, 69001 Lyon
- **Téléphone :** 04 78 90 12 34
- **Email :** reservation@transsenior.fr
- **Contact principal :** Pierre Dubois
- **Type de partenariat :** Institutionnel
- **Zone de couverture :** Régionale (Auvergne-Rhône-Alpes)

**Services proposés :**
- Transport médical non médicalisé
- Accompagnement courses
- Sorties loisirs/culture
- Transport aéroport

**Étapes :**
1. Créer le partenaire avec toutes les informations
2. Configurer la zone de couverture régionale
3. Ajouter les services dans le catalogue
4. Définir la grille tarifaire négociée

**Résultat attendu :**
- Partenaire visible pour tous les seniors de la région
- Services disponibles dans le catalogue
- Tarifs préférentiels appliqués automatiquement

## 🎫 Gestion des bons plans réalistes

### ✅ Scénario : Bon plan Pharmacie - Réduction sur produits santé
**Partenaire :** Pharmacie du Centre
**Données du bon plan :**
- **Titre :** 15% de réduction sur les produits de parapharmacie
- **Description :** Réduction sur compléments alimentaires, matériel médical, cosmétiques seniors
- **Type de réduction :** Pourcentage
- **Valeur :** 15%
- **Code promo :** SENIOR15
- **Date de début :** 01/06/2024
- **Date de fin :** 31/08/2024
- **Nombre d'utilisations max :** 500
- **Conditions :** Valable uniquement en magasin, sur présentation de la carte AppSeniors

**Étapes :**
1. Accéder au profil Pharmacie du Centre
2. Section "Bons plans" → Créer un bon plan
3. Remplir toutes les informations
4. Générer le code promo unique
5. Définir les conditions d'utilisation
6. Activer le bon plan

**Résultat attendu :**
- Bon plan actif immédiatement
- Visible pour tous les seniors
- Code promo généré automatiquement
- Email de notification aux seniors de Paris 11e

### ✅ Scénario : Bon plan Transport - Service gratuit première commande
**Partenaire :** TransSenior Plus
**Données du bon plan :**
- **Titre :** Premier transport médical gratuit
- **Description :** Offre découverte pour les nouveaux clients AppSeniors
- **Type de réduction :** Service gratuit
- **Valeur :** Transport gratuit jusqu'à 25€
- **Code promo :** DECOUVERTE2024
- **Date de début :** 15/05/2024
- **Date de fin :** 31/12/2024
- **Utilisation :** 1 fois par utilisateur
- **Zone :** Auvergne-Rhône-Alpes uniquement

**Étapes :**
1. Créer le bon plan depuis le profil TransSenior Plus
2. Sélectionner "Service gratuit"
3. Limiter à 1 utilisation par utilisateur
4. Restreindre à la zone géographique
5. Activer avec validation automatique

**Résultat attendu :**
- Bon plan visible seulement dans la région
- Limitation 1 fois par senior respectée
- Suivi des utilisations en temps réel

### ✅ Scénario : Bon plan Optique - Montant fixe
**Partenaire :** OptiquePlus (créé préalablement)
**Données du bon plan :**
- **Titre :** 50€ de réduction sur toute monture
- **Description :** Réduction de 50€ sur l'achat d'une monture + verres correcteurs
- **Type de réduction :** Montant fixe
- **Valeur :** 50€
- **Code promo :** OPTIQUE50
- **Date de début :** 01/05/2024
- **Date de fin :** 30/06/2024
- **Nombre max :** 200 utilisations
- **Conditions :** Achat minimum 150€, non cumulable

**Résultat attendu :**
- Réduction de 50€ appliquée automatiquement
- Vérification du montant minimum (150€)
- Compteur d'utilisations mis à jour

## 📊 Suivi des utilisations réelles

### ✅ Scénario : Utilisation du bon plan Pharmacie par Marcel Durand
**Senior :** Marcel Durand, 85 ans, Paris 12e
**Bon plan :** 15% réduction Pharmacie du Centre
**Achat :** Compléments alimentaires vitamine D (32€)

**Étapes d'utilisation :**
1. Marcel se rend à la Pharmacie du Centre
2. Présente sa carte AppSeniors + code SENIOR15
3. Pharmacien applique la réduction 15%
4. Achat validé : 32€ - 4.80€ = 27.20€
5. Utilisation enregistrée dans le système

**Résultat attendu :**
- Utilisation comptabilisée (1/500)
- Marcel ne peut plus utiliser ce bon plan
- Commission calculée : 3% de 27.20€ = 0.82€
- Statistiques mises à jour

### ✅ Scénario : Bon plan épuisé - Limitation atteinte
**Bon plan :** Premier transport gratuit (200 utilisations max)
**Situation :** 200ème utilisation atteinte

**Test :**
1. Vérifier le compteur à 199/200
2. Un senior utilise le bon plan (200ème)
3. Vérifier le passage automatique en "Épuisé"
4. Tenter une nouvelle utilisation

**Résultat attendu :**
- Statut automatiquement passé à "Épuisé"
- Plus visible pour les nouveaux seniors
- Message explicatif "Ce bon plan a atteint sa limite"
- Notification envoyée au partenaire

## 💰 Facturation et commissions

### ✅ Scénario : Calcul mensuel des commissions - Pharmacie du Centre
**Période :** Mai 2024
**Utilisations du mois :**
- 45 utilisations du bon plan 15%
- Chiffre d'affaires généré : 1,350€
- Commission due : 3% = 40.50€

**Détail des utilisations :**
- Semaine 1 : 12 utilisations, 360€ CA
- Semaine 2 : 15 utilisations, 405€ CA
- Semaine 3 : 10 utilisations, 300€ CA
- Semaine 4 : 8 utilisations, 285€ CA

**Étapes :**
1. Générer le rapport mensuel automatiquement
2. Calculer la commission (1,350€ × 3%)
3. Vérifier le seuil minimum (40.50€ > 10€ ✓)
4. Programmer le versement du 15 juin

**Résultat attendu :**
- Facture générée automatiquement
- Email envoyé à la Pharmacie du Centre
- Versement programmé le 15/06/2024
- Récapitulatif détaillé des utilisations

### ✅ Scénario : Commission en dessous du seuil minimum
**Partenaire :** Restaurant "Le Petit Senior" (nouveau)
**Période :** Premier mois
**Activité :**
- 3 utilisations seulement
- Chiffre d'affaires : 75€
- Commission calculée : 5% = 3.75€

**Traitement :**
1. Commission calculée : 3.75€ < 10€ (seuil minimum)
2. Montant reporté au mois suivant
3. Notification automatique au partenaire

**Résultat attendu :**
- Pas de versement ce mois-ci
- Montant cumulé pour le mois suivant
- Email explicatif envoyé au restaurant

## 📈 Rapports et statistiques détaillés

### ✅ Scénario : Rapport de performance trimestriel
**Période :** Q1 2024 (janvier-mars)
**Partenaires analysés :** Tous secteurs confondus

**Statistiques globales attendues :**
- **Nombre de partenaires :** 47
  - Secteur Santé : 18 (38%)
  - Secteur Services : 15 (32%)
  - Secteur Commerce : 14 (30%)

**Top 5 des partenaires (CA généré) :**
1. Pharmacie du Centre : 4,250€
2. TransSenior Plus : 3,890€
3. OptiquePlus : 3,120€
4. SuperMarché Senior : 2,780€
5. Coiffure à Domicile : 2,340€

**Bons plans les plus utilisés :**
1. 15% Pharmacie (234 utilisations)
2. Transport gratuit (198 utilisations)
3. 50€ OptiquePlus (145 utilisations)

**Étapes :**
1. Générer le rapport trimestriel automatique
2. Analyser les tendances par secteur
3. Identifier les partenaires performants
4. Préparer les recommandations

**Résultat attendu :**
- Rapport PDF généré automatiquement
- Graphiques d'évolution par mois
- Recommandations pour les partenaires peu actifs
- Planning des actions commerciales Q2

## 🔍 Recherche et filtrage avancé

### ✅ Scénario : Recherche de partenaires par critères multiples
**Critères de recherche :**
- **Secteur :** Santé
- **Zone :** Île-de-France
- **Statut :** Actif
- **Bons plans disponibles :** Oui
- **Note moyenne :** > 4/5

**Résultats attendus :**
1. Pharmacie du Centre (4.2/5, Paris 11e)
2. Cabinet Dentaire Sourire (4.5/5, Paris 15e)
3. Optique Vision Plus (4.1/5, Boulogne)

**Test :**
1. Appliquer tous les filtres simultanément
2. Vérifier la cohérence des résultats
3. Tester le tri par note/distance
4. Exporter la liste en Excel

## 📱 Interface mobile et responsive

### ✅ Scénario : Consultation des bons plans sur mobile senior
**Utilisateur :** Marcel Durand sur son smartphone
**Objectif :** Trouver une pharmacie proche avec bon plan

**Étapes mobile :**
1. Ouvrir l'app AppSeniors
2. Section "Bons plans près de moi"
3. Géolocalisation automatique (Paris 12e)
4. Filtrer par "Santé"
5. Consulter les détails Pharmacie du Centre

**Résultat attendu :**
- Interface simplifiée et lisible
- Boutons larges adaptés aux seniors
- Géolocalisation précise
- Appel direct d'un clic
- Itinéraire GPS intégré

## 🔔 Notifications et communication

### ✅ Scénario : Notifications automatiques aux partenaires
**Déclencheurs de notifications :**

1. **Nouveau bon plan activé :**
   - Email automatique de confirmation
   - Rappel des conditions d'utilisation
   - Lien vers les statistiques

2. **Seuil d'alerte atteint (80% utilisations) :**
   - Pharmacie du Centre : 400/500 utilisations
   - Email d'alerte automatique
   - Proposition de prolongation

3. **Expiration proche (7 jours) :**
   - OptiquePlus : expire le 30/06/2024
   - Rappel envoyé le 23/06/2024
   - Proposition de renouvellement

**Résultat attendu :**
- Emails personnalisés et contextuels
- Liens directs vers les actions
- Suivi des ouvertures et clics

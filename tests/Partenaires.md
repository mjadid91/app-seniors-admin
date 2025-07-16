
# Tests manuels - Gestion des Partenaires

## 🎯 Objectif
Vérifier la gestion complète de l'écosystème des partenaires et leurs offres promotionnelles.

## 🤝 Gestion des partenaires

### Création d'un partenaire
- [ ] Créer un partenaire avec tous les champs obligatoires
- [ ] Vérifier la validation des champs (Raison sociale, Email, Téléphone, Adresse)
- [ ] Sélectionner le type de partenariat (Commercial, Institutionnel, Associatif)
- [ ] Définir le statut (Actif, Inactif, En négociation, Suspendu)
- [ ] Ajouter les informations du contact principal

### Profil partenaire complet
- [ ] Ajouter une description et un logo
- [ ] Définir le secteur d'activité (Santé, Services, Commerce, Loisirs)
- [ ] Configurer la zone de couverture (Locale, Régionale, Nationale)
- [ ] Négocier les conditions commerciales
- [ ] Ajouter le site web et les réseaux sociaux

### Modification de partenaire
- [ ] Modifier les informations générales
- [ ] Changer le statut du partenariat
- [ ] Mettre à jour les conditions commerciales
- [ ] Vérifier l'impact sur les bons plans actifs

## 🎫 Gestion des bons plans

### Création d'offres
- [ ] Créer un bon plan avec titre et description
- [ ] Définir le type de réduction (Pourcentage, Montant fixe, Service gratuit)
- [ ] Configurer la valeur de la réduction
- [ ] Définir la période de validité (date début/fin)
- [ ] Générer ou saisir un code promo unique
- [ ] Limiter le nombre d'utilisations maximum

### Types de réductions
- [ ] Tester les réductions en pourcentage (5%, 10%, 20%)
- [ ] Tester les montants fixes (5€, 10€, 50€)
- [ ] Tester les services gratuits
- [ ] Vérifier les calculs automatiques de réduction

### Restrictions et conditions
- [ ] Définir un âge minimum
- [ ] Limiter à une zone géographique
- [ ] Restreindre aux premières commandes
- [ ] Ajouter des conditions d'utilisation spécifiques

## 📊 Suivi des utilisations

### Statistiques par bon plan
- [ ] Voir le nombre d'utilisations actuelles
- [ ] Calculer le taux de conversion
- [ ] Identifier les utilisateurs ayant utilisé le bon plan
- [ ] Analyser la performance par période

### Gestion des statuts
- [ ] Bon plan actif et utilisable
- [ ] Bon plan inactif (désactivé manuellement)
- [ ] Bon plan expiré (date dépassée)
- [ ] Bon plan épuisé (limite d'utilisation atteinte)

## 🛍️ Services partenaires

### Catalogue de services
- [ ] Ajouter des services proposés par le partenaire
- [ ] Définir une grille tarifaire négociée
- [ ] Configurer les créneaux de disponibilité
- [ ] Spécifier les zones de service
- [ ] Ajouter les conditions particulières

## 🔒 Permissions par rôle
- [ ] Administrateur : Accès complet à toutes les fonctions
- [ ] Modérateur : Lecture seule
- [ ] Support : Lecture seule
- [ ] Visualisateur : Consultation des partenaires et statistiques

## 📈 Rapports et statistiques

### Statistiques par partenaire
- [ ] Nombre de bons plans actifs
- [ ] Total des utilisations
- [ ] Chiffre d'affaires généré
- [ ] Nombre de clients uniques touchés
- [ ] Taux de conversion moyen

### Performance des offres
- [ ] Identifier le meilleur bon plan
- [ ] Analyser les tendances d'utilisation
- [ ] Comparer les performances par secteur
- [ ] Générer des rapports mensuels

## 💰 Facturation et commissions
- [ ] Calculer la commission variable selon le partenariat
- [ ] Générer la facturation mensuelle
- [ ] Récapituler les utilisations par période
- [ ] Gérer les remboursements en cas d'annulation

## 🔔 Notifications automatiques

### Notifications partenaire
- [ ] Email de bienvenue avec guide
- [ ] Confirmation de création de bon plan
- [ ] Alerte à 80% des utilisations max
- [ ] Notification 7 jours avant expiration

### Rapports périodiques
- [ ] Rapport d'activité mensuel automatique
- [ ] Statistiques d'utilisation des bons plans
- [ ] Performance comparative

## 🔍 Recherche et filtrage

### Filtres partenaires
- [ ] Filtrer par statut (Actif, Inactif, etc.)
- [ ] Filtrer par secteur d'activité
- [ ] Filtrer par zone de couverture
- [ ] Recherche par nom/secteur

### Filtres bons plans
- [ ] Filtrer par partenaire
- [ ] Filtrer par statut (actif, inactif, expiré)
- [ ] Filtrer par type de réduction
- [ ] Filtrer par période de validité

## 📱 Interface responsive
- [ ] Vérifier l'affichage des cartes partenaires sur mobile
- [ ] Tester la création de bon plan sur tablette
- [ ] Contrôler la navigation des statistiques
- [ ] Vérifier l'affichage des graphiques

## ⚠️ Validation et règles métier
- [ ] Vérifier la cohérence des dates (fin > début)
- [ ] Valider les réductions (pourcentage 1-100%, montant > 0)
- [ ] Contrôler l'unicité des codes promo
- [ ] Respecter les limites d'utilisation
- [ ] Vérifier les calculs de facturation

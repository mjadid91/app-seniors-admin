
# Tests manuels - Dashboard

## 🎯 Objectif
Vérifier l'affichage du tableau de bord avec des données réelles de l'application AppSeniors.

## 📊 Statistiques avec données réelles

### ✅ Scénario : Vérification des compteurs principaux
**Utilisateur connecté :** admin@appseniors.fr

**Données attendues :**
- **Utilisateurs totaux :** ~1,247 utilisateurs
- **Seniors actifs :** ~834 seniors
- **Aidants disponibles :** ~156 aidants
- **Prestations ce mois :** ~89 prestations

**Étapes :**
1. Se connecter en tant qu'administrateur
2. Observer les 4 cards de statistiques
3. Vérifier la cohérence des données
4. Comparer avec les données de la base

**Résultat attendu :**
- Chiffres réalistes et cohérents
- Évolution par rapport au mois précédent
- Icônes colorées appropriées

### ✅ Scénario : Statistiques financières
**Données attendues :**
- **Revenus du mois :** 12,450€
- **Commissions perçues :** 623€
- **Tickets support en attente :** 7 tickets
- **Signalements non traités :** 3 signalements

**Résultat attendu :**
- Montants formatés en euros
- Pourcentages d'évolution visibles
- Codes couleur appropriés (vert/rouge)

## 📈 Graphiques avec données réelles

### ✅ Scénario : Évolution mensuelle des inscriptions
**Données de test :**
- **Janvier 2024 :** 45 inscriptions
- **Février 2024 :** 52 inscriptions  
- **Mars 2024 :** 67 inscriptions
- **Avril 2024 :** 71 inscriptions
- **Mai 2024 :** 63 inscriptions

**Résultat attendu :**
- Graphique en aires avec tendance croissante
- Tooltips informatifs au survol
- Couleurs cohérentes avec le design

### ✅ Scénario : Répartition des prestations par domaine
**Données attendues :**
- **Aide à domicile :** 35% (245 prestations)
- **Soins et santé :** 28% (196 prestations)
- **Courses et transports :** 22% (154 prestations)
- **Jardinage :** 15% (105 prestations)

**Résultat attendu :**
- Graphique circulaire lisible
- Légende avec pourcentages
- Couleurs distinctes pour chaque segment

## 🔄 Activités récentes réelles

### ✅ Scénario : Liste des 10 dernières activités
**Exemples d'activités attendues :**

1. **09:15** - Nouvelle inscription : Marie Dubois (Senior)
2. **08:47** - Prestation terminée : Aide ménagère chez M. Martin
3. **08:32** - Ticket support créé : Problème de connexion
4. **Hier 17:23** - Partenaire ajouté : Pharmacie du Centre
5. **Hier 16:45** - Évaluation reçue : 5⭐ pour Sophie L.
6. **Hier 15:12** - Commande finalisée : Matériel médical (234€)
7. **27/05 14:30** - Signalement traité : Contenu inapproprié
8. **27/05 11:45** - Don reçu : 50€ pour cagnotte M. Durand
9. **26/05 16:20** - Nouveau bon plan : -20% chez OptiquePlus
10. **26/05 09:15** - Utilisateur activé : Pierre Leroy (Aidant)

**Résultat attendu :**
- Format d'heure cohérent
- Types d'activités variés
- Liens cliquables vers les détails
- Scroll si plus de 10 éléments

## 👥 Permissions par rôle

### ✅ Scénario : Dashboard Modérateur
**Utilisateur :** moderateur@appseniors.fr

**Données visibles attendues :**
- Statistiques utilisateurs (lecture seule)
- Signalements et modération
- Tickets support
- Pas d'accès aux finances

### ✅ Scénario : Dashboard Support
**Utilisateur :** support@appseniors.fr

**Données visibles attendues :**
- Tickets support uniquement
- Statistiques limitées
- Pas d'accès aux revenus

## 📱 Tests responsive avec données

### ✅ Scénario : Dashboard mobile (375px)
1. Se connecter sur iPhone
2. Vérifier l'empilement vertical des cards
3. Tester le scroll des graphiques
4. Vérifier la liste d'activités

**Résultat attendu :**
- Cards empilées verticalement
- Graphiques adaptés à la largeur
- Navigation tactile fluide

### ✅ Scénario : Dashboard tablette (768px)
1. Se connecter sur iPad
2. Vérifier la grille 2x2 des statistiques
3. Tester les graphiques en mode paysage

**Résultat attendu :**
- Layout optimisé tablette
- Graphiques plus larges
- Meilleure utilisation de l'espace

## ⚡ Performance avec vraies données

### ✅ Scénario : Temps de chargement
**Critères :**
- Chargement initial < 3 secondes
- Actualisation des stats < 1 seconde
- Graphiques < 2 secondes

**Test :**
1. Chronométrer le chargement à la connexion
2. Actualiser manuellement les données
3. Observer la fluidité

**Résultat attendu :**
- Interface réactive
- Pas de blocage utilisateur
- Skeletons pendant le chargement

### ✅ Scénario : Actualisation automatique
1. Laisser le dashboard ouvert 30 minutes
2. Vérifier la mise à jour des statistiques
3. Observer les nouvelles activités

**Résultat attendu :**
- Données actualisées automatiquement
- Pas de rechargement complet de page
- Compteurs mis à jour en temps réel

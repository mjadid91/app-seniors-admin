
# Tests manuels - Gestion des Prestations

## 🎯 Objectif
Vérifier la gestion complète des prestations avec des scénarios réels de l'écosystème AppSeniors.

## 🛠️ Gestion des prestations

### ✅ Scénario : Création d'une prestation "Aide ménagère"
**Données de test :**
- **Titre :** Aide ménagère hebdomadaire
- **Description :** Ménage complet du logement, repassage, rangement
- **Domaine :** Aide à domicile
- **Durée estimée :** 3 heures
- **Tarif indicatif :** 18€/heure
- **Prérequis :** Aucune allergie produits ménagers
- **Zone géographique :** Paris 12e arrondissement

**Étapes :**
1. Se connecter en tant qu'admin@appseniors.fr
2. Aller dans Prestations → Créer une prestation
3. Remplir tous les champs
4. Associer au domaine "Aide à domicile"
5. Valider la création

**Résultat attendu :**
- Prestation créée avec ID unique
- Statut "Active" par défaut
- Visible dans le catalogue des prestations
- Disponible pour les mises en relation

### ✅ Scénario : Création d'une prestation "Soins d'hygiène"
**Données de test :**
- **Titre :** Aide à la toilette et habillage
- **Description :** Assistance pour la toilette quotidienne, habillage, coiffage
- **Domaine :** Soins et santé
- **Durée estimée :** 1h30
- **Tarif indicatif :** 25€/heure
- **Prérequis :** Formation aide-soignant ou auxiliaire de vie
- **Matériel requis :** Gants, produits d'hygiène adaptés

**Résultat attendu :**
- Prestation créée dans la catégorie "Soins"
- Prérequis de formation bien spécifiés
- Tarif plus élevé reflétant la spécialisation

## 📋 Suivi des prestations avec données réelles

### ✅ Scénario : Demande de prestation par un senior
**Senior demandeur :** Marcel Durand (85 ans, Paris 12e)
**Prestation demandée :** Aide ménagère hebdomadaire
**Contexte :** Marcel vit seul, mobilité réduite, besoin d'aide régulière

**Données de la demande :**
- **Date souhaitée :** Mercredi 15 mai 2024, 14h
- **Fréquence :** Hebdomadaire
- **Budget maximum :** 20€/heure
- **Commentaires :** "Préfère une personne expérimentée avec les seniors"

**Étapes :**
1. Créer la demande au nom de Marcel Durand
2. Sélectionner "Aide ménagère hebdomadaire"
3. Définir les créneaux souhaités
4. Spécifier les préférences
5. Valider la demande

**Résultat attendu :**
- Demande créée avec statut "En attente"
- Système de matching automatique activé
- Notifications envoyées aux aidants qualifiés

### ✅ Scénario : Attribution automatique d'aidant
**Aidants potentiels dans Paris 12e :**
1. **Sofia Lopez** - 18€/h, note 4.1/5, disponible mercredi
2. **Marie Dubois** - 19€/h, note 4.3/5, disponible mercredi
3. **Pierre Martin** - 20€/h, note 4.0/5, disponible mercredi

**Critères de matching :**
- Distance < 10km ✓
- Compétence "Aide ménagère" ✓
- Disponible mercredi 14h ✓
- Tarif ≤ 20€/h ✓

**Étapes :**
1. Lancer l'algorithme de matching
2. Vérifier les propositions d'aidants
3. Consulter les profils et évaluations
4. Valider l'attribution

**Résultat attendu :**
- Sofia Lopez proposée en premier (meilleur rapport qualité/prix)
- Marcel peut consulter son profil et évaluations
- Possibilité de choisir un autre aidant

### ✅ Scénario : Prestation en cours - Jour J
**Attribution confirmée :** Sofia Lopez chez Marcel Durand
**Date :** Mercredi 15 mai 2024, 14h-17h
**Statut :** En cours

**Suivi temps réel :**
- **13h45** - Sofia signale son arrivée imminente
- **14h00** - Début de prestation confirmé
- **17h00** - Fin de prestation, Sofia saisit le rapport

**Rapport de Sofia :**
- Tâches réalisées : Ménage complet 3 pièces, repassage, rangement
- Durée effective : 3h exactement
- Observations : "M. Durand très accueillant, logement bien organisé"
- Photos avant/après : 2 photos jointes

**Résultat attendu :**
- Statut automatiquement passé à "Terminée"
- Facturation générée (54€ = 3h × 18€)
- Commission plateforme calculée (2.70€ = 5%)
- Notification envoyée à Marcel pour évaluation

## ⭐ Évaluations et qualité

### ✅ Scénario : Évaluation positive de Marcel vers Sofia
**Données d'évaluation :**
- **Note globale :** 5/5 étoiles
- **Critères détaillés :**
  - Ponctualité : 5/5 (arrivée à l'heure)
  - Qualité du travail : 5/5 (ménage impeccable)
  - Communication : 5/5 (très agréable)
  - Respect des consignes : 5/5 (tout respecté)
- **Commentaire :** "Travail parfait, Sofia est très professionnelle et sympathique. Je la recommande vivement !"
- **Renouvellement :** Oui, même créneau la semaine prochaine

**Étapes :**
1. Marcel reçoit la demande d'évaluation par email
2. Il accède au formulaire d'évaluation
3. Attribue les notes par critère
4. Ajoute son commentaire
5. Confirme le renouvellement

**Résultat attendu :**
- Note moyenne de Sofia mise à jour (4.1 → 4.2/5)
- Badge "Excellente prestation" attribué
- Programmation automatique de la prestation suivante
- Bonus de fidélité pour Sofia

### ✅ Scénario : Évaluation négative nécessitant un suivi
**Prestation :** Soins d'hygiène chez Mme Moreau (92 ans)
**Aidant :** Jean Dupont
**Problème :** Retard de 45 minutes, prestation écourtée

**Évaluation de Mme Moreau :**
- **Note globale :** 2/5 étoiles
- **Critères :**
  - Ponctualité : 1/5 (très en retard)
  - Qualité : 3/5 (correct mais rapide)
  - Communication : 2/5 (pas d'excuse)
- **Commentaire :** "Très déçue, arrivé très en retard sans prévenir. Service bâclé."

**Étapes :**
1. Évaluation saisie par la famille de Mme Moreau
2. Alerte automatique générée (note < 3)
3. Signalement créé automatiquement
4. Investigation par l'équipe support

**Résultat attendu :**
- Note moyenne de Jean dégradée
- Alerte envoyée à l'équipe qualité
- Contact avec Jean pour explications
- Possible formation ou sanction

## 💰 Gestion des tarifs et facturation

### ✅ Scénario : Négociation tarifaire pour prestation récurrente
**Contexte :** Marcel souhaite négocier le tarif pour un contrat hebdomadaire
**Tarif initial Sofia :** 18€/h
**Demande Marcel :** 16€/h pour engagement 6 mois

**Négociation :**
1. Marcel fait une contre-proposition via la plateforme
2. Sofia reçoit la notification
3. Sofia accepte 17€/h pour 6 mois minimum
4. Contrat modifié et re-signé

**Résultat attendu :**
- Nouveau tarif appliqué : 17€/h
- Commission recalculée : 5% de 17€ = 0.85€/h
- Contrat d'engagement généré automatiquement
- Planning des 26 prochaines prestations créé

### ✅ Scénario : Gestion d'annulation avec pénalités
**Prestation :** Aide ménagère prévue demain 14h
**Demande d'annulation :** Marcel, ce matin 10h (28h avant)
**Motif :** Rendez-vous médical imprévu

**Règles d'annulation :**
- \> 24h : Gratuit
- 2-24h : 20% du montant
- < 2h : 50% du montant
- No-show : 100% du montant

**Étapes :**
1. Marcel demande l'annulation via l'app
2. Calcul automatique : 28h > 24h = Gratuit
3. Sofia notifiée immédiatement
4. Créneau libéré pour autres demandes

**Résultat attendu :**
- Annulation gratuite confirmée
- Sofia peut accepter une autre demande
- Nouvelle prestation programmée automatiquement la semaine suivante
- Aucun frais appliqué

## 🔔 Notifications et automatisations

### ✅ Scénario : Rappels automatiques de prestation
**Prestation :** Demain mercredi 14h, Sofia chez Marcel

**Timeline des notifications :**
- **24h avant (mardi 14h) :** Rappel à Sofia et Marcel
- **2h avant (mercredi 12h) :** Rappel final avec détails
- **30 min avant :** SMS de géolocalisation à Marcel
- **À l'heure H :** Notification "Prestation débutée ?"

**Contenu type des rappels :**
- **À Sofia :** "Rappel : Prestation demain 14h chez M. Durand, 12 rue des Lilas"
- **À Marcel :** "Sofia arrive demain 14h pour l'aide ménagère. Tel: 06 98 76 54 32"

**Résultat attendu :**
- Tous les rappels envoyés automatiquement
- Possibilité de confirmer/annuler dans chaque message
- Géolocalisation partagée si acceptée

## 📊 Filtres et recherche avancée

### ✅ Scénario : Recherche de prestations par critères multiples
**Critères de recherche :**
- **Domaine :** Aide à domicile
- **Zone :** Paris 12e, 13e, 20e
- **Tarif max :** 20€/h
- **Disponibilité :** Mercredi après-midi
- **Note minimum :** 4/5

**Résultats attendus :**
- Sofia Lopez : Aide ménagère (18€/h, 4.2/5)
- Marie Dubois : Aide ménagère + repassage (19€/h, 4.3/5)
- Claude Martin : Aide ménagère + courses (20€/h, 4.1/5)

**Test :**
1. Appliquer tous les filtres
2. Vérifier la pertinence des résultats
3. Tester le tri par note, prix, distance
4. Sauvegarder la recherche pour Marcel

## 📱 Tests mobile et responsive

### ✅ Scénario : Suivi de prestation sur mobile (aidant)
**Appareil :** iPhone de Sofia
**Prestation :** En cours chez Marcel

**Actions mobiles :**
1. Signaler l'arrivée (géolocalisation)
2. Prendre photo avant/après
3. Saisir le rapport d'intervention
4. Demander l'évaluation au senior

**Résultat attendu :**
- Interface optimisée tactile
- Photos géolocalisées automatiquement
- Rapport dictée vocale possible
- Synchronisation temps réel avec la plateforme

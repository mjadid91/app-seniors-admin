
# Tests manuels - Gestion des Prestations

## 🎯 Objectif
Vérifier la gestion complète des prestations et le suivi de leur réalisation.

## 🛠️ Gestion des prestations

### Création de prestation
- [ ] Créer une prestation avec tous les champs obligatoires
- [ ] Vérifier la validation des champs (Titre, Description, Domaine, Tarif)
- [ ] Tester la validation des doublons (titre + domaine)
- [ ] Ajouter une durée estimée et des prérequis
- [ ] Vérifier l'association avec un domaine d'intervention

### Modification de prestation
- [ ] Modifier les informations générales (titre, description, tarif)
- [ ] Changer le statut (Active/Inactive/Archivée)
- [ ] Vérifier la conservation de l'historique des versions
- [ ] Tester le blocage de modification si prestations actives en cours

### Domaines d'intervention
- [ ] Créer un nouveau domaine
- [ ] Modifier un domaine existant
- [ ] Supprimer un domaine (vérifier les dépendances)
- [ ] Gérer la hiérarchie domaines parents/sous-domaines
- [ ] Associer des prestations aux domaines

## 📋 Suivi des prestations

### États des prestations
- [ ] Vérifier l'affichage des prestations "En attente"
- [ ] Vérifier l'affichage des prestations "En cours"
- [ ] Vérifier l'affichage des prestations "Terminées"
- [ ] Vérifier l'affichage des prestations "Annulées"
- [ ] Vérifier l'affichage des prestations "Refusées"

### Attribution d'aidants
- [ ] Tester l'attribution automatique basée sur les compétences
- [ ] Tester l'attribution automatique basée sur la disponibilité
- [ ] Tester l'attribution automatique basée sur la géolocalisation (< 20km)
- [ ] Tester l'attribution manuelle par l'administrateur
- [ ] Vérifier l'historique complet de toutes les étapes

### Mise en relation
- [ ] Créer une nouvelle mise en relation
- [ ] Assigner un aidant à une prestation
- [ ] Modifier le statut d'une mise en relation
- [ ] Calculer automatiquement les tarifs négociés
- [ ] Vérifier les notifications automatiques

## ⭐ Évaluations et qualité

### Système d'évaluation
- [ ] Ajouter une évaluation (1-5 étoiles)
- [ ] Rendre obligatoire les commentaires si note < 3
- [ ] Évaluer selon les critères (Ponctualité, Qualité, Communication, Propreté)
- [ ] Calculer la note moyenne d'un aidant
- [ ] Déclencher les alertes si note moyenne < 3.0

## 🔒 Permissions par rôle
- [ ] Administrateur : Accès complet à toutes les fonctions
- [ ] Modérateur : Lecture seule
- [ ] Support : Lecture seule
- [ ] Visualisateur : Lecture seule des prestations et évaluations

## 💰 Gestion des tarifs
- [ ] Définir un tarif indicatif
- [ ] Négocier un tarif final
- [ ] Calculer automatiquement la commission plateforme (5%)
- [ ] Traiter le paiement après validation de la prestation

## 📅 Annulations et remboursements
- [ ] Annulation > 24h : Remboursement intégral
- [ ] Annulation < 24h : Pénalité de 20%
- [ ] Annulation < 2h : Pénalité de 50%
- [ ] No-show : Facturation intégrale

## 🔔 Notifications automatiques
- [ ] Notification aux aidants qualifiés pour nouvelle prestation
- [ ] Confirmation d'attribution au senior et à l'aidant
- [ ] Rappel RDV 24h et 2h avant
- [ ] Demande d'évaluation 2h après fin de prestation

## 📊 Filtres et recherche
- [ ] Filtrer par domaine d'intervention
- [ ] Filtrer par statut de prestation
- [ ] Recherche textuelle sur titre/description
- [ ] Filtrer par période (date début/fin)
- [ ] Pagination des résultats

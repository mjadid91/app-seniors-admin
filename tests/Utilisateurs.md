
# Tests manuels - Gestion des Utilisateurs

## 🎯 Objectif
Vérifier la gestion complète des utilisateurs (Administrateurs, Seniors, Aidants).

## 👥 Gestion des utilisateurs administratifs

### Création d'utilisateur
- [ ] Créer un utilisateur avec tous les champs obligatoires
- [ ] Vérifier la validation des champs obligatoires (Nom, Prénom, Email, Rôle)
- [ ] Vérifier la validation du format email
- [ ] Vérifier l'unicité de l'email
- [ ] Vérifier la génération automatique du mot de passe temporaire
- [ ] Vérifier l'envoi de l'email de bienvenue
- [ ] Tester l'upload de photo de profil

### Modification d'utilisateur
- [ ] Modifier les informations personnelles d'un utilisateur
- [ ] Changer le rôle d'un utilisateur avec confirmation
- [ ] Modifier le statut (Actif/Inactif)
- [ ] Réinitialiser le mot de passe
- [ ] Vérifier l'historique des modifications

### Suppression d'utilisateur
- [ ] Supprimer un utilisateur sans prestations actives
- [ ] Vérifier le blocage de suppression pour utilisateur avec prestations actives
- [ ] Confirmer la double validation avant suppression
- [ ] Vérifier le soft delete (marquage comme supprimé)

## 👴 Gestion des Seniors

### Informations senior
- [ ] Créer un profil senior complet
- [ ] Définir le niveau d'autonomie (1-5)
- [ ] Ajouter les contacts d'urgence
- [ ] Lier les documents patrimoniaux
- [ ] Vérifier la validation de l'âge minimum (> 55 ans)

### Actions spécifiques
- [ ] Assigner un tuteur pour niveau d'autonomie < 3
- [ ] Consulter l'historique des prestations
- [ ] Voir les prestations actives
- [ ] Gérer le suivi médical

## 🤝 Gestion des Aidants

### Profil professionnel
- [ ] Créer un profil aidant
- [ ] Définir les compétences et domaines d'intervention
- [ ] Configurer l'expérience et certifications
- [ ] Définir la tarification par compétence
- [ ] Configurer les disponibilités et zones d'intervention

### Évaluations
- [ ] Consulter les notes clients
- [ ] Lire les commentaires détaillés
- [ ] Voir l'historique des prestations réalisées
- [ ] Calculer la moyenne des évaluations

## 🔒 Permissions par rôle
- [ ] Administrateur : Accès complet à toutes les fonctions
- [ ] Modérateur : Accès en lecture uniquement
- [ ] Support : Accès en lecture uniquement
- [ ] Visualisateur : Accès en lecture seule

## 📊 Statistiques et recherche
- [ ] Utiliser la barre de recherche par nom/email
- [ ] Filtrer par rôle
- [ ] Trier par date d'inscription
- [ ] Exporter les données (Administrateur uniquement)
- [ ] Vérifier la pagination

## ⚠️ Validation et sécurité
- [ ] Vérifier la validation du format téléphone français
- [ ] Tester les règles de mot de passe (8 car., 1 maj., 1 chiffre)
- [ ] Vérifier les notifications automatiques
- [ ] Contrôler l'audit trail des modifications critiques

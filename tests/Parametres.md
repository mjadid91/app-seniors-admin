
# Tests manuels - Paramètres

## 🎯 Objectif
Vérifier la gestion des paramètres utilisateur et de l'application.

## 👤 Profil utilisateur

### ✅ Scénario : Modifier les informations personnelles

- **Données de test :**
  - Nom actuel : "Martin"
  - Nouveau nom : "Martin-Dubois"
  - Prénom actuel : "Claire"
  - Nouveau prénom : "Claire-Marie"
  - Email actuel : "claire.martin@appseniors.fr"
  - Nouvel email : "claire.martin-dubois@appseniors.fr"
  - Téléphone : "06 78 90 12 34"

- **Étapes détaillées :**
  1. Se connecter avec claire.martin@appseniors.fr
  2. Aller dans Paramètres → Profil
  3. Modifier le nom en "Martin-Dubois"
  4. Modifier le prénom en "Claire-Marie"
  5. Modifier l'email en "claire.martin-dubois@appseniors.fr"
  6. Cliquer sur "Enregistrer les modifications"

- **Résultat attendu :**
  - Message de confirmation "Profil mis à jour avec succès"
  - Les nouvelles informations s'affichent dans les champs
  - L'email de confirmation est envoyé à la nouvelle adresse

### ✅ Scénario : Upload d'une photo de profil

- **Données de test :**
  - Fichier image : portrait-claire.jpg (2.5 MB, 1200x1200px)
  - Format : JPG
  - Utilisateur : claire.martin@appseniors.fr

- **Étapes détaillées :**
  1. Accéder aux Paramètres → Profil
  2. Cliquer sur la zone "Changer la photo"
  3. Sélectionner le fichier portrait-claire.jpg
  4. Attendre l'upload (barre de progression)
  5. Recadrer l'image si nécessaire
  6. Valider la nouvelle photo

- **Résultat attendu :**
  - Barre de progression d'upload visible
  - Aperçu de la nouvelle photo
  - Photo mise à jour dans le menu utilisateur
  - Message "Photo de profil mise à jour"

## 🔐 Sécurité et mot de passe

### ✅ Scénario : Changer le mot de passe

- **Données de test :**
  - Mot de passe actuel : "AdminTest2024!"
  - Nouveau mot de passe : "NouveauMotDePasse2024!"
  - Confirmation : "NouveauMotDePasse2024!"

- **Étapes détaillées :**
  1. Aller dans Paramètres → Sécurité
  2. Saisir l'ancien mot de passe "AdminTest2024!"
  3. Saisir le nouveau mot de passe "NouveauMotDePasse2024!"
  4. Confirmer le nouveau mot de passe
  5. Cliquer sur "Modifier le mot de passe"

- **Résultat attendu :**
  - Validation des critères de sécurité en temps réel
  - Message "Mot de passe modifié avec succès"
  - Déconnexion automatique pour re-connexion
  - Email de notification de changement

### ✅ Scénario : Activer l'authentification à deux facteurs

- **Données de test :**
  - Application : Google Authenticator
  - Code de vérification généré : 123456
  - Codes de récupération : à sauvegarder

- **Étapes détaillées :**
  1. Accéder à Paramètres → Sécurité
  2. Cliquer sur "Activer l'authentification 2FA"
  3. Scanner le QR code avec Google Authenticator
  4. Saisir le code de vérification 123456
  5. Sauvegarder les codes de récupération
  6. Confirmer l'activation

- **Résultat attendu :**
  - QR code affiché clairement
  - Codes de récupération générés (10 codes)
  - Status "2FA activé" visible
  - Prochaine connexion demande le code 2FA

## 🔔 Notifications

### ✅ Scénario : Configurer les préférences de notifications

- **Données de test :**
  - Email notifications : Activées
  - Notifications push : Désactivées
  - Fréquence digest : Hebdomadaire
  - Types : Nouveaux utilisateurs, Tickets support, Urgences

- **Étapes détaillées :**
  1. Aller dans Paramètres → Notifications
  2. Activer "Recevoir des emails de notification"
  3. Désactiver "Notifications push navigateur"
  4. Sélectionner "Digest hebdomadaire"
  5. Cocher "Nouveaux utilisateurs", "Tickets support", "Urgences"
  6. Sauvegarder les préférences

- **Résultat attendu :**
  - Préférences sauvegardées instantanément
  - Message "Préférences mises à jour"
  - Test d'email de notification envoyé
  - Paramètres visibles au rechargement

### ✅ Scénario : Tester les notifications en temps réel

- **Données de test :**
  - Action déclencheur : Nouveau ticket support créé
  - Notification attendue : Email + alerte in-app
  - Délai maximum : 2 minutes

- **Étapes détaillées :**
  1. Configurer les notifications (emails activés)
  2. Créer un nouveau ticket de support en tant qu'autre utilisateur
  3. Vérifier la réception de l'email de notification
  4. Vérifier l'alerte dans l'interface admin
  5. Cliquer sur la notification pour accès direct

- **Résultat attendu :**
  - Email reçu dans les 2 minutes
  - Badge de notification visible (chiffre rouge)
  - Clic sur notification = redirection vers le ticket
  - Marquage automatique comme "lu"

## 🎨 Préférences d'affichage

### ✅ Scénario : Changer le thème de l'interface

- **Données de test :**
  - Thème initial : Clair
  - Nouveau thème : Sombre
  - Mode automatique : Selon l'heure du système

- **Étapes détaillées :**
  1. Accéder à Paramètres → Apparence
  2. Sélectionner "Thème sombre"
  3. Observer le changement instantané
  4. Tester "Mode automatique"
  5. Vérifier la persistance au rechargement

- **Résultat attendu :**
  - Interface bascule instantanément en mode sombre
  - Tous les composants respectent le nouveau thème
  - Préférence sauvegardée dans le navigateur
  - Mode automatique suit l'heure système

### ✅ Scénario : Configurer la langue de l'interface

- **Données de test :**
  - Langue actuelle : Français
  - Nouvelle langue : Anglais
  - Format des dates : DD/MM/YYYY → MM/DD/YYYY

- **Étapes détaillées :**
  1. Aller dans Paramètres → Langue et région
  2. Sélectionner "English" dans le dropdown
  3. Confirmer le changement
  4. Vérifier la traduction des menus
  5. Vérifier le format des dates

- **Résultat attendu :**
  - Interface traduite en anglais instantanément
  - Dates au format MM/DD/YYYY
  - Messages et labels traduits
  - Préférence persistante entre sessions

## 🔧 Paramètres système (Administrateur uniquement)

### ✅ Scénario : Configurer les paramètres de l'application

- **Données de test :**
  - Nom de l'application : "AppSeniors Admin Dashboard"
  - Version : "v2.1.0"
  - Maintenance programmée : 15/02/2024 02:00
  - Taille max fichiers : 10 MB → 15 MB

- **Étapes détaillées :**
  1. Se connecter en tant qu'Administrateur
  2. Accéder à Paramètres → Système
  3. Modifier "Taille maximum des fichiers" à 15 MB
  4. Programmer la maintenance pour le 15/02/2024 à 02:00
  5. Sauvegarder les paramètres système

- **Résultat attendu :**
  - Seuls les Administrateurs voient cette section
  - Modifications appliquées immédiatement
  - Notification de maintenance programmée
  - Logs système mis à jour

### ✅ Scénario : Gérer les intégrations tierces

- **Données de test :**
  - Service email : Configuré (SMTP)
  - API Supabase : Connectée
  - Service de géolocalisation : Activé
  - Monitoring : Actif

- **Étapes détaillées :**
  1. Aller dans Paramètres → Intégrations
  2. Vérifier le statut "Connecté" pour chaque service
  3. Tester la connexion SMTP
  4. Renouveler la clé API si nécessaire
  5. Consulter les logs de connexion

- **Résultat attendu :**
  - Statuts affichés avec indicateurs colorés (vert/rouge)
  - Test SMTP réussi avec email de confirmation
  - Clés API masquées pour sécurité
  - Logs des dernières activités visibles

## 📱 Paramètres mobiles

### ✅ Scénario : Configurer l'accès mobile

- **Données de test :**
  - Push notifications : Activées
  - Synchronisation : Temps réel
  - Mode hors ligne : Activé
  - Qualité images : Moyenne (économie de données)

- **Étapes détaillées :**
  1. Accéder aux Paramètres sur mobile/tablette
  2. Activer "Notifications push"
  3. Configurer "Synchronisation temps réel"
  4. Activer "Mode hors ligne"
  5. Régler qualité images à "Moyenne"

- **Résultat attendu :**
  - Interface adaptée aux écrans tactiles
  - Notifications push fonctionnelles
  - Données synchronisées instantanément
  - Cache local pour mode hors ligne

## 📥 Import/Export des paramètres

### ✅ Scénario : Exporter la configuration utilisateur

- **Données de test :**
  - Format : JSON
  - Fichier généré : "parametres-claire-martin-15022024.json"
  - Contenu : Préférences, notifications, thème

- **Étapes détaillées :**
  1. Aller dans Paramètres → Import/Export
  2. Cliquer sur "Exporter mes paramètres"
  3. Choisir le format JSON
  4. Télécharger le fichier
  5. Vérifier le contenu du fichier

- **Résultat attendu :**
  - Fichier JSON téléchargé automatiquement
  - Nom de fichier avec date et utilisateur
  - Contenu JSON valide et lisible
  - Tous les paramètres présents

### ✅ Scénario : Importer une configuration

- **Données de test :**
  - Fichier source : parametres-backup-10022024.json
  - Paramètres : Thème sombre, notifications email, langue EN
  - Action : Remplacer configuration actuelle

- **Étapes détaillées :**
  1. Accéder à Paramètres → Import/Export
  2. Cliquer sur "Importer des paramètres"
  3. Sélectionner le fichier parametres-backup-10022024.json
  4. Prévisualiser les changements
  5. Confirmer l'import

- **Résultat attendu :**
  - Aperçu des modifications avant import
  - Interface mise à jour selon nouveaux paramètres
  - Message "Configuration importée avec succès"
  - Possibilité d'annuler dans les 30 secondes

## 🔄 Réinitialisation

### ✅ Scénario : Réinitialiser les paramètres par défaut

- **Données de test :**
  - Configuration actuelle : Personnalisée
  - Action : Reset complet aux valeurs par défaut
  - Confirmation : Double validation requise

- **Étapes détaillées :**
  1. Aller dans Paramètres → Réinitialisation
  2. Cliquer sur "Restaurer paramètres par défaut"
  3. Lire l'avertissement affiché
  4. Saisir "RESET" pour confirmer
  5. Valider la réinitialisation

- **Résultat attendu :**
  - Avertissement clair des conséquences
  - Double confirmation obligatoire
  - Retour aux paramètres d'origine
  - Message "Paramètres réinitialisés"
  - Possibilité de restaurer depuis un backup

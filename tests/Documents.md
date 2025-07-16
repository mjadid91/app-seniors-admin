
# Tests manuels - Gestion des Documents

## 🎯 Objectif
Vérifier la gestion complète des documents et documents patrimoniaux.

## 📄 Gestion des documents généraux

### Upload de documents
- [ ] Uploader un fichier PDF
- [ ] Uploader un fichier Word (.doc, .docx)
- [ ] Uploader un fichier Excel (.xls, .xlsx)
- [ ] Uploader une image (JPG, PNG)
- [ ] Vérifier la limitation de taille (max 10MB)
- [ ] Tester l'upload de fichiers non autorisés
- [ ] Vérifier la progression de l'upload

### Métadonnées des documents
- [ ] Ajouter un titre au document
- [ ] Sélectionner une catégorie de document
- [ ] Associer un utilisateur au document
- [ ] Définir le statut (Brouillon, Publié, Archivé)
- [ ] Vérifier la date d'upload automatique
- [ ] Calculer automatiquement la taille du fichier

### Gestion des catégories
- [ ] Créer une nouvelle catégorie de document
- [ ] Modifier une catégorie existante
- [ ] Supprimer une catégorie (vérifier les dépendances)
- [ ] Associer des documents aux catégories

## 🏛️ Documents patrimoniaux

### Création de documents patrimoniaux
- [ ] Créer un document patrimonial pour un senior
- [ ] Sélectionner le type de document (Testament, Assurance, etc.)
- [ ] Uploader le fichier sécurisé
- [ ] Vérifier la date de création automatique
- [ ] Associer le document au bon senior

### Types de documents patrimoniaux
- [ ] Tester les testaments
- [ ] Tester les contrats d'assurance
- [ ] Tester les titres de propriété
- [ ] Tester les comptes bancaires
- [ ] Tester les investissements

### Sécurité et confidentialité
- [ ] Vérifier l'accès restreint aux documents patrimoniaux
- [ ] Contrôler que seuls les utilisateurs autorisés peuvent voir
- [ ] Tester le chiffrement des fichiers sensibles
- [ ] Vérifier les logs d'accès aux documents

## 🔍 Recherche et filtrage

### Filtres disponibles
- [ ] Filtrer par catégorie de document
- [ ] Filtrer par utilisateur
- [ ] Filtrer par statut
- [ ] Filtrer par type de fichier
- [ ] Filtrer par période d'upload

### Recherche textuelle
- [ ] Rechercher par titre de document
- [ ] Rechercher par nom de fichier
- [ ] Rechercher par contenu (si indexé)
- [ ] Vérifier la pertinence des résultats

## 📊 Statistiques des documents
- [ ] Afficher le nombre total de documents
- [ ] Répartition par catégorie
- [ ] Espace de stockage utilisé
- [ ] Documents récemment ajoutés
- [ ] Documents les plus consultés

## 🔒 Permissions par rôle
- [ ] Administrateur : Accès complet à tous les documents
- [ ] Modérateur : Lecture seule
- [ ] Support : Accès aux documents non-patrimoniaux
- [ ] Visualisateur : Lecture seule des documents publics

## 💾 Gestion du stockage

### Stockage Supabase
- [ ] Vérifier l'upload vers le bucket Supabase
- [ ] Contrôler les permissions du bucket
- [ ] Tester la génération d'URLs signées
- [ ] Vérifier l'expiration des liens de téléchargement

### Gestion de l'espace
- [ ] Monitorer l'espace de stockage utilisé
- [ ] Nettoyer les fichiers orphelins
- [ ] Archiver les anciens documents
- [ ] Optimiser la taille des fichiers

## 📱 Actions sur les documents

### Consultation
- [ ] Prévisualiser un document (si possible)
- [ ] Télécharger un document
- [ ] Voir les détails/métadonnées
- [ ] Consulter l'historique des accès

### Modification
- [ ] Modifier les métadonnées d'un document
- [ ] Changer le statut d'un document
- [ ] Réassocier à un autre utilisateur
- [ ] Changer de catégorie

### Suppression
- [ ] Supprimer un document avec confirmation
- [ ] Vérifier la suppression physique du fichier
- [ ] Contrôler les droits de suppression
- [ ] Gérer les documents liés/dépendants

## 📱 Interface responsive
- [ ] Vérifier l'affichage de la liste sur mobile
- [ ] Tester l'upload de fichiers sur mobile
- [ ] Contrôler la prévisualisation sur tablette
- [ ] Vérifier la navigation tactile

## ⚡ Performance
- [ ] Temps de chargement de la liste des documents
- [ ] Vitesse d'upload des gros fichiers
- [ ] Fluidité de la prévisualisation
- [ ] Performance de la recherche avec beaucoup de documents


# Tests manuels - Gestion des Documents

## 🎯 Objectif
Vérifier la gestion complète des documents avec des exemples réels et des cas d'usage concrets de l'application AppSeniors.

## 📄 Gestion des documents généraux

### ✅ Scénario : Upload document administratif - Carte d'identité
**Utilisateur :** Marcel Durand (Senior)
**Document :** Copie carte d'identité pour validation profil
**Contexte :** Première inscription, documents justificatifs requis

**Données du document :**
- **Titre :** Carte identité Marcel Durand - Recto/Verso
- **Catégorie :** Documents administratifs
- **Type de fichier :** PDF (2 pages)
- **Taille :** 1.2 MB
- **Statut :** Confidentiel (accès restreint)

**Étapes :**
1. Se connecter avec marcel.durand@gmail.com
2. Aller dans Mon Profil → Documents
3. Cliquer sur "Ajouter un document"
4. Sélectionner fichier "CI_Marcel_Durand.pdf"
5. Choisir catégorie "Documents administratifs"
6. Définir statut "Confidentiel"
7. Valider l'upload

**Résultat attendu :**
- Upload réussi avec barre de progression
- Document visible dans la liste personnelle
- Accès restreint aux administrateurs
- Notification de validation envoyée

### ✅ Scénario : Upload certificat médical - Aidant
**Utilisateur :** Sofia Lopez (Aidant)
**Document :** Certificat médical d'aptitude aux soins
**Contexte :** Renouvellement annuel obligatoire

**Données du document :**
- **Titre :** Certificat aptitude soins - Sofia Lopez 2024
- **Catégorie :** Certifications professionnelles
- **Type de fichier :** JPG (scan)
- **Taille :** 3.8 MB
- **Date d'expiration :** 15 mai 2025
- **Statut :** Professionnel (visible clients potentiels)

**Étapes :**
1. Se connecter avec sofia.lopez@aide-domicile.fr
2. Mon Profil → Certifications → Ajouter
3. Scanner certificat avec l'app mobile
4. Renseigner date d'expiration
5. Publier sur profil public

**Résultat attendu :**
- Document scanné de bonne qualité
- Date d'expiration programmée pour rappel
- Visible sur profil public de Sofia
- Badge "Certifié 2024" ajouté automatiquement

### ✅ Scénario : Échec upload - Fichier trop volumineux
**Utilisateur :** Pierre Lecomte
**Document :** Présentation PowerPoint cours informatique
**Problème :** Fichier de 25 MB (limite 10 MB)

**Test d'erreur :**
1. Tenter upload du fichier 25 MB
2. Vérifier message d'erreur explicite
3. Proposer solutions alternatives

**Résultat attendu :**
- Message d'erreur clair : "Fichier trop volumineux (25 MB). Limite : 10 MB"
- Suggestions : "Compressez le fichier ou contactez le support"
- Pas de corruption des données
- Retour fluide à l'interface

## 🏛️ Documents patrimoniaux sécurisés

### ✅ Scénario : Testament - Document ultra-sensible
**Senior :** Germaine Moreau (92 ans)
**Document :** Testament olographe numérisé
**Contexte :** Stockage sécurisé pour transmission future

**Données du document patrimonial :**
- **Type :** Testament
- **Titre :** Testament Germaine Moreau - Mai 2024
- **Statut :** Ultra-confidentiel
- **Accès autorisé :** Germaine + Tuteur légal uniquement
- **Chiffrement :** AES-256
- **Date de création :** 16 mai 2024

**Procédure sécurisée :**
1. Authentification renforcée de Germaine
2. Upload dans l'espace patrimoine sécurisé
3. Chiffrement automatique du fichier
4. Définition des ayants-droit
5. Génération certificat de dépôt

**Résultat attendu :**
- Document chiffré et sécurisé
- Accès limité aux personnes autorisées
- Traçabilité de tous les accès
- Certificat de dépôt horodaté

### ✅ Scénario : Contrat d'assurance-vie
**Senior :** Marcel Durand
**Document :** Contrat assurance-vie avec bénéficiaires
**Valeur :** 45,000€

**Informations du contrat :**
- **Compagnie :** Assurances Générales de France
- **Numéro de contrat :** AGF-123456789
- **Bénéficiaires :** Marie Durand (fille) - 100%
- **Date de souscription :** 12 mars 2018
- **Valeur actuelle :** 45,000€

**Gestion du document :**
1. Upload sécurisé du contrat PDF
2. Saisie des métadonnées importantes
3. Désignation de Marie comme contact
4. Programmation rappel revalorisation annuelle

**Résultat attendu :**
- Contrat stocké de façon ultra-sécurisée
- Métadonnées accessibles rapidement
- Marie informée de l'existence du document
- Rappel automatique pour mise à jour

### ✅ Scénario : Titre de propriété - Maison familiale
**Senior :** Robert Vernay (78 ans)
**Document :** Acte de propriété maison de famille
**Adresse bien :** 15 allée des Roses, 69300 Caluire

**Données du titre :**
- **Type de bien :** Maison individuelle
- **Surface :** 120 m² + jardin 400 m²
- **Date d'acquisition :** 25 juin 1987
- **Valeur d'achat :** 45,000€ (1987)
- **Estimation actuelle :** 385,000€

**Gestion patrimoniale :**
1. Numérisation haute définition de l'acte
2. Extraction automatique des données clés
3. Géolocalisation du bien
4. Estimation de valeur actualisée
5. Planification succession

**Résultat attendu :**
- Document numérisé en haute qualité
- Données extraites automatiquement
- Géolocalisation précise sur carte
- Suivi de l'évolution de valeur

## 🔍 Recherche et organisation avancée

### ✅ Scénario : Recherche multi-critères complexe
**Utilisateur :** Admin recherchant documents spécifiques
**Objectif :** Audit documents expirés pour aidants

**Critères de recherche :**
- **Catégorie :** Certifications professionnelles
- **Type d'utilisateur :** Aidants
- **Date d'expiration :** < 30 jours
- **Statut :** Actif
- **Zone géographique :** Paris et banlieue

**Résultats attendus :**
1. **Sofia Lopez** - Certificat médical expire dans 15 jours
2. **Pierre Martin** - Formation secours expire dans 22 jours  
3. **Marie Dubois** - Assurance responsabilité expire dans 8 jours

**Actions automatiques :**
- Emails de rappel envoyés
- Notifications dans l'app
- Suspension automatique si non renouvelé

**Résultat attendu :**
- Recherche précise et rapide
- Résultats pertinents et actualisés
- Actions préventives automatiques
- Traçabilité des rappels

### ✅ Scénario : Organisation par dossiers thématiques
**Utilisateur :** Marcel Durand
**Objectif :** Organiser ses nombreux documents

**Structure de dossiers :**
```
📁 Marcel Durand - Documents
  ├── 📁 Administratif
  │   ├── Carte identité
  │   ├── Passeport
  │   └── Justificatifs domicile
  ├── 📁 Médical
  │   ├── Ordonnances en cours
  │   ├── Comptes-rendus médicaux
  │   └── Carnet de vaccination
  ├── 📁 Patrimoine (sécurisé)
  │   ├── Testament
  │   ├── Assurance-vie
  │   └── Titres de propriété
  └── 📁 AppSeniors
      ├── Contrats prestations
      ├── Évaluations
      └── Correspondances
```

**Test d'organisation :**
1. Créer la structure de dossiers
2. Déplacer documents existants
3. Appliquer droits d'accès différenciés
4. Tester navigation et recherche

**Résultat attendu :**
- Organisation logique et intuitive
- Droits d'accès respectés par dossier
- Navigation rapide et efficace
- Recherche dans dossiers spécifiques

## 📊 Statistiques et reporting

### ✅ Scénario : Tableau de bord documents - Vue administrateur
**Période :** Mai 2024
**Statistiques globales :**

**Volume de stockage :**
- **Total documents :** 2,847 fichiers
- **Espace utilisé :** 1.2 GB / 10 GB disponibles
- **Taille moyenne :** 0.4 MB par fichier

**Répartition par catégorie :**
- **Documents administratifs :** 1,024 (36%)
- **Certifications professionnelles :** 567 (20%)
- **Documents patrimoniaux :** 234 (8%)
- **Documents médicaux :** 445 (15%)
- **Autres :** 577 (21%)

**Activité mensuelle :**
- **Nouveaux uploads :** 127 documents
- **Téléchargements :** 89 fois
- **Suppressions :** 12 documents
- **Consultations :** 456 fois

**Alertes et actions :**
- **Documents expirant :** 15 dans les 30 jours
- **Rappels envoyés :** 23 notifications
- **Documents manquants :** 8 aidants sans certificat

**Résultat attendu :**
- Dashboard complet et actualisé
- Tendances d'évolution visibles
- Alertes préventives fonctionnelles
- Actions d'amélioration identifiées

## 💾 Sauvegarde et sécurité

### ✅ Scénario : Test de sauvegarde automatique
**Fréquence :** Sauvegarde quotidienne à 2h du matin
**Rétention :** 30 jours de sauvegarde

**Test de récupération :**
1. Simuler suppression accidentelle document important
2. Identifier la sauvegarde à restaurer
3. Procéder à la restauration
4. Vérifier l'intégrité du document restauré

**Document test :** Testament de Germaine Moreau
- **Suppression :** 16 mai 2024, 14h30
- **Dernière sauvegarde :** 16 mai 2024, 2h00
- **Restauration :** Document intact et accessible

**Résultat attendu :**
- Récupération réussie en moins de 10 minutes
- Intégrité parfaite du document
- Historique des versions conservé
- Aucune perte de données

### ✅ Scénario : Audit de sécurité - Accès non autorisé
**Test de sécurité :** Tentative d'accès au testament de Germaine par un utilisateur non autorisé

**Tentative d'intrusion :**
- **Utilisateur :** Marcel Durand (pas de droits sur documents Germaine)
- **Action :** Tentative de consultation testament
- **Méthode :** URL directe vers le document

**Sécurités activées :**
1. Vérification des droits d'accès
2. Authentification de l'utilisateur
3. Audit trail de la tentative
4. Alerte sécurité automatique

**Résultat attendu :**
- Accès refusé immédiatement
- Message d'erreur : "Accès non autorisé"
- Tentative logguée avec détails
- Alerte envoyée aux administrateurs

## 📱 Gestion mobile des documents

### ✅ Scénario : Scan et upload mobile - Ordonnance
**Utilisateur :** Marcel Durand avec sa tablette
**Document :** Nouvelle ordonnance du Dr Martin
**Contexte :** Consultation médicale, ajout immédiat

**Workflow mobile :**
1. Ouverture app AppSeniors sur tablette
2. Menu "Documents" → "Scanner"
3. Appareil photo activé automatiquement
4. Prise de photo de l'ordonnance
5. Recadrage automatique intelligent
6. Amélioration qualité (contraste, luminosité)
7. Ajout titre et catégorie
8. Upload direct vers profil

**Résultat attendu :**
- Scanner intégré fonctionnel
- Qualité d'image optimisée automatiquement
- Upload en arrière-plan
- Document disponible immédiatement sur tous les appareils

### ✅ Scénario : Consultation urgente hors ligne
**Contexte :** Marcel chez le médecin sans connexion internet
**Besoin :** Consulter ses dernières analyses

**Mode hors ligne :**
1. Documents récents synchronisés en local
2. Consultation possible sans internet
3. Historique médical accessible
4. Synchronisation dès reconnexion

**Documents disponibles hors ligne :**
- Ordonnances du mois en cours
- Dernières analyses sanguines
- Carnet de vaccination
- Allergies et contre-indications

**Résultat attendu :**
- Accès immédiat aux documents essentiels
- Interface adaptée au mode hors ligne
- Synchronisation transparente au retour online
- Aucune perte de données

## 🔄 Workflows et automatisations

### ✅ Scénario : Workflow renouvellement certification
**Aidant :** Sofia Lopez
**Certification :** Certificat médical d'aptitude
**Expiration :** Dans 15 jours

**Workflow automatique :**
1. **J-30 :** Premier rappel par email
2. **J-15 :** Rappel urgent avec procédure
3. **J-7 :** Notification push quotidienne
4. **J-0 :** Suspension automatique si non renouvelé
5. **Upload nouveau certificat :** Réactivation automatique

**Test du workflow :**
- Vérifier tous les rappels envoyés
- Confirmer suspension à échéance
- Tester réactivation après upload
- Valider notifications clients

**Résultat attendu :**
- Rappels envoyés aux bonnes dates
- Suspension respectueuse mais ferme
- Réactivation immédiate après upload
- Communication transparente avec les clients

### ✅ Scénario : Génération automatique de documents
**Contexte :** Fin de prestation Sofia chez Marcel
**Documents générés automatiquement :**

1. **Facture de prestation :**
   - Détails de la prestation
   - Calcul automatique des montants
   - Mentions légales
   - Envoi par email

2. **Rapport d'intervention :**
   - Tâches réalisées
   - Durée effective
   - Observations éventuelles
   - Signature électronique

3. **Justificatif pour aide publique :**
   - Conforme aux exigences CAF/CCAS
   - Données structurées
   - Export PDF sécurisé

**Résultat attendu :**
- Documents générés instantanément
- Informations exactes et complètes
- Formats conformes aux normes
- Distribution automatique aux parties concernées

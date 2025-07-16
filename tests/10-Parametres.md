
# Tests manuels - Paramètres

## 🎯 Objectif
Vérifier la gestion complète des paramètres utilisateur et système avec des scénarios réalistes.

## 👤 Profil utilisateur

### ✅ Scénario : Modification informations personnelles - Senior
**Utilisateur :** Marcel Durand (85 ans)
**Contexte :** Déménagement vers résidence services

**Changements à effectuer :**
- **Ancienne adresse :** 12 rue des Lilas, 75012 Paris
- **Nouvelle adresse :** Résidence Le Jardin Fleuri, 15 avenue Mozart, 75016 Paris
- **Nouveau téléphone :** 01 45 67 89 12 → 01 42 88 91 23
- **Contact d'urgence :** Ajouter Marie Durand (fille) - 06 12 34 56 78

**Étapes :**
1. Se connecter avec marcel.durand@gmail.com
2. Aller dans Paramètres → Mon Profil
3. Modifier l'adresse complète
4. Changer le numéro de téléphone
5. Ajouter le contact d'urgence
6. Sauvegarder les modifications

**Résultat attendu :**
- Modifications sauvegardées immédiatement
- Mise à jour de la géolocalisation automatique
- Email de confirmation des changements
- Notification aux aidants de la zone

### ✅ Scénario : Upload photo de profil - Aidant
**Utilisateur :** Sofia Lopez (Aidant professionnelle)
**Objectif :** Mettre à jour sa photo de profil professionnelle

**Données de test :**
- **Fichier :** portrait-sofia-2024.jpg
- **Taille :** 2.1 MB
- **Dimensions :** 1200x1200 pixels
- **Format :** JPG

**Étapes :**
1. Se connecter avec sofia.lopez@aide-domicile.fr
2. Paramètres → Photo de profil
3. Cliquer sur "Changer la photo"
4. Sélectionner portrait-sofia-2024.jpg
5. Recadrer en format carré
6. Valider la nouvelle photo

**Résultat attendu :**
- Upload réussi avec barre de progression
- Recadrage automatique en 400x400px
- Photo mise à jour instantanément
- Visible sur profil public et recherches

### ✅ Scénario : Modification email principal - Problème de sécurité
**Utilisateur :** Pierre Lecomte
**Contexte :** Email compromis, changement urgent nécessaire

**Données :**
- **Ancien email :** pierre.lecomte@hotmail.com (compromis)
- **Nouvel email :** p.lecomte.senior@gmail.com
- **Téléphone de vérification :** 06 78 90 12 34

**Procédure sécurisée :**
1. Connexion avec ancien email
2. Paramètres → Sécurité → Changer email
3. Saisir nouvel email
4. Vérification par SMS au téléphone
5. Confirmation dans les deux boîtes email
6. Déconnexion automatique pour re-connexion

**Résultat attendu :**
- Double vérification obligatoire
- Email de notification sécurité
- Déconnexion forcée pour validation
- Historique de la modification tracé

## 🔐 Sécurité et authentification

### ✅ Scénario : Changement mot de passe - Senior oublieux
**Utilisateur :** Germaine Moreau (92 ans)
**Problème :** Mot de passe trop complexe, oubli fréquent

**Ancien mot de passe :** GermM0r3au!2024# (trop complexe)
**Nouveau mot de passe :** Violettes1932! (plus mémorable)

**Critères de sécurité respectés :**
- 12 caractères minimum ✓
- 1 majuscule ✓
- 1 chiffre ✓
- 1 caractère spécial ✓
- Pas de mots du dictionnaire ✓
- Différent des 3 derniers ✓

**Étapes :**
1. Paramètres → Sécurité → Modifier mot de passe
2. Saisir ancien mot de passe
3. Choisir nouveau mot de passe mémorable
4. Confirmer le nouveau mot de passe
5. Validation avec indicateur de force

**Résultat attendu :**
- Indicateur de force en temps réel
- Suggestions pour améliorer la sécurité
- Vérification historique des mots de passe
- Email de confirmation sécurité

### ✅ Scénario : Activation authentification double facteur (2FA)
**Utilisateur :** Sofia Lopez (Aidant, données sensibles)
**Objectif :** Sécuriser l'accès à son compte professionnel

**Application 2FA :** Google Authenticator
**Téléphone :** Samsung Galaxy A54

**Étapes d'activation :**
1. Paramètres → Sécurité → Authentification 2FA
2. Télécharger Google Authenticator
3. Scanner le QR code affiché
4. Saisir le code de vérification généré
5. Sauvegarder les codes de récupération
6. Confirmer l'activation

**Codes de récupération générés :**
- 789456123
- 456123789
- 123789456
- 987654321
- 654321987

**Résultat attendu :**
- QR code scannable facilement
- Codes de récupération affichés clairement
- Test de connexion avec 2FA réussi
- Instructions claires pour usage quotidien

### ✅ Scénario : Gestion des sessions actives
**Utilisateur :** Admin visualisant ses connexions
**Contexte :** Vérification de sécurité après alerte

**Sessions actives détectées :**
1. **Session actuelle :** Chrome, Windows 10, Paris (IP: 81.67.123.45)
2. **Session mobile :** Safari, iPhone, Paris (IP: 81.67.123.47)
3. **Session suspecte :** Firefox, Linux, Marseille (IP: 93.12.45.78)

**Actions :**
1. Identifier la session suspecte
2. Déconnecter la session de Marseille
3. Changer immédiatement le mot de passe
4. Activer les notifications de connexion

**Résultat attendu :**
- Liste détaillée des sessions actives
- Possibilité de déconnexion sélective
- Alerte immédiate des connexions suspectes
- Historique de connexions conservé

## 🔔 Notifications et préférences

### ✅ Scénario : Configuration notifications senior
**Utilisateur :** Marcel Durand
**Objectif :** Recevoir seulement les notifications importantes

**Préférences configurées :**
- **Email :** ✓ Rappels prestations, ✗ Promotions partenaires
- **SMS :** ✓ Urgences uniquement, ✗ Notifications générales  
- **Push :** ✗ Toutes désactivées (tablette partagée)
- **Fréquence digest :** Hebdomadaire le lundi matin

**Types de notifications :**
- ✓ Confirmation prestation Sofia demain 14h
- ✓ Rappel RDV médical Dr Martin jeudi 10h
- ✗ Nouveau partenaire OptiquePlus disponible
- ✗ Mise à jour conditions générales
- ✓ Facture prestation disponible

**Résultat attendu :**
- Seules les notifications choisies envoyées
- Respect strict des préférences
- Digest hebdomadaire le lundi
- Possibilité de modifier facilement

### ✅ Scénario : Notifications d'urgence - Contact famille
**Utilisateur :** Marie Durand (fille de Marcel)
**Contexte :** Recevoir alertes concernant son père

**Configuration d'urgence :**
- **Notifications médicales :** ✓ Toutes
- **Absences inattendues :** ✓ Si 2 prestations manquées
- **Urgences techniques :** ✓ App inaccessible > 4h
- **Changements importants :** ✓ Modification coordonnées

**Test d'alerte :**
Marcel ne répond pas à deux prestations consécutives
→ SMS automatique à Marie dans les 2h
→ Email détaillé avec contexte
→ Numéro d'urgence fourni

**Résultat attendu :**
- Alerte envoyée dans les délais
- Informations contextuelles complètes
- Instructions d'action claires
- Escalade vers services d'urgence si besoin

## 🎨 Préférences d'affichage

### ✅ Scénario : Interface adaptée malvoyant
**Utilisateur :** Robert Vernay (78 ans, troubles visuels)
**Besoins :** Interface plus lisible et contrastée

**Adaptations demandées :**
- **Taille police :** Grande (18px → 24px)
- **Contraste :** Élevé (mode sombre avec texte blanc)
- **Espacement :** Augmenté entre les éléments
- **Boutons :** Plus larges pour faciliter le clic

**Configuration :**
1. Paramètres → Accessibilité
2. Activer "Mode malvoyant"
3. Ajuster taille de police à 150%
4. Activer contraste élevé
5. Configurer espacement augmenté

**Résultat attendu :**
- Interface immédiatement plus lisible
- Contraste suffisant pour lecture aisée
- Boutons plus faciles à cliquer
- Navigation simplifiée et claire

### ✅ Scénario : Thème personnalisé - Interface senior
**Utilisateur :** Ensemble des seniors
**Objectif :** Interface plus adaptée aux seniors

**Thème "Senior Friendly" :**
- **Couleurs :** Tons chauds et apaisants
- **Police :** Sans-serif, claire et grande
- **Boutons :** Larges avec icônes explicites
- **Menu :** Simplifié avec 5 sections principales
- **Aide :** Toujours visible en haut à droite

**Sections principales :**
1. 🏠 Accueil
2. 👥 Mes Prestations  
3. 💬 Messages
4. 📄 Documents
5. ⚙️ Paramètres

**Résultat attendu :**
- Interface plus ergonomique pour seniors
- Navigation intuitive et simplifiée
- Aide contextuelle toujours accessible
- Réduction de l'anxiété technologique

## 🌍 Langue et localisation

### ✅ Scénario : Senior bilingue français/espagnol
**Utilisateur :** Carmen Rodriguez (79 ans, origine espagnole)
**Contexte :** Plus à l'aise en espagnol pour certains termes

**Configuration multilingue :**
- **Langue principale :** Français
- **Langue secondaire :** Espagnol
- **Région :** France / Catalogne
- **Format dates :** JJ/MM/AAAA (français)
- **Monnaie :** Euro (€)

**Éléments traduits :**
- Interface principale en français
- Aide et tutoriels en espagnol disponibles
- Support client bilingue
- Documents officiels dans les deux langues

**Résultat attendu :**
- Interface adaptée aux préférences linguistiques
- Support multilingue fonctionnel
- Formats locaux respectés
- Pas de perte d'information lors du changement

### ✅ Scénario : Aidant international - Anglais/Français
**Utilisateur :** Sarah Thompson (Aidante britannique à Paris)
**Contexte :** Travaille avec seniors français et expatriés

**Configuration professionnelle :**
- **Interface :** Français (intégration locale)
- **Communications :** Bilingue selon client
- **Documents :** Auto-détection langue préférée client
- **Facturation :** Français obligatoire (légal)

**Test fonctionnel :**
- Prestation chez senior français → Tout en français
- Prestation chez expatrié anglais → Interface anglaise
- Documents administratifs → Toujours français
- Support → Langue au choix

**Résultat attendu :**
- Adaptation automatique selon contexte
- Respect des obligations légales françaises
- Confort d'usage pour tous les profils
- Pas de confusion dans les communications

## 🔧 Paramètres système (Administrateur)

### ✅ Scénario : Configuration globale plateforme
**Utilisateur :** admin@appseniors.fr
**Objectif :** Ajuster paramètres globaux application

**Paramètres modifiés :**
- **Commission défaut :** 5% → 4.5% (promotion)
- **Délai annulation gratuite :** 24h → 48h (plus souple)
- **Taille max fichiers :** 10MB → 15MB (documents médicaux)
- **Session timeout :** 2h → 4h (seniors moins rapides)

**Impact des changements :**
- Commission : Appliquée aux nouvelles prestations seulement
- Annulation : Effet immédiat pour tous
- Fichiers : Augmentation immédiate
- Session : Nouveau timeout dès prochaine connexion

**Résultat attendu :**
- Changements appliqués selon planning défini
- Notifications automatiques aux utilisateurs concernés
- Aucune régression de service
- Amélioration de l'expérience utilisateur

### ✅ Scénario : Maintenance programmée
**Planification :** Dimanche 19 mai 2024, 2h-6h du matin
**Objectif :** Mise à jour système et optimisations

**Configuration maintenance :**
- **Date/heure :** 19/05/2024 02:00-06:00
- **Type :** Maintenance complète avec interruption
- **Communications :** Notifications 7j, 24h et 1h avant
- **Page maintenance :** Message personnalisé avec estimation

**Notifications envoyées :**
- **12/05 :** "Maintenance programmée dimanche 19/05"
- **18/05 :** "Rappel : maintenance demain matin 2h-6h"
- **19/05 01h :** "Maintenance dans 1h, sauvegardez vos données"

**Résultat attendu :**
- Notifications reçues par tous les utilisateurs
- Page de maintenance informative
- Interruption respectée exactement
- Redémarrage fluide des services

## 📊 Exports et sauvegardes personnelles

### ✅ Scénario : Export données personnelles - RGPD
**Utilisateur :** Marcel Durand
**Contexte :** Demande légale d'export de toutes ses données

**Données à exporter :**
- Profil personnel complet
- Historique des prestations
- Messages échangés
- Documents uploadés
- Évaluations données et reçues
- Paramètres de compte

**Format export :** JSON structuré + ZIP avec documents

**Étapes :**
1. Paramètres → Confidentialité → Exporter mes données
2. Confirmer la demande avec mot de passe
3. Traitement en arrière-plan (24h max)
4. Email avec lien de téléchargement sécurisé

**Résultat attendu :**
- Export complet généré en < 24h
- Lien de téléchargement valide 7 jours
- Données lisibles et structurées
- Respect total de la réglementation RGPD

### ✅ Scénario : Sauvegarde profil aidant
**Utilisateur :** Sofia Lopez
**Objectif :** Backup régulier de son profil professionnel

**Éléments sauvegardés :**
- Certifications et diplômes
- Portfolio photos prestations
- Évaluations clients
- Planning et disponibilités
- Paramètres tarifaires

**Fréquence :** Sauvegarde mensuelle automatique

**Test de restauration :**
1. Simuler perte de données (suppression accidentelle)
2. Demander restauration depuis dernière sauvegarde
3. Vérifier intégrité des données restaurées
4. Confirmer reprise d'activité normale

**Résultat attendu :**
- Sauvegarde automatique fonctionnelle
- Restauration rapide et complète
- Aucune perte de données professionnelles
- Activité maintenue sans interruption

## 📱 Synchronisation multi-appareils

### ✅ Scénario : Senior avec tablette et smartphone
**Utilisateur :** Marcel Durand
**Appareils :** iPad (principal) + iPhone (secours)

**Test de synchronisation :**
1. Modifier photo profil sur iPad
2. Changer préférences notifications sur iPhone
3. Ajouter contact d'urgence sur iPad
4. Vérifier cohérence sur les deux appareils

**Paramètres synchronisés :**
- ✓ Photo de profil mise à jour partout
- ✓ Notifications configurées identiquement
- ✓ Contacts d'urgence accessibles sur les deux
- ✓ Historique des modifications tracé

**Résultat attendu :**
- Synchronisation instantanée entre appareils
- Cohérence parfaite des données
- Aucun conflit ou doublons
- Expérience utilisateur fluide

## 🔄 Import/Export paramètres

### ✅ Scénario : Migration profil suite changement appareil
**Contexte :** Marcel change sa tablette (iPad ancien → iPad récent)
**Objectif :** Retrouver exactement ses paramètres

**Processus de migration :**
1. **Export depuis ancien iPad :**
   - Paramètres → Sauvegarde → Exporter configuration
   - Fichier config-marcel-durand-16052024.json généré

2. **Import sur nouvel iPad :**
   - Installation app AppSeniors
   - Connexion avec identifiants
   - Import → Sélection fichier de configuration
   - Application automatique des paramètres

**Paramètres migrés :**
- Préférences d'affichage (taille police, contraste)
- Notifications configurées
- Contacts d'urgence
- Données de facturation
- Historique des évaluations

**Résultat attendu :**
- Migration complète et transparente
- Aucune reconfiguration manuelle nécessaire
- Expérience utilisateur identique
- Transition fluide entre appareils

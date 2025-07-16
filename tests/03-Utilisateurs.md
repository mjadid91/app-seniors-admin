
# Tests manuels - Gestion des Utilisateurs

## 🎯 Objectif
Vérifier la gestion complète des utilisateurs avec des données réelles de l'application AppSeniors.

## 👤 Gestion des utilisateurs administratifs

### ✅ Scénario : Création d'un utilisateur administrateur
**Données de test :**
- **Nom :** Martineau
- **Prénom :** Claire
- **Email :** claire.martineau@appseniors.fr
- **Téléphone :** 06 78 90 12 34
- **Rôle :** Support
- **Statut :** Actif

**Étapes :**
1. Se connecter en tant qu'admin@appseniors.fr
2. Aller dans Utilisateurs → Ajouter un utilisateur
3. Remplir tous les champs obligatoires
4. Sélectionner le rôle "Support"
5. Cliquer sur "Créer l'utilisateur"

**Résultat attendu :**
- Mot de passe temporaire généré automatiquement
- Email de bienvenue envoyé à claire.martineau@appseniors.fr
- Utilisateur visible dans la liste avec le bon rôle
- Statut "Actif" par défaut

### ✅ Scénario : Modification d'un utilisateur existant
**Utilisateur à modifier :** support@appseniors.fr
**Nouvelles données :**
- **Nom :** Support → Durand
- **Prénom :** Agent → Sophie
- **Téléphone :** 01 23 45 67 89

**Étapes :**
1. Rechercher "support@appseniors.fr" dans la liste
2. Cliquer sur "Modifier"
3. Changer le nom et prénom
4. Ajouter le numéro de téléphone
5. Sauvegarder les modifications

**Résultat attendu :**
- Modifications sauvegardées instantanément
- Historique des modifications tracé
- Email de notification envoyé

## 👴 Gestion des Seniors

### ✅ Scénario : Création d'un profil senior complet
**Données de test :**
- **Informations personnelles :**
  - Nom : Durand
  - Prénom : Marcel
  - Date de naissance : 15/03/1938 (85 ans)
  - Email : marcel.durand@gmail.com
  - Téléphone : 01 45 67 89 12
  - Adresse : 12 rue des Lilas, 75012 Paris

- **Informations spécifiques senior :**
  - Niveau d'autonomie : 3/5
  - Situation familiale : Veuf
  - Nombre d'enfants : 2

- **Contacts d'urgence :**
  - Contact 1 : Marie Durand (Fille) - 06 12 34 56 78
  - Contact 2 : Dr Martin (Médecin) - 01 23 45 67 89

**Étapes :**
1. Aller dans Utilisateurs → Seniors → Ajouter
2. Remplir les informations personnelles
3. Définir le niveau d'autonomie à 3
4. Ajouter les 2 contacts d'urgence
5. Valider la création

**Résultat attendu :**
- Profil senior créé avec toutes les informations
- Vérification de l'âge (doit être > 55 ans)
- Contacts d'urgence liés automatiquement
- Génération automatique d'un identifiant senior

### ✅ Scénario : Senior avec faible autonomie nécessitant un tuteur
**Données de test :**
- **Senior :** Germaine Moreau, 92 ans
- **Niveau d'autonomie :** 2/5
- **Tuteur à assigner :** Marie Durand (fille)

**Étapes :**
1. Créer le profil avec autonomie niveau 2
2. Vérifier l'alerte automatique "Tuteur requis"
3. Assigner Marie Durand comme tutrice
4. Valider les responsabilités

**Résultat attendu :**
- Alerte automatique pour autonomie < 3
- Champ tuteur obligatoire
- Notifications envoyées au tuteur
- Badge "Sous tutelle" visible

## 🤝 Gestion des Aidants

### ✅ Scénario : Création d'un profil aidant professionnel
**Données de test :**
- **Informations personnelles :**
  - Nom : Lopez
  - Prénom : Sofia
  - Email : sofia.lopez@aide-domicile.fr
  - Téléphone : 06 98 76 54 32
  - Date de naissance : 25/06/1985

- **Informations professionnelles :**
  - Expérience : 8 ans en aide à domicile
  - Diplômes : CAP Petite Enfance, Formation premiers secours
  - Spécialités : Aide ménagère, Soins d'hygiène, Garde de nuit

- **Disponibilités :**
  - Lundi-Vendredi : 8h-18h
  - Weekend : Sur demande
  - Zone d'intervention : Paris 12e, 13e, 20e (10km max)

- **Tarification :**
  - Aide ménagère : 18€/h
  - Soins d'hygiène : 22€/h
  - Garde de nuit : 85€/nuit

**Étapes :**
1. Aller dans Utilisateurs → Aidants → Ajouter
2. Remplir le profil personnel complet
3. Ajouter l'expérience et certifications
4. Configurer les disponibilités
5. Définir la grille tarifaire
6. Valider la création

**Résultat attendu :**
- Profil aidant créé avec toutes les compétences
- Calcul automatique de la note initiale
- Disponibilité géographique cartographiée
- Tarifs configurés par prestation

### ✅ Scénario : Évaluation d'un aidant par un senior
**Contexte :** Prestation terminée entre Sofia Lopez et Marcel Durand

**Données d'évaluation :**
- **Note globale :** 4/5 étoiles
- **Critères détaillés :**
  - Ponctualité : 5/5
  - Qualité du service : 4/5
  - Communication : 4/5
  - Propreté : 5/5
- **Commentaire :** "Très professionnelle et attentionnée. Légèrement en retard le 2ème jour mais s'est excusée."

**Étapes :**
1. Accéder au profil de Sofia Lopez
2. Section "Évaluations" → Ajouter une évaluation
3. Saisir les notes par critère
4. Ajouter le commentaire détaillé
5. Valider l'évaluation

**Résultat attendu :**
- Note moyenne mise à jour (4.2/5 → 4.1/5)
- Commentaire visible sur le profil
- Notification envoyée à l'aidant
- Badge "Bien noté" si note > 4/5

## 🔍 Recherche et filtrage avec données réelles

### ✅ Scénario : Recherche multicritères d'aidants
**Critères de recherche :**
- **Zone :** Paris 12e arrondissement
- **Spécialité :** Aide ménagère
- **Disponibilité :** Mercredi 14h-17h
- **Note minimum :** 4/5 étoiles
- **Tarif maximum :** 20€/h

**Résultats attendus :**
- Sofia Lopez (18€/h, note 4.1/5)
- Marie Dubois (19€/h, note 4.3/5)
- Pierre Martin (20€/h, note 4.0/5)

**Test :**
1. Utiliser les filtres avancés
2. Appliquer tous les critères
3. Vérifier la pertinence des résultats
4. Tester le tri par note/tarif

### ✅ Scénario : Recherche de senior par nom
**Recherche :** "Durand"
**Résultats attendus :**
- Marcel Durand (Senior, 85 ans, Paris 12e)
- Marie Durand (Tutrice, 58 ans)
- Paul Durand (Senior, 72 ans, Lyon)

## 📊 Statistiques réelles

### ✅ Scénario : Tableau de bord utilisateurs
**Données attendues :**
- **Total utilisateurs :** 1,247
  - Seniors : 834 (67%)
  - Aidants : 156 (12%)
  - Administratifs : 15 (1%)
  - Autres : 242 (20%)

- **Répartition géographique :**
  - Île-de-France : 45%
  - Auvergne-Rhône-Alpes : 15%
  - PACA : 12%
  - Autres régions : 28%

**Résultat attendu :**
- Graphiques mis à jour en temps réel
- Pourcentages cohérents (total = 100%)
- Évolution par rapport au mois précédent

## 🔒 Permissions et sécurité

### ✅ Scénario : Contrôle d'accès par rôle
**Tests par rôle :**

1. **Administrateur (admin@appseniors.fr) :**
   - Peut créer/modifier/supprimer tous les utilisateurs
   - Accès aux données sensibles (revenus, statistiques)
   - Peut changer les rôles utilisateurs

2. **Modérateur (moderateur@appseniors.fr) :**
   - Lecture seule sur tous les profils
   - Peut modérer les contenus utilisateurs
   - Pas d'accès aux données financières

3. **Support (support@appseniors.fr) :**
   - Lecture seule sur tous les profils
   - Peut créer des tickets support
   - Pas de modification des données utilisateurs

**Test :**
1. Se connecter avec chaque rôle
2. Tenter d'accéder aux fonctions
3. Vérifier les restrictions appropriées

## 📱 Tests responsive et mobile

### ✅ Scénario : Gestion utilisateurs sur mobile
**Appareil :** iPhone 12 (375px de largeur)

**Tests :**
1. Navigation dans la liste utilisateurs
2. Recherche par nom
3. Consultation d'un profil senior
4. Modification des informations de base

**Résultat attendu :**
- Interface adaptée tactile
- Formulaires ergonomiques
- Navigation intuitive
- Pas de perte de fonctionnalités

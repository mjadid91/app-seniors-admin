
# Tests manuels - Connexion

## 🎯 Objectif
Vérifier le système d'authentification avec des comptes utilisateurs réels de la base de données AppSeniors.

## 🔐 Authentification avec comptes réels

### ✅ Scénario : Connexion Administrateur
- **Email de test :** admin@appseniors.fr
- **Mot de passe :** AdminTest2024!
- **Rôle attendu :** Administrateur

**Étapes :**
1. Accéder à /connexion
2. Saisir admin@appseniors.fr
3. Saisir AdminTest2024!
4. Cliquer sur "Se connecter"

**Résultat attendu :**
- Redirection vers /dashboard
- Menu complet visible (tous les modules)
- Badge "Administrateur" affiché
- Accès à toutes les fonctionnalités

### ✅ Scénario : Connexion Modérateur
- **Email de test :** moderateur@appseniors.fr
- **Mot de passe :** ModTest2024!
- **Rôle attendu :** Modérateur

**Étapes :**
1. Saisir moderateur@appseniors.fr
2. Saisir ModTest2024!
3. Se connecter

**Résultat attendu :**
- Accès à : Dashboard, Utilisateurs (lecture), Modération, Support
- Pas d'accès à : Finances, Paramètres système
- Badge "Modérateur" visible

### ✅ Scénario : Connexion Support
- **Email de test :** support@appseniors.fr
- **Mot de passe :** SupportTest2024!
- **Rôle attendu :** Support

**Étapes :**
1. Saisir support@appseniors.fr
2. Saisir SupportTest2024!
3. Se connecter

**Résultat attendu :**
- Accès à : Dashboard, Support, Utilisateurs (lecture)
- Restriction sur modification des données
- Badge "Support" affiché

## ❌ Tests d'erreurs avec données réelles

### ✅ Scénario : Email invalide
- **Email de test :** utilisateur.inexistant@test.fr
- **Mot de passe :** MotDePasseQuelconque123

**Résultat attendu :**
- Message : "Email ou mot de passe incorrect"
- Pas de redirection
- Champs restent remplis

### ✅ Scénario : Mot de passe incorrect
- **Email de test :** admin@appseniors.fr
- **Mot de passe :** MauvaisMotDePasse123

**Résultat attendu :**
- Message : "Email ou mot de passe incorrect"
- Compteur de tentatives (sécurité)

### ✅ Scénario : Compte désactivé
- **Email de test :** utilisateur.desactive@appseniors.fr
- **Mot de passe :** TestDesactive2024!

**Résultat attendu :**
- Message : "Votre compte est désactivé. Contactez l'administrateur."
- Redirection vers page de contact

## 🔄 Gestion de session réelle

### ✅ Scénario : Persistance de session
1. Se connecter avec admin@appseniors.fr
2. Fermer l'onglet
3. Rouvrir l'application

**Résultat attendu :**
- Utilisateur toujours connecté
- Pas de nouvelle demande de connexion

### ✅ Scénario : Expiration de session
1. Se connecter
2. Attendre 24h (ou modifier manuellement l'expiration)
3. Tenter d'accéder à une page

**Résultat attendu :**
- Redirection automatique vers /connexion
- Message : "Votre session a expiré"

## 🛡️ Sécurité avec tentatives réelles

### ✅ Scénario : Limitation des tentatives
1. Tenter 5 connexions échouées avec admin@appseniors.fr
2. Utiliser différents mots de passe incorrects

**Résultat attendu :**
- Blocage temporaire après 5 tentatives
- Message : "Trop de tentatives. Réessayez dans 15 minutes"

## 📱 Tests responsive

### ✅ Scénario : Connexion mobile
- **Appareil :** iPhone 12 (375px)
- **Email :** admin@appseniors.fr
- **Mot de passe :** AdminTest2024!

**Résultat attendu :**
- Interface adaptée tactile
- Champs de saisie ergonomiques
- Boutons facilement cliquables

### ✅ Scénario : Connexion tablette
- **Appareil :** iPad (768px)
- **Email :** moderateur@appseniors.fr

**Résultat attendu :**
- Layout optimisé tablette
- Navigation intuitive

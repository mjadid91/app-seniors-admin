
# Tests manuels - Authentification

## 🎯 Objectif
Vérifier le système d'authentification complet avec les différentes sources d'utilisateurs.

## 🔐 Authentification database

### Connexion utilisateur base de données
- [ ] Se connecter avec un email valide de la base
- [ ] Saisir le mot de passe correct
- [ ] Vérifier la redirection vers le dashboard
- [ ] Contrôler la session utilisateur créée

### Validation des données
- [ ] Tester avec un email inexistant
- [ ] Tester avec un mot de passe incorrect
- [ ] Vérifier les messages d'erreur appropriés
- [ ] Contrôler la gestion des comptes désactivés

### Gestion des rôles
- [ ] Connexion en tant qu'Administrateur
- [ ] Connexion en tant que Modérateur
- [ ] Connexion en tant que Support
- [ ] Connexion en tant que Visualisateur
- [ ] Vérifier l'attribution correcte des permissions

## 🔄 Gestion de session

### État d'authentification
- [ ] Vérifier l'initialisation de l'authentification
- [ ] Contrôler le loading pendant la vérification
- [ ] Confirmer l'état authentifié après connexion
- [ ] Tester la persistance de la session

### Hook useSupabaseAuth
- [ ] Vérifier les états : loading, isInitialized, isAuthenticated
- [ ] Contrôler la synchronisation avec le store Zustand
- [ ] Tester la récupération des données utilisateur
- [ ] Vérifier la gestion des erreurs d'authentification

## 🏪 Store Zustand (authStore)

### Synchronisation des données
- [ ] Mise à jour automatique des données utilisateur
- [ ] Synchronisation du statut d'authentification
- [ ] Persistence des informations de session
- [ ] Nettoyage lors de la déconnexion

### Données utilisateur
- [ ] ID utilisateur correct
- [ ] Nom et prénom récupérés
- [ ] Email de connexion
- [ ] Rôle assigné correctement
- [ ] Date d'inscription

## 🔒 Sécurité et protection

### Comptes désactivés
- [ ] Tentative de connexion avec compte désactivé
- [ ] Affichage du message d'erreur approprié
- [ ] Information de contact administrateur
- [ ] Redirection vers la page de connexion

### Validation des entrées
- [ ] Format email valide requis
- [ ] Champs obligatoires vérifiés
- [ ] Protection contre les injections
- [ ] Limitation des tentatives de connexion

## 🔄 Redirections et navigation

### Pages de redirection
- [ ] Utilisateur non connecté → /connexion
- [ ] Utilisateur connecté → /dashboard
- [ ] Page inexistante → /404
- [ ] Accès page protégée sans auth → /connexion

### Navigation après connexion
- [ ] Accès à toutes les pages autorisées par le rôle
- [ ] Restriction des pages non autorisées
- [ ] Fonctionnement du menu de navigation
- [ ] Bouton de déconnexion disponible

## 🎨 Interface utilisateur

### Page de connexion
- [ ] Design responsive (mobile, tablette, desktop)
- [ ] Champs email et mot de passe visibles
- [ ] Bouton de connexion fonctionnel
- [ ] Messages d'erreur bien affichés
- [ ] Loading pendant la tentative de connexion

### Composants Shadcn/UI
- [ ] Card d'authentification bien stylée
- [ ] Input avec validation visuelle
- [ ] Button avec état de chargement
- [ ] Label correctement associés
- [ ] Toast pour les notifications d'erreur

## ⚡ Performance et UX

### Temps de réponse
- [ ] Connexion rapide (< 2 secondes)
- [ ] Feedback visuel pendant le chargement
- [ ] Transition fluide vers le dashboard
- [ ] Pas de clignotement d'interface

### Gestion des erreurs
- [ ] Messages d'erreur clairs et utiles
- [ ] Pas de détails techniques exposés
- [ ] Possibilité de réessayer facilement
- [ ] Instructions pour résoudre les problèmes

## 🔐 Tests de sécurité

### Tentatives malveillantes
- [ ] Tentatives de force brute limitées
- [ ] Protection contre l'énumération d'utilisateurs
- [ ] Validation côté serveur des données
- [ ] Logs des tentatives de connexion suspectes

### Gestion des sessions
- [ ] Session expirée correctement gérée
- [ ] Déconnexion automatique après inactivité
- [ ] Pas de fuite d'information en session
- [ ] Nettoyage complet à la déconnexion

## 🧪 Tests d'intégration

### Base de données
- [ ] Requête utilisateur dans la table Utilisateurs
- [ ] Jointure avec CatUtilisateurs pour les rôles
- [ ] Gestion des utilisateurs sans catégorie
- [ ] Performance des requêtes d'authentification

### Client Supabase
- [ ] Configuration correcte du client
- [ ] Gestion des erreurs de connexion
- [ ] Retry automatique en cas d'échec réseau
- [ ] Timeout approprié des requêtes

## 📱 Tests multi-devices

### Responsive design
- [ ] Affichage correct sur iPhone (375px)
- [ ] Affichage correct sur iPad (768px)
- [ ] Affichage correct sur desktop (1200px+)
- [ ] Navigation tactile fonctionnelle

### Compatibilité navigateurs
- [ ] Chrome (dernière version)
- [ ] Firefox (dernière version)
- [ ] Safari (dernière version)
- [ ] Edge (dernière version)

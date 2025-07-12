
# Architecture Technique - AppSeniors Admin

## 📐 Vue d'ensemble de l'architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          ARCHITECTURE APPSENIORS ADMIN                      │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────┐    HTTP/HTTPS     ┌──────────────────┐    WebSocket/HTTP
│                 │ ◄──────────────► │                  │ ◄──────────────►
│   UTILISATEUR   │                  │    FRONTEND      │
│                 │                  │   React + CSS    │
└─────────────────┘                  └──────────────────┘
                                              │
                                              │ API REST
                                              │ (JSON)
                                              ▼
                                     ┌──────────────────┐
                                     │     BACKEND      │
                                     │ Node.js + API    │ ◄──┐
                                     └──────────────────┘    │
                                              │              │
                        ┌─────────────────────┼──────────────┼─────────────┐
                        │                     │              │             │
                        ▼                     ▼              │             ▼
               ┌──────────────────┐  ┌──────────────────┐    │    ┌──────────────────┐
               │ AUTHENTIFICATION │  │  BASE DE DONNÉES │    │    │   SERVICES TIERS │
               │ Supabase Auth    │  │   PostgreSQL     │    │    │   (Email, etc.)  │
               │     + JWT        │  │ Local + Supabase │    │    └──────────────────┘
               └──────────────────┘  └──────────────────┘    │
                        │                     │              │
                        └─────────────────────┼──────────────┘
                                              │
                                              ▼
                                   ┌──────────────────┐
                                   │   HÉBERGEMENT    │
                                   │ Environnement    │
                                   │     Local        │
                                   └──────────────────┘
```

---

## 🎨 Frontend - React + Tailwind CSS

### Description
Interface utilisateur moderne construite avec React 18 et stylisée avec Tailwind CSS pour une expérience utilisateur fluide et responsive.

### Composants principaux
- **Pages** : Dashboard, Support, Utilisateurs, Finances, etc.
- **Composants UI** : Modals, Forms, Tables, Charts
- **Système de routage** : React Router pour la navigation SPA
- **État global** : Zustand pour la gestion d'état

### Technologies utilisées
```
React 18.3.1          → Framework principal
Tailwind CSS 3.x      → Framework CSS utilitaire
TypeScript            → Typage statique
Vite                  → Build tool et dev server
Shadcn/UI             → Composants UI pré-stylés
Lucide React          → Icônes
React Hook Form       → Gestion des formulaires
```

### Flux de données
```
Utilisateur → Composant React → Hook personnalisé → API Backend
    ▲                                                      │
    └──────────── Mise à jour UI ◄─── Réponse API ◄───────┘
```

---

## ⚙️ Backend - Node.js + API REST

### Description
Serveur API RESTful basé sur Node.js gérant la logique métier, les validations et les interactions avec la base de données.

### Architecture API
```
/api
  ├── /auth          → Authentification et sessions
  ├── /users         → Gestion des utilisateurs
  ├── /support       → Système de tickets
  ├── /finances      → Gestion financière
  ├── /documents     → Gestion documentaire
  └── /dashboard     → Données du tableau de bord
```

### Middlewares
- **Authentification** : Vérification des tokens JWT
- **Autorisation** : Contrôle des permissions par rôle
- **Validation** : Validation des données entrantes
- **Logging** : Traçabilité des requêtes
- **CORS** : Gestion des requêtes cross-origin

### Flux de traitement
```
Requête HTTP → Middleware Auth → Middleware Validation → Contrôleur → Service → Base de données
      │                                                                              │
      └─────────── Réponse JSON ◄─── Format réponse ◄─── Logique métier ◄─────────┘
```

---

## 🔐 Authentification - Supabase Auth + JWT

### Description
Système d'authentification robuste basé sur Supabase Auth avec tokens JWT pour la sécurisation des endpoints.

### Mécanisme d'authentification
```
┌─────────────────┐    Login     ┌──────────────────┐    Verify    ┌─────────────────┐
│   Utilisateur   │ ──────────► │  Supabase Auth   │ ──────────► │   JWT Token     │
└─────────────────┘             └──────────────────┘             └─────────────────┘
         │                               │                                │
         │ Stockage local               │ Gestion sessions               │ API calls
         ▼                               ▼                                ▼
┌─────────────────┐             ┌──────────────────┐            ┌─────────────────┐
│  localStorage   │             │   Session Store  │            │  Headers Auth   │
└─────────────────┘             └──────────────────┘            └─────────────────┘
```

### Fonctionnalités
- **Connexion/Déconnexion** : Email + mot de passe
- **Gestion des sessions** : Refresh automatique des tokens
- **Réinitialisation** : Mot de passe oublié
- **Rôles et permissions** : Système de contrôle d'accès
- **Sécurité** : Chiffrement et validation des tokens

### Cycle de vie des tokens
```
Connexion → Token généré → Stockage sécurisé → Utilisation API → Refresh automatique → Expiration
    │                                                                      │
    └──────────────────── Nouvelle session ◄─── Token expiré ◄────────────┘
```

---

## 🗄️ Base de Données - PostgreSQL

### Architecture hybride
```
┌─────────────────────────────────────────────────────────────────┐
│                    DONNÉES APPLICATIVES                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐           ┌─────────────────────────────┐  │
│  │ PostgreSQL      │    Sync   │     Supabase Cloud          │  │
│  │    Local        │ ◄────────► │   PostgreSQL + Services    │  │
│  │                 │           │                             │  │
│  │ • Développement │           │ • Base partagée             │  │
│  │ • Tests locaux  │           │ • Auth service              │  │
│  │ • Rapidité      │           │ • Storage service           │  │
│  └─────────────────┘           │ • Edge functions            │  │
│                                └─────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Tables principales
```sql
-- Gestion des utilisateurs
Utilisateurs
CatUtilisateurs
Seniors
Aidant

-- Système de support
SupportClient
ReponsesSupport
PrestationSupport

-- Gestion financière
Commande
Facture
VersementCommissions

-- Gestion documentaire
Document
DocumentRGPD
DocumentPatrimonial

-- Prestations et services
Prestation
MiseEnRelation
Partenaire
```

### Flux de données
```
Application Locale → PostgreSQL Local → Synchronisation → Supabase Cloud
       │                     │                                   │
       └─── Développement ────┘                                   │
                                                                  │
Client distant ────── API Supabase ◄─── Base partagée ◄─────────┘
```

---

## 🌐 Services Tiers et Intégrations

### Supabase Services
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Supabase Auth  │    │ Supabase Storage│    │ Edge Functions  │
│                 │    │                 │    │                 │
│ • JWT tokens    │    │ • File uploads  │    │ • Email sending │
│ • User sessions │    │ • Doc storage   │    │ • API webhooks  │
│ • Password mgmt │    │ • Public URLs   │    │ • Custom logic  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Services externes
- **Email** : Service d'envoi via Edge Functions
- **Stockage** : Supabase Storage pour documents
- **Notifications** : Système interne de notifications

---

## 🏠 Hébergement - Environnement Local

### Configuration de développement
```
┌─────────────────────────────────────────────────────────────────┐
│                  ENVIRONNEMENT LOCAL                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Frontend (Port 5173)     Backend (Port 3000)                  │
│  ┌─────────────────┐     ┌─────────────────────────────────┐   │
│  │ Vite Dev Server │     │ Node.js Express Server          │   │
│  │                 │     │                                 │   │
│  │ • Hot reload    │     │ • API endpoints                 │   │
│  │ • Fast refresh  │     │ • Middleware stack              │   │
│  │ • Source maps   │     │ • Database connections          │   │
│  └─────────────────┘     └─────────────────────────────────┘   │
│           │                            │                       │
│           └──── HTTP Proxy ────────────┘                       │
│                                                                 │
│  Base de données (Port 5432)                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ PostgreSQL Local Instance                               │   │
│  │                                                         │   │
│  │ • Tables de développement                               │   │
│  │ • Données de test                                       │   │
│  │ • Migrations automatiques                               │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Avantages de l'environnement local
- **Rapidité** : Pas de latence réseau
- **Autonomie** : Développement offline possible
- **Contrôle** : Maîtrise complète de l'environnement
- **Débogage** : Outils de développement accessibles
- **Coûts** : Pas de frais d'hébergement en développement

---

## 🔄 Flux de Données Globaux

### Flux d'authentification
```
1. Utilisateur saisit identifiants
2. Frontend → Supabase Auth
3. Supabase Auth → JWT Token
4. Token stocké localement
5. Token envoyé avec chaque requête API
6. Backend vérifie et valide le token
7. Accès autorisé aux ressources
```

### Flux de création de ticket support
```
1. Utilisateur remplit formulaire
2. Frontend valide données localement
3. Frontend → Backend API (/api/support/tickets)
4. Backend valide et applique règles métier
5. Backend → Base de données (INSERT)
6. Backend → Service email (notification)
7. Backend → Frontend (confirmation)
8. Frontend met à jour interface utilisateur
```

### Flux de gestion des documents
```
1. Utilisateur sélectionne fichier
2. Frontend → Supabase Storage (upload)
3. Supabase Storage → URL publique
4. Frontend → Backend API (métadonnées)
5. Backend → Base de données (référence)
6. Backend → Frontend (confirmation)
```

---

## 📊 Performance et Monitoring

### Métriques clés
- **Temps de chargement** : < 2 secondes
- **Temps de réponse API** : < 500ms
- **Disponibilité** : > 99% en local
- **Taille des bundles** : < 1MB compressé

### Outils de monitoring
- **Console développeur** : Logs en temps réel
- **React DevTools** : Inspection des composants
- **Network Tab** : Analyse des requêtes
- **Supabase Dashboard** : Monitoring des services

---

## 🔧 Configuration et Déploiement

### Variables d'environnement
```env
# Supabase
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxx

# API locale
VITE_API_URL=http://localhost:3000

# Base de données locale
DATABASE_URL=postgresql://localhost:5432/appseniors
```

### Scripts de développement
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "db:migrate": "supabase db reset",
    "db:seed": "node scripts/seed.js"
  }
}
```

---

## 🚀 Évolution Future

### Prochaines étapes
1. **Containerisation** : Docker pour la portabilité
2. **CI/CD** : Pipeline d'intégration continue
3. **Tests automatisés** : Suite de tests complète
4. **Monitoring avancé** : Métriques de performance
5. **Déploiement cloud** : Migration vers production

### Scalabilité
- **Microservices** : Séparation des domaines métier
- **Cache** : Redis pour les performances
- **CDN** : Distribution des assets statiques
- **Load balancing** : Répartition de charge

---

*Architecture documentée le : 2025-01-12*  
*Version : 1.0*  
*Responsable technique : [À compléter]*


# Spécification Technique - Ajout de Ticket Support par Utilisateur

## 📋 Informations générales

| Élément | Détail |
|---------|--------|
| **Fonctionnalité** | Ajout d'un ticket support par un utilisateur |
| **Version** | 1.0 |
| **Date** | 2025-01-12 |
| **Statut** | En développement |
| **Priorité** | Haute |

---

## 🎯 Description fonctionnelle

### Objectif
Permettre aux utilisateurs authentifiés de créer des tickets de support pour signaler des problèmes, demander de l'aide ou faire des suggestions concernant la plateforme AppSeniors Admin.

### Contexte métier
Cette fonctionnalité s'inscrit dans le système de support client global de l'application, permettant une gestion centralisée des demandes d'assistance et un suivi efficace des problèmes rencontrés par les utilisateurs.

### Processus utilisateur
1. L'utilisateur accède à la page Support
2. Il clique sur "Ajouter un ticket"
3. Il remplit le formulaire de création
4. Il valide et soumet le ticket
5. Le système confirme la création et assigne automatiquement le ticket

---

## 👥 Utilisateurs concernés

### Utilisateurs primaires
- **Clients** (IDCatUtilisateurs = 1-4) : Peuvent créer des tickets pour leurs propres besoins
- **Seniors** (IDCatUtilisateurs = 2) : Peuvent signaler des problèmes d'utilisation
- **Aidants** (IDCatUtilisateurs = 3) : Peuvent demander du support technique

### Utilisateurs secondaires
- **Agents Support** (IDCatUtilisateurs = 8) : Reçoivent et traitent les tickets
- **Administrateurs** (IDCatUtilisateurs = 5) : Supervisent le processus global

---

## ⚡ Prérequis

### Prérequis techniques
- Utilisateur authentifié avec session Supabase valide
- Accès à la page Support autorisé par les permissions
- Connexion stable à la base de données

### Prérequis fonctionnels
- L'utilisateur doit avoir un profil complet dans la base
- Les agents de support doivent être configurés dans le système
- Les catégories de priorité doivent être définies

### Prérequis de données
- Table `SupportClient` accessible en écriture
- Table `PrestationSupport` accessible pour assignation
- Vue `support_dashboard_view` disponible pour consultation

---

## 📝 Règles métier

### RG-001 : Validation des données
- Le sujet du ticket est obligatoire (min 5 caractères, max 200 caractères)
- La description est obligatoire (min 10 caractères, max 2000 caractères)
- La priorité doit être parmi : "Faible", "Normale", "Haute", "Urgente"

### RG-002 : Assignation automatique
- Si aucun agent n'est sélectionné : statut = "en_attente"
- Si un agent est sélectionné : statut = "en_cours" + création PrestationSupport

### RG-003 : Traçabilité
- DateEnvoi = date système actuelle
- IDUtilisateursClient = ID de l'utilisateur connecté
- Chaque ticket reçoit un ID unique auto-généré

### RG-004 : Notifications
- Email automatique envoyé au client après création
- Notification aux agents si assignation directe

### RG-005 : Limitations
- Maximum 5 tickets ouverts par utilisateur simultanément
- Délai minimum de 5 minutes entre deux créations

---

## 🔧 Champs obligatoires

### Formulaire de création

| Champ | Type | Obligatoire | Validation | Valeur par défaut |
|-------|------|-------------|------------|------------------|
| `sujet` | String | ✅ | 5-200 caractères | - |
| `descriptionDemande` | Text | ✅ | 10-2000 caractères | - |
| `clientId` | Integer | ✅ | ID utilisateur valide | ID connecté |
| `priorite` | Enum | ✅ | ["Faible", "Normale", "Haute", "Urgente"] | "Normale" |
| `agentId` | Integer | ❌ | ID agent support valide | null |

### Champs système (auto-générés)

| Champ | Type | Génération | Valeur |
|-------|------|------------|--------|
| `IDTicketClient` | Integer | Auto-increment | Généré automatiquement |
| `DateEnvoi` | Date | Système | Date actuelle (YYYY-MM-DD) |
| `StatutDemande` | Enum | Logique métier | "en_attente" ou "en_cours" |

---

## 🌐 Routes API

### POST /api/support/tickets
**Méthode** : `POST`  
**Description** : Création d'un nouveau ticket support  
**Authentification** : Requise  

#### Payload de requête
```json
{
  "sujet": "string (required, 5-200 chars)",
  "descriptionDemande": "string (required, 10-2000 chars)",
  "clientId": "integer (required)",
  "priorite": "enum (required) ['Faible', 'Normale', 'Haute', 'Urgente']",
  "agentId": "integer (optional)"
}
```

#### Réponse succès (201)
```json
{
  "success": true,
  "data": {
    "ticketId": 12345,
    "statut": "en_attente",
    "dateCreation": "2025-01-12T10:30:00Z",
    "numeroTicket": "TIC-2025-001234"
  },
  "message": "Ticket créé avec succès"
}
```

### GET /api/support/agents
**Méthode** : `GET`  
**Description** : Liste des agents de support disponibles  
**Authentification** : Requise  

#### Réponse succès (200)
```json
{
  "success": true,
  "data": [
    {
      "id": 8,
      "nom": "Dupont",
      "prenom": "Marie",
      "email": "marie.dupont@appseniors.com",
      "disponible": true
    }
  ]
}
```

### GET /api/users/clients
**Méthode** : `GET`  
**Description** : Liste des clients pour sélection  
**Authentification** : Requise (admin/support uniquement)  

#### Réponse succès (200)
```json
{
  "success": true,
  "data": [
    {
      "id": 123,
      "nom": "Martin",
      "prenom": "Pierre",
      "email": "pierre.martin@email.com"
    }
  ]
}
```

---

## ⚠️ Gestion des erreurs

### Erreurs de validation (400)

| Code | Message | Cause | Action utilisateur |
|------|---------|-------|-------------------|
| `TICKET_SUBJECT_REQUIRED` | "Le sujet du ticket est obligatoire" | Champ sujet vide | Remplir le sujet |
| `TICKET_SUBJECT_TOO_SHORT` | "Le sujet doit contenir au moins 5 caractères" | Sujet < 5 caractères | Allonger le sujet |
| `TICKET_DESCRIPTION_REQUIRED` | "La description est obligatoire" | Description vide | Remplir la description |
| `INVALID_PRIORITY` | "Priorité invalide" | Priorité non autorisée | Sélectionner une priorité valide |
| `CLIENT_ID_REQUIRED` | "L'ID client est obligatoire" | ClientId manquant | Sélectionner un client |

### Erreurs métier (422)

| Code | Message | Cause | Action utilisateur |
|------|---------|-------|-------------------|
| `MAX_TICKETS_REACHED` | "Limite de tickets ouverts atteinte (5 max)" | Trop de tickets ouverts | Attendre la résolution d'autres tickets |
| `RATE_LIMIT_EXCEEDED` | "Veuillez attendre 5 minutes avant de créer un nouveau ticket" | Création trop fréquente | Patienter |
| `AGENT_NOT_AVAILABLE` | "L'agent sélectionné n'est pas disponible" | Agent occupé/absent | Choisir un autre agent ou laisser vide |

### Erreurs système (500)

| Code | Message | Cause | Action système |
|------|---------|-------|----------------|
| `DATABASE_ERROR` | "Erreur lors de la sauvegarde" | Problème DB | Retry automatique + log |
| `EMAIL_SEND_FAILED` | "Ticket créé mais email non envoyé" | Service email HS | Ticket valide, retry email |
| `ASSIGNMENT_FAILED` | "Erreur lors de l'assignation" | Échec PrestationSupport | Ticket en attente |

### Erreurs d'authentification (401/403)

| Code | Message | Cause | Action utilisateur |
|------|---------|-------|-------------------|
| `UNAUTHORIZED` | "Authentification requise" | Session expirée | Se reconnecter |
| `FORBIDDEN` | "Accès refusé à cette fonctionnalité" | Permissions insuffisantes | Contacter un administrateur |

---

## 🔄 Flux de données

### Diagramme de séquence
```
Utilisateur -> Frontend -> API -> Database -> Email Service
     |            |        |        |           |
     |            |        |        |           v
     |            |        |        |    Notification envoyée
     |            |        |        v
     |            |        |   Ticket créé
     |            |        v
     |            |   Validation OK
     |            v
     |    Confirmation affichée
     v
Interface mise à jour
```

### Étapes détaillées
1. **Validation côté client** : Contrôle des champs obligatoires
2. **Soumission API** : Envoi des données validées
3. **Validation serveur** : Vérification des règles métier
4. **Insertion base** : Création en base de données
5. **Assignation conditionnelle** : Si agent sélectionné
6. **Notification email** : Envoi automatique
7. **Retour utilisateur** : Confirmation de création

---

## 📊 Métriques et monitoring

### Indicateurs de performance
- Temps de création d'un ticket : < 2 secondes
- Taux de succès de création : > 99%
- Temps de réponse API : < 500ms

### Logs à implémenter
- Tentatives de création de tickets
- Échecs de validation avec détails
- Erreurs d'assignation d'agents
- Échecs d'envoi d'emails

---

## 🧪 Tests à effectuer

### Tests unitaires
- Validation des champs du formulaire
- Logique d'assignation automatique
- Génération des IDs et dates

### Tests d'intégration
- Création complète ticket + assignation
- Envoi d'emails de notification
- Mise à jour des vues dashboard

### Tests utilisateur
- Parcours complet de création
- Gestion des cas d'erreur
- Affichage des confirmations

---

## 📅 Planning de développement

| Phase | Durée | Tâches |
|-------|-------|--------|
| **Phase 1** | 2 jours | Interface utilisateur + validation |
| **Phase 2** | 1 jour | API de création + tests |
| **Phase 3** | 1 jour | Système de notifications |
| **Phase 4** | 1 jour | Tests et corrections |

**Durée totale estimée : 5 jours**

---

## ✅ Critères d'acceptation

- [ ] Un utilisateur authentifié peut créer un ticket
- [ ] Tous les champs obligatoires sont validés
- [ ] L'assignation automatique fonctionne correctement
- [ ] Les notifications par email sont envoyées
- [ ] Les erreurs sont gérées et affichées clairement
- [ ] La liste des tickets est mise à jour automatiquement
- [ ] Les performances respectent les seuils définis

---

*Document validé par : [À compléter]*  
*Date de validation : [À compléter]*


# Diagramme de Cas d'Utilisation - AppSeniors Admin

## Vue d'ensemble
Ce diagramme présente les cas d'utilisation du système AppSeniors Admin avec les quatre acteurs principaux et leurs interactions avec le système.

## Acteurs

### 1. Administrateur
**Rôle** : Accès complet à toutes les fonctionnalités du système
**IDCatUtilisateur** : 5

### 2. Modérateur  
**Rôle** : Spécialisé dans la modération des contenus
**IDCatUtilisateur** : 6

### 3. Support
**Rôle** : Spécialisé dans le support client
**IDCatUtilisateur** : 8

### 4. Visualisateur
**Rôle** : Accès en lecture seule à toutes les pages
**IDCatUtilisateur** : 7

## Relations entre Acteurs

```
Utilisateur Système (Acteur abstrait)
    ↑
    ├── Administrateur
    ├── Modérateur  
    ├── Support
    └── Visualisateur
```

**Généralisation** : Tous les acteurs héritent des fonctionnalités de base d'un "Utilisateur Système"

## Cas d'Utilisation par Acteur

### 🔧 Administrateur
*Hérite de tous les cas d'usage des autres acteurs*

#### Gestion des Utilisateurs
- **Consulter les utilisateurs** *(hérité de Visualisateur)*
- **Ajouter un utilisateur**
  - *Include* : Vérifier les permissions
  - *Include* : Générer un mot de passe
  - *Include* : Assigner un rôle
- **Modifier un utilisateur**
  - *Include* : Vérifier les permissions
  - *Extend* : Changer le rôle utilisateur
- **Supprimer un utilisateur**
  - *Include* : Vérifier les permissions
  - *Include* : Confirmer la suppression

#### Gestion des Prestations
- **Consulter les prestations** *(hérité de Visualisateur)*
- **Ajouter une prestation**
  - *Include* : Sélectionner un domaine
  - *Include* : Définir un tarif
- **Modifier une prestation**
- **Ajouter un domaine de prestation**

#### Gestion Financière
- **Consulter les finances** *(hérité de Visualisateur)*
- **Gérer les transactions**
  - *Extend* : Ajouter une commission
  - *Extend* : Ajouter une cagnotte
  - *Extend* : Ajouter un don
- **Gérer les commissions**
- **Exporter les données financières**

#### Gestion des Partenaires
- **Consulter les partenaires** *(hérité de Visualisateur)*
- **Ajouter un partenaire**
  - *Include* : Définir les services
- **Créer un bon plan**
  - *Include* : Associer à un partenaire
- **Modifier un partenaire**

#### Gestion des Documents
- **Consulter les documents** *(hérité de Visualisateur)*
- **Télécharger un document**
- **Catégoriser un document**
- **Modifier un document**
- **Supprimer un document**

#### Gestion RGPD
- **Consulter les demandes RGPD** *(hérité de Visualisateur)*
- **Traiter une demande RGPD**
  - *Include* : Vérifier la conformité
  - *Extend* : Exporter les données utilisateur
  - *Extend* : Supprimer les données utilisateur

#### Administration Système
- **Gérer les rôles et permissions**
- **Exporter des données**
- **Configurer les paramètres système**

---

### 🛡️ Modérateur
*Hérite des fonctionnalités de base + accès Dashboard*

#### Modération des Contenus
- **Consulter le dashboard de modération**
- **Consulter les signalements**
  - *Extend* : Filtrer par statut
  - *Extend* : Filtrer par date
- **Traiter un signalement**
  - *Include* : Évaluer le contenu
  - *Extend* : Masquer le contenu
  - *Extend* : Supprimer le contenu
  - *Extend* : Rejeter le signalement

#### Modération des Forums
- **Consulter les posts de forum**
- **Modérer un post de forum**
  - *Include* : Consulter les détails
  - *Extend* : Masquer le post
  - *Extend* : Supprimer le post
- **Ajouter un forum** *(pour tests)*
- **Ajouter un sujet de forum** *(pour tests)*

#### Modération des Groupes
- **Consulter les messages de groupes**
- **Modérer un message de groupe**
  - *Include* : Consulter les détails
  - *Extend* : Masquer le message
  - *Extend* : Supprimer le message
- **Ajouter un groupe** *(pour tests)*
- **Ajouter un message de groupe** *(pour tests)*

#### Actions de Modération
- **Marquer un contenu comme traité**
- **Masquer un contenu**
- **Supprimer un contenu définitivement**

---

### 🎧 Support
*Hérite des fonctionnalités de base + accès Dashboard*

#### Gestion des Tickets
- **Consulter le dashboard support**
- **Consulter les tickets support**
  - *Extend* : Filtrer par statut
  - *Extend* : Filtrer par priorité
  - *Extend* : Filtrer par agent assigné
- **Consulter un ticket**
  - *Include* : Voir l'historique des réponses
  - *Extend* : Répondre au ticket
  - *Extend* : Assigner le ticket
  - *Extend* : Résoudre le ticket
- **Répondre à un ticket**
  - *Include* : Envoyer la notification
- **Assigner un ticket**
  - *Include* : Sélectionner un agent
  - *Include* : Changer le statut
- **Résoudre un ticket**
  - *Include* : Ajouter une note de résolution
  - *Include* : Changer le statut
- **Créer un ticket** *(pour tests)*

#### Gestion des Réponses
- **Consulter les réponses aux tickets**
- **Télécharger les fichiers joints**

---

### 👁️ Visualisateur
*Accès en lecture seule à toutes les pages*

#### Consultation Générale
- **Consulter le dashboard principal**
  - *Include* : Voir les statistiques globales
  - *Include* : Voir les activités récentes
  - *Include* : Voir les graphiques de tendances

#### Consultation des Utilisateurs
- **Consulter la liste des utilisateurs**
  - *Extend* : Filtrer les utilisateurs
  - *Extend* : Rechercher un utilisateur
- **Consulter les détails d'un utilisateur**
- **Consulter les seniors**
- **Consulter les aidants**

#### Consultation des Prestations
- **Consulter les prestations**
  - *Extend* : Filtrer par statut
  - *Extend* : Filtrer par domaine
- **Consulter les statistiques des prestations**
- **Consulter les détails d'une prestation**

#### Consultation de la Modération
- **Consulter les contenus modérés**
- **Consulter les statistiques de modération**
- **Consulter les signalements** *(lecture seule)*

#### Consultation du Support
- **Consulter les tickets support** *(lecture seule)*
- **Consulter les statistiques support**

#### Consultation des Documents
- **Consulter la liste des documents**
- **Télécharger les documents**
- **Consulter les catégories de documents**

#### Consultation des Partenaires
- **Consulter les partenaires**
- **Consulter les bons plans**
- **Consulter les statistiques partenaires**

#### Consultation RGPD
- **Consulter les demandes RGPD** *(lecture seule)*
- **Consulter les documents RGPD**

#### Consultation Financière
- **Consulter les données financières**
- **Consulter les statistiques financières**
- **Consulter les transactions**

## Relations Include/Extend

### Relations **Include** (obligatoires)
- Ajouter un utilisateur **include** Vérifier les permissions
- Ajouter un utilisateur **include** Générer un mot de passe
- Modifier un utilisateur **include** Vérifier les permissions
- Traiter un signalement **include** Évaluer le contenu
- Répondre à un ticket **include** Envoyer la notification
- Supprimer un utilisateur **include** Confirmer la suppression

### Relations **Extend** (optionnelles)
- Consulter les signalements **extend** Filtrer par statut
- Consulter les signalements **extend** Filtrer par date
- Consulter un ticket **extend** Répondre au ticket
- Consulter un ticket **extend** Assigner le ticket
- Consulter un ticket **extend** Résoudre le ticket
- Traiter un signalement **extend** Masquer le contenu
- Traiter un signalement **extend** Supprimer le contenu
- Modifier un utilisateur **extend** Changer le rôle utilisateur

## Cas d'Usage Communs (Base Système)

### Authentification et Session
- **Se connecter au système**
  - *Include* : Vérifier les identifiants
  - *Include* : Charger les permissions
- **Se déconnecter du système**
- **Maintenir la session active**

### Navigation
- **Accéder au dashboard**
- **Naviguer entre les pages autorisées**
- **Consulter les notifications**

## Contraintes d'Accès

### Matrice de Permissions

| Cas d'Usage | Admin | Modérateur | Support | Visualisateur |
|-------------|-------|------------|---------|---------------|
| Consulter Dashboard | ✅ | ✅ | ✅ | ✅ |
| Gérer Utilisateurs | ✅ | ❌ | ❌ | 👁️ |
| Modérer Contenus | ✅ | ✅ | ❌ | 👁️ |
| Gérer Support | ✅ | ❌ | ✅ | 👁️ |
| Gérer Prestations | ✅ | ❌ | ❌ | 👁️ |
| Gérer Partenaires | ✅ | ❌ | ❌ | 👁️ |
| Gérer Documents | ✅ | ❌ | ❌ | 👁️ |
| Gérer RGPD | ✅ | ❌ | ❌ | 👁️ |
| Gérer Finances | ✅ | ❌ | ❌ | 👁️ |
| Exporter Données | ✅ | ❌ | ❌ | ❌ |

**Légende** :
- ✅ : Accès complet (lecture/écriture)
- 👁️ : Accès en lecture seule
- ❌ : Aucun accès

## Diagramme UML Textuel

```
@startuml
left to right direction

' Acteurs
actor "Utilisateur Système" as US
actor "Administrateur" as Admin
actor "Modérateur" as Mod  
actor "Support" as Sup
actor "Visualisateur" as View

' Généralisation
US <|-- Admin
US <|-- Mod
US <|-- Sup  
US <|-- View

' Cas d'usage principaux
rectangle "AppSeniors Admin" {
  usecase "Se connecter" as Login
  usecase "Consulter Dashboard" as Dashboard
  
  ' Gestion Utilisateurs
  usecase "Consulter Utilisateurs" as ViewUsers
  usecase "Ajouter Utilisateur" as AddUser
  usecase "Vérifier Permissions" as CheckPerm
  
  ' Modération
  usecase "Consulter Signalements" as ViewReports
  usecase "Traiter Signalement" as ProcessReport
  usecase "Masquer Contenu" as HideContent
  
  ' Support
  usecase "Consulter Tickets" as ViewTickets
  usecase "Répondre Ticket" as ReplyTicket
  usecase "Résoudre Ticket" as ResolveTicket
  
  ' Administration
  usecase "Gérer Rôles" as ManageRoles
  usecase "Exporter Données" as ExportData
}

' Relations des acteurs
Admin --> ViewUsers
Admin --> AddUser
Admin --> ManageRoles
Admin --> ExportData

Mod --> ViewReports
Mod --> ProcessReport

Sup --> ViewTickets
Sup --> ReplyTicket
Sup --> ResolveTicket

View --> ViewUsers
View --> Dashboard

' Relations Include
AddUser ..> CheckPerm : <<include>>
ProcessReport ..> HideContent : <<extend>>
ViewTickets ..> ReplyTicket : <<extend>>

@enduml
```

## Conclusion

Ce diagramme de cas d'utilisation structure les fonctionnalités du système AppSeniors Admin selon les quatre rôles définis. Il met en évidence :

1. **La hiérarchie des permissions** : L'Administrateur a accès à tout, tandis que les autres rôles sont spécialisés
2. **Les relations d'inclusion** : Certaines actions nécessitent obligatoirement d'autres actions
3. **Les relations d'extension** : Certaines fonctionnalités peuvent être étendues selon le contexte
4. **La séparation des responsabilités** : Chaque rôle a un domaine d'expertise défini

Cette modélisation facilite la planification du développement et la compréhension des interactions utilisateur-système.

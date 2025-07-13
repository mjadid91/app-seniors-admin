
# 👥 Spécifications - Module Utilisateurs

## 🎯 Objectif
Gestion complète des utilisateurs de la plateforme (Administrateurs, Seniors, Aidants).

## 📋 Fonctionnalités principales

### 1. Gestion des utilisateurs administratifs
#### Créer un utilisateur
- **Champs obligatoires** : Nom, Prénom, Email, Rôle
- **Champs optionnels** : Téléphone, Photo de profil
- **Génération automatique** : Mot de passe temporaire
- **Envoi automatique** : Email de bienvenue avec lien de première connexion

#### Modifier un utilisateur
- **Informations personnelles** : Nom, Prénom, Email, Téléphone
- **Changement de rôle** : Avec confirmation et audit
- **Statut** : Actif/Inactif
- **Réinitialisation** : Mot de passe

#### Supprimer un utilisateur
- **Confirmation** : Double validation requise
- **Restrictions** : Impossible si utilisateur a des prestations actives
- **Soft delete** : Marquage comme "supprimé" sans suppression physique

### 2. Gestion des Seniors
#### Informations senior
- **Données personnelles** : Nom, Prénom, Date de naissance, Adresse
- **Niveau d'autonomie** : Échelle de 1 à 5
- **Contacts d'urgence** : Liste prioritaire
- **Documents** : Liens vers documents patrimoniaux

#### Actions spécifiques
- **Assigner un tuteur** : Si niveau d'autonomie < 3
- **Gérer les prestations** : Historique et prestations actives
- **Suivi médical** : Rendez-vous et médicaments

### 3. Gestion des Aidants
#### Profil professionnel
- **Compétences** : Domaines d'intervention
- **Expérience** : Nombre d'années, certifications
- **Tarification** : Tarif horaire par compétence
- **Disponibilités** : Planning et zones d'intervention

#### Évaluations
- **Notes clients** : Moyenne des évaluations
- **Commentaires** : Retours détaillés
- **Historique** : Prestations réalisées

## 🔒 Permissions par rôle

| Action | Admin | Modérateur | Support | Visualisateur |
|--------|-------|------------|---------|---------------|
| Voir la liste | ✅ | ❌ | ❌ | ✅ |
| Créer utilisateur | ✅ | ❌ | ❌ | ❌ |
| Modifier utilisateur | ✅ | ❌ | ❌ | ❌ |
| Supprimer utilisateur | ✅ | ❌ | ❌ | ❌ |
| Changer les rôles | ✅ | ❌ | ❌ | ❌ |
| Exporter données | ✅ | ❌ | ❌ | ❌ |

## 📊 Structure des données

### Table Utilisateurs
```typescript
interface Utilisateur {
  IDUtilisateurs: number;
  Nom: string;
  Prenom: string;
  Email: string;
  Telephone?: string;
  DateInscription: string;
  IDCatUtilisateurs: number; // 5=Admin, 6=Modérateur, 7=Visualisateur, 8=Support
  Statut: 'actif' | 'inactif' | 'suspendu';
  PhotoProfil?: string;
}
```

### Table Seniors
```typescript
interface Senior {
  IDSeniors: number;
  IDUtilisateurSenior: number;
  NiveauAutonomie: 1 | 2 | 3 | 4 | 5;
  EstRGPD: boolean;
  IDTuteur?: number;
  DateNaissance: string;
  Adresse: string;
}
```

### Table Aidant
```typescript
interface Aidant {
  IDAidant: number;
  IDUtilisateurs: number;
  Experience: string;
  TarifAidant: number;
  Certifications?: string[];
  ZoneIntervention: string;
}
```

## 🔧 API Routes

### Utilisateurs administratifs

#### GET /utilisateurs
**Description** : Liste des utilisateurs administratifs  
**Paramètres** :
- `page` (optionnel, défaut: 1)
- `limit` (optionnel, défaut: 20)
- `role` (optionnel: filtre par rôle)
- `search` (optionnel: recherche par nom/email)

#### POST /utilisateurs
**Description** : Créer un nouvel utilisateur administratif  
**Body** :
```json
{
  "nom": "Dupont",
  "prenom": "Jean",
  "email": "jean.dupont@example.com",
  "telephone": "0123456789",
  "role": "administrateur"
}
```

#### PUT /utilisateurs/{id}
**Description** : Modifier un utilisateur  
**Paramètres** : `id` (ID utilisateur)

#### DELETE /utilisateurs/{id}
**Description** : Supprimer un utilisateur  
**Paramètres** : `id` (ID utilisateur)  
**Restrictions** : Vérification des prestations actives

### Seniors

#### GET /seniors
**Description** : Liste des seniors  
**Paramètres** : Mêmes que /utilisateurs

#### POST /seniors
**Body** :
```json
{
  "nom": "Martin",
  "prenom": "Marie",
  "email": "marie.martin@example.com",
  "dateNaissance": "1940-05-15",
  "niveauAutonomie": 3,
  "adresse": "123 Rue de la Paix, 75001 Paris"
}
```

### Aidants

#### GET /aidants
**Description** : Liste des aidants  

#### POST /aidants
**Body** :
```json
{
  "nom": "Leroy",
  "prenom": "Paul",
  "email": "paul.leroy@example.com",
  "experience": "5 ans d'expérience en aide à domicile",
  "tarifHoraire": 25.00,
  "competences": ["aide_menagere", "accompagnement_medical"]
}
```

## 📋 Règles métier

### Validation des données
- **Email unique** : Vérification d'unicité sur toute la plateforme
- **Mot de passe** : 8 caractères minimum, 1 majuscule, 1 chiffre
- **Téléphone** : Format français (+33 ou 0X XX XX XX XX)
- **Date de naissance** : Seniors > 55 ans

### Règles de suppression
- **Utilisateur avec prestations actives** : Suppression bloquée
- **Senior avec aidant assigné** : Notification à l'aidant
- **Aidant avec prestations** : Transfert ou annulation des prestations

### Notifications automatiques
- **Création d'utilisateur** : Email de bienvenue
- **Changement de rôle** : Notification à l'utilisateur
- **Suppression de compte** : Email de confirmation

### Audit et traçabilité
- **Toute modification** : Enregistrement dans `HistoriqueModifications`
- **Changements critiques** : Log avec IP et timestamp
- **Export de données** : Traçabilité des exports RGPD

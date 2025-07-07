
# 🔒 Documentation – Page RGPD

## 🧭 Objectif

La page **RGPD** (`RGPD.tsx`) centralise la gestion de la conformité RGPD et des demandes de protection des données personnelles.

---

## 📋 Composants principaux

### 📊 Interface principale (`RGPD.tsx`)
- **Tabs** : Navigation entre sections RGPD
- **Demandes** : Gestion des requêtes utilisateurs
- **Documents** : Politiques et consentements
- **Rapports** : Conformité et statistiques

---

## 📝 Gestion des demandes

### ➕ Création (`AddDemandeRGPDModal.tsx`)
- **Types de demandes** :
  - Accès aux données personnelles
  - Rectification d'informations
  - Suppression de données
  - Portabilité des données
  - Opposition au traitement

### ✏️ Modification (`EditDemandeRGPDModal.tsx`)
- **Statuts** : En attente, En cours, Terminée, Rejetée
- **Assignation** : Attribution à un responsable
- **Délais** : Gestion des échéances légales

### ⚙️ Traitement (`ProcessRequestModal.tsx`)
- **Workflow** : Processus de traitement structuré
- **Documentation** : Traçabilité des actions
- **Validation** : Contrôles de conformité

---

## 📄 Documents RGPD

### ➕ Ajout (`AddDocumentRGPDModal.tsx`)
- **Types** : Politique de confidentialité, CGU, consentements
- **Versioning** : Gestion des versions de documents
- **Publication** : Mise en ligne et archivage

### 📊 Consentements (`AddConsentementModal.tsx`)
- **Types de cookies** : Fonctionnels, analytiques, marketing
- **Granularité** : Consentement par finalité
- **Historique** : Traçabilité des consentements

---

## 🔧 Hooks et services

### 📡 Hooks de données
- **`useSupabaseRGPD.ts`** : Interface principale Supabase
- **`useFileOperationsRGPD.ts`** : Gestion des fichiers RGPD

### 🗄️ Base de données
- **`DemandeRGPD`** : Demandes des utilisateurs
- **`DocumentRGPD`** : Documents de conformité
- **`ConsentementCookies`** : Consentements utilisateurs

### 💾 Storage
- **Bucket** : `documents-rgpd` (public)
- **Organisation** : Documents par type et version
- **Sécurité** : Accès contrôlé selon les rôles

---

## ⏰ Gestion des délais

### 📅 Échéances légales
- **30 jours** : Délai standard de réponse
- **Notifications** : Alertes avant expiration
- **Reporting** : Suivi des délais de traitement

### 🔔 Alertes automatiques
- **Demandes en retard** : Notifications système
- **Renouvellement** : Consentements à renouveler
- **Audits** : Rappels de conformité

---

## 🎨 Interface

### 📱 Design centré conformité
- **Tabs clairs** : Navigation intuitive
- **Statuts visuels** : Badges colorés pour urgence
- **Formulaires** : Champs obligatoires marqués
- **Historique** : Timeline des actions

### 🔄 Workflow
- **Réception** : Nouvelle demande RGPD
- **Assignation** : Attribution à un responsable
- **Traitement** : Actions de conformité
- **Validation** : Vérification légale
- **Clôture** : Réponse à l'utilisateur

---

## 🎯 Résumé

La page RGPD comprend :
- Gestion complète des demandes RGPD
- Système de consentements granulaires
- Bibliothèque de documents de conformité
- Workflow de traitement avec délais
- Traçabilité complète des actions
- Interface dédiée à la conformité légale
- Intégration avec storage sécurisé


# ⚙️ Prompt Lovable - Page Paramètres Utilisateur

## 🎯 Objectif
Créer la page de paramètres personnels pour les administrateurs avec gestion de profil et préférences.

## 📋 Instructions

### 1. Structure de la page
Page `/settings` avec sections organisées :
- Section Profil avec photo
- Section Informations personnelles
- Section Notifications
- Section Préférences
- Section Sécurité

### 2. Types de données
```typescript
interface UserProfile {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  photoProfil?: string;
  role: 'administrateur' | 'moderateur' | 'support' | 'visualisateur';
  dateInscription: Date;
  dernierAcces: Date;
}

interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  langue: 'fr' | 'en' | 'es';
  devise: 'EUR' | 'USD' | 'GBP';
  timezone: string;
  dateFormat: 'dd/MM/yyyy' | 'MM/dd/yyyy' | 'yyyy-MM-dd';
  notifications: NotificationPreferences;
}

interface NotificationPreferences {
  email: boolean;
  push: boolean;
  desktop: boolean;
  frequence: 'immediate' | 'daily' | 'weekly';
  types: {
    nouveauxUtilisateurs: boolean;
    ticketsSupport: boolean;
    moderation: boolean;
    system: boolean;
  };
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  sessionTimeout: number;
  passwordExpiry: boolean;
  loginNotifications: boolean;
}
```

### 3. Composants principaux

#### Settings.tsx (Page principale)
- Layout en sections
- Sauvegarde automatique
- Feedback utilisateur
- Navigation interne

#### ProfileSection.tsx
Section profil avec :
- **ProfileImageSection.tsx** : Gestion de l'avatar
- **ProfileFormFields.tsx** : Champs du formulaire
- **ProfileLoading.tsx** : État de chargement
- **ProfileSaveActions.tsx** : Actions de sauvegarde

#### NotificationsSection.tsx
- Types de notifications
- Fréquence de réception
- Canaux de communication
- Gestion granulaire

#### PreferencesSection.tsx
- Thème et apparence
- Langue et localisation
- Format des données
- Préférences d'affichage

#### SecuritySection.tsx
- Changement de mot de passe
- Authentification 2FA
- Sessions actives
- Historique de connexion

### 4. Gestion de l'avatar

#### ProfileImageSection.tsx
- Upload d'image par drag & drop
- Crop et redimensionnement
- Prévisualisation en temps réel
- Suppression de l'image
- Formats supportés : JPG, PNG, WebP

#### Fonctionnalités
- Taille max : 5MB
- Redimensionnement automatique
- Compression intelligente
- Cache browser optimisé

### 5. Hooks personnalisés

#### useUserProfile.ts
```typescript
interface UserProfileHookReturn {
  profile: UserProfile | null;
  preferences: UserPreferences | null;
  loading: boolean;
  error: string | null;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  updatePreferences: (data: Partial<UserPreferences>) => Promise<void>;
  uploadAvatar: (file: File) => Promise<void>;
  deleteAvatar: () => Promise<void>;
}
```

#### useProfileImage.ts
- Upload vers bucket `avatars`
- Redimensionnement côté client
- Gestion des erreurs
- Optimisation des performances

#### useNotifications.ts
- Sauvegarde des préférences
- Test des notifications
- Validation des paramètres
- Synchronisation multi-onglet

### 6. Formulaires et validation

#### Validation Zod
```typescript
const profileSchema = z.object({
  nom: z.string().min(2, "Nom requis").max(50),
  prenom: z.string().min(2, "Prénom requis").max(50),
  email: z.string().email("Email invalide"),
  telephone: z.string().regex(/^[0-9+\-\s]*$/, "Format invalide").optional()
});

const preferencesSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  langue: z.enum(["fr", "en", "es"]),
  devise: z.enum(["EUR", "USD", "GBP"]),
  timezone: z.string(),
  dateFormat: z.enum(["dd/MM/yyyy", "MM/dd/yyyy", "yyyy-MM-dd"])
});
```

### 7. Sauvegarde intelligente

#### Auto-save
- Sauvegarde automatique après 2s d'inactivité
- Indicateur de statut de sauvegarde
- Gestion des conflits
- Mode hors ligne

#### Gestion d'état
- Dirty state detection
- Confirmation avant navigation
- Rollback en cas d'erreur
- Optimistic updates

### 8. Intégration Supabase

#### Tables utilisées
- `Utilisateurs` : informations de base
- `Parametres` : préférences utilisateur
- `Notifications` : paramètres de notification

#### Storage
- Bucket `avatars` pour les photos de profil
- Organisation par utilisateur
- Politique de rétention
- CDN pour optimisation

### 9. Sécurité

#### Changement de mot de passe
- Vérification du mot de passe actuel
- Validation de la complexité
- Confirmation par email
- Invalidation des sessions

#### Authentification à deux facteurs
- Setup avec QR code
- Codes de récupération
- Validation des codes
- Désactivation sécurisée

#### Sessions actives
- Liste des connexions
- Géolocalisation approximative
- Déconnexion à distance
- Détection d'anomalies

### 10. Interface utilisateur

#### Design
- Sections clairement séparées
- Formulaires intuitifs
- Feedback visuel immédiat
- Responsive design

#### États visuels
- Sauvegarde en cours
- Succès de sauvegarde
- Erreurs de validation
- Confirmation des actions

### 11. Thèmes et personnalisation

#### Système de thèmes
- Thème clair
- Thème sombre
- Thème système (auto)
- Prévisualisation en temps réel

#### Personnalisation
- Couleurs d'accent
- Densité de l'interface
- Taille des polices
- Contraste élevé

### 12. Notifications

#### Types de notifications
- Notifications push (si supportées)
- Notifications desktop
- Notifications email
- Notifications in-app

#### Gestion granulaire
- Par type d'événement
- Par fréquence
- Par canal
- Période de silence

### 13. Localisation

#### Support multilingue
- Français (par défaut)
- Anglais
- Espagnol
- Détection automatique

#### Formats régionaux
- Format de date
- Format de nombre
- Devise
- Fuseau horaire

### 14. Accessibilité

#### Conformité WCAG
- Navigation clavier
- Lecteurs d'écran
- Contrastes suffisants
- Textes alternatifs

#### Options d'accessibilité
- Réduction des animations
- Augmentation des contrastes
- Taille de police personnalisée
- Mode haute lisibilité

### 15. Performance

#### Optimisations
- Lazy loading des sections
- Debounce sur les inputs
- Compression des images
- Cache intelligent

#### Monitoring
- Temps de chargement
- Taux d'erreur
- Utilisation des fonctionnalités
- Satisfaction utilisateur

### 16. Fonctionnalités avancées

#### Import/Export
- Export des préférences
- Sauvegarde des paramètres
- Synchronisation multi-device
- Restauration des paramètres

#### Historique
- Journal des modifications
- Versions précédentes
- Annulation d'actions
- Audit des changements

Créez une page de paramètres complète avec gestion de profil intuitive, préférences granulaires et options de sécurité robustes pour une expérience utilisateur optimale.

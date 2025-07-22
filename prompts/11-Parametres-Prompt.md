# ⚙️ Prompt Lovable - Paramètres AppSeniors Admin

## 🎯 Objectif
Créer une page de paramètres complète permettant aux administrateurs de gérer leur profil et les configurations de l'application.

## 📋 Instructions détaillées

### 1. Structure principale (`Settings.tsx`)

#### Layout organisé
```typescript
interface SettingsPageProps {
  className?: string;
}
```

- Navigation par onglets : Profil, Préférences, Notifications, Sécurité
- Sauvegarde intelligente (auto-save optionnel)
- Validation en temps réel
- Actions : Sauvegarder, Annuler, Reset

### 2. Section Profil (`ProfileSection.tsx`)

#### Composants intégrés
- **`ProfileImageSection.tsx`** : Upload et gestion d'avatar
- **`ProfileFormFields.tsx`** : Formulaire d'informations personnelles  
- **`ProfileLoading.tsx`** : États de chargement
- **`ProfileSaveActions.tsx`** : Boutons d'action

#### Champs requis
```typescript
interface ProfileFormData {
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  adresse?: string;
  ville?: string;
  codePostal?: string;
  bio?: string;
}
```

### 3. Gestion d'avatar (`ProfileImageSection.tsx`)

#### Hook personnalisé (`useProfileImage.ts`)
```typescript
interface ProfileImageHook {
  imageUrl: string | null;
  isUploading: boolean;
  uploadImage: (file: File) => Promise<string>;
  deleteImage: () => Promise<void>;
  error: string | null;
}
```

#### Configuration storage
- **Bucket** : `avatars` (public)
- **Formats** : JPG, PNG, WebP, AVIF
- **Taille max** : 5MB
- **Redimensionnement** : Automatique 300x300px
- **CDN** : Optimisation Supabase

### 4. Préférences (`PreferencesSection.tsx`)

#### Options d'interface
```typescript
interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  currency: string;
  timezone: string;
  dateFormat: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD';
  density: 'compact' | 'normal' | 'comfortable';
}
```

#### Composants UI
- Sélecteur de thème avec aperçu
- Liste déroulante des langues
- Sélecteur de devise avec symboles
- Choix du fuseau horaire
- Options d'accessibilité

### 5. Notifications (`NotificationsSection.tsx`)

#### Types de notifications
```typescript
interface NotificationSettings {
  email: {
    newTickets: boolean;
    ticketUpdates: boolean;
    systemAlerts: boolean;
    weeklyReport: boolean;
  };
  push: {
    enabled: boolean;
    urgentOnly: boolean;
    frequency: 'immediate' | 'hourly' | 'daily';
  };
  inApp: {
    enabled: boolean;
    sound: boolean;
    desktop: boolean;
  };
}
```

#### Configuration granulaire
- Choix par type d'événement
- Fréquence personnalisable
- Horaires de silence
- Catégories spécifiques

### 6. Sécurité (`SecuritySection.tsx`)

#### Fonctionnalités sécurité
```typescript
interface SecuritySettings {
  passwordChange: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  twoFactor: {
    enabled: boolean;
    method: 'sms' | 'email' | 'app';
  };
  sessions: ActiveSession[];
}
```

#### Historique et sessions
- Sessions actives avec détails (IP, navigateur, lieu)
- Historique des connexions récentes
- Révocation de sessions à distance
- Changement de mot de passe sécurisé

### 7. Hooks de données

#### Hook principal (`useUserProfile.ts`)
```typescript
interface UserProfileHook {
  profile: UserProfile | null;
  preferences: UserPreferences;
  notifications: NotificationSettings;
  security: SecuritySettings;
  isLoading: boolean;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  updatePreferences: (prefs: Partial<UserPreferences>) => Promise<void>;
  updateNotifications: (notifs: Partial<NotificationSettings>) => Promise<void>;
}
```

#### Hook notifications (`useNotifications.ts`)
- Gestion des préférences de notifications
- Test d'envoi de notifications
- Validation des paramètres
- Synchronisation temps réel

### 8. Base de données

#### Tables impliquées
```sql
-- Extension de la table Utilisateurs pour le profil
ALTER TABLE "Utilisateurs" ADD COLUMN IF NOT EXISTS "AvatarURL" text;
ALTER TABLE "Utilisateurs" ADD COLUMN IF NOT EXISTS "Bio" text;

-- Table des paramètres utilisateur
CREATE TABLE IF NOT EXISTS "UserPreferences" (
  "IDUserPreferences" bigint PRIMARY KEY DEFAULT nextval('user_preferences_seq'),
  "IDUtilisateurs" bigint REFERENCES "Utilisateurs"("IDUtilisateurs"),
  "Theme" character varying DEFAULT 'system',
  "Language" character varying DEFAULT 'fr',
  "Currency" character varying DEFAULT 'EUR',
  "Timezone" character varying DEFAULT 'Europe/Paris',
  "DateFormat" character varying DEFAULT 'DD/MM/YYYY',
  "Density" character varying DEFAULT 'normal'
);

-- Table des préférences de notifications
CREATE TABLE IF NOT EXISTS "NotificationPreferences" (
  "IDNotificationPrefs" bigint PRIMARY KEY,
  "IDUtilisateurs" bigint REFERENCES "Utilisateurs"("IDUtilisateurs"),
  "EmailNewTickets" boolean DEFAULT true,
  "EmailUpdates" boolean DEFAULT true,
  "PushEnabled" boolean DEFAULT true,
  "InAppEnabled" boolean DEFAULT true
);
```

### 9. Validation et sécurité

#### Validation des données
```typescript
const profileSchema = z.object({
  nom: z.string().min(2).max(50),
  prenom: z.string().min(2).max(50),
  email: z.string().email(),
  telephone: z.string().optional(),
  bio: z.string().max(500).optional()
});
```

#### Sécurité des uploads
- Validation des types MIME
- Scan antivirus (si applicable)
- Limitation de taille
- Noms de fichiers sécurisés

### 10. Interface utilisateur

#### Design responsive
- Layout adaptatif mobile/desktop
- Navigation par onglets claire
- Groupement logique des options
- Feedback visuel des changements

#### Composants Shadcn/UI
```typescript
// Exemples d'utilisation
<Tabs defaultValue="profile">
  <TabsList>
    <TabsTrigger value="profile">Profil</TabsTrigger>
    <TabsTrigger value="preferences">Préférences</TabsTrigger>
    <TabsTrigger value="notifications">Notifications</TabsTrigger>
    <TabsTrigger value="security">Sécurité</TabsTrigger>
  </TabsList>
</Tabs>

<Switch 
  checked={notifications.email.newTickets}
  onCheckedChange={(checked) => updateNotificationSettings('email.newTickets', checked)}
/>
```

### 11. Fonctionnalités avancées

#### Export/Import des préférences
- Sauvegarde des paramètres en JSON
- Import depuis un fichier de configuration
- Partage de configurations entre utilisateurs
- Reset aux valeurs par défaut

#### Prévisualisation en temps réel
- Aperçu du thème sélectionné
- Test des notifications
- Prévisualisation du format de date
- Validation instantanée des changements

### 12. Optimisations

#### Performance
- Debounce pour les sauvegardes automatiques
- Cache intelligent des préférences
- Optimistic updates pour l'UX
- Compression des images d'avatar

#### Accessibilité
- Navigation au clavier complète
- Lecteurs d'écran compatibles
- Contrastes suffisants
- Tailles de police ajustables

Créez une page de paramètres moderne, intuitive et complète qui offre un contrôle total aux administrateurs sur leur expérience utilisateur.
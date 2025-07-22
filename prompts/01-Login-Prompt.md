# 🔐 Prompt – Page de Connexion

## 🎯 Objectif

Créer une page de connexion sécurisée pour l'application AppSeniors Admin avec authentification Supabase, validation des champs et gestion des erreurs.

---

## 📋 Composants à implémenter

### 1. LoginPage.tsx
Page principale de connexion avec formulaire d'authentification.

```typescript
interface LoginFormData {
  email: string;
  password: string;
}

interface LoginPageProps {
  // Interface pour la page de connexion
}
```

### 2. ProtectedRoute.tsx
Composant de protection des routes nécessitant une authentification.

```typescript
interface ProtectedRouteProps {
  children: React.ReactNode;
}
```

---

## 🔧 Hooks requis

### useSupabaseAuth.ts
Hook personnalisé pour la gestion de l'authentification Supabase.

```typescript
interface AuthUser {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: 'administrateur' | 'moderateur' | 'support' | 'visualisateur';
  dateInscription: string;
  estDesactive?: boolean;
  photo?: string;
}

interface UseSupabaseAuthReturn {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
```

---

## 🗄️ Base de données

### Table utilisateurs_admin
```sql
CREATE TABLE public.utilisateurs_admin (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(20) CHECK (role IN ('administrateur', 'moderateur', 'support', 'visualisateur')),
  date_inscription TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  est_desactive BOOLEAN DEFAULT FALSE,
  photo TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);
```

### Politiques RLS
```sql
-- Permettre aux utilisateurs admin de voir leur propre profil
CREATE POLICY "Admin users can view own profile" 
ON public.utilisateurs_admin 
FOR SELECT 
USING (auth.uid() = user_id);

-- Permettre aux administrateurs de voir tous les profils
CREATE POLICY "Administrators can view all profiles" 
ON public.utilisateurs_admin 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.utilisateurs_admin 
    WHERE user_id = auth.uid() AND role = 'administrateur'
  )
);
```

---

## 🎨 Design et UX

### Interface utilisateur
- **Composants Shadcn/UI** : Card, Input, Button, Label, Alert
- **Design responsive** : Adaptation mobile et desktop
- **Gradient de fond** : `from-slate-50 to-blue-50`
- **États visuels** : Loading, erreur, succès

### Formulaire de connexion
```tsx
<Card className="w-full max-w-md mx-auto">
  <CardHeader className="text-center">
    <CardTitle>Connexion Admin</CardTitle>
    <CardDescription>AppSeniors Administration</CardDescription>
  </CardHeader>
  <CardContent>
    <form onSubmit={handleSubmit}>
      <Input 
        type="email" 
        placeholder="Email" 
        required 
      />
      <Input 
        type="password" 
        placeholder="Mot de passe" 
        required 
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Connexion...' : 'Se connecter'}
      </Button>
    </form>
  </CardContent>
</Card>
```

---

## 🛡️ Validation et sécurité

### Validation côté client
- **Email** : Format valide requis
- **Mot de passe** : Minimum 6 caractères
- **Messages d'erreur** : Affichage contextuel

### Gestion des erreurs
```typescript
const errorMessages = {
  'Invalid login credentials': 'Email ou mot de passe incorrect',
  'Email not confirmed': 'Veuillez confirmer votre email',
  'Too many requests': 'Trop de tentatives, réessayez plus tard',
  'User not found': 'Utilisateur non trouvé',
  'Account disabled': 'Compte désactivé'
};
```

### Sécurité
- **Sessions Supabase** : Gestion automatique
- **Protection CSRF** : Via Supabase
- **Limitation des tentatives** : Configuration Supabase
- **Redirection sécurisée** : Vers dashboard après connexion

---

## 📱 Fonctionnalités

### Authentification
1. **Connexion par email/mot de passe**
2. **Validation en temps réel**
3. **Gestion des erreurs détaillées**
4. **Redirection automatique**
5. **Persistance de session**

### État de l'application
- **Store Zustand** : Gestion de l'état d'authentification
- **Synchronisation** : Entre Supabase et store local
- **Protection des routes** : Via ProtectedRoute

### Expérience utilisateur
- **Loading states** : Feedback visuel
- **Messages d'erreur** : Clairs et utiles
- **Responsive design** : Mobile-first
- **Accessibilité** : Labels et ARIA

---

## 🔄 Flux d'authentification

1. **Saisie des identifiants** → Validation côté client
2. **Soumission du formulaire** → Appel Supabase Auth
3. **Récupération du profil** → Requête table utilisateurs_admin
4. **Mise à jour du store** → Synchronisation état global
5. **Redirection** → Vers dashboard si succès

---

## 📝 Tests à prévoir

### Tests fonctionnels
- Connexion avec identifiants valides
- Gestion des erreurs (email invalide, mot de passe incorrect)
- Redirection après connexion réussie
- Persistance de session

### Tests de sécurité
- Protection contre les injections
- Limitation des tentatives de connexion
- Validation des données côté serveur

---

## 🎯 Résultats attendus

Une page de connexion complète avec :
- Interface moderne et responsive
- Authentification sécurisée via Supabase
- Gestion d'état robuste avec Zustand
- Protection des routes administratives
- Expérience utilisateur optimale

# Intégration Supabase

## Vue d'ensemble

L'application utilise Supabase comme backend-as-a-service, fournissant la base de données PostgreSQL, l'authentification, le stockage de fichiers et les API temps réel.

## Configuration

### Client Supabase
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kszpkzlkevjsqncfwhvt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Types générés
Les types TypeScript sont automatiquement générés depuis le schéma de base de données :
```typescript
// src/integrations/supabase/types.ts
export interface Database {
  public: {
    Tables: {
      Utilisateurs: {
        Row: {
          IDUtilisateurs: number;
          Nom: string;
          Prenom: string;
          Email: string;
          // ...
        };
        Insert: { /* ... */ };
        Update: { /* ... */ };
      };
      // ... autres tables
    };
  };
}
```

## Authentification

### Hook d'authentification
```typescript
const useSupabaseAuth = () => {
  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    return data;
  };
  
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };
  
  return { signIn, signOut, user: supabase.auth.user() };
};
```

### Gestion des sessions
```typescript
useEffect(() => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session?.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    }
  );
  
  return () => subscription.unsubscribe();
}, []);
```

## Base de données

### Requêtes de base
```typescript
// SELECT
const { data, error } = await supabase
  .from('Utilisateurs')
  .select('*')
  .eq('IDUtilisateurs', userId);

// INSERT
const { data, error } = await supabase
  .from('Utilisateurs')
  .insert({
    Nom: 'Dupont',
    Prenom: 'Jean',
    Email: 'jean.dupont@email.com'
  });

// UPDATE
const { data, error } = await supabase
  .from('Utilisateurs')
  .update({ Nom: 'Martin' })
  .eq('IDUtilisateurs', userId);

// DELETE
const { data, error } = await supabase
  .from('Utilisateurs')
  .delete()
  .eq('IDUtilisateurs', userId);
```

### Requêtes avec jointures
```typescript
const { data, error } = await supabase
  .from('MiseEnRelation')
  .select(`
    *,
    Seniors!inner (
      IDSeniors,
      Utilisateurs!inner (
        Nom,
        Prenom,
        Email
      )
    ),
    Aidant!inner (
      IDAidant,
      Utilisateurs!inner (
        Nom,
        Prenom
      )
    ),
    Prestation (
      Titre,
      Description
    )
  `)
  .eq('Statut', 'en_cours');
```

### Filtres avancés
```typescript
const { data, error } = await supabase
  .from('BonPlan')
  .select('*')
  .gte('DateFinReduction', new Date().toISOString())
  .eq('StatutBonPlan', 'Actif')
  .ilike('TitreBonPlan', '%promotion%')
  .order('DateCreation', { ascending: false })
  .limit(10);
```

## Row Level Security (RLS)

### Policies de sécurité
```sql
-- Les utilisateurs ne peuvent voir que leurs propres données
CREATE POLICY "Users can view own data" ON Utilisateurs
  FOR SELECT USING (auth.uid()::text = IDUtilisateurs::text);

-- Les administrateurs peuvent tout voir
CREATE POLICY "Admins can view all" ON Utilisateurs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM CatUtilisateurs c
      WHERE c.IDCatUtilisateurs = (
        SELECT IDCatUtilisateurs FROM Utilisateurs 
        WHERE IDUtilisateurs::text = auth.uid()::text
      )
      AND c.EstAdministrateur = true
    )
  );
```

### Utilisation dans l'application
```typescript
// Les RLS sont automatiquement appliquées
const { data: userDocuments } = await supabase
  .from('Document')
  .select('*'); // L'utilisateur ne voit que ses documents
```

## Fonctions Edge

### Fonction d'envoi d'email
```typescript
// supabase/functions/send-partner-credentials/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const { email, credentials } = await req.json();
  
  // Logique d'envoi d'email
  const emailResponse = await sendEmail({
    to: email,
    subject: 'Vos identifiants partenaire',
    html: generateEmailTemplate(credentials)
  });
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" }
  });
});
```

### Appel depuis l'application
```typescript
const sendPartnerCredentials = async (email: string, credentials: any) => {
  const { data, error } = await supabase.functions.invoke(
    'send-partner-credentials',
    {
      body: { email, credentials }
    }
  );
  
  if (error) throw error;
  return data;
};
```

## Stockage de fichiers

### Configuration des buckets
```sql
-- Création d'un bucket public
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', true);

-- Policy pour l'upload
CREATE POLICY "Anyone can upload documents" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'documents');
```

### Upload de fichiers
```typescript
const uploadDocument = async (file: File, fileName: string) => {
  const { data, error } = await supabase.storage
    .from('documents')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });
  
  if (error) throw error;
  
  // Obtenir l'URL publique
  const { data: { publicUrl } } = supabase.storage
    .from('documents')
    .getPublicUrl(fileName);
  
  return { path: data.path, url: publicUrl };
};
```

## Temps réel

### Abonnements aux changements
```typescript
const useRealtimeData = (table: string, filter?: string) => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const subscription = supabase
      .channel('public:' + table)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: table,
          filter: filter 
        },
        (payload) => {
          console.log('Change received!', payload);
          // Mettre à jour les données locales
          refreshData();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(subscription);
    };
  }, [table, filter]);
  
  return data;
};
```

### Notifications en temps réel
```typescript
// Écoute des nouvelles demandes de support
const useSupportNotifications = () => {
  useEffect(() => {
    const subscription = supabase
      .channel('support-tickets')
      .on('postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'TicketSupport'
        },
        (payload) => {
          // Afficher une notification
          toast.info(`Nouveau ticket: ${payload.new.Titre}`);
        }
      )
      .subscribe();
    
    return () => supabase.removeChannel(subscription);
  }, []);
};
```

## Gestion des erreurs

### Wrapper pour les requêtes
```typescript
const safeSupabaseQuery = async <T>(
  queryFn: () => Promise<{ data: T | null; error: any }>
): Promise<T> => {
  try {
    const { data, error } = await queryFn();
    
    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message || 'Une erreur est survenue');
    }
    
    return data as T;
  } catch (error) {
    console.error('Query failed:', error);
    throw error;
  }
};

// Usage
const users = await safeSupabaseQuery(() =>
  supabase.from('Utilisateurs').select('*')
);
```

## Optimisations

### Cache avec TanStack Query
```typescript
const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Utilisateurs')
        .select('*');
      
      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000 // 10 minutes
  });
};
```

### Pagination efficace
```typescript
const usePaginatedData = (table: string, pageSize = 20) => {
  const [page, setPage] = useState(0);
  
  const { data, isLoading } = useQuery({
    queryKey: [table, page],
    queryFn: async () => {
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact' })
        .range(page * pageSize, (page + 1) * pageSize - 1);
      
      if (error) throw error;
      return { data, totalCount: count };
    }
  });
  
  return {
    data: data?.data || [],
    totalCount: data?.totalCount || 0,
    isLoading,
    nextPage: () => setPage(p => p + 1),
    prevPage: () => setPage(p => Math.max(0, p - 1))
  };
};
```

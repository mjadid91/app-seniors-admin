
# Extraits de code pour rapport de stage - AppSeniors Admin

## 1. Vérification d'accès aux pages (ProtectedRoute.tsx)

```tsx
const hasAccess = () => { 
  // Vérifie si l'utilisateur a accès à la page
  // ou à la permission requise
  if (requiredPage && !canAccessPage(requiredPage)) {
    return false;
  }
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return false;
  }
  return true;
};

if (!hasAccess()) {
  if (fallback) {return <>{fallback}</>;}
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <Lock className="h-8 w-8 text-red-600" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-800">Accès restreint</h3>
          <p className="text-slate-600 max-w-md">Votre rôle ({user.role})
            ne permet pas d'accéder à cette section.
          </p>
        </div>
      </div>
    </div>
  );
}
```

## 2. Définition des permissions métiers (usePermissions.ts)

```typescript
// Mapping des permissions par rôle selon vos spécifications
const ROLE_PERMISSIONS = {
  // Admin (IDCatUtilisateur = 5) : accès complet à tout
  administrateur: [
    PERMISSIONS.VIEW_DASHBOARD, PERMISSIONS.VIEW_USERS, PERMISSIONS.MANAGE_USERS, 
    PERMISSIONS.VIEW_SENIORS, PERMISSIONS.MANAGE_SENIORS,
    PERMISSIONS.VIEW_PRESTATIONS, PERMISSIONS.MANAGE_PRESTATIONS, 
    PERMISSIONS.VIEW_MODERATION, PERMISSIONS.MANAGE_MODERATION,
    PERMISSIONS.VIEW_SUPPORT, PERMISSIONS.MANAGE_SUPPORT, 
    PERMISSIONS.VIEW_DOCUMENTS, PERMISSIONS.MANAGE_DOCUMENTS,
    PERMISSIONS.VIEW_PARTNERS, PERMISSIONS.MANAGE_PARTNERS, 
    PERMISSIONS.VIEW_RGPD, PERMISSIONS.MANAGE_RGPD, 
    PERMISSIONS.VIEW_FINANCES, PERMISSIONS.MANAGE_FINANCES, 
    PERMISSIONS.MANAGE_ROLES, PERMISSIONS.EXPORT_DATA, 
    PERMISSIONS.DELETE_CONTENT, PERMISSIONS.HIDE_CONTENT,
  ],
  // Modérateur (IDCatUtilisateur = 6) : uniquement accès à la modération
  moderateur: [
    PERMISSIONS.VIEW_DASHBOARD, PERMISSIONS.VIEW_MODERATION, 
    PERMISSIONS.MANAGE_MODERATION, PERMISSIONS.DELETE_CONTENT,
    PERMISSIONS.HIDE_CONTENT,
  ],
  // Support (IDCatUtilisateur = 8) : uniquement accès au support
  support: [
    PERMISSIONS.VIEW_DASHBOARD, PERMISSIONS.VIEW_SUPPORT, PERMISSIONS.MANAGE_SUPPORT,
  ],
  // Visualisateur (IDCatUtilisateur = 7) : accès en lecture seule à toutes les pages
  visualisateur: [
    PERMISSIONS.VIEW_DASHBOARD, PERMISSIONS.VIEW_USERS, PERMISSIONS.VIEW_SENIORS, 
    PERMISSIONS.VIEW_PRESTATIONS, PERMISSIONS.VIEW_MODERATION, PERMISSIONS.VIEW_SUPPORT, 
    PERMISSIONS.VIEW_DOCUMENTS, PERMISSIONS.VIEW_PARTNERS,
    PERMISSIONS.VIEW_RGPD, PERMISSIONS.VIEW_FINANCES,
    // Aucune permission de gestion/modification pour le visualisateur
  ],
};
```

## 3. Liaison UUID Supabase et ID numérique utilisateur

```typescript
const findOrCreateUserMapping = async (supabaseUser: any): Promise<UserMapping | null> => {
  if (!supabaseUser?.id || !supabaseUser?.email) {
    console.warn('useSupabaseUserMapping: Invalid supabase user data', supabaseUser);
    return null;
  }
  
  try {
    // Chercher l'utilisateur par email dans notre base de données
    const { data: existingUser, error: searchError } = await supabase
      .from('Utilisateurs')
      .select(`
        IDUtilisateurs,
        Nom,
        Prenom,
        Email,
        EstDesactive,
        CatUtilisateurs:IDCatUtilisateurs (
          EstAdministrateur,
          EstModerateur,
          EstSupport,
          EstSenior,
          EstAidant
        )
      `)
      .eq('Email', supabaseUser.email)
      .single();

    if (existingUser) {
      // Déterminer le rôle basé sur la catégorie
      let role = 'visualisateur'; // rôle par défaut
      if (existingUser.CatUtilisateurs) {
        const cat = existingUser.CatUtilisateurs;
        if (cat.EstAdministrateur) { 
          role = 'administrateur';
        } else if (cat.EstModerateur) { 
          role = 'moderateur';
        } else if (cat.EstSupport) { 
          role = 'support';
        } else { 
          role = 'visualisateur'; 
        }
      }

      const mapping: UserMapping = {
        supabaseUserId: supabaseUser.id,  
        dbUserId: existingUser.IDUtilisateurs,
        nom: existingUser.Nom || '', 
        prenom: existingUser.Prenom || '',
        email: existingUser.Email || '', 
        role
      };

      return mapping;
    }
  } catch (error) {
    console.error('useSupabaseUserMapping: Error in findOrCreateUserMapping:', error);
    return null;
  }
};
```

## 4. Trigger SQL pour calcul automatique des commissions

```sql
CREATE OR REPLACE FUNCTION public.create_commission_from_commande()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
    commission_percentage NUMERIC;
    commission_amount NUMERIC;
BEGIN
    -- Récupérer le pourcentage de commission depuis ParametresCommission
    SELECT "Pourcentage" INTO commission_percentage
    FROM "ParametresCommission"
    WHERE "TypeTransaction" = 'Commande';
    
    -- Si aucun pourcentage n'est trouvé, utiliser 5% par défaut
    IF commission_percentage IS NULL THEN
        commission_percentage := 5.0;
    END IF;
    
    -- Calculer le montant de la commission
    commission_amount := NEW."MontantTotal" * (commission_percentage / 100);
    
    -- Insérer la commission dans VersementCommissions
    INSERT INTO "VersementCommissions" (
        "MontantCommission",
        "DateVersement",
        "MoyenVersement",
        "TypeTransaction",
        "PourcentageCommission",
        "IDCommande"
    ) VALUES (
        commission_amount,
        CURRENT_DATE,
        'Plateforme interne',
        'Commande',
        commission_percentage,
        NEW."IDCommande"
    );
    
    RETURN NEW;
END;
$function$
```

## 5. Upload sécurisé Supabase (useFileOperations.ts)

```typescript
const uploadFile = async (
  file: File,
  categoryId: number,
  onSuccess?: () => void,
  utilisateurId?: string
) => {
  // Vérifier que l'utilisateur est authentifié
  if (!isAuthenticated || !user) {
    toast({
      title: "Erreur",
      description: "Vous devez être connecté pour uploader un fichier",
      variant: "destructive"
    });
    return;
  }

  setUploading(true);
  try {
    // S'assurer que l'utilisateur est connecté à Supabase Auth
    const supabaseUserId = await ensureSupabaseAuth();

    // Générer un nom de fichier unique
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    // Upload vers Supabase Storage (bucket public)
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      throw uploadError;
    }

    // Obtenir l'URL publique du fichier
    const { data: urlData } = supabase.storage
      .from('documents')
      .getPublicUrl(filePath);

    // Utiliser l'utilisateur sélectionné ou l'utilisateur connecté par défaut
    const targetUserId = utilisateurId ? parseInt(utilisateurId) : parseInt(user.id);

    // Insérer l'entrée dans la table Document
    const { data: documentData, error: insertError } = await supabase
      .from('Document')
      .insert({
        Titre: file.name,
        TypeFichier: file.type || 'application/octet-stream',
        TailleFichier: file.size,
        URLFichier: urlData.publicUrl,
        IDCategorieDocument: categoryId,
        IDUtilisateurs: targetUserId,
        Statut: 'Publié'
      })
      .select()
      .single();

    if (insertError) {
      // Si l'insertion en base échoue, supprimer le fichier uploadé
      await supabase.storage.from('documents').remove([filePath]);
      throw insertError;
    }

    toast({
      title: "Fichier uploadé",
      description: `Le fichier "${file.name}" a été uploadé avec succès`
    });

    onSuccess?.();
    return documentData;

  } catch (error) {
    console.error('Error uploading file:', error);
    toast({
      title: "Erreur d'upload",
      description: error instanceof Error ? error.message : "Impossible d'uploader le fichier",
      variant: "destructive"
    });
    throw error;
  } finally {
    setUploading(false);
  }
};
```

## 6. Exemple d'appel API REST pour CRUD utilisateurs

```typescript
// Exemple d'ajout d'utilisateur via l'API Supabase
const ajouterUtilisateur = async (userData: {
  nom: string;
  prenom: string;
  email: string;
  idCatUtilisateurs: number;
}) => {
  try {
    const { data, error } = await supabase
      .from('Utilisateurs')
      .insert({
        Nom: userData.nom,
        Prenom: userData.prenom,
        Email: userData.email,
        IDCatUtilisateurs: userData.idCatUtilisateurs,
        EstDesactive: false,
        DateCreation: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
    return { success: false, error };
  }
};

// Exemple d'appel
const nouvelUtilisateur = {
  nom: "Dupont",
  prenom: "Jean",
  email: "jean.dupont@example.com",
  idCatUtilisateurs: 5 // Administrateur
};

ajouterUtilisateur(nouvelUtilisateur);
```

## 7. Arborescence du projet React

```
src/
├── components/
│   ├── auth/
│   │   ├── LoginPage.tsx
│   │   └── ProtectedRoute.tsx
│   ├── dashboard/
│   │   ├── Dashboard.tsx
│   │   ├── StatsCard.tsx
│   │   └── ActivityChart.tsx
│   ├── documents/
│   │   ├── Documents.tsx
│   │   ├── DocumentsTable.tsx
│   │   └── FileUploadComponent.tsx
│   ├── finances/
│   │   ├── Finances.tsx
│   │   └── FinanceTransactionTable.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── SharedLayout.tsx
│   ├── moderation/
│   │   ├── Moderation.tsx
│   │   └── ModerationStats.tsx
│   ├── partners/
│   │   ├── Partners.tsx
│   │   └── PartnerCard.tsx
│   ├── prestations/
│   │   ├── PrestationTracking.tsx
│   │   └── PrestationTable.tsx
│   ├── rgpd/
│   │   ├── RGPD.tsx
│   │   └── AddDemandeRGPDModal.tsx
│   ├── seniors/
│   │   ├── SeniorsList.tsx
│   │   └── SeniorsStats.tsx
│   ├── support/
│   │   ├── Support.tsx
│   │   └── SupportTicketModal.tsx
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── table.tsx
│   └── users/
│       ├── UserManagement.tsx
│       ├── UserTable.tsx
│       └── AddUserModal.tsx
├── hooks/
│   ├── useSupabaseAuth.ts
│   ├── usePermissions.ts
│   ├── useFileOperations.ts
│   ├── useSupportFileUpload.ts
│   └── useSupabaseUserMapping.ts
├── pages/
│   ├── DashboardPage.tsx
│   ├── DocumentsPage.tsx
│   ├── FinancesPage.tsx
│   ├── ModerationPage.tsx
│   ├── PartnersPage.tsx
│   ├── PrestationsPage.tsx
│   ├── RGPDPage.tsx
│   ├── SupportPage.tsx
│   └── UsersPage.tsx
├── integrations/
│   └── supabase/
│       ├── client.ts
│       └── types.ts
├── stores/
│   └── authStore.ts
├── lib/
│   └── utils.ts
├── App.tsx
└── main.tsx
```

---

**Note :** Ce fichier contient les extraits de code principaux pour documenter l'architecture de sécurité, la gestion des permissions, l'upload de fichiers et la structure du projet AppSeniors Admin dans le cadre du rapport de stage.

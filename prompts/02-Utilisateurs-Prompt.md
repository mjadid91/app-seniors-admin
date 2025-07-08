
# 👥 Prompt Lovable - Gestion des Utilisateurs

## 🎯 Objectif
Créer la page complète de gestion des utilisateurs avec onglets Seniors/Aidants, CRUD complet, et interface moderne.

## 📋 Instructions détaillées

### 1. Structure de la page
Page `/users` avec architecture modulaire :
- **UserManagement.tsx** : Composant principal avec Tabs
- **Onglet Seniors** : Liste et gestion des seniors
- **Onglet Aidants** : Liste et gestion des aidants  
- **Statistiques** : Métriques globales en en-tête
- **Recherche** : Filtrage en temps réel

### 2. Types de données TypeScript
```typescript
interface Senior {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  genre?: string;
  ville?: string;
  niveauAutonomie?: 'faible' | 'moyen' | 'eleve';
  dateInscription: string;
  statut: 'actif' | 'inactif' | 'suspendu';
}

interface Aidant {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  genre?: string;
  dateInscription: string;
  statut: 'actif' | 'inactif' | 'en_attente' | 'suspendu';
  tarifHoraire?: number;
  experience?: string;
}
```

### 3. Composants tables

#### `SeniorsTable.tsx`
```typescript
// Colonnes principales
- Senior (Avatar + Nom/Prénom + Ville)
- Email, Téléphone, Genre
- Autonomie (Badge coloré)
- Date inscription, Statut
- Actions (Modifier/Supprimer)

// Avatar généré
const avatar = (
  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full">
    <span className="text-white font-medium text-sm">
      {senior.prenom[0]}{senior.nom[0]}
    </span>
  </div>
);

// Badges autonomie
const getAutonomieBadge = (niveau: string) => {
  const config = {
    'faible': 'bg-red-50 text-red-700 border-red-200',
    'moyen': 'bg-yellow-50 text-yellow-700 border-yellow-200', 
    'eleve': 'bg-green-50 text-green-700 border-green-200'
  };
  return <Badge variant="outline" className={config[niveau]}>{niveau}</Badge>;
};
```

#### `AidantsTable.tsx`
```typescript
// Colonnes spécialisées
- Nom, Prénom séparés
- Email, Téléphone, Genre
- Date inscription, Statut
- Tarif horaire (formaté en €)
- Expérience (tronquée avec tooltip)
- Actions complètes

// Formatage tarif
<span className="font-medium">{aidant.tarifHoraire || 0}€</span>

// Expérience tronquée
<div className="text-sm max-w-32 truncate" title={aidant.experience}>
  {aidant.experience || 'Non renseigné'}
</div>
```

### 4. Modals CRUD

#### `AddSeniorModal.tsx`
```typescript
// Structure formulaire
interface SeniorFormData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  genre?: string;
  ville?: string;
  niveauAutonomie?: string;
  motDePasse: string;
}

// Validation
const validation = {
  email: 'Email unique requis',
  telephone: 'Format français recommandé',
  niveauAutonomie: 'Sélection parmi faible/moyen/élevé'
};

// Création cascade
1. Créer Utilisateur avec catégorie Senior
2. Créer profil Senior lié
3. Rafraîchir la liste
```

#### `EditSeniorModal.tsx`
```typescript
// Pré-remplissage
useEffect(() => {
  if (senior) {
    setFormData({
      nom: senior.nom,
      prenom: senior.prenom,
      email: senior.email,
      // ... autres champs
    });
  }
}, [senior]);

// Mise à jour séparée
await supabase.from("Utilisateurs").update(userData).eq("IDUtilisateurs", senior.idUtilisateur);
await supabase.from("Seniors").update(seniorData).eq("IDSeniors", senior.id);
```

#### `DeleteSeniorModal.tsx`
```typescript
// Confirmation sécurisée
<div className="bg-red-50 border border-red-200 p-4 rounded-lg">
  <p className="text-red-800 text-sm">
    <strong>Attention :</strong> Cette action supprimera définitivement 
    le senior et toutes ses données associées.
  </p>
</div>

// Suppression cascade
await supabase.from("Seniors").delete().eq("IDSeniors", senior.id);
// Le trigger cascade supprime l'utilisateur associé
```

### 5. Statistiques (`UserStats.tsx`)

#### Métriques calculées
```typescript
const calculateStats = (seniors: Senior[], aidants: Aidant[]) => {
  return {
    totalUsers: seniors.length + aidants.length,
    activeSeniors: seniors.filter(s => s.statut === 'actif').length,
    availableAidants: aidants.filter(a => a.statut === 'actif').length,
    newRegistrations: [...seniors, ...aidants]
      .filter(user => isWithinLast30Days(user.dateInscription)).length
  };
};
```

#### Cards avec icônes
```typescript
const StatsCard = ({ title, value, icon: Icon, color }) => (
  <Card>
    <CardContent className="flex items-center p-6">
      <Icon className={`h-8 w-8 ${color}`} />
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </CardContent>
  </Card>
);
```

### 6. Recherche et filtrage

#### `UserSearch.tsx`
```typescript
// Recherche temps réel avec debouncing
const [searchTerm, setSearchTerm] = useState("");
const debouncedSearch = useDebounce(searchTerm, 300);

// Filtrage multi-champs
const filteredSeniors = seniors.filter(senior => 
  senior.nom.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
  senior.prenom.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
  senior.email.toLowerCase().includes(debouncedSearch.toLowerCase())
);
```

### 7. Hook personnalisé

#### `useSeniors.tsx`
```typescript
export const useSeniors = () => {
  const fetchSeniors = async () => {
    const { data, error } = await supabase
      .from("Seniors")
      .select(`
        IDSeniors,
        NiveauAutonomie,
        Ville,
        Utilisateurs!inner (
          IDUtilisateurs,
          Nom,
          Prenom,
          Email,
          Telephone,
          Genre,
          DateInscription,
          Statut
        )
      `);
    
    return data?.map(senior => ({
      id: senior.IDSeniors,
      nom: senior.Utilisateurs.Nom,
      prenom: senior.Utilisateurs.Prenom,
      email: senior.Utilisateurs.Email,
      telephone: senior.Utilisateurs.Telephone,
      genre: senior.Utilisateurs.Genre,
      ville: senior.Ville,
      niveauAutonomie: senior.NiveauAutonomie,
      dateInscription: senior.Utilisateurs.DateInscription,
      statut: senior.Utilisateurs.Statut,
      idUtilisateur: senior.Utilisateurs.IDUtilisateurs
    }));
  };

  return useQuery({
    queryKey: ["seniors"],
    queryFn: fetchSeniors
  });
};
```

### 8. Gestion des badges et statuts

#### Badges colorés par statut
```typescript
const getStatusBadge = (statut: string) => {
  const statusConfig = {
    'actif': { variant: 'default', className: 'bg-green-50 text-green-700 border-green-200' },
    'inactif': { variant: 'secondary', className: 'bg-gray-50 text-gray-700 border-gray-200' },
    'en_attente': { variant: 'outline', className: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
    'suspendu': { variant: 'destructive', className: 'bg-red-50 text-red-700 border-red-200' }
  };
  
  const config = statusConfig[statut] || statusConfig.inactif;
  return <Badge variant={config.variant} className={config.className}>{statut.replace('_', ' ')}</Badge>;
};
```

#### Fonction utilitaire genre
```typescript
const displayGenre = (genre?: string) => {
  return genre && genre !== 'Non précisé' ? genre : 'Non renseigné';
};
```

### 9. Permissions et sécurité

#### Hook permissions
```typescript
const { hasPermission, isViewer } = usePermissions();
const canManageUsers = hasPermission(PERMISSIONS.MANAGE_USERS);

// Désactivation conditionnelle
<Button 
  variant="ghost" 
  size="sm" 
  disabled={isViewer()}
  onClick={() => onEditSenior(senior)}
>
  Modifier
</Button>

// Affichage conditionnel
{canManageUsers && !isViewer() && (
  <Button variant="destructive" onClick={() => onDeleteSenior(senior)}>
    Supprimer
  </Button>
)}
```

### 10. Base de données Supabase

#### Relations principales
```sql
-- Table Utilisateurs (base)
Utilisateurs {
  IDUtilisateurs (PK)
  Nom, Prenom, Email, Telephone
  Genre, DateInscription, Statut
  IDCatUtilisateurs (FK)
}

-- Table Seniors (profil)
Seniors {
  IDSeniors (PK)
  IDUtilisateurs (FK)
  NiveauAutonomie, Ville
}

-- Table Aidant (profil) 
Aidant {
  IDAidant (PK)
  IDUtilisateurs (FK)
  TarifAidant, Experience
}
```

#### Jointures optimisées
```typescript
// Une seule requête avec jointure inner
.select(`
  IDSeniors,
  NiveauAutonomie,
  Ville,
  Utilisateurs!inner (*)
`)
```

### 11. Interface responsive

#### Tables adaptatives
```typescript
// Scroll horizontal sur mobile
<div className="overflow-x-auto">
  <Table>
    // Contenu table
  </Table>
</div>

// Headers fixes
<TableHead className="sticky top-0 bg-white">Nom</TableHead>
```

#### Modals responsive
```typescript
// Taille adaptative
<DialogContent className="max-w-2xl">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    // Formulaire responsive
  </div>
</DialogContent>
```

### 12. Optimisations et performance

#### React Query
```typescript
// Cache automatique
queryKey: ["seniors"]
staleTime: 5 * 60 * 1000 // 5 minutes

// Invalidation après mutations
onSuccess: () => {
  queryClient.invalidateQueries(["seniors"]);
}
```

#### Memoization
```typescript
const filteredData = useMemo(() => 
  data?.filter(item => /* filtres */), 
  [data, filters]
);
```

Créez une interface utilisateur complète et moderne pour la gestion des seniors et aidants avec toutes les fonctionnalités CRUD, recherche, statistiques et permissions.

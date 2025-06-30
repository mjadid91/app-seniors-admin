
# Architecture des composants React

## Structure générale

L'application suit une architecture modulaire avec séparation des responsabilités.

### Organisation des dossiers
```
src/
├── components/           # Composants réutilisables
│   ├── auth/            # Authentification
│   ├── dashboard/       # Tableau de bord
│   ├── users/           # Gestion utilisateurs
│   ├── partners/        # Gestion partenaires
│   ├── prestations/     # Gestion prestations
│   ├── moderation/      # Outils modération
│   ├── support/         # Support client
│   ├── documents/       # Gestion documentaire
│   ├── rgpd/           # Conformité RGPD
│   ├── finances/       # Gestion financière
│   ├── layout/         # Composants de mise en page
│   └── ui/             # Composants UI de base (shadcn/ui)
├── hooks/              # Hooks personnalisés
├── pages/              # Pages principales
├── stores/             # État global (Zustand)
└── types/              # Définitions TypeScript
```

## Composants par page

### Page Dashboard
- **Dashboard.tsx** : Composant principal
- **StatsCard.tsx** : Cartes de statistiques
- **ActivityChart.tsx** : Graphiques d'activité
- **RecentActivity.tsx** : Activité récente

### Page Utilisateurs
- **UserManagement.tsx** : Gestion principale
- **SeniorsTable.tsx** : Table des seniors
- **AidantsTable.tsx** : Table des aidants
- **AddUserModal.tsx** : Création d'utilisateur
- **EditUserModal.tsx** : Édition d'utilisateur

### Page Partenaires
- **Partners.tsx** : Composant principal
- **PartnersListSection.tsx** : Liste des partenaires
- **BonPlansSection.tsx** : Gestion des bons plans
- **PartnerCard.tsx** : Carte partenaire
- **BonPlanCard.tsx** : Carte bon plan

## Patterns de conception

### 1. Container/Presenter Pattern
```typescript
// Container (logique métier)
const UserManagement = () => {
  const { users, loading, error } = useUsers();
  // ... logique
  
  return <UserTable users={users} loading={loading} />;
};

// Presenter (affichage)
const UserTable = ({ users, loading }) => {
  // ... rendu UI uniquement
};
```

### 2. Custom Hooks Pattern
```typescript
// Hook réutilisable
const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Logique de récupération des données
  
  return { users, loading, addUser, editUser, deleteUser };
};
```

### 3. Modal Pattern
```typescript
// Modal réutilisable
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};
```

## Composants UI de base (shadcn/ui)

### Composants disponibles
- **Button** : Boutons avec variantes
- **Input** : Champs de saisie
- **Select** : Listes déroulantes
- **Dialog** : Modales
- **Table** : Tableaux de données
- **Form** : Formulaires avec validation
- **Toast** : Notifications
- **Badge** : Étiquettes
- **Card** : Cartes conteneurs

### Exemple d'utilisation
```tsx
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

const MyComponent = () => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Titre</DialogTitle>
        </DialogHeader>
        <Button onClick={handleSubmit}>Valider</Button>
      </DialogContent>
    </Dialog>
  );
};
```

## Gestion d'état

### État local (useState)
- Données temporaires
- État des formulaires
- Visibilité des modales

### État global (Zustand)
- Authentification utilisateur
- Données partagées entre composants
- Cache des données fréquentes

### État serveur (TanStack Query)
- Récupération des données API
- Cache et synchronisation
- Mutations optimistes

## Patterns de rendu

### Rendu conditionnel
```tsx
const Component = () => {
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (data.length === 0) return <EmptyState />;
  
  return <DataTable data={data} />;
};
```

### Liste avec clés
```tsx
const ItemList = ({ items }) => (
  <div>
    {items.map(item => (
      <ItemCard key={item.id} item={item} />
    ))}
  </div>
);
```

### Composition de composants
```tsx
const Page = () => (
  <Layout>
    <Header title="Titre" />
    <Content>
      <Sidebar />
      <MainContent />
    </Content>
    <Footer />
  </Layout>
);
```

## Optimisations

### React.memo pour éviter les re-rendus
```tsx
const ExpensiveComponent = React.memo(({ data }) => {
  return <ComplexVisualization data={data} />;
});
```

### Lazy loading des composants
```tsx
const LazyComponent = lazy(() => import('./HeavyComponent'));

const App = () => (
  <Suspense fallback={<Loading />}>
    <LazyComponent />
  </Suspense>
);
```

### Debouncing des recherches
```tsx
const SearchInput = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  
  useEffect(() => {
    if (debouncedQuery) {
      performSearch(debouncedQuery);
    }
  }, [debouncedQuery]);
  
  return <input onChange={(e) => setQuery(e.target.value)} />;
};
```

## Accessibilité

### ARIA labels
```tsx
<button 
  aria-label="Supprimer l'utilisateur"
  onClick={handleDelete}
>
  <TrashIcon />
</button>
```

### Navigation au clavier
```tsx
<div
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter') handleClick();
  }}
>
  Élément interactif
</div>
```

### Focus management
```tsx
const Modal = ({ isOpen }) => {
  const modalRef = useRef();
  
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);
  
  return <div ref={modalRef} tabIndex={-1}>...</div>;
};
```

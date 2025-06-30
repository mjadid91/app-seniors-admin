
# Hooks personnalisés

## Vue d'ensemble

L'application utilise de nombreux hooks personnalisés pour encapsuler la logique métier et faciliter la réutilisation du code.

## Hooks d'authentification

### useSupabaseAuth
Gestion complète de l'authentification avec Supabase.

```typescript
const useSupabaseAuth = () => {
  const signIn = async (email, password) => { /* ... */ };
  const signOut = async () => { /* ... */ };
  const signUp = async (userData) => { /* ... */ };
  
  return { signIn, signOut, signUp, user, loading };
};
```

**Usage :** Connexion, déconnexion, inscription des utilisateurs.

### usePermissions
Gestion des permissions et contrôle d'accès.

```typescript
const usePermissions = () => {
  const canAccessPage = (pageId) => { /* ... */ };
  const canModifyUser = (userId) => { /* ... */ };
  const hasRole = (role) => { /* ... */ };
  
  return { canAccessPage, canModifyUser, hasRole };
};
```

**Usage :** Contrôle d'accès basé sur les rôles utilisateur.

## Hooks de données

### useUserManagement
Gestion complète des utilisateurs (CRUD).

```typescript
const useUserManagement = () => {
  const { data: users, isLoading } = useUsers();
  
  const addUser = useMutation({
    mutationFn: createUser,
    onSuccess: () => queryClient.invalidateQueries(['users'])
  });
  
  return { 
    users, 
    isLoading, 
    addUser, 
    editUser, 
    deleteUser,
    searchUsers 
  };
};
```

**Tables utilisées :** Utilisateurs, CatUtilisateurs, Seniors, Aidant.

### usePartners
Gestion des partenaires et bons plans.

```typescript
const usePartners = () => {
  const [partners, setPartners] = useState([]);
  const [bonsPlans, setBonsPlans] = useState([]);
  
  const handleAddPartner = async (partnerData) => { /* ... */ };
  const handleAddBonPlan = async (bonPlanData) => { /* ... */ };
  
  return {
    partners,
    bonsPlans,
    handleAddPartner,
    handleAddBonPlan,
    handleEditBonPlan,
    handleDeleteBonPlan
  };
};
```

**Tables utilisées :** Partenaire, BonPlan, ServicePartenaire.

### usePrestations
Gestion du catalogue de prestations.

```typescript
const usePrestations = () => {
  const fetchPrestations = useCallback(async () => {
    const { data } = await supabase
      .from('Prestation')
      .select('*, Domaine(DomaineTitre)');
    setPrestations(data);
  }, []);
  
  return {
    prestations,
    domaines,
    addPrestation,
    updatePrestation,
    deletePrestation
  };
};
```

**Tables utilisées :** Prestation, Domaine, MiseEnRelation.

## Hooks de formulaire

### useUserFormData
Gestion des données de formulaire utilisateur.

```typescript
const useUserFormData = () => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email requis';
    // ... autres validations
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  return {
    formData,
    setFormData,
    errors,
    validateForm,
    resetForm
  };
};
```

### useDocumentForm
Gestion des formulaires de documents.

```typescript
const useDocumentForm = () => {
  const uploadDocument = async (file, metadata) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('metadata', JSON.stringify(metadata));
    
    return await fetch('/api/documents/upload', {
      method: 'POST',
      body: formData
    });
  };
  
  return { uploadDocument, progress, error };
};
```

## Hooks utilitaires

### useDebounce
Retarde l'exécution d'une fonction pour optimiser les performances.

```typescript
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
};
```

**Usage :** Recherche en temps réel, validation de formulaires.

### useLocalStorage
Persistance des données dans le localStorage.

```typescript
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  
  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };
  
  return [storedValue, setValue];
};
```

### usePagination
Gestion de la pagination des listes.

```typescript
const usePagination = (data, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);
  
  return {
    currentData,
    currentPage,
    totalPages,
    setCurrentPage,
    nextPage: () => setCurrentPage(prev => Math.min(prev + 1, totalPages)),
    prevPage: () => setCurrentPage(prev => Math.max(prev - 1, 1))
  };
};
```

## Hooks de support

### useSupportTickets
Gestion des tickets de support.

```typescript
const useSupportTickets = () => {
  const { data: tickets, isLoading } = useQuery({
    queryKey: ['support-tickets'],
    queryFn: fetchSupportTickets
  });
  
  const createTicket = useMutation({
    mutationFn: createSupportTicket,
    onSuccess: () => {
      queryClient.invalidateQueries(['support-tickets']);
      toast.success('Ticket créé avec succès');
    }
  });
  
  return {
    tickets,
    isLoading,
    createTicket,
    updateTicket,
    closeTicket
  };
};
```

### useModerationActions
Actions de modération du contenu.

```typescript
const useModerationActions = () => {
  const moderateContent = async (contentId, action) => {
    const { data, error } = await supabase
      .from('ModerationLog')
      .insert({
        content_id: contentId,
        action: action,
        moderator_id: user.id,
        timestamp: new Date()
      });
    
    if (error) throw error;
    return data;
  };
  
  return {
    moderateContent,
    flagContent,
    approveContent,
    rejectContent
  };
};
```

## Hooks RGPD

### useRGPDRequests
Gestion des demandes RGPD.

```typescript
const useRGPDRequests = () => {
  const [requests, setRequests] = useState([]);
  
  const processRequest = async (requestId, action) => {
    const { data, error } = await supabase
      .from('DemandeRGPD')
      .update({
        Statut: action === 'approve' ? 'Traité' : 'Rejeté',
        DateTraitement: new Date(),
        TraitePar: user.id
      })
      .eq('IDDemandeRGPD', requestId);
    
    if (error) throw error;
    
    // Actions spécifiques selon le type de demande
    if (action === 'approve') {
      await executeRGPDAction(requestId);
    }
    
    return data;
  };
  
  return {
    requests,
    processRequest,
    exportUserData,
    deleteUserData,
    anonymizeUserData
  };
};
```

## Hooks de performance

### useInfiniteScroll
Chargement progressif des données.

```typescript
const useInfiniteScroll = (fetchMore, hasMore) => {
  const [isFetching, setIsFetching] = useState(false);
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
    if (hasMore) {
      setIsFetching(true);
      fetchMore().finally(() => setIsFetching(false));
    }
  };
  
  return [isFetching, setIsFetching];
};
```

### useVirtualization
Virtualisation des listes importantes.

```typescript
const useVirtualization = (items, itemHeight, containerHeight) => {
  const [scrollTop, setScrollTop] = useState(0);
  
  const visibleItemsCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleItemsCount, items.length);
  
  const visibleItems = items.slice(startIndex, endIndex);
  
  return {
    visibleItems,
    startIndex,
    totalHeight: items.length * itemHeight,
    offsetY: startIndex * itemHeight,
    onScroll: (e) => setScrollTop(e.target.scrollTop)
  };
};
```

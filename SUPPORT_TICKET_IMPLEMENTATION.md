
# Tutoriel vidéo - Implémentation de la fonctionnalité d'ajout de tickets support

Bonjour et bienvenue dans ce tutoriel ! Aujourd'hui, nous allons voir ensemble comment implémenter une fonctionnalité complète d'ajout de tickets support dans notre application React avec Supabase. C'est parti !

## Introduction : Ce qu'on va faire

Alors, qu'est-ce qu'on va créer aujourd'hui ? On va permettre aux administrateurs de créer des tickets support directement depuis l'interface, avec un système de statuts intelligent et une assignation automatique des agents. C'est vraiment pratique pour gérer les demandes d'assistance !

## Étape 1 : Comprendre le système de statuts

Avant de commencer à coder, expliquons rapidement notre système de statuts. On a trois statuts principaux :

- **"en_attente"** : C'est quand le ticket vient d'être créé mais qu'aucun agent n'est encore assigné
- **"en_cours"** : Là, un agent a été assigné et travaille sur le ticket
- **"resolu"** : Le ticket a été traité et résolu par l'agent ou un admin

La logique est simple : si on crée un ticket sans agent, il passe en "en_attente". Si on sélectionne un agent directement, hop, il passe en "en_cours" !

## Étape 2 : Ajout du bouton dans Support.tsx

Alors, première chose à faire, on va dans notre fichier `src/components/support/Support.tsx`. 

On va ajouter un état pour contrôler l'ouverture de notre modale :

```javascript
const [openModal, setOpenModal] = useState(false);
```

Ensuite, juste après le titre de notre page, on ajoute notre bouton :

```javascript
<Button onClick={() => setOpenModal(true)} className="mb-4">
  Ajouter un ticket
</Button>
```

Et n'oublions pas d'importer notre composant `AddTicketModal` qu'on va créer juste après :

```javascript
import AddTicketModal from "./AddTicketModal";
```

Puis, tout en bas de notre JSX, avant la fermeture, on ajoute notre modale :

```javascript
<AddTicketModal
  isOpen={openModal}
  onClose={() => setOpenModal(false)}
  onSuccess={() => {
    setOpenModal(false);
    refetch(); // Pour rafraîchir la liste
  }}
/>
```

## Étape 3 : Création du composant AddTicketModal

Maintenant, créons notre composant principal ! On crée le fichier `src/components/support/AddTicketModal.tsx`.

D'abord, on définit nos imports et notre interface :

```javascript
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// ... autres imports
```

Ensuite, on crée notre état pour le formulaire. Regardez, c'est très propre :

```javascript
const [formData, setFormData] = useState({
  sujet: "",
  descriptionDemande: "",
  clientId: "",
  priorite: "Normale",
  agentId: "" // Optionnel !
});
```

## Étape 4 : La récupération des données

Ici, c'est intéressant ! On utilise `useQuery` pour récupérer nos clients et nos agents support. 

Pour les clients, on fait une requête simple :

```javascript
const { data: clients = [] } = useQuery({
  queryKey: ['clients'],
  queryFn: async () => {
    const { data, error } = await supabase
      .from('Utilisateurs')
      .select('IDUtilisateurs, Nom, Prenom, Email')
      .order('Nom');
    
    if (error) throw error;
    return data;
  }
});
```

Et pour les agents support, on filtre par `IDCatUtilisateurs = 8` :

```javascript
const { data: supportAgents = [] } = useQuery({
  queryKey: ['support-agents'],
  queryFn: async () => {
    const { data, error } = await supabase
      .from('Utilisateurs')
      .select('IDUtilisateurs, Nom, Prenom, Email')
      .eq('IDCatUtilisateurs', 8) // Agents support uniquement
      .order('Nom');
    
    if (error) throw error;
    return data;
  }
});
```

## Étape 5 : La logique de soumission - Le cœur du système !

Alors ça, c'est la partie la plus importante ! Dans notre fonction `handleSubmit`, on va d'abord déterminer le statut initial :

```javascript
// Voici la magie : statut automatique selon l'assignation
const statutInitial = formData.agentId ? "en_cours" : "en_attente";
```

Vous voyez ? Si un agent est sélectionné, le ticket passe directement "en_cours", sinon il reste "en_attente". C'est logique !

Ensuite, on insère notre ticket dans la base :

```javascript
const { data: ticketData, error: ticketError } = await supabase
  .from('SupportClient')
  .insert({
    Sujet: formData.sujet,
    DescriptionDemande: formData.descriptionDemande,
    IDUtilisateursClient: parseInt(formData.clientId),
    Priorite: formData.priorite,
    StatutDemande: statutInitial, // Notre statut intelligent !
    DateEnvoi: new Date().toISOString().split('T')[0]
  })
  .select()
  .single();
```

## Étape 6 : L'assignation automatique d'agent

Et là, si un agent a été sélectionné, on crée automatiquement l'entrée dans `PrestationSupport` :

```javascript
if (formData.agentId && ticketData) {
  console.log('Assignation de l\'agent:', formData.agentId);
  
  const { error: prestationError } = await supabase
    .from('PrestationSupport')
    .insert({
      IDTicketClient: ticketData.IDTicketClient,
      IDIntervenant: parseInt(formData.agentId)
    });

  if (prestationError) {
    throw prestationError;
  }
}
```

C'est génial ! L'assignation se fait automatiquement si un agent est choisi.

## Étape 7 : Le formulaire utilisateur

Pour le formulaire, on utilise les composants shadcn/ui. Regardez comme c'est propre :

```javascript
<form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <label className="block text-sm font-medium mb-1">Sujet du ticket</label>
    <Input
      value={formData.sujet}
      onChange={(e) => setFormData(prev => ({ ...prev, sujet: e.target.value }))}
      required
    />
  </div>
  
  {/* Description */}
  <div>
    <label className="block text-sm font-medium mb-1">Description du problème</label>
    <Textarea
      value={formData.descriptionDemande}
      onChange={(e) => setFormData(prev => ({ ...prev, descriptionDemande: e.target.value }))}
      required
    />
  </div>
  
  {/* Sélection du client */}
  <div>
    <label className="block text-sm font-medium mb-1">Client</label>
    <Select value={formData.clientId} onValueChange={(value) => setFormData(prev => ({ ...prev, clientId: value }))}>
      <SelectTrigger>
        <SelectValue placeholder="Sélectionner un client" />
      </SelectTrigger>
      <SelectContent>
        {clients.map((client) => (
          <SelectItem key={client.IDUtilisateurs} value={client.IDUtilisateurs.toString()}>
            {client.Prenom} {client.Nom} ({client.Email})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
</form>
```

## Étape 8 : Mise à jour des permissions et affichage

Maintenant, on met à jour notre hook `useTicketPermissions` dans `src/hooks/useTicketPermissions.ts`. 

La logique est simple : un admin peut toujours résoudre, un agent support peut résoudre seulement s'il est assigné au ticket :

```javascript
const canResolve = () => {
  if (ticket.statut === 'resolu') return false;
  
  // L'admin peut toujours résoudre
  if (isAdmin()) return true;
  
  // Le support peut résoudre seulement s'il est assigné au ticket
  if (isSupport() && user) {
    const currentUserFullName = `${user.prenom} ${user.nom}`;
    return ticket.assigneA === currentUserFullName;
  }
  
  return false;
};
```

## Étape 9 : Mise à jour de l'assignation

Dans `TicketAssignmentForm.tsx`, quand on assigne un agent, le statut passe automatiquement à "en_cours" :

```javascript
// Mise à jour du statut lors de l'assignation
await supabase
  .from('SupportClient')
  .update({ 
    StatutDemande: 'en_cours' // Statut automatique !
  })
  .eq('IDTicketClient', ticketId);
```

## Étape 10 : L'affichage des statuts

Et enfin, on met à jour nos composants d'affichage comme `TicketStatusInfo.tsx` pour gérer nos nouveaux labels :

```javascript
const getStatutLabel = (statut: string) => {
  switch (statut) {
    case 'en_attente': return 'En attente';
    case 'en_cours': return 'En cours';
    case 'resolu': return 'Résolu';
    default: return statut;
  }
};
```

## Workflow final - Comment ça marche en pratique

Récapitulons le workflow complet :

1. **Création sans agent** → Statut "en_attente"
2. **Création avec agent** → Statut "en_cours" + assignation automatique
3. **Assignation ultérieure** → Passage à "en_cours"
4. **Résolution** → Statut "resolu" (par admin ou agent assigné)

## Conclusion

Et voilà ! On a créé un système complet de gestion de tickets support avec :

- Création intuitive de tickets
- Statuts automatiques intelligents  
- Assignation flexible d'agents
- Permissions granulaires pour la résolution
- Interface utilisateur moderne avec shadcn/ui

Le système est maintenant opérationnel et prêt pour la production ! Les utilisateurs peuvent créer des tickets, les administrateurs peuvent les assigner, et tout le monde peut suivre l'évolution grâce aux statuts clairs.

Merci d'avoir suivi ce tutoriel, et n'hésitez pas si vous avez des questions sur l'implémentation !

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Trash2, Archive } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ForumPost {
  id: string;
  titre: string;
  auteur: string;
  dateCreation: string;
  nbReponses: number;
  signalements: number;
  statut: 'visible' | 'masque' | 'archive';
}

interface GroupMessage {
  id: string;
  contenu: string;
  auteur: string;
  groupe: string;
  dateEnvoi: string;
  signalements: number;
  statut: 'visible' | 'masque' | 'supprime';
}

const mockForumPosts: ForumPost[] = [
  {
    id: 'F001',
    titre: 'Conseils pour bien vieillir chez soi',
    auteur: 'Marie Dupont',
    dateCreation: '2024-06-10',
    nbReponses: 12,
    signalements: 0,
    statut: 'visible'
  },
  {
    id: 'F002',
    titre: 'Problème avec mon aidant',
    auteur: 'Pierre Martin',
    dateCreation: '2024-06-09',
    nbReponses: 5,
    signalements: 2,
    statut: 'visible'
  }
];

const mockGroupMessages: GroupMessage[] = [
  {
    id: 'G001',
    contenu: 'Bonjour à tous, j\'aimerais partager mon expérience...',
    auteur: 'Sophie Bernard',
    groupe: 'Seniors Actifs',
    dateEnvoi: '2024-06-11',
    signalements: 1,
    statut: 'visible'
  }
];

const Moderation = () => {
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(mockForumPosts);
  const [groupMessages, setGroupMessages] = useState<GroupMessage[]>(mockGroupMessages);
  const { toast } = useToast();

  const getStatutBadgeColor = (statut: string) => {
    switch (statut) {
      case 'visible': return 'bg-green-100 text-green-700 border-green-200';
      case 'masque': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'archive': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'supprime': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleVoirPost = (post: ForumPost) => {
    toast({
      title: "Voir le sujet",
      description: `Ouverture du sujet "${post.titre}"`,
    });
    console.log("Voir sujet:", post);
  };

  const handleMasquerPost = (post: ForumPost) => {
    setForumPosts(prev => prev.map(p => 
      p.id === post.id ? { ...p, statut: 'masque' as const } : p
    ));
    toast({
      title: "Sujet masqué",
      description: `Le sujet "${post.titre}" a été masqué`,
    });
  };

  const handleArchiverPost = (post: ForumPost) => {
    setForumPosts(prev => prev.map(p => 
      p.id === post.id ? { ...p, statut: 'archive' as const } : p
    ));
    toast({
      title: "Sujet archivé",
      description: `Le sujet "${post.titre}" a été archivé`,
    });
  };

  const handleSupprimerPost = (post: ForumPost) => {
    setForumPosts(prev => prev.filter(p => p.id !== post.id));
    toast({
      title: "Sujet supprimé",
      description: `Le sujet "${post.titre}" a été supprimé définitivement`,
      variant: "destructive"
    });
  };

  const handleVoirMessage = (message: GroupMessage) => {
    toast({
      title: "Voir le message",
      description: `Ouverture du message de ${message.auteur}`,
    });
    console.log("Voir message:", message);
  };

  const handleMasquerMessage = (message: GroupMessage) => {
    setGroupMessages(prev => prev.map(m => 
      m.id === message.id ? { ...m, statut: 'masque' as const } : m
    ));
    toast({
      title: "Message masqué",
      description: `Le message de ${message.auteur} a été masqué`,
    });
  };

  const handleSupprimerMessage = (message: GroupMessage) => {
    setGroupMessages(prev => prev.filter(m => m.id !== message.id));
    toast({
      title: "Message supprimé",
      description: `Le message de ${message.auteur} a été supprimé`,
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Modération</h2>
          <p className="text-slate-600 mt-1">Gestion des contenus des forums et groupes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <Eye className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Signalements</p>
                <p className="text-xl font-bold text-slate-800">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <EyeOff className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Masqués</p>
                <p className="text-xl font-bold text-slate-800">0</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <Archive className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Archivés</p>
                <p className="text-xl font-bold text-slate-800">0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="forums" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="forums">Forums</TabsTrigger>
          <TabsTrigger value="groupes">Groupes</TabsTrigger>
        </TabsList>

        <TabsContent value="forums">
          <Card>
            <CardHeader>
              <CardTitle>Sujets de forum</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 font-medium text-slate-700">Titre</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-700">Auteur</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-700">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-700">Réponses</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-700">Signalements</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-700">Statut</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {forumPosts.map((post) => (
                      <tr key={post.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-4">
                          <p className="font-medium text-slate-800">{post.titre}</p>
                          <p className="text-sm text-slate-500">ID: {post.id}</p>
                        </td>
                        <td className="py-4 px-4 text-slate-600">{post.auteur}</td>
                        <td className="py-4 px-4 text-slate-600">
                          {new Date(post.dateCreation).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="py-4 px-4 text-slate-600">{post.nbReponses}</td>
                        <td className="py-4 px-4">
                          {post.signalements > 0 ? (
                            <Badge className="bg-red-100 text-red-700 border-red-200">
                              {post.signalements}
                            </Badge>
                          ) : (
                            <span className="text-slate-400">0</span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={getStatutBadgeColor(post.statut)}>
                            {post.statut}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              title="Voir"
                              onClick={() => handleVoirPost(post)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              title="Masquer"
                              onClick={() => handleMasquerPost(post)}
                            >
                              <EyeOff className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              title="Archiver"
                              onClick={() => handleArchiverPost(post)}
                            >
                              <Archive className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-600 hover:text-red-700 hover:bg-red-50" 
                              title="Supprimer"
                              onClick={() => handleSupprimerPost(post)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="groupes">
          <Card>
            <CardHeader>
              <CardTitle>Messages de groupes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 font-medium text-slate-700">Contenu</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-700">Auteur</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-700">Groupe</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-700">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-700">Signalements</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-700">Statut</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupMessages.map((message) => (
                      <tr key={message.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-4">
                          <p className="text-slate-800 max-w-xs truncate">{message.contenu}</p>
                          <p className="text-sm text-slate-500">ID: {message.id}</p>
                        </td>
                        <td className="py-4 px-4 text-slate-600">{message.auteur}</td>
                        <td className="py-4 px-4 text-slate-600">{message.groupe}</td>
                        <td className="py-4 px-4 text-slate-600">
                          {new Date(message.dateEnvoi).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="py-4 px-4">
                          {message.signalements > 0 ? (
                            <Badge className="bg-red-100 text-red-700 border-red-200">
                              {message.signalements}
                            </Badge>
                          ) : (
                            <span className="text-slate-400">0</span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={getStatutBadgeColor(message.statut)}>
                            {message.statut}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              title="Voir"
                              onClick={() => handleVoirMessage(message)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              title="Masquer"
                              onClick={() => handleMasquerMessage(message)}
                            >
                              <EyeOff className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-600 hover:text-red-700 hover:bg-red-50" 
                              title="Supprimer"
                              onClick={() => handleSupprimerMessage(message)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Moderation;


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ForumPost } from './types';
import { getStatutBadgeColor } from './utils';
import ViewForumPostModal from './ViewForumPostModal';
import ModerationActionsModal from './ModerationActionsModal';

interface ForumPostsTableProps {
  forumPosts: ForumPost[];
  setForumPosts: React.Dispatch<React.SetStateAction<ForumPost[]>>;
}

const allowedStatuts = ['visible', 'masque', 'archive'] as const;
type ForumPostStatut = typeof allowedStatuts[number];

const ForumPostsTable = ({ forumPosts, setForumPosts }: ForumPostsTableProps) => {
  const { toast } = useToast();
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isModerationModalOpen, setIsModerationModalOpen] = useState(false);

  const handleVoirPost = (post: ForumPost) => {
    setSelectedPost(post);
    setIsViewModalOpen(true);
    toast({
      title: "Voir le sujet",
      description: `Ouverture du sujet "${post.titre}"`,
    });
    console.log("Voir sujet:", post);
  };

  const handleModeratePost = (post: ForumPost) => {
    setSelectedPost(post);
    setIsModerationModalOpen(true);
  };

  const handleModerationAction = async (postId: string, action: string, reason?: string) => {
    console.log(`Action de modération: ${action} sur le post ${postId}`, { reason });
    
    if (action === 'supprime') {
      setForumPosts(prev => prev.filter(p => p.id !== postId));
    } else if ((allowedStatuts as readonly string[]).includes(action)) {
      setForumPosts(prev =>
        prev.map(p =>
          p.id === postId ? { ...p, statut: action as ForumPostStatut } : p
        )
      );
    }
  };

  const handleSupprimerPost = async (post: ForumPost) => {
    try {
      const { error } = await supabase
        .from('SujetForum')
        .delete()
        .eq('IDSujetForum', parseInt(post.id));

      if (error) throw error;

      setForumPosts(prev => prev.filter(p => p.id !== post.id));
      toast({
        title: "Sujet supprimé",
        description: `Le sujet "${post.titre}" a été supprimé définitivement`,
        variant: "destructive"
      });
    } catch (error: any) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le sujet",
        variant: "destructive"
      });
    }
  };

  return (
    <>
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

      <ViewForumPostModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        post={selectedPost}
        onModerate={handleModeratePost}
      />

      <ModerationActionsModal
        isOpen={isModerationModalOpen}
        onClose={() => setIsModerationModalOpen(false)}
        item={selectedPost}
        type="forum"
        onAction={handleModerationAction}
      />
    </>
  );
};

export default ForumPostsTable;

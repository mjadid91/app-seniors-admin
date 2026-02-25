import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, MessageSquare, Eye } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {DialogDescription} from "@radix-ui/react-dialog";

interface Forum {
  IDForum: number;
  TitreForum: string;
  DescriptionForum: string;
  Categorie: string;
  estPublic: boolean;
  DateCreationForum: string;
  Utilisateurs?: {
    Nom: string;
    Prenom: string;
  };
}

interface ViewForumDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  forum: Forum | null;
}

const ViewForumDetailsModal = ({ isOpen, onClose, forum }: ViewForumDetailsModalProps) => {
  const { data: forumStats } = useQuery({
    queryKey: ['forum-details-stats', forum?.IDForum],
    enabled: !!forum?.IDForum,
    queryFn: async () => {
      if (!forum?.IDForum) return { sujets: 0, reponses: 0 };
      
      // Compter les sujets
      const { count: sujetsCount } = await supabase
        .from('SujetForum')
        .select('*', { count: 'exact', head: true })
        .eq('IDForum', forum.IDForum);

      // Compter les réponses via les sujets de ce forum
      const { data: sujets } = await supabase
        .from('SujetForum')
        .select('IDSujetForum')
        .eq('IDForum', forum.IDForum);

      let reponsesCount = 0;
      if (sujets && sujets.length > 0) {
        const sujetIds = sujets.map(s => s.IDSujetForum);
        const { count } = await supabase
          .from('ReponseForum')
          .select('*', { count: 'exact', head: true })
          .in('IDSujetForum', sujetIds);
        
        reponsesCount = count || 0;
      }

      return {
        sujets: sujetsCount || 0,
        reponses: reponsesCount
      };
    }
  });

  if (!forum) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{forum?.TitreForum}</DialogTitle>
          <Eye className="h-5 w-5 text-blue-600" />
          <DialogDescription>
            Informations administratives sur le forum et ses statistiques.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    {forum.TitreForum}
                  </h3>
                  <p className="text-slate-600">{forum.DescriptionForum}</p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-slate-500" />
                    <span className="text-sm text-slate-600">
                      Créé par: {forum.Utilisateurs ? 
                        `${forum.Utilisateurs.Prenom} ${forum.Utilisateurs.Nom}` : 
                        'Inconnu'
                      }
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-slate-500" />
                    <span className="text-sm text-slate-600">
                      {new Date(forum.DateCreationForum).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline">{forum.Categorie}</Badge>
                  <Badge className={forum.estPublic ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}>
                    {forum.estPublic ? 'Public' : 'Privé'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h4 className="font-semibold text-slate-800 mb-4">Statistiques</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-2xl font-semibold text-slate-800">
                      {forumStats?.sujets || 0}
                    </p>
                    <p className="text-sm text-slate-600">Sujets</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-2xl font-semibold text-slate-800">
                      {forumStats?.reponses || 0}
                    </p>
                    <p className="text-sm text-slate-600">Réponses</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewForumDetailsModal;

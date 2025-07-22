
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AddForumModal from "./AddForumModal";
import DeleteForumModal from "./DeleteForumModal";
import ViewForumDetailsModal from "./ViewForumDetailsModal";

const ForumsListSection = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedForum, setSelectedForum] = useState<{ IDForum: number; TitreForum: string } | null>(null);
  const [viewForum, setViewForum] = useState<any>(null);

  const { data: forums = [], refetch } = useQuery({
    queryKey: ['forums-list'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Forum')
        .select(`
          IDForum,
          TitreForum,
          DescriptionForum,
          Categorie,
          estPublic,
          DateCreationForum,
          Utilisateurs!inner(Nom, Prenom)
        `)
        .order('DateCreationForum', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const { data: forumStats = {} } = useQuery({
    queryKey: ['forum-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('SujetForum')
        .select('IDForum, IDSujetForum')
        .order('IDForum');
      
      if (error) throw error;
      
      const stats: { [key: number]: number } = {};
      data.forEach(sujet => {
        if (!stats[sujet.IDForum]) {
          stats[sujet.IDForum] = 0;
        }
        stats[sujet.IDForum]++;
      });
      
      return stats;
    }
  });

  const handleDeleteForum = (forum: { IDForum: number; TitreForum: string }) => {
    setSelectedForum(forum);
    setIsDeleteModalOpen(true);
  };

  const handleViewForum = (forum: any) => {
    setViewForum(forum);
    setIsViewModalOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Forums disponibles</CardTitle>
          <Button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Ajouter un forum
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Titre</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Catégorie</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Créateur</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Sujets</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Visibilité</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {forums.map((forum) => (
                  <tr key={forum.IDForum} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-slate-800">{forum.TitreForum}</p>
                        <p className="text-sm text-slate-500">{forum.DescriptionForum}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline">{forum.Categorie}</Badge>
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      {forum.Utilisateurs ? `${forum.Utilisateurs.Prenom} ${forum.Utilisateurs.Nom}` : 'Inconnu'}
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      {forumStats[forum.IDForum] || 0} sujet{(forumStats[forum.IDForum] || 0) !== 1 ? 's' : ''}
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={forum.estPublic ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}>
                        {forum.estPublic ? 'Public' : 'Privé'}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          title="Voir les détails"
                          onClick={() => handleViewForum(forum)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          title="Supprimer le forum"
                          onClick={() => handleDeleteForum({
                            IDForum: forum.IDForum,
                            TitreForum: forum.TitreForum
                          })}
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

      <AddForumModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => {
          refetch();
          setIsAddModalOpen(false);
        }}
      />

      <DeleteForumModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        forum={selectedForum}
        onSuccess={() => {
          refetch();
          setIsDeleteModalOpen(false);
        }}
      />

      <ViewForumDetailsModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        forum={viewForum}
      />
    </>
  );
};

export default ForumsListSection;

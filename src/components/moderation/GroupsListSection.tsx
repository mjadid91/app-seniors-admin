import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, Trash2, UserMinus, UserPlus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useRealtimeInvalidation } from "@/hooks/useRealtimeInvalidation";
import AddGroupModal from "./AddGroupModal";
import AddGroupMembersModal from "./AddGroupMembersModal";
import DeleteGroupModal from "./DeleteGroupModal";
import DeleteGroupMemberModal from "./DeleteGroupMemberModal";

const GroupsListSection = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddMembersModalOpen, setIsAddMembersModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteMemberModalOpen, setIsDeleteMemberModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<{ id: string; titre: string } | null>(null);
  const [selectedMember, setSelectedMember] = useState<{ id: string; nom: string; prenom: string; groupeId: string } | null>(null);
  const [expandedGroupId, setExpandedGroupId] = useState<string | null>(null);

  // Activer les mises à jour en temps réel
  useRealtimeInvalidation();

  const { data: groups = [], refetch } = useQuery({
    queryKey: ['groups-list'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Groupe')
        .select(`
          IDGroupe,
          Titre,
          Description,
          DateCreation,
          Utilisateurs!inner(Nom, Prenom)
        `)
        .order('DateCreation', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const { data: groupMembers = {} } = useQuery({
    queryKey: ['group-members', expandedGroupId],
    enabled: !!expandedGroupId,
    queryFn: async () => {
      if (!expandedGroupId) return {};
      
      const { data, error } = await supabase
        .from('Utilisateurs_Groupe')
        .select(`
          IDUtilisateurs,
          IDGroupe,
          Utilisateurs!inner(Nom, Prenom)
        `)
        .eq('IDGroupe', parseInt(expandedGroupId));
      
      if (error) throw error;
      
      const membersByGroup: { [key: string]: any[] } = {};
      data.forEach(member => {
        const groupId = member.IDGroupe.toString();
        if (!membersByGroup[groupId]) {
          membersByGroup[groupId] = [];
        }
        membersByGroup[groupId].push({
          id: member.IDUtilisateurs.toString(),
          nom: member.Utilisateurs?.Nom || '',
          prenom: member.Utilisateurs?.Prenom || '',
          groupeId: groupId
        });
      });
      
      return membersByGroup;
    }
  });

  const { data: groupStats = {} } = useQuery({
    queryKey: ['group-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('MessageGroupe')
        .select('IDGroupe, IDMessageGroupe')
        .order('IDGroupe');
      
      if (error) throw error;
      
      const stats: { [key: number]: number } = {};
      data.forEach(message => {
        if (!stats[message.IDGroupe]) {
          stats[message.IDGroupe] = 0;
        }
        stats[message.IDGroupe]++;
      });
      
      return stats;
    }
  });

  const handleDeleteGroup = (group: { IDGroupe: number; Titre: string }) => {
    setSelectedGroup({
      id: group.IDGroupe.toString(),
      titre: group.Titre
    });
    setIsDeleteModalOpen(true);
  };

  const handleDeleteMember = (member: any) => {
    setSelectedMember(member);
    setIsDeleteMemberModalOpen(true);
  };

  const toggleGroupExpansion = (groupId: string) => {
    setExpandedGroupId(expandedGroupId === groupId ? null : groupId);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Groupes disponibles</CardTitle>
          <div className="flex items-center gap-2">
            <Button onClick={() => setIsAddMembersModalOpen(true)} variant="outline" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Ajouter des membres
            </Button>
            <Button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Ajouter un groupe
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Titre</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Créateur</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Messages</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((group) => [
                  <tr key={`group-${group.IDGroupe}`} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-slate-800">{group.Titre}</p>
                        <p className="text-sm text-slate-500">{group.Description}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      {group.Utilisateurs ? `${group.Utilisateurs.Prenom} ${group.Utilisateurs.Nom}` : 'Inconnu'}
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      {groupStats[group.IDGroupe] || 0} message{(groupStats[group.IDGroupe] || 0) !== 1 ? 's' : ''}
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      {new Date(group.DateCreation).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          title="Voir les membres"
                          onClick={() => toggleGroupExpansion(group.IDGroupe.toString())}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          title="Supprimer le groupe"
                          onClick={() => handleDeleteGroup({
                            IDGroupe: group.IDGroupe,
                            Titre: group.Titre
                          })}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>,
                  
                  expandedGroupId === group.IDGroupe.toString() && (
                    <tr key={`group-members-${group.IDGroupe}`}>
                      <td colSpan={5} className="px-4 py-2 bg-slate-50">
                        <div className="space-y-2">
                          <h4 className="font-medium text-slate-700">Membres du groupe :</h4>
                          {groupMembers[group.IDGroupe.toString()]?.length > 0 ? (
                            <div className="space-y-1">
                              {groupMembers[group.IDGroupe.toString()].map((member: any) => (
                                <div key={`member-${member.id}-${group.IDGroupe}`} className="flex items-center justify-between bg-white p-2 rounded border">
                                  <span className="text-sm">{member.prenom} {member.nom}</span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700"
                                    onClick={() => handleDeleteMember(member)}
                                  >
                                    <UserMinus className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-slate-500">Aucun membre dans ce groupe</p>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                ])}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <AddGroupModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => {
          refetch();
          setIsAddModalOpen(false);
        }}
      />

      <AddGroupMembersModal
        isOpen={isAddMembersModalOpen}
        onClose={() => setIsAddMembersModalOpen(false)}
        onSuccess={() => {
          refetch();
          setIsAddMembersModalOpen(false);
        }}
      />

      <DeleteGroupModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        group={selectedGroup}
        onSuccess={() => {
          refetch();
          setIsDeleteModalOpen(false);
        }}
      />

      <DeleteGroupMemberModal
        isOpen={isDeleteMemberModalOpen}
        onClose={() => setIsDeleteMemberModalOpen(false)}
        member={selectedMember}
        onSuccess={() => {
          refetch();
          setIsDeleteMemberModalOpen(false);
        }}
      />
    </>
  );
};

export default GroupsListSection;

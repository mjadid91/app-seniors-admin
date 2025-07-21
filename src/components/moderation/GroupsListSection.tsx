import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown, ChevronRight, Users, Calendar, User, UserCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const GroupsListSection = () => {
  const [expandedGroups, setExpandedGroups] = useState<Set<number>>(new Set());

  const { data: groups = [], isLoading } = useQuery({
    queryKey: ['groups-list'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Groupe')
        .select(`
          IDGroupe,
          Titre,
          Description,
          DateCreation,
          IDUtilisateursCreateur,
          Utilisateurs!inner(Nom, Prenom)
        `)
        .order('DateCreation', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const { data: groupMembers = {} } = useQuery({
    queryKey: ['group-members', expandedGroups],
    queryFn: async () => {
      if (expandedGroups.size === 0) return {};
      
      const groupIds = Array.from(expandedGroups);
      const { data, error } = await supabase
        .from('Utilisateurs_Groupe')
        .select(`
          IDGroupe,
          IDUtilisateurs,
          Utilisateurs!inner(
            IDUtilisateurs,
            Nom,
            Prenom,
            Email
          )
        `)
        .in('IDGroupe', groupIds);
      
      if (error) throw error;
      
      // Grouper les membres par groupe
      const membersByGroup: Record<number, any[]> = {};
      data.forEach(member => {
        if (!membersByGroup[member.IDGroupe]) {
          membersByGroup[member.IDGroupe] = [];
        }
        membersByGroup[member.IDGroupe].push(member.Utilisateurs);
      });
      
      return membersByGroup;
    },
    enabled: expandedGroups.size > 0
  });

  const toggleGroup = (groupId: number) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const getInitials = (nom: string, prenom: string) => {
    return `${prenom?.[0] || ''}${nom?.[0] || ''}`.toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Groupes existants</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Groupes existants</h3>
        <Badge variant="secondary" className="bg-purple-50 text-purple-700">
          {groups.length} groupe{groups.length > 1 ? 's' : ''}
        </Badge>
      </div>
      
      <div className="space-y-4">
        {groups.map((group) => {
          const isExpanded = expandedGroups.has(group.IDGroupe);
          const members = groupMembers[group.IDGroupe] || [];
          
          return (
            <Card key={group.IDGroupe} className="hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base text-slate-900">
                    {group.Titre}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleGroup(group.IDGroupe)}
                    className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900"
                  >
                    <Users className="h-3 w-3" />
                    Voir les membres
                    {isExpanded ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {group.Description && (
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {group.Description}
                  </p>
                )}
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="h-3 w-3" />
                    <span>
                      Créé le {format(new Date(group.DateCreation), 'dd MMMM yyyy', { locale: fr })}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <User className="h-3 w-3" />
                    <span>
                      Par {group.Utilisateurs?.Prenom} {group.Utilisateurs?.Nom}
                    </span>
                  </div>
                </div>

                <Collapsible open={isExpanded} onOpenChange={() => toggleGroup(group.IDGroupe)}>
                  <CollapsibleContent className="space-y-3">
                    <div className="border-t pt-3 mt-3">
                      <div className="flex items-center gap-2 mb-3">
                        <UserCheck className="h-4 w-4 text-slate-500" />
                        <span className="text-sm font-medium text-slate-700">
                          Membres ({members.length})
                        </span>
                      </div>
                      
                      {members.length > 0 ? (
                        <div className="grid gap-2 sm:grid-cols-2">
                          {members.map((member) => (
                            <div 
                              key={member.IDUtilisateurs} 
                              className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg"
                            >
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-slate-200 text-slate-600 text-xs">
                                  {getInitials(member.Nom, member.Prenom)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-900 truncate">
                                  {member.Prenom} {member.Nom}
                                </p>
                                <p className="text-xs text-slate-500 truncate">
                                  {member.Email}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <Users className="h-6 w-6 text-slate-400 mx-auto mb-2" />
                          <p className="text-sm text-slate-500">Aucun membre dans ce groupe</p>
                        </div>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {groups.length === 0 && (
        <Card className="border-dashed border-2 border-slate-200">
          <CardContent className="flex flex-col items-center justify-center py-8 text-center">
            <Users className="h-8 w-8 text-slate-400 mb-2" />
            <p className="text-slate-500">Aucun groupe trouvé</p>
            <p className="text-sm text-slate-400">Les groupes créés apparaîtront ici</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GroupsListSection;
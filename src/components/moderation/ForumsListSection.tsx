import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Calendar, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const ForumsListSection = () => {
  const { data: forums = [], isLoading } = useQuery({
    queryKey: ['forums-list'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Forum')
        .select(`
          IDForum,
          TitreForum,
          DescriptionForum,
          Categorie,
          DateCreationForum,
          estPublic,
          IDCreateur,
          Utilisateurs!inner(Nom, Prenom)
        `)
        .order('DateCreationForum', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Forums existants</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
        <h3 className="text-lg font-semibold text-slate-900">Forums existants</h3>
        <Badge variant="secondary" className="bg-blue-50 text-blue-700">
          {forums.length} forum{forums.length > 1 ? 's' : ''}
        </Badge>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {forums.map((forum) => (
          <Card key={forum.IDForum} className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-base text-slate-900 line-clamp-2">
                  {forum.TitreForum}
                </CardTitle>
                <Badge 
                  variant={forum.estPublic ? "default" : "secondary"}
                  className={forum.estPublic ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}
                >
                  {forum.estPublic ? "Public" : "Privé"}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              {forum.DescriptionForum && (
                <p className="text-sm text-slate-600 line-clamp-2">
                  {forum.DescriptionForum}
                </p>
              )}
              
              <div className="space-y-2">
                {forum.Categorie && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-xs text-slate-500 font-medium">
                      {forum.Categorie}
                    </span>
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Calendar className="h-3 w-3" />
                  <span>
                    Créé le {format(new Date(forum.DateCreationForum), 'dd MMMM yyyy', { locale: fr })}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <User className="h-3 w-3" />
                  <span>
                    Par {forum.Utilisateurs?.Prenom} {forum.Utilisateurs?.Nom}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {forums.length === 0 && (
        <Card className="border-dashed border-2 border-slate-200">
          <CardContent className="flex flex-col items-center justify-center py-8 text-center">
            <Eye className="h-8 w-8 text-slate-400 mb-2" />
            <p className="text-slate-500">Aucun forum trouvé</p>
            <p className="text-sm text-slate-400">Les forums créés apparaîtront ici</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ForumsListSection;
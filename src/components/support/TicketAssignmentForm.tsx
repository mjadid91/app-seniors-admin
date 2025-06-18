import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSupportUsers } from "@/hooks/useSupportUsers";

interface SupportUser {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  specialite?: string;
  disponible: boolean;
}

interface TicketAssignmentFormProps {
  ticketId: string;
  currentAssignee?: string;
  onAssignmentChanged: (assignee: string) => void;
}

const TicketAssignmentForm = ({ ticketId, currentAssignee, onAssignmentChanged }: TicketAssignmentFormProps) => {
  const [selectedUser, setSelectedUser] = useState<string>(currentAssignee || "");
  const { toast } = useToast();
  const { data: supportUsers = [], isLoading } = useSupportUsers();

  const handleAssignTicket = async () => {
    const user = supportUsers.find(u => u.id.toString() === selectedUser);
    if (!user) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un utilisateur support",
        variant: "destructive"
      });
      return;
    }

    // 1. Créer une PrestationSupport
    const { error: insertError } = await supabase
        .from("PrestationSupport")
        .insert({
          IDIntervenant: user.id,
          IDTicketClient: parseInt(ticketId) // Convert string to number
        });

    if (insertError) {
      toast({
        title: "Erreur d'insertion",
        description: insertError.message,
        variant: "destructive"
      });
      return;
    }

    // 2. Mettre à jour le statut du ticket
    const { error: updateError } = await supabase
        .from("SupportClient")
        .update({
          StatutDemande: "en_cours"
        })
        .eq("IDTicketClient", parseInt(ticketId)); // Convert string to number

    if (updateError) {
      toast({
        title: "Erreur de mise à jour",
        description: updateError.message,
        variant: "destructive"
      });
      return;
    }

    onAssignmentChanged(`${user.prenom} ${user.nom}`);

    toast({
      title: "Ticket assigné",
      description: `Le ticket ${ticketId} a été assigné à ${user.prenom} ${user.nom}`,
    });
  };

  return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Assignation du ticket</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Assigner à un utilisateur support
            </label>
            <Select value={selectedUser} onValueChange={setSelectedUser}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un utilisateur support" />
              </SelectTrigger>
              <SelectContent>
                {supportUsers.map((user) => (
                    <SelectItem
                        key={user.id}
                        value={user.id.toString()}
                        disabled={!user.disponible}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{user.prenom} {user.nom}</span>
                        <div className="flex gap-2 ml-2">
                          {user.specialite && (
                              <Badge variant="outline" className="text-xs">
                                {user.specialite}
                              </Badge>
                          )}
                          <Badge
                              className={`text-xs ${user.disponible
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-red-100 text-red-700'
                              }`}
                          >
                            {user.disponible ? 'Disponible' : 'Occupé'}
                          </Badge>
                        </div>
                      </div>
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {currentAssignee && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Actuellement assigné à :</strong> {currentAssignee}
                </p>
              </div>
          )}

          <Button onClick={handleAssignTicket} className="w-full">
            <UserPlus className="h-4 w-4 mr-2" />
            Assigner le ticket
          </Button>
        </CardContent>
      </Card>
  );
};

export default TicketAssignmentForm;

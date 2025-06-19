
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import AddPrestationModal from "@/components/prestations/AddPrestationModal";
import AddForumSubjectModal from "@/components/forums/AddForumSubjectModal";
import AddGroupModal from "@/components/groups/AddGroupModal";
import AddTicketModal from "@/components/support/AddTicketModal";

const ManagementPage = () => {
  const [isPrestationModalOpen, setIsPrestationModalOpen] = useState(false);
  const [isForumModalOpen, setIsForumModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  const handleSuccess = () => {
    // Actualiser les données si nécessaire
    console.log("Élément créé avec succès");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Gestion des contenus</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Prestations</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setIsPrestationModalOpen(true)}
              className="w-full flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Ajouter une prestation
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sujets de forum</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setIsForumModalOpen(true)}
              className="w-full flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Ajouter un sujet
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Groupes</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setIsGroupModalOpen(true)}
              className="w-full flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Ajouter un groupe
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Support</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setIsTicketModalOpen(true)}
              className="w-full flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Créer un ticket
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <AddPrestationModal
        isOpen={isPrestationModalOpen}
        onClose={() => setIsPrestationModalOpen(false)}
        onSuccess={handleSuccess}
      />

      <AddForumSubjectModal
        isOpen={isForumModalOpen}
        onClose={() => setIsForumModalOpen(false)}
        onSuccess={handleSuccess}
      />

      <AddGroupModal
        isOpen={isGroupModalOpen}
        onClose={() => setIsGroupModalOpen(false)}
        onSuccess={handleSuccess}
      />

      <AddTicketModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default ManagementPage;

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
    console.log("Élément créé avec succès");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestion des contenus</h1>
        <p className="text-muted-foreground">
          Créez et gérez tous les éléments de la plateforme
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Plus className="h-5 w-5 text-blue-600" />
              Prestations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Créer une nouvelle prestation avec domaine et tarif
            </p>
            <Button 
              onClick={() => setIsPrestationModalOpen(true)}
              className="w-full"
            >
              Ajouter une prestation
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Plus className="h-5 w-5 text-green-600" />
              Sujets de forum
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Créer un nouveau sujet dans un forum existant
            </p>
            <Button 
              onClick={() => setIsForumModalOpen(true)}
              className="w-full"
            >
              Ajouter un sujet
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Plus className="h-5 w-5 text-purple-600" />
              Groupes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Créer un nouveau groupe avec un créateur
            </p>
            <Button 
              onClick={() => setIsGroupModalOpen(true)}
              className="w-full"
            >
              Ajouter un groupe
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Plus className="h-5 w-5 text-orange-600" />
              Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Créer un ticket support pour un client
            </p>
            <Button 
              onClick={() => setIsTicketModalOpen(true)}
              className="w-full"
            >
              Créer un ticket
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 mb-2">Informations importantes</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Les prestations peuvent être assignées à des domaines spécifiques</li>
          <li>• Les sujets de forum sont modérables selon les signalements</li>
          <li>• Les groupes permettent les discussions entre utilisateurs</li>
          <li>• Les tickets support peuvent être assignés à des agents spécialisés</li>
        </ul>
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

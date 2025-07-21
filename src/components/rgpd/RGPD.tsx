import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Check, Trash2, Plus, FileText, Cookie, Shield, AlertTriangle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  useDemandesRGPD, 
  useConsentementsCookies, 
  useDocumentsRGPD,
  useTraiterDemandeRGPD,
  useSupprimerDemandeRGPD,
  useSupprimerConsentement,
  useSupprimerDocumentRGPD,
  type DemandeRGPD,
  type ConsentementCookies
} from "@/hooks/useSupabaseRGPD";
import ProcessRequestModal from "./ProcessRequestModal";
import AddDemandeRGPDModal from "./AddDemandeRGPDModal";
import AddConsentementModal from "./AddConsentementModal";
import AddDocumentRGPDModal from "./AddDocumentRGPDModal";
import EditDemandeRGPDModal from "./EditDemandeRGPDModal";
import UserDetailsModal from "./UserDetailsModal";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

const RGPD = () => {
  const { toast } = useToast();
  
  // États des modales
  const [processModalOpen, setProcessModalOpen] = useState(false);
  const [addDemandeModalOpen, setAddDemandeModalOpen] = useState(false);
  const [addConsentementModalOpen, setAddConsentementModalOpen] = useState(false);
  const [addDocumentModalOpen, setAddDocumentModalOpen] = useState(false);
  const [editDemandeModalOpen, setEditDemandeModalOpen] = useState(false);
  const [userDetailsModalOpen, setUserDetailsModalOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  
  // États des éléments sélectionnés
  const [selectedRequest, setSelectedRequest] = useState<DemandeRGPD | null>(null);
  const [selectedConsent, setSelectedConsent] = useState<ConsentementCookies | null>(null);
  
  // État pour la suppression
  const [deleteAction, setDeleteAction] = useState<{
    type: 'demande' | 'consentement' | 'document';
    id: number;
    name: string;
  } | null>(null);

  // Hooks pour les données
  const { data: demandes = [], isLoading: demandesLoading, refetch: refetchDemandes } = useDemandesRGPD();
  const { data: consentements = [], isLoading: consentsLoading, refetch: refetchConsentements } = useConsentementsCookies();
  const { data: documents = [], isLoading: documentsLoading, refetch: refetchDocuments } = useDocumentsRGPD();

  // Hooks pour les mutations
  const traiterDemandeMutation = useTraiterDemandeRGPD();
  const supprimerDemandeMutation = useSupprimerDemandeRGPD();
  const supprimerConsentementMutation = useSupprimerConsentement();
  const supprimerDocumentMutation = useSupprimerDocumentRGPD();

  // Fonction pour traiter une demande
  const handleProcessRequest = async (requestId: number, status: string, response: string, traitePar: number) => {
    try {
      await traiterDemandeMutation.mutateAsync({
        demandeId: requestId,
        statut: status,
        traitePar: traitePar
      });
      
      refetchDemandes();
    } catch (error) {
      console.error("Erreur lors du traitement de la demande:", error);
      throw error;
    }
  };

  // Fonction pour supprimer une demande
  const handleDeleteRequest = (requestId: number, requestType: string) => {
    setDeleteAction({
      type: 'demande',
      id: requestId,
      name: `Demande #${requestId} (${requestType})`
    });
    setConfirmDeleteOpen(true);
  };

  const executeDeleteRequest = async (requestId: number) => {
    try {
      await supprimerDemandeMutation.mutateAsync(requestId);
      toast({
        title: "Demande supprimée",
        description: "La demande RGPD a été supprimée avec succès."
      });
      refetchDemandes();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la demande.",
        variant: "destructive"
      });
    }
  };

  // Fonction pour supprimer un consentement
  const handleDeleteConsent = (consentId: number, consentType: string) => {
    setDeleteAction({
      type: 'consentement',
      id: consentId,
      name: `Consentement #${consentId} (${consentType})`
    });
    setConfirmDeleteOpen(true);
  };

  const executeDeleteConsent = async (consentId: number) => {
    try {
      await supprimerConsentementMutation.mutateAsync(consentId);
      toast({
        title: "Consentement supprimé",
        description: "Le consentement a été supprimé avec succès."
      });
      refetchConsentements();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le consentement.",
        variant: "destructive"
      });
    }
  };

  // Fonction pour supprimer un document
  const handleDeleteDocument = (documentId: number, documentTitle: string) => {
    setDeleteAction({
      type: 'document',
      id: documentId,
      name: `Document #${documentId} (${documentTitle})`
    });
    setConfirmDeleteOpen(true);
  };

  const executeDeleteDocument = async (documentId: number) => {
    try {
      await supprimerDocumentMutation.mutateAsync(documentId);
      toast({
        title: "Document supprimé",
        description: "Le document RGPD a été supprimé avec succès."
      });
      refetchDocuments();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le document.",
        variant: "destructive"
      });
    }
  };

  // Fonction pour exécuter la suppression confirmée
  const executeConfirmedDelete = async () => {
    if (!deleteAction) return;

    switch (deleteAction.type) {
      case 'demande':
        await executeDeleteRequest(deleteAction.id);
        break;
      case 'consentement':
        await executeDeleteConsent(deleteAction.id);
        break;
      case 'document':
        await executeDeleteDocument(deleteAction.id);
        break;
    }
    
    setDeleteAction(null);
  };

  const getStatutBadgeColor = (statut: string) => {
    switch (statut) {
      case 'En attente': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'En cours': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Traité': return 'bg-green-100 text-green-700 border-green-200';
      case 'Rejeté': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (demandesLoading || consentsLoading || documentsLoading) {
    return <div className="p-6">Chargement...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Gestion RGPD</h2>
          <p className="text-slate-600 mt-1">Conformité et protection des données</p>
        </div>
      </div>

      {/* Statistiques RGPD */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">En attente</p>
                <p className="text-xl font-bold text-slate-800">
                  {demandes.filter(d => d.Statut === 'En attente').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Shield className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">En cours</p>
                <p className="text-xl font-bold text-slate-800">
                  {demandes.filter(d => d.Statut === 'En cours').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Traitées</p>
                <p className="text-xl font-bold text-slate-800">
                  {demandes.filter(d => d.Statut === 'Traité').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Total</p>
                <p className="text-xl font-bold text-slate-800">{demandes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Section Demandes RGPD */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Demandes RGPD ({demandes.length})
            </CardTitle>
            <Button onClick={() => setAddDemandeModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle demande
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-700">ID</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Utilisateur</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Date demande</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Échéance</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Statut</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {demandes.map((demande) => {
                  const fullName = `${demande.user_prenom || ''} ${demande.user_nom || ''}`.trim() || `Utilisateur ${demande.IDUtilisateurs}`;
                  
                  return (
                    <tr key={demande.IDDemandeRGPD} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 font-mono text-sm text-slate-600">#{demande.IDDemandeRGPD}</td>
                      <td className="py-4 px-4 font-medium text-slate-800">{fullName}</td>
                      <td className="py-4 px-4 text-slate-600">{demande.user_email}</td>
                      <td className="py-4 px-4 text-slate-600">{demande.TypeDemande}</td>
                      <td className="py-4 px-4 text-slate-600">
                        {new Date(demande.DateDemande).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="py-4 px-4 text-slate-600">
                        {demande.DateEcheance ? new Date(demande.DateEcheance).toLocaleDateString('fr-FR') : '-'}
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatutBadgeColor(demande.Statut)}>
                          {demande.Statut}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            title="Voir détails"
                            onClick={() => {
                              setSelectedRequest(demande);
                              setEditDemandeModalOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {demande.Statut !== 'Traité' && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              title="Traiter"
                              onClick={() => {
                                setSelectedRequest(demande);
                                setProcessModalOpen(true);
                              }}
                            >
                              <Check className="h-4 w-4 text-green-600" />
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            title="Supprimer"
                            onClick={() => handleDeleteRequest(demande.IDDemandeRGPD, demande.TypeDemande)}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {demandes.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                Aucune demande RGPD trouvée
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Section Consentements Cookies */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Cookie className="h-5 w-5 text-orange-600" />
              Consentements Cookies ({consentements.length})
            </CardTitle>
            <Button onClick={() => setAddConsentementModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nouveau consentement
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-700">ID</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Utilisateur</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Type de Cookie</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Statut</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Date de Consentement</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {consentements.map((consent) => {
                  const fullName = `${consent.user_prenom || ''} ${consent.user_nom || ''}`.trim() || `Utilisateur ${consent.IDUtilisateurs}`;
                  
                  return (
                    <tr key={consent.IDConsentement} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 font-mono text-sm text-slate-600">#{consent.IDConsentement}</td>
                      <td className="py-4 px-4 font-medium text-slate-800">{fullName}</td>
                      <td className="py-4 px-4 text-slate-600">{consent.TypeCookie}</td>
                      <td className="py-4 px-4">
                        <Badge className={consent.Statut ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}>
                          {consent.Statut ? 'Accepté' : 'Refusé'}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-slate-600">
                        {new Date(consent.DateConsentement).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            title="Voir détails utilisateur"
                            onClick={() => {
                              setSelectedConsent(consent);
                              setUserDetailsModalOpen(true);
                            }}
                          >
                            <Info className="h-4 w-4 text-blue-600" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            title="Supprimer"
                            onClick={() => handleDeleteConsent(consent.IDConsentement, consent.TypeCookie)}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {consentements.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                Aucun consentement trouvé
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Section Documents RGPD */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              Documents RGPD ({documents.length})
            </CardTitle>
            <Button onClick={() => setAddDocumentModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nouveau document
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-700">ID</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Titre</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Date de mise à jour</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.IDDocumentRGPD} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4 font-mono text-sm text-slate-600">#{doc.IDDocumentRGPD}</td>
                    <td className="py-4 px-4 text-slate-600">{doc.Titre}</td>
                    <td className="py-4 px-4 text-slate-600">{doc.TypeDoc}</td>
                    <td className="py-4 px-4 text-slate-600">
                      {new Date(doc.DateMiseAJour).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <a href={doc.URLFichier} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="sm" title="Voir le document">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </a>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          title="Supprimer"
                          onClick={() => handleDeleteDocument(doc.IDDocumentRGPD, doc.Titre)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {documents.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                Aucun document RGPD trouvé
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modales */}
      <ProcessRequestModal
        isOpen={processModalOpen}
        onClose={() => setProcessModalOpen(false)}
        request={selectedRequest}
        onProcessRequest={handleProcessRequest}
      />

      <AddDemandeRGPDModal
        isOpen={addDemandeModalOpen}
        onClose={() => setAddDemandeModalOpen(false)}
        onSuccess={() => {
          setAddDemandeModalOpen(false);
          refetchDemandes();
        }}
      />

      <AddConsentementModal
        isOpen={addConsentementModalOpen}
        onClose={() => setAddConsentementModalOpen(false)}
        onSuccess={() => {
          setAddConsentementModalOpen(false);
          refetchConsentements();
        }}
      />

      <AddDocumentRGPDModal
        isOpen={addDocumentModalOpen}
        onClose={() => setAddDocumentModalOpen(false)}
        onSuccess={() => {
          setAddDocumentModalOpen(false);
          refetchDocuments();
        }}
      />

      <EditDemandeRGPDModal
        isOpen={editDemandeModalOpen}
        onClose={() => setEditDemandeModalOpen(false)}
        demande={selectedRequest}
        onSuccess={() => {
          setEditDemandeModalOpen(false);
          refetchDemandes();
        }}
      />

      <UserDetailsModal
        isOpen={userDetailsModalOpen}
        onClose={() => setUserDetailsModalOpen(false)}
        consent={selectedConsent}
      />

      <ConfirmDeleteDialog
        isOpen={confirmDeleteOpen}
        onClose={() => {
          setConfirmDeleteOpen(false);
          setDeleteAction(null);
        }}
        onConfirm={executeConfirmedDelete}
        title="Confirmer la suppression"
        description="Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible."
        itemName={deleteAction?.name || ""}
      />
    </div>
  );
};

export default RGPD;

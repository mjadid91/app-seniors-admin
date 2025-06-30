
import { useState } from "react";
import { Shield, FileText, Users, AlertTriangle, CheckCircle, Clock, Search, Download, Plus, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ProcessRequestModal from "./ProcessRequestModal";
import AddDemandeRGPDModal from "./AddDemandeRGPDModal";
import EditDemandeRGPDModal from "./EditDemandeRGPDModal";
import AddConsentementModal from "./AddConsentementModal";
import AddDocumentRGPDModal from "./AddDocumentRGPDModal";
import { 
  useDemandesRGPD, 
  useConsentementsCookies, 
  useDocumentsRGPD,
  useTraiterDemandeRGPD,
  useSupprimerDemandeRGPD,
  useSupprimerConsentement,
  useSupprimerDocumentRGPD,
  type DemandeRGPD 
} from "@/hooks/useSupabaseRGPD";

const RGPD = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);
  const [isAddDemandeModalOpen, setIsAddDemandeModalOpen] = useState(false);
  const [isEditDemandeModalOpen, setIsEditDemandeModalOpen] = useState(false);
  const [isAddConsentementModalOpen, setIsAddConsentementModalOpen] = useState(false);
  const [isAddDocumentModalOpen, setIsAddDocumentModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<DemandeRGPD | null>(null);
  const { toast } = useToast();

  // Hooks pour récupérer les données
  const { data: demandesRGPD = [], isLoading: loadingDemandes, error: errorDemandes } = useDemandesRGPD();
  const { data: consentements = [], isLoading: loadingConsentements } = useConsentementsCookies();
  const { data: documents = [], isLoading: loadingDocuments } = useDocumentsRGPD();
  const traiterDemandeMutation = useTraiterDemandeRGPD();
  const supprimerDemandeMutation = useSupprimerDemandeRGPD();
  const supprimerConsentementMutation = useSupprimerConsentement();
  const supprimerDocumentMutation = useSupprimerDocumentRGPD();

  // Logging pour déboguer
  console.log("RGPD component - demandesRGPD:", demandesRGPD);
  console.log("RGPD component - loadingDemandes:", loadingDemandes);
  console.log("RGPD component - errorDemandes:", errorDemandes);

  // Calculer les statistiques des consentements
  const consentStats = {
    total: consentements.length,
    accepted: consentements.filter(c => c.Statut === true).length,
    refused: consentements.filter(c => c.Statut === false).length,
    pending: 0 // Les consentements sont soit acceptés soit refusés
  };

  // Statistiques par type de cookie
  const cookieStats = {
    essentiel: consentements.filter(c => c.TypeCookie === 'Essentiel').length,
    analytique: consentements.filter(c => c.TypeCookie === 'Analytique' && c.Statut).length,
    publicitaire: consentements.filter(c => c.TypeCookie === 'Publicitaire' && c.Statut).length,
  };

  const handleProcessRequest = (request: DemandeRGPD) => {
    setSelectedRequest(request);
    setIsProcessModalOpen(true);
  };

  const handleEditRequest = (request: DemandeRGPD) => {
    setSelectedRequest(request);
    setIsEditDemandeModalOpen(true);
  };

  const handleDeleteRequest = async (requestId: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette demande ?")) {
      try {
        await supprimerDemandeMutation.mutateAsync(requestId);
        toast({
          title: "Demande supprimée",
          description: "La demande RGPD a été supprimée avec succès"
        });
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de supprimer la demande",
          variant: "destructive"
        });
      }
    }
  };

  const handleDeleteConsentement = async (consentementId: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce consentement ?")) {
      try {
        await supprimerConsentementMutation.mutateAsync(consentementId);
        toast({
          title: "Consentement supprimé",
          description: "Le consentement a été supprimé avec succès"
        });
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de supprimer le consentement",
          variant: "destructive"
        });
      }
    }
  };

  const handleDeleteDocument = async (documentId: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce document ?")) {
      try {
        await supprimerDocumentMutation.mutateAsync(documentId);
        toast({
          title: "Document supprimé",
          description: "Le document a été supprimé avec succès"
        });
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de supprimer le document",
          variant: "destructive"
        });
      }
    }
  };

  const handleRequestProcess = async (requestId: number, status: string, response: string) => {
    try {
      await traiterDemandeMutation.mutateAsync({
        demandeId: requestId,
        statut: status,
        traitePar: 1 // TODO: Utiliser l'ID de l'utilisateur connecté
      });
      
      toast({
        title: "Demande traitée",
        description: "La demande RGPD a été mise à jour avec succès"
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de traiter la demande",
        variant: "destructive"
      });
    }
  };

  // Calculer le taux de conformité
  const conformiteRate = Math.min(98, 85 + (documents.length * 2)); // Simulation

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-800">Conformité RGPD</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="h-4 w-4 mr-2" />
          Rapport de conformité
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="border-b border-slate-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "overview"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              Vue d'ensemble
            </button>
            <button
              onClick={() => setActiveTab("requests")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "requests"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              Demandes d'accès
            </button>
            <button
              onClick={() => setActiveTab("consent")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "consent"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              Gestion des consentements
            </button>
            <button
              onClick={() => setActiveTab("policies")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "policies"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              Politiques
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold text-green-600">{conformiteRate}%</p>
                      <p className="text-sm text-green-700">Conformité générale</p>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Users className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{consentStats.total}</p>
                      <p className="text-sm text-blue-700">Consentements</p>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-8 w-8 text-yellow-600" />
                    <div>
                      <p className="text-2xl font-bold text-yellow-600">
                        {demandesRGPD.filter(d => d.Statut === 'En cours').length}
                      </p>
                      <p className="text-sm text-yellow-700">Demandes en cours</p>
                    </div>
                  </div>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                    <div>
                      <p className="text-2xl font-bold text-red-600">
                        {demandesRGPD.filter(d => {
                          const echeance = new Date(d.DateEcheance || '');
                          const today = new Date();
                          return echeance < today && d.Statut !== 'Traité';
                        }).length}
                      </p>
                      <p className="text-sm text-red-700">Alertes</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="border border-slate-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Statut de conformité</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Politique de confidentialité</span>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Cookies et traceurs</span>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Registre de traitement</span>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Analyse d'impact</span>
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    </div>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Actions récentes</h3>
                  <div className="space-y-3">
                    {documents.slice(0, 3).map((doc) => (
                      <div key={doc.IDDocumentRGPD} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{doc.Titre}</p>
                          <p className="text-xs text-slate-500">
                            Mis à jour le {new Date(doc.DateMiseAJour).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "requests" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Rechercher une demande..."
                      className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                    />
                  </div>
                  <Button variant="outline">Filtrer</Button>
                </div>
                <Button onClick={() => setIsAddDemandeModalOpen(true)} className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une demande
                </Button>
              </div>

              {loadingDemandes ? (
                <div className="text-center py-8">Chargement des demandes...</div>
              ) : errorDemandes ? (
                <div className="text-center py-8 text-red-600">
                  Erreur lors du chargement des demandes: {errorDemandes.message}
                </div>
              ) : demandesRGPD.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  Aucune demande RGPD trouvée
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Email Utilisateur</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Type de demande</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Date de demande</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Échéance</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Statut</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {demandesRGPD.map((demande) => (
                        <tr key={demande.IDDemandeRGPD} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-4 px-4">
                            <div>
                              <p className="font-medium text-slate-800">{demande.user_email}</p>
                              <p className="text-sm text-slate-500">ID: {demande.IDUtilisateurs}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4">{demande.TypeDemande}</td>
                          <td className="py-4 px-4">{new Date(demande.DateDemande).toLocaleDateString('fr-FR')}</td>
                          <td className="py-4 px-4">
                            {demande.DateEcheance ? new Date(demande.DateEcheance).toLocaleDateString('fr-FR') : 'Non définie'}
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              demande.Statut === 'Traité' 
                                ? 'bg-green-100 text-green-700' 
                                : demande.Statut === 'En cours'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {demande.Statut}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleProcessRequest(demande)}
                                disabled={demande.Statut === 'Traité'}
                              >
                                {demande.Statut === 'Traité' ? 'Traité' : 'Traiter'}
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleEditRequest(demande)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleDeleteRequest(demande.IDDemandeRGPD)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === "consent" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Gestion des consentements</h2>
                <Button onClick={() => setIsAddConsentementModalOpen(true)} className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un consentement
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white border border-slate-200 rounded-lg p-6">
                  <h3 className="font-semibold text-slate-800 mb-2">Total</h3>
                  <p className="text-3xl font-bold text-slate-600">{consentStats.total}</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-6">
                  <h3 className="font-semibold text-slate-800 mb-2">Acceptés</h3>
                  <p className="text-3xl font-bold text-green-600">{consentStats.accepted}</p>
                  <p className="text-sm text-slate-500">
                    {consentStats.total > 0 ? ((consentStats.accepted / consentStats.total) * 100).toFixed(1) : 0}%
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-6">
                  <h3 className="font-semibold text-slate-800 mb-2">Refusés</h3>
                  <p className="text-3xl font-bold text-red-600">{consentStats.refused}</p>
                  <p className="text-sm text-slate-500">
                    {consentStats.total > 0 ? ((consentStats.refused / consentStats.total) * 100).toFixed(1) : 0}%
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-6">
                  <h3 className="font-semibold text-slate-800 mb-2">En attente</h3>
                  <p className="text-3xl font-bold text-yellow-600">{consentStats.pending}</p>
                  <p className="text-sm text-slate-500">0%</p>
                </div>
              </div>

              {loadingConsentements ? (
                <div className="text-center py-8">Chargement des consentements...</div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-lg">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold">Liste des consentements</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left py-3 px-4 font-medium text-slate-600">ID Utilisateur</th>
                          <th className="text-left py-3 px-4 font-medium text-slate-600">Type de cookie</th>
                          <th className="text-left py-3 px-4 font-medium text-slate-600">Statut</th>
                          <th className="text-left py-3 px-4 font-medium text-slate-600">Date</th>
                          <th className="text-left py-3 px-4 font-medium text-slate-600">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {consentements.map((consentement) => (
                          <tr key={consentement.IDConsentement} className="border-b border-slate-100 hover:bg-slate-50">
                            <td className="py-3 px-4">{consentement.IDUtilisateurs}</td>
                            <td className="py-3 px-4">{consentement.TypeCookie}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                consentement.Statut 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {consentement.Statut ? 'Accepté' : 'Refusé'}
                              </span>
                            </td>
                            <td className="py-3 px-4">{new Date(consentement.DateConsentement).toLocaleDateString('fr-FR')}</td>
                            <td className="py-3 px-4">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleDeleteConsentement(consentement.IDConsentement)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "policies" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Documents légaux</h2>
                <Button onClick={() => setIsAddDocumentModalOpen(true)} className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un document
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Documents légaux</h3>
                  <div className="space-y-3">
                    {documents.map((doc) => (
                      <div key={doc.IDDocumentRGPD} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                        <div className="flex items-center gap-3 flex-1">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <div className="flex-1">
                            <span className="font-medium">{doc.Titre}</span>
                            <p className="text-xs text-slate-500">{doc.TypeDoc}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Modifier</Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDeleteDocument(doc.IDDocumentRGPD)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {documents.length === 0 && !loadingDocuments && (
                      <div className="text-center text-slate-500 py-4">
                        Aucun document disponible
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Registre des activités</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-slate-800">Gestion des utilisateurs</span>
                        <span className="text-xs text-slate-500">Actif</span>
                      </div>
                      <p className="text-sm text-slate-600">Traitement des données personnelles des utilisateurs</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-slate-800">Service de prestations</span>
                        <span className="text-xs text-slate-500">Actif</span>
                      </div>
                      <p className="text-sm text-slate-600">Données liées aux prestations et partenaires</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-slate-800">Support client</span>
                        <span className="text-xs text-slate-500">Actif</span>
                      </div>
                      <p className="text-sm text-slate-600">Communications et tickets de support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <ProcessRequestModal 
        isOpen={isProcessModalOpen}
        onClose={() => setIsProcessModalOpen(false)}
        request={selectedRequest}
        onProcessRequest={handleRequestProcess}
      />

      <AddDemandeRGPDModal 
        isOpen={isAddDemandeModalOpen}
        onClose={() => setIsAddDemandeModalOpen(false)}
      />

      <EditDemandeRGPDModal 
        isOpen={isEditDemandeModalOpen}
        onClose={() => setIsEditDemandeModalOpen(false)}
        demande={selectedRequest}
      />

      <AddConsentementModal 
        isOpen={isAddConsentementModalOpen}
        onClose={() => setIsAddConsentementModalOpen(false)}
      />

      <AddDocumentRGPDModal 
        isOpen={isAddDocumentModalOpen}
        onClose={() => setIsAddDocumentModalOpen(false)}
      />
    </div>
  );
};

export default RGPD;

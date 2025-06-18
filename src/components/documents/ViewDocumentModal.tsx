import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, User, Calendar, Mail, FolderOpen, FileCheck } from "lucide-react";
import { Document } from "./useDocuments";

interface ViewDocumentModalProps {
    isOpen: boolean;
    onClose: () => void;
    document: Document | null;
}

const ViewDocumentModal = ({ isOpen, onClose, document }: ViewDocumentModalProps) => {
    if (!document) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                        Détail du document : {document.name}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Info principale */}
                    <Card>
                        <CardContent className="p-4 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <FolderOpen className="h-5 w-5 text-slate-500" />
                                    <div>
                                        <p className="text-sm text-slate-600">Catégorie</p>
                                        <p className="font-medium text-slate-800">{document.category}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Calendar className="h-5 w-5 text-slate-500" />
                                    <div>
                                        <p className="text-sm text-slate-600">Date d'upload</p>
                                        <p className="font-medium text-slate-800">{new Date(document.uploadDate).toLocaleDateString("fr-FR")}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <FileCheck className="h-5 w-5 text-slate-500" />
                                    <div>
                                        <p className="text-sm text-slate-600">Taille</p>
                                        <p className="font-medium text-slate-800">{document.size}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <FileText className="h-5 w-5 text-slate-500" />
                                    <div>
                                        <p className="text-sm text-slate-600">Type</p>
                                        <p className="font-medium text-slate-800">{document.type}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-slate-600 mb-2">Statut</p>
                                <Badge className={
                                    document.status === "Publié"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                }>
                                    {document.status}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Info utilisateur */}
                    <Card>
                        <CardContent className="p-4 space-y-2">
                            <h4 className="font-semibold text-slate-800 mb-2">Informations sur l’expéditeur</h4>

                            <div className="flex items-center gap-3">
                                <User className="h-5 w-5 text-slate-500" />
                                <p className="text-slate-700">{document.postedBy}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-slate-500" />
                                <a href={`mailto:${document.postedEmail}`} className="text-slate-700">
                                    {document.postedEmail}
                                </a>
                            </div>

                        </CardContent>
                    </Card>

                    {/* Lien de fichier */}
                    <Card>
                        <CardContent className="p-4">
                            <h4 className="font-semibold text-slate-800 mb-2">Fichier</h4>
                            <a
                                href={document.fileUrl ?? "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                Ouvrir le fichier
                            </a>
                        </CardContent>
                    </Card>

                    {/* Bouton de fermeture */}
                    <div className="flex justify-end pt-4 border-t">
                        <Button variant="outline" onClick={onClose}>
                            Fermer
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ViewDocumentModal;

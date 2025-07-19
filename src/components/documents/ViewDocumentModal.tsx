
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, User, Calendar, Mail, FolderOpen, FileCheck } from "lucide-react";
import { Document } from "./useDocuments";
import { supabase } from "@/integrations/supabase/client";

interface ViewDocumentModalProps {
    isOpen: boolean;
    onClose: () => void;
    document: Document | null;
}

interface UserInfo {
    nom: string;
    prenom: string;
    email: string;
}

const ViewDocumentModal = ({ isOpen, onClose, document }: ViewDocumentModalProps) => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [loadingUser, setLoadingUser] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (!document?.id) return;
            
            setLoadingUser(true);
            try {
                // Récupérer les infos du document avec l'ID utilisateur
                const { data: docData, error: docError } = await supabase
                    .from("Document")
                    .select("IDUtilisateurs")
                    .eq("IDDocument", document.id)
                    .single();

                if (docError || !docData?.IDUtilisateurs) {
                    console.error("Erreur récupération document:", docError);
                    return;
                }

                // Récupérer les infos de l'utilisateur
                const { data: userData, error: userError } = await supabase
                    .from("Utilisateurs")
                    .select("Nom, Prenom, Email")
                    .eq("IDUtilisateurs", docData.IDUtilisateurs)
                    .single();

                if (userError) {
                    console.error("Erreur récupération utilisateur:", userError);
                    return;
                }

                setUserInfo({
                    nom: userData.Nom,
                    prenom: userData.Prenom,
                    email: userData.Email
                });
            } catch (error) {
                console.error("Erreur:", error);
            } finally {
                setLoadingUser(false);
            }
        };

        if (isOpen && document) {
            fetchUserInfo();
        }
    }, [isOpen, document]);

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
                            <h4 className="font-semibold text-slate-800 mb-3">Informations sur l'expéditeur</h4>

                            {loadingUser ? (
                                <p className="text-slate-500">Chargement des informations utilisateur...</p>
                            ) : userInfo ? (
                                <>
                                    <div className="flex items-center gap-3">
                                        <User className="h-5 w-5 text-slate-500" />
                                        <div>
                                            <p className="text-sm text-slate-600">Nom et prénom</p>
                                            <p className="font-medium text-slate-800">{userInfo.prenom} {userInfo.nom}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Mail className="h-5 w-5 text-slate-500" />
                                        <div>
                                            <p className="text-sm text-slate-600">Email</p>
                                            <a href={`mailto:${userInfo.email}`} className="text-blue-600 hover:underline">
                                                {userInfo.email}
                                            </a>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <p className="text-slate-500">Informations utilisateur non disponibles</p>
                            )}
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

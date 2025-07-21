import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ConsentementCookies } from "@/hooks/useSupabaseRGPD";

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  consent: ConsentementCookies | null;
}

const UserDetailsModal = ({ isOpen, onClose, consent }: UserDetailsModalProps) => {
  const { toast } = useToast();

  if (!consent) return null;

  const fullName = `${consent.user_prenom || ''} ${consent.user_nom || ''}`.trim() || `Utilisateur ${consent.IDUtilisateurs}`;

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copié !",
        description: `${type} copié dans le presse-papiers.`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de copier dans le presse-papiers.",
        variant: "destructive"
      });
    }
  };

  const openEmailClient = () => {
    if (consent.user_email && consent.user_email !== "Email non disponible") {
      window.location.href = `mailto:${consent.user_email}?subject=Contact depuis AppSeniors Admin - Consentement ${consent.IDConsentement}`;
    }
  };

  const openPhoneDialer = () => {
    if (consent.user_telephone && consent.user_telephone !== "Téléphone non disponible") {
      window.location.href = `tel:${consent.user_telephone}`;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            Détails de l'utilisateur
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Informations de base */}
          <div className="bg-slate-50 p-4 rounded-lg">
            <h4 className="font-medium text-slate-800 mb-3">Informations personnelles</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-slate-500" />
                  <span className="text-sm text-slate-600">Nom complet :</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-800">{fullName}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(fullName, "Nom")}
                    className="h-6 w-6 p-0"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-slate-500" />
                  <span className="text-sm text-slate-600">Email :</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-800 break-all">
                    {consent.user_email || "Non disponible"}
                  </span>
                  {consent.user_email && consent.user_email !== "Email non disponible" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(consent.user_email!, "Email")}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-slate-500" />
                  <span className="text-sm text-slate-600">Téléphone :</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-800">
                    {consent.user_telephone || "Non disponible"}
                  </span>
                  {consent.user_telephone && consent.user_telephone !== "Téléphone non disponible" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(consent.user_telephone!, "Téléphone")}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Informations du consentement */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-slate-800 mb-3">Détails du consentement</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">ID Consentement :</span>
                <span className="font-mono text-slate-800">#{consent.IDConsentement}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Type de cookie :</span>
                <span className="font-medium text-slate-800">{consent.TypeCookie}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Statut :</span>
                <span className={`font-medium ${consent.Statut ? 'text-green-700' : 'text-red-700'}`}>
                  {consent.Statut ? 'Accepté' : 'Refusé'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Date :</span>
                <span className="font-medium text-slate-800">
                  {new Date(consent.DateConsentement).toLocaleDateString('fr-FR')}
                </span>
              </div>
            </div>
          </div>

          {/* Actions de contact */}
          <div className="flex gap-3 pt-2">
            <Button 
              onClick={openEmailClient}
              disabled={!consent.user_email || consent.user_email === "Email non disponible"}
              className="flex-1"
              variant="outline"
            >
              <Mail className="h-4 w-4 mr-2" />
              Envoyer un email
            </Button>
            <Button 
              onClick={openPhoneDialer}
              disabled={!consent.user_telephone || consent.user_telephone === "Téléphone non disponible"}
              className="flex-1"
              variant="outline"
            >
              <Phone className="h-4 w-4 mr-2" />
              Appeler
            </Button>
          </div>

          <div className="flex justify-end pt-4">
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsModal;
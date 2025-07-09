
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Send, Paperclip, Upload, X } from "lucide-react";
import { useSupportReplies } from "@/hooks/useSupportReplies";
import { useSupportFileUpload } from "@/hooks/useSupportFileUpload";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

interface TicketReplyFormProps {
  ticketId: string;
  onReplySubmitted: () => void;
}

const TicketReplyForm = ({ ticketId, onReplySubmitted }: TicketReplyFormProps) => {
  const [reply, setReply] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();
  const { session } = useSupabaseAuth();
  
  const { addReply, isAddingReply } = useSupportReplies(ticketId);
  const { uploadFile, isUploading } = useSupportFileUpload();

  // Get current user ID from session - use ID 8 (Mohamed Jadid) as fallback since he's logged in
  const currentUserId = session?.user?.id ? parseInt(session.user.id) : 8;

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Vérifier la taille du fichier (limite à 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Fichier trop volumineux",
          description: "Le fichier ne peut pas dépasser 10MB",
          variant: "destructive"
        });
        return;
      }
      
      setSelectedFile(file);
      console.log("Fichier sélectionné:", file.name);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleSubmitReply = async () => {
    if (!reply.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir une réponse",
        variant: "destructive"
      });
      return;
    }

    try {
      let fileUrl: string | null = null;
      
      // Upload du fichier si présent
      if (selectedFile) {
        console.log("Upload du fichier en cours...");
        fileUrl = await uploadFile(selectedFile, ticketId);
        if (!fileUrl) {
          // L'erreur a déjà été gérée dans uploadFile
          return;
        }
      }

      // Ajouter la réponse
      addReply({
        content: reply,
        authorId: currentUserId,
        fileUrl
      });

      // Réinitialiser le formulaire
      setReply("");
      setSelectedFile(null);
      onReplySubmitted();
      
    } catch (error) {
      console.error("Erreur lors de l'envoi de la réponse:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer la réponse. Veuillez réessayer.",
        variant: "destructive"
      });
    }
  };

  const isSubmitting = isAddingReply || isUploading;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Répondre au ticket</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="reply" className="block text-sm font-medium text-slate-700 mb-2">
            Votre réponse
          </label>
          <Textarea
            id="reply"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Tapez votre réponse ici..."
            rows={4}
            className="resize-none"
            disabled={isSubmitting}
          />
        </div>

        {/* Section fichier joint */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Fichier joint (optionnel)
          </label>
          
          {selectedFile ? (
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border">
              <Paperclip className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-700 flex-1">{selectedFile.name}</span>
              <span className="text-xs text-gray-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveFile}
                disabled={isSubmitting}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="relative">
              <Input
                type="file"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                disabled={isSubmitting}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('file-upload')?.click()}
                disabled={isSubmitting}
              >
                <Upload className="h-4 w-4 mr-2" />
                Joindre un fichier
              </Button>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button 
            onClick={handleSubmitReply} 
            disabled={isSubmitting || !reply.trim()}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {isUploading ? "Upload en cours..." : "Envoi en cours..."}
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Envoyer la réponse
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketReplyForm;

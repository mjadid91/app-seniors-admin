import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import { User } from '../../stores/authStore';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {DialogDescription} from "@radix-ui/react-dialog";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onPasswordChanged?: () => void;
}

const ChangePasswordModal = ({ isOpen, onClose, user, onPasswordChanged }: ChangePasswordModalProps) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const resetForm = () => {
    setNewPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const validatePassword = () => {
    if (!newPassword) {
      setError('Le mot de passe est requis');
      return false;
    }
    if (newPassword.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!user) return;
    
    setError('');
    
    if (!validatePassword()) {
      return;
    }

    try {
      setIsLoading(true);
      
      const { error } = await supabase
        .from('Utilisateurs')
        .update({ MotDePasse: newPassword })
        .eq('IDUtilisateurs', parseInt(user.id));

      if (error) {
        console.error('Erreur lors de la mise à jour du mot de passe:', error);
        setError('Erreur lors de la mise à jour du mot de passe');
        return;
      }

      toast({
        title: 'Succès',
        description: `Le mot de passe de ${user.prenom} ${user.nom} a été mis à jour.`,
      });

      if (onPasswordChanged) {
        onPasswordChanged();
      }
      
      handleClose();
    } catch (err) {
      console.error('Erreur lors de la mise à jour du mot de passe:', err);
      setError('Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Changer le mot de passe</DialogTitle>
          <DialogDescription className="sr-only">Formulaire de modification du mot de passe.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newPassword">Nouveau mot de passe</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Saisissez le nouveau mot de passe"
                className="pr-10"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-app-text-light hover:text-app-text transition-colors duration-200"
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmez le nouveau mot de passe"
                className="pr-10"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-app-text-light hover:text-app-text transition-colors duration-200"
                disabled={isLoading}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-app-error/10 border border-app-error/20 rounded-lg text-app-error text-sm">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            Annuler
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !newPassword || !confirmPassword}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Mise à jour...
              </div>
            ) : (
              'Modifier le mot de passe'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordModal;
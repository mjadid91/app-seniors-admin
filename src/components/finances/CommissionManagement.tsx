
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trash2, Edit, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { usePermissions } from "@/hooks/usePermissions";

interface CommissionRate {
  TypeTransaction: string;
  Pourcentage: number;
}

const ALL_TRANSACTION_TYPES = [
  { value: "Activite", label: "Activité rémunérée" },
  { value: "Commande", label: "Commande" },
  { value: "PostMortem", label: "Service post-mortem" }
];

const CommissionManagement = () => {
  const [commissionRates, setCommissionRates] = useState<CommissionRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingRate, setEditingRate] = useState<CommissionRate | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ TypeTransaction: "", Pourcentage: 5.0 });
  const { hasPermission } = usePermissions();

  // Vérifier les permissions
  const canManageCommissions = hasPermission("MANAGE_FINANCES");

  const fetchCommissionRates = async () => {
    try {
      const { data, error } = await supabase
        .from("ParametresCommission")
        .select("*")
        .order("TypeTransaction");

      if (error) throw error;
      setCommissionRates(data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des taux de commission:", error);
      toast.error("Erreur lors du chargement des taux de commission");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommissionRates();
  }, []);

  // Calculer les types manquants
  const getMissingTypes = () => {
    const existingTypes = commissionRates.map(rate => rate.TypeTransaction);
    return ALL_TRANSACTION_TYPES.filter(type => !existingTypes.includes(type.value));
  };

  // Vérifier si tous les types sont définis
  const allTypesConfigured = commissionRates.length === ALL_TRANSACTION_TYPES.length;

  const handleSave = async () => {
    if (!formData.TypeTransaction || formData.Pourcentage < 0 || formData.Pourcentage > 100) {
      toast.error("Veuillez remplir tous les champs avec des valeurs valides");
      return;
    }

    // Vérifier les doublons pour l'ajout
    if (!editingRate && commissionRates.some(rate => rate.TypeTransaction === formData.TypeTransaction)) {
      toast.error("Un taux de commission existe déjà pour ce type de transaction");
      return;
    }

    try {
      if (editingRate) {
        // Update existing rate
        const { error } = await supabase
          .from("ParametresCommission")
          .update({ Pourcentage: formData.Pourcentage })
          .eq("TypeTransaction", editingRate.TypeTransaction);

        if (error) throw error;
        toast.success("Taux de commission mis à jour");
      } else {
        // Insert new rate
        const { error } = await supabase
          .from("ParametresCommission")
          .insert({
            TypeTransaction: formData.TypeTransaction,
            Pourcentage: formData.Pourcentage
          });

        if (error) throw error;
        toast.success("Nouveau taux de commission ajouté");
      }

      setIsDialogOpen(false);
      setEditingRate(null);
      setFormData({ TypeTransaction: "", Pourcentage: 5.0 });
      fetchCommissionRates();
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      toast.error("Erreur lors de la sauvegarde");
    }
  };

  const handleDelete = async (typeTransaction: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce taux de commission ?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from("ParametresCommission")
        .delete()
        .eq("TypeTransaction", typeTransaction);

      if (error) throw error;
      toast.success("Taux de commission supprimé");
      fetchCommissionRates();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast.error("Erreur lors de la suppression");
    }
  };

  const handleEdit = (rate: CommissionRate) => {
    setEditingRate(rate);
    setFormData({
      TypeTransaction: rate.TypeTransaction,
      Pourcentage: rate.Pourcentage
    });
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingRate(null);
    setFormData({ TypeTransaction: "", Pourcentage: 5.0 });
    setIsDialogOpen(true);
  };

  const getTypeLabel = (type: string) => {
    const typeInfo = ALL_TRANSACTION_TYPES.find(t => t.value === type);
    return typeInfo ? typeInfo.label : type;
  };

  if (loading) {
    return <div className="p-6">Chargement...</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Gestion des Taux de Commission</CardTitle>
        {canManageCommissions && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={handleAdd} 
                className="flex items-center gap-2"
                disabled={allTypesConfigured}
              >
                <Plus className="h-4 w-4" />
                {allTypesConfigured ? "Tous les types configurés" : "Ajouter un taux"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingRate ? "Modifier le taux de commission" : "Ajouter un taux de commission"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="typeTransaction">Type de Transaction</Label>
                  {editingRate ? (
                    <Input
                      id="typeTransaction"
                      value={getTypeLabel(formData.TypeTransaction)}
                      disabled
                      className="bg-gray-100"
                    />
                  ) : (
                    <Select
                      value={formData.TypeTransaction}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, TypeTransaction: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un type de transaction" />
                      </SelectTrigger>
                      <SelectContent>
                        {getMissingTypes().map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
                <div>
                  <Label htmlFor="pourcentage">Pourcentage (%)</Label>
                  <Input
                    id="pourcentage"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={formData.Pourcentage}
                    onChange={(e) => setFormData(prev => ({ ...prev, Pourcentage: parseFloat(e.target.value) }))}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleSave}>
                    Sauvegarder
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type de Transaction</TableHead>
              <TableHead className="text-right">Pourcentage</TableHead>
              {canManageCommissions && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {commissionRates.map((rate) => (
              <TableRow key={rate.TypeTransaction}>
                <TableCell className="font-medium">{getTypeLabel(rate.TypeTransaction)}</TableCell>
                <TableCell className="text-right">{rate.Pourcentage}%</TableCell>
                {canManageCommissions && (
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(rate)}
                        className="flex items-center gap-1"
                      >
                        <Edit className="h-3 w-3" />
                        Modifier
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(rate.TypeTransaction)}
                        className="flex items-center gap-1"
                      >
                        <Trash2 className="h-3 w-3" />
                        Supprimer
                      </Button>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {commissionRates.length === 0 && (
              <TableRow>
                <TableCell colSpan={canManageCommissions ? 3 : 2} className="text-center text-gray-500">
                  Aucun taux de commission configuré
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        {allTypesConfigured && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700">
              ✅ Tous les types de transaction éligibles aux commissions ont été configurés
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CommissionManagement;

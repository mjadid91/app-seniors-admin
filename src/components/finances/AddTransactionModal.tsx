// src/components/finances/AddTransactionModal.tsx

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import AddActivityRevenueForm from "./AddActivityRevenueForm";
import AddDonForm from "./AddDonForm"; // Tu devras créer ce composant
import {AddCommandeForm} from "./AddCommandeForm"; // Tu devras créer ce composant
import {AddCommissionForm} from "./AddCommissionForm"; // Tu devras créer ce composant
import {AddPostMortemForm} from "./AddPostMortemForm"; // Tu devras créer ce composant


interface AddTransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onTransactionAdded: () => void;
}

const AddTransactionModal = ({ isOpen, onClose, onTransactionAdded }: AddTransactionModalProps) => {
    const [selectedType, setSelectedType] = useState("");

    const handleClose = () => {
        setSelectedType("");
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ajouter une transaction</DialogTitle>
                </DialogHeader>

                {!selectedType && (
                    <div className="space-y-4">
                        <Label htmlFor="type">Type de transaction</Label>
                        <select
                            id="type"
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            <option value="">-- Sélectionner --</option>
                            <option value="activite">Activité rémunérée</option>
                            <option value="don">Don</option>
                            <option value="commande">Commande</option>
                            <option value="commission">Commission</option>
                            <option value="postmortem">Service post-mortem</option>
                        </select>
                    </div>
                )}

                {selectedType === "activite" && (
                    <AddActivityRevenueForm onClose={handleClose} onSuccess={onTransactionAdded} />
                )}

                {selectedType === "don" && (
                    <AddDonForm onClose={handleClose} onSuccess={onTransactionAdded} />
                )}

                {selectedType === "commande" && (
                    <AddCommandeForm onClose={handleClose} onSuccess={onTransactionAdded} />
                )}

                {selectedType === "commission" && (
                    <AddCommissionForm onClose={handleClose} onSuccess={onTransactionAdded} />
                )}

                {selectedType === "postmortem" && (
                    <AddPostMortemForm onClose={handleClose} onSuccess={onTransactionAdded} />
                )}

            </DialogContent>
        </Dialog>
    );
};

export default AddTransactionModal;

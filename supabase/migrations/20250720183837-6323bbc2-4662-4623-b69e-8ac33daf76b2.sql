-- Supprimer les triggers existants s'ils existent
DROP TRIGGER IF EXISTS trigger_commission_commande ON "Commande";
DROP TRIGGER IF EXISTS trigger_commission_activite ON "ActiviteRemuneree_Utilisateurs";
DROP TRIGGER IF EXISTS trigger_commission_postmortem ON "ServicePostMortem";
DROP TRIGGER IF EXISTS trigger_update_cagnotte_montant ON "DonCagnotte";
DROP TRIGGER IF EXISTS trigger_update_cagnotte_status ON "DonCagnotte";
DROP TRIGGER IF EXISTS trigger_set_initial_cagnotte_status ON "CagnotteDeces";

-- Créer les triggers pour automatiser les calculs de commissions

-- Trigger pour les commandes
CREATE TRIGGER trigger_commission_commande
    AFTER INSERT ON "Commande"
    FOR EACH ROW
    EXECUTE FUNCTION create_commission_from_commande();

-- Trigger pour les activités rémunérées
CREATE TRIGGER trigger_commission_activite
    AFTER INSERT ON "ActiviteRemuneree_Utilisateurs"
    FOR EACH ROW
    EXECUTE FUNCTION create_commission_from_activite();

-- Trigger pour les services post-mortem
CREATE TRIGGER trigger_commission_postmortem
    AFTER INSERT ON "ServicePostMortem"
    FOR EACH ROW
    EXECUTE FUNCTION create_commission_from_postmortem();

-- Trigger pour mettre à jour le montant total des cagnottes lors d'un don
CREATE OR REPLACE FUNCTION update_cagnotte_montant_total()
RETURNS TRIGGER AS $$
BEGIN
    -- Ajouter le montant du don au total de la cagnotte
    UPDATE "CagnotteDeces"
    SET "MontantTotal" = "MontantTotal" + NEW."Montant"
    WHERE "IDCagnotteDeces" = NEW."IDCagnotteDeces";
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_cagnotte_montant
    AFTER INSERT ON "DonCagnotte"
    FOR EACH ROW
    EXECUTE FUNCTION update_cagnotte_montant_total();

-- Trigger pour mettre à jour le statut des cagnottes lors d'un don
CREATE TRIGGER trigger_update_cagnotte_status
    AFTER INSERT ON "DonCagnotte"
    FOR EACH ROW
    EXECUTE FUNCTION update_cagnotte_status();

-- Trigger pour définir le statut initial des cagnottes
CREATE TRIGGER trigger_set_initial_cagnotte_status
    BEFORE INSERT ON "CagnotteDeces"
    FOR EACH ROW
    EXECUTE FUNCTION set_initial_cagnotte_status();
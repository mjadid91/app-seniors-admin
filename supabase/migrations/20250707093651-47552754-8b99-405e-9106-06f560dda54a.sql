
-- Fonction pour mettre à jour automatiquement le statut des cagnottes
CREATE OR REPLACE FUNCTION update_cagnotte_status()
RETURNS TRIGGER AS $$
BEGIN
    -- Mettre à jour le statut en "en cours" quand un don est ajouté
    IF TG_OP = 'INSERT' THEN
        UPDATE "CagnotteDeces"
        SET "Statut" = 'en cours'
        WHERE "IDCagnotteDeces" = NEW."IDCagnotteDeces"
        AND "Statut" = 'ouverte';
        
        RETURN NEW;
    END IF;
    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour le statut lors d'un nouveau don
CREATE TRIGGER trigger_update_cagnotte_status_on_don
    AFTER INSERT ON "DonCagnotte"
    FOR EACH ROW
    EXECUTE FUNCTION update_cagnotte_status();

-- Fonction pour mettre à jour les statuts expirés (à exécuter périodiquement)
CREATE OR REPLACE FUNCTION update_expired_cagnottes()
RETURNS void AS $$
BEGIN
    UPDATE "CagnotteDeces"
    SET "Statut" = 'terminée'
    WHERE "DateCloture" < CURRENT_DATE
    AND "Statut" IN ('ouverte', 'en cours');
END;
$$ LANGUAGE plpgsql;

-- Fonction pour définir le statut initial lors de la création d'une cagnotte
CREATE OR REPLACE FUNCTION set_initial_cagnotte_status()
RETURNS TRIGGER AS $$
BEGIN
    -- S'assurer que le statut initial est "ouverte"
    IF NEW."Statut" IS NULL OR NEW."Statut" = '' THEN
        NEW."Statut" = 'ouverte';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour définir le statut initial
CREATE TRIGGER trigger_set_initial_cagnotte_status
    BEFORE INSERT ON "CagnotteDeces"
    FOR EACH ROW
    EXECUTE FUNCTION set_initial_cagnotte_status();

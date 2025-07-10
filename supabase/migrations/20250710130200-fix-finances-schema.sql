
-- Create ServicePostMortem table if it doesn't exist
CREATE TABLE IF NOT EXISTS "ServicePostMortem" (
    "IDServicePostMortem" BIGSERIAL PRIMARY KEY,
    "NomService" VARCHAR NOT NULL,
    "Description" VARCHAR NOT NULL,
    "MontantPrestation" NUMERIC NOT NULL DEFAULT 0,
    "DateService" DATE NOT NULL,
    "StatutService" VARCHAR NOT NULL DEFAULT 'En attente',
    "Prestataire" VARCHAR NOT NULL
);

-- Add missing columns to VersementCommissions table
ALTER TABLE "VersementCommissions" 
ADD COLUMN IF NOT EXISTS "IDCommande" BIGINT,
ADD COLUMN IF NOT EXISTS "IDActiviteRemuneree" BIGINT,
ADD COLUMN IF NOT EXISTS "IDServicePostMortem" BIGINT,
ADD COLUMN IF NOT EXISTS "IDDonCagnotte" BIGINT,
ADD COLUMN IF NOT EXISTS "TypeTransaction" VARCHAR,
ADD COLUMN IF NOT EXISTS "PourcentageCommission" NUMERIC DEFAULT 5.0;

-- Remove unique constraint on MoyenPaiement.MoyenPaiement if it exists
ALTER TABLE "MoyenPaiement" DROP CONSTRAINT IF EXISTS "MoyenPaiement_MoyenPaiement_key";

-- Fix the trigger function for ServicePostMortem
CREATE OR REPLACE FUNCTION create_commission_from_postmortem()
RETURNS TRIGGER AS $$
DECLARE
    commission_percentage NUMERIC;
    commission_amount NUMERIC;
BEGIN
    -- Récupérer le pourcentage de commission depuis ParametresCommission
    SELECT "Pourcentage" INTO commission_percentage
    FROM "ParametresCommission"
    WHERE "TypeTransaction" = 'PostMortem';
    
    -- Si aucun pourcentage n'est trouvé, utiliser 5% par défaut
    IF commission_percentage IS NULL THEN
        commission_percentage := 5.0;
    END IF;
    
    -- Calculer le montant de la commission
    commission_amount := NEW."MontantPrestation" * (commission_percentage / 100);
    
    -- Insérer la commission dans VersementCommissions
    INSERT INTO "VersementCommissions" (
        "MontantCommission",
        "DateVersement",
        "MoyenVersement",
        "TypeTransaction",
        "PourcentageCommission",
        "IDServicePostMortem"
    ) VALUES (
        commission_amount,
        CURRENT_DATE,
        'Plateforme interne',
        'PostMortem',
        commission_percentage,
        NEW."IDServicePostMortem"
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate the trigger for ServicePostMortem
DROP TRIGGER IF EXISTS trigger_commission_postmortem ON "ServicePostMortem";
CREATE TRIGGER trigger_commission_postmortem
    AFTER INSERT ON "ServicePostMortem"
    FOR EACH ROW
    EXECUTE FUNCTION create_commission_from_postmortem();


-- Fonction pour créer automatiquement les commissions depuis les commandes
CREATE OR REPLACE FUNCTION create_commission_from_commande()
RETURNS TRIGGER AS $$
DECLARE
    commission_percentage NUMERIC;
    commission_amount NUMERIC;
BEGIN
    -- Récupérer le pourcentage de commission depuis ParametresCommission
    SELECT "Pourcentage" INTO commission_percentage
    FROM "ParametresCommission"
    WHERE "TypeTransaction" = 'Commande';
    
    -- Si aucun pourcentage n'est trouvé, utiliser 5% par défaut
    IF commission_percentage IS NULL THEN
        commission_percentage := 5.0;
    END IF;
    
    -- Calculer le montant de la commission
    commission_amount := NEW."MontantTotal" * (commission_percentage / 100);
    
    -- Insérer la commission dans VersementCommissions
    INSERT INTO "VersementCommissions" (
        "MontantCommission",
        "DateVersement",
        "MoyenVersement",
        "TypeTransaction",
        "PourcentageCommission",
        "IDCommande"
    ) VALUES (
        commission_amount,
        CURRENT_DATE,
        'Plateforme interne',
        'Commande',
        commission_percentage,
        NEW."IDCommande"
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour créer automatiquement les commissions depuis les activités rémunérées
CREATE OR REPLACE FUNCTION create_commission_from_activite()
RETURNS TRIGGER AS $$
DECLARE
    commission_percentage NUMERIC;
    commission_amount NUMERIC;
BEGIN
    -- Récupérer le pourcentage de commission depuis ParametresCommission
    SELECT "Pourcentage" INTO commission_percentage
    FROM "ParametresCommission"
    WHERE "TypeTransaction" = 'Activite';
    
    -- Si aucun pourcentage n'est trouvé, utiliser 5% par défaut
    IF commission_percentage IS NULL THEN
        commission_percentage := 5.0;
    END IF;
    
    -- Calculer le montant de la commission
    commission_amount := NEW."MontantRevenu" * (commission_percentage / 100);
    
    -- Insérer la commission dans VersementCommissions
    INSERT INTO "VersementCommissions" (
        "MontantCommission",
        "DateVersement",
        "MoyenVersement",
        "TypeTransaction",
        "PourcentageCommission",
        "IDActiviteRemuneree"
    ) VALUES (
        commission_amount,
        CURRENT_DATE,
        'Plateforme interne',
        'Activite',
        commission_percentage,
        NEW."IDActiviteRemuneree"
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour créer automatiquement les commissions depuis les services post-mortem
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

-- Créer les triggers
CREATE TRIGGER trigger_commission_commande
    AFTER INSERT ON "Commande"
    FOR EACH ROW
    EXECUTE FUNCTION create_commission_from_commande();

CREATE TRIGGER trigger_commission_activite
    AFTER INSERT ON "ActiviteRemuneree_Utilisateurs"
    FOR EACH ROW
    EXECUTE FUNCTION create_commission_from_activite();

CREATE TRIGGER trigger_commission_postmortem
    AFTER INSERT ON "ServicePostMortem"
    FOR EACH ROW
    EXECUTE FUNCTION create_commission_from_postmortem();

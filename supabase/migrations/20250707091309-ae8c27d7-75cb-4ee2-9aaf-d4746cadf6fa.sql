
-- Supprimer le trigger et la fonction pour DonCagnotte
DROP TRIGGER IF EXISTS create_commission_after_doncagnotte ON "DonCagnotte";
DROP FUNCTION IF EXISTS create_commission_for_doncagnotte();

-- Vérifier que les autres triggers sont toujours en place
-- (Cette requête permet de confirmer les triggers existants)
SELECT 
    trigger_name, 
    event_object_table, 
    action_timing, 
    event_manipulation
FROM information_schema.triggers 
WHERE trigger_schema = 'public' 
AND trigger_name LIKE 'create_commission%'
ORDER BY trigger_name;

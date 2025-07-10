
-- Vérifier l'état des triggers existants
SELECT 
    trigger_name, 
    event_object_table, 
    action_timing, 
    event_manipulation,
    action_statement
FROM information_schema.triggers 
WHERE trigger_schema = 'public' 
AND trigger_name LIKE '%commission%'
ORDER BY trigger_name;

-- Vérifier tous les triggers sur les tables concernées
SELECT 
    t.trigger_name,
    t.event_object_table,
    t.action_timing,
    t.event_manipulation,
    t.action_statement
FROM information_schema.triggers t
WHERE t.trigger_schema = 'public'
AND t.event_object_table IN ('Commande', 'ActiviteRemuneree_Utilisateurs', 'ServicePostMortem', 'DonCagnotte')
ORDER BY t.event_object_table, t.trigger_name;

-- Vérifier l'existence des fonctions de commission
SELECT 
    routine_name,
    routine_definition
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name LIKE '%commission%'
ORDER BY routine_name;

-- Vérifier la structure des tables pour s'assurer que les colonnes existent
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name IN ('Commande', 'ActiviteRemuneree_Utilisateurs', 'ServicePostMortem', 'VersementCommissions')
AND column_name IN ('MontantTotal', 'MontantRevenu', 'MontantPrestation', 'IDCommande', 'IDActiviteRemuneree', 'IDServicePostMortem')
ORDER BY table_name, column_name;

-- Vérifier si la table ServicePostMortem existe
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'ServicePostMortem';

-- Re-créer les triggers manquants si nécessaire
-- Trigger pour les commandes
DROP TRIGGER IF EXISTS trigger_commission_commande ON "Commande";
CREATE TRIGGER trigger_commission_commande
    AFTER INSERT ON "Commande"
    FOR EACH ROW
    EXECUTE FUNCTION create_commission_from_commande();

-- Trigger pour les activités rémunérées
DROP TRIGGER IF EXISTS trigger_commission_activite ON "ActiviteRemuneree_Utilisateurs";
CREATE TRIGGER trigger_commission_activite
    AFTER INSERT ON "ActiviteRemuneree_Utilisateurs"
    FOR EACH ROW
    EXECUTE FUNCTION create_commission_from_activite();

-- Trigger pour les services post-mortem (si la table existe)
DROP TRIGGER IF EXISTS trigger_commission_postmortem ON "ServicePostMortem";
CREATE TRIGGER trigger_commission_postmortem
    AFTER INSERT ON "ServicePostMortem"
    FOR EACH ROW
    EXECUTE FUNCTION create_commission_from_postmortem();

-- Trigger pour les dons (si la fonction existe)
DROP TRIGGER IF EXISTS trigger_commission_don ON "DonCagnotte";
CREATE TRIGGER trigger_commission_don
    AFTER INSERT ON "DonCagnotte"
    FOR EACH ROW
    EXECUTE FUNCTION fn_insert_commission_from_doncagnotte();

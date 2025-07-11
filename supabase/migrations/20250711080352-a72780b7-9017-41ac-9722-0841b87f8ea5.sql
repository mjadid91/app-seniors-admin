
-- Corriger les problèmes dans la table VersementCommissions
-- Ajouter les colonnes manquantes et corriger les contraintes

-- Ajouter la colonne IDActiviteRemuneree si elle n'existe pas
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'VersementCommissions' 
                   AND column_name = 'IDActiviteRemuneree') THEN
        ALTER TABLE "VersementCommissions" ADD COLUMN "IDActiviteRemuneree" bigint;
    END IF;
END $$;

-- Ajouter la colonne IDDonCagnotte si elle n'existe pas
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'VersementCommissions' 
                   AND column_name = 'IDDonCagnotte') THEN
        ALTER TABLE "VersementCommissions" ADD COLUMN "IDDonCagnotte" bigint;
    END IF;
END $$;

-- Corriger la table ServicePostMortem pour avoir la bonne colonne
DO $$
BEGIN
    -- Vérifier si MontantPrestation existe, sinon l'ajouter
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'ServicePostMortem' 
                   AND column_name = 'MontantPrestation') THEN
        -- Si MontantUtilise existe, la renommer
        IF EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'ServicePostMortem' 
                   AND column_name = 'MontantUtilise') THEN
            ALTER TABLE "ServicePostMortem" RENAME COLUMN "MontantUtilise" TO "MontantPrestation";
        ELSE
            -- Sinon créer la colonne
            ALTER TABLE "ServicePostMortem" ADD COLUMN "MontantPrestation" numeric DEFAULT 0;
        END IF;
    END IF;
END $$;

-- Supprimer la contrainte unique sur MoyenPaiement pour éviter les doublons
ALTER TABLE "MoyenPaiement" DROP CONSTRAINT IF EXISTS "MoyenPaiement_MoyenPaiement_key";

-- Créer la table ServicePostMortem si elle n'existe pas
CREATE TABLE IF NOT EXISTS "ServicePostMortem" (
    "IDServicePostMortem" bigint PRIMARY KEY DEFAULT nextval('"ServicePostMortem_IDServicePostMortem_seq"'::regclass),
    "NomService" character varying NOT NULL DEFAULT '',
    "Description" character varying NOT NULL DEFAULT '',
    "MontantPrestation" numeric NOT NULL DEFAULT 0,
    "DateService" date NOT NULL DEFAULT CURRENT_DATE,
    "Prestataire" character varying NOT NULL DEFAULT '',
    "StatutService" character varying NOT NULL DEFAULT 'En attente'
);

-- Créer la séquence si elle n'existe pas
CREATE SEQUENCE IF NOT EXISTS "ServicePostMortem_IDServicePostMortem_seq";

-- S'assurer que les triggers sont correctement configurés
-- Supprimer les anciens triggers pour les recréer
DROP TRIGGER IF EXISTS trigger_commission_commande ON "Commande";
DROP TRIGGER IF EXISTS trigger_commission_activite ON "ActiviteRemuneree_Utilisateurs";
DROP TRIGGER IF EXISTS trigger_commission_postmortem ON "ServicePostMortem";
DROP TRIGGER IF EXISTS trigger_commission_don ON "DonCagnotte";

-- Recréer les triggers avec les bonnes fonctions
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

CREATE TRIGGER trigger_commission_don
    AFTER INSERT ON "DonCagnotte"
    FOR EACH ROW
    EXECUTE FUNCTION fn_insert_commission_from_doncagnotte();

-- Supprimer la contrainte de clé étrangère ajoutée par erreur
ALTER TABLE public."VersementCommissions" 
DROP CONSTRAINT IF EXISTS "VersementCommissions_IDDonCagnotte_fkey";

-- Supprimer la colonne IDDonCagnotte ajoutée par erreur
ALTER TABLE public."VersementCommissions" 
DROP COLUMN IF EXISTS "IDDonCagnotte";

-- Supprimer le trigger en premier (le nom correct est "trigger_commission_don")
DROP TRIGGER IF EXISTS trigger_commission_don ON public."DonCagnotte";

-- Supprimer ensuite la fonction
DROP FUNCTION IF EXISTS public.fn_insert_commission_from_doncagnotte();
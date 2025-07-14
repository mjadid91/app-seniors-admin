
-- Ajouter une colonne pour le contenu/description du sujet de forum
ALTER TABLE public."SujetForum" 
ADD COLUMN "ContenuSujet" TEXT;

-- Ajouter un commentaire pour documenter la colonne
COMMENT ON COLUMN public."SujetForum"."ContenuSujet" IS 'Contenu principal du sujet de forum';

-- Optionnel : Ajouter une valeur par défaut pour les sujets existants
UPDATE public."SujetForum" 
SET "ContenuSujet" = 'Contenu du sujet à définir' 
WHERE "ContenuSujet" IS NULL;

-- First, add the column as nullable
ALTER TABLE public."ServicePostMortem" 
ADD COLUMN "IDCreateur" bigint;

-- Update existing rows to have a valid IDCreateur (using the first admin user)
UPDATE public."ServicePostMortem" 
SET "IDCreateur" = (
    SELECT u."IDUtilisateurs" 
    FROM public."Utilisateurs" u
    JOIN public."CatUtilisateurs" c ON u."IDCatUtilisateurs" = c."IDCatUtilisateurs"
    WHERE c."EstAdministrateur" = true
    LIMIT 1
)
WHERE "IDCreateur" IS NULL;

-- Now make the column NOT NULL
ALTER TABLE public."ServicePostMortem" 
ALTER COLUMN "IDCreateur" SET NOT NULL;

-- Add the foreign key constraint
ALTER TABLE public."ServicePostMortem" 
ADD CONSTRAINT ServicePostMortem_IDCreateur_fkey 
FOREIGN KEY ("IDCreateur") REFERENCES public."Utilisateurs" ("IDUtilisateurs");
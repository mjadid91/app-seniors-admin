
-- Modifier la taille du champ URLDocument pour accepter des URLs plus longues
ALTER TABLE "DocumentPatrimonial" 
ALTER COLUMN "URLDocument" TYPE TEXT;

-- Ajouter également une colonne pour la date de création si elle n'existe pas
ALTER TABLE "DocumentPatrimonial" 
ADD COLUMN IF NOT EXISTS "dateCreation" TIMESTAMP WITH TIME ZONE DEFAULT NOW();

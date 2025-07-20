-- Safe migration to add IDCreateur column if it doesn't exist
DO $$
BEGIN
    -- Add the column only if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'ServicePostMortem' 
        AND column_name = 'IDCreateur'
    ) THEN
        ALTER TABLE public."ServicePostMortem" 
        ADD COLUMN "IDCreateur" bigint;
    END IF;
    
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
    
    -- Make the column NOT NULL if it's not already
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'ServicePostMortem' 
        AND column_name = 'IDCreateur'
        AND is_nullable = 'YES'
    ) THEN
        ALTER TABLE public."ServicePostMortem" 
        ALTER COLUMN "IDCreateur" SET NOT NULL;
    END IF;
    
    -- Add the foreign key constraint only if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_schema = 'public' 
        AND table_name = 'ServicePostMortem' 
        AND constraint_name = 'servicepostmortem_idcreateur_fkey'
    ) THEN
        ALTER TABLE public."ServicePostMortem" 
        ADD CONSTRAINT servicepostmortem_idcreateur_fkey 
        FOREIGN KEY ("IDCreateur") REFERENCES public."Utilisateurs" ("IDUtilisateurs");
    END IF;
END $$;
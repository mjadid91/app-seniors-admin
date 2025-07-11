
-- Add the missing IDServicePostMortem column to VersementCommissions table
ALTER TABLE "VersementCommissions" ADD COLUMN IF NOT EXISTS "IDServicePostMortem" bigint;

-- Add foreign key constraint to link it to ServicePostMortem table
ALTER TABLE "VersementCommissions" 
ADD CONSTRAINT IF NOT EXISTS "VersementCommissions_IDServicePostMortem_fkey" 
FOREIGN KEY ("IDServicePostMortem") REFERENCES "ServicePostMortem"("IDServicePostMortem");

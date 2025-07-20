-- Activer RLS sur la table CagnotteDeces
ALTER TABLE "CagnotteDeces" ENABLE ROW LEVEL SECURITY;

-- Politiques pour CagnotteDeces (accès public pour l'administration)
CREATE POLICY "Public can view CagnotteDeces" 
ON "CagnotteDeces" 
FOR SELECT 
USING (true);

CREATE POLICY "Public can insert CagnotteDeces" 
ON "CagnotteDeces" 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Public can update CagnotteDeces" 
ON "CagnotteDeces" 
FOR UPDATE 
USING (true);

CREATE POLICY "Public can delete CagnotteDeces" 
ON "CagnotteDeces" 
FOR DELETE 
USING (true);

-- Activer RLS sur la table DonCagnotte si pas déjà fait
ALTER TABLE "DonCagnotte" ENABLE ROW LEVEL SECURITY;

-- Politiques pour DonCagnotte (accès public pour l'administration)
CREATE POLICY "Public can view DonCagnotte" 
ON "DonCagnotte" 
FOR SELECT 
USING (true);

CREATE POLICY "Public can insert DonCagnotte" 
ON "DonCagnotte" 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Public can update DonCagnotte" 
ON "DonCagnotte" 
FOR UPDATE 
USING (true);

CREATE POLICY "Public can delete DonCagnotte" 
ON "DonCagnotte" 
FOR DELETE 
USING (true);
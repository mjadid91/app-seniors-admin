
-- Ajouter la colonne StatutService manquante à la table ServicePostMortem
ALTER TABLE "ServicePostMortem" ADD COLUMN "StatutService" character varying(50) NOT NULL DEFAULT 'En attente';

-- Corriger le type de données pour MontantPrestation (devrait être numeric, pas varchar)
ALTER TABLE "ServicePostMortem" ALTER COLUMN "MontantPrestation" TYPE numeric USING "MontantPrestation"::numeric;

-- Corriger le type de données pour DateService (devrait être date, pas varchar)  
ALTER TABLE "ServicePostMortem" ALTER COLUMN "DateService" TYPE date USING "DateService"::date;

-- Supprimer la vue qui dépend de la colonne IDDonCagnotte
DROP VIEW IF EXISTS v_financestransactions;

-- Supprimer la colonne IDDonCagnotte de VersementCommissions
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'VersementCommissions' 
               AND column_name = 'IDDonCagnotte') THEN
        ALTER TABLE "VersementCommissions" DROP COLUMN "IDDonCagnotte";
    END IF;
END $$;

-- Recréer la vue v_financestransactions avec la bonne structure
CREATE VIEW v_financestransactions AS
SELECT 
    'Commande' as type,
    c."IDCommande" as id,
    c."MontantTotal" as montant,
    c."DateCommande" as date,
    u."Nom" || ' ' || u."Prenom" as utilisateur_nom,
    vc."MontantCommission" as commission,
    vc."PourcentageCommission" as pourcentage_commission,
    'Confirmé' as statut
FROM "Commande" c
LEFT JOIN "Utilisateurs" u ON c."IDUtilisateurPayeur" = u."IDUtilisateurs"
LEFT JOIN "VersementCommissions" vc ON c."IDCommande" = vc."IDCommande"

UNION ALL

SELECT 
    'Activite' as type,
    ar."IDActiviteRemuneree" as id,
    ar."MontantRevenu" as montant,
    ar."DateTransaction" as date,
    u."Nom" || ' ' || u."Prenom" as utilisateur_nom,
    vc."MontantCommission" as commission,
    vc."PourcentageCommission" as pourcentage_commission,
    ar."StatutPaiement" as statut
FROM "ActiviteRemuneree_Utilisateurs" ar
LEFT JOIN "Utilisateurs" u ON ar."IDUtilisateurs" = u."IDUtilisateurs"
LEFT JOIN "VersementCommissions" vc ON ar."IDActiviteRemuneree" = vc."IDActiviteRemuneree"

UNION ALL

SELECT 
    'Don' as type,
    dc."IDDonCagnotte" as id,
    dc."Montant" as montant,
    dc."DateDon" as date,
    u."Nom" || ' ' || u."Prenom" as utilisateur_nom,
    0 as commission,
    0.0 as pourcentage_commission,
    'Confirmé' as statut
FROM "DonCagnotte" dc
LEFT JOIN "Utilisateurs" u ON dc."IDDonateur" = u."IDUtilisateurs"

UNION ALL

SELECT 
    'PostMortem' as type,
    sm."IDServicePostMortem" as id,
    sm."MontantPrestation" as montant,
    sm."DateService" as date,
    sm."Prestataire" as utilisateur_nom,
    vc."MontantCommission" as commission,
    vc."PourcentageCommission" as pourcentage_commission,
    sm."StatutService" as statut
FROM "ServicePostMortem" sm
LEFT JOIN "VersementCommissions" vc ON sm."IDServicePostMortem" = vc."IDServicePostMortem";
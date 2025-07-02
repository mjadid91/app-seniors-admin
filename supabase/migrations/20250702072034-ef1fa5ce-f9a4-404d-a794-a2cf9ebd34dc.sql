-- Créer une vue complète pour les transactions financières
CREATE OR REPLACE VIEW public.v_financestransactions AS
-- Transactions d'activités rémunérées
SELECT 
    ROW_NUMBER() OVER (ORDER BY ar_u.DateTransaction DESC) as id,
    ar_u.DateTransaction::date as date,
    'Activité rémunérée'::text as type,
    CONCAT(u.Prenom, ' ', u.Nom) as utilisateur,
    ar_u.IDUtilisateurs,
    ar_u.MontantRevenu as montant,
    ROUND(ar_u.MontantRevenu * 0.15, 2) as commission,
    ar_u.StatutPaiement as statut,
    'revenu'::text as categorie_couleur
FROM ActiviteRemuneree_Utilisateurs ar_u
JOIN Utilisateurs u ON ar_u.IDUtilisateurs = u.IDUtilisateurs

UNION ALL

-- Dons vers cagnottes
SELECT 
    ROW_NUMBER() OVER (ORDER BY dc.DateDon DESC) + 10000 as id,
    dc.DateDon::date as date,
    'Don cagnotte'::text as type,
    CONCAT(u.Prenom, ' ', u.Nom) as utilisateur,
    dc.IDDonateur,
    dc.Montant as montant,
    0 as commission,
    'Validé'::text as statut,
    'revenu'::text as categorie_couleur
FROM DonCagnotte dc
JOIN Utilisateurs u ON dc.IDDonateur = u.IDUtilisateurs

UNION ALL

-- Commandes
SELECT 
    ROW_NUMBER() OVER (ORDER BY c.DateCommande DESC) + 20000 as id,
    c.DateCommande::date as date,
    COALESCE(c.TypeCommande, 'Commande')::text as type,
    CONCAT(u.Prenom, ' ', u.Nom) as utilisateur,
    c.IDUtilisateurPayeur,
    c.MontantTotal as montant,
    ROUND(c.MontantTotal * 0.10, 2) as commission,
    c.StatutCommande as statut,
    CASE 
        WHEN c.StatutCommande = 'Validé' THEN 'revenu'::text
        ELSE 'commission'::text
    END as categorie_couleur
FROM Commande c
JOIN Utilisateurs u ON c.IDUtilisateurPayeur = u.IDUtilisateurs

UNION ALL

-- Versements de commissions
SELECT 
    ROW_NUMBER() OVER (ORDER BY vc.DateVersement DESC) + 30000 as id,
    vc.DateVersement::date as date,
    'Commission versée'::text as type,
    'AppSeniors Platform'::text as utilisateur,
    NULL as IDUtilisateurs,
    vc.MontantCommission as montant,
    0 as commission,
    'Validé'::text as statut,
    'commission'::text as categorie_couleur
FROM VersementCommissions vc

UNION ALL

-- Services post-mortem
SELECT 
    ROW_NUMBER() OVER (ORDER BY spm.DateService DESC) + 40000 as id,
    spm.DateService::date as date,
    'Service post-mortem'::text as type,
    spm.Prestataire as utilisateur,
    NULL as IDUtilisateurs,
    spm.MontantUtilise::numeric as montant,
    0 as commission,
    'Validé'::text as statut,
    'commission'::text as categorie_couleur
FROM ServicePostMortem spm

ORDER BY date DESC;
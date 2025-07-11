
-- Créer la vue pour les transactions financières
CREATE OR REPLACE VIEW public.v_financestransactions AS
SELECT
  aru."IDActiviteRemuneree" as id,
  'Activité rémunérée'::text as type,
  (u."Prenom"::text || ' '::text) || u."Nom"::text as utilisateur,
  aru."MontantRevenu" as montant,
  COALESCE(vc."MontantCommission", 0::numeric) as commission,
  aru."DateTransaction" as date,
  aru."StatutPaiement" as statut,
  'activite'::text as categorie_type,
  aru."IDActiviteRemuneree" as original_id,
  aru."IDUtilisateurs" as id_utilisateurs,
  null::bigint as id_commande,
  aru."IDActiviteRemuneree" as id_activite_remuneree,
  null::bigint as id_service_post_mortem,
  null::bigint as id_don_cagnotte
FROM
  "ActiviteRemuneree_Utilisateurs" aru
  JOIN "Utilisateurs" u ON aru."IDUtilisateurs" = u."IDUtilisateurs"
  LEFT JOIN "VersementCommissions" vc ON vc."IDActiviteRemuneree" = aru."IDActiviteRemuneree"

UNION

SELECT
  dc."IDDonCagnotte" as id,
  'Don'::text as type,
  (u."Prenom"::text || ' '::text) || u."Nom"::text as utilisateur,
  dc."Montant"::numeric as montant,
  COALESCE(vc."MontantCommission", 0::numeric) as commission,
  dc."DateDon" as date,
  'Validé'::character varying as statut,
  'don'::text as categorie_type,
  dc."IDDonCagnotte" as original_id,
  dc."IDDonateur" as id_utilisateurs,
  null::bigint as id_commande,
  null::bigint as id_activite_remuneree,
  null::bigint as id_service_post_mortem,
  dc."IDDonCagnotte" as id_don_cagnotte
FROM
  "DonCagnotte" dc
  JOIN "Utilisateurs" u ON dc."IDDonateur" = u."IDUtilisateurs"
  LEFT JOIN "VersementCommissions" vc ON vc."IDDonCagnotte" = dc."IDDonCagnotte"

UNION

SELECT
  c."IDCommande" as id,
  'Commande'::text as type,
  (u."Prenom"::text || ' '::text) || u."Nom"::text as utilisateur,
  c."MontantTotal" as montant,
  COALESCE(vc."MontantCommission", 0::numeric) as commission,
  c."DateCommande" as date,
  c."StatutCommande" as statut,
  'commande'::text as categorie_type,
  c."IDCommande" as original_id,
  c."IDUtilisateurPayeur" as id_utilisateurs,
  c."IDCommande" as id_commande,
  null::bigint as id_activite_remuneree,
  null::bigint as id_service_post_mortem,
  null::bigint as id_don_cagnotte
FROM
  "Commande" c
  JOIN "Utilisateurs" u ON c."IDUtilisateurPayeur" = u."IDUtilisateurs"
  LEFT JOIN "VersementCommissions" vc ON vc."IDCommande" = c."IDCommande"

UNION

SELECT
  spm."IDServicePostMortem" as id,
  'Service post-mortem'::text as type,
  spm."Prestataire" as utilisateur,
  spm."MontantPrestation"::numeric as montant,
  COALESCE(vc."MontantCommission", 0::numeric) as commission,
  spm."DateService"::date as date,
  spm."StatutService" as statut,
  'postmortem'::text as categorie_type,
  spm."IDServicePostMortem" as original_id,
  null::bigint as id_utilisateurs,
  null::bigint as id_commande,
  null::bigint as id_activite_remuneree,
  spm."IDServicePostMortem" as id_service_post_mortem,
  null::bigint as id_don_cagnotte
FROM
  "ServicePostMortem" spm
  LEFT JOIN "VersementCommissions" vc ON vc."IDServicePostMortem" = spm."IDServicePostMortem"

UNION

SELECT
  vc."IDVersementCommissions" + 100000 as id,
  'Commission versée'::text as type,
  'AppSeniors Platform'::text as utilisateur,
  vc."MontantCommission" as montant,
  vc."MontantCommission" as commission,
  vc."DateVersement" as date,
  'Validé'::character varying as statut,
  'commission'::text as categorie_type,
  vc."IDVersementCommissions" as original_id,
  null::bigint as id_utilisateurs,
  vc."IDCommande" as id_commande,
  vc."IDActiviteRemuneree" as id_activite_remuneree,
  vc."IDServicePostMortem" as id_service_post_mortem,
  vc."IDDonCagnotte" as id_don_cagnotte

FROM
  "VersementCommissions" vc

ORDER BY date DESC;

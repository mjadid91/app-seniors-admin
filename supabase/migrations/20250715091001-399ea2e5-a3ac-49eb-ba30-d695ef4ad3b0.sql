
-- Supprimer l'ancienne vue et créer la nouvelle avec le bon statut
DROP VIEW IF EXISTS public.prestations_dashboard_view;

CREATE VIEW public.prestations_dashboard_view AS
SELECT
  "Prestation"."IDPrestation" as id,
  "Prestation"."Titre" as type_prestation,
  "Prestation"."DateCreation" as date_creation,
  "MiseEnRelation"."TarifPreste" as tarif,
  "MiseEnRelation"."Statut" as statut,
  "Seniors"."IDSeniors",
  CONCAT("SeniorUser"."Prenom", ' ', "SeniorUser"."Nom") as senior_nom,
  "Aidant"."IDAidant",
  CONCAT("AidantUser"."Prenom", ' ', "AidantUser"."Nom") as aidant_nom,
  "Evaluation"."Note" as evaluation,
  "Evaluation"."Commentaire" as evaluation_commentaire,
  "Domaine"."IDDomaine",
  "Domaine"."DomaineTitre" as domaine_titre
FROM
  "MiseEnRelation"
  JOIN "Prestation" ON "MiseEnRelation"."IDPrestation" = "Prestation"."IDPrestation"
  JOIN "Seniors" ON "MiseEnRelation"."IDSeniors" = "Seniors"."IDSeniors"
  JOIN "Utilisateurs" "SeniorUser" ON "Seniors"."IDUtilisateurSenior" = "SeniorUser"."IDUtilisateurs"
  JOIN "Aidant" ON "MiseEnRelation"."IDAidant" = "Aidant"."IDAidant"
  JOIN "Utilisateurs" "AidantUser" ON "Aidant"."IDUtilisateurs" = "AidantUser"."IDUtilisateurs"
  LEFT JOIN "Evaluation" ON "Evaluation"."IDMiseEnRelation" = "MiseEnRelation"."IDMiseEnRelation"
  LEFT JOIN "Domaine" ON "Prestation"."IDDomaine" = "Domaine"."IDDomaine";

-- Créer une vue mise à jour qui montre toutes les prestations
CREATE OR REPLACE VIEW prestations_dashboard_view AS
SELECT 
    p."IDPrestation" AS id,
    p."Titre" AS type_prestation,
    p."DateCreation" AS date_creation,
    COALESCE(mr."TarifPreste", p."TarifIndicatif") AS tarif,
    COALESCE(mr."Statut", 'disponible') AS statut,
    s."IDSeniors",
    COALESCE(CONCAT(su."Prenom", ' ', su."Nom"), 'Non assigné') AS senior_nom,
    a."IDAidant",
    COALESCE(CONCAT(au."Prenom", ' ', au."Nom"), 'Non assigné') AS aidant_nom,
    e."Note" AS evaluation,
    e."Commentaire" AS evaluation_commentaire,
    d."IDDomaine",
    d."DomaineTitre" AS domaine_titre
FROM "Prestation" p
LEFT JOIN "MiseEnRelation" mr ON p."IDPrestation" = mr."IDPrestation"
LEFT JOIN "Seniors" s ON mr."IDSeniors" = s."IDSeniors"
LEFT JOIN "Utilisateurs" su ON s."IDUtilisateurSenior" = su."IDUtilisateurs"
LEFT JOIN "Aidant" a ON mr."IDAidant" = a."IDAidant"
LEFT JOIN "Utilisateurs" au ON a."IDUtilisateurs" = au."IDUtilisateurs"
LEFT JOIN "Evaluation" e ON e."IDMiseEnRelation" = mr."IDMiseEnRelation"
LEFT JOIN "Domaine" d ON p."IDDomaine" = d."IDDomaine";
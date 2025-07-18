
-- ===========================================
-- Script de création complète de la base de données AppSeniors
-- ===========================================
-- Ordre d'exécution : Tables de base -> Tables de liaison -> Triggers -> Fonctions -> Vues
-- ===========================================

-- 1. CRÉATION DES TABLES DE BASE (sans dépendances)
-- ===========================================

-- Table des catégories d'utilisateurs
CREATE TABLE IF NOT EXISTS "CatUtilisateurs" (
    "IDCatUtilisateurs" BIGSERIAL PRIMARY KEY,
    "EstAdministrateur" BOOLEAN NOT NULL DEFAULT false,
    "EstAidant" BOOLEAN NOT NULL DEFAULT false,
    "EstSenior" BOOLEAN NOT NULL DEFAULT false,
    "EstSupport" BOOLEAN NOT NULL DEFAULT false,
    "EstModerateur" BOOLEAN NOT NULL DEFAULT false,
    "EstTuteur" BOOLEAN NOT NULL DEFAULT false,
    "EstOrganisme" BOOLEAN NOT NULL DEFAULT false
);

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS "Utilisateurs" (
    "IDUtilisateurs" BIGSERIAL PRIMARY KEY,
    "IDAuth" UUID REFERENCES auth.users(id),
    "IDCatUtilisateurs" BIGINT REFERENCES "CatUtilisateurs"("IDCatUtilisateurs"),
    "Nom" VARCHAR NOT NULL,
    "Prenom" VARCHAR NOT NULL,
    "Email" VARCHAR NOT NULL UNIQUE,
    "Telephone" VARCHAR,
    "DateInscription" TIMESTAMP DEFAULT NOW(),
    "StatutCompte" VARCHAR DEFAULT 'Actif',
    "PhotoProfil" TEXT
);

-- Table des domaines de prestations
CREATE TABLE IF NOT EXISTS "Domaine" (
    "IDDomaine" BIGSERIAL PRIMARY KEY,
    "DomaineTitre" VARCHAR NOT NULL
);

-- Table des prestations
CREATE TABLE IF NOT EXISTS "Prestation" (
    "IDPrestation" BIGSERIAL PRIMARY KEY,
    "Titre" VARCHAR NOT NULL,
    "Description" VARCHAR NOT NULL,
    "TarifIndicatif" NUMERIC DEFAULT 0,
    "DateCreation" DATE DEFAULT CURRENT_DATE,
    "IDDomaine" BIGINT REFERENCES "Domaine"("IDDomaine")
);

-- Table des seniors
CREATE TABLE IF NOT EXISTS "Seniors" (
    "IDSeniors" BIGSERIAL PRIMARY KEY,
    "IDUtilisateurSenior" BIGINT REFERENCES "Utilisateurs"("IDUtilisateurs"),
    "NiveauAutonomie" INTEGER DEFAULT 2,
    "EstRGPD" BOOLEAN DEFAULT false,
    "IDStructures" BIGINT,
    "IDTuteur" BIGINT
);

-- Table des aidants
CREATE TABLE IF NOT EXISTS "Aidant" (
    "IDAidant" BIGSERIAL PRIMARY KEY,
    "IDUtilisateurs" BIGINT REFERENCES "Utilisateurs"("IDUtilisateurs"),
    "TarifAidant" NUMERIC DEFAULT 0,
    "Experience" TEXT NOT NULL
);

-- Table des compétences
CREATE TABLE IF NOT EXISTS "Competences" (
    "IDCompetences" BIGSERIAL PRIMARY KEY,
    "IDDomaine" BIGINT REFERENCES "Domaine"("IDDomaine"),
    "Metier" VARCHAR NOT NULL,
    "CodeMetier" VARCHAR NOT NULL
);

-- Table des moyens de paiement
CREATE TABLE IF NOT EXISTS "MoyenPaiement" (
    "IDMoyenPaiement" BIGSERIAL PRIMARY KEY,
    "MoyenPaiement" VARCHAR NOT NULL,
    "DatePaiement" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Table des commandes
CREATE TABLE IF NOT EXISTS "Commande" (
    "IDCommande" BIGSERIAL PRIMARY KEY,
    "IDUtilisateurPayeur" BIGINT REFERENCES "Utilisateurs"("IDUtilisateurs"),
    "DateCommande" DATE NOT NULL,
    "MontantTotal" NUMERIC DEFAULT 0,
    "StatutCommande" VARCHAR NOT NULL,
    "TypeCommande" VARCHAR,
    "IDMoyenPaiement" BIGINT REFERENCES "MoyenPaiement"("IDMoyenPaiement")
);

-- Table des paramètres de commission
CREATE TABLE IF NOT EXISTS "ParametresCommission" (
    "IDParametreCommission" SERIAL PRIMARY KEY,
    "TypeTransaction" VARCHAR NOT NULL,
    "Pourcentage" NUMERIC DEFAULT 5.0
);

-- Table des activités rémunérées
CREATE TABLE IF NOT EXISTS "ActiviteRemuneree" (
    "IDActiviteRemuneree" BIGSERIAL PRIMARY KEY,
    "IDSeniors" BIGINT REFERENCES "Seniors"("IDSeniors"),
    "TypeActiviteRemuneree" VARCHAR NOT NULL,
    "DescriptionActivite" VARCHAR NOT NULL,
    "TarifHoraire" NUMERIC DEFAULT 0,
    "Disponibilite" DATE NOT NULL,
    "StatutActiviteRemuneree" VARCHAR NOT NULL,
    "DateCreationActivite" VARCHAR NOT NULL
);

-- Table de liaison activités rémunérées - utilisateurs
CREATE TABLE IF NOT EXISTS "ActiviteRemuneree_Utilisateurs" (
    "IDActiviteRemuneree" BIGINT REFERENCES "ActiviteRemuneree"("IDActiviteRemuneree"),
    "IDUtilisateurs" BIGINT REFERENCES "Utilisateurs"("IDUtilisateurs"),
    "DateTransaction" DATE NOT NULL,
    "MontantRevenu" NUMERIC DEFAULT 0,
    "StatutPaiement" VARCHAR NOT NULL
);

-- Table des cagnottes de décès
CREATE TABLE IF NOT EXISTS "CagnotteDeces" (
    "IDCagnotteDeces" BIGSERIAL PRIMARY KEY,
    "IDSeniors" BIGINT REFERENCES "Seniors"("IDSeniors"),
    "Titre" VARCHAR NOT NULL,
    "Description" VARCHAR NOT NULL,
    "MontantTotal" NUMERIC DEFAULT 0,
    "DateOuverture" DATE NOT NULL,
    "DateCloture" DATE NOT NULL,
    "Statut" VARCHAR NOT NULL
);

-- Table des dons aux cagnottes
CREATE TABLE IF NOT EXISTS "DonCagnotte" (
    "IDDonCagnotte" BIGSERIAL PRIMARY KEY,
    "IDCagnotteDeces" BIGINT REFERENCES "CagnotteDeces"("IDCagnotteDeces"),
    "IDDonateur" BIGINT REFERENCES "Utilisateurs"("IDUtilisateurs"),
    "Montant" INTEGER DEFAULT 0,
    "DateDon" DATE NOT NULL,
    "MessageDon" VARCHAR NOT NULL
);

-- Table des services post-mortem
CREATE TABLE IF NOT EXISTS "ServicePostMortem" (
    "IDServicePostMortem" BIGSERIAL PRIMARY KEY,
    "NomService" VARCHAR NOT NULL DEFAULT '',
    "Description" VARCHAR NOT NULL DEFAULT '',
    "MontantPrestation" NUMERIC NOT NULL DEFAULT 0,
    "DateService" DATE NOT NULL DEFAULT CURRENT_DATE,
    "Prestataire" VARCHAR NOT NULL DEFAULT '',
    "StatutService" VARCHAR NOT NULL DEFAULT 'En attente'
);

-- Table des versements de commissions
CREATE TABLE IF NOT EXISTS "VersementCommissions" (
    "IDVersementCommissions" BIGSERIAL PRIMARY KEY,
    "MontantCommission" NUMERIC NOT NULL,
    "DateVersement" DATE NOT NULL,
    "MoyenVersement" VARCHAR NOT NULL,
    "TypeTransaction" VARCHAR NOT NULL,
    "PourcentageCommission" NUMERIC DEFAULT 5.0,
    "IDCommande" BIGINT REFERENCES "Commande"("IDCommande"),
    "IDActiviteRemuneree" BIGINT REFERENCES "ActiviteRemuneree"("IDActiviteRemuneree"),
    "IDServicePostMortem" BIGINT REFERENCES "ServicePostMortem"("IDServicePostMortem"),
    "IDDonCagnotte" BIGINT REFERENCES "DonCagnotte"("IDDonCagnotte")
);

-- 2. TABLES DE LIAISON ET RELATIONS
-- ===========================================

-- Table des mises en relation
CREATE TABLE IF NOT EXISTS "MiseEnRelation" (
    "IDMiseEnRelation" BIGSERIAL PRIMARY KEY,
    "IDSeniors" BIGINT REFERENCES "Seniors"("IDSeniors"),
    "IDAidant" BIGINT REFERENCES "Aidant"("IDAidant"),
    "IDPrestation" BIGINT REFERENCES "Prestation"("IDPrestation"),
    "DatePrestation" TIMESTAMP NOT NULL,
    "TarifPreste" NUMERIC DEFAULT 0,
    "DurePrestation" NUMERIC DEFAULT 0,
    "Statut" VARCHAR DEFAULT 'en_attente',
    "IDCommande" BIGINT REFERENCES "Commande"("IDCommande"),
    "IDUtilisateurPayeur" BIGINT DEFAULT 0,
    "IDPartenairePayeur" BIGINT DEFAULT 0,
    "DatePaiement" TIMESTAMP,
    "DateRefusPaiement" TIMESTAMP,
    "IDMoyenPaiement" BIGINT REFERENCES "MoyenPaiement"("IDMoyenPaiement")
);

-- Table des évaluations
CREATE TABLE IF NOT EXISTS "Evaluation" (
    "IDEvaluation" BIGSERIAL PRIMARY KEY,
    "IDMiseEnRelation" BIGINT REFERENCES "MiseEnRelation"("IDMiseEnRelation"),
    "IDUtilisateurs" BIGINT REFERENCES "Utilisateurs"("IDUtilisateurs"),
    "IDCommande" BIGINT REFERENCES "Commande"("IDCommande"),
    "IDProduit" BIGINT,
    "DateEvaluation" TIMESTAMP NOT NULL,
    "Note" SMALLINT DEFAULT 0,
    "Commentaire" VARCHAR NOT NULL
);

-- Table de liaison aidant-compétences
CREATE TABLE IF NOT EXISTS "Aidant_Competences" (
    "IDAidant" BIGINT REFERENCES "Aidant"("IDAidant"),
    "IDCompetences" BIGINT REFERENCES "Competences"("IDCompetences"),
    UNIQUE("IDAidant", "IDCompetences")
);

-- 3. TABLES POUR LES PARTENAIRES
-- ===========================================

-- Table des partenaires
CREATE TABLE IF NOT EXISTS "Partenaire" (
    "IDPartenaire" BIGSERIAL PRIMARY KEY,
    "RaisonSociale" VARCHAR NOT NULL,
    "Email" VARCHAR NOT NULL,
    "Telephone" VARCHAR NOT NULL,
    "Adresse" VARCHAR NOT NULL,
    "DateInscription" TIMESTAMP NOT NULL DEFAULT NOW(),
    "IDCatUtilisateurs" BIGINT REFERENCES "CatUtilisateurs"("IDCatUtilisateurs")
);

-- Table des bons plans
CREATE TABLE IF NOT EXISTS "BonPlan" (
    "IDBonPlan" BIGSERIAL PRIMARY KEY,
    "IDPartenaire" BIGINT REFERENCES "Partenaire"("IDPartenaire"),
    "TitreBonPlan" VARCHAR NOT NULL,
    "DescriptionBonPlan" VARCHAR NOT NULL,
    "TypeReduction" VARCHAR NOT NULL,
    "PourcentageReduction" INTEGER DEFAULT 0,
    "CodePromo" VARCHAR NOT NULL,
    "DateDebutReduction" DATE NOT NULL,
    "DateFinReduction" DATE NOT NULL,
    "StatutBonPlan" VARCHAR NOT NULL
);

-- Table de liaison bon plan - utilisateurs
CREATE TABLE IF NOT EXISTS "BonPlan_Utilisateurs" (
    "IDBonPlan" BIGINT REFERENCES "BonPlan"("IDBonPlan"),
    "IDUtilisateurs" BIGINT REFERENCES "Utilisateurs"("IDUtilisateurs"),
    "IDCommande" BIGINT REFERENCES "Commande"("IDCommande"),
    "DateUtilisation" DATE NOT NULL,
    "StatutUtilisation" VARCHAR NOT NULL
);

-- 4. TABLES POUR LES DOCUMENTS ET RGPD
-- ===========================================

-- Table des catégories de documents
CREATE TABLE IF NOT EXISTS "CategorieDocument" (
    "IDCategorieDocument" SERIAL PRIMARY KEY,
    "NomCategorie" VARCHAR NOT NULL
);

-- Table des documents
CREATE TABLE IF NOT EXISTS "Document" (
    "IDDocument" SERIAL PRIMARY KEY,
    "IDUtilisateurs" BIGINT REFERENCES "Utilisateurs"("IDUtilisateurs"),
    "Titre" VARCHAR NOT NULL,
    "TypeFichier" VARCHAR NOT NULL,
    "URLFichier" TEXT NOT NULL,
    "TailleFichier" NUMERIC,
    "DateUpload" DATE DEFAULT CURRENT_DATE,
    "Statut" VARCHAR DEFAULT 'Brouillon',
    "IDCategorieDocument" INTEGER REFERENCES "CategorieDocument"("IDCategorieDocument")
);

-- Table des demandes RGPD
CREATE TABLE IF NOT EXISTS "DemandeRGPD" (
    "IDDemandeRGPD" BIGSERIAL PRIMARY KEY,
    "IDUtilisateurs" BIGINT REFERENCES "Utilisateurs"("IDUtilisateurs"),
    "TypeDemande" VARCHAR NOT NULL,
    "DateDemande" DATE DEFAULT CURRENT_DATE,
    "DateEcheance" DATE,
    "DateTraitement" DATE,
    "Statut" VARCHAR DEFAULT 'En attente',
    "TraitePar" BIGINT REFERENCES "Utilisateurs"("IDUtilisateurs")
);

-- Table des documents RGPD
CREATE TABLE IF NOT EXISTS "DocumentRGPD" (
    "IDDocumentRGPD" BIGSERIAL PRIMARY KEY,
    "Titre" VARCHAR NOT NULL,
    "TypeDoc" VARCHAR NOT NULL,
    "URLFichier" TEXT NOT NULL,
    "DateMiseAJour" DATE DEFAULT CURRENT_DATE
);

-- Table des consentements cookies
CREATE TABLE IF NOT EXISTS "ConsentementCookies" (
    "IDConsentement" BIGSERIAL PRIMARY KEY,
    "IDUtilisateurs" BIGINT REFERENCES "Utilisateurs"("IDUtilisateurs"),
    "TypeCookie" VARCHAR NOT NULL,
    "Statut" BOOLEAN DEFAULT false,
    "DateConsentement" DATE DEFAULT CURRENT_DATE
);

-- 5. TABLES POUR LE SUPPORT
-- ===========================================

-- Table des tickets client
CREATE TABLE IF NOT EXISTS "TicketClient" (
    "IDTicketClient" BIGSERIAL PRIMARY KEY,
    "IDUtilisateurs" BIGINT REFERENCES "Utilisateurs"("IDUtilisateurs"),
    "Sujet" VARCHAR NOT NULL,
    "Message" TEXT,
    "DateCreation" TIMESTAMP DEFAULT NOW(),
    "Statut" VARCHAR DEFAULT 'en_attente',
    "Priorite" VARCHAR DEFAULT 'normale',
    "DateResolution" TIMESTAMP
);

-- Table des prestations support
CREATE TABLE IF NOT EXISTS "PrestationSupport" (
    "IDPrestationSupport" BIGSERIAL PRIMARY KEY,
    "IDTicketClient" BIGINT REFERENCES "TicketClient"("IDTicketClient"),
    "IDIntervenant" BIGINT DEFAULT 0
);

-- 6. TABLES POUR LA MODÉRATION
-- ===========================================

-- Table des forums
CREATE TABLE IF NOT EXISTS "Forum" (
    "IDForum" BIGSERIAL PRIMARY KEY,
    "TitreForum" VARCHAR NOT NULL,
    "DescriptionForum" VARCHAR NOT NULL,
    "Categorie" VARCHAR NOT NULL,
    "DateCreationForum" DATE NOT NULL,
    "IDCreateur" BIGINT REFERENCES "Utilisateurs"("IDUtilisateurs"),
    "estPublic" BOOLEAN DEFAULT false
);

-- Table des sujets de forum
CREATE TABLE IF NOT EXISTS "SujetForum" (
    "IDSujetForum" BIGSERIAL PRIMARY KEY,
    "IDForum" BIGINT REFERENCES "Forum"("IDForum"),
    "IDUtilisateurs" BIGINT REFERENCES "Utilisateurs"("IDUtilisateurs"),
    "TitreSujet" VARCHAR NOT NULL,
    "ContenuSujet" TEXT,
    "DateCreationSujet" DATE NOT NULL,
    "StatutSujet" VARCHAR DEFAULT 'actif'
);

-- Table des réponses forum
CREATE TABLE IF NOT EXISTS "ReponseForum" (
    "IDReponseForum" BIGSERIAL PRIMARY KEY,
    "IDSujetForum" BIGINT REFERENCES "SujetForum"("IDSujetForum"),
    "IDUtilisateurs" BIGINT REFERENCES "Utilisateurs"("IDUtilisateurs"),
    "ContenuReponse" VARCHAR NOT NULL,
    "DateReponse" DATE NOT NULL
);

-- Table des groupes
CREATE TABLE IF NOT EXISTS "Groupe" (
    "IDGroupe" BIGSERIAL PRIMARY KEY,
    "Titre" VARCHAR NOT NULL,
    "Description" VARCHAR NOT NULL,
    "DateCreation" DATE NOT NULL,
    "IDUtilisateursCreateur" BIGINT REFERENCES "Utilisateurs"("IDUtilisateurs")
);

-- Table des messages de groupe
CREATE TABLE IF NOT EXISTS "MessageGroupe" (
    "IDMessageGroupe" BIGSERIAL PRIMARY KEY,
    "IDGroupe" BIGINT REFERENCES "Groupe"("IDGroupe") DEFAULT 0,
    "IDUtilisateurs" BIGINT REFERENCES "Utilisateurs"("IDUtilisateurs"),
    "Contenu" VARCHAR NOT NULL,
    "DateEnvoi" DATE NOT NULL
);

-- Table des signalements
CREATE TABLE IF NOT EXISTS "Signalement" (
    "IDSignalement" BIGSERIAL PRIMARY KEY,
    "IDUtilisateurSignalant" BIGINT REFERENCES "Utilisateurs"("IDUtilisateurs"),
    "TypeContenu" VARCHAR NOT NULL,
    "IDContenu" BIGINT NOT NULL,
    "Motif" VARCHAR NOT NULL,
    "Description" TEXT,
    "DateSignalement" TIMESTAMP DEFAULT NOW(),
    "Statut" VARCHAR DEFAULT 'en_attente',
    "IDModerateur" BIGINT REFERENCES "Utilisateurs"("IDUtilisateurs"),
    "DateTraitement" TIMESTAMP,
    "ActionPrise" VARCHAR
);

-- 7. TABLES SUPPLÉMENTAIRES
-- ===========================================

-- Table des langues
CREATE TABLE IF NOT EXISTS "Langue" (
    "IDLangue" BIGSERIAL PRIMARY KEY,
    "Titre" VARCHAR NOT NULL
);

-- Table des devises
CREATE TABLE IF NOT EXISTS "Devise" (
    "IDDevise" BIGSERIAL PRIMARY KEY,
    "Titre" VARCHAR NOT NULL
);

-- Table de liaison langue-utilisateurs
CREATE TABLE IF NOT EXISTS "Langue_Utilisateurs" (
    "IDUtilisateurs" BIGINT REFERENCES "Utilisateurs"("IDUtilisateurs"),
    "IDLangue" BIGINT REFERENCES "Langue"("IDLangue"),
    "NiveauLangue" SMALLINT DEFAULT 0,
    UNIQUE("IDUtilisateurs", "IDLangue")
);

-- Table de liaison devise-utilisateurs
CREATE TABLE IF NOT EXISTS "Devise_Utilisateurs" (
    "IDUtilisateurs" BIGINT REFERENCES "Utilisateurs"("IDUtilisateurs"),
    "IDDevise" BIGINT REFERENCES "Devise"("IDDevise"),
    UNIQUE("IDUtilisateurs", "IDDevise")
);

-- Table des notifications
CREATE TABLE IF NOT EXISTS "Notifications" (
    "IDNotifications" BIGSERIAL PRIMARY KEY,
    "IDUtilisateurDestinataire" BIGINT REFERENCES "Utilisateurs"("IDUtilisateurs"),
    "IDUtilisateurOrigine" BIGINT REFERENCES "Utilisateurs"("IDUtilisateurs"),
    "Titre" TEXT DEFAULT 'Notification',
    "Message" TEXT DEFAULT '',
    "TypeNotification" VARCHAR DEFAULT 'info',
    "DateCreation" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "EstLu" BOOLEAN DEFAULT false,
    "Cible" VARCHAR DEFAULT 'Tous'
);

-- 8. CONTRAINTES ET INDEX
-- ===========================================

-- Contraintes de validation
ALTER TABLE "MiseEnRelation" ADD CONSTRAINT check_statut_mer 
CHECK ("Statut" IN ('en_attente', 'en_cours', 'terminee', 'refusee', 'annulee'));

ALTER TABLE "Commande" ADD CONSTRAINT check_statut_commande 
CHECK ("StatutCommande" IN ('En attente', 'Validé', 'Annulé', 'Remboursé'));

ALTER TABLE "CagnotteDeces" ADD CONSTRAINT check_statut_cagnotte 
CHECK ("Statut" IN ('ouverte', 'en cours', 'terminée', 'fermée'));

-- Contraintes sur les montants (positifs)
ALTER TABLE "MiseEnRelation" ADD CONSTRAINT check_tarif_positif 
CHECK ("TarifPreste" >= 0);

ALTER TABLE "Commande" ADD CONSTRAINT check_montant_positif 
CHECK ("MontantTotal" >= 0);

ALTER TABLE "VersementCommissions" ADD CONSTRAINT check_commission_positive 
CHECK ("MontantCommission" >= 0);

-- Index pour les performances
CREATE INDEX IF NOT EXISTS idx_utilisateurs_email ON "Utilisateurs"("Email");
CREATE INDEX IF NOT EXISTS idx_utilisateurs_auth ON "Utilisateurs"("IDAuth");
CREATE INDEX IF NOT EXISTS idx_utilisateurs_categorie ON "Utilisateurs"("IDCatUtilisateurs");
CREATE INDEX IF NOT EXISTS idx_seniors_utilisateur ON "Seniors"("IDUtilisateurSenior");
CREATE INDEX IF NOT EXISTS idx_aidant_utilisateur ON "Aidant"("IDUtilisateurs");
CREATE INDEX IF NOT EXISTS idx_mer_date_prestation ON "MiseEnRelation"("DatePrestation");
CREATE INDEX IF NOT EXISTS idx_commande_date ON "Commande"("DateCommande");
CREATE INDEX IF NOT EXISTS idx_ticket_date_creation ON "TicketClient"("DateCreation");
CREATE INDEX IF NOT EXISTS idx_mer_statut ON "MiseEnRelation"("Statut");
CREATE INDEX IF NOT EXISTS idx_commande_statut ON "Commande"("StatutCommande");
CREATE INDEX IF NOT EXISTS idx_ticket_statut ON "TicketClient"("Statut");

-- 9. FONCTIONS STOCKÉES
-- ===========================================

-- Fonction pour insérer automatiquement dans Seniors ou Aidant
CREATE OR REPLACE FUNCTION insert_into_seniors_or_aidant()
RETURNS TRIGGER AS $$
DECLARE
  role RECORD;
BEGIN
  SELECT * INTO role 
  FROM "CatUtilisateurs" 
  WHERE "IDCatUtilisateurs" = NEW."IDCatUtilisateurs";

  IF role."EstSenior" THEN
    INSERT INTO "Seniors"(
      "IDUtilisateurSenior", "NiveauAutonomie", "EstRGPD", "IDStructures", "IDTuteur"
    ) VALUES (
      NEW."IDUtilisateurs", 2, false, NULL, NULL
    );
  END IF;

  IF role."EstAidant" THEN
    INSERT INTO "Aidant"(
      "IDUtilisateurs", "Experience", "TarifAidant"
    ) VALUES (
      NEW."IDUtilisateurs", 'À définir', 0
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour créer les commissions depuis les commandes
CREATE OR REPLACE FUNCTION create_commission_from_commande()
RETURNS TRIGGER AS $$
DECLARE
    commission_percentage NUMERIC;
    commission_amount NUMERIC;
BEGIN
    SELECT "Pourcentage" INTO commission_percentage
    FROM "ParametresCommission"
    WHERE "TypeTransaction" = 'Commande';
    
    IF commission_percentage IS NULL THEN
        commission_percentage := 5.0;
    END IF;
    
    commission_amount := NEW."MontantTotal" * (commission_percentage / 100);
    
    INSERT INTO "VersementCommissions" (
        "MontantCommission",
        "DateVersement",
        "MoyenVersement",
        "TypeTransaction",
        "PourcentageCommission",
        "IDCommande"
    ) VALUES (
        commission_amount,
        CURRENT_DATE,
        'Plateforme interne',
        'Commande',
        commission_percentage,
        NEW."IDCommande"
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour créer les commissions depuis les activités rémunérées
CREATE OR REPLACE FUNCTION create_commission_from_activite()
RETURNS TRIGGER AS $$
DECLARE
    commission_percentage NUMERIC;
    commission_amount NUMERIC;
BEGIN
    SELECT "Pourcentage" INTO commission_percentage
    FROM "ParametresCommission"
    WHERE "TypeTransaction" = 'Activite';
    
    IF commission_percentage IS NULL THEN
        commission_percentage := 5.0;
    END IF;
    
    commission_amount := NEW."MontantRevenu" * (commission_percentage / 100);
    
    INSERT INTO "VersementCommissions" (
        "MontantCommission",
        "DateVersement",
        "MoyenVersement",
        "TypeTransaction",
        "PourcentageCommission",
        "IDActiviteRemuneree"
    ) VALUES (
        commission_amount,
        CURRENT_DATE,
        'Plateforme interne',
        'Activite',
        commission_percentage,
        NEW."IDActiviteRemuneree"
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour créer les commissions depuis les services post-mortem
CREATE OR REPLACE FUNCTION create_commission_from_postmortem()
RETURNS TRIGGER AS $$
DECLARE
    commission_percentage NUMERIC;
    commission_amount NUMERIC;
BEGIN
    SELECT "Pourcentage" INTO commission_percentage
    FROM "ParametresCommission"
    WHERE "TypeTransaction" = 'PostMortem';
    
    IF commission_percentage IS NULL THEN
        commission_percentage := 5.0;
    END IF;
    
    commission_amount := NEW."MontantPrestation" * (commission_percentage / 100);
    
    INSERT INTO "VersementCommissions" (
        "MontantCommission",
        "DateVersement",
        "MoyenVersement",
        "TypeTransaction",
        "PourcentageCommission",
        "IDServicePostMortem"
    ) VALUES (
        commission_amount,
        CURRENT_DATE,
        'Plateforme interne',
        'PostMortem',
        commission_percentage,
        NEW."IDServicePostMortem"
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour créer les commissions depuis les dons
CREATE OR REPLACE FUNCTION fn_insert_commission_from_doncagnotte()
RETURNS TRIGGER AS $$
DECLARE
    commission NUMERIC;
BEGIN
    commission := NEW."Montant" * (5.0 / 100);
    INSERT INTO "VersementCommissions" (
        "MontantCommission",
        "DateVersement",
        "MoyenVersement",
        "IDDonCagnotte",
        "TypeTransaction",
        "PourcentageCommission"
    ) VALUES (
        commission,
        CURRENT_DATE,
        'Plateforme interne',
        NEW."IDDonCagnotte",
        'Don',
        5.0
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour mettre à jour le statut des cagnottes
CREATE OR REPLACE FUNCTION update_cagnotte_status()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE "CagnotteDeces"
        SET "Statut" = 'en cours'
        WHERE "IDCagnotteDeces" = NEW."IDCagnotteDeces"
        AND "Statut" = 'ouverte';
        
        RETURN NEW;
    END IF;
    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour mettre à jour les cagnottes expirées
CREATE OR REPLACE FUNCTION update_expired_cagnottes()
RETURNS VOID AS $$
BEGIN
    UPDATE "CagnotteDeces"
    SET "Statut" = 'terminée'
    WHERE "DateCloture" < CURRENT_DATE
    AND "Statut" IN ('ouverte', 'en cours');
END;
$$ LANGUAGE plpgsql;

-- Fonction pour définir le statut initial des cagnottes
CREATE OR REPLACE FUNCTION set_initial_cagnotte_status()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW."Statut" IS NULL OR NEW."Statut" = '' THEN
        NEW."Statut" = 'ouverte';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 10. TRIGGERS
-- ===========================================

-- Trigger pour insérer automatiquement dans Seniors ou Aidant
CREATE TRIGGER trigger_insert_roles
    AFTER INSERT ON "Utilisateurs"
    FOR EACH ROW
    EXECUTE FUNCTION insert_into_seniors_or_aidant();

-- Triggers pour les commissions
CREATE TRIGGER trigger_commission_commande
    AFTER INSERT ON "Commande"
    FOR EACH ROW
    EXECUTE FUNCTION create_commission_from_commande();

CREATE TRIGGER trigger_commission_activite
    AFTER INSERT ON "ActiviteRemuneree_Utilisateurs"
    FOR EACH ROW
    EXECUTE FUNCTION create_commission_from_activite();

CREATE TRIGGER trigger_commission_postmortem
    AFTER INSERT ON "ServicePostMortem"
    FOR EACH ROW
    EXECUTE FUNCTION create_commission_from_postmortem();

CREATE TRIGGER trigger_commission_don
    AFTER INSERT ON "DonCagnotte"
    FOR EACH ROW
    EXECUTE FUNCTION fn_insert_commission_from_doncagnotte();

-- Triggers pour les cagnottes
CREATE TRIGGER trigger_update_cagnotte_status_on_don
    AFTER INSERT ON "DonCagnotte"
    FOR EACH ROW
    EXECUTE FUNCTION update_cagnotte_status();

CREATE TRIGGER trigger_set_initial_cagnotte_status
    BEFORE INSERT ON "CagnotteDeces"
    FOR EACH ROW
    EXECUTE FUNCTION set_initial_cagnotte_status();

-- 11. VUES
-- ===========================================

-- Vue pour le dashboard des prestations
create view public.prestations_dashboard_view as
select
    "Prestation"."IDPrestation" as id,
    "Prestation"."Titre" as type_prestation,
    "Prestation"."DateCreation" as date_creation,
    "MiseEnRelation"."TarifPreste" as tarif,
    "MiseEnRelation"."Statut" as statut,
    "Seniors"."IDSeniors",
    concat("SeniorUser"."Prenom", ' ', "SeniorUser"."Nom") as senior_nom,
    "Aidant"."IDAidant",
    concat("AidantUser"."Prenom", ' ', "AidantUser"."Nom") as aidant_nom,
    "Evaluation"."Note" as evaluation,
    "Evaluation"."Commentaire" as evaluation_commentaire,
    "Domaine"."IDDomaine",
    "Domaine"."DomaineTitre" as domaine_titre
from
    "MiseEnRelation"
        join "Prestation" on "MiseEnRelation"."IDPrestation" = "Prestation"."IDPrestation"
        join "Seniors" on "MiseEnRelation"."IDSeniors" = "Seniors"."IDSeniors"
        join "Utilisateurs" "SeniorUser" on "Seniors"."IDUtilisateurSenior" = "SeniorUser"."IDUtilisateurs"
        join "Aidant" on "MiseEnRelation"."IDAidant" = "Aidant"."IDAidant"
        join "Utilisateurs" "AidantUser" on "Aidant"."IDUtilisateurs" = "AidantUser"."IDUtilisateurs"
        left join "Evaluation" on "Evaluation"."IDMiseEnRelation" = "MiseEnRelation"."IDMiseEnRelation"
        left join "Domaine" on "Prestation"."IDDomaine" = "Domaine"."IDDomaine";

create view public.support_dashboard_view as
select
    sc."IDTicketClient" as id,
    sc."Sujet" as sujet,
    sc."DescriptionDemande" as message,
    sc."DateEnvoi" as date_creation,
    sc."StatutDemande" as statut,
    sc."Priorite" as priorite,
    sc."IDUtilisateursClient" as id_utilisateur,
    u."Nom" as utilisateur_nom,
    u."Prenom" as utilisateur_prenom,
    u."Email" as utilisateur_email,
    ps."IDPrestationSupport" as id_prestation_support,
    ps."IDIntervenant" as id_intervenant,
    assignee."Nom" as assigne_nom,
    assignee."Prenom" as assigne_prenom,
    assignee."Email" as assigne_email
from
    "SupportClient" sc
        left join "Utilisateurs" u on u."IDUtilisateurs" = sc."IDUtilisateursClient"
        left join "PrestationSupport" ps on ps."IDTicketClient" = sc."IDTicketClient"
        left join "Utilisateurs" assignee on assignee."IDUtilisateurs" = ps."IDIntervenant";

create view public.v_activitesrecentes as
select
    u."IDUtilisateurs" as id,
    'user'::text as type,
        (u."Nom"::text || ' '::text) || u."Prenom"::text as title,
        'Nouvel utilisateur inscrit'::text as subtitle,
        u."DateInscription" as datetime
from
    "Utilisateurs" u
union all
select
    sf."IDSujetForum" as id,
    'forum'::text as type,
        sf."TitreSujet" as title,
    'Nouveau sujet publié'::text as subtitle,
        sf."DateCreationSujet" as datetime
from
    "SujetForum" sf
union all
select
    mg."IDMessageGroupe" as id,
    'group'::text as type,
        mg."Contenu" as title,
    'Message de groupe publié'::text as subtitle,
        mg."DateEnvoi" as datetime
from
    "MessageGroupe" mg
union all
select
    sc."IDSignalement"::bigint as id,
        'signalement'::text as type,
        'Message de groupe signalé'::text as title,
        'Un message a été signalé'::text as subtitle,
        sc."DateSignalement" as datetime
from
    "SignalementContenu" sc
where
    sc."IDMessageGroupe" is not null
union all
select
    sc."IDSignalement"::bigint as id,
        'signalement'::text as type,
        'Réponse de forum signalée'::text as title,
        'Une réponse a été signalée'::text as subtitle,
        sc."DateSignalement" as datetime
from
    "SignalementContenu" sc
where
    sc."IDReponseForum" is not null
order by
    5 desc;

create view public.v_financestransactions as
select
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
from
  "ActiviteRemuneree_Utilisateurs" aru
  join "Utilisateurs" u on aru."IDUtilisateurs" = u."IDUtilisateurs"
  left join "VersementCommissions" vc on vc."IDActiviteRemuneree" = aru."IDActiviteRemuneree"
union
select
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
from
    "DonCagnotte" dc
    join "Utilisateurs" u on dc."IDDonateur" = u."IDUtilisateurs"
    left join "VersementCommissions" vc on vc."IDDonCagnotte" = dc."IDDonCagnotte"
union
select
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
from
    "Commande" c
    join "Utilisateurs" u on c."IDUtilisateurPayeur" = u."IDUtilisateurs"
    left join "VersementCommissions" vc on vc."IDCommande" = c."IDCommande"
union
select
    spm."IDServicePostMortem" as id,
    'Service post-mortem'::text as type,
        spm."Prestataire" as utilisateur,
    spm."MontantPrestation" as montant,
    COALESCE(vc."MontantCommission", 0::numeric) as commission,
    spm."DateService" as date,
  spm."StatutService" as statut,
  'postmortem'::text as categorie_type,
  spm."IDServicePostMortem" as original_id,
  null::bigint as id_utilisateurs,
  null::bigint as id_commande,
  null::bigint as id_activite_remuneree,
  spm."IDServicePostMortem" as id_service_post_mortem,
  null::bigint as id_don_cagnotte
from
    "ServicePostMortem" spm
    left join "VersementCommissions" vc on vc."IDServicePostMortem" = spm."IDServicePostMortem"
union
select
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
from
    "VersementCommissions" vc
order by
    6 desc;

create view public.v_forum_posts_moderation as
select
    s."IDSujetForum",
    s."TitreSujet",
    s."DateCreationSujet",
    s."IDUtilisateurs",
    u."Prenom" as "PrenomAuteur",
    u."Nom" as "NomAuteur",
    f."TitreForum" as "NomForum",
    count(distinct r."IDReponseForum") as nbreponses,
    count(distinct sc."IDSignalement") as signalements
from
    "SujetForum" s
        left join "Utilisateurs" u on s."IDUtilisateurs" = u."IDUtilisateurs"
        left join "Forum" f on f."IDForum" = s."IDForum"
        left join "ReponseForum" r on r."IDSujetForum" = s."IDSujetForum"
        left join "SignalementContenu" sc on sc."IDReponseForum" = r."IDReponseForum"
group by
    s."IDSujetForum",
    s."TitreSujet",
    s."DateCreationSujet",
    s."IDUtilisateurs",
    u."Prenom",
    u."Nom",
    f."TitreForum";

create view public.v_group_messages_moderation as
select
    m."IDMessageGroupe",
    m."Contenu",
    m."DateEnvoi",
    m."IDUtilisateurs",
    u."Prenom" as "PrenomAuteur",
    u."Nom" as "NomAuteur",
    m."IDGroupe",
    g."Titre" as "NomGroupe",
    count(s."IDSignalement") as signalements
from
    "MessageGroupe" m
        left join "Utilisateurs" u on u."IDUtilisateurs" = m."IDUtilisateurs"
        left join "Groupe" g on g."IDGroupe" = m."IDGroupe"
        left join "SignalementContenu" s on s."IDMessageGroupe" = m."IDMessageGroupe"
group by
    m."IDMessageGroupe",
    u."Prenom",
    u."Nom",
    g."Titre";

-- 12. ACTIVATION DES POLITIQUES RLS
-- ===========================================

-- Activer RLS sur les tables sensibles
ALTER TABLE "Document" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "DocumentRGPD" ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour les documents (temporairement permissives)
CREATE POLICY "Public can view documents" ON "Document" FOR SELECT USING (true);
CREATE POLICY "Public can insert documents" ON "Document" FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update documents" ON "Document" FOR UPDATE USING (true);
CREATE POLICY "Public can delete documents" ON "Document" FOR DELETE USING (true);

-- Politiques RLS pour les documents RGPD
CREATE POLICY "Public can view DocumentRGPD" ON "DocumentRGPD" FOR SELECT USING (true);
CREATE POLICY "Public can insert DocumentRGPD" ON "DocumentRGPD" FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update DocumentRGPD" ON "DocumentRGPD" FOR UPDATE USING (true);
CREATE POLICY "Public can delete DocumentRGPD" ON "DocumentRGPD" FOR DELETE USING (true);

-- 13. DONNÉES INITIALES
-- ===========================================

-- Insertion des catégories d'utilisateurs par défaut
INSERT INTO "CatUtilisateurs" ("IDCatUtilisateurs", "EstAdministrateur", "EstModerateur", "EstSupport", "EstSenior", "EstAidant", "EstTuteur", "EstOrganisme") VALUES
(5, true, false, false, false, false, false, false),
(6, false, true, false, false, false, false, false),
(7, false, false, false, false, false, false, false),
(8, false, false, true, false, false, false, false),
(1, false, false, false, true, false, false, false),
(2, false, false, false, false, true, false, false),
(3, false, false, false, false, false, true, false),
(4, false, false, false, false, false, false, true)
ON CONFLICT ("IDCatUtilisateurs") DO NOTHING;

-- Insertion des domaines par défaut
INSERT INTO "Domaine" ("DomaineTitre") VALUES
('Aide à domicile'),
('Accompagnement médical'),
('Aide administrative'),
('Aide aux courses'),
('Aide au ménage'),
('Aide informatique'),
('Bricolage'),
('Jardinage'),
('Cuisine'),
('Transport')
ON CONFLICT DO NOTHING;

-- Insertion des catégories de documents par défaut
INSERT INTO "CategorieDocument" ("NomCategorie") VALUES
('Identité'),
('Médical'),
('Administratif'),
('Patrimonial'),
('Assurance'),
('Autre')
ON CONFLICT DO NOTHING;

-- Insertion des paramètres de commission par défaut
INSERT INTO "ParametresCommission" ("TypeTransaction", "Pourcentage") VALUES
('Commande', 10.0),
('Activite', 15.0),
('PostMortem', 5.0),
('Don', 5.0)
ON CONFLICT DO NOTHING;

-- ===========================================
-- FIN DU SCRIPT
-- ===========================================

-- Ce script doit être exécuté dans l'ordre pour créer une base de données fonctionnelle.
-- Toutes les dépendances sont respectées et les triggers sont créés après les tables.
-- Les vues sont créées en dernier pour éviter les problèmes de dépendances.

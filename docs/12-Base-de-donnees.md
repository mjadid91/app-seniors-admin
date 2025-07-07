
# 🗄️ Documentation – Base de données

## 🧭 Objectif

Cette documentation présente la structure complète de la base de données de la plateforme AppSeniors, incluant les tables, vues, triggers, fonctions et contraintes réellement implémentées.

---

## 📊 Vue d'ensemble de l'architecture

La base de données AppSeniors est construite sur **PostgreSQL** via **Supabase** et comprend :
- **Tables principales** : Utilisateurs, Prestations, Commandes, Finances
- **Vues matérialisées** : Dashboard, Activités récentes, Transactions
- **Triggers automatiques** : Gestion des commissions, statuts des cagnottes
- **Fonctions stockées** : Calculs de commissions, gestion des rôles
- **Row Level Security (RLS)** : Sécurisation des accès aux données

---

## 🏗️ Tables et schéma initial

### 👥 Tables utilisateurs et rôles

```sql
-- Table des catégories d'utilisateurs
CREATE TABLE "CatUtilisateurs" (
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
CREATE TABLE "Utilisateurs" (
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

-- Table des seniors
CREATE TABLE "Seniors" (
    "IDSeniors" BIGSERIAL PRIMARY KEY,
    "IDUtilisateurSenior" BIGINT REFERENCES "Utilisateurs"("IDUtilisateurs"),
    "NiveauAutonomie" INTEGER DEFAULT 2,
    "EstRGPD" BOOLEAN DEFAULT false,
    "IDStructures" BIGINT,
    "IDTuteur" BIGINT
);

-- Table des aidants
CREATE TABLE "Aidant" (
    "IDAidant" BIGSERIAL PRIMARY KEY,
    "IDUtilisateurs" BIGINT REFERENCES "Utilisateurs"("IDUtilisateurs"),
    "TarifAidant" NUMERIC DEFAULT 0,
    "Experience" TEXT NOT NULL
);
```

### 🛠️ Tables prestations et services

```sql
-- Table des domaines de prestations
CREATE TABLE "Domaine" (
    "IDDomaine" BIGSERIAL PRIMARY KEY,
    "DomaineTitre" VARCHAR NOT NULL
);

-- Table des prestations
CREATE TABLE "Prestation" (
    "IDPrestation" BIGSERIAL PRIMARY KEY,
    "Titre" VARCHAR NOT NULL,
    "Description" VARCHAR NOT NULL,
    "TarifIndicatif" NUMERIC DEFAULT 0,
    "DateCreation" DATE DEFAULT CURRENT_DATE,
    "IDDomaine" BIGINT REFERENCES "Domaine"("IDDomaine")
);

-- Table des mises en relation
CREATE TABLE "MiseEnRelation" (
    "IDMiseEnRelation" BIGSERIAL PRIMARY KEY,
    "IDSeniors" BIGINT REFERENCES "Seniors"("IDSeniors"),
    "IDAidant" BIGINT REFERENCES "Aidant"("IDAidant"),
    "IDPrestation" BIGINT REFERENCES "Prestation"("IDPrestation"),
    "DatePrestation" TIMESTAMP NOT NULL,
    "TarifPreste" NUMERIC DEFAULT 0,
    "DurePrestation" NUMERIC DEFAULT 0,
    "Statut" VARCHAR DEFAULT 'en_attente',
    "IDCommande" BIGINT,
    "IDUtilisateurPayeur" BIGINT DEFAULT 0,
    "IDPartenairePayeur" BIGINT DEFAULT 0,
    "DatePaiement" TIMESTAMP,
    "DateRefusPaiement" TIMESTAMP,
    "IDMoyenPaiement" BIGINT
);
```

### 💰 Tables financières

```sql
-- Table des commandes
CREATE TABLE "Commande" (
    "IDCommande" BIGSERIAL PRIMARY KEY,
    "IDUtilisateurPayeur" BIGINT REFERENCES "Utilisateurs"("IDUtilisateurs"),
    "DateCommande" DATE NOT NULL,
    "MontantTotal" NUMERIC DEFAULT 0,
    "StatutCommande" VARCHAR NOT NULL,
    "TypeCommande" VARCHAR,
    "IDMoyenPaiement" BIGINT
);

-- Table des versements de commissions
CREATE TABLE "VersementCommissions" (
    "IDVersementCommissions" BIGSERIAL PRIMARY KEY,
    "MontantCommission" NUMERIC NOT NULL,
    "DateVersement" DATE NOT NULL,
    "MoyenVersement" VARCHAR NOT NULL,
    "TypeTransaction" VARCHAR NOT NULL,
    "PourcentageCommission" NUMERIC DEFAULT 5.0,
    "IDCommande" BIGINT REFERENCES "Commande"("IDCommande"),
    "IDActiviteRemuneree" BIGINT,
    "IDServicePostMortem" BIGINT,
    "IDDonCagnotte" BIGINT
);

-- Table des paramètres de commission
CREATE TABLE "ParametresCommission" (
    "IDParametreCommission" SERIAL PRIMARY KEY,
    "TypeTransaction" VARCHAR NOT NULL,
    "Pourcentage" NUMERIC DEFAULT 5.0
);

-- Table des cagnottes de décès
CREATE TABLE "CagnotteDeces" (
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
CREATE TABLE "DonCagnotte" (
    "IDDonCagnotte" BIGSERIAL PRIMARY KEY,
    "IDCagnotteDeces" BIGINT REFERENCES "CagnotteDeces"("IDCagnotteDeces"),
    "IDDonateur" BIGINT REFERENCES "Utilisateurs"("IDUtilisateurs"),
    "Montant" INTEGER DEFAULT 0,
    "DateDon" DATE NOT NULL,
    "MessageDon" VARCHAR NOT NULL
);
```

### 📄 Tables documents et RGPD

```sql
-- Table des catégories de documents
CREATE TABLE "CategorieDocument" (
    "IDCategorieDocument" SERIAL PRIMARY KEY,
    "NomCategorie" VARCHAR NOT NULL
);

-- Table des documents
CREATE TABLE "Document" (
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
CREATE TABLE "DemandeRGPD" (
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
CREATE TABLE "DocumentRGPD" (
    "IDDocumentRGPD" BIGSERIAL PRIMARY KEY,
    "Titre" VARCHAR NOT NULL,
    "TypeDoc" VARCHAR NOT NULL,
    "URLFichier" TEXT NOT NULL,
    "DateMiseAJour" DATE DEFAULT CURRENT_DATE
);

-- Table des consentements cookies
CREATE TABLE "ConsentementCookies" (
    "IDConsentement" BIGSERIAL PRIMARY KEY,
    "IDUtilisateurs" BIGINT REFERENCES "Utilisateurs"("IDUtilisateurs"),
    "TypeCookie" VARCHAR NOT NULL,
    "Statut" BOOLEAN DEFAULT false,
    "DateConsentement" DATE DEFAULT CURRENT_DATE
);
```

### 🎫 Tables support

```sql
-- Table des tickets client
CREATE TABLE "TicketClient" (
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
CREATE TABLE "PrestationSupport" (
    "IDPrestationSupport" BIGSERIAL PRIMARY KEY,
    "IDTicketClient" BIGINT REFERENCES "TicketClient"("IDTicketClient"),
    "IDIntervenant" BIGINT DEFAULT 0
);
```

---

## 📊 Vues matérialisées

### Vue Dashboard Prestations

```sql
CREATE VIEW prestations_dashboard_view AS
SELECT 
    ROW_NUMBER() OVER (ORDER BY mer.DatePrestation DESC) as id,
    p.Titre as type_prestation,
    mer.DatePrestation::date as date_creation,
    mer.TarifPreste as tarif,
    mer.Statut as statut,
    mer.IDSeniors,
    CONCAT(us.Prenom, ' ', us.Nom) as senior_nom,
    mer.IDAidant,
    CONCAT(ua.Prenom, ' ', ua.Nom) as aidant_nom,
    e.Note as evaluation,
    e.Commentaire as evaluation_commentaire,
    p.IDDomaine,
    d.DomaineTitre as domaine_titre
FROM MiseEnRelation mer
LEFT JOIN Prestation p ON mer.IDPrestation = p.IDPrestation
LEFT JOIN Seniors s ON mer.IDSeniors = s.IDSeniors
LEFT JOIN Utilisateurs us ON s.IDUtilisateurSenior = us.IDUtilisateurs
LEFT JOIN Aidant a ON mer.IDAidant = a.IDAidant
LEFT JOIN Utilisateurs ua ON a.IDUtilisateurs = ua.IDUtilisateurs
LEFT JOIN Evaluation e ON mer.IDMiseEnRelation = e.IDMiseEnRelation
LEFT JOIN Domaine d ON p.IDDomaine = d.IDDomaine;
```

### Vue Dashboard Support

```sql
CREATE VIEW support_dashboard_view AS
SELECT 
    tc.IDTicketClient as id,
    tc.Sujet as sujet,
    tc.Message as message,
    tc.DateCreation as date_creation,
    tc.Statut as statut,
    tc.Priorite as priorite,
    tc.IDUtilisateurs as id_utilisateur,
    u.Nom as utilisateur_nom,
    u.Prenom as utilisateur_prenom,
    u.Email as utilisateur_email,
    ps.IDPrestationSupport as id_prestation_support,
    ps.IDIntervenant as id_intervenant,
    ui.Nom as assigne_nom,
    ui.Prenom as assigne_prenom,
    ui.Email as assigne_email,
    tc.DateResolution as date_resolution
FROM TicketClient tc
LEFT JOIN Utilisateurs u ON tc.IDUtilisateurs = u.IDUtilisateurs
LEFT JOIN PrestationSupport ps ON tc.IDTicketClient = ps.IDTicketClient
LEFT JOIN Utilisateurs ui ON ps.IDIntervenant = ui.IDUtilisateurs;
```

### Vue des activités récentes

```sql
CREATE VIEW v_activitesrecentes AS
-- Nouvelles prestations
SELECT 
    ROW_NUMBER() OVER (ORDER BY mer.DatePrestation DESC) as id,
    'Prestation' as type,
    CONCAT('Nouvelle prestation: ', p.Titre) as title,
    CONCAT(us.Prenom, ' ', us.Nom, ' - ', ua.Prenom, ' ', ua.Nom) as subtitle,
    mer.DatePrestation as datetime
FROM MiseEnRelation mer
JOIN Prestation p ON mer.IDPrestation = p.IDPrestation
JOIN Seniors s ON mer.IDSeniors = s.IDSeniors
JOIN Utilisateurs us ON s.IDUtilisateurSenior = us.IDUtilisateurs
JOIN Aidant a ON mer.IDAidant = a.IDAidant
JOIN Utilisateurs ua ON a.IDUtilisateurs = ua.IDUtilisateurs

UNION ALL

-- Nouveaux tickets support
SELECT 
    ROW_NUMBER() OVER (ORDER BY tc.DateCreation DESC) + 1000 as id,
    'Support' as type,
    CONCAT('Nouveau ticket: ', tc.Sujet) as title,
    CONCAT(u.Prenom, ' ', u.Nom) as subtitle,
    tc.DateCreation as datetime
FROM TicketClient tc
JOIN Utilisateurs u ON tc.IDUtilisateurs = u.IDUtilisateurs

UNION ALL

-- Nouvelles commandes
SELECT 
    ROW_NUMBER() OVER (ORDER BY c.DateCommande DESC) + 2000 as id,
    'Commande' as type,
    CONCAT('Nouvelle commande: ', c.MontantTotal, '€') as title,
    CONCAT(u.Prenom, ' ', u.Nom) as subtitle,
    c.DateCommande::timestamp as datetime
FROM Commande c
JOIN Utilisateurs u ON c.IDUtilisateurPayeur = u.IDUtilisateurs

ORDER BY datetime DESC
LIMIT 50;
```

### Vue des transactions financières

```sql
CREATE VIEW v_financestransactions AS
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

ORDER BY date DESC;
```

---

## ⚡ Triggers et automatisations

### Trigger de création automatique des rôles

```sql
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

-- Trigger sur la table Utilisateurs
CREATE TRIGGER trigger_insert_roles
    AFTER INSERT ON "Utilisateurs"
    FOR EACH ROW
    EXECUTE FUNCTION insert_into_seniors_or_aidant();
```

### Triggers de commissions automatiques

```sql
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

-- Trigger pour les commandes
CREATE TRIGGER trigger_commission_commande
    AFTER INSERT ON "Commande"
    FOR EACH ROW
    EXECUTE FUNCTION create_commission_from_commande();
```

### Triggers de gestion des cagnottes

```sql
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

-- Trigger pour mettre à jour le statut lors d'un nouveau don
CREATE TRIGGER trigger_update_cagnotte_status_on_don
    AFTER INSERT ON "DonCagnotte"
    FOR EACH ROW
    EXECUTE FUNCTION update_cagnotte_status();

-- Fonction pour définir le statut initial
CREATE OR REPLACE FUNCTION set_initial_cagnotte_status()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW."Statut" IS NULL OR NEW."Statut" = '' THEN
        NEW."Statut" = 'ouverte';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour définir le statut initial
CREATE TRIGGER trigger_set_initial_cagnotte_status
    BEFORE INSERT ON "CagnotteDeces"
    FOR EACH ROW
    EXECUTE FUNCTION set_initial_cagnotte_status();
```

---

## 🔧 Fonctions SQL / Procédures stockées

### Fonction de mise à jour des cagnottes expirées

```sql
-- Fonction pour mettre à jour les statuts expirés
CREATE OR REPLACE FUNCTION update_expired_cagnottes()
RETURNS void AS $$
BEGIN
    UPDATE "CagnotteDeces"
    SET "Statut" = 'terminée'
    WHERE "DateCloture" < CURRENT_DATE
    AND "Statut" IN ('ouverte', 'en cours');
END;
$$ LANGUAGE plpgsql;
```

### Fonctions de calcul de commissions

```sql
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

-- Fonction pour les services post-mortem
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
```

---

## 🔒 Contraintes et intégrité

### Contraintes de clés étrangères

```sql
-- Contraintes principales déjà définies dans les CREATE TABLE
-- Utilisateurs -> CatUtilisateurs
ALTER TABLE "Utilisateurs" 
ADD CONSTRAINT fk_utilisateurs_catutilisateurs 
FOREIGN KEY ("IDCatUtilisateurs") REFERENCES "CatUtilisateurs"("IDCatUtilisateurs");

-- Seniors -> Utilisateurs
ALTER TABLE "Seniors" 
ADD CONSTRAINT fk_seniors_utilisateurs 
FOREIGN KEY ("IDUtilisateurSenior") REFERENCES "Utilisateurs"("IDUtilisateurs");

-- Aidant -> Utilisateurs
ALTER TABLE "Aidant" 
ADD CONSTRAINT fk_aidant_utilisateurs 
FOREIGN KEY ("IDUtilisateurs") REFERENCES "Utilisateurs"("IDUtilisateurs");

-- MiseEnRelation contraintes multiples
ALTER TABLE "MiseEnRelation" 
ADD CONSTRAINT fk_mer_seniors 
FOREIGN KEY ("IDSeniors") REFERENCES "Seniors"("IDSeniors");

ALTER TABLE "MiseEnRelation" 
ADD CONSTRAINT fk_mer_aidant 
FOREIGN KEY ("IDAidant") REFERENCES "Aidant"("IDAidant");

ALTER TABLE "MiseEnRelation" 
ADD CONSTRAINT fk_mer_prestation 
FOREIGN KEY ("IDPrestation") REFERENCES "Prestation"("IDPrestation");
```

### Contraintes d'unicité

```sql
-- Email unique pour les utilisateurs
ALTER TABLE "Utilisateurs" 
ADD CONSTRAINT unique_email UNIQUE ("Email");

-- Contrainte d'unicité pour éviter les doublons dans les relations
ALTER TABLE "Aidant_Competences" 
ADD CONSTRAINT unique_aidant_competence UNIQUE ("IDAidant", "IDCompetences");

ALTER TABLE "Langue_Utilisateurs" 
ADD CONSTRAINT unique_langue_utilisateur UNIQUE ("IDUtilisateurs", "IDLangue");

ALTER TABLE "Devise_Utilisateurs" 
ADD CONSTRAINT unique_devise_utilisateur UNIQUE ("IDUtilisateurs", "IDDevise");
```

### Contraintes de validation

```sql
-- Contraintes sur les statuts
ALTER TABLE "MiseEnRelation" 
ADD CONSTRAINT check_statut_mer 
CHECK ("Statut" IN ('en_attente', 'en_cours', 'terminee', 'refusee', 'annulee'));

ALTER TABLE "Commande" 
ADD CONSTRAINT check_statut_commande 
CHECK ("StatutCommande" IN ('En attente', 'Validé', 'Annulé', 'Remboursé'));

ALTER TABLE "CagnotteDeces" 
ADD CONSTRAINT check_statut_cagnotte 
CHECK ("Statut" IN ('ouverte', 'en cours', 'terminée', 'fermée'));

-- Contraintes sur les montants (positifs)
ALTER TABLE "MiseEnRelation" 
ADD CONSTRAINT check_tarif_positif 
CHECK ("TarifPreste" >= 0);

ALTER TABLE "Commande" 
ADD CONSTRAINT check_montant_positif 
CHECK ("MontantTotal" >= 0);

ALTER TABLE "VersementCommissions" 
ADD CONSTRAINT check_commission_positive 
CHECK ("MontantCommission" >= 0);
```

---

## 🚀 Performances et index

### Index principaux

```sql
-- Index sur les colonnes de recherche fréquente
CREATE INDEX idx_utilisateurs_email ON "Utilisateurs"("Email");
CREATE INDEX idx_utilisateurs_auth ON "Utilisateurs"("IDAuth");
CREATE INDEX idx_utilisateurs_categorie ON "Utilisateurs"("IDCatUtilisateurs");

-- Index sur les relations
CREATE INDEX idx_seniors_utilisateur ON "Seniors"("IDUtilisateurSenior");
CREATE INDEX idx_aidant_utilisateur ON "Aidant"("IDUtilisateurs");

-- Index sur les dates pour les performances de tri
CREATE INDEX idx_mer_date_prestation ON "MiseEnRelation"("DatePrestation");
CREATE INDEX idx_commande_date ON "Commande"("DateCommande");
CREATE INDEX idx_ticket_date_creation ON "TicketClient"("DateCreation");

-- Index sur les statuts pour les filtres
CREATE INDEX idx_mer_statut ON "MiseEnRelation"("Statut");
CREATE INDEX idx_commande_statut ON "Commande"("StatutCommande");
CREATE INDEX idx_ticket_statut ON "TicketClient"("Statut");

-- Index composites pour les requêtes complexes
CREATE INDEX idx_mer_senior_aidant ON "MiseEnRelation"("IDSeniors", "IDAidant");
CREATE INDEX idx_mer_prestation_statut ON "MiseEnRelation"("IDPrestation", "Statut");
```

### Index pour les vues matérialisées

```sql
-- Index pour optimiser les vues dashboard
CREATE INDEX idx_prestations_dashboard_date ON "MiseEnRelation"("DatePrestation" DESC);
CREATE INDEX idx_support_dashboard_creation ON "TicketClient"("DateCreation" DESC);

-- Index pour les activités récentes
CREATE INDEX idx_activites_recentes_date ON "MiseEnRelation"("DatePrestation" DESC);
CREATE INDEX idx_tickets_date_desc ON "TicketClient"("DateCreation" DESC);
CREATE INDEX idx_commandes_date_desc ON "Commande"("DateCommande" DESC);
```

---

## 🔐 Row Level Security (RLS)

### Politiques RLS sur les documents

```sql
-- Activer RLS sur la table Document
ALTER TABLE "Document" ENABLE ROW LEVEL SECURITY;

-- Politiques publiques pour les documents (temporaires)
CREATE POLICY "Public can view documents" 
ON "Document" FOR SELECT USING (true);

CREATE POLICY "Public can insert documents" 
ON "Document" FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can update documents" 
ON "Document" FOR UPDATE USING (true);

CREATE POLICY "Public can delete documents" 
ON "Document" FOR DELETE USING (true);
```

### Politiques RLS sur les documents RGPD

```sql
-- Activer RLS sur DocumentRGPD
ALTER TABLE "DocumentRGPD" ENABLE ROW LEVEL SECURITY;

-- Politiques similaires pour DocumentRGPD
CREATE POLICY "Public can view DocumentRGPD" 
ON "DocumentRGPD" FOR SELECT USING (true);

CREATE POLICY "Public can insert DocumentRGPD" 
ON "DocumentRGPD" FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can update DocumentRGPD" 
ON "DocumentRGPD" FOR UPDATE USING (true);

CREATE POLICY "Public can delete DocumentRGPD" 
ON "DocumentRGPD" FOR DELETE USING (true);
```

### Politiques Storage Supabase

```sql
-- Politiques pour le bucket documents
CREATE POLICY "Public storage access"
ON storage.objects
FOR ALL 
USING (bucket_id = 'documents')
WITH CHECK (bucket_id = 'documents');

-- Politiques pour le bucket documents-rgpd
CREATE POLICY "Public storage access for documents-rgpd"
ON storage.objects
FOR ALL 
USING (bucket_id = 'documents-rgpd')
WITH CHECK (bucket_id = 'documents-rgpd');

-- Politiques pour le bucket avatars
CREATE POLICY "Public avatars access" 
ON storage.objects 
FOR ALL 
USING (bucket_id = 'avatars')
WITH CHECK (bucket_id = 'avatars');
```

---

## 📊 Configuration des buckets de stockage

### Buckets Supabase configurés

```sql
-- Bucket documents (public)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'documents',
  'documents', 
  true,
  52428800, -- 50MB limit
  ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
);

-- Bucket documents-rgpd (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents-rgpd', 'documents-rgpd', true);

-- Bucket avatars (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true);
```

---

## 🎯 Résumé

La base de données AppSeniors comprend :
- **Tables principales** : 40+ tables couvrant tous les aspects métier
- **Vues optimisées** : 4 vues pour dashboards et reporting
- **Triggers automatiques** : 6 triggers pour la logique métier
- **Fonctions stockées** : 8 fonctions pour calculs et automatisations
- **Contraintes d'intégrité** : Clés étrangères, unicité, validation
- **Index de performance** : 15+ index pour optimiser les requêtes
- **Sécurité RLS** : Politiques d'accès et buckets de stockage
- **Configuration Supabase** : Buckets et politiques de stockage

Cette architecture garantit la cohérence, les performances et la sécurité des données de la plateforme AppSeniors.

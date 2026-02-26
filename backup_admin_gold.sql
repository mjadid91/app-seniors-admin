--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP EVENT TRIGGER IF EXISTS pgrst_drop_watch;
DROP EVENT TRIGGER IF EXISTS pgrst_ddl_watch;
DROP EVENT TRIGGER IF EXISTS issue_pg_net_access;
DROP EVENT TRIGGER IF EXISTS issue_pg_graphql_access;
DROP EVENT TRIGGER IF EXISTS issue_pg_cron_access;
DROP EVENT TRIGGER IF EXISTS issue_graphql_placeholder;
DROP PUBLICATION IF EXISTS supabase_realtime_messages_publication;
DROP PUBLICATION IF EXISTS supabase_realtime;
DROP POLICY IF EXISTS "Upload autorisé pour les connectés" ON storage.objects;
DROP POLICY IF EXISTS "Suppression autorisée pour les connectés" ON storage.objects;
DROP POLICY IF EXISTS "Public storage access for documents-rgpd" ON storage.objects;
DROP POLICY IF EXISTS "Public avatars access" ON storage.objects;
DROP POLICY IF EXISTS "Allow upload for support files" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access for support files" ON storage.objects;
DROP POLICY IF EXISTS "Accès public en lecture" ON storage.objects;
DROP POLICY IF EXISTS "Public can view documents" ON public."Document";
DROP POLICY IF EXISTS "Public can view DonCagnotte" ON public."DonCagnotte";
DROP POLICY IF EXISTS "Public can view DocumentRGPD" ON public."DocumentRGPD";
DROP POLICY IF EXISTS "Public can view CagnotteDeces" ON public."CagnotteDeces";
DROP POLICY IF EXISTS "Public can update documents" ON public."Document";
DROP POLICY IF EXISTS "Public can update DonCagnotte" ON public."DonCagnotte";
DROP POLICY IF EXISTS "Public can update DocumentRGPD" ON public."DocumentRGPD";
DROP POLICY IF EXISTS "Public can update CagnotteDeces" ON public."CagnotteDeces";
DROP POLICY IF EXISTS "Public can insert documents" ON public."Document";
DROP POLICY IF EXISTS "Public can insert DonCagnotte" ON public."DonCagnotte";
DROP POLICY IF EXISTS "Public can insert DocumentRGPD" ON public."DocumentRGPD";
DROP POLICY IF EXISTS "Public can insert CagnotteDeces" ON public."CagnotteDeces";
DROP POLICY IF EXISTS "Public can delete documents" ON public."Document";
DROP POLICY IF EXISTS "Public can delete DonCagnotte" ON public."DonCagnotte";
DROP POLICY IF EXISTS "Public can delete DocumentRGPD" ON public."DocumentRGPD";
DROP POLICY IF EXISTS "Public can delete CagnotteDeces" ON public."CagnotteDeces";
ALTER TABLE IF EXISTS ONLY storage.vector_indexes DROP CONSTRAINT IF EXISTS vector_indexes_bucket_id_fkey;
ALTER TABLE IF EXISTS ONLY storage.s3_multipart_uploads_parts DROP CONSTRAINT IF EXISTS s3_multipart_uploads_parts_upload_id_fkey;
ALTER TABLE IF EXISTS ONLY storage.s3_multipart_uploads_parts DROP CONSTRAINT IF EXISTS s3_multipart_uploads_parts_bucket_id_fkey;
ALTER TABLE IF EXISTS ONLY storage.s3_multipart_uploads DROP CONSTRAINT IF EXISTS s3_multipart_uploads_bucket_id_fkey;
ALTER TABLE IF EXISTS ONLY storage.objects DROP CONSTRAINT IF EXISTS "objects_bucketId_fkey";
ALTER TABLE IF EXISTS ONLY storage.iceberg_tables DROP CONSTRAINT IF EXISTS iceberg_tables_namespace_id_fkey;
ALTER TABLE IF EXISTS ONLY storage.iceberg_tables DROP CONSTRAINT IF EXISTS iceberg_tables_catalog_id_fkey;
ALTER TABLE IF EXISTS ONLY storage.iceberg_namespaces DROP CONSTRAINT IF EXISTS iceberg_namespaces_catalog_id_fkey;
ALTER TABLE IF EXISTS ONLY public."VersementCommissions" DROP CONSTRAINT IF EXISTS versementcommissions_idcommande_fkey;
ALTER TABLE IF EXISTS ONLY public."ServicePostMortem" DROP CONSTRAINT IF EXISTS servicepostmortem_idcreateur_fkey;
ALTER TABLE IF EXISTS ONLY public."MiseEnRelation" DROP CONSTRAINT IF EXISTS miseenrelation_idcommande_fkey;
ALTER TABLE IF EXISTS ONLY public."ReponsesSupport" DROP CONSTRAINT IF EXISTS fk_ticket;
ALTER TABLE IF EXISTS ONLY public."ReponsesSupport" DROP CONSTRAINT IF EXISTS fk_auteur;
ALTER TABLE IF EXISTS ONLY public."Commande" DROP CONSTRAINT IF EXISTS commande_idutilisateurpayeur_fkey;
ALTER TABLE IF EXISTS ONLY public."BonPlan_Utilisateurs" DROP CONSTRAINT IF EXISTS bonplan_utilisateurs_idcommande_fkey;
ALTER TABLE IF EXISTS ONLY public."VersementCommissions" DROP CONSTRAINT IF EXISTS "VersementCommissions_IDServicePostMortem_fkey";
ALTER TABLE IF EXISTS ONLY public."VersementCommissions" DROP CONSTRAINT IF EXISTS "VersementCommissions_IDPrestation_fkey";
ALTER TABLE IF EXISTS ONLY public."Utilisateurs_Localisation" DROP CONSTRAINT IF EXISTS "Utilisateurs_Localisation_IDUtilisateurs_fkey";
ALTER TABLE IF EXISTS ONLY public."Utilisateurs_Localisation" DROP CONSTRAINT IF EXISTS "Utilisateurs_Localisation_IDLocalisation_fkey";
ALTER TABLE IF EXISTS ONLY public."Utilisateurs" DROP CONSTRAINT IF EXISTS "Utilisateurs_IDCatUtilisateurs_fkey";
ALTER TABLE IF EXISTS ONLY public."Utilisateurs_Groupe" DROP CONSTRAINT IF EXISTS "Utilisateurs_Groupe_IDUtilisateurs_fkey";
ALTER TABLE IF EXISTS ONLY public."Utilisateurs_Groupe" DROP CONSTRAINT IF EXISTS "Utilisateurs_Groupe_IDGroupe_fkey";
ALTER TABLE IF EXISTS ONLY public."TMessage" DROP CONSTRAINT IF EXISTS "TMessage_IDUtilisateurExpediteur_fkey";
ALTER TABLE IF EXISTS ONLY public."TMessage" DROP CONSTRAINT IF EXISTS "TMessage_IDUtilisateurDestinataire_fkey";
ALTER TABLE IF EXISTS ONLY public."SupportClient" DROP CONSTRAINT IF EXISTS "SupportClient_IDUtilisateursClient_fkey";
ALTER TABLE IF EXISTS ONLY public."SujetForum" DROP CONSTRAINT IF EXISTS "SujetForum_IDUtilisateurs_fkey";
ALTER TABLE IF EXISTS ONLY public."SujetForum" DROP CONSTRAINT IF EXISTS "SujetForum_IDForum_fkey";
ALTER TABLE IF EXISTS ONLY public."Souvenir" DROP CONSTRAINT IF EXISTS "Souvenir_IDSeniors_fkey";
ALTER TABLE IF EXISTS ONLY public."SignalementContenu" DROP CONSTRAINT IF EXISTS "SignalementContenu_IDUtilisateurSignaleur_fkey";
ALTER TABLE IF EXISTS ONLY public."SignalementContenu" DROP CONSTRAINT IF EXISTS "SignalementContenu_IDReponseForum_fkey";
ALTER TABLE IF EXISTS ONLY public."SignalementContenu" DROP CONSTRAINT IF EXISTS "SignalementContenu_IDMessageGroupe_fkey";
ALTER TABLE IF EXISTS ONLY public."ServicePostMortem" DROP CONSTRAINT IF EXISTS "ServicePostMortem_IDCagnotteDeces_fkey";
ALTER TABLE IF EXISTS ONLY public."Seniors_TypeMaladie" DROP CONSTRAINT IF EXISTS "Seniors_TypeMaladie_IDTypeMaladie_fkey";
ALTER TABLE IF EXISTS ONLY public."Seniors_TypeMaladie" DROP CONSTRAINT IF EXISTS "Seniors_TypeMaladie_IDSeniors_fkey";
ALTER TABLE IF EXISTS ONLY public."Seniors" DROP CONSTRAINT IF EXISTS "Seniors_IDUtilisateurSenior_fkey";
ALTER TABLE IF EXISTS ONLY public."Seniors" DROP CONSTRAINT IF EXISTS "Seniors_IDTuteur_fkey";
ALTER TABLE IF EXISTS ONLY public."Seniors" DROP CONSTRAINT IF EXISTS "Seniors_IDStructures_fkey";
ALTER TABLE IF EXISTS ONLY public."Ressource" DROP CONSTRAINT IF EXISTS "Ressource_IDCategorieRessource_fkey";
ALTER TABLE IF EXISTS ONLY public."ReponseForum" DROP CONSTRAINT IF EXISTS "ReponseForum_IDUtilisateurs_fkey";
ALTER TABLE IF EXISTS ONLY public."ReponseForum" DROP CONSTRAINT IF EXISTS "ReponseForum_IDSujetForum_fkey";
ALTER TABLE IF EXISTS ONLY public."RendezVousMedical" DROP CONSTRAINT IF EXISTS "RendezVousMedical_IDSeniors_fkey";
ALTER TABLE IF EXISTS ONLY public."RapportMensuel" DROP CONSTRAINT IF EXISTS "RapportMensuel_IDSeniors_fkey";
ALTER TABLE IF EXISTS ONLY public."RapportMensuel" DROP CONSTRAINT IF EXISTS "RapportMensuel_IDRedacteur_fkey";
ALTER TABLE IF EXISTS ONLY public."Produit" DROP CONSTRAINT IF EXISTS "Produit_IDSeniorsVendeur_fkey";
ALTER TABLE IF EXISTS ONLY public."Produit_Commande" DROP CONSTRAINT IF EXISTS "Produit_Commande_IDProduit_fkey";
ALTER TABLE IF EXISTS ONLY public."Produit_Commande" DROP CONSTRAINT IF EXISTS "Produit_Commande_IDCommande_fkey";
ALTER TABLE IF EXISTS ONLY public."Prestation_Localisation" DROP CONSTRAINT IF EXISTS "Prestation_Localisation_IDPrestation_fkey";
ALTER TABLE IF EXISTS ONLY public."Prestation_Localisation" DROP CONSTRAINT IF EXISTS "Prestation_Localisation_IDLocalisation_fkey";
ALTER TABLE IF EXISTS ONLY public."Prestation" DROP CONSTRAINT IF EXISTS "Prestation_IDDomaine_fkey";
ALTER TABLE IF EXISTS ONLY public."PrestationSupport" DROP CONSTRAINT IF EXISTS "PrestationSupport_IDTicketClient_fkey";
ALTER TABLE IF EXISTS ONLY public."PrestationSupport" DROP CONSTRAINT IF EXISTS "PrestationSupport_IDIntervenant_fkey";
ALTER TABLE IF EXISTS ONLY public."PrestationAidant" DROP CONSTRAINT IF EXISTS "PrestationAidant_IDBesoinSenior_fkey";
ALTER TABLE IF EXISTS ONLY public."PrestationAidant" DROP CONSTRAINT IF EXISTS "PrestationAidant_IDAidant_fkey";
ALTER TABLE IF EXISTS ONLY public."Pieces" DROP CONSTRAINT IF EXISTS "Pieces_TypePiece_fkey";
ALTER TABLE IF EXISTS ONLY public."Pieces" DROP CONSTRAINT IF EXISTS "Pieces_IDUtilisateurs_fkey";
ALTER TABLE IF EXISTS ONLY public."Partenaire_Services" DROP CONSTRAINT IF EXISTS "Partenaire_Services_IDServicePartenaire_fkey";
ALTER TABLE IF EXISTS ONLY public."Partenaire_Services" DROP CONSTRAINT IF EXISTS "Partenaire_Services_IDPartenaire_fkey";
ALTER TABLE IF EXISTS ONLY public."Partenaire" DROP CONSTRAINT IF EXISTS "Partenaire_IDCatUtilisateurs_fkey";
ALTER TABLE IF EXISTS ONLY public."Parametres" DROP CONSTRAINT IF EXISTS "Parametres_IDUtilisateurs_fkey";
ALTER TABLE IF EXISTS ONLY public."Organisme" DROP CONSTRAINT IF EXISTS "Organisme_IDCategorieOrganisme_fkey";
ALTER TABLE IF EXISTS ONLY public."OffreSenior" DROP CONSTRAINT IF EXISTS "OffreSenior_IDSeniors_fkey";
ALTER TABLE IF EXISTS ONLY public."ObjetPrete" DROP CONSTRAINT IF EXISTS "ObjetPrete_IDProprietaireUtilisateur_fkey";
ALTER TABLE IF EXISTS ONLY public."ObjetPrete" DROP CONSTRAINT IF EXISTS "ObjetPrete_IDEmprunteurUtilisateur_fkey";
ALTER TABLE IF EXISTS ONLY public."Notifications" DROP CONSTRAINT IF EXISTS "Notifications_IDUtilisateurOrigine_fkey";
ALTER TABLE IF EXISTS ONLY public."Notifications" DROP CONSTRAINT IF EXISTS "Notifications_IDUtilisateurDestinataire_fkey";
ALTER TABLE IF EXISTS ONLY public."MiseEnRelation_Prestation" DROP CONSTRAINT IF EXISTS "MiseEnRelation_Prestation_IDPrestation_fkey";
ALTER TABLE IF EXISTS ONLY public."MiseEnRelation_Prestation" DROP CONSTRAINT IF EXISTS "MiseEnRelation_Prestation_IDMiseEnRelation_fkey";
ALTER TABLE IF EXISTS ONLY public."MiseEnRelation" DROP CONSTRAINT IF EXISTS "MiseEnRelation_IDUtilisateurPayeur_fkey";
ALTER TABLE IF EXISTS ONLY public."MiseEnRelation" DROP CONSTRAINT IF EXISTS "MiseEnRelation_IDSeniors_fkey";
ALTER TABLE IF EXISTS ONLY public."MiseEnRelation" DROP CONSTRAINT IF EXISTS "MiseEnRelation_IDPartenairePayeur_fkey";
ALTER TABLE IF EXISTS ONLY public."MiseEnRelation" DROP CONSTRAINT IF EXISTS "MiseEnRelation_IDMoyenPaiement_fkey";
ALTER TABLE IF EXISTS ONLY public."MiseEnRelation" DROP CONSTRAINT IF EXISTS "MiseEnRelation_IDAidant_fkey";
ALTER TABLE IF EXISTS ONLY public."MessageGroupe" DROP CONSTRAINT IF EXISTS "MessageGroupe_IDUtilisateurs_fkey";
ALTER TABLE IF EXISTS ONLY public."MessageGroupe" DROP CONSTRAINT IF EXISTS "MessageGroupe_IDGroupe_fkey";
ALTER TABLE IF EXISTS ONLY public."Medicament" DROP CONSTRAINT IF EXISTS "Medicament_IDSeniors_fkey";
ALTER TABLE IF EXISTS ONLY public."LogementSenior" DROP CONSTRAINT IF EXISTS "LogementSenior_IDSeniors_fkey";
ALTER TABLE IF EXISTS ONLY public."LienPartenariat" DROP CONSTRAINT IF EXISTS "LienPartenariat_IDOrganisme_fkey";
ALTER TABLE IF EXISTS ONLY public."Langue_Utilisateurs" DROP CONSTRAINT IF EXISTS "Langue_Utilisateurs_IDUtilisateurs_fkey";
ALTER TABLE IF EXISTS ONLY public."Langue_Utilisateurs" DROP CONSTRAINT IF EXISTS "Langue_Utilisateurs_IDLangue_fkey";
ALTER TABLE IF EXISTS ONLY public."Humeur" DROP CONSTRAINT IF EXISTS "Humeur_IDSeniors_fkey";
ALTER TABLE IF EXISTS ONLY public."HistoriqueInteractions" DROP CONSTRAINT IF EXISTS "HistoriqueInteractions_IDUtilisateurs_fkey";
ALTER TABLE IF EXISTS ONLY public."HistoriqueConnexion" DROP CONSTRAINT IF EXISTS "HistoriqueConnexion_IDUtilisateurs_fkey";
ALTER TABLE IF EXISTS ONLY public."Groupe" DROP CONSTRAINT IF EXISTS "Groupe_IDUtilisateursCreateur_fkey";
ALTER TABLE IF EXISTS ONLY public."Forum" DROP CONSTRAINT IF EXISTS "Forum_IDCreateur_fkey";
ALTER TABLE IF EXISTS ONLY public."Facture" DROP CONSTRAINT IF EXISTS "Facture_IDMiseEnRelation_IDPrestation_fkey";
ALTER TABLE IF EXISTS ONLY public."Facture" DROP CONSTRAINT IF EXISTS "Facture_IDCommande_fkey";
ALTER TABLE IF EXISTS ONLY public."Evenements" DROP CONSTRAINT IF EXISTS "Evenements_IDAgenda_fkey";
ALTER TABLE IF EXISTS ONLY public."Evaluation" DROP CONSTRAINT IF EXISTS "Evaluation_IDUtilisateurs_fkey";
ALTER TABLE IF EXISTS ONLY public."Evaluation" DROP CONSTRAINT IF EXISTS "Evaluation_IDProduit_fkey";
ALTER TABLE IF EXISTS ONLY public."Evaluation" DROP CONSTRAINT IF EXISTS "Evaluation_IDMiseEnRelation_fkey";
ALTER TABLE IF EXISTS ONLY public."Evaluation" DROP CONSTRAINT IF EXISTS "Evaluation_IDCommande_fkey";
ALTER TABLE IF EXISTS ONLY public."EvaluationCohabitation" DROP CONSTRAINT IF EXISTS "EvaluationCohabitation_IDEvaluateur_fkey";
ALTER TABLE IF EXISTS ONLY public."EvaluationCohabitation" DROP CONSTRAINT IF EXISTS "EvaluationCohabitation_IDContratCohabitation_fkey";
ALTER TABLE IF EXISTS ONLY public."EquipementMedical" DROP CONSTRAINT IF EXISTS "EquipementMedical_IDProduit_fkey";
ALTER TABLE IF EXISTS ONLY public."DonCagnotte" DROP CONSTRAINT IF EXISTS "DonCagnotte_IDDonateur_fkey";
ALTER TABLE IF EXISTS ONLY public."DonCagnotte" DROP CONSTRAINT IF EXISTS "DonCagnotte_IDCagnotteDeces_fkey";
ALTER TABLE IF EXISTS ONLY public."Document" DROP CONSTRAINT IF EXISTS "Document_IDUtilisateurs_fkey";
ALTER TABLE IF EXISTS ONLY public."Document" DROP CONSTRAINT IF EXISTS "Document_IDCategorieDocument_fkey";
ALTER TABLE IF EXISTS ONLY public."DocumentPatrimonial" DROP CONSTRAINT IF EXISTS "DocumentPatrimonial_IDSeniors_fkey";
ALTER TABLE IF EXISTS ONLY public."DirectivesAnticipees" DROP CONSTRAINT IF EXISTS "DirectivesAnticipees_IDSeniors_fkey";
ALTER TABLE IF EXISTS ONLY public."Devise_Utilisateurs" DROP CONSTRAINT IF EXISTS "Devise_Utilisateurs_IDUtilisateurs_fkey";
ALTER TABLE IF EXISTS ONLY public."Devise_Utilisateurs" DROP CONSTRAINT IF EXISTS "Devise_Utilisateurs_IDDevise_fkey";
ALTER TABLE IF EXISTS ONLY public."DemandeRGPD" DROP CONSTRAINT IF EXISTS "DemandeRGPD_TraitePar_fkey";
ALTER TABLE IF EXISTS ONLY public."DemandeRGPD" DROP CONSTRAINT IF EXISTS "DemandeRGPD_IDUtilisateurs_fkey";
ALTER TABLE IF EXISTS ONLY public."ContratCohabitation" DROP CONSTRAINT IF EXISTS "ContratCohabitation_IDLogementSenior_fkey";
ALTER TABLE IF EXISTS ONLY public."ContratCohabitation" DROP CONSTRAINT IF EXISTS "ContratCohabitation_IDAidant_fkey";
ALTER TABLE IF EXISTS ONLY public."ContactUrgence" DROP CONSTRAINT IF EXISTS "ContactUrgence_IDSeniors_fkey";
ALTER TABLE IF EXISTS ONLY public."ConsentementCookies" DROP CONSTRAINT IF EXISTS "ConsentementCookies_IDUtilisateurs_fkey";
ALTER TABLE IF EXISTS ONLY public."Competences" DROP CONSTRAINT IF EXISTS "Competences_IDDomaine_fkey";
ALTER TABLE IF EXISTS ONLY public."Commande" DROP CONSTRAINT IF EXISTS "Commande_IDMoyenPaiement_fkey";
ALTER TABLE IF EXISTS ONLY public."CandidatureAidant" DROP CONSTRAINT IF EXISTS "CandidatureAidant_IDBesoinSenior_fkey";
ALTER TABLE IF EXISTS ONLY public."CandidatureAidant" DROP CONSTRAINT IF EXISTS "CandidatureAidant_IDAidant_fkey";
ALTER TABLE IF EXISTS ONLY public."CagnotteDeces" DROP CONSTRAINT IF EXISTS "CagnotteDeces_IDSeniors_fkey";
ALTER TABLE IF EXISTS ONLY public."BonPlan_Utilisateurs" DROP CONSTRAINT IF EXISTS "BonPlan_Utilisateurs_IDUtilisateurs_fkey";
ALTER TABLE IF EXISTS ONLY public."BonPlan_Utilisateurs" DROP CONSTRAINT IF EXISTS "BonPlan_Utilisateurs_IDBonPlan_fkey";
ALTER TABLE IF EXISTS ONLY public."BonPlan" DROP CONSTRAINT IF EXISTS "BonPlan_IDPartenaire_fkey";
ALTER TABLE IF EXISTS ONLY public."BesoinSenior" DROP CONSTRAINT IF EXISTS "BesoinSenior_IDSeniors_fkey";
ALTER TABLE IF EXISTS ONLY public."AssuranceDeces" DROP CONSTRAINT IF EXISTS "AssuranceDeces_IDSeniors_fkey";
ALTER TABLE IF EXISTS ONLY public."Aidant" DROP CONSTRAINT IF EXISTS "Aidant_IDUtilisateurs_fkey";
ALTER TABLE IF EXISTS ONLY public."Aidant_Competences" DROP CONSTRAINT IF EXISTS "Aidant_Competences_IDCompetences_fkey";
ALTER TABLE IF EXISTS ONLY public."Aidant_Competences" DROP CONSTRAINT IF EXISTS "Aidant_Competences_IDAidant_fkey";
ALTER TABLE IF EXISTS ONLY public."Agenda" DROP CONSTRAINT IF EXISTS "Agenda_IDSeniors_fkey";
ALTER TABLE IF EXISTS ONLY public."ActiviteRemuneree_Utilisateurs" DROP CONSTRAINT IF EXISTS "ActiviteRemuneree_Utilisateurs_IDUtilisateurs_fkey";
ALTER TABLE IF EXISTS ONLY public."ActiviteRemuneree_Utilisateurs" DROP CONSTRAINT IF EXISTS "ActiviteRemuneree_Utilisateurs_IDActiviteRemuneree_fkey";
ALTER TABLE IF EXISTS ONLY public."ActiviteRemuneree" DROP CONSTRAINT IF EXISTS "ActiviteRemuneree_IDSeniors_fkey";
ALTER TABLE IF EXISTS ONLY auth.sso_domains DROP CONSTRAINT IF EXISTS sso_domains_sso_provider_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.sessions DROP CONSTRAINT IF EXISTS sessions_user_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.saml_relay_states DROP CONSTRAINT IF EXISTS saml_relay_states_sso_provider_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.saml_relay_states DROP CONSTRAINT IF EXISTS saml_relay_states_flow_state_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.saml_providers DROP CONSTRAINT IF EXISTS saml_providers_sso_provider_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.refresh_tokens DROP CONSTRAINT IF EXISTS refresh_tokens_session_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.one_time_tokens DROP CONSTRAINT IF EXISTS one_time_tokens_user_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.mfa_factors DROP CONSTRAINT IF EXISTS mfa_factors_user_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.mfa_challenges DROP CONSTRAINT IF EXISTS mfa_challenges_auth_factor_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.mfa_amr_claims DROP CONSTRAINT IF EXISTS mfa_amr_claims_session_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.identities DROP CONSTRAINT IF EXISTS identities_user_id_fkey;
ALTER TABLE IF EXISTS ONLY _realtime.extensions DROP CONSTRAINT IF EXISTS extensions_tenant_external_id_fkey;
DROP TRIGGER IF EXISTS update_objects_updated_at ON storage.objects;
DROP TRIGGER IF EXISTS protect_objects_delete ON storage.objects;
DROP TRIGGER IF EXISTS protect_buckets_delete ON storage.buckets;
DROP TRIGGER IF EXISTS enforce_bucket_name_length_trigger ON storage.buckets;
DROP TRIGGER IF EXISTS tr_check_filters ON realtime.subscription;
DROP TRIGGER IF EXISTS trigger_update_cagnotte_status ON public."DonCagnotte";
DROP TRIGGER IF EXISTS trigger_update_cagnotte_montant ON public."DonCagnotte";
DROP TRIGGER IF EXISTS trigger_set_initial_cagnotte_status ON public."CagnotteDeces";
DROP TRIGGER IF EXISTS trigger_commission_postmortem ON public."ServicePostMortem";
DROP TRIGGER IF EXISTS trigger_commission_commande ON public."Commande";
DROP TRIGGER IF EXISTS trigger_commission_activite ON public."ActiviteRemuneree_Utilisateurs";
DROP TRIGGER IF EXISTS create_senior_or_aidant ON public."Utilisateurs";
CREATE OR REPLACE VIEW public.v_group_messages_moderation AS
SELECT
    NULL::bigint AS "IDMessageGroupe",
    NULL::character varying(255) AS "Contenu",
    NULL::date AS "DateEnvoi",
    NULL::bigint AS "IDUtilisateurs",
    NULL::character varying(50) AS "PrenomAuteur",
    NULL::character varying(50) AS "NomAuteur",
    NULL::bigint AS "IDGroupe",
    NULL::character varying(50) AS "NomGroupe",
    NULL::bigint AS signalements;
DROP INDEX IF EXISTS supabase_functions.supabase_functions_hooks_request_id_idx;
DROP INDEX IF EXISTS supabase_functions.supabase_functions_hooks_h_table_id_h_name_idx;
DROP INDEX IF EXISTS storage.vector_indexes_name_bucket_id_idx;
DROP INDEX IF EXISTS storage.name_prefix_search;
DROP INDEX IF EXISTS storage.idx_objects_bucket_id_name_lower;
DROP INDEX IF EXISTS storage.idx_objects_bucket_id_name;
DROP INDEX IF EXISTS storage.idx_multipart_uploads_list;
DROP INDEX IF EXISTS storage.idx_iceberg_tables_namespace_id;
DROP INDEX IF EXISTS storage.idx_iceberg_tables_location;
DROP INDEX IF EXISTS storage.idx_iceberg_namespaces_bucket_id;
DROP INDEX IF EXISTS storage.buckets_analytics_unique_name_idx;
DROP INDEX IF EXISTS storage.bucketid_objname;
DROP INDEX IF EXISTS storage.bname;
DROP INDEX IF EXISTS realtime.subscription_subscription_id_entity_filters_action_filter_key;
DROP INDEX IF EXISTS realtime.messages_2026_02_28_inserted_at_topic_idx;
DROP INDEX IF EXISTS realtime.messages_2026_02_27_inserted_at_topic_idx;
DROP INDEX IF EXISTS realtime.messages_2026_02_26_inserted_at_topic_idx;
DROP INDEX IF EXISTS realtime.messages_2026_02_25_inserted_at_topic_idx;
DROP INDEX IF EXISTS realtime.messages_2026_02_24_inserted_at_topic_idx;
DROP INDEX IF EXISTS realtime.messages_2026_02_23_inserted_at_topic_idx;
DROP INDEX IF EXISTS realtime.messages_inserted_at_topic_index;
DROP INDEX IF EXISTS realtime.ix_realtime_subscription_entity;
DROP INDEX IF EXISTS public.idx_utilisateurs_idauth;
DROP INDEX IF EXISTS public."WDIDX_VersementCommissions_IDPrestation";
DROP INDEX IF EXISTS public."WDIDX_Utilisateurs_Telephone";
DROP INDEX IF EXISTS public."WDIDX_Utilisateurs_Prenom";
DROP INDEX IF EXISTS public."WDIDX_Utilisateurs_Nom";
DROP INDEX IF EXISTS public."WDIDX_Utilisateurs_Localisation_IDUtilisateurs_IDLocalisation";
DROP INDEX IF EXISTS public."WDIDX_Utilisateurs_Localisation_IDUtilisateurs";
DROP INDEX IF EXISTS public."WDIDX_Utilisateurs_Localisation_IDLocalisation";
DROP INDEX IF EXISTS public."WDIDX_Utilisateurs_LangueSite";
DROP INDEX IF EXISTS public."WDIDX_Utilisateurs_IDCatUtilisateurs";
DROP INDEX IF EXISTS public."WDIDX_Utilisateurs_Groupe_IDUtilisateurs_IDGroupe";
DROP INDEX IF EXISTS public."WDIDX_Utilisateurs_Groupe_IDUtilisateurs";
DROP INDEX IF EXISTS public."WDIDX_Utilisateurs_Groupe_IDGroupe";
DROP INDEX IF EXISTS public."WDIDX_Utilisateurs_EstRGPD";
DROP INDEX IF EXISTS public."WDIDX_Utilisateurs_EstDesactive";
DROP INDEX IF EXISTS public."WDIDX_Utilisateurs_Email";
DROP INDEX IF EXISTS public."WDIDX_Utilisateurs_DateNaissance";
DROP INDEX IF EXISTS public."WDIDX_Utilisateurs_DateModification";
DROP INDEX IF EXISTS public."WDIDX_Utilisateurs_DateInscription";
DROP INDEX IF EXISTS public."WDIDX_TypeMaladie_EstHandicap";
DROP INDEX IF EXISTS public."WDIDX_TransactionRevenu_IDUtilisateurs";
DROP INDEX IF EXISTS public."WDIDX_TransactionRevenu_IDActiviteRemuneree_IDUtilisateurs";
DROP INDEX IF EXISTS public."WDIDX_TransactionRevenu_IDActiviteRemuneree";
DROP INDEX IF EXISTS public."WDIDX_TMessage_IDUtilisateurExpediteur";
DROP INDEX IF EXISTS public."WDIDX_TMessage_IDUtilisateurDestinataire";
DROP INDEX IF EXISTS public."WDIDX_SupportClient_IDUtilisateursClient";
DROP INDEX IF EXISTS public."WDIDX_SujetForum_IDUtilisateurs";
DROP INDEX IF EXISTS public."WDIDX_SujetForum_IDForum";
DROP INDEX IF EXISTS public."WDIDX_Souvenir_IDSeniors";
DROP INDEX IF EXISTS public."WDIDX_ServicePostMortem_IDCagnotteDeces";
DROP INDEX IF EXISTS public."WDIDX_Seniors_TypeMaladie_IDTypeMaladie";
DROP INDEX IF EXISTS public."WDIDX_Seniors_TypeMaladie_IDSeniors_IDTypeMaladie";
DROP INDEX IF EXISTS public."WDIDX_Seniors_TypeMaladie_IDSeniors";
DROP INDEX IF EXISTS public."WDIDX_Seniors_NiveauAutonomie";
DROP INDEX IF EXISTS public."WDIDX_Seniors_IDUtilisateurSenior";
DROP INDEX IF EXISTS public."WDIDX_Seniors_IDTuteur";
DROP INDEX IF EXISTS public."WDIDX_Seniors_IDStructures";
DROP INDEX IF EXISTS public."WDIDX_Seniors_EstRGPD";
DROP INDEX IF EXISTS public."WDIDX_Ressource_IDCategorieRessource";
DROP INDEX IF EXISTS public."WDIDX_ReponseForum_IDUtilisateurs";
DROP INDEX IF EXISTS public."WDIDX_ReponseForum_IDSujetForum";
DROP INDEX IF EXISTS public."WDIDX_RendezVousMedical_IDSeniors";
DROP INDEX IF EXISTS public."WDIDX_RapportMensuel_IDSeniors";
DROP INDEX IF EXISTS public."WDIDX_RapportMensuel_IDRedacteur";
DROP INDEX IF EXISTS public."WDIDX_Produit_IDSeniorsVendeur";
DROP INDEX IF EXISTS public."WDIDX_Produit_Commande_IDProduit_IDCommande";
DROP INDEX IF EXISTS public."WDIDX_Produit_Commande_IDProduit";
DROP INDEX IF EXISTS public."WDIDX_Produit_Commande_IDCommande";
DROP INDEX IF EXISTS public."WDIDX_Prestation_Titre";
DROP INDEX IF EXISTS public."WDIDX_Prestation_Localisation_IDPrestation_IDLocalisation";
DROP INDEX IF EXISTS public."WDIDX_Prestation_Localisation_IDPrestation";
DROP INDEX IF EXISTS public."WDIDX_Prestation_Localisation_IDLocalisation";
DROP INDEX IF EXISTS public."WDIDX_Prestation_IDDomaine";
DROP INDEX IF EXISTS public."WDIDX_PrestationSupport_IDTicketClient";
DROP INDEX IF EXISTS public."WDIDX_PrestationSupport_IDIntervenant";
DROP INDEX IF EXISTS public."WDIDX_PrestationAidant_IDBesoinSenior";
DROP INDEX IF EXISTS public."WDIDX_PrestationAidant_IDAidant";
DROP INDEX IF EXISTS public."WDIDX_Pieces_TypePiece";
DROP INDEX IF EXISTS public."WDIDX_Pieces_IDUtilisateurs";
DROP INDEX IF EXISTS public."WDIDX_Pieces_DateSuppression";
DROP INDEX IF EXISTS public."WDIDX_Pieces_DateCreation";
DROP INDEX IF EXISTS public."WDIDX_Partenaire_Telephone";
DROP INDEX IF EXISTS public."WDIDX_Partenaire_IDCatUtilisateurs";
DROP INDEX IF EXISTS public."WDIDX_Partenaire_Email";
DROP INDEX IF EXISTS public."WDIDX_Parametres_IDUtilisateurs";
DROP INDEX IF EXISTS public."WDIDX_Organisme_Telephone";
DROP INDEX IF EXISTS public."WDIDX_Organisme_Nom";
DROP INDEX IF EXISTS public."WDIDX_Organisme_IDCategorieOrganisme";
DROP INDEX IF EXISTS public."WDIDX_Organisme_Email";
DROP INDEX IF EXISTS public."WDIDX_OffreSenior_IDSeniors";
DROP INDEX IF EXISTS public."WDIDX_ObjetPrete_IDProprietaireUtilisateur";
DROP INDEX IF EXISTS public."WDIDX_ObjetPrete_IDEmprunteurUtilisateur";
DROP INDEX IF EXISTS public."WDIDX_Notifications_IDUtilisateurOrigine";
DROP INDEX IF EXISTS public."WDIDX_Notifications_IDUtilisateurDestinataire";
DROP INDEX IF EXISTS public."WDIDX_MoyenPaiement_DatePaiement";
DROP INDEX IF EXISTS public."WDIDX_MiseEnRelation_Prestation_IDPrestation";
DROP INDEX IF EXISTS public."WDIDX_MiseEnRelation_Prestation_IDMiseEnRelation";
DROP INDEX IF EXISTS public."WDIDX_MiseEnRelation_IDUtilisateurPayeur";
DROP INDEX IF EXISTS public."WDIDX_MiseEnRelation_IDSeniors";
DROP INDEX IF EXISTS public."WDIDX_MiseEnRelation_IDPrestation";
DROP INDEX IF EXISTS public."WDIDX_MiseEnRelation_IDPartenairePayeur";
DROP INDEX IF EXISTS public."WDIDX_MiseEnRelation_IDMoyenPaiement";
DROP INDEX IF EXISTS public."WDIDX_MiseEnRelation_IDAidant";
DROP INDEX IF EXISTS public."WDIDX_MiseEnRelation_DateRefusPaiement";
DROP INDEX IF EXISTS public."WDIDX_MiseEnRelation_DatePrestation";
DROP INDEX IF EXISTS public."WDIDX_MiseEnRelation_DatePaiement";
DROP INDEX IF EXISTS public."WDIDX_MessageGroupe_IDUtilisateurs";
DROP INDEX IF EXISTS public."WDIDX_MessageGroupe_IDGroupe";
DROP INDEX IF EXISTS public."WDIDX_Medicament_IDSeniors";
DROP INDEX IF EXISTS public."WDIDX_LogementSenior_IDSeniors";
DROP INDEX IF EXISTS public."WDIDX_LienPartenariat_IDOrganisme";
DROP INDEX IF EXISTS public."WDIDX_Langue_Utilisateurs_NiveauLangue";
DROP INDEX IF EXISTS public."WDIDX_Langue_Utilisateurs_IDUtilisateurs";
DROP INDEX IF EXISTS public."WDIDX_Langue_Utilisateurs_IDLangue_IDUtilisateurs";
DROP INDEX IF EXISTS public."WDIDX_Langue_Utilisateurs_IDLangue";
DROP INDEX IF EXISTS public."WDIDX_Humeur_IDSeniors";
DROP INDEX IF EXISTS public."WDIDX_HistoriqueInteractions_IDUtilisateurs";
DROP INDEX IF EXISTS public."WDIDX_HistoriqueConnexion_IDUtilisateurs";
DROP INDEX IF EXISTS public."WDIDX_Groupe_IDUtilisateursCreateur";
DROP INDEX IF EXISTS public."WDIDX_Forum_IDCreateur";
DROP INDEX IF EXISTS public."WDIDX_Facture_IDMiseEnRelation_IDPrestation";
DROP INDEX IF EXISTS public."WDIDX_Facture_IDCommande";
DROP INDEX IF EXISTS public."WDIDX_Evenements_IDAgenda";
DROP INDEX IF EXISTS public."WDIDX_Evaluation_Note";
DROP INDEX IF EXISTS public."WDIDX_Evaluation_IDUtilisateurs";
DROP INDEX IF EXISTS public."WDIDX_Evaluation_IDProduit";
DROP INDEX IF EXISTS public."WDIDX_Evaluation_IDMiseEnRelation";
DROP INDEX IF EXISTS public."WDIDX_Evaluation_IDCommande";
DROP INDEX IF EXISTS public."WDIDX_Evaluation_DateEvaluation";
DROP INDEX IF EXISTS public."WDIDX_EvaluationCohabitation_IDEvaluateur";
DROP INDEX IF EXISTS public."WDIDX_EvaluationCohabitation_IDContratCohabitation";
DROP INDEX IF EXISTS public."WDIDX_EquipementMedical_IDProduit";
DROP INDEX IF EXISTS public."WDIDX_DonCagnotte_IDDonateur";
DROP INDEX IF EXISTS public."WDIDX_DonCagnotte_IDCagnotteDeces";
DROP INDEX IF EXISTS public."WDIDX_DocumentPatrimonial_IDSeniors";
DROP INDEX IF EXISTS public."WDIDX_DirectivesAnticipees_IDSeniors";
DROP INDEX IF EXISTS public."WDIDX_Devise_Utilisateurs_IDUtilisateurs";
DROP INDEX IF EXISTS public."WDIDX_Devise_Utilisateurs_IDDevise_IDUtilisateurs";
DROP INDEX IF EXISTS public."WDIDX_Devise_Utilisateurs_IDDevise";
DROP INDEX IF EXISTS public."WDIDX_ContratCohabitation_IDLogementSenior";
DROP INDEX IF EXISTS public."WDIDX_ContratCohabitation_IDAidant";
DROP INDEX IF EXISTS public."WDIDX_ContactUrgence_Telephone";
DROP INDEX IF EXISTS public."WDIDX_ContactUrgence_IDSeniors";
DROP INDEX IF EXISTS public."WDIDX_ContactUrgence_Email";
DROP INDEX IF EXISTS public."WDIDX_Competences_Metier";
DROP INDEX IF EXISTS public."WDIDX_Competences_IDDomaine";
DROP INDEX IF EXISTS public."WDIDX_Competences_CodeMetier";
DROP INDEX IF EXISTS public."WDIDX_Commande_IDMoyenPaiement";
DROP INDEX IF EXISTS public."WDIDX_CatUtilisateurs_EstTuteur";
DROP INDEX IF EXISTS public."WDIDX_CatUtilisateurs_EstSenior";
DROP INDEX IF EXISTS public."WDIDX_CatUtilisateurs_EstOrganisme";
DROP INDEX IF EXISTS public."WDIDX_CatUtilisateurs_EstModerateur";
DROP INDEX IF EXISTS public."WDIDX_CatUtilisateurs_EstAidant";
DROP INDEX IF EXISTS public."WDIDX_CatUtilisateurs_EstAdministrateur";
DROP INDEX IF EXISTS public."WDIDX_CandidatureAidant_IDBesoinSenior";
DROP INDEX IF EXISTS public."WDIDX_CandidatureAidant_IDAidant";
DROP INDEX IF EXISTS public."WDIDX_CagnotteDeces_IDSeniors";
DROP INDEX IF EXISTS public."WDIDX_BonPlan_Utilisateurs_IDUtilisateurs";
DROP INDEX IF EXISTS public."WDIDX_BonPlan_Utilisateurs_IDBonPlan_IDUtilisateurs";
DROP INDEX IF EXISTS public."WDIDX_BonPlan_Utilisateurs_IDBonPlan";
DROP INDEX IF EXISTS public."WDIDX_BonPlan_IDPartenaire";
DROP INDEX IF EXISTS public."WDIDX_BesoinSenior_IDSeniors";
DROP INDEX IF EXISTS public."WDIDX_AssuranceDeces_IDSeniors";
DROP INDEX IF EXISTS public."WDIDX_Aidant_IDUtilisateurs";
DROP INDEX IF EXISTS public."WDIDX_Aidant_Competences_IDCompetences";
DROP INDEX IF EXISTS public."WDIDX_Aidant_Competences_IDAidant_IDCompetences";
DROP INDEX IF EXISTS public."WDIDX_Aidant_Competences_IDAidant";
DROP INDEX IF EXISTS public."WDIDX_Agenda_IDSeniors";
DROP INDEX IF EXISTS public."WDIDX_ActiviteRemuneree_IDSeniors";
DROP INDEX IF EXISTS auth.users_is_anonymous_idx;
DROP INDEX IF EXISTS auth.users_instance_id_idx;
DROP INDEX IF EXISTS auth.users_instance_id_email_idx;
DROP INDEX IF EXISTS auth.users_email_partial_key;
DROP INDEX IF EXISTS auth.user_id_created_at_idx;
DROP INDEX IF EXISTS auth.unique_phone_factor_per_user;
DROP INDEX IF EXISTS auth.sso_providers_resource_id_idx;
DROP INDEX IF EXISTS auth.sso_domains_sso_provider_id_idx;
DROP INDEX IF EXISTS auth.sso_domains_domain_idx;
DROP INDEX IF EXISTS auth.sessions_user_id_idx;
DROP INDEX IF EXISTS auth.sessions_not_after_idx;
DROP INDEX IF EXISTS auth.saml_relay_states_sso_provider_id_idx;
DROP INDEX IF EXISTS auth.saml_relay_states_for_email_idx;
DROP INDEX IF EXISTS auth.saml_relay_states_created_at_idx;
DROP INDEX IF EXISTS auth.saml_providers_sso_provider_id_idx;
DROP INDEX IF EXISTS auth.refresh_tokens_updated_at_idx;
DROP INDEX IF EXISTS auth.refresh_tokens_session_id_revoked_idx;
DROP INDEX IF EXISTS auth.refresh_tokens_parent_idx;
DROP INDEX IF EXISTS auth.refresh_tokens_instance_id_user_id_idx;
DROP INDEX IF EXISTS auth.refresh_tokens_instance_id_idx;
DROP INDEX IF EXISTS auth.recovery_token_idx;
DROP INDEX IF EXISTS auth.reauthentication_token_idx;
DROP INDEX IF EXISTS auth.one_time_tokens_user_id_token_type_key;
DROP INDEX IF EXISTS auth.one_time_tokens_token_hash_hash_idx;
DROP INDEX IF EXISTS auth.one_time_tokens_relates_to_hash_idx;
DROP INDEX IF EXISTS auth.mfa_factors_user_id_idx;
DROP INDEX IF EXISTS auth.mfa_factors_user_friendly_name_unique;
DROP INDEX IF EXISTS auth.mfa_challenge_created_at_idx;
DROP INDEX IF EXISTS auth.idx_user_id_auth_method;
DROP INDEX IF EXISTS auth.idx_auth_code;
DROP INDEX IF EXISTS auth.identities_user_id_idx;
DROP INDEX IF EXISTS auth.identities_email_idx;
DROP INDEX IF EXISTS auth.flow_state_created_at_idx;
DROP INDEX IF EXISTS auth.factor_id_created_at_idx;
DROP INDEX IF EXISTS auth.email_change_token_new_idx;
DROP INDEX IF EXISTS auth.email_change_token_current_idx;
DROP INDEX IF EXISTS auth.confirmation_token_idx;
DROP INDEX IF EXISTS auth.audit_logs_instance_id_idx;
DROP INDEX IF EXISTS _realtime.tenants_external_id_index;
DROP INDEX IF EXISTS _realtime.extensions_tenant_external_id_type_index;
DROP INDEX IF EXISTS _realtime.extensions_tenant_external_id_index;
ALTER TABLE IF EXISTS ONLY supabase_migrations.schema_migrations DROP CONSTRAINT IF EXISTS schema_migrations_pkey;
ALTER TABLE IF EXISTS ONLY supabase_migrations.schema_migrations DROP CONSTRAINT IF EXISTS schema_migrations_idempotency_key_key;
ALTER TABLE IF EXISTS ONLY supabase_functions.migrations DROP CONSTRAINT IF EXISTS migrations_pkey;
ALTER TABLE IF EXISTS ONLY supabase_functions.hooks DROP CONSTRAINT IF EXISTS hooks_pkey;
ALTER TABLE IF EXISTS ONLY storage.vector_indexes DROP CONSTRAINT IF EXISTS vector_indexes_pkey;
ALTER TABLE IF EXISTS ONLY storage.s3_multipart_uploads DROP CONSTRAINT IF EXISTS s3_multipart_uploads_pkey;
ALTER TABLE IF EXISTS ONLY storage.s3_multipart_uploads_parts DROP CONSTRAINT IF EXISTS s3_multipart_uploads_parts_pkey;
ALTER TABLE IF EXISTS ONLY storage.objects DROP CONSTRAINT IF EXISTS objects_pkey;
ALTER TABLE IF EXISTS ONLY storage.migrations DROP CONSTRAINT IF EXISTS migrations_pkey;
ALTER TABLE IF EXISTS ONLY storage.migrations DROP CONSTRAINT IF EXISTS migrations_name_key;
ALTER TABLE IF EXISTS ONLY storage.iceberg_tables DROP CONSTRAINT IF EXISTS iceberg_tables_pkey;
ALTER TABLE IF EXISTS ONLY storage.iceberg_namespaces DROP CONSTRAINT IF EXISTS iceberg_namespaces_pkey;
ALTER TABLE IF EXISTS ONLY storage.buckets_vectors DROP CONSTRAINT IF EXISTS buckets_vectors_pkey;
ALTER TABLE IF EXISTS ONLY storage.buckets DROP CONSTRAINT IF EXISTS buckets_pkey;
ALTER TABLE IF EXISTS ONLY storage.buckets_analytics DROP CONSTRAINT IF EXISTS buckets_analytics_pkey;
ALTER TABLE IF EXISTS ONLY realtime.schema_migrations DROP CONSTRAINT IF EXISTS schema_migrations_pkey;
ALTER TABLE IF EXISTS ONLY realtime.subscription DROP CONSTRAINT IF EXISTS pk_subscription;
ALTER TABLE IF EXISTS ONLY realtime.messages_2026_02_28 DROP CONSTRAINT IF EXISTS messages_2026_02_28_pkey;
ALTER TABLE IF EXISTS ONLY realtime.messages_2026_02_27 DROP CONSTRAINT IF EXISTS messages_2026_02_27_pkey;
ALTER TABLE IF EXISTS ONLY realtime.messages_2026_02_26 DROP CONSTRAINT IF EXISTS messages_2026_02_26_pkey;
ALTER TABLE IF EXISTS ONLY realtime.messages_2026_02_25 DROP CONSTRAINT IF EXISTS messages_2026_02_25_pkey;
ALTER TABLE IF EXISTS ONLY realtime.messages_2026_02_24 DROP CONSTRAINT IF EXISTS messages_2026_02_24_pkey;
ALTER TABLE IF EXISTS ONLY realtime.messages_2026_02_23 DROP CONSTRAINT IF EXISTS messages_2026_02_23_pkey;
ALTER TABLE IF EXISTS ONLY realtime.messages DROP CONSTRAINT IF EXISTS messages_pkey;
ALTER TABLE IF EXISTS ONLY public."VersementCommissions" DROP CONSTRAINT IF EXISTS "VersementCommissions_pkey";
ALTER TABLE IF EXISTS ONLY public."Utilisateurs" DROP CONSTRAINT IF EXISTS "Utilisateurs_pkey";
ALTER TABLE IF EXISTS ONLY public."TypePieces" DROP CONSTRAINT IF EXISTS "TypePieces_pkey";
ALTER TABLE IF EXISTS ONLY public."TypePieces" DROP CONSTRAINT IF EXISTS "TypePieces_Titre_key";
ALTER TABLE IF EXISTS ONLY public."TypeMaladie" DROP CONSTRAINT IF EXISTS "TypeMaladie_pkey";
ALTER TABLE IF EXISTS ONLY public."TypeMaladie" DROP CONSTRAINT IF EXISTS "TypeMaladie_TypeMaladie_key";
ALTER TABLE IF EXISTS ONLY public."TMessage" DROP CONSTRAINT IF EXISTS "TMessage_pkey";
ALTER TABLE IF EXISTS ONLY public."SupportClient" DROP CONSTRAINT IF EXISTS "SupportClient_pkey";
ALTER TABLE IF EXISTS ONLY public."SujetForum" DROP CONSTRAINT IF EXISTS "SujetForum_pkey";
ALTER TABLE IF EXISTS ONLY public."Structures" DROP CONSTRAINT IF EXISTS "Structures_pkey";
ALTER TABLE IF EXISTS ONLY public."Souvenir" DROP CONSTRAINT IF EXISTS "Souvenir_pkey";
ALTER TABLE IF EXISTS ONLY public."SignalementContenu" DROP CONSTRAINT IF EXISTS "SignalementContenu_pkey";
ALTER TABLE IF EXISTS ONLY public."ServicePostMortem" DROP CONSTRAINT IF EXISTS "ServicePostMortem_pkey";
ALTER TABLE IF EXISTS ONLY public."ServicePartenaire" DROP CONSTRAINT IF EXISTS "ServicePartenaire_pkey";
ALTER TABLE IF EXISTS ONLY public."Seniors" DROP CONSTRAINT IF EXISTS "Seniors_pkey";
ALTER TABLE IF EXISTS ONLY public."Ressource" DROP CONSTRAINT IF EXISTS "Ressource_pkey";
ALTER TABLE IF EXISTS ONLY public."ReponsesSupport" DROP CONSTRAINT IF EXISTS "ReponsesSupport_pkey";
ALTER TABLE IF EXISTS ONLY public."ReponseForum" DROP CONSTRAINT IF EXISTS "ReponseForum_pkey";
ALTER TABLE IF EXISTS ONLY public."RendezVousMedical" DROP CONSTRAINT IF EXISTS "RendezVousMedical_pkey";
ALTER TABLE IF EXISTS ONLY public."RapportMensuel" DROP CONSTRAINT IF EXISTS "RapportMensuel_pkey";
ALTER TABLE IF EXISTS ONLY public."Produit" DROP CONSTRAINT IF EXISTS "Produit_pkey";
ALTER TABLE IF EXISTS ONLY public."Prestation" DROP CONSTRAINT IF EXISTS "Prestation_pkey";
ALTER TABLE IF EXISTS ONLY public."PrestationSupport" DROP CONSTRAINT IF EXISTS "PrestationSupport_pkey";
ALTER TABLE IF EXISTS ONLY public."PrestationAidant" DROP CONSTRAINT IF EXISTS "PrestationAidant_pkey";
ALTER TABLE IF EXISTS ONLY public."Pieces" DROP CONSTRAINT IF EXISTS "Pieces_pkey";
ALTER TABLE IF EXISTS ONLY public."Partenaire" DROP CONSTRAINT IF EXISTS "Partenaire_pkey";
ALTER TABLE IF EXISTS ONLY public."Partenaire" DROP CONSTRAINT IF EXISTS "Partenaire_RaisonSociale_key";
ALTER TABLE IF EXISTS ONLY public."Parametres" DROP CONSTRAINT IF EXISTS "Parametres_pkey";
ALTER TABLE IF EXISTS ONLY public."ParametresCommission" DROP CONSTRAINT IF EXISTS "ParametresCommission_pkey";
ALTER TABLE IF EXISTS ONLY public."ParametresCommission" DROP CONSTRAINT IF EXISTS "ParametresCommission_TypeTransaction_key";
ALTER TABLE IF EXISTS ONLY public."Organisme" DROP CONSTRAINT IF EXISTS "Organisme_pkey";
ALTER TABLE IF EXISTS ONLY public."OffreSenior" DROP CONSTRAINT IF EXISTS "OffreSenior_pkey";
ALTER TABLE IF EXISTS ONLY public."ObjetPrete" DROP CONSTRAINT IF EXISTS "ObjetPrete_pkey";
ALTER TABLE IF EXISTS ONLY public."Notifications" DROP CONSTRAINT IF EXISTS "Notifications_pkey";
ALTER TABLE IF EXISTS ONLY public."MoyenPaiement" DROP CONSTRAINT IF EXISTS "MoyenPaiement_pkey";
ALTER TABLE IF EXISTS ONLY public."MiseEnRelation" DROP CONSTRAINT IF EXISTS "MiseEnRelation_pkey";
ALTER TABLE IF EXISTS ONLY public."MiseEnRelation_Prestation" DROP CONSTRAINT IF EXISTS "MiseEnRelation_Prestation_pkey";
ALTER TABLE IF EXISTS ONLY public."MessageGroupe" DROP CONSTRAINT IF EXISTS "MessageGroupe_pkey";
ALTER TABLE IF EXISTS ONLY public."Medicament" DROP CONSTRAINT IF EXISTS "Medicament_pkey";
ALTER TABLE IF EXISTS ONLY public."LogementSenior" DROP CONSTRAINT IF EXISTS "LogementSenior_pkey";
ALTER TABLE IF EXISTS ONLY public."Localisation" DROP CONSTRAINT IF EXISTS "Localisation_pkey";
ALTER TABLE IF EXISTS ONLY public."LienPartenariat" DROP CONSTRAINT IF EXISTS "LienPartenariat_pkey";
ALTER TABLE IF EXISTS ONLY public."Langue" DROP CONSTRAINT IF EXISTS "Langue_pkey";
ALTER TABLE IF EXISTS ONLY public."Langue" DROP CONSTRAINT IF EXISTS "Langue_Titre_key";
ALTER TABLE IF EXISTS ONLY public."Humeur" DROP CONSTRAINT IF EXISTS "Humeur_pkey";
ALTER TABLE IF EXISTS ONLY public."HistoriqueInteractions" DROP CONSTRAINT IF EXISTS "HistoriqueInteractions_pkey";
ALTER TABLE IF EXISTS ONLY public."HistoriqueConnexion" DROP CONSTRAINT IF EXISTS "HistoriqueConnexion_pkey";
ALTER TABLE IF EXISTS ONLY public."Groupe" DROP CONSTRAINT IF EXISTS "Groupe_pkey";
ALTER TABLE IF EXISTS ONLY public."Forum" DROP CONSTRAINT IF EXISTS "Forum_pkey";
ALTER TABLE IF EXISTS ONLY public."Facture" DROP CONSTRAINT IF EXISTS "Facture_pkey";
ALTER TABLE IF EXISTS ONLY public."Evenements" DROP CONSTRAINT IF EXISTS "Evenements_pkey";
ALTER TABLE IF EXISTS ONLY public."Evaluation" DROP CONSTRAINT IF EXISTS "Evaluation_pkey";
ALTER TABLE IF EXISTS ONLY public."EvaluationCohabitation" DROP CONSTRAINT IF EXISTS "EvaluationCohabitation_pkey";
ALTER TABLE IF EXISTS ONLY public."EquipementMedical" DROP CONSTRAINT IF EXISTS "EquipementMedical_pkey";
ALTER TABLE IF EXISTS ONLY public."DonCagnotte" DROP CONSTRAINT IF EXISTS "DonCagnotte_pkey";
ALTER TABLE IF EXISTS ONLY public."Domaine" DROP CONSTRAINT IF EXISTS "Domaine_pkey";
ALTER TABLE IF EXISTS ONLY public."Domaine" DROP CONSTRAINT IF EXISTS "Domaine_DomaineTitre_key";
ALTER TABLE IF EXISTS ONLY public."Document" DROP CONSTRAINT IF EXISTS "Document_pkey";
ALTER TABLE IF EXISTS ONLY public."DocumentRGPD" DROP CONSTRAINT IF EXISTS "DocumentRGPD_pkey";
ALTER TABLE IF EXISTS ONLY public."DocumentPatrimonial" DROP CONSTRAINT IF EXISTS "DocumentPatrimonial_pkey";
ALTER TABLE IF EXISTS ONLY public."DirectivesAnticipees" DROP CONSTRAINT IF EXISTS "DirectivesAnticipees_pkey";
ALTER TABLE IF EXISTS ONLY public."Devise" DROP CONSTRAINT IF EXISTS "Devise_pkey";
ALTER TABLE IF EXISTS ONLY public."Devise" DROP CONSTRAINT IF EXISTS "Devise_Titre_key";
ALTER TABLE IF EXISTS ONLY public."DemandeRGPD" DROP CONSTRAINT IF EXISTS "DemandeRGPD_pkey";
ALTER TABLE IF EXISTS ONLY public."ContratCohabitation" DROP CONSTRAINT IF EXISTS "ContratCohabitation_pkey";
ALTER TABLE IF EXISTS ONLY public."ContactUrgence" DROP CONSTRAINT IF EXISTS "ContactUrgence_pkey";
ALTER TABLE IF EXISTS ONLY public."ConsentementCookies" DROP CONSTRAINT IF EXISTS "ConsentementCookies_pkey";
ALTER TABLE IF EXISTS ONLY public."Competences" DROP CONSTRAINT IF EXISTS "Competences_pkey";
ALTER TABLE IF EXISTS ONLY public."Commande" DROP CONSTRAINT IF EXISTS "Commande_pkey";
ALTER TABLE IF EXISTS ONLY public."CategorieRessource" DROP CONSTRAINT IF EXISTS "CategorieRessource_pkey";
ALTER TABLE IF EXISTS ONLY public."CategorieOrganisme" DROP CONSTRAINT IF EXISTS "CategorieOrganisme_pkey";
ALTER TABLE IF EXISTS ONLY public."CategorieDocument" DROP CONSTRAINT IF EXISTS "CategorieDocument_pkey";
ALTER TABLE IF EXISTS ONLY public."CategorieDocument" DROP CONSTRAINT IF EXISTS "CategorieDocument_NomCategorie_key";
ALTER TABLE IF EXISTS ONLY public."CatUtilisateurs" DROP CONSTRAINT IF EXISTS "CatUtilisateurs_pkey";
ALTER TABLE IF EXISTS ONLY public."CandidatureAidant" DROP CONSTRAINT IF EXISTS "CandidatureAidant_pkey";
ALTER TABLE IF EXISTS ONLY public."CagnotteDeces" DROP CONSTRAINT IF EXISTS "CagnotteDeces_pkey";
ALTER TABLE IF EXISTS ONLY public."BonPlan" DROP CONSTRAINT IF EXISTS "BonPlan_pkey";
ALTER TABLE IF EXISTS ONLY public."BonPlan" DROP CONSTRAINT IF EXISTS "BonPlan_CodePromo_key";
ALTER TABLE IF EXISTS ONLY public."BesoinSenior" DROP CONSTRAINT IF EXISTS "BesoinSenior_pkey";
ALTER TABLE IF EXISTS ONLY public."AssuranceDeces" DROP CONSTRAINT IF EXISTS "AssuranceDeces_pkey";
ALTER TABLE IF EXISTS ONLY public."Aidant" DROP CONSTRAINT IF EXISTS "Aidant_pkey";
ALTER TABLE IF EXISTS ONLY public."Agenda" DROP CONSTRAINT IF EXISTS "Agenda_pkey";
ALTER TABLE IF EXISTS ONLY public."ActiviteRemuneree" DROP CONSTRAINT IF EXISTS "ActiviteRemuneree_pkey";
ALTER TABLE IF EXISTS ONLY auth.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY auth.users DROP CONSTRAINT IF EXISTS users_phone_key;
ALTER TABLE IF EXISTS ONLY auth.sso_providers DROP CONSTRAINT IF EXISTS sso_providers_pkey;
ALTER TABLE IF EXISTS ONLY auth.sso_domains DROP CONSTRAINT IF EXISTS sso_domains_pkey;
ALTER TABLE IF EXISTS ONLY auth.sessions DROP CONSTRAINT IF EXISTS sessions_pkey;
ALTER TABLE IF EXISTS ONLY auth.schema_migrations DROP CONSTRAINT IF EXISTS schema_migrations_pkey;
ALTER TABLE IF EXISTS ONLY auth.saml_relay_states DROP CONSTRAINT IF EXISTS saml_relay_states_pkey;
ALTER TABLE IF EXISTS ONLY auth.saml_providers DROP CONSTRAINT IF EXISTS saml_providers_pkey;
ALTER TABLE IF EXISTS ONLY auth.saml_providers DROP CONSTRAINT IF EXISTS saml_providers_entity_id_key;
ALTER TABLE IF EXISTS ONLY auth.refresh_tokens DROP CONSTRAINT IF EXISTS refresh_tokens_token_unique;
ALTER TABLE IF EXISTS ONLY auth.refresh_tokens DROP CONSTRAINT IF EXISTS refresh_tokens_pkey;
ALTER TABLE IF EXISTS ONLY auth.one_time_tokens DROP CONSTRAINT IF EXISTS one_time_tokens_pkey;
ALTER TABLE IF EXISTS ONLY auth.mfa_factors DROP CONSTRAINT IF EXISTS mfa_factors_pkey;
ALTER TABLE IF EXISTS ONLY auth.mfa_factors DROP CONSTRAINT IF EXISTS mfa_factors_last_challenged_at_key;
ALTER TABLE IF EXISTS ONLY auth.mfa_challenges DROP CONSTRAINT IF EXISTS mfa_challenges_pkey;
ALTER TABLE IF EXISTS ONLY auth.mfa_amr_claims DROP CONSTRAINT IF EXISTS mfa_amr_claims_session_id_authentication_method_pkey;
ALTER TABLE IF EXISTS ONLY auth.instances DROP CONSTRAINT IF EXISTS instances_pkey;
ALTER TABLE IF EXISTS ONLY auth.identities DROP CONSTRAINT IF EXISTS identities_provider_id_provider_unique;
ALTER TABLE IF EXISTS ONLY auth.identities DROP CONSTRAINT IF EXISTS identities_pkey;
ALTER TABLE IF EXISTS ONLY auth.flow_state DROP CONSTRAINT IF EXISTS flow_state_pkey;
ALTER TABLE IF EXISTS ONLY auth.audit_log_entries DROP CONSTRAINT IF EXISTS audit_log_entries_pkey;
ALTER TABLE IF EXISTS ONLY auth.mfa_amr_claims DROP CONSTRAINT IF EXISTS amr_id_pk;
ALTER TABLE IF EXISTS ONLY _realtime.tenants DROP CONSTRAINT IF EXISTS tenants_pkey;
ALTER TABLE IF EXISTS ONLY _realtime.schema_migrations DROP CONSTRAINT IF EXISTS schema_migrations_pkey;
ALTER TABLE IF EXISTS ONLY _realtime.extensions DROP CONSTRAINT IF EXISTS extensions_pkey;
ALTER TABLE IF EXISTS supabase_functions.hooks ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public."VersementCommissions" ALTER COLUMN "IDVersementCommissions" DROP DEFAULT;
ALTER TABLE IF EXISTS public."Utilisateurs" ALTER COLUMN "IDUtilisateurs" DROP DEFAULT;
ALTER TABLE IF EXISTS public."TypePieces" ALTER COLUMN "IDTypePieces" DROP DEFAULT;
ALTER TABLE IF EXISTS public."TypeMaladie" ALTER COLUMN "IDTypeMaladie" DROP DEFAULT;
ALTER TABLE IF EXISTS public."TMessage" ALTER COLUMN "IDTMessage" DROP DEFAULT;
ALTER TABLE IF EXISTS public."SupportClient" ALTER COLUMN "IDTicketClient" DROP DEFAULT;
ALTER TABLE IF EXISTS public."SujetForum" ALTER COLUMN "IDSujetForum" DROP DEFAULT;
ALTER TABLE IF EXISTS public."Structures" ALTER COLUMN "IDStructures" DROP DEFAULT;
ALTER TABLE IF EXISTS public."Souvenir" ALTER COLUMN "IDSouvenir" DROP DEFAULT;
ALTER TABLE IF EXISTS public."SignalementContenu" ALTER COLUMN "IDSignalement" DROP DEFAULT;
ALTER TABLE IF EXISTS public."ServicePostMortem" ALTER COLUMN "IDServicePostMortem" DROP DEFAULT;
ALTER TABLE IF EXISTS public."ServicePartenaire" ALTER COLUMN "IDServicePartenaire" DROP DEFAULT;
ALTER TABLE IF EXISTS public."Seniors" ALTER COLUMN "IDSeniors" DROP DEFAULT;
ALTER TABLE IF EXISTS public."Ressource" ALTER COLUMN "IDRessource" DROP DEFAULT;
ALTER TABLE IF EXISTS public."ReponsesSupport" ALTER COLUMN "IDReponse" DROP DEFAULT;
ALTER TABLE IF EXISTS public."ReponseForum" ALTER COLUMN "IDReponseForum" DROP DEFAULT;
ALTER TABLE IF EXISTS public."RendezVousMedical" ALTER COLUMN "IDRendezVousMedical" DROP DEFAULT;
ALTER TABLE IF EXISTS public."RapportMensuel" ALTER COLUMN "IDRapportMensuel" DROP DEFAULT;
ALTER TABLE IF EXISTS public."Produit" ALTER COLUMN "IDProduit" DROP DEFAULT;
ALTER TABLE IF EXISTS public."PrestationSupport" ALTER COLUMN "IDPrestationSupport" DROP DEFAULT;
ALTER TABLE IF EXISTS public."PrestationAidant" ALTER COLUMN "IDPrestationAidant" DROP DEFAULT;
ALTER TABLE IF EXISTS public."Prestation" ALTER COLUMN "IDPrestation" DROP DEFAULT;
ALTER TABLE IF EXISTS public."Pieces" ALTER COLUMN "IDPieces" DROP DEFAULT;
ALTER TABLE IF EXISTS public."Partenaire" ALTER COLUMN "IDPartenaire" DROP DEFAULT;
ALTER TABLE IF EXISTS public."ParametresCommission" ALTER COLUMN "IDParametreCommission" DROP DEFAULT;
ALTER TABLE IF EXISTS public."Parametres" ALTER COLUMN "IDParametres" DROP DEFAULT;
ALTER TABLE IF EXISTS public."Organisme" ALTER COLUMN "IDOrganisme" DROP DEFAULT;
ALTER TABLE IF EXISTS public."OffreSenior" ALTER COLUMN "IDOffreSenior" DROP DEFAULT;
ALTER TABLE IF EXISTS public."ObjetPrete" ALTER COLUMN "IDObjetPrete" DROP DEFAULT;
ALTER TABLE IF EXISTS public."Notifications" ALTER COLUMN "IDNotifications" DROP DEFAULT;
ALTER TABLE IF EXISTS public."MoyenPaiement" ALTER COLUMN "IDMoyenPaiement" DROP DEFAULT;
ALTER TABLE IF EXISTS public."MiseEnRelation_Prestation" ALTER COLUMN "IDMiseEnRelation_IDPrestation" DROP DEFAULT;
ALTER TABLE IF EXISTS public."MiseEnRelation" ALTER COLUMN "IDMiseEnRelation" DROP DEFAULT;
ALTER TABLE IF EXISTS public."MessageGroupe" ALTER COLUMN "IDMessageGroupe" DROP DEFAULT;
ALTER TABLE IF EXISTS public."Medicament" ALTER COLUMN "IDMedicament" DROP DEFAULT;
ALTER TABLE IF EXISTS public."LogementSenior" ALTER COLUMN "IDLogementSenior" DROP DEFAULT;
ALTER TABLE IF EXISTS public."Localisation" ALTER COLUMN "IDLocalisation" DROP DEFAULT;
ALTER TABLE IF EXISTS public."LienPartenariat" ALTER COLUMN "IDLienPartenariat" DROP DEFAULT;
ALTER TABLE IF EXISTS public."Langue" ALTER COLUMN "IDLangue" DROP DEFAULT;
ALTER TABLE IF EXISTS public."Humeur" ALTER COLUMN "IDHumeur" DROP DEFAULT;
ALTER TABLE IF EXISTS public."HistoriqueInteractions" ALTER COLUMN "IDHistoriqueInteractions" DROP DEFAULT;
ALTER TABLE IF EXISTS public."HistoriqueConnexion" ALTER COLUMN "IDHistoriqueConnexion" DROP DEFAULT;
ALTER TABLE IF EXISTS public."Groupe" ALTER COLUMN "IDGroupe" DROP DEFAULT;
ALTER TABLE IF EXISTS public."Forum" ALTER COLUMN "IDForum" DROP DEFAULT;
ALTER TABLE IF EXISTS public."Facture" ALTER COLUMN "IDFacture" DROP DEFAULT;
ALTER TABLE IF EXISTS public."Evenements" ALTER COLUMN "IDEvenements" DROP DEFAULT;
ALTER TABLE IF EXISTS public."EvaluationCohabitation" ALTER COLUMN "IDEvaluationCohabitation" DROP DEFAULT;
ALTER TABLE IF EXISTS public."Evaluation" ALTER COLUMN "IDEvaluation" DROP DEFAULT;
ALTER TABLE IF EXISTS public."EquipementMedical" ALTER COLUMN "IDEquipementMedical" DROP DEFAULT;
ALTER TABLE IF EXISTS public."DonCagnotte" ALTER COLUMN "IDDonCagnotte" DROP DEFAULT;
ALTER TABLE IF EXISTS public."Domaine" ALTER COLUMN "IDDomaine" DROP DEFAULT;
ALTER TABLE IF EXISTS public."DocumentRGPD" ALTER COLUMN "IDDocumentRGPD" DROP DEFAULT;
ALTER TABLE IF EXISTS public."DocumentPatrimonial" ALTER COLUMN "IDDocumentPatrimonial" DROP DEFAULT;
ALTER TABLE IF EXISTS public."Document" ALTER COLUMN "IDDocument" DROP DEFAULT;
ALTER TABLE IF EXISTS public."DirectivesAnticipees" ALTER COLUMN "IDDirectivesAnticipees" DROP DEFAULT;
ALTER TABLE IF EXISTS public."Devise" ALTER COLUMN "IDDevise" DROP DEFAULT;
ALTER TABLE IF EXISTS public."DemandeRGPD" ALTER COLUMN "IDDemandeRGPD" DROP DEFAULT;
ALTER TABLE IF EXISTS public."ContratCohabitation" ALTER COLUMN "IDContratCohabitation" DROP DEFAULT;
ALTER TABLE IF EXISTS public."ContactUrgence" ALTER COLUMN "IDContactUrgence" DROP DEFAULT;
ALTER TABLE IF EXISTS public."ConsentementCookies" ALTER COLUMN "IDConsentement" DROP DEFAULT;
ALTER TABLE IF EXISTS public."Competences" ALTER COLUMN "IDCompetences" DROP DEFAULT;
ALTER TABLE IF EXISTS public."Commande" ALTER COLUMN "IDCommande" DROP DEFAULT;
ALTER TABLE IF EXISTS public."CategorieRessource" ALTER COLUMN "IDCategorieRessource" DROP DEFAULT;
ALTER TABLE IF EXISTS public."CategorieOrganisme" ALTER COLUMN "IDCategorieOrganisme" DROP DEFAULT;
ALTER TABLE IF EXISTS public."CategorieDocument" ALTER COLUMN "IDCategorieDocument" DROP DEFAULT;
ALTER TABLE IF EXISTS public."CatUtilisateurs" ALTER COLUMN "IDCatUtilisateurs" DROP DEFAULT;
ALTER TABLE IF EXISTS public."CandidatureAidant" ALTER COLUMN "IDCandidatureAidant" DROP DEFAULT;
ALTER TABLE IF EXISTS public."CagnotteDeces" ALTER COLUMN "IDCagnotteDeces" DROP DEFAULT;
ALTER TABLE IF EXISTS public."BonPlan" ALTER COLUMN "IDBonPlan" DROP DEFAULT;
ALTER TABLE IF EXISTS public."BesoinSenior" ALTER COLUMN "IDBesoinSenior" DROP DEFAULT;
ALTER TABLE IF EXISTS public."AssuranceDeces" ALTER COLUMN "IDAssuranceDeces" DROP DEFAULT;
ALTER TABLE IF EXISTS public."Aidant" ALTER COLUMN "IDAidant" DROP DEFAULT;
ALTER TABLE IF EXISTS public."Agenda" ALTER COLUMN "IDAgenda" DROP DEFAULT;
ALTER TABLE IF EXISTS public."ActiviteRemuneree" ALTER COLUMN "IDActiviteRemuneree" DROP DEFAULT;
ALTER TABLE IF EXISTS auth.refresh_tokens ALTER COLUMN id DROP DEFAULT;
DROP TABLE IF EXISTS supabase_migrations.schema_migrations;
DROP TABLE IF EXISTS supabase_functions.migrations;
DROP SEQUENCE IF EXISTS supabase_functions.hooks_id_seq;
DROP TABLE IF EXISTS supabase_functions.hooks;
DROP TABLE IF EXISTS storage.vector_indexes;
DROP TABLE IF EXISTS storage.s3_multipart_uploads_parts;
DROP TABLE IF EXISTS storage.s3_multipart_uploads;
DROP TABLE IF EXISTS storage.objects;
DROP TABLE IF EXISTS storage.migrations;
DROP TABLE IF EXISTS storage.iceberg_tables;
DROP TABLE IF EXISTS storage.iceberg_namespaces;
DROP TABLE IF EXISTS storage.buckets_vectors;
DROP TABLE IF EXISTS storage.buckets_analytics;
DROP TABLE IF EXISTS storage.buckets;
DROP TABLE IF EXISTS realtime.subscription;
DROP TABLE IF EXISTS realtime.schema_migrations;
DROP TABLE IF EXISTS realtime.messages_2026_02_28;
DROP TABLE IF EXISTS realtime.messages_2026_02_27;
DROP TABLE IF EXISTS realtime.messages_2026_02_26;
DROP TABLE IF EXISTS realtime.messages_2026_02_25;
DROP TABLE IF EXISTS realtime.messages_2026_02_24;
DROP TABLE IF EXISTS realtime.messages_2026_02_23;
DROP TABLE IF EXISTS realtime.messages;
DROP VIEW IF EXISTS public.v_group_messages_moderation;
DROP VIEW IF EXISTS public.v_forum_posts_stats;
DROP VIEW IF EXISTS public.v_forum_posts_moderation;
DROP VIEW IF EXISTS public.v_financestransactions;
DROP VIEW IF EXISTS public.v_finances_transactions_admin;
DROP VIEW IF EXISTS public.v_activitesrecentes;
DROP VIEW IF EXISTS public.support_dashboard_view;
DROP VIEW IF EXISTS public.prestations_dashboard_view;
DROP SEQUENCE IF EXISTS public."VersementCommissions_IDVersementCommissions_seq";
DROP TABLE IF EXISTS public."VersementCommissions";
DROP TABLE IF EXISTS public."Utilisateurs_Localisation";
DROP SEQUENCE IF EXISTS public."Utilisateurs_IDUtilisateurs_seq";
DROP TABLE IF EXISTS public."Utilisateurs_Groupe";
DROP TABLE IF EXISTS public."Utilisateurs";
DROP SEQUENCE IF EXISTS public."TypePieces_IDTypePieces_seq";
DROP TABLE IF EXISTS public."TypePieces";
DROP SEQUENCE IF EXISTS public."TypeMaladie_IDTypeMaladie_seq";
DROP TABLE IF EXISTS public."TypeMaladie";
DROP SEQUENCE IF EXISTS public."TMessage_IDTMessage_seq";
DROP TABLE IF EXISTS public."TMessage";
DROP SEQUENCE IF EXISTS public."SupportClient_IDTicketClient_seq";
DROP TABLE IF EXISTS public."SupportClient";
DROP SEQUENCE IF EXISTS public."SujetForum_IDSujetForum_seq";
DROP TABLE IF EXISTS public."SujetForum";
DROP SEQUENCE IF EXISTS public."Structures_IDStructures_seq";
DROP TABLE IF EXISTS public."Structures";
DROP SEQUENCE IF EXISTS public."Souvenir_IDSouvenir_seq";
DROP TABLE IF EXISTS public."Souvenir";
DROP SEQUENCE IF EXISTS public."SignalementContenu_IDSignalement_seq";
DROP TABLE IF EXISTS public."SignalementContenu";
DROP SEQUENCE IF EXISTS public."ServicePostMortem_IDServicePostMortem_seq";
DROP TABLE IF EXISTS public."ServicePostMortem";
DROP SEQUENCE IF EXISTS public."ServicePartenaire_IDServicePartenaire_seq";
DROP TABLE IF EXISTS public."ServicePartenaire";
DROP TABLE IF EXISTS public."Seniors_TypeMaladie";
DROP SEQUENCE IF EXISTS public."Seniors_IDSeniors_seq";
DROP TABLE IF EXISTS public."Seniors";
DROP SEQUENCE IF EXISTS public."Ressource_IDRessource_seq";
DROP TABLE IF EXISTS public."Ressource";
DROP SEQUENCE IF EXISTS public."ReponsesSupport_IDReponse_seq";
DROP TABLE IF EXISTS public."ReponsesSupport";
DROP SEQUENCE IF EXISTS public."ReponseForum_IDReponseForum_seq";
DROP TABLE IF EXISTS public."ReponseForum";
DROP SEQUENCE IF EXISTS public."RendezVousMedical_IDRendezVousMedical_seq";
DROP TABLE IF EXISTS public."RendezVousMedical";
DROP SEQUENCE IF EXISTS public."RapportMensuel_IDRapportMensuel_seq";
DROP TABLE IF EXISTS public."RapportMensuel";
DROP SEQUENCE IF EXISTS public."Produit_IDProduit_seq";
DROP TABLE IF EXISTS public."Produit_Commande";
DROP TABLE IF EXISTS public."Produit";
DROP TABLE IF EXISTS public."Prestation_Localisation";
DROP SEQUENCE IF EXISTS public."Prestation_IDPrestation_seq";
DROP SEQUENCE IF EXISTS public."PrestationSupport_IDPrestationSupport_seq";
DROP TABLE IF EXISTS public."PrestationSupport";
DROP SEQUENCE IF EXISTS public."PrestationAidant_IDPrestationAidant_seq";
DROP TABLE IF EXISTS public."PrestationAidant";
DROP TABLE IF EXISTS public."Prestation";
DROP SEQUENCE IF EXISTS public."Pieces_IDPieces_seq";
DROP TABLE IF EXISTS public."Pieces";
DROP TABLE IF EXISTS public."Partenaire_Services";
DROP SEQUENCE IF EXISTS public."Partenaire_IDPartenaire_seq";
DROP TABLE IF EXISTS public."Partenaire";
DROP SEQUENCE IF EXISTS public."Parametres_IDParametres_seq";
DROP SEQUENCE IF EXISTS public."ParametresCommission_IDParametreCommission_seq";
DROP TABLE IF EXISTS public."ParametresCommission";
DROP TABLE IF EXISTS public."Parametres";
DROP SEQUENCE IF EXISTS public."Organisme_IDOrganisme_seq";
DROP TABLE IF EXISTS public."Organisme";
DROP SEQUENCE IF EXISTS public."OffreSenior_IDOffreSenior_seq";
DROP TABLE IF EXISTS public."OffreSenior";
DROP SEQUENCE IF EXISTS public."ObjetPrete_IDObjetPrete_seq";
DROP TABLE IF EXISTS public."ObjetPrete";
DROP SEQUENCE IF EXISTS public."Notifications_IDNotifications_seq";
DROP TABLE IF EXISTS public."Notifications";
DROP SEQUENCE IF EXISTS public."MoyenPaiement_IDMoyenPaiement_seq";
DROP TABLE IF EXISTS public."MoyenPaiement";
DROP SEQUENCE IF EXISTS public."MiseEnRelation_Prestation_IDMiseEnRelation_IDPrestation_seq";
DROP TABLE IF EXISTS public."MiseEnRelation_Prestation";
DROP SEQUENCE IF EXISTS public."MiseEnRelation_IDMiseEnRelation_seq";
DROP TABLE IF EXISTS public."MiseEnRelation";
DROP SEQUENCE IF EXISTS public."MessageGroupe_IDMessageGroupe_seq";
DROP TABLE IF EXISTS public."MessageGroupe";
DROP SEQUENCE IF EXISTS public."Medicament_IDMedicament_seq";
DROP TABLE IF EXISTS public."Medicament";
DROP SEQUENCE IF EXISTS public."LogementSenior_IDLogementSenior_seq";
DROP TABLE IF EXISTS public."LogementSenior";
DROP SEQUENCE IF EXISTS public."Localisation_IDLocalisation_seq";
DROP TABLE IF EXISTS public."Localisation";
DROP SEQUENCE IF EXISTS public."LienPartenariat_IDLienPartenariat_seq";
DROP TABLE IF EXISTS public."LienPartenariat";
DROP TABLE IF EXISTS public."Langue_Utilisateurs";
DROP SEQUENCE IF EXISTS public."Langue_IDLangue_seq";
DROP TABLE IF EXISTS public."Langue";
DROP SEQUENCE IF EXISTS public."Humeur_IDHumeur_seq";
DROP TABLE IF EXISTS public."Humeur";
DROP SEQUENCE IF EXISTS public."HistoriqueInteractions_IDHistoriqueInteractions_seq";
DROP TABLE IF EXISTS public."HistoriqueInteractions";
DROP SEQUENCE IF EXISTS public."HistoriqueConnexion_IDHistoriqueConnexion_seq";
DROP TABLE IF EXISTS public."HistoriqueConnexion";
DROP SEQUENCE IF EXISTS public."Groupe_IDGroupe_seq";
DROP TABLE IF EXISTS public."Groupe";
DROP SEQUENCE IF EXISTS public."Forum_IDForum_seq";
DROP TABLE IF EXISTS public."Forum";
DROP SEQUENCE IF EXISTS public."Facture_IDFacture_seq";
DROP TABLE IF EXISTS public."Facture";
DROP SEQUENCE IF EXISTS public."Evenements_IDEvenements_seq";
DROP TABLE IF EXISTS public."Evenements";
DROP SEQUENCE IF EXISTS public."Evaluation_IDEvaluation_seq";
DROP SEQUENCE IF EXISTS public."EvaluationCohabitation_IDEvaluationCohabitation_seq";
DROP TABLE IF EXISTS public."EvaluationCohabitation";
DROP TABLE IF EXISTS public."Evaluation";
DROP SEQUENCE IF EXISTS public."EquipementMedical_IDEquipementMedical_seq";
DROP TABLE IF EXISTS public."EquipementMedical";
DROP SEQUENCE IF EXISTS public."DonCagnotte_IDDonCagnotte_seq";
DROP TABLE IF EXISTS public."DonCagnotte";
DROP SEQUENCE IF EXISTS public."Domaine_IDDomaine_seq";
DROP TABLE IF EXISTS public."Domaine";
DROP SEQUENCE IF EXISTS public."Document_IDDocument_seq";
DROP SEQUENCE IF EXISTS public."DocumentRGPD_IDDocumentRGPD_seq";
DROP TABLE IF EXISTS public."DocumentRGPD";
DROP SEQUENCE IF EXISTS public."DocumentPatrimonial_IDDocumentPatrimonial_seq";
DROP TABLE IF EXISTS public."DocumentPatrimonial";
DROP TABLE IF EXISTS public."Document";
DROP SEQUENCE IF EXISTS public."DirectivesAnticipees_IDDirectivesAnticipees_seq";
DROP TABLE IF EXISTS public."DirectivesAnticipees";
DROP TABLE IF EXISTS public."Devise_Utilisateurs";
DROP SEQUENCE IF EXISTS public."Devise_IDDevise_seq";
DROP TABLE IF EXISTS public."Devise";
DROP SEQUENCE IF EXISTS public."DemandeRGPD_IDDemandeRGPD_seq";
DROP TABLE IF EXISTS public."DemandeRGPD";
DROP SEQUENCE IF EXISTS public."ContratCohabitation_IDContratCohabitation_seq";
DROP TABLE IF EXISTS public."ContratCohabitation";
DROP SEQUENCE IF EXISTS public."ContactUrgence_IDContactUrgence_seq";
DROP TABLE IF EXISTS public."ContactUrgence";
DROP SEQUENCE IF EXISTS public."ConsentementCookies_IDConsentement_seq";
DROP TABLE IF EXISTS public."ConsentementCookies";
DROP SEQUENCE IF EXISTS public."Competences_IDCompetences_seq";
DROP TABLE IF EXISTS public."Competences";
DROP SEQUENCE IF EXISTS public."Commande_IDCommande_seq";
DROP TABLE IF EXISTS public."Commande";
DROP SEQUENCE IF EXISTS public."CategorieRessource_IDCategorieRessource_seq";
DROP TABLE IF EXISTS public."CategorieRessource";
DROP SEQUENCE IF EXISTS public."CategorieOrganisme_IDCategorieOrganisme_seq";
DROP TABLE IF EXISTS public."CategorieOrganisme";
DROP SEQUENCE IF EXISTS public."CategorieDocument_IDCategorieDocument_seq";
DROP TABLE IF EXISTS public."CategorieDocument";
DROP SEQUENCE IF EXISTS public."CatUtilisateurs_IDCatUtilisateurs_seq";
DROP TABLE IF EXISTS public."CatUtilisateurs";
DROP SEQUENCE IF EXISTS public."CandidatureAidant_IDCandidatureAidant_seq";
DROP TABLE IF EXISTS public."CandidatureAidant";
DROP SEQUENCE IF EXISTS public."CagnotteDeces_IDCagnotteDeces_seq";
DROP TABLE IF EXISTS public."CagnotteDeces";
DROP TABLE IF EXISTS public."BonPlan_Utilisateurs";
DROP SEQUENCE IF EXISTS public."BonPlan_IDBonPlan_seq";
DROP TABLE IF EXISTS public."BonPlan";
DROP SEQUENCE IF EXISTS public."BesoinSenior_IDBesoinSenior_seq";
DROP TABLE IF EXISTS public."BesoinSenior";
DROP SEQUENCE IF EXISTS public."AssuranceDeces_IDAssuranceDeces_seq";
DROP TABLE IF EXISTS public."AssuranceDeces";
DROP SEQUENCE IF EXISTS public."Aidant_IDAidant_seq";
DROP TABLE IF EXISTS public."Aidant_Competences";
DROP TABLE IF EXISTS public."Aidant";
DROP SEQUENCE IF EXISTS public."Agenda_IDAgenda_seq";
DROP TABLE IF EXISTS public."Agenda";
DROP TABLE IF EXISTS public."ActiviteRemuneree_Utilisateurs";
DROP SEQUENCE IF EXISTS public."ActiviteRemuneree_IDActiviteRemuneree_seq";
DROP TABLE IF EXISTS public."ActiviteRemuneree";
DROP TABLE IF EXISTS auth.users;
DROP TABLE IF EXISTS auth.sso_providers;
DROP TABLE IF EXISTS auth.sso_domains;
DROP TABLE IF EXISTS auth.sessions;
DROP TABLE IF EXISTS auth.schema_migrations;
DROP TABLE IF EXISTS auth.saml_relay_states;
DROP TABLE IF EXISTS auth.saml_providers;
DROP SEQUENCE IF EXISTS auth.refresh_tokens_id_seq;
DROP TABLE IF EXISTS auth.refresh_tokens;
DROP TABLE IF EXISTS auth.one_time_tokens;
DROP TABLE IF EXISTS auth.mfa_factors;
DROP TABLE IF EXISTS auth.mfa_challenges;
DROP TABLE IF EXISTS auth.mfa_amr_claims;
DROP TABLE IF EXISTS auth.instances;
DROP TABLE IF EXISTS auth.identities;
DROP TABLE IF EXISTS auth.flow_state;
DROP TABLE IF EXISTS auth.audit_log_entries;
DROP TABLE IF EXISTS _realtime.tenants;
DROP TABLE IF EXISTS _realtime.schema_migrations;
DROP TABLE IF EXISTS _realtime.extensions;
DROP FUNCTION IF EXISTS supabase_functions.http_request();
DROP FUNCTION IF EXISTS storage.update_updated_at_column();
DROP FUNCTION IF EXISTS storage.search_v2(prefix text, bucket_name text, limits integer, levels integer, start_after text, sort_order text, sort_column text, sort_column_after text);
DROP FUNCTION IF EXISTS storage.search_by_timestamp(p_prefix text, p_bucket_id text, p_limit integer, p_level integer, p_start_after text, p_sort_order text, p_sort_column text, p_sort_column_after text);
DROP FUNCTION IF EXISTS storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text);
DROP FUNCTION IF EXISTS storage.protect_delete();
DROP FUNCTION IF EXISTS storage.operation();
DROP FUNCTION IF EXISTS storage.list_objects_with_delimiter(_bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text, sort_order text);
DROP FUNCTION IF EXISTS storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text);
DROP FUNCTION IF EXISTS storage.get_size_by_bucket();
DROP FUNCTION IF EXISTS storage.get_common_prefix(p_key text, p_prefix text, p_delimiter text);
DROP FUNCTION IF EXISTS storage.foldername(name text);
DROP FUNCTION IF EXISTS storage.filename(name text);
DROP FUNCTION IF EXISTS storage.extension(name text);
DROP FUNCTION IF EXISTS storage.enforce_bucket_name_length();
DROP FUNCTION IF EXISTS storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb);
DROP FUNCTION IF EXISTS realtime.topic();
DROP FUNCTION IF EXISTS realtime.to_regrole(role_name text);
DROP FUNCTION IF EXISTS realtime.subscription_check_filters();
DROP FUNCTION IF EXISTS realtime.send(payload jsonb, event text, topic text, private boolean);
DROP FUNCTION IF EXISTS realtime.quote_wal2json(entity regclass);
DROP FUNCTION IF EXISTS realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer);
DROP FUNCTION IF EXISTS realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]);
DROP FUNCTION IF EXISTS realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text);
DROP FUNCTION IF EXISTS realtime."cast"(val text, type_ regtype);
DROP FUNCTION IF EXISTS realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]);
DROP FUNCTION IF EXISTS realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text);
DROP FUNCTION IF EXISTS realtime.apply_rls(wal jsonb, max_record_bytes integer);
DROP FUNCTION IF EXISTS public.update_expired_cagnottes();
DROP FUNCTION IF EXISTS public.update_cagnotte_status();
DROP FUNCTION IF EXISTS public.update_cagnotte_montant_total();
DROP FUNCTION IF EXISTS public.set_initial_cagnotte_status();
DROP FUNCTION IF EXISTS public.insert_into_seniors_or_aidant();
DROP FUNCTION IF EXISTS public.get_admin_dashboard_stats();
DROP FUNCTION IF EXISTS public.create_commission_from_postmortem();
DROP FUNCTION IF EXISTS public.create_commission_from_commande();
DROP FUNCTION IF EXISTS public.create_commission_from_activite();
DROP FUNCTION IF EXISTS pgbouncer.get_auth(p_usename text);
DROP FUNCTION IF EXISTS extensions.set_graphql_placeholder();
DROP FUNCTION IF EXISTS extensions.pgrst_drop_watch();
DROP FUNCTION IF EXISTS extensions.pgrst_ddl_watch();
DROP FUNCTION IF EXISTS extensions.grant_pg_net_access();
DROP FUNCTION IF EXISTS extensions.grant_pg_graphql_access();
DROP FUNCTION IF EXISTS extensions.grant_pg_cron_access();
DROP FUNCTION IF EXISTS auth.uid();
DROP FUNCTION IF EXISTS auth.role();
DROP FUNCTION IF EXISTS auth.jwt();
DROP FUNCTION IF EXISTS auth.email();
DROP TYPE IF EXISTS storage.buckettype;
DROP TYPE IF EXISTS realtime.wal_rls;
DROP TYPE IF EXISTS realtime.wal_column;
DROP TYPE IF EXISTS realtime.user_defined_filter;
DROP TYPE IF EXISTS realtime.equality_op;
DROP TYPE IF EXISTS realtime.action;
DROP TYPE IF EXISTS auth.one_time_token_type;
DROP TYPE IF EXISTS auth.factor_type;
DROP TYPE IF EXISTS auth.factor_status;
DROP TYPE IF EXISTS auth.code_challenge_method;
DROP TYPE IF EXISTS auth.aal_level;
DROP EXTENSION IF EXISTS "uuid-ossp";
DROP EXTENSION IF EXISTS supabase_vault;
DROP EXTENSION IF EXISTS pgcrypto;
DROP EXTENSION IF EXISTS pg_stat_statements;
DROP EXTENSION IF EXISTS pg_graphql;
DROP SCHEMA IF EXISTS vault;
DROP SCHEMA IF EXISTS supabase_migrations;
DROP SCHEMA IF EXISTS supabase_functions;
DROP SCHEMA IF EXISTS storage;
DROP SCHEMA IF EXISTS realtime;
DROP SCHEMA IF EXISTS pgbouncer;
DROP EXTENSION IF EXISTS pg_net;
DROP SCHEMA IF EXISTS graphql_public;
DROP SCHEMA IF EXISTS graphql;
DROP SCHEMA IF EXISTS extensions;
DROP SCHEMA IF EXISTS auth;
DROP SCHEMA IF EXISTS _realtime;
--
-- Name: _realtime; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA _realtime;


ALTER SCHEMA _realtime OWNER TO postgres;

--
-- Name: auth; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA auth;


ALTER SCHEMA auth OWNER TO supabase_admin;

--
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA extensions;


ALTER SCHEMA extensions OWNER TO postgres;

--
-- Name: graphql; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql;


ALTER SCHEMA graphql OWNER TO supabase_admin;

--
-- Name: graphql_public; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql_public;


ALTER SCHEMA graphql_public OWNER TO supabase_admin;

--
-- Name: pg_net; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;


--
-- Name: EXTENSION pg_net; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_net IS 'Async HTTP';


--
-- Name: pgbouncer; Type: SCHEMA; Schema: -; Owner: pgbouncer
--

CREATE SCHEMA pgbouncer;


ALTER SCHEMA pgbouncer OWNER TO pgbouncer;

--
-- Name: realtime; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA realtime;


ALTER SCHEMA realtime OWNER TO supabase_admin;

--
-- Name: storage; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA storage;


ALTER SCHEMA storage OWNER TO supabase_admin;

--
-- Name: supabase_functions; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA supabase_functions;


ALTER SCHEMA supabase_functions OWNER TO supabase_admin;

--
-- Name: supabase_migrations; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA supabase_migrations;


ALTER SCHEMA supabase_migrations OWNER TO postgres;

--
-- Name: vault; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA vault;


ALTER SCHEMA vault OWNER TO supabase_admin;

--
-- Name: pg_graphql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_graphql WITH SCHEMA graphql;


--
-- Name: EXTENSION pg_graphql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_graphql IS 'pg_graphql: GraphQL support';


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA extensions;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: supabase_vault; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault;


--
-- Name: EXTENSION supabase_vault; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION supabase_vault IS 'Supabase Vault Extension';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: aal_level; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.aal_level AS ENUM (
    'aal1',
    'aal2',
    'aal3'
);


ALTER TYPE auth.aal_level OWNER TO supabase_auth_admin;

--
-- Name: code_challenge_method; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.code_challenge_method AS ENUM (
    's256',
    'plain'
);


ALTER TYPE auth.code_challenge_method OWNER TO supabase_auth_admin;

--
-- Name: factor_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_status AS ENUM (
    'unverified',
    'verified'
);


ALTER TYPE auth.factor_status OWNER TO supabase_auth_admin;

--
-- Name: factor_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_type AS ENUM (
    'totp',
    'webauthn',
    'phone'
);


ALTER TYPE auth.factor_type OWNER TO supabase_auth_admin;

--
-- Name: one_time_token_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.one_time_token_type AS ENUM (
    'confirmation_token',
    'reauthentication_token',
    'recovery_token',
    'email_change_token_new',
    'email_change_token_current',
    'phone_change_token'
);


ALTER TYPE auth.one_time_token_type OWNER TO supabase_auth_admin;

--
-- Name: action; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.action AS ENUM (
    'INSERT',
    'UPDATE',
    'DELETE',
    'TRUNCATE',
    'ERROR'
);


ALTER TYPE realtime.action OWNER TO supabase_admin;

--
-- Name: equality_op; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.equality_op AS ENUM (
    'eq',
    'neq',
    'lt',
    'lte',
    'gt',
    'gte',
    'in'
);


ALTER TYPE realtime.equality_op OWNER TO supabase_admin;

--
-- Name: user_defined_filter; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.user_defined_filter AS (
	column_name text,
	op realtime.equality_op,
	value text
);


ALTER TYPE realtime.user_defined_filter OWNER TO supabase_admin;

--
-- Name: wal_column; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_column AS (
	name text,
	type_name text,
	type_oid oid,
	value jsonb,
	is_pkey boolean,
	is_selectable boolean
);


ALTER TYPE realtime.wal_column OWNER TO supabase_admin;

--
-- Name: wal_rls; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_rls AS (
	wal jsonb,
	is_rls_enabled boolean,
	subscription_ids uuid[],
	errors text[]
);


ALTER TYPE realtime.wal_rls OWNER TO supabase_admin;

--
-- Name: buckettype; Type: TYPE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TYPE storage.buckettype AS ENUM (
    'STANDARD',
    'ANALYTICS',
    'VECTOR'
);


ALTER TYPE storage.buckettype OWNER TO supabase_storage_admin;

--
-- Name: email(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.email() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.email', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')
  )::text
$$;


ALTER FUNCTION auth.email() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION email(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.email() IS 'Deprecated. Use auth.jwt() -> ''email'' instead.';


--
-- Name: jwt(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.jwt() RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select 
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb
$$;


ALTER FUNCTION auth.jwt() OWNER TO supabase_auth_admin;

--
-- Name: role(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.role() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.role', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role')
  )::text
$$;


ALTER FUNCTION auth.role() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION role(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.role() IS 'Deprecated. Use auth.jwt() -> ''role'' instead.';


--
-- Name: uid(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;


ALTER FUNCTION auth.uid() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION uid(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.uid() IS 'Deprecated. Use auth.jwt() -> ''sub'' instead.';


--
-- Name: grant_pg_cron_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_cron_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_cron'
  )
  THEN
    grant usage on schema cron to postgres with grant option;

    alter default privileges in schema cron grant all on tables to postgres with grant option;
    alter default privileges in schema cron grant all on functions to postgres with grant option;
    alter default privileges in schema cron grant all on sequences to postgres with grant option;

    alter default privileges for user supabase_admin in schema cron grant all
        on sequences to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on tables to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on functions to postgres with grant option;

    grant all privileges on all tables in schema cron to postgres with grant option;
    revoke all on table cron.job from postgres;
    grant select on table cron.job to postgres with grant option;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_cron_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_cron_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_cron_access() IS 'Grants access to pg_cron';


--
-- Name: grant_pg_graphql_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_graphql_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
DECLARE
    func_is_graphql_resolve bool;
BEGIN
    func_is_graphql_resolve = (
        SELECT n.proname = 'resolve'
        FROM pg_event_trigger_ddl_commands() AS ev
        LEFT JOIN pg_catalog.pg_proc AS n
        ON ev.objid = n.oid
    );

    IF func_is_graphql_resolve
    THEN
        -- Update public wrapper to pass all arguments through to the pg_graphql resolve func
        DROP FUNCTION IF EXISTS graphql_public.graphql;
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language sql
        as $$
            select graphql.resolve(
                query := query,
                variables := coalesce(variables, '{}'),
                "operationName" := "operationName",
                extensions := extensions
            );
        $$;

        -- This hook executes when `graphql.resolve` is created. That is not necessarily the last
        -- function in the extension so we need to grant permissions on existing entities AND
        -- update default permissions to any others that are created after `graphql.resolve`
        grant usage on schema graphql to postgres, anon, authenticated, service_role;
        grant select on all tables in schema graphql to postgres, anon, authenticated, service_role;
        grant execute on all functions in schema graphql to postgres, anon, authenticated, service_role;
        grant all on all sequences in schema graphql to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on tables to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on functions to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on sequences to postgres, anon, authenticated, service_role;

        -- Allow postgres role to allow granting usage on graphql and graphql_public schemas to custom roles
        grant usage on schema graphql_public to postgres with grant option;
        grant usage on schema graphql to postgres with grant option;
    END IF;

END;
$_$;


ALTER FUNCTION extensions.grant_pg_graphql_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_graphql_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_graphql_access() IS 'Grants access to pg_graphql';


--
-- Name: grant_pg_net_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_net_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_net'
  )
  THEN
    GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;

    ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
    ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;

    ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
    ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;

    REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
    REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;

    GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
    GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_net_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_net_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_net_access() IS 'Grants access to pg_net';


--
-- Name: pgrst_ddl_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_ddl_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
  LOOP
    IF cmd.command_tag IN (
      'CREATE SCHEMA', 'ALTER SCHEMA'
    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'
    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'
    , 'CREATE VIEW', 'ALTER VIEW'
    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'
    , 'CREATE FUNCTION', 'ALTER FUNCTION'
    , 'CREATE TRIGGER'
    , 'CREATE TYPE', 'ALTER TYPE'
    , 'CREATE RULE'
    , 'COMMENT'
    )
    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp
    AND cmd.schema_name is distinct from 'pg_temp'
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_ddl_watch() OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_drop_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
  LOOP
    IF obj.object_type IN (
      'schema'
    , 'table'
    , 'foreign table'
    , 'view'
    , 'materialized view'
    , 'function'
    , 'trigger'
    , 'type'
    , 'rule'
    )
    AND obj.is_temporary IS false -- no pg_temp objects
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_drop_watch() OWNER TO supabase_admin;

--
-- Name: set_graphql_placeholder(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.set_graphql_placeholder() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
    DECLARE
    graphql_is_dropped bool;
    BEGIN
    graphql_is_dropped = (
        SELECT ev.schema_name = 'graphql_public'
        FROM pg_event_trigger_dropped_objects() AS ev
        WHERE ev.schema_name = 'graphql_public'
    );

    IF graphql_is_dropped
    THEN
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language plpgsql
        as $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;
    END IF;

    END;
$_$;


ALTER FUNCTION extensions.set_graphql_placeholder() OWNER TO supabase_admin;

--
-- Name: FUNCTION set_graphql_placeholder(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.set_graphql_placeholder() IS 'Reintroduces placeholder function for graphql_public.graphql';


--
-- Name: get_auth(text); Type: FUNCTION; Schema: pgbouncer; Owner: supabase_admin
--

CREATE FUNCTION pgbouncer.get_auth(p_usename text) RETURNS TABLE(username text, password text)
    LANGUAGE plpgsql SECURITY DEFINER
    AS $_$
begin
    raise debug 'PgBouncer auth request: %', p_usename;

    return query
    select 
        rolname::text, 
        case when rolvaliduntil < now() 
            then null 
            else rolpassword::text 
        end 
    from pg_authid 
    where rolname=$1 and rolcanlogin;
end;
$_$;


ALTER FUNCTION pgbouncer.get_auth(p_usename text) OWNER TO supabase_admin;

--
-- Name: create_commission_from_activite(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.create_commission_from_activite() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    commission_percentage NUMERIC;
    commission_amount NUMERIC;
BEGIN
    -- Récupérer le pourcentage de commission depuis ParametresCommission
    SELECT "Pourcentage" INTO commission_percentage
    FROM "ParametresCommission"
    WHERE "TypeTransaction" = 'Activite';
    
    -- Si aucun pourcentage n'est trouvé, utiliser 5% par défaut
    IF commission_percentage IS NULL THEN
        commission_percentage := 5.0;
    END IF;
    
    -- Calculer le montant de la commission
    commission_amount := NEW."MontantRevenu" * (commission_percentage / 100);
    
    -- Insérer la commission dans VersementCommissions
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
$$;


ALTER FUNCTION public.create_commission_from_activite() OWNER TO postgres;

--
-- Name: create_commission_from_commande(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.create_commission_from_commande() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    commission_percentage NUMERIC;
    commission_amount NUMERIC;
BEGIN
    -- Récupérer le pourcentage de commission depuis ParametresCommission
    SELECT "Pourcentage" INTO commission_percentage
    FROM "ParametresCommission"
    WHERE "TypeTransaction" = 'Commande';
    
    -- Si aucun pourcentage n'est trouvé, utiliser 5% par défaut
    IF commission_percentage IS NULL THEN
        commission_percentage := 5.0;
    END IF;
    
    -- Calculer le montant de la commission
    commission_amount := NEW."MontantTotal" * (commission_percentage / 100);
    
    -- Insérer la commission dans VersementCommissions
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
$$;


ALTER FUNCTION public.create_commission_from_commande() OWNER TO postgres;

--
-- Name: create_commission_from_postmortem(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.create_commission_from_postmortem() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    commission_percentage NUMERIC;
    commission_amount NUMERIC;
BEGIN
    -- Récupérer le pourcentage de commission depuis ParametresCommission
    SELECT "Pourcentage" INTO commission_percentage
    FROM "ParametresCommission"
    WHERE "TypeTransaction" = 'PostMortem';
    
    -- Si aucun pourcentage n'est trouvé, utiliser 5% par défaut
    IF commission_percentage IS NULL THEN
        commission_percentage := 5.0;
    END IF;
    
    -- Calculer le montant de la commission
    commission_amount := NEW."MontantPrestation" * (commission_percentage / 100);
    
    -- Insérer la commission dans VersementCommissions
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
$$;


ALTER FUNCTION public.create_commission_from_postmortem() OWNER TO postgres;

--
-- Name: get_admin_dashboard_stats(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_admin_dashboard_stats() RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
  users_count integer;
  prestations_count integer;
  messages_count integer;
  reports_count integer;
  total_revenus numeric;
BEGIN
  -- On compte rapidement via les index
  SELECT count(*) INTO users_count FROM public."Utilisateurs";
  SELECT count(*) INTO prestations_count FROM public."Prestation";
  SELECT count(*) INTO messages_count FROM public."MessageGroupe";
  SELECT count(*) INTO reports_count FROM public."SignalementContenu";
  
  -- La base de données fait la somme elle-même (ultra rapide)
  SELECT COALESCE(sum("MontantCommission"), 0) INTO total_revenus FROM public."VersementCommissions";

  -- On renvoie un objet JSON propre
  RETURN json_build_object(
    'utilisateurs', users_count,
    'prestations', prestations_count,
    'messages', messages_count,
    'signalements', reports_count,
    'revenus', total_revenus
  );
END;
$$;


ALTER FUNCTION public.get_admin_dashboard_stats() OWNER TO postgres;

--
-- Name: insert_into_seniors_or_aidant(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.insert_into_seniors_or_aidant() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
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
$$;


ALTER FUNCTION public.insert_into_seniors_or_aidant() OWNER TO postgres;

--
-- Name: set_initial_cagnotte_status(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.set_initial_cagnotte_status() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- S'assurer que le statut initial est "ouverte"
    IF NEW."Statut" IS NULL OR NEW."Statut" = '' THEN
        NEW."Statut" = 'ouverte';
    END IF;
    
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.set_initial_cagnotte_status() OWNER TO postgres;

--
-- Name: update_cagnotte_montant_total(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_cagnotte_montant_total() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Ajouter le montant du don au total de la cagnotte
    UPDATE "CagnotteDeces"
    SET "MontantTotal" = "MontantTotal" + NEW."Montant"
    WHERE "IDCagnotteDeces" = NEW."IDCagnotteDeces";
    
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_cagnotte_montant_total() OWNER TO postgres;

--
-- Name: update_cagnotte_status(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_cagnotte_status() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Mettre à jour le statut en "en cours" quand un don est ajouté
    IF TG_OP = 'INSERT' THEN
        UPDATE "CagnotteDeces"
        SET "Statut" = 'en cours'
        WHERE "IDCagnotteDeces" = NEW."IDCagnotteDeces"
        AND "Statut" = 'ouverte';
        
        RETURN NEW;
    END IF;
    
    RETURN NULL;
END;
$$;


ALTER FUNCTION public.update_cagnotte_status() OWNER TO postgres;

--
-- Name: update_expired_cagnottes(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_expired_cagnottes() RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
    UPDATE "CagnotteDeces"
    SET "Statut" = 'terminée'
    WHERE "DateCloture" < CURRENT_DATE
    AND "Statut" IN ('ouverte', 'en cours');
END;
$$;


ALTER FUNCTION public.update_expired_cagnottes() OWNER TO postgres;

--
-- Name: apply_rls(jsonb, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer DEFAULT (1024 * 1024)) RETURNS SETOF realtime.wal_rls
    LANGUAGE plpgsql
    AS $$
declare
-- Regclass of the table e.g. public.notes
entity_ regclass = (quote_ident(wal ->> 'schema') || '.' || quote_ident(wal ->> 'table'))::regclass;

-- I, U, D, T: insert, update ...
action realtime.action = (
    case wal ->> 'action'
        when 'I' then 'INSERT'
        when 'U' then 'UPDATE'
        when 'D' then 'DELETE'
        else 'ERROR'
    end
);

-- Is row level security enabled for the table
is_rls_enabled bool = relrowsecurity from pg_class where oid = entity_;

subscriptions realtime.subscription[] = array_agg(subs)
    from
        realtime.subscription subs
    where
        subs.entity = entity_
        -- Filter by action early - only get subscriptions interested in this action
        -- action_filter column can be: '*' (all), 'INSERT', 'UPDATE', or 'DELETE'
        and (subs.action_filter = '*' or subs.action_filter = action::text);

-- Subscription vars
roles regrole[] = array_agg(distinct us.claims_role::text)
    from
        unnest(subscriptions) us;

working_role regrole;
claimed_role regrole;
claims jsonb;

subscription_id uuid;
subscription_has_access bool;
visible_to_subscription_ids uuid[] = '{}';

-- structured info for wal's columns
columns realtime.wal_column[];
-- previous identity values for update/delete
old_columns realtime.wal_column[];

error_record_exceeds_max_size boolean = octet_length(wal::text) > max_record_bytes;

-- Primary jsonb output for record
output jsonb;

begin
perform set_config('role', null, true);

columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'columns') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

old_columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'identity') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

for working_role in select * from unnest(roles) loop

    -- Update `is_selectable` for columns and old_columns
    columns =
        array_agg(
            (
                c.name,
                c.type_name,
                c.type_oid,
                c.value,
                c.is_pkey,
                pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
            )::realtime.wal_column
        )
        from
            unnest(columns) c;

    old_columns =
            array_agg(
                (
                    c.name,
                    c.type_name,
                    c.type_oid,
                    c.value,
                    c.is_pkey,
                    pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                )::realtime.wal_column
            )
            from
                unnest(old_columns) c;

    if action <> 'DELETE' and count(1) = 0 from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            -- subscriptions is already filtered by entity
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 400: Bad Request, no primary key']
        )::realtime.wal_rls;

    -- The claims role does not have SELECT permission to the primary key of entity
    elsif action <> 'DELETE' and sum(c.is_selectable::int) <> count(1) from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 401: Unauthorized']
        )::realtime.wal_rls;

    else
        output = jsonb_build_object(
            'schema', wal ->> 'schema',
            'table', wal ->> 'table',
            'type', action,
            'commit_timestamp', to_char(
                ((wal ->> 'timestamp')::timestamptz at time zone 'utc'),
                'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
            ),
            'columns', (
                select
                    jsonb_agg(
                        jsonb_build_object(
                            'name', pa.attname,
                            'type', pt.typname
                        )
                        order by pa.attnum asc
                    )
                from
                    pg_attribute pa
                    join pg_type pt
                        on pa.atttypid = pt.oid
                where
                    attrelid = entity_
                    and attnum > 0
                    and pg_catalog.has_column_privilege(working_role, entity_, pa.attname, 'SELECT')
            )
        )
        -- Add "record" key for insert and update
        || case
            when action in ('INSERT', 'UPDATE') then
                jsonb_build_object(
                    'record',
                    (
                        select
                            jsonb_object_agg(
                                -- if unchanged toast, get column name and value from old record
                                coalesce((c).name, (oc).name),
                                case
                                    when (c).name is null then (oc).value
                                    else (c).value
                                end
                            )
                        from
                            unnest(columns) c
                            full outer join unnest(old_columns) oc
                                on (c).name = (oc).name
                        where
                            coalesce((c).is_selectable, (oc).is_selectable)
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                    )
                )
            else '{}'::jsonb
        end
        -- Add "old_record" key for update and delete
        || case
            when action = 'UPDATE' then
                jsonb_build_object(
                        'old_record',
                        (
                            select jsonb_object_agg((c).name, (c).value)
                            from unnest(old_columns) c
                            where
                                (c).is_selectable
                                and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                        )
                    )
            when action = 'DELETE' then
                jsonb_build_object(
                    'old_record',
                    (
                        select jsonb_object_agg((c).name, (c).value)
                        from unnest(old_columns) c
                        where
                            (c).is_selectable
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                            and ( not is_rls_enabled or (c).is_pkey ) -- if RLS enabled, we can't secure deletes so filter to pkey
                    )
                )
            else '{}'::jsonb
        end;

        -- Create the prepared statement
        if is_rls_enabled and action <> 'DELETE' then
            if (select 1 from pg_prepared_statements where name = 'walrus_rls_stmt' limit 1) > 0 then
                deallocate walrus_rls_stmt;
            end if;
            execute realtime.build_prepared_statement_sql('walrus_rls_stmt', entity_, columns);
        end if;

        visible_to_subscription_ids = '{}';

        for subscription_id, claims in (
                select
                    subs.subscription_id,
                    subs.claims
                from
                    unnest(subscriptions) subs
                where
                    subs.entity = entity_
                    and subs.claims_role = working_role
                    and (
                        realtime.is_visible_through_filters(columns, subs.filters)
                        or (
                          action = 'DELETE'
                          and realtime.is_visible_through_filters(old_columns, subs.filters)
                        )
                    )
        ) loop

            if not is_rls_enabled or action = 'DELETE' then
                visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
            else
                -- Check if RLS allows the role to see the record
                perform
                    -- Trim leading and trailing quotes from working_role because set_config
                    -- doesn't recognize the role as valid if they are included
                    set_config('role', trim(both '"' from working_role::text), true),
                    set_config('request.jwt.claims', claims::text, true);

                execute 'execute walrus_rls_stmt' into subscription_has_access;

                if subscription_has_access then
                    visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
                end if;
            end if;
        end loop;

        perform set_config('role', null, true);

        return next (
            output,
            is_rls_enabled,
            visible_to_subscription_ids,
            case
                when error_record_exceeds_max_size then array['Error 413: Payload Too Large']
                else '{}'
            end
        )::realtime.wal_rls;

    end if;
end loop;

perform set_config('role', null, true);
end;
$$;


ALTER FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: broadcast_changes(text, text, text, text, text, record, record, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text DEFAULT 'ROW'::text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    -- Declare a variable to hold the JSONB representation of the row
    row_data jsonb := '{}'::jsonb;
BEGIN
    IF level = 'STATEMENT' THEN
        RAISE EXCEPTION 'function can only be triggered for each row, not for each statement';
    END IF;
    -- Check the operation type and handle accordingly
    IF operation = 'INSERT' OR operation = 'UPDATE' OR operation = 'DELETE' THEN
        row_data := jsonb_build_object('old_record', OLD, 'record', NEW, 'operation', operation, 'table', table_name, 'schema', table_schema);
        PERFORM realtime.send (row_data, event_name, topic_name);
    ELSE
        RAISE EXCEPTION 'Unexpected operation type: %', operation;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to process the row: %', SQLERRM;
END;

$$;


ALTER FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) OWNER TO supabase_admin;

--
-- Name: build_prepared_statement_sql(text, regclass, realtime.wal_column[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) RETURNS text
    LANGUAGE sql
    AS $$
      /*
      Builds a sql string that, if executed, creates a prepared statement to
      tests retrive a row from *entity* by its primary key columns.
      Example
          select realtime.build_prepared_statement_sql('public.notes', '{"id"}'::text[], '{"bigint"}'::text[])
      */
          select
      'prepare ' || prepared_statement_name || ' as
          select
              exists(
                  select
                      1
                  from
                      ' || entity || '
                  where
                      ' || string_agg(quote_ident(pkc.name) || '=' || quote_nullable(pkc.value #>> '{}') , ' and ') || '
              )'
          from
              unnest(columns) pkc
          where
              pkc.is_pkey
          group by
              entity
      $$;


ALTER FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) OWNER TO supabase_admin;

--
-- Name: cast(text, regtype); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime."cast"(val text, type_ regtype) RETURNS jsonb
    LANGUAGE plpgsql IMMUTABLE
    AS $$
declare
  res jsonb;
begin
  if type_::text = 'bytea' then
    return to_jsonb(val);
  end if;
  execute format('select to_jsonb(%L::'|| type_::text || ')', val) into res;
  return res;
end
$$;


ALTER FUNCTION realtime."cast"(val text, type_ regtype) OWNER TO supabase_admin;

--
-- Name: check_equality_op(realtime.equality_op, regtype, text, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE
    AS $$
      /*
      Casts *val_1* and *val_2* as type *type_* and check the *op* condition for truthiness
      */
      declare
          op_symbol text = (
              case
                  when op = 'eq' then '='
                  when op = 'neq' then '!='
                  when op = 'lt' then '<'
                  when op = 'lte' then '<='
                  when op = 'gt' then '>'
                  when op = 'gte' then '>='
                  when op = 'in' then '= any'
                  else 'UNKNOWN OP'
              end
          );
          res boolean;
      begin
          execute format(
              'select %L::'|| type_::text || ' ' || op_symbol
              || ' ( %L::'
              || (
                  case
                      when op = 'in' then type_::text || '[]'
                      else type_::text end
              )
              || ')', val_1, val_2) into res;
          return res;
      end;
      $$;


ALTER FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) OWNER TO supabase_admin;

--
-- Name: is_visible_through_filters(realtime.wal_column[], realtime.user_defined_filter[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) RETURNS boolean
    LANGUAGE sql IMMUTABLE
    AS $_$
    /*
    Should the record be visible (true) or filtered out (false) after *filters* are applied
    */
        select
            -- Default to allowed when no filters present
            $2 is null -- no filters. this should not happen because subscriptions has a default
            or array_length($2, 1) is null -- array length of an empty array is null
            or bool_and(
                coalesce(
                    realtime.check_equality_op(
                        op:=f.op,
                        type_:=coalesce(
                            col.type_oid::regtype, -- null when wal2json version <= 2.4
                            col.type_name::regtype
                        ),
                        -- cast jsonb to text
                        val_1:=col.value #>> '{}',
                        val_2:=f.value
                    ),
                    false -- if null, filter does not match
                )
            )
        from
            unnest(filters) f
            join unnest(columns) col
                on f.column_name = col.name;
    $_$;


ALTER FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) OWNER TO supabase_admin;

--
-- Name: list_changes(name, name, integer, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) RETURNS SETOF realtime.wal_rls
    LANGUAGE sql
    SET log_min_messages TO 'fatal'
    AS $$
      with pub as (
        select
          concat_ws(
            ',',
            case when bool_or(pubinsert) then 'insert' else null end,
            case when bool_or(pubupdate) then 'update' else null end,
            case when bool_or(pubdelete) then 'delete' else null end
          ) as w2j_actions,
          coalesce(
            string_agg(
              realtime.quote_wal2json(format('%I.%I', schemaname, tablename)::regclass),
              ','
            ) filter (where ppt.tablename is not null and ppt.tablename not like '% %'),
            ''
          ) w2j_add_tables
        from
          pg_publication pp
          left join pg_publication_tables ppt
            on pp.pubname = ppt.pubname
        where
          pp.pubname = publication
        group by
          pp.pubname
        limit 1
      ),
      w2j as (
        select
          x.*, pub.w2j_add_tables
        from
          pub,
          pg_logical_slot_get_changes(
            slot_name, null, max_changes,
            'include-pk', 'true',
            'include-transaction', 'false',
            'include-timestamp', 'true',
            'include-type-oids', 'true',
            'format-version', '2',
            'actions', pub.w2j_actions,
            'add-tables', pub.w2j_add_tables
          ) x
      )
      select
        xyz.wal,
        xyz.is_rls_enabled,
        xyz.subscription_ids,
        xyz.errors
      from
        w2j,
        realtime.apply_rls(
          wal := w2j.data::jsonb,
          max_record_bytes := max_record_bytes
        ) xyz(wal, is_rls_enabled, subscription_ids, errors)
      where
        w2j.w2j_add_tables <> ''
        and xyz.subscription_ids[1] is not null
    $$;


ALTER FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: quote_wal2json(regclass); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.quote_wal2json(entity regclass) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
      select
        (
          select string_agg('' || ch,'')
          from unnest(string_to_array(nsp.nspname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
        )
        || '.'
        || (
          select string_agg('' || ch,'')
          from unnest(string_to_array(pc.relname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
          )
      from
        pg_class pc
        join pg_namespace nsp
          on pc.relnamespace = nsp.oid
      where
        pc.oid = entity
    $$;


ALTER FUNCTION realtime.quote_wal2json(entity regclass) OWNER TO supabase_admin;

--
-- Name: send(jsonb, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean DEFAULT true) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
  generated_id uuid;
  final_payload jsonb;
BEGIN
  BEGIN
    -- Generate a new UUID for the id
    generated_id := gen_random_uuid();

    -- Check if payload has an 'id' key, if not, add the generated UUID
    IF payload ? 'id' THEN
      final_payload := payload;
    ELSE
      final_payload := jsonb_set(payload, '{id}', to_jsonb(generated_id));
    END IF;

    -- Set the topic configuration
    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);

    -- Attempt to insert the message
    INSERT INTO realtime.messages (id, payload, event, topic, private, extension)
    VALUES (generated_id, final_payload, event, topic, private, 'broadcast');
  EXCEPTION
    WHEN OTHERS THEN
      -- Capture and notify the error
      RAISE WARNING 'ErrorSendingBroadcastMessage: %', SQLERRM;
  END;
END;
$$;


ALTER FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) OWNER TO supabase_admin;

--
-- Name: subscription_check_filters(); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.subscription_check_filters() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    /*
    Validates that the user defined filters for a subscription:
    - refer to valid columns that the claimed role may access
    - values are coercable to the correct column type
    */
    declare
        col_names text[] = coalesce(
                array_agg(c.column_name order by c.ordinal_position),
                '{}'::text[]
            )
            from
                information_schema.columns c
            where
                format('%I.%I', c.table_schema, c.table_name)::regclass = new.entity
                and pg_catalog.has_column_privilege(
                    (new.claims ->> 'role'),
                    format('%I.%I', c.table_schema, c.table_name)::regclass,
                    c.column_name,
                    'SELECT'
                );
        filter realtime.user_defined_filter;
        col_type regtype;

        in_val jsonb;
    begin
        for filter in select * from unnest(new.filters) loop
            -- Filtered column is valid
            if not filter.column_name = any(col_names) then
                raise exception 'invalid column for filter %', filter.column_name;
            end if;

            -- Type is sanitized and safe for string interpolation
            col_type = (
                select atttypid::regtype
                from pg_catalog.pg_attribute
                where attrelid = new.entity
                      and attname = filter.column_name
            );
            if col_type is null then
                raise exception 'failed to lookup type for column %', filter.column_name;
            end if;

            -- Set maximum number of entries for in filter
            if filter.op = 'in'::realtime.equality_op then
                in_val = realtime.cast(filter.value, (col_type::text || '[]')::regtype);
                if coalesce(jsonb_array_length(in_val), 0) > 100 then
                    raise exception 'too many values for `in` filter. Maximum 100';
                end if;
            else
                -- raises an exception if value is not coercable to type
                perform realtime.cast(filter.value, col_type);
            end if;

        end loop;

        -- Apply consistent order to filters so the unique constraint on
        -- (subscription_id, entity, filters) can't be tricked by a different filter order
        new.filters = coalesce(
            array_agg(f order by f.column_name, f.op, f.value),
            '{}'
        ) from unnest(new.filters) f;

        return new;
    end;
    $$;


ALTER FUNCTION realtime.subscription_check_filters() OWNER TO supabase_admin;

--
-- Name: to_regrole(text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.to_regrole(role_name text) RETURNS regrole
    LANGUAGE sql IMMUTABLE
    AS $$ select role_name::regrole $$;


ALTER FUNCTION realtime.to_regrole(role_name text) OWNER TO supabase_admin;

--
-- Name: topic(); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.topic() RETURNS text
    LANGUAGE sql STABLE
    AS $$
select nullif(current_setting('realtime.topic', true), '')::text;
$$;


ALTER FUNCTION realtime.topic() OWNER TO supabase_realtime_admin;

--
-- Name: can_insert_object(text, text, uuid, jsonb); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO "storage"."objects" ("bucket_id", "name", "owner", "metadata") VALUES (bucketid, name, owner, metadata);
  -- hack to rollback the successful insert
  RAISE sqlstate 'PT200' using
  message = 'ROLLBACK',
  detail = 'rollback successful insert';
END
$$;


ALTER FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) OWNER TO supabase_storage_admin;

--
-- Name: enforce_bucket_name_length(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.enforce_bucket_name_length() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
    if length(new.name) > 100 then
        raise exception 'bucket name "%" is too long (% characters). Max is 100.', new.name, length(new.name);
    end if;
    return new;
end;
$$;


ALTER FUNCTION storage.enforce_bucket_name_length() OWNER TO supabase_storage_admin;

--
-- Name: extension(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.extension(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
_filename text;
BEGIN
	select string_to_array(name, '/') into _parts;
	select _parts[array_length(_parts,1)] into _filename;
	-- @todo return the last part instead of 2
	return reverse(split_part(reverse(_filename), '.', 1));
END
$$;


ALTER FUNCTION storage.extension(name text) OWNER TO supabase_storage_admin;

--
-- Name: filename(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.filename(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[array_length(_parts,1)];
END
$$;


ALTER FUNCTION storage.filename(name text) OWNER TO supabase_storage_admin;

--
-- Name: foldername(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.foldername(name text) RETURNS text[]
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[1:array_length(_parts,1)-1];
END
$$;


ALTER FUNCTION storage.foldername(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_common_prefix(text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_common_prefix(p_key text, p_prefix text, p_delimiter text) RETURNS text
    LANGUAGE sql IMMUTABLE
    AS $$
SELECT CASE
    WHEN position(p_delimiter IN substring(p_key FROM length(p_prefix) + 1)) > 0
    THEN left(p_key, length(p_prefix) + position(p_delimiter IN substring(p_key FROM length(p_prefix) + 1)))
    ELSE NULL
END;
$$;


ALTER FUNCTION storage.get_common_prefix(p_key text, p_prefix text, p_delimiter text) OWNER TO supabase_storage_admin;

--
-- Name: get_size_by_bucket(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_size_by_bucket() RETURNS TABLE(size bigint, bucket_id text)
    LANGUAGE plpgsql
    AS $$
BEGIN
    return query
        select sum((metadata->>'size')::int) as size, obj.bucket_id
        from "storage".objects as obj
        group by obj.bucket_id;
END
$$;


ALTER FUNCTION storage.get_size_by_bucket() OWNER TO supabase_storage_admin;

--
-- Name: list_multipart_uploads_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, next_key_token text DEFAULT ''::text, next_upload_token text DEFAULT ''::text) RETURNS TABLE(key text, id text, created_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(key COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                        substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1)))
                    ELSE
                        key
                END AS key, id, created_at
            FROM
                storage.s3_multipart_uploads
            WHERE
                bucket_id = $5 AND
                key ILIKE $1 || ''%'' AND
                CASE
                    WHEN $4 != '''' AND $6 = '''' THEN
                        CASE
                            WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                                substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                key COLLATE "C" > $4
                            END
                    ELSE
                        true
                END AND
                CASE
                    WHEN $6 != '''' THEN
                        id COLLATE "C" > $6
                    ELSE
                        true
                    END
            ORDER BY
                key COLLATE "C" ASC, created_at ASC) as e order by key COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_key_token, bucket_id, next_upload_token;
END;
$_$;


ALTER FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text) OWNER TO supabase_storage_admin;

--
-- Name: list_objects_with_delimiter(text, text, text, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_objects_with_delimiter(_bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, start_after text DEFAULT ''::text, next_token text DEFAULT ''::text, sort_order text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, metadata jsonb, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone)
    LANGUAGE plpgsql STABLE
    AS $_$
DECLARE
    v_peek_name TEXT;
    v_current RECORD;
    v_common_prefix TEXT;

    -- Configuration
    v_is_asc BOOLEAN;
    v_prefix TEXT;
    v_start TEXT;
    v_upper_bound TEXT;
    v_file_batch_size INT;

    -- Seek state
    v_next_seek TEXT;
    v_count INT := 0;

    -- Dynamic SQL for batch query only
    v_batch_query TEXT;

BEGIN
    -- ========================================================================
    -- INITIALIZATION
    -- ========================================================================
    v_is_asc := lower(coalesce(sort_order, 'asc')) = 'asc';
    v_prefix := coalesce(prefix_param, '');
    v_start := CASE WHEN coalesce(next_token, '') <> '' THEN next_token ELSE coalesce(start_after, '') END;
    v_file_batch_size := LEAST(GREATEST(max_keys * 2, 100), 1000);

    -- Calculate upper bound for prefix filtering (bytewise, using COLLATE "C")
    IF v_prefix = '' THEN
        v_upper_bound := NULL;
    ELSIF right(v_prefix, 1) = delimiter_param THEN
        v_upper_bound := left(v_prefix, -1) || chr(ascii(delimiter_param) + 1);
    ELSE
        v_upper_bound := left(v_prefix, -1) || chr(ascii(right(v_prefix, 1)) + 1);
    END IF;

    -- Build batch query (dynamic SQL - called infrequently, amortized over many rows)
    IF v_is_asc THEN
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" >= $2 ' ||
                'AND o.name COLLATE "C" < $3 ORDER BY o.name COLLATE "C" ASC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" >= $2 ' ||
                'ORDER BY o.name COLLATE "C" ASC LIMIT $4';
        END IF;
    ELSE
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" < $2 ' ||
                'AND o.name COLLATE "C" >= $3 ORDER BY o.name COLLATE "C" DESC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" < $2 ' ||
                'ORDER BY o.name COLLATE "C" DESC LIMIT $4';
        END IF;
    END IF;

    -- ========================================================================
    -- SEEK INITIALIZATION: Determine starting position
    -- ========================================================================
    IF v_start = '' THEN
        IF v_is_asc THEN
            v_next_seek := v_prefix;
        ELSE
            -- DESC without cursor: find the last item in range
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_next_seek FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_prefix AND o.name COLLATE "C" < v_upper_bound
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSIF v_prefix <> '' THEN
                SELECT o.name INTO v_next_seek FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_prefix
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSE
                SELECT o.name INTO v_next_seek FROM storage.objects o
                WHERE o.bucket_id = _bucket_id
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            END IF;

            IF v_next_seek IS NOT NULL THEN
                v_next_seek := v_next_seek || delimiter_param;
            ELSE
                RETURN;
            END IF;
        END IF;
    ELSE
        -- Cursor provided: determine if it refers to a folder or leaf
        IF EXISTS (
            SELECT 1 FROM storage.objects o
            WHERE o.bucket_id = _bucket_id
              AND o.name COLLATE "C" LIKE v_start || delimiter_param || '%'
            LIMIT 1
        ) THEN
            -- Cursor refers to a folder
            IF v_is_asc THEN
                v_next_seek := v_start || chr(ascii(delimiter_param) + 1);
            ELSE
                v_next_seek := v_start || delimiter_param;
            END IF;
        ELSE
            -- Cursor refers to a leaf object
            IF v_is_asc THEN
                v_next_seek := v_start || delimiter_param;
            ELSE
                v_next_seek := v_start;
            END IF;
        END IF;
    END IF;

    -- ========================================================================
    -- MAIN LOOP: Hybrid peek-then-batch algorithm
    -- Uses STATIC SQL for peek (hot path) and DYNAMIC SQL for batch
    -- ========================================================================
    LOOP
        EXIT WHEN v_count >= max_keys;

        -- STEP 1: PEEK using STATIC SQL (plan cached, very fast)
        IF v_is_asc THEN
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_next_seek AND o.name COLLATE "C" < v_upper_bound
                ORDER BY o.name COLLATE "C" ASC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_next_seek
                ORDER BY o.name COLLATE "C" ASC LIMIT 1;
            END IF;
        ELSE
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" < v_next_seek AND o.name COLLATE "C" >= v_prefix
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSIF v_prefix <> '' THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" < v_next_seek AND o.name COLLATE "C" >= v_prefix
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" < v_next_seek
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            END IF;
        END IF;

        EXIT WHEN v_peek_name IS NULL;

        -- STEP 2: Check if this is a FOLDER or FILE
        v_common_prefix := storage.get_common_prefix(v_peek_name, v_prefix, delimiter_param);

        IF v_common_prefix IS NOT NULL THEN
            -- FOLDER: Emit and skip to next folder (no heap access needed)
            name := rtrim(v_common_prefix, delimiter_param);
            id := NULL;
            updated_at := NULL;
            created_at := NULL;
            last_accessed_at := NULL;
            metadata := NULL;
            RETURN NEXT;
            v_count := v_count + 1;

            -- Advance seek past the folder range
            IF v_is_asc THEN
                v_next_seek := left(v_common_prefix, -1) || chr(ascii(delimiter_param) + 1);
            ELSE
                v_next_seek := v_common_prefix;
            END IF;
        ELSE
            -- FILE: Batch fetch using DYNAMIC SQL (overhead amortized over many rows)
            -- For ASC: upper_bound is the exclusive upper limit (< condition)
            -- For DESC: prefix is the inclusive lower limit (>= condition)
            FOR v_current IN EXECUTE v_batch_query USING _bucket_id, v_next_seek,
                CASE WHEN v_is_asc THEN COALESCE(v_upper_bound, v_prefix) ELSE v_prefix END, v_file_batch_size
            LOOP
                v_common_prefix := storage.get_common_prefix(v_current.name, v_prefix, delimiter_param);

                IF v_common_prefix IS NOT NULL THEN
                    -- Hit a folder: exit batch, let peek handle it
                    v_next_seek := v_current.name;
                    EXIT;
                END IF;

                -- Emit file
                name := v_current.name;
                id := v_current.id;
                updated_at := v_current.updated_at;
                created_at := v_current.created_at;
                last_accessed_at := v_current.last_accessed_at;
                metadata := v_current.metadata;
                RETURN NEXT;
                v_count := v_count + 1;

                -- Advance seek past this file
                IF v_is_asc THEN
                    v_next_seek := v_current.name || delimiter_param;
                ELSE
                    v_next_seek := v_current.name;
                END IF;

                EXIT WHEN v_count >= max_keys;
            END LOOP;
        END IF;
    END LOOP;
END;
$_$;


ALTER FUNCTION storage.list_objects_with_delimiter(_bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text, sort_order text) OWNER TO supabase_storage_admin;

--
-- Name: operation(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.operation() RETURNS text
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    RETURN current_setting('storage.operation', true);
END;
$$;


ALTER FUNCTION storage.operation() OWNER TO supabase_storage_admin;

--
-- Name: protect_delete(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.protect_delete() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Check if storage.allow_delete_query is set to 'true'
    IF COALESCE(current_setting('storage.allow_delete_query', true), 'false') != 'true' THEN
        RAISE EXCEPTION 'Direct deletion from storage tables is not allowed. Use the Storage API instead.'
            USING HINT = 'This prevents accidental data loss from orphaned objects.',
                  ERRCODE = '42501';
    END IF;
    RETURN NULL;
END;
$$;


ALTER FUNCTION storage.protect_delete() OWNER TO supabase_storage_admin;

--
-- Name: search(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
DECLARE
    v_peek_name TEXT;
    v_current RECORD;
    v_common_prefix TEXT;
    v_delimiter CONSTANT TEXT := '/';

    -- Configuration
    v_limit INT;
    v_prefix TEXT;
    v_prefix_lower TEXT;
    v_is_asc BOOLEAN;
    v_order_by TEXT;
    v_sort_order TEXT;
    v_upper_bound TEXT;
    v_file_batch_size INT;

    -- Dynamic SQL for batch query only
    v_batch_query TEXT;

    -- Seek state
    v_next_seek TEXT;
    v_count INT := 0;
    v_skipped INT := 0;
BEGIN
    -- ========================================================================
    -- INITIALIZATION
    -- ========================================================================
    v_limit := LEAST(coalesce(limits, 100), 1500);
    v_prefix := coalesce(prefix, '') || coalesce(search, '');
    v_prefix_lower := lower(v_prefix);
    v_is_asc := lower(coalesce(sortorder, 'asc')) = 'asc';
    v_file_batch_size := LEAST(GREATEST(v_limit * 2, 100), 1000);

    -- Validate sort column
    CASE lower(coalesce(sortcolumn, 'name'))
        WHEN 'name' THEN v_order_by := 'name';
        WHEN 'updated_at' THEN v_order_by := 'updated_at';
        WHEN 'created_at' THEN v_order_by := 'created_at';
        WHEN 'last_accessed_at' THEN v_order_by := 'last_accessed_at';
        ELSE v_order_by := 'name';
    END CASE;

    v_sort_order := CASE WHEN v_is_asc THEN 'asc' ELSE 'desc' END;

    -- ========================================================================
    -- NON-NAME SORTING: Use path_tokens approach (unchanged)
    -- ========================================================================
    IF v_order_by != 'name' THEN
        RETURN QUERY EXECUTE format(
            $sql$
            WITH folders AS (
                SELECT path_tokens[$1] AS folder
                FROM storage.objects
                WHERE objects.name ILIKE $2 || '%%'
                  AND bucket_id = $3
                  AND array_length(objects.path_tokens, 1) <> $1
                GROUP BY folder
                ORDER BY folder %s
            )
            (SELECT folder AS "name",
                   NULL::uuid AS id,
                   NULL::timestamptz AS updated_at,
                   NULL::timestamptz AS created_at,
                   NULL::timestamptz AS last_accessed_at,
                   NULL::jsonb AS metadata FROM folders)
            UNION ALL
            (SELECT path_tokens[$1] AS "name",
                   id, updated_at, created_at, last_accessed_at, metadata
             FROM storage.objects
             WHERE objects.name ILIKE $2 || '%%'
               AND bucket_id = $3
               AND array_length(objects.path_tokens, 1) = $1
             ORDER BY %I %s)
            LIMIT $4 OFFSET $5
            $sql$, v_sort_order, v_order_by, v_sort_order
        ) USING levels, v_prefix, bucketname, v_limit, offsets;
        RETURN;
    END IF;

    -- ========================================================================
    -- NAME SORTING: Hybrid skip-scan with batch optimization
    -- ========================================================================

    -- Calculate upper bound for prefix filtering
    IF v_prefix_lower = '' THEN
        v_upper_bound := NULL;
    ELSIF right(v_prefix_lower, 1) = v_delimiter THEN
        v_upper_bound := left(v_prefix_lower, -1) || chr(ascii(v_delimiter) + 1);
    ELSE
        v_upper_bound := left(v_prefix_lower, -1) || chr(ascii(right(v_prefix_lower, 1)) + 1);
    END IF;

    -- Build batch query (dynamic SQL - called infrequently, amortized over many rows)
    IF v_is_asc THEN
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" >= $2 ' ||
                'AND lower(o.name) COLLATE "C" < $3 ORDER BY lower(o.name) COLLATE "C" ASC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" >= $2 ' ||
                'ORDER BY lower(o.name) COLLATE "C" ASC LIMIT $4';
        END IF;
    ELSE
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" < $2 ' ||
                'AND lower(o.name) COLLATE "C" >= $3 ORDER BY lower(o.name) COLLATE "C" DESC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" < $2 ' ||
                'ORDER BY lower(o.name) COLLATE "C" DESC LIMIT $4';
        END IF;
    END IF;

    -- Initialize seek position
    IF v_is_asc THEN
        v_next_seek := v_prefix_lower;
    ELSE
        -- DESC: find the last item in range first (static SQL)
        IF v_upper_bound IS NOT NULL THEN
            SELECT o.name INTO v_peek_name FROM storage.objects o
            WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_prefix_lower AND lower(o.name) COLLATE "C" < v_upper_bound
            ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
        ELSIF v_prefix_lower <> '' THEN
            SELECT o.name INTO v_peek_name FROM storage.objects o
            WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_prefix_lower
            ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
        ELSE
            SELECT o.name INTO v_peek_name FROM storage.objects o
            WHERE o.bucket_id = bucketname
            ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
        END IF;

        IF v_peek_name IS NOT NULL THEN
            v_next_seek := lower(v_peek_name) || v_delimiter;
        ELSE
            RETURN;
        END IF;
    END IF;

    -- ========================================================================
    -- MAIN LOOP: Hybrid peek-then-batch algorithm
    -- Uses STATIC SQL for peek (hot path) and DYNAMIC SQL for batch
    -- ========================================================================
    LOOP
        EXIT WHEN v_count >= v_limit;

        -- STEP 1: PEEK using STATIC SQL (plan cached, very fast)
        IF v_is_asc THEN
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_next_seek AND lower(o.name) COLLATE "C" < v_upper_bound
                ORDER BY lower(o.name) COLLATE "C" ASC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_next_seek
                ORDER BY lower(o.name) COLLATE "C" ASC LIMIT 1;
            END IF;
        ELSE
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" < v_next_seek AND lower(o.name) COLLATE "C" >= v_prefix_lower
                ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
            ELSIF v_prefix_lower <> '' THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" < v_next_seek AND lower(o.name) COLLATE "C" >= v_prefix_lower
                ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" < v_next_seek
                ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
            END IF;
        END IF;

        EXIT WHEN v_peek_name IS NULL;

        -- STEP 2: Check if this is a FOLDER or FILE
        v_common_prefix := storage.get_common_prefix(lower(v_peek_name), v_prefix_lower, v_delimiter);

        IF v_common_prefix IS NOT NULL THEN
            -- FOLDER: Handle offset, emit if needed, skip to next folder
            IF v_skipped < offsets THEN
                v_skipped := v_skipped + 1;
            ELSE
                name := split_part(rtrim(storage.get_common_prefix(v_peek_name, v_prefix, v_delimiter), v_delimiter), v_delimiter, levels);
                id := NULL;
                updated_at := NULL;
                created_at := NULL;
                last_accessed_at := NULL;
                metadata := NULL;
                RETURN NEXT;
                v_count := v_count + 1;
            END IF;

            -- Advance seek past the folder range
            IF v_is_asc THEN
                v_next_seek := lower(left(v_common_prefix, -1)) || chr(ascii(v_delimiter) + 1);
            ELSE
                v_next_seek := lower(v_common_prefix);
            END IF;
        ELSE
            -- FILE: Batch fetch using DYNAMIC SQL (overhead amortized over many rows)
            -- For ASC: upper_bound is the exclusive upper limit (< condition)
            -- For DESC: prefix_lower is the inclusive lower limit (>= condition)
            FOR v_current IN EXECUTE v_batch_query
                USING bucketname, v_next_seek,
                    CASE WHEN v_is_asc THEN COALESCE(v_upper_bound, v_prefix_lower) ELSE v_prefix_lower END, v_file_batch_size
            LOOP
                v_common_prefix := storage.get_common_prefix(lower(v_current.name), v_prefix_lower, v_delimiter);

                IF v_common_prefix IS NOT NULL THEN
                    -- Hit a folder: exit batch, let peek handle it
                    v_next_seek := lower(v_current.name);
                    EXIT;
                END IF;

                -- Handle offset skipping
                IF v_skipped < offsets THEN
                    v_skipped := v_skipped + 1;
                ELSE
                    -- Emit file
                    name := split_part(v_current.name, v_delimiter, levels);
                    id := v_current.id;
                    updated_at := v_current.updated_at;
                    created_at := v_current.created_at;
                    last_accessed_at := v_current.last_accessed_at;
                    metadata := v_current.metadata;
                    RETURN NEXT;
                    v_count := v_count + 1;
                END IF;

                -- Advance seek past this file
                IF v_is_asc THEN
                    v_next_seek := lower(v_current.name) || v_delimiter;
                ELSE
                    v_next_seek := lower(v_current.name);
                END IF;

                EXIT WHEN v_count >= v_limit;
            END LOOP;
        END IF;
    END LOOP;
END;
$_$;


ALTER FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- Name: search_by_timestamp(text, text, integer, integer, text, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_by_timestamp(p_prefix text, p_bucket_id text, p_limit integer, p_level integer, p_start_after text, p_sort_order text, p_sort_column text, p_sort_column_after text) RETURNS TABLE(key text, name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
DECLARE
    v_cursor_op text;
    v_query text;
    v_prefix text;
BEGIN
    v_prefix := coalesce(p_prefix, '');

    IF p_sort_order = 'asc' THEN
        v_cursor_op := '>';
    ELSE
        v_cursor_op := '<';
    END IF;

    v_query := format($sql$
        WITH raw_objects AS (
            SELECT
                o.name AS obj_name,
                o.id AS obj_id,
                o.updated_at AS obj_updated_at,
                o.created_at AS obj_created_at,
                o.last_accessed_at AS obj_last_accessed_at,
                o.metadata AS obj_metadata,
                storage.get_common_prefix(o.name, $1, '/') AS common_prefix
            FROM storage.objects o
            WHERE o.bucket_id = $2
              AND o.name COLLATE "C" LIKE $1 || '%%'
        ),
        -- Aggregate common prefixes (folders)
        -- Both created_at and updated_at use MIN(obj_created_at) to match the old prefixes table behavior
        aggregated_prefixes AS (
            SELECT
                rtrim(common_prefix, '/') AS name,
                NULL::uuid AS id,
                MIN(obj_created_at) AS updated_at,
                MIN(obj_created_at) AS created_at,
                NULL::timestamptz AS last_accessed_at,
                NULL::jsonb AS metadata,
                TRUE AS is_prefix
            FROM raw_objects
            WHERE common_prefix IS NOT NULL
            GROUP BY common_prefix
        ),
        leaf_objects AS (
            SELECT
                obj_name AS name,
                obj_id AS id,
                obj_updated_at AS updated_at,
                obj_created_at AS created_at,
                obj_last_accessed_at AS last_accessed_at,
                obj_metadata AS metadata,
                FALSE AS is_prefix
            FROM raw_objects
            WHERE common_prefix IS NULL
        ),
        combined AS (
            SELECT * FROM aggregated_prefixes
            UNION ALL
            SELECT * FROM leaf_objects
        ),
        filtered AS (
            SELECT *
            FROM combined
            WHERE (
                $5 = ''
                OR ROW(
                    date_trunc('milliseconds', %I),
                    name COLLATE "C"
                ) %s ROW(
                    COALESCE(NULLIF($6, '')::timestamptz, 'epoch'::timestamptz),
                    $5
                )
            )
        )
        SELECT
            split_part(name, '/', $3) AS key,
            name,
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
        FROM filtered
        ORDER BY
            COALESCE(date_trunc('milliseconds', %I), 'epoch'::timestamptz) %s,
            name COLLATE "C" %s
        LIMIT $4
    $sql$,
        p_sort_column,
        v_cursor_op,
        p_sort_column,
        p_sort_order,
        p_sort_order
    );

    RETURN QUERY EXECUTE v_query
    USING v_prefix, p_bucket_id, p_level, p_limit, p_start_after, p_sort_column_after;
END;
$_$;


ALTER FUNCTION storage.search_by_timestamp(p_prefix text, p_bucket_id text, p_limit integer, p_level integer, p_start_after text, p_sort_order text, p_sort_column text, p_sort_column_after text) OWNER TO supabase_storage_admin;

--
-- Name: search_v2(text, text, integer, integer, text, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_v2(prefix text, bucket_name text, limits integer DEFAULT 100, levels integer DEFAULT 1, start_after text DEFAULT ''::text, sort_order text DEFAULT 'asc'::text, sort_column text DEFAULT 'name'::text, sort_column_after text DEFAULT ''::text) RETURNS TABLE(key text, name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $$
DECLARE
    v_sort_col text;
    v_sort_ord text;
    v_limit int;
BEGIN
    -- Cap limit to maximum of 1500 records
    v_limit := LEAST(coalesce(limits, 100), 1500);

    -- Validate and normalize sort_order
    v_sort_ord := lower(coalesce(sort_order, 'asc'));
    IF v_sort_ord NOT IN ('asc', 'desc') THEN
        v_sort_ord := 'asc';
    END IF;

    -- Validate and normalize sort_column
    v_sort_col := lower(coalesce(sort_column, 'name'));
    IF v_sort_col NOT IN ('name', 'updated_at', 'created_at') THEN
        v_sort_col := 'name';
    END IF;

    -- Route to appropriate implementation
    IF v_sort_col = 'name' THEN
        -- Use list_objects_with_delimiter for name sorting (most efficient: O(k * log n))
        RETURN QUERY
        SELECT
            split_part(l.name, '/', levels) AS key,
            l.name AS name,
            l.id,
            l.updated_at,
            l.created_at,
            l.last_accessed_at,
            l.metadata
        FROM storage.list_objects_with_delimiter(
            bucket_name,
            coalesce(prefix, ''),
            '/',
            v_limit,
            start_after,
            '',
            v_sort_ord
        ) l;
    ELSE
        -- Use aggregation approach for timestamp sorting
        -- Not efficient for large datasets but supports correct pagination
        RETURN QUERY SELECT * FROM storage.search_by_timestamp(
            prefix, bucket_name, v_limit, levels, start_after,
            v_sort_ord, v_sort_col, sort_column_after
        );
    END IF;
END;
$$;


ALTER FUNCTION storage.search_v2(prefix text, bucket_name text, limits integer, levels integer, start_after text, sort_order text, sort_column text, sort_column_after text) OWNER TO supabase_storage_admin;

--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$;


ALTER FUNCTION storage.update_updated_at_column() OWNER TO supabase_storage_admin;

--
-- Name: http_request(); Type: FUNCTION; Schema: supabase_functions; Owner: supabase_functions_admin
--

CREATE FUNCTION supabase_functions.http_request() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'supabase_functions'
    AS $$
  DECLARE
    request_id bigint;
    payload jsonb;
    url text := TG_ARGV[0]::text;
    method text := TG_ARGV[1]::text;
    headers jsonb DEFAULT '{}'::jsonb;
    params jsonb DEFAULT '{}'::jsonb;
    timeout_ms integer DEFAULT 1000;
  BEGIN
    IF url IS NULL OR url = 'null' THEN
      RAISE EXCEPTION 'url argument is missing';
    END IF;

    IF method IS NULL OR method = 'null' THEN
      RAISE EXCEPTION 'method argument is missing';
    END IF;

    IF TG_ARGV[2] IS NULL OR TG_ARGV[2] = 'null' THEN
      headers = '{"Content-Type": "application/json"}'::jsonb;
    ELSE
      headers = TG_ARGV[2]::jsonb;
    END IF;

    IF TG_ARGV[3] IS NULL OR TG_ARGV[3] = 'null' THEN
      params = '{}'::jsonb;
    ELSE
      params = TG_ARGV[3]::jsonb;
    END IF;

    IF TG_ARGV[4] IS NULL OR TG_ARGV[4] = 'null' THEN
      timeout_ms = 1000;
    ELSE
      timeout_ms = TG_ARGV[4]::integer;
    END IF;

    CASE
      WHEN method = 'GET' THEN
        SELECT http_get INTO request_id FROM net.http_get(
          url,
          params,
          headers,
          timeout_ms
        );
      WHEN method = 'POST' THEN
        payload = jsonb_build_object(
          'old_record', OLD,
          'record', NEW,
          'type', TG_OP,
          'table', TG_TABLE_NAME,
          'schema', TG_TABLE_SCHEMA
        );

        SELECT http_post INTO request_id FROM net.http_post(
          url,
          payload,
          params,
          headers,
          timeout_ms
        );
      ELSE
        RAISE EXCEPTION 'method argument % is invalid', method;
    END CASE;

    INSERT INTO supabase_functions.hooks
      (hook_table_id, hook_name, request_id)
    VALUES
      (TG_RELID, TG_NAME, request_id);

    RETURN NEW;
  END
$$;


ALTER FUNCTION supabase_functions.http_request() OWNER TO supabase_functions_admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: extensions; Type: TABLE; Schema: _realtime; Owner: supabase_admin
--

CREATE TABLE _realtime.extensions (
    id uuid NOT NULL,
    type text,
    settings jsonb,
    tenant_external_id text,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL
);


ALTER TABLE _realtime.extensions OWNER TO supabase_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: _realtime; Owner: supabase_admin
--

CREATE TABLE _realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


ALTER TABLE _realtime.schema_migrations OWNER TO supabase_admin;

--
-- Name: tenants; Type: TABLE; Schema: _realtime; Owner: supabase_admin
--

CREATE TABLE _realtime.tenants (
    id uuid NOT NULL,
    name text,
    external_id text,
    jwt_secret text,
    max_concurrent_users integer DEFAULT 200 NOT NULL,
    inserted_at timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone NOT NULL,
    max_events_per_second integer DEFAULT 100 NOT NULL,
    postgres_cdc_default text DEFAULT 'postgres_cdc_rls'::text,
    max_bytes_per_second integer DEFAULT 100000 NOT NULL,
    max_channels_per_client integer DEFAULT 100 NOT NULL,
    max_joins_per_second integer DEFAULT 500 NOT NULL,
    suspend boolean DEFAULT false,
    jwt_jwks jsonb,
    notify_private_alpha boolean DEFAULT false,
    private_only boolean DEFAULT false NOT NULL,
    migrations_ran integer DEFAULT 0,
    broadcast_adapter character varying(255) DEFAULT 'gen_rpc'::character varying,
    max_presence_events_per_second integer DEFAULT 1000,
    max_payload_size_in_kb integer DEFAULT 3000,
    max_client_presence_events_per_window integer,
    client_presence_window_ms integer,
    CONSTRAINT jwt_secret_or_jwt_jwks_required CHECK (((jwt_secret IS NOT NULL) OR (jwt_jwks IS NOT NULL)))
);


ALTER TABLE _realtime.tenants OWNER TO supabase_admin;

--
-- Name: audit_log_entries; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.audit_log_entries (
    instance_id uuid,
    id uuid NOT NULL,
    payload json,
    created_at timestamp with time zone,
    ip_address character varying(64) DEFAULT ''::character varying NOT NULL
);


ALTER TABLE auth.audit_log_entries OWNER TO supabase_auth_admin;

--
-- Name: TABLE audit_log_entries; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.audit_log_entries IS 'Auth: Audit trail for user actions.';


--
-- Name: flow_state; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.flow_state (
    id uuid NOT NULL,
    user_id uuid,
    auth_code text NOT NULL,
    code_challenge_method auth.code_challenge_method NOT NULL,
    code_challenge text NOT NULL,
    provider_type text NOT NULL,
    provider_access_token text,
    provider_refresh_token text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    authentication_method text NOT NULL,
    auth_code_issued_at timestamp with time zone
);


ALTER TABLE auth.flow_state OWNER TO supabase_auth_admin;

--
-- Name: TABLE flow_state; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.flow_state IS 'stores metadata for pkce logins';


--
-- Name: identities; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.identities (
    provider_id text NOT NULL,
    user_id uuid NOT NULL,
    identity_data jsonb NOT NULL,
    provider text NOT NULL,
    last_sign_in_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    email text GENERATED ALWAYS AS (lower((identity_data ->> 'email'::text))) STORED,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE auth.identities OWNER TO supabase_auth_admin;

--
-- Name: TABLE identities; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.identities IS 'Auth: Stores identities associated to a user.';


--
-- Name: COLUMN identities.email; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.identities.email IS 'Auth: Email is a generated column that references the optional email property in the identity_data';


--
-- Name: instances; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.instances (
    id uuid NOT NULL,
    uuid uuid,
    raw_base_config text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE auth.instances OWNER TO supabase_auth_admin;

--
-- Name: TABLE instances; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.instances IS 'Auth: Manages users across multiple sites.';


--
-- Name: mfa_amr_claims; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_amr_claims (
    session_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    authentication_method text NOT NULL,
    id uuid NOT NULL
);


ALTER TABLE auth.mfa_amr_claims OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_amr_claims; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_amr_claims IS 'auth: stores authenticator method reference claims for multi factor authentication';


--
-- Name: mfa_challenges; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_challenges (
    id uuid NOT NULL,
    factor_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    verified_at timestamp with time zone,
    ip_address inet NOT NULL,
    otp_code text,
    web_authn_session_data jsonb
);


ALTER TABLE auth.mfa_challenges OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_challenges; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_challenges IS 'auth: stores metadata about challenge requests made';


--
-- Name: mfa_factors; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_factors (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    friendly_name text,
    factor_type auth.factor_type NOT NULL,
    status auth.factor_status NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    secret text,
    phone text,
    last_challenged_at timestamp with time zone,
    web_authn_credential jsonb,
    web_authn_aaguid uuid
);


ALTER TABLE auth.mfa_factors OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_factors; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_factors IS 'auth: stores metadata about factors';


--
-- Name: one_time_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.one_time_tokens (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    token_type auth.one_time_token_type NOT NULL,
    token_hash text NOT NULL,
    relates_to text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT one_time_tokens_token_hash_check CHECK ((char_length(token_hash) > 0))
);


ALTER TABLE auth.one_time_tokens OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.refresh_tokens (
    instance_id uuid,
    id bigint NOT NULL,
    token character varying(255),
    user_id character varying(255),
    revoked boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    parent character varying(255),
    session_id uuid
);


ALTER TABLE auth.refresh_tokens OWNER TO supabase_auth_admin;

--
-- Name: TABLE refresh_tokens; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.refresh_tokens IS 'Auth: Store of tokens used to refresh JWT tokens once they expire.';


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: auth; Owner: supabase_auth_admin
--

CREATE SEQUENCE auth.refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE auth.refresh_tokens_id_seq OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: supabase_auth_admin
--

ALTER SEQUENCE auth.refresh_tokens_id_seq OWNED BY auth.refresh_tokens.id;


--
-- Name: saml_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_providers (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    entity_id text NOT NULL,
    metadata_xml text NOT NULL,
    metadata_url text,
    attribute_mapping jsonb,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name_id_format text,
    CONSTRAINT "entity_id not empty" CHECK ((char_length(entity_id) > 0)),
    CONSTRAINT "metadata_url not empty" CHECK (((metadata_url = NULL::text) OR (char_length(metadata_url) > 0))),
    CONSTRAINT "metadata_xml not empty" CHECK ((char_length(metadata_xml) > 0))
);


ALTER TABLE auth.saml_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_providers IS 'Auth: Manages SAML Identity Provider connections.';


--
-- Name: saml_relay_states; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_relay_states (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    request_id text NOT NULL,
    for_email text,
    redirect_to text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    flow_state_id uuid,
    CONSTRAINT "request_id not empty" CHECK ((char_length(request_id) > 0))
);


ALTER TABLE auth.saml_relay_states OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_relay_states; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_relay_states IS 'Auth: Contains SAML Relay State information for each Service Provider initiated login.';


--
-- Name: schema_migrations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.schema_migrations (
    version character varying(255) NOT NULL
);


ALTER TABLE auth.schema_migrations OWNER TO supabase_auth_admin;

--
-- Name: TABLE schema_migrations; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.schema_migrations IS 'Auth: Manages updates to the auth system.';


--
-- Name: sessions; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sessions (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    factor_id uuid,
    aal auth.aal_level,
    not_after timestamp with time zone,
    refreshed_at timestamp without time zone,
    user_agent text,
    ip inet,
    tag text
);


ALTER TABLE auth.sessions OWNER TO supabase_auth_admin;

--
-- Name: TABLE sessions; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sessions IS 'Auth: Stores session data associated to a user.';


--
-- Name: COLUMN sessions.not_after; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.not_after IS 'Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.';


--
-- Name: sso_domains; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_domains (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    domain text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "domain not empty" CHECK ((char_length(domain) > 0))
);


ALTER TABLE auth.sso_domains OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_domains; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_domains IS 'Auth: Manages SSO email address domain mapping to an SSO Identity Provider.';


--
-- Name: sso_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_providers (
    id uuid NOT NULL,
    resource_id text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "resource_id not empty" CHECK (((resource_id = NULL::text) OR (char_length(resource_id) > 0)))
);


ALTER TABLE auth.sso_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_providers IS 'Auth: Manages SSO identity provider information; see saml_providers for SAML.';


--
-- Name: COLUMN sso_providers.resource_id; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sso_providers.resource_id IS 'Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code.';


--
-- Name: users; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.users (
    instance_id uuid,
    id uuid NOT NULL,
    aud character varying(255),
    role character varying(255),
    email character varying(255),
    encrypted_password character varying(255),
    email_confirmed_at timestamp with time zone,
    invited_at timestamp with time zone,
    confirmation_token character varying(255),
    confirmation_sent_at timestamp with time zone,
    recovery_token character varying(255),
    recovery_sent_at timestamp with time zone,
    email_change_token_new character varying(255),
    email_change character varying(255),
    email_change_sent_at timestamp with time zone,
    last_sign_in_at timestamp with time zone,
    raw_app_meta_data jsonb,
    raw_user_meta_data jsonb,
    is_super_admin boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    phone text DEFAULT NULL::character varying,
    phone_confirmed_at timestamp with time zone,
    phone_change text DEFAULT ''::character varying,
    phone_change_token character varying(255) DEFAULT ''::character varying,
    phone_change_sent_at timestamp with time zone,
    confirmed_at timestamp with time zone GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
    email_change_token_current character varying(255) DEFAULT ''::character varying,
    email_change_confirm_status smallint DEFAULT 0,
    banned_until timestamp with time zone,
    reauthentication_token character varying(255) DEFAULT ''::character varying,
    reauthentication_sent_at timestamp with time zone,
    is_sso_user boolean DEFAULT false NOT NULL,
    deleted_at timestamp with time zone,
    is_anonymous boolean DEFAULT false NOT NULL,
    CONSTRAINT users_email_change_confirm_status_check CHECK (((email_change_confirm_status >= 0) AND (email_change_confirm_status <= 2)))
);


ALTER TABLE auth.users OWNER TO supabase_auth_admin;

--
-- Name: TABLE users; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.users IS 'Auth: Stores user login data within a secure schema.';


--
-- Name: COLUMN users.is_sso_user; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.users.is_sso_user IS 'Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.';


--
-- Name: ActiviteRemuneree; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ActiviteRemuneree" (
    "IDActiviteRemuneree" bigint NOT NULL,
    "IDSeniors" bigint,
    "TypeActiviteRemuneree" character varying(50) NOT NULL,
    "DescriptionActivite" character varying(50) NOT NULL,
    "TarifHoraire" numeric(24,6) DEFAULT 0 NOT NULL,
    "Disponibilite" date NOT NULL,
    "StatutActiviteRemuneree" character varying(50) NOT NULL,
    "DateCreationActivite" timestamp with time zone NOT NULL
);


ALTER TABLE public."ActiviteRemuneree" OWNER TO postgres;

--
-- Name: ActiviteRemuneree_IDActiviteRemuneree_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ActiviteRemuneree_IDActiviteRemuneree_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ActiviteRemuneree_IDActiviteRemuneree_seq" OWNER TO postgres;

--
-- Name: ActiviteRemuneree_IDActiviteRemuneree_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ActiviteRemuneree_IDActiviteRemuneree_seq" OWNED BY public."ActiviteRemuneree"."IDActiviteRemuneree";


--
-- Name: ActiviteRemuneree_Utilisateurs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ActiviteRemuneree_Utilisateurs" (
    "IDUtilisateurs" bigint,
    "IDActiviteRemuneree" bigint,
    "MontantRevenu" numeric(24,6) DEFAULT 0 NOT NULL,
    "DateTransaction" date NOT NULL,
    "StatutPaiement" character varying(50) NOT NULL
);


ALTER TABLE public."ActiviteRemuneree_Utilisateurs" OWNER TO postgres;

--
-- Name: Agenda; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Agenda" (
    "IDAgenda" bigint NOT NULL,
    "TitreAgenda" character varying(50) NOT NULL,
    "TypeAgenda" character varying(50) DEFAULT '0'::character varying NOT NULL,
    "IDSeniors" bigint
);


ALTER TABLE public."Agenda" OWNER TO postgres;

--
-- Name: Agenda_IDAgenda_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Agenda_IDAgenda_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Agenda_IDAgenda_seq" OWNER TO postgres;

--
-- Name: Agenda_IDAgenda_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Agenda_IDAgenda_seq" OWNED BY public."Agenda"."IDAgenda";


--
-- Name: Aidant; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Aidant" (
    "IDAidant" bigint NOT NULL,
    "IDUtilisateurs" bigint,
    "Experience" text NOT NULL,
    "TarifAidant" numeric(24,6) DEFAULT 0 NOT NULL
);


ALTER TABLE public."Aidant" OWNER TO postgres;

--
-- Name: Aidant_Competences; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Aidant_Competences" (
    "IDCompetences" bigint,
    "IDAidant" bigint
);


ALTER TABLE public."Aidant_Competences" OWNER TO postgres;

--
-- Name: Aidant_IDAidant_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Aidant_IDAidant_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Aidant_IDAidant_seq" OWNER TO postgres;

--
-- Name: Aidant_IDAidant_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Aidant_IDAidant_seq" OWNED BY public."Aidant"."IDAidant";


--
-- Name: AssuranceDeces; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AssuranceDeces" (
    "IDAssuranceDeces" bigint NOT NULL,
    "NomAssurance" character varying(50) NOT NULL,
    "MontantAssure" numeric(15,2) NOT NULL,
    "CotisationMensuelle" integer DEFAULT 0 NOT NULL,
    "DateSouscription" date NOT NULL,
    "IDSeniors" bigint
);


ALTER TABLE public."AssuranceDeces" OWNER TO postgres;

--
-- Name: AssuranceDeces_IDAssuranceDeces_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."AssuranceDeces_IDAssuranceDeces_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."AssuranceDeces_IDAssuranceDeces_seq" OWNER TO postgres;

--
-- Name: AssuranceDeces_IDAssuranceDeces_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."AssuranceDeces_IDAssuranceDeces_seq" OWNED BY public."AssuranceDeces"."IDAssuranceDeces";


--
-- Name: BesoinSenior; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."BesoinSenior" (
    "IDBesoinSenior" bigint NOT NULL,
    "Titre" character varying(50) NOT NULL,
    "Description" text NOT NULL,
    "DatePublication" date NOT NULL,
    "TypeBesoin" character varying(50) NOT NULL,
    "Statut" character varying(50) NOT NULL,
    "IDSeniors" bigint
);


ALTER TABLE public."BesoinSenior" OWNER TO postgres;

--
-- Name: BesoinSenior_IDBesoinSenior_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."BesoinSenior_IDBesoinSenior_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."BesoinSenior_IDBesoinSenior_seq" OWNER TO postgres;

--
-- Name: BesoinSenior_IDBesoinSenior_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."BesoinSenior_IDBesoinSenior_seq" OWNED BY public."BesoinSenior"."IDBesoinSenior";


--
-- Name: BonPlan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."BonPlan" (
    "IDBonPlan" bigint NOT NULL,
    "IDPartenaire" bigint,
    "TitreBonPlan" character varying(50) NOT NULL,
    "DescriptionBonPlan" character varying(50) NOT NULL,
    "TypeReduction" character varying(50) NOT NULL,
    "PourcentageReduction" integer DEFAULT 0 NOT NULL,
    "DateDebutReduction" date NOT NULL,
    "DateFinReduction" date NOT NULL,
    "CodePromo" character varying(50) NOT NULL,
    "StatutBonPlan" character varying(50) NOT NULL
);


ALTER TABLE public."BonPlan" OWNER TO postgres;

--
-- Name: BonPlan_IDBonPlan_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."BonPlan_IDBonPlan_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."BonPlan_IDBonPlan_seq" OWNER TO postgres;

--
-- Name: BonPlan_IDBonPlan_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."BonPlan_IDBonPlan_seq" OWNED BY public."BonPlan"."IDBonPlan";


--
-- Name: BonPlan_Utilisateurs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."BonPlan_Utilisateurs" (
    "IDUtilisateurs" bigint,
    "IDBonPlan" bigint,
    "DateUtilisation" date NOT NULL,
    "StatutUtilisation" character varying(50) NOT NULL,
    "IDCommande" bigint
);


ALTER TABLE public."BonPlan_Utilisateurs" OWNER TO postgres;

--
-- Name: CagnotteDeces; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CagnotteDeces" (
    "IDCagnotteDeces" bigint NOT NULL,
    "MontantTotal" numeric(24,6) DEFAULT 0 NOT NULL,
    "DateOuverture" date NOT NULL,
    "Titre" character varying(50) NOT NULL,
    "Description" character varying(255) NOT NULL,
    "DateCloture" date NOT NULL,
    "Statut" character varying(50) NOT NULL,
    "IDSeniors" bigint
);


ALTER TABLE public."CagnotteDeces" OWNER TO postgres;

--
-- Name: CagnotteDeces_IDCagnotteDeces_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CagnotteDeces_IDCagnotteDeces_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CagnotteDeces_IDCagnotteDeces_seq" OWNER TO postgres;

--
-- Name: CagnotteDeces_IDCagnotteDeces_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CagnotteDeces_IDCagnotteDeces_seq" OWNED BY public."CagnotteDeces"."IDCagnotteDeces";


--
-- Name: CandidatureAidant; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CandidatureAidant" (
    "IDCandidatureAidant" bigint NOT NULL,
    "MessageMotivation" character varying(255) NOT NULL,
    "DateCandidature" date NOT NULL,
    "Statut" smallint DEFAULT 0 NOT NULL,
    "IDAidant" bigint,
    "IDBesoinSenior" bigint
);


ALTER TABLE public."CandidatureAidant" OWNER TO postgres;

--
-- Name: CandidatureAidant_IDCandidatureAidant_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CandidatureAidant_IDCandidatureAidant_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CandidatureAidant_IDCandidatureAidant_seq" OWNER TO postgres;

--
-- Name: CandidatureAidant_IDCandidatureAidant_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CandidatureAidant_IDCandidatureAidant_seq" OWNED BY public."CandidatureAidant"."IDCandidatureAidant";


--
-- Name: CatUtilisateurs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CatUtilisateurs" (
    "IDCatUtilisateurs" bigint NOT NULL,
    "EstSenior" boolean DEFAULT false NOT NULL,
    "EstTuteur" boolean DEFAULT false NOT NULL,
    "EstOrganisme" boolean DEFAULT false NOT NULL,
    "EstAidant" boolean DEFAULT false NOT NULL,
    "EstAdministrateur" boolean DEFAULT false NOT NULL,
    "EstModerateur" boolean DEFAULT false NOT NULL,
    "EstSupport" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."CatUtilisateurs" OWNER TO postgres;

--
-- Name: CatUtilisateurs_IDCatUtilisateurs_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CatUtilisateurs_IDCatUtilisateurs_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CatUtilisateurs_IDCatUtilisateurs_seq" OWNER TO postgres;

--
-- Name: CatUtilisateurs_IDCatUtilisateurs_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CatUtilisateurs_IDCatUtilisateurs_seq" OWNED BY public."CatUtilisateurs"."IDCatUtilisateurs";


--
-- Name: CategorieDocument; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CategorieDocument" (
    "IDCategorieDocument" integer NOT NULL,
    "NomCategorie" character varying NOT NULL
);


ALTER TABLE public."CategorieDocument" OWNER TO postgres;

--
-- Name: CategorieDocument_IDCategorieDocument_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CategorieDocument_IDCategorieDocument_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CategorieDocument_IDCategorieDocument_seq" OWNER TO postgres;

--
-- Name: CategorieDocument_IDCategorieDocument_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CategorieDocument_IDCategorieDocument_seq" OWNED BY public."CategorieDocument"."IDCategorieDocument";


--
-- Name: CategorieOrganisme; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CategorieOrganisme" (
    "IDCategorieOrganisme" bigint NOT NULL,
    "NomCategorie" character varying(50) NOT NULL
);


ALTER TABLE public."CategorieOrganisme" OWNER TO postgres;

--
-- Name: CategorieOrganisme_IDCategorieOrganisme_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CategorieOrganisme_IDCategorieOrganisme_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CategorieOrganisme_IDCategorieOrganisme_seq" OWNER TO postgres;

--
-- Name: CategorieOrganisme_IDCategorieOrganisme_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CategorieOrganisme_IDCategorieOrganisme_seq" OWNED BY public."CategorieOrganisme"."IDCategorieOrganisme";


--
-- Name: CategorieRessource; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CategorieRessource" (
    "IDCategorieRessource" bigint NOT NULL,
    "NomCategorie" character varying(50) NOT NULL
);


ALTER TABLE public."CategorieRessource" OWNER TO postgres;

--
-- Name: CategorieRessource_IDCategorieRessource_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CategorieRessource_IDCategorieRessource_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CategorieRessource_IDCategorieRessource_seq" OWNER TO postgres;

--
-- Name: CategorieRessource_IDCategorieRessource_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CategorieRessource_IDCategorieRessource_seq" OWNED BY public."CategorieRessource"."IDCategorieRessource";


--
-- Name: Commande; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Commande" (
    "IDCommande" bigint NOT NULL,
    "DateCommande" date NOT NULL,
    "StatutCommande" character varying(50) NOT NULL,
    "IDMoyenPaiement" bigint,
    "IDUtilisateurPayeur" bigint,
    "TypeCommande" character varying,
    "MontantTotal" numeric DEFAULT 0 NOT NULL
);


ALTER TABLE public."Commande" OWNER TO postgres;

--
-- Name: Commande_IDCommande_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Commande_IDCommande_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Commande_IDCommande_seq" OWNER TO postgres;

--
-- Name: Commande_IDCommande_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Commande_IDCommande_seq" OWNED BY public."Commande"."IDCommande";


--
-- Name: Competences; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Competences" (
    "IDCompetences" bigint NOT NULL,
    "Metier" character varying(50) NOT NULL,
    "IDDomaine" bigint,
    "CodeMetier" character varying(50) NOT NULL
);


ALTER TABLE public."Competences" OWNER TO postgres;

--
-- Name: Competences_IDCompetences_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Competences_IDCompetences_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Competences_IDCompetences_seq" OWNER TO postgres;

--
-- Name: Competences_IDCompetences_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Competences_IDCompetences_seq" OWNED BY public."Competences"."IDCompetences";


--
-- Name: ConsentementCookies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ConsentementCookies" (
    "IDConsentement" bigint NOT NULL,
    "IDUtilisateurs" bigint,
    "TypeCookie" character varying NOT NULL,
    "Statut" boolean DEFAULT false NOT NULL,
    "DateConsentement" date DEFAULT CURRENT_DATE NOT NULL
);


ALTER TABLE public."ConsentementCookies" OWNER TO postgres;

--
-- Name: ConsentementCookies_IDConsentement_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ConsentementCookies_IDConsentement_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ConsentementCookies_IDConsentement_seq" OWNER TO postgres;

--
-- Name: ConsentementCookies_IDConsentement_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ConsentementCookies_IDConsentement_seq" OWNED BY public."ConsentementCookies"."IDConsentement";


--
-- Name: ContactUrgence; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ContactUrgence" (
    "IDContactUrgence" bigint NOT NULL,
    "IDSeniors" bigint,
    "NomUrgence" character varying(50) NOT NULL,
    "Telephone" character varying(20) NOT NULL,
    "Email" character varying(150) NOT NULL,
    "Relation" character varying(50) NOT NULL,
    "Priorite" character varying(50) NOT NULL,
    "EstActif" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."ContactUrgence" OWNER TO postgres;

--
-- Name: ContactUrgence_IDContactUrgence_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ContactUrgence_IDContactUrgence_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ContactUrgence_IDContactUrgence_seq" OWNER TO postgres;

--
-- Name: ContactUrgence_IDContactUrgence_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ContactUrgence_IDContactUrgence_seq" OWNED BY public."ContactUrgence"."IDContactUrgence";


--
-- Name: ContratCohabitation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ContratCohabitation" (
    "IDContratCohabitation" bigint NOT NULL,
    "IDLogementSenior" bigint,
    "IDAidant" bigint,
    "DateDebutContrat" date NOT NULL,
    "DateFinContrat" date NOT NULL,
    "ConditionEchange" character varying(50) NOT NULL,
    "ReglesMaison" character varying(255) NOT NULL,
    "StatutContrat" character varying(50) NOT NULL
);


ALTER TABLE public."ContratCohabitation" OWNER TO postgres;

--
-- Name: ContratCohabitation_IDContratCohabitation_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ContratCohabitation_IDContratCohabitation_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ContratCohabitation_IDContratCohabitation_seq" OWNER TO postgres;

--
-- Name: ContratCohabitation_IDContratCohabitation_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ContratCohabitation_IDContratCohabitation_seq" OWNED BY public."ContratCohabitation"."IDContratCohabitation";


--
-- Name: DemandeRGPD; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."DemandeRGPD" (
    "IDDemandeRGPD" bigint NOT NULL,
    "IDUtilisateurs" bigint,
    "TypeDemande" character varying NOT NULL,
    "Statut" character varying DEFAULT 'En attente'::character varying NOT NULL,
    "DateDemande" date DEFAULT CURRENT_DATE NOT NULL,
    "DateEcheance" date,
    "TraitePar" bigint,
    "DateTraitement" date
);


ALTER TABLE public."DemandeRGPD" OWNER TO postgres;

--
-- Name: DemandeRGPD_IDDemandeRGPD_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."DemandeRGPD_IDDemandeRGPD_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."DemandeRGPD_IDDemandeRGPD_seq" OWNER TO postgres;

--
-- Name: DemandeRGPD_IDDemandeRGPD_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."DemandeRGPD_IDDemandeRGPD_seq" OWNED BY public."DemandeRGPD"."IDDemandeRGPD";


--
-- Name: Devise; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Devise" (
    "IDDevise" bigint NOT NULL,
    "Titre" character varying(50) NOT NULL
);


ALTER TABLE public."Devise" OWNER TO postgres;

--
-- Name: Devise_IDDevise_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Devise_IDDevise_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Devise_IDDevise_seq" OWNER TO postgres;

--
-- Name: Devise_IDDevise_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Devise_IDDevise_seq" OWNED BY public."Devise"."IDDevise";


--
-- Name: Devise_Utilisateurs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Devise_Utilisateurs" (
    "IDUtilisateurs" bigint,
    "IDDevise" bigint
);


ALTER TABLE public."Devise_Utilisateurs" OWNER TO postgres;

--
-- Name: DirectivesAnticipees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."DirectivesAnticipees" (
    "IDDirectivesAnticipees" bigint NOT NULL,
    "IDSeniors" bigint,
    "TypeDirective" character varying(50) NOT NULL,
    "ContenuDirective" character varying(50) NOT NULL,
    "DateRedaction" date NOT NULL,
    "StatutDirective" character varying(50) NOT NULL,
    "Temoin" character varying(50) NOT NULL
);


ALTER TABLE public."DirectivesAnticipees" OWNER TO postgres;

--
-- Name: DirectivesAnticipees_IDDirectivesAnticipees_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."DirectivesAnticipees_IDDirectivesAnticipees_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."DirectivesAnticipees_IDDirectivesAnticipees_seq" OWNER TO postgres;

--
-- Name: DirectivesAnticipees_IDDirectivesAnticipees_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."DirectivesAnticipees_IDDirectivesAnticipees_seq" OWNED BY public."DirectivesAnticipees"."IDDirectivesAnticipees";


--
-- Name: Document; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Document" (
    "IDDocument" integer NOT NULL,
    "Titre" character varying NOT NULL,
    "TypeFichier" character varying NOT NULL,
    "TailleFichier" numeric,
    "DateUpload" date DEFAULT CURRENT_DATE NOT NULL,
    "Statut" character varying DEFAULT 'Brouillon'::character varying NOT NULL,
    "URLFichier" text NOT NULL,
    "IDCategorieDocument" integer,
    "IDUtilisateurs" bigint
);


ALTER TABLE public."Document" OWNER TO postgres;

--
-- Name: DocumentPatrimonial; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."DocumentPatrimonial" (
    "IDDocumentPatrimonial" bigint NOT NULL,
    "TypeDocument" character varying(50) NOT NULL,
    "URLDocument" text NOT NULL,
    "IDSeniors" bigint,
    "dateCreation" timestamp with time zone DEFAULT now()
);


ALTER TABLE public."DocumentPatrimonial" OWNER TO postgres;

--
-- Name: DocumentPatrimonial_IDDocumentPatrimonial_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."DocumentPatrimonial_IDDocumentPatrimonial_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."DocumentPatrimonial_IDDocumentPatrimonial_seq" OWNER TO postgres;

--
-- Name: DocumentPatrimonial_IDDocumentPatrimonial_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."DocumentPatrimonial_IDDocumentPatrimonial_seq" OWNED BY public."DocumentPatrimonial"."IDDocumentPatrimonial";


--
-- Name: DocumentRGPD; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."DocumentRGPD" (
    "IDDocumentRGPD" bigint NOT NULL,
    "Titre" character varying NOT NULL,
    "TypeDoc" character varying NOT NULL,
    "URLFichier" text NOT NULL,
    "DateMiseAJour" date DEFAULT CURRENT_DATE NOT NULL
);


ALTER TABLE public."DocumentRGPD" OWNER TO postgres;

--
-- Name: DocumentRGPD_IDDocumentRGPD_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."DocumentRGPD_IDDocumentRGPD_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."DocumentRGPD_IDDocumentRGPD_seq" OWNER TO postgres;

--
-- Name: DocumentRGPD_IDDocumentRGPD_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."DocumentRGPD_IDDocumentRGPD_seq" OWNED BY public."DocumentRGPD"."IDDocumentRGPD";


--
-- Name: Document_IDDocument_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Document_IDDocument_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Document_IDDocument_seq" OWNER TO postgres;

--
-- Name: Document_IDDocument_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Document_IDDocument_seq" OWNED BY public."Document"."IDDocument";


--
-- Name: Domaine; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Domaine" (
    "IDDomaine" bigint NOT NULL,
    "DomaineTitre" character varying(255) NOT NULL
);


ALTER TABLE public."Domaine" OWNER TO postgres;

--
-- Name: Domaine_IDDomaine_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Domaine_IDDomaine_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Domaine_IDDomaine_seq" OWNER TO postgres;

--
-- Name: Domaine_IDDomaine_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Domaine_IDDomaine_seq" OWNED BY public."Domaine"."IDDomaine";


--
-- Name: DonCagnotte; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."DonCagnotte" (
    "IDDonCagnotte" bigint NOT NULL,
    "Montant" integer DEFAULT 0 NOT NULL,
    "DateDon" date NOT NULL,
    "MessageDon" character varying(255) NOT NULL,
    "IDDonateur" bigint,
    "IDCagnotteDeces" bigint
);


ALTER TABLE public."DonCagnotte" OWNER TO postgres;

--
-- Name: DonCagnotte_IDDonCagnotte_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."DonCagnotte_IDDonCagnotte_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."DonCagnotte_IDDonCagnotte_seq" OWNER TO postgres;

--
-- Name: DonCagnotte_IDDonCagnotte_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."DonCagnotte_IDDonCagnotte_seq" OWNED BY public."DonCagnotte"."IDDonCagnotte";


--
-- Name: EquipementMedical; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."EquipementMedical" (
    "IDEquipementMedical" bigint NOT NULL,
    "IDProduit" bigint,
    "TypeEquipement" character varying(50) NOT NULL,
    "Marque" character varying(50) NOT NULL,
    "Modele" character varying(50) NOT NULL,
    "Caracteristiques" character varying(255) NOT NULL,
    "ModeEmploi" character varying(255) NOT NULL
);


ALTER TABLE public."EquipementMedical" OWNER TO postgres;

--
-- Name: EquipementMedical_IDEquipementMedical_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."EquipementMedical_IDEquipementMedical_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."EquipementMedical_IDEquipementMedical_seq" OWNER TO postgres;

--
-- Name: EquipementMedical_IDEquipementMedical_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."EquipementMedical_IDEquipementMedical_seq" OWNED BY public."EquipementMedical"."IDEquipementMedical";


--
-- Name: Evaluation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Evaluation" (
    "IDEvaluation" bigint NOT NULL,
    "IDMiseEnRelation" bigint,
    "Note" smallint DEFAULT 0 NOT NULL,
    "Commentaire" character varying(255) NOT NULL,
    "DateEvaluation" timestamp without time zone NOT NULL,
    "IDUtilisateurs" bigint,
    "IDProduit" bigint,
    "IDCommande" bigint
);


ALTER TABLE public."Evaluation" OWNER TO postgres;

--
-- Name: EvaluationCohabitation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."EvaluationCohabitation" (
    "IDEvaluationCohabitation" bigint NOT NULL,
    "IDContratCohabitation" bigint,
    "NoteCohabitation" numeric(38,6) DEFAULT 0 NOT NULL,
    "CommentaireCohabitation" character varying(50) NOT NULL,
    "DateEvaluation" date NOT NULL,
    "IDEvaluateur" bigint
);


ALTER TABLE public."EvaluationCohabitation" OWNER TO postgres;

--
-- Name: EvaluationCohabitation_IDEvaluationCohabitation_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."EvaluationCohabitation_IDEvaluationCohabitation_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."EvaluationCohabitation_IDEvaluationCohabitation_seq" OWNER TO postgres;

--
-- Name: EvaluationCohabitation_IDEvaluationCohabitation_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."EvaluationCohabitation_IDEvaluationCohabitation_seq" OWNED BY public."EvaluationCohabitation"."IDEvaluationCohabitation";


--
-- Name: Evaluation_IDEvaluation_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Evaluation_IDEvaluation_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Evaluation_IDEvaluation_seq" OWNER TO postgres;

--
-- Name: Evaluation_IDEvaluation_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Evaluation_IDEvaluation_seq" OWNED BY public."Evaluation"."IDEvaluation";


--
-- Name: Evenements; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Evenements" (
    "IDEvenements" bigint NOT NULL,
    "Titre" character varying(50) NOT NULL,
    "Description" character varying(50) NOT NULL,
    "DateDebut" date NOT NULL,
    "DateFin" date NOT NULL,
    "Lieu" character varying(50) NOT NULL,
    "Rappel" boolean DEFAULT false NOT NULL,
    "estImportant" boolean DEFAULT false NOT NULL,
    "IDAgenda" bigint
);


ALTER TABLE public."Evenements" OWNER TO postgres;

--
-- Name: Evenements_IDEvenements_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Evenements_IDEvenements_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Evenements_IDEvenements_seq" OWNER TO postgres;

--
-- Name: Evenements_IDEvenements_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Evenements_IDEvenements_seq" OWNED BY public."Evenements"."IDEvenements";


--
-- Name: Facture; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Facture" (
    "IDFacture" bigint NOT NULL,
    "DateEmission" date NOT NULL,
    "MontantTotal" numeric(38,6) DEFAULT 0 NOT NULL,
    "TVA" integer DEFAULT 0 NOT NULL,
    "IDCommande" bigint,
    "IDMiseEnRelation_IDPrestation" bigint
);


ALTER TABLE public."Facture" OWNER TO postgres;

--
-- Name: Facture_IDFacture_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Facture_IDFacture_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Facture_IDFacture_seq" OWNER TO postgres;

--
-- Name: Facture_IDFacture_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Facture_IDFacture_seq" OWNED BY public."Facture"."IDFacture";


--
-- Name: Forum; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Forum" (
    "IDForum" bigint NOT NULL,
    "TitreForum" character varying(50) NOT NULL,
    "DescriptionForum" character varying(255) NOT NULL,
    "Categorie" character varying(50) NOT NULL,
    "estPublic" boolean DEFAULT false NOT NULL,
    "DateCreationForum" date NOT NULL,
    "IDCreateur" bigint
);


ALTER TABLE public."Forum" OWNER TO postgres;

--
-- Name: Forum_IDForum_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Forum_IDForum_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Forum_IDForum_seq" OWNER TO postgres;

--
-- Name: Forum_IDForum_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Forum_IDForum_seq" OWNED BY public."Forum"."IDForum";


--
-- Name: Groupe; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Groupe" (
    "IDGroupe" bigint NOT NULL,
    "Titre" character varying(50) NOT NULL,
    "Description" character varying(255) NOT NULL,
    "DateCreation" date NOT NULL,
    "IDUtilisateursCreateur" bigint
);


ALTER TABLE public."Groupe" OWNER TO postgres;

--
-- Name: Groupe_IDGroupe_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Groupe_IDGroupe_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Groupe_IDGroupe_seq" OWNER TO postgres;

--
-- Name: Groupe_IDGroupe_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Groupe_IDGroupe_seq" OWNED BY public."Groupe"."IDGroupe";


--
-- Name: HistoriqueConnexion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."HistoriqueConnexion" (
    "IDHistoriqueConnexion" bigint NOT NULL,
    "IP" character varying(50) NOT NULL,
    "Navigateur" character varying(50) NOT NULL,
    "DateConnexion" date NOT NULL,
    "IDUtilisateurs" bigint
);


ALTER TABLE public."HistoriqueConnexion" OWNER TO postgres;

--
-- Name: HistoriqueConnexion_IDHistoriqueConnexion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."HistoriqueConnexion_IDHistoriqueConnexion_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."HistoriqueConnexion_IDHistoriqueConnexion_seq" OWNER TO postgres;

--
-- Name: HistoriqueConnexion_IDHistoriqueConnexion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."HistoriqueConnexion_IDHistoriqueConnexion_seq" OWNED BY public."HistoriqueConnexion"."IDHistoriqueConnexion";


--
-- Name: HistoriqueInteractions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."HistoriqueInteractions" (
    "IDHistoriqueInteractions" bigint NOT NULL,
    "IDUtilisateurs" bigint
);


ALTER TABLE public."HistoriqueInteractions" OWNER TO postgres;

--
-- Name: HistoriqueInteractions_IDHistoriqueInteractions_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."HistoriqueInteractions_IDHistoriqueInteractions_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."HistoriqueInteractions_IDHistoriqueInteractions_seq" OWNER TO postgres;

--
-- Name: HistoriqueInteractions_IDHistoriqueInteractions_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."HistoriqueInteractions_IDHistoriqueInteractions_seq" OWNED BY public."HistoriqueInteractions"."IDHistoriqueInteractions";


--
-- Name: Humeur; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Humeur" (
    "IDHumeur" bigint NOT NULL,
    "DateHumeur" timestamp without time zone NOT NULL,
    "Ressenti" character varying(50) NOT NULL,
    "Commentaire" character varying(255) NOT NULL,
    "IDSeniors" bigint
);


ALTER TABLE public."Humeur" OWNER TO postgres;

--
-- Name: Humeur_IDHumeur_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Humeur_IDHumeur_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Humeur_IDHumeur_seq" OWNER TO postgres;

--
-- Name: Humeur_IDHumeur_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Humeur_IDHumeur_seq" OWNED BY public."Humeur"."IDHumeur";


--
-- Name: Langue; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Langue" (
    "IDLangue" bigint NOT NULL,
    "Titre" character varying(50) NOT NULL
);


ALTER TABLE public."Langue" OWNER TO postgres;

--
-- Name: Langue_IDLangue_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Langue_IDLangue_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Langue_IDLangue_seq" OWNER TO postgres;

--
-- Name: Langue_IDLangue_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Langue_IDLangue_seq" OWNED BY public."Langue"."IDLangue";


--
-- Name: Langue_Utilisateurs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Langue_Utilisateurs" (
    "IDUtilisateurs" bigint,
    "IDLangue" bigint,
    "NiveauLangue" smallint DEFAULT 0 NOT NULL
);


ALTER TABLE public."Langue_Utilisateurs" OWNER TO postgres;

--
-- Name: LienPartenariat; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."LienPartenariat" (
    "IDLienPartenariat" bigint NOT NULL,
    "Titre" character varying(50) NOT NULL,
    "Avantage" character varying(50) NOT NULL,
    "IDOrganisme" bigint
);


ALTER TABLE public."LienPartenariat" OWNER TO postgres;

--
-- Name: LienPartenariat_IDLienPartenariat_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."LienPartenariat_IDLienPartenariat_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."LienPartenariat_IDLienPartenariat_seq" OWNER TO postgres;

--
-- Name: LienPartenariat_IDLienPartenariat_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."LienPartenariat_IDLienPartenariat_seq" OWNED BY public."LienPartenariat"."IDLienPartenariat";


--
-- Name: Localisation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Localisation" (
    "IDLocalisation" bigint NOT NULL,
    "Latitude" numeric(38,6) DEFAULT 0 NOT NULL,
    "Longitude" numeric(38,6) DEFAULT 0 NOT NULL,
    "Adresse" character varying(50) NOT NULL,
    "CodePostal" character varying(50) NOT NULL,
    "Ville" character varying(50) NOT NULL,
    "Pays" character varying(50) NOT NULL
);


ALTER TABLE public."Localisation" OWNER TO postgres;

--
-- Name: Localisation_IDLocalisation_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Localisation_IDLocalisation_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Localisation_IDLocalisation_seq" OWNER TO postgres;

--
-- Name: Localisation_IDLocalisation_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Localisation_IDLocalisation_seq" OWNED BY public."Localisation"."IDLocalisation";


--
-- Name: LogementSenior; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."LogementSenior" (
    "IDLogementSenior" bigint NOT NULL,
    "Surface" character varying(50) NOT NULL,
    "NbChambres" character varying(50) NOT NULL,
    "Conditions" character varying(255) NOT NULL,
    "Disponible" boolean DEFAULT false NOT NULL,
    "IDSeniors" bigint
);


ALTER TABLE public."LogementSenior" OWNER TO postgres;

--
-- Name: LogementSenior_IDLogementSenior_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."LogementSenior_IDLogementSenior_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."LogementSenior_IDLogementSenior_seq" OWNER TO postgres;

--
-- Name: LogementSenior_IDLogementSenior_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."LogementSenior_IDLogementSenior_seq" OWNED BY public."LogementSenior"."IDLogementSenior";


--
-- Name: Medicament; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Medicament" (
    "IDMedicament" bigint NOT NULL,
    "IDSeniors" bigint,
    "NomMedicament" character varying(50) NOT NULL,
    "Posologie" character varying(50) NOT NULL,
    "FrequenceJournalier" integer DEFAULT 0 NOT NULL,
    "DateDebutTraitement" date NOT NULL,
    "DateFinTraitement" date NOT NULL,
    "DatePeremption" date NOT NULL,
    "RappelActif" character varying(50) NOT NULL
);


ALTER TABLE public."Medicament" OWNER TO postgres;

--
-- Name: Medicament_IDMedicament_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Medicament_IDMedicament_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Medicament_IDMedicament_seq" OWNER TO postgres;

--
-- Name: Medicament_IDMedicament_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Medicament_IDMedicament_seq" OWNED BY public."Medicament"."IDMedicament";


--
-- Name: MessageGroupe; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MessageGroupe" (
    "IDMessageGroupe" bigint NOT NULL,
    "IDUtilisateurs" bigint,
    "DateEnvoi" date NOT NULL,
    "Contenu" character varying(255) NOT NULL,
    "IDGroupe" bigint DEFAULT 0
);


ALTER TABLE public."MessageGroupe" OWNER TO postgres;

--
-- Name: MessageGroupe_IDMessageGroupe_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."MessageGroupe_IDMessageGroupe_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."MessageGroupe_IDMessageGroupe_seq" OWNER TO postgres;

--
-- Name: MessageGroupe_IDMessageGroupe_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."MessageGroupe_IDMessageGroupe_seq" OWNED BY public."MessageGroupe"."IDMessageGroupe";


--
-- Name: MiseEnRelation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MiseEnRelation" (
    "IDMiseEnRelation" bigint NOT NULL,
    "IDPrestation" bigint,
    "IDSeniors" bigint,
    "IDAidant" bigint,
    "DatePrestation" timestamp without time zone NOT NULL,
    "DurePrestation" numeric(4,2) DEFAULT 0 NOT NULL,
    "TarifPreste" numeric(24,6) DEFAULT 0 NOT NULL,
    "DatePaiement" timestamp without time zone NOT NULL,
    "DateRefusPaiement" timestamp without time zone NOT NULL,
    "IDUtilisateurPayeur" bigint DEFAULT 0,
    "IDMoyenPaiement" bigint,
    "IDPartenairePayeur" bigint DEFAULT 0,
    "IDCommande" bigint,
    "Statut" character varying DEFAULT 'en_attente'::character varying NOT NULL
);


ALTER TABLE public."MiseEnRelation" OWNER TO postgres;

--
-- Name: MiseEnRelation_IDMiseEnRelation_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."MiseEnRelation_IDMiseEnRelation_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."MiseEnRelation_IDMiseEnRelation_seq" OWNER TO postgres;

--
-- Name: MiseEnRelation_IDMiseEnRelation_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."MiseEnRelation_IDMiseEnRelation_seq" OWNED BY public."MiseEnRelation"."IDMiseEnRelation";


--
-- Name: MiseEnRelation_Prestation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MiseEnRelation_Prestation" (
    "IDPrestation" bigint,
    "IDMiseEnRelation" bigint,
    "IDMiseEnRelation_IDPrestation" bigint NOT NULL
);


ALTER TABLE public."MiseEnRelation_Prestation" OWNER TO postgres;

--
-- Name: MiseEnRelation_Prestation_IDMiseEnRelation_IDPrestation_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."MiseEnRelation_Prestation_IDMiseEnRelation_IDPrestation_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."MiseEnRelation_Prestation_IDMiseEnRelation_IDPrestation_seq" OWNER TO postgres;

--
-- Name: MiseEnRelation_Prestation_IDMiseEnRelation_IDPrestation_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."MiseEnRelation_Prestation_IDMiseEnRelation_IDPrestation_seq" OWNED BY public."MiseEnRelation_Prestation"."IDMiseEnRelation_IDPrestation";


--
-- Name: MoyenPaiement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MoyenPaiement" (
    "IDMoyenPaiement" bigint NOT NULL,
    "MoyenPaiement" character varying(50) NOT NULL,
    "DatePaiement" timestamp without time zone NOT NULL
);


ALTER TABLE public."MoyenPaiement" OWNER TO postgres;

--
-- Name: MoyenPaiement_IDMoyenPaiement_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."MoyenPaiement_IDMoyenPaiement_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."MoyenPaiement_IDMoyenPaiement_seq" OWNER TO postgres;

--
-- Name: MoyenPaiement_IDMoyenPaiement_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."MoyenPaiement_IDMoyenPaiement_seq" OWNED BY public."MoyenPaiement"."IDMoyenPaiement";


--
-- Name: Notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Notifications" (
    "IDNotifications" bigint NOT NULL,
    "IDUtilisateurDestinataire" bigint,
    "IDUtilisateurOrigine" bigint,
    "DateCreation" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "EstLu" boolean DEFAULT false NOT NULL,
    "Titre" text DEFAULT 'Notification'::text NOT NULL,
    "Message" text DEFAULT ''::text NOT NULL,
    "TypeNotification" character varying(50) DEFAULT 'info'::character varying NOT NULL,
    "Cible" character varying(20) DEFAULT 'Tous'::character varying,
    CONSTRAINT chk_cible_notification CHECK ((("Cible")::text = ANY (ARRAY[('Admin'::character varying)::text, ('Aidant'::character varying)::text, ('Senior'::character varying)::text, ('Tous'::character varying)::text]))),
    CONSTRAINT chk_type_notification CHECK ((("TypeNotification")::text = ANY (ARRAY[('info'::character varying)::text, ('succès'::character varying)::text, ('alerte'::character varying)::text, ('erreur'::character varying)::text, ('système'::character varying)::text])))
);


ALTER TABLE public."Notifications" OWNER TO postgres;

--
-- Name: Notifications_IDNotifications_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Notifications_IDNotifications_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Notifications_IDNotifications_seq" OWNER TO postgres;

--
-- Name: Notifications_IDNotifications_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Notifications_IDNotifications_seq" OWNED BY public."Notifications"."IDNotifications";


--
-- Name: ObjetPrete; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ObjetPrete" (
    "IDObjetPrete" bigint NOT NULL,
    "nomObjet" character varying(50) NOT NULL,
    "EtatObjet" character varying(50) NOT NULL,
    "DatePret" date NOT NULL,
    "DateRetourPrevu" date NOT NULL,
    "DateRetourEffective" date NOT NULL,
    "IDProprietaireUtilisateur" bigint,
    "IDEmprunteurUtilisateur" bigint
);


ALTER TABLE public."ObjetPrete" OWNER TO postgres;

--
-- Name: ObjetPrete_IDObjetPrete_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ObjetPrete_IDObjetPrete_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ObjetPrete_IDObjetPrete_seq" OWNER TO postgres;

--
-- Name: ObjetPrete_IDObjetPrete_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ObjetPrete_IDObjetPrete_seq" OWNED BY public."ObjetPrete"."IDObjetPrete";


--
-- Name: OffreSenior; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."OffreSenior" (
    "IDOffreSenior" bigint NOT NULL,
    "Titre" character varying(50) NOT NULL,
    "Description" character varying(50) NOT NULL,
    "DateOffre" date NOT NULL,
    "TypeOffre" character varying(50) NOT NULL,
    "Disponible" boolean DEFAULT false NOT NULL,
    "IDSeniors" bigint
);


ALTER TABLE public."OffreSenior" OWNER TO postgres;

--
-- Name: OffreSenior_IDOffreSenior_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."OffreSenior_IDOffreSenior_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."OffreSenior_IDOffreSenior_seq" OWNER TO postgres;

--
-- Name: OffreSenior_IDOffreSenior_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."OffreSenior_IDOffreSenior_seq" OWNED BY public."OffreSenior"."IDOffreSenior";


--
-- Name: Organisme; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Organisme" (
    "IDOrganisme" bigint NOT NULL,
    "Nom" character varying(50) NOT NULL,
    "Email" character varying(150) NOT NULL,
    "Adresse" character varying(255) NOT NULL,
    "Telephone" character varying(20) NOT NULL,
    "TypePartenaire" character varying(50) NOT NULL,
    "IDCategorieOrganisme" bigint
);


ALTER TABLE public."Organisme" OWNER TO postgres;

--
-- Name: Organisme_IDOrganisme_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Organisme_IDOrganisme_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Organisme_IDOrganisme_seq" OWNER TO postgres;

--
-- Name: Organisme_IDOrganisme_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Organisme_IDOrganisme_seq" OWNED BY public."Organisme"."IDOrganisme";


--
-- Name: Parametres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Parametres" (
    "IDParametres" bigint NOT NULL,
    "IDUtilisateurs" bigint
);


ALTER TABLE public."Parametres" OWNER TO postgres;

--
-- Name: ParametresCommission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ParametresCommission" (
    "IDParametreCommission" integer NOT NULL,
    "TypeTransaction" character varying NOT NULL,
    "Pourcentage" numeric DEFAULT 5.0 NOT NULL,
    CONSTRAINT "ParametresCommission_TypeTransaction_check" CHECK ((("TypeTransaction")::text = ANY (ARRAY[('Commande'::character varying)::text, ('Activite'::character varying)::text, ('PostMortem'::character varying)::text])))
);


ALTER TABLE public."ParametresCommission" OWNER TO postgres;

--
-- Name: ParametresCommission_IDParametreCommission_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ParametresCommission_IDParametreCommission_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ParametresCommission_IDParametreCommission_seq" OWNER TO postgres;

--
-- Name: ParametresCommission_IDParametreCommission_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ParametresCommission_IDParametreCommission_seq" OWNED BY public."ParametresCommission"."IDParametreCommission";


--
-- Name: Parametres_IDParametres_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Parametres_IDParametres_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Parametres_IDParametres_seq" OWNER TO postgres;

--
-- Name: Parametres_IDParametres_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Parametres_IDParametres_seq" OWNED BY public."Parametres"."IDParametres";


--
-- Name: Partenaire; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Partenaire" (
    "IDPartenaire" bigint NOT NULL,
    "IDCatUtilisateurs" bigint,
    "RaisonSociale" character varying(50) NOT NULL,
    "Adresse" character varying(255) NOT NULL,
    "Telephone" character varying(20) NOT NULL,
    "Email" character varying(150) NOT NULL,
    "DateInscription" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."Partenaire" OWNER TO postgres;

--
-- Name: Partenaire_IDPartenaire_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Partenaire_IDPartenaire_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Partenaire_IDPartenaire_seq" OWNER TO postgres;

--
-- Name: Partenaire_IDPartenaire_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Partenaire_IDPartenaire_seq" OWNED BY public."Partenaire"."IDPartenaire";


--
-- Name: Partenaire_Services; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Partenaire_Services" (
    "IDPartenaire" bigint,
    "IDServicePartenaire" bigint
);


ALTER TABLE public."Partenaire_Services" OWNER TO postgres;

--
-- Name: Pieces; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Pieces" (
    "IDPieces" bigint NOT NULL,
    "TypePiece" character varying(50),
    "IDUtilisateurs" bigint,
    "DateCreation" timestamp without time zone NOT NULL,
    "DateSuppression" timestamp without time zone NOT NULL
);


ALTER TABLE public."Pieces" OWNER TO postgres;

--
-- Name: Pieces_IDPieces_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Pieces_IDPieces_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Pieces_IDPieces_seq" OWNER TO postgres;

--
-- Name: Pieces_IDPieces_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Pieces_IDPieces_seq" OWNED BY public."Pieces"."IDPieces";


--
-- Name: Prestation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Prestation" (
    "IDPrestation" bigint NOT NULL,
    "Description" character varying(255) NOT NULL,
    "Titre" character varying(50) NOT NULL,
    "IDDomaine" bigint,
    "TarifIndicatif" numeric(24,6) DEFAULT 0 NOT NULL,
    "DateCreation" date DEFAULT CURRENT_DATE
);


ALTER TABLE public."Prestation" OWNER TO postgres;

--
-- Name: PrestationAidant; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PrestationAidant" (
    "IDPrestationAidant" bigint NOT NULL,
    "DateProposition" character varying(50) NOT NULL,
    "DelaiEstime" character varying(50) NOT NULL,
    "StatutProposition" character varying(50) NOT NULL,
    commentaires character varying(255) NOT NULL,
    "IDAidant" bigint,
    "IDBesoinSenior" bigint
);


ALTER TABLE public."PrestationAidant" OWNER TO postgres;

--
-- Name: PrestationAidant_IDPrestationAidant_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PrestationAidant_IDPrestationAidant_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."PrestationAidant_IDPrestationAidant_seq" OWNER TO postgres;

--
-- Name: PrestationAidant_IDPrestationAidant_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PrestationAidant_IDPrestationAidant_seq" OWNED BY public."PrestationAidant"."IDPrestationAidant";


--
-- Name: PrestationSupport; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PrestationSupport" (
    "IDPrestationSupport" bigint NOT NULL,
    "IDTicketClient" bigint,
    "IDIntervenant" bigint DEFAULT 0
);


ALTER TABLE public."PrestationSupport" OWNER TO postgres;

--
-- Name: PrestationSupport_IDPrestationSupport_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PrestationSupport_IDPrestationSupport_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."PrestationSupport_IDPrestationSupport_seq" OWNER TO postgres;

--
-- Name: PrestationSupport_IDPrestationSupport_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PrestationSupport_IDPrestationSupport_seq" OWNED BY public."PrestationSupport"."IDPrestationSupport";


--
-- Name: Prestation_IDPrestation_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Prestation_IDPrestation_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Prestation_IDPrestation_seq" OWNER TO postgres;

--
-- Name: Prestation_IDPrestation_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Prestation_IDPrestation_seq" OWNED BY public."Prestation"."IDPrestation";


--
-- Name: Prestation_Localisation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Prestation_Localisation" (
    "IDLocalisation" bigint,
    "IDPrestation" bigint
);


ALTER TABLE public."Prestation_Localisation" OWNER TO postgres;

--
-- Name: Produit; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Produit" (
    "IDProduit" bigint NOT NULL,
    "Titre" character varying(50) NOT NULL,
    "Description" character varying(50) NOT NULL,
    "Prix" numeric(24,6) DEFAULT 0 NOT NULL,
    "Stock" integer DEFAULT 0 NOT NULL,
    "TypeProduit" character varying(50) NOT NULL,
    "estLouable" boolean DEFAULT false NOT NULL,
    "IDSeniorsVendeur" bigint DEFAULT 0
);


ALTER TABLE public."Produit" OWNER TO postgres;

--
-- Name: Produit_Commande; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Produit_Commande" (
    "IDCommande" bigint,
    "IDProduit" bigint,
    "Quantite" integer DEFAULT 0 NOT NULL,
    "PrixUnitaire" numeric(24,6) DEFAULT 0 NOT NULL
);


ALTER TABLE public."Produit_Commande" OWNER TO postgres;

--
-- Name: Produit_IDProduit_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Produit_IDProduit_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Produit_IDProduit_seq" OWNER TO postgres;

--
-- Name: Produit_IDProduit_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Produit_IDProduit_seq" OWNED BY public."Produit"."IDProduit";


--
-- Name: RapportMensuel; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RapportMensuel" (
    "IDRapportMensuel" bigint NOT NULL,
    "ResumeTexte" character varying(255) NOT NULL,
    "FichieJoint" bytea NOT NULL,
    "DateRapport" date NOT NULL,
    "IDSeniors" bigint,
    "IDRedacteur" bigint
);


ALTER TABLE public."RapportMensuel" OWNER TO postgres;

--
-- Name: RapportMensuel_IDRapportMensuel_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."RapportMensuel_IDRapportMensuel_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."RapportMensuel_IDRapportMensuel_seq" OWNER TO postgres;

--
-- Name: RapportMensuel_IDRapportMensuel_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."RapportMensuel_IDRapportMensuel_seq" OWNED BY public."RapportMensuel"."IDRapportMensuel";


--
-- Name: RendezVousMedical; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RendezVousMedical" (
    "IDRendezVousMedical" bigint NOT NULL,
    "IDSeniors" bigint,
    "DateRDV" date NOT NULL,
    "HeureRDV" time without time zone NOT NULL,
    "TypeRDV" character varying(50) NOT NULL,
    "NomMedecin" character varying(50) NOT NULL,
    "AdresseRDV" character varying(50) NOT NULL,
    "StatutRDV" character varying(50) NOT NULL,
    "RappelEnvoye" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."RendezVousMedical" OWNER TO postgres;

--
-- Name: RendezVousMedical_IDRendezVousMedical_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."RendezVousMedical_IDRendezVousMedical_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."RendezVousMedical_IDRendezVousMedical_seq" OWNER TO postgres;

--
-- Name: RendezVousMedical_IDRendezVousMedical_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."RendezVousMedical_IDRendezVousMedical_seq" OWNED BY public."RendezVousMedical"."IDRendezVousMedical";


--
-- Name: ReponseForum; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ReponseForum" (
    "IDReponseForum" bigint NOT NULL,
    "IDSujetForum" bigint,
    "IDUtilisateurs" bigint,
    "ContenuReponse" character varying(255) NOT NULL,
    "DateReponse" date NOT NULL
);


ALTER TABLE public."ReponseForum" OWNER TO postgres;

--
-- Name: ReponseForum_IDReponseForum_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ReponseForum_IDReponseForum_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ReponseForum_IDReponseForum_seq" OWNER TO postgres;

--
-- Name: ReponseForum_IDReponseForum_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ReponseForum_IDReponseForum_seq" OWNED BY public."ReponseForum"."IDReponseForum";


--
-- Name: ReponsesSupport; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ReponsesSupport" (
    "IDReponse" bigint NOT NULL,
    "IDTicketClient" bigint NOT NULL,
    "IDAuteur" bigint NOT NULL,
    "Contenu" text NOT NULL,
    "DateReponse" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."ReponsesSupport" OWNER TO postgres;

--
-- Name: ReponsesSupport_IDReponse_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ReponsesSupport_IDReponse_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ReponsesSupport_IDReponse_seq" OWNER TO postgres;

--
-- Name: ReponsesSupport_IDReponse_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ReponsesSupport_IDReponse_seq" OWNED BY public."ReponsesSupport"."IDReponse";


--
-- Name: Ressource; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Ressource" (
    "IDRessource" bigint NOT NULL,
    "Titre" character varying(50) NOT NULL,
    "Description" character varying(50) NOT NULL,
    "Lien" character varying(50) NOT NULL,
    "Type" character varying(50) NOT NULL,
    "IDCategorieRessource" bigint
);


ALTER TABLE public."Ressource" OWNER TO postgres;

--
-- Name: Ressource_IDRessource_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Ressource_IDRessource_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Ressource_IDRessource_seq" OWNER TO postgres;

--
-- Name: Ressource_IDRessource_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Ressource_IDRessource_seq" OWNED BY public."Ressource"."IDRessource";


--
-- Name: Seniors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Seniors" (
    "IDSeniors" bigint NOT NULL,
    "IDUtilisateurSenior" bigint DEFAULT 0,
    "NiveauAutonomie" integer DEFAULT 0 NOT NULL,
    "IDTuteur" bigint,
    "EstRGPD" boolean DEFAULT false NOT NULL,
    "IDStructures" bigint
);


ALTER TABLE public."Seniors" OWNER TO postgres;

--
-- Name: Seniors_IDSeniors_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Seniors_IDSeniors_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Seniors_IDSeniors_seq" OWNER TO postgres;

--
-- Name: Seniors_IDSeniors_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Seniors_IDSeniors_seq" OWNED BY public."Seniors"."IDSeniors";


--
-- Name: Seniors_TypeMaladie; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Seniors_TypeMaladie" (
    "IDTypeMaladie" bigint,
    "IDSeniors" bigint
);


ALTER TABLE public."Seniors_TypeMaladie" OWNER TO postgres;

--
-- Name: ServicePartenaire; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ServicePartenaire" (
    "IDServicePartenaire" integer NOT NULL,
    "NomService" character varying NOT NULL
);


ALTER TABLE public."ServicePartenaire" OWNER TO postgres;

--
-- Name: ServicePartenaire_IDServicePartenaire_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ServicePartenaire_IDServicePartenaire_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ServicePartenaire_IDServicePartenaire_seq" OWNER TO postgres;

--
-- Name: ServicePartenaire_IDServicePartenaire_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ServicePartenaire_IDServicePartenaire_seq" OWNED BY public."ServicePartenaire"."IDServicePartenaire";


--
-- Name: ServicePostMortem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ServicePostMortem" (
    "IDServicePostMortem" bigint NOT NULL,
    "NomService" character varying(50) NOT NULL,
    "Description" character varying(50) NOT NULL,
    "MontantPrestation" numeric NOT NULL,
    "DateService" date NOT NULL,
    "Prestataire" character varying(50) NOT NULL,
    "IDCagnotteDeces" bigint,
    "StatutService" character varying(50) DEFAULT 'En attente'::character varying NOT NULL,
    "IDCreateur" bigint NOT NULL
);


ALTER TABLE public."ServicePostMortem" OWNER TO postgres;

--
-- Name: ServicePostMortem_IDServicePostMortem_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ServicePostMortem_IDServicePostMortem_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ServicePostMortem_IDServicePostMortem_seq" OWNER TO postgres;

--
-- Name: ServicePostMortem_IDServicePostMortem_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ServicePostMortem_IDServicePostMortem_seq" OWNED BY public."ServicePostMortem"."IDServicePostMortem";


--
-- Name: SignalementContenu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SignalementContenu" (
    "IDSignalement" integer NOT NULL,
    "IDUtilisateurSignaleur" bigint NOT NULL,
    "Motif" text NOT NULL,
    "DateSignalement" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Traité" boolean DEFAULT false,
    "ActionModeration" character varying,
    "IDMessageGroupe" bigint,
    "IDReponseForum" bigint,
    CONSTRAINT chk_signalement_contenu_unique CHECK (((("IDMessageGroupe" IS NOT NULL) AND ("IDReponseForum" IS NULL)) OR (("IDReponseForum" IS NOT NULL) AND ("IDMessageGroupe" IS NULL))))
);


ALTER TABLE public."SignalementContenu" OWNER TO postgres;

--
-- Name: SignalementContenu_IDSignalement_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."SignalementContenu_IDSignalement_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."SignalementContenu_IDSignalement_seq" OWNER TO postgres;

--
-- Name: SignalementContenu_IDSignalement_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."SignalementContenu_IDSignalement_seq" OWNED BY public."SignalementContenu"."IDSignalement";


--
-- Name: Souvenir; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Souvenir" (
    "IDSouvenir" bigint NOT NULL,
    "Titre" character varying(50) NOT NULL,
    "ContenuTexte" character varying(50) NOT NULL,
    "FichierJoint" bytea NOT NULL,
    "DateCreation" date NOT NULL,
    "estPublic" boolean DEFAULT false NOT NULL,
    "IDSeniors" bigint
);


ALTER TABLE public."Souvenir" OWNER TO postgres;

--
-- Name: Souvenir_IDSouvenir_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Souvenir_IDSouvenir_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Souvenir_IDSouvenir_seq" OWNER TO postgres;

--
-- Name: Souvenir_IDSouvenir_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Souvenir_IDSouvenir_seq" OWNED BY public."Souvenir"."IDSouvenir";


--
-- Name: Structures; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Structures" (
    "IDStructures" bigint NOT NULL,
    "Nom" character varying(50) NOT NULL,
    "NumSIRET" integer DEFAULT 0 NOT NULL,
    "TypeStructure" character varying(50) NOT NULL
);


ALTER TABLE public."Structures" OWNER TO postgres;

--
-- Name: Structures_IDStructures_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Structures_IDStructures_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Structures_IDStructures_seq" OWNER TO postgres;

--
-- Name: Structures_IDStructures_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Structures_IDStructures_seq" OWNED BY public."Structures"."IDStructures";


--
-- Name: SujetForum; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SujetForum" (
    "IDSujetForum" bigint NOT NULL,
    "IDForum" bigint,
    "IDUtilisateurs" bigint,
    "DateCreationSujet" date NOT NULL,
    "NbVues" integer DEFAULT 0 NOT NULL,
    "TitreSujet" character varying(50) NOT NULL,
    "ContenuSujet" text
);


ALTER TABLE public."SujetForum" OWNER TO postgres;

--
-- Name: COLUMN "SujetForum"."ContenuSujet"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."SujetForum"."ContenuSujet" IS 'Contenu principal du sujet de forum';


--
-- Name: SujetForum_IDSujetForum_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."SujetForum_IDSujetForum_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."SujetForum_IDSujetForum_seq" OWNER TO postgres;

--
-- Name: SujetForum_IDSujetForum_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."SujetForum_IDSujetForum_seq" OWNED BY public."SujetForum"."IDSujetForum";


--
-- Name: SupportClient; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SupportClient" (
    "IDTicketClient" bigint NOT NULL,
    "Sujet" character varying(50) NOT NULL,
    "StatutDemande" character varying(50) NOT NULL,
    "DescriptionDemande" character varying(50) NOT NULL,
    "DateEnvoi" date NOT NULL,
    "Priorite" character varying(50) NOT NULL,
    "IDUtilisateursClient" bigint,
    "DateResolution" date
);


ALTER TABLE public."SupportClient" OWNER TO postgres;

--
-- Name: SupportClient_IDTicketClient_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."SupportClient_IDTicketClient_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."SupportClient_IDTicketClient_seq" OWNER TO postgres;

--
-- Name: SupportClient_IDTicketClient_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."SupportClient_IDTicketClient_seq" OWNED BY public."SupportClient"."IDTicketClient";


--
-- Name: TMessage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TMessage" (
    "IDTMessage" bigint NOT NULL,
    "IDUtilisateurExpediteur" bigint,
    "IDUtilisateurDestinataire" bigint,
    "Contenu" character varying(50) NOT NULL,
    "EstLu" boolean DEFAULT false NOT NULL,
    "TypeMessage" character varying(50) NOT NULL
);


ALTER TABLE public."TMessage" OWNER TO postgres;

--
-- Name: TMessage_IDTMessage_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TMessage_IDTMessage_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."TMessage_IDTMessage_seq" OWNER TO postgres;

--
-- Name: TMessage_IDTMessage_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TMessage_IDTMessage_seq" OWNED BY public."TMessage"."IDTMessage";


--
-- Name: TypeMaladie; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TypeMaladie" (
    "IDTypeMaladie" bigint NOT NULL,
    "EstHandicap" boolean DEFAULT false NOT NULL,
    "TypeMaladie" character varying(50) NOT NULL
);


ALTER TABLE public."TypeMaladie" OWNER TO postgres;

--
-- Name: TypeMaladie_IDTypeMaladie_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TypeMaladie_IDTypeMaladie_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."TypeMaladie_IDTypeMaladie_seq" OWNER TO postgres;

--
-- Name: TypeMaladie_IDTypeMaladie_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TypeMaladie_IDTypeMaladie_seq" OWNED BY public."TypeMaladie"."IDTypeMaladie";


--
-- Name: TypePieces; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TypePieces" (
    "IDTypePieces" bigint NOT NULL,
    "Titre" character varying(50) NOT NULL
);


ALTER TABLE public."TypePieces" OWNER TO postgres;

--
-- Name: TypePieces_IDTypePieces_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TypePieces_IDTypePieces_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."TypePieces_IDTypePieces_seq" OWNER TO postgres;

--
-- Name: TypePieces_IDTypePieces_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TypePieces_IDTypePieces_seq" OWNED BY public."TypePieces"."IDTypePieces";


--
-- Name: Utilisateurs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Utilisateurs" (
    "IDUtilisateurs" bigint NOT NULL,
    "IDCatUtilisateurs" bigint,
    "Nom" character varying(50) NOT NULL,
    "Prenom" character varying(50) NOT NULL,
    "DateNaissance" timestamp without time zone NOT NULL,
    "Adresse" character varying(255) NOT NULL,
    "Email" character varying(150) NOT NULL,
    "Telephone" character varying(20) NOT NULL,
    "Genre" character varying(15) NOT NULL,
    "DateInscription" timestamp without time zone NOT NULL,
    "DateModification" timestamp without time zone NOT NULL,
    "EstDesactive" boolean DEFAULT false NOT NULL,
    "Commentaire" character varying(255) NOT NULL,
    "Photo" bytea NOT NULL,
    "LangueSite" character varying(50) NOT NULL,
    "EstRGPD" boolean DEFAULT false NOT NULL,
    "IDAuth" uuid
);


ALTER TABLE public."Utilisateurs" OWNER TO postgres;

--
-- Name: Utilisateurs_Groupe; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Utilisateurs_Groupe" (
    "IDGroupe" bigint,
    "IDUtilisateurs" bigint
);


ALTER TABLE public."Utilisateurs_Groupe" OWNER TO postgres;

--
-- Name: Utilisateurs_IDUtilisateurs_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Utilisateurs_IDUtilisateurs_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Utilisateurs_IDUtilisateurs_seq" OWNER TO postgres;

--
-- Name: Utilisateurs_IDUtilisateurs_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Utilisateurs_IDUtilisateurs_seq" OWNED BY public."Utilisateurs"."IDUtilisateurs";


--
-- Name: Utilisateurs_Localisation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Utilisateurs_Localisation" (
    "IDLocalisation" bigint,
    "IDUtilisateurs" bigint
);


ALTER TABLE public."Utilisateurs_Localisation" OWNER TO postgres;

--
-- Name: VersementCommissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."VersementCommissions" (
    "IDVersementCommissions" bigint NOT NULL,
    "MontantCommission" numeric(38,6) DEFAULT 0 NOT NULL,
    "DateVersement" date NOT NULL,
    "MoyenVersement" character varying(50) NOT NULL,
    "IDPrestation" bigint,
    "IDCommande" bigint,
    "PourcentageCommission" numeric DEFAULT 5.0 NOT NULL,
    "TypeTransaction" character varying DEFAULT 'Commande'::character varying NOT NULL,
    "IDActiviteRemuneree" bigint,
    "IDServicePostMortem" bigint,
    CONSTRAINT "VersementCommissions_TypeTransaction_check" CHECK ((("TypeTransaction")::text = ANY (ARRAY[('Commande'::character varying)::text, ('Prestation'::character varying)::text, ('Activite'::character varying)::text, ('Don'::character varying)::text, ('PostMortem'::character varying)::text])))
);


ALTER TABLE public."VersementCommissions" OWNER TO postgres;

--
-- Name: VersementCommissions_IDVersementCommissions_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."VersementCommissions_IDVersementCommissions_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."VersementCommissions_IDVersementCommissions_seq" OWNER TO postgres;

--
-- Name: VersementCommissions_IDVersementCommissions_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."VersementCommissions_IDVersementCommissions_seq" OWNED BY public."VersementCommissions"."IDVersementCommissions";


--
-- Name: prestations_dashboard_view; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.prestations_dashboard_view AS
 SELECT p."IDPrestation" AS id,
    p."Titre" AS type_prestation,
    p."DateCreation" AS date_creation,
    COALESCE(mr."TarifPreste", p."TarifIndicatif") AS tarif,
    COALESCE(mr."Statut", 'disponible'::character varying) AS statut,
    s."IDSeniors",
        CASE
            WHEN ((su."Prenom" IS NOT NULL) AND (su."Nom" IS NOT NULL)) THEN concat(su."Prenom", ' ', su."Nom")
            ELSE 'Non assigné'::text
        END AS senior_nom,
    a."IDAidant",
        CASE
            WHEN ((au."Prenom" IS NOT NULL) AND (au."Nom" IS NOT NULL)) THEN concat(au."Prenom", ' ', au."Nom")
            ELSE 'Non assigné'::text
        END AS aidant_nom,
    e."Note" AS evaluation,
    e."Commentaire" AS evaluation_commentaire,
    d."IDDomaine",
    d."DomaineTitre" AS domaine_titre
   FROM (((((((public."Prestation" p
     LEFT JOIN public."MiseEnRelation" mr ON ((p."IDPrestation" = mr."IDPrestation")))
     LEFT JOIN public."Seniors" s ON ((mr."IDSeniors" = s."IDSeniors")))
     LEFT JOIN public."Utilisateurs" su ON ((s."IDUtilisateurSenior" = su."IDUtilisateurs")))
     LEFT JOIN public."Aidant" a ON ((mr."IDAidant" = a."IDAidant")))
     LEFT JOIN public."Utilisateurs" au ON ((a."IDUtilisateurs" = au."IDUtilisateurs")))
     LEFT JOIN public."Evaluation" e ON ((e."IDMiseEnRelation" = mr."IDMiseEnRelation")))
     LEFT JOIN public."Domaine" d ON ((p."IDDomaine" = d."IDDomaine")));


ALTER VIEW public.prestations_dashboard_view OWNER TO postgres;

--
-- Name: support_dashboard_view; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.support_dashboard_view AS
 SELECT sc."IDTicketClient" AS id,
    sc."Sujet" AS sujet,
    sc."DescriptionDemande" AS message,
    sc."DateEnvoi" AS date_creation,
    sc."StatutDemande" AS statut,
    sc."Priorite" AS priorite,
    sc."IDUtilisateursClient" AS id_utilisateur,
    u."Nom" AS utilisateur_nom,
    u."Prenom" AS utilisateur_prenom,
    u."Email" AS utilisateur_email,
    ps."IDPrestationSupport" AS id_prestation_support,
    ps."IDIntervenant" AS id_intervenant,
    assignee."Nom" AS assigne_nom,
    assignee."Prenom" AS assigne_prenom,
    assignee."Email" AS assigne_email
   FROM (((public."SupportClient" sc
     LEFT JOIN public."Utilisateurs" u ON ((u."IDUtilisateurs" = sc."IDUtilisateursClient")))
     LEFT JOIN public."PrestationSupport" ps ON ((ps."IDTicketClient" = sc."IDTicketClient")))
     LEFT JOIN public."Utilisateurs" assignee ON ((assignee."IDUtilisateurs" = ps."IDIntervenant")));


ALTER VIEW public.support_dashboard_view OWNER TO postgres;

--
-- Name: v_activitesrecentes; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.v_activitesrecentes AS
 SELECT u."IDUtilisateurs" AS id,
    'user'::text AS type,
    (((u."Nom")::text || ' '::text) || (u."Prenom")::text) AS title,
    'Nouvel utilisateur inscrit'::text AS subtitle,
    u."DateInscription" AS datetime
   FROM public."Utilisateurs" u
UNION ALL
 SELECT sf."IDSujetForum" AS id,
    'forum'::text AS type,
    sf."TitreSujet" AS title,
    'Nouveau sujet publié'::text AS subtitle,
    sf."DateCreationSujet" AS datetime
   FROM public."SujetForum" sf
UNION ALL
 SELECT mg."IDMessageGroupe" AS id,
    'group'::text AS type,
    mg."Contenu" AS title,
    'Message de groupe publié'::text AS subtitle,
    mg."DateEnvoi" AS datetime
   FROM public."MessageGroupe" mg
UNION ALL
 SELECT (sc."IDSignalement")::bigint AS id,
    'signalement'::text AS type,
    'Message de groupe signalé'::text AS title,
    'Un message a été signalé'::text AS subtitle,
    sc."DateSignalement" AS datetime
   FROM public."SignalementContenu" sc
  WHERE (sc."IDMessageGroupe" IS NOT NULL)
UNION ALL
 SELECT (sc."IDSignalement")::bigint AS id,
    'signalement'::text AS type,
    'Réponse de forum signalée'::text AS title,
    'Une réponse a été signalée'::text AS subtitle,
    sc."DateSignalement" AS datetime
   FROM public."SignalementContenu" sc
  WHERE (sc."IDReponseForum" IS NOT NULL)
  ORDER BY 5 DESC;


ALTER VIEW public.v_activitesrecentes OWNER TO postgres;

--
-- Name: v_finances_transactions_admin; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.v_finances_transactions_admin AS
 SELECT 'Activité rémunérée'::text AS type,
    COALESCE((((u."Prenom")::text || ' '::text) || (u."Nom")::text), 'Utilisateur inconnu'::text) AS utilisateur,
    a."MontantRevenu" AS montant,
    ((a."MontantRevenu" * 5.0) / (100)::numeric) AS commission,
    a."DateTransaction" AS date,
    a."StatutPaiement" AS statut,
    'activite'::text AS categorie_type,
    a."IDActiviteRemuneree" AS original_id,
    a."IDUtilisateurs" AS id_utilisateurs,
    a."IDActiviteRemuneree" AS id_activite_remuneree,
    NULL::bigint AS id_commande,
    NULL::bigint AS id_service_post_mortem,
    NULL::bigint AS id_don_cagnotte
   FROM (public."ActiviteRemuneree_Utilisateurs" a
     LEFT JOIN public."Utilisateurs" u ON ((a."IDUtilisateurs" = u."IDUtilisateurs")))
UNION ALL
 SELECT 'Commande'::text AS type,
    COALESCE((((u."Prenom")::text || ' '::text) || (u."Nom")::text), 'Utilisateur inconnu'::text) AS utilisateur,
    c."MontantTotal" AS montant,
    ((c."MontantTotal" * 5.0) / (100)::numeric) AS commission,
    c."DateCommande" AS date,
    c."StatutCommande" AS statut,
    'commande'::text AS categorie_type,
    c."IDCommande" AS original_id,
    c."IDUtilisateurPayeur" AS id_utilisateurs,
    NULL::bigint AS id_activite_remuneree,
    c."IDCommande" AS id_commande,
    NULL::bigint AS id_service_post_mortem,
    NULL::bigint AS id_don_cagnotte
   FROM (public."Commande" c
     LEFT JOIN public."Utilisateurs" u ON ((c."IDUtilisateurPayeur" = u."IDUtilisateurs")))
UNION ALL
 SELECT 'Service post-mortem'::text AS type,
    COALESCE(sp."Prestataire", 'Prestataire inconnu'::character varying) AS utilisateur,
    sp."MontantPrestation" AS montant,
    ((sp."MontantPrestation" * 5.0) / (100)::numeric) AS commission,
    sp."DateService" AS date,
    COALESCE(sp."StatutService", 'En cours'::character varying) AS statut,
    'postmortem'::text AS categorie_type,
    sp."IDServicePostMortem" AS original_id,
    NULL::bigint AS id_utilisateurs,
    NULL::bigint AS id_activite_remuneree,
    NULL::bigint AS id_commande,
    sp."IDServicePostMortem" AS id_service_post_mortem,
    NULL::bigint AS id_don_cagnotte
   FROM public."ServicePostMortem" sp
UNION ALL
 SELECT 'Don cagnotte'::text AS type,
    COALESCE((((u."Prenom")::text || ' '::text) || (u."Nom")::text), 'Donateur inconnu'::text) AS utilisateur,
    d."Montant" AS montant,
    0 AS commission,
    d."DateDon" AS date,
    'Validé'::character varying AS statut,
    'don'::text AS categorie_type,
    d."IDDonCagnotte" AS original_id,
    d."IDDonateur" AS id_utilisateurs,
    NULL::bigint AS id_activite_remuneree,
    NULL::bigint AS id_commande,
    NULL::bigint AS id_service_post_mortem,
    d."IDDonCagnotte" AS id_don_cagnotte
   FROM (public."DonCagnotte" d
     LEFT JOIN public."Utilisateurs" u ON ((d."IDDonateur" = u."IDUtilisateurs")));


ALTER VIEW public.v_finances_transactions_admin OWNER TO postgres;

--
-- Name: v_financestransactions; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.v_financestransactions AS
 SELECT 'Commande'::text AS type,
    c."IDCommande" AS id,
    c."MontantTotal" AS montant,
    c."DateCommande" AS date,
    (((u."Nom")::text || ' '::text) || (u."Prenom")::text) AS utilisateur_nom,
    vc."MontantCommission" AS commission,
    vc."PourcentageCommission" AS pourcentage_commission,
    'Confirmé'::character varying AS statut
   FROM ((public."Commande" c
     LEFT JOIN public."Utilisateurs" u ON ((c."IDUtilisateurPayeur" = u."IDUtilisateurs")))
     LEFT JOIN public."VersementCommissions" vc ON ((c."IDCommande" = vc."IDCommande")))
UNION ALL
 SELECT 'Activite'::text AS type,
    ar."IDActiviteRemuneree" AS id,
    ar."MontantRevenu" AS montant,
    ar."DateTransaction" AS date,
    (((u."Nom")::text || ' '::text) || (u."Prenom")::text) AS utilisateur_nom,
    vc."MontantCommission" AS commission,
    vc."PourcentageCommission" AS pourcentage_commission,
    ar."StatutPaiement" AS statut
   FROM ((public."ActiviteRemuneree_Utilisateurs" ar
     LEFT JOIN public."Utilisateurs" u ON ((ar."IDUtilisateurs" = u."IDUtilisateurs")))
     LEFT JOIN public."VersementCommissions" vc ON ((ar."IDActiviteRemuneree" = vc."IDActiviteRemuneree")))
UNION ALL
 SELECT 'Don'::text AS type,
    dc."IDDonCagnotte" AS id,
    dc."Montant" AS montant,
    dc."DateDon" AS date,
    (((u."Nom")::text || ' '::text) || (u."Prenom")::text) AS utilisateur_nom,
    0 AS commission,
    0.0 AS pourcentage_commission,
    'Confirmé'::character varying AS statut
   FROM (public."DonCagnotte" dc
     LEFT JOIN public."Utilisateurs" u ON ((dc."IDDonateur" = u."IDUtilisateurs")))
UNION ALL
 SELECT 'PostMortem'::text AS type,
    sm."IDServicePostMortem" AS id,
    sm."MontantPrestation" AS montant,
    sm."DateService" AS date,
    sm."Prestataire" AS utilisateur_nom,
    vc."MontantCommission" AS commission,
    vc."PourcentageCommission" AS pourcentage_commission,
    sm."StatutService" AS statut
   FROM (public."ServicePostMortem" sm
     LEFT JOIN public."VersementCommissions" vc ON ((sm."IDServicePostMortem" = vc."IDServicePostMortem")));


ALTER VIEW public.v_financestransactions OWNER TO postgres;

--
-- Name: v_forum_posts_moderation; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.v_forum_posts_moderation AS
 SELECT s."IDSujetForum",
    s."TitreSujet",
    s."DateCreationSujet",
    s."IDUtilisateurs",
    u."Prenom" AS "PrenomAuteur",
    u."Nom" AS "NomAuteur",
    f."TitreForum" AS "NomForum",
    count(DISTINCT r."IDReponseForum") AS nbreponses,
    count(DISTINCT sc."IDSignalement") AS signalements
   FROM ((((public."SujetForum" s
     LEFT JOIN public."Utilisateurs" u ON ((s."IDUtilisateurs" = u."IDUtilisateurs")))
     LEFT JOIN public."Forum" f ON ((f."IDForum" = s."IDForum")))
     LEFT JOIN public."ReponseForum" r ON ((r."IDSujetForum" = s."IDSujetForum")))
     LEFT JOIN public."SignalementContenu" sc ON ((sc."IDReponseForum" = r."IDReponseForum")))
  GROUP BY s."IDSujetForum", s."TitreSujet", s."DateCreationSujet", s."IDUtilisateurs", u."Prenom", u."Nom", f."TitreForum";


ALTER VIEW public.v_forum_posts_moderation OWNER TO postgres;

--
-- Name: v_forum_posts_stats; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.v_forum_posts_stats AS
 SELECT s."IDSujetForum",
    s."TitreSujet",
    s."DateCreationSujet",
    s."IDUtilisateurs",
    u."Nom" AS "NomAuteur",
    u."Prenom" AS "PrenomAuteur",
    COALESCE(r_count.total, (0)::bigint) AS nb_reponses,
    COALESCE(sig_count.total, (0)::bigint) AS signalements
   FROM (((public."SujetForum" s
     LEFT JOIN public."Utilisateurs" u ON ((s."IDUtilisateurs" = u."IDUtilisateurs")))
     LEFT JOIN ( SELECT "ReponseForum"."IDSujetForum",
            count(*) AS total
           FROM public."ReponseForum"
          GROUP BY "ReponseForum"."IDSujetForum") r_count ON ((r_count."IDSujetForum" = s."IDSujetForum")))
     LEFT JOIN ( SELECT "SignalementContenu"."IDReponseForum",
            count(*) AS total
           FROM public."SignalementContenu"
          WHERE ("SignalementContenu"."Traité" = false)
          GROUP BY "SignalementContenu"."IDReponseForum") sig_count ON ((sig_count."IDReponseForum" = s."IDSujetForum")));


ALTER VIEW public.v_forum_posts_stats OWNER TO postgres;

--
-- Name: v_group_messages_moderation; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.v_group_messages_moderation AS
SELECT
    NULL::bigint AS "IDMessageGroupe",
    NULL::character varying(255) AS "Contenu",
    NULL::date AS "DateEnvoi",
    NULL::bigint AS "IDUtilisateurs",
    NULL::character varying(50) AS "PrenomAuteur",
    NULL::character varying(50) AS "NomAuteur",
    NULL::bigint AS "IDGroupe",
    NULL::character varying(50) AS "NomGroupe",
    NULL::bigint AS signalements;


ALTER VIEW public.v_group_messages_moderation OWNER TO postgres;

--
-- Name: messages; Type: TABLE; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE TABLE realtime.messages (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
)
PARTITION BY RANGE (inserted_at);


ALTER TABLE realtime.messages OWNER TO supabase_realtime_admin;

--
-- Name: messages_2026_02_23; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2026_02_23 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2026_02_23 OWNER TO supabase_admin;

--
-- Name: messages_2026_02_24; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2026_02_24 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2026_02_24 OWNER TO supabase_admin;

--
-- Name: messages_2026_02_25; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2026_02_25 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2026_02_25 OWNER TO supabase_admin;

--
-- Name: messages_2026_02_26; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2026_02_26 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2026_02_26 OWNER TO supabase_admin;

--
-- Name: messages_2026_02_27; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2026_02_27 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2026_02_27 OWNER TO supabase_admin;

--
-- Name: messages_2026_02_28; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2026_02_28 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2026_02_28 OWNER TO supabase_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


ALTER TABLE realtime.schema_migrations OWNER TO supabase_admin;

--
-- Name: subscription; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.subscription (
    id bigint NOT NULL,
    subscription_id uuid NOT NULL,
    entity regclass NOT NULL,
    filters realtime.user_defined_filter[] DEFAULT '{}'::realtime.user_defined_filter[] NOT NULL,
    claims jsonb NOT NULL,
    claims_role regrole GENERATED ALWAYS AS (realtime.to_regrole((claims ->> 'role'::text))) STORED NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    action_filter text DEFAULT '*'::text,
    CONSTRAINT subscription_action_filter_check CHECK ((action_filter = ANY (ARRAY['*'::text, 'INSERT'::text, 'UPDATE'::text, 'DELETE'::text])))
);


ALTER TABLE realtime.subscription OWNER TO supabase_admin;

--
-- Name: subscription_id_seq; Type: SEQUENCE; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE realtime.subscription ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME realtime.subscription_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: buckets; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets (
    id text NOT NULL,
    name text NOT NULL,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    public boolean DEFAULT false,
    avif_autodetection boolean DEFAULT false,
    file_size_limit bigint,
    allowed_mime_types text[],
    owner_id text,
    type storage.buckettype DEFAULT 'STANDARD'::storage.buckettype NOT NULL
);


ALTER TABLE storage.buckets OWNER TO supabase_storage_admin;

--
-- Name: COLUMN buckets.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.buckets.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: buckets_analytics; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets_analytics (
    name text NOT NULL,
    type storage.buckettype DEFAULT 'ANALYTICS'::storage.buckettype NOT NULL,
    format text DEFAULT 'ICEBERG'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE storage.buckets_analytics OWNER TO supabase_storage_admin;

--
-- Name: buckets_vectors; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets_vectors (
    id text NOT NULL,
    type storage.buckettype DEFAULT 'VECTOR'::storage.buckettype NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.buckets_vectors OWNER TO supabase_storage_admin;

--
-- Name: iceberg_namespaces; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.iceberg_namespaces (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    bucket_name text NOT NULL,
    name text NOT NULL COLLATE pg_catalog."C",
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    metadata jsonb DEFAULT '{}'::jsonb NOT NULL,
    catalog_id uuid NOT NULL
);


ALTER TABLE storage.iceberg_namespaces OWNER TO supabase_storage_admin;

--
-- Name: iceberg_tables; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.iceberg_tables (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    namespace_id uuid NOT NULL,
    bucket_name text NOT NULL,
    name text NOT NULL COLLATE pg_catalog."C",
    location text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    remote_table_id text,
    shard_key text,
    shard_id text,
    catalog_id uuid NOT NULL
);


ALTER TABLE storage.iceberg_tables OWNER TO supabase_storage_admin;

--
-- Name: migrations; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.migrations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    hash character varying(40) NOT NULL,
    executed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE storage.migrations OWNER TO supabase_storage_admin;

--
-- Name: objects; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.objects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    bucket_id text,
    name text,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_accessed_at timestamp with time zone DEFAULT now(),
    metadata jsonb,
    path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/'::text)) STORED,
    version text,
    owner_id text,
    user_metadata jsonb
);


ALTER TABLE storage.objects OWNER TO supabase_storage_admin;

--
-- Name: COLUMN objects.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.objects.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: s3_multipart_uploads; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads (
    id text NOT NULL,
    in_progress_size bigint DEFAULT 0 NOT NULL,
    upload_signature text NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    version text NOT NULL,
    owner_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_metadata jsonb
);


ALTER TABLE storage.s3_multipart_uploads OWNER TO supabase_storage_admin;

--
-- Name: s3_multipart_uploads_parts; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads_parts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    upload_id text NOT NULL,
    size bigint DEFAULT 0 NOT NULL,
    part_number integer NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    etag text NOT NULL,
    owner_id text,
    version text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.s3_multipart_uploads_parts OWNER TO supabase_storage_admin;

--
-- Name: vector_indexes; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.vector_indexes (
    id text DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL COLLATE pg_catalog."C",
    bucket_id text NOT NULL,
    data_type text NOT NULL,
    dimension integer NOT NULL,
    distance_metric text NOT NULL,
    metadata_configuration jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.vector_indexes OWNER TO supabase_storage_admin;

--
-- Name: hooks; Type: TABLE; Schema: supabase_functions; Owner: supabase_functions_admin
--

CREATE TABLE supabase_functions.hooks (
    id bigint NOT NULL,
    hook_table_id integer NOT NULL,
    hook_name text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    request_id bigint
);


ALTER TABLE supabase_functions.hooks OWNER TO supabase_functions_admin;

--
-- Name: TABLE hooks; Type: COMMENT; Schema: supabase_functions; Owner: supabase_functions_admin
--

COMMENT ON TABLE supabase_functions.hooks IS 'Supabase Functions Hooks: Audit trail for triggered hooks.';


--
-- Name: hooks_id_seq; Type: SEQUENCE; Schema: supabase_functions; Owner: supabase_functions_admin
--

CREATE SEQUENCE supabase_functions.hooks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE supabase_functions.hooks_id_seq OWNER TO supabase_functions_admin;

--
-- Name: hooks_id_seq; Type: SEQUENCE OWNED BY; Schema: supabase_functions; Owner: supabase_functions_admin
--

ALTER SEQUENCE supabase_functions.hooks_id_seq OWNED BY supabase_functions.hooks.id;


--
-- Name: migrations; Type: TABLE; Schema: supabase_functions; Owner: supabase_functions_admin
--

CREATE TABLE supabase_functions.migrations (
    version text NOT NULL,
    inserted_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE supabase_functions.migrations OWNER TO supabase_functions_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: supabase_migrations; Owner: postgres
--

CREATE TABLE supabase_migrations.schema_migrations (
    version text NOT NULL,
    statements text[],
    name text,
    created_by text,
    idempotency_key text
);


ALTER TABLE supabase_migrations.schema_migrations OWNER TO postgres;

--
-- Name: messages_2026_02_23; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2026_02_23 FOR VALUES FROM ('2026-02-23 00:00:00') TO ('2026-02-24 00:00:00');


--
-- Name: messages_2026_02_24; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2026_02_24 FOR VALUES FROM ('2026-02-24 00:00:00') TO ('2026-02-25 00:00:00');


--
-- Name: messages_2026_02_25; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2026_02_25 FOR VALUES FROM ('2026-02-25 00:00:00') TO ('2026-02-26 00:00:00');


--
-- Name: messages_2026_02_26; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2026_02_26 FOR VALUES FROM ('2026-02-26 00:00:00') TO ('2026-02-27 00:00:00');


--
-- Name: messages_2026_02_27; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2026_02_27 FOR VALUES FROM ('2026-02-27 00:00:00') TO ('2026-02-28 00:00:00');


--
-- Name: messages_2026_02_28; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2026_02_28 FOR VALUES FROM ('2026-02-28 00:00:00') TO ('2026-03-01 00:00:00');


--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('auth.refresh_tokens_id_seq'::regclass);


--
-- Name: ActiviteRemuneree IDActiviteRemuneree; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ActiviteRemuneree" ALTER COLUMN "IDActiviteRemuneree" SET DEFAULT nextval('public."ActiviteRemuneree_IDActiviteRemuneree_seq"'::regclass);


--
-- Name: Agenda IDAgenda; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Agenda" ALTER COLUMN "IDAgenda" SET DEFAULT nextval('public."Agenda_IDAgenda_seq"'::regclass);


--
-- Name: Aidant IDAidant; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Aidant" ALTER COLUMN "IDAidant" SET DEFAULT nextval('public."Aidant_IDAidant_seq"'::regclass);


--
-- Name: AssuranceDeces IDAssuranceDeces; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AssuranceDeces" ALTER COLUMN "IDAssuranceDeces" SET DEFAULT nextval('public."AssuranceDeces_IDAssuranceDeces_seq"'::regclass);


--
-- Name: BesoinSenior IDBesoinSenior; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BesoinSenior" ALTER COLUMN "IDBesoinSenior" SET DEFAULT nextval('public."BesoinSenior_IDBesoinSenior_seq"'::regclass);


--
-- Name: BonPlan IDBonPlan; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BonPlan" ALTER COLUMN "IDBonPlan" SET DEFAULT nextval('public."BonPlan_IDBonPlan_seq"'::regclass);


--
-- Name: CagnotteDeces IDCagnotteDeces; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CagnotteDeces" ALTER COLUMN "IDCagnotteDeces" SET DEFAULT nextval('public."CagnotteDeces_IDCagnotteDeces_seq"'::regclass);


--
-- Name: CandidatureAidant IDCandidatureAidant; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CandidatureAidant" ALTER COLUMN "IDCandidatureAidant" SET DEFAULT nextval('public."CandidatureAidant_IDCandidatureAidant_seq"'::regclass);


--
-- Name: CatUtilisateurs IDCatUtilisateurs; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CatUtilisateurs" ALTER COLUMN "IDCatUtilisateurs" SET DEFAULT nextval('public."CatUtilisateurs_IDCatUtilisateurs_seq"'::regclass);


--
-- Name: CategorieDocument IDCategorieDocument; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CategorieDocument" ALTER COLUMN "IDCategorieDocument" SET DEFAULT nextval('public."CategorieDocument_IDCategorieDocument_seq"'::regclass);


--
-- Name: CategorieOrganisme IDCategorieOrganisme; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CategorieOrganisme" ALTER COLUMN "IDCategorieOrganisme" SET DEFAULT nextval('public."CategorieOrganisme_IDCategorieOrganisme_seq"'::regclass);


--
-- Name: CategorieRessource IDCategorieRessource; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CategorieRessource" ALTER COLUMN "IDCategorieRessource" SET DEFAULT nextval('public."CategorieRessource_IDCategorieRessource_seq"'::regclass);


--
-- Name: Commande IDCommande; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Commande" ALTER COLUMN "IDCommande" SET DEFAULT nextval('public."Commande_IDCommande_seq"'::regclass);


--
-- Name: Competences IDCompetences; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Competences" ALTER COLUMN "IDCompetences" SET DEFAULT nextval('public."Competences_IDCompetences_seq"'::regclass);


--
-- Name: ConsentementCookies IDConsentement; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ConsentementCookies" ALTER COLUMN "IDConsentement" SET DEFAULT nextval('public."ConsentementCookies_IDConsentement_seq"'::regclass);


--
-- Name: ContactUrgence IDContactUrgence; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContactUrgence" ALTER COLUMN "IDContactUrgence" SET DEFAULT nextval('public."ContactUrgence_IDContactUrgence_seq"'::regclass);


--
-- Name: ContratCohabitation IDContratCohabitation; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContratCohabitation" ALTER COLUMN "IDContratCohabitation" SET DEFAULT nextval('public."ContratCohabitation_IDContratCohabitation_seq"'::regclass);


--
-- Name: DemandeRGPD IDDemandeRGPD; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DemandeRGPD" ALTER COLUMN "IDDemandeRGPD" SET DEFAULT nextval('public."DemandeRGPD_IDDemandeRGPD_seq"'::regclass);


--
-- Name: Devise IDDevise; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Devise" ALTER COLUMN "IDDevise" SET DEFAULT nextval('public."Devise_IDDevise_seq"'::regclass);


--
-- Name: DirectivesAnticipees IDDirectivesAnticipees; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DirectivesAnticipees" ALTER COLUMN "IDDirectivesAnticipees" SET DEFAULT nextval('public."DirectivesAnticipees_IDDirectivesAnticipees_seq"'::regclass);


--
-- Name: Document IDDocument; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Document" ALTER COLUMN "IDDocument" SET DEFAULT nextval('public."Document_IDDocument_seq"'::regclass);


--
-- Name: DocumentPatrimonial IDDocumentPatrimonial; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DocumentPatrimonial" ALTER COLUMN "IDDocumentPatrimonial" SET DEFAULT nextval('public."DocumentPatrimonial_IDDocumentPatrimonial_seq"'::regclass);


--
-- Name: DocumentRGPD IDDocumentRGPD; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DocumentRGPD" ALTER COLUMN "IDDocumentRGPD" SET DEFAULT nextval('public."DocumentRGPD_IDDocumentRGPD_seq"'::regclass);


--
-- Name: Domaine IDDomaine; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Domaine" ALTER COLUMN "IDDomaine" SET DEFAULT nextval('public."Domaine_IDDomaine_seq"'::regclass);


--
-- Name: DonCagnotte IDDonCagnotte; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DonCagnotte" ALTER COLUMN "IDDonCagnotte" SET DEFAULT nextval('public."DonCagnotte_IDDonCagnotte_seq"'::regclass);


--
-- Name: EquipementMedical IDEquipementMedical; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EquipementMedical" ALTER COLUMN "IDEquipementMedical" SET DEFAULT nextval('public."EquipementMedical_IDEquipementMedical_seq"'::regclass);


--
-- Name: Evaluation IDEvaluation; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Evaluation" ALTER COLUMN "IDEvaluation" SET DEFAULT nextval('public."Evaluation_IDEvaluation_seq"'::regclass);


--
-- Name: EvaluationCohabitation IDEvaluationCohabitation; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EvaluationCohabitation" ALTER COLUMN "IDEvaluationCohabitation" SET DEFAULT nextval('public."EvaluationCohabitation_IDEvaluationCohabitation_seq"'::regclass);


--
-- Name: Evenements IDEvenements; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Evenements" ALTER COLUMN "IDEvenements" SET DEFAULT nextval('public."Evenements_IDEvenements_seq"'::regclass);


--
-- Name: Facture IDFacture; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Facture" ALTER COLUMN "IDFacture" SET DEFAULT nextval('public."Facture_IDFacture_seq"'::regclass);


--
-- Name: Forum IDForum; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Forum" ALTER COLUMN "IDForum" SET DEFAULT nextval('public."Forum_IDForum_seq"'::regclass);


--
-- Name: Groupe IDGroupe; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Groupe" ALTER COLUMN "IDGroupe" SET DEFAULT nextval('public."Groupe_IDGroupe_seq"'::regclass);


--
-- Name: HistoriqueConnexion IDHistoriqueConnexion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HistoriqueConnexion" ALTER COLUMN "IDHistoriqueConnexion" SET DEFAULT nextval('public."HistoriqueConnexion_IDHistoriqueConnexion_seq"'::regclass);


--
-- Name: HistoriqueInteractions IDHistoriqueInteractions; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HistoriqueInteractions" ALTER COLUMN "IDHistoriqueInteractions" SET DEFAULT nextval('public."HistoriqueInteractions_IDHistoriqueInteractions_seq"'::regclass);


--
-- Name: Humeur IDHumeur; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Humeur" ALTER COLUMN "IDHumeur" SET DEFAULT nextval('public."Humeur_IDHumeur_seq"'::regclass);


--
-- Name: Langue IDLangue; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Langue" ALTER COLUMN "IDLangue" SET DEFAULT nextval('public."Langue_IDLangue_seq"'::regclass);


--
-- Name: LienPartenariat IDLienPartenariat; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LienPartenariat" ALTER COLUMN "IDLienPartenariat" SET DEFAULT nextval('public."LienPartenariat_IDLienPartenariat_seq"'::regclass);


--
-- Name: Localisation IDLocalisation; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Localisation" ALTER COLUMN "IDLocalisation" SET DEFAULT nextval('public."Localisation_IDLocalisation_seq"'::regclass);


--
-- Name: LogementSenior IDLogementSenior; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LogementSenior" ALTER COLUMN "IDLogementSenior" SET DEFAULT nextval('public."LogementSenior_IDLogementSenior_seq"'::regclass);


--
-- Name: Medicament IDMedicament; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Medicament" ALTER COLUMN "IDMedicament" SET DEFAULT nextval('public."Medicament_IDMedicament_seq"'::regclass);


--
-- Name: MessageGroupe IDMessageGroupe; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MessageGroupe" ALTER COLUMN "IDMessageGroupe" SET DEFAULT nextval('public."MessageGroupe_IDMessageGroupe_seq"'::regclass);


--
-- Name: MiseEnRelation IDMiseEnRelation; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MiseEnRelation" ALTER COLUMN "IDMiseEnRelation" SET DEFAULT nextval('public."MiseEnRelation_IDMiseEnRelation_seq"'::regclass);


--
-- Name: MiseEnRelation_Prestation IDMiseEnRelation_IDPrestation; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MiseEnRelation_Prestation" ALTER COLUMN "IDMiseEnRelation_IDPrestation" SET DEFAULT nextval('public."MiseEnRelation_Prestation_IDMiseEnRelation_IDPrestation_seq"'::regclass);


--
-- Name: MoyenPaiement IDMoyenPaiement; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MoyenPaiement" ALTER COLUMN "IDMoyenPaiement" SET DEFAULT nextval('public."MoyenPaiement_IDMoyenPaiement_seq"'::regclass);


--
-- Name: Notifications IDNotifications; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notifications" ALTER COLUMN "IDNotifications" SET DEFAULT nextval('public."Notifications_IDNotifications_seq"'::regclass);


--
-- Name: ObjetPrete IDObjetPrete; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ObjetPrete" ALTER COLUMN "IDObjetPrete" SET DEFAULT nextval('public."ObjetPrete_IDObjetPrete_seq"'::regclass);


--
-- Name: OffreSenior IDOffreSenior; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OffreSenior" ALTER COLUMN "IDOffreSenior" SET DEFAULT nextval('public."OffreSenior_IDOffreSenior_seq"'::regclass);


--
-- Name: Organisme IDOrganisme; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Organisme" ALTER COLUMN "IDOrganisme" SET DEFAULT nextval('public."Organisme_IDOrganisme_seq"'::regclass);


--
-- Name: Parametres IDParametres; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Parametres" ALTER COLUMN "IDParametres" SET DEFAULT nextval('public."Parametres_IDParametres_seq"'::regclass);


--
-- Name: ParametresCommission IDParametreCommission; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ParametresCommission" ALTER COLUMN "IDParametreCommission" SET DEFAULT nextval('public."ParametresCommission_IDParametreCommission_seq"'::regclass);


--
-- Name: Partenaire IDPartenaire; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Partenaire" ALTER COLUMN "IDPartenaire" SET DEFAULT nextval('public."Partenaire_IDPartenaire_seq"'::regclass);


--
-- Name: Pieces IDPieces; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Pieces" ALTER COLUMN "IDPieces" SET DEFAULT nextval('public."Pieces_IDPieces_seq"'::regclass);


--
-- Name: Prestation IDPrestation; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Prestation" ALTER COLUMN "IDPrestation" SET DEFAULT nextval('public."Prestation_IDPrestation_seq"'::regclass);


--
-- Name: PrestationAidant IDPrestationAidant; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PrestationAidant" ALTER COLUMN "IDPrestationAidant" SET DEFAULT nextval('public."PrestationAidant_IDPrestationAidant_seq"'::regclass);


--
-- Name: PrestationSupport IDPrestationSupport; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PrestationSupport" ALTER COLUMN "IDPrestationSupport" SET DEFAULT nextval('public."PrestationSupport_IDPrestationSupport_seq"'::regclass);


--
-- Name: Produit IDProduit; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Produit" ALTER COLUMN "IDProduit" SET DEFAULT nextval('public."Produit_IDProduit_seq"'::regclass);


--
-- Name: RapportMensuel IDRapportMensuel; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RapportMensuel" ALTER COLUMN "IDRapportMensuel" SET DEFAULT nextval('public."RapportMensuel_IDRapportMensuel_seq"'::regclass);


--
-- Name: RendezVousMedical IDRendezVousMedical; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RendezVousMedical" ALTER COLUMN "IDRendezVousMedical" SET DEFAULT nextval('public."RendezVousMedical_IDRendezVousMedical_seq"'::regclass);


--
-- Name: ReponseForum IDReponseForum; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ReponseForum" ALTER COLUMN "IDReponseForum" SET DEFAULT nextval('public."ReponseForum_IDReponseForum_seq"'::regclass);


--
-- Name: ReponsesSupport IDReponse; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ReponsesSupport" ALTER COLUMN "IDReponse" SET DEFAULT nextval('public."ReponsesSupport_IDReponse_seq"'::regclass);


--
-- Name: Ressource IDRessource; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ressource" ALTER COLUMN "IDRessource" SET DEFAULT nextval('public."Ressource_IDRessource_seq"'::regclass);


--
-- Name: Seniors IDSeniors; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Seniors" ALTER COLUMN "IDSeniors" SET DEFAULT nextval('public."Seniors_IDSeniors_seq"'::regclass);


--
-- Name: ServicePartenaire IDServicePartenaire; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ServicePartenaire" ALTER COLUMN "IDServicePartenaire" SET DEFAULT nextval('public."ServicePartenaire_IDServicePartenaire_seq"'::regclass);


--
-- Name: ServicePostMortem IDServicePostMortem; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ServicePostMortem" ALTER COLUMN "IDServicePostMortem" SET DEFAULT nextval('public."ServicePostMortem_IDServicePostMortem_seq"'::regclass);


--
-- Name: SignalementContenu IDSignalement; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SignalementContenu" ALTER COLUMN "IDSignalement" SET DEFAULT nextval('public."SignalementContenu_IDSignalement_seq"'::regclass);


--
-- Name: Souvenir IDSouvenir; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Souvenir" ALTER COLUMN "IDSouvenir" SET DEFAULT nextval('public."Souvenir_IDSouvenir_seq"'::regclass);


--
-- Name: Structures IDStructures; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Structures" ALTER COLUMN "IDStructures" SET DEFAULT nextval('public."Structures_IDStructures_seq"'::regclass);


--
-- Name: SujetForum IDSujetForum; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SujetForum" ALTER COLUMN "IDSujetForum" SET DEFAULT nextval('public."SujetForum_IDSujetForum_seq"'::regclass);


--
-- Name: SupportClient IDTicketClient; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SupportClient" ALTER COLUMN "IDTicketClient" SET DEFAULT nextval('public."SupportClient_IDTicketClient_seq"'::regclass);


--
-- Name: TMessage IDTMessage; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TMessage" ALTER COLUMN "IDTMessage" SET DEFAULT nextval('public."TMessage_IDTMessage_seq"'::regclass);


--
-- Name: TypeMaladie IDTypeMaladie; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TypeMaladie" ALTER COLUMN "IDTypeMaladie" SET DEFAULT nextval('public."TypeMaladie_IDTypeMaladie_seq"'::regclass);


--
-- Name: TypePieces IDTypePieces; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TypePieces" ALTER COLUMN "IDTypePieces" SET DEFAULT nextval('public."TypePieces_IDTypePieces_seq"'::regclass);


--
-- Name: Utilisateurs IDUtilisateurs; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Utilisateurs" ALTER COLUMN "IDUtilisateurs" SET DEFAULT nextval('public."Utilisateurs_IDUtilisateurs_seq"'::regclass);


--
-- Name: VersementCommissions IDVersementCommissions; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VersementCommissions" ALTER COLUMN "IDVersementCommissions" SET DEFAULT nextval('public."VersementCommissions_IDVersementCommissions_seq"'::regclass);


--
-- Name: hooks id; Type: DEFAULT; Schema: supabase_functions; Owner: supabase_functions_admin
--

ALTER TABLE ONLY supabase_functions.hooks ALTER COLUMN id SET DEFAULT nextval('supabase_functions.hooks_id_seq'::regclass);


--
-- Data for Name: extensions; Type: TABLE DATA; Schema: _realtime; Owner: supabase_admin
--

INSERT INTO _realtime.extensions VALUES ('e9b236a9-6854-467e-9aaf-68c756cc5c6b', 'postgres_cdc_rls', '{"region": "us-east-1", "db_host": "0A+yRLWVNpeKz0UAE52RghoxiHkJzkes/R2XvDW3n34=", "db_name": "sWBpZNdjggEPTQVlI52Zfw==", "db_port": "+enMDFi1J/3IrrquHHwUmA==", "db_user": "uxbEq/zz8DXVD53TOI1zmw==", "slot_name": "supabase_realtime_replication_slot", "db_password": "sWBpZNdjggEPTQVlI52Zfw==", "publication": "supabase_realtime", "ssl_enforced": false, "poll_interval_ms": 100, "poll_max_changes": 100, "poll_max_record_bytes": 1048576}', 'realtime-dev', '2026-02-25 12:10:40', '2026-02-25 12:10:40');


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: _realtime; Owner: supabase_admin
--

INSERT INTO _realtime.schema_migrations VALUES (20210706140551, '2026-02-24 10:12:20');
INSERT INTO _realtime.schema_migrations VALUES (20220329161857, '2026-02-24 10:12:20');
INSERT INTO _realtime.schema_migrations VALUES (20220410212326, '2026-02-24 10:12:20');
INSERT INTO _realtime.schema_migrations VALUES (20220506102948, '2026-02-24 10:12:20');
INSERT INTO _realtime.schema_migrations VALUES (20220527210857, '2026-02-24 10:12:20');
INSERT INTO _realtime.schema_migrations VALUES (20220815211129, '2026-02-24 10:12:20');
INSERT INTO _realtime.schema_migrations VALUES (20220815215024, '2026-02-24 10:12:20');
INSERT INTO _realtime.schema_migrations VALUES (20220818141501, '2026-02-24 10:12:20');
INSERT INTO _realtime.schema_migrations VALUES (20221018173709, '2026-02-24 10:12:20');
INSERT INTO _realtime.schema_migrations VALUES (20221102172703, '2026-02-24 10:12:20');
INSERT INTO _realtime.schema_migrations VALUES (20221223010058, '2026-02-24 10:12:20');
INSERT INTO _realtime.schema_migrations VALUES (20230110180046, '2026-02-24 10:12:20');
INSERT INTO _realtime.schema_migrations VALUES (20230810220907, '2026-02-24 10:12:20');
INSERT INTO _realtime.schema_migrations VALUES (20230810220924, '2026-02-24 10:12:20');
INSERT INTO _realtime.schema_migrations VALUES (20231024094642, '2026-02-24 10:12:20');
INSERT INTO _realtime.schema_migrations VALUES (20240306114423, '2026-02-24 10:12:20');
INSERT INTO _realtime.schema_migrations VALUES (20240418082835, '2026-02-24 10:12:20');
INSERT INTO _realtime.schema_migrations VALUES (20240625211759, '2026-02-24 10:12:20');
INSERT INTO _realtime.schema_migrations VALUES (20240704172020, '2026-02-24 10:12:20');
INSERT INTO _realtime.schema_migrations VALUES (20240902173232, '2026-02-24 10:12:20');
INSERT INTO _realtime.schema_migrations VALUES (20241106103258, '2026-02-24 10:12:20');
INSERT INTO _realtime.schema_migrations VALUES (20250424203323, '2026-02-24 10:12:20');
INSERT INTO _realtime.schema_migrations VALUES (20250613072131, '2026-02-24 10:12:20');
INSERT INTO _realtime.schema_migrations VALUES (20250711044927, '2026-02-24 10:12:20');
INSERT INTO _realtime.schema_migrations VALUES (20250811121559, '2026-02-24 10:12:20');
INSERT INTO _realtime.schema_migrations VALUES (20250926223044, '2026-02-24 10:12:20');
INSERT INTO _realtime.schema_migrations VALUES (20251204170944, '2026-02-24 10:12:20');
INSERT INTO _realtime.schema_migrations VALUES (20251218000543, '2026-02-24 10:12:20');
INSERT INTO _realtime.schema_migrations VALUES (20260209232800, '2026-02-24 10:12:20');


--
-- Data for Name: tenants; Type: TABLE DATA; Schema: _realtime; Owner: supabase_admin
--

INSERT INTO _realtime.tenants VALUES ('f8cd2a3f-ee6e-4a80-83fa-22160aa6daa8', 'realtime-dev', 'realtime-dev', 'iNjicxc4+llvc9wovDvqymwfnj9teWMlyOIbJ8Fh6j2WNU8CIJ2ZgjR6MUIKqSmeDmvpsKLsZ9jgXJmQPpwL8w==', 200, '2026-02-25 12:10:40', '2026-02-25 12:10:40', 100, 'postgres_cdc_rls', 100000, 100, 100, false, '{"keys": [{"x": "M5Sjqn5zwC9Kl1zVfUUGvv9boQjCGd45G8sdopBExB4", "y": "P6IXMvA2WYXSHSOMTBH2jsw_9rrzGy89FjPf6oOsIxQ", "alg": "ES256", "crv": "P-256", "ext": true, "kid": "b81269f1-21d8-4f2e-b719-c2240a840d90", "kty": "EC", "use": "sig", "key_ops": ["verify"]}, {"k": "c3VwZXItc2VjcmV0LWp3dC10b2tlbi13aXRoLWF0LWxlYXN0LTMyLWNoYXJhY3RlcnMtbG9uZw", "kty": "oct"}]}', false, false, 68, 'gen_rpc', 1000, 3000, NULL, NULL);


--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '6deab113-c32c-4217-92ba-a41e6e79e789', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"med.jadid@hotmail.com","user_id":"c0541773-980e-4433-9875-f9ac370cb93c","user_phone":""}}', '2025-07-03 13:22:14.006549+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '5ce039f3-3dec-4d21-bc33-712418111f80', '{"action":"user_recovery_requested","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"user"}', '2025-07-08 08:43:12.010189+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '513c1de8-96a1-46a0-adf6-bc78cf148562', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account"}', '2025-07-08 08:43:28.749199+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'd31000cc-a0dd-41f0-aa3c-6773fe7ecff4', '{"action":"user_recovery_requested","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"user"}', '2025-07-08 09:05:06.621841+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '05e6dd4b-fc5a-4d99-9ce8-7d2f63c822b9', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account"}', '2025-07-08 09:05:20.408274+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '37c23cbe-2521-41e5-9802-67d7d60cf211', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-09 14:27:29.110718+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'd6d3ef05-a1bc-4716-81f7-8475d3b23f92', '{"action":"logout","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account"}', '2025-07-09 14:30:23.069372+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '20316439-8f7a-499a-80d8-e8595ffa0731', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-09 14:30:28.009565+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'd19fbfa5-4209-49ae-be44-4d1257e9c19a', '{"action":"logout","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account"}', '2025-07-09 14:30:40.325983+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'e71c857f-cc14-472a-a716-fc1b000c8a1f', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-09 14:30:44.69974+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '2a11dfb9-547a-4259-8ad7-4c56dc2b1a9b', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-09 14:30:59.039372+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '66ff6ab2-d3c2-4123-bc82-3fc3283e7f29', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-09 14:32:12.314779+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '8361189c-c60b-4119-8720-e42978d4e7b6', '{"action":"logout","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account"}', '2025-07-09 14:35:18.783977+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '8358010c-6216-47f4-b408-b2cd03188ef3', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-09 14:35:27.04871+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '067129f1-880a-428d-a241-cfcdf273bcf1', '{"action":"logout","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account"}', '2025-07-09 14:37:47.297881+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '6b7ffeb3-e51f-43d6-aa77-e0613a8b90bf', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-09 14:37:53.458711+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'cf30876b-66a8-4518-af59-33a080d4fd1e', '{"action":"token_refreshed","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 09:12:30.801305+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '4cedb395-4217-400f-817c-9ed0833ad460', '{"action":"token_revoked","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 09:12:30.812283+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '4a62384f-f491-46c0-8f91-9a199a1cd0cc', '{"action":"token_refreshed","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 10:20:09.828437+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '25ba2205-447a-453a-aaaf-d8c037fd1266', '{"action":"token_revoked","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 10:20:09.831304+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '36ae63dc-62bb-40f0-9109-77fdd543a88e', '{"action":"token_refreshed","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 11:18:48.923404+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'f32a23e2-cb61-40e7-84ef-62b29c17d25c', '{"action":"token_revoked","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 11:18:48.927294+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '4c08b2c2-53ea-4897-90e0-c8b668f6dab3', '{"action":"token_refreshed","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 12:17:10.216905+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'c6c0a2ac-7e85-481c-9279-eb532b73c506', '{"action":"token_revoked","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 12:17:10.218421+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'ce66ede4-34fe-473d-876d-bd7e5ec6c580', '{"action":"token_refreshed","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 13:15:22.999368+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '248c18c5-8f6a-4cb6-ac7a-593da4d807f3', '{"action":"token_revoked","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-10 13:15:23.001588+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '17f6356b-8b16-44f9-99c4-25a9aad443db', '{"action":"token_refreshed","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-11 07:55:33.864272+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '591c3f94-a47d-4148-a603-e229b45243f5', '{"action":"token_revoked","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-11 07:55:33.872505+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'e99262f2-9b46-4666-9f71-8ef232eb3416', '{"action":"token_refreshed","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-11 08:53:48.637764+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'a14846e2-eefc-46d8-9def-16897f0189f7', '{"action":"token_revoked","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-11 08:53:48.64178+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '9a73fbce-83bc-4553-90ce-049efedbcc5c', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-11 09:00:21.388006+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '9a8358d6-a18a-426e-900b-1957a40b14d2', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-11 09:13:48.755548+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '495a0c3e-7a09-4740-acb9-d42c8119d63a', '{"action":"logout","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account"}', '2025-07-11 09:14:31.688822+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '95aea538-640d-4fe4-a3e6-cf644711e999', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-12 09:52:18.561073+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '50c7e071-7f6c-44ea-90b5-3f396010de11', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-12 09:52:53.168555+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '8982158f-5dfc-4462-9927-e2b25268097c', '{"action":"logout","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account"}', '2025-07-12 09:52:56.324064+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'c8408226-2244-436b-981c-88e981cb3a00', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-12 09:52:59.818345+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'ea99319f-ba24-4494-a426-b53212fa9461', '{"action":"logout","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account"}', '2025-07-12 09:53:07.526003+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '9a47eae7-adaa-4f9f-aebe-7e6fa561b153', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-12 21:35:40.539236+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '13be4530-dd0b-4db3-96ab-dccb3b7bab3b', '{"action":"logout","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account"}', '2025-07-12 21:35:43.663031+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '91afe249-dff3-4f68-b806-98b79c8862fa', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-12 21:35:48.416517+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'ace80a3d-e783-4de0-af85-a7900a6c944a', '{"action":"logout","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account"}', '2025-07-12 21:35:52.377797+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '0c3d9087-069a-4703-8c70-ad54b0cc3253', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-12 21:37:34.143268+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'f051eef7-4b2f-422a-8f34-09bb36f4337f', '{"action":"logout","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account"}', '2025-07-12 21:40:21.31812+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '80b6a704-dcdc-4e50-8b99-7620d93b72fc', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-12 21:41:23.09193+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'f4a6ac5b-d4e1-465d-b09b-e18148307bc9', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-12 21:44:41.943457+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'be72f234-44b2-4883-b505-ed2d285866e8', '{"action":"token_refreshed","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-13 10:24:37.930821+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '4bcb5169-2161-4b69-918d-96884f7a2b9f', '{"action":"token_revoked","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-13 10:24:37.948698+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'c6a3c13b-2171-48ac-805d-0a0dfcf62dcb', '{"action":"logout","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account"}', '2025-07-13 10:24:48.263816+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '88dfcd5d-0a8a-4efe-aff3-e15438b3b69a', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-13 10:24:55.633782+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'b13c5352-b39c-4127-8dad-6efc11686904', '{"action":"logout","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account"}', '2025-07-13 10:25:06.404208+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '984fb68e-e851-4fb9-942d-02385309e18f', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-13 10:25:11.064617+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'ff3d9bff-ed9c-49df-bb62-8dd05779169e', '{"action":"logout","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account"}', '2025-07-13 10:25:17.334416+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '5ecfecc1-13b3-408e-8fcf-a86c0fe7fab2', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-13 10:25:26.850905+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '60d54784-192f-47aa-9d19-7b4a3e780eea', '{"action":"logout","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account"}', '2025-07-13 10:26:53.479444+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '622a2908-c8f6-408f-9c48-3574e749288d', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-13 10:29:47.314377+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '91f5c388-34f8-45a5-96e9-ac75730f663f', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-13 10:40:01.107524+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'd5a5184e-a51d-49c2-b7fb-799baaae5019', '{"action":"logout","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account"}', '2025-07-13 10:42:46.674574+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'e4840f95-3b71-42df-8cef-097a8d9d18a2', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-13 10:42:52.805126+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'fb3ca88f-2e63-4a8a-8621-f9bf847c0415', '{"action":"logout","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account"}', '2025-07-13 10:43:01.300114+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'fbf66e6a-532e-429f-85a3-3cb2f1bb92aa', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-13 10:43:08.289576+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'ed8dd7a3-75d0-4c17-a584-e9173608b2bf', '{"action":"logout","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account"}', '2025-07-13 10:43:10.809533+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '1208c747-a744-4a32-b8c0-9e7a5b8d3bea', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-13 10:43:21.753083+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'b06e9325-69a3-41d0-8061-6e9a93eb1ed3', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-13 10:44:13.76421+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '09c868ba-a408-4443-95b7-0b38236194c8', '{"action":"logout","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account"}', '2025-07-13 11:25:50.709533+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '8573d335-4018-4568-8008-52525fc7acb0', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-13 11:25:56.451836+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'd62695d3-79a4-4db0-a255-6a75a2c8605f', '{"action":"logout","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account"}', '2025-07-13 11:33:15.642682+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '308b7b8c-8f03-4517-b3a6-fb6bdbfc0bd4', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-13 11:33:32.361481+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '75356475-cd54-447e-9f61-bab64e8b4bcb', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-13 11:43:00.590761+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'a5a323dc-4afc-4d82-b5e1-7502ace96e20', '{"action":"logout","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account"}', '2025-07-13 11:43:06.251898+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '4b40cf0c-0165-45ef-b428-bacefda2a65f', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-13 11:43:12.762498+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'd74b42a2-43f8-4798-bc99-64014bd61b31', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-13 11:56:16.636996+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'c8820b4c-22f9-48e8-92b4-8c68e3f69a5b', '{"action":"logout","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account"}', '2025-07-13 11:56:35.506615+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '3624737e-00d9-4bb1-bff6-ced1c0c097f4', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-13 11:56:45.149871+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'e12dc7c8-bdb4-43bd-9b6a-119ea80e0bb5', '{"action":"logout","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account"}', '2025-07-13 11:57:34.315217+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '0fcdf344-3994-4d14-b26f-b328ae897225', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-13 11:57:43.191185+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'af91dca7-d37f-4beb-a61b-2a7be7dcb062', '{"action":"token_refreshed","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-14 16:45:15.197281+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '9b2c7e48-3cac-4641-b720-8d0ce9db41d6', '{"action":"token_revoked","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-14 16:45:15.211239+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'bd2e68ca-01b8-4a2e-9b62-5124f44385c4', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-14 17:09:18.79674+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '06f325c3-5d71-4635-9ce5-b4acba24775d', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-14 17:14:14.940063+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '49ca83fa-9982-436a-a350-8f7ca92ff19f', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-14 19:08:30.741519+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'ffd0ec1f-0d1e-434f-887c-ef3638d9f80c', '{"action":"token_refreshed","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-14 19:08:48.478186+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'bf0b8eab-0b31-42fd-831b-204420e39594', '{"action":"token_revoked","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-14 19:08:48.47878+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '19318436-06cb-4bff-b8da-23d1e3e3e350', '{"action":"token_refreshed","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-14 20:12:03.999386+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '1a23e5ba-56d1-497b-9d1d-2515dc62eca6', '{"action":"token_refreshed","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-14 20:12:03.998801+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '5f529957-ee7c-4978-b983-8155d2e3f115', '{"action":"token_revoked","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-14 20:12:04.005145+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'b9f6b548-8676-492c-aec6-d4be09c05447', '{"action":"token_revoked","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-14 20:12:04.010915+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'f8c57e17-563c-4f37-818b-a4216acddc70', '{"action":"token_refreshed","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-15 07:25:06.431653+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '579bb48e-d820-4832-84b1-9a7d560b60dc', '{"action":"token_revoked","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-15 07:25:06.443479+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '110a9cdf-46e0-41df-a5c9-8440500a5cd5', '{"action":"token_refreshed","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-15 07:54:37.073566+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '1f151598-ba79-4aff-bca8-6b0c446627fe', '{"action":"token_revoked","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-15 07:54:37.077138+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'd5918c4a-3fca-406d-a77a-decae6a24a5b', '{"action":"logout","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account"}', '2025-07-15 07:59:00.235233+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'dd0c0940-e882-4f62-8179-23783a79aff1', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-15 08:21:53.735772+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'c3eeb7fa-dfab-47a0-806a-ac0b9bcb709d', '{"action":"logout","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account"}', '2025-07-15 08:23:17.193665+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '80020784-98a3-45e3-8b76-4fd852bf0c90', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-15 08:24:38.967229+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '2e2ef354-eb0f-4288-9068-714472d03292', '{"action":"logout","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account"}', '2025-07-15 08:26:31.848378+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'd2a7cd76-7646-4274-96be-0014494dc4cb', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-15 08:27:24.87008+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '4ef3845b-9468-4579-982e-4e157650a86d', '{"action":"logout","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account"}', '2025-07-15 08:34:13.893393+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'ca506852-3674-4853-9eec-9b37b1997065', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-15 08:38:18.049115+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'ba4431d1-ee22-462d-9224-b6e4accb4d3a', '{"action":"token_refreshed","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-15 09:36:39.659626+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '79c97e10-abdf-42ed-9bce-abdf5f97070d', '{"action":"token_revoked","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-15 09:36:39.661984+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '26be47d4-27bf-4bb2-8dae-c5947214022a', '{"action":"logout","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account"}', '2025-07-15 10:05:39.407776+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '9dbdbaf4-96fd-4f25-919e-527b9b0ed3b6', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-15 10:05:46.457726+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '07335414-009a-4a66-ac1f-90b04cb9d314', '{"action":"token_refreshed","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-15 11:14:10.994802+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '8f1489ae-50de-4ba1-bc4a-722fa8b31450', '{"action":"token_revoked","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-15 11:14:10.999442+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'c7d99290-edbc-4b23-a456-c87d27984f60', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-15 11:45:15.790192+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'de79e723-f00f-4b4a-862c-9292efb862c9', '{"action":"user_updated_password","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"user"}', '2025-07-15 11:45:16.118999+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '98ff71e2-e698-4f8d-87a2-0bf5a9a7b5d1', '{"action":"user_modified","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"user"}', '2025-07-15 11:45:16.119708+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'f4981d74-e9bf-4ef1-87e1-684916c16d05', '{"action":"token_refreshed","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-15 12:49:53.499288+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'f79fa834-09fe-4fa5-b5eb-86cfa29dec6b', '{"action":"token_revoked","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2025-07-15 12:49:53.503385+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'ab44345f-e4ba-4bd0-a717-9a7d18823864', '{"action":"logout","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account"}', '2025-07-15 12:59:14.23362+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'c664db27-5747-4d74-98ed-8d375e772bc5', '{"action":"login","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-24 10:15:14.339701+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'b4754215-8638-40da-8447-a5cbe31c669c', '{"action":"logout","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account"}', '2026-02-24 10:38:15.806412+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'c2c3053c-3fa5-4927-b1a5-a209df858b1a', '{"action":"user_recovery_requested","actor_id":"c0541773-980e-4433-9875-f9ac370cb93c","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"user"}', '2026-02-24 10:49:59.258765+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '8ca53c08-f2e1-46b3-ae12-207e94aabc6e', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"med.jadid@hotmail.com","user_id":"c0541773-980e-4433-9875-f9ac370cb93c","user_phone":""}}', '2026-02-24 10:52:00.485975+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'aaf41dd5-db1f-496d-97ee-a20c85d58f81', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"provider":"email","user_email":"med.jadid@hotmail.com","user_id":"2e80dcf6-f44e-4c83-b1d6-0fd1748a25bb","user_phone":""}}', '2026-02-24 10:52:16.901709+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'a31f472f-e00e-4a05-aed2-eeb646683bee', '{"action":"login","actor_id":"2e80dcf6-f44e-4c83-b1d6-0fd1748a25bb","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-24 10:56:42.484586+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '24ad4e53-d80b-4b1e-aeba-ec932ca90eff', '{"action":"token_refreshed","actor_id":"2e80dcf6-f44e-4c83-b1d6-0fd1748a25bb","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2026-02-24 11:55:37.391418+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'a8945b9c-c333-4c43-87cc-137c2020ac72', '{"action":"token_revoked","actor_id":"2e80dcf6-f44e-4c83-b1d6-0fd1748a25bb","actor_username":"med.jadid@hotmail.com","actor_via_sso":false,"log_type":"token"}', '2026-02-24 11:55:37.398975+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '26a723be-c2bc-484c-9c89-c9ec02977163', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"med.jadid@hotmail.com","user_id":"2e80dcf6-f44e-4c83-b1d6-0fd1748a25bb","user_phone":""}}', '2026-02-24 12:24:59.288217+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'd408c1a9-ba1b-4348-a4b4-e6d7ea258722', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"provider":"email","user_email":"admin@appseniors.fr","user_id":"16e3bf22-3633-481e-8b96-1ffc37b0203c","user_phone":""}}', '2026-02-24 12:26:02.581085+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '595e2b3f-d588-44cc-9a6f-cf282fdfcf9f', '{"action":"login","actor_id":"16e3bf22-3633-481e-8b96-1ffc37b0203c","actor_username":"admin@appseniors.fr","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-24 12:31:43.217379+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'ae38d917-413e-4e2c-85e3-8fac489e3cb1', '{"action":"logout","actor_id":"16e3bf22-3633-481e-8b96-1ffc37b0203c","actor_username":"admin@appseniors.fr","actor_via_sso":false,"log_type":"account"}', '2026-02-24 12:34:32.609011+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'd821ecff-e9a9-429c-a417-e6b3637660cc', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"provider":"email","user_email":"support@appseniors.fr","user_id":"8164b752-2d28-4fa0-b402-9c4d56cbf261","user_phone":""}}', '2026-02-24 12:35:18.511141+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '9cdf5bc7-0c26-4cf5-886d-07d12955d9a7', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"provider":"email","user_email":"mod@appseniors.fr","user_id":"f9b6a4cf-8def-4adf-b113-d8db46eef2e5","user_phone":""}}', '2026-02-24 12:35:31.110965+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '1b97505b-1caa-46f8-85ef-eb095c5db7db', '{"action":"login","actor_id":"8164b752-2d28-4fa0-b402-9c4d56cbf261","actor_username":"support@appseniors.fr","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-24 12:36:11.272854+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'fdfb6abe-58c4-4fdb-8139-8768267869fe', '{"action":"logout","actor_id":"8164b752-2d28-4fa0-b402-9c4d56cbf261","actor_username":"support@appseniors.fr","actor_via_sso":false,"log_type":"account"}', '2026-02-24 12:38:30.456842+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '3a9758cb-5a87-4c81-97c0-4614170a22fc', '{"action":"login","actor_id":"f9b6a4cf-8def-4adf-b113-d8db46eef2e5","actor_username":"mod@appseniors.fr","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-24 12:38:37.18131+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '455d6100-9d3e-48f2-b762-7b5f44ee73c1', '{"action":"logout","actor_id":"f9b6a4cf-8def-4adf-b113-d8db46eef2e5","actor_username":"mod@appseniors.fr","actor_via_sso":false,"log_type":"account"}', '2026-02-24 12:42:47.314948+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'e23278d1-87ce-474b-9a5a-335ac9578556', '{"action":"login","actor_id":"16e3bf22-3633-481e-8b96-1ffc37b0203c","actor_username":"admin@appseniors.fr","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-24 12:52:52.868345+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'aaff6b7e-70f1-42b4-b7cf-625d2473e429', '{"action":"logout","actor_id":"16e3bf22-3633-481e-8b96-1ffc37b0203c","actor_username":"admin@appseniors.fr","actor_via_sso":false,"log_type":"account"}', '2026-02-24 12:53:58.685811+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '4a3369d8-102f-4ea5-80c1-a30fb69fe8d5', '{"action":"login","actor_id":"16e3bf22-3633-481e-8b96-1ffc37b0203c","actor_username":"admin@appseniors.fr","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-24 12:54:11.594774+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'f0e52b50-706b-480c-8067-fffbdaf608f5', '{"action":"logout","actor_id":"16e3bf22-3633-481e-8b96-1ffc37b0203c","actor_username":"admin@appseniors.fr","actor_via_sso":false,"log_type":"account"}', '2026-02-24 13:04:22.082195+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'e950cd25-9192-45c3-94ed-1d7f953756c7', '{"action":"login","actor_id":"16e3bf22-3633-481e-8b96-1ffc37b0203c","actor_username":"admin@appseniors.fr","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-24 13:04:32.049676+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'b9015b30-a65c-4373-ab36-e0cbf877bc9a', '{"action":"logout","actor_id":"16e3bf22-3633-481e-8b96-1ffc37b0203c","actor_username":"admin@appseniors.fr","actor_via_sso":false,"log_type":"account"}', '2026-02-24 13:17:42.951077+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '16bf08d3-46af-4e5b-a28c-3ef4c56120cb', '{"action":"login","actor_id":"16e3bf22-3633-481e-8b96-1ffc37b0203c","actor_username":"admin@appseniors.fr","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-24 13:17:51.490547+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '4f0d60cc-1a81-469e-bf6a-f5763fc0da1f', '{"action":"token_refreshed","actor_id":"16e3bf22-3633-481e-8b96-1ffc37b0203c","actor_username":"admin@appseniors.fr","actor_via_sso":false,"log_type":"token"}', '2026-02-24 14:19:12.526172+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '1ae81084-9a4b-47d3-a709-ba78dd3aaeae', '{"action":"token_revoked","actor_id":"16e3bf22-3633-481e-8b96-1ffc37b0203c","actor_username":"admin@appseniors.fr","actor_via_sso":false,"log_type":"token"}', '2026-02-24 14:19:12.529323+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '98ff0054-d0f3-4c71-841d-672ea47eacca', '{"action":"token_refreshed","actor_id":"16e3bf22-3633-481e-8b96-1ffc37b0203c","actor_username":"admin@appseniors.fr","actor_via_sso":false,"log_type":"token"}', '2026-02-24 15:19:34.601654+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '762fe509-8059-4719-91cc-fd6a0ce2d44c', '{"action":"token_revoked","actor_id":"16e3bf22-3633-481e-8b96-1ffc37b0203c","actor_username":"admin@appseniors.fr","actor_via_sso":false,"log_type":"token"}', '2026-02-24 15:19:34.604365+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'a0b79ba6-f773-4b69-b1a8-2cce2180d1d6', '{"action":"token_refreshed","actor_id":"16e3bf22-3633-481e-8b96-1ffc37b0203c","actor_username":"admin@appseniors.fr","actor_via_sso":false,"log_type":"token"}', '2026-02-24 16:19:54.67693+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'afbc89a1-baee-406f-b0a6-90d1a7126eb2', '{"action":"token_revoked","actor_id":"16e3bf22-3633-481e-8b96-1ffc37b0203c","actor_username":"admin@appseniors.fr","actor_via_sso":false,"log_type":"token"}', '2026-02-24 16:19:54.682977+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '3e9c8aa9-bd49-41c9-abf8-3a35019fecf3', '{"action":"token_refreshed","actor_id":"16e3bf22-3633-481e-8b96-1ffc37b0203c","actor_username":"admin@appseniors.fr","actor_via_sso":false,"log_type":"token"}', '2026-02-25 10:47:06.231763+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'ac1f5285-7666-4cd7-87bd-8359d004fce0', '{"action":"token_revoked","actor_id":"16e3bf22-3633-481e-8b96-1ffc37b0203c","actor_username":"admin@appseniors.fr","actor_via_sso":false,"log_type":"token"}', '2026-02-25 10:47:06.241787+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '70518b56-20e9-439e-9d36-621a508c1654', '{"action":"token_refreshed","actor_id":"16e3bf22-3633-481e-8b96-1ffc37b0203c","actor_username":"admin@appseniors.fr","actor_via_sso":false,"log_type":"token"}', '2026-02-25 11:46:22.939642+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '618e0005-6e2f-4e20-8676-2353335c0b72', '{"action":"token_revoked","actor_id":"16e3bf22-3633-481e-8b96-1ffc37b0203c","actor_username":"admin@appseniors.fr","actor_via_sso":false,"log_type":"token"}', '2026-02-25 11:46:22.94793+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', '8c7ac9c2-ce37-4ff8-902a-0ba158e89687', '{"action":"login","actor_id":"16e3bf22-3633-481e-8b96-1ffc37b0203c","actor_username":"admin@appseniors.fr","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-25 11:50:10.458867+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'b80bc946-cfc9-4088-a9ac-9843fed75b27', '{"action":"login","actor_id":"16e3bf22-3633-481e-8b96-1ffc37b0203c","actor_username":"admin@appseniors.fr","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-25 12:00:22.186031+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'eeb4e5ce-5e18-4036-832e-d11fb9bdeddc', '{"action":"login","actor_id":"16e3bf22-3633-481e-8b96-1ffc37b0203c","actor_username":"admin@appseniors.fr","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-25 13:15:56.576187+00', '');
INSERT INTO auth.audit_log_entries VALUES ('00000000-0000-0000-0000-000000000000', 'ac567e23-830d-4db1-acd2-2f989ec1f4c8', '{"action":"login","actor_id":"16e3bf22-3633-481e-8b96-1ffc37b0203c","actor_username":"admin@appseniors.fr","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-02-25 13:20:14.437295+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO auth.identities VALUES ('16e3bf22-3633-481e-8b96-1ffc37b0203c', '16e3bf22-3633-481e-8b96-1ffc37b0203c', '{"sub": "16e3bf22-3633-481e-8b96-1ffc37b0203c", "email": "admin@appseniors.fr", "email_verified": false, "phone_verified": false}', 'email', '2026-02-24 12:26:02.572888+00', '2026-02-24 12:26:02.572996+00', '2026-02-24 12:26:02.572996+00', DEFAULT, 'cc88c54a-ef84-4420-b515-7ea36777d0ed');
INSERT INTO auth.identities VALUES ('8164b752-2d28-4fa0-b402-9c4d56cbf261', '8164b752-2d28-4fa0-b402-9c4d56cbf261', '{"sub": "8164b752-2d28-4fa0-b402-9c4d56cbf261", "email": "support@appseniors.fr", "email_verified": false, "phone_verified": false}', 'email', '2026-02-24 12:35:18.5069+00', '2026-02-24 12:35:18.507004+00', '2026-02-24 12:35:18.507004+00', DEFAULT, '5c46e59a-7094-42b3-8af4-c07cf0e02913');
INSERT INTO auth.identities VALUES ('f9b6a4cf-8def-4adf-b113-d8db46eef2e5', 'f9b6a4cf-8def-4adf-b113-d8db46eef2e5', '{"sub": "f9b6a4cf-8def-4adf-b113-d8db46eef2e5", "email": "mod@appseniors.fr", "email_verified": false, "phone_verified": false}', 'email', '2026-02-24 12:35:31.108065+00', '2026-02-24 12:35:31.10814+00', '2026-02-24 12:35:31.10814+00', DEFAULT, 'f428f009-db8b-47ca-b7d8-aa85ad038bf4');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO auth.mfa_amr_claims VALUES ('54c90402-44e1-4880-9c38-0fd7fc308cd9', '2026-02-24 13:17:51.523788+00', '2026-02-24 13:17:51.523788+00', 'password', '8872e82f-8d21-4474-a431-16c3d053fa6f');
INSERT INTO auth.mfa_amr_claims VALUES ('52961ea6-286b-4e29-bc12-134d7aa78c76', '2026-02-25 11:50:10.463607+00', '2026-02-25 11:50:10.463607+00', 'password', '0a42814f-6fc5-46cb-8144-881b374bb295');
INSERT INTO auth.mfa_amr_claims VALUES ('7c2a3f59-61a5-4a95-8519-1fbe91932345', '2026-02-25 12:00:22.197391+00', '2026-02-25 12:00:22.197391+00', 'password', 'dedb8e95-8294-4fea-a0ff-1c482af81678');
INSERT INTO auth.mfa_amr_claims VALUES ('ce4a176d-398f-48e3-837a-ad0c5fc246d4', '2026-02-25 13:15:56.973245+00', '2026-02-25 13:15:56.973245+00', 'password', '64ce3f93-bff5-42e6-937c-0cf47eaf6d27');
INSERT INTO auth.mfa_amr_claims VALUES ('b358c420-9f0a-41c5-81bc-5deae0f3a72b', '2026-02-25 13:20:14.498672+00', '2026-02-25 13:20:14.498672+00', 'password', '1e83a4b3-c572-48c2-96d9-9c9c6829a806');


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO auth.refresh_tokens VALUES ('00000000-0000-0000-0000-000000000000', 71, 'fb5kkjujmeji', '16e3bf22-3633-481e-8b96-1ffc37b0203c', true, '2026-02-24 13:17:51.514211+00', '2026-02-24 14:19:12.532047+00', NULL, '54c90402-44e1-4880-9c38-0fd7fc308cd9');
INSERT INTO auth.refresh_tokens VALUES ('00000000-0000-0000-0000-000000000000', 72, 'pmmfzvfwiwr7', '16e3bf22-3633-481e-8b96-1ffc37b0203c', true, '2026-02-24 14:19:12.534816+00', '2026-02-24 15:19:34.610823+00', 'fb5kkjujmeji', '54c90402-44e1-4880-9c38-0fd7fc308cd9');
INSERT INTO auth.refresh_tokens VALUES ('00000000-0000-0000-0000-000000000000', 73, '3l5rsumhbaf4', '16e3bf22-3633-481e-8b96-1ffc37b0203c', true, '2026-02-24 15:19:34.613289+00', '2026-02-24 16:19:54.688432+00', 'pmmfzvfwiwr7', '54c90402-44e1-4880-9c38-0fd7fc308cd9');
INSERT INTO auth.refresh_tokens VALUES ('00000000-0000-0000-0000-000000000000', 74, '3pdqy2wiabdi', '16e3bf22-3633-481e-8b96-1ffc37b0203c', true, '2026-02-24 16:19:54.691307+00', '2026-02-25 10:47:06.24414+00', '3l5rsumhbaf4', '54c90402-44e1-4880-9c38-0fd7fc308cd9');
INSERT INTO auth.refresh_tokens VALUES ('00000000-0000-0000-0000-000000000000', 75, 'p5tn4xw5qpfl', '16e3bf22-3633-481e-8b96-1ffc37b0203c', true, '2026-02-25 10:47:06.248103+00', '2026-02-25 11:46:22.953691+00', '3pdqy2wiabdi', '54c90402-44e1-4880-9c38-0fd7fc308cd9');
INSERT INTO auth.refresh_tokens VALUES ('00000000-0000-0000-0000-000000000000', 76, 'wfiuc6l27g6u', '16e3bf22-3633-481e-8b96-1ffc37b0203c', false, '2026-02-25 11:46:22.957964+00', '2026-02-25 11:46:22.957964+00', 'p5tn4xw5qpfl', '54c90402-44e1-4880-9c38-0fd7fc308cd9');
INSERT INTO auth.refresh_tokens VALUES ('00000000-0000-0000-0000-000000000000', 77, '54r7hou664ba', '16e3bf22-3633-481e-8b96-1ffc37b0203c', false, '2026-02-25 11:50:10.46177+00', '2026-02-25 11:50:10.46177+00', NULL, '52961ea6-286b-4e29-bc12-134d7aa78c76');
INSERT INTO auth.refresh_tokens VALUES ('00000000-0000-0000-0000-000000000000', 78, 'yavah4n2axkl', '16e3bf22-3633-481e-8b96-1ffc37b0203c', false, '2026-02-25 12:00:22.194107+00', '2026-02-25 12:00:22.194107+00', NULL, '7c2a3f59-61a5-4a95-8519-1fbe91932345');
INSERT INTO auth.refresh_tokens VALUES ('00000000-0000-0000-0000-000000000000', 79, 'm5jfdd2jcd4t', '16e3bf22-3633-481e-8b96-1ffc37b0203c', false, '2026-02-25 13:15:56.889644+00', '2026-02-25 13:15:56.889644+00', NULL, 'ce4a176d-398f-48e3-837a-ad0c5fc246d4');
INSERT INTO auth.refresh_tokens VALUES ('00000000-0000-0000-0000-000000000000', 80, 'fuwem22ztvfp', '16e3bf22-3633-481e-8b96-1ffc37b0203c', false, '2026-02-25 13:20:14.446959+00', '2026-02-25 13:20:14.446959+00', NULL, 'b358c420-9f0a-41c5-81bc-5deae0f3a72b');


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO auth.schema_migrations VALUES ('20171026211738');
INSERT INTO auth.schema_migrations VALUES ('20171026211808');
INSERT INTO auth.schema_migrations VALUES ('20171026211834');
INSERT INTO auth.schema_migrations VALUES ('20180103212743');
INSERT INTO auth.schema_migrations VALUES ('20180108183307');
INSERT INTO auth.schema_migrations VALUES ('20180119214651');
INSERT INTO auth.schema_migrations VALUES ('20180125194653');
INSERT INTO auth.schema_migrations VALUES ('00');
INSERT INTO auth.schema_migrations VALUES ('20210710035447');
INSERT INTO auth.schema_migrations VALUES ('20210722035447');
INSERT INTO auth.schema_migrations VALUES ('20210730183235');
INSERT INTO auth.schema_migrations VALUES ('20210909172000');
INSERT INTO auth.schema_migrations VALUES ('20210927181326');
INSERT INTO auth.schema_migrations VALUES ('20211122151130');
INSERT INTO auth.schema_migrations VALUES ('20211124214934');
INSERT INTO auth.schema_migrations VALUES ('20211202183645');
INSERT INTO auth.schema_migrations VALUES ('20220114185221');
INSERT INTO auth.schema_migrations VALUES ('20220114185340');
INSERT INTO auth.schema_migrations VALUES ('20220224000811');
INSERT INTO auth.schema_migrations VALUES ('20220323170000');
INSERT INTO auth.schema_migrations VALUES ('20220429102000');
INSERT INTO auth.schema_migrations VALUES ('20220531120530');
INSERT INTO auth.schema_migrations VALUES ('20220614074223');
INSERT INTO auth.schema_migrations VALUES ('20220811173540');
INSERT INTO auth.schema_migrations VALUES ('20221003041349');
INSERT INTO auth.schema_migrations VALUES ('20221003041400');
INSERT INTO auth.schema_migrations VALUES ('20221011041400');
INSERT INTO auth.schema_migrations VALUES ('20221020193600');
INSERT INTO auth.schema_migrations VALUES ('20221021073300');
INSERT INTO auth.schema_migrations VALUES ('20221021082433');
INSERT INTO auth.schema_migrations VALUES ('20221027105023');
INSERT INTO auth.schema_migrations VALUES ('20221114143122');
INSERT INTO auth.schema_migrations VALUES ('20221114143410');
INSERT INTO auth.schema_migrations VALUES ('20221125140132');
INSERT INTO auth.schema_migrations VALUES ('20221208132122');
INSERT INTO auth.schema_migrations VALUES ('20221215195500');
INSERT INTO auth.schema_migrations VALUES ('20221215195800');
INSERT INTO auth.schema_migrations VALUES ('20221215195900');
INSERT INTO auth.schema_migrations VALUES ('20230116124310');
INSERT INTO auth.schema_migrations VALUES ('20230116124412');
INSERT INTO auth.schema_migrations VALUES ('20230131181311');
INSERT INTO auth.schema_migrations VALUES ('20230322519590');
INSERT INTO auth.schema_migrations VALUES ('20230402418590');
INSERT INTO auth.schema_migrations VALUES ('20230411005111');
INSERT INTO auth.schema_migrations VALUES ('20230508135423');
INSERT INTO auth.schema_migrations VALUES ('20230523124323');
INSERT INTO auth.schema_migrations VALUES ('20230818113222');
INSERT INTO auth.schema_migrations VALUES ('20230914180801');
INSERT INTO auth.schema_migrations VALUES ('20231027141322');
INSERT INTO auth.schema_migrations VALUES ('20231114161723');
INSERT INTO auth.schema_migrations VALUES ('20231117164230');
INSERT INTO auth.schema_migrations VALUES ('20240115144230');
INSERT INTO auth.schema_migrations VALUES ('20240214120130');
INSERT INTO auth.schema_migrations VALUES ('20240306115329');
INSERT INTO auth.schema_migrations VALUES ('20240314092811');
INSERT INTO auth.schema_migrations VALUES ('20240427152123');
INSERT INTO auth.schema_migrations VALUES ('20240612123726');
INSERT INTO auth.schema_migrations VALUES ('20240729123726');
INSERT INTO auth.schema_migrations VALUES ('20240802193726');
INSERT INTO auth.schema_migrations VALUES ('20240806073726');
INSERT INTO auth.schema_migrations VALUES ('20241009103726');


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO auth.sessions VALUES ('54c90402-44e1-4880-9c38-0fd7fc308cd9', '16e3bf22-3633-481e-8b96-1ffc37b0203c', '2026-02-24 13:17:51.495171+00', '2026-02-25 11:46:22.991317+00', NULL, 'aal1', NULL, '2026-02-25 11:46:22.989049', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '172.18.0.1', NULL);
INSERT INTO auth.sessions VALUES ('52961ea6-286b-4e29-bc12-134d7aa78c76', '16e3bf22-3633-481e-8b96-1ffc37b0203c', '2026-02-25 11:50:10.460198+00', '2026-02-25 11:50:10.460198+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '172.18.0.1', NULL);
INSERT INTO auth.sessions VALUES ('7c2a3f59-61a5-4a95-8519-1fbe91932345', '16e3bf22-3633-481e-8b96-1ffc37b0203c', '2026-02-25 12:00:22.190397+00', '2026-02-25 12:00:22.190397+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '172.18.0.1', NULL);
INSERT INTO auth.sessions VALUES ('ce4a176d-398f-48e3-837a-ad0c5fc246d4', '16e3bf22-3633-481e-8b96-1ffc37b0203c', '2026-02-25 13:15:56.82259+00', '2026-02-25 13:15:56.82259+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '172.18.0.1', NULL);
INSERT INTO auth.sessions VALUES ('b358c420-9f0a-41c5-81bc-5deae0f3a72b', '16e3bf22-3633-481e-8b96-1ffc37b0203c', '2026-02-25 13:20:14.440412+00', '2026-02-25 13:20:14.440412+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '172.18.0.1', NULL);


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO auth.users VALUES ('00000000-0000-0000-0000-000000000000', '16e3bf22-3633-481e-8b96-1ffc37b0203c', 'authenticated', 'authenticated', 'admin@appseniors.fr', '$2a$10$Yt9C9BlK4DDCyfd4yLLmcu4WUKOdzTqSe/h57SNx0ncqEp/IdAxtW', '2026-02-24 12:26:02.588369+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-02-25 13:20:14.43995+00', '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2026-02-24 12:26:02.565442+00', '2026-02-25 13:20:14.496723+00', NULL, NULL, '', '', NULL, DEFAULT, '', 0, NULL, '', NULL, false, NULL, false);
INSERT INTO auth.users VALUES ('00000000-0000-0000-0000-000000000000', '8164b752-2d28-4fa0-b402-9c4d56cbf261', 'authenticated', 'authenticated', 'support@appseniors.fr', '$2a$10$HfOr9HnvqQ5OkvKhkVb.seJzBCbBYfI4ULfsgVUX/7bTe7NUjleC2', '2026-02-24 12:35:18.515524+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-02-24 12:36:11.274522+00', '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2026-02-24 12:35:18.502656+00', '2026-02-24 12:36:11.27916+00', NULL, NULL, '', '', NULL, DEFAULT, '', 0, NULL, '', NULL, false, NULL, false);
INSERT INTO auth.users VALUES ('00000000-0000-0000-0000-000000000000', 'f9b6a4cf-8def-4adf-b113-d8db46eef2e5', 'authenticated', 'authenticated', 'mod@appseniors.fr', '$2a$10$MaPW2DlDH6Sk/rLEDmqLreKVaSj2ysBK8POHmE1vsamybj0cATZ/q', '2026-02-24 12:35:31.113968+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-02-24 12:38:37.183135+00', '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2026-02-24 12:35:31.100523+00', '2026-02-24 12:38:37.194043+00', NULL, NULL, '', '', NULL, DEFAULT, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: ActiviteRemuneree; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: ActiviteRemuneree_Utilisateurs; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Agenda; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Aidant; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Aidant" VALUES (1, 10, 'À définir', 0.000000);
INSERT INTO public."Aidant" VALUES (2, 11, 'À définir', 0.000000);
INSERT INTO public."Aidant" VALUES (3, 12, 'À définir', 0.000000);
INSERT INTO public."Aidant" VALUES (4, 13, 'À définir', 0.000000);
INSERT INTO public."Aidant" VALUES (5, 14, 'À définir', 0.000000);


--
-- Data for Name: Aidant_Competences; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: AssuranceDeces; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: BesoinSenior; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: BonPlan; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: BonPlan_Utilisateurs; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: CagnotteDeces; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: CandidatureAidant; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: CatUtilisateurs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."CatUtilisateurs" VALUES (1, true, false, false, false, false, false, false);
INSERT INTO public."CatUtilisateurs" VALUES (2, false, true, false, false, false, false, false);
INSERT INTO public."CatUtilisateurs" VALUES (3, false, false, true, false, false, false, false);
INSERT INTO public."CatUtilisateurs" VALUES (4, false, false, false, true, false, false, false);
INSERT INTO public."CatUtilisateurs" VALUES (5, false, false, false, false, true, false, false);
INSERT INTO public."CatUtilisateurs" VALUES (6, false, false, false, false, false, true, false);
INSERT INTO public."CatUtilisateurs" VALUES (7, false, false, false, false, false, false, false);
INSERT INTO public."CatUtilisateurs" VALUES (8, false, false, false, false, false, false, true);


--
-- Data for Name: CategorieDocument; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."CategorieDocument" VALUES (1, 'Justificatif de domicile');
INSERT INTO public."CategorieDocument" VALUES (2, 'Contrat d’intervention');
INSERT INTO public."CategorieDocument" VALUES (3, 'Document médical');
INSERT INTO public."CategorieDocument" VALUES (4, 'Pièce d’identité');
INSERT INTO public."CategorieDocument" VALUES (5, 'Autre');


--
-- Data for Name: CategorieOrganisme; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: CategorieRessource; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Commande; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Competences; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: ConsentementCookies; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: ContactUrgence; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: ContratCohabitation; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: DemandeRGPD; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Devise; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Devise" VALUES (1, 'EUR');
INSERT INTO public."Devise" VALUES (2, 'USD');
INSERT INTO public."Devise" VALUES (3, 'GBP');
INSERT INTO public."Devise" VALUES (4, 'CHF');
INSERT INTO public."Devise" VALUES (5, 'CAD');


--
-- Data for Name: Devise_Utilisateurs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Devise_Utilisateurs" VALUES (2, 1);
INSERT INTO public."Devise_Utilisateurs" VALUES (1, 1);


--
-- Data for Name: DirectivesAnticipees; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Document; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: DocumentPatrimonial; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: DocumentRGPD; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Domaine; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Domaine" VALUES (2, 'Santé');
INSERT INTO public."Domaine" VALUES (3, 'Aide à domicile');
INSERT INTO public."Domaine" VALUES (4, 'Informatique');
INSERT INTO public."Domaine" VALUES (5, 'Sécurité');
INSERT INTO public."Domaine" VALUES (6, 'Bricolage');
INSERT INTO public."Domaine" VALUES (7, 'Jardinage');
INSERT INTO public."Domaine" VALUES (8, 'Sport');
INSERT INTO public."Domaine" VALUES (9, 'Bien-être');


--
-- Data for Name: DonCagnotte; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: EquipementMedical; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Evaluation; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Evaluation" VALUES (1, 1, 5, 'Ponctuel et très pédagogue.', '2026-02-24 13:06:33.801', 5, NULL, NULL);


--
-- Data for Name: EvaluationCohabitation; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Evenements; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Facture; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Forum; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Forum" VALUES (1, 'Conseils Jardinage', 'Quelques conseil en jardinage ne serait pas de refus. ', 'Jardinage', true, '2026-02-24', 6);


--
-- Data for Name: Groupe; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Groupe" VALUES (1, 'Club de Bridge', 'Groupe pour les passionnés de bridge', '2026-02-24', 6);


--
-- Data for Name: HistoriqueConnexion; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: HistoriqueInteractions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Humeur; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Langue; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Langue" VALUES (1, 'Français');
INSERT INTO public."Langue" VALUES (2, 'Anglais');
INSERT INTO public."Langue" VALUES (3, 'Espagnol');
INSERT INTO public."Langue" VALUES (4, 'Allemand');
INSERT INTO public."Langue" VALUES (5, 'Italien');


--
-- Data for Name: Langue_Utilisateurs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Langue_Utilisateurs" VALUES (2, 1, 5);
INSERT INTO public."Langue_Utilisateurs" VALUES (1, 1, 1);


--
-- Data for Name: LienPartenariat; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Localisation; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: LogementSenior; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Medicament; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: MessageGroupe; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."MessageGroupe" VALUES (1, 6, '2026-02-24', 'Bonjour à tous ! et bienvenue dans ce tout nouveau club de Bridge. ', 1);
INSERT INTO public."MessageGroupe" VALUES (2, 9, '2026-02-24', 'Un groupe idiot', 1);


--
-- Data for Name: MiseEnRelation; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."MiseEnRelation" VALUES (1, 15, 1, 1, '2026-02-24 13:06:33.498', 1.00, 45.000000, '2026-02-24 13:06:33.498', '2026-02-24 13:06:33.498', NULL, NULL, NULL, NULL, 'en_attente');


--
-- Data for Name: MiseEnRelation_Prestation; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."MiseEnRelation_Prestation" VALUES (15, 1, 1);


--
-- Data for Name: MoyenPaiement; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."MoyenPaiement" VALUES (1, 'Carte bancaire', '2025-07-07 08:46:22.294');
INSERT INTO public."MoyenPaiement" VALUES (2, 'Virement bancaire', '2025-07-07 08:46:52.485');
INSERT INTO public."MoyenPaiement" VALUES (5, 'Commande-1752221881318', '2025-07-11 08:18:01.319');
INSERT INTO public."MoyenPaiement" VALUES (6, 'Commande-1753041412650', '2025-07-20 19:56:52.65');
INSERT INTO public."MoyenPaiement" VALUES (7, 'Commande-1753089612996', '2025-07-21 09:20:12.996');


--
-- Data for Name: Notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: ObjetPrete; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: OffreSenior; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Organisme; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Parametres; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: ParametresCommission; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."ParametresCommission" VALUES (1, 'Commande', 5);
INSERT INTO public."ParametresCommission" VALUES (3, 'PostMortem', 5);
INSERT INTO public."ParametresCommission" VALUES (2, 'Activite', 5);


--
-- Data for Name: Partenaire; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Partenaire_Services; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Pieces; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Prestation; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Prestation" VALUES (15, 'Installation d''une box internet et configuration tablette.', 'Assistance Informatique', 4, 45.000000, '2026-02-24');


--
-- Data for Name: PrestationAidant; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: PrestationSupport; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Prestation_Localisation; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Produit; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Produit_Commande; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: RapportMensuel; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: RendezVousMedical; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: ReponseForum; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: ReponsesSupport; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Ressource; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Seniors; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Seniors" VALUES (1, 5, 2, NULL, false, NULL);
INSERT INTO public."Seniors" VALUES (2, 6, 2, NULL, false, NULL);
INSERT INTO public."Seniors" VALUES (3, 7, 2, NULL, false, NULL);
INSERT INTO public."Seniors" VALUES (4, 8, 2, NULL, false, NULL);
INSERT INTO public."Seniors" VALUES (5, 9, 2, NULL, false, NULL);


--
-- Data for Name: Seniors_TypeMaladie; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: ServicePartenaire; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."ServicePartenaire" VALUES (1, 'Ménage');
INSERT INTO public."ServicePartenaire" VALUES (2, 'Livraison');


--
-- Data for Name: ServicePostMortem; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: SignalementContenu; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."SignalementContenu" VALUES (1, 6, 'Contenu inapproprié', '2026-02-24 00:00:00', false, NULL, 2, NULL);


--
-- Data for Name: Souvenir; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Structures; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: SujetForum; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."SujetForum" VALUES (1, 1, 6, '2026-02-24', 0, 'Jardinage', 'Le sujet concerne le jardinage');
INSERT INTO public."SujetForum" VALUES (2, 1, 7, '2026-02-24', 0, 'Traitement des aliments', 'Comment reconnaitre des tomates bien mures ? ');


--
-- Data for Name: SupportClient; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: TMessage; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: TypeMaladie; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: TypePieces; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Utilisateurs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Utilisateurs" VALUES (5, 1, 'Gérard', 'Bernadette', '1945-05-12 00:00:00', '12 rue des Lilas, Paris', 'bernadette.g@gmail.com', '0611223344', 'Féminin', '2026-01-15 00:00:00', '2026-02-24 12:23:09.478327', false, 'Besoin de visites régulières', '\x', 'fr', false, NULL);
INSERT INTO public."Utilisateurs" VALUES (6, 1, 'Dubois', 'Henri', '1938-11-20 00:00:00', '5 avenue Foch, Nice', 'henri.dubois@orange.fr', '0622334455', 'Masculin', '2026-02-01 00:00:00', '2026-02-24 12:23:09.478327', false, 'Ancien professeur, vit seul', '\x', 'fr', false, NULL);
INSERT INTO public."Utilisateurs" VALUES (7, 1, 'Lefort', 'Marie-Louise', '1950-03-08 00:00:00', '22 place du Marché, Lyon', 'marie.louise@wanadoo.fr', '0633445566', 'Féminin', '2026-02-10 00:00:00', '2026-02-24 12:23:09.478327', false, 'Cherche aide pour les courses', '\x', 'fr', false, NULL);
INSERT INTO public."Utilisateurs" VALUES (8, 1, 'Prévost', 'Jacques', '1942-07-30 00:00:00', '8 rue de la Paix, Bordeaux', 'jacques.prevost@gmail.com', '0644556677', 'Masculin', '2026-02-15 00:00:00', '2026-02-24 12:23:09.478327', false, 'Passionné de bridge et lecture', '\x', 'fr', false, NULL);
INSERT INTO public."Utilisateurs" VALUES (9, 1, 'Vey', 'Simone', '1947-09-14 00:00:00', '3 impasse des Pins, Nantes', 'simone.ve@yahoo.fr', '0655667788', 'Féminin', '2026-02-20 00:00:00', '2026-02-24 12:23:09.478327', false, 'Mobilité réduite, aide ponctuelle', '\x', 'fr', false, NULL);
INSERT INTO public."Utilisateurs" VALUES (10, 4, 'Vial', 'Lucas', '1992-04-25 00:00:00', '15 rue Gambetta, Paris', 'lucas.infirmier@gmail.com', '0710203040', 'Masculin', '2026-02-24 12:23:09.478327', '2026-02-24 12:23:09.478327', false, 'Infirmier de nuit', '\x', 'fr', false, NULL);
INSERT INTO public."Utilisateurs" VALUES (11, 4, 'Moreau', 'Julie', '1995-12-10 00:00:00', '40 bd de la Liberté, Lyon', 'julie.aide@outlook.fr', '0720304050', 'Féminin', '2026-02-24 12:23:09.478327', '2026-02-24 12:23:09.478327', false, 'Aide à domicile diplômée', '\x', 'fr', false, NULL);
INSERT INTO public."Utilisateurs" VALUES (12, 4, 'Garcia', 'Thomas', '1988-06-15 00:00:00', '1 place Bellecour, Lyon', 'thomas.soc@pro.fr', '0730405060', 'Masculin', '2026-02-24 12:23:09.478327', '2026-02-24 12:23:09.478327', false, 'Accompagnement social', '\x', 'fr', false, NULL);
INSERT INTO public."Utilisateurs" VALUES (13, 4, 'Masson', 'Élodie', '1990-01-20 00:00:00', '7 quai de Seine, Paris', 'elodie.med@orange.fr', '0740506070', 'Féminin', '2026-02-24 12:23:09.478327', '2026-02-24 12:23:09.478327', false, 'Auxiliaire de vie', '\x', 'fr', false, NULL);
INSERT INTO public."Utilisateurs" VALUES (14, 4, 'Chen', 'Sarah', '1998-08-05 00:00:00', '12 rue du Port, Marseille', 'sarah.aidant@gmail.com', '0750607080', 'Féminin', '2026-02-24 12:23:09.478327', '2026-02-24 12:23:09.478327', false, 'Étudiante en médecine', '\x', 'fr', false, NULL);
INSERT INTO public."Utilisateurs" VALUES (4, NULL, 'Petit', 'Claire-Visu', '1995-07-30 00:00:00', 'Archive, Paris', 'lecture@appseniors.fr', '0234567890', 'Féminin', '2026-02-24 12:23:09.478327', '2026-02-24 12:23:09.478327', false, 'Accès consultation seule', '\x', 'fr', false, NULL);
INSERT INTO public."Utilisateurs" VALUES (1, 5, 'Jadid', 'Mohamed', '1985-06-15 00:00:00', 'Siège Social, Paris', 'admin@appseniors.fr', '0613650602', 'Masculin', '2026-02-24 12:23:09.478327', '2026-02-24 12:23:09.478327', false, 'Compte administrateur principal', '\x', 'fr', false, '16e3bf22-3633-481e-8b96-1ffc37b0203c');
INSERT INTO public."Utilisateurs" VALUES (2, 8, 'Martin', 'Sophie-Support', '1992-03-22 00:00:00', 'Bureau Support, Lyon', 'support@appseniors.fr', '0456789123', 'Féminin', '2026-02-24 12:23:09.478327', '2026-02-24 12:37:05.918', false, 'Agent support client', '\x', 'fr', false, '8164b752-2d28-4fa0-b402-9c4d56cbf261');
INSERT INTO public."Utilisateurs" VALUES (3, 6, 'Lefebvre', 'Marc-Modo', '1988-11-12 00:00:00', 'Télétravail, Nantes', 'mod@appseniors.fr', '0612345678', 'Masculin', '2026-02-24 12:23:09.478327', '2026-02-24 12:23:09.478327', false, 'Modérateur forums et groupes', '\x', 'fr', false, 'f9b6a4cf-8def-4adf-b113-d8db46eef2e5');


--
-- Data for Name: Utilisateurs_Groupe; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Utilisateurs_Groupe" VALUES (1, 6);
INSERT INTO public."Utilisateurs_Groupe" VALUES (1, 7);
INSERT INTO public."Utilisateurs_Groupe" VALUES (1, 8);
INSERT INTO public."Utilisateurs_Groupe" VALUES (1, 9);


--
-- Data for Name: Utilisateurs_Localisation; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: VersementCommissions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: messages_2026_02_23; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--



--
-- Data for Name: messages_2026_02_24; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--



--
-- Data for Name: messages_2026_02_25; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--



--
-- Data for Name: messages_2026_02_26; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--



--
-- Data for Name: messages_2026_02_27; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--



--
-- Data for Name: messages_2026_02_28; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--



--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

INSERT INTO realtime.schema_migrations VALUES (20211116024918, '2026-02-24 10:12:23');
INSERT INTO realtime.schema_migrations VALUES (20211116045059, '2026-02-24 10:12:23');
INSERT INTO realtime.schema_migrations VALUES (20211116050929, '2026-02-24 10:12:23');
INSERT INTO realtime.schema_migrations VALUES (20211116051442, '2026-02-24 10:12:23');
INSERT INTO realtime.schema_migrations VALUES (20211116212300, '2026-02-24 10:12:23');
INSERT INTO realtime.schema_migrations VALUES (20211116213355, '2026-02-24 10:12:23');
INSERT INTO realtime.schema_migrations VALUES (20211116213934, '2026-02-24 10:12:23');
INSERT INTO realtime.schema_migrations VALUES (20211116214523, '2026-02-24 10:12:23');
INSERT INTO realtime.schema_migrations VALUES (20211122062447, '2026-02-24 10:12:23');
INSERT INTO realtime.schema_migrations VALUES (20211124070109, '2026-02-24 10:12:23');
INSERT INTO realtime.schema_migrations VALUES (20211202204204, '2026-02-24 10:12:23');
INSERT INTO realtime.schema_migrations VALUES (20211202204605, '2026-02-24 10:12:23');
INSERT INTO realtime.schema_migrations VALUES (20211210212804, '2026-02-24 10:12:23');
INSERT INTO realtime.schema_migrations VALUES (20211228014915, '2026-02-24 10:12:23');
INSERT INTO realtime.schema_migrations VALUES (20220107221237, '2026-02-24 10:12:23');
INSERT INTO realtime.schema_migrations VALUES (20220228202821, '2026-02-24 10:12:23');
INSERT INTO realtime.schema_migrations VALUES (20220312004840, '2026-02-24 10:12:23');
INSERT INTO realtime.schema_migrations VALUES (20220603231003, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20220603232444, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20220615214548, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20220712093339, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20220908172859, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20220916233421, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20230119133233, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20230128025114, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20230128025212, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20230227211149, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20230228184745, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20230308225145, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20230328144023, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20231018144023, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20231204144023, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20231204144024, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20231204144025, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20240108234812, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20240109165339, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20240227174441, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20240311171622, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20240321100241, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20240401105812, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20240418121054, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20240523004032, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20240618124746, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20240801235015, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20240805133720, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20240827160934, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20240919163303, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20240919163305, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20241019105805, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20241030150047, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20241108114728, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20241121104152, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20241130184212, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20241220035512, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20241220123912, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20241224161212, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20250107150512, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20250110162412, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20250123174212, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20250128220012, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20250506224012, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20250523164012, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20250714121412, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20250905041441, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20251103001201, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20251120212548, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20251120215549, '2026-02-24 10:12:24');
INSERT INTO realtime.schema_migrations VALUES (20260218120000, '2026-02-24 10:12:24');


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--



--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO storage.buckets VALUES ('avatars', 'avatars', NULL, '2025-07-04 12:17:54.13515+00', '2025-07-04 12:17:54.13515+00', true, false, NULL, NULL, NULL, 'STANDARD');
INSERT INTO storage.buckets VALUES ('support-files', 'support-files', NULL, '2025-07-09 10:04:12.722473+00', '2025-07-09 10:04:12.722473+00', true, false, 52428800, '{application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,image/jpeg,image/png,image/gif}', NULL, 'STANDARD');
INSERT INTO storage.buckets VALUES ('documents', 'documents', NULL, '2025-07-03 12:54:26.621599+00', '2025-07-03 12:54:26.621599+00', true, false, NULL, NULL, NULL, 'STANDARD');
INSERT INTO storage.buckets VALUES ('documents-rgpd', 'documents-rgpd', NULL, '2025-07-03 14:56:05.510778+00', '2025-07-03 14:56:05.510778+00', true, false, NULL, NULL, NULL, 'STANDARD');


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: iceberg_namespaces; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: iceberg_tables; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO storage.migrations VALUES (0, 'create-migrations-table', 'e18db593bcde2aca2a408c4d1100f6abba2195df', '2026-02-24 10:12:36.362255');
INSERT INTO storage.migrations VALUES (1, 'initialmigration', '6ab16121fbaa08bbd11b712d05f358f9b555d777', '2026-02-24 10:12:36.374753');
INSERT INTO storage.migrations VALUES (2, 'storage-schema', 'f6a1fa2c93cbcd16d4e487b362e45fca157a8dbd', '2026-02-24 10:12:36.387475');
INSERT INTO storage.migrations VALUES (3, 'pathtoken-column', '2cb1b0004b817b29d5b0a971af16bafeede4b70d', '2026-02-24 10:12:36.432703');
INSERT INTO storage.migrations VALUES (4, 'add-migrations-rls', '427c5b63fe1c5937495d9c635c263ee7a5905058', '2026-02-24 10:12:36.471178');
INSERT INTO storage.migrations VALUES (5, 'add-size-functions', '79e081a1455b63666c1294a440f8ad4b1e6a7f84', '2026-02-24 10:12:36.481633');
INSERT INTO storage.migrations VALUES (6, 'change-column-name-in-get-size', 'ded78e2f1b5d7e616117897e6443a925965b30d2', '2026-02-24 10:12:36.517629');
INSERT INTO storage.migrations VALUES (7, 'add-rls-to-buckets', 'e7e7f86adbc51049f341dfe8d30256c1abca17aa', '2026-02-24 10:12:36.540198');
INSERT INTO storage.migrations VALUES (8, 'add-public-to-buckets', 'fd670db39ed65f9d08b01db09d6202503ca2bab3', '2026-02-24 10:12:36.553559');
INSERT INTO storage.migrations VALUES (9, 'fix-search-function', 'af597a1b590c70519b464a4ab3be54490712796b', '2026-02-24 10:12:36.562057');
INSERT INTO storage.migrations VALUES (10, 'search-files-search-function', 'b595f05e92f7e91211af1bbfe9c6a13bb3391e16', '2026-02-24 10:12:36.608386');
INSERT INTO storage.migrations VALUES (11, 'add-trigger-to-auto-update-updated_at-column', '7425bdb14366d1739fa8a18c83100636d74dcaa2', '2026-02-24 10:12:36.615396');
INSERT INTO storage.migrations VALUES (12, 'add-automatic-avif-detection-flag', '8e92e1266eb29518b6a4c5313ab8f29dd0d08df9', '2026-02-24 10:12:36.626086');
INSERT INTO storage.migrations VALUES (13, 'add-bucket-custom-limits', 'cce962054138135cd9a8c4bcd531598684b25e7d', '2026-02-24 10:12:36.632406');
INSERT INTO storage.migrations VALUES (14, 'use-bytes-for-max-size', '941c41b346f9802b411f06f30e972ad4744dad27', '2026-02-24 10:12:36.639554');
INSERT INTO storage.migrations VALUES (15, 'add-can-insert-object-function', '934146bc38ead475f4ef4b555c524ee5d66799e5', '2026-02-24 10:12:36.901333');
INSERT INTO storage.migrations VALUES (16, 'add-version', '76debf38d3fd07dcfc747ca49096457d95b1221b', '2026-02-24 10:12:37.27738');
INSERT INTO storage.migrations VALUES (17, 'drop-owner-foreign-key', 'f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101', '2026-02-24 10:12:37.332093');
INSERT INTO storage.migrations VALUES (18, 'add_owner_id_column_deprecate_owner', 'e7a511b379110b08e2f214be852c35414749fe66', '2026-02-24 10:12:37.348895');
INSERT INTO storage.migrations VALUES (19, 'alter-default-value-objects-id', '02e5e22a78626187e00d173dc45f58fa66a4f043', '2026-02-24 10:12:37.371708');
INSERT INTO storage.migrations VALUES (20, 'list-objects-with-delimiter', 'cd694ae708e51ba82bf012bba00caf4f3b6393b7', '2026-02-24 10:12:37.388932');
INSERT INTO storage.migrations VALUES (21, 's3-multipart-uploads', '8c804d4a566c40cd1e4cc5b3725a664a9303657f', '2026-02-24 10:12:37.417742');
INSERT INTO storage.migrations VALUES (22, 's3-multipart-uploads-big-ints', '9737dc258d2397953c9953d9b86920b8be0cdb73', '2026-02-24 10:12:37.478681');
INSERT INTO storage.migrations VALUES (23, 'optimize-search-function', '9d7e604cddc4b56a5422dc68c9313f4a1b6f132c', '2026-02-24 10:12:37.526427');
INSERT INTO storage.migrations VALUES (24, 'operation-function', '8312e37c2bf9e76bbe841aa5fda889206d2bf8aa', '2026-02-24 10:12:37.542163');
INSERT INTO storage.migrations VALUES (25, 'custom-metadata', 'd974c6057c3db1c1f847afa0e291e6165693b990', '2026-02-24 10:12:37.59729');
INSERT INTO storage.migrations VALUES (26, 'objects-prefixes', '215cabcb7f78121892a5a2037a09fedf9a1ae322', '2026-02-24 10:12:37.629062');
INSERT INTO storage.migrations VALUES (27, 'search-v2', '859ba38092ac96eb3964d83bf53ccc0b141663a6', '2026-02-24 10:12:37.652058');
INSERT INTO storage.migrations VALUES (28, 'object-bucket-name-sorting', 'c73a2b5b5d4041e39705814fd3a1b95502d38ce4', '2026-02-24 10:12:37.663262');
INSERT INTO storage.migrations VALUES (29, 'create-prefixes', 'ad2c1207f76703d11a9f9007f821620017a66c21', '2026-02-24 10:12:37.67723');
INSERT INTO storage.migrations VALUES (30, 'update-object-levels', '2be814ff05c8252fdfdc7cfb4b7f5c7e17f0bed6', '2026-02-24 10:12:37.689343');
INSERT INTO storage.migrations VALUES (31, 'objects-level-index', 'b40367c14c3440ec75f19bbce2d71e914ddd3da0', '2026-02-24 10:12:37.701001');
INSERT INTO storage.migrations VALUES (32, 'backward-compatible-index-on-objects', 'e0c37182b0f7aee3efd823298fb3c76f1042c0f7', '2026-02-24 10:12:37.706009');
INSERT INTO storage.migrations VALUES (33, 'backward-compatible-index-on-prefixes', 'b480e99ed951e0900f033ec4eb34b5bdcb4e3d49', '2026-02-24 10:12:37.711164');
INSERT INTO storage.migrations VALUES (34, 'optimize-search-function-v1', 'ca80a3dc7bfef894df17108785ce29a7fc8ee456', '2026-02-24 10:12:37.722827');
INSERT INTO storage.migrations VALUES (35, 'add-insert-trigger-prefixes', '458fe0ffd07ec53f5e3ce9df51bfdf4861929ccc', '2026-02-24 10:12:37.747836');
INSERT INTO storage.migrations VALUES (36, 'optimise-existing-functions', '6ae5fca6af5c55abe95369cd4f93985d1814ca8f', '2026-02-24 10:12:37.765916');
INSERT INTO storage.migrations VALUES (37, 'add-bucket-name-length-trigger', '3944135b4e3e8b22d6d4cbb568fe3b0b51df15c1', '2026-02-24 10:12:37.791216');
INSERT INTO storage.migrations VALUES (38, 'iceberg-catalog-flag-on-buckets', '02716b81ceec9705aed84aa1501657095b32e5c5', '2026-02-24 10:12:37.801606');
INSERT INTO storage.migrations VALUES (39, 'add-search-v2-sort-support', '6706c5f2928846abee18461279799ad12b279b78', '2026-02-24 10:12:37.906353');
INSERT INTO storage.migrations VALUES (40, 'fix-prefix-race-conditions-optimized', '7ad69982ae2d372b21f48fc4829ae9752c518f6b', '2026-02-24 10:12:37.917085');
INSERT INTO storage.migrations VALUES (41, 'add-object-level-update-trigger', '07fcf1a22165849b7a029deed059ffcde08d1ae0', '2026-02-24 10:12:37.932142');
INSERT INTO storage.migrations VALUES (42, 'rollback-prefix-triggers', '771479077764adc09e2ea2043eb627503c034cd4', '2026-02-24 10:12:37.938191');
INSERT INTO storage.migrations VALUES (43, 'fix-object-level', '84b35d6caca9d937478ad8a797491f38b8c2979f', '2026-02-24 10:12:37.946493');
INSERT INTO storage.migrations VALUES (44, 'vector-bucket-type', '99c20c0ffd52bb1ff1f32fb992f3b351e3ef8fb3', '2026-02-24 10:12:37.961657');
INSERT INTO storage.migrations VALUES (45, 'vector-buckets', '049e27196d77a7cb76497a85afae669d8b230953', '2026-02-24 10:12:37.973914');
INSERT INTO storage.migrations VALUES (46, 'buckets-objects-grants', 'fedeb96d60fefd8e02ab3ded9fbde05632f84aed', '2026-02-24 10:12:38.000262');
INSERT INTO storage.migrations VALUES (47, 'iceberg-table-metadata', '649df56855c24d8b36dd4cc1aeb8251aa9ad42c2', '2026-02-24 10:12:38.012934');
INSERT INTO storage.migrations VALUES (48, 'iceberg-catalog-ids', 'e0e8b460c609b9999ccd0df9ad14294613eed939', '2026-02-24 10:12:38.027572');
INSERT INTO storage.migrations VALUES (49, 'buckets-objects-grants-postgres', '072b1195d0d5a2f888af6b2302a1938dd94b8b3d', '2026-02-24 10:12:38.113403');
INSERT INTO storage.migrations VALUES (50, 'search-v2-optimised', '6323ac4f850aa14e7387eb32102869578b5bd478', '2026-02-24 10:12:38.1217');
INSERT INTO storage.migrations VALUES (51, 'index-backward-compatible-search', '2ee395d433f76e38bcd3856debaf6e0e5b674011', '2026-02-24 10:12:38.573927');
INSERT INTO storage.migrations VALUES (52, 'drop-not-used-indexes-and-functions', '5cc44c8696749ac11dd0dc37f2a3802075f3a171', '2026-02-24 10:12:38.578396');
INSERT INTO storage.migrations VALUES (53, 'drop-index-lower-name', 'd0cb18777d9e2a98ebe0bc5cc7a42e57ebe41854', '2026-02-24 10:12:38.606967');
INSERT INTO storage.migrations VALUES (54, 'drop-index-object-level', '6289e048b1472da17c31a7eba1ded625a6457e67', '2026-02-24 10:12:38.615895');
INSERT INTO storage.migrations VALUES (55, 'prevent-direct-deletes', '262a4798d5e0f2e7c8970232e03ce8be695d5819', '2026-02-24 10:12:38.621634');
INSERT INTO storage.migrations VALUES (56, 'fix-optimized-search-function', 'cb58526ebc23048049fd5bf2fd148d18b04a2073', '2026-02-24 10:12:38.634301');


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Data for Name: migrations; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--

INSERT INTO supabase_functions.migrations VALUES ('initial', '2026-02-24 10:12:14.803608+00');
INSERT INTO supabase_functions.migrations VALUES ('20210809183423_update_grants', '2026-02-24 10:12:14.803608+00');


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: supabase_migrations; Owner: postgres
--

INSERT INTO supabase_migrations.schema_migrations VALUES ('20250701083955', '{"
-- Remove the existing policies that might conflict and recreate them properly
DROP POLICY IF EXISTS \"Users can view their own documents\" ON public.\"Document\";
DROP POLICY IF EXISTS \"Users can insert their own documents\" ON public.\"Document\";
DROP POLICY IF EXISTS \"Users can update their own documents\" ON public.\"Document\";
DROP POLICY IF EXISTS \"Users can delete their own documents\" ON public.\"Document\";

-- Ensure RLS is enabled
ALTER TABLE public.\"Document\" ENABLE ROW LEVEL SECURITY;

-- Create policies for Document table with proper user ID handling
CREATE POLICY \"Users can view their own documents\" 
  ON public.\"Document\" 
  FOR SELECT 
  USING (auth.uid()::text = \"IDUtilisateurs\"::text);

CREATE POLICY \"Users can insert their own documents\" 
  ON public.\"Document\" 
  FOR INSERT 
  WITH CHECK (auth.uid()::text = \"IDUtilisateurs\"::text);

CREATE POLICY \"Users can update their own documents\" 
  ON public.\"Document\" 
  FOR UPDATE 
  USING (auth.uid()::text = \"IDUtilisateurs\"::text);

CREATE POLICY \"Users can delete their own documents\" 
  ON public.\"Document\" 
  FOR DELETE 
  USING (auth.uid()::text = \"IDUtilisateurs\"::text);

-- Create the documents bucket if it doesn''t exist
INSERT INTO storage.buckets (id, name, public)
VALUES (''documents'', ''documents'', true)
ON CONFLICT (id) DO NOTHING;

-- Remove existing storage policies and recreate them
DROP POLICY IF EXISTS \"Users can upload their own documents\" ON storage.objects;
DROP POLICY IF EXISTS \"Users can view documents\" ON storage.objects;
DROP POLICY IF EXISTS \"Users can update their own documents\" ON storage.objects;
DROP POLICY IF EXISTS \"Users can delete their own documents\" ON storage.objects;

-- Create storage policies
CREATE POLICY \"Users can upload their own documents\"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = ''documents'');

CREATE POLICY \"Users can view documents\"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = ''documents'');

CREATE POLICY \"Users can update their own documents\"
  ON storage.objects
  FOR UPDATE
  USING (bucket_id = ''documents'');

CREATE POLICY \"Users can delete their own documents\"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = ''documents'');
"}', '0eb958be-29e5-4f32-a288-404f41e91d9c', 'med.jadid@hotmail.com', NULL);
INSERT INTO supabase_migrations.schema_migrations VALUES ('20250703021650', '{"-- Temporairement désactiver RLS sur la table Document pour permettre l''upload
ALTER TABLE \"Document\" DISABLE ROW LEVEL SECURITY;"}', '', 'med.jadid@hotmail.com', NULL);
INSERT INTO supabase_migrations.schema_migrations VALUES ('20250704123646', '{"-- Temporairement, rendre le bucket avatars public pour tester
UPDATE storage.buckets SET public = true WHERE id = ''avatars'';"}', '', 'med.jadid@hotmail.com', NULL);
INSERT INTO supabase_migrations.schema_migrations VALUES ('20250707091301', '{"
-- Supprimer le trigger et la fonction pour DonCagnotte
DROP TRIGGER IF EXISTS create_commission_after_doncagnotte ON \"DonCagnotte\";
DROP FUNCTION IF EXISTS create_commission_for_doncagnotte();

-- Vérifier que les autres triggers sont toujours en place
-- (Cette requête permet de confirmer les triggers existants)
SELECT 
    trigger_name, 
    event_object_table, 
    action_timing, 
    event_manipulation
FROM information_schema.triggers 
WHERE trigger_schema = ''public'' 
AND trigger_name LIKE ''create_commission%''
ORDER BY trigger_name;
"}', '', 'med.jadid@hotmail.com', NULL);
INSERT INTO supabase_migrations.schema_migrations VALUES ('20250709012947', '{"
-- Modifier la taille du champ URLDocument pour accepter des URLs plus longues
ALTER TABLE \"DocumentPatrimonial\" 
ALTER COLUMN \"URLDocument\" TYPE TEXT;

-- Ajouter également une colonne pour la date de création si elle n''existe pas
ALTER TABLE \"DocumentPatrimonial\" 
ADD COLUMN IF NOT EXISTS \"dateCreation\" TIMESTAMP WITH TIME ZONE DEFAULT NOW();
"}', '', 'med.jadid@hotmail.com', NULL);
INSERT INTO supabase_migrations.schema_migrations VALUES ('20250710010133', '{"
-- Vérifier l''état des triggers existants
SELECT 
    trigger_name, 
    event_object_table, 
    action_timing, 
    event_manipulation,
    action_statement
FROM information_schema.triggers 
WHERE trigger_schema = ''public'' 
AND trigger_name LIKE ''%commission%''
ORDER BY trigger_name;

-- Vérifier tous les triggers sur les tables concernées
SELECT 
    t.trigger_name,
    t.event_object_table,
    t.action_timing,
    t.event_manipulation,
    t.action_statement
FROM information_schema.triggers t
WHERE t.trigger_schema = ''public''
AND t.event_object_table IN (''Commande'', ''ActiviteRemuneree_Utilisateurs'', ''ServicePostMortem'', ''DonCagnotte'')
ORDER BY t.event_object_table, t.trigger_name;

-- Vérifier l''existence des fonctions de commission
SELECT 
    routine_name,
    routine_definition
FROM information_schema.routines 
WHERE routine_schema = ''public'' 
AND routine_name LIKE ''%commission%''
ORDER BY routine_name;

-- Vérifier la structure des tables pour s''assurer que les colonnes existent
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_schema = ''public'' 
AND table_name IN (''Commande'', ''ActiviteRemuneree_Utilisateurs'', ''ServicePostMortem'', ''VersementCommissions'')
AND column_name IN (''MontantTotal'', ''MontantRevenu'', ''MontantPrestation'', ''IDCommande'', ''IDActiviteRemuneree'', ''IDServicePostMortem'')
ORDER BY table_name, column_name;

-- Vérifier si la table ServicePostMortem existe
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = ''public'' 
AND table_name = ''ServicePostMortem'';

-- Re-créer les triggers manquants si nécessaire
-- Trigger pour les commandes
DROP TRIGGER IF EXISTS trigger_commission_commande ON \"Commande\";
CREATE TRIGGER trigger_commission_commande
    AFTER INSERT ON \"Commande\"
    FOR EACH ROW
    EXECUTE FUNCTION create_commission_from_commande();

-- Trigger pour les activités rémunérées
DROP TRIGGER IF EXISTS trigger_commission_activite ON \"ActiviteRemuneree_Utilisateurs\";
CREATE TRIGGER trigger_commission_activite
    AFTER INSERT ON \"ActiviteRemuneree_Utilisateurs\"
    FOR EACH ROW
    EXECUTE FUNCTION create_commission_from_activite();

-- Trigger pour les services post-mortem (si la table existe)
DROP TRIGGER IF EXISTS trigger_commission_postmortem ON \"ServicePostMortem\";
CREATE TRIGGER trigger_commission_postmortem
    AFTER INSERT ON \"ServicePostMortem\"
    FOR EACH ROW
    EXECUTE FUNCTION create_commission_from_postmortem();

-- Trigger pour les dons (si la fonction existe)
DROP TRIGGER IF EXISTS trigger_commission_don ON \"DonCagnotte\";
CREATE TRIGGER trigger_commission_don
    AFTER INSERT ON \"DonCagnotte\"
    FOR EACH ROW
    EXECUTE FUNCTION fn_insert_commission_from_doncagnotte();
"}', '', 'med.jadid@hotmail.com', NULL);
INSERT INTO supabase_migrations.schema_migrations VALUES ('20250711080341', '{"
-- Corriger les problèmes dans la table VersementCommissions
-- Ajouter les colonnes manquantes et corriger les contraintes

-- Ajouter la colonne IDActiviteRemuneree si elle n''existe pas
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = ''VersementCommissions'' 
                   AND column_name = ''IDActiviteRemuneree'') THEN
        ALTER TABLE \"VersementCommissions\" ADD COLUMN \"IDActiviteRemuneree\" bigint;
    END IF;
END $$;

-- Ajouter la colonne IDDonCagnotte si elle n''existe pas
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = ''VersementCommissions'' 
                   AND column_name = ''IDDonCagnotte'') THEN
        ALTER TABLE \"VersementCommissions\" ADD COLUMN \"IDDonCagnotte\" bigint;
    END IF;
END $$;

-- Corriger la table ServicePostMortem pour avoir la bonne colonne
DO $$
BEGIN
    -- Vérifier si MontantPrestation existe, sinon l''ajouter
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = ''ServicePostMortem'' 
                   AND column_name = ''MontantPrestation'') THEN
        -- Si MontantUtilise existe, la renommer
        IF EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = ''ServicePostMortem'' 
                   AND column_name = ''MontantUtilise'') THEN
            ALTER TABLE \"ServicePostMortem\" RENAME COLUMN \"MontantUtilise\" TO \"MontantPrestation\";
        ELSE
            -- Sinon créer la colonne
            ALTER TABLE \"ServicePostMortem\" ADD COLUMN \"MontantPrestation\" numeric DEFAULT 0;
        END IF;
    END IF;
END $$;

-- Supprimer la contrainte unique sur MoyenPaiement pour éviter les doublons
ALTER TABLE \"MoyenPaiement\" DROP CONSTRAINT IF EXISTS \"MoyenPaiement_MoyenPaiement_key\";

-- Créer la table ServicePostMortem si elle n''existe pas
CREATE TABLE IF NOT EXISTS \"ServicePostMortem\" (
    \"IDServicePostMortem\" bigint PRIMARY KEY DEFAULT nextval(''\"ServicePostMortem_IDServicePostMortem_seq\"''::regclass),
    \"NomService\" character varying NOT NULL DEFAULT '''',
    \"Description\" character varying NOT NULL DEFAULT '''',
    \"MontantPrestation\" numeric NOT NULL DEFAULT 0,
    \"DateService\" date NOT NULL DEFAULT CURRENT_DATE,
    \"Prestataire\" character varying NOT NULL DEFAULT '''',
    \"StatutService\" character varying NOT NULL DEFAULT ''En attente''
);

-- Créer la séquence si elle n''existe pas
CREATE SEQUENCE IF NOT EXISTS \"ServicePostMortem_IDServicePostMortem_seq\";

-- S''assurer que les triggers sont correctement configurés
-- Supprimer les anciens triggers pour les recréer
DROP TRIGGER IF EXISTS trigger_commission_commande ON \"Commande\";
DROP TRIGGER IF EXISTS trigger_commission_activite ON \"ActiviteRemuneree_Utilisateurs\";
DROP TRIGGER IF EXISTS trigger_commission_postmortem ON \"ServicePostMortem\";
DROP TRIGGER IF EXISTS trigger_commission_don ON \"DonCagnotte\";

-- Recréer les triggers avec les bonnes fonctions
CREATE TRIGGER trigger_commission_commande
    AFTER INSERT ON \"Commande\"
    FOR EACH ROW
    EXECUTE FUNCTION create_commission_from_commande();

CREATE TRIGGER trigger_commission_activite
    AFTER INSERT ON \"ActiviteRemuneree_Utilisateurs\"
    FOR EACH ROW
    EXECUTE FUNCTION create_commission_from_activite();

CREATE TRIGGER trigger_commission_postmortem
    AFTER INSERT ON \"ServicePostMortem\"
    FOR EACH ROW
    EXECUTE FUNCTION create_commission_from_postmortem();

CREATE TRIGGER trigger_commission_don
    AFTER INSERT ON \"DonCagnotte\"
    FOR EACH ROW
    EXECUTE FUNCTION fn_insert_commission_from_doncagnotte();
"}', '', 'med.jadid@hotmail.com', NULL);
INSERT INTO supabase_migrations.schema_migrations VALUES ('20250711085607', '{"
-- Créer la vue pour les transactions financières
CREATE OR REPLACE VIEW public.v_financestransactions AS
SELECT
  aru.\"IDActiviteRemuneree\" as id,
  ''Activité rémunérée''::text as type,
  (u.\"Prenom\"::text || '' ''::text) || u.\"Nom\"::text as utilisateur,
  aru.\"MontantRevenu\" as montant,
  COALESCE(vc.\"MontantCommission\", 0::numeric) as commission,
  aru.\"DateTransaction\" as date,
  aru.\"StatutPaiement\" as statut,
  ''activite''::text as categorie_type,
  aru.\"IDActiviteRemuneree\" as original_id,
  aru.\"IDUtilisateurs\" as id_utilisateurs,
  null::bigint as id_commande,
  aru.\"IDActiviteRemuneree\" as id_activite_remuneree,
  null::bigint as id_service_post_mortem,
  null::bigint as id_don_cagnotte
FROM
  \"ActiviteRemuneree_Utilisateurs\" aru
  JOIN \"Utilisateurs\" u ON aru.\"IDUtilisateurs\" = u.\"IDUtilisateurs\"
  LEFT JOIN \"VersementCommissions\" vc ON vc.\"IDActiviteRemuneree\" = aru.\"IDActiviteRemuneree\"

UNION

SELECT
  dc.\"IDDonCagnotte\" as id,
  ''Don''::text as type,
  (u.\"Prenom\"::text || '' ''::text) || u.\"Nom\"::text as utilisateur,
  dc.\"Montant\"::numeric as montant,
  COALESCE(vc.\"MontantCommission\", 0::numeric) as commission,
  dc.\"DateDon\" as date,
  ''Validé''::character varying as statut,
  ''don''::text as categorie_type,
  dc.\"IDDonCagnotte\" as original_id,
  dc.\"IDDonateur\" as id_utilisateurs,
  null::bigint as id_commande,
  null::bigint as id_activite_remuneree,
  null::bigint as id_service_post_mortem,
  dc.\"IDDonCagnotte\" as id_don_cagnotte
FROM
  \"DonCagnotte\" dc
  JOIN \"Utilisateurs\" u ON dc.\"IDDonateur\" = u.\"IDUtilisateurs\"
  LEFT JOIN \"VersementCommissions\" vc ON vc.\"IDDonCagnotte\" = dc.\"IDDonCagnotte\"

UNION

SELECT
  c.\"IDCommande\" as id,
  ''Commande''::text as type,
  (u.\"Prenom\"::text || '' ''::text) || u.\"Nom\"::text as utilisateur,
  c.\"MontantTotal\" as montant,
  COALESCE(vc.\"MontantCommission\", 0::numeric) as commission,
  c.\"DateCommande\" as date,
  c.\"StatutCommande\" as statut,
  ''commande''::text as categorie_type,
  c.\"IDCommande\" as original_id,
  c.\"IDUtilisateurPayeur\" as id_utilisateurs,
  c.\"IDCommande\" as id_commande,
  null::bigint as id_activite_remuneree,
  null::bigint as id_service_post_mortem,
  null::bigint as id_don_cagnotte
FROM
  \"Commande\" c
  JOIN \"Utilisateurs\" u ON c.\"IDUtilisateurPayeur\" = u.\"IDUtilisateurs\"
  LEFT JOIN \"VersementCommissions\" vc ON vc.\"IDCommande\" = c.\"IDCommande\"

UNION

SELECT
  spm.\"IDServicePostMortem\" as id,
  ''Service post-mortem''::text as type,
  spm.\"Prestataire\" as utilisateur,
  spm.\"MontantPrestation\"::numeric as montant,
  COALESCE(vc.\"MontantCommission\", 0::numeric) as commission,
  spm.\"DateService\"::date as date,
  spm.\"StatutService\" as statut,
  ''postmortem''::text as categorie_type,
  spm.\"IDServicePostMortem\" as original_id,
  null::bigint as id_utilisateurs,
  null::bigint as id_commande,
  null::bigint as id_activite_remuneree,
  spm.\"IDServicePostMortem\" as id_service_post_mortem,
  null::bigint as id_don_cagnotte
FROM
  \"ServicePostMortem\" spm
  LEFT JOIN \"VersementCommissions\" vc ON vc.\"IDServicePostMortem\" = spm.\"IDServicePostMortem\"

UNION

SELECT
  vc.\"IDVersementCommissions\" + 100000 as id,
  ''Commission versée''::text as type,
  ''AppSeniors Platform''::text as utilisateur,
  vc.\"MontantCommission\" as montant,
  vc.\"MontantCommission\" as commission,
  vc.\"DateVersement\" as date,
  ''Validé''::character varying as statut,
  ''commission''::text as categorie_type,
  vc.\"IDVersementCommissions\" as original_id,
  null::bigint as id_utilisateurs,
  vc.\"IDCommande\" as id_commande,
  vc.\"IDActiviteRemuneree\" as id_activite_remuneree,
  vc.\"IDServicePostMortem\" as id_service_post_mortem,
  vc.\"IDDonCagnotte\" as id_don_cagnotte

FROM
  \"VersementCommissions\" vc

ORDER BY date DESC;
"}', '', 'med.jadid@hotmail.com', NULL);
INSERT INTO supabase_migrations.schema_migrations VALUES ('20250715090952', '{"
-- Supprimer l''ancienne vue et créer la nouvelle avec le bon statut
DROP VIEW IF EXISTS public.prestations_dashboard_view;

CREATE VIEW public.prestations_dashboard_view AS
SELECT
  \"Prestation\".\"IDPrestation\" as id,
  \"Prestation\".\"Titre\" as type_prestation,
  \"Prestation\".\"DateCreation\" as date_creation,
  \"MiseEnRelation\".\"TarifPreste\" as tarif,
  \"MiseEnRelation\".\"Statut\" as statut,
  \"Seniors\".\"IDSeniors\",
  CONCAT(\"SeniorUser\".\"Prenom\", '' '', \"SeniorUser\".\"Nom\") as senior_nom,
  \"Aidant\".\"IDAidant\",
  CONCAT(\"AidantUser\".\"Prenom\", '' '', \"AidantUser\".\"Nom\") as aidant_nom,
  \"Evaluation\".\"Note\" as evaluation,
  \"Evaluation\".\"Commentaire\" as evaluation_commentaire,
  \"Domaine\".\"IDDomaine\",
  \"Domaine\".\"DomaineTitre\" as domaine_titre
FROM
  \"MiseEnRelation\"
  JOIN \"Prestation\" ON \"MiseEnRelation\".\"IDPrestation\" = \"Prestation\".\"IDPrestation\"
  JOIN \"Seniors\" ON \"MiseEnRelation\".\"IDSeniors\" = \"Seniors\".\"IDSeniors\"
  JOIN \"Utilisateurs\" \"SeniorUser\" ON \"Seniors\".\"IDUtilisateurSenior\" = \"SeniorUser\".\"IDUtilisateurs\"
  JOIN \"Aidant\" ON \"MiseEnRelation\".\"IDAidant\" = \"Aidant\".\"IDAidant\"
  JOIN \"Utilisateurs\" \"AidantUser\" ON \"Aidant\".\"IDUtilisateurs\" = \"AidantUser\".\"IDUtilisateurs\"
  LEFT JOIN \"Evaluation\" ON \"Evaluation\".\"IDMiseEnRelation\" = \"MiseEnRelation\".\"IDMiseEnRelation\"
  LEFT JOIN \"Domaine\" ON \"Prestation\".\"IDDomaine\" = \"Domaine\".\"IDDomaine\";
"}', '', 'med.jadid@hotmail.com', NULL);
INSERT INTO supabase_migrations.schema_migrations VALUES ('20250720063107', '{"-- Supprimer la vue qui dépend de la colonne IDDonCagnotte
DROP VIEW IF EXISTS v_financestransactions;

-- Supprimer la colonne IDDonCagnotte de VersementCommissions
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = ''VersementCommissions'' 
               AND column_name = ''IDDonCagnotte'') THEN
        ALTER TABLE \"VersementCommissions\" DROP COLUMN \"IDDonCagnotte\";
    END IF;
END $$;

-- Recréer la vue v_financestransactions avec la bonne structure
CREATE VIEW v_financestransactions AS
SELECT 
    ''Commande'' as type,
    c.\"IDCommande\" as id,
    c.\"MontantTotal\" as montant,
    c.\"DateCommande\" as date,
    u.\"Nom\" || '' '' || u.\"Prenom\" as utilisateur_nom,
    vc.\"MontantCommission\" as commission,
    vc.\"PourcentageCommission\" as pourcentage_commission,
    ''Confirmé'' as statut
FROM \"Commande\" c
LEFT JOIN \"Utilisateurs\" u ON c.\"IDUtilisateurPayeur\" = u.\"IDUtilisateurs\"
LEFT JOIN \"VersementCommissions\" vc ON c.\"IDCommande\" = vc.\"IDCommande\"

UNION ALL

SELECT 
    ''Activite'' as type,
    ar.\"IDActiviteRemuneree\" as id,
    ar.\"MontantRevenu\" as montant,
    ar.\"DateTransaction\" as date,
    u.\"Nom\" || '' '' || u.\"Prenom\" as utilisateur_nom,
    vc.\"MontantCommission\" as commission,
    vc.\"PourcentageCommission\" as pourcentage_commission,
    ar.\"StatutPaiement\" as statut
FROM \"ActiviteRemuneree_Utilisateurs\" ar
LEFT JOIN \"Utilisateurs\" u ON ar.\"IDUtilisateurs\" = u.\"IDUtilisateurs\"
LEFT JOIN \"VersementCommissions\" vc ON ar.\"IDActiviteRemuneree\" = vc.\"IDActiviteRemuneree\"

UNION ALL

SELECT 
    ''Don'' as type,
    dc.\"IDDonCagnotte\" as id,
    dc.\"Montant\" as montant,
    dc.\"DateDon\" as date,
    u.\"Nom\" || '' '' || u.\"Prenom\" as utilisateur_nom,
    0 as commission,
    0.0 as pourcentage_commission,
    ''Confirmé'' as statut
FROM \"DonCagnotte\" dc
LEFT JOIN \"Utilisateurs\" u ON dc.\"IDDonateur\" = u.\"IDUtilisateurs\"

UNION ALL

SELECT 
    ''PostMortem'' as type,
    sm.\"IDServicePostMortem\" as id,
    sm.\"MontantPrestation\" as montant,
    sm.\"DateService\" as date,
    sm.\"Prestataire\" as utilisateur_nom,
    vc.\"MontantCommission\" as commission,
    vc.\"PourcentageCommission\" as pourcentage_commission,
    sm.\"StatutService\" as statut
FROM \"ServicePostMortem\" sm
LEFT JOIN \"VersementCommissions\" vc ON sm.\"IDServicePostMortem\" = vc.\"IDServicePostMortem\";"}', '', 'med.jadid@hotmail.com', NULL);
INSERT INTO supabase_migrations.schema_migrations VALUES ('20250720063831', '{"-- Supprimer les triggers existants s''ils existent
DROP TRIGGER IF EXISTS trigger_commission_commande ON \"Commande\";
DROP TRIGGER IF EXISTS trigger_commission_activite ON \"ActiviteRemuneree_Utilisateurs\";
DROP TRIGGER IF EXISTS trigger_commission_postmortem ON \"ServicePostMortem\";
DROP TRIGGER IF EXISTS trigger_update_cagnotte_montant ON \"DonCagnotte\";
DROP TRIGGER IF EXISTS trigger_update_cagnotte_status ON \"DonCagnotte\";
DROP TRIGGER IF EXISTS trigger_set_initial_cagnotte_status ON \"CagnotteDeces\";

-- Créer les triggers pour automatiser les calculs de commissions

-- Trigger pour les commandes
CREATE TRIGGER trigger_commission_commande
    AFTER INSERT ON \"Commande\"
    FOR EACH ROW
    EXECUTE FUNCTION create_commission_from_commande();

-- Trigger pour les activités rémunérées
CREATE TRIGGER trigger_commission_activite
    AFTER INSERT ON \"ActiviteRemuneree_Utilisateurs\"
    FOR EACH ROW
    EXECUTE FUNCTION create_commission_from_activite();

-- Trigger pour les services post-mortem
CREATE TRIGGER trigger_commission_postmortem
    AFTER INSERT ON \"ServicePostMortem\"
    FOR EACH ROW
    EXECUTE FUNCTION create_commission_from_postmortem();

-- Trigger pour mettre à jour le montant total des cagnottes lors d''un don
CREATE OR REPLACE FUNCTION update_cagnotte_montant_total()
RETURNS TRIGGER AS $$
BEGIN
    -- Ajouter le montant du don au total de la cagnotte
    UPDATE \"CagnotteDeces\"
    SET \"MontantTotal\" = \"MontantTotal\" + NEW.\"Montant\"
    WHERE \"IDCagnotteDeces\" = NEW.\"IDCagnotteDeces\";
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_cagnotte_montant
    AFTER INSERT ON \"DonCagnotte\"
    FOR EACH ROW
    EXECUTE FUNCTION update_cagnotte_montant_total();

-- Trigger pour mettre à jour le statut des cagnottes lors d''un don
CREATE TRIGGER trigger_update_cagnotte_status
    AFTER INSERT ON \"DonCagnotte\"
    FOR EACH ROW
    EXECUTE FUNCTION update_cagnotte_status();

-- Trigger pour définir le statut initial des cagnottes
CREATE TRIGGER trigger_set_initial_cagnotte_status
    BEFORE INSERT ON \"CagnotteDeces\"
    FOR EACH ROW
    EXECUTE FUNCTION set_initial_cagnotte_status();"}', '', 'med.jadid@hotmail.com', NULL);
INSERT INTO supabase_migrations.schema_migrations VALUES ('20250720073014', '{"-- Safe migration to add IDCreateur column if it doesn''t exist
DO $$
BEGIN
    -- Add the column only if it doesn''t exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = ''public'' 
        AND table_name = ''ServicePostMortem'' 
        AND column_name = ''IDCreateur''
    ) THEN
        ALTER TABLE public.\"ServicePostMortem\" 
        ADD COLUMN \"IDCreateur\" bigint;
    END IF;
    
    -- Update existing rows to have a valid IDCreateur (using the first admin user)
    UPDATE public.\"ServicePostMortem\" 
    SET \"IDCreateur\" = (
        SELECT u.\"IDUtilisateurs\" 
        FROM public.\"Utilisateurs\" u
        JOIN public.\"CatUtilisateurs\" c ON u.\"IDCatUtilisateurs\" = c.\"IDCatUtilisateurs\"
        WHERE c.\"EstAdministrateur\" = true
        LIMIT 1
    )
    WHERE \"IDCreateur\" IS NULL;
    
    -- Make the column NOT NULL if it''s not already
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = ''public'' 
        AND table_name = ''ServicePostMortem'' 
        AND column_name = ''IDCreateur''
        AND is_nullable = ''YES''
    ) THEN
        ALTER TABLE public.\"ServicePostMortem\" 
        ALTER COLUMN \"IDCreateur\" SET NOT NULL;
    END IF;
    
    -- Add the foreign key constraint only if it doesn''t exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_schema = ''public'' 
        AND table_name = ''ServicePostMortem'' 
        AND constraint_name = ''servicepostmortem_idcreateur_fkey''
    ) THEN
        ALTER TABLE public.\"ServicePostMortem\" 
        ADD CONSTRAINT servicepostmortem_idcreateur_fkey 
        FOREIGN KEY (\"IDCreateur\") REFERENCES public.\"Utilisateurs\" (\"IDUtilisateurs\");
    END IF;
END $$;"}', '', 'med.jadid@hotmail.com', NULL);
INSERT INTO supabase_migrations.schema_migrations VALUES ('20250720075514', '{"-- Supprimer la contrainte de clé étrangère ajoutée par erreur
ALTER TABLE public.\"VersementCommissions\" 
DROP CONSTRAINT IF EXISTS \"VersementCommissions_IDDonCagnotte_fkey\";

-- Supprimer la colonne IDDonCagnotte ajoutée par erreur
ALTER TABLE public.\"VersementCommissions\" 
DROP COLUMN IF EXISTS \"IDDonCagnotte\";

-- Supprimer le trigger en premier (le nom correct est \"trigger_commission_don\")
DROP TRIGGER IF EXISTS trigger_commission_don ON public.\"DonCagnotte\";

-- Supprimer ensuite la fonction
DROP FUNCTION IF EXISTS public.fn_insert_commission_from_doncagnotte();"}', '', 'med.jadid@hotmail.com', NULL);
INSERT INTO supabase_migrations.schema_migrations VALUES ('20250721101359', '{"-- Créer une vue mise à jour qui montre toutes les prestations
CREATE OR REPLACE VIEW prestations_dashboard_view AS
SELECT 
    p.\"IDPrestation\" AS id,
    p.\"Titre\" AS type_prestation,
    p.\"DateCreation\" AS date_creation,
    COALESCE(mr.\"TarifPreste\", p.\"TarifIndicatif\") AS tarif,
    COALESCE(mr.\"Statut\", ''disponible'') AS statut,
    s.\"IDSeniors\",
    COALESCE(CONCAT(su.\"Prenom\", '' '', su.\"Nom\"), ''Non assigné'') AS senior_nom,
    a.\"IDAidant\",
    COALESCE(CONCAT(au.\"Prenom\", '' '', au.\"Nom\"), ''Non assigné'') AS aidant_nom,
    e.\"Note\" AS evaluation,
    e.\"Commentaire\" AS evaluation_commentaire,
    d.\"IDDomaine\",
    d.\"DomaineTitre\" AS domaine_titre
FROM \"Prestation\" p
LEFT JOIN \"MiseEnRelation\" mr ON p.\"IDPrestation\" = mr.\"IDPrestation\"
LEFT JOIN \"Seniors\" s ON mr.\"IDSeniors\" = s.\"IDSeniors\"
LEFT JOIN \"Utilisateurs\" su ON s.\"IDUtilisateurSenior\" = su.\"IDUtilisateurs\"
LEFT JOIN \"Aidant\" a ON mr.\"IDAidant\" = a.\"IDAidant\"
LEFT JOIN \"Utilisateurs\" au ON a.\"IDUtilisateurs\" = au.\"IDUtilisateurs\"
LEFT JOIN \"Evaluation\" e ON e.\"IDMiseEnRelation\" = mr.\"IDMiseEnRelation\"
LEFT JOIN \"Domaine\" d ON p.\"IDDomaine\" = d.\"IDDomaine\";"}', '', 'med.jadid@hotmail.com', NULL);
INSERT INTO supabase_migrations.schema_migrations VALUES ('20250721102617', '{"-- Améliorer la vue pour afficher des messages plus clairs pour les prestations non assignées
CREATE OR REPLACE VIEW prestations_dashboard_view AS
SELECT 
    p.\"IDPrestation\" AS id,
    p.\"Titre\" AS type_prestation,
    p.\"DateCreation\" AS date_creation,
    COALESCE(mr.\"TarifPreste\", p.\"TarifIndicatif\") AS tarif,
    COALESCE(mr.\"Statut\", ''disponible'') AS statut,
    s.\"IDSeniors\",
    CASE 
        WHEN su.\"Prenom\" IS NOT NULL AND su.\"Nom\" IS NOT NULL 
        THEN CONCAT(su.\"Prenom\", '' '', su.\"Nom\")
        ELSE ''Non assigné''
    END AS senior_nom,
    a.\"IDAidant\",
    CASE 
        WHEN au.\"Prenom\" IS NOT NULL AND au.\"Nom\" IS NOT NULL 
        THEN CONCAT(au.\"Prenom\", '' '', au.\"Nom\")
        ELSE ''Non assigné''
    END AS aidant_nom,
    e.\"Note\" AS evaluation,
    e.\"Commentaire\" AS evaluation_commentaire,
    d.\"IDDomaine\",
    d.\"DomaineTitre\" AS domaine_titre
FROM \"Prestation\" p
LEFT JOIN \"MiseEnRelation\" mr ON p.\"IDPrestation\" = mr.\"IDPrestation\"
LEFT JOIN \"Seniors\" s ON mr.\"IDSeniors\" = s.\"IDSeniors\"
LEFT JOIN \"Utilisateurs\" su ON s.\"IDUtilisateurSenior\" = su.\"IDUtilisateurs\"
LEFT JOIN \"Aidant\" a ON mr.\"IDAidant\" = a.\"IDAidant\"
LEFT JOIN \"Utilisateurs\" au ON a.\"IDUtilisateurs\" = au.\"IDUtilisateurs\"
LEFT JOIN \"Evaluation\" e ON e.\"IDMiseEnRelation\" = mr.\"IDMiseEnRelation\"
LEFT JOIN \"Domaine\" d ON p.\"IDDomaine\" = d.\"IDDomaine\";"}', '', 'med.jadid@hotmail.com', NULL);


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 80, true);


--
-- Name: ActiviteRemuneree_IDActiviteRemuneree_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ActiviteRemuneree_IDActiviteRemuneree_seq"', 1, false);


--
-- Name: Agenda_IDAgenda_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Agenda_IDAgenda_seq"', 1, false);


--
-- Name: Aidant_IDAidant_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Aidant_IDAidant_seq"', 5, true);


--
-- Name: AssuranceDeces_IDAssuranceDeces_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."AssuranceDeces_IDAssuranceDeces_seq"', 1, false);


--
-- Name: BesoinSenior_IDBesoinSenior_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."BesoinSenior_IDBesoinSenior_seq"', 1, false);


--
-- Name: BonPlan_IDBonPlan_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."BonPlan_IDBonPlan_seq"', 11, true);


--
-- Name: CagnotteDeces_IDCagnotteDeces_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CagnotteDeces_IDCagnotteDeces_seq"', 1, false);


--
-- Name: CandidatureAidant_IDCandidatureAidant_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CandidatureAidant_IDCandidatureAidant_seq"', 1, false);


--
-- Name: CatUtilisateurs_IDCatUtilisateurs_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CatUtilisateurs_IDCatUtilisateurs_seq"', 8, true);


--
-- Name: CategorieDocument_IDCategorieDocument_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CategorieDocument_IDCategorieDocument_seq"', 5, true);


--
-- Name: CategorieOrganisme_IDCategorieOrganisme_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CategorieOrganisme_IDCategorieOrganisme_seq"', 1, false);


--
-- Name: CategorieRessource_IDCategorieRessource_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CategorieRessource_IDCategorieRessource_seq"', 1, false);


--
-- Name: Commande_IDCommande_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Commande_IDCommande_seq"', 1, false);


--
-- Name: Competences_IDCompetences_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Competences_IDCompetences_seq"', 1, false);


--
-- Name: ConsentementCookies_IDConsentement_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ConsentementCookies_IDConsentement_seq"', 1, false);


--
-- Name: ContactUrgence_IDContactUrgence_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ContactUrgence_IDContactUrgence_seq"', 1, false);


--
-- Name: ContratCohabitation_IDContratCohabitation_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ContratCohabitation_IDContratCohabitation_seq"', 1, false);


--
-- Name: DemandeRGPD_IDDemandeRGPD_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."DemandeRGPD_IDDemandeRGPD_seq"', 1, false);


--
-- Name: Devise_IDDevise_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Devise_IDDevise_seq"', 1, false);


--
-- Name: DirectivesAnticipees_IDDirectivesAnticipees_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."DirectivesAnticipees_IDDirectivesAnticipees_seq"', 1, false);


--
-- Name: DocumentPatrimonial_IDDocumentPatrimonial_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."DocumentPatrimonial_IDDocumentPatrimonial_seq"', 1, false);


--
-- Name: DocumentRGPD_IDDocumentRGPD_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."DocumentRGPD_IDDocumentRGPD_seq"', 10, true);


--
-- Name: Document_IDDocument_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Document_IDDocument_seq"', 1, false);


--
-- Name: Domaine_IDDomaine_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Domaine_IDDomaine_seq"', 11, true);


--
-- Name: DonCagnotte_IDDonCagnotte_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."DonCagnotte_IDDonCagnotte_seq"', 1, false);


--
-- Name: EquipementMedical_IDEquipementMedical_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EquipementMedical_IDEquipementMedical_seq"', 1, false);


--
-- Name: EvaluationCohabitation_IDEvaluationCohabitation_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EvaluationCohabitation_IDEvaluationCohabitation_seq"', 1, false);


--
-- Name: Evaluation_IDEvaluation_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Evaluation_IDEvaluation_seq"', 1, true);


--
-- Name: Evenements_IDEvenements_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Evenements_IDEvenements_seq"', 1, false);


--
-- Name: Facture_IDFacture_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Facture_IDFacture_seq"', 1, false);


--
-- Name: Forum_IDForum_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Forum_IDForum_seq"', 1, false);


--
-- Name: Groupe_IDGroupe_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Groupe_IDGroupe_seq"', 1, true);


--
-- Name: HistoriqueConnexion_IDHistoriqueConnexion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."HistoriqueConnexion_IDHistoriqueConnexion_seq"', 1, false);


--
-- Name: HistoriqueInteractions_IDHistoriqueInteractions_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."HistoriqueInteractions_IDHistoriqueInteractions_seq"', 1, false);


--
-- Name: Humeur_IDHumeur_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Humeur_IDHumeur_seq"', 1, false);


--
-- Name: Langue_IDLangue_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Langue_IDLangue_seq"', 1, false);


--
-- Name: LienPartenariat_IDLienPartenariat_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."LienPartenariat_IDLienPartenariat_seq"', 1, false);


--
-- Name: Localisation_IDLocalisation_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Localisation_IDLocalisation_seq"', 1, false);


--
-- Name: LogementSenior_IDLogementSenior_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."LogementSenior_IDLogementSenior_seq"', 1, false);


--
-- Name: Medicament_IDMedicament_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Medicament_IDMedicament_seq"', 1, false);


--
-- Name: MessageGroupe_IDMessageGroupe_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."MessageGroupe_IDMessageGroupe_seq"', 1, false);


--
-- Name: MiseEnRelation_IDMiseEnRelation_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."MiseEnRelation_IDMiseEnRelation_seq"', 1, true);


--
-- Name: MiseEnRelation_Prestation_IDMiseEnRelation_IDPrestation_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."MiseEnRelation_Prestation_IDMiseEnRelation_IDPrestation_seq"', 1, true);


--
-- Name: MoyenPaiement_IDMoyenPaiement_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."MoyenPaiement_IDMoyenPaiement_seq"', 7, true);


--
-- Name: Notifications_IDNotifications_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Notifications_IDNotifications_seq"', 1, false);


--
-- Name: ObjetPrete_IDObjetPrete_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ObjetPrete_IDObjetPrete_seq"', 1, false);


--
-- Name: OffreSenior_IDOffreSenior_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."OffreSenior_IDOffreSenior_seq"', 1, false);


--
-- Name: Organisme_IDOrganisme_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Organisme_IDOrganisme_seq"', 1, false);


--
-- Name: ParametresCommission_IDParametreCommission_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ParametresCommission_IDParametreCommission_seq"', 3, true);


--
-- Name: Parametres_IDParametres_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Parametres_IDParametres_seq"', 1, false);


--
-- Name: Partenaire_IDPartenaire_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Partenaire_IDPartenaire_seq"', 11, true);


--
-- Name: Pieces_IDPieces_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Pieces_IDPieces_seq"', 1, false);


--
-- Name: PrestationAidant_IDPrestationAidant_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PrestationAidant_IDPrestationAidant_seq"', 1, false);


--
-- Name: PrestationSupport_IDPrestationSupport_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PrestationSupport_IDPrestationSupport_seq"', 1, false);


--
-- Name: Prestation_IDPrestation_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Prestation_IDPrestation_seq"', 15, true);


--
-- Name: Produit_IDProduit_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Produit_IDProduit_seq"', 1, false);


--
-- Name: RapportMensuel_IDRapportMensuel_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RapportMensuel_IDRapportMensuel_seq"', 1, false);


--
-- Name: RendezVousMedical_IDRendezVousMedical_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."RendezVousMedical_IDRendezVousMedical_seq"', 1, false);


--
-- Name: ReponseForum_IDReponseForum_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ReponseForum_IDReponseForum_seq"', 1, false);


--
-- Name: ReponsesSupport_IDReponse_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ReponsesSupport_IDReponse_seq"', 1, false);


--
-- Name: Ressource_IDRessource_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Ressource_IDRessource_seq"', 1, false);


--
-- Name: Seniors_IDSeniors_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Seniors_IDSeniors_seq"', 5, true);


--
-- Name: ServicePartenaire_IDServicePartenaire_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ServicePartenaire_IDServicePartenaire_seq"', 2, true);


--
-- Name: ServicePostMortem_IDServicePostMortem_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ServicePostMortem_IDServicePostMortem_seq"', 1, false);


--
-- Name: SignalementContenu_IDSignalement_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SignalementContenu_IDSignalement_seq"', 1, false);


--
-- Name: Souvenir_IDSouvenir_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Souvenir_IDSouvenir_seq"', 1, false);


--
-- Name: Structures_IDStructures_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Structures_IDStructures_seq"', 1, false);


--
-- Name: SujetForum_IDSujetForum_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SujetForum_IDSujetForum_seq"', 1, false);


--
-- Name: SupportClient_IDTicketClient_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SupportClient_IDTicketClient_seq"', 1, false);


--
-- Name: TMessage_IDTMessage_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TMessage_IDTMessage_seq"', 1, false);


--
-- Name: TypeMaladie_IDTypeMaladie_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TypeMaladie_IDTypeMaladie_seq"', 1, false);


--
-- Name: TypePieces_IDTypePieces_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TypePieces_IDTypePieces_seq"', 1, false);


--
-- Name: Utilisateurs_IDUtilisateurs_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Utilisateurs_IDUtilisateurs_seq"', 14, true);


--
-- Name: VersementCommissions_IDVersementCommissions_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."VersementCommissions_IDVersementCommissions_seq"', 1, false);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: supabase_admin
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('supabase_functions.hooks_id_seq', 1, false);


--
-- Name: extensions extensions_pkey; Type: CONSTRAINT; Schema: _realtime; Owner: supabase_admin
--

ALTER TABLE ONLY _realtime.extensions
    ADD CONSTRAINT extensions_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: _realtime; Owner: supabase_admin
--

ALTER TABLE ONLY _realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: tenants tenants_pkey; Type: CONSTRAINT; Schema: _realtime; Owner: supabase_admin
--

ALTER TABLE ONLY _realtime.tenants
    ADD CONSTRAINT tenants_pkey PRIMARY KEY (id);


--
-- Name: mfa_amr_claims amr_id_pk; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT amr_id_pk PRIMARY KEY (id);


--
-- Name: audit_log_entries audit_log_entries_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.audit_log_entries
    ADD CONSTRAINT audit_log_entries_pkey PRIMARY KEY (id);


--
-- Name: flow_state flow_state_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.flow_state
    ADD CONSTRAINT flow_state_pkey PRIMARY KEY (id);


--
-- Name: identities identities_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_pkey PRIMARY KEY (id);


--
-- Name: identities identities_provider_id_provider_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_provider_id_provider_unique UNIQUE (provider_id, provider);


--
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.instances
    ADD CONSTRAINT instances_pkey PRIMARY KEY (id);


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_authentication_method_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_authentication_method_pkey UNIQUE (session_id, authentication_method);


--
-- Name: mfa_challenges mfa_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_pkey PRIMARY KEY (id);


--
-- Name: mfa_factors mfa_factors_last_challenged_at_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_last_challenged_at_key UNIQUE (last_challenged_at);


--
-- Name: mfa_factors mfa_factors_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_pkey PRIMARY KEY (id);


--
-- Name: one_time_tokens one_time_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_token_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_unique UNIQUE (token);


--
-- Name: saml_providers saml_providers_entity_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_entity_id_key UNIQUE (entity_id);


--
-- Name: saml_providers saml_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_pkey PRIMARY KEY (id);


--
-- Name: saml_relay_states saml_relay_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sso_domains sso_domains_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_pkey PRIMARY KEY (id);


--
-- Name: sso_providers sso_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_providers
    ADD CONSTRAINT sso_providers_pkey PRIMARY KEY (id);


--
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: ActiviteRemuneree ActiviteRemuneree_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ActiviteRemuneree"
    ADD CONSTRAINT "ActiviteRemuneree_pkey" PRIMARY KEY ("IDActiviteRemuneree");


--
-- Name: Agenda Agenda_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Agenda"
    ADD CONSTRAINT "Agenda_pkey" PRIMARY KEY ("IDAgenda");


--
-- Name: Aidant Aidant_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Aidant"
    ADD CONSTRAINT "Aidant_pkey" PRIMARY KEY ("IDAidant");


--
-- Name: AssuranceDeces AssuranceDeces_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AssuranceDeces"
    ADD CONSTRAINT "AssuranceDeces_pkey" PRIMARY KEY ("IDAssuranceDeces");


--
-- Name: BesoinSenior BesoinSenior_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BesoinSenior"
    ADD CONSTRAINT "BesoinSenior_pkey" PRIMARY KEY ("IDBesoinSenior");


--
-- Name: BonPlan BonPlan_CodePromo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BonPlan"
    ADD CONSTRAINT "BonPlan_CodePromo_key" UNIQUE ("CodePromo");


--
-- Name: BonPlan BonPlan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BonPlan"
    ADD CONSTRAINT "BonPlan_pkey" PRIMARY KEY ("IDBonPlan");


--
-- Name: CagnotteDeces CagnotteDeces_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CagnotteDeces"
    ADD CONSTRAINT "CagnotteDeces_pkey" PRIMARY KEY ("IDCagnotteDeces");


--
-- Name: CandidatureAidant CandidatureAidant_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CandidatureAidant"
    ADD CONSTRAINT "CandidatureAidant_pkey" PRIMARY KEY ("IDCandidatureAidant");


--
-- Name: CatUtilisateurs CatUtilisateurs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CatUtilisateurs"
    ADD CONSTRAINT "CatUtilisateurs_pkey" PRIMARY KEY ("IDCatUtilisateurs");


--
-- Name: CategorieDocument CategorieDocument_NomCategorie_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CategorieDocument"
    ADD CONSTRAINT "CategorieDocument_NomCategorie_key" UNIQUE ("NomCategorie");


--
-- Name: CategorieDocument CategorieDocument_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CategorieDocument"
    ADD CONSTRAINT "CategorieDocument_pkey" PRIMARY KEY ("IDCategorieDocument");


--
-- Name: CategorieOrganisme CategorieOrganisme_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CategorieOrganisme"
    ADD CONSTRAINT "CategorieOrganisme_pkey" PRIMARY KEY ("IDCategorieOrganisme");


--
-- Name: CategorieRessource CategorieRessource_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CategorieRessource"
    ADD CONSTRAINT "CategorieRessource_pkey" PRIMARY KEY ("IDCategorieRessource");


--
-- Name: Commande Commande_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Commande"
    ADD CONSTRAINT "Commande_pkey" PRIMARY KEY ("IDCommande");


--
-- Name: Competences Competences_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Competences"
    ADD CONSTRAINT "Competences_pkey" PRIMARY KEY ("IDCompetences");


--
-- Name: ConsentementCookies ConsentementCookies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ConsentementCookies"
    ADD CONSTRAINT "ConsentementCookies_pkey" PRIMARY KEY ("IDConsentement");


--
-- Name: ContactUrgence ContactUrgence_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContactUrgence"
    ADD CONSTRAINT "ContactUrgence_pkey" PRIMARY KEY ("IDContactUrgence");


--
-- Name: ContratCohabitation ContratCohabitation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContratCohabitation"
    ADD CONSTRAINT "ContratCohabitation_pkey" PRIMARY KEY ("IDContratCohabitation");


--
-- Name: DemandeRGPD DemandeRGPD_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DemandeRGPD"
    ADD CONSTRAINT "DemandeRGPD_pkey" PRIMARY KEY ("IDDemandeRGPD");


--
-- Name: Devise Devise_Titre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Devise"
    ADD CONSTRAINT "Devise_Titre_key" UNIQUE ("Titre");


--
-- Name: Devise Devise_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Devise"
    ADD CONSTRAINT "Devise_pkey" PRIMARY KEY ("IDDevise");


--
-- Name: DirectivesAnticipees DirectivesAnticipees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DirectivesAnticipees"
    ADD CONSTRAINT "DirectivesAnticipees_pkey" PRIMARY KEY ("IDDirectivesAnticipees");


--
-- Name: DocumentPatrimonial DocumentPatrimonial_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DocumentPatrimonial"
    ADD CONSTRAINT "DocumentPatrimonial_pkey" PRIMARY KEY ("IDDocumentPatrimonial");


--
-- Name: DocumentRGPD DocumentRGPD_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DocumentRGPD"
    ADD CONSTRAINT "DocumentRGPD_pkey" PRIMARY KEY ("IDDocumentRGPD");


--
-- Name: Document Document_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Document"
    ADD CONSTRAINT "Document_pkey" PRIMARY KEY ("IDDocument");


--
-- Name: Domaine Domaine_DomaineTitre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Domaine"
    ADD CONSTRAINT "Domaine_DomaineTitre_key" UNIQUE ("DomaineTitre");


--
-- Name: Domaine Domaine_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Domaine"
    ADD CONSTRAINT "Domaine_pkey" PRIMARY KEY ("IDDomaine");


--
-- Name: DonCagnotte DonCagnotte_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DonCagnotte"
    ADD CONSTRAINT "DonCagnotte_pkey" PRIMARY KEY ("IDDonCagnotte");


--
-- Name: EquipementMedical EquipementMedical_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EquipementMedical"
    ADD CONSTRAINT "EquipementMedical_pkey" PRIMARY KEY ("IDEquipementMedical");


--
-- Name: EvaluationCohabitation EvaluationCohabitation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EvaluationCohabitation"
    ADD CONSTRAINT "EvaluationCohabitation_pkey" PRIMARY KEY ("IDEvaluationCohabitation");


--
-- Name: Evaluation Evaluation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Evaluation"
    ADD CONSTRAINT "Evaluation_pkey" PRIMARY KEY ("IDEvaluation");


--
-- Name: Evenements Evenements_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Evenements"
    ADD CONSTRAINT "Evenements_pkey" PRIMARY KEY ("IDEvenements");


--
-- Name: Facture Facture_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Facture"
    ADD CONSTRAINT "Facture_pkey" PRIMARY KEY ("IDFacture");


--
-- Name: Forum Forum_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Forum"
    ADD CONSTRAINT "Forum_pkey" PRIMARY KEY ("IDForum");


--
-- Name: Groupe Groupe_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Groupe"
    ADD CONSTRAINT "Groupe_pkey" PRIMARY KEY ("IDGroupe");


--
-- Name: HistoriqueConnexion HistoriqueConnexion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HistoriqueConnexion"
    ADD CONSTRAINT "HistoriqueConnexion_pkey" PRIMARY KEY ("IDHistoriqueConnexion");


--
-- Name: HistoriqueInteractions HistoriqueInteractions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HistoriqueInteractions"
    ADD CONSTRAINT "HistoriqueInteractions_pkey" PRIMARY KEY ("IDHistoriqueInteractions");


--
-- Name: Humeur Humeur_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Humeur"
    ADD CONSTRAINT "Humeur_pkey" PRIMARY KEY ("IDHumeur");


--
-- Name: Langue Langue_Titre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Langue"
    ADD CONSTRAINT "Langue_Titre_key" UNIQUE ("Titre");


--
-- Name: Langue Langue_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Langue"
    ADD CONSTRAINT "Langue_pkey" PRIMARY KEY ("IDLangue");


--
-- Name: LienPartenariat LienPartenariat_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LienPartenariat"
    ADD CONSTRAINT "LienPartenariat_pkey" PRIMARY KEY ("IDLienPartenariat");


--
-- Name: Localisation Localisation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Localisation"
    ADD CONSTRAINT "Localisation_pkey" PRIMARY KEY ("IDLocalisation");


--
-- Name: LogementSenior LogementSenior_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LogementSenior"
    ADD CONSTRAINT "LogementSenior_pkey" PRIMARY KEY ("IDLogementSenior");


--
-- Name: Medicament Medicament_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Medicament"
    ADD CONSTRAINT "Medicament_pkey" PRIMARY KEY ("IDMedicament");


--
-- Name: MessageGroupe MessageGroupe_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MessageGroupe"
    ADD CONSTRAINT "MessageGroupe_pkey" PRIMARY KEY ("IDMessageGroupe");


--
-- Name: MiseEnRelation_Prestation MiseEnRelation_Prestation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MiseEnRelation_Prestation"
    ADD CONSTRAINT "MiseEnRelation_Prestation_pkey" PRIMARY KEY ("IDMiseEnRelation_IDPrestation");


--
-- Name: MiseEnRelation MiseEnRelation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MiseEnRelation"
    ADD CONSTRAINT "MiseEnRelation_pkey" PRIMARY KEY ("IDMiseEnRelation");


--
-- Name: MoyenPaiement MoyenPaiement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MoyenPaiement"
    ADD CONSTRAINT "MoyenPaiement_pkey" PRIMARY KEY ("IDMoyenPaiement");


--
-- Name: Notifications Notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notifications"
    ADD CONSTRAINT "Notifications_pkey" PRIMARY KEY ("IDNotifications");


--
-- Name: ObjetPrete ObjetPrete_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ObjetPrete"
    ADD CONSTRAINT "ObjetPrete_pkey" PRIMARY KEY ("IDObjetPrete");


--
-- Name: OffreSenior OffreSenior_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OffreSenior"
    ADD CONSTRAINT "OffreSenior_pkey" PRIMARY KEY ("IDOffreSenior");


--
-- Name: Organisme Organisme_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Organisme"
    ADD CONSTRAINT "Organisme_pkey" PRIMARY KEY ("IDOrganisme");


--
-- Name: ParametresCommission ParametresCommission_TypeTransaction_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ParametresCommission"
    ADD CONSTRAINT "ParametresCommission_TypeTransaction_key" UNIQUE ("TypeTransaction");


--
-- Name: ParametresCommission ParametresCommission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ParametresCommission"
    ADD CONSTRAINT "ParametresCommission_pkey" PRIMARY KEY ("IDParametreCommission");


--
-- Name: Parametres Parametres_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Parametres"
    ADD CONSTRAINT "Parametres_pkey" PRIMARY KEY ("IDParametres");


--
-- Name: Partenaire Partenaire_RaisonSociale_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Partenaire"
    ADD CONSTRAINT "Partenaire_RaisonSociale_key" UNIQUE ("RaisonSociale");


--
-- Name: Partenaire Partenaire_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Partenaire"
    ADD CONSTRAINT "Partenaire_pkey" PRIMARY KEY ("IDPartenaire");


--
-- Name: Pieces Pieces_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Pieces"
    ADD CONSTRAINT "Pieces_pkey" PRIMARY KEY ("IDPieces");


--
-- Name: PrestationAidant PrestationAidant_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PrestationAidant"
    ADD CONSTRAINT "PrestationAidant_pkey" PRIMARY KEY ("IDPrestationAidant");


--
-- Name: PrestationSupport PrestationSupport_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PrestationSupport"
    ADD CONSTRAINT "PrestationSupport_pkey" PRIMARY KEY ("IDPrestationSupport");


--
-- Name: Prestation Prestation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Prestation"
    ADD CONSTRAINT "Prestation_pkey" PRIMARY KEY ("IDPrestation");


--
-- Name: Produit Produit_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Produit"
    ADD CONSTRAINT "Produit_pkey" PRIMARY KEY ("IDProduit");


--
-- Name: RapportMensuel RapportMensuel_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RapportMensuel"
    ADD CONSTRAINT "RapportMensuel_pkey" PRIMARY KEY ("IDRapportMensuel");


--
-- Name: RendezVousMedical RendezVousMedical_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RendezVousMedical"
    ADD CONSTRAINT "RendezVousMedical_pkey" PRIMARY KEY ("IDRendezVousMedical");


--
-- Name: ReponseForum ReponseForum_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ReponseForum"
    ADD CONSTRAINT "ReponseForum_pkey" PRIMARY KEY ("IDReponseForum");


--
-- Name: ReponsesSupport ReponsesSupport_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ReponsesSupport"
    ADD CONSTRAINT "ReponsesSupport_pkey" PRIMARY KEY ("IDReponse");


--
-- Name: Ressource Ressource_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ressource"
    ADD CONSTRAINT "Ressource_pkey" PRIMARY KEY ("IDRessource");


--
-- Name: Seniors Seniors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Seniors"
    ADD CONSTRAINT "Seniors_pkey" PRIMARY KEY ("IDSeniors");


--
-- Name: ServicePartenaire ServicePartenaire_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ServicePartenaire"
    ADD CONSTRAINT "ServicePartenaire_pkey" PRIMARY KEY ("IDServicePartenaire");


--
-- Name: ServicePostMortem ServicePostMortem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ServicePostMortem"
    ADD CONSTRAINT "ServicePostMortem_pkey" PRIMARY KEY ("IDServicePostMortem");


--
-- Name: SignalementContenu SignalementContenu_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SignalementContenu"
    ADD CONSTRAINT "SignalementContenu_pkey" PRIMARY KEY ("IDSignalement");


--
-- Name: Souvenir Souvenir_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Souvenir"
    ADD CONSTRAINT "Souvenir_pkey" PRIMARY KEY ("IDSouvenir");


--
-- Name: Structures Structures_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Structures"
    ADD CONSTRAINT "Structures_pkey" PRIMARY KEY ("IDStructures");


--
-- Name: SujetForum SujetForum_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SujetForum"
    ADD CONSTRAINT "SujetForum_pkey" PRIMARY KEY ("IDSujetForum");


--
-- Name: SupportClient SupportClient_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SupportClient"
    ADD CONSTRAINT "SupportClient_pkey" PRIMARY KEY ("IDTicketClient");


--
-- Name: TMessage TMessage_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TMessage"
    ADD CONSTRAINT "TMessage_pkey" PRIMARY KEY ("IDTMessage");


--
-- Name: TypeMaladie TypeMaladie_TypeMaladie_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TypeMaladie"
    ADD CONSTRAINT "TypeMaladie_TypeMaladie_key" UNIQUE ("TypeMaladie");


--
-- Name: TypeMaladie TypeMaladie_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TypeMaladie"
    ADD CONSTRAINT "TypeMaladie_pkey" PRIMARY KEY ("IDTypeMaladie");


--
-- Name: TypePieces TypePieces_Titre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TypePieces"
    ADD CONSTRAINT "TypePieces_Titre_key" UNIQUE ("Titre");


--
-- Name: TypePieces TypePieces_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TypePieces"
    ADD CONSTRAINT "TypePieces_pkey" PRIMARY KEY ("IDTypePieces");


--
-- Name: Utilisateurs Utilisateurs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Utilisateurs"
    ADD CONSTRAINT "Utilisateurs_pkey" PRIMARY KEY ("IDUtilisateurs");


--
-- Name: VersementCommissions VersementCommissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VersementCommissions"
    ADD CONSTRAINT "VersementCommissions_pkey" PRIMARY KEY ("IDVersementCommissions");


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE ONLY realtime.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2026_02_23 messages_2026_02_23_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2026_02_23
    ADD CONSTRAINT messages_2026_02_23_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2026_02_24 messages_2026_02_24_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2026_02_24
    ADD CONSTRAINT messages_2026_02_24_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2026_02_25 messages_2026_02_25_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2026_02_25
    ADD CONSTRAINT messages_2026_02_25_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2026_02_26 messages_2026_02_26_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2026_02_26
    ADD CONSTRAINT messages_2026_02_26_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2026_02_27 messages_2026_02_27_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2026_02_27
    ADD CONSTRAINT messages_2026_02_27_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: messages_2026_02_28 messages_2026_02_28_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2026_02_28
    ADD CONSTRAINT messages_2026_02_28_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: subscription pk_subscription; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.subscription
    ADD CONSTRAINT pk_subscription PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: buckets_analytics buckets_analytics_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets_analytics
    ADD CONSTRAINT buckets_analytics_pkey PRIMARY KEY (id);


--
-- Name: buckets buckets_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets
    ADD CONSTRAINT buckets_pkey PRIMARY KEY (id);


--
-- Name: buckets_vectors buckets_vectors_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets_vectors
    ADD CONSTRAINT buckets_vectors_pkey PRIMARY KEY (id);


--
-- Name: iceberg_namespaces iceberg_namespaces_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.iceberg_namespaces
    ADD CONSTRAINT iceberg_namespaces_pkey PRIMARY KEY (id);


--
-- Name: iceberg_tables iceberg_tables_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.iceberg_tables
    ADD CONSTRAINT iceberg_tables_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_name_key UNIQUE (name);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT objects_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_pkey PRIMARY KEY (id);


--
-- Name: vector_indexes vector_indexes_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.vector_indexes
    ADD CONSTRAINT vector_indexes_pkey PRIMARY KEY (id);


--
-- Name: hooks hooks_pkey; Type: CONSTRAINT; Schema: supabase_functions; Owner: supabase_functions_admin
--

ALTER TABLE ONLY supabase_functions.hooks
    ADD CONSTRAINT hooks_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: supabase_functions; Owner: supabase_functions_admin
--

ALTER TABLE ONLY supabase_functions.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (version);


--
-- Name: schema_migrations schema_migrations_idempotency_key_key; Type: CONSTRAINT; Schema: supabase_migrations; Owner: postgres
--

ALTER TABLE ONLY supabase_migrations.schema_migrations
    ADD CONSTRAINT schema_migrations_idempotency_key_key UNIQUE (idempotency_key);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: supabase_migrations; Owner: postgres
--

ALTER TABLE ONLY supabase_migrations.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: extensions_tenant_external_id_index; Type: INDEX; Schema: _realtime; Owner: supabase_admin
--

CREATE INDEX extensions_tenant_external_id_index ON _realtime.extensions USING btree (tenant_external_id);


--
-- Name: extensions_tenant_external_id_type_index; Type: INDEX; Schema: _realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX extensions_tenant_external_id_type_index ON _realtime.extensions USING btree (tenant_external_id, type);


--
-- Name: tenants_external_id_index; Type: INDEX; Schema: _realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX tenants_external_id_index ON _realtime.tenants USING btree (external_id);


--
-- Name: audit_logs_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX audit_logs_instance_id_idx ON auth.audit_log_entries USING btree (instance_id);


--
-- Name: confirmation_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX confirmation_token_idx ON auth.users USING btree (confirmation_token) WHERE ((confirmation_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_current_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_current_idx ON auth.users USING btree (email_change_token_current) WHERE ((email_change_token_current)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_new_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_new_idx ON auth.users USING btree (email_change_token_new) WHERE ((email_change_token_new)::text !~ '^[0-9 ]*$'::text);


--
-- Name: factor_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX factor_id_created_at_idx ON auth.mfa_factors USING btree (user_id, created_at);


--
-- Name: flow_state_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX flow_state_created_at_idx ON auth.flow_state USING btree (created_at DESC);


--
-- Name: identities_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_email_idx ON auth.identities USING btree (email text_pattern_ops);


--
-- Name: INDEX identities_email_idx; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.identities_email_idx IS 'Auth: Ensures indexed queries on the email column';


--
-- Name: identities_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_user_id_idx ON auth.identities USING btree (user_id);


--
-- Name: idx_auth_code; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_auth_code ON auth.flow_state USING btree (auth_code);


--
-- Name: idx_user_id_auth_method; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_user_id_auth_method ON auth.flow_state USING btree (user_id, authentication_method);


--
-- Name: mfa_challenge_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_challenge_created_at_idx ON auth.mfa_challenges USING btree (created_at DESC);


--
-- Name: mfa_factors_user_friendly_name_unique; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX mfa_factors_user_friendly_name_unique ON auth.mfa_factors USING btree (friendly_name, user_id) WHERE (TRIM(BOTH FROM friendly_name) <> ''::text);


--
-- Name: mfa_factors_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_factors_user_id_idx ON auth.mfa_factors USING btree (user_id);


--
-- Name: one_time_tokens_relates_to_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_relates_to_hash_idx ON auth.one_time_tokens USING hash (relates_to);


--
-- Name: one_time_tokens_token_hash_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_token_hash_hash_idx ON auth.one_time_tokens USING hash (token_hash);


--
-- Name: one_time_tokens_user_id_token_type_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX one_time_tokens_user_id_token_type_key ON auth.one_time_tokens USING btree (user_id, token_type);


--
-- Name: reauthentication_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX reauthentication_token_idx ON auth.users USING btree (reauthentication_token) WHERE ((reauthentication_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: recovery_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX recovery_token_idx ON auth.users USING btree (recovery_token) WHERE ((recovery_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: refresh_tokens_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_idx ON auth.refresh_tokens USING btree (instance_id);


--
-- Name: refresh_tokens_instance_id_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_user_id_idx ON auth.refresh_tokens USING btree (instance_id, user_id);


--
-- Name: refresh_tokens_parent_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_parent_idx ON auth.refresh_tokens USING btree (parent);


--
-- Name: refresh_tokens_session_id_revoked_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_session_id_revoked_idx ON auth.refresh_tokens USING btree (session_id, revoked);


--
-- Name: refresh_tokens_updated_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_updated_at_idx ON auth.refresh_tokens USING btree (updated_at DESC);


--
-- Name: saml_providers_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_providers_sso_provider_id_idx ON auth.saml_providers USING btree (sso_provider_id);


--
-- Name: saml_relay_states_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_created_at_idx ON auth.saml_relay_states USING btree (created_at DESC);


--
-- Name: saml_relay_states_for_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_for_email_idx ON auth.saml_relay_states USING btree (for_email);


--
-- Name: saml_relay_states_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_sso_provider_id_idx ON auth.saml_relay_states USING btree (sso_provider_id);


--
-- Name: sessions_not_after_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_not_after_idx ON auth.sessions USING btree (not_after DESC);


--
-- Name: sessions_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_user_id_idx ON auth.sessions USING btree (user_id);


--
-- Name: sso_domains_domain_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_domains_domain_idx ON auth.sso_domains USING btree (lower(domain));


--
-- Name: sso_domains_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_domains_sso_provider_id_idx ON auth.sso_domains USING btree (sso_provider_id);


--
-- Name: sso_providers_resource_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_providers_resource_id_idx ON auth.sso_providers USING btree (lower(resource_id));


--
-- Name: unique_phone_factor_per_user; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX unique_phone_factor_per_user ON auth.mfa_factors USING btree (user_id, phone);


--
-- Name: user_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX user_id_created_at_idx ON auth.sessions USING btree (user_id, created_at);


--
-- Name: users_email_partial_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX users_email_partial_key ON auth.users USING btree (email) WHERE (is_sso_user = false);


--
-- Name: INDEX users_email_partial_key; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.users_email_partial_key IS 'Auth: A partial unique index that applies only when is_sso_user is false';


--
-- Name: users_instance_id_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_email_idx ON auth.users USING btree (instance_id, lower((email)::text));


--
-- Name: users_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_idx ON auth.users USING btree (instance_id);


--
-- Name: users_is_anonymous_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_is_anonymous_idx ON auth.users USING btree (is_anonymous);


--
-- Name: WDIDX_ActiviteRemuneree_IDSeniors; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_ActiviteRemuneree_IDSeniors" ON public."ActiviteRemuneree" USING btree ("IDSeniors");


--
-- Name: WDIDX_Agenda_IDSeniors; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Agenda_IDSeniors" ON public."Agenda" USING btree ("IDSeniors");


--
-- Name: WDIDX_Aidant_Competences_IDAidant; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Aidant_Competences_IDAidant" ON public."Aidant_Competences" USING btree ("IDAidant");


--
-- Name: WDIDX_Aidant_Competences_IDAidant_IDCompetences; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "WDIDX_Aidant_Competences_IDAidant_IDCompetences" ON public."Aidant_Competences" USING btree ("IDAidant", "IDCompetences");


--
-- Name: WDIDX_Aidant_Competences_IDCompetences; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Aidant_Competences_IDCompetences" ON public."Aidant_Competences" USING btree ("IDCompetences");


--
-- Name: WDIDX_Aidant_IDUtilisateurs; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Aidant_IDUtilisateurs" ON public."Aidant" USING btree ("IDUtilisateurs");


--
-- Name: WDIDX_AssuranceDeces_IDSeniors; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_AssuranceDeces_IDSeniors" ON public."AssuranceDeces" USING btree ("IDSeniors");


--
-- Name: WDIDX_BesoinSenior_IDSeniors; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_BesoinSenior_IDSeniors" ON public."BesoinSenior" USING btree ("IDSeniors");


--
-- Name: WDIDX_BonPlan_IDPartenaire; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_BonPlan_IDPartenaire" ON public."BonPlan" USING btree ("IDPartenaire");


--
-- Name: WDIDX_BonPlan_Utilisateurs_IDBonPlan; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_BonPlan_Utilisateurs_IDBonPlan" ON public."BonPlan_Utilisateurs" USING btree ("IDBonPlan");


--
-- Name: WDIDX_BonPlan_Utilisateurs_IDBonPlan_IDUtilisateurs; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "WDIDX_BonPlan_Utilisateurs_IDBonPlan_IDUtilisateurs" ON public."BonPlan_Utilisateurs" USING btree ("IDBonPlan", "IDUtilisateurs");


--
-- Name: WDIDX_BonPlan_Utilisateurs_IDUtilisateurs; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_BonPlan_Utilisateurs_IDUtilisateurs" ON public."BonPlan_Utilisateurs" USING btree ("IDUtilisateurs");


--
-- Name: WDIDX_CagnotteDeces_IDSeniors; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_CagnotteDeces_IDSeniors" ON public."CagnotteDeces" USING btree ("IDSeniors");


--
-- Name: WDIDX_CandidatureAidant_IDAidant; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_CandidatureAidant_IDAidant" ON public."CandidatureAidant" USING btree ("IDAidant");


--
-- Name: WDIDX_CandidatureAidant_IDBesoinSenior; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_CandidatureAidant_IDBesoinSenior" ON public."CandidatureAidant" USING btree ("IDBesoinSenior");


--
-- Name: WDIDX_CatUtilisateurs_EstAdministrateur; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_CatUtilisateurs_EstAdministrateur" ON public."CatUtilisateurs" USING btree ("EstAdministrateur");


--
-- Name: WDIDX_CatUtilisateurs_EstAidant; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_CatUtilisateurs_EstAidant" ON public."CatUtilisateurs" USING btree ("EstAidant");


--
-- Name: WDIDX_CatUtilisateurs_EstModerateur; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_CatUtilisateurs_EstModerateur" ON public."CatUtilisateurs" USING btree ("EstModerateur");


--
-- Name: WDIDX_CatUtilisateurs_EstOrganisme; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_CatUtilisateurs_EstOrganisme" ON public."CatUtilisateurs" USING btree ("EstOrganisme");


--
-- Name: WDIDX_CatUtilisateurs_EstSenior; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_CatUtilisateurs_EstSenior" ON public."CatUtilisateurs" USING btree ("EstSenior");


--
-- Name: WDIDX_CatUtilisateurs_EstTuteur; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_CatUtilisateurs_EstTuteur" ON public."CatUtilisateurs" USING btree ("EstTuteur");


--
-- Name: WDIDX_Commande_IDMoyenPaiement; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Commande_IDMoyenPaiement" ON public."Commande" USING btree ("IDMoyenPaiement");


--
-- Name: WDIDX_Competences_CodeMetier; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Competences_CodeMetier" ON public."Competences" USING btree ("CodeMetier");


--
-- Name: WDIDX_Competences_IDDomaine; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Competences_IDDomaine" ON public."Competences" USING btree ("IDDomaine");


--
-- Name: WDIDX_Competences_Metier; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Competences_Metier" ON public."Competences" USING btree ("Metier");


--
-- Name: WDIDX_ContactUrgence_Email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_ContactUrgence_Email" ON public."ContactUrgence" USING btree ("Email");


--
-- Name: WDIDX_ContactUrgence_IDSeniors; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_ContactUrgence_IDSeniors" ON public."ContactUrgence" USING btree ("IDSeniors");


--
-- Name: WDIDX_ContactUrgence_Telephone; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_ContactUrgence_Telephone" ON public."ContactUrgence" USING btree ("Telephone");


--
-- Name: WDIDX_ContratCohabitation_IDAidant; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_ContratCohabitation_IDAidant" ON public."ContratCohabitation" USING btree ("IDAidant");


--
-- Name: WDIDX_ContratCohabitation_IDLogementSenior; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_ContratCohabitation_IDLogementSenior" ON public."ContratCohabitation" USING btree ("IDLogementSenior");


--
-- Name: WDIDX_Devise_Utilisateurs_IDDevise; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Devise_Utilisateurs_IDDevise" ON public."Devise_Utilisateurs" USING btree ("IDDevise");


--
-- Name: WDIDX_Devise_Utilisateurs_IDDevise_IDUtilisateurs; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "WDIDX_Devise_Utilisateurs_IDDevise_IDUtilisateurs" ON public."Devise_Utilisateurs" USING btree ("IDDevise", "IDUtilisateurs");


--
-- Name: WDIDX_Devise_Utilisateurs_IDUtilisateurs; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Devise_Utilisateurs_IDUtilisateurs" ON public."Devise_Utilisateurs" USING btree ("IDUtilisateurs");


--
-- Name: WDIDX_DirectivesAnticipees_IDSeniors; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_DirectivesAnticipees_IDSeniors" ON public."DirectivesAnticipees" USING btree ("IDSeniors");


--
-- Name: WDIDX_DocumentPatrimonial_IDSeniors; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_DocumentPatrimonial_IDSeniors" ON public."DocumentPatrimonial" USING btree ("IDSeniors");


--
-- Name: WDIDX_DonCagnotte_IDCagnotteDeces; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_DonCagnotte_IDCagnotteDeces" ON public."DonCagnotte" USING btree ("IDCagnotteDeces");


--
-- Name: WDIDX_DonCagnotte_IDDonateur; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_DonCagnotte_IDDonateur" ON public."DonCagnotte" USING btree ("IDDonateur");


--
-- Name: WDIDX_EquipementMedical_IDProduit; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_EquipementMedical_IDProduit" ON public."EquipementMedical" USING btree ("IDProduit");


--
-- Name: WDIDX_EvaluationCohabitation_IDContratCohabitation; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_EvaluationCohabitation_IDContratCohabitation" ON public."EvaluationCohabitation" USING btree ("IDContratCohabitation");


--
-- Name: WDIDX_EvaluationCohabitation_IDEvaluateur; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_EvaluationCohabitation_IDEvaluateur" ON public."EvaluationCohabitation" USING btree ("IDEvaluateur");


--
-- Name: WDIDX_Evaluation_DateEvaluation; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Evaluation_DateEvaluation" ON public."Evaluation" USING btree ("DateEvaluation");


--
-- Name: WDIDX_Evaluation_IDCommande; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Evaluation_IDCommande" ON public."Evaluation" USING btree ("IDCommande");


--
-- Name: WDIDX_Evaluation_IDMiseEnRelation; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Evaluation_IDMiseEnRelation" ON public."Evaluation" USING btree ("IDMiseEnRelation");


--
-- Name: WDIDX_Evaluation_IDProduit; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Evaluation_IDProduit" ON public."Evaluation" USING btree ("IDProduit");


--
-- Name: WDIDX_Evaluation_IDUtilisateurs; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Evaluation_IDUtilisateurs" ON public."Evaluation" USING btree ("IDUtilisateurs");


--
-- Name: WDIDX_Evaluation_Note; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Evaluation_Note" ON public."Evaluation" USING btree ("Note");


--
-- Name: WDIDX_Evenements_IDAgenda; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Evenements_IDAgenda" ON public."Evenements" USING btree ("IDAgenda");


--
-- Name: WDIDX_Facture_IDCommande; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Facture_IDCommande" ON public."Facture" USING btree ("IDCommande");


--
-- Name: WDIDX_Facture_IDMiseEnRelation_IDPrestation; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Facture_IDMiseEnRelation_IDPrestation" ON public."Facture" USING btree ("IDMiseEnRelation_IDPrestation");


--
-- Name: WDIDX_Forum_IDCreateur; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Forum_IDCreateur" ON public."Forum" USING btree ("IDCreateur");


--
-- Name: WDIDX_Groupe_IDUtilisateursCreateur; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Groupe_IDUtilisateursCreateur" ON public."Groupe" USING btree ("IDUtilisateursCreateur");


--
-- Name: WDIDX_HistoriqueConnexion_IDUtilisateurs; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_HistoriqueConnexion_IDUtilisateurs" ON public."HistoriqueConnexion" USING btree ("IDUtilisateurs");


--
-- Name: WDIDX_HistoriqueInteractions_IDUtilisateurs; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_HistoriqueInteractions_IDUtilisateurs" ON public."HistoriqueInteractions" USING btree ("IDUtilisateurs");


--
-- Name: WDIDX_Humeur_IDSeniors; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Humeur_IDSeniors" ON public."Humeur" USING btree ("IDSeniors");


--
-- Name: WDIDX_Langue_Utilisateurs_IDLangue; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Langue_Utilisateurs_IDLangue" ON public."Langue_Utilisateurs" USING btree ("IDLangue");


--
-- Name: WDIDX_Langue_Utilisateurs_IDLangue_IDUtilisateurs; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "WDIDX_Langue_Utilisateurs_IDLangue_IDUtilisateurs" ON public."Langue_Utilisateurs" USING btree ("IDLangue", "IDUtilisateurs");


--
-- Name: WDIDX_Langue_Utilisateurs_IDUtilisateurs; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Langue_Utilisateurs_IDUtilisateurs" ON public."Langue_Utilisateurs" USING btree ("IDUtilisateurs");


--
-- Name: WDIDX_Langue_Utilisateurs_NiveauLangue; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Langue_Utilisateurs_NiveauLangue" ON public."Langue_Utilisateurs" USING btree ("NiveauLangue");


--
-- Name: WDIDX_LienPartenariat_IDOrganisme; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_LienPartenariat_IDOrganisme" ON public."LienPartenariat" USING btree ("IDOrganisme");


--
-- Name: WDIDX_LogementSenior_IDSeniors; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_LogementSenior_IDSeniors" ON public."LogementSenior" USING btree ("IDSeniors");


--
-- Name: WDIDX_Medicament_IDSeniors; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Medicament_IDSeniors" ON public."Medicament" USING btree ("IDSeniors");


--
-- Name: WDIDX_MessageGroupe_IDGroupe; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_MessageGroupe_IDGroupe" ON public."MessageGroupe" USING btree ("IDGroupe");


--
-- Name: WDIDX_MessageGroupe_IDUtilisateurs; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_MessageGroupe_IDUtilisateurs" ON public."MessageGroupe" USING btree ("IDUtilisateurs");


--
-- Name: WDIDX_MiseEnRelation_DatePaiement; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_MiseEnRelation_DatePaiement" ON public."MiseEnRelation" USING btree ("DatePaiement");


--
-- Name: WDIDX_MiseEnRelation_DatePrestation; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_MiseEnRelation_DatePrestation" ON public."MiseEnRelation" USING btree ("DatePrestation");


--
-- Name: WDIDX_MiseEnRelation_DateRefusPaiement; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_MiseEnRelation_DateRefusPaiement" ON public."MiseEnRelation" USING btree ("DateRefusPaiement");


--
-- Name: WDIDX_MiseEnRelation_IDAidant; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_MiseEnRelation_IDAidant" ON public."MiseEnRelation" USING btree ("IDAidant");


--
-- Name: WDIDX_MiseEnRelation_IDMoyenPaiement; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_MiseEnRelation_IDMoyenPaiement" ON public."MiseEnRelation" USING btree ("IDMoyenPaiement");


--
-- Name: WDIDX_MiseEnRelation_IDPartenairePayeur; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_MiseEnRelation_IDPartenairePayeur" ON public."MiseEnRelation" USING btree ("IDPartenairePayeur");


--
-- Name: WDIDX_MiseEnRelation_IDPrestation; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_MiseEnRelation_IDPrestation" ON public."MiseEnRelation" USING btree ("IDPrestation");


--
-- Name: WDIDX_MiseEnRelation_IDSeniors; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_MiseEnRelation_IDSeniors" ON public."MiseEnRelation" USING btree ("IDSeniors");


--
-- Name: WDIDX_MiseEnRelation_IDUtilisateurPayeur; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_MiseEnRelation_IDUtilisateurPayeur" ON public."MiseEnRelation" USING btree ("IDUtilisateurPayeur");


--
-- Name: WDIDX_MiseEnRelation_Prestation_IDMiseEnRelation; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_MiseEnRelation_Prestation_IDMiseEnRelation" ON public."MiseEnRelation_Prestation" USING btree ("IDMiseEnRelation");


--
-- Name: WDIDX_MiseEnRelation_Prestation_IDPrestation; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_MiseEnRelation_Prestation_IDPrestation" ON public."MiseEnRelation_Prestation" USING btree ("IDPrestation");


--
-- Name: WDIDX_MoyenPaiement_DatePaiement; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_MoyenPaiement_DatePaiement" ON public."MoyenPaiement" USING btree ("DatePaiement");


--
-- Name: WDIDX_Notifications_IDUtilisateurDestinataire; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Notifications_IDUtilisateurDestinataire" ON public."Notifications" USING btree ("IDUtilisateurDestinataire");


--
-- Name: WDIDX_Notifications_IDUtilisateurOrigine; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Notifications_IDUtilisateurOrigine" ON public."Notifications" USING btree ("IDUtilisateurOrigine");


--
-- Name: WDIDX_ObjetPrete_IDEmprunteurUtilisateur; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_ObjetPrete_IDEmprunteurUtilisateur" ON public."ObjetPrete" USING btree ("IDEmprunteurUtilisateur");


--
-- Name: WDIDX_ObjetPrete_IDProprietaireUtilisateur; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_ObjetPrete_IDProprietaireUtilisateur" ON public."ObjetPrete" USING btree ("IDProprietaireUtilisateur");


--
-- Name: WDIDX_OffreSenior_IDSeniors; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_OffreSenior_IDSeniors" ON public."OffreSenior" USING btree ("IDSeniors");


--
-- Name: WDIDX_Organisme_Email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Organisme_Email" ON public."Organisme" USING btree ("Email");


--
-- Name: WDIDX_Organisme_IDCategorieOrganisme; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Organisme_IDCategorieOrganisme" ON public."Organisme" USING btree ("IDCategorieOrganisme");


--
-- Name: WDIDX_Organisme_Nom; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Organisme_Nom" ON public."Organisme" USING btree ("Nom");


--
-- Name: WDIDX_Organisme_Telephone; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Organisme_Telephone" ON public."Organisme" USING btree ("Telephone");


--
-- Name: WDIDX_Parametres_IDUtilisateurs; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Parametres_IDUtilisateurs" ON public."Parametres" USING btree ("IDUtilisateurs");


--
-- Name: WDIDX_Partenaire_Email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Partenaire_Email" ON public."Partenaire" USING btree ("Email");


--
-- Name: WDIDX_Partenaire_IDCatUtilisateurs; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Partenaire_IDCatUtilisateurs" ON public."Partenaire" USING btree ("IDCatUtilisateurs");


--
-- Name: WDIDX_Partenaire_Telephone; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Partenaire_Telephone" ON public."Partenaire" USING btree ("Telephone");


--
-- Name: WDIDX_Pieces_DateCreation; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Pieces_DateCreation" ON public."Pieces" USING btree ("DateCreation");


--
-- Name: WDIDX_Pieces_DateSuppression; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Pieces_DateSuppression" ON public."Pieces" USING btree ("DateSuppression");


--
-- Name: WDIDX_Pieces_IDUtilisateurs; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Pieces_IDUtilisateurs" ON public."Pieces" USING btree ("IDUtilisateurs");


--
-- Name: WDIDX_Pieces_TypePiece; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Pieces_TypePiece" ON public."Pieces" USING btree ("TypePiece");


--
-- Name: WDIDX_PrestationAidant_IDAidant; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_PrestationAidant_IDAidant" ON public."PrestationAidant" USING btree ("IDAidant");


--
-- Name: WDIDX_PrestationAidant_IDBesoinSenior; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_PrestationAidant_IDBesoinSenior" ON public."PrestationAidant" USING btree ("IDBesoinSenior");


--
-- Name: WDIDX_PrestationSupport_IDIntervenant; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_PrestationSupport_IDIntervenant" ON public."PrestationSupport" USING btree ("IDIntervenant");


--
-- Name: WDIDX_PrestationSupport_IDTicketClient; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_PrestationSupport_IDTicketClient" ON public."PrestationSupport" USING btree ("IDTicketClient");


--
-- Name: WDIDX_Prestation_IDDomaine; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Prestation_IDDomaine" ON public."Prestation" USING btree ("IDDomaine");


--
-- Name: WDIDX_Prestation_Localisation_IDLocalisation; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Prestation_Localisation_IDLocalisation" ON public."Prestation_Localisation" USING btree ("IDLocalisation");


--
-- Name: WDIDX_Prestation_Localisation_IDPrestation; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Prestation_Localisation_IDPrestation" ON public."Prestation_Localisation" USING btree ("IDPrestation");


--
-- Name: WDIDX_Prestation_Localisation_IDPrestation_IDLocalisation; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "WDIDX_Prestation_Localisation_IDPrestation_IDLocalisation" ON public."Prestation_Localisation" USING btree ("IDPrestation", "IDLocalisation");


--
-- Name: WDIDX_Prestation_Titre; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Prestation_Titre" ON public."Prestation" USING btree ("Titre");


--
-- Name: WDIDX_Produit_Commande_IDCommande; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Produit_Commande_IDCommande" ON public."Produit_Commande" USING btree ("IDCommande");


--
-- Name: WDIDX_Produit_Commande_IDProduit; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Produit_Commande_IDProduit" ON public."Produit_Commande" USING btree ("IDProduit");


--
-- Name: WDIDX_Produit_Commande_IDProduit_IDCommande; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "WDIDX_Produit_Commande_IDProduit_IDCommande" ON public."Produit_Commande" USING btree ("IDProduit", "IDCommande");


--
-- Name: WDIDX_Produit_IDSeniorsVendeur; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Produit_IDSeniorsVendeur" ON public."Produit" USING btree ("IDSeniorsVendeur");


--
-- Name: WDIDX_RapportMensuel_IDRedacteur; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_RapportMensuel_IDRedacteur" ON public."RapportMensuel" USING btree ("IDRedacteur");


--
-- Name: WDIDX_RapportMensuel_IDSeniors; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_RapportMensuel_IDSeniors" ON public."RapportMensuel" USING btree ("IDSeniors");


--
-- Name: WDIDX_RendezVousMedical_IDSeniors; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_RendezVousMedical_IDSeniors" ON public."RendezVousMedical" USING btree ("IDSeniors");


--
-- Name: WDIDX_ReponseForum_IDSujetForum; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_ReponseForum_IDSujetForum" ON public."ReponseForum" USING btree ("IDSujetForum");


--
-- Name: WDIDX_ReponseForum_IDUtilisateurs; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_ReponseForum_IDUtilisateurs" ON public."ReponseForum" USING btree ("IDUtilisateurs");


--
-- Name: WDIDX_Ressource_IDCategorieRessource; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Ressource_IDCategorieRessource" ON public."Ressource" USING btree ("IDCategorieRessource");


--
-- Name: WDIDX_Seniors_EstRGPD; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Seniors_EstRGPD" ON public."Seniors" USING btree ("EstRGPD");


--
-- Name: WDIDX_Seniors_IDStructures; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Seniors_IDStructures" ON public."Seniors" USING btree ("IDStructures");


--
-- Name: WDIDX_Seniors_IDTuteur; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Seniors_IDTuteur" ON public."Seniors" USING btree ("IDTuteur");


--
-- Name: WDIDX_Seniors_IDUtilisateurSenior; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Seniors_IDUtilisateurSenior" ON public."Seniors" USING btree ("IDUtilisateurSenior");


--
-- Name: WDIDX_Seniors_NiveauAutonomie; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Seniors_NiveauAutonomie" ON public."Seniors" USING btree ("NiveauAutonomie");


--
-- Name: WDIDX_Seniors_TypeMaladie_IDSeniors; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Seniors_TypeMaladie_IDSeniors" ON public."Seniors_TypeMaladie" USING btree ("IDSeniors");


--
-- Name: WDIDX_Seniors_TypeMaladie_IDSeniors_IDTypeMaladie; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "WDIDX_Seniors_TypeMaladie_IDSeniors_IDTypeMaladie" ON public."Seniors_TypeMaladie" USING btree ("IDSeniors", "IDTypeMaladie");


--
-- Name: WDIDX_Seniors_TypeMaladie_IDTypeMaladie; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Seniors_TypeMaladie_IDTypeMaladie" ON public."Seniors_TypeMaladie" USING btree ("IDTypeMaladie");


--
-- Name: WDIDX_ServicePostMortem_IDCagnotteDeces; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_ServicePostMortem_IDCagnotteDeces" ON public."ServicePostMortem" USING btree ("IDCagnotteDeces");


--
-- Name: WDIDX_Souvenir_IDSeniors; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Souvenir_IDSeniors" ON public."Souvenir" USING btree ("IDSeniors");


--
-- Name: WDIDX_SujetForum_IDForum; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_SujetForum_IDForum" ON public."SujetForum" USING btree ("IDForum");


--
-- Name: WDIDX_SujetForum_IDUtilisateurs; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_SujetForum_IDUtilisateurs" ON public."SujetForum" USING btree ("IDUtilisateurs");


--
-- Name: WDIDX_SupportClient_IDUtilisateursClient; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_SupportClient_IDUtilisateursClient" ON public."SupportClient" USING btree ("IDUtilisateursClient");


--
-- Name: WDIDX_TMessage_IDUtilisateurDestinataire; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_TMessage_IDUtilisateurDestinataire" ON public."TMessage" USING btree ("IDUtilisateurDestinataire");


--
-- Name: WDIDX_TMessage_IDUtilisateurExpediteur; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_TMessage_IDUtilisateurExpediteur" ON public."TMessage" USING btree ("IDUtilisateurExpediteur");


--
-- Name: WDIDX_TransactionRevenu_IDActiviteRemuneree; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_TransactionRevenu_IDActiviteRemuneree" ON public."ActiviteRemuneree_Utilisateurs" USING btree ("IDActiviteRemuneree");


--
-- Name: WDIDX_TransactionRevenu_IDActiviteRemuneree_IDUtilisateurs; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "WDIDX_TransactionRevenu_IDActiviteRemuneree_IDUtilisateurs" ON public."ActiviteRemuneree_Utilisateurs" USING btree ("IDActiviteRemuneree", "IDUtilisateurs");


--
-- Name: WDIDX_TransactionRevenu_IDUtilisateurs; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_TransactionRevenu_IDUtilisateurs" ON public."ActiviteRemuneree_Utilisateurs" USING btree ("IDUtilisateurs");


--
-- Name: WDIDX_TypeMaladie_EstHandicap; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_TypeMaladie_EstHandicap" ON public."TypeMaladie" USING btree ("EstHandicap");


--
-- Name: WDIDX_Utilisateurs_DateInscription; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Utilisateurs_DateInscription" ON public."Utilisateurs" USING btree ("DateInscription");


--
-- Name: WDIDX_Utilisateurs_DateModification; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Utilisateurs_DateModification" ON public."Utilisateurs" USING btree ("DateModification");


--
-- Name: WDIDX_Utilisateurs_DateNaissance; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Utilisateurs_DateNaissance" ON public."Utilisateurs" USING btree ("DateNaissance");


--
-- Name: WDIDX_Utilisateurs_Email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Utilisateurs_Email" ON public."Utilisateurs" USING btree ("Email");


--
-- Name: WDIDX_Utilisateurs_EstDesactive; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Utilisateurs_EstDesactive" ON public."Utilisateurs" USING btree ("EstDesactive");


--
-- Name: WDIDX_Utilisateurs_EstRGPD; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Utilisateurs_EstRGPD" ON public."Utilisateurs" USING btree ("EstRGPD");


--
-- Name: WDIDX_Utilisateurs_Groupe_IDGroupe; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Utilisateurs_Groupe_IDGroupe" ON public."Utilisateurs_Groupe" USING btree ("IDGroupe");


--
-- Name: WDIDX_Utilisateurs_Groupe_IDUtilisateurs; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Utilisateurs_Groupe_IDUtilisateurs" ON public."Utilisateurs_Groupe" USING btree ("IDUtilisateurs");


--
-- Name: WDIDX_Utilisateurs_Groupe_IDUtilisateurs_IDGroupe; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "WDIDX_Utilisateurs_Groupe_IDUtilisateurs_IDGroupe" ON public."Utilisateurs_Groupe" USING btree ("IDUtilisateurs", "IDGroupe");


--
-- Name: WDIDX_Utilisateurs_IDCatUtilisateurs; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Utilisateurs_IDCatUtilisateurs" ON public."Utilisateurs" USING btree ("IDCatUtilisateurs");


--
-- Name: WDIDX_Utilisateurs_LangueSite; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Utilisateurs_LangueSite" ON public."Utilisateurs" USING btree ("LangueSite");


--
-- Name: WDIDX_Utilisateurs_Localisation_IDLocalisation; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Utilisateurs_Localisation_IDLocalisation" ON public."Utilisateurs_Localisation" USING btree ("IDLocalisation");


--
-- Name: WDIDX_Utilisateurs_Localisation_IDUtilisateurs; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Utilisateurs_Localisation_IDUtilisateurs" ON public."Utilisateurs_Localisation" USING btree ("IDUtilisateurs");


--
-- Name: WDIDX_Utilisateurs_Localisation_IDUtilisateurs_IDLocalisation; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "WDIDX_Utilisateurs_Localisation_IDUtilisateurs_IDLocalisation" ON public."Utilisateurs_Localisation" USING btree ("IDUtilisateurs", "IDLocalisation");


--
-- Name: WDIDX_Utilisateurs_Nom; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Utilisateurs_Nom" ON public."Utilisateurs" USING btree ("Nom");


--
-- Name: WDIDX_Utilisateurs_Prenom; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Utilisateurs_Prenom" ON public."Utilisateurs" USING btree ("Prenom");


--
-- Name: WDIDX_Utilisateurs_Telephone; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_Utilisateurs_Telephone" ON public."Utilisateurs" USING btree ("Telephone");


--
-- Name: WDIDX_VersementCommissions_IDPrestation; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WDIDX_VersementCommissions_IDPrestation" ON public."VersementCommissions" USING btree ("IDPrestation");


--
-- Name: idx_utilisateurs_idauth; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_utilisateurs_idauth ON public."Utilisateurs" USING btree ("IDAuth");


--
-- Name: ix_realtime_subscription_entity; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX ix_realtime_subscription_entity ON realtime.subscription USING btree (entity);


--
-- Name: messages_inserted_at_topic_index; Type: INDEX; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE INDEX messages_inserted_at_topic_index ON ONLY realtime.messages USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: messages_2026_02_23_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2026_02_23_inserted_at_topic_idx ON realtime.messages_2026_02_23 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: messages_2026_02_24_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2026_02_24_inserted_at_topic_idx ON realtime.messages_2026_02_24 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: messages_2026_02_25_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2026_02_25_inserted_at_topic_idx ON realtime.messages_2026_02_25 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: messages_2026_02_26_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2026_02_26_inserted_at_topic_idx ON realtime.messages_2026_02_26 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: messages_2026_02_27_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2026_02_27_inserted_at_topic_idx ON realtime.messages_2026_02_27 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: messages_2026_02_28_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2026_02_28_inserted_at_topic_idx ON realtime.messages_2026_02_28 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: subscription_subscription_id_entity_filters_action_filter_key; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX subscription_subscription_id_entity_filters_action_filter_key ON realtime.subscription USING btree (subscription_id, entity, filters, action_filter);


--
-- Name: bname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bname ON storage.buckets USING btree (name);


--
-- Name: bucketid_objname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bucketid_objname ON storage.objects USING btree (bucket_id, name);


--
-- Name: buckets_analytics_unique_name_idx; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX buckets_analytics_unique_name_idx ON storage.buckets_analytics USING btree (name) WHERE (deleted_at IS NULL);


--
-- Name: idx_iceberg_namespaces_bucket_id; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX idx_iceberg_namespaces_bucket_id ON storage.iceberg_namespaces USING btree (catalog_id, name);


--
-- Name: idx_iceberg_tables_location; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX idx_iceberg_tables_location ON storage.iceberg_tables USING btree (location);


--
-- Name: idx_iceberg_tables_namespace_id; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX idx_iceberg_tables_namespace_id ON storage.iceberg_tables USING btree (catalog_id, namespace_id, name);


--
-- Name: idx_multipart_uploads_list; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_multipart_uploads_list ON storage.s3_multipart_uploads USING btree (bucket_id, key, created_at);


--
-- Name: idx_objects_bucket_id_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_bucket_id_name ON storage.objects USING btree (bucket_id, name COLLATE "C");


--
-- Name: idx_objects_bucket_id_name_lower; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_bucket_id_name_lower ON storage.objects USING btree (bucket_id, lower(name) COLLATE "C");


--
-- Name: name_prefix_search; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX name_prefix_search ON storage.objects USING btree (name text_pattern_ops);


--
-- Name: vector_indexes_name_bucket_id_idx; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX vector_indexes_name_bucket_id_idx ON storage.vector_indexes USING btree (name, bucket_id);


--
-- Name: supabase_functions_hooks_h_table_id_h_name_idx; Type: INDEX; Schema: supabase_functions; Owner: supabase_functions_admin
--

CREATE INDEX supabase_functions_hooks_h_table_id_h_name_idx ON supabase_functions.hooks USING btree (hook_table_id, hook_name);


--
-- Name: supabase_functions_hooks_request_id_idx; Type: INDEX; Schema: supabase_functions; Owner: supabase_functions_admin
--

CREATE INDEX supabase_functions_hooks_request_id_idx ON supabase_functions.hooks USING btree (request_id);


--
-- Name: messages_2026_02_23_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2026_02_23_inserted_at_topic_idx;


--
-- Name: messages_2026_02_23_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2026_02_23_pkey;


--
-- Name: messages_2026_02_24_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2026_02_24_inserted_at_topic_idx;


--
-- Name: messages_2026_02_24_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2026_02_24_pkey;


--
-- Name: messages_2026_02_25_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2026_02_25_inserted_at_topic_idx;


--
-- Name: messages_2026_02_25_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2026_02_25_pkey;


--
-- Name: messages_2026_02_26_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2026_02_26_inserted_at_topic_idx;


--
-- Name: messages_2026_02_26_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2026_02_26_pkey;


--
-- Name: messages_2026_02_27_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2026_02_27_inserted_at_topic_idx;


--
-- Name: messages_2026_02_27_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2026_02_27_pkey;


--
-- Name: messages_2026_02_28_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2026_02_28_inserted_at_topic_idx;


--
-- Name: messages_2026_02_28_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2026_02_28_pkey;


--
-- Name: v_group_messages_moderation _RETURN; Type: RULE; Schema: public; Owner: postgres
--

CREATE OR REPLACE VIEW public.v_group_messages_moderation AS
 SELECT m."IDMessageGroupe",
    m."Contenu",
    m."DateEnvoi",
    m."IDUtilisateurs",
    u."Prenom" AS "PrenomAuteur",
    u."Nom" AS "NomAuteur",
    m."IDGroupe",
    g."Titre" AS "NomGroupe",
    count(s."IDSignalement") AS signalements
   FROM (((public."MessageGroupe" m
     LEFT JOIN public."Utilisateurs" u ON ((u."IDUtilisateurs" = m."IDUtilisateurs")))
     LEFT JOIN public."Groupe" g ON ((g."IDGroupe" = m."IDGroupe")))
     LEFT JOIN public."SignalementContenu" s ON ((s."IDMessageGroupe" = m."IDMessageGroupe")))
  GROUP BY m."IDMessageGroupe", u."Prenom", u."Nom", g."Titre";


--
-- Name: Utilisateurs create_senior_or_aidant; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER create_senior_or_aidant AFTER INSERT ON public."Utilisateurs" FOR EACH ROW EXECUTE FUNCTION public.insert_into_seniors_or_aidant();


--
-- Name: ActiviteRemuneree_Utilisateurs trigger_commission_activite; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_commission_activite AFTER INSERT ON public."ActiviteRemuneree_Utilisateurs" FOR EACH ROW EXECUTE FUNCTION public.create_commission_from_activite();


--
-- Name: Commande trigger_commission_commande; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_commission_commande AFTER INSERT ON public."Commande" FOR EACH ROW EXECUTE FUNCTION public.create_commission_from_commande();


--
-- Name: ServicePostMortem trigger_commission_postmortem; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_commission_postmortem AFTER INSERT ON public."ServicePostMortem" FOR EACH ROW EXECUTE FUNCTION public.create_commission_from_postmortem();


--
-- Name: CagnotteDeces trigger_set_initial_cagnotte_status; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_set_initial_cagnotte_status BEFORE INSERT ON public."CagnotteDeces" FOR EACH ROW EXECUTE FUNCTION public.set_initial_cagnotte_status();


--
-- Name: DonCagnotte trigger_update_cagnotte_montant; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_update_cagnotte_montant AFTER INSERT ON public."DonCagnotte" FOR EACH ROW EXECUTE FUNCTION public.update_cagnotte_montant_total();


--
-- Name: DonCagnotte trigger_update_cagnotte_status; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_update_cagnotte_status AFTER INSERT ON public."DonCagnotte" FOR EACH ROW EXECUTE FUNCTION public.update_cagnotte_status();


--
-- Name: subscription tr_check_filters; Type: TRIGGER; Schema: realtime; Owner: supabase_admin
--

CREATE TRIGGER tr_check_filters BEFORE INSERT OR UPDATE ON realtime.subscription FOR EACH ROW EXECUTE FUNCTION realtime.subscription_check_filters();


--
-- Name: buckets enforce_bucket_name_length_trigger; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER enforce_bucket_name_length_trigger BEFORE INSERT OR UPDATE OF name ON storage.buckets FOR EACH ROW EXECUTE FUNCTION storage.enforce_bucket_name_length();


--
-- Name: buckets protect_buckets_delete; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER protect_buckets_delete BEFORE DELETE ON storage.buckets FOR EACH STATEMENT EXECUTE FUNCTION storage.protect_delete();


--
-- Name: objects protect_objects_delete; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER protect_objects_delete BEFORE DELETE ON storage.objects FOR EACH STATEMENT EXECUTE FUNCTION storage.protect_delete();


--
-- Name: objects update_objects_updated_at; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER update_objects_updated_at BEFORE UPDATE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column();


--
-- Name: extensions extensions_tenant_external_id_fkey; Type: FK CONSTRAINT; Schema: _realtime; Owner: supabase_admin
--

ALTER TABLE ONLY _realtime.extensions
    ADD CONSTRAINT extensions_tenant_external_id_fkey FOREIGN KEY (tenant_external_id) REFERENCES _realtime.tenants(external_id) ON DELETE CASCADE;


--
-- Name: identities identities_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: mfa_challenges mfa_challenges_auth_factor_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_auth_factor_id_fkey FOREIGN KEY (factor_id) REFERENCES auth.mfa_factors(id) ON DELETE CASCADE;


--
-- Name: mfa_factors mfa_factors_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: one_time_tokens one_time_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: refresh_tokens refresh_tokens_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: saml_providers saml_providers_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_flow_state_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_flow_state_id_fkey FOREIGN KEY (flow_state_id) REFERENCES auth.flow_state(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: sso_domains sso_domains_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: ActiviteRemuneree ActiviteRemuneree_IDSeniors_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ActiviteRemuneree"
    ADD CONSTRAINT "ActiviteRemuneree_IDSeniors_fkey" FOREIGN KEY ("IDSeniors") REFERENCES public."Seniors"("IDSeniors");


--
-- Name: ActiviteRemuneree_Utilisateurs ActiviteRemuneree_Utilisateurs_IDActiviteRemuneree_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ActiviteRemuneree_Utilisateurs"
    ADD CONSTRAINT "ActiviteRemuneree_Utilisateurs_IDActiviteRemuneree_fkey" FOREIGN KEY ("IDActiviteRemuneree") REFERENCES public."ActiviteRemuneree"("IDActiviteRemuneree");


--
-- Name: ActiviteRemuneree_Utilisateurs ActiviteRemuneree_Utilisateurs_IDUtilisateurs_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ActiviteRemuneree_Utilisateurs"
    ADD CONSTRAINT "ActiviteRemuneree_Utilisateurs_IDUtilisateurs_fkey" FOREIGN KEY ("IDUtilisateurs") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: Agenda Agenda_IDSeniors_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Agenda"
    ADD CONSTRAINT "Agenda_IDSeniors_fkey" FOREIGN KEY ("IDSeniors") REFERENCES public."Seniors"("IDSeniors");


--
-- Name: Aidant_Competences Aidant_Competences_IDAidant_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Aidant_Competences"
    ADD CONSTRAINT "Aidant_Competences_IDAidant_fkey" FOREIGN KEY ("IDAidant") REFERENCES public."Aidant"("IDAidant");


--
-- Name: Aidant_Competences Aidant_Competences_IDCompetences_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Aidant_Competences"
    ADD CONSTRAINT "Aidant_Competences_IDCompetences_fkey" FOREIGN KEY ("IDCompetences") REFERENCES public."Competences"("IDCompetences");


--
-- Name: Aidant Aidant_IDUtilisateurs_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Aidant"
    ADD CONSTRAINT "Aidant_IDUtilisateurs_fkey" FOREIGN KEY ("IDUtilisateurs") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: AssuranceDeces AssuranceDeces_IDSeniors_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AssuranceDeces"
    ADD CONSTRAINT "AssuranceDeces_IDSeniors_fkey" FOREIGN KEY ("IDSeniors") REFERENCES public."Seniors"("IDSeniors");


--
-- Name: BesoinSenior BesoinSenior_IDSeniors_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BesoinSenior"
    ADD CONSTRAINT "BesoinSenior_IDSeniors_fkey" FOREIGN KEY ("IDSeniors") REFERENCES public."Seniors"("IDSeniors");


--
-- Name: BonPlan BonPlan_IDPartenaire_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BonPlan"
    ADD CONSTRAINT "BonPlan_IDPartenaire_fkey" FOREIGN KEY ("IDPartenaire") REFERENCES public."Partenaire"("IDPartenaire");


--
-- Name: BonPlan_Utilisateurs BonPlan_Utilisateurs_IDBonPlan_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BonPlan_Utilisateurs"
    ADD CONSTRAINT "BonPlan_Utilisateurs_IDBonPlan_fkey" FOREIGN KEY ("IDBonPlan") REFERENCES public."BonPlan"("IDBonPlan");


--
-- Name: BonPlan_Utilisateurs BonPlan_Utilisateurs_IDUtilisateurs_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BonPlan_Utilisateurs"
    ADD CONSTRAINT "BonPlan_Utilisateurs_IDUtilisateurs_fkey" FOREIGN KEY ("IDUtilisateurs") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: CagnotteDeces CagnotteDeces_IDSeniors_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CagnotteDeces"
    ADD CONSTRAINT "CagnotteDeces_IDSeniors_fkey" FOREIGN KEY ("IDSeniors") REFERENCES public."Seniors"("IDSeniors");


--
-- Name: CandidatureAidant CandidatureAidant_IDAidant_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CandidatureAidant"
    ADD CONSTRAINT "CandidatureAidant_IDAidant_fkey" FOREIGN KEY ("IDAidant") REFERENCES public."Aidant"("IDAidant");


--
-- Name: CandidatureAidant CandidatureAidant_IDBesoinSenior_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CandidatureAidant"
    ADD CONSTRAINT "CandidatureAidant_IDBesoinSenior_fkey" FOREIGN KEY ("IDBesoinSenior") REFERENCES public."BesoinSenior"("IDBesoinSenior");


--
-- Name: Commande Commande_IDMoyenPaiement_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Commande"
    ADD CONSTRAINT "Commande_IDMoyenPaiement_fkey" FOREIGN KEY ("IDMoyenPaiement") REFERENCES public."MoyenPaiement"("IDMoyenPaiement");


--
-- Name: Competences Competences_IDDomaine_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Competences"
    ADD CONSTRAINT "Competences_IDDomaine_fkey" FOREIGN KEY ("IDDomaine") REFERENCES public."Domaine"("IDDomaine");


--
-- Name: ConsentementCookies ConsentementCookies_IDUtilisateurs_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ConsentementCookies"
    ADD CONSTRAINT "ConsentementCookies_IDUtilisateurs_fkey" FOREIGN KEY ("IDUtilisateurs") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: ContactUrgence ContactUrgence_IDSeniors_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContactUrgence"
    ADD CONSTRAINT "ContactUrgence_IDSeniors_fkey" FOREIGN KEY ("IDSeniors") REFERENCES public."Seniors"("IDSeniors");


--
-- Name: ContratCohabitation ContratCohabitation_IDAidant_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContratCohabitation"
    ADD CONSTRAINT "ContratCohabitation_IDAidant_fkey" FOREIGN KEY ("IDAidant") REFERENCES public."Aidant"("IDAidant");


--
-- Name: ContratCohabitation ContratCohabitation_IDLogementSenior_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContratCohabitation"
    ADD CONSTRAINT "ContratCohabitation_IDLogementSenior_fkey" FOREIGN KEY ("IDLogementSenior") REFERENCES public."LogementSenior"("IDLogementSenior");


--
-- Name: DemandeRGPD DemandeRGPD_IDUtilisateurs_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DemandeRGPD"
    ADD CONSTRAINT "DemandeRGPD_IDUtilisateurs_fkey" FOREIGN KEY ("IDUtilisateurs") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: DemandeRGPD DemandeRGPD_TraitePar_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DemandeRGPD"
    ADD CONSTRAINT "DemandeRGPD_TraitePar_fkey" FOREIGN KEY ("TraitePar") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: Devise_Utilisateurs Devise_Utilisateurs_IDDevise_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Devise_Utilisateurs"
    ADD CONSTRAINT "Devise_Utilisateurs_IDDevise_fkey" FOREIGN KEY ("IDDevise") REFERENCES public."Devise"("IDDevise");


--
-- Name: Devise_Utilisateurs Devise_Utilisateurs_IDUtilisateurs_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Devise_Utilisateurs"
    ADD CONSTRAINT "Devise_Utilisateurs_IDUtilisateurs_fkey" FOREIGN KEY ("IDUtilisateurs") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: DirectivesAnticipees DirectivesAnticipees_IDSeniors_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DirectivesAnticipees"
    ADD CONSTRAINT "DirectivesAnticipees_IDSeniors_fkey" FOREIGN KEY ("IDSeniors") REFERENCES public."Seniors"("IDSeniors");


--
-- Name: DocumentPatrimonial DocumentPatrimonial_IDSeniors_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DocumentPatrimonial"
    ADD CONSTRAINT "DocumentPatrimonial_IDSeniors_fkey" FOREIGN KEY ("IDSeniors") REFERENCES public."Seniors"("IDSeniors");


--
-- Name: Document Document_IDCategorieDocument_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Document"
    ADD CONSTRAINT "Document_IDCategorieDocument_fkey" FOREIGN KEY ("IDCategorieDocument") REFERENCES public."CategorieDocument"("IDCategorieDocument");


--
-- Name: Document Document_IDUtilisateurs_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Document"
    ADD CONSTRAINT "Document_IDUtilisateurs_fkey" FOREIGN KEY ("IDUtilisateurs") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: DonCagnotte DonCagnotte_IDCagnotteDeces_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DonCagnotte"
    ADD CONSTRAINT "DonCagnotte_IDCagnotteDeces_fkey" FOREIGN KEY ("IDCagnotteDeces") REFERENCES public."CagnotteDeces"("IDCagnotteDeces");


--
-- Name: DonCagnotte DonCagnotte_IDDonateur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DonCagnotte"
    ADD CONSTRAINT "DonCagnotte_IDDonateur_fkey" FOREIGN KEY ("IDDonateur") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: EquipementMedical EquipementMedical_IDProduit_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EquipementMedical"
    ADD CONSTRAINT "EquipementMedical_IDProduit_fkey" FOREIGN KEY ("IDProduit") REFERENCES public."Produit"("IDProduit");


--
-- Name: EvaluationCohabitation EvaluationCohabitation_IDContratCohabitation_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EvaluationCohabitation"
    ADD CONSTRAINT "EvaluationCohabitation_IDContratCohabitation_fkey" FOREIGN KEY ("IDContratCohabitation") REFERENCES public."ContratCohabitation"("IDContratCohabitation");


--
-- Name: EvaluationCohabitation EvaluationCohabitation_IDEvaluateur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EvaluationCohabitation"
    ADD CONSTRAINT "EvaluationCohabitation_IDEvaluateur_fkey" FOREIGN KEY ("IDEvaluateur") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: Evaluation Evaluation_IDCommande_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Evaluation"
    ADD CONSTRAINT "Evaluation_IDCommande_fkey" FOREIGN KEY ("IDCommande") REFERENCES public."Commande"("IDCommande");


--
-- Name: Evaluation Evaluation_IDMiseEnRelation_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Evaluation"
    ADD CONSTRAINT "Evaluation_IDMiseEnRelation_fkey" FOREIGN KEY ("IDMiseEnRelation") REFERENCES public."MiseEnRelation"("IDMiseEnRelation");


--
-- Name: Evaluation Evaluation_IDProduit_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Evaluation"
    ADD CONSTRAINT "Evaluation_IDProduit_fkey" FOREIGN KEY ("IDProduit") REFERENCES public."Produit"("IDProduit");


--
-- Name: Evaluation Evaluation_IDUtilisateurs_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Evaluation"
    ADD CONSTRAINT "Evaluation_IDUtilisateurs_fkey" FOREIGN KEY ("IDUtilisateurs") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: Evenements Evenements_IDAgenda_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Evenements"
    ADD CONSTRAINT "Evenements_IDAgenda_fkey" FOREIGN KEY ("IDAgenda") REFERENCES public."Agenda"("IDAgenda");


--
-- Name: Facture Facture_IDCommande_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Facture"
    ADD CONSTRAINT "Facture_IDCommande_fkey" FOREIGN KEY ("IDCommande") REFERENCES public."Commande"("IDCommande");


--
-- Name: Facture Facture_IDMiseEnRelation_IDPrestation_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Facture"
    ADD CONSTRAINT "Facture_IDMiseEnRelation_IDPrestation_fkey" FOREIGN KEY ("IDMiseEnRelation_IDPrestation") REFERENCES public."MiseEnRelation_Prestation"("IDMiseEnRelation_IDPrestation");


--
-- Name: Forum Forum_IDCreateur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Forum"
    ADD CONSTRAINT "Forum_IDCreateur_fkey" FOREIGN KEY ("IDCreateur") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: Groupe Groupe_IDUtilisateursCreateur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Groupe"
    ADD CONSTRAINT "Groupe_IDUtilisateursCreateur_fkey" FOREIGN KEY ("IDUtilisateursCreateur") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: HistoriqueConnexion HistoriqueConnexion_IDUtilisateurs_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HistoriqueConnexion"
    ADD CONSTRAINT "HistoriqueConnexion_IDUtilisateurs_fkey" FOREIGN KEY ("IDUtilisateurs") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: HistoriqueInteractions HistoriqueInteractions_IDUtilisateurs_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HistoriqueInteractions"
    ADD CONSTRAINT "HistoriqueInteractions_IDUtilisateurs_fkey" FOREIGN KEY ("IDUtilisateurs") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: Humeur Humeur_IDSeniors_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Humeur"
    ADD CONSTRAINT "Humeur_IDSeniors_fkey" FOREIGN KEY ("IDSeniors") REFERENCES public."Seniors"("IDSeniors");


--
-- Name: Langue_Utilisateurs Langue_Utilisateurs_IDLangue_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Langue_Utilisateurs"
    ADD CONSTRAINT "Langue_Utilisateurs_IDLangue_fkey" FOREIGN KEY ("IDLangue") REFERENCES public."Langue"("IDLangue");


--
-- Name: Langue_Utilisateurs Langue_Utilisateurs_IDUtilisateurs_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Langue_Utilisateurs"
    ADD CONSTRAINT "Langue_Utilisateurs_IDUtilisateurs_fkey" FOREIGN KEY ("IDUtilisateurs") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: LienPartenariat LienPartenariat_IDOrganisme_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LienPartenariat"
    ADD CONSTRAINT "LienPartenariat_IDOrganisme_fkey" FOREIGN KEY ("IDOrganisme") REFERENCES public."Organisme"("IDOrganisme");


--
-- Name: LogementSenior LogementSenior_IDSeniors_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LogementSenior"
    ADD CONSTRAINT "LogementSenior_IDSeniors_fkey" FOREIGN KEY ("IDSeniors") REFERENCES public."Seniors"("IDSeniors");


--
-- Name: Medicament Medicament_IDSeniors_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Medicament"
    ADD CONSTRAINT "Medicament_IDSeniors_fkey" FOREIGN KEY ("IDSeniors") REFERENCES public."Seniors"("IDSeniors");


--
-- Name: MessageGroupe MessageGroupe_IDGroupe_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MessageGroupe"
    ADD CONSTRAINT "MessageGroupe_IDGroupe_fkey" FOREIGN KEY ("IDGroupe") REFERENCES public."Groupe"("IDGroupe");


--
-- Name: MessageGroupe MessageGroupe_IDUtilisateurs_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MessageGroupe"
    ADD CONSTRAINT "MessageGroupe_IDUtilisateurs_fkey" FOREIGN KEY ("IDUtilisateurs") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: MiseEnRelation MiseEnRelation_IDAidant_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MiseEnRelation"
    ADD CONSTRAINT "MiseEnRelation_IDAidant_fkey" FOREIGN KEY ("IDAidant") REFERENCES public."Aidant"("IDAidant");


--
-- Name: MiseEnRelation MiseEnRelation_IDMoyenPaiement_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MiseEnRelation"
    ADD CONSTRAINT "MiseEnRelation_IDMoyenPaiement_fkey" FOREIGN KEY ("IDMoyenPaiement") REFERENCES public."MoyenPaiement"("IDMoyenPaiement");


--
-- Name: MiseEnRelation MiseEnRelation_IDPartenairePayeur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MiseEnRelation"
    ADD CONSTRAINT "MiseEnRelation_IDPartenairePayeur_fkey" FOREIGN KEY ("IDPartenairePayeur") REFERENCES public."Partenaire"("IDPartenaire");


--
-- Name: MiseEnRelation MiseEnRelation_IDSeniors_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MiseEnRelation"
    ADD CONSTRAINT "MiseEnRelation_IDSeniors_fkey" FOREIGN KEY ("IDSeniors") REFERENCES public."Seniors"("IDSeniors");


--
-- Name: MiseEnRelation MiseEnRelation_IDUtilisateurPayeur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MiseEnRelation"
    ADD CONSTRAINT "MiseEnRelation_IDUtilisateurPayeur_fkey" FOREIGN KEY ("IDUtilisateurPayeur") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: MiseEnRelation_Prestation MiseEnRelation_Prestation_IDMiseEnRelation_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MiseEnRelation_Prestation"
    ADD CONSTRAINT "MiseEnRelation_Prestation_IDMiseEnRelation_fkey" FOREIGN KEY ("IDMiseEnRelation") REFERENCES public."MiseEnRelation"("IDMiseEnRelation");


--
-- Name: MiseEnRelation_Prestation MiseEnRelation_Prestation_IDPrestation_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MiseEnRelation_Prestation"
    ADD CONSTRAINT "MiseEnRelation_Prestation_IDPrestation_fkey" FOREIGN KEY ("IDPrestation") REFERENCES public."Prestation"("IDPrestation");


--
-- Name: Notifications Notifications_IDUtilisateurDestinataire_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notifications"
    ADD CONSTRAINT "Notifications_IDUtilisateurDestinataire_fkey" FOREIGN KEY ("IDUtilisateurDestinataire") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: Notifications Notifications_IDUtilisateurOrigine_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notifications"
    ADD CONSTRAINT "Notifications_IDUtilisateurOrigine_fkey" FOREIGN KEY ("IDUtilisateurOrigine") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: ObjetPrete ObjetPrete_IDEmprunteurUtilisateur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ObjetPrete"
    ADD CONSTRAINT "ObjetPrete_IDEmprunteurUtilisateur_fkey" FOREIGN KEY ("IDEmprunteurUtilisateur") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: ObjetPrete ObjetPrete_IDProprietaireUtilisateur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ObjetPrete"
    ADD CONSTRAINT "ObjetPrete_IDProprietaireUtilisateur_fkey" FOREIGN KEY ("IDProprietaireUtilisateur") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: OffreSenior OffreSenior_IDSeniors_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OffreSenior"
    ADD CONSTRAINT "OffreSenior_IDSeniors_fkey" FOREIGN KEY ("IDSeniors") REFERENCES public."Seniors"("IDSeniors");


--
-- Name: Organisme Organisme_IDCategorieOrganisme_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Organisme"
    ADD CONSTRAINT "Organisme_IDCategorieOrganisme_fkey" FOREIGN KEY ("IDCategorieOrganisme") REFERENCES public."CategorieOrganisme"("IDCategorieOrganisme");


--
-- Name: Parametres Parametres_IDUtilisateurs_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Parametres"
    ADD CONSTRAINT "Parametres_IDUtilisateurs_fkey" FOREIGN KEY ("IDUtilisateurs") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: Partenaire Partenaire_IDCatUtilisateurs_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Partenaire"
    ADD CONSTRAINT "Partenaire_IDCatUtilisateurs_fkey" FOREIGN KEY ("IDCatUtilisateurs") REFERENCES public."CatUtilisateurs"("IDCatUtilisateurs");


--
-- Name: Partenaire_Services Partenaire_Services_IDPartenaire_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Partenaire_Services"
    ADD CONSTRAINT "Partenaire_Services_IDPartenaire_fkey" FOREIGN KEY ("IDPartenaire") REFERENCES public."Partenaire"("IDPartenaire");


--
-- Name: Partenaire_Services Partenaire_Services_IDServicePartenaire_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Partenaire_Services"
    ADD CONSTRAINT "Partenaire_Services_IDServicePartenaire_fkey" FOREIGN KEY ("IDServicePartenaire") REFERENCES public."ServicePartenaire"("IDServicePartenaire");


--
-- Name: Pieces Pieces_IDUtilisateurs_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Pieces"
    ADD CONSTRAINT "Pieces_IDUtilisateurs_fkey" FOREIGN KEY ("IDUtilisateurs") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: Pieces Pieces_TypePiece_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Pieces"
    ADD CONSTRAINT "Pieces_TypePiece_fkey" FOREIGN KEY ("TypePiece") REFERENCES public."TypePieces"("Titre");


--
-- Name: PrestationAidant PrestationAidant_IDAidant_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PrestationAidant"
    ADD CONSTRAINT "PrestationAidant_IDAidant_fkey" FOREIGN KEY ("IDAidant") REFERENCES public."Aidant"("IDAidant");


--
-- Name: PrestationAidant PrestationAidant_IDBesoinSenior_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PrestationAidant"
    ADD CONSTRAINT "PrestationAidant_IDBesoinSenior_fkey" FOREIGN KEY ("IDBesoinSenior") REFERENCES public."BesoinSenior"("IDBesoinSenior");


--
-- Name: PrestationSupport PrestationSupport_IDIntervenant_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PrestationSupport"
    ADD CONSTRAINT "PrestationSupport_IDIntervenant_fkey" FOREIGN KEY ("IDIntervenant") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: PrestationSupport PrestationSupport_IDTicketClient_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PrestationSupport"
    ADD CONSTRAINT "PrestationSupport_IDTicketClient_fkey" FOREIGN KEY ("IDTicketClient") REFERENCES public."SupportClient"("IDTicketClient");


--
-- Name: Prestation Prestation_IDDomaine_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Prestation"
    ADD CONSTRAINT "Prestation_IDDomaine_fkey" FOREIGN KEY ("IDDomaine") REFERENCES public."Domaine"("IDDomaine");


--
-- Name: Prestation_Localisation Prestation_Localisation_IDLocalisation_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Prestation_Localisation"
    ADD CONSTRAINT "Prestation_Localisation_IDLocalisation_fkey" FOREIGN KEY ("IDLocalisation") REFERENCES public."Localisation"("IDLocalisation");


--
-- Name: Prestation_Localisation Prestation_Localisation_IDPrestation_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Prestation_Localisation"
    ADD CONSTRAINT "Prestation_Localisation_IDPrestation_fkey" FOREIGN KEY ("IDPrestation") REFERENCES public."Prestation"("IDPrestation");


--
-- Name: Produit_Commande Produit_Commande_IDCommande_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Produit_Commande"
    ADD CONSTRAINT "Produit_Commande_IDCommande_fkey" FOREIGN KEY ("IDCommande") REFERENCES public."Commande"("IDCommande");


--
-- Name: Produit_Commande Produit_Commande_IDProduit_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Produit_Commande"
    ADD CONSTRAINT "Produit_Commande_IDProduit_fkey" FOREIGN KEY ("IDProduit") REFERENCES public."Produit"("IDProduit");


--
-- Name: Produit Produit_IDSeniorsVendeur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Produit"
    ADD CONSTRAINT "Produit_IDSeniorsVendeur_fkey" FOREIGN KEY ("IDSeniorsVendeur") REFERENCES public."Seniors"("IDSeniors");


--
-- Name: RapportMensuel RapportMensuel_IDRedacteur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RapportMensuel"
    ADD CONSTRAINT "RapportMensuel_IDRedacteur_fkey" FOREIGN KEY ("IDRedacteur") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: RapportMensuel RapportMensuel_IDSeniors_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RapportMensuel"
    ADD CONSTRAINT "RapportMensuel_IDSeniors_fkey" FOREIGN KEY ("IDSeniors") REFERENCES public."Seniors"("IDSeniors");


--
-- Name: RendezVousMedical RendezVousMedical_IDSeniors_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RendezVousMedical"
    ADD CONSTRAINT "RendezVousMedical_IDSeniors_fkey" FOREIGN KEY ("IDSeniors") REFERENCES public."Seniors"("IDSeniors");


--
-- Name: ReponseForum ReponseForum_IDSujetForum_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ReponseForum"
    ADD CONSTRAINT "ReponseForum_IDSujetForum_fkey" FOREIGN KEY ("IDSujetForum") REFERENCES public."SujetForum"("IDSujetForum");


--
-- Name: ReponseForum ReponseForum_IDUtilisateurs_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ReponseForum"
    ADD CONSTRAINT "ReponseForum_IDUtilisateurs_fkey" FOREIGN KEY ("IDUtilisateurs") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: Ressource Ressource_IDCategorieRessource_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ressource"
    ADD CONSTRAINT "Ressource_IDCategorieRessource_fkey" FOREIGN KEY ("IDCategorieRessource") REFERENCES public."CategorieRessource"("IDCategorieRessource");


--
-- Name: Seniors Seniors_IDStructures_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Seniors"
    ADD CONSTRAINT "Seniors_IDStructures_fkey" FOREIGN KEY ("IDStructures") REFERENCES public."Structures"("IDStructures");


--
-- Name: Seniors Seniors_IDTuteur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Seniors"
    ADD CONSTRAINT "Seniors_IDTuteur_fkey" FOREIGN KEY ("IDTuteur") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: Seniors Seniors_IDUtilisateurSenior_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Seniors"
    ADD CONSTRAINT "Seniors_IDUtilisateurSenior_fkey" FOREIGN KEY ("IDUtilisateurSenior") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: Seniors_TypeMaladie Seniors_TypeMaladie_IDSeniors_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Seniors_TypeMaladie"
    ADD CONSTRAINT "Seniors_TypeMaladie_IDSeniors_fkey" FOREIGN KEY ("IDSeniors") REFERENCES public."Seniors"("IDSeniors");


--
-- Name: Seniors_TypeMaladie Seniors_TypeMaladie_IDTypeMaladie_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Seniors_TypeMaladie"
    ADD CONSTRAINT "Seniors_TypeMaladie_IDTypeMaladie_fkey" FOREIGN KEY ("IDTypeMaladie") REFERENCES public."TypeMaladie"("IDTypeMaladie");


--
-- Name: ServicePostMortem ServicePostMortem_IDCagnotteDeces_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ServicePostMortem"
    ADD CONSTRAINT "ServicePostMortem_IDCagnotteDeces_fkey" FOREIGN KEY ("IDCagnotteDeces") REFERENCES public."CagnotteDeces"("IDCagnotteDeces");


--
-- Name: SignalementContenu SignalementContenu_IDMessageGroupe_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SignalementContenu"
    ADD CONSTRAINT "SignalementContenu_IDMessageGroupe_fkey" FOREIGN KEY ("IDMessageGroupe") REFERENCES public."MessageGroupe"("IDMessageGroupe");


--
-- Name: SignalementContenu SignalementContenu_IDReponseForum_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SignalementContenu"
    ADD CONSTRAINT "SignalementContenu_IDReponseForum_fkey" FOREIGN KEY ("IDReponseForum") REFERENCES public."ReponseForum"("IDReponseForum");


--
-- Name: SignalementContenu SignalementContenu_IDUtilisateurSignaleur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SignalementContenu"
    ADD CONSTRAINT "SignalementContenu_IDUtilisateurSignaleur_fkey" FOREIGN KEY ("IDUtilisateurSignaleur") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: Souvenir Souvenir_IDSeniors_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Souvenir"
    ADD CONSTRAINT "Souvenir_IDSeniors_fkey" FOREIGN KEY ("IDSeniors") REFERENCES public."Seniors"("IDSeniors");


--
-- Name: SujetForum SujetForum_IDForum_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SujetForum"
    ADD CONSTRAINT "SujetForum_IDForum_fkey" FOREIGN KEY ("IDForum") REFERENCES public."Forum"("IDForum");


--
-- Name: SujetForum SujetForum_IDUtilisateurs_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SujetForum"
    ADD CONSTRAINT "SujetForum_IDUtilisateurs_fkey" FOREIGN KEY ("IDUtilisateurs") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: SupportClient SupportClient_IDUtilisateursClient_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SupportClient"
    ADD CONSTRAINT "SupportClient_IDUtilisateursClient_fkey" FOREIGN KEY ("IDUtilisateursClient") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: TMessage TMessage_IDUtilisateurDestinataire_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TMessage"
    ADD CONSTRAINT "TMessage_IDUtilisateurDestinataire_fkey" FOREIGN KEY ("IDUtilisateurDestinataire") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: TMessage TMessage_IDUtilisateurExpediteur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TMessage"
    ADD CONSTRAINT "TMessage_IDUtilisateurExpediteur_fkey" FOREIGN KEY ("IDUtilisateurExpediteur") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: Utilisateurs_Groupe Utilisateurs_Groupe_IDGroupe_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Utilisateurs_Groupe"
    ADD CONSTRAINT "Utilisateurs_Groupe_IDGroupe_fkey" FOREIGN KEY ("IDGroupe") REFERENCES public."Groupe"("IDGroupe");


--
-- Name: Utilisateurs_Groupe Utilisateurs_Groupe_IDUtilisateurs_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Utilisateurs_Groupe"
    ADD CONSTRAINT "Utilisateurs_Groupe_IDUtilisateurs_fkey" FOREIGN KEY ("IDUtilisateurs") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: Utilisateurs Utilisateurs_IDCatUtilisateurs_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Utilisateurs"
    ADD CONSTRAINT "Utilisateurs_IDCatUtilisateurs_fkey" FOREIGN KEY ("IDCatUtilisateurs") REFERENCES public."CatUtilisateurs"("IDCatUtilisateurs");


--
-- Name: Utilisateurs_Localisation Utilisateurs_Localisation_IDLocalisation_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Utilisateurs_Localisation"
    ADD CONSTRAINT "Utilisateurs_Localisation_IDLocalisation_fkey" FOREIGN KEY ("IDLocalisation") REFERENCES public."Localisation"("IDLocalisation");


--
-- Name: Utilisateurs_Localisation Utilisateurs_Localisation_IDUtilisateurs_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Utilisateurs_Localisation"
    ADD CONSTRAINT "Utilisateurs_Localisation_IDUtilisateurs_fkey" FOREIGN KEY ("IDUtilisateurs") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: VersementCommissions VersementCommissions_IDPrestation_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VersementCommissions"
    ADD CONSTRAINT "VersementCommissions_IDPrestation_fkey" FOREIGN KEY ("IDPrestation") REFERENCES public."Prestation"("IDPrestation");


--
-- Name: VersementCommissions VersementCommissions_IDServicePostMortem_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VersementCommissions"
    ADD CONSTRAINT "VersementCommissions_IDServicePostMortem_fkey" FOREIGN KEY ("IDServicePostMortem") REFERENCES public."ServicePostMortem"("IDServicePostMortem");


--
-- Name: BonPlan_Utilisateurs bonplan_utilisateurs_idcommande_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BonPlan_Utilisateurs"
    ADD CONSTRAINT bonplan_utilisateurs_idcommande_fkey FOREIGN KEY ("IDCommande") REFERENCES public."Commande"("IDCommande");


--
-- Name: Commande commande_idutilisateurpayeur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Commande"
    ADD CONSTRAINT commande_idutilisateurpayeur_fkey FOREIGN KEY ("IDUtilisateurPayeur") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: ReponsesSupport fk_auteur; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ReponsesSupport"
    ADD CONSTRAINT fk_auteur FOREIGN KEY ("IDAuteur") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: ReponsesSupport fk_ticket; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ReponsesSupport"
    ADD CONSTRAINT fk_ticket FOREIGN KEY ("IDTicketClient") REFERENCES public."SupportClient"("IDTicketClient");


--
-- Name: MiseEnRelation miseenrelation_idcommande_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MiseEnRelation"
    ADD CONSTRAINT miseenrelation_idcommande_fkey FOREIGN KEY ("IDCommande") REFERENCES public."Commande"("IDCommande");


--
-- Name: ServicePostMortem servicepostmortem_idcreateur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ServicePostMortem"
    ADD CONSTRAINT servicepostmortem_idcreateur_fkey FOREIGN KEY ("IDCreateur") REFERENCES public."Utilisateurs"("IDUtilisateurs");


--
-- Name: VersementCommissions versementcommissions_idcommande_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VersementCommissions"
    ADD CONSTRAINT versementcommissions_idcommande_fkey FOREIGN KEY ("IDCommande") REFERENCES public."Commande"("IDCommande");


--
-- Name: iceberg_namespaces iceberg_namespaces_catalog_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.iceberg_namespaces
    ADD CONSTRAINT iceberg_namespaces_catalog_id_fkey FOREIGN KEY (catalog_id) REFERENCES storage.buckets_analytics(id) ON DELETE CASCADE;


--
-- Name: iceberg_tables iceberg_tables_catalog_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.iceberg_tables
    ADD CONSTRAINT iceberg_tables_catalog_id_fkey FOREIGN KEY (catalog_id) REFERENCES storage.buckets_analytics(id) ON DELETE CASCADE;


--
-- Name: iceberg_tables iceberg_tables_namespace_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.iceberg_tables
    ADD CONSTRAINT iceberg_tables_namespace_id_fkey FOREIGN KEY (namespace_id) REFERENCES storage.iceberg_namespaces(id) ON DELETE CASCADE;


--
-- Name: objects objects_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT "objects_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_upload_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_upload_id_fkey FOREIGN KEY (upload_id) REFERENCES storage.s3_multipart_uploads(id) ON DELETE CASCADE;


--
-- Name: vector_indexes vector_indexes_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.vector_indexes
    ADD CONSTRAINT vector_indexes_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets_vectors(id);


--
-- Name: audit_log_entries; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.audit_log_entries ENABLE ROW LEVEL SECURITY;

--
-- Name: flow_state; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.flow_state ENABLE ROW LEVEL SECURITY;

--
-- Name: identities; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.identities ENABLE ROW LEVEL SECURITY;

--
-- Name: instances; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.instances ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_amr_claims; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_amr_claims ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_challenges; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_challenges ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_factors; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_factors ENABLE ROW LEVEL SECURITY;

--
-- Name: one_time_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.one_time_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: refresh_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.refresh_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_relay_states; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_relay_states ENABLE ROW LEVEL SECURITY;

--
-- Name: schema_migrations; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.schema_migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: sessions; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sessions ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_domains; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_domains ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

--
-- Name: CagnotteDeces; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public."CagnotteDeces" ENABLE ROW LEVEL SECURITY;

--
-- Name: DocumentRGPD; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public."DocumentRGPD" ENABLE ROW LEVEL SECURITY;

--
-- Name: DonCagnotte; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public."DonCagnotte" ENABLE ROW LEVEL SECURITY;

--
-- Name: CagnotteDeces Public can delete CagnotteDeces; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public can delete CagnotteDeces" ON public."CagnotteDeces" FOR DELETE USING (true);


--
-- Name: DocumentRGPD Public can delete DocumentRGPD; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public can delete DocumentRGPD" ON public."DocumentRGPD" FOR DELETE USING (true);


--
-- Name: DonCagnotte Public can delete DonCagnotte; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public can delete DonCagnotte" ON public."DonCagnotte" FOR DELETE USING (true);


--
-- Name: Document Public can delete documents; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public can delete documents" ON public."Document" FOR DELETE USING (true);


--
-- Name: CagnotteDeces Public can insert CagnotteDeces; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public can insert CagnotteDeces" ON public."CagnotteDeces" FOR INSERT WITH CHECK (true);


--
-- Name: DocumentRGPD Public can insert DocumentRGPD; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public can insert DocumentRGPD" ON public."DocumentRGPD" FOR INSERT WITH CHECK (true);


--
-- Name: DonCagnotte Public can insert DonCagnotte; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public can insert DonCagnotte" ON public."DonCagnotte" FOR INSERT WITH CHECK (true);


--
-- Name: Document Public can insert documents; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public can insert documents" ON public."Document" FOR INSERT WITH CHECK (true);


--
-- Name: CagnotteDeces Public can update CagnotteDeces; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public can update CagnotteDeces" ON public."CagnotteDeces" FOR UPDATE USING (true);


--
-- Name: DocumentRGPD Public can update DocumentRGPD; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public can update DocumentRGPD" ON public."DocumentRGPD" FOR UPDATE USING (true);


--
-- Name: DonCagnotte Public can update DonCagnotte; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public can update DonCagnotte" ON public."DonCagnotte" FOR UPDATE USING (true);


--
-- Name: Document Public can update documents; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public can update documents" ON public."Document" FOR UPDATE USING (true);


--
-- Name: CagnotteDeces Public can view CagnotteDeces; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public can view CagnotteDeces" ON public."CagnotteDeces" FOR SELECT USING (true);


--
-- Name: DocumentRGPD Public can view DocumentRGPD; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public can view DocumentRGPD" ON public."DocumentRGPD" FOR SELECT USING (true);


--
-- Name: DonCagnotte Public can view DonCagnotte; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public can view DonCagnotte" ON public."DonCagnotte" FOR SELECT USING (true);


--
-- Name: Document Public can view documents; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public can view documents" ON public."Document" FOR SELECT USING (true);


--
-- Name: messages; Type: ROW SECURITY; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

--
-- Name: objects Accès public en lecture; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Accès public en lecture" ON storage.objects FOR SELECT USING (((bucket_id = 'documents'::text) OR (bucket_id = 'documents-rgpd'::text)));


--
-- Name: objects Allow public access for support files; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Allow public access for support files" ON storage.objects FOR SELECT USING ((bucket_id = 'support-files'::text));


--
-- Name: objects Allow upload for support files; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Allow upload for support files" ON storage.objects FOR INSERT WITH CHECK ((bucket_id = 'support-files'::text));


--
-- Name: objects Public avatars access; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Public avatars access" ON storage.objects USING ((bucket_id = 'avatars'::text)) WITH CHECK ((bucket_id = 'avatars'::text));


--
-- Name: objects Public storage access for documents-rgpd; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Public storage access for documents-rgpd" ON storage.objects USING ((bucket_id = 'documents-rgpd'::text)) WITH CHECK ((bucket_id = 'documents-rgpd'::text));


--
-- Name: objects Suppression autorisée pour les connectés; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Suppression autorisée pour les connectés" ON storage.objects FOR DELETE TO authenticated USING (((bucket_id = 'documents'::text) OR (bucket_id = 'documents-rgpd'::text)));


--
-- Name: objects Upload autorisé pour les connectés; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Upload autorisé pour les connectés" ON storage.objects FOR INSERT TO authenticated WITH CHECK (((bucket_id = 'documents'::text) OR (bucket_id = 'documents-rgpd'::text)));


--
-- Name: buckets; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets_analytics; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets_analytics ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets_vectors; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets_vectors ENABLE ROW LEVEL SECURITY;

--
-- Name: iceberg_namespaces; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.iceberg_namespaces ENABLE ROW LEVEL SECURITY;

--
-- Name: iceberg_tables; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.iceberg_tables ENABLE ROW LEVEL SECURITY;

--
-- Name: migrations; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: objects; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads_parts; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads_parts ENABLE ROW LEVEL SECURITY;

--
-- Name: vector_indexes; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.vector_indexes ENABLE ROW LEVEL SECURITY;

--
-- Name: supabase_realtime; Type: PUBLICATION; Schema: -; Owner: postgres
--

CREATE PUBLICATION supabase_realtime WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION supabase_realtime OWNER TO postgres;

--
-- Name: supabase_realtime_messages_publication; Type: PUBLICATION; Schema: -; Owner: postgres
--

CREATE PUBLICATION supabase_realtime_messages_publication WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION supabase_realtime_messages_publication OWNER TO postgres;

--
-- Name: supabase_realtime_messages_publication messages; Type: PUBLICATION TABLE; Schema: realtime; Owner: postgres
--

ALTER PUBLICATION supabase_realtime_messages_publication ADD TABLE ONLY realtime.messages;


--
-- Name: SCHEMA auth; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA auth TO anon;
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT USAGE ON SCHEMA auth TO service_role;
GRANT ALL ON SCHEMA auth TO supabase_auth_admin;
GRANT ALL ON SCHEMA auth TO dashboard_user;
GRANT USAGE ON SCHEMA auth TO postgres;


--
-- Name: SCHEMA extensions; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA extensions TO anon;
GRANT USAGE ON SCHEMA extensions TO authenticated;
GRANT USAGE ON SCHEMA extensions TO service_role;
GRANT ALL ON SCHEMA extensions TO dashboard_user;


--
-- Name: SCHEMA net; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA net TO supabase_functions_admin;
GRANT USAGE ON SCHEMA net TO postgres;
GRANT USAGE ON SCHEMA net TO anon;
GRANT USAGE ON SCHEMA net TO authenticated;
GRANT USAGE ON SCHEMA net TO service_role;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


--
-- Name: SCHEMA realtime; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA realtime TO postgres;
GRANT USAGE ON SCHEMA realtime TO anon;
GRANT USAGE ON SCHEMA realtime TO authenticated;
GRANT USAGE ON SCHEMA realtime TO service_role;
GRANT ALL ON SCHEMA realtime TO supabase_realtime_admin;


--
-- Name: SCHEMA storage; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA storage TO postgres;
GRANT USAGE ON SCHEMA storage TO anon;
GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT USAGE ON SCHEMA storage TO service_role;
GRANT ALL ON SCHEMA storage TO supabase_storage_admin;
GRANT ALL ON SCHEMA storage TO dashboard_user;


--
-- Name: SCHEMA supabase_functions; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA supabase_functions TO postgres;
GRANT USAGE ON SCHEMA supabase_functions TO anon;
GRANT USAGE ON SCHEMA supabase_functions TO authenticated;
GRANT USAGE ON SCHEMA supabase_functions TO service_role;
GRANT ALL ON SCHEMA supabase_functions TO supabase_functions_admin;


--
-- Name: SCHEMA vault; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA vault TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA vault TO service_role;
SET SESSION AUTHORIZATION postgres;
GRANT USAGE ON SCHEMA vault TO service_role;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION email(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.email() TO dashboard_user;


--
-- Name: FUNCTION jwt(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.jwt() TO postgres;
GRANT ALL ON FUNCTION auth.jwt() TO dashboard_user;


--
-- Name: FUNCTION role(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.role() TO dashboard_user;


--
-- Name: FUNCTION uid(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.uid() TO dashboard_user;


--
-- Name: FUNCTION armor(bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.armor(bytea) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION armor(bytea, text[], text[]); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION crypt(text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.crypt(text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION dearmor(text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.dearmor(text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION decrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION digest(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION digest(text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.digest(text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION encrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION encrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION gen_random_bytes(integer); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION gen_random_uuid(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION gen_salt(text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_salt(text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION gen_salt(text, integer); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION grant_pg_cron_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_cron_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO dashboard_user;


--
-- Name: FUNCTION grant_pg_graphql_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.grant_pg_graphql_access() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION grant_pg_net_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_net_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO dashboard_user;


--
-- Name: FUNCTION hmac(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION hmac(text, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION pgp_armor_headers(text, OUT key text, OUT value text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION pgp_key_id(bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION pgrst_ddl_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_ddl_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgrst_drop_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_drop_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION set_graphql_placeholder(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.set_graphql_placeholder() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_generate_v1(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION uuid_generate_v1mc(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION uuid_generate_v3(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION uuid_generate_v4(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION uuid_generate_v5(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION uuid_nil(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_nil() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION uuid_ns_dns(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION uuid_ns_oid(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION uuid_ns_url(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION uuid_ns_x500(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION graphql("operationName" text, query text, variables jsonb, extensions jsonb); Type: ACL; Schema: graphql_public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO postgres;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO anon;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO authenticated;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO service_role;


--
-- Name: FUNCTION http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer); Type: ACL; Schema: net; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
GRANT ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin;
GRANT ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO postgres;
GRANT ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO anon;
GRANT ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO authenticated;
GRANT ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO service_role;


--
-- Name: FUNCTION http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer); Type: ACL; Schema: net; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
GRANT ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin;
GRANT ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO postgres;
GRANT ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO anon;
GRANT ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO authenticated;
GRANT ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO service_role;


--
-- Name: FUNCTION get_auth(p_usename text); Type: ACL; Schema: pgbouncer; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION pgbouncer.get_auth(p_usename text) FROM PUBLIC;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO pgbouncer;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO postgres;


--
-- Name: FUNCTION create_commission_from_activite(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.create_commission_from_activite() TO anon;
GRANT ALL ON FUNCTION public.create_commission_from_activite() TO authenticated;
GRANT ALL ON FUNCTION public.create_commission_from_activite() TO service_role;


--
-- Name: FUNCTION create_commission_from_commande(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.create_commission_from_commande() TO anon;
GRANT ALL ON FUNCTION public.create_commission_from_commande() TO authenticated;
GRANT ALL ON FUNCTION public.create_commission_from_commande() TO service_role;


--
-- Name: FUNCTION create_commission_from_postmortem(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.create_commission_from_postmortem() TO anon;
GRANT ALL ON FUNCTION public.create_commission_from_postmortem() TO authenticated;
GRANT ALL ON FUNCTION public.create_commission_from_postmortem() TO service_role;


--
-- Name: FUNCTION get_admin_dashboard_stats(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.get_admin_dashboard_stats() TO anon;
GRANT ALL ON FUNCTION public.get_admin_dashboard_stats() TO authenticated;
GRANT ALL ON FUNCTION public.get_admin_dashboard_stats() TO service_role;


--
-- Name: FUNCTION insert_into_seniors_or_aidant(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.insert_into_seniors_or_aidant() TO anon;
GRANT ALL ON FUNCTION public.insert_into_seniors_or_aidant() TO authenticated;
GRANT ALL ON FUNCTION public.insert_into_seniors_or_aidant() TO service_role;


--
-- Name: FUNCTION set_initial_cagnotte_status(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.set_initial_cagnotte_status() TO anon;
GRANT ALL ON FUNCTION public.set_initial_cagnotte_status() TO authenticated;
GRANT ALL ON FUNCTION public.set_initial_cagnotte_status() TO service_role;


--
-- Name: FUNCTION update_cagnotte_montant_total(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.update_cagnotte_montant_total() TO anon;
GRANT ALL ON FUNCTION public.update_cagnotte_montant_total() TO authenticated;
GRANT ALL ON FUNCTION public.update_cagnotte_montant_total() TO service_role;


--
-- Name: FUNCTION update_cagnotte_status(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.update_cagnotte_status() TO anon;
GRANT ALL ON FUNCTION public.update_cagnotte_status() TO authenticated;
GRANT ALL ON FUNCTION public.update_cagnotte_status() TO service_role;


--
-- Name: FUNCTION update_expired_cagnottes(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.update_expired_cagnottes() TO anon;
GRANT ALL ON FUNCTION public.update_expired_cagnottes() TO authenticated;
GRANT ALL ON FUNCTION public.update_expired_cagnottes() TO service_role;


--
-- Name: FUNCTION apply_rls(wal jsonb, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO postgres;
GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO dashboard_user;


--
-- Name: FUNCTION build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO postgres;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO anon;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO service_role;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION "cast"(val text, type_ regtype); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO postgres;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO dashboard_user;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO anon;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO authenticated;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO service_role;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO supabase_realtime_admin;


--
-- Name: FUNCTION check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO postgres;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO anon;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO authenticated;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO service_role;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO supabase_realtime_admin;


--
-- Name: FUNCTION is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO postgres;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO anon;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO service_role;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION quote_wal2json(entity regclass); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO postgres;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO anon;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO authenticated;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO service_role;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO supabase_realtime_admin;


--
-- Name: FUNCTION send(payload jsonb, event text, topic text, private boolean); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO postgres;
GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO dashboard_user;


--
-- Name: FUNCTION subscription_check_filters(); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO postgres;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO dashboard_user;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO anon;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO authenticated;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO service_role;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO supabase_realtime_admin;


--
-- Name: FUNCTION to_regrole(role_name text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO postgres;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO anon;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO authenticated;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO service_role;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO supabase_realtime_admin;


--
-- Name: FUNCTION topic(); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.topic() TO postgres;
GRANT ALL ON FUNCTION realtime.topic() TO dashboard_user;


--
-- Name: FUNCTION extension(name text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.extension(name text) TO anon;
GRANT ALL ON FUNCTION storage.extension(name text) TO authenticated;
GRANT ALL ON FUNCTION storage.extension(name text) TO service_role;
GRANT ALL ON FUNCTION storage.extension(name text) TO dashboard_user;
GRANT ALL ON FUNCTION storage.extension(name text) TO postgres;


--
-- Name: FUNCTION filename(name text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.filename(name text) TO anon;
GRANT ALL ON FUNCTION storage.filename(name text) TO authenticated;
GRANT ALL ON FUNCTION storage.filename(name text) TO service_role;
GRANT ALL ON FUNCTION storage.filename(name text) TO dashboard_user;
GRANT ALL ON FUNCTION storage.filename(name text) TO postgres;


--
-- Name: FUNCTION foldername(name text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.foldername(name text) TO anon;
GRANT ALL ON FUNCTION storage.foldername(name text) TO authenticated;
GRANT ALL ON FUNCTION storage.foldername(name text) TO service_role;
GRANT ALL ON FUNCTION storage.foldername(name text) TO dashboard_user;
GRANT ALL ON FUNCTION storage.foldername(name text) TO postgres;


--
-- Name: FUNCTION http_request(); Type: ACL; Schema: supabase_functions; Owner: supabase_functions_admin
--

REVOKE ALL ON FUNCTION supabase_functions.http_request() FROM PUBLIC;
GRANT ALL ON FUNCTION supabase_functions.http_request() TO postgres;
GRANT ALL ON FUNCTION supabase_functions.http_request() TO anon;
GRANT ALL ON FUNCTION supabase_functions.http_request() TO authenticated;
GRANT ALL ON FUNCTION supabase_functions.http_request() TO service_role;


--
-- Name: FUNCTION _crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO service_role;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO service_role;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION create_secret(new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;
RESET SESSION AUTHORIZATION;


--
-- Name: FUNCTION update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;
RESET SESSION AUTHORIZATION;


--
-- Name: TABLE audit_log_entries; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.audit_log_entries TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.audit_log_entries TO postgres;
GRANT SELECT ON TABLE auth.audit_log_entries TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT SELECT ON TABLE auth.audit_log_entries TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: TABLE flow_state; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.flow_state TO postgres;
GRANT SELECT ON TABLE auth.flow_state TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.flow_state TO dashboard_user;
SET SESSION AUTHORIZATION postgres;
GRANT SELECT ON TABLE auth.flow_state TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: TABLE identities; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.identities TO postgres;
GRANT SELECT ON TABLE auth.identities TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.identities TO dashboard_user;
SET SESSION AUTHORIZATION postgres;
GRANT SELECT ON TABLE auth.identities TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: TABLE instances; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.instances TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.instances TO postgres;
GRANT SELECT ON TABLE auth.instances TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT SELECT ON TABLE auth.instances TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: TABLE mfa_amr_claims; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_amr_claims TO postgres;
GRANT SELECT ON TABLE auth.mfa_amr_claims TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_amr_claims TO dashboard_user;
SET SESSION AUTHORIZATION postgres;
GRANT SELECT ON TABLE auth.mfa_amr_claims TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: TABLE mfa_challenges; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_challenges TO postgres;
GRANT SELECT ON TABLE auth.mfa_challenges TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_challenges TO dashboard_user;
SET SESSION AUTHORIZATION postgres;
GRANT SELECT ON TABLE auth.mfa_challenges TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: TABLE mfa_factors; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_factors TO postgres;
GRANT SELECT ON TABLE auth.mfa_factors TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_factors TO dashboard_user;
SET SESSION AUTHORIZATION postgres;
GRANT SELECT ON TABLE auth.mfa_factors TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: TABLE one_time_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.one_time_tokens TO postgres;
GRANT SELECT ON TABLE auth.one_time_tokens TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.one_time_tokens TO dashboard_user;
SET SESSION AUTHORIZATION postgres;
GRANT SELECT ON TABLE auth.one_time_tokens TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: TABLE refresh_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.refresh_tokens TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.refresh_tokens TO postgres;
GRANT SELECT ON TABLE auth.refresh_tokens TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT SELECT ON TABLE auth.refresh_tokens TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: SEQUENCE refresh_tokens_id_seq; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO dashboard_user;
GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO postgres;


--
-- Name: TABLE saml_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.saml_providers TO postgres;
GRANT SELECT ON TABLE auth.saml_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_providers TO dashboard_user;
SET SESSION AUTHORIZATION postgres;
GRANT SELECT ON TABLE auth.saml_providers TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: TABLE saml_relay_states; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.saml_relay_states TO postgres;
GRANT SELECT ON TABLE auth.saml_relay_states TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_relay_states TO dashboard_user;
SET SESSION AUTHORIZATION postgres;
GRANT SELECT ON TABLE auth.saml_relay_states TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT SELECT ON TABLE auth.schema_migrations TO postgres WITH GRANT OPTION;


--
-- Name: TABLE sessions; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sessions TO postgres;
GRANT SELECT ON TABLE auth.sessions TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sessions TO dashboard_user;
SET SESSION AUTHORIZATION postgres;
GRANT SELECT ON TABLE auth.sessions TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: TABLE sso_domains; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sso_domains TO postgres;
GRANT SELECT ON TABLE auth.sso_domains TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_domains TO dashboard_user;
SET SESSION AUTHORIZATION postgres;
GRANT SELECT ON TABLE auth.sso_domains TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: TABLE sso_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sso_providers TO postgres;
GRANT SELECT ON TABLE auth.sso_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_providers TO dashboard_user;
SET SESSION AUTHORIZATION postgres;
GRANT SELECT ON TABLE auth.sso_providers TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: TABLE users; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.users TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.users TO postgres;
GRANT SELECT ON TABLE auth.users TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT SELECT ON TABLE auth.users TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: TABLE pg_stat_statements; Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON TABLE extensions.pg_stat_statements TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON TABLE extensions.pg_stat_statements TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: TABLE pg_stat_statements_info; Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON TABLE extensions.pg_stat_statements_info TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON TABLE extensions.pg_stat_statements_info TO dashboard_user;
RESET SESSION AUTHORIZATION;


--
-- Name: TABLE "ActiviteRemuneree"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."ActiviteRemuneree" TO anon;
GRANT ALL ON TABLE public."ActiviteRemuneree" TO authenticated;
GRANT ALL ON TABLE public."ActiviteRemuneree" TO service_role;


--
-- Name: SEQUENCE "ActiviteRemuneree_IDActiviteRemuneree_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."ActiviteRemuneree_IDActiviteRemuneree_seq" TO anon;
GRANT ALL ON SEQUENCE public."ActiviteRemuneree_IDActiviteRemuneree_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."ActiviteRemuneree_IDActiviteRemuneree_seq" TO service_role;


--
-- Name: TABLE "ActiviteRemuneree_Utilisateurs"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."ActiviteRemuneree_Utilisateurs" TO anon;
GRANT ALL ON TABLE public."ActiviteRemuneree_Utilisateurs" TO authenticated;
GRANT ALL ON TABLE public."ActiviteRemuneree_Utilisateurs" TO service_role;


--
-- Name: TABLE "Agenda"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Agenda" TO anon;
GRANT ALL ON TABLE public."Agenda" TO authenticated;
GRANT ALL ON TABLE public."Agenda" TO service_role;


--
-- Name: SEQUENCE "Agenda_IDAgenda_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."Agenda_IDAgenda_seq" TO anon;
GRANT ALL ON SEQUENCE public."Agenda_IDAgenda_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."Agenda_IDAgenda_seq" TO service_role;


--
-- Name: TABLE "Aidant"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Aidant" TO anon;
GRANT ALL ON TABLE public."Aidant" TO authenticated;
GRANT ALL ON TABLE public."Aidant" TO service_role;


--
-- Name: TABLE "Aidant_Competences"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Aidant_Competences" TO anon;
GRANT ALL ON TABLE public."Aidant_Competences" TO authenticated;
GRANT ALL ON TABLE public."Aidant_Competences" TO service_role;


--
-- Name: SEQUENCE "Aidant_IDAidant_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."Aidant_IDAidant_seq" TO anon;
GRANT ALL ON SEQUENCE public."Aidant_IDAidant_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."Aidant_IDAidant_seq" TO service_role;


--
-- Name: TABLE "AssuranceDeces"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."AssuranceDeces" TO anon;
GRANT ALL ON TABLE public."AssuranceDeces" TO authenticated;
GRANT ALL ON TABLE public."AssuranceDeces" TO service_role;


--
-- Name: SEQUENCE "AssuranceDeces_IDAssuranceDeces_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."AssuranceDeces_IDAssuranceDeces_seq" TO anon;
GRANT ALL ON SEQUENCE public."AssuranceDeces_IDAssuranceDeces_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."AssuranceDeces_IDAssuranceDeces_seq" TO service_role;


--
-- Name: TABLE "BesoinSenior"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."BesoinSenior" TO anon;
GRANT ALL ON TABLE public."BesoinSenior" TO authenticated;
GRANT ALL ON TABLE public."BesoinSenior" TO service_role;


--
-- Name: SEQUENCE "BesoinSenior_IDBesoinSenior_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."BesoinSenior_IDBesoinSenior_seq" TO anon;
GRANT ALL ON SEQUENCE public."BesoinSenior_IDBesoinSenior_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."BesoinSenior_IDBesoinSenior_seq" TO service_role;


--
-- Name: TABLE "BonPlan"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."BonPlan" TO anon;
GRANT ALL ON TABLE public."BonPlan" TO authenticated;
GRANT ALL ON TABLE public."BonPlan" TO service_role;


--
-- Name: SEQUENCE "BonPlan_IDBonPlan_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."BonPlan_IDBonPlan_seq" TO anon;
GRANT ALL ON SEQUENCE public."BonPlan_IDBonPlan_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."BonPlan_IDBonPlan_seq" TO service_role;


--
-- Name: TABLE "BonPlan_Utilisateurs"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."BonPlan_Utilisateurs" TO anon;
GRANT ALL ON TABLE public."BonPlan_Utilisateurs" TO authenticated;
GRANT ALL ON TABLE public."BonPlan_Utilisateurs" TO service_role;


--
-- Name: TABLE "CagnotteDeces"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."CagnotteDeces" TO anon;
GRANT ALL ON TABLE public."CagnotteDeces" TO authenticated;
GRANT ALL ON TABLE public."CagnotteDeces" TO service_role;


--
-- Name: SEQUENCE "CagnotteDeces_IDCagnotteDeces_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."CagnotteDeces_IDCagnotteDeces_seq" TO anon;
GRANT ALL ON SEQUENCE public."CagnotteDeces_IDCagnotteDeces_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."CagnotteDeces_IDCagnotteDeces_seq" TO service_role;


--
-- Name: TABLE "CandidatureAidant"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."CandidatureAidant" TO anon;
GRANT ALL ON TABLE public."CandidatureAidant" TO authenticated;
GRANT ALL ON TABLE public."CandidatureAidant" TO service_role;


--
-- Name: SEQUENCE "CandidatureAidant_IDCandidatureAidant_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."CandidatureAidant_IDCandidatureAidant_seq" TO anon;
GRANT ALL ON SEQUENCE public."CandidatureAidant_IDCandidatureAidant_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."CandidatureAidant_IDCandidatureAidant_seq" TO service_role;


--
-- Name: TABLE "CatUtilisateurs"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."CatUtilisateurs" TO anon;
GRANT ALL ON TABLE public."CatUtilisateurs" TO authenticated;
GRANT ALL ON TABLE public."CatUtilisateurs" TO service_role;


--
-- Name: SEQUENCE "CatUtilisateurs_IDCatUtilisateurs_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."CatUtilisateurs_IDCatUtilisateurs_seq" TO anon;
GRANT ALL ON SEQUENCE public."CatUtilisateurs_IDCatUtilisateurs_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."CatUtilisateurs_IDCatUtilisateurs_seq" TO service_role;


--
-- Name: TABLE "CategorieDocument"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."CategorieDocument" TO anon;
GRANT ALL ON TABLE public."CategorieDocument" TO authenticated;
GRANT ALL ON TABLE public."CategorieDocument" TO service_role;


--
-- Name: SEQUENCE "CategorieDocument_IDCategorieDocument_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."CategorieDocument_IDCategorieDocument_seq" TO anon;
GRANT ALL ON SEQUENCE public."CategorieDocument_IDCategorieDocument_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."CategorieDocument_IDCategorieDocument_seq" TO service_role;


--
-- Name: TABLE "CategorieOrganisme"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."CategorieOrganisme" TO anon;
GRANT ALL ON TABLE public."CategorieOrganisme" TO authenticated;
GRANT ALL ON TABLE public."CategorieOrganisme" TO service_role;


--
-- Name: SEQUENCE "CategorieOrganisme_IDCategorieOrganisme_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."CategorieOrganisme_IDCategorieOrganisme_seq" TO anon;
GRANT ALL ON SEQUENCE public."CategorieOrganisme_IDCategorieOrganisme_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."CategorieOrganisme_IDCategorieOrganisme_seq" TO service_role;


--
-- Name: TABLE "CategorieRessource"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."CategorieRessource" TO anon;
GRANT ALL ON TABLE public."CategorieRessource" TO authenticated;
GRANT ALL ON TABLE public."CategorieRessource" TO service_role;


--
-- Name: SEQUENCE "CategorieRessource_IDCategorieRessource_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."CategorieRessource_IDCategorieRessource_seq" TO anon;
GRANT ALL ON SEQUENCE public."CategorieRessource_IDCategorieRessource_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."CategorieRessource_IDCategorieRessource_seq" TO service_role;


--
-- Name: TABLE "Commande"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Commande" TO anon;
GRANT ALL ON TABLE public."Commande" TO authenticated;
GRANT ALL ON TABLE public."Commande" TO service_role;


--
-- Name: SEQUENCE "Commande_IDCommande_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."Commande_IDCommande_seq" TO anon;
GRANT ALL ON SEQUENCE public."Commande_IDCommande_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."Commande_IDCommande_seq" TO service_role;


--
-- Name: TABLE "Competences"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Competences" TO anon;
GRANT ALL ON TABLE public."Competences" TO authenticated;
GRANT ALL ON TABLE public."Competences" TO service_role;


--
-- Name: SEQUENCE "Competences_IDCompetences_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."Competences_IDCompetences_seq" TO anon;
GRANT ALL ON SEQUENCE public."Competences_IDCompetences_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."Competences_IDCompetences_seq" TO service_role;


--
-- Name: TABLE "ConsentementCookies"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."ConsentementCookies" TO anon;
GRANT ALL ON TABLE public."ConsentementCookies" TO authenticated;
GRANT ALL ON TABLE public."ConsentementCookies" TO service_role;


--
-- Name: SEQUENCE "ConsentementCookies_IDConsentement_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."ConsentementCookies_IDConsentement_seq" TO anon;
GRANT ALL ON SEQUENCE public."ConsentementCookies_IDConsentement_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."ConsentementCookies_IDConsentement_seq" TO service_role;


--
-- Name: TABLE "ContactUrgence"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."ContactUrgence" TO anon;
GRANT ALL ON TABLE public."ContactUrgence" TO authenticated;
GRANT ALL ON TABLE public."ContactUrgence" TO service_role;


--
-- Name: SEQUENCE "ContactUrgence_IDContactUrgence_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."ContactUrgence_IDContactUrgence_seq" TO anon;
GRANT ALL ON SEQUENCE public."ContactUrgence_IDContactUrgence_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."ContactUrgence_IDContactUrgence_seq" TO service_role;


--
-- Name: TABLE "ContratCohabitation"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."ContratCohabitation" TO anon;
GRANT ALL ON TABLE public."ContratCohabitation" TO authenticated;
GRANT ALL ON TABLE public."ContratCohabitation" TO service_role;


--
-- Name: SEQUENCE "ContratCohabitation_IDContratCohabitation_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."ContratCohabitation_IDContratCohabitation_seq" TO anon;
GRANT ALL ON SEQUENCE public."ContratCohabitation_IDContratCohabitation_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."ContratCohabitation_IDContratCohabitation_seq" TO service_role;


--
-- Name: TABLE "DemandeRGPD"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."DemandeRGPD" TO anon;
GRANT ALL ON TABLE public."DemandeRGPD" TO authenticated;
GRANT ALL ON TABLE public."DemandeRGPD" TO service_role;


--
-- Name: SEQUENCE "DemandeRGPD_IDDemandeRGPD_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."DemandeRGPD_IDDemandeRGPD_seq" TO anon;
GRANT ALL ON SEQUENCE public."DemandeRGPD_IDDemandeRGPD_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."DemandeRGPD_IDDemandeRGPD_seq" TO service_role;


--
-- Name: TABLE "Devise"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Devise" TO anon;
GRANT ALL ON TABLE public."Devise" TO authenticated;
GRANT ALL ON TABLE public."Devise" TO service_role;


--
-- Name: SEQUENCE "Devise_IDDevise_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."Devise_IDDevise_seq" TO anon;
GRANT ALL ON SEQUENCE public."Devise_IDDevise_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."Devise_IDDevise_seq" TO service_role;


--
-- Name: TABLE "Devise_Utilisateurs"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Devise_Utilisateurs" TO anon;
GRANT ALL ON TABLE public."Devise_Utilisateurs" TO authenticated;
GRANT ALL ON TABLE public."Devise_Utilisateurs" TO service_role;


--
-- Name: TABLE "DirectivesAnticipees"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."DirectivesAnticipees" TO anon;
GRANT ALL ON TABLE public."DirectivesAnticipees" TO authenticated;
GRANT ALL ON TABLE public."DirectivesAnticipees" TO service_role;


--
-- Name: SEQUENCE "DirectivesAnticipees_IDDirectivesAnticipees_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."DirectivesAnticipees_IDDirectivesAnticipees_seq" TO anon;
GRANT ALL ON SEQUENCE public."DirectivesAnticipees_IDDirectivesAnticipees_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."DirectivesAnticipees_IDDirectivesAnticipees_seq" TO service_role;


--
-- Name: TABLE "Document"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Document" TO anon;
GRANT ALL ON TABLE public."Document" TO authenticated;
GRANT ALL ON TABLE public."Document" TO service_role;


--
-- Name: TABLE "DocumentPatrimonial"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."DocumentPatrimonial" TO anon;
GRANT ALL ON TABLE public."DocumentPatrimonial" TO authenticated;
GRANT ALL ON TABLE public."DocumentPatrimonial" TO service_role;


--
-- Name: SEQUENCE "DocumentPatrimonial_IDDocumentPatrimonial_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."DocumentPatrimonial_IDDocumentPatrimonial_seq" TO anon;
GRANT ALL ON SEQUENCE public."DocumentPatrimonial_IDDocumentPatrimonial_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."DocumentPatrimonial_IDDocumentPatrimonial_seq" TO service_role;


--
-- Name: TABLE "DocumentRGPD"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."DocumentRGPD" TO anon;
GRANT ALL ON TABLE public."DocumentRGPD" TO authenticated;
GRANT ALL ON TABLE public."DocumentRGPD" TO service_role;


--
-- Name: SEQUENCE "DocumentRGPD_IDDocumentRGPD_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."DocumentRGPD_IDDocumentRGPD_seq" TO anon;
GRANT ALL ON SEQUENCE public."DocumentRGPD_IDDocumentRGPD_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."DocumentRGPD_IDDocumentRGPD_seq" TO service_role;


--
-- Name: SEQUENCE "Document_IDDocument_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."Document_IDDocument_seq" TO anon;
GRANT ALL ON SEQUENCE public."Document_IDDocument_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."Document_IDDocument_seq" TO service_role;


--
-- Name: TABLE "Domaine"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Domaine" TO anon;
GRANT ALL ON TABLE public."Domaine" TO authenticated;
GRANT ALL ON TABLE public."Domaine" TO service_role;


--
-- Name: SEQUENCE "Domaine_IDDomaine_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."Domaine_IDDomaine_seq" TO anon;
GRANT ALL ON SEQUENCE public."Domaine_IDDomaine_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."Domaine_IDDomaine_seq" TO service_role;


--
-- Name: TABLE "DonCagnotte"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."DonCagnotte" TO anon;
GRANT ALL ON TABLE public."DonCagnotte" TO authenticated;
GRANT ALL ON TABLE public."DonCagnotte" TO service_role;


--
-- Name: SEQUENCE "DonCagnotte_IDDonCagnotte_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."DonCagnotte_IDDonCagnotte_seq" TO anon;
GRANT ALL ON SEQUENCE public."DonCagnotte_IDDonCagnotte_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."DonCagnotte_IDDonCagnotte_seq" TO service_role;


--
-- Name: TABLE "EquipementMedical"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."EquipementMedical" TO anon;
GRANT ALL ON TABLE public."EquipementMedical" TO authenticated;
GRANT ALL ON TABLE public."EquipementMedical" TO service_role;


--
-- Name: SEQUENCE "EquipementMedical_IDEquipementMedical_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."EquipementMedical_IDEquipementMedical_seq" TO anon;
GRANT ALL ON SEQUENCE public."EquipementMedical_IDEquipementMedical_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."EquipementMedical_IDEquipementMedical_seq" TO service_role;


--
-- Name: TABLE "Evaluation"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Evaluation" TO anon;
GRANT ALL ON TABLE public."Evaluation" TO authenticated;
GRANT ALL ON TABLE public."Evaluation" TO service_role;


--
-- Name: TABLE "EvaluationCohabitation"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."EvaluationCohabitation" TO anon;
GRANT ALL ON TABLE public."EvaluationCohabitation" TO authenticated;
GRANT ALL ON TABLE public."EvaluationCohabitation" TO service_role;


--
-- Name: SEQUENCE "EvaluationCohabitation_IDEvaluationCohabitation_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."EvaluationCohabitation_IDEvaluationCohabitation_seq" TO anon;
GRANT ALL ON SEQUENCE public."EvaluationCohabitation_IDEvaluationCohabitation_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."EvaluationCohabitation_IDEvaluationCohabitation_seq" TO service_role;


--
-- Name: SEQUENCE "Evaluation_IDEvaluation_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."Evaluation_IDEvaluation_seq" TO anon;
GRANT ALL ON SEQUENCE public."Evaluation_IDEvaluation_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."Evaluation_IDEvaluation_seq" TO service_role;


--
-- Name: TABLE "Evenements"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Evenements" TO anon;
GRANT ALL ON TABLE public."Evenements" TO authenticated;
GRANT ALL ON TABLE public."Evenements" TO service_role;


--
-- Name: SEQUENCE "Evenements_IDEvenements_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."Evenements_IDEvenements_seq" TO anon;
GRANT ALL ON SEQUENCE public."Evenements_IDEvenements_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."Evenements_IDEvenements_seq" TO service_role;


--
-- Name: TABLE "Facture"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Facture" TO anon;
GRANT ALL ON TABLE public."Facture" TO authenticated;
GRANT ALL ON TABLE public."Facture" TO service_role;


--
-- Name: SEQUENCE "Facture_IDFacture_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."Facture_IDFacture_seq" TO anon;
GRANT ALL ON SEQUENCE public."Facture_IDFacture_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."Facture_IDFacture_seq" TO service_role;


--
-- Name: TABLE "Forum"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Forum" TO anon;
GRANT ALL ON TABLE public."Forum" TO authenticated;
GRANT ALL ON TABLE public."Forum" TO service_role;


--
-- Name: SEQUENCE "Forum_IDForum_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."Forum_IDForum_seq" TO anon;
GRANT ALL ON SEQUENCE public."Forum_IDForum_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."Forum_IDForum_seq" TO service_role;


--
-- Name: TABLE "Groupe"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Groupe" TO anon;
GRANT ALL ON TABLE public."Groupe" TO authenticated;
GRANT ALL ON TABLE public."Groupe" TO service_role;


--
-- Name: SEQUENCE "Groupe_IDGroupe_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."Groupe_IDGroupe_seq" TO anon;
GRANT ALL ON SEQUENCE public."Groupe_IDGroupe_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."Groupe_IDGroupe_seq" TO service_role;


--
-- Name: TABLE "HistoriqueConnexion"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."HistoriqueConnexion" TO anon;
GRANT ALL ON TABLE public."HistoriqueConnexion" TO authenticated;
GRANT ALL ON TABLE public."HistoriqueConnexion" TO service_role;


--
-- Name: SEQUENCE "HistoriqueConnexion_IDHistoriqueConnexion_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."HistoriqueConnexion_IDHistoriqueConnexion_seq" TO anon;
GRANT ALL ON SEQUENCE public."HistoriqueConnexion_IDHistoriqueConnexion_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."HistoriqueConnexion_IDHistoriqueConnexion_seq" TO service_role;


--
-- Name: TABLE "HistoriqueInteractions"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."HistoriqueInteractions" TO anon;
GRANT ALL ON TABLE public."HistoriqueInteractions" TO authenticated;
GRANT ALL ON TABLE public."HistoriqueInteractions" TO service_role;


--
-- Name: SEQUENCE "HistoriqueInteractions_IDHistoriqueInteractions_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."HistoriqueInteractions_IDHistoriqueInteractions_seq" TO anon;
GRANT ALL ON SEQUENCE public."HistoriqueInteractions_IDHistoriqueInteractions_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."HistoriqueInteractions_IDHistoriqueInteractions_seq" TO service_role;


--
-- Name: TABLE "Humeur"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Humeur" TO anon;
GRANT ALL ON TABLE public."Humeur" TO authenticated;
GRANT ALL ON TABLE public."Humeur" TO service_role;


--
-- Name: SEQUENCE "Humeur_IDHumeur_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."Humeur_IDHumeur_seq" TO anon;
GRANT ALL ON SEQUENCE public."Humeur_IDHumeur_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."Humeur_IDHumeur_seq" TO service_role;


--
-- Name: TABLE "Langue"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Langue" TO anon;
GRANT ALL ON TABLE public."Langue" TO authenticated;
GRANT ALL ON TABLE public."Langue" TO service_role;


--
-- Name: SEQUENCE "Langue_IDLangue_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."Langue_IDLangue_seq" TO anon;
GRANT ALL ON SEQUENCE public."Langue_IDLangue_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."Langue_IDLangue_seq" TO service_role;


--
-- Name: TABLE "Langue_Utilisateurs"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Langue_Utilisateurs" TO anon;
GRANT ALL ON TABLE public."Langue_Utilisateurs" TO authenticated;
GRANT ALL ON TABLE public."Langue_Utilisateurs" TO service_role;


--
-- Name: TABLE "LienPartenariat"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."LienPartenariat" TO anon;
GRANT ALL ON TABLE public."LienPartenariat" TO authenticated;
GRANT ALL ON TABLE public."LienPartenariat" TO service_role;


--
-- Name: SEQUENCE "LienPartenariat_IDLienPartenariat_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."LienPartenariat_IDLienPartenariat_seq" TO anon;
GRANT ALL ON SEQUENCE public."LienPartenariat_IDLienPartenariat_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."LienPartenariat_IDLienPartenariat_seq" TO service_role;


--
-- Name: TABLE "Localisation"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Localisation" TO anon;
GRANT ALL ON TABLE public."Localisation" TO authenticated;
GRANT ALL ON TABLE public."Localisation" TO service_role;


--
-- Name: SEQUENCE "Localisation_IDLocalisation_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."Localisation_IDLocalisation_seq" TO anon;
GRANT ALL ON SEQUENCE public."Localisation_IDLocalisation_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."Localisation_IDLocalisation_seq" TO service_role;


--
-- Name: TABLE "LogementSenior"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."LogementSenior" TO anon;
GRANT ALL ON TABLE public."LogementSenior" TO authenticated;
GRANT ALL ON TABLE public."LogementSenior" TO service_role;


--
-- Name: SEQUENCE "LogementSenior_IDLogementSenior_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."LogementSenior_IDLogementSenior_seq" TO anon;
GRANT ALL ON SEQUENCE public."LogementSenior_IDLogementSenior_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."LogementSenior_IDLogementSenior_seq" TO service_role;


--
-- Name: TABLE "Medicament"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Medicament" TO anon;
GRANT ALL ON TABLE public."Medicament" TO authenticated;
GRANT ALL ON TABLE public."Medicament" TO service_role;


--
-- Name: SEQUENCE "Medicament_IDMedicament_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."Medicament_IDMedicament_seq" TO anon;
GRANT ALL ON SEQUENCE public."Medicament_IDMedicament_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."Medicament_IDMedicament_seq" TO service_role;


--
-- Name: TABLE "MessageGroupe"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."MessageGroupe" TO anon;
GRANT ALL ON TABLE public."MessageGroupe" TO authenticated;
GRANT ALL ON TABLE public."MessageGroupe" TO service_role;


--
-- Name: SEQUENCE "MessageGroupe_IDMessageGroupe_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."MessageGroupe_IDMessageGroupe_seq" TO anon;
GRANT ALL ON SEQUENCE public."MessageGroupe_IDMessageGroupe_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."MessageGroupe_IDMessageGroupe_seq" TO service_role;


--
-- Name: TABLE "MiseEnRelation"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."MiseEnRelation" TO anon;
GRANT ALL ON TABLE public."MiseEnRelation" TO authenticated;
GRANT ALL ON TABLE public."MiseEnRelation" TO service_role;


--
-- Name: SEQUENCE "MiseEnRelation_IDMiseEnRelation_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."MiseEnRelation_IDMiseEnRelation_seq" TO anon;
GRANT ALL ON SEQUENCE public."MiseEnRelation_IDMiseEnRelation_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."MiseEnRelation_IDMiseEnRelation_seq" TO service_role;


--
-- Name: TABLE "MiseEnRelation_Prestation"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."MiseEnRelation_Prestation" TO anon;
GRANT ALL ON TABLE public."MiseEnRelation_Prestation" TO authenticated;
GRANT ALL ON TABLE public."MiseEnRelation_Prestation" TO service_role;


--
-- Name: SEQUENCE "MiseEnRelation_Prestation_IDMiseEnRelation_IDPrestation_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."MiseEnRelation_Prestation_IDMiseEnRelation_IDPrestation_seq" TO anon;
GRANT ALL ON SEQUENCE public."MiseEnRelation_Prestation_IDMiseEnRelation_IDPrestation_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."MiseEnRelation_Prestation_IDMiseEnRelation_IDPrestation_seq" TO service_role;


--
-- Name: TABLE "MoyenPaiement"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."MoyenPaiement" TO anon;
GRANT ALL ON TABLE public."MoyenPaiement" TO authenticated;
GRANT ALL ON TABLE public."MoyenPaiement" TO service_role;


--
-- Name: SEQUENCE "MoyenPaiement_IDMoyenPaiement_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."MoyenPaiement_IDMoyenPaiement_seq" TO anon;
GRANT ALL ON SEQUENCE public."MoyenPaiement_IDMoyenPaiement_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."MoyenPaiement_IDMoyenPaiement_seq" TO service_role;


--
-- Name: TABLE "Notifications"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Notifications" TO anon;
GRANT ALL ON TABLE public."Notifications" TO authenticated;
GRANT ALL ON TABLE public."Notifications" TO service_role;


--
-- Name: SEQUENCE "Notifications_IDNotifications_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."Notifications_IDNotifications_seq" TO anon;
GRANT ALL ON SEQUENCE public."Notifications_IDNotifications_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."Notifications_IDNotifications_seq" TO service_role;


--
-- Name: TABLE "ObjetPrete"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."ObjetPrete" TO anon;
GRANT ALL ON TABLE public."ObjetPrete" TO authenticated;
GRANT ALL ON TABLE public."ObjetPrete" TO service_role;


--
-- Name: SEQUENCE "ObjetPrete_IDObjetPrete_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."ObjetPrete_IDObjetPrete_seq" TO anon;
GRANT ALL ON SEQUENCE public."ObjetPrete_IDObjetPrete_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."ObjetPrete_IDObjetPrete_seq" TO service_role;


--
-- Name: TABLE "OffreSenior"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."OffreSenior" TO anon;
GRANT ALL ON TABLE public."OffreSenior" TO authenticated;
GRANT ALL ON TABLE public."OffreSenior" TO service_role;


--
-- Name: SEQUENCE "OffreSenior_IDOffreSenior_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."OffreSenior_IDOffreSenior_seq" TO anon;
GRANT ALL ON SEQUENCE public."OffreSenior_IDOffreSenior_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."OffreSenior_IDOffreSenior_seq" TO service_role;


--
-- Name: TABLE "Organisme"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Organisme" TO anon;
GRANT ALL ON TABLE public."Organisme" TO authenticated;
GRANT ALL ON TABLE public."Organisme" TO service_role;


--
-- Name: SEQUENCE "Organisme_IDOrganisme_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."Organisme_IDOrganisme_seq" TO anon;
GRANT ALL ON SEQUENCE public."Organisme_IDOrganisme_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."Organisme_IDOrganisme_seq" TO service_role;


--
-- Name: TABLE "Parametres"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Parametres" TO anon;
GRANT ALL ON TABLE public."Parametres" TO authenticated;
GRANT ALL ON TABLE public."Parametres" TO service_role;


--
-- Name: TABLE "ParametresCommission"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."ParametresCommission" TO anon;
GRANT ALL ON TABLE public."ParametresCommission" TO authenticated;
GRANT ALL ON TABLE public."ParametresCommission" TO service_role;


--
-- Name: SEQUENCE "ParametresCommission_IDParametreCommission_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."ParametresCommission_IDParametreCommission_seq" TO anon;
GRANT ALL ON SEQUENCE public."ParametresCommission_IDParametreCommission_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."ParametresCommission_IDParametreCommission_seq" TO service_role;


--
-- Name: SEQUENCE "Parametres_IDParametres_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."Parametres_IDParametres_seq" TO anon;
GRANT ALL ON SEQUENCE public."Parametres_IDParametres_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."Parametres_IDParametres_seq" TO service_role;


--
-- Name: TABLE "Partenaire"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Partenaire" TO anon;
GRANT ALL ON TABLE public."Partenaire" TO authenticated;
GRANT ALL ON TABLE public."Partenaire" TO service_role;


--
-- Name: SEQUENCE "Partenaire_IDPartenaire_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."Partenaire_IDPartenaire_seq" TO anon;
GRANT ALL ON SEQUENCE public."Partenaire_IDPartenaire_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."Partenaire_IDPartenaire_seq" TO service_role;


--
-- Name: TABLE "Partenaire_Services"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Partenaire_Services" TO anon;
GRANT ALL ON TABLE public."Partenaire_Services" TO authenticated;
GRANT ALL ON TABLE public."Partenaire_Services" TO service_role;


--
-- Name: TABLE "Pieces"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Pieces" TO anon;
GRANT ALL ON TABLE public."Pieces" TO authenticated;
GRANT ALL ON TABLE public."Pieces" TO service_role;


--
-- Name: SEQUENCE "Pieces_IDPieces_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."Pieces_IDPieces_seq" TO anon;
GRANT ALL ON SEQUENCE public."Pieces_IDPieces_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."Pieces_IDPieces_seq" TO service_role;


--
-- Name: TABLE "Prestation"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Prestation" TO anon;
GRANT ALL ON TABLE public."Prestation" TO authenticated;
GRANT ALL ON TABLE public."Prestation" TO service_role;


--
-- Name: TABLE "PrestationAidant"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."PrestationAidant" TO anon;
GRANT ALL ON TABLE public."PrestationAidant" TO authenticated;
GRANT ALL ON TABLE public."PrestationAidant" TO service_role;


--
-- Name: SEQUENCE "PrestationAidant_IDPrestationAidant_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."PrestationAidant_IDPrestationAidant_seq" TO anon;
GRANT ALL ON SEQUENCE public."PrestationAidant_IDPrestationAidant_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."PrestationAidant_IDPrestationAidant_seq" TO service_role;


--
-- Name: TABLE "PrestationSupport"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."PrestationSupport" TO anon;
GRANT ALL ON TABLE public."PrestationSupport" TO authenticated;
GRANT ALL ON TABLE public."PrestationSupport" TO service_role;


--
-- Name: SEQUENCE "PrestationSupport_IDPrestationSupport_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."PrestationSupport_IDPrestationSupport_seq" TO anon;
GRANT ALL ON SEQUENCE public."PrestationSupport_IDPrestationSupport_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."PrestationSupport_IDPrestationSupport_seq" TO service_role;


--
-- Name: SEQUENCE "Prestation_IDPrestation_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."Prestation_IDPrestation_seq" TO anon;
GRANT ALL ON SEQUENCE public."Prestation_IDPrestation_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."Prestation_IDPrestation_seq" TO service_role;


--
-- Name: TABLE "Prestation_Localisation"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Prestation_Localisation" TO anon;
GRANT ALL ON TABLE public."Prestation_Localisation" TO authenticated;
GRANT ALL ON TABLE public."Prestation_Localisation" TO service_role;


--
-- Name: TABLE "Produit"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Produit" TO anon;
GRANT ALL ON TABLE public."Produit" TO authenticated;
GRANT ALL ON TABLE public."Produit" TO service_role;


--
-- Name: TABLE "Produit_Commande"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Produit_Commande" TO anon;
GRANT ALL ON TABLE public."Produit_Commande" TO authenticated;
GRANT ALL ON TABLE public."Produit_Commande" TO service_role;


--
-- Name: SEQUENCE "Produit_IDProduit_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."Produit_IDProduit_seq" TO anon;
GRANT ALL ON SEQUENCE public."Produit_IDProduit_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."Produit_IDProduit_seq" TO service_role;


--
-- Name: TABLE "RapportMensuel"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."RapportMensuel" TO anon;
GRANT ALL ON TABLE public."RapportMensuel" TO authenticated;
GRANT ALL ON TABLE public."RapportMensuel" TO service_role;


--
-- Name: SEQUENCE "RapportMensuel_IDRapportMensuel_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."RapportMensuel_IDRapportMensuel_seq" TO anon;
GRANT ALL ON SEQUENCE public."RapportMensuel_IDRapportMensuel_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."RapportMensuel_IDRapportMensuel_seq" TO service_role;


--
-- Name: TABLE "RendezVousMedical"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."RendezVousMedical" TO anon;
GRANT ALL ON TABLE public."RendezVousMedical" TO authenticated;
GRANT ALL ON TABLE public."RendezVousMedical" TO service_role;


--
-- Name: SEQUENCE "RendezVousMedical_IDRendezVousMedical_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."RendezVousMedical_IDRendezVousMedical_seq" TO anon;
GRANT ALL ON SEQUENCE public."RendezVousMedical_IDRendezVousMedical_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."RendezVousMedical_IDRendezVousMedical_seq" TO service_role;


--
-- Name: TABLE "ReponseForum"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."ReponseForum" TO anon;
GRANT ALL ON TABLE public."ReponseForum" TO authenticated;
GRANT ALL ON TABLE public."ReponseForum" TO service_role;


--
-- Name: SEQUENCE "ReponseForum_IDReponseForum_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."ReponseForum_IDReponseForum_seq" TO anon;
GRANT ALL ON SEQUENCE public."ReponseForum_IDReponseForum_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."ReponseForum_IDReponseForum_seq" TO service_role;


--
-- Name: TABLE "ReponsesSupport"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."ReponsesSupport" TO anon;
GRANT ALL ON TABLE public."ReponsesSupport" TO authenticated;
GRANT ALL ON TABLE public."ReponsesSupport" TO service_role;


--
-- Name: SEQUENCE "ReponsesSupport_IDReponse_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."ReponsesSupport_IDReponse_seq" TO anon;
GRANT ALL ON SEQUENCE public."ReponsesSupport_IDReponse_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."ReponsesSupport_IDReponse_seq" TO service_role;


--
-- Name: TABLE "Ressource"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Ressource" TO anon;
GRANT ALL ON TABLE public."Ressource" TO authenticated;
GRANT ALL ON TABLE public."Ressource" TO service_role;


--
-- Name: SEQUENCE "Ressource_IDRessource_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."Ressource_IDRessource_seq" TO anon;
GRANT ALL ON SEQUENCE public."Ressource_IDRessource_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."Ressource_IDRessource_seq" TO service_role;


--
-- Name: TABLE "Seniors"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Seniors" TO anon;
GRANT ALL ON TABLE public."Seniors" TO authenticated;
GRANT ALL ON TABLE public."Seniors" TO service_role;


--
-- Name: SEQUENCE "Seniors_IDSeniors_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."Seniors_IDSeniors_seq" TO anon;
GRANT ALL ON SEQUENCE public."Seniors_IDSeniors_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."Seniors_IDSeniors_seq" TO service_role;


--
-- Name: TABLE "Seniors_TypeMaladie"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Seniors_TypeMaladie" TO anon;
GRANT ALL ON TABLE public."Seniors_TypeMaladie" TO authenticated;
GRANT ALL ON TABLE public."Seniors_TypeMaladie" TO service_role;


--
-- Name: TABLE "ServicePartenaire"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."ServicePartenaire" TO anon;
GRANT ALL ON TABLE public."ServicePartenaire" TO authenticated;
GRANT ALL ON TABLE public."ServicePartenaire" TO service_role;


--
-- Name: SEQUENCE "ServicePartenaire_IDServicePartenaire_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."ServicePartenaire_IDServicePartenaire_seq" TO anon;
GRANT ALL ON SEQUENCE public."ServicePartenaire_IDServicePartenaire_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."ServicePartenaire_IDServicePartenaire_seq" TO service_role;


--
-- Name: TABLE "ServicePostMortem"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."ServicePostMortem" TO anon;
GRANT ALL ON TABLE public."ServicePostMortem" TO authenticated;
GRANT ALL ON TABLE public."ServicePostMortem" TO service_role;


--
-- Name: SEQUENCE "ServicePostMortem_IDServicePostMortem_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."ServicePostMortem_IDServicePostMortem_seq" TO anon;
GRANT ALL ON SEQUENCE public."ServicePostMortem_IDServicePostMortem_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."ServicePostMortem_IDServicePostMortem_seq" TO service_role;


--
-- Name: TABLE "SignalementContenu"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."SignalementContenu" TO anon;
GRANT ALL ON TABLE public."SignalementContenu" TO authenticated;
GRANT ALL ON TABLE public."SignalementContenu" TO service_role;


--
-- Name: SEQUENCE "SignalementContenu_IDSignalement_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."SignalementContenu_IDSignalement_seq" TO anon;
GRANT ALL ON SEQUENCE public."SignalementContenu_IDSignalement_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."SignalementContenu_IDSignalement_seq" TO service_role;


--
-- Name: TABLE "Souvenir"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Souvenir" TO anon;
GRANT ALL ON TABLE public."Souvenir" TO authenticated;
GRANT ALL ON TABLE public."Souvenir" TO service_role;


--
-- Name: SEQUENCE "Souvenir_IDSouvenir_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."Souvenir_IDSouvenir_seq" TO anon;
GRANT ALL ON SEQUENCE public."Souvenir_IDSouvenir_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."Souvenir_IDSouvenir_seq" TO service_role;


--
-- Name: TABLE "Structures"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Structures" TO anon;
GRANT ALL ON TABLE public."Structures" TO authenticated;
GRANT ALL ON TABLE public."Structures" TO service_role;


--
-- Name: SEQUENCE "Structures_IDStructures_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."Structures_IDStructures_seq" TO anon;
GRANT ALL ON SEQUENCE public."Structures_IDStructures_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."Structures_IDStructures_seq" TO service_role;


--
-- Name: TABLE "SujetForum"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."SujetForum" TO anon;
GRANT ALL ON TABLE public."SujetForum" TO authenticated;
GRANT ALL ON TABLE public."SujetForum" TO service_role;


--
-- Name: SEQUENCE "SujetForum_IDSujetForum_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."SujetForum_IDSujetForum_seq" TO anon;
GRANT ALL ON SEQUENCE public."SujetForum_IDSujetForum_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."SujetForum_IDSujetForum_seq" TO service_role;


--
-- Name: TABLE "SupportClient"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."SupportClient" TO anon;
GRANT ALL ON TABLE public."SupportClient" TO authenticated;
GRANT ALL ON TABLE public."SupportClient" TO service_role;


--
-- Name: SEQUENCE "SupportClient_IDTicketClient_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."SupportClient_IDTicketClient_seq" TO anon;
GRANT ALL ON SEQUENCE public."SupportClient_IDTicketClient_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."SupportClient_IDTicketClient_seq" TO service_role;


--
-- Name: TABLE "TMessage"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."TMessage" TO anon;
GRANT ALL ON TABLE public."TMessage" TO authenticated;
GRANT ALL ON TABLE public."TMessage" TO service_role;


--
-- Name: SEQUENCE "TMessage_IDTMessage_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."TMessage_IDTMessage_seq" TO anon;
GRANT ALL ON SEQUENCE public."TMessage_IDTMessage_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."TMessage_IDTMessage_seq" TO service_role;


--
-- Name: TABLE "TypeMaladie"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."TypeMaladie" TO anon;
GRANT ALL ON TABLE public."TypeMaladie" TO authenticated;
GRANT ALL ON TABLE public."TypeMaladie" TO service_role;


--
-- Name: SEQUENCE "TypeMaladie_IDTypeMaladie_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."TypeMaladie_IDTypeMaladie_seq" TO anon;
GRANT ALL ON SEQUENCE public."TypeMaladie_IDTypeMaladie_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."TypeMaladie_IDTypeMaladie_seq" TO service_role;


--
-- Name: TABLE "TypePieces"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."TypePieces" TO anon;
GRANT ALL ON TABLE public."TypePieces" TO authenticated;
GRANT ALL ON TABLE public."TypePieces" TO service_role;


--
-- Name: SEQUENCE "TypePieces_IDTypePieces_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."TypePieces_IDTypePieces_seq" TO anon;
GRANT ALL ON SEQUENCE public."TypePieces_IDTypePieces_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."TypePieces_IDTypePieces_seq" TO service_role;


--
-- Name: TABLE "Utilisateurs"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Utilisateurs" TO anon;
GRANT ALL ON TABLE public."Utilisateurs" TO authenticated;
GRANT ALL ON TABLE public."Utilisateurs" TO service_role;


--
-- Name: TABLE "Utilisateurs_Groupe"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Utilisateurs_Groupe" TO anon;
GRANT ALL ON TABLE public."Utilisateurs_Groupe" TO authenticated;
GRANT ALL ON TABLE public."Utilisateurs_Groupe" TO service_role;


--
-- Name: SEQUENCE "Utilisateurs_IDUtilisateurs_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."Utilisateurs_IDUtilisateurs_seq" TO anon;
GRANT ALL ON SEQUENCE public."Utilisateurs_IDUtilisateurs_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."Utilisateurs_IDUtilisateurs_seq" TO service_role;


--
-- Name: TABLE "Utilisateurs_Localisation"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."Utilisateurs_Localisation" TO anon;
GRANT ALL ON TABLE public."Utilisateurs_Localisation" TO authenticated;
GRANT ALL ON TABLE public."Utilisateurs_Localisation" TO service_role;


--
-- Name: TABLE "VersementCommissions"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."VersementCommissions" TO anon;
GRANT ALL ON TABLE public."VersementCommissions" TO authenticated;
GRANT ALL ON TABLE public."VersementCommissions" TO service_role;


--
-- Name: SEQUENCE "VersementCommissions_IDVersementCommissions_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."VersementCommissions_IDVersementCommissions_seq" TO anon;
GRANT ALL ON SEQUENCE public."VersementCommissions_IDVersementCommissions_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."VersementCommissions_IDVersementCommissions_seq" TO service_role;


--
-- Name: TABLE prestations_dashboard_view; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.prestations_dashboard_view TO anon;
GRANT ALL ON TABLE public.prestations_dashboard_view TO authenticated;
GRANT ALL ON TABLE public.prestations_dashboard_view TO service_role;


--
-- Name: TABLE support_dashboard_view; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.support_dashboard_view TO anon;
GRANT ALL ON TABLE public.support_dashboard_view TO authenticated;
GRANT ALL ON TABLE public.support_dashboard_view TO service_role;


--
-- Name: TABLE v_activitesrecentes; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.v_activitesrecentes TO anon;
GRANT ALL ON TABLE public.v_activitesrecentes TO authenticated;
GRANT ALL ON TABLE public.v_activitesrecentes TO service_role;


--
-- Name: TABLE v_finances_transactions_admin; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.v_finances_transactions_admin TO anon;
GRANT ALL ON TABLE public.v_finances_transactions_admin TO authenticated;
GRANT ALL ON TABLE public.v_finances_transactions_admin TO service_role;


--
-- Name: TABLE v_financestransactions; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.v_financestransactions TO anon;
GRANT ALL ON TABLE public.v_financestransactions TO authenticated;
GRANT ALL ON TABLE public.v_financestransactions TO service_role;


--
-- Name: TABLE v_forum_posts_moderation; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.v_forum_posts_moderation TO anon;
GRANT ALL ON TABLE public.v_forum_posts_moderation TO authenticated;
GRANT ALL ON TABLE public.v_forum_posts_moderation TO service_role;


--
-- Name: TABLE v_forum_posts_stats; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.v_forum_posts_stats TO anon;
GRANT ALL ON TABLE public.v_forum_posts_stats TO authenticated;
GRANT ALL ON TABLE public.v_forum_posts_stats TO service_role;


--
-- Name: TABLE v_group_messages_moderation; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.v_group_messages_moderation TO anon;
GRANT ALL ON TABLE public.v_group_messages_moderation TO authenticated;
GRANT ALL ON TABLE public.v_group_messages_moderation TO service_role;


--
-- Name: TABLE messages; Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON TABLE realtime.messages TO postgres;
GRANT ALL ON TABLE realtime.messages TO dashboard_user;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO anon;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO authenticated;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO service_role;


--
-- Name: TABLE messages_2026_02_23; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2026_02_23 TO postgres;
GRANT ALL ON TABLE realtime.messages_2026_02_23 TO dashboard_user;


--
-- Name: TABLE messages_2026_02_24; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2026_02_24 TO postgres;
GRANT ALL ON TABLE realtime.messages_2026_02_24 TO dashboard_user;


--
-- Name: TABLE messages_2026_02_25; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2026_02_25 TO postgres;
GRANT ALL ON TABLE realtime.messages_2026_02_25 TO dashboard_user;


--
-- Name: TABLE messages_2026_02_26; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2026_02_26 TO postgres;
GRANT ALL ON TABLE realtime.messages_2026_02_26 TO dashboard_user;


--
-- Name: TABLE messages_2026_02_27; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2026_02_27 TO postgres;
GRANT ALL ON TABLE realtime.messages_2026_02_27 TO dashboard_user;


--
-- Name: TABLE messages_2026_02_28; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2026_02_28 TO postgres;
GRANT ALL ON TABLE realtime.messages_2026_02_28 TO dashboard_user;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.schema_migrations TO postgres;
GRANT ALL ON TABLE realtime.schema_migrations TO dashboard_user;
GRANT SELECT ON TABLE realtime.schema_migrations TO anon;
GRANT SELECT ON TABLE realtime.schema_migrations TO authenticated;
GRANT SELECT ON TABLE realtime.schema_migrations TO service_role;
GRANT ALL ON TABLE realtime.schema_migrations TO supabase_realtime_admin;


--
-- Name: TABLE subscription; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.subscription TO postgres;
GRANT ALL ON TABLE realtime.subscription TO dashboard_user;
GRANT SELECT ON TABLE realtime.subscription TO anon;
GRANT SELECT ON TABLE realtime.subscription TO authenticated;
GRANT SELECT ON TABLE realtime.subscription TO service_role;
GRANT ALL ON TABLE realtime.subscription TO supabase_realtime_admin;


--
-- Name: SEQUENCE subscription_id_seq; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO postgres;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO dashboard_user;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO anon;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO service_role;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO supabase_realtime_admin;


--
-- Name: TABLE buckets; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.buckets TO anon;
GRANT ALL ON TABLE storage.buckets TO authenticated;
GRANT ALL ON TABLE storage.buckets TO service_role;
GRANT ALL ON TABLE storage.buckets TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON TABLE storage.buckets TO anon;
RESET SESSION AUTHORIZATION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON TABLE storage.buckets TO authenticated;
RESET SESSION AUTHORIZATION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON TABLE storage.buckets TO service_role;
RESET SESSION AUTHORIZATION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON TABLE storage.buckets TO postgres;
RESET SESSION AUTHORIZATION;


--
-- Name: TABLE buckets_analytics; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.buckets_analytics TO service_role;
GRANT ALL ON TABLE storage.buckets_analytics TO authenticated;
GRANT ALL ON TABLE storage.buckets_analytics TO anon;


--
-- Name: TABLE buckets_vectors; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT ON TABLE storage.buckets_vectors TO service_role;
GRANT SELECT ON TABLE storage.buckets_vectors TO authenticated;
GRANT SELECT ON TABLE storage.buckets_vectors TO anon;


--
-- Name: TABLE iceberg_namespaces; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.iceberg_namespaces TO service_role;
GRANT SELECT ON TABLE storage.iceberg_namespaces TO authenticated;
GRANT SELECT ON TABLE storage.iceberg_namespaces TO anon;


--
-- Name: TABLE iceberg_tables; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.iceberg_tables TO service_role;
GRANT SELECT ON TABLE storage.iceberg_tables TO authenticated;
GRANT SELECT ON TABLE storage.iceberg_tables TO anon;


--
-- Name: TABLE objects; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.objects TO anon;
GRANT ALL ON TABLE storage.objects TO authenticated;
GRANT ALL ON TABLE storage.objects TO service_role;
GRANT ALL ON TABLE storage.objects TO postgres WITH GRANT OPTION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON TABLE storage.objects TO anon;
RESET SESSION AUTHORIZATION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON TABLE storage.objects TO authenticated;
RESET SESSION AUTHORIZATION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON TABLE storage.objects TO service_role;
RESET SESSION AUTHORIZATION;
SET SESSION AUTHORIZATION postgres;
GRANT ALL ON TABLE storage.objects TO postgres;
RESET SESSION AUTHORIZATION;


--
-- Name: TABLE s3_multipart_uploads; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO anon;


--
-- Name: TABLE s3_multipart_uploads_parts; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads_parts TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO anon;


--
-- Name: TABLE vector_indexes; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT ON TABLE storage.vector_indexes TO service_role;
GRANT SELECT ON TABLE storage.vector_indexes TO authenticated;
GRANT SELECT ON TABLE storage.vector_indexes TO anon;


--
-- Name: TABLE hooks; Type: ACL; Schema: supabase_functions; Owner: supabase_functions_admin
--

GRANT ALL ON TABLE supabase_functions.hooks TO postgres;
GRANT ALL ON TABLE supabase_functions.hooks TO anon;
GRANT ALL ON TABLE supabase_functions.hooks TO authenticated;
GRANT ALL ON TABLE supabase_functions.hooks TO service_role;


--
-- Name: SEQUENCE hooks_id_seq; Type: ACL; Schema: supabase_functions; Owner: supabase_functions_admin
--

GRANT ALL ON SEQUENCE supabase_functions.hooks_id_seq TO postgres;
GRANT ALL ON SEQUENCE supabase_functions.hooks_id_seq TO anon;
GRANT ALL ON SEQUENCE supabase_functions.hooks_id_seq TO authenticated;
GRANT ALL ON SEQUENCE supabase_functions.hooks_id_seq TO service_role;


--
-- Name: TABLE migrations; Type: ACL; Schema: supabase_functions; Owner: supabase_functions_admin
--

GRANT ALL ON TABLE supabase_functions.migrations TO postgres;
GRANT ALL ON TABLE supabase_functions.migrations TO anon;
GRANT ALL ON TABLE supabase_functions.migrations TO authenticated;
GRANT ALL ON TABLE supabase_functions.migrations TO service_role;


--
-- Name: TABLE secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.secrets TO service_role;
SET SESSION AUTHORIZATION postgres;
GRANT SELECT,DELETE ON TABLE vault.secrets TO service_role;
RESET SESSION AUTHORIZATION;


--
-- Name: TABLE decrypted_secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.decrypted_secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.decrypted_secrets TO service_role;
SET SESSION AUTHORIZATION postgres;
GRANT SELECT,DELETE ON TABLE vault.decrypted_secrets TO service_role;
RESET SESSION AUTHORIZATION;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON SEQUENCES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON FUNCTIONS TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON TABLES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: supabase_functions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: supabase_functions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: supabase_functions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA supabase_functions GRANT ALL ON TABLES TO service_role;


--
-- Name: issue_graphql_placeholder; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_graphql_placeholder ON sql_drop
         WHEN TAG IN ('DROP EXTENSION')
   EXECUTE FUNCTION extensions.set_graphql_placeholder();


ALTER EVENT TRIGGER issue_graphql_placeholder OWNER TO supabase_admin;

--
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_cron_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_cron_access();


ALTER EVENT TRIGGER issue_pg_cron_access OWNER TO supabase_admin;

--
-- Name: issue_pg_graphql_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_graphql_access ON ddl_command_end
         WHEN TAG IN ('CREATE FUNCTION')
   EXECUTE FUNCTION extensions.grant_pg_graphql_access();


ALTER EVENT TRIGGER issue_pg_graphql_access OWNER TO supabase_admin;

--
-- Name: issue_pg_net_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_net_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_net_access();


ALTER EVENT TRIGGER issue_pg_net_access OWNER TO supabase_admin;

--
-- Name: pgrst_ddl_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_ddl_watch ON ddl_command_end
   EXECUTE FUNCTION extensions.pgrst_ddl_watch();


ALTER EVENT TRIGGER pgrst_ddl_watch OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_drop_watch ON sql_drop
   EXECUTE FUNCTION extensions.pgrst_drop_watch();


ALTER EVENT TRIGGER pgrst_drop_watch OWNER TO supabase_admin;

--
-- PostgreSQL database dump complete
--


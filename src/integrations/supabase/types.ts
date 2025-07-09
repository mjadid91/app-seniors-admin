export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      ActiviteRemuneree: {
        Row: {
          DateCreationActivite: string
          DescriptionActivite: string
          Disponibilite: string
          IDActiviteRemuneree: number
          IDSeniors: number | null
          StatutActiviteRemuneree: string
          TarifHoraire: number
          TypeActiviteRemuneree: string
        }
        Insert: {
          DateCreationActivite: string
          DescriptionActivite: string
          Disponibilite: string
          IDActiviteRemuneree?: number
          IDSeniors?: number | null
          StatutActiviteRemuneree: string
          TarifHoraire?: number
          TypeActiviteRemuneree: string
        }
        Update: {
          DateCreationActivite?: string
          DescriptionActivite?: string
          Disponibilite?: string
          IDActiviteRemuneree?: number
          IDSeniors?: number | null
          StatutActiviteRemuneree?: string
          TarifHoraire?: number
          TypeActiviteRemuneree?: string
        }
        Relationships: [
          {
            foreignKeyName: "ActiviteRemuneree_IDSeniors_fkey"
            columns: ["IDSeniors"]
            isOneToOne: false
            referencedRelation: "prestations_dashboard_view"
            referencedColumns: ["IDSeniors"]
          },
          {
            foreignKeyName: "ActiviteRemuneree_IDSeniors_fkey"
            columns: ["IDSeniors"]
            isOneToOne: false
            referencedRelation: "Seniors"
            referencedColumns: ["IDSeniors"]
          },
        ]
      }
      ActiviteRemuneree_Utilisateurs: {
        Row: {
          DateTransaction: string
          IDActiviteRemuneree: number | null
          IDUtilisateurs: number | null
          MontantRevenu: number
          StatutPaiement: string
        }
        Insert: {
          DateTransaction: string
          IDActiviteRemuneree?: number | null
          IDUtilisateurs?: number | null
          MontantRevenu?: number
          StatutPaiement: string
        }
        Update: {
          DateTransaction?: string
          IDActiviteRemuneree?: number | null
          IDUtilisateurs?: number | null
          MontantRevenu?: number
          StatutPaiement?: string
        }
        Relationships: [
          {
            foreignKeyName: "ActiviteRemuneree_Utilisateurs_IDActiviteRemuneree_fkey"
            columns: ["IDActiviteRemuneree"]
            isOneToOne: false
            referencedRelation: "ActiviteRemuneree"
            referencedColumns: ["IDActiviteRemuneree"]
          },
          {
            foreignKeyName: "ActiviteRemuneree_Utilisateurs_IDUtilisateurs_fkey"
            columns: ["IDUtilisateurs"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
        ]
      }
      Agenda: {
        Row: {
          IDAgenda: number
          IDSeniors: number | null
          TitreAgenda: string
          TypeAgenda: string
        }
        Insert: {
          IDAgenda?: number
          IDSeniors?: number | null
          TitreAgenda: string
          TypeAgenda?: string
        }
        Update: {
          IDAgenda?: number
          IDSeniors?: number | null
          TitreAgenda?: string
          TypeAgenda?: string
        }
        Relationships: [
          {
            foreignKeyName: "Agenda_IDSeniors_fkey"
            columns: ["IDSeniors"]
            isOneToOne: false
            referencedRelation: "prestations_dashboard_view"
            referencedColumns: ["IDSeniors"]
          },
          {
            foreignKeyName: "Agenda_IDSeniors_fkey"
            columns: ["IDSeniors"]
            isOneToOne: false
            referencedRelation: "Seniors"
            referencedColumns: ["IDSeniors"]
          },
        ]
      }
      Aidant: {
        Row: {
          Experience: string
          IDAidant: number
          IDUtilisateurs: number | null
          TarifAidant: number
        }
        Insert: {
          Experience: string
          IDAidant?: number
          IDUtilisateurs?: number | null
          TarifAidant?: number
        }
        Update: {
          Experience?: string
          IDAidant?: number
          IDUtilisateurs?: number | null
          TarifAidant?: number
        }
        Relationships: [
          {
            foreignKeyName: "Aidant_IDUtilisateurs_fkey"
            columns: ["IDUtilisateurs"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
        ]
      }
      Aidant_Competences: {
        Row: {
          IDAidant: number | null
          IDCompetences: number | null
        }
        Insert: {
          IDAidant?: number | null
          IDCompetences?: number | null
        }
        Update: {
          IDAidant?: number | null
          IDCompetences?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Aidant_Competences_IDAidant_fkey"
            columns: ["IDAidant"]
            isOneToOne: false
            referencedRelation: "Aidant"
            referencedColumns: ["IDAidant"]
          },
          {
            foreignKeyName: "Aidant_Competences_IDAidant_fkey"
            columns: ["IDAidant"]
            isOneToOne: false
            referencedRelation: "prestations_dashboard_view"
            referencedColumns: ["IDAidant"]
          },
          {
            foreignKeyName: "Aidant_Competences_IDCompetences_fkey"
            columns: ["IDCompetences"]
            isOneToOne: false
            referencedRelation: "Competences"
            referencedColumns: ["IDCompetences"]
          },
        ]
      }
      AssuranceDeces: {
        Row: {
          CotisationMensuelle: number
          DateSouscription: string
          IDAssuranceDeces: number
          IDSeniors: number | null
          MontantAssure: string
          NomAssurance: string
        }
        Insert: {
          CotisationMensuelle?: number
          DateSouscription: string
          IDAssuranceDeces?: number
          IDSeniors?: number | null
          MontantAssure: string
          NomAssurance: string
        }
        Update: {
          CotisationMensuelle?: number
          DateSouscription?: string
          IDAssuranceDeces?: number
          IDSeniors?: number | null
          MontantAssure?: string
          NomAssurance?: string
        }
        Relationships: [
          {
            foreignKeyName: "AssuranceDeces_IDSeniors_fkey"
            columns: ["IDSeniors"]
            isOneToOne: false
            referencedRelation: "prestations_dashboard_view"
            referencedColumns: ["IDSeniors"]
          },
          {
            foreignKeyName: "AssuranceDeces_IDSeniors_fkey"
            columns: ["IDSeniors"]
            isOneToOne: false
            referencedRelation: "Seniors"
            referencedColumns: ["IDSeniors"]
          },
        ]
      }
      BesoinSenior: {
        Row: {
          DatePublication: string
          Description: string
          IDBesoinSenior: number
          IDSeniors: number | null
          Statut: string
          Titre: string
          TypeBesoin: string
        }
        Insert: {
          DatePublication: string
          Description: string
          IDBesoinSenior?: number
          IDSeniors?: number | null
          Statut: string
          Titre: string
          TypeBesoin: string
        }
        Update: {
          DatePublication?: string
          Description?: string
          IDBesoinSenior?: number
          IDSeniors?: number | null
          Statut?: string
          Titre?: string
          TypeBesoin?: string
        }
        Relationships: [
          {
            foreignKeyName: "BesoinSenior_IDSeniors_fkey"
            columns: ["IDSeniors"]
            isOneToOne: false
            referencedRelation: "prestations_dashboard_view"
            referencedColumns: ["IDSeniors"]
          },
          {
            foreignKeyName: "BesoinSenior_IDSeniors_fkey"
            columns: ["IDSeniors"]
            isOneToOne: false
            referencedRelation: "Seniors"
            referencedColumns: ["IDSeniors"]
          },
        ]
      }
      BonPlan: {
        Row: {
          CodePromo: string
          DateDebutReduction: string
          DateFinReduction: string
          DescriptionBonPlan: string
          IDBonPlan: number
          IDPartenaire: number | null
          PourcentageReduction: number
          StatutBonPlan: string
          TitreBonPlan: string
          TypeReduction: string
        }
        Insert: {
          CodePromo: string
          DateDebutReduction: string
          DateFinReduction: string
          DescriptionBonPlan: string
          IDBonPlan?: number
          IDPartenaire?: number | null
          PourcentageReduction?: number
          StatutBonPlan: string
          TitreBonPlan: string
          TypeReduction: string
        }
        Update: {
          CodePromo?: string
          DateDebutReduction?: string
          DateFinReduction?: string
          DescriptionBonPlan?: string
          IDBonPlan?: number
          IDPartenaire?: number | null
          PourcentageReduction?: number
          StatutBonPlan?: string
          TitreBonPlan?: string
          TypeReduction?: string
        }
        Relationships: [
          {
            foreignKeyName: "BonPlan_IDPartenaire_fkey"
            columns: ["IDPartenaire"]
            isOneToOne: false
            referencedRelation: "Partenaire"
            referencedColumns: ["IDPartenaire"]
          },
        ]
      }
      BonPlan_Utilisateurs: {
        Row: {
          DateUtilisation: string
          IDBonPlan: number | null
          IDCommande: number | null
          IDUtilisateurs: number | null
          StatutUtilisation: string
        }
        Insert: {
          DateUtilisation: string
          IDBonPlan?: number | null
          IDCommande?: number | null
          IDUtilisateurs?: number | null
          StatutUtilisation: string
        }
        Update: {
          DateUtilisation?: string
          IDBonPlan?: number | null
          IDCommande?: number | null
          IDUtilisateurs?: number | null
          StatutUtilisation?: string
        }
        Relationships: [
          {
            foreignKeyName: "BonPlan_Utilisateurs_IDBonPlan_fkey"
            columns: ["IDBonPlan"]
            isOneToOne: false
            referencedRelation: "BonPlan"
            referencedColumns: ["IDBonPlan"]
          },
          {
            foreignKeyName: "bonplan_utilisateurs_idcommande_fkey"
            columns: ["IDCommande"]
            isOneToOne: false
            referencedRelation: "Commande"
            referencedColumns: ["IDCommande"]
          },
          {
            foreignKeyName: "BonPlan_Utilisateurs_IDUtilisateurs_fkey"
            columns: ["IDUtilisateurs"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
        ]
      }
      CagnotteDeces: {
        Row: {
          DateCloture: string
          DateOuverture: string
          Description: string
          IDCagnotteDeces: number
          IDSeniors: number | null
          MontantTotal: number
          Statut: string
          Titre: string
        }
        Insert: {
          DateCloture: string
          DateOuverture: string
          Description: string
          IDCagnotteDeces?: number
          IDSeniors?: number | null
          MontantTotal?: number
          Statut: string
          Titre: string
        }
        Update: {
          DateCloture?: string
          DateOuverture?: string
          Description?: string
          IDCagnotteDeces?: number
          IDSeniors?: number | null
          MontantTotal?: number
          Statut?: string
          Titre?: string
        }
        Relationships: [
          {
            foreignKeyName: "CagnotteDeces_IDSeniors_fkey"
            columns: ["IDSeniors"]
            isOneToOne: false
            referencedRelation: "prestations_dashboard_view"
            referencedColumns: ["IDSeniors"]
          },
          {
            foreignKeyName: "CagnotteDeces_IDSeniors_fkey"
            columns: ["IDSeniors"]
            isOneToOne: false
            referencedRelation: "Seniors"
            referencedColumns: ["IDSeniors"]
          },
        ]
      }
      CandidatureAidant: {
        Row: {
          DateCandidature: string
          IDAidant: number | null
          IDBesoinSenior: number | null
          IDCandidatureAidant: number
          MessageMotivation: string
          Statut: number
        }
        Insert: {
          DateCandidature: string
          IDAidant?: number | null
          IDBesoinSenior?: number | null
          IDCandidatureAidant?: number
          MessageMotivation: string
          Statut?: number
        }
        Update: {
          DateCandidature?: string
          IDAidant?: number | null
          IDBesoinSenior?: number | null
          IDCandidatureAidant?: number
          MessageMotivation?: string
          Statut?: number
        }
        Relationships: [
          {
            foreignKeyName: "CandidatureAidant_IDAidant_fkey"
            columns: ["IDAidant"]
            isOneToOne: false
            referencedRelation: "Aidant"
            referencedColumns: ["IDAidant"]
          },
          {
            foreignKeyName: "CandidatureAidant_IDAidant_fkey"
            columns: ["IDAidant"]
            isOneToOne: false
            referencedRelation: "prestations_dashboard_view"
            referencedColumns: ["IDAidant"]
          },
          {
            foreignKeyName: "CandidatureAidant_IDBesoinSenior_fkey"
            columns: ["IDBesoinSenior"]
            isOneToOne: false
            referencedRelation: "BesoinSenior"
            referencedColumns: ["IDBesoinSenior"]
          },
        ]
      }
      CategorieDocument: {
        Row: {
          IDCategorieDocument: number
          NomCategorie: string
        }
        Insert: {
          IDCategorieDocument?: number
          NomCategorie: string
        }
        Update: {
          IDCategorieDocument?: number
          NomCategorie?: string
        }
        Relationships: []
      }
      CategorieOrganisme: {
        Row: {
          IDCategorieOrganisme: number
          NomCategorie: string
        }
        Insert: {
          IDCategorieOrganisme?: number
          NomCategorie: string
        }
        Update: {
          IDCategorieOrganisme?: number
          NomCategorie?: string
        }
        Relationships: []
      }
      CategorieRessource: {
        Row: {
          IDCategorieRessource: number
          NomCategorie: string
        }
        Insert: {
          IDCategorieRessource?: number
          NomCategorie: string
        }
        Update: {
          IDCategorieRessource?: number
          NomCategorie?: string
        }
        Relationships: []
      }
      CatUtilisateurs: {
        Row: {
          EstAdministrateur: boolean
          EstAidant: boolean
          EstModerateur: boolean
          EstOrganisme: boolean
          EstSenior: boolean
          EstSupport: boolean
          EstTuteur: boolean
          IDCatUtilisateurs: number
        }
        Insert: {
          EstAdministrateur?: boolean
          EstAidant?: boolean
          EstModerateur?: boolean
          EstOrganisme?: boolean
          EstSenior?: boolean
          EstSupport?: boolean
          EstTuteur?: boolean
          IDCatUtilisateurs?: number
        }
        Update: {
          EstAdministrateur?: boolean
          EstAidant?: boolean
          EstModerateur?: boolean
          EstOrganisme?: boolean
          EstSenior?: boolean
          EstSupport?: boolean
          EstTuteur?: boolean
          IDCatUtilisateurs?: number
        }
        Relationships: []
      }
      Commande: {
        Row: {
          DateCommande: string
          IDCommande: number
          IDMoyenPaiement: number | null
          IDUtilisateurPayeur: number | null
          MontantTotal: number
          StatutCommande: string
          TypeCommande: string | null
        }
        Insert: {
          DateCommande: string
          IDCommande?: number
          IDMoyenPaiement?: number | null
          IDUtilisateurPayeur?: number | null
          MontantTotal?: number
          StatutCommande: string
          TypeCommande?: string | null
        }
        Update: {
          DateCommande?: string
          IDCommande?: number
          IDMoyenPaiement?: number | null
          IDUtilisateurPayeur?: number | null
          MontantTotal?: number
          StatutCommande?: string
          TypeCommande?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Commande_IDMoyenPaiement_fkey"
            columns: ["IDMoyenPaiement"]
            isOneToOne: false
            referencedRelation: "MoyenPaiement"
            referencedColumns: ["IDMoyenPaiement"]
          },
          {
            foreignKeyName: "commande_idutilisateurpayeur_fkey"
            columns: ["IDUtilisateurPayeur"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
        ]
      }
      Competences: {
        Row: {
          CodeMetier: string
          IDCompetences: number
          IDDomaine: number | null
          Metier: string
        }
        Insert: {
          CodeMetier: string
          IDCompetences?: number
          IDDomaine?: number | null
          Metier: string
        }
        Update: {
          CodeMetier?: string
          IDCompetences?: number
          IDDomaine?: number | null
          Metier?: string
        }
        Relationships: [
          {
            foreignKeyName: "Competences_IDDomaine_fkey"
            columns: ["IDDomaine"]
            isOneToOne: false
            referencedRelation: "Domaine"
            referencedColumns: ["IDDomaine"]
          },
        ]
      }
      ConsentementCookies: {
        Row: {
          DateConsentement: string
          IDConsentement: number
          IDUtilisateurs: number | null
          Statut: boolean
          TypeCookie: string
        }
        Insert: {
          DateConsentement?: string
          IDConsentement?: number
          IDUtilisateurs?: number | null
          Statut?: boolean
          TypeCookie: string
        }
        Update: {
          DateConsentement?: string
          IDConsentement?: number
          IDUtilisateurs?: number | null
          Statut?: boolean
          TypeCookie?: string
        }
        Relationships: [
          {
            foreignKeyName: "ConsentementCookies_IDUtilisateurs_fkey"
            columns: ["IDUtilisateurs"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
        ]
      }
      ContactUrgence: {
        Row: {
          Email: string
          EstActif: boolean
          IDContactUrgence: number
          IDSeniors: number | null
          NomUrgence: string
          Priorite: string
          Relation: string
          Telephone: string
        }
        Insert: {
          Email: string
          EstActif?: boolean
          IDContactUrgence?: number
          IDSeniors?: number | null
          NomUrgence: string
          Priorite: string
          Relation: string
          Telephone: string
        }
        Update: {
          Email?: string
          EstActif?: boolean
          IDContactUrgence?: number
          IDSeniors?: number | null
          NomUrgence?: string
          Priorite?: string
          Relation?: string
          Telephone?: string
        }
        Relationships: [
          {
            foreignKeyName: "ContactUrgence_IDSeniors_fkey"
            columns: ["IDSeniors"]
            isOneToOne: false
            referencedRelation: "prestations_dashboard_view"
            referencedColumns: ["IDSeniors"]
          },
          {
            foreignKeyName: "ContactUrgence_IDSeniors_fkey"
            columns: ["IDSeniors"]
            isOneToOne: false
            referencedRelation: "Seniors"
            referencedColumns: ["IDSeniors"]
          },
        ]
      }
      ContratCohabitation: {
        Row: {
          ConditionEchange: string
          DateDebutContrat: string
          DateFinContrat: string
          IDAidant: number | null
          IDContratCohabitation: number
          IDLogementSenior: number | null
          ReglesMaison: string
          StatutContrat: string
        }
        Insert: {
          ConditionEchange: string
          DateDebutContrat: string
          DateFinContrat: string
          IDAidant?: number | null
          IDContratCohabitation?: number
          IDLogementSenior?: number | null
          ReglesMaison: string
          StatutContrat: string
        }
        Update: {
          ConditionEchange?: string
          DateDebutContrat?: string
          DateFinContrat?: string
          IDAidant?: number | null
          IDContratCohabitation?: number
          IDLogementSenior?: number | null
          ReglesMaison?: string
          StatutContrat?: string
        }
        Relationships: [
          {
            foreignKeyName: "ContratCohabitation_IDAidant_fkey"
            columns: ["IDAidant"]
            isOneToOne: false
            referencedRelation: "Aidant"
            referencedColumns: ["IDAidant"]
          },
          {
            foreignKeyName: "ContratCohabitation_IDAidant_fkey"
            columns: ["IDAidant"]
            isOneToOne: false
            referencedRelation: "prestations_dashboard_view"
            referencedColumns: ["IDAidant"]
          },
          {
            foreignKeyName: "ContratCohabitation_IDLogementSenior_fkey"
            columns: ["IDLogementSenior"]
            isOneToOne: false
            referencedRelation: "LogementSenior"
            referencedColumns: ["IDLogementSenior"]
          },
        ]
      }
      DemandeRGPD: {
        Row: {
          DateDemande: string
          DateEcheance: string | null
          DateTraitement: string | null
          IDDemandeRGPD: number
          IDUtilisateurs: number | null
          Statut: string
          TraitePar: number | null
          TypeDemande: string
        }
        Insert: {
          DateDemande?: string
          DateEcheance?: string | null
          DateTraitement?: string | null
          IDDemandeRGPD?: number
          IDUtilisateurs?: number | null
          Statut?: string
          TraitePar?: number | null
          TypeDemande: string
        }
        Update: {
          DateDemande?: string
          DateEcheance?: string | null
          DateTraitement?: string | null
          IDDemandeRGPD?: number
          IDUtilisateurs?: number | null
          Statut?: string
          TraitePar?: number | null
          TypeDemande?: string
        }
        Relationships: [
          {
            foreignKeyName: "DemandeRGPD_IDUtilisateurs_fkey"
            columns: ["IDUtilisateurs"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
          {
            foreignKeyName: "DemandeRGPD_TraitePar_fkey"
            columns: ["TraitePar"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
        ]
      }
      Devise: {
        Row: {
          IDDevise: number
          Titre: string
        }
        Insert: {
          IDDevise?: number
          Titre: string
        }
        Update: {
          IDDevise?: number
          Titre?: string
        }
        Relationships: []
      }
      Devise_Utilisateurs: {
        Row: {
          IDDevise: number | null
          IDUtilisateurs: number | null
        }
        Insert: {
          IDDevise?: number | null
          IDUtilisateurs?: number | null
        }
        Update: {
          IDDevise?: number | null
          IDUtilisateurs?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Devise_Utilisateurs_IDDevise_fkey"
            columns: ["IDDevise"]
            isOneToOne: false
            referencedRelation: "Devise"
            referencedColumns: ["IDDevise"]
          },
          {
            foreignKeyName: "Devise_Utilisateurs_IDUtilisateurs_fkey"
            columns: ["IDUtilisateurs"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
        ]
      }
      DirectivesAnticipees: {
        Row: {
          ContenuDirective: string
          DateRedaction: string
          IDDirectivesAnticipees: number
          IDSeniors: number | null
          StatutDirective: string
          Temoin: string
          TypeDirective: string
        }
        Insert: {
          ContenuDirective: string
          DateRedaction: string
          IDDirectivesAnticipees?: number
          IDSeniors?: number | null
          StatutDirective: string
          Temoin: string
          TypeDirective: string
        }
        Update: {
          ContenuDirective?: string
          DateRedaction?: string
          IDDirectivesAnticipees?: number
          IDSeniors?: number | null
          StatutDirective?: string
          Temoin?: string
          TypeDirective?: string
        }
        Relationships: [
          {
            foreignKeyName: "DirectivesAnticipees_IDSeniors_fkey"
            columns: ["IDSeniors"]
            isOneToOne: false
            referencedRelation: "prestations_dashboard_view"
            referencedColumns: ["IDSeniors"]
          },
          {
            foreignKeyName: "DirectivesAnticipees_IDSeniors_fkey"
            columns: ["IDSeniors"]
            isOneToOne: false
            referencedRelation: "Seniors"
            referencedColumns: ["IDSeniors"]
          },
        ]
      }
      Document: {
        Row: {
          DateUpload: string
          IDCategorieDocument: number | null
          IDDocument: number
          IDUtilisateurs: number | null
          Statut: string
          TailleFichier: number | null
          Titre: string
          TypeFichier: string
          URLFichier: string
        }
        Insert: {
          DateUpload?: string
          IDCategorieDocument?: number | null
          IDDocument?: number
          IDUtilisateurs?: number | null
          Statut?: string
          TailleFichier?: number | null
          Titre: string
          TypeFichier: string
          URLFichier: string
        }
        Update: {
          DateUpload?: string
          IDCategorieDocument?: number | null
          IDDocument?: number
          IDUtilisateurs?: number | null
          Statut?: string
          TailleFichier?: number | null
          Titre?: string
          TypeFichier?: string
          URLFichier?: string
        }
        Relationships: [
          {
            foreignKeyName: "Document_IDCategorieDocument_fkey"
            columns: ["IDCategorieDocument"]
            isOneToOne: false
            referencedRelation: "CategorieDocument"
            referencedColumns: ["IDCategorieDocument"]
          },
          {
            foreignKeyName: "Document_IDUtilisateurs_fkey"
            columns: ["IDUtilisateurs"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
        ]
      }
      DocumentPatrimonial: {
        Row: {
          dateCreation: string | null
          IDDocumentPatrimonial: number
          IDSeniors: number | null
          TypeDocument: string
          URLDocument: string
        }
        Insert: {
          dateCreation?: string | null
          IDDocumentPatrimonial?: number
          IDSeniors?: number | null
          TypeDocument: string
          URLDocument: string
        }
        Update: {
          dateCreation?: string | null
          IDDocumentPatrimonial?: number
          IDSeniors?: number | null
          TypeDocument?: string
          URLDocument?: string
        }
        Relationships: [
          {
            foreignKeyName: "DocumentPatrimonial_IDSeniors_fkey"
            columns: ["IDSeniors"]
            isOneToOne: false
            referencedRelation: "prestations_dashboard_view"
            referencedColumns: ["IDSeniors"]
          },
          {
            foreignKeyName: "DocumentPatrimonial_IDSeniors_fkey"
            columns: ["IDSeniors"]
            isOneToOne: false
            referencedRelation: "Seniors"
            referencedColumns: ["IDSeniors"]
          },
        ]
      }
      DocumentRGPD: {
        Row: {
          DateMiseAJour: string
          IDDocumentRGPD: number
          Titre: string
          TypeDoc: string
          URLFichier: string
        }
        Insert: {
          DateMiseAJour?: string
          IDDocumentRGPD?: number
          Titre: string
          TypeDoc: string
          URLFichier: string
        }
        Update: {
          DateMiseAJour?: string
          IDDocumentRGPD?: number
          Titre?: string
          TypeDoc?: string
          URLFichier?: string
        }
        Relationships: []
      }
      Domaine: {
        Row: {
          DomaineTitre: string
          IDDomaine: number
        }
        Insert: {
          DomaineTitre: string
          IDDomaine?: number
        }
        Update: {
          DomaineTitre?: string
          IDDomaine?: number
        }
        Relationships: []
      }
      DonCagnotte: {
        Row: {
          DateDon: string
          IDCagnotteDeces: number | null
          IDDonateur: number | null
          IDDonCagnotte: number
          MessageDon: string
          Montant: number
        }
        Insert: {
          DateDon: string
          IDCagnotteDeces?: number | null
          IDDonateur?: number | null
          IDDonCagnotte?: number
          MessageDon: string
          Montant?: number
        }
        Update: {
          DateDon?: string
          IDCagnotteDeces?: number | null
          IDDonateur?: number | null
          IDDonCagnotte?: number
          MessageDon?: string
          Montant?: number
        }
        Relationships: [
          {
            foreignKeyName: "DonCagnotte_IDCagnotteDeces_fkey"
            columns: ["IDCagnotteDeces"]
            isOneToOne: false
            referencedRelation: "CagnotteDeces"
            referencedColumns: ["IDCagnotteDeces"]
          },
          {
            foreignKeyName: "DonCagnotte_IDDonateur_fkey"
            columns: ["IDDonateur"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
        ]
      }
      EquipementMedical: {
        Row: {
          Caracteristiques: string
          IDEquipementMedical: number
          IDProduit: number | null
          Marque: string
          ModeEmploi: string
          Modele: string
          TypeEquipement: string
        }
        Insert: {
          Caracteristiques: string
          IDEquipementMedical?: number
          IDProduit?: number | null
          Marque: string
          ModeEmploi: string
          Modele: string
          TypeEquipement: string
        }
        Update: {
          Caracteristiques?: string
          IDEquipementMedical?: number
          IDProduit?: number | null
          Marque?: string
          ModeEmploi?: string
          Modele?: string
          TypeEquipement?: string
        }
        Relationships: [
          {
            foreignKeyName: "EquipementMedical_IDProduit_fkey"
            columns: ["IDProduit"]
            isOneToOne: false
            referencedRelation: "Produit"
            referencedColumns: ["IDProduit"]
          },
        ]
      }
      Evaluation: {
        Row: {
          Commentaire: string
          DateEvaluation: string
          IDCommande: number | null
          IDEvaluation: number
          IDMiseEnRelation: number | null
          IDProduit: number | null
          IDUtilisateurs: number | null
          Note: number
        }
        Insert: {
          Commentaire: string
          DateEvaluation: string
          IDCommande?: number | null
          IDEvaluation?: number
          IDMiseEnRelation?: number | null
          IDProduit?: number | null
          IDUtilisateurs?: number | null
          Note?: number
        }
        Update: {
          Commentaire?: string
          DateEvaluation?: string
          IDCommande?: number | null
          IDEvaluation?: number
          IDMiseEnRelation?: number | null
          IDProduit?: number | null
          IDUtilisateurs?: number | null
          Note?: number
        }
        Relationships: [
          {
            foreignKeyName: "Evaluation_IDCommande_fkey"
            columns: ["IDCommande"]
            isOneToOne: false
            referencedRelation: "Commande"
            referencedColumns: ["IDCommande"]
          },
          {
            foreignKeyName: "Evaluation_IDMiseEnRelation_fkey"
            columns: ["IDMiseEnRelation"]
            isOneToOne: false
            referencedRelation: "MiseEnRelation"
            referencedColumns: ["IDMiseEnRelation"]
          },
          {
            foreignKeyName: "Evaluation_IDProduit_fkey"
            columns: ["IDProduit"]
            isOneToOne: false
            referencedRelation: "Produit"
            referencedColumns: ["IDProduit"]
          },
          {
            foreignKeyName: "Evaluation_IDUtilisateurs_fkey"
            columns: ["IDUtilisateurs"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
        ]
      }
      EvaluationCohabitation: {
        Row: {
          CommentaireCohabitation: string
          DateEvaluation: string
          IDContratCohabitation: number | null
          IDEvaluateur: number | null
          IDEvaluationCohabitation: number
          NoteCohabitation: number
        }
        Insert: {
          CommentaireCohabitation: string
          DateEvaluation: string
          IDContratCohabitation?: number | null
          IDEvaluateur?: number | null
          IDEvaluationCohabitation?: number
          NoteCohabitation?: number
        }
        Update: {
          CommentaireCohabitation?: string
          DateEvaluation?: string
          IDContratCohabitation?: number | null
          IDEvaluateur?: number | null
          IDEvaluationCohabitation?: number
          NoteCohabitation?: number
        }
        Relationships: [
          {
            foreignKeyName: "EvaluationCohabitation_IDContratCohabitation_fkey"
            columns: ["IDContratCohabitation"]
            isOneToOne: false
            referencedRelation: "ContratCohabitation"
            referencedColumns: ["IDContratCohabitation"]
          },
          {
            foreignKeyName: "EvaluationCohabitation_IDEvaluateur_fkey"
            columns: ["IDEvaluateur"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
        ]
      }
      Evenements: {
        Row: {
          DateDebut: string
          DateFin: string
          Description: string
          estImportant: boolean
          IDAgenda: number | null
          IDEvenements: number
          Lieu: string
          Rappel: boolean
          Titre: string
        }
        Insert: {
          DateDebut: string
          DateFin: string
          Description: string
          estImportant?: boolean
          IDAgenda?: number | null
          IDEvenements?: number
          Lieu: string
          Rappel?: boolean
          Titre: string
        }
        Update: {
          DateDebut?: string
          DateFin?: string
          Description?: string
          estImportant?: boolean
          IDAgenda?: number | null
          IDEvenements?: number
          Lieu?: string
          Rappel?: boolean
          Titre?: string
        }
        Relationships: [
          {
            foreignKeyName: "Evenements_IDAgenda_fkey"
            columns: ["IDAgenda"]
            isOneToOne: false
            referencedRelation: "Agenda"
            referencedColumns: ["IDAgenda"]
          },
        ]
      }
      Facture: {
        Row: {
          DateEmission: string
          IDCommande: number | null
          IDFacture: number
          IDMiseEnRelation_IDPrestation: number | null
          MontantTotal: number
          TVA: number
        }
        Insert: {
          DateEmission: string
          IDCommande?: number | null
          IDFacture?: number
          IDMiseEnRelation_IDPrestation?: number | null
          MontantTotal?: number
          TVA?: number
        }
        Update: {
          DateEmission?: string
          IDCommande?: number | null
          IDFacture?: number
          IDMiseEnRelation_IDPrestation?: number | null
          MontantTotal?: number
          TVA?: number
        }
        Relationships: [
          {
            foreignKeyName: "Facture_IDCommande_fkey"
            columns: ["IDCommande"]
            isOneToOne: false
            referencedRelation: "Commande"
            referencedColumns: ["IDCommande"]
          },
          {
            foreignKeyName: "Facture_IDMiseEnRelation_IDPrestation_fkey"
            columns: ["IDMiseEnRelation_IDPrestation"]
            isOneToOne: false
            referencedRelation: "MiseEnRelation_Prestation"
            referencedColumns: ["IDMiseEnRelation_IDPrestation"]
          },
        ]
      }
      Forum: {
        Row: {
          Categorie: string
          DateCreationForum: string
          DescriptionForum: string
          estPublic: boolean
          IDCreateur: number | null
          IDForum: number
          TitreForum: string
        }
        Insert: {
          Categorie: string
          DateCreationForum: string
          DescriptionForum: string
          estPublic?: boolean
          IDCreateur?: number | null
          IDForum?: number
          TitreForum: string
        }
        Update: {
          Categorie?: string
          DateCreationForum?: string
          DescriptionForum?: string
          estPublic?: boolean
          IDCreateur?: number | null
          IDForum?: number
          TitreForum?: string
        }
        Relationships: [
          {
            foreignKeyName: "Forum_IDCreateur_fkey"
            columns: ["IDCreateur"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
        ]
      }
      Groupe: {
        Row: {
          DateCreation: string
          Description: string
          IDGroupe: number
          IDUtilisateursCreateur: number | null
          Titre: string
        }
        Insert: {
          DateCreation: string
          Description: string
          IDGroupe?: number
          IDUtilisateursCreateur?: number | null
          Titre: string
        }
        Update: {
          DateCreation?: string
          Description?: string
          IDGroupe?: number
          IDUtilisateursCreateur?: number | null
          Titre?: string
        }
        Relationships: [
          {
            foreignKeyName: "Groupe_IDUtilisateursCreateur_fkey"
            columns: ["IDUtilisateursCreateur"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
        ]
      }
      HistoriqueConnexion: {
        Row: {
          DateConnexion: string
          IDHistoriqueConnexion: number
          IDUtilisateurs: number | null
          IP: string
          Navigateur: string
        }
        Insert: {
          DateConnexion: string
          IDHistoriqueConnexion?: number
          IDUtilisateurs?: number | null
          IP: string
          Navigateur: string
        }
        Update: {
          DateConnexion?: string
          IDHistoriqueConnexion?: number
          IDUtilisateurs?: number | null
          IP?: string
          Navigateur?: string
        }
        Relationships: [
          {
            foreignKeyName: "HistoriqueConnexion_IDUtilisateurs_fkey"
            columns: ["IDUtilisateurs"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
        ]
      }
      HistoriqueInteractions: {
        Row: {
          IDHistoriqueInteractions: number
          IDUtilisateurs: number | null
        }
        Insert: {
          IDHistoriqueInteractions?: number
          IDUtilisateurs?: number | null
        }
        Update: {
          IDHistoriqueInteractions?: number
          IDUtilisateurs?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "HistoriqueInteractions_IDUtilisateurs_fkey"
            columns: ["IDUtilisateurs"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
        ]
      }
      Humeur: {
        Row: {
          Commentaire: string
          DateHumeur: string
          IDHumeur: number
          IDSeniors: number | null
          Ressenti: string
        }
        Insert: {
          Commentaire: string
          DateHumeur: string
          IDHumeur?: number
          IDSeniors?: number | null
          Ressenti: string
        }
        Update: {
          Commentaire?: string
          DateHumeur?: string
          IDHumeur?: number
          IDSeniors?: number | null
          Ressenti?: string
        }
        Relationships: [
          {
            foreignKeyName: "Humeur_IDSeniors_fkey"
            columns: ["IDSeniors"]
            isOneToOne: false
            referencedRelation: "prestations_dashboard_view"
            referencedColumns: ["IDSeniors"]
          },
          {
            foreignKeyName: "Humeur_IDSeniors_fkey"
            columns: ["IDSeniors"]
            isOneToOne: false
            referencedRelation: "Seniors"
            referencedColumns: ["IDSeniors"]
          },
        ]
      }
      Langue: {
        Row: {
          IDLangue: number
          Titre: string
        }
        Insert: {
          IDLangue?: number
          Titre: string
        }
        Update: {
          IDLangue?: number
          Titre?: string
        }
        Relationships: []
      }
      Langue_Utilisateurs: {
        Row: {
          IDLangue: number | null
          IDUtilisateurs: number | null
          NiveauLangue: number
        }
        Insert: {
          IDLangue?: number | null
          IDUtilisateurs?: number | null
          NiveauLangue?: number
        }
        Update: {
          IDLangue?: number | null
          IDUtilisateurs?: number | null
          NiveauLangue?: number
        }
        Relationships: [
          {
            foreignKeyName: "Langue_Utilisateurs_IDLangue_fkey"
            columns: ["IDLangue"]
            isOneToOne: false
            referencedRelation: "Langue"
            referencedColumns: ["IDLangue"]
          },
          {
            foreignKeyName: "Langue_Utilisateurs_IDUtilisateurs_fkey"
            columns: ["IDUtilisateurs"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
        ]
      }
      LienPartenariat: {
        Row: {
          Avantage: string
          IDLienPartenariat: number
          IDOrganisme: number | null
          Titre: string
        }
        Insert: {
          Avantage: string
          IDLienPartenariat?: number
          IDOrganisme?: number | null
          Titre: string
        }
        Update: {
          Avantage?: string
          IDLienPartenariat?: number
          IDOrganisme?: number | null
          Titre?: string
        }
        Relationships: [
          {
            foreignKeyName: "LienPartenariat_IDOrganisme_fkey"
            columns: ["IDOrganisme"]
            isOneToOne: false
            referencedRelation: "Organisme"
            referencedColumns: ["IDOrganisme"]
          },
        ]
      }
      Localisation: {
        Row: {
          Adresse: string
          CodePostal: string
          IDLocalisation: number
          Latitude: number
          Longitude: number
          Pays: string
          Ville: string
        }
        Insert: {
          Adresse: string
          CodePostal: string
          IDLocalisation?: number
          Latitude?: number
          Longitude?: number
          Pays: string
          Ville: string
        }
        Update: {
          Adresse?: string
          CodePostal?: string
          IDLocalisation?: number
          Latitude?: number
          Longitude?: number
          Pays?: string
          Ville?: string
        }
        Relationships: []
      }
      LogementSenior: {
        Row: {
          Conditions: string
          Disponible: boolean
          IDLogementSenior: number
          IDSeniors: number | null
          NbChambres: string
          Surface: string
        }
        Insert: {
          Conditions: string
          Disponible?: boolean
          IDLogementSenior?: number
          IDSeniors?: number | null
          NbChambres: string
          Surface: string
        }
        Update: {
          Conditions?: string
          Disponible?: boolean
          IDLogementSenior?: number
          IDSeniors?: number | null
          NbChambres?: string
          Surface?: string
        }
        Relationships: [
          {
            foreignKeyName: "LogementSenior_IDSeniors_fkey"
            columns: ["IDSeniors"]
            isOneToOne: false
            referencedRelation: "prestations_dashboard_view"
            referencedColumns: ["IDSeniors"]
          },
          {
            foreignKeyName: "LogementSenior_IDSeniors_fkey"
            columns: ["IDSeniors"]
            isOneToOne: false
            referencedRelation: "Seniors"
            referencedColumns: ["IDSeniors"]
          },
        ]
      }
      Medicament: {
        Row: {
          DateDebutTraitement: string
          DateFinTraitement: string
          DatePeremption: string
          FrequenceJournalier: number
          IDMedicament: number
          IDSeniors: number | null
          NomMedicament: string
          Posologie: string
          RappelActif: string
        }
        Insert: {
          DateDebutTraitement: string
          DateFinTraitement: string
          DatePeremption: string
          FrequenceJournalier?: number
          IDMedicament?: number
          IDSeniors?: number | null
          NomMedicament: string
          Posologie: string
          RappelActif: string
        }
        Update: {
          DateDebutTraitement?: string
          DateFinTraitement?: string
          DatePeremption?: string
          FrequenceJournalier?: number
          IDMedicament?: number
          IDSeniors?: number | null
          NomMedicament?: string
          Posologie?: string
          RappelActif?: string
        }
        Relationships: [
          {
            foreignKeyName: "Medicament_IDSeniors_fkey"
            columns: ["IDSeniors"]
            isOneToOne: false
            referencedRelation: "prestations_dashboard_view"
            referencedColumns: ["IDSeniors"]
          },
          {
            foreignKeyName: "Medicament_IDSeniors_fkey"
            columns: ["IDSeniors"]
            isOneToOne: false
            referencedRelation: "Seniors"
            referencedColumns: ["IDSeniors"]
          },
        ]
      }
      MessageGroupe: {
        Row: {
          Contenu: string
          DateEnvoi: string
          IDGroupe: number | null
          IDMessageGroupe: number
          IDUtilisateurs: number | null
        }
        Insert: {
          Contenu: string
          DateEnvoi: string
          IDGroupe?: number | null
          IDMessageGroupe?: number
          IDUtilisateurs?: number | null
        }
        Update: {
          Contenu?: string
          DateEnvoi?: string
          IDGroupe?: number | null
          IDMessageGroupe?: number
          IDUtilisateurs?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "MessageGroupe_IDGroupe_fkey"
            columns: ["IDGroupe"]
            isOneToOne: false
            referencedRelation: "Groupe"
            referencedColumns: ["IDGroupe"]
          },
          {
            foreignKeyName: "MessageGroupe_IDUtilisateurs_fkey"
            columns: ["IDUtilisateurs"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
        ]
      }
      MiseEnRelation: {
        Row: {
          DatePaiement: string
          DatePrestation: string
          DateRefusPaiement: string
          DurePrestation: number
          IDAidant: number | null
          IDCommande: number | null
          IDMiseEnRelation: number
          IDMoyenPaiement: number | null
          IDPartenairePayeur: number | null
          IDPrestation: number | null
          IDSeniors: number | null
          IDUtilisateurPayeur: number | null
          Statut: string
          TarifPreste: number
        }
        Insert: {
          DatePaiement: string
          DatePrestation: string
          DateRefusPaiement: string
          DurePrestation?: number
          IDAidant?: number | null
          IDCommande?: number | null
          IDMiseEnRelation?: number
          IDMoyenPaiement?: number | null
          IDPartenairePayeur?: number | null
          IDPrestation?: number | null
          IDSeniors?: number | null
          IDUtilisateurPayeur?: number | null
          Statut?: string
          TarifPreste?: number
        }
        Update: {
          DatePaiement?: string
          DatePrestation?: string
          DateRefusPaiement?: string
          DurePrestation?: number
          IDAidant?: number | null
          IDCommande?: number | null
          IDMiseEnRelation?: number
          IDMoyenPaiement?: number | null
          IDPartenairePayeur?: number | null
          IDPrestation?: number | null
          IDSeniors?: number | null
          IDUtilisateurPayeur?: number | null
          Statut?: string
          TarifPreste?: number
        }
        Relationships: [
          {
            foreignKeyName: "MiseEnRelation_IDAidant_fkey"
            columns: ["IDAidant"]
            isOneToOne: false
            referencedRelation: "Aidant"
            referencedColumns: ["IDAidant"]
          },
          {
            foreignKeyName: "MiseEnRelation_IDAidant_fkey"
            columns: ["IDAidant"]
            isOneToOne: false
            referencedRelation: "prestations_dashboard_view"
            referencedColumns: ["IDAidant"]
          },
          {
            foreignKeyName: "miseenrelation_idcommande_fkey"
            columns: ["IDCommande"]
            isOneToOne: false
            referencedRelation: "Commande"
            referencedColumns: ["IDCommande"]
          },
          {
            foreignKeyName: "MiseEnRelation_IDMoyenPaiement_fkey"
            columns: ["IDMoyenPaiement"]
            isOneToOne: false
            referencedRelation: "MoyenPaiement"
            referencedColumns: ["IDMoyenPaiement"]
          },
          {
            foreignKeyName: "MiseEnRelation_IDPartenairePayeur_fkey"
            columns: ["IDPartenairePayeur"]
            isOneToOne: false
            referencedRelation: "Partenaire"
            referencedColumns: ["IDPartenaire"]
          },
          {
            foreignKeyName: "MiseEnRelation_IDSeniors_fkey"
            columns: ["IDSeniors"]
            isOneToOne: false
            referencedRelation: "prestations_dashboard_view"
            referencedColumns: ["IDSeniors"]
          },
          {
            foreignKeyName: "MiseEnRelation_IDSeniors_fkey"
            columns: ["IDSeniors"]
            isOneToOne: false
            referencedRelation: "Seniors"
            referencedColumns: ["IDSeniors"]
          },
          {
            foreignKeyName: "MiseEnRelation_IDUtilisateurPayeur_fkey"
            columns: ["IDUtilisateurPayeur"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
        ]
      }
      MiseEnRelation_Prestation: {
        Row: {
          IDMiseEnRelation: number | null
          IDMiseEnRelation_IDPrestation: number
          IDPrestation: number | null
        }
        Insert: {
          IDMiseEnRelation?: number | null
          IDMiseEnRelation_IDPrestation?: number
          IDPrestation?: number | null
        }
        Update: {
          IDMiseEnRelation?: number | null
          IDMiseEnRelation_IDPrestation?: number
          IDPrestation?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "MiseEnRelation_Prestation_IDMiseEnRelation_fkey"
            columns: ["IDMiseEnRelation"]
            isOneToOne: false
            referencedRelation: "MiseEnRelation"
            referencedColumns: ["IDMiseEnRelation"]
          },
          {
            foreignKeyName: "MiseEnRelation_Prestation_IDPrestation_fkey"
            columns: ["IDPrestation"]
            isOneToOne: false
            referencedRelation: "Prestation"
            referencedColumns: ["IDPrestation"]
          },
          {
            foreignKeyName: "MiseEnRelation_Prestation_IDPrestation_fkey"
            columns: ["IDPrestation"]
            isOneToOne: false
            referencedRelation: "prestations_dashboard_view"
            referencedColumns: ["id"]
          },
        ]
      }
      MoyenPaiement: {
        Row: {
          DatePaiement: string
          IDMoyenPaiement: number
          MoyenPaiement: string
        }
        Insert: {
          DatePaiement: string
          IDMoyenPaiement?: number
          MoyenPaiement: string
        }
        Update: {
          DatePaiement?: string
          IDMoyenPaiement?: number
          MoyenPaiement?: string
        }
        Relationships: []
      }
      Notifications: {
        Row: {
          Cible: string | null
          DateCreation: string
          EstLu: boolean
          IDNotifications: number
          IDUtilisateurDestinataire: number | null
          IDUtilisateurOrigine: number | null
          Message: string
          Titre: string
          TypeNotification: string
        }
        Insert: {
          Cible?: string | null
          DateCreation?: string
          EstLu?: boolean
          IDNotifications?: number
          IDUtilisateurDestinataire?: number | null
          IDUtilisateurOrigine?: number | null
          Message?: string
          Titre?: string
          TypeNotification?: string
        }
        Update: {
          Cible?: string | null
          DateCreation?: string
          EstLu?: boolean
          IDNotifications?: number
          IDUtilisateurDestinataire?: number | null
          IDUtilisateurOrigine?: number | null
          Message?: string
          Titre?: string
          TypeNotification?: string
        }
        Relationships: [
          {
            foreignKeyName: "Notifications_IDUtilisateurDestinataire_fkey"
            columns: ["IDUtilisateurDestinataire"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
          {
            foreignKeyName: "Notifications_IDUtilisateurOrigine_fkey"
            columns: ["IDUtilisateurOrigine"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
        ]
      }
      ObjetPrete: {
        Row: {
          DatePret: string
          DateRetourEffective: string
          DateRetourPrevu: string
          EtatObjet: string
          IDEmprunteurUtilisateur: number | null
          IDObjetPrete: number
          IDProprietaireUtilisateur: number | null
          nomObjet: string
        }
        Insert: {
          DatePret: string
          DateRetourEffective: string
          DateRetourPrevu: string
          EtatObjet: string
          IDEmprunteurUtilisateur?: number | null
          IDObjetPrete?: number
          IDProprietaireUtilisateur?: number | null
          nomObjet: string
        }
        Update: {
          DatePret?: string
          DateRetourEffective?: string
          DateRetourPrevu?: string
          EtatObjet?: string
          IDEmprunteurUtilisateur?: number | null
          IDObjetPrete?: number
          IDProprietaireUtilisateur?: number | null
          nomObjet?: string
        }
        Relationships: [
          {
            foreignKeyName: "ObjetPrete_IDEmprunteurUtilisateur_fkey"
            columns: ["IDEmprunteurUtilisateur"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
          {
            foreignKeyName: "ObjetPrete_IDProprietaireUtilisateur_fkey"
            columns: ["IDProprietaireUtilisateur"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
        ]
      }
      OffreSenior: {
        Row: {
          DateOffre: string
          Description: string
          Disponible: boolean
          IDOffreSenior: number
          IDSeniors: number | null
          Titre: string
          TypeOffre: string
        }
        Insert: {
          DateOffre: string
          Description: string
          Disponible?: boolean
          IDOffreSenior?: number
          IDSeniors?: number | null
          Titre: string
          TypeOffre: string
        }
        Update: {
          DateOffre?: string
          Description?: string
          Disponible?: boolean
          IDOffreSenior?: number
          IDSeniors?: number | null
          Titre?: string
          TypeOffre?: string
        }
        Relationships: [
          {
            foreignKeyName: "OffreSenior_IDSeniors_fkey"
            columns: ["IDSeniors"]
            isOneToOne: false
            referencedRelation: "prestations_dashboard_view"
            referencedColumns: ["IDSeniors"]
          },
          {
            foreignKeyName: "OffreSenior_IDSeniors_fkey"
            columns: ["IDSeniors"]
            isOneToOne: false
            referencedRelation: "Seniors"
            referencedColumns: ["IDSeniors"]
          },
        ]
      }
      Organisme: {
        Row: {
          Adresse: string
          Email: string
          IDCategorieOrganisme: number | null
          IDOrganisme: number
          Nom: string
          Telephone: string
          TypePartenaire: string
        }
        Insert: {
          Adresse: string
          Email: string
          IDCategorieOrganisme?: number | null
          IDOrganisme?: number
          Nom: string
          Telephone: string
          TypePartenaire: string
        }
        Update: {
          Adresse?: string
          Email?: string
          IDCategorieOrganisme?: number | null
          IDOrganisme?: number
          Nom?: string
          Telephone?: string
          TypePartenaire?: string
        }
        Relationships: [
          {
            foreignKeyName: "Organisme_IDCategorieOrganisme_fkey"
            columns: ["IDCategorieOrganisme"]
            isOneToOne: false
            referencedRelation: "CategorieOrganisme"
            referencedColumns: ["IDCategorieOrganisme"]
          },
        ]
      }
      Parametres: {
        Row: {
          IDParametres: number
          IDUtilisateurs: number | null
        }
        Insert: {
          IDParametres?: number
          IDUtilisateurs?: number | null
        }
        Update: {
          IDParametres?: number
          IDUtilisateurs?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Parametres_IDUtilisateurs_fkey"
            columns: ["IDUtilisateurs"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
        ]
      }
      ParametresCommission: {
        Row: {
          IDParametreCommission: number
          Pourcentage: number
          TypeTransaction: string
        }
        Insert: {
          IDParametreCommission?: number
          Pourcentage?: number
          TypeTransaction: string
        }
        Update: {
          IDParametreCommission?: number
          Pourcentage?: number
          TypeTransaction?: string
        }
        Relationships: []
      }
      Partenaire: {
        Row: {
          Adresse: string
          DateInscription: string
          Email: string
          IDCatUtilisateurs: number | null
          IDPartenaire: number
          RaisonSociale: string
          Telephone: string
        }
        Insert: {
          Adresse: string
          DateInscription?: string
          Email: string
          IDCatUtilisateurs?: number | null
          IDPartenaire?: number
          RaisonSociale: string
          Telephone: string
        }
        Update: {
          Adresse?: string
          DateInscription?: string
          Email?: string
          IDCatUtilisateurs?: number | null
          IDPartenaire?: number
          RaisonSociale?: string
          Telephone?: string
        }
        Relationships: [
          {
            foreignKeyName: "Partenaire_IDCatUtilisateurs_fkey"
            columns: ["IDCatUtilisateurs"]
            isOneToOne: false
            referencedRelation: "CatUtilisateurs"
            referencedColumns: ["IDCatUtilisateurs"]
          },
        ]
      }
      Partenaire_Services: {
        Row: {
          IDPartenaire: number | null
          IDServicePartenaire: number | null
        }
        Insert: {
          IDPartenaire?: number | null
          IDServicePartenaire?: number | null
        }
        Update: {
          IDPartenaire?: number | null
          IDServicePartenaire?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Partenaire_Services_IDPartenaire_fkey"
            columns: ["IDPartenaire"]
            isOneToOne: false
            referencedRelation: "Partenaire"
            referencedColumns: ["IDPartenaire"]
          },
          {
            foreignKeyName: "Partenaire_Services_IDServicePartenaire_fkey"
            columns: ["IDServicePartenaire"]
            isOneToOne: false
            referencedRelation: "ServicePartenaire"
            referencedColumns: ["IDServicePartenaire"]
          },
        ]
      }
      Pieces: {
        Row: {
          DateCreation: string
          DateSuppression: string
          IDPieces: number
          IDUtilisateurs: number | null
          TypePiece: string | null
        }
        Insert: {
          DateCreation: string
          DateSuppression: string
          IDPieces?: number
          IDUtilisateurs?: number | null
          TypePiece?: string | null
        }
        Update: {
          DateCreation?: string
          DateSuppression?: string
          IDPieces?: number
          IDUtilisateurs?: number | null
          TypePiece?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Pieces_IDUtilisateurs_fkey"
            columns: ["IDUtilisateurs"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
          {
            foreignKeyName: "Pieces_TypePiece_fkey"
            columns: ["TypePiece"]
            isOneToOne: false
            referencedRelation: "TypePieces"
            referencedColumns: ["Titre"]
          },
        ]
      }
      Prestation: {
        Row: {
          DateCreation: string | null
          Description: string
          IDDomaine: number | null
          IDPrestation: number
          TarifIndicatif: number
          Titre: string
        }
        Insert: {
          DateCreation?: string | null
          Description: string
          IDDomaine?: number | null
          IDPrestation?: number
          TarifIndicatif?: number
          Titre: string
        }
        Update: {
          DateCreation?: string | null
          Description?: string
          IDDomaine?: number | null
          IDPrestation?: number
          TarifIndicatif?: number
          Titre?: string
        }
        Relationships: [
          {
            foreignKeyName: "Prestation_IDDomaine_fkey"
            columns: ["IDDomaine"]
            isOneToOne: false
            referencedRelation: "Domaine"
            referencedColumns: ["IDDomaine"]
          },
        ]
      }
      Prestation_Localisation: {
        Row: {
          IDLocalisation: number | null
          IDPrestation: number | null
        }
        Insert: {
          IDLocalisation?: number | null
          IDPrestation?: number | null
        }
        Update: {
          IDLocalisation?: number | null
          IDPrestation?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Prestation_Localisation_IDLocalisation_fkey"
            columns: ["IDLocalisation"]
            isOneToOne: false
            referencedRelation: "Localisation"
            referencedColumns: ["IDLocalisation"]
          },
          {
            foreignKeyName: "Prestation_Localisation_IDPrestation_fkey"
            columns: ["IDPrestation"]
            isOneToOne: false
            referencedRelation: "Prestation"
            referencedColumns: ["IDPrestation"]
          },
          {
            foreignKeyName: "Prestation_Localisation_IDPrestation_fkey"
            columns: ["IDPrestation"]
            isOneToOne: false
            referencedRelation: "prestations_dashboard_view"
            referencedColumns: ["id"]
          },
        ]
      }
      PrestationAidant: {
        Row: {
          commentaires: string
          DateProposition: string
          DelaiEstime: string
          IDAidant: number | null
          IDBesoinSenior: number | null
          IDPrestationAidant: number
          StatutProposition: string
        }
        Insert: {
          commentaires: string
          DateProposition: string
          DelaiEstime: string
          IDAidant?: number | null
          IDBesoinSenior?: number | null
          IDPrestationAidant?: number
          StatutProposition: string
        }
        Update: {
          commentaires?: string
          DateProposition?: string
          DelaiEstime?: string
          IDAidant?: number | null
          IDBesoinSenior?: number | null
          IDPrestationAidant?: number
          StatutProposition?: string
        }
        Relationships: [
          {
            foreignKeyName: "PrestationAidant_IDAidant_fkey"
            columns: ["IDAidant"]
            isOneToOne: false
            referencedRelation: "Aidant"
            referencedColumns: ["IDAidant"]
          },
          {
            foreignKeyName: "PrestationAidant_IDAidant_fkey"
            columns: ["IDAidant"]
            isOneToOne: false
            referencedRelation: "prestations_dashboard_view"
            referencedColumns: ["IDAidant"]
          },
          {
            foreignKeyName: "PrestationAidant_IDBesoinSenior_fkey"
            columns: ["IDBesoinSenior"]
            isOneToOne: false
            referencedRelation: "BesoinSenior"
            referencedColumns: ["IDBesoinSenior"]
          },
        ]
      }
      PrestationSupport: {
        Row: {
          IDIntervenant: number | null
          IDPrestationSupport: number
          IDTicketClient: number | null
        }
        Insert: {
          IDIntervenant?: number | null
          IDPrestationSupport?: number
          IDTicketClient?: number | null
        }
        Update: {
          IDIntervenant?: number | null
          IDPrestationSupport?: number
          IDTicketClient?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "PrestationSupport_IDIntervenant_fkey"
            columns: ["IDIntervenant"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
          {
            foreignKeyName: "PrestationSupport_IDTicketClient_fkey"
            columns: ["IDTicketClient"]
            isOneToOne: false
            referencedRelation: "support_dashboard_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "PrestationSupport_IDTicketClient_fkey"
            columns: ["IDTicketClient"]
            isOneToOne: false
            referencedRelation: "SupportClient"
            referencedColumns: ["IDTicketClient"]
          },
        ]
      }
      Produit: {
        Row: {
          Description: string
          estLouable: boolean
          IDProduit: number
          IDSeniorsVendeur: number | null
          Prix: number
          Stock: number
          Titre: string
          TypeProduit: string
        }
        Insert: {
          Description: string
          estLouable?: boolean
          IDProduit?: number
          IDSeniorsVendeur?: number | null
          Prix?: number
          Stock?: number
          Titre: string
          TypeProduit: string
        }
        Update: {
          Description?: string
          estLouable?: boolean
          IDProduit?: number
          IDSeniorsVendeur?: number | null
          Prix?: number
          Stock?: number
          Titre?: string
          TypeProduit?: string
        }
        Relationships: [
          {
            foreignKeyName: "Produit_IDSeniorsVendeur_fkey"
            columns: ["IDSeniorsVendeur"]
            isOneToOne: false
            referencedRelation: "prestations_dashboard_view"
            referencedColumns: ["IDSeniors"]
          },
          {
            foreignKeyName: "Produit_IDSeniorsVendeur_fkey"
            columns: ["IDSeniorsVendeur"]
            isOneToOne: false
            referencedRelation: "Seniors"
            referencedColumns: ["IDSeniors"]
          },
        ]
      }
      Produit_Commande: {
        Row: {
          IDCommande: number | null
          IDProduit: number | null
          PrixUnitaire: number
          Quantite: number
        }
        Insert: {
          IDCommande?: number | null
          IDProduit?: number | null
          PrixUnitaire?: number
          Quantite?: number
        }
        Update: {
          IDCommande?: number | null
          IDProduit?: number | null
          PrixUnitaire?: number
          Quantite?: number
        }
        Relationships: [
          {
            foreignKeyName: "Produit_Commande_IDCommande_fkey"
            columns: ["IDCommande"]
            isOneToOne: false
            referencedRelation: "Commande"
            referencedColumns: ["IDCommande"]
          },
          {
            foreignKeyName: "Produit_Commande_IDProduit_fkey"
            columns: ["IDProduit"]
            isOneToOne: false
            referencedRelation: "Produit"
            referencedColumns: ["IDProduit"]
          },
        ]
      }
      RapportMensuel: {
        Row: {
          DateRapport: string
          FichieJoint: string
          IDRapportMensuel: number
          IDRedacteur: number | null
          IDSeniors: number | null
          ResumeTexte: string
        }
        Insert: {
          DateRapport: string
          FichieJoint: string
          IDRapportMensuel?: number
          IDRedacteur?: number | null
          IDSeniors?: number | null
          ResumeTexte: string
        }
        Update: {
          DateRapport?: string
          FichieJoint?: string
          IDRapportMensuel?: number
          IDRedacteur?: number | null
          IDSeniors?: number | null
          ResumeTexte?: string
        }
        Relationships: [
          {
            foreignKeyName: "RapportMensuel_IDRedacteur_fkey"
            columns: ["IDRedacteur"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
          {
            foreignKeyName: "RapportMensuel_IDSeniors_fkey"
            columns: ["IDSeniors"]
            isOneToOne: false
            referencedRelation: "prestations_dashboard_view"
            referencedColumns: ["IDSeniors"]
          },
          {
            foreignKeyName: "RapportMensuel_IDSeniors_fkey"
            columns: ["IDSeniors"]
            isOneToOne: false
            referencedRelation: "Seniors"
            referencedColumns: ["IDSeniors"]
          },
        ]
      }
      RendezVousMedical: {
        Row: {
          AdresseRDV: string
          DateRDV: string
          HeureRDV: string
          IDRendezVousMedical: number
          IDSeniors: number | null
          NomMedecin: string
          RappelEnvoye: boolean
          StatutRDV: string
          TypeRDV: string
        }
        Insert: {
          AdresseRDV: string
          DateRDV: string
          HeureRDV: string
          IDRendezVousMedical?: number
          IDSeniors?: number | null
          NomMedecin: string
          RappelEnvoye?: boolean
          StatutRDV: string
          TypeRDV: string
        }
        Update: {
          AdresseRDV?: string
          DateRDV?: string
          HeureRDV?: string
          IDRendezVousMedical?: number
          IDSeniors?: number | null
          NomMedecin?: string
          RappelEnvoye?: boolean
          StatutRDV?: string
          TypeRDV?: string
        }
        Relationships: [
          {
            foreignKeyName: "RendezVousMedical_IDSeniors_fkey"
            columns: ["IDSeniors"]
            isOneToOne: false
            referencedRelation: "prestations_dashboard_view"
            referencedColumns: ["IDSeniors"]
          },
          {
            foreignKeyName: "RendezVousMedical_IDSeniors_fkey"
            columns: ["IDSeniors"]
            isOneToOne: false
            referencedRelation: "Seniors"
            referencedColumns: ["IDSeniors"]
          },
        ]
      }
      ReponseForum: {
        Row: {
          ContenuReponse: string
          DateReponse: string
          IDReponseForum: number
          IDSujetForum: number | null
          IDUtilisateurs: number | null
        }
        Insert: {
          ContenuReponse: string
          DateReponse: string
          IDReponseForum?: number
          IDSujetForum?: number | null
          IDUtilisateurs?: number | null
        }
        Update: {
          ContenuReponse?: string
          DateReponse?: string
          IDReponseForum?: number
          IDSujetForum?: number | null
          IDUtilisateurs?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ReponseForum_IDSujetForum_fkey"
            columns: ["IDSujetForum"]
            isOneToOne: false
            referencedRelation: "SujetForum"
            referencedColumns: ["IDSujetForum"]
          },
          {
            foreignKeyName: "ReponseForum_IDSujetForum_fkey"
            columns: ["IDSujetForum"]
            isOneToOne: false
            referencedRelation: "v_forum_posts_moderation"
            referencedColumns: ["IDSujetForum"]
          },
          {
            foreignKeyName: "ReponseForum_IDUtilisateurs_fkey"
            columns: ["IDUtilisateurs"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
        ]
      }
      ReponsesSupport: {
        Row: {
          Contenu: string
          DateReponse: string
          FichierJoint: string | null
          IDAuteur: number
          IDReponse: number
          IDTicketClient: number
        }
        Insert: {
          Contenu: string
          DateReponse?: string
          FichierJoint?: string | null
          IDAuteur: number
          IDReponse?: number
          IDTicketClient: number
        }
        Update: {
          Contenu?: string
          DateReponse?: string
          FichierJoint?: string | null
          IDAuteur?: number
          IDReponse?: number
          IDTicketClient?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_auteur"
            columns: ["IDAuteur"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
          {
            foreignKeyName: "fk_ticket"
            columns: ["IDTicketClient"]
            isOneToOne: false
            referencedRelation: "support_dashboard_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_ticket"
            columns: ["IDTicketClient"]
            isOneToOne: false
            referencedRelation: "SupportClient"
            referencedColumns: ["IDTicketClient"]
          },
        ]
      }
      Ressource: {
        Row: {
          Description: string
          IDCategorieRessource: number | null
          IDRessource: number
          Lien: string
          Titre: string
          Type: string
        }
        Insert: {
          Description: string
          IDCategorieRessource?: number | null
          IDRessource?: number
          Lien: string
          Titre: string
          Type: string
        }
        Update: {
          Description?: string
          IDCategorieRessource?: number | null
          IDRessource?: number
          Lien?: string
          Titre?: string
          Type?: string
        }
        Relationships: [
          {
            foreignKeyName: "Ressource_IDCategorieRessource_fkey"
            columns: ["IDCategorieRessource"]
            isOneToOne: false
            referencedRelation: "CategorieRessource"
            referencedColumns: ["IDCategorieRessource"]
          },
        ]
      }
      Seniors: {
        Row: {
          EstRGPD: boolean
          IDSeniors: number
          IDStructures: number | null
          IDTuteur: number | null
          IDUtilisateurSenior: number | null
          NiveauAutonomie: number
        }
        Insert: {
          EstRGPD?: boolean
          IDSeniors?: number
          IDStructures?: number | null
          IDTuteur?: number | null
          IDUtilisateurSenior?: number | null
          NiveauAutonomie?: number
        }
        Update: {
          EstRGPD?: boolean
          IDSeniors?: number
          IDStructures?: number | null
          IDTuteur?: number | null
          IDUtilisateurSenior?: number | null
          NiveauAutonomie?: number
        }
        Relationships: [
          {
            foreignKeyName: "Seniors_IDStructures_fkey"
            columns: ["IDStructures"]
            isOneToOne: false
            referencedRelation: "Structures"
            referencedColumns: ["IDStructures"]
          },
          {
            foreignKeyName: "Seniors_IDTuteur_fkey"
            columns: ["IDTuteur"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
          {
            foreignKeyName: "Seniors_IDUtilisateurSenior_fkey"
            columns: ["IDUtilisateurSenior"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
        ]
      }
      Seniors_TypeMaladie: {
        Row: {
          IDSeniors: number | null
          IDTypeMaladie: number | null
        }
        Insert: {
          IDSeniors?: number | null
          IDTypeMaladie?: number | null
        }
        Update: {
          IDSeniors?: number | null
          IDTypeMaladie?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Seniors_TypeMaladie_IDSeniors_fkey"
            columns: ["IDSeniors"]
            isOneToOne: false
            referencedRelation: "prestations_dashboard_view"
            referencedColumns: ["IDSeniors"]
          },
          {
            foreignKeyName: "Seniors_TypeMaladie_IDSeniors_fkey"
            columns: ["IDSeniors"]
            isOneToOne: false
            referencedRelation: "Seniors"
            referencedColumns: ["IDSeniors"]
          },
          {
            foreignKeyName: "Seniors_TypeMaladie_IDTypeMaladie_fkey"
            columns: ["IDTypeMaladie"]
            isOneToOne: false
            referencedRelation: "TypeMaladie"
            referencedColumns: ["IDTypeMaladie"]
          },
        ]
      }
      ServicePartenaire: {
        Row: {
          IDServicePartenaire: number
          NomService: string
        }
        Insert: {
          IDServicePartenaire?: number
          NomService: string
        }
        Update: {
          IDServicePartenaire?: number
          NomService?: string
        }
        Relationships: []
      }
      ServicePostMortem: {
        Row: {
          DateService: string
          Description: string
          IDCagnotteDeces: number | null
          IDServicePostMortem: number
          MontantUtilise: string
          NomService: string
          Prestataire: string
        }
        Insert: {
          DateService: string
          Description: string
          IDCagnotteDeces?: number | null
          IDServicePostMortem?: number
          MontantUtilise: string
          NomService: string
          Prestataire: string
        }
        Update: {
          DateService?: string
          Description?: string
          IDCagnotteDeces?: number | null
          IDServicePostMortem?: number
          MontantUtilise?: string
          NomService?: string
          Prestataire?: string
        }
        Relationships: [
          {
            foreignKeyName: "ServicePostMortem_IDCagnotteDeces_fkey"
            columns: ["IDCagnotteDeces"]
            isOneToOne: false
            referencedRelation: "CagnotteDeces"
            referencedColumns: ["IDCagnotteDeces"]
          },
        ]
      }
      SignalementContenu: {
        Row: {
          ActionModeration: string | null
          DateSignalement: string
          IDMessageGroupe: number | null
          IDReponseForum: number | null
          IDSignalement: number
          IDUtilisateurSignaleur: number
          Motif: string
          Traité: boolean | null
        }
        Insert: {
          ActionModeration?: string | null
          DateSignalement?: string
          IDMessageGroupe?: number | null
          IDReponseForum?: number | null
          IDSignalement?: number
          IDUtilisateurSignaleur: number
          Motif: string
          Traité?: boolean | null
        }
        Update: {
          ActionModeration?: string | null
          DateSignalement?: string
          IDMessageGroupe?: number | null
          IDReponseForum?: number | null
          IDSignalement?: number
          IDUtilisateurSignaleur?: number
          Motif?: string
          Traité?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "SignalementContenu_IDMessageGroupe_fkey"
            columns: ["IDMessageGroupe"]
            isOneToOne: false
            referencedRelation: "MessageGroupe"
            referencedColumns: ["IDMessageGroupe"]
          },
          {
            foreignKeyName: "SignalementContenu_IDMessageGroupe_fkey"
            columns: ["IDMessageGroupe"]
            isOneToOne: false
            referencedRelation: "v_group_messages_moderation"
            referencedColumns: ["IDMessageGroupe"]
          },
          {
            foreignKeyName: "SignalementContenu_IDReponseForum_fkey"
            columns: ["IDReponseForum"]
            isOneToOne: false
            referencedRelation: "ReponseForum"
            referencedColumns: ["IDReponseForum"]
          },
          {
            foreignKeyName: "SignalementContenu_IDUtilisateurSignaleur_fkey"
            columns: ["IDUtilisateurSignaleur"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
        ]
      }
      Souvenir: {
        Row: {
          ContenuTexte: string
          DateCreation: string
          estPublic: boolean
          FichierJoint: string
          IDSeniors: number | null
          IDSouvenir: number
          Titre: string
        }
        Insert: {
          ContenuTexte: string
          DateCreation: string
          estPublic?: boolean
          FichierJoint: string
          IDSeniors?: number | null
          IDSouvenir?: number
          Titre: string
        }
        Update: {
          ContenuTexte?: string
          DateCreation?: string
          estPublic?: boolean
          FichierJoint?: string
          IDSeniors?: number | null
          IDSouvenir?: number
          Titre?: string
        }
        Relationships: [
          {
            foreignKeyName: "Souvenir_IDSeniors_fkey"
            columns: ["IDSeniors"]
            isOneToOne: false
            referencedRelation: "prestations_dashboard_view"
            referencedColumns: ["IDSeniors"]
          },
          {
            foreignKeyName: "Souvenir_IDSeniors_fkey"
            columns: ["IDSeniors"]
            isOneToOne: false
            referencedRelation: "Seniors"
            referencedColumns: ["IDSeniors"]
          },
        ]
      }
      Structures: {
        Row: {
          IDStructures: number
          Nom: string
          NumSIRET: number
          TypeStructure: string
        }
        Insert: {
          IDStructures?: number
          Nom: string
          NumSIRET?: number
          TypeStructure: string
        }
        Update: {
          IDStructures?: number
          Nom?: string
          NumSIRET?: number
          TypeStructure?: string
        }
        Relationships: []
      }
      SujetForum: {
        Row: {
          DateCreationSujet: string
          IDForum: number | null
          IDSujetForum: number
          IDUtilisateurs: number | null
          NbVues: number
          TitreSujet: string
        }
        Insert: {
          DateCreationSujet: string
          IDForum?: number | null
          IDSujetForum?: number
          IDUtilisateurs?: number | null
          NbVues?: number
          TitreSujet: string
        }
        Update: {
          DateCreationSujet?: string
          IDForum?: number | null
          IDSujetForum?: number
          IDUtilisateurs?: number | null
          NbVues?: number
          TitreSujet?: string
        }
        Relationships: [
          {
            foreignKeyName: "SujetForum_IDForum_fkey"
            columns: ["IDForum"]
            isOneToOne: false
            referencedRelation: "Forum"
            referencedColumns: ["IDForum"]
          },
          {
            foreignKeyName: "SujetForum_IDUtilisateurs_fkey"
            columns: ["IDUtilisateurs"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
        ]
      }
      SupportClient: {
        Row: {
          DateEnvoi: string
          DateResolution: string | null
          DescriptionDemande: string
          IDTicketClient: number
          IDUtilisateursClient: number | null
          Priorite: string
          StatutDemande: string
          Sujet: string
        }
        Insert: {
          DateEnvoi: string
          DateResolution?: string | null
          DescriptionDemande: string
          IDTicketClient?: number
          IDUtilisateursClient?: number | null
          Priorite: string
          StatutDemande: string
          Sujet: string
        }
        Update: {
          DateEnvoi?: string
          DateResolution?: string | null
          DescriptionDemande?: string
          IDTicketClient?: number
          IDUtilisateursClient?: number | null
          Priorite?: string
          StatutDemande?: string
          Sujet?: string
        }
        Relationships: [
          {
            foreignKeyName: "SupportClient_IDUtilisateursClient_fkey"
            columns: ["IDUtilisateursClient"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
        ]
      }
      TMessage: {
        Row: {
          Contenu: string
          EstLu: boolean
          IDTMessage: number
          IDUtilisateurDestinataire: number | null
          IDUtilisateurExpediteur: number | null
          TypeMessage: string
        }
        Insert: {
          Contenu: string
          EstLu?: boolean
          IDTMessage?: number
          IDUtilisateurDestinataire?: number | null
          IDUtilisateurExpediteur?: number | null
          TypeMessage: string
        }
        Update: {
          Contenu?: string
          EstLu?: boolean
          IDTMessage?: number
          IDUtilisateurDestinataire?: number | null
          IDUtilisateurExpediteur?: number | null
          TypeMessage?: string
        }
        Relationships: [
          {
            foreignKeyName: "TMessage_IDUtilisateurDestinataire_fkey"
            columns: ["IDUtilisateurDestinataire"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
          {
            foreignKeyName: "TMessage_IDUtilisateurExpediteur_fkey"
            columns: ["IDUtilisateurExpediteur"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
        ]
      }
      TypeMaladie: {
        Row: {
          EstHandicap: boolean
          IDTypeMaladie: number
          TypeMaladie: string
        }
        Insert: {
          EstHandicap?: boolean
          IDTypeMaladie?: number
          TypeMaladie: string
        }
        Update: {
          EstHandicap?: boolean
          IDTypeMaladie?: number
          TypeMaladie?: string
        }
        Relationships: []
      }
      TypePieces: {
        Row: {
          IDTypePieces: number
          Titre: string
        }
        Insert: {
          IDTypePieces?: number
          Titre: string
        }
        Update: {
          IDTypePieces?: number
          Titre?: string
        }
        Relationships: []
      }
      Utilisateurs: {
        Row: {
          Adresse: string
          Commentaire: string
          DateInscription: string
          DateModification: string
          DateNaissance: string
          Email: string
          EstDesactive: boolean
          EstRGPD: boolean
          Genre: string
          IDAuth: string | null
          IDCatUtilisateurs: number | null
          IDUtilisateurs: number
          LangueSite: string
          MotDePasse: string | null
          Nom: string
          Photo: string
          Prenom: string
          Telephone: string
        }
        Insert: {
          Adresse: string
          Commentaire: string
          DateInscription: string
          DateModification: string
          DateNaissance: string
          Email: string
          EstDesactive?: boolean
          EstRGPD?: boolean
          Genre: string
          IDAuth?: string | null
          IDCatUtilisateurs?: number | null
          IDUtilisateurs?: number
          LangueSite: string
          MotDePasse?: string | null
          Nom: string
          Photo: string
          Prenom: string
          Telephone: string
        }
        Update: {
          Adresse?: string
          Commentaire?: string
          DateInscription?: string
          DateModification?: string
          DateNaissance?: string
          Email?: string
          EstDesactive?: boolean
          EstRGPD?: boolean
          Genre?: string
          IDAuth?: string | null
          IDCatUtilisateurs?: number | null
          IDUtilisateurs?: number
          LangueSite?: string
          MotDePasse?: string | null
          Nom?: string
          Photo?: string
          Prenom?: string
          Telephone?: string
        }
        Relationships: [
          {
            foreignKeyName: "Utilisateurs_IDCatUtilisateurs_fkey"
            columns: ["IDCatUtilisateurs"]
            isOneToOne: false
            referencedRelation: "CatUtilisateurs"
            referencedColumns: ["IDCatUtilisateurs"]
          },
        ]
      }
      Utilisateurs_Groupe: {
        Row: {
          IDGroupe: number | null
          IDUtilisateurs: number | null
        }
        Insert: {
          IDGroupe?: number | null
          IDUtilisateurs?: number | null
        }
        Update: {
          IDGroupe?: number | null
          IDUtilisateurs?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Utilisateurs_Groupe_IDGroupe_fkey"
            columns: ["IDGroupe"]
            isOneToOne: false
            referencedRelation: "Groupe"
            referencedColumns: ["IDGroupe"]
          },
          {
            foreignKeyName: "Utilisateurs_Groupe_IDUtilisateurs_fkey"
            columns: ["IDUtilisateurs"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
        ]
      }
      Utilisateurs_Localisation: {
        Row: {
          IDLocalisation: number | null
          IDUtilisateurs: number | null
        }
        Insert: {
          IDLocalisation?: number | null
          IDUtilisateurs?: number | null
        }
        Update: {
          IDLocalisation?: number | null
          IDUtilisateurs?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Utilisateurs_Localisation_IDLocalisation_fkey"
            columns: ["IDLocalisation"]
            isOneToOne: false
            referencedRelation: "Localisation"
            referencedColumns: ["IDLocalisation"]
          },
          {
            foreignKeyName: "Utilisateurs_Localisation_IDUtilisateurs_fkey"
            columns: ["IDUtilisateurs"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
        ]
      }
      VersementCommissions: {
        Row: {
          DateVersement: string
          IDCommande: number | null
          IDPrestation: number | null
          IDVersementCommissions: number
          MontantCommission: number
          MoyenVersement: string
          PourcentageCommission: number
          TypeTransaction: string
        }
        Insert: {
          DateVersement: string
          IDCommande?: number | null
          IDPrestation?: number | null
          IDVersementCommissions?: number
          MontantCommission?: number
          MoyenVersement: string
          PourcentageCommission?: number
          TypeTransaction?: string
        }
        Update: {
          DateVersement?: string
          IDCommande?: number | null
          IDPrestation?: number | null
          IDVersementCommissions?: number
          MontantCommission?: number
          MoyenVersement?: string
          PourcentageCommission?: number
          TypeTransaction?: string
        }
        Relationships: [
          {
            foreignKeyName: "versementcommissions_idcommande_fkey"
            columns: ["IDCommande"]
            isOneToOne: false
            referencedRelation: "Commande"
            referencedColumns: ["IDCommande"]
          },
          {
            foreignKeyName: "VersementCommissions_IDPrestation_fkey"
            columns: ["IDPrestation"]
            isOneToOne: false
            referencedRelation: "Prestation"
            referencedColumns: ["IDPrestation"]
          },
          {
            foreignKeyName: "VersementCommissions_IDPrestation_fkey"
            columns: ["IDPrestation"]
            isOneToOne: false
            referencedRelation: "prestations_dashboard_view"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      prestations_dashboard_view: {
        Row: {
          aidant_nom: string | null
          date_creation: string | null
          domaine_titre: string | null
          evaluation: number | null
          evaluation_commentaire: string | null
          id: number | null
          IDAidant: number | null
          IDSeniors: number | null
          senior_nom: string | null
          statut: string | null
          tarif: number | null
          type_prestation: string | null
        }
        Relationships: []
      }
      support_dashboard_view: {
        Row: {
          assigne_email: string | null
          assigne_nom: string | null
          assigne_prenom: string | null
          date_creation: string | null
          id: number | null
          id_intervenant: number | null
          id_prestation_support: number | null
          id_utilisateur: number | null
          message: string | null
          priorite: string | null
          statut: string | null
          sujet: string | null
          utilisateur_email: string | null
          utilisateur_nom: string | null
          utilisateur_prenom: string | null
        }
        Relationships: [
          {
            foreignKeyName: "PrestationSupport_IDIntervenant_fkey"
            columns: ["id_intervenant"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
          {
            foreignKeyName: "SupportClient_IDUtilisateursClient_fkey"
            columns: ["id_utilisateur"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
        ]
      }
      v_activitesrecentes: {
        Row: {
          datetime: string | null
          id: number | null
          subtitle: string | null
          title: string | null
          type: string | null
        }
        Relationships: []
      }
      v_financestransactions: {
        Row: {
          commission: number | null
          date: string | null
          id: number | null
          montant: number | null
          statut: string | null
          type: string | null
          utilisateur: string | null
        }
        Relationships: []
      }
      v_forum_posts_moderation: {
        Row: {
          DateCreationSujet: string | null
          IDSujetForum: number | null
          IDUtilisateurs: number | null
          nbreponses: number | null
          NomAuteur: string | null
          NomForum: string | null
          PrenomAuteur: string | null
          signalements: number | null
          TitreSujet: string | null
        }
        Relationships: [
          {
            foreignKeyName: "SujetForum_IDUtilisateurs_fkey"
            columns: ["IDUtilisateurs"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
        ]
      }
      v_group_messages_moderation: {
        Row: {
          Contenu: string | null
          DateEnvoi: string | null
          IDGroupe: number | null
          IDMessageGroupe: number | null
          IDUtilisateurs: number | null
          NomAuteur: string | null
          NomGroupe: string | null
          PrenomAuteur: string | null
          signalements: number | null
        }
        Relationships: [
          {
            foreignKeyName: "MessageGroupe_IDGroupe_fkey"
            columns: ["IDGroupe"]
            isOneToOne: false
            referencedRelation: "Groupe"
            referencedColumns: ["IDGroupe"]
          },
          {
            foreignKeyName: "MessageGroupe_IDUtilisateurs_fkey"
            columns: ["IDUtilisateurs"]
            isOneToOne: false
            referencedRelation: "Utilisateurs"
            referencedColumns: ["IDUtilisateurs"]
          },
        ]
      }
    }
    Functions: {
      update_expired_cagnottes: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

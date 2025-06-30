
# Relations entre les tables

## Relations principales

### 1. Utilisateurs et profils spécialisés

```
Utilisateurs (1) ←→ (1) CatUtilisateurs
    ↓
    ├── Seniors (1:1) si EstSenior = true
    └── Aidant (1:1) si EstAidant = true
```

**Description :** Chaque utilisateur a une catégorie qui détermine ses profils spécialisés.

**Contraintes :**
- Un utilisateur peut être à la fois Senior et Aidant
- Les profils spécialisés sont créés automatiquement via trigger
- La suppression d'un utilisateur cascade vers ses profils

### 2. Prestations et domaines

```
Domaine (1) ←→ (N) Prestation
Prestation (N) ←→ (N) Localisation [via Prestation_Localisation]
```

**Description :** Organisation hiérarchique des services par domaines d'activité.

**Exemple :**
- Domaine: "Aide à domicile"
  - Prestations: "Ménage", "Repassage", "Courses"

### 3. Mise en relation et prestations

```
Senior (1) ←→ (N) MiseEnRelation (N) ←→ (1) Aidant
                      ↓
                (N) ←→ (N) Prestation [via MiseEnRelation_Prestation]
```

**Description :** Relation complexe gérant les prestations entre seniors et aidants.

**Workflow :**
1. Senior exprime un BesoinSenior
2. Aidants proposent via PrestationAidant
3. Création d'une MiseEnRelation si acceptation
4. Évaluation mutuelle après prestation

### 4. Commerce et commandes

```
Utilisateurs (1) ←→ (N) Commande
                          ↓
    ┌─────────────────────┼─────────────────────┐
    ↓                     ↓                     ↓
Produit_Commande    MiseEnRelation        Facture
    ↓                     ↓
Produit              Evaluation
```

**Description :** Système de commande unifié gérant produits et prestations.

### 5. Partenariats et bons plans

```
Partenaire (1) ←→ (N) BonPlan
    ↓                    ↓
    (N) ←→ (N)          (N) ←→ (N)
ServicePartenaire   BonPlan_Utilisateurs
[via Partenaire_Services]    ↓
                      Utilisateurs
```

**Description :** Écosystème partenaire avec services et offres promotionnelles.

## Relations de support

### 6. Communication et contenu

```
Utilisateurs (1) ←→ (N) Forum
                          ↓
                    (1) ←→ (N) SujetForum
                                 ↓
                           (1) ←→ (N) ReponseForum
                                       ↓
                               (N) ←→ (1) Utilisateurs
```

**Description :** Structure hiérarchique des forums de discussion.

### 7. Groupes et messages

```
Utilisateurs (1) ←→ (N) Groupe
    ↓                    ↓
    └────────────→ (N) MessageGroupe (N) ←┘
```

**Description :** Système de messagerie de groupe.

### 8. Système médical (seniors)

```
Seniors (1) ←→ (N) Medicament
         ↓
         ├── (N) ContactUrgence
         ├── (N) RendezVousMedical
         └── (N) DirectivesAnticipees
```

**Description :** Suivi médical complet des seniors.

## Relations de gestion

### 9. Documents et catégorisation

```
CategorieDocument (1) ←→ (N) Document (N) ←→ (1) Utilisateurs
DocumentRGPD (indépendant)
```

**Description :** Gestion documentaire avec catégorisation.

### 10. Localisation géographique

```
Localisation (N) ←→ (N) Prestation [via Prestation_Localisation]
```

**Description :** Géolocalisation des services disponibles.

### 11. Compétences des aidants

```
Domaine (1) ←→ (N) Competences
                    ↓
              (N) ←→ (N) Aidant [via Aidant_Competences]
```

**Description :** Système de compétences hiérarchiques des aidants.

## Relations de conformité

### 12. RGPD et consentements

```
Utilisateurs (1) ←→ (N) DemandeRGPD
         ↓
         └── (N) ConsentementCookies
```

**Description :** Gestion des droits RGPD et consentements.

### 13. Audit et traçabilité

```
Utilisateurs (1) ←→ (N) HistoriqueConnexion
         ↓
         └── (N) HistoriqueInteractions
```

**Description :** Suivi de l'activité utilisateur pour audit.

## Contraintes d'intégrité

### Contraintes référentielles
- **CASCADE** : Suppression en cascade pour les données dépendantes
- **RESTRICT** : Prévention de suppression si données liées
- **SET NULL** : Mise à NULL des références orphelines

### Contraintes métier
- Un Senior ne peut évaluer que ses propres prestations
- Les dates de début doivent être antérieures aux dates de fin
- Les tarifs doivent être positifs
- Un BonPlan ne peut être utilisé qu'entre ses dates de validité

### Contraintes de sécurité
- RLS (Row Level Security) sur les données personnelles
- Chiffrement des données sensibles
- Audit trail sur les modifications critiques

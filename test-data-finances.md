
# Jeux de données pour tester les formulaires de finances

## 1. Formulaire d'ajout d'activité rémunérée (AddActivityRevenueForm)

### Données de test pour les utilisateurs
```
Utilisateur 1:
- ID: 1
- Nom: Dupont
- Prénom: Marie
- Email: marie.dupont@email.com

Utilisateur 2:
- ID: 2
- Nom: Martin
- Prénom: Pierre
- Email: pierre.martin@email.com

Utilisateur 3:
- ID: 3
- Nom: Bernard
- Prénom: Sophie
- Email: sophie.bernard@email.com
```

### Activités rémunérées existantes à tester
```
Activité 1:
- Description: Aide aux courses et courses alimentaires
- Type: Service à domicile
- Tarif horaire: 15.50 €
- Disponibilité: 2025-01-15
- Statut: Disponible

Activité 2:
- Description: Accompagnement médical et rendez-vous
- Type: Accompagnement
- Tarif horaire: 18.00 €
- Disponibilité: 2025-01-20
- Statut: Disponible

Activité 3:
- Description: Formation informatique pour seniors
- Type: Formation
- Tarif horaire: 25.00 €
- Disponibilité: 2025-02-01
- Statut: En cours
```

### Nouvelles activités à créer via le formulaire
```
Nouvelle activité 1:
- Description: Jardinage et entretien extérieur
- Type: Service à domicile
- Tarif horaire: 20.00 €
- Disponibilité: 2025-01-25
- Statut: Disponible

Nouvelle activité 2:
- Description: Conseil en gestion administrative
- Type: Conseil
- Tarif horaire: 30.00 €
- Disponibilité: 2025-02-10
- Statut: Disponible

Nouvelle activité 3:
- Description: Aide ménagère hebdomadaire
- Type: Service à domicile
- Tarif horaire: 14.50 €
- Disponibilité: 2025-01-30
- Statut: Indisponible
```

### Transactions d'activité rémunérée à tester
```
Transaction 1:
- Utilisateur: Marie Dupont
- Activité: Aide aux courses et courses alimentaires
- Montant: 77.50 € (5h x 15.50€)

Transaction 2:
- Utilisateur: Pierre Martin
- Activité: Formation informatique pour seniors
- Montant: 100.00 € (4h x 25.00€)

Transaction 3:
- Utilisateur: Sophie Bernard
- Activité: Nouvelle activité créée (Jardinage)
- Montant: 60.00 € (3h x 20.00€)
```

## 2. Formulaire d'ajout de dons (AddDonForm)

### Cagnottes existantes à tester
```
Cagnotte 1:
- Titre: Aide funéraire pour Mme Leblanc
- Description: Collecte pour aider la famille à couvrir les frais d'obsèques
- Date de clôture: 2025-03-15
- Senior associé: Aucun
- Statut: Ouverte

Cagnotte 2:
- Titre: Soutien famille Moreau
- Description: Support financier suite au décès de M. Moreau
- Date de clôture: 2025-02-28
- Senior associé: Senior ID 1
- Statut: Ouverte
```

### Nouvelles cagnottes à créer
```
Nouvelle cagnotte 1:
- Titre: Mémoire de M. Durand
- Description: Collecte en mémoire de M. Durand pour aider sa veuve
- Date de clôture: 2025-04-20
- Senior associé: Aucun
- Statut: Ouverte

Nouvelle cagnotte 2:
- Titre: Solidarité famille Petit
- Description: Aide financière urgente pour la famille Petit
- Date de clôture: 2025-02-15
- Senior associé: Senior ID 2
- Statut: Ouverte
```

### Dons à tester
```
Don 1:
- Donateur: Marie Dupont
- Cagnotte: Aide funéraire pour Mme Leblanc
- Montant: 50.00 €

Don 2:
- Donateur: Pierre Martin
- Cagnotte: Soutien famille Moreau
- Montant: 75.50 €

Don 3:
- Donateur: Sophie Bernard
- Cagnotte: Nouvelle cagnotte créée (Mémoire de M. Durand)
- Montant: 100.00 €
```

## 3. Formulaire d'ajout de commandes (AddCommandeForm)

### Moyens de paiement à tester
```
Moyen 1: Carte bancaire
Moyen 2: Virement bancaire
Moyen 3: Chèque
Moyen 4: PayPal
Moyen 5: Espèces
```

### Commandes à tester
```
Commande 1:
- Utilisateur: Marie Dupont
- Type: Prestation
- Moyen de paiement: Carte bancaire
- Montant: 125.00 €

Commande 2:
- Utilisateur: Pierre Martin
- Type: Produit
- Moyen de paiement: Virement bancaire
- Montant: 89.99 €

Commande 3:
- Utilisateur: Sophie Bernard
- Type: Autre
- Moyen de paiement: (Optionnel - vide)
- Montant: 45.50 €
```

## 4. Formulaire d'ajout de commissions (AddCommissionForm)

### Commissions à tester
```
Commission 1:
- Montant: 250.00 €
- Moyen de versement: Virement bancaire

Commission 2:
- Montant: 180.50 €
- Moyen de versement: Chèque

Commission 3:
- Montant: 75.00 €
- Moyen de versement: Paypal

Commission 4:
- Montant: 320.25 €
- Moyen de versement: Carte bancaire

Commission 5:
- Montant: 95.00 €
- Moyen de versement: Espèces
```

## 5. Formulaire d'ajout de services post-mortem (AddPostMortemForm)

### Prestataires (Partenaires) à tester
```
Partenaire 1:
- Raison sociale: Pompes Funèbres Martin
- ID: 1

Partenaire 2:
- Raison sociale: Services Funéraires Dupont
- ID: 2

Partenaire 3:
- Raison sociale: Entreprise Funéraire Leblanc
- ID: 3
```

### Si aucun partenaire, organismes alternatifs
```
Organisme 1:
- Nom: Centre Funéraire Municipal
- ID: 1

Organisme 2:
- Nom: Association Aide aux Familles
- ID: 2
```

### Services post-mortem à tester
```
Service 1:
- Prestataire: Pompes Funèbres Martin
- Montant: 2500.00 €

Service 2:
- Prestataire: Services Funéraires Dupont
- Montant: 1850.75 €

Service 3:
- Prestataire: Entreprise Funéraire Leblanc
- Montant: 3200.50 €
```

## 6. Scénarios de test complets

### Scénario 1: Test du flux complet d'activité rémunérée
1. Ouvrir le formulaire d'ajout de transaction
2. Sélectionner "Activité rémunérée"
3. Choisir "Sophie Bernard" comme utilisateur
4. Dans le dropdown des activités, sélectionner "+ Ajouter une activité"
5. Remplir le formulaire d'activité avec "Jardinage et entretien extérieur"
6. Valider la création de l'activité
7. Saisir 60.00 € comme montant
8. Valider la transaction

### Scénario 2: Test du flux complet de don avec nouvelle cagnotte
1. Ouvrir le formulaire d'ajout de transaction
2. Sélectionner "Don"
3. Choisir "Marie Dupont" comme donateur
4. Dans le dropdown des cagnottes, sélectionner "+ Ajouter une nouvelle cagnotte"
5. Remplir le formulaire de cagnotte avec "Mémoire de M. Durand"
6. Valider la création de la cagnotte
7. Saisir 100.00 € comme montant
8. Valider le don

### Scénario 3: Tests d'erreurs et de validation
1. Essayer de soumettre des formulaires avec des champs vides
2. Tester des montants négatifs ou invalides
3. Tester des dates de clôture antérieures à aujourd'hui
4. Vérifier les messages d'erreur et de succès

## 7. Données SQL pour insérer en base (optionnel)

Si vous voulez pré-remplir la base avec des données de test :

```sql
-- Insertion d'utilisateurs de test
INSERT INTO "Utilisateurs" ("Nom", "Prenom", "Email") VALUES
('Dupont', 'Marie', 'marie.dupont@email.com'),
('Martin', 'Pierre', 'pierre.martin@email.com'),
('Bernard', 'Sophie', 'sophie.bernard@email.com');

-- Insertion d'activités rémunérées de test
INSERT INTO "ActiviteRemuneree" ("DescriptionActivite", "TypeActiviteRemuneree", "TarifHoraire", "Disponibilite", "StatutActiviteRemuneree", "DateCreationActivite") VALUES
('Aide aux courses et courses alimentaires', 'Service à domicile', 15.50, '2025-01-15', 'Disponible', '2025-01-10'),
('Accompagnement médical et rendez-vous', 'Accompagnement', 18.00, '2025-01-20', 'Disponible', '2025-01-12'),
('Formation informatique pour seniors', 'Formation', 25.00, '2025-02-01', 'En cours', '2025-01-08');

-- Insertion de moyens de paiement
INSERT INTO "MoyenPaiement" ("MoyenPaiement", "DatePaiement") VALUES
('Carte bancaire', NOW()),
('Virement bancaire', NOW()),
('Chèque', NOW()),
('PayPal', NOW()),
('Espèces', NOW());
```

## 8. Checklist de tests

- [ ] Créer une activité rémunérée via le modal
- [ ] Sélectionner une activité existante
- [ ] Créer une cagnotte via le modal
- [ ] Sélectionner une cagnotte existante
- [ ] Tester tous les types de commandes
- [ ] Tester tous les moyens de versement pour les commissions
- [ ] Tester la sélection de prestataires post-mortem
- [ ] Vérifier l'affichage des transactions dans le tableau
- [ ] Tester les validations de formulaires
- [ ] Vérifier les messages de succès/erreur

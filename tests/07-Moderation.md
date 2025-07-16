
# Tests manuels - Modération

## 🎯 Objectif
Vérifier la gestion complète de la modération avec des contenus et situations réels de l'application AppSeniors.

## 🚨 Gestion des signalements réels

### ✅ Scénario : Signalement contenu inapproprié sur forum
**Contexte :** Message inapproprié dans le forum "Entraide quotidienne"
**Contenu signalé :** "Vente de médicaments sans ordonnance à domicile, prix intéressants"
**Auteur du message :** Jean Dubois (utilisateur récent)
**Signalé par :** Marie Lecomte (senior active)

**Données du signalement :**
- **Type de contenu :** Forum
- **Raison :** Activité illégale
- **Description :** "Ce message propose la vente de médicaments sans ordonnance, ce qui est illégal"
- **Capture d'écran :** Jointe
- **Date :** 16 mai 2024, 14h30

**Étapes :**
1. Se connecter en tant que moderateur@appseniors.fr
2. Consulter les nouveaux signalements
3. Examiner le contenu et les preuves
4. Prendre une décision de modération

**Résultat attendu :**
- Signalement bien enregistré
- Contenu visible avec contexte
- Décision : Suppression immédiate + avertissement
- Notification à l'auteur et au signalant

### ✅ Scénario : Signalement utilisateur suspect - Faux profil aidant
**Contexte :** Profil aidant créé avec fausses informations
**Utilisateur signalé :** "Sophie Martin" (pas de vérifications)
**Signalé par :** Administrateur automatique (détection IA)

**Éléments suspects :**
- **Photos :** Récupérées sur Internet (détection reverse image)
- **Diplômes :** Non vérifiables
- **Téléphone :** Numéro non attribué
- **Adresse :** Inexistante
- **Historique :** Aucune prestation réalisée en 2 mois

**Étapes d'investigation :**
1. Consulter le signalement automatique
2. Vérifier les informations du profil
3. Contacter l'utilisateur pour vérifications
4. Prendre des mesures correctives

**Résultat attendu :**
- Profil suspendu temporairement
- Demande de justificatifs envoyée
- Si pas de réponse sous 48h : suppression définitive
- Alerte aux seniors qui l'avaient contacté

### ✅ Scénario : Signalement harcèlement dans groupe privé
**Contexte :** Messages répétés non désirés dans groupe "Veufs et veuves 60+"
**Harceleur :** Pierre Dulac (membre récent)
**Victime :** Germaine Moreau (92 ans)
**Nature :** Messages privés insistants à caractère sentimental

**Messages signalés :**
- "Vous me plaisez beaucoup, donnez-moi votre numéro"
- "Pourquoi vous ne répondez pas ? Je passe chez vous ?"
- "J'ai votre adresse, on pourrait se voir"

**Étapes :**
1. Réception du signalement de Germaine
2. Analyse des messages dans le groupe
3. Vérification des MP (messages privés)
4. Contact avec Pierre pour explications
5. Décision de sanction

**Résultat attendu :**
- Bannissement immédiat de Pierre
- Suppression de tous ses messages
- Contact avec Germaine pour rassurer
- Signalement aux autorités si nécessaire

## 💬 Modération des forums

### ✅ Scénario : Création et modération nouveau forum "Jardinage seniors"
**Demande :** Senior passionné souhaite créer un forum spécialisé
**Demandeur :** Robert Vernay (78 ans, ancien paysagiste)
**Objectif :** Partager conseils jardinage adaptés aux seniors

**Données du forum :**
- **Titre :** "Jardinage après 60 ans - Conseils et astuces"
- **Description :** "Forum dédié au jardinage adapté aux seniors : techniques douces, outils ergonomiques, plantes faciles"
- **Catégorie :** Loisirs et hobbies
- **Visibilité :** Public
- **Modérateur :** Robert Vernay + modérateur AppSeniors

**Étapes :**
1. Évaluer la demande de création
2. Vérifier la pertinence et l'utilité
3. Créer le forum avec Robert comme modérateur
4. Définir les règles spécifiques
5. Annoncer l'ouverture à la communauté

**Résultat attendu :**
- Forum créé et accessible
- Robert investi modérateur bénévole
- Règles claires affichées
- Premiers sujets de qualité publiés

### ✅ Scénario : Modération sujet polémique - Débat houleux
**Contexte :** Débat sur les vaccins dans forum "Santé seniors"
**Sujet :** "Vaccination après 70 ans - témoignages"
**Problème :** Dérive vers désinformation médicale

**Messages problématiques :**
- Conseils médicaux non fondés
- Théories complotistes
- Attaques personnelles entre membres
- Désinformation dangereuse

**Actions de modération :**
1. Épingler un message de rappel des règles
2. Supprimer les messages de désinformation
3. Avertir les auteurs de messages inappropriés
4. Rediriger vers sources médicales officielles
5. Verrouiller le sujet si nécessaire

**Résultat attendu :**
- Débat recentré sur les témoignages
- Suppression de la désinformation
- Membres sensibilisés aux règles
- Forum assaini et constructif

### ✅ Scénario : Gestion spam commercial dans forums
**Contexte :** Utilisateur poste régulièrement des liens commerciaux
**Spammeur :** "Matériel Médical Pro" (compte commercial)
**Forums ciblés :** "Aide technique" et "Santé seniors"

**Messages spam typiques :**
- "Déambulateurs en promotion sur notre site -30%"
- "Matelas médicalisés, livraison gratuite, cliquez ici"
- "Téléassistance à prix cassé, contactez-nous"

**Étapes :**
1. Identifier les messages à caractère commercial
2. Vérifier si c'est un partenaire officiel
3. Supprimer les messages non autorisés
4. Contacter l'utilisateur pour explications
5. Rediriger vers la procédure partenariat

**Résultat attendu :**
- Messages commerciaux supprimés
- Utilisateur informé des règles
- Possibilité de devenir partenaire officiel
- Forums préservés du spam

## 👥 Modération des groupes

### ✅ Scénario : Gestion conflit dans groupe "Seniors Paris 12e"
**Contexte :** Dispute entre membres sur organisation d'une sortie
**Protagonistes :** 
- Marcel Durand (organisateur habituel)
- Marie Lecomte (nouvelle, veut prendre initiatives)
**Conflit :** Désaccord sur le choix du restaurant

**Messages conflictuels :**
- Marcel : "C'est toujours moi qui organise, vous n'avez qu'à suivre"
- Marie : "Vous n'êtes pas le chef ici, on peut donner notre avis"
- Autres membres prenant parti dans un sens ou l'autre

**Intervention modération :**
1. Identifier l'escalade du conflit
2. Envoyer messages privés aux protagonistes
3. Proposer médiation en privé
4. Rappeler les règles de bienveillance
5. Organiser vote démocratique pour la sortie

**Résultat attendu :**
- Conflit apaisé par la médiation
- Règles de décision collective établies
- Marcel et Marie réconciliés
- Groupe plus démocratique

### ✅ Scénario : Gestion membre perturbateur récidiviste
**Contexte :** Membre qui dérange systématiquement les discussions
**Perturbateur :** Paul Grognon (pseudonyme évocateur)
**Comportements :** Critique systématique, négativité, hors-sujets

**Historique :**
- 5 avertissements en 2 mois
- Plaintes de 8 membres différents
- Aucune amélioration malgré les rappels
- Impact négatif sur l'ambiance générale

**Escalade des sanctions :**
1. **Avertissement 6 :** Dernier avertissement officiel
2. **Suspension 7 jours :** Pour réflexion
3. **Suspension 1 mois :** Si récidive
4. **Bannissement définitif :** En cas de nouvel incident

**Résultat attendu :**
- Sanctions progressives et documentées
- Amélioration de l'ambiance du groupe
- Exemple pour les autres membres
- Équité dans l'application des règles

## 📊 Dashboard et statistiques modération

### ✅ Scénario : Tableau de bord modération mensuel
**Période :** Mai 2024
**Statistiques attendues :**

**Signalements traités :**
- Total : 23 signalements
- Résolus : 20 (87%)
- En cours : 3 (13%)
- Délai moyen traitement : 4h30

**Répartition par type :**
- Contenu inapproprié : 12 (52%)
- Spam commercial : 6 (26%)
- Harcèlement : 3 (13%)
- Faux profils : 2 (9%)

**Actions prises :**
- Suppressions contenu : 15
- Avertissements : 8
- Suspensions temporaires : 4
- Bannissements définitifs : 2

**Modérateurs actifs :**
- moderateur@appseniors.fr : 15 signalements traités
- Robert Vernay (bénévole) : 5 signalements traités
- Marie Durand (bénévole) : 3 signalements traités

**Résultat attendu :**
- Dashboard complet et actualisé
- Tendances d'évolution visibles
- Performance des modérateurs mesurée
- Rapport mensuel généré automatiquement

## 🔧 Outils de modération avancés

### ✅ Scénario : Détection automatique contenu suspect
**Système IA :** Détection de mots-clés et patterns suspects
**Déclencheurs automatiques :**
- Mots liés à la vente de médicaments
- Demandes d'argent suspectes
- Coordonnées personnelles en public
- Liens vers sites externes non vérifiés

**Test de détection :**
1. Message test : "Vends Tramadol sans ordonnance, prix négociable"
2. Système détecte automatiquement
3. Message mis en quarantaine
4. Alerte envoyée aux modérateurs

**Résultat attendu :**
- Détection instantanée du contenu suspect
- Mise en quarantaine automatique
- Notification immédiate des modérateurs
- Réduction du temps de réaction

### ✅ Scénario : Modération collaborative avec votes
**Contexte :** Contenu limite nécessitant avis collectif
**Situation :** Message politique dans forum général
**Modérateurs :** 3 modérateurs actifs + 2 bénévoles

**Processus de vote :**
1. Modérateur 1 signale le contenu limite
2. Vote lancé auprès des autres modérateurs
3. Délai de vote : 2 heures
4. Décision à la majorité simple

**Résultats du vote :**
- Pour suppression : 2 votes
- Pour maintien avec avertissement : 3 votes
- **Décision :** Maintien + avertissement à l'auteur

**Résultat attendu :**
- Décision collective et équitable
- Traçabilité du processus de vote
- Cohérence dans les décisions
- Apprentissage pour les cas futurs

## 🔔 Notifications et alertes

### ✅ Scénario : Système d'alertes escalade
**Niveaux d'alerte :**

1. **Alerte normale :** Nouveau signalement
   - Notification email dans l'heure
   - Traitement sous 4h

2. **Alerte urgente :** Contenu dangereux
   - Notification immédiate (SMS + email)
   - Traitement sous 30 minutes

3. **Alerte critique :** Menace physique
   - Notification immédiate tous modérateurs
   - Traitement sous 10 minutes
   - Escalade automatique vers admin

**Test escalade :**
Message test : "Je connais votre adresse, je vais vous faire du mal"
→ Détection automatique "menace physique"
→ Alerte critique déclenchée
→ Tous les modérateurs notifiés immédiatement

**Résultat attendu :**
- Classification automatique des urgences
- Notifications adaptées au niveau d'urgence
- Temps de réaction optimisés
- Escalade automatique fonctionnelle

## 📱 Modération mobile

### ✅ Scénario : Modération d'urgence depuis mobile
**Contexte :** Modérateur en déplacement, signalement urgent
**Appareil :** Smartphone du modérateur
**Urgence :** Tentative d'escroquerie en cours

**Actions mobiles :**
1. Réception notification push urgente
2. Consultation rapide du signalement
3. Suppression immédiate du contenu
4. Bannissement de l'utilisateur
5. Notification aux victimes potentielles

**Interface mobile optimisée :**
- Actions essentielles accessibles en 2 clics
- Lecture rapide du contexte
- Décisions documentées mais simplifiées
- Synchronisation temps réel

**Résultat attendu :**
- Réactivité maximale même en mobilité
- Interface adaptée aux urgences
- Pas de perte de fonctionnalités essentielles
- Traçabilité maintenue

## 🎯 Formation et évolution des modérateurs

### ✅ Scénario : Formation nouveau modérateur bénévole
**Nouveau modérateur :** Claire Dubois (senior active, ex-enseignante)
**Programme de formation :**

1. **Formation théorique (2h) :**
   - Règles de la communauté
   - Procédures de modération
   - Outils disponibles
   - Cas pratiques

2. **Formation pratique (1 semaine) :**
   - Accompagnement par modérateur expérimenté
   - Traitement de cas simples
   - Feedback et conseils

3. **Autonomie progressive :**
   - Modération avec validation
   - Puis modération autonome
   - Évaluation mensuelle

**Résultat attendu :**
- Claire opérationnelle en 2 semaines
- Qualité de modération maintenue
- Équipe renforcée avec profil complémentaire
- Engagement bénévole durable

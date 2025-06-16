
import { useState, useEffect } from "react";
import { Senior, Aidant, SeniorsStats } from "../../types/seniors";

export const useSeniors = () => {
  const [seniors, setSeniors] = useState<Senior[]>([]);
  const [aidants, setAidants] = useState<Aidant[]>([]);
  const [stats, setStats] = useState<SeniorsStats>({
    totalSeniors: 0,
    seniorsActifs: 0,
    totalAidants: 0,
    aidantsActifs: 0,
    humeurPositive: 0,
    humeurNegative: 0
  });

  // Données de démonstration cohérentes avec la base de données
  useEffect(() => {
    const mockSeniors: Senior[] = [
      {
        id: 'senior-1',
        nom: 'Martin',
        prenom: 'Claire',
        email: 'claire.martin@email.com',
        telephone: '01 23 45 67 89',
        dateNaissance: '1945-03-15',
        adresse: '12 rue des Roses',
        ville: 'Paris',
        codePostal: '75001',
        situationFamiliale: 'veuf',
        handicap: false,
        pathologies: ['Diabète', 'Hypertension'],
        niveauAutonomie: 'moyen',
        dateInscription: '2024-01-15T10:00:00Z',
        statut: 'actif',
        derniereConnexion: '2024-06-12T14:30:00Z',
        humeurJour: {
          date: '2024-06-12',
          humeur: 'content',
          commentaire: 'Belle journée ensoleillée'
        },
        aidantsAssignes: ['aidant-1', 'aidant-2'],
        dateCreation: '2024-01-15T10:00:00Z',
        dateMiseAJour: '2024-06-12T14:30:00Z'
      },
      {
        id: 'senior-2',
        nom: 'Dubois',
        prenom: 'Jean',
        email: 'jean.dubois@email.com',
        telephone: '01 34 56 78 90',
        dateNaissance: '1938-08-22',
        adresse: '5 avenue de la Paix',
        ville: 'Lyon',
        codePostal: '69001',
        situationFamiliale: 'marie',
        handicap: true,
        pathologies: ['Arthrose'],
        niveauAutonomie: 'faible',
        dateInscription: '2024-02-20T09:15:00Z',
        statut: 'actif',
        derniereConnexion: '2024-06-11T16:45:00Z',
        humeurJour: {
          date: '2024-06-11',
          humeur: 'neutre',
          commentaire: 'Journée calme'
        },
        aidantsAssignes: ['aidant-1'],
        dateCreation: '2024-02-20T09:15:00Z',
        dateMiseAJour: '2024-06-11T16:45:00Z'
      },
      {
        id: 'senior-3',
        nom: 'Leroy',
        prenom: 'Marguerite',
        email: 'marguerite.leroy@email.com',
        telephone: '01 45 67 89 01',
        dateNaissance: '1942-11-10',
        adresse: '8 place du Marché',
        ville: 'Marseille',
        codePostal: '13001',
        situationFamiliale: 'celibataire',
        handicap: false,
        pathologies: [],
        niveauAutonomie: 'eleve',
        dateInscription: '2024-03-10T11:30:00Z',
        statut: 'actif',
        derniereConnexion: '2024-06-12T08:20:00Z',
        humeurJour: {
          date: '2024-06-12',
          humeur: 'tres_content',
          commentaire: 'Visite de mes petits-enfants !'
        },
        aidantsAssignes: ['aidant-2'],
        dateCreation: '2024-03-10T11:30:00Z',
        dateMiseAJour: '2024-06-12T08:20:00Z'
      }
    ];

    const mockAidants: Aidant[] = [
      {
        id: 'aidant-1',
        nom: 'Moreau',
        prenom: 'Sophie',
        email: 'sophie.moreau@aidant.com',
        telephone: '06 12 34 56 78',
        dateNaissance: '1985-05-12',
        adresse: '15 rue de la Liberté',
        ville: 'Paris',
        codePostal: '75010',
        profession: 'Aide-soignante',
        experience: '8 ans d\'expérience en gérontologie',
        formations: ['Formation gestes et postures', 'Formation Alzheimer'],
        certifications: ['Certificat d\'aide-soignante'],
        disponibilites: {
          jours: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi'],
          heures: '8h-18h',
          zoneCouverture: ['Paris', 'Boulogne-Billancourt']
        },
        dateInscription: '2024-01-05T09:00:00Z',
        statut: 'actif',
        seniorsAssignes: ['senior-1', 'senior-2'],
        evaluations: [
          {
            id: 'eval-1',
            note: 4.8,
            commentaire: 'Très professionnelle et bienveillante',
            date: '2024-05-15T10:00:00Z',
            seniorId: 'senior-1'
          }
        ],
        dateCreation: '2024-01-05T09:00:00Z',
        dateMiseAJour: '2024-05-15T10:00:00Z',
        tarifHoraire: 25,
        specialites: ['Gérontologie', 'Soins palliatifs']
      },
      {
        id: 'aidant-2',
        nom: 'Petit',
        prenom: 'Marc',
        email: 'marc.petit@aidant.com',
        telephone: '06 23 45 67 89',
        dateNaissance: '1978-09-25',
        adresse: '22 boulevard Victor Hugo',
        ville: 'Lyon',
        codePostal: '69002',
        profession: 'Auxiliaire de vie',
        experience: '12 ans d\'accompagnement à domicile',
        formations: ['Formation premiers secours', 'Formation handicap'],
        certifications: ['Certificat auxiliaire de vie sociale'],
        disponibilites: {
          jours: ['lundi', 'mardi', 'jeudi', 'vendredi', 'samedi'],
          heures: '9h-17h',
          zoneCouverture: ['Lyon', 'Villeurbanne']
        },
        dateInscription: '2024-02-01T10:30:00Z',
        statut: 'actif',
        seniorsAssignes: ['senior-1', 'senior-3'],
        evaluations: [
          {
            id: 'eval-2',
            note: 4.6,
            commentaire: 'Très à l\'écoute et patient',
            date: '2024-04-20T15:30:00Z',
            seniorId: 'senior-3'
          }
        ],
        dateCreation: '2024-02-01T10:30:00Z',
        dateMiseAJour: '2024-04-20T15:30:00Z',
        tarifHoraire: 22,
        specialites: ['Handicap', 'Aide à domicile']
      }
    ];

    setSeniors(mockSeniors);
    setAidants(mockAidants);

    // Calcul des statistiques
    const newStats: SeniorsStats = {
      totalSeniors: mockSeniors.length,
      seniorsActifs: mockSeniors.filter(s => s.statut === 'actif').length,
      totalAidants: mockAidants.length,
      aidantsActifs: mockAidants.filter(a => a.statut === 'actif').length,
      humeurPositive: mockSeniors.filter(s => 
        s.humeurJour && ['content', 'tres_content'].includes(s.humeurJour.humeur)
      ).length,
      humeurNegative: mockSeniors.filter(s => 
        s.humeurJour && ['triste', 'tres_triste'].includes(s.humeurJour.humeur)
      ).length,
      moyenneAge: Math.round(
        mockSeniors.reduce((acc, s) => {
          const age = new Date().getFullYear() - new Date(s.dateNaissance).getFullYear();
          return acc + age;
        }, 0) / mockSeniors.length
      ),
      repartitionAutonomie: {
        faible: mockSeniors.filter(s => s.niveauAutonomie === 'faible').length,
        moyen: mockSeniors.filter(s => s.niveauAutonomie === 'moyen').length,
        eleve: mockSeniors.filter(s => s.niveauAutonomie === 'eleve').length
      }
    };

    setStats(newStats);
  }, []);

  return {
    seniors,
    aidants,
    stats,
    setSeniors,
    setAidants
  };
};

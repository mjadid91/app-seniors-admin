
import { useState, useEffect } from "react";
import { Senior, Aidant } from "../../types/seniors";

interface SeniorsStats {
  totalSeniors: number;
  seniorsActifs: number;
  totalAidants: number;
  aidantsActifs: number;
  humeurPositive: number;
  humeurNegative: number;
}

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

  // Données de démonstration
  useEffect(() => {
    const mockSeniors: Senior[] = [
      {
        id: '1',
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
        dateInscription: '2024-01-15',
        statut: 'actif',
        derniereConnexion: '2024-06-12',
        humeurJour: {
          date: '2024-06-12',
          humeur: 'content',
          commentaire: 'Belle journée ensoleillée'
        },
        aidants: ['1', '2']
      },
      {
        id: '2',
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
        dateInscription: '2024-02-20',
        statut: 'actif',
        derniereConnexion: '2024-06-11',
        humeurJour: {
          date: '2024-06-11',
          humeur: 'neutre',
          commentaire: 'Journée calme'
        },
        aidants: ['1']
      },
      {
        id: '3',
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
        dateInscription: '2024-03-10',
        statut: 'actif',
        derniereConnexion: '2024-06-12',
        humeurJour: {
          date: '2024-06-12',
          humeur: 'tres_content',
          commentaire: 'Visite de mes petits-enfants !'
        },
        aidants: ['2']
      }
    ];

    const mockAidants: Aidant[] = [
      {
        id: '1',
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
          heures: '8h-18h'
        },
        dateInscription: '2024-01-05',
        statut: 'actif',
        seniorsAssignes: ['1', '2'],
        evaluations: [
          {
            note: 4.8,
            commentaire: 'Très professionnelle et bienveillante',
            date: '2024-05-15'
          }
        ]
      },
      {
        id: '2',
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
          heures: '9h-17h'
        },
        dateInscription: '2024-02-01',
        statut: 'actif',
        seniorsAssignes: ['1', '3'],
        evaluations: [
          {
            note: 4.6,
            commentaire: 'Très à l\'écoute et patient',
            date: '2024-04-20'
          }
        ]
      }
    ];

    setSeniors(mockSeniors);
    setAidants(mockAidants);

    // Calcul des statistiques
    const newStats = {
      totalSeniors: mockSeniors.length,
      seniorsActifs: mockSeniors.filter(s => s.statut === 'actif').length,
      totalAidants: mockAidants.length,
      aidantsActifs: mockAidants.filter(a => a.statut === 'actif').length,
      humeurPositive: mockSeniors.filter(s => 
        s.humeurJour && ['content', 'tres_content'].includes(s.humeurJour.humeur)
      ).length,
      humeurNegative: mockSeniors.filter(s => 
        s.humeurJour && ['triste', 'tres_triste'].includes(s.humeurJour.humeur)
      ).length
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

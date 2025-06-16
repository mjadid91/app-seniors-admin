
import { useState, useEffect } from "react";
import { Senior, Aidant, SeniorsStats } from "../../types/seniors";
import { mockSeniors, mockAidants } from "./data/mockSeniorsData";
import { calculateSeniorsStats } from "./utils/statsCalculator";

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

  useEffect(() => {
    setSeniors(mockSeniors);
    setAidants(mockAidants);
    setStats(calculateSeniorsStats(mockSeniors, mockAidants));
  }, []);

  return {
    seniors,
    aidants,
    stats,
    setSeniors,
    setAidants
  };
};

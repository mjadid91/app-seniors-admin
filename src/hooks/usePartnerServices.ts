
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ServicePartenaire {
  IDServicePartenaire: number;
  NomService: string;
}

export const usePartnerServices = () => {
  const [services, setServices] = useState<ServicePartenaire[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('ServicePartenaire')
        .select('*')
        .order('NomService');

      if (error) {
        throw error;
      }

      setServices(data || []);
    } catch (error: any) {
      console.error('Erreur lors du chargement des services:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les services partenaires.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return {
    services,
    loading,
    refetch: fetchServices
  };
};

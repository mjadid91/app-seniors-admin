
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useSignalements = () => {
  return useQuery({
    queryKey: ['signalements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('SignalementContenu')
        .select('*')
        .eq('Traité', false);
      
      if (error) throw error;
      return data;
    }
  });
};

export const useHasSignalements = (type: 'forum' | 'group', itemId: string) => {
  const { data: signalements = [] } = useSignalements();
  
  if (type === 'forum') {
    return signalements.some(s => s.IDReponseForum?.toString() === itemId);
  } else {
    return signalements.some(s => s.IDMessageGroupe?.toString() === itemId);
  }
};

export const markSignalementAsTraited = async (type: 'forum' | 'group', itemId: string) => {
  const column = type === 'forum' ? 'IDReponseForum' : 'IDMessageGroupe';
  
  const { error } = await supabase
    .from('SignalementContenu')
    .update({ Traité: true })
    .eq(column, parseInt(itemId));

  if (error) throw error;
};

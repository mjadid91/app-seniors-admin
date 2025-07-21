import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff } from 'lucide-react';

export const RealtimeIndicator = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    // Simuler les mises à jour de statut
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000); // Toutes les 30 secondes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <Badge variant={isConnected ? "default" : "destructive"} className="gap-1">
        {isConnected ? (
          <>
            <Wifi className="h-3 w-3" />
            Temps réel activé
          </>
        ) : (
          <>
            <WifiOff className="h-3 w-3" />
            Déconnecté
          </>
        )}
      </Badge>
      <span className="text-xs">
        Dernière MAJ: {lastUpdate.toLocaleTimeString()}
      </span>
    </div>
  );
};
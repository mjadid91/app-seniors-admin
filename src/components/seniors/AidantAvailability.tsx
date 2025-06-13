
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Aidant } from "../../types/seniors";

interface AidantAvailabilityProps {
  aidant: Aidant;
}

const AidantAvailability = ({ aidant }: AidantAvailabilityProps) => {
  if (!aidant.disponibilites) return null;

  return (
    <Card>
      <CardContent className="p-4">
        <h4 className="font-semibold text-slate-800 mb-3">Disponibilités</h4>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-slate-600">Horaires</p>
            <p className="font-medium">{aidant.disponibilites.heures}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-2">Jours disponibles</p>
            <div className="flex flex-wrap gap-2">
              {aidant.disponibilites.jours.map((jour, index) => (
                <Badge key={index} variant="outline">
                  {jour}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AidantAvailability;

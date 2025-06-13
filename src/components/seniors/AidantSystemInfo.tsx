
import { Card, CardContent } from "@/components/ui/card";
import { Aidant } from "../../types/seniors";

interface AidantSystemInfoProps {
  aidant: Aidant;
}

const AidantSystemInfo = ({ aidant }: AidantSystemInfoProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <h4 className="font-semibold text-slate-800 mb-3">Informations système</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-slate-600">Date d'inscription</p>
            <p className="font-medium">
              {new Date(aidant.dateInscription).toLocaleDateString('fr-FR')}
            </p>
          </div>
          <div>
            <p className="text-slate-600">Seniors assignés</p>
            <p className="font-medium">{aidant.seniorsAssignes?.length || 0}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AidantSystemInfo;

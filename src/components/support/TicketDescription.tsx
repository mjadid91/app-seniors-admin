
import { Card, CardContent } from "@/components/ui/card";

const TicketDescription = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <h4 className="font-semibold text-slate-800 mb-2">Description détaillée</h4>
        <p className="text-slate-600">
          Détails du problème rencontré par l'utilisateur. Ceci est un exemple de description 
          qui pourrait contenir plus d'informations sur le ticket de support.
        </p>
      </CardContent>
    </Card>
  );
};

export default TicketDescription;

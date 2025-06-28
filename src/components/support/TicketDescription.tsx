
import { Card, CardContent } from "@/components/ui/card";

interface TicketDescriptionProps {
  description: string;
}

const TicketDescription = ({ description }: TicketDescriptionProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <h4 className="font-semibold text-slate-800 mb-2">Description détaillée</h4>
        <p className="text-slate-600 whitespace-pre-line">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default TicketDescription;

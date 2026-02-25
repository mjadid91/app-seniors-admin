import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Aidant } from "../../types/seniors";

interface AidantEvaluationsProps {
  aidant: Aidant;
}

const AidantEvaluations = ({ aidant }: AidantEvaluationsProps) => {
  if (!aidant.evaluations || aidant.evaluations.length === 0) return null;

  return (
    <Card>
      <CardContent className="p-4">
        <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <Star className="h-4 w-4 text-yellow-500" />
          Évaluations
        </h4>
        <div className="space-y-3">
          {aidant.evaluations.map((evaluation, index) => (
            <div key={index} className="bg-slate-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{evaluation.note}/5</span>
                </div>
                <span className="text-sm text-slate-500">
                  {new Date(evaluation.date).toLocaleDateString('fr-FR')}
                </span>
              </div>
              {evaluation.commentaire && (
                <p className="text-sm text-slate-700">{evaluation.commentaire}</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AidantEvaluations;

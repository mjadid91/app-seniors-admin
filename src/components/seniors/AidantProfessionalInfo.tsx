import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, Award } from "lucide-react";
import { Aidant } from "../../types/seniors";

interface AidantProfessionalInfoProps {
  aidant: Aidant;
}

const AidantProfessionalInfo = ({ aidant }: AidantProfessionalInfoProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <h4 className="font-semibold text-slate-800 mb-3">Informations professionnelles</h4>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-slate-600">Profession</p>
            <p className="font-medium">{aidant.profession}</p>
          </div>

          {aidant.experience && (
            <div>
              <p className="text-sm text-slate-600">Expérience</p>
              <p className="font-medium">{aidant.experience}</p>
            </div>
          )}

          {aidant.formations && aidant.formations.length > 0 && (
            <div>
              <p className="text-sm text-slate-600 mb-2 flex items-center gap-2">
                <Book className="h-4 w-4" />
                Formations
              </p>
              <div className="flex flex-wrap gap-2">
                {aidant.formations.map((formation, index) => (
                  <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                    {formation}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {aidant.certifications && aidant.certifications.length > 0 && (
            <div>
              <p className="text-sm text-slate-600 mb-2 flex items-center gap-2">
                <Award className="h-4 w-4" />
                Certifications
              </p>
              <div className="flex flex-wrap gap-2">
                {aidant.certifications.map((certification, index) => (
                  <Badge key={index} variant="outline" className="bg-green-50 text-green-700">
                    {certification}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AidantProfessionalInfo;

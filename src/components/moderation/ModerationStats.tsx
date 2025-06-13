
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff, Archive } from "lucide-react";

const ModerationStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <Eye className="h-4 w-4 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Signalements</p>
              <p className="text-xl font-bold text-slate-800">3</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <EyeOff className="h-4 w-4 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Masqués</p>
              <p className="text-xl font-bold text-slate-800">0</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <Archive className="h-4 w-4 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Archivés</p>
              <p className="text-xl font-bold text-slate-800">0</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModerationStats;

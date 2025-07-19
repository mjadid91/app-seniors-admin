
import { FileText, CheckCircle, Edit3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Document } from "./useDocuments";

interface DocumentsStatsProps {
  documents: Document[];
}

const DocumentsStats = ({ documents }: DocumentsStatsProps) => {
  const totalDocuments = documents.length;
  const publishedDocuments = documents.filter(d => d.status === 'Publié').length;
  const draftDocuments = documents.filter(d => d.status === 'Brouillon').length;

  const statsCards = [
    {
      title: "Total documents",
      value: totalDocuments.toString(),
      icon: FileText,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Publiés",
      value: publishedDocuments.toString(),
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Brouillons",
      value: draftDocuments.toString(),
      icon: Edit3,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {statsCards.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index} className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <IconComponent className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DocumentsStats;

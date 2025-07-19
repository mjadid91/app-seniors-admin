
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface DocumentsFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterType: string;
  setFilterType: (type: string) => void;
  categories: string[];
}

const DocumentsFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  filterType, 
  setFilterType, 
  categories 
}: DocumentsFiltersProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col gap-4 mb-4 sm:mb-6">
      {/* Barre de recherche */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Rechercher un document..."
          className="pl-10 pr-4 py-2 sm:py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full text-sm sm:text-base"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-3">
        <select
          className="px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base flex-1 sm:flex-none sm:min-w-48"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">Toutes les catégories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        
        <Button 
          variant="outline" 
          className="w-full sm:w-auto"
        >
          <Filter className="h-4 w-4 mr-2" />
          {isMobile ? "Filtrer" : "Appliquer les filtres"}
        </Button>
      </div>
    </div>
  );
};

export default DocumentsFilters;

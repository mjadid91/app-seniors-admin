
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Rechercher un document..."
          className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <select
          className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">Toutes les catégories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filtrer
        </Button>
      </div>
    </div>
  );
};

export default DocumentsFilters;

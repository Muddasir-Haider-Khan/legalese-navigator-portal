
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter } from "lucide-react";

interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  categories: string[];
}

const SearchFilter = ({ 
  searchTerm, 
  setSearchTerm, 
  activeCategory, 
  setActiveCategory,
  categories
}: SearchFilterProps) => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F97316]">
            <Search className="h-5 w-5" />
          </div>
          <Input
            placeholder="Search for legal documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-gray-200 focus-visible:ring-[#F97316] rounded-lg shadow-sm"
          />
        </div>
        <Button variant="orange" className="gap-2 shadow-md hover:shadow-lg transition-all">
          <Filter className="h-4 w-4 text-white" />
          Filters
        </Button>
      </div>
      
      <div className="overflow-x-auto -mx-2 px-2 mb-8">
        <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid grid-flow-col auto-cols-max gap-2 bg-transparent p-0 overflow-x-auto">
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category} 
                className="rounded-full py-1.5 px-4 text-sm font-medium border border-gray-200 data-[state=active]:bg-[#F97316] data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
              >
                {category === "all" ? "All Categories" : category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default SearchFilter;

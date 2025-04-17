
import React from "react";
import DocumentCard, { DocumentItem } from "./DocumentCard";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface DocumentGridProps {
  documents: DocumentItem[];
  isAuthenticated: boolean;
  onUseTemplate: (id: number) => void;
  searchTerm: string;
  activeCategory: string;
  onReset: () => void;
}

const DocumentGrid = ({ 
  documents, 
  isAuthenticated, 
  onUseTemplate,
  searchTerm,
  activeCategory,
  onReset
}: DocumentGridProps) => {
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        doc.description.toLowerCase().includes(searchTerm.toLowerCase());
                        
    const matchesCategory = activeCategory === "all" || doc.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (filteredDocuments.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg shadow-inner">
        <FileText className="h-12 w-12 mx-auto text-[#F97316]/50" />
        <h3 className="mt-4 text-lg font-medium text-black">No Documents Found</h3>
        <p className="mt-1 text-black/70">
          Try adjusting your search or filter to find what you need.
        </p>
        <Button 
          variant="orange" 
          className="mt-4 shadow-lg shadow-[#F97316]/20"
          onClick={onReset}
        >
          Reset Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredDocuments.map((doc) => (
        <DocumentCard 
          key={doc.id} 
          document={doc} 
          isAuthenticated={isAuthenticated}
          onUseTemplate={onUseTemplate}
        />
      ))}
    </div>
  );
};

export default DocumentGrid;

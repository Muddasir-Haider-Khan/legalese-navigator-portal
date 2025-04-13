
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const documentTemplates = [
  { id: 1, name: "Last Will and Testament", category: "Estate Planning", complexity: "Medium" },
  { id: 2, name: "Non-Disclosure Agreement", category: "Business", complexity: "Low" },
  { id: 3, name: "Power of Attorney", category: "Estate Planning", complexity: "Medium" },
  { id: 4, name: "Residential Lease Agreement", category: "Real Estate", complexity: "Medium" },
  { id: 5, name: "Employment Contract", category: "Business", complexity: "High" },
  { id: 6, name: "Freelance Contract", category: "Business", complexity: "Medium" }
];

const MakeDocuments = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const categories = [...new Set(documentTemplates.map(doc => doc.category))];
  
  const filteredDocuments = selectedCategory 
    ? documentTemplates.filter(doc => doc.category === selectedCategory)
    : documentTemplates;

  const handleStartCreating = (id: number) => {
    navigate(`/documents/${id}`);
  };

  return (
    <div>
      <h1 className="heading-lg mb-2">Create Legal Documents</h1>
      <p className="text-rocket-gray-500 mb-6">
        Choose from our library of legal document templates to get started.
      </p>
      
      <div className="mb-6 flex flex-wrap gap-2">
        <Button 
          variant={selectedCategory === null ? "default" : "outline"} 
          onClick={() => setSelectedCategory(null)}
        >
          All Categories
        </Button>
        {categories.map(category => (
          <Button 
            key={category}
            variant={selectedCategory === category ? "default" : "outline"} 
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map(doc => (
          <Card key={doc.id} className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-start gap-3">
                <FileText className="h-5 w-5 flex-shrink-0 text-primary" />
                <span>{doc.name}</span>
              </CardTitle>
              <CardDescription>{doc.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                  {doc.complexity} Complexity
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                This document template provides a standard format that complies with legal requirements.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                onClick={() => handleStartCreating(doc.id)}
              >
                Start Creating <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MakeDocuments;

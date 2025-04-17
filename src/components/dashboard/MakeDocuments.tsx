import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setIsAuthenticated(!!data.session);
        setIsLoading(false);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };
    
    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsAuthenticated(!!session);
      }
    );
    
    return () => subscription.unsubscribe();
  }, []);
  
  const categories = [...new Set(documentTemplates.map(doc => doc.category))];
  
  const filteredDocuments = selectedCategory 
    ? documentTemplates.filter(doc => doc.category === selectedCategory)
    : documentTemplates;

  const handleStartCreating = (id: number) => {
    if (!isAuthenticated) {
      toast.error("Please log in to use document templates");
      navigate("/login");
      return;
    }
    
    navigate(`/documents/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/30 border-t-primary"></div>
      </div>
    );
  }

  return (
    <div>
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
              <img 
                src="/lovable-uploads/9801c5c6-e681-4287-a680-17a2d1cadfd7.png" 
                alt="Document signing" 
                className="w-full h-48 object-cover rounded-lg mt-4 opacity-80"
              />
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                onClick={() => handleStartCreating(doc.id)}
              >
                {isAuthenticated ? "Start Creating" : "Log in to Create"} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MakeDocuments;

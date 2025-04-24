
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ChevronRight } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface DocumentProps {
  id: number;
  name: string;
  category: string;
  complexity: string;
  icon: React.ReactNode;
  badge: string;
  badgeColor: string;
  description: string;
  features: string[];
  gradientFrom: string;
  gradientTo: string;
}

interface DocumentCategorySectionProps {
  document: DocumentProps;
  onStartCreating: (id: number) => void;
  isAuthenticated: boolean;
  index: number;
}

const DocumentCategorySection: React.FC<DocumentCategorySectionProps> = ({
  document,
  onStartCreating,
  isAuthenticated,
  index
}) => {
  return (
    <div className={`relative p-8 rounded-2xl bg-gradient-to-r ${document.gradientFrom} ${document.gradientTo}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/80 shadow-sm">
                {document.icon}
              </div>
              <Badge variant="outline">{document.category}</Badge>
              <Badge 
                variant="secondary" 
                className={`${
                  document.badgeColor === "green" 
                    ? "bg-green-100 text-green-800" 
                    : document.badgeColor === "blue" 
                    ? "bg-blue-100 text-blue-800" 
                    : document.badgeColor === "bright-orange" 
                    ? "bg-bright-orange-100 text-bright-orange-800"
                    : "bg-deep-blue-100 text-deep-blue-800"
                }`}
              >
                {document.badge}
              </Badge>
            </div>
            
            <h2 className="text-2xl font-semibold text-deep-blue-900">{document.name}</h2>
            
            <div className="prose prose-gray">
              <p className="text-muted-foreground">
                {document.description}
              </p>
            </div>
            
            <div className="pt-4">
              <Button 
                onClick={() => onStartCreating(document.id)}
                className="group"
              >
                {isAuthenticated ? "Start Creating" : "Sign in to Use"}
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="bg-white/80 p-6 rounded-xl shadow-sm space-y-4">
              <h3 className="font-medium text-lg">Key Features</h3>
              <ul className="space-y-3">
                {document.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentCategorySection;

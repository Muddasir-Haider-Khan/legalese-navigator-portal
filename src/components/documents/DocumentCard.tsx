
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, Clock, Users, Sparkles } from "lucide-react";

export interface DocumentItem {
  id: number;
  title: string;
  category: string;
  description: string;
  popular: boolean;
}

interface DocumentCardProps {
  document: DocumentItem;
  isAuthenticated: boolean;
  onUseTemplate: (id: number) => void;
}

const DocumentCard = ({ document, isAuthenticated, onUseTemplate }: DocumentCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-white border border-gray-100">
      <div className="absolute top-0 right-0">
        {document.popular && (
          <div className="bg-gradient-to-r from-[#F97316] to-[#FFBB66] text-white py-1 px-3 font-medium text-xs flex items-center rounded-bl-lg shadow-md">
            <Sparkles className="h-3 w-3 mr-1" /> Popular
          </div>
        )}
      </div>
      
      <CardHeader className="pb-3 relative">
        <Badge variant="outline" className="mb-2 text-black border-none bg-gray-100 text-xs inline-flex">
          {document.category}
        </Badge>
        <CardTitle className="text-xl text-black group-hover:text-[#F97316] transition-colors">
          {document.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-black/70">{document.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-black/70 mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-[#F97316]" />
            <span>5 min setup</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1 text-[#F97316]" />
            <span>4.8k users</span>
          </div>
        </div>
        <div className="flex items-center text-sm text-black/70">
          <FileText className="h-4 w-4 mr-2 text-[#F97316]" />
          <span>Complete template with guided instructions</span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button 
          className="w-full bg-white hover:bg-[#F97316] text-[#F97316] hover:text-white border border-[#F97316] group-hover:bg-[#F97316] group-hover:text-white transition-all duration-300"
          onClick={() => onUseTemplate(document.id)}
        >
          {isAuthenticated ? "Use Template" : "Log in to Use"}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DocumentCard;

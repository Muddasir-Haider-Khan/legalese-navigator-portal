import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import DiagonalSection from "@/components/documents/DiagonalSection";
import QASection from "@/components/documents/QASection";
import { FileText, Shield, Clock, Book, CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

  const features = [
    {
      icon: <Shield className="h-6 w-6 text-bright-orange-500" />,
      title: "Legally Sound",
      description: "All documents are reviewed by legal professionals and regularly updated"
    },
    {
      icon: <Clock className="h-6 w-6 text-bright-orange-500" />,
      title: "Quick Process",
      description: "Create your document in minutes, not hours"
    },
    {
      icon: <Book className="h-6 w-6 text-bright-orange-500" />,
      title: "Clear Instructions",
      description: "Step-by-step guidance through the document creation process"
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-bright-orange-500" />,
      title: "Validation Included",
      description: "Built-in checks to ensure your document is complete and accurate"
    }
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/30 border-t-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="relative bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 dark:from-rocket-gray-800 dark:to-rocket-gray-900 rounded-xl p-8 mb-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-4 text-rocket-gray-900 dark:text-white">
            Create Professional Legal Documents
          </h1>
          <p className="text-lg text-rocket-gray-600 dark:text-rocket-gray-300 mb-6">
            Choose from our wide selection of legally-vetted templates and create customized documents in minutes.
          </p>
          <Button className="bg-bright-orange-500 hover:bg-bright-orange-600">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {features.map((feature, index) => (
          <Card key={index} className="border-border/50 hover:border-bright-orange-500/50 transition-colors">
            <CardHeader>
              <div className="mb-2">{feature.icon}</div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-white dark:bg-rocket-gray-800 rounded-xl p-8 border border-border/50 mb-12">
        <h2 className="text-2xl font-semibold mb-8 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Choose Template",
              description: "Select from our extensive library of legal document templates"
            },
            {
              step: "2",
              title: "Fill Details",
              description: "Answer simple questions to customize your document"
            },
            {
              step: "3",
              title: "Download & Sign",
              description: "Get your professional document ready for signing"
            }
          ].map((step, index) => (
            <div key={index} className="relative">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-bright-orange-100 dark:bg-bright-orange-900/20 flex items-center justify-center text-bright-orange-500 font-bold text-lg">
                  {step.step}
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-lg">{step.title}</h3>
                </div>
              </div>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

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

      <div className="space-y-8">
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map((doc, index) => (
            <DiagonalSection
              key={doc.id}
              document={doc}
              index={index}
              onSelect={handleStartCreating}
              isAuthenticated={isAuthenticated}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No document templates found in this category.</p>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-rocket-gray-800 rounded-xl p-8 border border-border/50 mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2">Trusted by Thousands</h2>
          <p className="text-muted-foreground">Join thousands of satisfied users who trust our platform</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            "256-bit Encryption",
            "GDPR Compliant",
            "Legal Expert Reviewed",
            "24/7 Support"
          ].map((badge, index) => (
            <div key={index} className="flex items-center justify-center p-4 bg-rocket-gray-50 dark:bg-rocket-gray-900 rounded-lg">
              <Shield className="h-5 w-5 text-bright-orange-500 mr-2" />
              <span className="font-medium text-sm">{badge}</span>
            </div>
          ))}
        </div>
      </div>

      <QASection />
    </div>
  );
};

export default MakeDocuments;

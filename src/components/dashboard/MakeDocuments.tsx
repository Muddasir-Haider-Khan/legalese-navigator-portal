import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FileText, Shield, Clock, Book, CheckCircle, ArrowRight, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  
  const handleStartCreating = (documentId: number) => {
    if (!isAuthenticated) {
      toast.error("Please sign in to use this template");
      navigate("/login");
      return;
    }
    
    navigate(`/document-detail/${documentId}`);
    toast.success("Template loaded successfully");
  };
  
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
    <div className="space-y-16">
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

      <div className="space-y-24">
        <div className="relative p-8 rounded-2xl bg-gradient-to-r from-bright-orange-50/50 to-bright-orange-100/50">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/80 shadow-sm">
                    <FileText className="h-6 w-6 text-bright-orange-500" />
                  </div>
                  <Badge variant="outline">Estate Planning</Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Most Popular
                  </Badge>
                </div>
                
                <h2 className="text-2xl font-semibold text-deep-blue-900">Last Will and Testament</h2>
                
                <div className="prose prose-gray">
                  <p className="text-muted-foreground">
                    Create a comprehensive and legally binding will that ensures your wishes are carried out.
                    This document helps you specify beneficiaries, assign executors, and outline your final wishes
                    with clarity and legal precision.
                  </p>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={() => handleStartCreating(1)}
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
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">Comprehensive asset distribution planning</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">Executor appointment and responsibilities</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">Beneficiary designation with specific details</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">Legal requirements and witnessing guidelines</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative p-8 rounded-2xl bg-gradient-to-r from-deep-blue-50/50 to-deep-blue-100/50">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/80 shadow-sm">
                    <FileText className="h-6 w-6 text-deep-blue-500" />
                  </div>
                  <Badge variant="outline">Business</Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Easy to Complete
                  </Badge>
                </div>
                
                <h2 className="text-2xl font-semibold text-deep-blue-900">Non-Disclosure Agreement</h2>
                
                <div className="prose prose-gray">
                  <p className="text-muted-foreground">
                    Protect your confidential information with our professionally drafted NDA template.
                    Perfect for business partnerships, employee agreements, and contractor relationships,
                    ensuring your sensitive information remains secure.
                  </p>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={() => handleStartCreating(2)}
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
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">Comprehensive confidentiality terms</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">Trade secrets protection clauses</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">Clear term and termination details</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">Non-circumvention provisions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative p-8 rounded-2xl bg-gradient-to-r from-bright-orange-50/50 to-bright-orange-100/50">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/80 shadow-sm">
                    <FileText className="h-6 w-6 text-bright-orange-500" />
                  </div>
                  <Badge variant="outline">Estate Planning</Badge>
                  <Badge variant="secondary" className="bg-bright-orange-100 text-bright-orange-800">
                    Essential Document
                  </Badge>
                </div>
                
                <h2 className="text-2xl font-semibold text-deep-blue-900">Power of Attorney</h2>
                
                <div className="prose prose-gray">
                  <p className="text-muted-foreground">
                    Designate a trusted individual to make financial and legal decisions on your behalf
                    with our comprehensive Power of Attorney document. Essential for estate planning and
                    emergency situations.
                  </p>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={() => handleStartCreating(3)}
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
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">Detailed powers specification</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">Agent responsibilities outline</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">Duration and revocation terms</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">Healthcare decisions inclusion</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative p-8 rounded-2xl bg-gradient-to-r from-bright-orange-50/50 to-bright-orange-100/50">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/80 shadow-sm">
                    <FileText className="h-6 w-6 text-bright-orange-500" />
                  </div>
                  <Badge variant="outline">Real Estate</Badge>
                  <Badge variant="secondary" className="bg-deep-blue-100 text-deep-blue-800">
                    Comprehensive Agreement
                  </Badge>
                </div>
                
                <h2 className="text-2xl font-semibold text-deep-blue-900">Residential Lease Agreement</h2>
                
                <div className="prose prose-gray">
                  <p className="text-muted-foreground">
                    Create a comprehensive lease agreement that protects both landlord and tenant interests.
                    Includes all necessary clauses and legal requirements.
                  </p>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={() => handleStartCreating(4)}
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
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">Rent and security deposit terms</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">Maintenance responsibilities</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">Property rules and regulations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">Notice requirements</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative p-8 rounded-2xl bg-gradient-to-r from-bright-orange-50/50 to-bright-orange-100/50">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/80 shadow-sm">
                    <FileText className="h-6 w-6 text-bright-orange-500" />
                  </div>
                  <Badge variant="outline">Business</Badge>
                  <Badge variant="secondary" className="bg-deep-blue-100 text-deep-blue-800">
                    Comprehensive Contract
                  </Badge>
                </div>
                
                <h2 className="text-2xl font-semibold text-deep-blue-900">Employment Contract</h2>
                
                <div className="prose prose-gray">
                  <p className="text-muted-foreground">
                    Draft a detailed employment contract that clearly outlines terms, responsibilities,
                    compensation, and company policies.
                  </p>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={() => handleStartCreating(5)}
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
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">Compensation details</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">Benefits specification</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">Work responsibilities</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">Termination conditions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative p-8 rounded-2xl bg-gradient-to-r from-bright-orange-50/50 to-bright-orange-100/50">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/80 shadow-sm">
                    <FileText className="h-6 w-6 text-bright-orange-500" />
                  </div>
                  <Badge variant="outline">Business</Badge>
                  <Badge variant="secondary" className="bg-deep-blue-100 text-deep-blue-800">
                    Comprehensive Contract
                  </Badge>
                </div>
                
                <h2 className="text-2xl font-semibold text-deep-blue-900">Freelance Contract</h2>
                
                <div className="prose prose-gray">
                  <p className="text-muted-foreground">
                    Establish clear terms and conditions for freelance work. Protect your interests
                    while maintaining professional relationships.
                  </p>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={() => handleStartCreating(6)}
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
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">Project scope definition</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">Payment terms</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">Deliverable specifications</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">Intellectual property rights</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    </div>
  );
};

const getDocumentDescription = (id: number): string => {
  switch (id) {
    case 1:
      return "Create a comprehensive and legally binding will that ensures your wishes are carried out.";
    case 2:
      return "Protect your confidential information with a professionally drafted NDA.";
    case 3:
      return "Designate someone to make financial and legal decisions on your behalf.";
    case 4:
      return "Create a comprehensive lease agreement that protects both landlord and tenant interests.";
    case 5:
      return "Draft a detailed employment contract that clearly outlines terms, responsibilities, compensation, and company policies.";
    case 6:
      return "Establish clear terms and conditions for freelance work.";
    default:
      return "Professional legal document template with comprehensive coverage of all necessary clauses and provisions.";
  }
};

const getDocumentFeatures = (id: number): string[] => {
  const commonFeatures = [
    "Legally verified template",
    "Step-by-step guidance",
    "Auto-save functionality",
    "Download in multiple formats"
  ];

  const specificFeatures: Record<number, string[]> = {
    1: [
      "Asset distribution planning",
      "Executor appointment",
      "Beneficiary designation",
      "Special provisions section"
    ],
    2: [
      "Confidentiality terms",
      "Trade secrets protection",
      "Non-circumvention clauses",
      "Term and termination details"
    ],
    3: [
      "Powers specification",
      "Duration settings",
      "Agent responsibilities",
      "Revocation terms"
    ],
    4: [
      "Rent and security deposit terms",
      "Maintenance responsibilities",
      "Property rules and regulations",
      "Notice requirements"
    ],
    5: [
      "Compensation details",
      "Benefits specification",
      "Work responsibilities",
      "Termination conditions"
    ],
    6: [
      "Project scope definition",
      "Payment terms",
      "Deliverable specifications",
      "Intellectual property rights"
    ]
  };

  return [...commonFeatures, ...(specificFeatures[id] || [])];
};

export default MakeDocuments;

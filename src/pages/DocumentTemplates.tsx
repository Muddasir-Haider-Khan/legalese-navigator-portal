
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Search, Star, Filter, ArrowRight, CheckCircle, Users, Clock, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const documents = [
  {
    id: 1,
    title: "Last Will and Testament",
    category: "Estate Planning",
    description: "Create a legally binding will to distribute your assets and property.",
    popular: true,
  },
  {
    id: 2,
    title: "Non-Disclosure Agreement",
    category: "Business",
    description: "Protect confidential information when working with contractors or partners.",
    popular: true,
  },
  {
    id: 3,
    title: "LLC Operating Agreement",
    category: "Business",
    description: "Define the financial and working relationships between business owners.",
    popular: false,
  },
  {
    id: 4,
    title: "Power of Attorney",
    category: "Estate Planning",
    description: "Authorize someone to act on your behalf for legal, financial, or medical decisions.",
    popular: true,
  },
  {
    id: 5,
    title: "Residential Lease Agreement",
    category: "Real Estate",
    description: "Create a binding agreement between a landlord and tenant for property rental.",
    popular: true,
  },
  {
    id: 6,
    title: "Employment Contract",
    category: "Employment",
    description: "Establish clear terms and conditions for hiring employees.",
    popular: false,
  },
  {
    id: 7,
    title: "Trademark Application",
    category: "Intellectual Property",
    description: "File for protection of your brand names, logos, and slogans.",
    popular: false,
  },
  {
    id: 8,
    title: "Divorce Settlement",
    category: "Family",
    description: "Create a legal agreement to divide assets and resolve other matters during divorce.",
    popular: false,
  },
];

const DocumentTemplates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  const categories = ["all", "Business", "Estate Planning", "Real Estate", "Employment", "Intellectual Property", "Family"];
  
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
  }, [navigate]);
  
  const handleUseTemplate = (id: number) => {
    if (!isAuthenticated) {
      toast.error("Please log in to use document templates");
      navigate("/login");
      return;
    }
    
    navigate(`/documents/${id}`);
  };
  
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
                         
    const matchesCategory = activeCategory === "all" || doc.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="flex h-screen w-full items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary/30 border-t-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Enhanced hero section with background image */}
      <div className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="/lovable-uploads/93b7d702-da41-491c-ae74-c5459f026214.png" 
            alt="Legal document signing" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
        </div>
        <div className="container-custom py-16 md:py-24 relative z-10">
          <div className="max-w-3xl mx-auto backdrop-blur-sm bg-white/10 rounded-xl p-8 shadow-xl border border-white/20">
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 bg-[#F97316]/90 text-white text-xs font-semibold rounded-full mb-4">
                PROFESSIONAL LEGAL DOCUMENTS
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gradient animate-fade-in text-white leading-tight">
                Legal Document <span className="text-[#F97316]">Templates</span>
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-[#F97316] to-[#FFBB66] mx-auto my-4 rounded-full"></div>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-75">
                Browse our collection of professionally drafted legal documents. Customize and download what you need in minutes.
              </p>
              
              <div className="flex flex-wrap gap-3 justify-center mt-8">
                <div className="flex items-center text-white/90 text-sm md:text-base">
                  <CheckCircle className="h-5 w-5 mr-2 text-[#F97316]" />
                  <span>Attorney-reviewed</span>
                </div>
                <div className="flex items-center text-white/90 text-sm md:text-base">
                  <CheckCircle className="h-5 w-5 mr-2 text-[#F97316]" />
                  <span>Easy customization</span>
                </div>
                <div className="flex items-center text-white/90 text-sm md:text-base">
                  <CheckCircle className="h-5 w-5 mr-2 text-[#F97316]" />
                  <span>Instant download</span>
                </div>
              </div>
              
              {!isAuthenticated && (
                <div className="mt-8 space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row justify-center">
                  <Link to="/login">
                    <Button size="lg" className="w-full md:w-auto bg-[#F97316] hover:bg-[#D15316] text-white shadow-lg shadow-[#F97316]/25 transition-transform hover:translate-y-[-2px]">
                      Log in to Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="lg" variant="outline" className="w-full md:w-auto border-white text-white hover:bg-white/10 transition-transform hover:translate-y-[-2px]">
                      Sign up for Free
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Search and filters section */}
      <div className="container-custom py-8 bg-white">
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
                className="pl-10 bg-white border-gray-200 focus-visible:ring-[#F97316] rounded-lg"
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
          
          {/* Document cards grid */}
          {filteredDocuments.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-white border border-gray-100">
                  <div className="absolute top-0 right-0">
                    {doc.popular && (
                      <div className="bg-gradient-to-r from-[#F97316] to-[#FFBB66] text-white py-1 px-3 font-medium text-xs flex items-center rounded-bl-lg shadow-md">
                        <Sparkles className="h-3 w-3 mr-1" /> Popular
                      </div>
                    )}
                  </div>
                  
                  <CardHeader className="pb-3 relative">
                    <Badge variant="outline" className="mb-2 text-black border-none bg-gray-100 text-xs inline-flex">
                      {doc.category}
                    </Badge>
                    <CardTitle className="text-xl text-black group-hover:text-[#F97316] transition-colors">
                      {doc.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-black/70">{doc.description}</CardDescription>
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
                      onClick={() => handleUseTemplate(doc.id)}
                    >
                      {isAuthenticated ? "Use Template" : "Log in to Use"}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg shadow-inner">
              <FileText className="h-12 w-12 mx-auto text-[#F97316]/50" />
              <h3 className="mt-4 text-lg font-medium text-black">No Documents Found</h3>
              <p className="mt-1 text-black/70">
                Try adjusting your search or filter to find what you need.
              </p>
              <Button 
                variant="orange" 
                className="mt-4 shadow-lg shadow-[#F97316]/20"
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("all");
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DocumentTemplates;

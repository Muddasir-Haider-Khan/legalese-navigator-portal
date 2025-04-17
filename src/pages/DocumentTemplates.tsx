import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Search, Star, Filter } from "lucide-react";
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
      <div className="container-custom py-12 md:py-16 bg-white relative">
        <div className="absolute inset-0 z-0 opacity-10 overflow-hidden">
          <img 
            src="/lovable-uploads/8321364c-7d8c-4838-a85b-a3eb201c3d54.png" 
            alt="People working on documents" 
            className="w-full h-full object-cover" 
          />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-10">
            <h1 className="heading-xl mb-4 text-black">Legal Document Templates</h1>
            <p className="text-lg text-black max-w-3xl mx-auto">
              Browse our collection of professionally drafted legal documents. Customize and download what you need in minutes.
            </p>
            {!isAuthenticated && (
              <div className="mt-6">
                <Link to="/login">
                  <Button size="lg" className="mx-2 bg-[#F97316] text-white hover:bg-[#D15316]">Log in</Button>
                </Link>
                <Link to="/signup">
                  <Button size="lg" variant="orange" className="mx-2">Sign up</Button>
                </Link>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F97316]" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-gray-200"
              />
            </div>
            <Button variant="orange" className="gap-2">
              <Filter className="h-4 w-4 text-white" />
              Filters
            </Button>
          </div>
          
          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
            <TabsList className="grid grid-cols-3 md:grid-cols-7 bg-white border border-gray-200">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="bg-white hover:bg-gray-100">
                  {category === "all" ? "All" : category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          {filteredDocuments.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} className="overflow-hidden transition-all hover:shadow-md bg-white">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className="mb-2 text-black">{doc.category}</Badge>
                      {doc.popular && (
                        <Badge className="bg-[#F97316] text-white">
                          <Star className="h-3 w-3 mr-1" /> Popular
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg text-black">{doc.title}</CardTitle>
                    <CardDescription className="line-clamp-2 text-black/70">{doc.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-black/70">
                      <FileText className="h-4 w-4 mr-1 text-[#F97316]" />
                      <span>Customizable template</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-[#F97316] hover:bg-[#D15316] text-white"
                      onClick={() => handleUseTemplate(doc.id)}
                    >
                      {isAuthenticated ? "Use Template" : "Log in to Use"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <FileText className="h-12 w-12 mx-auto text-[#F97316]" />
              <h3 className="mt-4 text-lg font-medium text-black">No Documents Found</h3>
              <p className="mt-1 text-black/70">
                Try adjusting your search or filter to find what you need.
              </p>
              <Button 
                variant="orange" 
                className="mt-4"
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

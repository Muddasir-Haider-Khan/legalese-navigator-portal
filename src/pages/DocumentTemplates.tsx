
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Search, Star, Filter } from "lucide-react";
import { Link } from "react-router-dom";

// Mock document data
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
  
  const categories = ["all", "Business", "Estate Planning", "Real Estate", "Employment", "Intellectual Property", "Family"];
  
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
                         
    const matchesCategory = activeCategory === "all" || doc.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="container-custom py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="heading-xl mb-4">Legal Document Templates</h1>
            <p className="text-lg text-rocket-gray-600 dark:text-rocket-gray-400 max-w-3xl mx-auto">
              Browse our collection of professionally drafted legal documents. Customize and download what you need in minutes.
            </p>
          </div>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rocket-gray-400" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
          
          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
            <TabsList className="grid grid-cols-3 md:grid-cols-7">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category === "all" ? "All" : category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          {filteredDocuments.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} className="overflow-hidden transition-all hover:shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className="mb-2">
                        {doc.category}
                      </Badge>
                      {doc.popular && (
                        <Badge className="bg-yellow-500">
                          <Star className="h-3 w-3 mr-1" /> Popular
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{doc.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{doc.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-rocket-gray-500 dark:text-rocket-gray-400">
                      <FileText className="h-4 w-4 mr-1" />
                      <span>Customizable template</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link to={`/documents/${doc.id}`} className="w-full">
                      <Button className="w-full bg-rocket-blue-500 hover:bg-rocket-blue-600">
                        Use Template
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-rocket-gray-50 dark:bg-rocket-gray-800 rounded-lg">
              <FileText className="h-12 w-12 mx-auto text-rocket-gray-400" />
              <h3 className="mt-4 text-lg font-medium">No Documents Found</h3>
              <p className="mt-1 text-rocket-gray-500 dark:text-rocket-gray-400">
                Try adjusting your search or filter to find what you need.
              </p>
              <Button 
                variant="outline" 
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

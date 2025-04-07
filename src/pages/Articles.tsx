
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Clock, User, ChevronRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

// Sample article data (in a real app, this would come from Supabase)
const sampleArticles = [
  {
    id: 1,
    title: "Understanding Employment Contracts: Key Terms to Look For",
    excerpt: "Before signing an employment contract, make sure you understand these important clauses and terms that could affect your rights and obligations.",
    author: "Sarah Johnson, Esq.",
    date: "2025-03-28",
    category: "Employment Law",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
  },
  {
    id: 2,
    title: "Tenant Rights: What to Do When Your Landlord Won't Make Repairs",
    excerpt: "Learn about your legal rights as a tenant when facing maintenance issues and how to effectively get your landlord to address necessary repairs.",
    author: "Michael Chen, Esq.",
    date: "2025-04-02",
    category: "Real Estate Law",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80",
  },
  {
    id: 3,
    title: "Creating a Legally Sound Will: Common Mistakes to Avoid",
    excerpt: "Discover the most common errors people make when drafting their wills and how to ensure your last wishes are legally enforceable.",
    author: "Emily Rodriguez, Esq.",
    date: "2025-03-15",
    category: "Estate Planning",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 4,
    title: "Small Business Incorporation: LLC vs. S-Corp vs. C-Corp",
    excerpt: "Understand the differences between business structures and how to choose the right one for your small business's legal and tax needs.",
    author: "David Park, Esq.",
    date: "2025-04-05",
    category: "Business Law",
    image: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
  },
  {
    id: 5,
    title: "What to Do After a Car Accident: Legal Steps to Protect Your Rights",
    excerpt: "Learn the proper protocol to follow immediately after a car accident to ensure your legal rights are protected and you receive fair compensation.",
    author: "Jennifer Washington, Esq.",
    date: "2025-03-22",
    category: "Personal Injury",
    image: "https://images.unsplash.com/photo-1591696331096-c73fd5a6b1a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: 6,
    title: "Navigating Child Custody Arrangements: Best Practices for Parents",
    excerpt: "An overview of the legal factors involved in child custody decisions and tips for creating arrangements that prioritize children's well-being.",
    author: "Robert Garcia, Esq.",
    date: "2025-03-10",
    category: "Family Law",
    image: "https://images.unsplash.com/photo-1631467886590-aa7463b1bf7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
];

// Article categories
const categories = [
  "All Categories",
  "Business Law", 
  "Employment Law", 
  "Family Law", 
  "Real Estate Law", 
  "Personal Injury", 
  "Estate Planning"
];

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Articles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const filteredArticles = sampleArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <Helmet>
        <title>Legal Articles & Resources | Rocket Lawyer</title>
        <meta name="description" content="Browse our collection of legal articles and resources covering various aspects of law including business, family, real estate, and more." />
      </Helmet>
      
      <div className="bg-rocket-blue-800 dark:bg-rocket-blue-900 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">Legal Articles & Resources</h1>
          <div className="max-w-lg">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/90 backdrop-blur-sm border-none"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-rocket-gray-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-rocket-gray-900 dark:bg-rocket-gray-950 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={selectedCategory === category 
                  ? "bg-rocket-blue text-white" 
                  : "border-rocket-gray-700 text-rocket-gray-300 hover:bg-rocket-gray-800"}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-rocket-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-rocket-gray-700 mb-2">No Articles Found</h3>
              <p className="text-rocket-gray-500">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <div 
                  key={article.id}
                  className="bg-rocket-gray-800 dark:bg-rocket-gray-800 rounded-lg overflow-hidden border border-rocket-gray-700 hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-medium px-3 py-1 bg-rocket-blue-500/20 text-rocket-blue-300 rounded-full">
                        {article.category}
                      </span>
                      <div className="flex items-center text-rocket-gray-400 text-sm">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDate(article.date)}
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-lg mb-2 text-white">{article.title}</h3>
                    <p className="text-rocket-gray-300 text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-rocket-gray-400 text-sm">
                        <User className="h-3 w-3 mr-1" />
                        {article.author}
                      </div>
                      <Link 
                        to={`/articles/${article.id}`}
                        className="text-rocket-blue-300 hover:text-rocket-blue-200 font-medium text-sm flex items-center gap-1"
                      >
                        Read More <ChevronRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Articles;

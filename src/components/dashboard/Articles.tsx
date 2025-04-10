
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ArrowRight, Tag, Clock } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "Understanding Contract Law: The Basics",
    excerpt: "Learn the fundamental principles of contract law and how they apply to your business dealings.",
    category: "Business Law",
    date: "May 15, 2023",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 2,
    title: "What to Know Before Signing a Lease Agreement",
    excerpt: "Important considerations and red flags to look for before signing any residential lease agreement.",
    category: "Real Estate",
    date: "June 3, 2023",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 3,
    title: "Estate Planning 101: Protecting Your Family's Future",
    excerpt: "A comprehensive guide to estate planning, wills, and trusts for individuals at any stage of life.",
    category: "Estate Planning",
    date: "June 22, 2023",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1621951753015-740c699ab970?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 4,
    title: "Employment Rights: What Every Worker Should Know",
    excerpt: "An overview of employment laws and regulations that protect workers in various situations.",
    category: "Employment Law",
    date: "July 10, 2023",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }
];

const Articles = () => {
  return (
    <div>
      <h1 className="heading-lg mb-2">Legal Articles</h1>
      <p className="text-rocket-gray-500 mb-6">
        Explore our collection of articles covering various legal topics.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map(article => (
          <Card key={article.id} className="overflow-hidden flex flex-col h-full">
            <div className="aspect-video w-full overflow-hidden">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Tag className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-medium text-muted-foreground">{article.category}</span>
              </div>
              <CardTitle className="line-clamp-2">{article.title}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" />
                <span>{article.readTime}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground line-clamp-3">
                {article.excerpt}
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full group">
                Read Article 
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Articles;

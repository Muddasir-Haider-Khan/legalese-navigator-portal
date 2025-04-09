
import { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import { FileText, MessageCircle, Scale, ArrowRight, BookOpen, Users, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const FeatureCard = memo(({ 
  icon: Icon, 
  title, 
  description, 
  linkText, 
  linkTo, 
  delay 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
  linkText: string;
  linkTo: string;
  delay: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300 + (delay * 100));
    
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Card 
      className={`border border-rocket-gray-200 dark:border-rocket-gray-700 shadow-sm hover:shadow-md transition-all duration-500 h-full transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <CardContent className="p-6">
        <div className="bg-rocket-blue-50 dark:bg-rocket-blue-900/20 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-rocket-blue-500 dark:text-rocket-blue-300" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-rocket-gray-900 dark:text-white">{title}</h3>
        <p className="text-rocket-gray-600 dark:text-rocket-gray-300">{description}</p>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        <Link to={linkTo} className="text-rocket-blue-500 hover:text-rocket-blue-600 dark:text-rocket-blue-300 dark:hover:text-rocket-blue-200 inline-flex items-center group">
          <span>{linkText}</span>
          <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </CardFooter>
    </Card>
  );
});

FeatureCard.displayName = 'FeatureCard';

const Features = () => {
  const features = [
    {
      icon: FileText,
      title: "Legal Documents",
      description: "Create customized legal documents in minutes with our easy-to-use templates.",
      linkText: "Browse documents",
      linkTo: "/documents"
    },
    {
      icon: MessageCircle,
      title: "Ask a Lawyer",
      description: "Connect with experienced attorneys for personalized legal advice when you need it.",
      linkText: "Get legal advice",
      linkTo: "/ask-a-lawyer"
    },
    {
      icon: Building,
      title: "Business Formation",
      description: "Start your business the right way with our LLC and incorporation services.",
      linkText: "Start a business",
      linkTo: "/business-formation"
    },
    {
      icon: Scale,
      title: "Attorney Services",
      description: "Work with dedicated attorneys for more complex legal matters at affordable rates.",
      linkText: "Find an attorney",
      linkTo: "/attorney-services"
    },
    {
      icon: BookOpen,
      title: "Legal Resources",
      description: "Access free articles and guides covering a wide range of legal topics.",
      linkText: "Explore resources",
      linkTo: "/legal-resources"
    },
    {
      icon: Users,
      title: "Legal Plans",
      description: "Get ongoing legal protection for your family or business with our subscription plans.",
      linkText: "View plans",
      linkTo: "/legal-plans"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-rocket-gray-900">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-rocket-blue-500 font-medium mb-2 block">Our Services</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-rocket-gray-900 dark:text-white">
            Complete Legal Solutions
          </h2>
          <p className="text-lg text-rocket-gray-600 dark:text-rocket-gray-300 max-w-3xl mx-auto">
            Everything you need to manage your legal matters confidently and affordably.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              linkText={feature.linkText}
              linkTo={feature.linkTo}
              delay={index}
            />
          ))}
        </div>
        
        <div className="text-center">
          <Button size="lg" className="bg-rocket-blue-500 hover:bg-rocket-blue-600 px-8">
            Explore all services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default memo(Features);
